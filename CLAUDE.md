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
- `over-ons.html`, `contact.html` (boekingsformulier), `groep.html` (privé groepsoverzicht)
- `assets/style.css` alle stijl (één lettertype: Fraunces; bordeaux `#4a1020`, stro `#e5cf8c`)
- `assets/config.js` koppelingen: Formspree, Apps Script-endpoint, contactadres
- `assets/quiz-data.js` vragen + druifkoppelingen · `assets/quiz.js` quizlogica · `assets/groep.js` groepsoverzicht
- `apps-script/Code.gs` + README: Google Apps Script dat resultaten in een Google Sheet bewaart
- `CNAME` custom domain — niet verwijderen

De pagina's zijn platte HTML met een gedeelde header/footer. Bij een wijziging aan de navigatie: alle pagina's aanpassen.

## Quizlogica (niet veranderen zonder overleg)
- Elk antwoord geeft +1 aan elke gekoppelde druif. Hoogste score wint. Zekerheid = score / aantal vragen.
- Rood: 13 vragen, 5 druiven (Cabernet Sauvignon, Pinot Noir, Malbec, Syrah, Primitivo). Geverifieerd tegen 5 echte respondenten uit de Landbot-export: identiek.
- Wit: 12 vragen, 5 druiven (Chardonnay, Sauvignon Blanc, Pinot Gris, Riesling, Gewürztraminer). Uit de spreadsheet, niet geverifieerd tegen Landbot.
- Rangpunten per persoon 4-3-2-1-0 (gelijke scores delen); het groepsoverzicht telt die op en adviseert de top 2 druiven. Zelfde methode als de oude spreadsheet "Topwijnen".
- Groepslink: `rode-wijn.html?groep=<code>`; overzicht: `groep.html?code=<code>&key=<ADMIN_KEY>`.

## Externe diensten
- Formspree (contactformulier), Google Apps Script + Sheet (quizresultaten, e-mailadressen), Cloudflare DNS (records op "DNS only"), GitHub Pages.
- Geheimen (ADMIN_KEY) horen niet in de repo.

## Werkwijze
- Kleine wijzigingen: direct aanpassen, lokaal controleren (python -m http.server + Playwright-screenshot), committen, pushen naar `main`.
- Commit-berichten in het Nederlands, kort.
- Na een wijziging aan de quizdata: scoring opnieuw controleren.

## Open punten
- Logo en foto's toevoegen (Flip levert ze aan).
- Witte quiz verifiëren als er een Landbot-export van de witte bot is.
- Oude WordPress-site (dewijnproeverij.wordpress.com) vervangen door verwijsbericht; Google Maps en Instagram naar het nieuwe adres laten wijzen.
- Later eventueel: Cal.com-boeking met betaling.
