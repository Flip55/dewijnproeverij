# Quizresultaten bewaren in Google Sheets

Eenmalige installatie, ongeveer vijf minuten.

1. Maak een nieuwe Google Sheet (bv. "SommelAI resultaten") in je Google Drive.
2. Ga in de sheet naar **Extensies → Apps Script**.
3. Verwijder de voorbeeldcode en plak de volledige inhoud van `Code.gs`.
4. Verander bovenaan `ADMIN_KEY` in een eigen wachtwoord (letters en cijfers). Dit is de sleutel van de groepspagina.
5. Klik op **Implementeren → Nieuwe implementatie**.
   - Type: **Web-app**
   - Uitvoeren als: **Ik**
   - Wie heeft toegang: **Iedereen**
   - Klik **Implementeren** en geef de gevraagde toestemmingen (één keer).
6. Kopieer de **web-app-URL** (eindigt op `/exec`) en zet ze in `assets/config.js` bij `resultsEndpoint`.

Klaar. Vanaf dan verschijnt elke ingevulde quiz als een rij in het tabblad "Resultaten".

## Een groep aanmaken

Er valt niets aan te maken: kies een code (kleine letters, cijfers en streepjes) en stuur de link door.

- Rood: `https://JOUWDOMEIN/rode-wijn.html?groep=verjaardag-tim`
- Wit: `https://JOUWDOMEIN/witte-wijn.html?groep=verjaardag-tim`

Het overzicht van de groep (enkel voor jullie):

`https://JOUWDOMEIN/groep.html?code=verjaardag-tim&key=JOUW-ADMIN-KEY`

Zonder `code` (dus `groep.html?key=…`) zie je alle resultaten.

## Aanpassen na een wijziging in Code.gs

Na elke aanpassing: **Implementeren → Implementaties beheren → potloodje → Versie: Nieuwe versie → Implementeren**. De URL blijft dezelfde.
