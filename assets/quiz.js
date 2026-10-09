/* SommelAI quiz — same logic as the original Landbot bots:
   every answer gives +1 to each grape linked to it; the grape with the
   highest score wins; "zekerheid" = score / number of questions. */
(function () {
  const root = document.getElementById('quiz');
  const kind = root.dataset.kind; // 'rood' | 'wit'
  const data = window.QUIZ_DATA[kind === 'rood' ? 'red' : 'white'];
  const stage = document.getElementById('stage');
  const bar = document.getElementById('bar');
  const questions = data.questions;
  const answers = {}; // question id -> option index
  let name = '';
  let step = -1; // -1 = intro

  const ROBOT = '<svg viewBox="0 0 48 48" aria-hidden="true"><rect x="8" y="14" width="32" height="26" rx="7" fill="currentColor" opacity=".18"/><rect x="8" y="14" width="32" height="26" rx="7" fill="none" stroke="currentColor" stroke-width="2.5"/><circle cx="19" cy="26" r="3.2" fill="currentColor"/><circle cx="29" cy="26" r="3.2" fill="currentColor"/><path d="M18 34c2 2 10 2 12 0" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><path d="M24 14V8" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><circle cx="24" cy="6" r="2.5" fill="currentColor"/></svg>';

  function h(html) { stage.innerHTML = html; }
  function esc(s) { return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
  function progress() {
    const done = Object.keys(answers).length;
    bar.style.width = (step < 0 ? 0 : Math.round((Math.min(done, questions.length) / questions.length) * 100)) + '%';
  }

  function intro() {
    step = -1; progress();
    const colour = kind === 'rood' ? 'rode' : 'witte';
    h(`
      <div class="bubble">${ROBOT}<p>Dag! Ik ben SommelAI, de robotwijnkenner van De wijnproeverij. Ik stel je ${questions.length} korte vragen en vertel je daarna welke ${colour} druif het beste bij jou past. Geen foute antwoorden, enkel eerlijke.</p></div>
      <label for="name" class="sr-only">Je voornaam</label>
      <input type="text" id="name" placeholder="Hoe mag ik je noemen?" autocomplete="given-name" maxlength="40" value="${esc(name)}">
      <div class="start-row">
        <button class="btn ${kind === 'rood' ? 'btn-solid' : 'btn-dark'}" id="start">Start de test</button>
        <a href="smaaktest.html" style="opacity:.8">Liever ${kind === 'rood' ? 'witte' : 'rode'} wijn?</a>
      </div>`);
    const input = document.getElementById('name');
    const go = () => { name = input.value.trim(); step = 0; show(); };
    document.getElementById('start').addEventListener('click', go);
    input.addEventListener('keydown', e => { if (e.key === 'Enter') go(); });
    input.focus();
  }

  function show() {
    if (step >= questions.length) return result();
    progress();
    const q = questions[step];
    const picked = answers[q.id];
    h(`
      <p class="qnum">Vraag ${step + 1} van ${questions.length}</p>
      <h2 id="qtitle">${esc(q.q)}</h2>
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
    document.getElementById('qtitle').focus && document.getElementById('qtitle').setAttribute('tabindex', '-1');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function result() {
    progress();
    const scores = {};
    data.grapes.forEach(g => scores[g] = 0);
    questions.forEach(q => {
      const o = q.options[answers[q.id]];
      if (o) o.g.forEach(g => scores[g]++);
    });
    const ranked = data.grapes.slice().sort((a, b) => scores[b] - scores[a]);
    const winner = ranked[0];
    const top = scores[winner];
    const ties = ranked.filter(g => scores[g] === top);
    const runner = ranked.find(g => scores[g] < top);
    const pct = Math.round((top / questions.length) * 1000) / 10;
    const greeting = name ? `${esc(name)}, jij bent` : 'Jij bent';
    const tieLine = ties.length > 1 ? `<p class="runner">Het is nipt: ${ties.map(esc).join(' en ')} scoren even hoog. Op een proeverij zetten we ze gewoon naast elkaar.</p>` : '';
    h(`
      <div class="result">
        <div class="bubble">${ROBOT}<p>Mijn circuits hebben gesproken. ${greeting} een…</p></div>
        <h2>${esc(winner)}</h2>
        <p class="cert">met een zekerheid van <strong>${pct}%</strong></p>
        <p class="desc">${esc(data.desc[winner])}</p>
        ${tieLine}
        ${runner && ties.length === 1 ? `<p class="runner">Op de tweede plaats: <strong>${esc(runner)}</strong>. Die twee samen op tafel, dat wordt een mooie avond.</p>` : ''}
        <ul class="scores" aria-label="Scores per druif">
          ${ranked.map(g => `<li class="${scores[g] === top ? 'top' : ''}"><span>${esc(g)}</span><span class="bar"><span data-w="${Math.round(scores[g] / questions.length * 100)}"></span></span><span class="n">${scores[g]}</span></li>`).join('')}
        </ul>
        <div class="cta">
          <a class="btn ${kind === 'rood' ? 'btn-solid' : 'btn-dark'}" href="contact.html?kleur=${kind}&druif=${encodeURIComponent(winner)}">Boek een proeverij rond ${esc(winner)}</a>
          <button class="btn" id="share" type="button">Deel je resultaat</button>
          <button class="btn" id="again" type="button">Opnieuw</button>
        </div>
        <p class="qnum" id="shareNote" style="margin-top:1rem"></p>
      </div>`);
    requestAnimationFrame(() => stage.querySelectorAll('.scores .bar span').forEach(s => s.style.width = s.dataset.w + '%'));
    document.getElementById('again').addEventListener('click', () => { for (const k in answers) delete answers[k]; intro(); });
    document.getElementById('share').addEventListener('click', async () => {
      const text = `Volgens SommelAI ben ik een ${winner} (${pct}% zeker). Welke druif ben jij? ${location.href}`;
      try {
        if (navigator.share) { await navigator.share({ text }); }
        else { await navigator.clipboard.writeText(text); document.getElementById('shareNote').textContent = 'Gekopieerd. Plak het waar je wil.'; }
      } catch (e) { /* user cancelled */ }
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  intro();
})();
