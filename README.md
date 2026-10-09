# De wijnproeverij

Website van De wijnproeverij — wijnproeverij aan huis, regio Gent. Statische site, gehost op GitHub Pages.

- `index.html` … de pagina's
- `assets/style.css` — alle stijlen
- `assets/quiz-data.js` — de vragen en druifscores van de SommelAI smaaktest (rood & wit)
- `assets/quiz.js` — de quizlogica (+1 per gekoppelde druif, hoogste score wint, zekerheid = score / aantal vragen)

Een vraag aanpassen? Bewerk `assets/quiz-data.js`. Elke optie heeft een tekst `t` en een lijst druiven `g` die een punt krijgen.

## Instellingen

`assets/config.js` bevat de koppelingen met externe diensten:
- `formspree` — endpoint van het contactformulier (formspree.io)
- `resultsEndpoint` — Google Apps Script web-app die quizresultaten in een Google Sheet bewaart (zie `apps-script/README.md`)
- `contactEmail`

## Groepen

Stuur de quizlink met een groepscode door, bv. `rode-wijn.html?groep=verjaardag-tim`. Het overzicht staat op `groep.html?code=verjaardag-tim&key=…` (sleutel = `ADMIN_KEY` uit het Apps Script).
