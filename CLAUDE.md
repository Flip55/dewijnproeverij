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
- Groepslink: `rode-wijn.html?groep=<code>`; overzicht: `groep.html?code=<code>` (publiek: "nog bezig" tot de groep klaar is, dan top 2 + winnaar per naam, geen e-mails; organisatoren loggen in met hun eigen sleutel uit `ADMINS` in Code.gs, bewaard in localStorage, en zien alles).
- Groepsbeheer in het tabblad "Groepen": verwacht aantal, status open/klaar (automatisch klaar als iedereen deed, één keer), rijen kunnen "dubbel" zijn (kolom `status` in Resultaten). Alle admin-acties gaan via GET op het Apps Script (`actie=login|groep|rij`).
- **v2 (adaptief, in test op `rode-wijn-v2.html` / `witte-wijn-v2.html`, niet in het menu):** vaste basisronde van 8 vragen, daarna kiest SommelAI telkens de vraag (extra of duel) die de koplopers het best scheidt. Duels tellen dubbel. Stopt bij 3 punten voorsprong, na 20 vragen, of op "Genoeg". Zekerheid = 50% + 12,5% per punt voorsprong. Gesimuleerd: mediaan 10–11 vragen, juiste druif vaker dan v1. Zodra de sommeliers de vragen goedkeuren: v1-pagina's op `data-mode="v2"` zetten.
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
- Oude WordPress-site (dewijnproeverij.wordpress.com) vervangen door verwijsbericht; Google Maps en Instagram naar het nieuwe adres laten wijzen.
- Later eventueel: Cal.com-boeking met betaling.
