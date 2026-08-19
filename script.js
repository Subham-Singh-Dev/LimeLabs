const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => [...r.querySelectorAll(s)];

const navItems = [
  ['Services','services.html'],['Solutions','solutions.html'],['Industries','industries.html'],['Work','work.html'],['About Us','about.html'],['Blog','blog.html'],['Contact','contact.html']
];

function renderChrome(){
  const base=document.body.dataset.base||'';
  const header = $('#site-header');
  if(header){
    header.innerHTML = `<div class="container nav">
      <a class="brand" href="${base}index.html" aria-label="LimeLabs home"><img src="${base}assets/limelabs-logo.jpg" alt="LimeLabs"></a>
      <button class="menu-toggle" aria-label="Open menu" aria-expanded="false">☰</button>
      <nav class="nav-links" aria-label="Primary navigation">
        ${navItems.map(([label,href])=>`<a href="${base}${href}">${label}</a>`).join('')}
        <a class="btn btn-primary nav-cta" href="${base}contact.html">Start a Project <span>→</span></a>
      </nav>
    </div>`;
  }
  const footer = $('#site-footer');
  if(footer){
    footer.innerHTML = `<div class="container footer-main">
      <div class="footer-brand"><img src="${base}assets/limelabs-logo.jpg" alt="LimeLabs"><p>We build digital products and transform business processes with practical, scalable technology.</p></div>
      <div class="footer-col"><h4>Services</h4><a href="${base}services.html">Web Development</a><a href="${base}services.html#mobile">Mobile Apps</a><a href="${base}services.html#cloud">Cloud & DevOps</a><a href="${base}services.html#blockchain">Blockchain</a><a href="${base}services.html#uiux">UI/UX Design</a><a href="${base}services.html#transformation">Digital Transformation</a></div>
      <div class="footer-col"><h4>Company</h4><a href="${base}solutions.html">Solutions</a><a href="${base}industries.html">Industries</a><a href="${base}work.html">Our Work</a><a href="${base}about.html">About Us</a><a href="${base}about.html#process">Our Process</a><a href="${base}contact.html">Contact</a></div>
      <div class="footer-col"><h4>Resources</h4><a href="${base}blog.html">Blog & Insights</a><a href="${base}careers.html">Careers</a><a href="${base}contact.html">Start a Project</a><a href="${base}privacy.html">Privacy Policy</a><a href="${base}terms.html">Terms of Service</a></div>
    </div><div class="container footer-bottom"><span>© ${new Date().getFullYear()} LimeLabs. All rights reserved.</span><span>Build / Innovate / Scale</span></div>`;
  }
}

function setupNav(){
  const header=$('#site-header'), toggle=$('.menu-toggle'), links=$('.nav-links');
  window.addEventListener('scroll',()=>header?.classList.toggle('scrolled',window.scrollY>20),{passive:true});
  toggle?.addEventListener('click',()=>{const open=links.classList.toggle('open');toggle.setAttribute('aria-expanded',open)});
  const current=location.pathname.split('/').pop()||'index.html';
  $$('.nav-links a').forEach(a=>{if(a.getAttribute('href')===current)a.classList.add('active')});
}

function setupReveal(){
  const els=$$('.reveal');
  if(!('IntersectionObserver' in window)){els.forEach(e=>e.classList.add('visible'));return}
  const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.12});
  els.forEach(e=>io.observe(e));
}

function setupCounters(){
  $$('.counter').forEach(el=>{const target=Number(el.dataset.target||0);let done=false;const io=new IntersectionObserver(entries=>{if(entries[0].isIntersecting&&!done){done=true;let start=0;const step=Math.max(1,Math.ceil(target/40));const t=setInterval(()=>{start=Math.min(target,start+step);el.textContent=start+(el.dataset.suffix||'');if(start>=target)clearInterval(t)},25);io.disconnect()}});io.observe(el)})
}

function setupFilters(){
  const buttons=$$('.filter'), projects=$$('.project[data-category]'); if(!buttons.length)return;
  buttons.forEach(btn=>btn.addEventListener('click',()=>{buttons.forEach(b=>b.classList.remove('active'));btn.classList.add('active');const cat=btn.dataset.filter;projects.forEach(p=>{p.style.display=cat==='all'||p.dataset.category.includes(cat)?'block':'none'})}));
}

function setupFAQ(){
  $$('.faq-q').forEach(q=>q.addEventListener('click',()=>q.closest('.faq-item')?.classList.toggle('open')))
}

function setupForms(){
  $$('.demo-form').forEach(form=>form.addEventListener('submit',e=>{e.preventDefault();const status=$('.form-status',form);if(status){status.style.display='block';status.textContent='Thanks. Your project enquiry has been captured for this demo. Connect this form to your backend or email service before launch.'}toast('Form submitted successfully.');form.reset()}));
}
function toast(msg){let t=$('.toast');if(!t){t=document.createElement('div');t.className='toast';document.body.appendChild(t)}t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2800)}

function init(){renderChrome();setupNav();setupReveal();setupCounters();setupFilters();setupFAQ();setupForms();}
document.addEventListener('DOMContentLoaded',init);
