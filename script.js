const qs=(s,c=document)=>c.querySelector(s);const qsa=(s,c=document)=>[...c.querySelectorAll(s)];

const year=qs('[data-year]');if(year)year.textContent=new Date().getFullYear();

const toggle=qs('[data-menu-toggle]');const menu=qs('[data-menu]');
if(toggle&&menu){toggle.addEventListener('click',()=>{const open=menu.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));});qsa('a',menu).forEach(a=>a.addEventListener('click',()=>{menu.classList.remove('open');toggle.setAttribute('aria-expanded','false');}));}

const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in-view');observer.unobserve(entry.target);}});},{threshold:.14});
qsa('.reveal').forEach(el=>observer.observe(el));

function sparkle(wrap,count=6){const layer=qs('[data-spark-layer]',wrap);if(!layer)return;for(let i=0;i<count;i++){const s=document.createElement('i');s.className='spark'+(Math.random()>.55?' star':'');s.style.left=(20+Math.random()*60)+'%';s.style.top=(18+Math.random()*62)+'%';s.style.setProperty('--dx',((Math.random()-.5)*70)+'px');s.style.setProperty('--dy',((Math.random()-.5)*58)+'px');s.style.animationDelay=(Math.random()*.12)+'s';layer.appendChild(s);setTimeout(()=>s.remove(),1000);}}
qsa('[data-buy-wrap]').forEach(wrap=>{const btn=qs('[data-amazon-button]',wrap);if(!btn)return;btn.addEventListener('mouseenter',()=>sparkle(wrap,7));btn.addEventListener('focus',()=>sparkle(wrap,6));});
setInterval(()=>{const first=qs('[data-buy-wrap]');if(first)sparkle(first,3);},5200);

const form=qs('[data-contact-form]');
if(form){
  const next=qs('[data-next-url]',form);if(next){const clean=location.origin+location.pathname;next.value=clean+'?sent=1#contact';}
  const params=new URLSearchParams(location.search);if(params.get('sent')==='1'){const status=qs('[data-form-status]',form);if(status)status.textContent='Merci, votre message a bien été envoyé.';}
  form.addEventListener('submit',()=>{const button=qs('[data-submit-button]',form);if(button){button.disabled=true;button.innerHTML='Envoi en cours…';}});
}




