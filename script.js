// EDIT YOUR PORTFOLIO HERE. Set image to a relative path such as "assets/rover.jpg".
// Leave image empty to show a picture placeholder. Add case study details as they become available.
const projects = [
  {
    "name": "ESPURR",
    "category": "WEARABLE ROBOTICS · FPGA · HCI",
    "caption": "A wearable companion designed to notice the world alongside you, respond to shared moments, and help you revisit what you choose to keep.",
    "image": "assets/espurr.png",
    "alt": "Espurr wearable concept sketch showing a cat-shaped headpiece with a speaker and EEG electrodes",
    "question": "How can a wearable companion respond to its wearer without becoming intrusive? ESPURR explores subtle interactions while leaving the wearer in control of what gets saved.",
    "role": "I built a 101-tap Verilog FIR filter and RMS detector on the PYNQ-Z2, connected through AXI DMA. An adaptive Python detector triggers an Arduino-controlled servo when recorded EEG activity changes.",
    "outcome": "The prerecorded Muse 2 EEG-to-servo pipeline works, with FPGA timing met at 50 MHz. Live EEG, camera context, listening mode, and a memory dock are planned. Signal changes are not interpreted as emotions or memories.",
    "github": "https://github.com/yutong-ji356/Espurr---the-neuroadaptive-companion"
  },
  {
    "name": "home audio project",
    "category": "AUDIO ELECTRONICS",
    "caption": "A home audio system combining a three-band graphic equalizer, Class-D amplifier, and Arduino-driven OLED audio display.",
    "images": [
      {
        "src": "assets/home-audio-project.png",
        "alt": "Home audio system block diagram"
      },
      {
        "src": "assets/home-audio-prototype.png",
        "alt": "Breadboard home audio prototype with labeled equalizer, Class-D amplifier, RLC filter, peak detector, and Arduino"
      }
    ],
    "image": "assets/home-audio-project.png",
    "alt": "Home audio system block diagram showing bass, mid, and treble filters, a summing amplifier and peak detector, Arduino and OLED spectrum display, and a Class-D amplifier output stage.",
    "question": "How can an audio system give listeners control over tone while making the signal visible? This course project brings analog filtering, switching amplification, and an embedded display into one design.",
    "role": "I worked on turning the circuit design into breadboard hardware, integrating and troubleshooting the equalizer, amplifier, and display. The signal path combines bass, mid, and treble filters with a summing stage, PWM amplification, and an RLC output filter.",
    "outcome": "Building and testing the subsystems strengthened my circuit-debugging and integration skills. Design targets included 100 Hz–8 kHz coverage, ±12 dB tone control, and PWM switching at 80 kHz or above. The OLED displays real-time levels across the three bands."
  },
  {
    "name": "hackmit 2026",
    "category": "HACKATHON",
    "caption": "MemoryPalace explores how EEG-informed capture and a searchable visual archive can help people revisit their experiences.",
    "image": "assets/hackmit-2026.png",
    "alt": "MemoryPalace project title slide for HackMIT 2026",
    "question": "How can we preserve moments without constantly reaching for a phone? Our team explored connecting changes in EEG activity with visual context for later reflection.",
    "role": "I built the camera glasses for the project, contributing the wearable capture hardware to our team’s MemoryPalace concept.",
    "outcome": "The team developed a capture-and-retrieval prototype with a web interface for revisiting recorded moments. The repository’s current demo uses a phone camera and simulated EEG triggers; it demonstrates the workflow rather than validated detection of meaningful moments.",
    "projectUrl": "https://plume.hackmit.org/project/ekkeo-uldro-ffuzo-fsegk"
  },
  {
    "name": "concrete (touchdesigner)",
    "category": "INTERACTIVE & VISUAL EXPERIMENTS",
    "caption": "A Brutalist-inspired structure in TouchDesigner that responds to hand gestures. Made for fun, with an interest in how digital forms can feel physical.",
    "image": "assets/concrete-touchdesigner.png",
    "alt": "Concrete TouchDesigner interface showing hand tracking and a generated geometric visual",
    "question": "I wanted to see how moving my hands could change the way I interact with a structure on screen.",
    "role": "I used instancing to create the architecture and worked with PBR to give it a concrete-like surface. MediaPipe hand tracking lets me control it through gestures.",
    "outcome": "The result is a small interactive piece that I can keep experimenting with. I enjoyed finding movements that made the structure feel responsive."
  }
];

