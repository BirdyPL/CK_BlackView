# CK_BlackView

Strona **blackviewgaming.pl**: konsola PlayPop 8, mini PC i ekrany przenośne Blackview.

Statyczny HTML + CSS + jeden plik JS, bez budowania i zależności. Podgląd: otwórz `index.html` w przeglądarce. Publikacja: GitHub Pages z gałęzi `main` (katalog główny), automatycznie po każdym merge'u.

## Struktura

| Plik | Zawartość |
|---|---|
| `index.html` | Strona główna |
| `playpop.html` | PlayPop 8 (własna, kolorowa stylistyka) |
| `minipc.html` | Mini PC: MP20, MP50, MP100 Pro, MP300, NEX60, MP100 |
| `ekrany.html` | Ekrany przenośne SCM, DCM, Table |
| `assets/css/style.css` | Wspólne style |
| `assets/js/shop.js` | Linki do sklepu, ceny i dostępność – jedyne miejsce do zmiany |
| `assets/img/` | Grafiki w WebP |
| `tools/` | Obróbka packshotów i sprawdzanie cen (opis w `tools/README.md`) |
| `.github/workflows/` | Codzienne sprawdzanie cen i dostępności |

## Sklep: `assets/js/shop.js`

Przyciski, ceny i dopiski pod ceną są wypełniane z obiektu `SHOP.products`, po atrybutach w HTML:

- `<a data-shop="klucz">` – przycisk „Kup w …” (z parametrami UTM) albo „Wkrótce”;
- `<span data-shop-price="klucz" data-prefix="od ">` – cena;
- `<small data-shop-note="klucz">` – dopisek pod ceną.

Pola produktu: `url` (`null` = brak w sklepie), `price` (`null` = „Zapytaj o cenę”), `note`, `from` (cena „od”), `soon: true` (jest w sklepie, ale chwilowo niedostępny: przycisk „Wkrótce”, cena widoczna).

## Grafiki

Nowe packshoty: `tools/cut-background.ps1` (białe tło → przezroczyste PNG), potem `tools/webp.ps1` (WebP). W HTML zawsze `width`/`height`, a poza pierwszym ekranem `loading="lazy" decoding="async"`.

## Przed publikacją na docelowej domenie

Strona ma `noindex` (meta w HTML i `robots.txt`) – zdjąć przy starcie na blackviewgaming.pl.
