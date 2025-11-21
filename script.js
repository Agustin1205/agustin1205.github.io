/* ========== Helpers ========== */
const $ = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));

/* ========== NAV sticky behavior ========== */
const nav = $('#nav');
const hero = $('#hero');

function heroHeight() { return hero ? hero.offsetHeight : window.innerHeight; }

function updateNavSticky(){
  if(window.scrollY > (heroHeight() - 140)) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
}
window.addEventListener('scroll', updateNavSticky);
window.addEventListener('resize', updateNavSticky);
updateNavSticky();

/* smooth scroll for nav and cta links */
function smoothScrollToId(id) {
  const node = document.getElementById(id);
  if(!node) return;
  const offset = nav.classList.contains('sticky') ? nav.offsetHeight + 12 : 80;
  const top = node.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: 'smooth' });
}
$$('.nav-btn').forEach(b => b.addEventListener('click', () => smoothScrollToId(b.dataset.target)));
$$('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
  e.preventDefault();
  const id = a.getAttribute('href').slice(1);
  smoothScrollToId(id);
}));

/* ========== PARTICLES CANVAS ========== */
const canvas = document.getElementById('hero-canvas');
const ctx = canvas && canvas.getContext ? canvas.getContext('2d') : null;
let W=0, H=0, particles=[];

function resizeCanvas(){
  if(!canvas) return;
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
function initParticles(){
  if(!canvas) return;
  particles = [];
  const count = Math.min(160, Math.floor(window.innerWidth / 8));
  for(let i=0;i<count;i++){
    particles.push({
      x: Math.random()*W,
      y: Math.random()*H,
      r: Math.random()*2.4 + 0.6,
      vx: (Math.random()-0.5)*0.6,
      vy: (Math.random()-0.5)*0.25,
      hue: Math.random()*40 + 260
    });
  }
}
function drawParticles(){
  if(!ctx) return;
  ctx.clearRect(0,0,W,H);
  particles.forEach(p=>{
    p.x += p.vx; p.y += p.vy;
    if(p.x < -10) p.x = W+10;
    if(p.x > W+10) p.x = -10;
    if(p.y < -10) p.y = H+10;
    if(p.y > H+10) p.y = -10;

    const g = ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r*8);
    g.addColorStop(0, `hsla(${p.hue},80%,70%,0.18)`);
    g.addColorStop(0.25, `hsla(${p.hue},70%,60%,0.06)`);
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(p.x,p.y,p.r*8,0,Math.PI*2); ctx.fill();

    ctx.fillStyle = `hsla(${p.hue},80%,70%,0.9)`;
    ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill();
  });
  requestAnimationFrame(drawParticles);
}

