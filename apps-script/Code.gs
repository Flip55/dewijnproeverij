/**
 * De wijnproeverij — resultaten van de SommelAI smaaktest bewaren in Google Sheets.
 *
 * Installatie: zie README.md in deze map.
 * - doPost: de quiz stuurt elk resultaat hierheen -> één rij per persoon in het tabblad "Resultaten".
 * - doGet:  de groepspagina haalt de resultaten van één groep op.
 *     zonder sleutel: publiek (status van de groep; de resultaten pas als de groep "klaar" is, zonder e-mails)
 *     met sleutel:    organisatoren (alles, plus acties: groep instellen, rij als dubbel markeren)
 */

// Eén sleutel per organisator (letters en cijfers). Vul in en implementeer opnieuw; nooit in de repo zetten.
const ADMINS = {
  nick: 'VERANDER-DIT',
  flip: 'VERANDER-DIT',
  tim: 'VERANDER-DIT'
};

const SHEET_NAME = 'Resultaten';
const GROUPS_SHEET = 'Groepen';

const HEADERS = [
  'datum', 'kleur', 'groep', 'naam', 'email', 'nieuws', 'winnaar', 'zekerheid',
  // rood
  'score Cabernet Sauvignon', 'score Pinot Noir', 'score Malbec', 'score Syrah', 'score Primitivo',
  'punten Cabernet Sauvignon', 'punten Pinot Noir', 'punten Malbec', 'punten Syrah', 'punten Primitivo',
  // wit
  'score Chardonnay', 'score Sauvignon Blanc', 'score Pinot Gris', 'score Riesling', 'score Gewürztraminer',
  'punten Chardonnay', 'punten Sauvignon Blanc', 'punten Pinot Gris', 'punten Riesling', 'punten Gewürztraminer',
  'antwoorden', 'url',
  'status' // leeg of 'dubbel' (telt dan niet mee)
];
const GROUP_HEADERS = ['code', 'verwacht', 'status', 'door', 'aangemaakt', 'gewijzigd', 'autoklaar'];

function sheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
    sh.appendRow(HEADERS);
    sh.setFrozenRows(1);
  }
  // kolom 'status' toevoegen aan een bestaande sheet
  const last = Math.max(1, sh.getLastColumn());
  const headers = sh.getRange(1, 1, 1, last).getValues()[0];
  if (headers.indexOf('status') < 0) sh.getRange(1, last + 1).setValue('status');
  return sh;
}

function groupsSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(GROUPS_SHEET);
  if (!sh) {
    sh = ss.insertSheet(GROUPS_SHEET);
    sh.appendRow(GROUP_HEADERS);
    sh.setFrozenRows(1);
  }
  return sh;
}

function out_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function adminFor_(key) {
  if (!key) return '';
  return Object.keys(ADMINS).find(n => ADMINS[n] && ADMINS[n] === key) || '';
}

function doPost(e) {
  try {
    const d = JSON.parse(e.postData.contents);
    const sc = d.scores || {}, pt = d.punten || {};
    const row = [
      new Date(), d.kleur || '', String(d.groep || '').toLowerCase(), d.naam || '', d.email || '', d.nieuws ? 'ja' : 'nee',
      d.winnaar || '', d.zekerheid || '',
      sc['Cabernet Sauvignon'] ?? '', sc['Pinot Noir'] ?? '', sc['Malbec'] ?? '', sc['Syrah'] ?? '', sc['Primitivo'] ?? '',
      pt['Cabernet Sauvignon'] ?? '', pt['Pinot Noir'] ?? '', pt['Malbec'] ?? '', pt['Syrah'] ?? '', pt['Primitivo'] ?? '',
      sc['Chardonnay'] ?? '', sc['Sauvignon Blanc'] ?? '', sc['Pinot Gris'] ?? '', sc['Riesling'] ?? '', sc['Gewürztraminer'] ?? '',
      pt['Chardonnay'] ?? '', pt['Sauvignon Blanc'] ?? '', pt['Pinot Gris'] ?? '', pt['Riesling'] ?? '', pt['Gewürztraminer'] ?? '',
      JSON.stringify(d.antwoorden || {}), d.url || '', ''
    ];
    sheet_().appendRow(row);
    return out_({ ok: true });
  } catch (err) {
    return out_({ ok: false, error: String(err) });
  }
}

