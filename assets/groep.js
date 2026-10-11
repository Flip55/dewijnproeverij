/* Group overview — one page, two faces.
   Public (groep.html?code=…): "nog bezig" until the group is done, then the group's
   top-2 grapes and everyone's winner grape. No e-mail addresses.
   Organisers (logged in with their key, kept in localStorage): everything, plus
   expected head-count, done/open switch and marking doubles.
   Points: ranking points per person (4,3,2,1,0) summed — the old spreadsheet method. */
(function () {
  const cfg = window.SITE_CONFIG || {};
  const el = document.getElementById('overview');
  const params = new URLSearchParams(location.search);
  const code = (params.get('code') || '').toLowerCase().replace(/[^a-z0-9-]/g, '').slice(0, 40);
  const STORE = 'sommelai-admin';
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const cap = s => s ? s.charAt(0).toUpperCase() + s.slice(1) : '';
  let admin = null; // { naam, key }
  try { admin = JSON.parse(localStorage.getItem(STORE) || 'null'); } catch (e) { admin = null; }

  if (!cfg.resultsEndpoint) { el.innerHTML = '<p>Er is nog geen resultaten-endpoint ingesteld in <code>assets/config.js</code>. Zie <code>apps-script/README.md</code>.</p>'; return; }

  function api(q) {
    const u = new URL(cfg.resultsEndpoint);
    if (code) u.searchParams.set('code', code);
    if (admin && admin.key) u.searchParams.set('key', admin.key);
    Object.keys(q || {}).forEach(k => u.searchParams.set(k, q[k]));
    return fetch(u.toString()).then(r => r.json());
  }

  function busy(msg) { el.innerHTML = `<p>${esc(msg || 'Resultaten ophalen…')}</p>`; }

  function fail(msg) {
    el.innerHTML = `<p>Ophalen mislukt: ${esc(msg)}.</p>${admin ? '<p><button class="btn btn-ghost" type="button" id="logout">Uitloggen</button></p>' : ''}`;
    const b = document.getElementById('logout'); if (b) b.addEventListener('click', logout);
  }

  function login(naam, key) {
    busy('Even kijken wie je bent…');
    admin = { naam, key };
    return api({ actie: 'login' }).then(d => {
      if (!d.ok || !d.admin) { admin = null; localStorage.removeItem(STORE); loginFailed = true; return false; }
      admin = { naam: d.admin, key };
      localStorage.setItem(STORE, JSON.stringify(admin));
      return true;
    }).catch(() => { admin = null; return false; });
  }

  function logout() { admin = null; localStorage.removeItem(STORE); load(); }

  let loginFailed = false;

  function load(q) {
    if (!code && !admin) {
      el.innerHTML = `<p>Deze pagina toont de resultaten van één groep. Open ze via de link van je organisator: <code>groep.html?code=…</code></p>${loginFoot()}`;
      wireLogin();
      return;
    }
    busy();
    api(q).then(d => {
      if (!d.ok) {
        if (/sleutel/i.test(d.error || '') && admin) { admin = null; localStorage.removeItem(STORE); return load(); }
        return fail(d.error || 'onbekende fout');
      }
      d.admin ? renderAdmin(d) : renderPublic(d);
    }).catch(e => fail(e.message + '. Controleer of de web-app geïmplementeerd is voor "Iedereen"'));
  }

  // old-style link with the key in the URL: log in with it and clean the address bar
  const urlKey = params.get('key');
  if (urlKey) {
    params.delete('key');
    history.replaceState(null, '', location.pathname + (params.toString() ? '?' + params.toString() : ''));
    login('', urlKey).then(load);
  } else {
    load();
  }

  /* ---------- shared pieces ---------- */

  function totals(kind, rows) {
    const grapes = window.QUIZ_DATA[kind === 'rood' ? 'red' : 'white'].grapes;
    const tot = {}, wins = {}, raw = {};
    grapes.forEach(g => { tot[g] = 0; wins[g] = 0; raw[g] = 0; });
    rows.forEach(r => grapes.forEach(g => { tot[g] += Number(r.punten[g] || 0); raw[g] += Number(r.scores[g] || 0); if (String(r.winnaar).split(' / ').includes(g)) wins[g]++; }));
    const ranked = grapes.slice().sort((a, b) => tot[b] - tot[a] || raw[b] - raw[a]);
    return { grapes, tot, wins, ranked, max: Math.max(1, ...ranked.map(g => tot[g])) };
  }

  function blockHead(kind, rows, t, full) {
    return `
      <h2>${kind === 'rood' ? 'Rode wijn' : 'Witte wijn'} · ${rows.length} ${rows.length === 1 ? 'persoon' : 'personen'}</h2>
      <p class="pick">${full ? 'Koop' : 'Op tafel'}: <strong>${esc(t.ranked[0])}</strong> en <strong>${esc(t.ranked[1])}</strong></p>
      <ul class="scores" aria-label="Totaal punten per druif">
        ${t.ranked.map((g, i) => `<li class="${i < 2 ? 'top' : ''}"><span>${esc(g)}</span><span class="bar"><span style="width:${Math.round(t.tot[g] / t.max * 100)}%"></span></span><span class="n">${t.tot[g]}</span></li>`).join('')}
      </ul>
      <p class="note">${full
        ? `Punten = som van de rangpunten per persoon (4 voor de eerste druif, 3 voor de tweede, 2, 1, 0; gelijke scores delen). Winnaar bij: ${t.ranked.map(g => `${esc(g)} ${t.wins[g]}×`).join(', ')}.`
        : 'Elke persoon geeft 4 punten aan zijn favoriete druif, 3 aan de tweede, en zo verder. Alles opgeteld: dit is wat jullie groep lekker vindt.'}</p>`;
  }

  /* ---------- public view ---------- */

  function renderPublic(d) {
    const g = d.groep || { status: 'open', verwacht: 0, aantal: 0 };
    const title = `<p class="lead">Groep <strong>${esc(code)}</strong></p>`;
    if (g.status !== 'klaar') {
      const n = g.aantal, v = g.verwacht;
      const line = v ? `Al <strong>${n} van de ${v}</strong> ${v === 1 ? 'heeft' : 'hebben'} de smaaktest gedaan.` : (n ? `Al <strong>${n}</strong> ${n === 1 ? 'iemand' : 'mensen'} ${n === 1 ? 'heeft' : 'hebben'} de smaaktest gedaan.` : 'Nog niemand heeft de smaaktest gedaan.');
      el.innerHTML = `${title}
        <div class="group-block">
          <h2>Nog even geduld…</h2>
          <p>${line} Zodra iedereen klaar is (of de organisatoren op de knop duwen) verschijnt hier welke druiven er op tafel komen.</p>
          <p>Nog niet gedaan? <a href="smaaktest.html?groep=${encodeURIComponent(code)}">Doe de smaaktest</a> — duurt twee minuten.</p>
        </div>${loginFoot()}`;
      wireLogin();
      return;
    }
    const red = d.rows.filter(r => r.kleur === 'rood'), white = d.rows.filter(r => r.kleur === 'wit');
    const block = (kind, rows) => {
      const t = totals(kind, rows);
      return `<section class="group-block ${kind}">${blockHead(kind, rows, t, false)}
        <div class="table-wrap"><table>
          <thead><tr><th>Naam</th><th>Druif</th><th>Zekerheid</th></tr></thead>
          <tbody>${rows.map(r => `<tr><td>${esc(r.naam)}</td><td>${esc(r.winnaar)}</td><td>${esc(r.zekerheid)}%</td></tr>`).join('')}</tbody>
        </table></div></section>`;
    };
    el.innerHTML = `${title}
      <p>Iedereen heeft gesproken. Dit zijn de druiven die jullie samen het liefst drinken — die zetten we op tafel.</p>
      ${red.length ? block('rood', red) : ''}
      ${white.length ? block('wit', white) : ''}
      ${!d.rows.length ? '<p>Hm, geen resultaten gevonden voor deze groep.</p>' : ''}
      ${loginFoot()}`;
    wireLogin();
  }

  function loginFoot() {
    const open = loginFailed; loginFailed = false;
    return `<p class="note" style="margin-top:3rem"${open ? ' hidden' : ''}><a href="#" id="showLogin">Organisator? Log in.</a></p>
      <form class="form admin-login" id="loginForm"${open ? '' : ' hidden'} style="max-width:420px">
        <label>Je naam<input type="text" name="naam" autocomplete="username" placeholder="nick, flip of tim"></label>
        <label>Je sleutel<input type="password" name="key" autocomplete="current-password" required></label>
        <p class="note"${open ? '' : ' hidden'}>Die sleutel klopt niet. Probeer nog eens.</p>
        <p><button class="btn btn-dark" type="submit">Inloggen</button></p>
      </form>`;
  }

  function wireLogin() {
    const a = document.getElementById('showLogin'), f = document.getElementById('loginForm');
    if (!a || !f) return;
    a.addEventListener('click', e => { e.preventDefault(); f.hidden = false; a.parentElement.hidden = true; f.querySelector('input[name=key]').focus(); });
    f.addEventListener('submit', e => {
      e.preventDefault();
      const naam = f.naam.value.trim().toLowerCase(), key = f.key.value.trim();
      login(naam, key).then(() => load());
    });
  }

  /* ---------- organiser view ---------- */

  function renderAdmin(d) {
    const rows = d.rows, g = d.groep;
    const live = rows.filter(r => r.status !== 'dubbel');
    const red = live.filter(r => r.kleur === 'rood'), white = live.filter(r => r.kleur === 'wit');
    const shareUrl = code ? `${location.origin}${location.pathname}?code=${encodeURIComponent(code)}` : '';
    const quizUrl = code ? `${location.origin}/smaaktest.html?groep=${encodeURIComponent(code)}` : '';

    const panel = !code ? '' : `
      <section class="group-block admin-panel">
        <h2>Groep ${esc(code)} · ${g.status === 'klaar' ? '✅ klaar' : '⏳ bezig'}</h2>
        <p class="pick"><strong>${g.aantal}</strong> van de <strong>${g.verwacht || '?'}</strong> ${g.verwacht === 1 ? 'heeft' : 'hebben'} de test gedaan${rows.length > live.length ? ` <small>(+ ${rows.length - live.length} dubbel)</small>` : ''}.</p>
        <form class="form admin-form" id="groupForm">
          <label>Aantal deelnemers<input type="number" name="verwacht" min="0" max="99" value="${g.verwacht || ''}" placeholder="bv. 8" style="max-width:8rem"></label>
          <p>
            <button class="btn btn-ghost" type="submit">Aantal bewaren</button>
            <button class="btn ${g.status === 'klaar' ? 'btn-ghost' : 'btn-dark'}" type="button" id="toggle">${g.status === 'klaar' ? 'Terug openzetten' : 'Klaar — deel de resultaten'}</button>
          </p>
        </form>
        <p class="note">Zet het aantal deelnemers en de groep springt vanzelf op "klaar" zodra iedereen de test deed. Deelnemers zien ondertussen alleen "nog even geduld".</p>
        <p class="note">Quizlink voor de groep: <a href="${quizUrl}">${esc(quizUrl)}</a> <button class="btn btn-ghost btn-small" type="button" data-copy="${esc(quizUrl)}">Kopieer</button><br>
        Resultatenlink voor de groep: <a href="${shareUrl}">${esc(shareUrl)}</a> <button class="btn btn-ghost btn-small" type="button" data-copy="${esc(shareUrl)}">Kopieer</button></p>
      </section>`;

    const block = (kind, kindRows) => {
      const t = totals(kind, kindRows);
      const allKind = rows.filter(r => r.kleur === kind);
      return `<section class="group-block ${kind}">${blockHead(kind, kindRows, t, true)}
        <div class="table-wrap"><table>
          <thead><tr><th>Naam</th><th>Winnaar</th><th>Zekerheid</th>${t.grapes.map(g => `<th>${esc(g)}</th>`).join('')}<th>E-mail</th><th>Datum</th><th></th></tr></thead>
          <tbody>${allKind.map(r => `<tr class="${r.status === 'dubbel' ? 'dubbel' : ''}"><td>${esc(r.naam)}</td><td>${esc(r.winnaar)}</td><td>${esc(r.zekerheid)}%</td>${t.grapes.map(g => `<td>${esc(r.scores[g] ?? '')} <small>(${esc(r.punten[g] ?? '')})</small></td>`).join('')}<td>${esc(r.email)}</td><td>${esc(String(r.datum).slice(0, 10))}</td><td><button class="btn btn-ghost btn-small" type="button" data-rij="${r.rij}" data-status="${r.status === 'dubbel' ? '' : 'dubbel'}">${r.status === 'dubbel' ? 'Telt weer mee' : 'Dubbel'}</button></td></tr>`).join('')}</tbody>
        </table></div></section>`;
    };

    el.innerHTML = `
      <p class="lead">${code ? `Groep <strong>${esc(code)}</strong>` : 'Alle resultaten'} · ${rows.length} ${rows.length === 1 ? 'resultaat' : 'resultaten'}
        <small class="note" style="display:block">Ingelogd als ${esc(cap(d.admin))} · <a href="#" id="logout">uitloggen</a></small></p>
      ${panel}
      ${red.length ? block('rood', red) : ''}
      ${white.length ? block('wit', white) : ''}
      ${!rows.length ? `<p>Nog geen resultaten${code ? ' voor deze groep' : ''}. Stuur de quizlink door en kom straks terug.</p>` : '<p><button class="btn btn-ghost" id="csv" type="button">Download als CSV</button></p>'}`;

    document.getElementById('logout').addEventListener('click', e => { e.preventDefault(); logout(); });
    const gf = document.getElementById('groupForm');
    if (gf) {
      gf.addEventListener('submit', e => { e.preventDefault(); load({ actie: 'groep', verwacht: gf.verwacht.value || 0 }); });
      document.getElementById('toggle').addEventListener('click', () => load({ actie: 'groep', status: g.status === 'klaar' ? 'open' : 'klaar' }));
    }
    el.querySelectorAll('[data-rij]').forEach(b => b.addEventListener('click', () => load({ actie: 'rij', rij: b.dataset.rij, status: b.dataset.status })));
    el.querySelectorAll('[data-copy]').forEach(b => b.addEventListener('click', () => {
      navigator.clipboard.writeText(b.dataset.copy).then(() => { b.textContent = 'Gekopieerd!'; setTimeout(() => b.textContent = 'Kopieer', 1500); });
    }));
    const csv = document.getElementById('csv');
    if (csv) csv.addEventListener('click', () => {
      const cols = ['datum', 'kleur', 'groep', 'naam', 'email', 'winnaar', 'zekerheid', 'status'];
      const grapes = [...window.QUIZ_DATA.red.grapes, ...window.QUIZ_DATA.white.grapes];
      const lines = [[...cols, ...grapes.map(g => 'score ' + g), ...grapes.map(g => 'punten ' + g)].join(';')];
      rows.forEach(r => lines.push([...cols.map(c => r[c]), ...grapes.map(g => r.scores[g] ?? ''), ...grapes.map(g => r.punten[g] ?? '')].map(v => '"' + String(v ?? '').replace(/"/g, '""') + '"').join(';')));
      const a = document.createElement('a');
      a.href = URL.createObjectURL(new Blob(['﻿' + lines.join('\n')], { type: 'text/csv;charset=utf-8' }));
      a.download = `sommelai-${code || 'alles'}.csv`; a.click();
    });
  }
})();