const contactEmail = 'jiyutong356@gmail.com'; // Add your public email here.
const metal = '<defs><linearGradient id="m" x1="0" y1="0" x2="1" y2=".7"><stop stop-color="#383e39"/><stop offset=".22" stop-color="#cbd0c9"/><stop offset=".39" stop-color="#fafbf4"/><stop offset=".48" stop-color="#717a72"/><stop offset=".65" stop-color="#dce1d8"/><stop offset=".82" stop-color="#8a9389"/><stop offset="1" stop-color="#303a32"/></linearGradient></defs>';
function illustration(type){return '<span class="image-placeholder"><span class="placeholder-icon" aria-hidden="true"></span><span class="placeholder-label">PROJECT IMAGE</span></span>';}

let current=0,opened=false;
const wheel=document.querySelector('#wheel-items'), image=document.querySelector('#selected-image'), panel=document.querySelector('#inline-details');
function renderImage(container,p){container.replaceChildren();const pictures=p.images|| (p.image?[{src:p.image,alt:p.alt}]:[]);if(pictures.length){const gallery=document.createElement('span');gallery.className='project-photo-grid'+(pictures.length>1?' multiple':'');pictures.forEach(picture=>{const img=document.createElement('img');img.src=picture.src;img.alt=picture.alt;gallery.append(img)});container.append(gallery)}else container.innerHTML=illustration(p.art);}


