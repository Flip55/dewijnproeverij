/**
 * De wijnproeverij — resultaten van de SommelAI smaaktest bewaren in Google Sheets.
 *
 * Installatie: zie README.md in deze map.
 * - doPost: de quiz stuurt elk resultaat hierheen -> één rij per persoon in het tabblad "Resultaten".
 * - doGet:  de groepspagina haalt de resultaten van één groep op (beveiligd met ADMIN_KEY).
 */

const ADMIN_KEY = 'VERANDER-DIT-WACHTWOORD'; // kies zelf iets, en gebruik het in de link van groep.html
const SHEET_NAME = 'Resultaten';

const HEADERS = [
  'datum', 'kleur', 'groep', 'naam', 'email', 'nieuws', 'winnaar', 'zekerheid',
  // rood
  'score Cabernet Sauvignon', 'score Pinot Noir', 'score Malbec', 'score Syrah', 'score Primitivo',
  'punten Cabernet Sauvignon', 'punten Pinot Noir', 'punten Malbec', 'punten Syrah', 'punten Primitivo',
  // wit
  'score Chardonnay', 'score Sauvignon Blanc', 'score Pinot Gris', 'score Riesling', 'score Gewürztraminer',
  'punten Chardonnay', 'punten Sauvignon Blanc', 'punten Pinot Gris', 'punten Riesling', 'punten Gewürztraminer',
  'antwoorden', 'url'
];

function sheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
    sh.appendRow(HEADERS);
    sh.setFrozenRows(1);
  }
  return sh;
}

function doPost(e) {
  try {
    const d = JSON.parse(e.postData.contents);
    const sc = d.scores || {}, pt = d.punten || {};
    const row = [
      new Date(), d.kleur || '', d.groep || '', d.naam || '', d.email || '', d.nieuws ? 'ja' : 'nee',
      d.winnaar || '', d.zekerheid || '',
      sc['Cabernet Sauvignon'] ?? '', sc['Pinot Noir'] ?? '', sc['Malbec'] ?? '', sc['Syrah'] ?? '', sc['Primitivo'] ?? '',
      pt['Cabernet Sauvignon'] ?? '', pt['Pinot Noir'] ?? '', pt['Malbec'] ?? '', pt['Syrah'] ?? '', pt['Primitivo'] ?? '',
      sc['Chardonnay'] ?? '', sc['Sauvignon Blanc'] ?? '', sc['Pinot Gris'] ?? '', sc['Riesling'] ?? '', sc['Gewürztraminer'] ?? '',
      pt['Chardonnay'] ?? '', pt['Sauvignon Blanc'] ?? '', pt['Pinot Gris'] ?? '', pt['Riesling'] ?? '', pt['Gewürztraminer'] ?? '',
      JSON.stringify(d.antwoorden || {}), d.url || ''
    ];
    sheet_().appendRow(row);
    return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  const p = e.parameter || {};
  const out = (obj) => ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
  if (p.key !== ADMIN_KEY) return out({ ok: false, error: 'Verkeerde sleutel' });
  const code = String(p.code || '').toLowerCase();
  const sh = sheet_();
  const values = sh.getDataRange().getValues();
  const headers = values.shift();
  const rows = values
    .map(r => Object.fromEntries(headers.map((h, i) => [h, r[i]])))
    .filter(r => code === '' || String(r.groep).toLowerCase() === code)
    .map(r => ({
      datum: r.datum, kleur: r.kleur, groep: r.groep, naam: r.naam, email: r.email, winnaar: r.winnaar, zekerheid: r.zekerheid,
      scores: pick_(r, 'score '), punten: pick_(r, 'punten '), antwoorden: safeJson_(r.antwoorden)
    }));
  return out({ ok: true, code, rows });
}

function pick_(r, prefix) {
  const o = {};
  Object.keys(r).forEach(k => { if (k.startsWith(prefix) && r[k] !== '') o[k.slice(prefix.length)] = Number(r[k]); });
  return o;
}
function safeJson_(s) { try { return JSON.parse(s); } catch (e) { return {}; } }
