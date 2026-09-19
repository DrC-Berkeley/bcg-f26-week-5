// Reading position is local to this page. No responses or progress are stored.
(() => {
  const bar = document.querySelector('.reading-progress span');
  const links = [...document.querySelectorAll('nav a[href^="#"]')];
  const sections = links.map(link => document.querySelector(link.getAttribute('href')));
  let queued = false;
  function update() {
    const length = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = `scaleX(${length > 0 ? Math.min(1, Math.max(0, window.scrollY / length)) : 0})`;
    let active = -1;
    sections.forEach((section, index) => { if (section.getBoundingClientRect().top <= 160) active = index; });
    links.forEach((link, index) => {
      if (index === active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    queued = false;
  }
  function schedule() { if (!queued) { queued = true; requestAnimationFrame(update); } }
  window.addEventListener('scroll', schedule, {passive:true});
  window.addEventListener('resize', schedule);
  document.addEventListener('toggle', schedule, true);
  update();
})();

// Optional reflection support. No selection or response is stored or transmitted.
(() => {
  const questions = ['Whose needs are you attending to, and who gets to say what those needs are?', 'What might you be missing about how others are experiencing this situation?', 'Who can make themselves understood, and whose message is easy to overlook?', 'Which part of the decision can people actually shape together?', 'What would make it possible to disagree without losing your place in the group?', 'Whose account of the problem shapes what the group believes needs to happen?', 'What disagreement needs attention before the group can make a decision?', 'Who gets to say what repair would require after harm?'];
  const buttons = [...document.querySelectorAll('[data-practice]')];
  const output = document.querySelector('#practice-question');
  if (!output) return;
  buttons.forEach(button => button.addEventListener('click', () => {
    buttons.forEach(other => other.setAttribute('aria-pressed', String(other === button)));
    const label = document.createElement('strong');
    label.textContent = button.textContent;
    const question = document.createElement('p');
    question.textContent = questions[Number(button.dataset.practice)];
    output.replaceChildren(label, question);
  }));
})();