if(ctx){
  window.addEventListener('resize', ()=>{ resizeCanvas(); initParticles(); });
  resizeCanvas(); initParticles(); drawParticles();

  // subtle parallax
  document.addEventListener('mousemove', e=>{
    const art = document.querySelector('.hero-art');
    if(!art) return;
    const moveX = (e.clientX / window.innerWidth - 0.5) * 12;
    const moveY = (e.clientY / window.innerHeight - 0.5) * 8;
    art.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.03)`;
  });
}

/* ========== OPEN "PAGES" for Grandes/Intermedios/Pequenos ==========
   These open a new tab with a template page to later upload real projects.
*/
function openProjectSize(size, cat){
  const map = { videojuegos: 'Videojuegos', pitch: 'Pitchs & GDD', narrativa: 'Narrativa', gdd: 'GDD' };
  const catName = map[cat] || cat;
  const title = `${catName} — ${size.charAt(0).toUpperCase()+size.slice(1)}`;

  const html = `
  <!doctype html>
  <html lang="es">
  <head>
    <meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
    <title>${title}</title>
    <style>
      body{ margin:0; font-family: 'Rajdhani', system-ui, -apple-system, 'Segoe UI', Roboto, Arial; background: linear-gradient(180deg,#070317,#03010a); color:#efeaf8; }
      header{ padding:18px 20px; border-bottom:1px solid rgba(255,255,255,0.03); display:flex; align-items:center; gap:16px }
      .logo{ width:44px;height:44px; border-radius:8px; border:2px solid rgba(122,67,255,0.9) }
      .container{ max-width:1100px; margin:26px auto; padding:0 20px }
      h1{ font-family:'Orbitron',sans-serif; font-weight:700; color:#fff }
      .grid{ display:grid; grid-template-columns: repeat(auto-fit,minmax(260px,1fr)); gap:14px; margin-top:22px }
      .card{ padding:16px;background:rgba(255,255,255,0.03); border-radius:12px;border:1px solid rgba(107,53,255,0.04) }
      .back{ color:#cbb0ff; text-decoration:none; font-weight:700; border:1px solid rgba(107,53,255,0.08); padding:8px 12px; border-radius:8px; display:inline-block }
    </style>
  </head>
  <body>
    <header>
      <a class="back" href="#" onclick="window.close();return false;">Cerrar</a>
      <img class="logo" src="/mnt/data/d245e787-64f9-4165-b589-868d10204ce5.png" alt="logo">
      <div style="flex:1;text-align:right"><small style="color:#cbb0ff">Categoría</small><div style="font-weight:800">${title}</div></div>
    </header>
    <main class="container">
      <h1>${title}</h1>
      <p style="color:#d0b8ff">Acá subiré mis proyectos.</p>
      <div class="grid">
        <div class="card"><h3>Proyecto A</h3><p>Próximamente...</p></div>
        <div class="card"><h3>Proyecto B</h3><p>Próximamente...</p></div>
        <div class="card"><h3>Proyecto C</h3><p>Próximamente...</p></div>
      </div>
    </main>
  </body>
  </html>
  `;
  const win = window.open();
  win.document.write(html); win.document.close();
}

/* bind open-size buttons */
$$('.open-size').forEach(b=>{
  b.addEventListener('click', ()=> openProjectSize(b.dataset.size, b.dataset.cat));
});

/* bind .card-open to open project "detail" page with rating */
function openProjectDetail(cat, slug){
  const id = `${cat}::${slug}`;

  const html = `
  <!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Ficha — ${slug}</title>
  <style>
    body{ margin:0;font-family: 'Rajdhani',system-ui, -apple-system,'Segoe UI', Roboto, Arial; background: linear-gradient(180deg,#070317,#03010a); color:#efeaf8; }
    .wrap{ max-width:900px;margin:28px auto;padding:22px }
    h1{ font-family:'Orbitron',sans-serif; letter-spacing:2px }
    .meta{ color:#d7b8ff; margin-bottom:12px }
    .rating-row{ display:flex; gap:8px; flex-wrap:wrap; margin-top:14px }
    .rating-group{ background: rgba(255,255,255,0.03); padding:12px; border-radius:10px; border:1px solid rgba(255,255,255,0.03) }
    button{ padding:8px 12px; border-radius:8px; background:linear-gradient(90deg,#7a43ff,#ce7bff); border:none; color:#070317; font-weight:700; cursor:pointer }
  </style>
  </head>
  <body>
    <div class="wrap">
      <a href="#" onclick="window.close();return false;" style="color:#cbb0ff;text-decoration:none;display:inline-block;margin-bottom:12px">Cerrar</a>
      <h1>${slug}</h1>
      <div class="meta">Categoría: ${cat} </div>
      <p>Acá podrás ver mi proyecto con lujo de detalle.</p>

      <div style="margin-top:16px">
        <div style="color:#d7b8ff;font-weight:700;margin-bottom:8px">Valorar proyecto</div>
        <div class="rating-row">
          <div class="rating-group">
            <div style="font-weight:700">Originalidad</div>
            <div><select id="r1"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5" selected>5</option></select></div>
          </div>
          <div class="rating-group">
            <div style="font-weight:700">Game Design</div>
            <div><select id="r2"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5" selected>5</option></select></div>
          </div>
          <div class="rating-group">
            <div style="font-weight:700">Programación</div>
            <div><select id="r3"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5" selected>5</option></select></div>
          </div>
          <div class="rating-group">
            <div style="font-weight:700">Diseño</div>
            <div><select id="r4"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5" selected>5</option></select></div>
          </div>
        </div>

        <div style="margin-top:14px">
          <button id="submitRating">Enviar valoración</button>
          <span id="rateMsg" style="margin-left:12px;color:#cbb0ff"></span>
        </div>
      </div>
    </div>

    <script>
      // store rating in opener (if available) so main page aggregates it
      const submit = document.getElementById('submitRating');
      submit.addEventListener('click', ()=>{
        const r1 = +document.getElementById('r1').value;
        const r2 = +document.getElementById('r2').value;
        const r3 = +document.getElementById('r3').value;
        const r4 = +document.getElementById('r4').value;
        const data = { originalidad: r1, gamedesign: r2, programacion: r3, diseno: r4, id: '${id}' };

        try{
          // if opener exists and has function, call it:
          if(window.opener && window.opener.receiveRatingFromPopup){
            window.opener.receiveRatingFromPopup(data);
            document.getElementById('rateMsg').innerText = '¡Enviado! Gracias.';
            setTimeout(()=> window.close(), 700);
          } else {
            // fallback: save to localStorage of this window
            const key = 'ratings_local';
            const arr = JSON.parse(localStorage.getItem(key) || '[]');
            arr.push(data);
            localStorage.setItem(key, JSON.stringify(arr));
            document.getElementById('rateMsg').innerText = 'Guardado localmente (sin conexión a la página padre).';
          }
        }catch(err){
          console.error(err);
          document.getElementById('rateMsg').innerText = 'Error al enviar.';
        }
      });
    </script>
  </body></html>
  `;
  const win = window.open();
  win.document.write(html); win.document.close();
}

/* bind preview card open */
$$('.card-open').forEach(b => {
  b.addEventListener('click', (e) => {
    const cat = b.dataset.cat;
    const slug = b.dataset.slug;
    openProjectDetail(cat, slug);
  });
});


/* ========== RATINGS AGGREGATION ========== */
/* Save ratings in localStorage as array of rating objects.
   Fields: originalidad, gamedesign, programacion, diseno, id
*/

function loadRatings(){
  const raw = localStorage.getItem('portfolio_ratings');
  return raw ? JSON.parse(raw) : [];
}

function saveRatings(arr){
  localStorage.setItem('portfolio_ratings', JSON.stringify(arr));
}

/* called by popups to add rating to main page */
window.receiveRatingFromPopup = function(data){
  const arr = loadRatings();
  arr.push(data);
  saveRatings(arr);
  computeAndRenderStats();
};

/* compute aggregated stats (avg percent 0-100) */
function computeAndRenderStats(){
  const arr = loadRatings();
  if(!arr.length){
    // zero
    setStat('#stat-originalidad',0);
    setStat('#stat-gamedesign',0);
    setStat('#stat-programacion',0);
    setStat('#stat-diseno',0);
    return;
  }
  let s1=0,s2=0,s3=0,s4=0;
  arr.forEach(r=>{
    s1 += (r.originalidad||0);
    s2 += (r.gamedesign||0);
    s3 += (r.programacion||0);
    s4 += (r.diseno||0);
  });
  const n = arr.length;
  const avg1 = Math.round((s1/n)/5*100);
  const avg2 = Math.round((s2/n)/5*100);
  const avg3 = Math.round((s3/n)/5*100);
  const avg4 = Math.round((s4/n)/5*100);

  setStat('#stat-originalidad', avg1);
  setStat('#stat-gamedesign', avg2);
  setStat('#stat-programacion', avg3);
  setStat('#stat-diseno', avg4);
}

function setStat(selector, pct){
  const el = document.querySelector(selector);
  if(!el) return;
  el.style.width = pct + '%';
  el.dataset.value = pct;
}

/* init stats from storage */
computeAndRenderStats();

/* also import any ratings saved in popup localStorage fallback (merge) */
(function mergePopupLocal(){
  try{
    const raw = localStorage.getItem('ratings_local');
    if(raw){
      const arr = JSON.parse(raw);
      const stored = loadRatings();
      const merged = stored.concat(arr);
      saveRatings(merged);
      localStorage.removeItem('ratings_local');
      computeAndRenderStats();
    }
  }catch(e){ console.warn(e); }
})();

/* ========== SKILL BAR ANIMATIONS WHEN VISIBLE ==========
   (we use stats bars to animate on scroll)
*/
function revealStatsOnScroll(){
  const target = document.getElementById('ratings');
  if(!target) return;
  const r = target.getBoundingClientRect();
  if(r.top < window.innerHeight - 120){
    // animate -- already done via computeAndRenderStats (widths set)
    // we can add small transition trigger by toggling class
    target.classList.add('visible');
  }
}
window.addEventListener('scroll', revealStatsOnScroll);
revealStatsOnScroll();

/* ========== small polish: keyboard esc to close any opened popup windows? ========== */
/* (no-op for now) */

/* ========== END ========== */
