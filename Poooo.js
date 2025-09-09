
/* ====== Particle / Matrix-ish background (simple, performant) ====== */
(() => {
  const canvas = document.getElementById('bgCanvas');
  const ctx = canvas.getContext('2d');
  let w = canvas.width = innerWidth;
  let h = canvas.height = innerHeight;

  const cols = Math.floor(w / 20);
  const ypos = Array(cols).fill(0);

  window.addEventListener('resize', () => {
    w = canvas.width = innerWidth;
    h = canvas.height = innerHeight;
  });

  function matrixStep() {
    ctx.fillStyle = 'rgba(0,0,0,0.18)';
    ctx.fillRect(0,0,w,h);
    ctx.fillStyle = 'rgba(0,230,118,0.9)';
    ctx.font = '14px monospace';

    for (let i = 0; i < ypos.length; i++) {
      const text = String.fromCharCode(0x30A0 + Math.random() * 96);
      const x = i * 20;
      ctx.fillText(text, x, ypos[i] * 20);
      if (ypos[i] * 20 > h && Math.random() > 0.975) ypos[i] = 0;
      ypos[i]++;
    }
    requestAnimationFrame(matrixStep);
  }
  matrixStep();
})();

/* ====== Gallery population + lightbox ====== */
const galleryEl = document.getElementById('gallery');
const images = new Array(12).fill(0).map((_,i)=>({
  src: `https://via.placeholder.com/800x600?text=Image+${i+1}`,
  title: `Image ${i+1}`
}));

function makeCard(item){
  const c = document.createElement('div'); c.className='card';
  const img = document.createElement('img'); img.className='thumb';
  img.src = item.src;
  img.alt = item.title;
  img.loading = 'lazy';
  img.addEventListener('click', ()=> openLightbox(item.src));
  c.appendChild(img);
  return c;
}

images.forEach(img=>galleryEl.appendChild(makeCard(img)));

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
function openLightbox(src){
  lightboxImg.src = src;
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden','false');
}
function closeLightbox(){
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden','true');
}
lightbox.addEventListener('click', (e)=>{
  if(e.target === lightbox || e.target === lightboxImg) closeLightbox();
});
document.addEventListener('keydown', (e)=>{ if(e.key==='Escape') closeLightbox(); });

document.getElementById('openGallery').addEventListener('click', ()=> {
  document.querySelector('#gallery').scrollIntoView({behavior:'smooth'});
});

/* ====== Age-gate simple (client-side) ====== */
const ageGate = document.getElementById('ageGate');
document.getElementById('confirmYes').addEventListener('click', ()=>{
  // set a simple session flag (not secure, just UX)
  sessionStorage.setItem('age_confirmed','1');
  ageGate.style.display = 'none';
});
document.getElementById('confirmNo').addEventListener('click', ()=>{
  // redirect to neutral site
  window.location.href = 'https://www.example.com';
});
if(sessionStorage.getItem('age_confirmed')==='1'){
  ageGate.style.display = 'none';
}

/* ====== Small accessibility enhancement: trap focus to lightbox when opened ====== */
lightbox.addEventListener('keydown', (e)=>{
  if(e.key==='Escape') closeLightbox();
});


