/* Group overview: fetches the rows of one group from the Apps Script endpoint
   and sums the ranking points (4,3,2,1,0 per person) — the same method as the
   old spreadsheet — to recommend the two grapes for the tasting. */
(function () {
  const cfg = window.SITE_CONFIG || {};
  const el = document.getElementById('overview');
  const params = new URLSearchParams(location.search);
  const code = (params.get('code') || '').toLowerCase();
  const key = params.get('key') || '';
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  if (!cfg.resultsEndpoint) { el.innerHTML = '<p>Er is nog geen resultaten-endpoint ingesteld in <code>assets/config.js</code>. Zie <code>apps-script/README.md</code>.</p>'; return; }
  if (!key) { el.innerHTML = '<p>Deze pagina is enkel voor de organisatoren. Open ze via de link met je sleutel: <code>groep.html?code=…&amp;key=…</code></p>'; return; }

  el.innerHTML = '<p>Resultaten ophalen…</p>';
  fetch(`${cfg.resultsEndpoint}?code=${encodeURIComponent(code)}&key=${encodeURIComponent(key)}`)
    .then(r => r.json())
    .then(d => {
      if (!d.ok) { el.innerHTML = `<p>Ophalen mislukt: ${esc(d.error || 'onbekende fout')}.</p>`; return; }
      if (!d.rows.length) { el.innerHTML = `<p>Nog geen resultaten${code ? ' voor de groep <strong>' + esc(code) + '</strong>' : ''}. Stuur de quizlink door en kom straks terug.</p>`; return; }
      render(d.rows);
    })
    .catch(e => { el.innerHTML = `<p>Ophalen mislukt (${esc(e.message)}). Controleer de sleutel en of de web-app geïmplementeerd is voor "Iedereen".</p>`; });

  function block(kind, rows) {
    const grapes = window.QUIZ_DATA[kind === 'rood' ? 'red' : 'white'].grapes;
    const totals = {}, wins = {}, raw = {};
    grapes.forEach(g => { totals[g] = 0; wins[g] = 0; raw[g] = 0; });
    rows.forEach(r => grapes.forEach(g => { totals[g] += Number(r.punten[g] || 0); raw[g] += Number(r.scores[g] || 0); if (String(r.winnaar).split(' / ').includes(g)) wins[g]++; }));
    const ranked = grapes.slice().sort((a, b) => totals[b] - totals[a] || raw[b] - raw[a]);
    const max = Math.max(1, ...ranked.map(g => totals[g]));
    return `
      <section class="group-block ${kind}">
        <h2>${kind === 'rood' ? 'Rode wijn' : 'Witte wijn'} · ${rows.length} ${rows.length === 1 ? 'persoon' : 'personen'}</h2>
        <p class="pick">Koop: <strong>${esc(ranked[0])}</strong> en <strong>${esc(ranked[1])}</strong></p>
        <ul class="scores" aria-label="Totaal punten per druif">
          ${ranked.map((g, i) => `<li class="${i < 2 ? 'top' : ''}"><span>${esc(g)}</span><span class="bar"><span style="width:${Math.round(totals[g] / max * 100)}%"></span></span><span class="n">${totals[g]}</span></li>`).join('')}
        </ul>
        <p class="note">Punten = som van de rangpunten per persoon (4 voor de eerste druif, 3 voor de tweede, 2, 1, 0; gelijke scores delen). Winnaar bij: ${ranked.map(g => `${esc(g)} ${wins[g]}×`).join(', ')}.</p>
        <div class="table-wrap"><table>
          <thead><tr><th>Naam</th><th>Winnaar</th><th>Zekerheid</th>${grapes.map(g => `<th>${esc(g)}</th>`).join('')}<th>E-mail</th><th>Datum</th></tr></thead>
          <tbody>${rows.map(r => `<tr><td>${esc(r.naam)}</td><td>${esc(r.winnaar)}</td><td>${esc(r.zekerheid)}%</td>${grapes.map(g => `<td>${esc(r.scores[g] ?? '')} <small>(${esc(r.punten[g] ?? '')})</small></td>`).join('')}<td>${esc(r.email)}</td><td>${esc(String(r.datum).slice(0, 10))}</td></tr>`).join('')}</tbody>
        </table></div>
      </section>`;
  }

  function render(rows) {
    const red = rows.filter(r => r.kleur === 'rood'), white = rows.filter(r => r.kleur === 'wit');
    el.innerHTML = `
      <p class="lead">${code ? `Groep <strong>${esc(code)}</strong>` : 'Alle resultaten'} · ${rows.length} ${rows.length === 1 ? 'resultaat' : 'resultaten'}</p>
      ${red.length ? block('rood', red) : ''}
      ${white.length ? block('wit', white) : ''}
      <p><button class="btn btn-ghost" id="csv" type="button">Download als CSV</button></p>`;
    document.getElementById('csv').addEventListener('click', () => {
      const cols = ['datum', 'kleur', 'groep', 'naam', 'email', 'winnaar', 'zekerheid'];
      const grapes = [...window.QUIZ_DATA.red.grapes, ...window.QUIZ_DATA.white.grapes];
      const lines = [[...cols, ...grapes.map(g => 'score ' + g), ...grapes.map(g => 'punten ' + g)].join(';')];
      rows.forEach(r => lines.push([...cols.map(c => r[c]), ...grapes.map(g => r.scores[g] ?? ''), ...grapes.map(g => r.punten[g] ?? '')].map(v => '"' + String(v ?? '').replace(/"/g, '""') + '"').join(';')));
      const a = document.createElement('a');
      a.href = URL.createObjectURL(new Blob(['﻿' + lines.join('\n')], { type: 'text/csv;charset=utf-8' }));
      a.download = `sommelai-${code || 'alles'}.csv`; a.click();
    });
  }
})();
