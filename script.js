// script.js
document.addEventListener('DOMContentLoaded', () => {

  // small helper: animate a quick stronger glitch on click or load
  const glitchElems = document.querySelectorAll('.glitch');
  function pulseGlitch(el){
    el.classList.add('glitch-pulse');
    setTimeout(()=> el.classList.remove('glitch-pulse'), 420);
  }
  // pulse name and logo shortly after load
  setTimeout(()=> {
    const logo = document.getElementById('logo-af');
    const name = document.getElementById('name-agustin');
    if(logo) pulseGlitch(logo);
    if(name) pulseGlitch(name);
  }, 600);

  // smooth scroll offset (header sticky height compensation)
  const btn = document.querySelector('.btn-projects');
  if(btn){
    btn.addEventListener('click', (e) => {
      // default anchor scroll will run because href="#projects-section"
      // but we offset a bit to consider sticky header
      e.preventDefault();
      const target = document.querySelector('#projects-section');
      if(!target) return;
      const headerHeight = document.querySelector('.main-header')?.offsetHeight || 80;
      const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 12;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  }

});
