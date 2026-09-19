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