function doGet(e) {
  try {
    const p = e.parameter || {};
    const code = String(p.code || '').toLowerCase().replace(/[^a-z0-9-]/g, '').slice(0, 40);
    const admin = adminFor_(p.key);
    const actie = String(p.actie || '');

    if (p.key && !admin) return out_({ ok: false, error: 'Verkeerde sleutel' });
    if (actie === 'login') return out_({ ok: true, admin });

    if (actie === 'groep') {
      if (!admin) return out_({ ok: false, error: 'Enkel voor organisatoren' });
      if (!code) return out_({ ok: false, error: 'Geen groepscode' });
      setGroup_(code, admin, p);
    }
    if (actie === 'rij') {
      if (!admin) return out_({ ok: false, error: 'Enkel voor organisatoren' });
      const rij = Number(p.rij);
      const sh = sheet_();
      if (!(rij >= 2 && rij <= sh.getLastRow())) return out_({ ok: false, error: 'Onbekende rij' });
      const col = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0].indexOf('status') + 1;
      sh.getRange(rij, col).setValue(p.status === 'dubbel' ? 'dubbel' : '');
    }

    const all = readRows_();
    let rows = all.filter(r => code === '' || r.groep === code);
    if (!admin && !code) return out_({ ok: false, error: 'Geen groepscode' });

    const groep = code ? getGroup_(code) : null;
    const aantal = rows.filter(r => r.status !== 'dubbel').length;
    if (groep) {
      groep.aantal = aantal;
      // automatisch klaar zodra iedereen de test deed — één keer; wie terug openzet, blijft open
      // (tot een organisator het aantal deelnemers opnieuw instelt)
      if (groep.status !== 'klaar' && !groep.autoklaar && groep.verwacht > 0 && aantal >= groep.verwacht) {
        groep.status = 'klaar';
        setGroup_(code, admin || 'auto', { status: 'klaar', autoklaar: 'ja' });
      }
    }

    if (admin) return out_({ ok: true, code, admin, groep, rows });

    // publiek: enkel status; de resultaten pas als de groep klaar is, en zonder e-mailadressen
    const publiek = groep ? { status: groep.status, verwacht: groep.verwacht, aantal } : { status: 'open', verwacht: 0, aantal };
    if (publiek.status !== 'klaar') return out_({ ok: true, code, groep: publiek, rows: [] });
    return out_({
      ok: true, code, groep: publiek,
      rows: rows.filter(r => r.status !== 'dubbel').map(r => ({ kleur: r.kleur, naam: r.naam, winnaar: r.winnaar, zekerheid: r.zekerheid, scores: r.scores, punten: r.punten }))
    });
  } catch (err) {
    return out_({ ok: false, error: String(err) });
  }
}

function readRows_() {
  const sh = sheet_();
  const values = sh.getDataRange().getValues();
  const headers = values.shift();
  return values.map((r, i) => {
    const o = Object.fromEntries(headers.map((h, j) => [h, r[j]]));
    return {
      rij: i + 2, datum: o.datum, kleur: o.kleur, groep: String(o.groep || '').toLowerCase(), naam: o.naam, email: o.email,
      winnaar: o.winnaar, zekerheid: o.zekerheid, status: String(o.status || ''),
      scores: pick_(o, 'score '), punten: pick_(o, 'punten '), antwoorden: safeJson_(o.antwoorden)
    };
  });
}

function getGroup_(code) {
  const sh = groupsSheet_();
  const values = sh.getDataRange().getValues();
  const headers = values.shift();
  const row = values.find(r => String(r[0]).toLowerCase() === code);
  if (!row) return { code, verwacht: 0, status: 'open', door: '', autoklaar: false };
  const o = Object.fromEntries(headers.map((h, j) => [h, row[j]]));
  return { code, verwacht: Number(o.verwacht) || 0, status: o.status === 'klaar' ? 'klaar' : 'open', door: o.door || '', autoklaar: o.autoklaar === 'ja' };
}

function setGroup_(code, admin, p) {
  const sh = groupsSheet_();
  const values = sh.getDataRange().getValues();
  const idx = values.findIndex((r, i) => i > 0 && String(r[0]).toLowerCase() === code);
  const now = new Date();
  if (idx < 0) {
    sh.appendRow([code, Number(p.verwacht) || 0, p.status === 'klaar' ? 'klaar' : 'open', admin, now, now, p.autoklaar || '']);
    return;
  }
  const r = idx + 1;
  if (p.verwacht !== undefined) { sh.getRange(r, 2).setValue(Number(p.verwacht) || 0); sh.getRange(r, 7).setValue(''); }
  if (p.status !== undefined) sh.getRange(r, 3).setValue(p.status === 'klaar' ? 'klaar' : 'open');
  if (p.autoklaar !== undefined) sh.getRange(r, 7).setValue(p.autoklaar);
  sh.getRange(r, 6).setValue(now);
}

function pick_(r, prefix) {
  const o = {};
  Object.keys(r).forEach(k => { if (k.startsWith(prefix) && r[k] !== '') o[k.slice(prefix.length)] = Number(r[k]); });
  return o;
}
function safeJson_(s) { try { return JSON.parse(s); } catch (e) { return {}; } }
