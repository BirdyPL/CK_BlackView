# Narzędzia

## Nowy packshot na stronę (Windows, bez instalowania czegokolwiek)

1. Wycięcie białego tła, przycięcie i zmniejszenie do 700 px:
   ```powershell
   powershell -File tools\cut-background.ps1 -In "C:\!_Data\BlackView\MP\MP300\ID\1.jpg" -Out "$env:TEMP\bv\mp300.png"
   ```
2. Konwersja do WebP (koduje Edge, który jest w systemie):
   ```powershell
   powershell -File tools\webp.ps1 -ImgDir "$env:TEMP\bv" -OutDir assets\img
   ```
3. W HTML: `<img src="assets/img/mp300.webp" width="…" height="…" loading="lazy" decoding="async" alt="…">` (wymiary wypisuje `webp.ps1`).

Zdjęcia z kolorowym tłem (lifestyle) pomijają krok 1.

## Ceny i dostępność

`check-prices.mjs` porównuje `assets/js/shop.js` z kartami produktów w funtech.pl (ceny, stan, flaga `soon`).
Działa w GitHub Actions (`.github/workflows/check-prices.yml`): codziennie rano, po każdej zmianie `shop.js` i ręcznie (Actions → „Ceny i dostępność” → Run workflow). Przy rozbieżnościach run kończy się błędem, a GitHub wysyła maila. Szczegóły w podsumowaniu runu.

Lokalnie (wymaga Node 18+): `node tools/check-prices.mjs`.