// Keep a continuous position; repeated slots are recycled only outside the viewport.
let wheelPosition=0,wheelTarget=0,wheelFrame=0;
for(let slot=0;slot<projects.length;slot++){const b=document.createElement('button');b.className='wheel-item';b.innerHTML='<span class="wheel-number"></span><span class="wheel-name"></span>';b.onclick=()=>{const target=Number(b.dataset.position);opened=target===wheelTarget;show(target)};wheel.append(b)}
function paintWheel(){const base=Math.floor(wheelPosition);[...wheel.children].forEach((b,slot)=>{const position=slot;const n=slot;const offset=position-wheelPosition;b.dataset.position=position;b.querySelector('.wheel-number').textContent=String(n+1).padStart(2,'0');b.querySelector('.wheel-name').textContent=projects[n].name;b.style.setProperty('--offset',offset);b.style.opacity=Math.max(0,1-Math.abs(offset)*.65);b.style.visibility=Math.abs(offset)>2.5?'hidden':'visible';b.setAttribute('aria-current',String(position===wheelTarget));b.tabIndex=Math.abs(offset)<1.5?0:-1;});}
function animateWheel(){const distance=wheelTarget-wheelPosition;wheelPosition=Math.abs(distance)<.001?wheelTarget:wheelPosition+distance*.19;paintWheel();if(wheelPosition!==wheelTarget)wheelFrame=requestAnimationFrame(animateWheel);else wheelFrame=0;}
function moveWheel(target){wheelTarget=target;if(matchMedia('(prefers-reduced-motion: reduce)').matches){wheelPosition=target;paintWheel();return;}if(!wheelFrame)wheelFrame=requestAnimationFrame(animateWheel);}
function show(i){i=Math.max(0,Math.min(projects.length-1,i));current=i;moveWheel(i);const p=projects[current];renderImage(image,p);image.setAttribute('aria-label','Show details for '+p.name);const before=document.querySelector('.peek-before'),after=document.querySelector('.peek-after');before.style.visibility=current===0?'hidden':'visible';after.style.visibility=current===projects.length-1?'hidden':'visible';if(p.images||p.image){before.style.visibility='hidden';after.style.visibility='hidden';}if(current>0)renderImage(before,projects[current-1]);if(current<projects.length-1)renderImage(after,projects[current+1]);panel.replaceChildren();if(opened){const category=document.createElement('span');category.className='inline-category';category.textContent=p.category;const title=document.createElement('h2');title.textContent=p.name;const caption=document.createElement('p');caption.textContent=p.caption;panel.append(category,title,caption);[['THE QUESTION',p.question||'Add the problem, the constraints, and what you wanted to discover.'],['MY CONTRIBUTION',p.role||'Describe your role, tools, and the decisions you made.'],['PROCESS & OUTCOME',p.outcome||'Add your iterations, testing, results, and lessons learned.']].forEach(([label,text])=>{const section=document.createElement('section'),h=document.createElement('h3'),body=document.createElement('p');h.textContent=label;body.textContent=text;section.append(h,body);panel.append(section)});if(p.github){const link=document.createElement('a');link.className='project-update-link';link.href=p.github;link.textContent='Follow ongoing development on GitHub ↗';panel.append(link);}if(p.projectUrl){const link=document.createElement('a');link.className='project-update-link';link.href=p.projectUrl;link.textContent='View HackMIT project ↗';panel.append(link);}panel.classList.add('is-open');}else{panel.innerHTML='<span class="detail-invitation">SELECT A PROJECT.<br>TAKE A CLOSER LOOK.</span>';panel.classList.remove('is-open')}}
function step(n){opened=false;show(wheelTarget+n)}
image.onclick=()=>{opened=true;show(wheelTarget)};
let scrollAmount=0,lastStep=0;document.querySelector('#explorer').addEventListener('wheel',e=>{if(e.ctrlKey||e.target.closest('.inline-details'))return;const delta=Math.abs(e.deltaY)>Math.abs(e.deltaX)?e.deltaY:e.deltaX;if(!delta)return;if((wheelTarget===0&&delta<0)||(wheelTarget===projects.length-1&&delta>0)){scrollAmount=0;return;}e.preventDefault();if(Date.now()-lastStep<350)return;scrollAmount+=delta;if(Math.abs(scrollAmount)>45){step(scrollAmount>0?1:-1);scrollAmount=0;lastStep=Date.now()}},{passive:false});
document.querySelector('#explorer').addEventListener('keydown',e=>{if(['ArrowDown','ArrowRight','ArrowUp','ArrowLeft'].includes(e.key)){const direction=['ArrowDown','ArrowRight'].includes(e.key)?1:-1;if((wheelTarget===0&&direction<0)||(wheelTarget===projects.length-1&&direction>0))return;e.preventDefault();step(direction)}});

// Vertical drags operate the wheel; horizontal image swipes preserve page scrolling.
let suppressImageClick=false;
image.addEventListener('click',event=>{if(suppressImageClick){event.stopImmediatePropagation();suppressImageClick=false;}},true);
function attachSwipe(element,axis){let startX=0,startY=0; element.addEventListener('touchstart',e=>{startX=e.changedTouches[0].clientX;startY=e.changedTouches[0].clientY;},{passive:true});element.addEventListener('touchend',e=>{const dx=e.changedTouches[0].clientX-startX,dy=e.changedTouches[0].clientY-startY;const primary=axis==='x'?dx:dy,secondary=axis==='x'?dy:dx;if(Math.abs(primary)>40&&Math.abs(primary)>Math.abs(secondary)){if(element===image){suppressImageClick=true;setTimeout(()=>suppressImageClick=false,400);}step(primary<0?1:-1);}},{passive:true});}
attachSwipe(document.querySelector('.project-wheel'),'y');attachSwipe(image,'x');

if(contactEmail){const a=document.querySelector('#email-link');a.hidden=false;a.href='mailto:'+contactEmail;a.textContent=contactEmail;}document.querySelector('#year').textContent=new Date().getFullYear();show(0);



