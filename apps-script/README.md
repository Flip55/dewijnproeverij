# Quizresultaten bewaren in Google Sheets

Eenmalige installatie, ongeveer vijf minuten.

1. Maak een nieuwe Google Sheet (bv. "SommelAI resultaten") in je Google Drive.
2. Ga in de sheet naar **Extensies → Apps Script**.
3. Verwijder de voorbeeldcode en plak de volledige inhoud van `Code.gs`.
4. Vul bovenaan in `ADMINS` voor Nick, Flip en Tim elk een eigen sleutel in (letters en cijfers). Daarmee log je in op de groepspagina. Zet die sleutels nergens anders neer.
5. Klik op **Implementeren → Nieuwe implementatie**.
   - Type: **Web-app**
   - Uitvoeren als: **Ik**
   - Wie heeft toegang: **Iedereen**
   - Klik **Implementeren** en geef de gevraagde toestemmingen (één keer).
6. Kopieer de **web-app-URL** (eindigt op `/exec`) en zet ze in `assets/config.js` bij `resultsEndpoint`.

Klaar. Vanaf dan verschijnt elke ingevulde quiz als een rij in het tabblad "Resultaten". Het tabblad "Groepen" (aantal deelnemers, status) maakt het script zelf aan.

## Een groep aanmaken

Er valt niets aan te maken: kies een code (kleine letters, cijfers en streepjes) en stuur de link door.

- Rood: `https://JOUWDOMEIN/rode-wijn.html?groep=verjaardag-tim`
- Wit: `https://JOUWDOMEIN/witte-wijn.html?groep=verjaardag-tim`

## De groepspagina

`https://JOUWDOMEIN/groep.html?code=verjaardag-tim` — één link, twee gezichten:

- **Deelnemers** zien "nog even geduld" (met hoeveel mensen al meededen) tot de groep klaar is. Daarna zien ze de top 2 druiven van de groep en per persoon de winnende druif. Nooit e-mailadressen.
- **Organisatoren** klikken onderaan op "Organisator? Log in." en geven hun naam en sleutel. De browser onthoudt dat (uitloggen kan altijd). Zij zien alles, en kunnen per groep:
  - het **aantal deelnemers** instellen — zodra iedereen de test deed springt de groep vanzelf op "klaar";
  - de groep handmatig op **klaar** zetten of terug openzetten (een heropende groep blijft open tot je het aantal opnieuw instelt);
  - een rij als **dubbel** markeren (telt niet meer mee, blijft in de sheet) of weer laten meetellen;
  - de quizlink en de resultatenlink kopiëren, en de resultaten als CSV downloaden.

Zonder `code` (dus gewoon `groep.html`, ingelogd) zie je alle resultaten. De oude link met `&key=…` werkt nog: hij logt je in en haalt de sleutel uit de adresbalk.

## Aanpassen na een wijziging in Code.gs

Na elke aanpassing: **Implementeren → Implementaties beheren → potloodje → Versie: Nieuwe versie → Implementeren**. De URL blijft dezelfde.
