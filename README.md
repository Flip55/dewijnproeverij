# De wijnproeverij

Website van De wijnproeverij — wijnproeverij aan huis, regio Gent. Statische site, gehost op GitHub Pages.

- `index.html` … de pagina's
- `assets/style.css` — alle stijlen
- `assets/quiz-data.js` — de vragen en druifscores van de SommelAI smaaktest (rood & wit)
- `assets/quiz.js` — de quizlogica (+1 per gekoppelde druif, hoogste score wint, zekerheid = score / aantal vragen)

Een vraag aanpassen? Bewerk `assets/quiz-data.js`. Elke optie heeft een tekst `t` en een lijst druiven `g` die een punt krijgen.
