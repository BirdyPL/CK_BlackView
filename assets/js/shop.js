/* ==========================================================
   Linki do sklepu i ceny – JEDNO miejsce do zmiany.
   Dziś: funtech.pl (IdoSell). Po migracji na Shoper podmieniamy
   tylko adresy URL poniżej.
   url: null  -> produkt niedostępny, przycisk "Wkrótce"
   soon: true -> jest url, ale produkt chwilowo niedostępny: jak wyżej, cena widoczna
   price: null -> "Zapytaj o cenę"
   Ceny sprawdzone na funtech.pl: 2026-10-19
   ========================================================== */
const SHOP = {
  name: "FUNTECH",
  utm: {
    utm_source: "blackviewgaming.pl",
    utm_medium: "referral",
    utm_campaign: "landing_gaming",
  },
  products: {
    // PlayPop 8: strona w funtech jest, ale produkt niedostępny – usunąć soon, gdy wróci na stan
    playpop8: {
      url: "https://funtech.pl/product-pol-25802-Konsola-Blackview-PlayPop-8GB-RAM-128GB-Wi-Fi-6.html",
      price: 1099, note: "8 GB RAM / 128 GB / Wi-Fi 6", soon: true,
    },
    mp20: {
      url: "https://funtech.pl/product-pol-24757-Mini-PC-Blackview-MP20-AMD-Ryzen-3-3300U-8GB-SSD-256GB-Win-11-Pro-czarny.html",
      price: 1599, note: "Ryzen 3 3300U / 8 GB / 256 GB",
    },
    mp50: {
      url: "https://funtech.pl/product-pol-24627-Mini-PC-Blackview-MP50-AMD-Ryzen-5-3500U-16GB-SSD-512GB-Win-11-Pro-czarny.html",
      price: 2199, note: "Ryzen 5 3500U / 16 GB / 512 GB",
    },
    // MP100: ma pojawić się w ofercie funtech – uzupełnić url i price
    mp100: { url: null, price: null },
    mp100pro: {
      url: "https://funtech.pl/product-pol-23629-Mini-PC-Blackview-MP100-Pro-i5-12450H-16GB-512GB-W11-Pro-czarny.html",
      price: 2399, note: "wariant i5-12450H / 16 GB / 512 GB",
    },
    // MP300: na stanie, ale funtech jeszcze nie ma ceny – uzupełnić price i usunąć soon
    mp300: {
      url: "https://funtech.pl/product-pol-25468-Mini-PC-Blackview-MP300-Intel-Core-5-210H-16GB-SSD-512GB-Win-11-Pro.html",
      price: null, note: "Core 5 210H / 16 GB / 512 GB", soon: true,
    },
    nex60: {
      url: "https://funtech.pl/product-pol-24629-Mini-PC-Blackview-NEX60-Intel-Raptor-lake-Core-5-210H-16GB-SSD-512GB-Win-11-Pro-czarny.html",
      price: 2999, note: "Core 5 210H / 16 GB / 512 GB",
    },
    scm: {
      url: "https://funtech.pl/product-pol-23935-Monitor-Blackview-14-przenosny-SCM6.html",
      price: 699, note: "SCM6 14\" w ofercie",
    },
    dcm: {
      url: "https://funtech.pl/product-pol-25286-Monitor-Blackview-14-przenosny-podwojny-DCM6.html",
      price: 999, from: true, note: "DCM6 14\" · DCM8 15,3\" za 1 099 zł",
    },
    table: {
      url: "https://funtech.pl/product-pol-24456-Monitor-Blackview-16-Table-9.html",
      price: null, note: "Table 9 w ofercie",
    },
  },
};

(function () {
  const fmt = (n) => n.toLocaleString("pl-PL") + " zł";
  const withUtm = (url, content) => {
    const u = new URL(url);
    Object.entries(SHOP.utm).forEach(([k, v]) => u.searchParams.set(k, v));
    u.searchParams.set("utm_content", content);
    return u.toString();
  };
  const live = (p) => p.url && !p.soon;

  // przyciski: <a data-shop="klucz">
  document.querySelectorAll("[data-shop]").forEach((el) => {
    const key = el.dataset.shop;
    const p = SHOP.products[key];
    if (!p) return;
    if (live(p)) {
      el.href = withUtm(p.url, key);
      if (!el.dataset.keepLabel) el.textContent = "Kup w " + SHOP.name;
    } else {
      el.removeAttribute("href");
      el.classList.add("is-soon");
      el.setAttribute("aria-disabled", "true");
      el.textContent = "Wkrótce w " + SHOP.name;
    }
  });

  // ceny: <span data-shop-price="klucz" data-prefix="od ">
  document.querySelectorAll("[data-shop-price]").forEach((el) => {
    const p = SHOP.products[el.dataset.shopPrice];
    if (!p) return;
    const prefix = el.dataset.prefix || (p.from ? "od " : "");
    el.textContent = p.price ? prefix + fmt(p.price) : live(p) ? "Zapytaj o cenę" : "Cena wkrótce";
    el.classList.toggle("is-text", !p.price);
  });

  // dopiski pod ceną: <small data-shop-note="klucz">
  document.querySelectorAll("[data-shop-note]").forEach((el) => {
    const p = SHOP.products[el.dataset.shopNote];
    if (!p) return;
    el.textContent = live(p) ? (p.note ? p.note + " · " : "") + "w sklepie " + SHOP.name : "wkrótce w sklepie " + SHOP.name;
  });
})();
