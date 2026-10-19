# BACKLOG – blackviewgaming.pl

Stan na 2026-10-19. Makieta: https://birdypl.github.io/CK_BlackView/

---

## 🔴 DECYZJA: dokąd kierujemy ruch (przyciski „Kup”)

**Opcje**

| | Opcja | Za | Przeciw |
|---|---|---|---|
| A | **Teraz funtech.pl** (IdoSell) | Start od razu; zbieramy ruch i dane już teraz | Niepełna oferta (patrz niżej); ruch z kampanii płatnych trafia do sklepu o szerokiej ofercie; później trzeba podmienić linki |
| B | **Czekamy na nowy sklep Shoper** | Jeden docelowy sklep, spójna marka | Opóźnia start; landing bez możliwości zakupu |
| C | **Landing jako podstrona w Shoper** | Wszystko na jednej platformie | Domena: albo utrata blackviewgaming.pl, albo maskowanie (iframe), które **odradzam** ze względu na SEO, analitykę, cookies i HTTPS |

**Rekomendacja (Claude): A teraz → docelowo nowy sklep na domenie marki, bez maskowania**

1. **Startujemy z landingiem na blackviewgaming.pl**, a przyciski „Kup” prowadzą na funtech.pl z parametrami UTM (`utm_source=blackviewgaming&utm_medium=referral&utm_campaign=…`). Zaczynamy mierzyć ruch.
2. **Wszystkie linki do sklepu trzymamy w jednym miejscu** (jeden plik konfiguracyjny), więc przejście na Shoper to jedna zmiana, a nie edycja każdej strony.
3. **Docelowo nowy sklep Shoper działa na domenie marki**, a nie obok niej. Jeden z dwóch wariantów, zależnie od tego, co potwierdzi Shoper:
   - **C1:** `sklep.blackviewgaming.pl` jako domena sklepu Shoper, a landing zostaje na `blackviewgaming.pl`. Prosty i bezpieczny dla SEO, bo wszystko jest w obrębie jednej marki.
   - **C2:** `blackviewgaming.pl` jako główna domena sklepu Shoper, a landing przebudowany na stronę główną i strony informacyjne Shopera. Obecne adresy przekierowujemy na nowe przekierowaniami 301.
4. **Nie maskujemy domeny** (iframe ani forward z maskowaniem).

**Problem z ofertą funtech.pl (sprawdzone 2026-10-19).** Część modeli z landingu tam nie występuje:

| Na landingu | funtech.pl |
|---|---|
| PlayPop 8 | ❌ brak |
| MP100 | ❌ brak (jest MP100 Pro i5-12450H, 2 399 zł, i MP100 Pro R5-7530U, cena na telefon) |
| MP100 Pro | ✅ i5-12450H, 2 399 zł |
| NEX60 | ✅ 2 999 zł |
| SCM8 | ❌ brak (jest SCM6 14", 699 zł) |
| DCM8 Pro | ❌ brak (są DCM8 15,3" za 1 099 zł i DCM6 14" za 999 zł) |
| Table 16 | ❌ brak (jest Table 9, cena na telefon) |
| – | dodatkowo w ofercie: MP300, MP50 (2 199 zł), MP20 (1 599 zł) |

→ Jeśli wybierzemy opcję A: **pokazujemy na landingu modele dostępne w funtech** (SCM6, DCM8, Table 9, MP100 Pro i5), a resztę oznaczamy „Wkrótce” lub „Powiadom mnie”. Do decyzji z Wiktorem.

**Do sprawdzenia z Shoper**
- [ ] Czy sklep może działać na własnej domenie i subdomenie (`sklep.blackviewgaming.pl`), z certyfikatem SSL?
- [ ] Czy można podpiąć kilka domen (aliasy z przekierowaniem 301 na domenę główną)?
- [ ] Czy strony informacyjne lub CMS pozwalają na własny HTML, CSS i JS (pełny landing, a nie tylko edytor WYSIWYG)?
- [ ] Czy da się podmienić stronę główną na własny szablon (Shoper Storefront / edycja szablonu)?
- [ ] Integracje: GA4, Meta Pixel, Google Ads, Merchant Center (feed produktowy).
- [ ] Planowany termin uruchomienia nowego sklepu.

**Do ustalenia wewnętrznie**
- [ ] Jaka jest relacja z funtech.pl: własny sklep czy partner? Od tego zależy, czy kierujemy tam ruch z kampanii płatnych.
- [ ] Czy nowy sklep Shoper będzie wyłącznie z Blackview, czy wielomarkowy? Od tego zależy wybór między C1 a C2.

---

## Treści i makieta

- [ ] Ceny w zł (obecnie `XXX zł`), zależnie od decyzji o sklepie.
- [ ] Decyzje oznaczone `[…]` w makiecie:
  - [ ] Czy wymieniać z nazwy GeForce NOW i Xbox Cloud Gaming? (znaki towarowe; bez sugerowania partnerstwa)
  - [ ] Stopka: „dystrybucja: CK Mediator” – potwierdzić.
  - [ ] PlayPop: rezygnujemy z hasła producenta „100% niezawodna ochrona prywatności”?
  - [ ] Szacunek „gamingowy PC 12–15 tys. zł” – potwierdzić z marketingiem.
- [ ] Lista gier e-sportowych i FPS na MP100 / MP100 Pro – do testów.
- [ ] PlayPop: zawartość zestawu – zweryfikować ze specyfikacją `.xlsx`.
- [ ] Przekazać Wiktorowi korekty opisów:
  - DCM = laptop + 2 ekrany boczne (3 ekrany);
  - Table 8, 9, 10 = pojedynczy ekran na stojaku, Table 16 = 3 ekrany;
  - oficjalna strona marki to blackview.hk, a nie blackview.com (inna firma).
- [ ] Opinia Wiktora o makiecie.

## Technika

- [ ] Hosting docelowy i podpięcie domeny blackviewgaming.pl (plik CNAME + rekord DNS, jeśli zostajemy na GitHub Pages).
- [ ] Przed startem: usunąć `noindex` z HTML i `robots.txt`.
- [ ] Linki do sklepu przenieść do jednego pliku konfiguracyjnego, plus UTM.
- [ ] Optymalizacja grafik (WebP, `srcset`); packshoty mają obecnie 250–660 KB.
- [ ] Analityka: GA4 / Meta Pixel i baner zgody na cookies (RODO).
- [ ] Repo jest publiczne (wymóg darmowego GitHub Pages) – zdecydować, czy tak zostaje po starcie.

## Social (FB / IG Blackview Office)

- [ ] Seria postów #poSiedemnastej: gamingowy akcent w stylistyce Blackview Office.
