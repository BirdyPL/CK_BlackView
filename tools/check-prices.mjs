/* ==========================================================
   Porównuje ceny i dostępność z assets/js/shop.js z kartami
   produktów w sklepie (dane strukturalne schema.org na stronie).
   Uruchomienie: node tools/check-prices.mjs
   Kod wyjścia 1 = są rozbieżności (GitHub Actions wyśle maila).
   ========================================================== */
import { readFile, appendFile } from "node:fs/promises";

const src = await readFile(new URL("../assets/js/shop.js", import.meta.url), "utf8");
// shop.js to zwykły skrypt przeglądarkowy: bierzemy tylko obiekt SHOP, bez części z document.*
const SHOP = new Function(src.slice(0, src.indexOf("(function")) + "\nreturn SHOP;")();

const AVAILABLE = ["InStock", "LimitedAvailability", "PreOrder", "BackOrder"];
const fmt = (n) => (n == null ? "–" : n.toLocaleString("pl-PL") + " zł");

async function live(url) {
  const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0 (blackviewgaming.pl price check)" } });
  if (!res.ok) throw new Error("HTTP " + res.status);
  const html = await res.text();
  const price = Number(html.match(/"price"\s*:\s*"?([\d.]+)/)?.[1] ?? 0) || null;
  const availability = html.match(/schema\.org\/(\w+)/g)?.map((s) => s.split("/")[1])
    .find((s) => /Stock|Order|Availability|Discontinued/.test(s)) ?? "?";
  return { price, availability };
}

const rows = [];
let problems = 0;
for (const [key, p] of Object.entries(SHOP.products)) {
  if (!p.url) { rows.push([key, "–", "–", "brak url (Wkrótce)", ""]); continue; }
  let l;
  try { l = await live(p.url); }
  catch (e) { rows.push([key, fmt(p.price), "?", "?", "❌ błąd pobrania: " + e.message]); problems++; continue; }

  const issues = [];
  const available = AVAILABLE.includes(l.availability);
  if (p.price !== l.price) issues.push(`cena: shop.js ${fmt(p.price)}, sklep ${fmt(l.price)}`);
  if (!p.soon && !available) issues.push("aktywny przycisk Kup, a w sklepie niedostępny – dodać soon: true");
  if (p.soon && available && l.price) issues.push("w sklepie dostępny z ceną – można zdjąć soon");
  if (issues.length) problems++;
  rows.push([key, fmt(p.price), fmt(l.price), l.availability + (p.soon ? " (soon)" : ""), issues.length ? "⚠️ " + issues.join("; ") : "✅"]);
}

const table = [
  "| Produkt | shop.js | Sklep | Dostępność | Wynik |",
  "|---|---|---|---|---|",
  ...rows.map((r) => "| " + r.join(" | ") + " |"),
].join("\n");
const summary = `## Ceny i dostępność: ${SHOP.name}\n\n${table}\n\n${problems ? `**Rozbieżności: ${problems}**` : "Wszystko zgodne."}\n`;

console.log(summary);
if (process.env.GITHUB_STEP_SUMMARY) await appendFile(process.env.GITHUB_STEP_SUMMARY, summary);
process.exit(problems ? 1 : 0);
