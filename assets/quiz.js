/* SommelAI quiz.
   Scoring: every answer gives +1 to each grape linked to it; the grape with
   the highest score wins. Ranking points per person (4,3,2,1,0 — ties share)
   are what the group overview sums to pick the two grapes for a tasting.

   Two modes (data-mode on #quiz):
   - "v1": the fixed list of questions, zekerheid = score / number of questions
           (identical to the original Landbot bots).
   - "v2": adaptive. A fixed core round, then SommelAI keeps picking the
           question that best splits the current leaders (regular questions
           and two-choice duels) until the leader is LEAD_TO_STOP points
           ahead, MAX_QUESTIONS is reached, or the person asks for the result.
           Duel answers count double. zekerheid is based on the lead:
           50% + 12.5% per point. */
(function () {
  const root = document.getElementById('quiz');
  const kind = root.dataset.kind; // 'rood' | 'wit'
  const mode = root.dataset.mode || 'v1';
  const data = window.QUIZ_DATA[kind === 'rood' ? 'red' : 'white'];
  const cfg = window.SITE_CONFIG || {};
  const stage = document.getElementById('stage');
  const bar = document.getElementById('bar');
  const params = new URLSearchParams(location.search);
  const group = (params.get('groep') || '').trim().toLowerCase().replace(/[^a-z0-9-]/g, '').slice(0, 40);

  const LEAD_TO_STOP = Number(root.dataset.lead || 3);
  const MAX_QUESTIONS = Number(root.dataset.max || 20);
  const byId = {};
  data.questions.forEach(q => byId[q.id] = q);
  (data.duels || []).forEach(q => byId[q.id] = q);
  const core = mode === 'v2' ? (data.core || data.questions.map(q => q.id)).map(id => byId[id]) : data.questions.slice();
  const pool = mode === 'v2' ? [...data.questions.filter(q => !core.includes(q)), ...(data.duels || [])] : [];

  let asked = [];     // ordered list of question objects shown so far
  const answers = {}; // question id -> option index
  let name = '';
  let step = -1;      // -1 = intro, otherwise index into asked

  const ROBOT = '<svg viewBox="0 0 48 48" aria-hidden="true"><rect x="8" y="14" width="32" height="26" rx="7" fill="currentColor" opacity=".18"/><rect x="8" y="14" width="32" height="26" rx="7" fill="none" stroke="currentColor" stroke-width="2.5"/><circle cx="19" cy="26" r="3.2" fill="currentColor"/><circle cx="29" cy="26" r="3.2" fill="currentColor"/><path d="M18 34c2 2 10 2 12 0" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><path d="M24 14V8" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><circle cx="24" cy="6" r="2.5" fill="currentColor"/></svg>';
  const btnMain = kind === 'rood' ? 'btn-solid' : 'btn-dark';

  function h(html) { stage.innerHTML = html; }
  function esc(s) { return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
  function top() { window.scrollTo({ top: 0, behavior: 'smooth' }); }
  function answered() { return asked.filter(q => answers[q.id] !== undefined); }
  function progress() {
    const n = answered().length;
    const total = mode === 'v2' ? Math.max(core.length + 4, n + 2) : core.length;
    bar.style.width = (step < 0 ? 0 : Math.round(Math.min(n / total, 1) * 100)) + '%';
  }

  /* ---------- scoring ---------- */
  function scoresFor(list) {
    const sc = {};
    data.grapes.forEach(g => sc[g] = 0);
    // A duel is a direct either/or choice, so it counts double (v2 only).
    list.forEach(q => { const o = q.options[answers[q.id]]; const w = (mode === 'v2' && q.duel) ? 2 : 1; if (o) o.g.forEach(g => sc[g] += w); });
    return sc;
  }
  function compute() {
    const done = answered();
    const scores = scoresFor(done);
    const ranked = data.grapes.slice().sort((a, b) => scores[b] - scores[a]);
    const points = {};
    data.grapes.forEach(g => { points[g] = Math.max(0, 4 - data.grapes.filter(x => scores[x] > scores[g]).length); });
    const topScore = scores[ranked[0]];
    const lead = topScore - scores[ranked[1]];
    const pct = mode === 'v2'
      ? Math.min(100, 50 + 12.5 * lead)
      : Math.round((topScore / done.length) * 1000) / 10;
    return { scores, ranked, points, lead, n: done.length, winner: ranked[0], ties: ranked.filter(g => scores[g] === topScore), runner: ranked.find(g => scores[g] < topScore), pct };
  }

  /* ---------- adaptive selection (v2) ---------- */
  function nextQuestion() {
    const r = compute();
    const contenders = data.grapes.filter(g => r.scores[g] >= r.scores[r.ranked[0]] - 1);
    if (contenders.length < 2) contenders.push(r.ranked[1]);
    const unasked = pool.filter(q => !asked.includes(q));
    if (!unasked.length) return null;
    // A question is useful when its options split the contenders.
    const value = q => q.options.reduce((sum, o) => {
      const inside = contenders.filter(g => o.g.includes(g)).length;
      return sum + Math.min(inside, contenders.length - inside);
    }, 0);
    let best = [], bestV = -1;
    unasked.forEach(q => {
      // prefer duels slightly: they resolve ties in one tap
      const v = value(q) + (q.duel ? 0.5 : 0) - q.options.length * 0.01;
      if (v > bestV + 1e-9) { best = [q]; bestV = v; } else if (Math.abs(v - bestV) < 1e-9) best.push(q);
    });
    if (bestV <= 0) return null; // nothing left that can separate them
    return best[Math.floor(Math.random() * best.length)];
  }
  function shouldStop() {
    const r = compute();
    return r.n >= core.length && (r.lead >= LEAD_TO_STOP || r.n >= MAX_QUESTIONS);
  }

  /* ---------- screens ---------- */
  function intro() {
    step = -1; asked = core.slice(); progress();
    const colour = kind === 'rood' ? 'rode' : 'witte';
    const groupLine = group ? `<p class="qnum">Je doet de test voor de groep <strong>${esc(group)}</strong>. Je resultaat telt mee voor de keuze van de wijnen.</p>` : '';
    const count = mode === 'v2' ? `een stuk of ${core.length + 4}` : core.length;
    const extra = mode === 'v2' ? ' Hoe duidelijker je smaak, hoe sneller ik klaar ben.' : '';
    h(`
      <div class="bubble">${ROBOT}<p>Dag! Ik ben SommelAI, de robotwijnkenner van De wijnproeverij. Ik stel je ${count} korte vragen en vertel je daarna welke ${colour} druif het beste bij jou past.${extra} Geen foute antwoorden, enkel eerlijke.</p></div>
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

  function advance() {
    step++;
    if (step < asked.length) return show();
    if (mode === 'v2' && !shouldStop()) {
      const q = nextQuestion();
      if (q) { asked.push(q); return show(); }
    }
    details();
  }

  function show() {
    progress();
    const q = asked[step];
    const picked = answers[q.id];
    const inDuel = mode === 'v2' && step >= core.length;
    const r = compute();
    const hint = inDuel && r.n >= core.length
      ? (r.lead === 0 ? `Het is gelijkspel tussen ${r.ties.map(esc).join(' en ')}. Nog even doorgaan.` : `${esc(r.winner)} staat ${r.lead} punt${r.lead > 1 ? 'en' : ''} voor. Nog even scherpstellen.`)
      : (step === asked.length - 1 && mode === 'v1' ? 'laatste vraag!' : 'kies wat het meest bij je past.');
    h(`
      <p class="qnum">${inDuel ? 'Scherpstellen · vraag' : 'Vraag'} ${step + 1}${mode === 'v1' ? ' van ' + asked.length : ''}</p>
      <h2 id="qtitle" tabindex="-1">${esc(q.q)}</h2>
      <ul class="options" role="list">
        ${q.options.map((o, i) => `<li><button type="button" data-i="${i}" class="${picked === i ? 'picked' : ''}">${esc(o.t)}</button></li>`).join('')}
      </ul>
      <div class="toolbar">
        <button type="button" id="back">${step === 0 ? 'Terug naar het begin' : 'Vorige vraag'}</button>
        <span class="qnum">${name && !inDuel ? esc(name) + ', ' : ''}${hint}</span>
      </div>
      ${inDuel ? `<p style="margin-top:1.2rem"><button type="button" class="btn" id="enough">Genoeg, geef me mijn druif</button></p>` : ''}`);
    stage.querySelectorAll('.options button').forEach(b => b.addEventListener('click', () => {
      answers[q.id] = Number(b.dataset.i);
      stage.querySelectorAll('.options button').forEach(x => x.classList.remove('picked'));
      b.classList.add('picked');
      if (mode === 'v2') asked = asked.slice(0, step + 1); // later picks depend on this answer
      setTimeout(advance, 180);
    }));
    document.getElementById('back').addEventListener('click', () => { if (step === 0) intro(); else { step--; show(); } });
    const enough = document.getElementById('enough');
    if (enough) enough.addEventListener('click', () => { asked = asked.slice(0, step); details(); });
    top();
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
      antwoorden: Object.fromEntries(answered().map(q => [q.id, q.options[answers[q.id]].t])),
      versie: mode, aantalVragen: r.n, voorsprong: r.lead,
      url: location.href
    };
    // Apps Script accepts a text/plain body without a CORS preflight.
    return fetch(cfg.resultsEndpoint, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(payload) })
      .then(() => true).catch(() => false);
  }

  function result(contact) {
    bar.style.width = '100%';
    const r = compute();
    const { scores, ranked, winner, ties, runner, pct, lead, n } = r;
    const greeting = name ? `${esc(name)}, jij bent` : 'Jij bent';
    const tieLine = ties.length > 1 ? `<p class="runner">Het is nipt: ${ties.map(esc).join(' en ')} scoren even hoog. Op een proeverij zetten we ze gewoon naast elkaar.</p>` : '';
    const groupLine = group ? `<p class="runner" id="saveNote">Je resultaat wordt bewaard voor de groep <strong>${esc(group)}</strong>…</p>` : (contact && contact.email ? '<p class="runner" id="saveNote">We mailen je het resultaat.</p>' : '');
    const certLine = mode === 'v2'
      ? `<p class="cert">met een zekerheid van <strong>${pct}%</strong> <span class="qnum">· na ${n} vragen, ${lead} punt${lead === 1 ? '' : 'en'} voorsprong</span></p>`
      : `<p class="cert">met een zekerheid van <strong>${pct}%</strong></p>`;
    const maxScore = Math.max(1, scores[winner]);
    h(`
      <div class="result">
        <div class="bubble">${ROBOT}<p>Mijn circuits hebben gesproken. ${greeting} een…</p></div>
        <h2>${esc(winner)}</h2>
        ${certLine}
        <p class="desc">${esc(data.desc[winner])}</p>
        ${tieLine}
        ${runner && ties.length === 1 ? `<p class="runner">Op de tweede plaats: <strong>${esc(runner)}</strong>. Die twee samen op tafel, dat wordt een mooie avond.</p>` : ''}
        <ul class="scores" aria-label="Scores per druif">
          ${ranked.map(g => `<li class="${scores[g] === scores[winner] ? 'top' : ''}"><span>${esc(g)}</span><span class="bar"><span data-w="${Math.round(scores[g] / maxScore * 100)}"></span></span><span class="n">${scores[g]}</span></li>`).join('')}
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
      const el = document.getElementById('saveNote');
      if (el && group) el.innerHTML = ok ? `Je resultaat is bewaard voor de groep <strong>${esc(group)}</strong>. Bedankt!` : 'Opslaan is niet gelukt. Geef je resultaat even door aan de organisator.';
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
