/* SommelAI quiz — same logic as the original Landbot bots:
   every answer gives +1 to each grape linked to it; the grape with the
   highest score wins; "zekerheid" = score / number of questions.
   Ranking points per person (4,3,2,1,0 — ties share) are what the group
   overview sums to pick the two grapes for a tasting. */
(function () {
  const root = document.getElementById('quiz');
  const kind = root.dataset.kind; // 'rood' | 'wit'
  const data = window.QUIZ_DATA[kind === 'rood' ? 'red' : 'white'];
  const cfg = window.SITE_CONFIG || {};
  const stage = document.getElementById('stage');
  const bar = document.getElementById('bar');
  const questions = data.questions;
  const answers = {}; // question id -> option index
  const params = new URLSearchParams(location.search);
  const group = (params.get('groep') || '').trim().toLowerCase().replace(/[^a-z0-9-]/g, '').slice(0, 40);
  let name = '';
  let step = -1; // -1 = intro

  const ROBOT = '<svg viewBox="0 0 48 48" aria-hidden="true"><rect x="8" y="14" width="32" height="26" rx="7" fill="currentColor" opacity=".18"/><rect x="8" y="14" width="32" height="26" rx="7" fill="none" stroke="currentColor" stroke-width="2.5"/><circle cx="19" cy="26" r="3.2" fill="currentColor"/><circle cx="29" cy="26" r="3.2" fill="currentColor"/><path d="M18 34c2 2 10 2 12 0" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><path d="M24 14V8" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><circle cx="24" cy="6" r="2.5" fill="currentColor"/></svg>';
  const btnMain = kind === 'rood' ? 'btn-solid' : 'btn-dark';

  function h(html) { stage.innerHTML = html; }
  function esc(s) { return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
  function progress() {
    const done = Object.keys(answers).length;
    bar.style.width = (step < 0 ? 0 : Math.round((Math.min(done, questions.length) / questions.length) * 100)) + '%';
  }
  function top() { window.scrollTo({ top: 0, behavior: 'smooth' }); }

  function intro() {
    step = -1; progress();
    const colour = kind === 'rood' ? 'rode' : 'witte';
    const groupLine = group ? `<p class="qnum">Je doet de test voor de groep <strong>${esc(group)}</strong>. Je resultaat telt mee voor de keuze van de wijnen.</p>` : '';
    h(`
      <div class="bubble">${ROBOT}<p>Dag! Ik ben SommelAI, de robotwijnkenner van De wijnproeverij. Ik stel je ${questions.length} korte vragen en vertel je daarna welke ${colour} druif het beste bij jou past. Geen foute antwoorden, enkel eerlijke.</p></div>
      ${groupLine}
      <label for="name" class="sr-only">Je voornaam</label>
      <input type="text" id="name" placeholder="Hoe mag ik je noemen?" autocomplete="given-name" maxlength="40" value="${esc(name)}">
      <div class="start-row">
        <button class="btn ${btnMain}" id="start">Start de test</button>
        <a href="smaaktest.html${group ? '?groep=' + encodeURIComponent(group) : ''}" style="opacity:.8">Liever ${kind === 'rood' ? 'witte' : 'rode'} wijn?</a>
      </div>`);
    const input = document.getElementById('name');
    const go = () => { name = input.value.trim(); step = 0; show(); };
    document.getElementById('start').addEventListener('click', go);
    input.addEventListener('keydown', e => { if (e.key === 'Enter') go(); });
    input.focus();
  }

  function show() {
    if (step >= questions.length) return details();
    progress();
    const q = questions[step];
    const picked = answers[q.id];
    h(`
      <p class="qnum">Vraag ${step + 1} van ${questions.length}</p>
      <h2 id="qtitle" tabindex="-1">${esc(q.q)}</h2>
      <ul class="options" role="list">
        ${q.options.map((o, i) => `<li><button type="button" data-i="${i}" class="${picked === i ? 'picked' : ''}">${esc(o.t)}</button></li>`).join('')}
      </ul>
      <div class="toolbar">
        <button type="button" id="back">${step === 0 ? 'Terug naar het begin' : 'Vorige vraag'}</button>
        <span class="qnum">${name ? esc(name) + ', ' : ''}${step === questions.length - 1 ? 'laatste vraag!' : 'kies wat het meest bij je past.'}</span>
      </div>`);
    stage.querySelectorAll('.options button').forEach(b => b.addEventListener('click', () => {
      answers[q.id] = Number(b.dataset.i);
      stage.querySelectorAll('.options button').forEach(x => x.classList.remove('picked'));
      b.classList.add('picked');
      setTimeout(() => { step++; show(); }, 180);
    }));
    document.getElementById('back').addEventListener('click', () => { if (step === 0) intro(); else { step--; show(); } });
    top();
  }

  function compute() {
    const scores = {};
    data.grapes.forEach(g => scores[g] = 0);
    questions.forEach(q => { const o = q.options[answers[q.id]]; if (o) o.g.forEach(g => scores[g]++); });
    const ranked = data.grapes.slice().sort((a, b) => scores[b] - scores[a]);
    const points = {};
    data.grapes.forEach(g => { points[g] = Math.max(0, 4 - data.grapes.filter(x => scores[x] > scores[g]).length); });
    const topScore = scores[ranked[0]];
    return { scores, ranked, points, winner: ranked[0], ties: ranked.filter(g => scores[g] === topScore), runner: ranked.find(g => scores[g] < topScore), pct: Math.round((topScore / questions.length) * 1000) / 10 };
  }

  /* Name + e-mail before the reveal. Saving only happens when there is an
     endpoint; with a group code the row joins that group's overview. */
  function details() {
    progress();
    if (!cfg.resultsEndpoint) return result(null);
    const required = !!group;
    h(`
      <div class="bubble">${ROBOT}<p>Bijna klaar${name ? ', ' + esc(name) : ''}! ${group ? 'Laat je naam en e-mailadres achter zodat je resultaat meetelt voor de groep.' : 'Wil je je resultaat per mail en af en toe nieuws over onze proeverijen? Laat dan je e-mailadres achter. Mag ook niet.'}</p></div>
      <form id="details" class="form" style="max-width:420px">
        <label>Voornaam <input type="text" name="naam" id="dname" required maxlength="40" value="${esc(name)}" autocomplete="given-name"></label>
        <label>E-mail ${required ? '' : '<span class="qnum">(optioneel)</span>'}<input type="email" name="email" id="demail" ${required ? 'required' : ''} autocomplete="email"></label>
        ${group ? '' : '<label style="display:flex;gap:.6rem;align-items:flex-start;font-weight:400"><input type="checkbox" name="nieuws" id="dnews" style="margin-top:.35rem"> Hou me op de hoogte van De wijnproeverij</label>'}
        <p><button class="btn ${btnMain}" type="submit">Toon mijn resultaat</button></p>
      </form>`);
    document.getElementById('details').addEventListener('submit', e => {
      e.preventDefault();
      name = document.getElementById('dname').value.trim();
      const email = document.getElementById('demail').value.trim();
      const news = group ? false : document.getElementById('dnews').checked;
      result({ email, news });
    });
    document.getElementById('dname').focus();
    top();
  }

  function save(r, contact) {
    if (!cfg.resultsEndpoint || !contact) return Promise.resolve(false);
    const payload = {
      kleur: kind, groep: group, naam: name, email: contact.email, nieuws: contact.news,
      winnaar: r.ties.join(' / '), zekerheid: r.pct, scores: r.scores, punten: r.points,
      antwoorden: Object.fromEntries(questions.map(q => [q.id, q.options[answers[q.id]] ? q.options[answers[q.id]].t : ''])),
      url: location.href
    };
    // Apps Script accepts a text/plain body without a CORS preflight.
    return fetch(cfg.resultsEndpoint, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(payload) })
      .then(() => true).catch(() => false);
  }

  function result(contact) {
    progress();
    const r = compute();
    const { scores, ranked, winner, ties, runner, pct } = r;
    const greeting = name ? `${esc(name)}, jij bent` : 'Jij bent';
    const tieLine = ties.length > 1 ? `<p class="runner">Het is nipt: ${ties.map(esc).join(' en ')} scoren even hoog. Op een proeverij zetten we ze gewoon naast elkaar.</p>` : '';
    const groupLine = group ? `<p class="runner" id="saveNote">Je resultaat wordt bewaard voor de groep <strong>${esc(group)}</strong>…</p>` : (contact && contact.email ? '<p class="runner" id="saveNote">We mailen je het resultaat.</p>' : '');
    h(`
      <div class="result">
        <div class="bubble">${ROBOT}<p>Mijn circuits hebben gesproken. ${greeting} een…</p></div>
        <h2>${esc(winner)}</h2>
        <p class="cert">met een zekerheid van <strong>${pct}%</strong></p>
        <p class="desc">${esc(data.desc[winner])}</p>
        ${tieLine}
        ${runner && ties.length === 1 ? `<p class="runner">Op de tweede plaats: <strong>${esc(runner)}</strong>. Die twee samen op tafel, dat wordt een mooie avond.</p>` : ''}
        <ul class="scores" aria-label="Scores per druif">
          ${ranked.map(g => `<li class="${scores[g] === scores[winner] ? 'top' : ''}"><span>${esc(g)}</span><span class="bar"><span data-w="${Math.round(scores[g] / questions.length * 100)}"></span></span><span class="n">${scores[g]}</span></li>`).join('')}
        </ul>
        ${groupLine}
        <div class="cta">
          ${group ? '' : `<a class="btn ${btnMain}" href="contact.html?kleur=${kind}&druif=${encodeURIComponent(winner)}">Boek een proeverij rond ${esc(winner)}</a>`}
          <button class="btn" id="share" type="button">Deel je resultaat</button>
          <button class="btn" id="again" type="button">Opnieuw</button>
        </div>
        <p class="qnum" id="shareNote" style="margin-top:1rem"></p>
      </div>`);
    requestAnimationFrame(() => stage.querySelectorAll('.scores .bar span').forEach(s => s.style.width = s.dataset.w + '%'));
    save(r, contact).then(ok => {
      const n = document.getElementById('saveNote');
      if (n && group) n.innerHTML = ok ? `Je resultaat is bewaard voor de groep <strong>${esc(group)}</strong>. Bedankt!` : 'Opslaan is niet gelukt. Geef je resultaat even door aan de organisator.';
    });
    document.getElementById('again').addEventListener('click', () => { for (const k in answers) delete answers[k]; intro(); });
    document.getElementById('share').addEventListener('click', async () => {
      const text = `Volgens SommelAI ben ik een ${winner} (${pct}% zeker). Welke druif ben jij? ${location.origin}${location.pathname}`;
      try {
        if (navigator.share) { await navigator.share({ text }); }
        else { await navigator.clipboard.writeText(text); document.getElementById('shareNote').textContent = 'Gekopieerd. Plak het waar je wil.'; }
      } catch (e) { /* user cancelled */ }
    });
    top();
  }

  intro();
})();
