const scenes=[...document.querySelectorAll('.scene')];
let current=0;
const count=document.getElementById('count'),bar=document.getElementById('bar');
const back=document.getElementById('back'),next=document.getElementById('next');
const audio=document.getElementById('backgroundMusic');
const startButton=document.getElementById('startStory');
const musicToggle=document.getElementById('musicToggle');
const musicStatus=document.getElementById('musicStatus');
const musicNote=document.getElementById('musicNote');
let musicStarted=false;
function showScene(n){
 current=Math.max(0,Math.min(n,scenes.length-1));
 scenes.forEach((s,i)=>s.classList.toggle('active',i===current));
 count.textContent=`${String(current+1).padStart(2,'0')} / ${String(scenes.length).padStart(2,'0')}`;
 bar.style.width=`${(current+1)/scenes.length*100}%`;
 back.disabled=current===0;next.disabled=current===scenes.length-1;
 next.style.opacity=next.disabled?'.25':'1';window.scrollTo({top:0,behavior:'smooth'});
}
async function startMusic(){
 if(musicStarted)return;
 try{
  audio.volume=.65;await audio.play();musicStarted=true;
  musicToggle.hidden=false;musicToggle.textContent='♫ Pausar música';
  musicStatus.textContent='Sonando: Vámonos a Marte';
  musicNote.textContent='♫ Nuestra canción acompaña esta historia';
 }catch(e){
  musicStatus.textContent='Añade el MP3 indicado en LEEME.txt para escuchar la canción.';
  musicNote.textContent='♫ Falta agregar el archivo de música (revisa LEEME.txt)';
 }
}
startButton.addEventListener('click',()=>{startMusic();showScene(1);});
document.querySelectorAll('[data-next]').forEach(b=>b.addEventListener('click',()=>showScene(current+1)));
back.addEventListener('click',()=>showScene(current-1));next.addEventListener('click',()=>showScene(current+1));
document.getElementById('restart').addEventListener('click',()=>showScene(0));
musicToggle.addEventListener('click',()=>{
 if(audio.paused){audio.play().then(()=>{musicToggle.textContent='♫ Pausar música';musicStatus.textContent='Sonando: Vámonos a Marte';}).catch(()=>{musicStatus.textContent='No se pudo reproducir el archivo de música.';});}
 else{audio.pause();musicToggle.textContent='♫ Reanudar música';musicStatus.textContent='Música en pausa';}
});
audio.addEventListener('error',()=>{if(musicStarted)musicStatus.textContent='No se encontró el MP3. Revisa assets/musica.';});
const stars=document.getElementById('stars');
for(let i=0;i<110;i++){const s=document.createElement('span');s.className='star';s.style.left=Math.random()*100+'%';s.style.top=Math.random()*100+'%';s.style.animationDelay=Math.random()*4+'s';s.style.animationDuration=2+Math.random()*4+'s';const size=1+Math.random()*2;s.style.width=size+'px';s.style.height=size+'px';stars.appendChild(s);}
showScene(0);