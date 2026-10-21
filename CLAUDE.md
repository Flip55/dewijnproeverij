# De wijnproeverij — werkafspraken voor Claude

Website van De wijnproeverij: wijnproeverij aan huis in de regio Gent, door drie jeugdvrienden (Flip, Tim, Nick).
Live op https://dewijnproeverij.com via GitHub Pages (repo Flip55/dewijnproeverij, branch `main`, root).
Een push naar `main` is binnen een minuut live. Er is geen build-stap.

## Taal en toon
- Site in het Nederlands (Vlaams). Toon: speels, een beetje brutaal, geen wijnsnobisme ("verantwoord drinkgelag", "like a boss", "booze cruise").
- Met Flip praten we in het Engels of Nederlands, wat hij gebruikt.

## Structuur
- `index.html` home · `proeverij.html` formule & prijs (± €200 voor 6–10 personen, 2 druiven, 6–8 flessen)
- `smaaktest.html` keuzepagina · `rode-wijn.html` / `witte-wijn.html` de SommelAI-quiz
- `tips.html` + 3 artikels: `wijnaromas.html`, `wijnjargon.html`, `proeven-als-pro.html` (overgenomen van de oude WordPress-site)
- `cadeau.html` cadeaubon en `teambuilding.html` (SEO-pagina's; in het menu onder de dropdown "Formules" samen met De proeverij; ook gelinkt vanuit home, proeverij en tips). Teambuilding: ± €20 p.p., factuur met btw, ook in het Engels, geen catering. `contact.html?vraag=teambuilding` vult het formulier vooraf in. Afspraken erop: bon als pdf, elk bedrag, één jaar geldig. `contact.html?vraag=cadeaubon` vult het formulier vooraf in.
- `over-ons.html`, `contact.html` (boekingsformulier), `groep.html` (privé groepsoverzicht)
- `assets/style.css` alle stijl (één lettertype: Fraunces; bordeaux `#4a1020`, stro `#e5cf8c`)
- `assets/config.js` koppelingen: Formspree, Apps Script-endpoint, contactadres
- `assets/quiz-data.js` vragen + druifkoppelingen · `assets/quiz.js` quizlogica · `assets/groep.js` groepsoverzicht
- `apps-script/Code.gs` + README: Google Apps Script dat resultaten in een Google Sheet bewaart
- `CNAME` custom domain — niet verwijderen
- **SEO:** `tools/seo.py` schrijft per pagina title, description, canonical (apex, zonder www), Open Graph en robots-tags in de `<head>`, plus `sitemap.xml`. Titels/beschrijvingen aanpassen in de tabel `PAGES` in dat script, daarna `python3 tools/seo.py` draaien — nooit met de hand in de HTML. Nieuwe pagina: toevoegen aan `PAGES`. `groep.html` staat op noindex en in `robots.txt`. `assets/og.png` is de deelafbeelding (placeholder tot het logo er is). JSON-LD: LocalBusiness op index/contact/proeverij, FAQPage op proeverij (met de hand in de HTML).

De pagina's zijn platte HTML met een gedeelde header/footer. Bij een wijziging aan de navigatie: alle pagina's aanpassen. Het menu-item "Formules" is een `<details class="dropdown">` (klik, hover op desktop; sluit bij klik erbuiten via een klein script onderaan elke pagina).

## Quizlogica (niet veranderen zonder overleg)
- **Sinds 21/10/2026 draait de adaptieve v2-quiz** (`data-mode="v2"` op `#quiz` in rode-wijn.html en witte-wijn.html; de sommeliers keurden de vragen goed). Vaste basisronde van 8 vragen, daarna kiest SommelAI telkens de vraag (extra of duel) die de koplopers het best scheidt. Duels (tweekeuzevragen) tellen dubbel. Stopt bij 3 punten voorsprong, na 20 vragen, of op "Genoeg". Zekerheid = 50% + 12,5% per punt voorsprong. Gesimuleerd: mediaan 10–11 vragen. Omdat het aantal vragen varieert, spreken smaaktest.html en de SEO-teksten van "± 10" / "een handvol" vragen.
- Elk antwoord geeft +1 aan elke gekoppelde druif. Hoogste score wint.
- Rood: 13 vragen + 20 duels, 5 druiven (Cabernet Sauvignon, Pinot Noir, Malbec, Syrah, Primitivo). De 13 basisvragen zijn geverifieerd tegen 5 echte respondenten uit de Landbot-export: identiek.
- Wit: 12 vragen + 20 duels, 5 druiven (Chardonnay, Sauvignon Blanc, Pinot Gris, Riesling, Gewürztraminer). Uit de spreadsheet, niet geverifieerd tegen Landbot.
- v1 (alle basisvragen in vaste volgorde, zekerheid = score / aantal vragen) zit nog in quiz.js: `data-mode` weglaten op `#quiz`.
- Rangpunten per persoon 4-3-2-1-0 (gelijke scores delen); het groepsoverzicht telt die op en adviseert de top 2 druiven. Zelfde methode als de oude spreadsheet "Topwijnen".
- Groepslink: `rode-wijn.html?groep=<code>`; overzicht: `groep.html?code=<code>` (publiek: "nog bezig" tot de groep klaar is, dan top 2 + winnaar per naam, geen e-mails; organisatoren loggen in met hun eigen sleutel uit `ADMINS` in Code.gs, bewaard in localStorage, en zien alles).
- Groepsbeheer in het tabblad "Groepen": verwacht aantal, status open/klaar (automatisch klaar als iedereen deed, één keer), rijen kunnen "dubbel" zijn (kolom `status` in Resultaten). Alle admin-acties gaan via GET op het Apps Script (`actie=login|groep|rij`).
- **Vragen bewerken:** `vragen/sommelai-vragen.xlsx` is de leesbare versie voor de sommeliers. `python3 tools/vragen.py export` maakt hem uit quiz-data.js, `python3 tools/vragen.py import` zet een bewerkte versie terug. Daarna scoring controleren.

## Externe diensten
- Formspree (contactformulier), Google Apps Script + Sheet (quizresultaten, e-mailadressen), Cloudflare DNS (records op "DNS only"), GitHub Pages.
- Geheimen (de sleutels in ADMINS) horen niet in de repo.

## Werkwijze
- Kleine wijzigingen: direct aanpassen, lokaal controleren (python -m http.server + Playwright-screenshot), committen, pushen naar `main`.
- Commit-berichten in het Nederlands, kort.
- Na een wijziging aan de quizdata: scoring opnieuw controleren.

## Open punten
- Logo en foto's toevoegen (Flip levert ze aan).
- Witte quiz verifiëren als er een Landbot-export van de witte bot is.
- Oude WordPress-site staat op privé (redirect was te duur). Google Bedrijfsprofiel en Instagram naar dewijnproeverij.com laten wijzen; site aanmelden in Google Search Console (sitemap indienen).
- SEO-content: nog te schrijven: vrijgezellen, wijn bij Vlaamse gerechten (stoofvlees eerst), druifpagina's; later een wekelijkse "wijn in promo bij de supermarkt"-tool (eerst manueel, overleg vooraf).
- Later eventueel: Cal.com-boeking met betaling.
