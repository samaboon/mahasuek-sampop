(async()=>{const EP=+document.body.dataset.ep,R='../../';const d=await (await fetch(R+'episodes.json')).json();const eps=d.episodes,i=eps.findIndex(e=>e.number==EP),e=eps[i];
document.title=`ตอนที่ ${EP} ${e.title} - มหาศึกสามภพ`;document.querySelector('.tt').textContent=`ตอนที่ ${EP} · ${e.title}`;
const sel=document.querySelector('select');eps.forEach(x=>sel.add(new Option('ตอนที่ '+x.number,x.number,false,x.number==EP)));sel.onchange=()=>location.href=R+'ep/'+sel.value+'/';
const M=document.querySelector('main');for(let k=1;k<=e.slices;k++){const im=new Image();im.loading=k<3?'eager':'lazy';im.alt='';im.onload=()=>im.classList.add('ld');im.src='img/'+String(k).padStart(2,'0')+'.jpg';M.appendChild(im)}
const pv=eps[i-1],nx=eps[i+1],P=document.getElementById('prev'),N=document.getElementById('next');
if(pv)P.href=R+'ep/'+pv.number+'/';else P.classList.add('off');if(nx)N.href=R+'ep/'+nx.number+'/';else{N.classList.add('off');N.textContent='ตอนถัดไป (เร็ว ๆ นี้)'}
const bar=document.querySelector('.bar'),pr=document.querySelector('.prog');let ly=0,t;
const pct=()=>{const h=document.documentElement.scrollHeight-innerHeight;return h>0?Math.min(1,scrollY/h):0};
addEventListener('scroll',()=>{const y=scrollY;bar.classList.toggle('hide',y>ly&&y>80);ly=y;pr.style.width=pct()*100+'%';clearTimeout(t);t=setTimeout(()=>localStorage.setItem('mhs_last',JSON.stringify({ep:EP,y,pct:pct()})),300)},{passive:true});
try{const s=JSON.parse(localStorage.getItem('mhs_last'));if(s&&s.ep==EP&&s.y>200){let n=0;const go=()=>{scrollTo(0,s.y);if(Math.abs(scrollY-s.y)>5&&n++<20)setTimeout(go,250)};setTimeout(go,300)}}catch(x){}
addEventListener('keydown',ev=>{if(ev.target.tagName=='SELECT')return;if(ev.key=='ArrowDown')scrollBy({top:innerHeight*.8,behavior:'smooth'}),ev.preventDefault();if(ev.key=='ArrowUp')scrollBy({top:-innerHeight*.8,behavior:'smooth'}),ev.preventDefault();if(ev.key=='ArrowRight'&&nx)location.href=N.href;if(ev.key=='ArrowLeft'&&pv)location.href=P.href})})();
