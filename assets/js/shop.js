/* ==========================================================
   Linki do sklepu i ceny – JEDNO miejsce do zmiany.
   Dziś: funtech.pl (IdoSell). Po migracji na Shoper podmieniamy
   tylko adresy URL poniżej.
   url: null  -> produkt niedostępny, przycisk "Wkrótce"
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
    // PlayPop 8 i MP100: mają pojawić się w ofercie funtech – uzupełnić url i price
    playpop8: { url: null, price: null },
    mp100: { url: null, price: null },
    mp100pro: {
      url: "https://funtech.pl/product-pol-23629-Mini-PC-Blackview-MP100-Pro-i5-12450H-16GB-512GB-W11-Pro-czarny.html",
      price: 2399, note: "wariant i5-12450H / 16 GB / 512 GB",
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

  // przyciski: <a data-shop="klucz">
  document.querySelectorAll("[data-shop]").forEach((el) => {
    const key = el.dataset.shop;
    const p = SHOP.products[key];
    if (!p) return;
    if (p.url) {
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
    el.textContent = p.price ? prefix + fmt(p.price) : p.url ? "Zapytaj o cenę" : "Cena wkrótce";
    el.classList.toggle("is-text", !p.price);
  });

  // dopiski pod ceną: <small data-shop-note="klucz">
  document.querySelectorAll("[data-shop-note]").forEach((el) => {
    const p = SHOP.products[el.dataset.shopNote];
    if (!p) return;
    el.textContent = p.url ? (p.note ? p.note + " · " : "") + "w sklepie " + SHOP.name : "wkrótce w sklepie " + SHOP.name;
  });
})();
