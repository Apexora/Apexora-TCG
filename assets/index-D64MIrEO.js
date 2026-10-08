var xm=Object.defineProperty;var Om=(n,e,t)=>e in n?xm(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var Ne=(n,e,t)=>Om(n,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=t(s);fetch(s.href,i)}})();let q,jn,fs,Ei,as,Pa=!1,It=!1,du=!1,id=0,oa=0,fu=0,hi=0;try{It=localStorage.getItem("cartas-mute")==="1"}catch{}const Mm=()=>It;function Lm(){It=!It;try{localStorage.setItem("cartas-mute",It?"1":"0")}catch{}return Pa&&Ei.gain.setTargetAtTime(It?0:.85,q.currentTime,.06),It}function Fm(n){id=n}const ne=n=>440*Math.pow(2,(n-69)/12),ls=(n,e)=>n+Math.random()*(e-n);function Um(n){const e=q.sampleRate,t=Math.floor(e*n),r=q.createBuffer(2,t,e);for(let s=0;s<2;s++){const i=r.getChannelData(s);let a=0;for(let l=0;l<t;l++){const u=l/t,h=.9-.78*u;a+=(Math.random()*2-1-a)*h,i[l]=l<e*.018?0:a*Math.pow(1-u,2.8)*(l<e*.02?.2:1)}for(const[l,u]of[[23,.5],[37,.35],[53,.3],[71,.22]])i[Math.floor(e*(l+s*5)/1e3)]+=u*(s?-1:1)}return r}function od(){if(Pa){q.state==="suspended"&&q.resume();return}q=new AudioContext,Pa=!0;const n=q.createDynamicsCompressor();n.threshold.value=-20,n.knee.value=18,n.ratio.value=3.5,n.attack.value=.004,n.release.value=.22;const e=q.createBiquadFilter();e.type="lowshelf",e.frequency.value=140,e.gain.value=2.5;const t=q.createBiquadFilter();t.type="highshelf",t.frequency.value=6500,t.gain.value=1.5,Ei=q.createGain(),Ei.gain.value=It?0:.85;const r=q.createGain();r.connect(e).connect(t).connect(n).connect(Ei).connect(q.destination);const s=q.createConvolver();s.buffer=Um(3.2);const i=q.createGain();i.gain.value=.9,s.connect(i).connect(r);const a=q.createDelay(1);a.delayTime.value=.375;const l=q.createGain();l.gain.value=.4;const u=q.createBiquadFilter();u.type="lowpass",u.frequency.value=2200,a.connect(u).connect(l).connect(a),u.connect(r),u.connect(s),jn=q.createGain(),fs=q.createGain(),fs.gain.value=.55;const h=(m,g,S)=>{m.connect(r);const k=q.createGain();if(k.gain.value=g,m.connect(k).connect(s),S){const N=q.createGain();N.gain.value=S,m.connect(N).connect(a)}};h(jn,.32,.06),h(fs,.6,.22),as=q.createWaveShaper();const f=new Float32Array(1024);for(let m=0;m<1024;m++){const g=m/512-1;f[m]=Math.tanh(g*4)*.8}as.curve=f,as.oversample="2x",as.connect(jn)}function De(n,e,t,r={}){const s=q.createGain(),i=q.createBiquadFilter(),a=q.createStereoPanner(),l=(r.vol??.1)*(r.det?.6:1),u=r.att??.004;if(i.type="lowpass",i.Q.value=r.q??.7,i.frequency.setValueAtTime(r.lp??9e3,e),r.lpEnd&&i.frequency.exponentialRampToValueAtTime(Math.max(40,r.lpEnd),e+t),a.pan.value=r.pan??0,s.gain.setValueAtTime(1e-4,e),s.gain.linearRampToValueAtTime(l,e+u),r.pad){const h=r.rel??t*.4;s.gain.setValueAtTime(l,e+Math.max(u,t-h)),s.gain.linearRampToValueAtTime(1e-4,e+t)}else s.gain.exponentialRampToValueAtTime(1e-4,e+t);i.connect(s).connect(a).connect(r.bus??jn);for(const h of r.det?[-r.det,r.det]:[0]){const f=q.createOscillator();if(f.type=r.type??"sine",f.frequency.setValueAtTime(n,e),f.detune.value=h,r.slide&&f.frequency.exponentialRampToValueAtTime(Math.max(20,n*Math.pow(2,r.slide/12)),e+t),r.vib){const m=q.createOscillator(),g=q.createGain();m.frequency.value=5,g.gain.value=r.vib,m.connect(g).connect(f.detune),m.start(e),m.stop(e+t+.1)}f.connect(i),f.start(e),f.stop(e+t+.1)}}function Ge(n,e,t,r={}){const s=q.createOscillator(),i=q.createOscillator(),a=q.createGain(),l=q.createGain(),u=q.createStereoPanner(),h=(r.idx??2)*n;s.frequency.value=n,i.frequency.value=n*(r.ratio??2.01),a.gain.setValueAtTime(h,e),a.gain.exponentialRampToValueAtTime(Math.max(1,h*.02),e+t),i.connect(a).connect(s.frequency),l.gain.setValueAtTime(1e-4,e),l.gain.linearRampToValueAtTime(r.vol??.1,e+(r.att??.003)),l.gain.exponentialRampToValueAtTime(1e-4,e+t),u.pan.value=r.pan??0,s.connect(l).connect(u).connect(r.bus??jn),s.start(e),i.start(e),s.stop(e+t+.1),i.stop(e+t+.1)}let is;function ad(){if(is)return is;is=q.createBuffer(1,q.sampleRate*2,q.sampleRate);const n=is.getChannelData(0);let e=0,t=0,r=0;for(let s=0;s<n.length;s++){const i=Math.random()*2-1;e=.99765*e+i*.099,t=.963*t+i*.2965,r=.57*r+i*1.0527,n[s]=(e+t+r+i*.1848)*.2}return is}function it(n,e,t={}){const r=q.createBufferSource(),s=q.createBiquadFilter(),i=q.createGain(),a=q.createStereoPanner(),l=t.att??.004;r.buffer=ad(),s.type=t.type??"bandpass",s.Q.value=t.q??1,s.frequency.setValueAtTime(t.f0??1e3,n),s.frequency.exponentialRampToValueAtTime(Math.max(30,t.f1??t.f0??1e3),n+e),i.gain.setValueAtTime(1e-4,n),i.gain.linearRampToValueAtTime(t.vol??.1,n+l),i.gain.exponentialRampToValueAtTime(1e-4,n+e),a.pan.value=t.pan??0,r.connect(s).connect(i).connect(a).connect(t.bus??jn),r.start(n,Math.random()*1.4),r.stop(n+e+.05)}function vt(n,e,t,r){const s=q.createOscillator(),i=q.createGain();s.frequency.setValueAtTime(e*2.2,n),s.frequency.exponentialRampToValueAtTime(e,n+.09),i.gain.setValueAtTime(t,n),i.gain.exponentialRampToValueAtTime(1e-4,n+.7),s.connect(i).connect(r??jn),s.start(n),s.stop(n+.75),it(n,.06,{type:"lowpass",f0:1200,f1:300,vol:t*.5,bus:r})}const ze=()=>q.currentTime+.01,aa={hover:()=>Ge(ne(96),ze(),.09,{vol:.02,ratio:3.5,idx:.8,pan:ls(-.3,.3)}),click:()=>{const n=ze();it(n,.06,{f0:2200,f1:900,q:2,vol:.12}),De(220,n,.1,{vol:.14,slide:-7})},select:()=>{const n=ze();Ge(ne(84),n,.5,{vol:.07,ratio:2,idx:1.2,pan:-.15}),Ge(ne(91),n+.06,.6,{vol:.05,ratio:2,idx:1,pan:.15})},start:()=>{const n=ze();[38,45,50,57,62,65].forEach((t,r)=>De(ne(t),n,2.4,{type:"sawtooth",vol:.035,att:1,pad:!0,rel:1.2,lp:300,lpEnd:3200,det:9,pan:(r-2.5)*.15})),it(n,1.3,{f0:300,f1:7e3,q:.8,vol:.13,att:1.15}),vt(n,40,.5);const e=n+1.25;vt(e,48,1),[62,65,69,74,81].forEach((t,r)=>De(ne(t),e,2.6,{type:"triangle",vol:.06,lp:4e3,pan:(r-2)*.25})),Ge(ne(86),e,3,{vol:.09,ratio:1.5,idx:2})},pass:()=>{const n=ze();it(n,.35,{f0:600,f1:200,q:1.2,vol:.09,att:.08}),De(ne(50),n,.3,{vol:.08,slide:-5})},summon:()=>{const n=ze();vt(n,48,.9),it(n,.5,{type:"lowpass",f0:3e3,f1:150,q:.7,vol:.25}),[81,86,90,93].forEach((e,t)=>Ge(ne(e),n+.05+t*.05,1.2,{vol:.05,ratio:3,idx:1.5,pan:(t-1.5)*.3})),De(ne(38),n,.9,{type:"sawtooth",vol:.08,lp:1500,lpEnd:150,det:12,att:.02})},spell_lum:()=>{const n=ze();[74,76,78,81,83,86,90].forEach((e,t)=>De(ne(e),n+t*.055,1.3,{type:"triangle",vol:.07,pan:-.5+t*.16})),Ge(ne(93),n+.4,2.2,{vol:.06,ratio:2.76,idx:1}),it(n,1.2,{type:"highpass",f0:5e3,f1:9e3,vol:.05,att:.5})},spell_umb:()=>{const n=ze();De(ne(50),n,1.4,{type:"sawtooth",vol:.12,slide:-12,lp:2400,lpEnd:100,det:15}),De(ne(25),n,1.6,{vol:.35,att:.05}),it(n,1.2,{type:"lowpass",f0:200,f1:2600,vol:.18,att:.9}),Ge(ne(63),n+.2,2,{ratio:1.414,idx:3,vol:.06,pan:-.3}),Ge(ne(57),n+.2,2,{ratio:1.414,idx:3,vol:.05,pan:.3})},attack:()=>{const n=ze(),e=n+.2;it(n,.22,{f0:800,f1:7e3,q:1.5,vol:.18,att:.12}),Ge(ne(88),e,.7,{ratio:3.1,idx:3,vol:.09}),Ge(ne(95),e,.5,{ratio:4.7,idx:2,vol:.05}),vt(e,70,.5),it(e,.12,{type:"highpass",f0:3e3,f1:1500,vol:.15})},hurt:()=>{const n=ze();vt(n,45,1),De(ne(40),n,.5,{type:"sawtooth",vol:.18,lp:1200,lpEnd:120,bus:as}),it(n,.35,{type:"lowpass",f0:2500,f1:100,vol:.3}),Ge(ne(79),n+.02,1.2,{ratio:1.41,idx:2,vol:.04})},heal:()=>{const n=ze();[74,78,81,86].forEach((e,t)=>Ge(ne(e),n+t*.08,1.4,{vol:.06,ratio:2,idx:.8,pan:-.3+t*.2})),[62,69].forEach(e=>De(ne(e),n,1.6,{vol:.08,att:.3,pad:!0}))},death:()=>{const n=ze();De(ne(55),n,1,{type:"sawtooth",vol:.14,slide:-14,lp:2500,lpEnd:100,det:14}),it(n,.9,{f0:3e3,f1:150,q:.6,vol:.16}),vt(n+.05,42,.7)},round:()=>{const n=ze();[1,2.32,3.17,4.1,5.4].forEach((e,t)=>De(ne(43)*e,n,3.6-t*.4,{vol:.09/(t+1),pan:(t%2?1:-1)*.2})),vt(n,52,.8),it(n,.5,{f0:500,f1:3e3,vol:.06,att:.4})},win:()=>{const n=ze();[[62,66,69,74],[67,71,74,79],[69,73,76,81,86]].forEach((e,t)=>{e.forEach((r,s)=>{De(ne(r),n+t*.45,1.9,{type:"triangle",vol:.055,lp:5e3,pan:(s-2)*.2}),Ge(ne(r+12),n+t*.45+.02*s,1.8,{vol:.03,ratio:2,idx:.7})})}),vt(n+.9,50,.8)},lose:()=>{const n=ze();[62,60,57,55,50].forEach((e,t)=>De(ne(e),n+t*.5,2,{type:"sawtooth",vol:.07,lp:900,lpEnd:150,det:10,att:.1})),De(ne(26),n,3,{vol:.2,att:.4,pad:!0})},msg:()=>{const n=ze();Ge(ne(93),n,.5,{vol:.05,ratio:2,idx:.6}),Ge(ne(98),n+.08,.6,{vol:.04,ratio:2,idx:.6})}},wi=new Map;function $m(n){wi.has(n)||(wi.set(n,null),fetch(`/sfx/${n}.mp3`).then(e=>{e.ok&&(e.headers.get("content-type")||"").startsWith("audio")&&wi.set(n,e.url)}).catch(()=>{}))}function he(n){var t;if(It)return;$m(n);const e=wi.get(n);if(e){const r=new Audio(e);r.volume=.7,r.play().catch(()=>{});return}try{od(),(t=aa[n])==null||t.call(aa)}catch{}}const Ti=60/72,Ii=Ti*4,Bm=[38,34,41,36],qm=[[62,65,69,74],[58,62,65,70],[57,60,65,69],[55,60,64,67]],pu=[62,65,67,69,72,74,77];function jm(n,e){if(It||document.hidden)return;oa+=(id-oa)*.5;const t=e%4,r=qm[t],s=oa,i=fs;if(r.forEach((l,u)=>De(ne(l),n,Ii*1.08,{type:"sawtooth",vol:.02,att:1.2,pad:!0,rel:1.3,lp:650+s*900,det:8+u*2,pan:(u-1.5)*.35,bus:i})),De(ne(Bm[t]),n,Ii*1.02,{vol:.15,att:.25,pad:!0,rel:1,bus:i}),[0,2,1,3,2,1,3,2].forEach((l,u)=>{if(Math.random()<(s?.9:.7)){const h=r[l]+(u%4===3&&Math.random()<.4?12:0)+12;De(ne(h),n+u*Ti/2,1.1,{type:"triangle",vol:.035+s*.01,pan:Math.sin(u)*.5,bus:i})}}),e%2===0&&Math.random()<.7&&Ge(ne(pu[Math.floor(Math.random()*pu.length)]+12),n+Ti*(Math.random()<.5?0:2),3,{vol:.045,ratio:2,idx:.7,pan:ls(-.5,.5),bus:i}),t===0&&vt(n,44,.35,i),s>.5)for(let l=0;l<4;l++)vt(n+l*Ti,l%2?80:58,l===2?.28:.18,i);for(let l=0;l<4;l++)Math.random()<.6&&it(n+ls(0,Ii),.03,{type:"highpass",f0:4e3,f1:3e3,vol:ls(.008,.02),pan:ls(-.8,.8),bus:i})}function zm(){const n=q.createBufferSource(),e=q.createBiquadFilter(),t=q.createGain(),r=q.createOscillator(),s=q.createGain();n.buffer=ad(),n.loop=!0,e.type="bandpass",e.frequency.value=420,e.Q.value=.9,t.gain.value=.045,r.frequency.value=.07,s.gain.value=.03,r.connect(s).connect(t.gain);const i=q.createOscillator(),a=q.createGain();return i.frequency.value=.05,a.gain.value=250,i.connect(a).connect(e.frequency),n.connect(e).connect(t).connect(fs),n.start(),r.start(),i.start(),()=>{t.gain.setTargetAtTime(0,q.currentTime,.4),setTimeout(()=>{n.stop(),r.stop(),i.stop()},2e3)}}function Hm(){du||(od(),du=!0,fu=0,hi=q.currentTime+.15,zm(),window.setInterval(()=>{for(;hi<q.currentTime+1.3;)jm(hi,fu++),hi+=Ii},400))}const Gm={lum:[45,168],umb:[272,350],fire:[22,48],heal:[145,50]},ye=Math.random,U=(n,e)=>n+ye()*(e-n),la=n=>1-(1-n)**3;let lr,D,Ar=0,mn=0,Ca=!1,Va=0;const ur=[];function K(n){ur.push({x:0,y:0,vx:0,vy:0,g:0,d:1,t:0,life:600,delay:0,sz:4,gr:0,rot:0,vr:0,h:45,s:100,l:70,a:1,n:0,w:2,add:!0,x1:0,y1:0,bulge:0,pts:[],cx:0,cy:0,ang:0,rad:0,va:0,vrad:0,...n}),Ca||(Ca=!0,Va=performance.now(),requestAnimationFrame(ld))}const co=(n,e)=>setTimeout(e,n);function ld(n){const e=Math.min(40,n-Va),t=e/16.667;Va=n,D.clearRect(0,0,Ar,mn);for(let r=ur.length-1;r>=0;r--){const s=ur[r];if(s.delay>0){s.delay-=e;continue}if(s.t+=e,s.t>=s.life){ur.splice(r,1);continue}if(s.k==="vort"){if(s.ang+=s.va*e,s.rad+=s.vrad*e,s.rad<2){ur.splice(r,1);continue}s.x=s.cx+Math.cos(s.ang)*s.rad,s.y=s.cy+Math.sin(s.ang)*s.rad}else{s.vy+=s.g*t;const i=s.d**t;s.vx*=i,s.vy*=i,s.x+=s.vx*t,s.y+=s.vy*t,s.rot+=s.vr*t}Wm(s)}D.globalCompositeOperation="source-over",ur.length?requestAnimationFrame(ld):(Ca=!1,D.clearRect(0,0,Ar,mn))}function Wm(n){const e=n.t/n.life,t=1-e,r=s=>`hsla(${n.h},${n.s}%,${n.l}%,${Math.max(0,s)})`;switch(D.globalCompositeOperation=n.add?"lighter":"source-over",n.k){case"spark":D.lineCap="round",D.strokeStyle=r(t*.45),D.lineWidth=n.sz*2.6*t+1,D.beginPath(),D.moveTo(n.x,n.y),D.lineTo(n.x-n.vx*2.6,n.y-n.vy*2.6),D.stroke(),D.strokeStyle=`hsla(${n.h},60%,92%,${t})`,D.lineWidth=n.sz*t+.4,D.stroke();break;case"glow":case"smoke":case"vort":{const s=Math.max(1,n.sz*(1+n.gr*(n.k==="vort"?0:e))),i=n.a*(n.k==="smoke"?Math.min(1,e*6)*t:t),a=D.createRadialGradient(n.x,n.y,0,n.x,n.y,s);a.addColorStop(0,r(i)),a.addColorStop(.4,r(i*.45)),a.addColorStop(1,r(0)),D.fillStyle=a,D.beginPath(),D.arc(n.x,n.y,s,0,6.3),D.fill();break}case"ring":D.strokeStyle=r(n.a*t),D.lineWidth=n.w*t+.6,D.beginPath(),D.arc(n.x,n.y,n.sz+n.gr*la(e),0,6.3),D.stroke();break;case"shard":D.save(),D.translate(n.x,n.y),D.rotate(n.rot),D.fillStyle=r(t*.95),D.beginPath(),D.moveTo(0,-n.sz),D.lineTo(n.sz*.45,n.sz*.6),D.lineTo(-n.sz*.4,n.sz*.5),D.closePath(),D.fill(),D.strokeStyle=`hsla(${n.h},40%,95%,${t})`,D.lineWidth=1,D.stroke(),D.restore();break;case"rune":{const s=n.sz*la(Math.min(1,e*2.6)),i=n.a*(e<.12?e/.12:e>.6?(1-e)/.4:1),a=n.rot+n.vr*n.t;D.strokeStyle=r(i),D.lineWidth=2.2,D.beginPath(),D.arc(n.x,n.y,s,0,6.3),D.stroke(),D.lineWidth=1,D.beginPath(),D.arc(n.x,n.y,s*.84,0,6.3),D.stroke(),D.lineWidth=1.6,D.beginPath();for(let l=0;l<n.n;l++){const u=a+l/n.n*6.283,h=l%2?.93:.88;D.moveTo(n.x+Math.cos(u)*s*.84,n.y+Math.sin(u)*s*.84),D.lineTo(n.x+Math.cos(u)*s*(h+.07),n.y+Math.sin(u)*s*(h+.07))}if(D.stroke(),n.w>2){const l=n.w,u=l%2?(l-1)/2:l/2-1||1;D.lineWidth=1.8,D.beginPath();for(let h=0;h<=l;h++){const f=-a*.7-1.5708+h*u%l/l*6.283,m=n.x+Math.cos(f)*s*.8,g=n.y+Math.sin(f)*s*.8;h?D.lineTo(m,g):D.moveTo(m,g)}D.stroke()}break}case"pillar":{const s=n.sz*(.35+.65*Math.sin(Math.min(1,e*1.4)*1.57))*(e>.6?(1-e)/.4:1),i=n.a*(e<.1?e/.1:e>.55?(1-e)/.45:1),a=D.createLinearGradient(n.x-s,0,n.x+s,0);a.addColorStop(0,r(0)),a.addColorStop(.5,r(i)),a.addColorStop(1,r(0));const l=D.createLinearGradient(0,n.y-n.gr,0,n.y);l.addColorStop(0,"rgba(255,255,255,0)"),l.addColorStop(.4,"rgba(255,255,255,1)"),l.addColorStop(1,"rgba(255,255,255,0)"),D.fillStyle=a,D.fillRect(n.x-s,n.y-n.gr,s*2,n.gr);break}case"bolt":if(ye()<.25)break;D.lineJoin="round",D.strokeStyle=r(t*.7),D.lineWidth=n.sz*3,D.beginPath(),n.pts.forEach((s,i)=>i?D.lineTo(s[0],s[1]):D.moveTo(s[0],s[1])),D.stroke(),D.strokeStyle=`hsla(${n.h},50%,96%,${t})`,D.lineWidth=n.sz*.8,D.stroke();break;case"slash":{const s=la(Math.min(1,e*4)),i=n.x+(n.x1-n.x)*s,a=n.y+(n.y1-n.y)*s,l=(n.x+i)/2,u=(n.y+a)/2,h=-(a-n.y),f=i-n.x,m=Math.hypot(h,f)||1,g=n.bulge*s,S=h/m*g,k=f/m*g;D.beginPath(),D.moveTo(n.x,n.y),D.quadraticCurveTo(l+S,u+k,i,a),D.quadraticCurveTo(l+S*.3,u+k*.3,n.x,n.y),D.fillStyle=`hsla(${n.h},60%,96%,${t})`,D.shadowColor=`hsl(${n.h},100%,60%)`,D.shadowBlur=24,D.fill(),D.shadowBlur=0,D.strokeStyle=r(t*.7),D.lineWidth=3,D.stroke();break}}}const lt=(n,e=0)=>Gm[n][e];function Un(n,e,t,r,s,i={}){for(let a=0;a<t;a++){const l=i.rot??ye()*6.283,u=U(.35,1)*s,h=i.rot!==void 0?U(-.5,.5):0;K({k:"spark",x:n,y:e,vx:Math.cos(l+h)*u,vy:Math.sin(l+h)*u,g:.16,d:.93,life:U(420,820),sz:U(1.6,3),h:lt(r,ye()<.35?1:0),l:66,...i,rot:0})}}function Mi(n,e,t,r,s=U(-.9,-.5)){const i=Math.cos(s)*t,a=Math.sin(s)*t;K({k:"slash",x:n-i,y:e-a,x1:n+i,y1:e+a,bulge:t*.28,life:420,h:lt(r),s:100,l:66,add:!0}),K({k:"slash",x:n-i*.8,y:e-a*.8+t*.12,x1:n+i*.9,y1:e+a*.9+t*.12,bulge:t*.2,life:360,delay:60,h:lt(r,1),s:100,l:70,add:!0})}function Na(n,e,t,r,s=1){K({k:"glow",x:n,y:e,sz:t*.95,gr:1.1,life:420,h:lt(r),l:78,a:.95}),K({k:"glow",x:n,y:e,sz:t*.38,gr:.3,life:180,h:50,s:40,l:96,a:1}),K({k:"ring",x:n,y:e,sz:t*.12,gr:t*1.05,w:7,life:520,h:lt(r),l:72}),K({k:"ring",x:n,y:e,sz:t*.1,gr:t*.75,w:3,life:480,delay:90,h:lt(r,1),l:74}),Mi(n,e,t*.8,r),Un(n,e,Math.round(26*s),r,t*.1);for(let i=0;i<7*s;i++){const a=ye()*6.283,l=U(2,6)*t/110;K({k:"shard",x:n,y:e,vx:Math.cos(a)*l,vy:Math.sin(a)*l-1.5,g:.2,d:.97,rot:ye()*6,vr:U(-.25,.25),sz:t*U(.05,.1),life:U(520,860),h:lt(r,i%2),l:62})}for(let i=0;i<3;i++)K({k:"smoke",x:n+U(-8,8),y:e,vx:U(-.5,.5),vy:U(-.7,-.1),d:.98,sz:t*U(.3,.5),gr:1,life:U(700,1e3),a:.3,h:r==="umb"?272:30,s:40,l:r==="umb"?30:60})}const Da=n=>n.getBoundingClientRect();function Km(n,e,t){K({k:"glow",x:n,y:e,sz:t*.9,gr:.6,life:1100,h:46,l:82,a:.55}),K({k:"pillar",x:n,y:mn,sz:t*.55,gr:mn*1.1,life:1250,h:48,l:76,a:.7}),K({k:"rune",x:n,y:e,sz:t,n:28,w:8,life:1500,rot:0,vr:7e-4,h:46,l:72,a:.95}),K({k:"rune",x:n,y:e,sz:t*.62,n:18,w:6,life:1400,delay:80,rot:1,vr:-.0011,h:168,l:70,a:.85});for(let r=0;r<46;r++){const s=ye()*6.283,i=U(.2,1)*t;K({k:"glow",x:n+Math.cos(s)*i,y:e+Math.sin(s)*i*.55+t*.3,vx:U(-.3,.3),vy:-U(.8,3.2),g:-.01,d:.995,sz:U(3,8),life:U(800,1500),delay:ye()*600,h:ye()<.3?168:48,l:82,a:.9})}co(460,()=>{K({k:"ring",x:n,y:e,sz:t*.2,gr:t*2.1,w:10,life:800,h:48,l:80}),K({k:"ring",x:n,y:e,sz:t*.1,gr:t*1.5,w:4,life:700,h:168,l:80}),K({k:"glow",x:n,y:e,sz:t*1.3,gr:.5,life:500,h:50,s:40,l:96,a:.8}),Un(n,e,44,"lum",t*.085)})}function Qm(n,e,t){K({k:"smoke",x:n,y:e,sz:t*1.2,gr:.8,life:1500,h:270,s:60,l:14,a:.55,add:!1}),K({k:"rune",x:n,y:e,sz:t,n:20,w:5,life:1500,rot:0,vr:-9e-4,h:350,l:62,a:.95}),K({k:"rune",x:n,y:e,sz:t*.66,n:12,w:0,life:1400,delay:70,rot:2,vr:.0012,h:272,l:68,a:.85});for(let r=0;r<80;r++)K({k:"vort",cx:n,cy:e,ang:ye()*6.283,rad:U(.55,1.5)*t,va:U(.0035,.006),vrad:-U(6e-4,.0011)*t,sz:U(3,7),life:1200,delay:ye()*350,h:ye()<.5?272:350,l:68,a:.9});co(720,()=>{K({k:"glow",x:n,y:e,sz:t*1.1,gr:.8,life:520,h:300,s:90,l:70,a:.85}),K({k:"ring",x:n,y:e,sz:t*.15,gr:t*2.2,w:11,life:800,h:350,l:62}),K({k:"ring",x:n,y:e,sz:t*.1,gr:t*1.6,w:4,life:740,delay:80,h:272,l:72}),Un(n,e,52,"umb",t*.09);for(let r=0;r<7;r++){const s=ye()*6.283,i=[[n,e]];let a=n,l=e,u=s;for(let h=0;h<9;h++)u+=U(-.55,.55),a+=Math.cos(u)*t*.17,l+=Math.sin(u)*t*.17,i.push([a,l]);K({k:"bolt",pts:i,sz:2.4,life:520,h:r%2?350:280,l:66})}for(let r=0;r<8;r++){const s=ye()*6.283,i=U(3,8);K({k:"shard",x:n,y:e,vx:Math.cos(s)*i,vy:Math.sin(s)*i,d:.965,rot:ye()*6,vr:U(-.3,.3),sz:U(8,16),life:800,h:r%2?350:272,l:58})}for(let r=0;r<6;r++)K({k:"smoke",x:n+U(-30,30),y:e+U(-20,20),vx:U(-1,1),vy:U(-1,.2),d:.985,sz:t*U(.3,.55),gr:1.1,life:1300,h:275,s:55,l:16,a:.5,add:!1})})}function Jm(n,e,t,r){const s=document.createElement("div");s.className="dmgnum "+r,s.textContent=t,s.style.left=n+"px",s.style.top=e+"px",document.body.append(s),setTimeout(()=>s.remove(),1500)}function Xm(n,e){var k;const t=n.closest(".pt"),r=t==null?void 0:t.querySelector(".ava"),s=r?Da(r):e,i=!!(t!=null&&t.classList.contains("me")),a=(((k=n.querySelector(".fx"))==null?void 0:k.textContent)??"").trim(),l=Math.abs(parseInt(a.replace(/[^\d-]/g,""),10)||3),u=Math.min(2,.8+l*.13),h=s.left+s.width/2,f=s.top+s.height/2,m=s.width*2.3*u;K({k:"glow",x:h,y:f,sz:m*1.35,gr:.9,life:560,h:358,l:62,a:1}),K({k:"glow",x:h,y:f,sz:m*.55,gr:.4,life:240,h:40,s:30,l:97,a:1}),K({k:"ring",x:h,y:f,sz:m*.15,gr:m*1.7,w:14,life:760,h:355,l:62}),K({k:"ring",x:h,y:f,sz:m*.1,gr:m*1.2,w:7,life:700,delay:80,h:25,l:68}),K({k:"ring",x:h,y:f,sz:m*.1,gr:m*2.4,w:3,life:900,delay:170,h:350,l:70}),Mi(h,f,m*.95,"fire",-.75),Mi(h,f,m*.95,"umb",.75);for(let N=0;N<16;N++){const V=N/16*6.283+U(-.1,.1);Un(h,f,1,"fire",m*.26,{rot:V,life:U(380,620),sz:3.4})}Un(h,f,Math.round(60*u),"fire",m*.12),Un(h,f,24,"umb",m*.1);for(let N=0;N<16;N++){const V=ye()*6.283,G=U(3,9)*m/140;K({k:"shard",x:h,y:f,vx:Math.cos(V)*G,vy:Math.sin(V)*G-2,g:.24,d:.975,rot:ye()*6,vr:U(-.3,.3),sz:m*U(.05,.11),life:U(600,1e3),h:N%3?355:28,l:60})}for(let N=0;N<5;N++)K({k:"smoke",x:h+U(-14,14),y:f,vx:U(-.8,.8),vy:U(-1,-.2),d:.985,sz:m*U(.3,.5),gr:1.1,life:U(900,1300),a:.35,h:355,s:50,l:22,add:!1});co(140,()=>{Na(h,f,m*.6,"fire",1),Un(h,f,30,"fire",m*.14)});const g=document.createElement("div");g.className="nexflash"+(i?" mine":" foe"),document.body.append(g),setTimeout(()=>g.remove(),900);const S=document.getElementById("app");S&&(S.classList.remove("shk-soft","shk-hard"),S.offsetWidth,S.classList.add("shk-hard")),Jm(h,f-s.height*.15,a||"−"+l,i?"mine":"foe")}const di=new Map,Dn=(n,e)=>{const t=performance.now();return t-(di.get(n)??-1e9)<e?!1:(di.set(n,t),di.size>80&&di.clear(),!0)},mu=n=>n.classList.contains("umb")?"umb":"lum";function Ym(n){const e=Da(n),t=e.left+e.width/2,r=e.top+e.height/2,s=n.className.split(" ")[0]+Math.round(t/24)+","+Math.round(r/24),i=n.classList;if(i.contains("cast")){if(!Dn("cast",500))return;const a=document.querySelector(".plane-wrap"),l=a?Da(a):null,u=l?l.left+l.width/2:Ar/2,h=l?l.top+l.height*.5:mn/2,f=Math.min(l?l.width:Ar,l?l.height:mn)*.42;(i.contains("umb")?Qm:Km)(u,h,f)}else if(i.contains("card")&&i.contains("attacking")){if(!Dn("a"+s,800))return;const a=mu(n),l=i.contains("up")?-1:1,u=e.width;K({k:"glow",x:t,y:r,sz:u*.95,gr:.2,life:520,h:lt(a),l:70,a:.6});for(let h=0;h<18;h++){const f=ye()*6.283,m=u*U(.8,1.5);K({k:"vort",cx:t,cy:r,ang:f,rad:m,va:.004,vrad:-m/360,sz:U(2.5,5),life:380,delay:ye()*90,h:lt(a,h%3?0:1),l:76,a:.9})}co(430,()=>{const h=t,f=r+l*(e.height*.5+46);for(let m=0;m<12;m++)K({k:"spark",x:t+U(-u*.4,u*.4),y:r+l*e.height*.3,vx:U(-1.2,1.2),vy:-l*U(3,9),g:0,d:.93,life:U(260,480),sz:2,h:lt(a,m%2),l:72});K({k:"ring",x:h,y:f,sz:u*.1,gr:u*.95,w:6,life:380,h:lt(a),l:76}),Mi(h,f,u*.75,a,l<0?U(-2.5,-2.1):U(.55,1))})}else if(i.contains("card")&&i.contains("dying")){if(!Dn("d"+s,900))return;const a=mu(n),l=e.width;Na(t,r,l*1.05,a,1.1);for(let u=0;u<14;u++)K({k:"glow",x:t+U(-l*.35,l*.35),y:r+U(-l*.2,l*.3),vx:U(-.3,.3),vy:-U(.6,2),g:-.008,sz:U(3,7),life:U(900,1500),delay:ye()*250,h:lt(a,u%2),l:80,a:.9})}else if(i.contains("card")&&i.contains("hurt")){if(!Dn("h"+s,500))return;Na(t,r,e.width*.75,"fire",.7)}else if(i.contains("card")&&i.contains("boost")){if(!Dn("b"+s,500))return;K({k:"ring",x:t,y:r+e.height*.2,sz:e.width*.2,gr:e.width*.8,w:4,life:600,h:145,l:74});for(let a=0;a<16;a++)K({k:"glow",x:t+U(-e.width*.4,e.width*.4),y:r+e.height*.35,vy:-U(1,3.2),g:-.02,d:.99,sz:U(3,6),life:U(600,1e3),delay:ye()*250,h:ye()<.5?145:48,l:78,a:.9})}else if(i.contains("orb")&&i.contains("hit")){if(!Dn("oh"+s,700))return;Xm(n,e)}else if(i.contains("orb")&&i.contains("heal")){if(!Dn("oe"+s,700))return;K({k:"ring",x:t,y:r,sz:e.width*.3,gr:e.width*1.5,w:5,life:700,h:145,l:74}),K({k:"glow",x:t,y:r,sz:e.width*1.3,gr:.5,life:600,h:145,l:78,a:.7});for(let a=0;a<22;a++)K({k:"glow",x:t+U(-e.width,e.width),y:r+U(0,e.width*.6),vy:-U(1,3),g:-.02,d:.99,sz:U(3,7),life:U(700,1300),delay:ye()*300,h:ye()<.5?145:48,l:80,a:.9})}}const gu=".card.attacking,.card.dying,.card.hurt,.card.boost,.orb.hit,.orb.heal,.vfx.cast";function Zm(){if(matchMedia("(prefers-reduced-motion:reduce)").matches)return;lr=document.createElement("canvas"),lr.id="combatfx",document.body.append(lr),D=lr.getContext("2d");const n=()=>{const e=Math.min(2,devicePixelRatio||1);Ar=innerWidth,mn=innerHeight,lr.width=Ar*e,lr.height=mn*e,D.setTransform(e,0,0,e,0,0)};n(),addEventListener("resize",n),new MutationObserver(e=>{const t=[];e.forEach(r=>r.addedNodes.forEach(s=>{s instanceof HTMLElement&&(s.matches(gu)&&t.push(s),s.querySelectorAll(gu).forEach(i=>t.push(i)))})),t.forEach(Ym)}).observe(document.body,{childList:!0,subtree:!0})}const ca=(n,e,t)=>n.style.setProperty(e,t);function eg(){const n=document.createElement("canvas");n.id="embers",document.body.prepend(n);const e=n.getContext("2d");let t=0,r=0;const s=[],i=()=>{t=n.width=innerWidth,r=n.height=innerHeight};i(),addEventListener("resize",i);for(let l=0;l<90;l++)s.push({x:Math.random()*2e3,y:Math.random()*1200,r:Math.random()*2+.4,v:Math.random()*.5+.12,a:Math.random()*.6+.2,hue:Math.random()<.55?40:265,ph:Math.random()*6});let a=0;(function l(){a+=.01,e.clearRect(0,0,t,r);for(const u of s){u.y-=u.v,u.x+=Math.sin(a+u.ph)*.35,u.y<-10&&(u.y=r+10,u.x=Math.random()*t);const h=.6+Math.sin(a*3+u.ph)*.4;e.beginPath(),e.fillStyle=`hsla(${u.hue},95%,68%,${u.a*h})`,e.shadowColor=`hsl(${u.hue},95%,60%)`,e.shadowBlur=10,e.arc(u.x%t,u.y,u.r,0,6.3),e.fill()}requestAnimationFrame(l)})()}function tg(){const n=document.createElement("div");n.id="glow",document.body.append(n);let e=0,t=0,r=0,s=0;addEventListener("pointermove",i=>{r=i.clientX,s=i.clientY}),function i(){e+=(r-e)*.14,t+=(s-t)*.14,n.style.transform=`translate(${e-160}px,${t-160}px)`,requestAnimationFrame(i)}()}function ng(){let n=null;document.addEventListener("pointermove",t=>{const r=t.target.closest(".card");if(!r)return;const s=r.getBoundingClientRect(),i=(t.clientX-s.left)/s.width,a=(t.clientY-s.top)/s.height;ca(r,"--mx",(i*100).toFixed(1)+"%"),ca(r,"--my",(a*100).toFixed(1)+"%"),ca(r,"--ang",((i-.5)*60).toFixed(1)+"deg")});let e=0;document.addEventListener("pointerover",t=>{const r=t.target.closest(".slotc,.card[data-a],button,.btn");if(!r||r===n)return;n=r;const s=performance.now();s-e>70&&(he("hover"),e=s)}),document.addEventListener("pointerout",()=>{n=null})}function rg(){new MutationObserver(n=>n.forEach(e=>e.addedNodes.forEach(t=>{if(!(t instanceof HTMLElement)||!t.classList.contains("vfx"))return;const r=t.classList;r.contains("vhit")?fi("hard"):r.contains("banner")&&!r.contains("small")?_u("#ffd27a33"):r.contains("cast")?(_u(r.contains("lum")?"#8fe9ff33":"#a24dff44"),fi("soft")):r.contains("report")&&fi("soft")}))).observe(document.body,{childList:!0}),new MutationObserver(()=>document.querySelectorAll(".card.attacking:not(.fxdone)").forEach(n=>{n.classList.add("fxdone"),fi("soft")})).observe(document.getElementById("app"),{childList:!0,subtree:!0})}function fi(n){const e=document.getElementById("app");e.classList.remove("shk-soft","shk-hard"),e.offsetWidth,e.classList.add("shk-"+n)}function _u(n){const e=document.createElement("div");e.className="flash",e.style.background=`radial-gradient(circle at 50% 50%,${n},transparent 70%)`,document.body.append(e),setTimeout(()=>e.remove(),700)}let Li=null;function cd(){if(Li)return;const n=Li=document.createElement("div");n.id="title",n.innerHTML=`<div class="t-bg"></div><div class="t-art l"></div><div class="t-art u"></div>
    <div class="t-in"><p class="t-kicker"><i></i>DUELO DE LEYENDAS<i></i></p><h1>CARTAS</h1><div class="t-sub"><i></i><span>ALFA</span><i></i></div>
    <div class="t-fac"><b class="l">☀ LUMINARAE</b><i>◆</i><b class="u">UMBRA ☾</b></div>
    <div class="t-menu"><button class="t-go" data-m="ia" autofocus>⚔ JUGAR CONTRA LA IA</button><button class="t-go alt" data-m="online">🌐 JUGAR ONLINE</button></div>
    <p class="t-hint">Elige un modo · sonido activado</p></div>`,document.body.append(n),n.querySelectorAll("[data-m]").forEach(e=>e.addEventListener("click",()=>{he("start"),Hm(),e.dataset.m==="ia"?(ud(),document.dispatchEvent(new Event("menu:ia"))):document.dispatchEvent(new Event("menu:online"))}))}function ud(){const n=Li;n&&(Li=null,n.classList.add("out"),setTimeout(()=>n.remove(),900))}function sg(){cd()}function ig(){Zm(),eg(),tg(),ng(),rg(),sg()}const ee=(n,e,t,r,s,i=[],a="",l=[],u)=>({id:n,name:e,cost:t,type:"unit",atk:r,hp:s,kw:i,text:a,fx:l,grow:u}),me=(n,e,t,r,s,i)=>({id:n,name:e,cost:t,type:"spell",atk:0,hp:0,kw:[],text:s,fx:i,speed:r}),hd=[ee("lum_acolita","Acólita del Alba",1,1,1,[],"Al jugarla: cura 2 a tu Nexo.",[{t:"healNexus",n:2}]),ee("lum_vigia","Vigía del Alba",1,1,2,["regenera"]),ee("lum_centinela","Centinela Radiante",2,2,2,["barrera"]),ee("lum_portador","Portador de Luz",2,2,1,[],"Al jugarla: +1/+1 a otra aliada.",[{t:"buffOther",a:1,h:1}]),ee("lum_halcon","Halcón Dorado",2,3,1,["elusivo"]),ee("lum_novicia","Novicia Curandera",2,1,3,["robovida"]),ee("lum_sanadora","Sanadora de Aurora",3,3,3,["robovida"]),ee("lum_vidente","Vidente del Alba",3,2,3,[],"Al jugarla: roba 1.",[{t:"draw",n:1}]),ee("lum_oraculo","Oráculo Sereno",3,2,2,[],"Al jugarla: roba 1 y cura 2 a tu Nexo.",[{t:"draw",n:1},{t:"healNexus",n:2}]),ee("lum_paladin","Paladín Alado",4,3,4,["barrera"]),ee("lum_heraldo","Heraldo Solar",4,2,3,[],"Al jugarla: +1/+1 a tus unidades.",[{t:"buffAll",a:1,h:1}]),ee("lum_coloso","Coloso de Marfil",5,4,4,["barrera","robovida"]),ee("lum_lider","Capitana Aurora",5,4,5,["rapido","retador"]),ee("lum_serafin","Serafín Eterno",6,5,6,["elusivo","robovida"]),ee("lum_arcangel","Arcángel del Amanecer",7,5,5,["barrera"],"Al jugarla: cura 4 a tu Nexo.",[{t:"healNexus",n:4}]),me("lum_destello","Destello Sanador",1,"burst","Cura 4 a tu Nexo.",[{t:"healNexus",n:4}]),me("lum_rocio","Rocío Vital",1,"burst","Cura 3 a una unidad aliada.",[{t:"healUnit",n:3}]),me("lum_fervor","Fervor",2,"burst","Una aliada gana +2/+0 esta ronda.",[{t:"tempBuff",a:2,h:0}]),me("lum_escudo","Escudo de Fe",2,"fast","Una aliada gana Barrera.",[{t:"giveKw",kw:"barrera"}]),me("lum_velo","Velo Etéreo",2,"fast","Una aliada gana Elusivo.",[{t:"giveKw",kw:"elusivo"}]),me("lum_absorcion","Luz Absorbente",2,"fast","Inflige 2 a una enemiga y cura 2 a tu Nexo.",[{t:"drain",n:2}]),me("lum_plegaria","Plegaria",3,"fast","Cura 5 a tu Nexo y roba 1.",[{t:"healNexus",n:5},{t:"draw",n:1}]),me("lum_resplandor","Resplandor",3,"fast","Tus unidades ganan +1/+1 esta ronda.",[{t:"tempBuffAll",a:1,h:1}]),me("lum_juicio","Juicio Radiante",4,"fast","Inflige 4 a una unidad enemiga.",[{t:"dmgEnemy",n:4}]),me("lum_escarcha","Escarcha Sagrada",3,"focus","Una unidad enemiga tiene 0 de poder esta ronda.",[{t:"frost"}]),me("lum_vision","Visión del Alba",2,"focus","Roba 2 cartas.",[{t:"draw",n:2}]),me("lum_bendicion","Bendición",2,"slow","Una aliada gana +2/+2.",[{t:"buffAlly",a:2,h:2}]),me("lum_renacer","Renacer",3,"slow","Una aliada gana Regeneración y se cura 4.",[{t:"giveKw",kw:"regenera"},{t:"healUnit",n:4}]),me("lum_estrellas","Lluvia de Estrellas",4,"slow","Inflige 2 a todas las unidades enemigas y cura 2 a tu Nexo.",[{t:"dmgAll",n:2},{t:"healNexus",n:2}]),me("lum_amanecer","Amanecer Eterno",6,"slow","Cura 6 a tu Nexo y +1/+1 a tus unidades.",[{t:"healNexus",n:6},{t:"buffAll",a:1,h:1}])],dd=[ee("umb_sombra","Sombra Inquieta",1,2,1),ee("umb_aprendiz","Aprendiz de Huesos",1,1,2,["duro"]),ee("umb_acechador","Acechador Nocturno",2,1,1,["letal"]),ee("umb_cultista","Cultista del Vacío",2,3,3,[],"Al jugarla: tu Nexo recibe 1.",[{t:"hurtNexus",n:1}]),ee("umb_espectro","Espectro Fugaz",2,3,1,["rapido","efimero"]),ee("umb_esqueleto","Esqueleto Guardián",2,1,4,["duro"]),ee("umb_reptante","Reptante Abisal",3,2,3,["temible"]),ee("umb_lobo","Lobo de Ceniza",3,3,3,["arrollar"]),ee("umb_sanguijuela","Sanguijuela",3,3,2,["robovida"]),ee("umb_ritualista","Ritualista",3,2,2,[],"Al jugarla: sacrifica una aliada para robar 2.",[{t:"sacDraw",n:2}]),ee("umb_golem","Gólem de Hierro",3,2,5,["duro"]),ee("umb_verdugo","Verdugo Sombrío",4,3,3,["letal"]),ee("umb_jinete","Jinete Espectral",4,5,3,["arrollar"]),ee("umb_basalto","Centinela de Basalto",4,3,5,["duro"]),ee("umb_devoradora","Devoradora de Almas",5,4,4,[],"Gana +1/+1 cuando muere una aliada.",[],{a:1,h:1}),ee("umb_azote","Azote del Vacío",5,4,3,["rapido","arrollar"]),ee("umb_behemot","Behemot de Hierro",5,5,5,["duro"]),ee("umb_abisal","Coloso Abisal",6,5,5,["duro","robovida"]),ee("umb_senor","Señor de la Noche Eterna",7,6,6,["letal"]),ee("umb_titan","Titán Regenerante",8,7,7,["regenera","arrollar"]),me("umb_punalada","Puñalada",1,"burst","Inflige 2 a una unidad enemiga.",[{t:"dmgEnemy",n:2}]),me("umb_piel","Piel de Hierro",2,"burst","Una aliada gana Duro.",[{t:"giveKw",kw:"duro"}]),me("umb_embestida","Embestida",3,"focus","Inflige 3 al Nexo enemigo.",[{t:"dmgNexus",n:3}]),me("umb_furia","Furia Sombría",2,"fast","Una aliada gana +3/+0 esta ronda.",[{t:"tempBuff",a:3,h:0}]),me("umb_drenar","Drenar",3,"fast","Inflige 3 a una enemiga y cura 3 a tu Nexo.",[{t:"drain",n:3}]),me("umb_plaga","Plaga Sombría",3,"fast","Inflige 1 a todas las unidades enemigas.",[{t:"dmgAll",n:1}]),me("umb_pacto","Pacto de Sangre",2,"slow","Sacrifica tu unidad más débil; daña a una enemiga igual a su ataque.",[{t:"sacDmg"}]),me("umb_maldicion","Maldición de Sombras",4,"slow","Las unidades enemigas pierden 2/2.",[{t:"debuffEnemies",a:2,h:2}]),me("umb_aplastar","Aplastar",4,"slow","Inflige 5 a una unidad enemiga.",[{t:"dmgEnemy",n:5}]),me("umb_eclipse","Eclipse",6,"slow","Destruye una unidad enemiga y roba 1.",[{t:"destroyEnemy"},{t:"draw",n:1}])],Ie=Object.fromEntries([...hd,...dd].map(n=>[n.id,n])),og=["lum_acolita","lum_vigia","lum_centinela","lum_portador","lum_novicia","lum_halcon","lum_destello","lum_rocio","lum_escudo","lum_bendicion"],ag=["umb_sombra","umb_aprendiz","umb_acechador","umb_esqueleto","umb_cultista","umb_lobo","umb_golem","umb_punalada","umb_furia","umb_drenar"],Fi={Luminarae:[...hd.map(n=>n.id),...og],Umbra:[...dd.map(n=>n.id),...ag]},We=n=>1-n;function fd(n){n.seed=n.seed+1831565813|0;let e=n.seed;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function pd(n,e){for(let t=e.length-1;t>0;t--){const r=Math.floor(fd(n)*(t+1));[e[t],e[r]]=[e[r],e[t]]}}function Sr(n,e,t){const r=n.p[e];for(let s=0;s<t;s++){const i=r.deck.pop();if(!i){n.winner=We(e);break}r.hand.length<10&&r.hand.push(i)}}const Ui=(n,e,t)=>{n.p[e].nexus=Math.min(20,n.p[e].nexus+t)},ae=n=>Math.max(0,n.atk+n.ta),Te=n=>n.hp+n.th-n.dmg,sn=n=>{n.dmg=n.hp+n.th+999},$i=n=>ae(n)*1e6+Te(n)*1e3+Ie[n.card].cost,xt=n=>n.reduce((e,t)=>!e||$i(t)>$i(e)?t:e,void 0),yu=n=>n.reduce((e,t)=>!e||$i(t)<$i(e)?t:e,void 0),lg=["dmgEnemy","drain","destroyEnemy","sacDmg","frost"],cg=["buffAlly","giveKw","tempBuff","healUnit"];function Or(n){const e=Ie[n];return!e||e.type!=="spell"?null:e.fx.some(t=>lg.includes(t.t))?"enemy":e.fx.some(t=>cg.includes(t.t))?"ally":null}function vl(n,e){return!(n.kw.includes("elusivo")&&!e.kw.includes("elusivo")||n.kw.includes("temible")&&ae(e)<3)}function md(n,e){const t=s=>({nexus:20,deck:[...s],hand:[],board:[],mana:0,maxMana:0,spell:0,played:[]}),r={p:[t(n[0]),t(n[1])],round:0,token:0,active:0,phase:"mulligan",passes:0,winner:null,seed:e,uid:0,log:[],stack:[],attackers:[],blocks:{},forced:[],tok:[!1,!1],resumePhase:"main",mull:[!1,!1]};return r.p.forEach(s=>pd(r,s.deck)),Sr(r,0,4),Sr(r,1,4),r.token=fd(r)<.5?0:1,r}function ua(n,e,t){const r=n.p[e],s=[...new Set(t)].filter(i=>i>=0&&i<r.hand.length).sort((i,a)=>a-i);for(const i of s)r.deck.push(r.hand.splice(i,1)[0]);pd(n,r.deck),Sr(n,e,s.length)}function xa(n){if(n.round++,n.round>40){n.winner=-1;return}n.token=We(n.token),n.active=n.token,n.phase="main",n.passes=0,n.attackers=[],n.blocks={},n.forced=[],n.stack=[],n.tok=[!1,!1],n.tok[n.token]=!0;for(const e of[n.token,We(n.token)]){const t=n.p[e];if(t.maxMana=Math.min(10,t.maxMana+1),t.mana=t.maxMana,Sr(n,e,1),n.winner!==null)return}n.log=n.log.slice(-40),n.log.push(`— Ronda ${n.round} (ficha: J${n.token+1}) —`),Gn(n)}function ug(n){for(const e of n.p)e.spell=Math.min(3,e.spell+e.mana),e.mana=0;for(const e of n.p)e.board.forEach(t=>{t.kw.includes("regenera")&&(t.dmg=0)});for(const e of n.p)e.board.forEach(t=>{t.kw.includes("efimero")&&sn(t)});gn(n);for(const e of n.p)e.board.forEach(t=>{t.ta=0,t.th=0,t.dmg>=t.hp&&(t.dmg=t.hp-1)});Gn(n),n.winner===null&&xa(n)}function Gn(n){if(n.winner!==null)return;const e=n.p[0].nexus<=0,t=n.p[1].nexus<=0;e&&t?n.winner=-1:e?n.winner=1:t&&(n.winner=0)}function gn(n){for(let e=!0;e;){e=!1;for(const t of n.p){const r=t.board.filter(s=>Te(s)<=0);if(r.length){e=!0,t.board=t.board.filter(s=>Te(s)>0);for(const s of t.board){const i=Ie[s.card].grow;i&&(s.atk+=i.a*r.length,s.hp+=i.h*r.length)}}}}}function mr(n,e,t,r){if(t<=0)return 0;const s=e.kw.indexOf("barrera");if(s>=0)return e.kw.splice(s,1),0;if(e.kw.includes("duro")&&(t=Math.max(0,t-1)),t<=0)return 0;const i=Math.min(t,Math.max(0,Te(e)));return e.dmg+=t,r&&(r.u.kw.includes("letal")&&sn(e),r.u.kw.includes("robovida")&&Ui(n,r.owner,i)),i}function Oa(n,e,t,r,s){const i=n.p[e],a=n.p[We(e)];switch(t.t){case"healNexus":Ui(n,e,t.n);break;case"hurtNexus":i.nexus-=t.n;break;case"dmgNexus":a.nexus-=t.n;break;case"draw":Sr(n,e,t.n);break;case"buffOther":{const l=xt(i.board.filter(u=>u!==r));l&&(l.atk+=t.a,l.hp+=t.h);break}case"buffAlly":{const l=s??xt(i.board);l&&(l.atk+=t.a,l.hp+=t.h);break}case"tempBuff":{const l=s??xt(i.board);l&&(l.ta+=t.a,l.th+=t.h);break}case"healUnit":{const l=s??i.board.find(u=>u.dmg>0);l&&(l.dmg=Math.max(0,l.dmg-t.n));break}case"tempBuffAll":i.board.forEach(l=>{l.ta+=t.a,l.th+=t.h});break;case"buffAll":i.board.forEach(l=>{l.atk+=t.a,l.hp+=t.h});break;case"giveKw":{const l=s??xt(i.board);l&&!l.kw.includes(t.kw)&&l.kw.push(t.kw);break}case"dmgEnemy":{const l=s??xt(a.board);l&&mr(n,l,t.n);break}case"drain":{const l=s??xt(a.board);l&&Ui(n,e,mr(n,l,t.n));break}case"dmgAll":a.board.forEach(l=>mr(n,l,t.n));break;case"frost":{const l=s??xt(a.board);l&&(l.ta-=ae(l));break}case"sacDraw":{const l=yu(i.board.filter(u=>u!==r));l&&(sn(l),gn(n),Sr(n,e,t.n));break}case"sacDmg":{const l=yu(i.board),u=s??xt(a.board);if(l&&u){const h=ae(l);sn(l),mr(n,u,h)}break}case"debuffEnemies":a.board.forEach(l=>{l.atk=Math.max(0,l.atk-t.a),l.hp-=t.h});break;case"destroyEnemy":{const l=s??xt(a.board);l&&sn(l);break}}gn(n)}function Mr(n,e,t){const r=n.p[e],s=Ie[r.hand[t]];if(!s||n.winner!==null||n.active!==e||n.phase==="mulligan")return!1;if(s.type==="unit")return n.phase==="main"&&!n.stack.length&&!n.attackers.length&&r.board.length<6&&s.cost<=r.mana;if(s.cost>r.mana+r.spell)return!1;const i=s.speed??"fast";if((i==="slow"||i==="focus")&&(n.phase!=="main"||n.stack.length||n.attackers.length))return!1;const a=Or(s.id);return!(a==="enemy"&&!n.p[We(e)].board.length||a==="ally"&&!r.board.length||s.fx.some(l=>l.t==="sacDmg")&&!r.board.length)}function gd(n){if(n.phase!=="block"&&!(n.phase==="stack"&&n.resumePhase==="block"))return;const e=n.p[n.token],t=n.p[We(n.token)];for(const r of Object.keys(n.blocks)){const s=e.board.find(a=>String(a.uid)===r),i=t.board.find(a=>a.uid===n.blocks[r]);s&&i&&vl(s,i)||(s&&i&&n.log.push(`Bloqueo anulado: {${i.card}} ya no puede bloquear a {${s.card}}`),delete n.blocks[r],n.forced=n.forced.filter(a=>String(a)!==r))}}function hg(n){const e=n.stack.pop();if(!e)return;const t=Ie[e.card],r=Or(e.card);let s;if(r&&(s=[...n.p[0].board,...n.p[1].board].find(i=>i.uid===e.target),!s)){n.log.push(`{${e.card}} se disipa: el objetivo ya no existe`);return}n.log.push(`Se resuelve {${e.card}}`),t.fx.forEach(i=>Oa(n,e.owner,i,void 0,s)),gn(n),Gn(n)}function dg(n){var t;const e=((t=n.stack[0])==null?void 0:t.owner)??n.active;for(;n.stack.length&&n.winner===null;)hg(n);n.winner===null&&(gd(n),n.phase=n.resumePhase,n.active=We(e),n.passes=0)}function fg(n){const e=n.token,t=We(e),r=n.p[e],s=n.p[t],i=n.attackers.map(h=>r.board.find(f=>f.uid===h)).filter(h=>!!h).map(h=>({u:h,had:n.blocks[String(h.uid)]!==void 0,b:s.board.find(f=>f.uid===n.blocks[String(h.uid)])})),a=new Set,l=(h,f)=>{f<=0||(n.p[t].nexus-=f,h.kw.includes("robovida")&&Ui(n,e,f))},u=(h,f,m)=>{const g=Te(m)+(m.kw.includes("duro")?1:0),S=ae(h);return mr(n,m,S,{u:h,owner:f}),a.add(h.uid),Math.max(0,S-g)};for(const{u:h,b:f}of i)if(f&&h.kw.includes("rapido")&&ae(h)>0){const m=u(h,e,f);h.kw.includes("arrollar")&&l(h,m),h.kw.includes("efimero")&&sn(h)}if(gn(n),Gn(n),n.winner===null){for(const{u:h,had:f,b:m}of i){if(Te(h)<=0)continue;const g=a.has(h.uid);if(m&&Te(m)>0){let S=0;!g&&ae(h)>0&&(S=u(h,e,m)),ae(m)>0&&mr(n,h,ae(m),{u:m,owner:t}),h.kw.includes("arrollar")&&!g&&l(h,S),h.kw.includes("efimero")&&!g&&sn(h)}else f?h.kw.includes("arrollar")&&!g&&l(h,ae(h)):(l(h,ae(h)),h.kw.includes("efimero")&&ae(h)>0&&sn(h))}gn(n),Gn(n),n.attackers=[],n.blocks={},n.forced=[],n.winner===null&&(n.phase="main",n.active=t,n.passes=0)}}function Ts(n,e){if(n.winner!==null)return n;const t=structuredClone(n),r=t.active,s=t.p[r],i=t.p[We(r)];if(e.type==="mulligan")return t.phase!=="mulligan"?n:e.player!==void 0?e.player!==0&&e.player!==1||t.mull[e.player]||!Array.isArray(e.idx)?n:(ua(t,e.player,e.idx),t.mull[e.player]=!0,t.mull[0]&&t.mull[1]&&xa(t),t):(ua(t,0,e.idx),ua(t,1,t.p[1].hand.map((a,l)=>Ie[a].cost>=4?l:-1).filter(a=>a>=0)),xa(t),t);if(t.phase==="mulligan")return n;if(e.type==="play"){if(!Mr(t,r,e.hand))return n;const a=s.hand[e.hand],l=Ie[a],u=Or(a);let h;if(u&&(h=(u==="enemy"?i:s).board.find(f=>f.uid===e.target),!h))return n;if(l.type==="unit")s.mana-=l.cost;else{const f=Math.min(s.spell,l.cost);s.spell-=f,s.mana-=l.cost-f}if(s.hand.splice(e.hand,1),s.played.push(a),t.log.push(`J${r+1} juega {${a}}`),l.type==="unit"){const f={uid:++t.uid,card:a,atk:l.atk,hp:l.hp,dmg:0,kw:[...l.kw],ta:0,th:0};s.board.push(f),l.fx.forEach(m=>Oa(t,r,m,f)),gn(t),Gn(t),t.active=We(r),t.passes=0}else{const f=l.speed??"fast";f==="burst"||f==="focus"?(l.fx.forEach(m=>Oa(t,r,m,void 0,h)),gn(t),Gn(t),gd(t)):(t.resumePhase=t.phase==="stack"?t.resumePhase:t.phase,t.stack.push({card:a,owner:r,target:h==null?void 0:h.uid}),t.phase="stack",t.active=We(r),t.passes=0)}}else if(e.type==="pass"||e.type==="confirmBlocks"){if(e.type==="confirmBlocks"&&!(t.phase==="block"&&r===We(t.token)))return n;t.log.push(`J${r+1} pasa prioridad`),t.phase==="stack"?dg(t):t.phase==="block"?r===We(t.token)?(t.active=t.token,t.passes=1):fg(t):++t.passes>=2?ug(t):t.active=We(r)}else if(e.type==="attack"){if(t.phase!=="main"||t.stack.length||t.attackers.length||!t.tok[r])return n;const a=[...new Set(e.units)].map(u=>s.board[u]).filter(u=>!!u);if(!a.length)return n;t.tok[r]=!1,t.attackers=a.map(u=>u.uid),t.blocks={},t.forced=[];const l=new Set;for(const u of a)if(u.kw.includes("retador")){const h=i.board.filter(f=>!l.has(f.uid)).sort((f,m)=>(ae(u)>=Te(m)?1:0)-(ae(u)>=Te(f)?1:0)||Te(f)-Te(m))[0];h&&(t.blocks[String(u.uid)]=h.uid,t.forced.push(u.uid),l.add(h.uid))}t.phase="block",t.active=We(r),t.passes=0,t.log.push(`J${r+1} declara ataque con ${a.length} unidad(es)`)}else if(e.type==="block"){if(t.phase!=="block"||r!==We(t.token))return n;const a=t.p[t.token].board[e.attacker],l=s.board[e.blocker];if(!a||!l||!t.attackers.includes(a.uid)||t.forced.includes(a.uid)||!vl(a,l))return n;const u=String(a.uid);if(t.blocks[u]===l.uid)delete t.blocks[u];else{if(Object.values(t.blocks).includes(l.uid))return n;t.blocks[u]=l.uid}}return t}const pg=n=>Ie[n].fx.reduce((e,t)=>e+(t.t==="dmgEnemy"||t.t==="drain"?t.n:0),0),os=n=>ae(n)*10+Te(n);function vu(n,e){const t=n.p[e],r=n.p[1-e];let s=null;return t.hand.forEach((i,a)=>{const l=Ie[i];if(l.type!=="spell"||!Mr(n,e,a))return;const u=Or(i);let h=0,f;if(u==="enemy"){const m=[...r.board].sort((k,N)=>os(N)-os(k)),g=pg(i),S=m.find(k=>g>0&&Te(k)<=g)??(l.fx.some(k=>k.t==="destroyEnemy"||k.t==="frost")?m[0]:void 0);if(!S||l.fx.some(k=>k.t==="sacDmg")&&t.board.length<2)return;f=S.uid,h=os(S)/2+l.cost}else if(u==="ally"){const m=l.fx.some(k=>k.t==="healUnit"),S=[...m?t.board.filter(k=>k.dmg>0):t.board].sort((k,N)=>m?N.dmg-k.dmg:os(N)-os(k))[0];if(!S)return;f=S.uid,h=m?2+S.dmg:3}else for(const m of l.fx)m.t==="healNexus"&&t.nexus<=20-m.n?h+=2:m.t==="buffAll"&&t.board.length>=2||(m.t==="debuffEnemies"||m.t==="dmgAll")&&r.board.length>=2?h+=3:m.t==="dmgNexus"?h+=r.nexus<=m.n?20:1:m.t==="tempBuffAll"&&t.board.length>=2&&n.tok[e]?h+=3:m.t==="draw"&&(h+=t.hand.length<6?2:0);h>0&&(!s||h>s.sc)&&(s={a:{type:"play",hand:a,target:f},sc:h})}),s?s.a:null}function mg(n){const e=n.active,t=n.p[e],r=n.p[1-e];if(n.phase==="mulligan")return{type:"mulligan",idx:[]};if(n.phase==="block"){if(e===n.token)return{type:"pass"};const a=n.attackers.map(h=>n.p[n.token].board.find(f=>f.uid===h)).filter(h=>!!h),l=a.reduce((h,f)=>h+ae(f),0),u=new Set(Object.values(n.blocks));for(const h of a.filter(f=>n.blocks[String(f.uid)]===void 0).sort((f,m)=>ae(m)-ae(f))){const f=t.board.map((g,S)=>({u:g,k:S})).filter(g=>!u.has(g.u.uid)&&vl(h,g.u)),m=f.find(g=>ae(g.u)>=Te(h)&&Te(g.u)>ae(h))??f.find(g=>(ae(g.u)>=Te(h)||g.u.kw.includes("letal"))&&ae(h)>=3)??(t.nexus<=l?f.sort((g,S)=>Te(S.u)-Te(g.u))[0]:void 0);if(m)return{type:"block",attacker:n.p[n.token].board.indexOf(h),blocker:m.k}}return{type:"confirmBlocks"}}if(n.phase==="stack")return(Math.random()<.5?vu(n,e):null)??{type:"pass"};let s=-1;if(t.hand.forEach((a,l)=>{Ie[a].type==="unit"&&Mr(n,e,l)&&(s<0||Ie[a].cost>Ie[t.hand[s]].cost)&&(s=l)}),s>=0)return{type:"play",hand:s};const i=vu(n,e);if(i&&Math.random()<.7)return i;if(n.tok[e]&&!n.attackers.length){const a=t.board.map((h,f)=>({u:h,k:f})),l=a.reduce((h,f)=>h+ae(f.u),0)>=r.nexus,u=a.filter(({u:h})=>l||!r.board.length||h.kw.includes("barrera")||h.kw.includes("elusivo")||r.board.every(f=>ae(f)<Te(h)&&!f.kw.includes("letal")));if(u.length)return{type:"attack",units:u.map(h=>h.k)}}return{type:"pass"}}const _d={},gg="cartas-skins";let El={};try{El=JSON.parse(localStorage.getItem(gg)||"{}")}catch{}const Et=n=>{var e,t;return((e=El[n])==null?void 0:e.name)||((t=_d[n])==null?void 0:t.name)||Ie[n].name},_g=n=>{var e,t;return((e=El[n])==null?void 0:e.image)||((t=_d[n])==null?void 0:t.image)||`/Apexora-TCG/img/${n}.webp`},yg={hello:["Las sombras te saludan.","Hola, mortal. Disfruta tus últimos turnos.","¿Listo para caer?"],gg:["Buena partida. La próxima será peor para ti.","GG… por ahora."],idle:["Interesante… aunque inútil.","Habla todo lo que quieras.","La oscuridad escucha.","Juega tu carta.","..."],cast:["¿Sentiste eso?","Las sombras obedecen.","Eso va a doler."],win:["Imposible… la luz me venció esta vez.","Buena partida. Quiero la revancha."],lose:["La noche siempre gana.","Tu luz se apaga."]};class vg{constructor(){Ne(this,"cbs",[]);Ne(this,"last",0)}onMessage(e){this.cbs.push(e)}emit(e){this.cbs.forEach(t=>t(e))}push(e){this.emit(e)}sys(e){this.emit({from:"",text:e,side:"sys"})}send(e){this.emit({from:"Tú",text:e,side:"me"});const t=/hola|buenas|hey/i.test(e)?"hello":/\bgg\b|bien jugado/i.test(e)?"gg":"idle";setTimeout(()=>this.say(t),700+Math.random()*900)}react(e){e==="cast"&&(Date.now()-this.last<2e4||Math.random()>.35)||this.say(e)}say(e){const t=yg[e];this.last=Date.now(),this.emit({from:"Umbra",text:t[Math.floor(Math.random()*t.length)],side:"foe"})}}const Eg=()=>{};var Eu={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yd=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},wg=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const s=n[t++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=n[t++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=n[t++],a=n[t++],l=n[t++],u=((s&7)<<18|(i&63)<<12|(a&63)<<6|l&63)-65536;e[r++]=String.fromCharCode(55296+(u>>10)),e[r++]=String.fromCharCode(56320+(u&1023))}else{const i=n[t++],a=n[t++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|a&63)}}return e.join("")},vd={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){const i=n[s],a=s+1<n.length,l=a?n[s+1]:0,u=s+2<n.length,h=u?n[s+2]:0,f=i>>2,m=(i&3)<<4|l>>4;let g=(l&15)<<2|h>>6,S=h&63;u||(S=64,a||(g=64)),r.push(t[f],t[m],t[g],t[S])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(yd(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):wg(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){const i=t[n.charAt(s++)],l=s<n.length?t[n.charAt(s)]:0;++s;const h=s<n.length?t[n.charAt(s)]:64;++s;const m=s<n.length?t[n.charAt(s)]:64;if(++s,i==null||l==null||h==null||m==null)throw new Tg;const g=i<<2|l>>4;if(r.push(g),h!==64){const S=l<<4&240|h>>2;if(r.push(S),m!==64){const k=h<<6&192|m;r.push(k)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class Tg extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Ig=function(n){const e=yd(n);return vd.encodeByteArray(e,!0)},Bi=function(n){return Ig(n).replace(/\./g,"")},Ed=function(n){try{return vd.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bg(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ag=()=>bg().__FIREBASE_DEFAULTS__,Sg=()=>{if(typeof process>"u"||typeof Eu>"u")return;const n=Eu.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},Rg=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&Ed(n[1]);return e&&JSON.parse(e)},uo=()=>{try{return Eg()||Ag()||Sg()||Rg()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},wd=n=>{var e,t;return(t=(e=uo())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},kg=n=>{const e=wd(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},Td=()=>{var n;return(n=uo())===null||n===void 0?void 0:n.config},Id=n=>{var e;return(e=uo())===null||e===void 0?void 0:e[`_${n}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pg{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lr(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function bd(n){return(await fetch(n,{credentials:"include"})).ok}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cg(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},r=e||"demo-project",s=n.iat||0,i=n.sub||n.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}}},n);return[Bi(JSON.stringify(t)),Bi(JSON.stringify(a)),""].join(".")}const ps={};function Vg(){const n={prod:[],emulator:[]};for(const e of Object.keys(ps))ps[e]?n.emulator.push(e):n.prod.push(e);return n}function Ng(n){let e=document.getElementById(n),t=!1;return e||(e=document.createElement("div"),e.setAttribute("id",n),t=!0),{created:t,element:e}}let wu=!1;function Ad(n,e){if(typeof window>"u"||typeof document>"u"||!Lr(window.location.host)||ps[n]===e||ps[n]||wu)return;ps[n]=e;function t(g){return`__firebase__banner__${g}`}const r="__firebase__banner",i=Vg().prod.length>0;function a(){const g=document.getElementById(r);g&&g.remove()}function l(g){g.style.display="flex",g.style.background="#7faaf0",g.style.position="fixed",g.style.bottom="5px",g.style.left="5px",g.style.padding=".5em",g.style.borderRadius="5px",g.style.alignItems="center"}function u(g,S){g.setAttribute("width","24"),g.setAttribute("id",S),g.setAttribute("height","24"),g.setAttribute("viewBox","0 0 24 24"),g.setAttribute("fill","none"),g.style.marginLeft="-6px"}function h(){const g=document.createElement("span");return g.style.cursor="pointer",g.style.marginLeft="16px",g.style.fontSize="24px",g.innerHTML=" &times;",g.onclick=()=>{wu=!0,a()},g}function f(g,S){g.setAttribute("id",S),g.innerText="Learn more",g.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",g.setAttribute("target","__blank"),g.style.paddingLeft="5px",g.style.textDecoration="underline"}function m(){const g=Ng(r),S=t("text"),k=document.getElementById(S)||document.createElement("span"),N=t("learnmore"),V=document.getElementById(N)||document.createElement("a"),G=t("preprendIcon"),z=document.getElementById(G)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(g.created){const X=g.element;l(X),f(V,N);const fe=h();u(z,G),X.append(z,k,V,fe),document.body.appendChild(X)}i?(k.innerText="Preview backend disconnected.",z.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(z.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,k.innerText="Preview backend running in this workspace."),k.setAttribute("id",S)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",m):m()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xe(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Dg(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Xe())}function xg(){var n;const e=(n=uo())===null||n===void 0?void 0:n.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function Og(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Mg(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function Lg(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Fg(){const n=Xe();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function Ug(){return!xg()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function $g(){try{return typeof indexedDB=="object"}catch{return!1}}function Bg(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{var i;e(((i=s.error)===null||i===void 0?void 0:i.message)||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qg="FirebaseError";class Wt extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=qg,Object.setPrototypeOf(this,Wt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Ms.prototype.create)}}class Ms{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},s=`${this.service}/${e}`,i=this.errors[e],a=i?jg(i,r):"Error",l=`${this.serviceName}: ${a} (${s}).`;return new Wt(s,l,r)}}function jg(n,e){return n.replace(zg,(t,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const zg=/\{\$([^}]+)}/g;function Hg(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function Wn(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const s of t){if(!r.includes(s))return!1;const i=n[s],a=e[s];if(Tu(i)&&Tu(a)){if(!Wn(i,a))return!1}else if(i!==a)return!1}for(const s of r)if(!t.includes(s))return!1;return!0}function Tu(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ls(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function Gg(n,e){const t=new Wg(n,e);return t.subscribe.bind(t)}class Wg{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let s;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");Kg(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:r},s.next===void 0&&(s.next=ha),s.error===void 0&&(s.error=ha),s.complete===void 0&&(s.complete=ha);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Kg(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function ha(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ue(n){return n&&n._delegate?n._delegate:n}class Kn{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const On="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qg{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new Pg;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(t=e==null?void 0:e.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(i){if(s)return null;throw i}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Xg(e))try{this.getOrInitializeService({instanceIdentifier:On})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=On){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=On){return this.instances.has(e)}getOptions(e=On){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[i,a]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(i);r===l&&a.resolve(s)}return s}onInit(e,t){var r;const s=this.normalizeInstanceIdentifier(t),i=(r=this.onInitCallbacks.get(s))!==null&&r!==void 0?r:new Set;i.add(e),this.onInitCallbacks.set(s,i);const a=this.instances.get(s);return a&&e(a,s),()=>{i.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const s of r)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:Jg(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=On){return this.component?this.component.multipleInstances?e:On:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Jg(n){return n===On?void 0:n}function Xg(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yg{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new Qg(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Y;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(Y||(Y={}));const Zg={debug:Y.DEBUG,verbose:Y.VERBOSE,info:Y.INFO,warn:Y.WARN,error:Y.ERROR,silent:Y.SILENT},e_=Y.INFO,t_={[Y.DEBUG]:"log",[Y.VERBOSE]:"log",[Y.INFO]:"info",[Y.WARN]:"warn",[Y.ERROR]:"error"},n_=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),s=t_[e];if(s)console[s](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class wl{constructor(e){this.name=e,this._logLevel=e_,this._logHandler=n_,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in Y))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Zg[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,Y.DEBUG,...e),this._logHandler(this,Y.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,Y.VERBOSE,...e),this._logHandler(this,Y.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,Y.INFO,...e),this._logHandler(this,Y.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,Y.WARN,...e),this._logHandler(this,Y.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,Y.ERROR,...e),this._logHandler(this,Y.ERROR,...e)}}const r_=(n,e)=>e.some(t=>n instanceof t);let Iu,bu;function s_(){return Iu||(Iu=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function i_(){return bu||(bu=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Sd=new WeakMap,Ma=new WeakMap,Rd=new WeakMap,da=new WeakMap,Tl=new WeakMap;function o_(n){const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("success",i),n.removeEventListener("error",a)},i=()=>{t(on(n.result)),s()},a=()=>{r(n.error),s()};n.addEventListener("success",i),n.addEventListener("error",a)});return e.then(t=>{t instanceof IDBCursor&&Sd.set(t,n)}).catch(()=>{}),Tl.set(e,n),e}function a_(n){if(Ma.has(n))return;const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("complete",i),n.removeEventListener("error",a),n.removeEventListener("abort",a)},i=()=>{t(),s()},a=()=>{r(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",i),n.addEventListener("error",a),n.addEventListener("abort",a)});Ma.set(n,e)}let La={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return Ma.get(n);if(e==="objectStoreNames")return n.objectStoreNames||Rd.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return on(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function l_(n){La=n(La)}function c_(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const r=n.call(fa(this),e,...t);return Rd.set(r,e.sort?e.sort():[e]),on(r)}:i_().includes(n)?function(...e){return n.apply(fa(this),e),on(Sd.get(this))}:function(...e){return on(n.apply(fa(this),e))}}function u_(n){return typeof n=="function"?c_(n):(n instanceof IDBTransaction&&a_(n),r_(n,s_())?new Proxy(n,La):n)}function on(n){if(n instanceof IDBRequest)return o_(n);if(da.has(n))return da.get(n);const e=u_(n);return e!==n&&(da.set(n,e),Tl.set(e,n)),e}const fa=n=>Tl.get(n);function h_(n,e,{blocked:t,upgrade:r,blocking:s,terminated:i}={}){const a=indexedDB.open(n,e),l=on(a);return r&&a.addEventListener("upgradeneeded",u=>{r(on(a.result),u.oldVersion,u.newVersion,on(a.transaction),u)}),t&&a.addEventListener("blocked",u=>t(u.oldVersion,u.newVersion,u)),l.then(u=>{i&&u.addEventListener("close",()=>i()),s&&u.addEventListener("versionchange",h=>s(h.oldVersion,h.newVersion,h))}).catch(()=>{}),l}const d_=["get","getKey","getAll","getAllKeys","count"],f_=["put","add","delete","clear"],pa=new Map;function Au(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(pa.get(e))return pa.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,s=f_.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(s||d_.includes(t)))return;const i=async function(a,...l){const u=this.transaction(a,s?"readwrite":"readonly");let h=u.store;return r&&(h=h.index(l.shift())),(await Promise.all([h[t](...l),s&&u.done]))[0]};return pa.set(e,i),i}l_(n=>({...n,get:(e,t,r)=>Au(e,t)||n.get(e,t,r),has:(e,t)=>!!Au(e,t)||n.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class p_{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(m_(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function m_(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Fa="@firebase/app",Su="0.13.2";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qt=new wl("@firebase/app"),g_="@firebase/app-compat",__="@firebase/analytics-compat",y_="@firebase/analytics",v_="@firebase/app-check-compat",E_="@firebase/app-check",w_="@firebase/auth",T_="@firebase/auth-compat",I_="@firebase/database",b_="@firebase/data-connect",A_="@firebase/database-compat",S_="@firebase/functions",R_="@firebase/functions-compat",k_="@firebase/installations",P_="@firebase/installations-compat",C_="@firebase/messaging",V_="@firebase/messaging-compat",N_="@firebase/performance",D_="@firebase/performance-compat",x_="@firebase/remote-config",O_="@firebase/remote-config-compat",M_="@firebase/storage",L_="@firebase/storage-compat",F_="@firebase/firestore",U_="@firebase/ai",$_="@firebase/firestore-compat",B_="firebase",q_="11.10.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ua="[DEFAULT]",j_={[Fa]:"fire-core",[g_]:"fire-core-compat",[y_]:"fire-analytics",[__]:"fire-analytics-compat",[E_]:"fire-app-check",[v_]:"fire-app-check-compat",[w_]:"fire-auth",[T_]:"fire-auth-compat",[I_]:"fire-rtdb",[b_]:"fire-data-connect",[A_]:"fire-rtdb-compat",[S_]:"fire-fn",[R_]:"fire-fn-compat",[k_]:"fire-iid",[P_]:"fire-iid-compat",[C_]:"fire-fcm",[V_]:"fire-fcm-compat",[N_]:"fire-perf",[D_]:"fire-perf-compat",[x_]:"fire-rc",[O_]:"fire-rc-compat",[M_]:"fire-gcs",[L_]:"fire-gcs-compat",[F_]:"fire-fst",[$_]:"fire-fst-compat",[U_]:"fire-vertex","fire-js":"fire-js",[B_]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qi=new Map,z_=new Map,$a=new Map;function Ru(n,e){try{n.container.addComponent(e)}catch(t){qt.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Rr(n){const e=n.name;if($a.has(e))return qt.debug(`There were multiple attempts to register component ${e}.`),!1;$a.set(e,n);for(const t of qi.values())Ru(t,n);for(const t of z_.values())Ru(t,n);return!0}function Il(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function ft(n){return n==null?!1:n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const H_={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},an=new Ms("app","Firebase",H_);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class G_{constructor(e,t,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Kn("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw an.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fr=q_;function kd(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r=Object.assign({name:Ua,automaticDataCollectionEnabled:!0},e),s=r.name;if(typeof s!="string"||!s)throw an.create("bad-app-name",{appName:String(s)});if(t||(t=Td()),!t)throw an.create("no-options");const i=qi.get(s);if(i){if(Wn(t,i.options)&&Wn(r,i.config))return i;throw an.create("duplicate-app",{appName:s})}const a=new Yg(s);for(const u of $a.values())a.addComponent(u);const l=new G_(t,r,a);return qi.set(s,l),l}function Pd(n=Ua){const e=qi.get(n);if(!e&&n===Ua&&Td())return kd();if(!e)throw an.create("no-app",{appName:n});return e}function ln(n,e,t){var r;let s=(r=j_[n])!==null&&r!==void 0?r:n;t&&(s+=`-${t}`);const i=s.match(/\s|\//),a=e.match(/\s|\//);if(i||a){const l=[`Unable to register library "${s}" with version "${e}":`];i&&l.push(`library name "${s}" contains illegal characters (whitespace or "/")`),i&&a&&l.push("and"),a&&l.push(`version name "${e}" contains illegal characters (whitespace or "/")`),qt.warn(l.join(" "));return}Rr(new Kn(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const W_="firebase-heartbeat-database",K_=1,Is="firebase-heartbeat-store";let ma=null;function Cd(){return ma||(ma=h_(W_,K_,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(Is)}catch(t){console.warn(t)}}}}).catch(n=>{throw an.create("idb-open",{originalErrorMessage:n.message})})),ma}async function Q_(n){try{const t=(await Cd()).transaction(Is),r=await t.objectStore(Is).get(Vd(n));return await t.done,r}catch(e){if(e instanceof Wt)qt.warn(e.message);else{const t=an.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});qt.warn(t.message)}}}async function ku(n,e){try{const r=(await Cd()).transaction(Is,"readwrite");await r.objectStore(Is).put(e,Vd(n)),await r.done}catch(t){if(t instanceof Wt)qt.warn(t.message);else{const r=an.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});qt.warn(r.message)}}}function Vd(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const J_=1024,X_=30;class Y_{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new ey(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,t;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=Pu();if(((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(a=>a.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:s}),this._heartbeatsCache.heartbeats.length>X_){const a=ty(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(a,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){qt.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=Pu(),{heartbeatsToSend:r,unsentEntries:s}=Z_(this._heartbeatsCache.heartbeats),i=Bi(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(t){return qt.warn(t),""}}}function Pu(){return new Date().toISOString().substring(0,10)}function Z_(n,e=J_){const t=[];let r=n.slice();for(const s of n){const i=t.find(a=>a.agent===s.agent);if(i){if(i.dates.push(s.date),Cu(t)>e){i.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),Cu(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class ey{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return $g()?Bg().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await Q_(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return ku(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return ku(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function Cu(n){return Bi(JSON.stringify({version:2,heartbeats:n})).length}function ty(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let r=1;r<n.length;r++)n[r].date<t&&(t=n[r].date,e=r);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ny(n){Rr(new Kn("platform-logger",e=>new p_(e),"PRIVATE")),Rr(new Kn("heartbeat",e=>new Y_(e),"PRIVATE")),ln(Fa,Su,n),ln(Fa,Su,"esm2017"),ln("fire-js","")}ny("");var Vu=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var cn,Nd;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(w,_){function y(){}y.prototype=_.prototype,w.D=_.prototype,w.prototype=new y,w.prototype.constructor=w,w.C=function(E,T,b){for(var v=Array(arguments.length-2),ut=2;ut<arguments.length;ut++)v[ut-2]=arguments[ut];return _.prototype[T].apply(E,v)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,t),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(w,_,y){y||(y=0);var E=Array(16);if(typeof _=="string")for(var T=0;16>T;++T)E[T]=_.charCodeAt(y++)|_.charCodeAt(y++)<<8|_.charCodeAt(y++)<<16|_.charCodeAt(y++)<<24;else for(T=0;16>T;++T)E[T]=_[y++]|_[y++]<<8|_[y++]<<16|_[y++]<<24;_=w.g[0],y=w.g[1],T=w.g[2];var b=w.g[3],v=_+(b^y&(T^b))+E[0]+3614090360&4294967295;_=y+(v<<7&4294967295|v>>>25),v=b+(T^_&(y^T))+E[1]+3905402710&4294967295,b=_+(v<<12&4294967295|v>>>20),v=T+(y^b&(_^y))+E[2]+606105819&4294967295,T=b+(v<<17&4294967295|v>>>15),v=y+(_^T&(b^_))+E[3]+3250441966&4294967295,y=T+(v<<22&4294967295|v>>>10),v=_+(b^y&(T^b))+E[4]+4118548399&4294967295,_=y+(v<<7&4294967295|v>>>25),v=b+(T^_&(y^T))+E[5]+1200080426&4294967295,b=_+(v<<12&4294967295|v>>>20),v=T+(y^b&(_^y))+E[6]+2821735955&4294967295,T=b+(v<<17&4294967295|v>>>15),v=y+(_^T&(b^_))+E[7]+4249261313&4294967295,y=T+(v<<22&4294967295|v>>>10),v=_+(b^y&(T^b))+E[8]+1770035416&4294967295,_=y+(v<<7&4294967295|v>>>25),v=b+(T^_&(y^T))+E[9]+2336552879&4294967295,b=_+(v<<12&4294967295|v>>>20),v=T+(y^b&(_^y))+E[10]+4294925233&4294967295,T=b+(v<<17&4294967295|v>>>15),v=y+(_^T&(b^_))+E[11]+2304563134&4294967295,y=T+(v<<22&4294967295|v>>>10),v=_+(b^y&(T^b))+E[12]+1804603682&4294967295,_=y+(v<<7&4294967295|v>>>25),v=b+(T^_&(y^T))+E[13]+4254626195&4294967295,b=_+(v<<12&4294967295|v>>>20),v=T+(y^b&(_^y))+E[14]+2792965006&4294967295,T=b+(v<<17&4294967295|v>>>15),v=y+(_^T&(b^_))+E[15]+1236535329&4294967295,y=T+(v<<22&4294967295|v>>>10),v=_+(T^b&(y^T))+E[1]+4129170786&4294967295,_=y+(v<<5&4294967295|v>>>27),v=b+(y^T&(_^y))+E[6]+3225465664&4294967295,b=_+(v<<9&4294967295|v>>>23),v=T+(_^y&(b^_))+E[11]+643717713&4294967295,T=b+(v<<14&4294967295|v>>>18),v=y+(b^_&(T^b))+E[0]+3921069994&4294967295,y=T+(v<<20&4294967295|v>>>12),v=_+(T^b&(y^T))+E[5]+3593408605&4294967295,_=y+(v<<5&4294967295|v>>>27),v=b+(y^T&(_^y))+E[10]+38016083&4294967295,b=_+(v<<9&4294967295|v>>>23),v=T+(_^y&(b^_))+E[15]+3634488961&4294967295,T=b+(v<<14&4294967295|v>>>18),v=y+(b^_&(T^b))+E[4]+3889429448&4294967295,y=T+(v<<20&4294967295|v>>>12),v=_+(T^b&(y^T))+E[9]+568446438&4294967295,_=y+(v<<5&4294967295|v>>>27),v=b+(y^T&(_^y))+E[14]+3275163606&4294967295,b=_+(v<<9&4294967295|v>>>23),v=T+(_^y&(b^_))+E[3]+4107603335&4294967295,T=b+(v<<14&4294967295|v>>>18),v=y+(b^_&(T^b))+E[8]+1163531501&4294967295,y=T+(v<<20&4294967295|v>>>12),v=_+(T^b&(y^T))+E[13]+2850285829&4294967295,_=y+(v<<5&4294967295|v>>>27),v=b+(y^T&(_^y))+E[2]+4243563512&4294967295,b=_+(v<<9&4294967295|v>>>23),v=T+(_^y&(b^_))+E[7]+1735328473&4294967295,T=b+(v<<14&4294967295|v>>>18),v=y+(b^_&(T^b))+E[12]+2368359562&4294967295,y=T+(v<<20&4294967295|v>>>12),v=_+(y^T^b)+E[5]+4294588738&4294967295,_=y+(v<<4&4294967295|v>>>28),v=b+(_^y^T)+E[8]+2272392833&4294967295,b=_+(v<<11&4294967295|v>>>21),v=T+(b^_^y)+E[11]+1839030562&4294967295,T=b+(v<<16&4294967295|v>>>16),v=y+(T^b^_)+E[14]+4259657740&4294967295,y=T+(v<<23&4294967295|v>>>9),v=_+(y^T^b)+E[1]+2763975236&4294967295,_=y+(v<<4&4294967295|v>>>28),v=b+(_^y^T)+E[4]+1272893353&4294967295,b=_+(v<<11&4294967295|v>>>21),v=T+(b^_^y)+E[7]+4139469664&4294967295,T=b+(v<<16&4294967295|v>>>16),v=y+(T^b^_)+E[10]+3200236656&4294967295,y=T+(v<<23&4294967295|v>>>9),v=_+(y^T^b)+E[13]+681279174&4294967295,_=y+(v<<4&4294967295|v>>>28),v=b+(_^y^T)+E[0]+3936430074&4294967295,b=_+(v<<11&4294967295|v>>>21),v=T+(b^_^y)+E[3]+3572445317&4294967295,T=b+(v<<16&4294967295|v>>>16),v=y+(T^b^_)+E[6]+76029189&4294967295,y=T+(v<<23&4294967295|v>>>9),v=_+(y^T^b)+E[9]+3654602809&4294967295,_=y+(v<<4&4294967295|v>>>28),v=b+(_^y^T)+E[12]+3873151461&4294967295,b=_+(v<<11&4294967295|v>>>21),v=T+(b^_^y)+E[15]+530742520&4294967295,T=b+(v<<16&4294967295|v>>>16),v=y+(T^b^_)+E[2]+3299628645&4294967295,y=T+(v<<23&4294967295|v>>>9),v=_+(T^(y|~b))+E[0]+4096336452&4294967295,_=y+(v<<6&4294967295|v>>>26),v=b+(y^(_|~T))+E[7]+1126891415&4294967295,b=_+(v<<10&4294967295|v>>>22),v=T+(_^(b|~y))+E[14]+2878612391&4294967295,T=b+(v<<15&4294967295|v>>>17),v=y+(b^(T|~_))+E[5]+4237533241&4294967295,y=T+(v<<21&4294967295|v>>>11),v=_+(T^(y|~b))+E[12]+1700485571&4294967295,_=y+(v<<6&4294967295|v>>>26),v=b+(y^(_|~T))+E[3]+2399980690&4294967295,b=_+(v<<10&4294967295|v>>>22),v=T+(_^(b|~y))+E[10]+4293915773&4294967295,T=b+(v<<15&4294967295|v>>>17),v=y+(b^(T|~_))+E[1]+2240044497&4294967295,y=T+(v<<21&4294967295|v>>>11),v=_+(T^(y|~b))+E[8]+1873313359&4294967295,_=y+(v<<6&4294967295|v>>>26),v=b+(y^(_|~T))+E[15]+4264355552&4294967295,b=_+(v<<10&4294967295|v>>>22),v=T+(_^(b|~y))+E[6]+2734768916&4294967295,T=b+(v<<15&4294967295|v>>>17),v=y+(b^(T|~_))+E[13]+1309151649&4294967295,y=T+(v<<21&4294967295|v>>>11),v=_+(T^(y|~b))+E[4]+4149444226&4294967295,_=y+(v<<6&4294967295|v>>>26),v=b+(y^(_|~T))+E[11]+3174756917&4294967295,b=_+(v<<10&4294967295|v>>>22),v=T+(_^(b|~y))+E[2]+718787259&4294967295,T=b+(v<<15&4294967295|v>>>17),v=y+(b^(T|~_))+E[9]+3951481745&4294967295,w.g[0]=w.g[0]+_&4294967295,w.g[1]=w.g[1]+(T+(v<<21&4294967295|v>>>11))&4294967295,w.g[2]=w.g[2]+T&4294967295,w.g[3]=w.g[3]+b&4294967295}r.prototype.u=function(w,_){_===void 0&&(_=w.length);for(var y=_-this.blockSize,E=this.B,T=this.h,b=0;b<_;){if(T==0)for(;b<=y;)s(this,w,b),b+=this.blockSize;if(typeof w=="string"){for(;b<_;)if(E[T++]=w.charCodeAt(b++),T==this.blockSize){s(this,E),T=0;break}}else for(;b<_;)if(E[T++]=w[b++],T==this.blockSize){s(this,E),T=0;break}}this.h=T,this.o+=_},r.prototype.v=function(){var w=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);w[0]=128;for(var _=1;_<w.length-8;++_)w[_]=0;var y=8*this.o;for(_=w.length-8;_<w.length;++_)w[_]=y&255,y/=256;for(this.u(w),w=Array(16),_=y=0;4>_;++_)for(var E=0;32>E;E+=8)w[y++]=this.g[_]>>>E&255;return w};function i(w,_){var y=l;return Object.prototype.hasOwnProperty.call(y,w)?y[w]:y[w]=_(w)}function a(w,_){this.h=_;for(var y=[],E=!0,T=w.length-1;0<=T;T--){var b=w[T]|0;E&&b==_||(y[T]=b,E=!1)}this.g=y}var l={};function u(w){return-128<=w&&128>w?i(w,function(_){return new a([_|0],0>_?-1:0)}):new a([w|0],0>w?-1:0)}function h(w){if(isNaN(w)||!isFinite(w))return m;if(0>w)return V(h(-w));for(var _=[],y=1,E=0;w>=y;E++)_[E]=w/y|0,y*=4294967296;return new a(_,0)}function f(w,_){if(w.length==0)throw Error("number format error: empty string");if(_=_||10,2>_||36<_)throw Error("radix out of range: "+_);if(w.charAt(0)=="-")return V(f(w.substring(1),_));if(0<=w.indexOf("-"))throw Error('number format error: interior "-" character');for(var y=h(Math.pow(_,8)),E=m,T=0;T<w.length;T+=8){var b=Math.min(8,w.length-T),v=parseInt(w.substring(T,T+b),_);8>b?(b=h(Math.pow(_,b)),E=E.j(b).add(h(v))):(E=E.j(y),E=E.add(h(v)))}return E}var m=u(0),g=u(1),S=u(16777216);n=a.prototype,n.m=function(){if(N(this))return-V(this).m();for(var w=0,_=1,y=0;y<this.g.length;y++){var E=this.i(y);w+=(0<=E?E:4294967296+E)*_,_*=4294967296}return w},n.toString=function(w){if(w=w||10,2>w||36<w)throw Error("radix out of range: "+w);if(k(this))return"0";if(N(this))return"-"+V(this).toString(w);for(var _=h(Math.pow(w,6)),y=this,E="";;){var T=fe(y,_).g;y=G(y,T.j(_));var b=((0<y.g.length?y.g[0]:y.h)>>>0).toString(w);if(y=T,k(y))return b+E;for(;6>b.length;)b="0"+b;E=b+E}},n.i=function(w){return 0>w?0:w<this.g.length?this.g[w]:this.h};function k(w){if(w.h!=0)return!1;for(var _=0;_<w.g.length;_++)if(w.g[_]!=0)return!1;return!0}function N(w){return w.h==-1}n.l=function(w){return w=G(this,w),N(w)?-1:k(w)?0:1};function V(w){for(var _=w.g.length,y=[],E=0;E<_;E++)y[E]=~w.g[E];return new a(y,~w.h).add(g)}n.abs=function(){return N(this)?V(this):this},n.add=function(w){for(var _=Math.max(this.g.length,w.g.length),y=[],E=0,T=0;T<=_;T++){var b=E+(this.i(T)&65535)+(w.i(T)&65535),v=(b>>>16)+(this.i(T)>>>16)+(w.i(T)>>>16);E=v>>>16,b&=65535,v&=65535,y[T]=v<<16|b}return new a(y,y[y.length-1]&-2147483648?-1:0)};function G(w,_){return w.add(V(_))}n.j=function(w){if(k(this)||k(w))return m;if(N(this))return N(w)?V(this).j(V(w)):V(V(this).j(w));if(N(w))return V(this.j(V(w)));if(0>this.l(S)&&0>w.l(S))return h(this.m()*w.m());for(var _=this.g.length+w.g.length,y=[],E=0;E<2*_;E++)y[E]=0;for(E=0;E<this.g.length;E++)for(var T=0;T<w.g.length;T++){var b=this.i(E)>>>16,v=this.i(E)&65535,ut=w.i(T)>>>16,Rn=w.i(T)&65535;y[2*E+2*T]+=v*Rn,z(y,2*E+2*T),y[2*E+2*T+1]+=b*Rn,z(y,2*E+2*T+1),y[2*E+2*T+1]+=v*ut,z(y,2*E+2*T+1),y[2*E+2*T+2]+=b*ut,z(y,2*E+2*T+2)}for(E=0;E<_;E++)y[E]=y[2*E+1]<<16|y[2*E];for(E=_;E<2*_;E++)y[E]=0;return new a(y,0)};function z(w,_){for(;(w[_]&65535)!=w[_];)w[_+1]+=w[_]>>>16,w[_]&=65535,_++}function X(w,_){this.g=w,this.h=_}function fe(w,_){if(k(_))throw Error("division by zero");if(k(w))return new X(m,m);if(N(w))return _=fe(V(w),_),new X(V(_.g),V(_.h));if(N(_))return _=fe(w,V(_)),new X(V(_.g),_.h);if(30<w.g.length){if(N(w)||N(_))throw Error("slowDivide_ only works with positive integers.");for(var y=g,E=_;0>=E.l(w);)y=tt(y),E=tt(E);var T=ve(y,1),b=ve(E,1);for(E=ve(E,2),y=ve(y,2);!k(E);){var v=b.add(E);0>=v.l(w)&&(T=T.add(y),b=v),E=ve(E,1),y=ve(y,1)}return _=G(w,T.j(_)),new X(T,_)}for(T=m;0<=w.l(_);){for(y=Math.max(1,Math.floor(w.m()/_.m())),E=Math.ceil(Math.log(y)/Math.LN2),E=48>=E?1:Math.pow(2,E-48),b=h(y),v=b.j(_);N(v)||0<v.l(w);)y-=E,b=h(y),v=b.j(_);k(b)&&(b=g),T=T.add(b),w=G(w,v)}return new X(T,w)}n.A=function(w){return fe(this,w).h},n.and=function(w){for(var _=Math.max(this.g.length,w.g.length),y=[],E=0;E<_;E++)y[E]=this.i(E)&w.i(E);return new a(y,this.h&w.h)},n.or=function(w){for(var _=Math.max(this.g.length,w.g.length),y=[],E=0;E<_;E++)y[E]=this.i(E)|w.i(E);return new a(y,this.h|w.h)},n.xor=function(w){for(var _=Math.max(this.g.length,w.g.length),y=[],E=0;E<_;E++)y[E]=this.i(E)^w.i(E);return new a(y,this.h^w.h)};function tt(w){for(var _=w.g.length+1,y=[],E=0;E<_;E++)y[E]=w.i(E)<<1|w.i(E-1)>>>31;return new a(y,w.h)}function ve(w,_){var y=_>>5;_%=32;for(var E=w.g.length-y,T=[],b=0;b<E;b++)T[b]=0<_?w.i(b+y)>>>_|w.i(b+y+1)<<32-_:w.i(b+y);return new a(T,w.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,Nd=r,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.A,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=h,a.fromString=f,cn=a}).apply(typeof Vu<"u"?Vu:typeof self<"u"?self:typeof window<"u"?window:{});var pi=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Dd,cs,xd,bi,Ba,Od,Md,Ld;(function(){var n,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(o,c,d){return o==Array.prototype||o==Object.prototype||(o[c]=d.value),o};function t(o){o=[typeof globalThis=="object"&&globalThis,o,typeof window=="object"&&window,typeof self=="object"&&self,typeof pi=="object"&&pi];for(var c=0;c<o.length;++c){var d=o[c];if(d&&d.Math==Math)return d}throw Error("Cannot find global object")}var r=t(this);function s(o,c){if(c)e:{var d=r;o=o.split(".");for(var p=0;p<o.length-1;p++){var I=o[p];if(!(I in d))break e;d=d[I]}o=o[o.length-1],p=d[o],c=c(p),c!=p&&c!=null&&e(d,o,{configurable:!0,writable:!0,value:c})}}function i(o,c){o instanceof String&&(o+="");var d=0,p=!1,I={next:function(){if(!p&&d<o.length){var R=d++;return{value:c(R,o[R]),done:!1}}return p=!0,{done:!0,value:void 0}}};return I[Symbol.iterator]=function(){return I},I}s("Array.prototype.values",function(o){return o||function(){return i(this,function(c,d){return d})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var a=a||{},l=this||self;function u(o){var c=typeof o;return c=c!="object"?c:o?Array.isArray(o)?"array":c:"null",c=="array"||c=="object"&&typeof o.length=="number"}function h(o){var c=typeof o;return c=="object"&&o!=null||c=="function"}function f(o,c,d){return o.call.apply(o.bind,arguments)}function m(o,c,d){if(!o)throw Error();if(2<arguments.length){var p=Array.prototype.slice.call(arguments,2);return function(){var I=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(I,p),o.apply(c,I)}}return function(){return o.apply(c,arguments)}}function g(o,c,d){return g=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?f:m,g.apply(null,arguments)}function S(o,c){var d=Array.prototype.slice.call(arguments,1);return function(){var p=d.slice();return p.push.apply(p,arguments),o.apply(this,p)}}function k(o,c){function d(){}d.prototype=c.prototype,o.aa=c.prototype,o.prototype=new d,o.prototype.constructor=o,o.Qb=function(p,I,R){for(var x=Array(arguments.length-2),le=2;le<arguments.length;le++)x[le-2]=arguments[le];return c.prototype[I].apply(p,x)}}function N(o){const c=o.length;if(0<c){const d=Array(c);for(let p=0;p<c;p++)d[p]=o[p];return d}return[]}function V(o,c){for(let d=1;d<arguments.length;d++){const p=arguments[d];if(u(p)){const I=o.length||0,R=p.length||0;o.length=I+R;for(let x=0;x<R;x++)o[I+x]=p[x]}else o.push(p)}}class G{constructor(c,d){this.i=c,this.j=d,this.h=0,this.g=null}get(){let c;return 0<this.h?(this.h--,c=this.g,this.g=c.next,c.next=null):c=this.i(),c}}function z(o){return/^[\s\xa0]*$/.test(o)}function X(){var o=l.navigator;return o&&(o=o.userAgent)?o:""}function fe(o){return fe[" "](o),o}fe[" "]=function(){};var tt=X().indexOf("Gecko")!=-1&&!(X().toLowerCase().indexOf("webkit")!=-1&&X().indexOf("Edge")==-1)&&!(X().indexOf("Trident")!=-1||X().indexOf("MSIE")!=-1)&&X().indexOf("Edge")==-1;function ve(o,c,d){for(const p in o)c.call(d,o[p],p,o)}function w(o,c){for(const d in o)c.call(void 0,o[d],d,o)}function _(o){const c={};for(const d in o)c[d]=o[d];return c}const y="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function E(o,c){let d,p;for(let I=1;I<arguments.length;I++){p=arguments[I];for(d in p)o[d]=p[d];for(let R=0;R<y.length;R++)d=y[R],Object.prototype.hasOwnProperty.call(p,d)&&(o[d]=p[d])}}function T(o){var c=1;o=o.split(":");const d=[];for(;0<c&&o.length;)d.push(o.shift()),c--;return o.length&&d.push(o.join(":")),d}function b(o){l.setTimeout(()=>{throw o},0)}function v(){var o=ce;let c=null;return o.g&&(c=o.g,o.g=o.g.next,o.g||(o.h=null),c.next=null),c}class ut{constructor(){this.h=this.g=null}add(c,d){const p=Rn.get();p.set(c,d),this.h?this.h.next=p:this.g=p,this.h=p}}var Rn=new G(()=>new O,o=>o.reset());class O{constructor(){this.next=this.g=this.h=null}set(c,d){this.h=c,this.g=d,this.next=null}reset(){this.next=this.g=this.h=null}}let F,B=!1,ce=new ut,_e=()=>{const o=l.Promise.resolve(void 0);F=()=>{o.then(Vt)}};var Vt=()=>{for(var o;o=v();){try{o.h.call(o.g)}catch(d){b(d)}var c=Rn;c.j(o),100>c.h&&(c.h++,o.next=c.g,c.g=o)}B=!1};function ue(){this.s=this.s,this.C=this.C}ue.prototype.s=!1,ue.prototype.ma=function(){this.s||(this.s=!0,this.N())},ue.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function oe(o,c){this.type=o,this.g=this.target=c,this.defaultPrevented=!1}oe.prototype.h=function(){this.defaultPrevented=!0};var nr=function(){if(!l.addEventListener||!Object.defineProperty)return!1;var o=!1,c=Object.defineProperty({},"passive",{get:function(){o=!0}});try{const d=()=>{};l.addEventListener("test",d,c),l.removeEventListener("test",d,c)}catch{}return o}();function kn(o,c){if(oe.call(this,o?o.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,o){var d=this.type=o.type,p=o.changedTouches&&o.changedTouches.length?o.changedTouches[0]:null;if(this.target=o.target||o.srcElement,this.g=c,c=o.relatedTarget){if(tt){e:{try{fe(c.nodeName);var I=!0;break e}catch{}I=!1}I||(c=null)}}else d=="mouseover"?c=o.fromElement:d=="mouseout"&&(c=o.toElement);this.relatedTarget=c,p?(this.clientX=p.clientX!==void 0?p.clientX:p.pageX,this.clientY=p.clientY!==void 0?p.clientY:p.pageY,this.screenX=p.screenX||0,this.screenY=p.screenY||0):(this.clientX=o.clientX!==void 0?o.clientX:o.pageX,this.clientY=o.clientY!==void 0?o.clientY:o.pageY,this.screenX=o.screenX||0,this.screenY=o.screenY||0),this.button=o.button,this.key=o.key||"",this.ctrlKey=o.ctrlKey,this.altKey=o.altKey,this.shiftKey=o.shiftKey,this.metaKey=o.metaKey,this.pointerId=o.pointerId||0,this.pointerType=typeof o.pointerType=="string"?o.pointerType:Oo[o.pointerType]||"",this.state=o.state,this.i=o,o.defaultPrevented&&kn.aa.h.call(this)}}k(kn,oe);var Oo={2:"touch",3:"pen",4:"mouse"};kn.prototype.h=function(){kn.aa.h.call(this);var o=this.i;o.preventDefault?o.preventDefault():o.returnValue=!1};var rr="closure_listenable_"+(1e6*Math.random()|0),Mo=0;function sm(o,c,d,p,I){this.listener=o,this.proxy=null,this.src=c,this.type=d,this.capture=!!p,this.ha=I,this.key=++Mo,this.da=this.fa=!1}function Ws(o){o.da=!0,o.listener=null,o.proxy=null,o.src=null,o.ha=null}function Ks(o){this.src=o,this.g={},this.h=0}Ks.prototype.add=function(o,c,d,p,I){var R=o.toString();o=this.g[R],o||(o=this.g[R]=[],this.h++);var x=Fo(o,c,p,I);return-1<x?(c=o[x],d||(c.fa=!1)):(c=new sm(c,this.src,R,!!p,I),c.fa=d,o.push(c)),c};function Lo(o,c){var d=c.type;if(d in o.g){var p=o.g[d],I=Array.prototype.indexOf.call(p,c,void 0),R;(R=0<=I)&&Array.prototype.splice.call(p,I,1),R&&(Ws(c),o.g[d].length==0&&(delete o.g[d],o.h--))}}function Fo(o,c,d,p){for(var I=0;I<o.length;++I){var R=o[I];if(!R.da&&R.listener==c&&R.capture==!!d&&R.ha==p)return I}return-1}var Uo="closure_lm_"+(1e6*Math.random()|0),$o={};function fc(o,c,d,p,I){if(Array.isArray(c)){for(var R=0;R<c.length;R++)fc(o,c[R],d,p,I);return null}return d=gc(d),o&&o[rr]?o.K(c,d,h(p)?!!p.capture:!1,I):im(o,c,d,!1,p,I)}function im(o,c,d,p,I,R){if(!c)throw Error("Invalid event type");var x=h(I)?!!I.capture:!!I,le=qo(o);if(le||(o[Uo]=le=new Ks(o)),d=le.add(c,d,p,x,R),d.proxy)return d;if(p=om(),d.proxy=p,p.src=o,p.listener=d,o.addEventListener)nr||(I=x),I===void 0&&(I=!1),o.addEventListener(c.toString(),p,I);else if(o.attachEvent)o.attachEvent(mc(c.toString()),p);else if(o.addListener&&o.removeListener)o.addListener(p);else throw Error("addEventListener and attachEvent are unavailable.");return d}function om(){function o(d){return c.call(o.src,o.listener,d)}const c=am;return o}function pc(o,c,d,p,I){if(Array.isArray(c))for(var R=0;R<c.length;R++)pc(o,c[R],d,p,I);else p=h(p)?!!p.capture:!!p,d=gc(d),o&&o[rr]?(o=o.i,c=String(c).toString(),c in o.g&&(R=o.g[c],d=Fo(R,d,p,I),-1<d&&(Ws(R[d]),Array.prototype.splice.call(R,d,1),R.length==0&&(delete o.g[c],o.h--)))):o&&(o=qo(o))&&(c=o.g[c.toString()],o=-1,c&&(o=Fo(c,d,p,I)),(d=-1<o?c[o]:null)&&Bo(d))}function Bo(o){if(typeof o!="number"&&o&&!o.da){var c=o.src;if(c&&c[rr])Lo(c.i,o);else{var d=o.type,p=o.proxy;c.removeEventListener?c.removeEventListener(d,p,o.capture):c.detachEvent?c.detachEvent(mc(d),p):c.addListener&&c.removeListener&&c.removeListener(p),(d=qo(c))?(Lo(d,o),d.h==0&&(d.src=null,c[Uo]=null)):Ws(o)}}}function mc(o){return o in $o?$o[o]:$o[o]="on"+o}function am(o,c){if(o.da)o=!0;else{c=new kn(c,this);var d=o.listener,p=o.ha||o.src;o.fa&&Bo(o),o=d.call(p,c)}return o}function qo(o){return o=o[Uo],o instanceof Ks?o:null}var jo="__closure_events_fn_"+(1e9*Math.random()>>>0);function gc(o){return typeof o=="function"?o:(o[jo]||(o[jo]=function(c){return o.handleEvent(c)}),o[jo])}function Be(){ue.call(this),this.i=new Ks(this),this.M=this,this.F=null}k(Be,ue),Be.prototype[rr]=!0,Be.prototype.removeEventListener=function(o,c,d,p){pc(this,o,c,d,p)};function Ye(o,c){var d,p=o.F;if(p)for(d=[];p;p=p.F)d.push(p);if(o=o.M,p=c.type||c,typeof c=="string")c=new oe(c,o);else if(c instanceof oe)c.target=c.target||o;else{var I=c;c=new oe(p,o),E(c,I)}if(I=!0,d)for(var R=d.length-1;0<=R;R--){var x=c.g=d[R];I=Qs(x,p,!0,c)&&I}if(x=c.g=o,I=Qs(x,p,!0,c)&&I,I=Qs(x,p,!1,c)&&I,d)for(R=0;R<d.length;R++)x=c.g=d[R],I=Qs(x,p,!1,c)&&I}Be.prototype.N=function(){if(Be.aa.N.call(this),this.i){var o=this.i,c;for(c in o.g){for(var d=o.g[c],p=0;p<d.length;p++)Ws(d[p]);delete o.g[c],o.h--}}this.F=null},Be.prototype.K=function(o,c,d,p){return this.i.add(String(o),c,!1,d,p)},Be.prototype.L=function(o,c,d,p){return this.i.add(String(o),c,!0,d,p)};function Qs(o,c,d,p){if(c=o.i.g[String(c)],!c)return!0;c=c.concat();for(var I=!0,R=0;R<c.length;++R){var x=c[R];if(x&&!x.da&&x.capture==d){var le=x.listener,Oe=x.ha||x.src;x.fa&&Lo(o.i,x),I=le.call(Oe,p)!==!1&&I}}return I&&!p.defaultPrevented}function _c(o,c,d){if(typeof o=="function")d&&(o=g(o,d));else if(o&&typeof o.handleEvent=="function")o=g(o.handleEvent,o);else throw Error("Invalid listener argument");return 2147483647<Number(c)?-1:l.setTimeout(o,c||0)}function yc(o){o.g=_c(()=>{o.g=null,o.i&&(o.i=!1,yc(o))},o.l);const c=o.h;o.h=null,o.m.apply(null,c)}class lm extends ue{constructor(c,d){super(),this.m=c,this.l=d,this.h=null,this.i=!1,this.g=null}j(c){this.h=arguments,this.g?this.i=!0:yc(this)}N(){super.N(),this.g&&(l.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Gr(o){ue.call(this),this.h=o,this.g={}}k(Gr,ue);var vc=[];function Ec(o){ve(o.g,function(c,d){this.g.hasOwnProperty(d)&&Bo(c)},o),o.g={}}Gr.prototype.N=function(){Gr.aa.N.call(this),Ec(this)},Gr.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var zo=l.JSON.stringify,cm=l.JSON.parse,um=class{stringify(o){return l.JSON.stringify(o,void 0)}parse(o){return l.JSON.parse(o,void 0)}};function Ho(){}Ho.prototype.h=null;function wc(o){return o.h||(o.h=o.i())}function Tc(){}var Wr={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function Go(){oe.call(this,"d")}k(Go,oe);function Wo(){oe.call(this,"c")}k(Wo,oe);var Pn={},Ic=null;function Js(){return Ic=Ic||new Be}Pn.La="serverreachability";function bc(o){oe.call(this,Pn.La,o)}k(bc,oe);function Kr(o){const c=Js();Ye(c,new bc(c))}Pn.STAT_EVENT="statevent";function Ac(o,c){oe.call(this,Pn.STAT_EVENT,o),this.stat=c}k(Ac,oe);function Ze(o){const c=Js();Ye(c,new Ac(c,o))}Pn.Ma="timingevent";function Sc(o,c){oe.call(this,Pn.Ma,o),this.size=c}k(Sc,oe);function Qr(o,c){if(typeof o!="function")throw Error("Fn must not be null and must be a function");return l.setTimeout(function(){o()},c)}function Jr(){this.g=!0}Jr.prototype.xa=function(){this.g=!1};function hm(o,c,d,p,I,R){o.info(function(){if(o.g)if(R)for(var x="",le=R.split("&"),Oe=0;Oe<le.length;Oe++){var re=le[Oe].split("=");if(1<re.length){var qe=re[0];re=re[1];var je=qe.split("_");x=2<=je.length&&je[1]=="type"?x+(qe+"="+re+"&"):x+(qe+"=redacted&")}}else x=null;else x=R;return"XMLHTTP REQ ("+p+") [attempt "+I+"]: "+c+`
`+d+`
`+x})}function dm(o,c,d,p,I,R,x){o.info(function(){return"XMLHTTP RESP ("+p+") [ attempt "+I+"]: "+c+`
`+d+`
`+R+" "+x})}function sr(o,c,d,p){o.info(function(){return"XMLHTTP TEXT ("+c+"): "+pm(o,d)+(p?" "+p:"")})}function fm(o,c){o.info(function(){return"TIMEOUT: "+c})}Jr.prototype.info=function(){};function pm(o,c){if(!o.g)return c;if(!c)return null;try{var d=JSON.parse(c);if(d){for(o=0;o<d.length;o++)if(Array.isArray(d[o])){var p=d[o];if(!(2>p.length)){var I=p[1];if(Array.isArray(I)&&!(1>I.length)){var R=I[0];if(R!="noop"&&R!="stop"&&R!="close")for(var x=1;x<I.length;x++)I[x]=""}}}}return zo(d)}catch{return c}}var Xs={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},Rc={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},Ko;function Ys(){}k(Ys,Ho),Ys.prototype.g=function(){return new XMLHttpRequest},Ys.prototype.i=function(){return{}},Ko=new Ys;function Kt(o,c,d,p){this.j=o,this.i=c,this.l=d,this.R=p||1,this.U=new Gr(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new kc}function kc(){this.i=null,this.g="",this.h=!1}var Pc={},Qo={};function Jo(o,c,d){o.L=1,o.v=ni(Nt(c)),o.m=d,o.P=!0,Cc(o,null)}function Cc(o,c){o.F=Date.now(),Zs(o),o.A=Nt(o.v);var d=o.A,p=o.R;Array.isArray(p)||(p=[String(p)]),zc(d.i,"t",p),o.C=0,d=o.j.J,o.h=new kc,o.g=lu(o.j,d?c:null,!o.m),0<o.O&&(o.M=new lm(g(o.Y,o,o.g),o.O)),c=o.U,d=o.g,p=o.ca;var I="readystatechange";Array.isArray(I)||(I&&(vc[0]=I.toString()),I=vc);for(var R=0;R<I.length;R++){var x=fc(d,I[R],p||c.handleEvent,!1,c.h||c);if(!x)break;c.g[x.key]=x}c=o.H?_(o.H):{},o.m?(o.u||(o.u="POST"),c["Content-Type"]="application/x-www-form-urlencoded",o.g.ea(o.A,o.u,o.m,c)):(o.u="GET",o.g.ea(o.A,o.u,null,c)),Kr(),hm(o.i,o.u,o.A,o.l,o.R,o.m)}Kt.prototype.ca=function(o){o=o.target;const c=this.M;c&&Dt(o)==3?c.j():this.Y(o)},Kt.prototype.Y=function(o){try{if(o==this.g)e:{const je=Dt(this.g);var c=this.g.Ba();const ar=this.g.Z();if(!(3>je)&&(je!=3||this.g&&(this.h.h||this.g.oa()||Xc(this.g)))){this.J||je!=4||c==7||(c==8||0>=ar?Kr(3):Kr(2)),Xo(this);var d=this.g.Z();this.X=d;t:if(Vc(this)){var p=Xc(this.g);o="";var I=p.length,R=Dt(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){Cn(this),Xr(this);var x="";break t}this.h.i=new l.TextDecoder}for(c=0;c<I;c++)this.h.h=!0,o+=this.h.i.decode(p[c],{stream:!(R&&c==I-1)});p.length=0,this.h.g+=o,this.C=0,x=this.h.g}else x=this.g.oa();if(this.o=d==200,dm(this.i,this.u,this.A,this.l,this.R,je,d),this.o){if(this.T&&!this.K){t:{if(this.g){var le,Oe=this.g;if((le=Oe.g?Oe.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!z(le)){var re=le;break t}}re=null}if(d=re)sr(this.i,this.l,d,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Yo(this,d);else{this.o=!1,this.s=3,Ze(12),Cn(this),Xr(this);break e}}if(this.P){d=!0;let ht;for(;!this.J&&this.C<x.length;)if(ht=mm(this,x),ht==Qo){je==4&&(this.s=4,Ze(14),d=!1),sr(this.i,this.l,null,"[Incomplete Response]");break}else if(ht==Pc){this.s=4,Ze(15),sr(this.i,this.l,x,"[Invalid Chunk]"),d=!1;break}else sr(this.i,this.l,ht,null),Yo(this,ht);if(Vc(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),je!=4||x.length!=0||this.h.h||(this.s=1,Ze(16),d=!1),this.o=this.o&&d,!d)sr(this.i,this.l,x,"[Invalid Chunked Response]"),Cn(this),Xr(this);else if(0<x.length&&!this.W){this.W=!0;var qe=this.j;qe.g==this&&qe.ba&&!qe.M&&(qe.j.info("Great, no buffering proxy detected. Bytes received: "+x.length),sa(qe),qe.M=!0,Ze(11))}}else sr(this.i,this.l,x,null),Yo(this,x);je==4&&Cn(this),this.o&&!this.J&&(je==4?su(this.j,this):(this.o=!1,Zs(this)))}else Nm(this.g),d==400&&0<x.indexOf("Unknown SID")?(this.s=3,Ze(12)):(this.s=0,Ze(13)),Cn(this),Xr(this)}}}catch{}finally{}};function Vc(o){return o.g?o.u=="GET"&&o.L!=2&&o.j.Ca:!1}function mm(o,c){var d=o.C,p=c.indexOf(`
`,d);return p==-1?Qo:(d=Number(c.substring(d,p)),isNaN(d)?Pc:(p+=1,p+d>c.length?Qo:(c=c.slice(p,p+d),o.C=p+d,c)))}Kt.prototype.cancel=function(){this.J=!0,Cn(this)};function Zs(o){o.S=Date.now()+o.I,Nc(o,o.I)}function Nc(o,c){if(o.B!=null)throw Error("WatchDog timer not null");o.B=Qr(g(o.ba,o),c)}function Xo(o){o.B&&(l.clearTimeout(o.B),o.B=null)}Kt.prototype.ba=function(){this.B=null;const o=Date.now();0<=o-this.S?(fm(this.i,this.A),this.L!=2&&(Kr(),Ze(17)),Cn(this),this.s=2,Xr(this)):Nc(this,this.S-o)};function Xr(o){o.j.G==0||o.J||su(o.j,o)}function Cn(o){Xo(o);var c=o.M;c&&typeof c.ma=="function"&&c.ma(),o.M=null,Ec(o.U),o.g&&(c=o.g,o.g=null,c.abort(),c.ma())}function Yo(o,c){try{var d=o.j;if(d.G!=0&&(d.g==o||Zo(d.h,o))){if(!o.K&&Zo(d.h,o)&&d.G==3){try{var p=d.Da.g.parse(c)}catch{p=null}if(Array.isArray(p)&&p.length==3){var I=p;if(I[0]==0){e:if(!d.u){if(d.g)if(d.g.F+3e3<o.F)li(d),oi(d);else break e;ra(d),Ze(18)}}else d.za=I[1],0<d.za-d.T&&37500>I[2]&&d.F&&d.v==0&&!d.C&&(d.C=Qr(g(d.Za,d),6e3));if(1>=Oc(d.h)&&d.ca){try{d.ca()}catch{}d.ca=void 0}}else Nn(d,11)}else if((o.K||d.g==o)&&li(d),!z(c))for(I=d.Da.g.parse(c),c=0;c<I.length;c++){let re=I[c];if(d.T=re[0],re=re[1],d.G==2)if(re[0]=="c"){d.K=re[1],d.ia=re[2];const qe=re[3];qe!=null&&(d.la=qe,d.j.info("VER="+d.la));const je=re[4];je!=null&&(d.Aa=je,d.j.info("SVER="+d.Aa));const ar=re[5];ar!=null&&typeof ar=="number"&&0<ar&&(p=1.5*ar,d.L=p,d.j.info("backChannelRequestTimeoutMs_="+p)),p=d;const ht=o.g;if(ht){const ui=ht.g?ht.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(ui){var R=p.h;R.g||ui.indexOf("spdy")==-1&&ui.indexOf("quic")==-1&&ui.indexOf("h2")==-1||(R.j=R.l,R.g=new Set,R.h&&(ea(R,R.h),R.h=null))}if(p.D){const ia=ht.g?ht.g.getResponseHeader("X-HTTP-Session-Id"):null;ia&&(p.ya=ia,pe(p.I,p.D,ia))}}d.G=3,d.l&&d.l.ua(),d.ba&&(d.R=Date.now()-o.F,d.j.info("Handshake RTT: "+d.R+"ms")),p=d;var x=o;if(p.qa=au(p,p.J?p.ia:null,p.W),x.K){Mc(p.h,x);var le=x,Oe=p.L;Oe&&(le.I=Oe),le.B&&(Xo(le),Zs(le)),p.g=x}else nu(p);0<d.i.length&&ai(d)}else re[0]!="stop"&&re[0]!="close"||Nn(d,7);else d.G==3&&(re[0]=="stop"||re[0]=="close"?re[0]=="stop"?Nn(d,7):na(d):re[0]!="noop"&&d.l&&d.l.ta(re),d.v=0)}}Kr(4)}catch{}}var gm=class{constructor(o,c){this.g=o,this.map=c}};function Dc(o){this.l=o||10,l.PerformanceNavigationTiming?(o=l.performance.getEntriesByType("navigation"),o=0<o.length&&(o[0].nextHopProtocol=="hq"||o[0].nextHopProtocol=="h2")):o=!!(l.chrome&&l.chrome.loadTimes&&l.chrome.loadTimes()&&l.chrome.loadTimes().wasFetchedViaSpdy),this.j=o?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function xc(o){return o.h?!0:o.g?o.g.size>=o.j:!1}function Oc(o){return o.h?1:o.g?o.g.size:0}function Zo(o,c){return o.h?o.h==c:o.g?o.g.has(c):!1}function ea(o,c){o.g?o.g.add(c):o.h=c}function Mc(o,c){o.h&&o.h==c?o.h=null:o.g&&o.g.has(c)&&o.g.delete(c)}Dc.prototype.cancel=function(){if(this.i=Lc(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const o of this.g.values())o.cancel();this.g.clear()}};function Lc(o){if(o.h!=null)return o.i.concat(o.h.D);if(o.g!=null&&o.g.size!==0){let c=o.i;for(const d of o.g.values())c=c.concat(d.D);return c}return N(o.i)}function _m(o){if(o.V&&typeof o.V=="function")return o.V();if(typeof Map<"u"&&o instanceof Map||typeof Set<"u"&&o instanceof Set)return Array.from(o.values());if(typeof o=="string")return o.split("");if(u(o)){for(var c=[],d=o.length,p=0;p<d;p++)c.push(o[p]);return c}c=[],d=0;for(p in o)c[d++]=o[p];return c}function ym(o){if(o.na&&typeof o.na=="function")return o.na();if(!o.V||typeof o.V!="function"){if(typeof Map<"u"&&o instanceof Map)return Array.from(o.keys());if(!(typeof Set<"u"&&o instanceof Set)){if(u(o)||typeof o=="string"){var c=[];o=o.length;for(var d=0;d<o;d++)c.push(d);return c}c=[],d=0;for(const p in o)c[d++]=p;return c}}}function Fc(o,c){if(o.forEach&&typeof o.forEach=="function")o.forEach(c,void 0);else if(u(o)||typeof o=="string")Array.prototype.forEach.call(o,c,void 0);else for(var d=ym(o),p=_m(o),I=p.length,R=0;R<I;R++)c.call(void 0,p[R],d&&d[R],o)}var Uc=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function vm(o,c){if(o){o=o.split("&");for(var d=0;d<o.length;d++){var p=o[d].indexOf("="),I=null;if(0<=p){var R=o[d].substring(0,p);I=o[d].substring(p+1)}else R=o[d];c(R,I?decodeURIComponent(I.replace(/\+/g," ")):"")}}}function Vn(o){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,o instanceof Vn){this.h=o.h,ei(this,o.j),this.o=o.o,this.g=o.g,ti(this,o.s),this.l=o.l;var c=o.i,d=new es;d.i=c.i,c.g&&(d.g=new Map(c.g),d.h=c.h),$c(this,d),this.m=o.m}else o&&(c=String(o).match(Uc))?(this.h=!1,ei(this,c[1]||"",!0),this.o=Yr(c[2]||""),this.g=Yr(c[3]||"",!0),ti(this,c[4]),this.l=Yr(c[5]||"",!0),$c(this,c[6]||"",!0),this.m=Yr(c[7]||"")):(this.h=!1,this.i=new es(null,this.h))}Vn.prototype.toString=function(){var o=[],c=this.j;c&&o.push(Zr(c,Bc,!0),":");var d=this.g;return(d||c=="file")&&(o.push("//"),(c=this.o)&&o.push(Zr(c,Bc,!0),"@"),o.push(encodeURIComponent(String(d)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),d=this.s,d!=null&&o.push(":",String(d))),(d=this.l)&&(this.g&&d.charAt(0)!="/"&&o.push("/"),o.push(Zr(d,d.charAt(0)=="/"?Tm:wm,!0))),(d=this.i.toString())&&o.push("?",d),(d=this.m)&&o.push("#",Zr(d,bm)),o.join("")};function Nt(o){return new Vn(o)}function ei(o,c,d){o.j=d?Yr(c,!0):c,o.j&&(o.j=o.j.replace(/:$/,""))}function ti(o,c){if(c){if(c=Number(c),isNaN(c)||0>c)throw Error("Bad port number "+c);o.s=c}else o.s=null}function $c(o,c,d){c instanceof es?(o.i=c,Am(o.i,o.h)):(d||(c=Zr(c,Im)),o.i=new es(c,o.h))}function pe(o,c,d){o.i.set(c,d)}function ni(o){return pe(o,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),o}function Yr(o,c){return o?c?decodeURI(o.replace(/%25/g,"%2525")):decodeURIComponent(o):""}function Zr(o,c,d){return typeof o=="string"?(o=encodeURI(o).replace(c,Em),d&&(o=o.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),o):null}function Em(o){return o=o.charCodeAt(0),"%"+(o>>4&15).toString(16)+(o&15).toString(16)}var Bc=/[#\/\?@]/g,wm=/[#\?:]/g,Tm=/[#\?]/g,Im=/[#\?@]/g,bm=/#/g;function es(o,c){this.h=this.g=null,this.i=o||null,this.j=!!c}function Qt(o){o.g||(o.g=new Map,o.h=0,o.i&&vm(o.i,function(c,d){o.add(decodeURIComponent(c.replace(/\+/g," ")),d)}))}n=es.prototype,n.add=function(o,c){Qt(this),this.i=null,o=ir(this,o);var d=this.g.get(o);return d||this.g.set(o,d=[]),d.push(c),this.h+=1,this};function qc(o,c){Qt(o),c=ir(o,c),o.g.has(c)&&(o.i=null,o.h-=o.g.get(c).length,o.g.delete(c))}function jc(o,c){return Qt(o),c=ir(o,c),o.g.has(c)}n.forEach=function(o,c){Qt(this),this.g.forEach(function(d,p){d.forEach(function(I){o.call(c,I,p,this)},this)},this)},n.na=function(){Qt(this);const o=Array.from(this.g.values()),c=Array.from(this.g.keys()),d=[];for(let p=0;p<c.length;p++){const I=o[p];for(let R=0;R<I.length;R++)d.push(c[p])}return d},n.V=function(o){Qt(this);let c=[];if(typeof o=="string")jc(this,o)&&(c=c.concat(this.g.get(ir(this,o))));else{o=Array.from(this.g.values());for(let d=0;d<o.length;d++)c=c.concat(o[d])}return c},n.set=function(o,c){return Qt(this),this.i=null,o=ir(this,o),jc(this,o)&&(this.h-=this.g.get(o).length),this.g.set(o,[c]),this.h+=1,this},n.get=function(o,c){return o?(o=this.V(o),0<o.length?String(o[0]):c):c};function zc(o,c,d){qc(o,c),0<d.length&&(o.i=null,o.g.set(ir(o,c),N(d)),o.h+=d.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const o=[],c=Array.from(this.g.keys());for(var d=0;d<c.length;d++){var p=c[d];const R=encodeURIComponent(String(p)),x=this.V(p);for(p=0;p<x.length;p++){var I=R;x[p]!==""&&(I+="="+encodeURIComponent(String(x[p]))),o.push(I)}}return this.i=o.join("&")};function ir(o,c){return c=String(c),o.j&&(c=c.toLowerCase()),c}function Am(o,c){c&&!o.j&&(Qt(o),o.i=null,o.g.forEach(function(d,p){var I=p.toLowerCase();p!=I&&(qc(this,p),zc(this,I,d))},o)),o.j=c}function Sm(o,c){const d=new Jr;if(l.Image){const p=new Image;p.onload=S(Jt,d,"TestLoadImage: loaded",!0,c,p),p.onerror=S(Jt,d,"TestLoadImage: error",!1,c,p),p.onabort=S(Jt,d,"TestLoadImage: abort",!1,c,p),p.ontimeout=S(Jt,d,"TestLoadImage: timeout",!1,c,p),l.setTimeout(function(){p.ontimeout&&p.ontimeout()},1e4),p.src=o}else c(!1)}function Rm(o,c){const d=new Jr,p=new AbortController,I=setTimeout(()=>{p.abort(),Jt(d,"TestPingServer: timeout",!1,c)},1e4);fetch(o,{signal:p.signal}).then(R=>{clearTimeout(I),R.ok?Jt(d,"TestPingServer: ok",!0,c):Jt(d,"TestPingServer: server error",!1,c)}).catch(()=>{clearTimeout(I),Jt(d,"TestPingServer: error",!1,c)})}function Jt(o,c,d,p,I){try{I&&(I.onload=null,I.onerror=null,I.onabort=null,I.ontimeout=null),p(d)}catch{}}function km(){this.g=new um}function Pm(o,c,d){const p=d||"";try{Fc(o,function(I,R){let x=I;h(I)&&(x=zo(I)),c.push(p+R+"="+encodeURIComponent(x))})}catch(I){throw c.push(p+"type="+encodeURIComponent("_badmap")),I}}function ri(o){this.l=o.Ub||null,this.j=o.eb||!1}k(ri,Ho),ri.prototype.g=function(){return new si(this.l,this.j)},ri.prototype.i=function(o){return function(){return o}}({});function si(o,c){Be.call(this),this.D=o,this.o=c,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}k(si,Be),n=si.prototype,n.open=function(o,c){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=o,this.A=c,this.readyState=1,ns(this)},n.send=function(o){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const c={headers:this.u,method:this.B,credentials:this.m,cache:void 0};o&&(c.body=o),(this.D||l).fetch(new Request(this.A,c)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,ts(this)),this.readyState=0},n.Sa=function(o){if(this.g&&(this.l=o,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=o.headers,this.readyState=2,ns(this)),this.g&&(this.readyState=3,ns(this),this.g)))if(this.responseType==="arraybuffer")o.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof l.ReadableStream<"u"&&"body"in o){if(this.j=o.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;Hc(this)}else o.text().then(this.Ra.bind(this),this.ga.bind(this))};function Hc(o){o.j.read().then(o.Pa.bind(o)).catch(o.ga.bind(o))}n.Pa=function(o){if(this.g){if(this.o&&o.value)this.response.push(o.value);else if(!this.o){var c=o.value?o.value:new Uint8Array(0);(c=this.v.decode(c,{stream:!o.done}))&&(this.response=this.responseText+=c)}o.done?ts(this):ns(this),this.readyState==3&&Hc(this)}},n.Ra=function(o){this.g&&(this.response=this.responseText=o,ts(this))},n.Qa=function(o){this.g&&(this.response=o,ts(this))},n.ga=function(){this.g&&ts(this)};function ts(o){o.readyState=4,o.l=null,o.j=null,o.v=null,ns(o)}n.setRequestHeader=function(o,c){this.u.append(o,c)},n.getResponseHeader=function(o){return this.h&&this.h.get(o.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const o=[],c=this.h.entries();for(var d=c.next();!d.done;)d=d.value,o.push(d[0]+": "+d[1]),d=c.next();return o.join(`\r
`)};function ns(o){o.onreadystatechange&&o.onreadystatechange.call(o)}Object.defineProperty(si.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(o){this.m=o?"include":"same-origin"}});function Gc(o){let c="";return ve(o,function(d,p){c+=p,c+=":",c+=d,c+=`\r
`}),c}function ta(o,c,d){e:{for(p in d){var p=!1;break e}p=!0}p||(d=Gc(d),typeof o=="string"?d!=null&&encodeURIComponent(String(d)):pe(o,c,d))}function Ae(o){Be.call(this),this.headers=new Map,this.o=o||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}k(Ae,Be);var Cm=/^https?$/i,Vm=["POST","PUT"];n=Ae.prototype,n.Ha=function(o){this.J=o},n.ea=function(o,c,d,p){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+o);c=c?c.toUpperCase():"GET",this.D=o,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Ko.g(),this.v=this.o?wc(this.o):wc(Ko),this.g.onreadystatechange=g(this.Ea,this);try{this.B=!0,this.g.open(c,String(o),!0),this.B=!1}catch(R){Wc(this,R);return}if(o=d||"",d=new Map(this.headers),p)if(Object.getPrototypeOf(p)===Object.prototype)for(var I in p)d.set(I,p[I]);else if(typeof p.keys=="function"&&typeof p.get=="function")for(const R of p.keys())d.set(R,p.get(R));else throw Error("Unknown input type for opt_headers: "+String(p));p=Array.from(d.keys()).find(R=>R.toLowerCase()=="content-type"),I=l.FormData&&o instanceof l.FormData,!(0<=Array.prototype.indexOf.call(Vm,c,void 0))||p||I||d.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[R,x]of d)this.g.setRequestHeader(R,x);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Jc(this),this.u=!0,this.g.send(o),this.u=!1}catch(R){Wc(this,R)}};function Wc(o,c){o.h=!1,o.g&&(o.j=!0,o.g.abort(),o.j=!1),o.l=c,o.m=5,Kc(o),ii(o)}function Kc(o){o.A||(o.A=!0,Ye(o,"complete"),Ye(o,"error"))}n.abort=function(o){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=o||7,Ye(this,"complete"),Ye(this,"abort"),ii(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),ii(this,!0)),Ae.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?Qc(this):this.bb())},n.bb=function(){Qc(this)};function Qc(o){if(o.h&&typeof a<"u"&&(!o.v[1]||Dt(o)!=4||o.Z()!=2)){if(o.u&&Dt(o)==4)_c(o.Ea,0,o);else if(Ye(o,"readystatechange"),Dt(o)==4){o.h=!1;try{const x=o.Z();e:switch(x){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var c=!0;break e;default:c=!1}var d;if(!(d=c)){var p;if(p=x===0){var I=String(o.D).match(Uc)[1]||null;!I&&l.self&&l.self.location&&(I=l.self.location.protocol.slice(0,-1)),p=!Cm.test(I?I.toLowerCase():"")}d=p}if(d)Ye(o,"complete"),Ye(o,"success");else{o.m=6;try{var R=2<Dt(o)?o.g.statusText:""}catch{R=""}o.l=R+" ["+o.Z()+"]",Kc(o)}}finally{ii(o)}}}}function ii(o,c){if(o.g){Jc(o);const d=o.g,p=o.v[0]?()=>{}:null;o.g=null,o.v=null,c||Ye(o,"ready");try{d.onreadystatechange=p}catch{}}}function Jc(o){o.I&&(l.clearTimeout(o.I),o.I=null)}n.isActive=function(){return!!this.g};function Dt(o){return o.g?o.g.readyState:0}n.Z=function(){try{return 2<Dt(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(o){if(this.g){var c=this.g.responseText;return o&&c.indexOf(o)==0&&(c=c.substring(o.length)),cm(c)}};function Xc(o){try{if(!o.g)return null;if("response"in o.g)return o.g.response;switch(o.H){case"":case"text":return o.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in o.g)return o.g.mozResponseArrayBuffer}return null}catch{return null}}function Nm(o){const c={};o=(o.g&&2<=Dt(o)&&o.g.getAllResponseHeaders()||"").split(`\r
`);for(let p=0;p<o.length;p++){if(z(o[p]))continue;var d=T(o[p]);const I=d[0];if(d=d[1],typeof d!="string")continue;d=d.trim();const R=c[I]||[];c[I]=R,R.push(d)}w(c,function(p){return p.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function rs(o,c,d){return d&&d.internalChannelParams&&d.internalChannelParams[o]||c}function Yc(o){this.Aa=0,this.i=[],this.j=new Jr,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=rs("failFast",!1,o),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=rs("baseRetryDelayMs",5e3,o),this.cb=rs("retryDelaySeedMs",1e4,o),this.Wa=rs("forwardChannelMaxRetries",2,o),this.wa=rs("forwardChannelRequestTimeoutMs",2e4,o),this.pa=o&&o.xmlHttpFactory||void 0,this.Xa=o&&o.Tb||void 0,this.Ca=o&&o.useFetchStreams||!1,this.L=void 0,this.J=o&&o.supportsCrossDomainXhr||!1,this.K="",this.h=new Dc(o&&o.concurrentRequestLimit),this.Da=new km,this.P=o&&o.fastHandshake||!1,this.O=o&&o.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=o&&o.Rb||!1,o&&o.xa&&this.j.xa(),o&&o.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&o&&o.detectBufferingProxy||!1,this.ja=void 0,o&&o.longPollingTimeout&&0<o.longPollingTimeout&&(this.ja=o.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=Yc.prototype,n.la=8,n.G=1,n.connect=function(o,c,d,p){Ze(0),this.W=o,this.H=c||{},d&&p!==void 0&&(this.H.OSID=d,this.H.OAID=p),this.F=this.X,this.I=au(this,null,this.W),ai(this)};function na(o){if(Zc(o),o.G==3){var c=o.U++,d=Nt(o.I);if(pe(d,"SID",o.K),pe(d,"RID",c),pe(d,"TYPE","terminate"),ss(o,d),c=new Kt(o,o.j,c),c.L=2,c.v=ni(Nt(d)),d=!1,l.navigator&&l.navigator.sendBeacon)try{d=l.navigator.sendBeacon(c.v.toString(),"")}catch{}!d&&l.Image&&(new Image().src=c.v,d=!0),d||(c.g=lu(c.j,null),c.g.ea(c.v)),c.F=Date.now(),Zs(c)}ou(o)}function oi(o){o.g&&(sa(o),o.g.cancel(),o.g=null)}function Zc(o){oi(o),o.u&&(l.clearTimeout(o.u),o.u=null),li(o),o.h.cancel(),o.s&&(typeof o.s=="number"&&l.clearTimeout(o.s),o.s=null)}function ai(o){if(!xc(o.h)&&!o.s){o.s=!0;var c=o.Ga;F||_e(),B||(F(),B=!0),ce.add(c,o),o.B=0}}function Dm(o,c){return Oc(o.h)>=o.h.j-(o.s?1:0)?!1:o.s?(o.i=c.D.concat(o.i),!0):o.G==1||o.G==2||o.B>=(o.Va?0:o.Wa)?!1:(o.s=Qr(g(o.Ga,o,c),iu(o,o.B)),o.B++,!0)}n.Ga=function(o){if(this.s)if(this.s=null,this.G==1){if(!o){this.U=Math.floor(1e5*Math.random()),o=this.U++;const I=new Kt(this,this.j,o);let R=this.o;if(this.S&&(R?(R=_(R),E(R,this.S)):R=this.S),this.m!==null||this.O||(I.H=R,R=null),this.P)e:{for(var c=0,d=0;d<this.i.length;d++){t:{var p=this.i[d];if("__data__"in p.map&&(p=p.map.__data__,typeof p=="string")){p=p.length;break t}p=void 0}if(p===void 0)break;if(c+=p,4096<c){c=d;break e}if(c===4096||d===this.i.length-1){c=d+1;break e}}c=1e3}else c=1e3;c=tu(this,I,c),d=Nt(this.I),pe(d,"RID",o),pe(d,"CVER",22),this.D&&pe(d,"X-HTTP-Session-Id",this.D),ss(this,d),R&&(this.O?c="headers="+encodeURIComponent(String(Gc(R)))+"&"+c:this.m&&ta(d,this.m,R)),ea(this.h,I),this.Ua&&pe(d,"TYPE","init"),this.P?(pe(d,"$req",c),pe(d,"SID","null"),I.T=!0,Jo(I,d,null)):Jo(I,d,c),this.G=2}}else this.G==3&&(o?eu(this,o):this.i.length==0||xc(this.h)||eu(this))};function eu(o,c){var d;c?d=c.l:d=o.U++;const p=Nt(o.I);pe(p,"SID",o.K),pe(p,"RID",d),pe(p,"AID",o.T),ss(o,p),o.m&&o.o&&ta(p,o.m,o.o),d=new Kt(o,o.j,d,o.B+1),o.m===null&&(d.H=o.o),c&&(o.i=c.D.concat(o.i)),c=tu(o,d,1e3),d.I=Math.round(.5*o.wa)+Math.round(.5*o.wa*Math.random()),ea(o.h,d),Jo(d,p,c)}function ss(o,c){o.H&&ve(o.H,function(d,p){pe(c,p,d)}),o.l&&Fc({},function(d,p){pe(c,p,d)})}function tu(o,c,d){d=Math.min(o.i.length,d);var p=o.l?g(o.l.Na,o.l,o):null;e:{var I=o.i;let R=-1;for(;;){const x=["count="+d];R==-1?0<d?(R=I[0].g,x.push("ofs="+R)):R=0:x.push("ofs="+R);let le=!0;for(let Oe=0;Oe<d;Oe++){let re=I[Oe].g;const qe=I[Oe].map;if(re-=R,0>re)R=Math.max(0,I[Oe].g-100),le=!1;else try{Pm(qe,x,"req"+re+"_")}catch{p&&p(qe)}}if(le){p=x.join("&");break e}}}return o=o.i.splice(0,d),c.D=o,p}function nu(o){if(!o.g&&!o.u){o.Y=1;var c=o.Fa;F||_e(),B||(F(),B=!0),ce.add(c,o),o.v=0}}function ra(o){return o.g||o.u||3<=o.v?!1:(o.Y++,o.u=Qr(g(o.Fa,o),iu(o,o.v)),o.v++,!0)}n.Fa=function(){if(this.u=null,ru(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var o=2*this.R;this.j.info("BP detection timer enabled: "+o),this.A=Qr(g(this.ab,this),o)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,Ze(10),oi(this),ru(this))};function sa(o){o.A!=null&&(l.clearTimeout(o.A),o.A=null)}function ru(o){o.g=new Kt(o,o.j,"rpc",o.Y),o.m===null&&(o.g.H=o.o),o.g.O=0;var c=Nt(o.qa);pe(c,"RID","rpc"),pe(c,"SID",o.K),pe(c,"AID",o.T),pe(c,"CI",o.F?"0":"1"),!o.F&&o.ja&&pe(c,"TO",o.ja),pe(c,"TYPE","xmlhttp"),ss(o,c),o.m&&o.o&&ta(c,o.m,o.o),o.L&&(o.g.I=o.L);var d=o.g;o=o.ia,d.L=1,d.v=ni(Nt(c)),d.m=null,d.P=!0,Cc(d,o)}n.Za=function(){this.C!=null&&(this.C=null,oi(this),ra(this),Ze(19))};function li(o){o.C!=null&&(l.clearTimeout(o.C),o.C=null)}function su(o,c){var d=null;if(o.g==c){li(o),sa(o),o.g=null;var p=2}else if(Zo(o.h,c))d=c.D,Mc(o.h,c),p=1;else return;if(o.G!=0){if(c.o)if(p==1){d=c.m?c.m.length:0,c=Date.now()-c.F;var I=o.B;p=Js(),Ye(p,new Sc(p,d)),ai(o)}else nu(o);else if(I=c.s,I==3||I==0&&0<c.X||!(p==1&&Dm(o,c)||p==2&&ra(o)))switch(d&&0<d.length&&(c=o.h,c.i=c.i.concat(d)),I){case 1:Nn(o,5);break;case 4:Nn(o,10);break;case 3:Nn(o,6);break;default:Nn(o,2)}}}function iu(o,c){let d=o.Ta+Math.floor(Math.random()*o.cb);return o.isActive()||(d*=2),d*c}function Nn(o,c){if(o.j.info("Error code "+c),c==2){var d=g(o.fb,o),p=o.Xa;const I=!p;p=new Vn(p||"//www.google.com/images/cleardot.gif"),l.location&&l.location.protocol=="http"||ei(p,"https"),ni(p),I?Sm(p.toString(),d):Rm(p.toString(),d)}else Ze(2);o.G=0,o.l&&o.l.sa(c),ou(o),Zc(o)}n.fb=function(o){o?(this.j.info("Successfully pinged google.com"),Ze(2)):(this.j.info("Failed to ping google.com"),Ze(1))};function ou(o){if(o.G=0,o.ka=[],o.l){const c=Lc(o.h);(c.length!=0||o.i.length!=0)&&(V(o.ka,c),V(o.ka,o.i),o.h.i.length=0,N(o.i),o.i.length=0),o.l.ra()}}function au(o,c,d){var p=d instanceof Vn?Nt(d):new Vn(d);if(p.g!="")c&&(p.g=c+"."+p.g),ti(p,p.s);else{var I=l.location;p=I.protocol,c=c?c+"."+I.hostname:I.hostname,I=+I.port;var R=new Vn(null);p&&ei(R,p),c&&(R.g=c),I&&ti(R,I),d&&(R.l=d),p=R}return d=o.D,c=o.ya,d&&c&&pe(p,d,c),pe(p,"VER",o.la),ss(o,p),p}function lu(o,c,d){if(c&&!o.J)throw Error("Can't create secondary domain capable XhrIo object.");return c=o.Ca&&!o.pa?new Ae(new ri({eb:d})):new Ae(o.pa),c.Ha(o.J),c}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function cu(){}n=cu.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function ci(){}ci.prototype.g=function(o,c){return new st(o,c)};function st(o,c){Be.call(this),this.g=new Yc(c),this.l=o,this.h=c&&c.messageUrlParams||null,o=c&&c.messageHeaders||null,c&&c.clientProtocolHeaderRequired&&(o?o["X-Client-Protocol"]="webchannel":o={"X-Client-Protocol":"webchannel"}),this.g.o=o,o=c&&c.initMessageHeaders||null,c&&c.messageContentType&&(o?o["X-WebChannel-Content-Type"]=c.messageContentType:o={"X-WebChannel-Content-Type":c.messageContentType}),c&&c.va&&(o?o["X-WebChannel-Client-Profile"]=c.va:o={"X-WebChannel-Client-Profile":c.va}),this.g.S=o,(o=c&&c.Sb)&&!z(o)&&(this.g.m=o),this.v=c&&c.supportsCrossDomainXhr||!1,this.u=c&&c.sendRawJson||!1,(c=c&&c.httpSessionIdParam)&&!z(c)&&(this.g.D=c,o=this.h,o!==null&&c in o&&(o=this.h,c in o&&delete o[c])),this.j=new or(this)}k(st,Be),st.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},st.prototype.close=function(){na(this.g)},st.prototype.o=function(o){var c=this.g;if(typeof o=="string"){var d={};d.__data__=o,o=d}else this.u&&(d={},d.__data__=zo(o),o=d);c.i.push(new gm(c.Ya++,o)),c.G==3&&ai(c)},st.prototype.N=function(){this.g.l=null,delete this.j,na(this.g),delete this.g,st.aa.N.call(this)};function uu(o){Go.call(this),o.__headers__&&(this.headers=o.__headers__,this.statusCode=o.__status__,delete o.__headers__,delete o.__status__);var c=o.__sm__;if(c){e:{for(const d in c){o=d;break e}o=void 0}(this.i=o)&&(o=this.i,c=c!==null&&o in c?c[o]:void 0),this.data=c}else this.data=o}k(uu,Go);function hu(){Wo.call(this),this.status=1}k(hu,Wo);function or(o){this.g=o}k(or,cu),or.prototype.ua=function(){Ye(this.g,"a")},or.prototype.ta=function(o){Ye(this.g,new uu(o))},or.prototype.sa=function(o){Ye(this.g,new hu)},or.prototype.ra=function(){Ye(this.g,"b")},ci.prototype.createWebChannel=ci.prototype.g,st.prototype.send=st.prototype.o,st.prototype.open=st.prototype.m,st.prototype.close=st.prototype.close,Ld=function(){return new ci},Md=function(){return Js()},Od=Pn,Ba={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},Xs.NO_ERROR=0,Xs.TIMEOUT=8,Xs.HTTP_ERROR=6,bi=Xs,Rc.COMPLETE="complete",xd=Rc,Tc.EventType=Wr,Wr.OPEN="a",Wr.CLOSE="b",Wr.ERROR="c",Wr.MESSAGE="d",Be.prototype.listen=Be.prototype.K,cs=Tc,Ae.prototype.listenOnce=Ae.prototype.L,Ae.prototype.getLastError=Ae.prototype.Ka,Ae.prototype.getLastErrorCode=Ae.prototype.Ba,Ae.prototype.getStatus=Ae.prototype.Z,Ae.prototype.getResponseJson=Ae.prototype.Oa,Ae.prototype.getResponseText=Ae.prototype.oa,Ae.prototype.send=Ae.prototype.ea,Ae.prototype.setWithCredentials=Ae.prototype.Ha,Dd=Ae}).apply(typeof pi<"u"?pi:typeof self<"u"?self:typeof window<"u"?window:{});const Nu="@firebase/firestore",Du="4.8.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ke{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}Ke.UNAUTHENTICATED=new Ke(null),Ke.GOOGLE_CREDENTIALS=new Ke("google-credentials-uid"),Ke.FIRST_PARTY=new Ke("first-party-uid"),Ke.MOCK_USER=new Ke("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ur="11.10.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qn=new wl("@firebase/firestore");function hr(){return Qn.logLevel}function L(n,...e){if(Qn.logLevel<=Y.DEBUG){const t=e.map(bl);Qn.debug(`Firestore (${Ur}): ${n}`,...t)}}function jt(n,...e){if(Qn.logLevel<=Y.ERROR){const t=e.map(bl);Qn.error(`Firestore (${Ur}): ${n}`,...t)}}function _n(n,...e){if(Qn.logLevel<=Y.WARN){const t=e.map(bl);Qn.warn(`Firestore (${Ur}): ${n}`,...t)}}function bl(n){if(typeof n=="string")return n;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(t){return JSON.stringify(t)}(n)}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function j(n,e,t){let r="Unexpected state";typeof e=="string"?r=e:t=e,Fd(n,r,t)}function Fd(n,e,t){let r=`FIRESTORE (${Ur}) INTERNAL ASSERTION FAILED: ${e} (ID: ${n.toString(16)})`;if(t!==void 0)try{r+=" CONTEXT: "+JSON.stringify(t)}catch{r+=" CONTEXT: "+t}throw jt(r),new Error(r)}function ie(n,e,t,r){let s="Unexpected state";typeof t=="string"?s=t:r=t,n||Fd(e,s,r)}function Q(n,e){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const P={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class M extends Wt{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class un{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ud{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class ry{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(Ke.UNAUTHENTICATED))}shutdown(){}}class sy{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class iy{constructor(e){this.t=e,this.currentUser=Ke.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){ie(this.o===void 0,42304);let r=this.i;const s=u=>this.i!==r?(r=this.i,t(u)):Promise.resolve();let i=new un;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new un,e.enqueueRetryable(()=>s(this.currentUser))};const a=()=>{const u=i;e.enqueueRetryable(async()=>{await u.promise,await s(this.currentUser)})},l=u=>{L("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit(u=>l(u)),setTimeout(()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?l(u):(L("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new un)}},0),a()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(r=>this.i!==e?(L("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(ie(typeof r.accessToken=="string",31837,{l:r}),new Ud(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return ie(e===null||typeof e=="string",2055,{h:e}),new Ke(e)}}class oy{constructor(e,t,r){this.P=e,this.T=t,this.I=r,this.type="FirstParty",this.user=Ke.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const e=this.R();return e&&this.A.set("Authorization",e),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class ay{constructor(e,t,r){this.P=e,this.T=t,this.I=r}getToken(){return Promise.resolve(new oy(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable(()=>t(Ke.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class xu{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class ly{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,ft(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){ie(this.o===void 0,3512);const r=i=>{i.error!=null&&L("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const a=i.token!==this.m;return this.m=i.token,L("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?t(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable(()=>r(i))};const s=i=>{L("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(i=>s(i)),setTimeout(()=>{if(!this.appCheck){const i=this.V.getImmediate({optional:!0});i?s(i):L("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new xu(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(ie(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new xu(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cy(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $d(){return new TextEncoder}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Al{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const s=cy(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<t&&(r+=e.charAt(s[i]%62))}return r}}function J(n,e){return n<e?-1:n>e?1:0}function qa(n,e){let t=0;for(;t<n.length&&t<e.length;){const r=n.codePointAt(t),s=e.codePointAt(t);if(r!==s){if(r<128&&s<128)return J(r,s);{const i=$d(),a=uy(i.encode(Ou(n,t)),i.encode(Ou(e,t)));return a!==0?a:J(r,s)}}t+=r>65535?2:1}return J(n.length,e.length)}function Ou(n,e){return n.codePointAt(e)>65535?n.substring(e,e+2):n.substring(e,e+1)}function uy(n,e){for(let t=0;t<n.length&&t<e.length;++t)if(n[t]!==e[t])return J(n[t],e[t]);return J(n.length,e.length)}function kr(n,e,t){return n.length===e.length&&n.every((r,s)=>t(r,e[s]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mu="__name__";class wt{constructor(e,t,r){t===void 0?t=0:t>e.length&&j(637,{offset:t,range:e.length}),r===void 0?r=e.length-t:r>e.length-t&&j(1746,{length:r,range:e.length-t}),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return wt.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof wt?e.forEach(r=>{t.push(r)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let s=0;s<r;s++){const i=wt.compareSegments(e.get(s),t.get(s));if(i!==0)return i}return J(e.length,t.length)}static compareSegments(e,t){const r=wt.isNumericId(e),s=wt.isNumericId(t);return r&&!s?-1:!r&&s?1:r&&s?wt.extractNumericId(e).compare(wt.extractNumericId(t)):qa(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return cn.fromString(e.substring(4,e.length-2))}}class de extends wt{construct(e,t,r){return new de(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new M(P.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter(s=>s.length>0))}return new de(t)}static emptyPath(){return new de([])}}const hy=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Le extends wt{construct(e,t,r){return new Le(e,t,r)}static isValidIdentifier(e){return hy.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Le.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Mu}static keyField(){return new Le([Mu])}static fromServerFormat(e){const t=[];let r="",s=0;const i=()=>{if(r.length===0)throw new M(P.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let a=!1;for(;s<e.length;){const l=e[s];if(l==="\\"){if(s+1===e.length)throw new M(P.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const u=e[s+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new M(P.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=u,s+=2}else l==="`"?(a=!a,s++):l!=="."||a?(r+=l,s++):(i(),s++)}if(i(),a)throw new M(P.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new Le(t)}static emptyPath(){return new Le([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ${constructor(e){this.path=e}static fromPath(e){return new $(de.fromString(e))}static fromName(e){return new $(de.fromString(e).popFirst(5))}static empty(){return new $(de.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&de.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return de.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new $(new de(e.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bd(n,e,t){if(!t)throw new M(P.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function dy(n,e,t,r){if(e===!0&&r===!0)throw new M(P.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function Lu(n){if(!$.isDocumentKey(n))throw new M(P.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function Fu(n){if($.isDocumentKey(n))throw new M(P.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function qd(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function ho(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":j(12329,{type:typeof n})}function mt(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new M(P.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=ho(n);throw new M(P.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ce(n,e){const t={typeString:n};return e&&(t.value=e),t}function Fs(n,e){if(!qd(n))throw new M(P.INVALID_ARGUMENT,"JSON must be an object");let t;for(const r in e)if(e[r]){const s=e[r].typeString,i="value"in e[r]?{value:e[r].value}:void 0;if(!(r in n)){t=`JSON missing required field: '${r}'`;break}const a=n[r];if(s&&typeof a!==s){t=`JSON field '${r}' must be a ${s}.`;break}if(i!==void 0&&a!==i.value){t=`Expected '${r}' field to equal '${i.value}'`;break}}if(t)throw new M(P.INVALID_ARGUMENT,t);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Uu=-62135596800,$u=1e6;class ge{static now(){return ge.fromMillis(Date.now())}static fromDate(e){return ge.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor((e-1e3*t)*$u);return new ge(t,r)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new M(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new M(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<Uu)throw new M(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new M(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/$u}_compareTo(e){return this.seconds===e.seconds?J(this.nanoseconds,e.nanoseconds):J(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:ge._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(Fs(e,ge._jsonSchema))return new ge(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-Uu;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}ge._jsonSchemaVersion="firestore/timestamp/1.0",ge._jsonSchema={type:Ce("string",ge._jsonSchemaVersion),seconds:Ce("number"),nanoseconds:Ce("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class W{static fromTimestamp(e){return new W(e)}static min(){return new W(new ge(0,0))}static max(){return new W(new ge(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bs=-1;function fy(n,e){const t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,s=W.fromTimestamp(r===1e9?new ge(t+1,0):new ge(t,r));return new yn(s,$.empty(),e)}function py(n){return new yn(n.readTime,n.key,bs)}class yn{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new yn(W.min(),$.empty(),bs)}static max(){return new yn(W.max(),$.empty(),bs)}}function my(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=$.comparator(n.documentKey,e.documentKey),t!==0?t:J(n.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gy="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class _y{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function $r(n){if(n.code!==P.FAILED_PRECONDITION||n.message!==gy)throw n;L("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class C{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&j(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new C((r,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(r,s)},this.catchCallback=i=>{this.wrapFailure(t,i).next(r,s)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof C?t:C.resolve(t)}catch(t){return C.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):C.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):C.reject(t)}static resolve(e){return new C((t,r)=>{t(e)})}static reject(e){return new C((t,r)=>{r(e)})}static waitFor(e){return new C((t,r)=>{let s=0,i=0,a=!1;e.forEach(l=>{++s,l.next(()=>{++i,a&&i===s&&t()},u=>r(u))}),a=!0,i===s&&t()})}static or(e){let t=C.resolve(!1);for(const r of e)t=t.next(s=>s?C.resolve(s):r());return t}static forEach(e,t){const r=[];return e.forEach((s,i)=>{r.push(t.call(this,s,i))}),this.waitFor(r)}static mapArray(e,t){return new C((r,s)=>{const i=e.length,a=new Array(i);let l=0;for(let u=0;u<i;u++){const h=u;t(e[h]).next(f=>{a[h]=f,++l,l===i&&r(a)},f=>s(f))}})}static doWhile(e,t){return new C((r,s)=>{const i=()=>{e()===!0?t().next(()=>{i()},s):r()};i()})}}function yy(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function Br(n){return n.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fo{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this._e(r),this.ae=r=>t.writeSequenceNumber(r))}_e(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ae&&this.ae(e),e}}fo.ue=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sl=-1;function po(n){return n==null}function ji(n){return n===0&&1/n==-1/0}function vy(n){return typeof n=="number"&&Number.isInteger(n)&&!ji(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jd="";function Ey(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=Bu(e)),e=wy(n.get(t),e);return Bu(e)}function wy(n,e){let t=e;const r=n.length;for(let s=0;s<r;s++){const i=n.charAt(s);switch(i){case"\0":t+="";break;case jd:t+="";break;default:t+=i}}return t}function Bu(n){return n+jd+""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qu(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function An(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function zd(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class be{constructor(e,t){this.comparator=e,this.root=t||Me.EMPTY}insert(e,t){return new be(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,Me.BLACK,null,null))}remove(e){return new be(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Me.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(e,r.key);if(s===0)return t+r.left.size;s<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,r)=>(e(t,r),!1))}toString(){const e=[];return this.inorderTraversal((t,r)=>(e.push(`${t}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new mi(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new mi(this.root,e,this.comparator,!1)}getReverseIterator(){return new mi(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new mi(this.root,e,this.comparator,!0)}}class mi{constructor(e,t,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?r(e.key,t):1,t&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class Me{constructor(e,t,r,s,i){this.key=e,this.value=t,this.color=r??Me.RED,this.left=s??Me.EMPTY,this.right=i??Me.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,s,i){return new Me(e??this.key,t??this.value,r??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let s=this;const i=r(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,t,r),null):i===0?s.copy(null,t,null,null,null):s.copy(null,null,null,null,s.right.insert(e,t,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return Me.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,s=this;if(t(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),t(e,s.key)===0){if(s.right.isEmpty())return Me.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,Me.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,Me.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw j(43730,{key:this.key,value:this.value});if(this.right.isRed())throw j(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw j(27949);return e+(this.isRed()?0:1)}}Me.EMPTY=null,Me.RED=!0,Me.BLACK=!1;Me.EMPTY=new class{constructor(){this.size=0}get key(){throw j(57766)}get value(){throw j(16141)}get color(){throw j(16727)}get left(){throw j(29726)}get right(){throw j(36894)}copy(e,t,r,s,i){return this}insert(e,t,r){return new Me(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ve{constructor(e){this.comparator=e,this.data=new be(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,r)=>(e(t),!1))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,e[1])>=0)return;t(s.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new ju(this.data.getIterator())}getIteratorFrom(e){return new ju(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(r=>{t=t.add(r)}),t}isEqual(e){if(!(e instanceof Ve)||this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new Ve(this.comparator);return t.data=e,t}}class ju{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ot{constructor(e){this.fields=e,e.sort(Le.comparator)}static empty(){return new ot([])}unionWith(e){let t=new Ve(Le.comparator);for(const r of this.fields)t=t.add(r);for(const r of e)t=t.add(r);return new ot(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return kr(this.fields,e.fields,(t,r)=>t.isEqual(r))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hd extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $e{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new Hd("Invalid base64 string: "+i):i}}(e);return new $e(t)}static fromUint8Array(e){const t=function(s){let i="";for(let a=0;a<s.length;++a)i+=String.fromCharCode(s[a]);return i}(e);return new $e(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const r=new Uint8Array(t.length);for(let s=0;s<t.length;s++)r[s]=t.charCodeAt(s);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return J(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}$e.EMPTY_BYTE_STRING=new $e("");const Ty=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function vn(n){if(ie(!!n,39018),typeof n=="string"){let e=0;const t=Ty.exec(n);if(ie(!!t,46558,{timestamp:n}),t[1]){let s=t[1];s=(s+"000000000").substr(0,9),e=Number(s)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:Re(n.seconds),nanos:Re(n.nanos)}}function Re(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function En(n){return typeof n=="string"?$e.fromBase64String(n):$e.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gd="server_timestamp",Wd="__type__",Kd="__previous_value__",Qd="__local_write_time__";function Rl(n){var e,t;return((t=(((e=n==null?void 0:n.mapValue)===null||e===void 0?void 0:e.fields)||{})[Wd])===null||t===void 0?void 0:t.stringValue)===Gd}function mo(n){const e=n.mapValue.fields[Kd];return Rl(e)?mo(e):e}function As(n){const e=vn(n.mapValue.fields[Qd].timestampValue);return new ge(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Iy{constructor(e,t,r,s,i,a,l,u,h,f){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=a,this.autoDetectLongPolling=l,this.longPollingOptions=u,this.useFetchStreams=h,this.isUsingEmulator=f}}const zi="(default)";class Ss{constructor(e,t){this.projectId=e,this.database=t||zi}static empty(){return new Ss("","")}get isDefaultDatabase(){return this.database===zi}isEqual(e){return e instanceof Ss&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jd="__type__",by="__max__",gi={mapValue:{}},Xd="__vector__",Hi="value";function wn(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?Rl(n)?4:Sy(n)?9007199254740991:Ay(n)?10:11:j(28295,{value:n})}function Ct(n,e){if(n===e)return!0;const t=wn(n);if(t!==wn(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return As(n).isEqual(As(e));case 3:return function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const a=vn(s.timestampValue),l=vn(i.timestampValue);return a.seconds===l.seconds&&a.nanos===l.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(s,i){return En(s.bytesValue).isEqual(En(i.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(s,i){return Re(s.geoPointValue.latitude)===Re(i.geoPointValue.latitude)&&Re(s.geoPointValue.longitude)===Re(i.geoPointValue.longitude)}(n,e);case 2:return function(s,i){if("integerValue"in s&&"integerValue"in i)return Re(s.integerValue)===Re(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const a=Re(s.doubleValue),l=Re(i.doubleValue);return a===l?ji(a)===ji(l):isNaN(a)&&isNaN(l)}return!1}(n,e);case 9:return kr(n.arrayValue.values||[],e.arrayValue.values||[],Ct);case 10:case 11:return function(s,i){const a=s.mapValue.fields||{},l=i.mapValue.fields||{};if(qu(a)!==qu(l))return!1;for(const u in a)if(a.hasOwnProperty(u)&&(l[u]===void 0||!Ct(a[u],l[u])))return!1;return!0}(n,e);default:return j(52216,{left:n})}}function Rs(n,e){return(n.values||[]).find(t=>Ct(t,e))!==void 0}function Pr(n,e){if(n===e)return 0;const t=wn(n),r=wn(e);if(t!==r)return J(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return J(n.booleanValue,e.booleanValue);case 2:return function(i,a){const l=Re(i.integerValue||i.doubleValue),u=Re(a.integerValue||a.doubleValue);return l<u?-1:l>u?1:l===u?0:isNaN(l)?isNaN(u)?0:-1:1}(n,e);case 3:return zu(n.timestampValue,e.timestampValue);case 4:return zu(As(n),As(e));case 5:return qa(n.stringValue,e.stringValue);case 6:return function(i,a){const l=En(i),u=En(a);return l.compareTo(u)}(n.bytesValue,e.bytesValue);case 7:return function(i,a){const l=i.split("/"),u=a.split("/");for(let h=0;h<l.length&&h<u.length;h++){const f=J(l[h],u[h]);if(f!==0)return f}return J(l.length,u.length)}(n.referenceValue,e.referenceValue);case 8:return function(i,a){const l=J(Re(i.latitude),Re(a.latitude));return l!==0?l:J(Re(i.longitude),Re(a.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return Hu(n.arrayValue,e.arrayValue);case 10:return function(i,a){var l,u,h,f;const m=i.fields||{},g=a.fields||{},S=(l=m[Hi])===null||l===void 0?void 0:l.arrayValue,k=(u=g[Hi])===null||u===void 0?void 0:u.arrayValue,N=J(((h=S==null?void 0:S.values)===null||h===void 0?void 0:h.length)||0,((f=k==null?void 0:k.values)===null||f===void 0?void 0:f.length)||0);return N!==0?N:Hu(S,k)}(n.mapValue,e.mapValue);case 11:return function(i,a){if(i===gi.mapValue&&a===gi.mapValue)return 0;if(i===gi.mapValue)return 1;if(a===gi.mapValue)return-1;const l=i.fields||{},u=Object.keys(l),h=a.fields||{},f=Object.keys(h);u.sort(),f.sort();for(let m=0;m<u.length&&m<f.length;++m){const g=qa(u[m],f[m]);if(g!==0)return g;const S=Pr(l[u[m]],h[f[m]]);if(S!==0)return S}return J(u.length,f.length)}(n.mapValue,e.mapValue);default:throw j(23264,{le:t})}}function zu(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return J(n,e);const t=vn(n),r=vn(e),s=J(t.seconds,r.seconds);return s!==0?s:J(t.nanos,r.nanos)}function Hu(n,e){const t=n.values||[],r=e.values||[];for(let s=0;s<t.length&&s<r.length;++s){const i=Pr(t[s],r[s]);if(i)return i}return J(t.length,r.length)}function Cr(n){return ja(n)}function ja(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(t){const r=vn(t);return`time(${r.seconds},${r.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(t){return En(t).toBase64()}(n.bytesValue):"referenceValue"in n?function(t){return $.fromName(t).toString()}(n.referenceValue):"geoPointValue"in n?function(t){return`geo(${t.latitude},${t.longitude})`}(n.geoPointValue):"arrayValue"in n?function(t){let r="[",s=!0;for(const i of t.values||[])s?s=!1:r+=",",r+=ja(i);return r+"]"}(n.arrayValue):"mapValue"in n?function(t){const r=Object.keys(t.fields||{}).sort();let s="{",i=!0;for(const a of r)i?i=!1:s+=",",s+=`${a}:${ja(t.fields[a])}`;return s+"}"}(n.mapValue):j(61005,{value:n})}function Ai(n){switch(wn(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=mo(n);return e?16+Ai(e):16;case 5:return 2*n.stringValue.length;case 6:return En(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return function(r){return(r.values||[]).reduce((s,i)=>s+Ai(i),0)}(n.arrayValue);case 10:case 11:return function(r){let s=0;return An(r.fields,(i,a)=>{s+=i.length+Ai(a)}),s}(n.mapValue);default:throw j(13486,{value:n})}}function Gu(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function za(n){return!!n&&"integerValue"in n}function kl(n){return!!n&&"arrayValue"in n}function Wu(n){return!!n&&"nullValue"in n}function Ku(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function Si(n){return!!n&&"mapValue"in n}function Ay(n){var e,t;return((t=(((e=n==null?void 0:n.mapValue)===null||e===void 0?void 0:e.fields)||{})[Jd])===null||t===void 0?void 0:t.stringValue)===Xd}function ms(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){const e={mapValue:{fields:{}}};return An(n.mapValue.fields,(t,r)=>e.mapValue.fields[t]=ms(r)),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=ms(n.arrayValue.values[t]);return e}return Object.assign({},n)}function Sy(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===by}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rt{constructor(e){this.value=e}static empty(){return new rt({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!Si(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=ms(t)}setAll(e){let t=Le.emptyPath(),r={},s=[];e.forEach((a,l)=>{if(!t.isImmediateParentOf(l)){const u=this.getFieldsMap(t);this.applyChanges(u,r,s),r={},s=[],t=l.popLast()}a?r[l.lastSegment()]=ms(a):s.push(l.lastSegment())});const i=this.getFieldsMap(t);this.applyChanges(i,r,s)}delete(e){const t=this.field(e.popLast());Si(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return Ct(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let s=t.mapValue.fields[e.get(r)];Si(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=s),t=s}return t.mapValue.fields}applyChanges(e,t,r){An(t,(s,i)=>e[s]=i);for(const s of r)delete e[s]}clone(){return new rt(ms(this.value))}}function Yd(n){const e=[];return An(n.fields,(t,r)=>{const s=new Le([t]);if(Si(r)){const i=Yd(r.mapValue).fields;if(i.length===0)e.push(s);else for(const a of i)e.push(s.child(a))}else e.push(s)}),new ot(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qe{constructor(e,t,r,s,i,a,l){this.key=e,this.documentType=t,this.version=r,this.readTime=s,this.createTime=i,this.data=a,this.documentState=l}static newInvalidDocument(e){return new Qe(e,0,W.min(),W.min(),W.min(),rt.empty(),0)}static newFoundDocument(e,t,r,s){return new Qe(e,1,t,W.min(),r,s,0)}static newNoDocument(e,t){return new Qe(e,2,t,W.min(),W.min(),rt.empty(),0)}static newUnknownDocument(e,t){return new Qe(e,3,t,W.min(),W.min(),rt.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(W.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=rt.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=rt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=W.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof Qe&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new Qe(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gi{constructor(e,t){this.position=e,this.inclusive=t}}function Qu(n,e,t){let r=0;for(let s=0;s<n.position.length;s++){const i=e[s],a=n.position[s];if(i.field.isKeyField()?r=$.comparator($.fromName(a.referenceValue),t.key):r=Pr(a,t.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function Ju(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!Ct(n.position[t],e.position[t]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ks{constructor(e,t="asc"){this.field=e,this.dir=t}}function Ry(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zd{}class Pe extends Zd{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new Py(e,t,r):t==="array-contains"?new Ny(e,r):t==="in"?new Dy(e,r):t==="not-in"?new xy(e,r):t==="array-contains-any"?new Oy(e,r):new Pe(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new Cy(e,r):new Vy(e,r)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(Pr(t,this.value)):t!==null&&wn(this.value)===wn(t)&&this.matchesComparison(Pr(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return j(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class yt extends Zd{constructor(e,t){super(),this.filters=e,this.op=t,this.he=null}static create(e,t){return new yt(e,t)}matches(e){return ef(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.he!==null||(this.he=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.he}getFilters(){return Object.assign([],this.filters)}}function ef(n){return n.op==="and"}function tf(n){return ky(n)&&ef(n)}function ky(n){for(const e of n.filters)if(e instanceof yt)return!1;return!0}function Ha(n){if(n instanceof Pe)return n.field.canonicalString()+n.op.toString()+Cr(n.value);if(tf(n))return n.filters.map(e=>Ha(e)).join(",");{const e=n.filters.map(t=>Ha(t)).join(",");return`${n.op}(${e})`}}function nf(n,e){return n instanceof Pe?function(r,s){return s instanceof Pe&&r.op===s.op&&r.field.isEqual(s.field)&&Ct(r.value,s.value)}(n,e):n instanceof yt?function(r,s){return s instanceof yt&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce((i,a,l)=>i&&nf(a,s.filters[l]),!0):!1}(n,e):void j(19439)}function rf(n){return n instanceof Pe?function(t){return`${t.field.canonicalString()} ${t.op} ${Cr(t.value)}`}(n):n instanceof yt?function(t){return t.op.toString()+" {"+t.getFilters().map(rf).join(" ,")+"}"}(n):"Filter"}class Py extends Pe{constructor(e,t,r){super(e,t,r),this.key=$.fromName(r.referenceValue)}matches(e){const t=$.comparator(e.key,this.key);return this.matchesComparison(t)}}class Cy extends Pe{constructor(e,t){super(e,"in",t),this.keys=sf("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class Vy extends Pe{constructor(e,t){super(e,"not-in",t),this.keys=sf("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function sf(n,e){var t;return(((t=e.arrayValue)===null||t===void 0?void 0:t.values)||[]).map(r=>$.fromName(r.referenceValue))}class Ny extends Pe{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return kl(t)&&Rs(t.arrayValue,this.value)}}class Dy extends Pe{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&Rs(this.value.arrayValue,t)}}class xy extends Pe{constructor(e,t){super(e,"not-in",t)}matches(e){if(Rs(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!Rs(this.value.arrayValue,t)}}class Oy extends Pe{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!kl(t)||!t.arrayValue.values)&&t.arrayValue.values.some(r=>Rs(this.value.arrayValue,r))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class My{constructor(e,t=null,r=[],s=[],i=null,a=null,l=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=a,this.endAt=l,this.Pe=null}}function Xu(n,e=null,t=[],r=[],s=null,i=null,a=null){return new My(n,e,t,r,s,i,a)}function Pl(n){const e=Q(n);if(e.Pe===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(r=>Ha(r)).join(","),t+="|ob:",t+=e.orderBy.map(r=>function(i){return i.field.canonicalString()+i.dir}(r)).join(","),po(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(r=>Cr(r)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(r=>Cr(r)).join(",")),e.Pe=t}return e.Pe}function Cl(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!Ry(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!nf(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!Ju(n.startAt,e.startAt)&&Ju(n.endAt,e.endAt)}function Ga(n){return $.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qr{constructor(e,t=null,r=[],s=[],i=null,a="F",l=null,u=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=a,this.startAt=l,this.endAt=u,this.Te=null,this.Ie=null,this.de=null,this.startAt,this.endAt}}function Ly(n,e,t,r,s,i,a,l){return new qr(n,e,t,r,s,i,a,l)}function go(n){return new qr(n)}function Yu(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function of(n){return n.collectionGroup!==null}function gs(n){const e=Q(n);if(e.Te===null){e.Te=[];const t=new Set;for(const i of e.explicitOrderBy)e.Te.push(i),t.add(i.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(a){let l=new Ve(Le.comparator);return a.filters.forEach(u=>{u.getFlattenedFilters().forEach(h=>{h.isInequality()&&(l=l.add(h.field))})}),l})(e).forEach(i=>{t.has(i.canonicalString())||i.isKeyField()||e.Te.push(new ks(i,r))}),t.has(Le.keyField().canonicalString())||e.Te.push(new ks(Le.keyField(),r))}return e.Te}function bt(n){const e=Q(n);return e.Ie||(e.Ie=Fy(e,gs(n))),e.Ie}function Fy(n,e){if(n.limitType==="F")return Xu(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(s=>{const i=s.dir==="desc"?"asc":"desc";return new ks(s.field,i)});const t=n.endAt?new Gi(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new Gi(n.startAt.position,n.startAt.inclusive):null;return Xu(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function Wa(n,e){const t=n.filters.concat([e]);return new qr(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function Ka(n,e,t){return new qr(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function _o(n,e){return Cl(bt(n),bt(e))&&n.limitType===e.limitType}function af(n){return`${Pl(bt(n))}|lt:${n.limitType}`}function dr(n){return`Query(target=${function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map(s=>rf(s)).join(", ")}]`),po(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map(s=>function(a){return`${a.field.canonicalString()} (${a.dir})`}(s)).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map(s=>Cr(s)).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map(s=>Cr(s)).join(",")),`Target(${r})`}(bt(n))}; limitType=${n.limitType})`}function yo(n,e){return e.isFoundDocument()&&function(r,s){const i=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(i):$.isDocumentKey(r.path)?r.path.isEqual(i):r.path.isImmediateParentOf(i)}(n,e)&&function(r,s){for(const i of gs(r))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0}(n,e)&&function(r,s){for(const i of r.filters)if(!i.matches(s))return!1;return!0}(n,e)&&function(r,s){return!(r.startAt&&!function(a,l,u){const h=Qu(a,l,u);return a.inclusive?h<=0:h<0}(r.startAt,gs(r),s)||r.endAt&&!function(a,l,u){const h=Qu(a,l,u);return a.inclusive?h>=0:h>0}(r.endAt,gs(r),s))}(n,e)}function Uy(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function lf(n){return(e,t)=>{let r=!1;for(const s of gs(n)){const i=$y(s,e,t);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function $y(n,e,t){const r=n.field.isKeyField()?$.comparator(e.key,t.key):function(i,a,l){const u=a.data.field(i),h=l.data.field(i);return u!==null&&h!==null?Pr(u,h):j(42886)}(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return j(19790,{direction:n.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zn{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(const[s,i]of r)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,t){const r=this.mapKeyFn(e),s=this.inner[r];if(s===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,t]);s.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return r.length===1?delete this.inner[t]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(e){An(this.inner,(t,r)=>{for(const[s,i]of r)e(s,i)})}isEmpty(){return zd(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const By=new be($.comparator);function zt(){return By}const cf=new be($.comparator);function us(...n){let e=cf;for(const t of n)e=e.insert(t.key,t);return e}function uf(n){let e=cf;return n.forEach((t,r)=>e=e.insert(t,r.overlayedDocument)),e}function $n(){return _s()}function hf(){return _s()}function _s(){return new Zn(n=>n.toString(),(n,e)=>n.isEqual(e))}const qy=new be($.comparator),jy=new Ve($.comparator);function Z(...n){let e=jy;for(const t of n)e=e.add(t);return e}const zy=new Ve(J);function Hy(){return zy}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vl(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:ji(e)?"-0":e}}function df(n){return{integerValue:""+n}}function Gy(n,e){return vy(e)?df(e):Vl(n,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vo{constructor(){this._=void 0}}function Wy(n,e,t){return n instanceof Ps?function(s,i){const a={fields:{[Wd]:{stringValue:Gd},[Qd]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&Rl(i)&&(i=mo(i)),i&&(a.fields[Kd]=i),{mapValue:a}}(t,e):n instanceof Cs?pf(n,e):n instanceof Vs?mf(n,e):function(s,i){const a=ff(s,i),l=Zu(a)+Zu(s.Ee);return za(a)&&za(s.Ee)?df(l):Vl(s.serializer,l)}(n,e)}function Ky(n,e,t){return n instanceof Cs?pf(n,e):n instanceof Vs?mf(n,e):t}function ff(n,e){return n instanceof Wi?function(r){return za(r)||function(i){return!!i&&"doubleValue"in i}(r)}(e)?e:{integerValue:0}:null}class Ps extends vo{}class Cs extends vo{constructor(e){super(),this.elements=e}}function pf(n,e){const t=gf(e);for(const r of n.elements)t.some(s=>Ct(s,r))||t.push(r);return{arrayValue:{values:t}}}class Vs extends vo{constructor(e){super(),this.elements=e}}function mf(n,e){let t=gf(e);for(const r of n.elements)t=t.filter(s=>!Ct(s,r));return{arrayValue:{values:t}}}class Wi extends vo{constructor(e,t){super(),this.serializer=e,this.Ee=t}}function Zu(n){return Re(n.integerValue||n.doubleValue)}function gf(n){return kl(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qy{constructor(e,t){this.field=e,this.transform=t}}function Jy(n,e){return n.field.isEqual(e.field)&&function(r,s){return r instanceof Cs&&s instanceof Cs||r instanceof Vs&&s instanceof Vs?kr(r.elements,s.elements,Ct):r instanceof Wi&&s instanceof Wi?Ct(r.Ee,s.Ee):r instanceof Ps&&s instanceof Ps}(n.transform,e.transform)}class Xy{constructor(e,t){this.version=e,this.transformResults=t}}class gt{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new gt}static exists(e){return new gt(void 0,e)}static updateTime(e){return new gt(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Ri(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class Eo{}function _f(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new vf(n.key,gt.none()):new Us(n.key,n.data,gt.none());{const t=n.data,r=rt.empty();let s=new Ve(Le.comparator);for(let i of e.fields)if(!s.has(i)){let a=t.field(i);a===null&&i.length>1&&(i=i.popLast(),a=t.field(i)),a===null?r.delete(i):r.set(i,a),s=s.add(i)}return new Sn(n.key,r,new ot(s.toArray()),gt.none())}}function Yy(n,e,t){n instanceof Us?function(s,i,a){const l=s.value.clone(),u=th(s.fieldTransforms,i,a.transformResults);l.setAll(u),i.convertToFoundDocument(a.version,l).setHasCommittedMutations()}(n,e,t):n instanceof Sn?function(s,i,a){if(!Ri(s.precondition,i))return void i.convertToUnknownDocument(a.version);const l=th(s.fieldTransforms,i,a.transformResults),u=i.data;u.setAll(yf(s)),u.setAll(l),i.convertToFoundDocument(a.version,u).setHasCommittedMutations()}(n,e,t):function(s,i,a){i.convertToNoDocument(a.version).setHasCommittedMutations()}(0,e,t)}function ys(n,e,t,r){return n instanceof Us?function(i,a,l,u){if(!Ri(i.precondition,a))return l;const h=i.value.clone(),f=nh(i.fieldTransforms,u,a);return h.setAll(f),a.convertToFoundDocument(a.version,h).setHasLocalMutations(),null}(n,e,t,r):n instanceof Sn?function(i,a,l,u){if(!Ri(i.precondition,a))return l;const h=nh(i.fieldTransforms,u,a),f=a.data;return f.setAll(yf(i)),f.setAll(h),a.convertToFoundDocument(a.version,f).setHasLocalMutations(),l===null?null:l.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map(m=>m.field))}(n,e,t,r):function(i,a,l){return Ri(i.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):l}(n,e,t)}function Zy(n,e){let t=null;for(const r of n.fieldTransforms){const s=e.data.field(r.field),i=ff(r.transform,s||null);i!=null&&(t===null&&(t=rt.empty()),t.set(r.field,i))}return t||null}function eh(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&kr(r,s,(i,a)=>Jy(i,a))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class Us extends Eo{constructor(e,t,r,s=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class Sn extends Eo{constructor(e,t,r,s,i=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function yf(n){const e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){const r=n.data.field(t);e.set(t,r)}}),e}function th(n,e,t){const r=new Map;ie(n.length===t.length,32656,{Ae:t.length,Re:n.length});for(let s=0;s<t.length;s++){const i=n[s],a=i.transform,l=e.data.field(i.field);r.set(i.field,Ky(a,l,t[s]))}return r}function nh(n,e,t){const r=new Map;for(const s of n){const i=s.transform,a=t.data.field(s.field);r.set(s.field,Wy(i,a,e))}return r}class vf extends Eo{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class ev extends Eo{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tv{constructor(e,t,r,s){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&Yy(i,e,r[s])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=ys(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=ys(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=hf();return this.mutations.forEach(s=>{const i=e.get(s.key),a=i.overlayedDocument;let l=this.applyToLocalView(a,i.mutatedFields);l=t.has(s.key)?null:l;const u=_f(a,l);u!==null&&r.set(s.key,u),a.isValidDocument()||a.convertToNoDocument(W.min())}),r}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),Z())}isEqual(e){return this.batchId===e.batchId&&kr(this.mutations,e.mutations,(t,r)=>eh(t,r))&&kr(this.baseMutations,e.baseMutations,(t,r)=>eh(t,r))}}class Nl{constructor(e,t,r,s){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=s}static from(e,t,r){ie(e.mutations.length===r.length,58842,{Ve:e.mutations.length,me:r.length});let s=function(){return qy}();const i=e.mutations;for(let a=0;a<i.length;a++)s=s.insert(i[a].key,r[a].version);return new Nl(e,t,r,s)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nv{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rv{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ke,te;function sv(n){switch(n){case P.OK:return j(64938);case P.CANCELLED:case P.UNKNOWN:case P.DEADLINE_EXCEEDED:case P.RESOURCE_EXHAUSTED:case P.INTERNAL:case P.UNAVAILABLE:case P.UNAUTHENTICATED:return!1;case P.INVALID_ARGUMENT:case P.NOT_FOUND:case P.ALREADY_EXISTS:case P.PERMISSION_DENIED:case P.FAILED_PRECONDITION:case P.ABORTED:case P.OUT_OF_RANGE:case P.UNIMPLEMENTED:case P.DATA_LOSS:return!0;default:return j(15467,{code:n})}}function Ef(n){if(n===void 0)return jt("GRPC error has no .code"),P.UNKNOWN;switch(n){case ke.OK:return P.OK;case ke.CANCELLED:return P.CANCELLED;case ke.UNKNOWN:return P.UNKNOWN;case ke.DEADLINE_EXCEEDED:return P.DEADLINE_EXCEEDED;case ke.RESOURCE_EXHAUSTED:return P.RESOURCE_EXHAUSTED;case ke.INTERNAL:return P.INTERNAL;case ke.UNAVAILABLE:return P.UNAVAILABLE;case ke.UNAUTHENTICATED:return P.UNAUTHENTICATED;case ke.INVALID_ARGUMENT:return P.INVALID_ARGUMENT;case ke.NOT_FOUND:return P.NOT_FOUND;case ke.ALREADY_EXISTS:return P.ALREADY_EXISTS;case ke.PERMISSION_DENIED:return P.PERMISSION_DENIED;case ke.FAILED_PRECONDITION:return P.FAILED_PRECONDITION;case ke.ABORTED:return P.ABORTED;case ke.OUT_OF_RANGE:return P.OUT_OF_RANGE;case ke.UNIMPLEMENTED:return P.UNIMPLEMENTED;case ke.DATA_LOSS:return P.DATA_LOSS;default:return j(39323,{code:n})}}(te=ke||(ke={}))[te.OK=0]="OK",te[te.CANCELLED=1]="CANCELLED",te[te.UNKNOWN=2]="UNKNOWN",te[te.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",te[te.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",te[te.NOT_FOUND=5]="NOT_FOUND",te[te.ALREADY_EXISTS=6]="ALREADY_EXISTS",te[te.PERMISSION_DENIED=7]="PERMISSION_DENIED",te[te.UNAUTHENTICATED=16]="UNAUTHENTICATED",te[te.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",te[te.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",te[te.ABORTED=10]="ABORTED",te[te.OUT_OF_RANGE=11]="OUT_OF_RANGE",te[te.UNIMPLEMENTED=12]="UNIMPLEMENTED",te[te.INTERNAL=13]="INTERNAL",te[te.UNAVAILABLE=14]="UNAVAILABLE",te[te.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const iv=new cn([4294967295,4294967295],0);function rh(n){const e=$d().encode(n),t=new Nd;return t.update(e),new Uint8Array(t.digest())}function sh(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new cn([t,r],0),new cn([s,i],0)]}class Dl{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new hs(`Invalid padding: ${t}`);if(r<0)throw new hs(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new hs(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new hs(`Invalid padding when bitmap length is 0: ${t}`);this.fe=8*e.length-t,this.ge=cn.fromNumber(this.fe)}pe(e,t,r){let s=e.add(t.multiply(cn.fromNumber(r)));return s.compare(iv)===1&&(s=new cn([s.getBits(0),s.getBits(1)],0)),s.modulo(this.ge).toNumber()}ye(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.fe===0)return!1;const t=rh(e),[r,s]=sh(t);for(let i=0;i<this.hashCount;i++){const a=this.pe(r,s,i);if(!this.ye(a))return!1}return!0}static create(e,t,r){const s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),a=new Dl(i,s,t);return r.forEach(l=>a.insert(l)),a}insert(e){if(this.fe===0)return;const t=rh(e),[r,s]=sh(t);for(let i=0;i<this.hashCount;i++){const a=this.pe(r,s,i);this.we(a)}}we(e){const t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}}class hs extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wo{constructor(e,t,r,s,i){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,t,r){const s=new Map;return s.set(e,$s.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new wo(W.min(),s,new be(J),zt(),Z())}}class $s{constructor(e,t,r,s,i){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new $s(r,t,Z(),Z(),Z())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ki{constructor(e,t,r,s){this.Se=e,this.removedTargetIds=t,this.key=r,this.be=s}}class wf{constructor(e,t){this.targetId=e,this.De=t}}class Tf{constructor(e,t,r=$e.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=s}}class ih{constructor(){this.ve=0,this.Ce=oh(),this.Fe=$e.EMPTY_BYTE_STRING,this.Me=!1,this.xe=!0}get current(){return this.Me}get resumeToken(){return this.Fe}get Oe(){return this.ve!==0}get Ne(){return this.xe}Be(e){e.approximateByteSize()>0&&(this.xe=!0,this.Fe=e)}Le(){let e=Z(),t=Z(),r=Z();return this.Ce.forEach((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:t=t.add(s);break;case 1:r=r.add(s);break;default:j(38017,{changeType:i})}}),new $s(this.Fe,this.Me,e,t,r)}ke(){this.xe=!1,this.Ce=oh()}qe(e,t){this.xe=!0,this.Ce=this.Ce.insert(e,t)}Qe(e){this.xe=!0,this.Ce=this.Ce.remove(e)}$e(){this.ve+=1}Ue(){this.ve-=1,ie(this.ve>=0,3241,{ve:this.ve})}Ke(){this.xe=!0,this.Me=!0}}class ov{constructor(e){this.We=e,this.Ge=new Map,this.ze=zt(),this.je=_i(),this.Je=_i(),this.He=new be(J)}Ye(e){for(const t of e.Se)e.be&&e.be.isFoundDocument()?this.Ze(t,e.be):this.Xe(t,e.key,e.be);for(const t of e.removedTargetIds)this.Xe(t,e.key,e.be)}et(e){this.forEachTarget(e,t=>{const r=this.tt(t);switch(e.state){case 0:this.nt(t)&&r.Be(e.resumeToken);break;case 1:r.Ue(),r.Oe||r.ke(),r.Be(e.resumeToken);break;case 2:r.Ue(),r.Oe||this.removeTarget(t);break;case 3:this.nt(t)&&(r.Ke(),r.Be(e.resumeToken));break;case 4:this.nt(t)&&(this.rt(t),r.Be(e.resumeToken));break;default:j(56790,{state:e.state})}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.Ge.forEach((r,s)=>{this.nt(s)&&t(s)})}it(e){const t=e.targetId,r=e.De.count,s=this.st(t);if(s){const i=s.target;if(Ga(i))if(r===0){const a=new $(i.path);this.Xe(t,a,Qe.newNoDocument(a,W.min()))}else ie(r===1,20013,{expectedCount:r});else{const a=this.ot(t);if(a!==r){const l=this._t(e),u=l?this.ut(l,e,a):1;if(u!==0){this.rt(t);const h=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.He=this.He.insert(t,h)}}}}}_t(e){const t=e.De.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:i=0}=t;let a,l;try{a=En(r).toUint8Array()}catch(u){if(u instanceof Hd)return _n("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw u}try{l=new Dl(a,s,i)}catch(u){return _n(u instanceof hs?"BloomFilter error: ":"Applying bloom filter failed: ",u),null}return l.fe===0?null:l}ut(e,t,r){return t.De.count===r-this.ht(e,t.targetId)?0:2}ht(e,t){const r=this.We.getRemoteKeysForTarget(t);let s=0;return r.forEach(i=>{const a=this.We.lt(),l=`projects/${a.projectId}/databases/${a.database}/documents/${i.path.canonicalString()}`;e.mightContain(l)||(this.Xe(t,i,null),s++)}),s}Pt(e){const t=new Map;this.Ge.forEach((i,a)=>{const l=this.st(a);if(l){if(i.current&&Ga(l.target)){const u=new $(l.target.path);this.Tt(u).has(a)||this.It(a,u)||this.Xe(a,u,Qe.newNoDocument(u,e))}i.Ne&&(t.set(a,i.Le()),i.ke())}});let r=Z();this.Je.forEach((i,a)=>{let l=!0;a.forEachWhile(u=>{const h=this.st(u);return!h||h.purpose==="TargetPurposeLimboResolution"||(l=!1,!1)}),l&&(r=r.add(i))}),this.ze.forEach((i,a)=>a.setReadTime(e));const s=new wo(e,t,this.He,this.ze,r);return this.ze=zt(),this.je=_i(),this.Je=_i(),this.He=new be(J),s}Ze(e,t){if(!this.nt(e))return;const r=this.It(e,t.key)?2:0;this.tt(e).qe(t.key,r),this.ze=this.ze.insert(t.key,t),this.je=this.je.insert(t.key,this.Tt(t.key).add(e)),this.Je=this.Je.insert(t.key,this.dt(t.key).add(e))}Xe(e,t,r){if(!this.nt(e))return;const s=this.tt(e);this.It(e,t)?s.qe(t,1):s.Qe(t),this.Je=this.Je.insert(t,this.dt(t).delete(e)),this.Je=this.Je.insert(t,this.dt(t).add(e)),r&&(this.ze=this.ze.insert(t,r))}removeTarget(e){this.Ge.delete(e)}ot(e){const t=this.tt(e).Le();return this.We.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}$e(e){this.tt(e).$e()}tt(e){let t=this.Ge.get(e);return t||(t=new ih,this.Ge.set(e,t)),t}dt(e){let t=this.Je.get(e);return t||(t=new Ve(J),this.Je=this.Je.insert(e,t)),t}Tt(e){let t=this.je.get(e);return t||(t=new Ve(J),this.je=this.je.insert(e,t)),t}nt(e){const t=this.st(e)!==null;return t||L("WatchChangeAggregator","Detected inactive target",e),t}st(e){const t=this.Ge.get(e);return t&&t.Oe?null:this.We.Et(e)}rt(e){this.Ge.set(e,new ih),this.We.getRemoteKeysForTarget(e).forEach(t=>{this.Xe(e,t,null)})}It(e,t){return this.We.getRemoteKeysForTarget(e).has(t)}}function _i(){return new be($.comparator)}function oh(){return new be($.comparator)}const av={asc:"ASCENDING",desc:"DESCENDING"},lv={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},cv={and:"AND",or:"OR"};class uv{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function Qa(n,e){return n.useProto3Json||po(e)?e:{value:e}}function Ki(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function If(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function hv(n,e){return Ki(n,e.toTimestamp())}function At(n){return ie(!!n,49232),W.fromTimestamp(function(t){const r=vn(t);return new ge(r.seconds,r.nanos)}(n))}function xl(n,e){return Ja(n,e).canonicalString()}function Ja(n,e){const t=function(s){return new de(["projects",s.projectId,"databases",s.database])}(n).child("documents");return e===void 0?t:t.child(e)}function bf(n){const e=de.fromString(n);return ie(Pf(e),10190,{key:e.toString()}),e}function Xa(n,e){return xl(n.databaseId,e.path)}function ga(n,e){const t=bf(e);if(t.get(1)!==n.databaseId.projectId)throw new M(P.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new M(P.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new $(Sf(t))}function Af(n,e){return xl(n.databaseId,e)}function dv(n){const e=bf(n);return e.length===4?de.emptyPath():Sf(e)}function Ya(n){return new de(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function Sf(n){return ie(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function ah(n,e,t){return{name:Xa(n,e),fields:t.value.mapValue.fields}}function fv(n,e){let t;if("targetChange"in e){e.targetChange;const r=function(h){return h==="NO_CHANGE"?0:h==="ADD"?1:h==="REMOVE"?2:h==="CURRENT"?3:h==="RESET"?4:j(39313,{state:h})}(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=function(h,f){return h.useProto3Json?(ie(f===void 0||typeof f=="string",58123),$e.fromBase64String(f||"")):(ie(f===void 0||f instanceof Buffer||f instanceof Uint8Array,16193),$e.fromUint8Array(f||new Uint8Array))}(n,e.targetChange.resumeToken),a=e.targetChange.cause,l=a&&function(h){const f=h.code===void 0?P.UNKNOWN:Ef(h.code);return new M(f,h.message||"")}(a);t=new Tf(r,s,i,l||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const s=ga(n,r.document.name),i=At(r.document.updateTime),a=r.document.createTime?At(r.document.createTime):W.min(),l=new rt({mapValue:{fields:r.document.fields}}),u=Qe.newFoundDocument(s,i,a,l),h=r.targetIds||[],f=r.removedTargetIds||[];t=new ki(h,f,u.key,u)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const s=ga(n,r.document),i=r.readTime?At(r.readTime):W.min(),a=Qe.newNoDocument(s,i),l=r.removedTargetIds||[];t=new ki([],l,a.key,a)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const s=ga(n,r.document),i=r.removedTargetIds||[];t=new ki([],i,s,null)}else{if(!("filter"in e))return j(11601,{At:e});{e.filter;const r=e.filter;r.targetId;const{count:s=0,unchangedNames:i}=r,a=new rv(s,i),l=r.targetId;t=new wf(l,a)}}return t}function pv(n,e){let t;if(e instanceof Us)t={update:ah(n,e.key,e.value)};else if(e instanceof vf)t={delete:Xa(n,e.key)};else if(e instanceof Sn)t={update:ah(n,e.key,e.data),updateMask:Iv(e.fieldMask)};else{if(!(e instanceof ev))return j(16599,{Rt:e.type});t={verify:Xa(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(r=>function(i,a){const l=a.transform;if(l instanceof Ps)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(l instanceof Cs)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:l.elements}};if(l instanceof Vs)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:l.elements}};if(l instanceof Wi)return{fieldPath:a.field.canonicalString(),increment:l.Ee};throw j(20930,{transform:a.transform})}(0,r))),e.precondition.isNone||(t.currentDocument=function(s,i){return i.updateTime!==void 0?{updateTime:hv(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:j(27497)}(n,e.precondition)),t}function mv(n,e){return n&&n.length>0?(ie(e!==void 0,14353),n.map(t=>function(s,i){let a=s.updateTime?At(s.updateTime):At(i);return a.isEqual(W.min())&&(a=At(i)),new Xy(a,s.transformResults||[])}(t,e))):[]}function gv(n,e){return{documents:[Af(n,e.path)]}}function _v(n,e){const t={structuredQuery:{}},r=e.path;let s;e.collectionGroup!==null?(s=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=Af(n,s);const i=function(h){if(h.length!==0)return kf(yt.create(h,"and"))}(e.filters);i&&(t.structuredQuery.where=i);const a=function(h){if(h.length!==0)return h.map(f=>function(g){return{field:fr(g.field),direction:Ev(g.dir)}}(f))}(e.orderBy);a&&(t.structuredQuery.orderBy=a);const l=Qa(n,e.limit);return l!==null&&(t.structuredQuery.limit=l),e.startAt&&(t.structuredQuery.startAt=function(h){return{before:h.inclusive,values:h.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(h){return{before:!h.inclusive,values:h.position}}(e.endAt)),{Vt:t,parent:s}}function yv(n){let e=dv(n.parent);const t=n.structuredQuery,r=t.from?t.from.length:0;let s=null;if(r>0){ie(r===1,65062);const f=t.from[0];f.allDescendants?s=f.collectionId:e=e.child(f.collectionId)}let i=[];t.where&&(i=function(m){const g=Rf(m);return g instanceof yt&&tf(g)?g.getFilters():[g]}(t.where));let a=[];t.orderBy&&(a=function(m){return m.map(g=>function(k){return new ks(pr(k.field),function(V){switch(V){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(k.direction))}(g))}(t.orderBy));let l=null;t.limit&&(l=function(m){let g;return g=typeof m=="object"?m.value:m,po(g)?null:g}(t.limit));let u=null;t.startAt&&(u=function(m){const g=!!m.before,S=m.values||[];return new Gi(S,g)}(t.startAt));let h=null;return t.endAt&&(h=function(m){const g=!m.before,S=m.values||[];return new Gi(S,g)}(t.endAt)),Ly(e,s,a,i,l,"F",u,h)}function vv(n,e){const t=function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return j(28987,{purpose:s})}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function Rf(n){return n.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":const r=pr(t.unaryFilter.field);return Pe.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=pr(t.unaryFilter.field);return Pe.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=pr(t.unaryFilter.field);return Pe.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=pr(t.unaryFilter.field);return Pe.create(a,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return j(61313);default:return j(60726)}}(n):n.fieldFilter!==void 0?function(t){return Pe.create(pr(t.fieldFilter.field),function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return j(58110);default:return j(50506)}}(t.fieldFilter.op),t.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(t){return yt.create(t.compositeFilter.filters.map(r=>Rf(r)),function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return j(1026)}}(t.compositeFilter.op))}(n):j(30097,{filter:n})}function Ev(n){return av[n]}function wv(n){return lv[n]}function Tv(n){return cv[n]}function fr(n){return{fieldPath:n.canonicalString()}}function pr(n){return Le.fromServerFormat(n.fieldPath)}function kf(n){return n instanceof Pe?function(t){if(t.op==="=="){if(Ku(t.value))return{unaryFilter:{field:fr(t.field),op:"IS_NAN"}};if(Wu(t.value))return{unaryFilter:{field:fr(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(Ku(t.value))return{unaryFilter:{field:fr(t.field),op:"IS_NOT_NAN"}};if(Wu(t.value))return{unaryFilter:{field:fr(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:fr(t.field),op:wv(t.op),value:t.value}}}(n):n instanceof yt?function(t){const r=t.getFilters().map(s=>kf(s));return r.length===1?r[0]:{compositeFilter:{op:Tv(t.op),filters:r}}}(n):j(54877,{filter:n})}function Iv(n){const e=[];return n.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function Pf(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rn{constructor(e,t,r,s,i=W.min(),a=W.min(),l=$e.EMPTY_BYTE_STRING,u=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=l,this.expectedCount=u}withSequenceNumber(e){return new rn(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new rn(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new rn(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new rn(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bv{constructor(e){this.gt=e}}function Av(n){const e=yv({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?Ka(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sv{constructor(){this.Dn=new Rv}addToCollectionParentIndex(e,t){return this.Dn.add(t),C.resolve()}getCollectionParents(e,t){return C.resolve(this.Dn.getEntries(t))}addFieldIndex(e,t){return C.resolve()}deleteFieldIndex(e,t){return C.resolve()}deleteAllFieldIndexes(e){return C.resolve()}createTargetIndexes(e,t){return C.resolve()}getDocumentsMatchingTarget(e,t){return C.resolve(null)}getIndexType(e,t){return C.resolve(0)}getFieldIndexes(e,t){return C.resolve([])}getNextCollectionGroupToUpdate(e){return C.resolve(null)}getMinOffset(e,t){return C.resolve(yn.min())}getMinOffsetFromCollectionGroup(e,t){return C.resolve(yn.min())}updateCollectionGroup(e,t,r){return C.resolve()}updateIndexEntries(e,t){return C.resolve()}}class Rv{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t]||new Ve(de.comparator),i=!s.has(r);return this.index[t]=s.add(r),i}has(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t];return s&&s.has(r)}getEntries(e){return(this.index[e]||new Ve(de.comparator)).toArray()}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lh={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},Cf=41943040;class nt{static withCacheSize(e){return new nt(e,nt.DEFAULT_COLLECTION_PERCENTILE,nt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */nt.DEFAULT_COLLECTION_PERCENTILE=10,nt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,nt.DEFAULT=new nt(Cf,nt.DEFAULT_COLLECTION_PERCENTILE,nt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),nt.DISABLED=new nt(-1,0,0);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vr{constructor(e){this._r=e}next(){return this._r+=2,this._r}static ar(){return new Vr(0)}static ur(){return new Vr(-1)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ch="LruGarbageCollector",kv=1048576;function uh([n,e],[t,r]){const s=J(n,t);return s===0?J(e,r):s}class Pv{constructor(e){this.Tr=e,this.buffer=new Ve(uh),this.Ir=0}dr(){return++this.Ir}Er(e){const t=[e,this.dr()];if(this.buffer.size<this.Tr)this.buffer=this.buffer.add(t);else{const r=this.buffer.last();uh(t,r)<0&&(this.buffer=this.buffer.delete(r).add(t))}}get maxValue(){return this.buffer.last()[0]}}class Cv{constructor(e,t,r){this.garbageCollector=e,this.asyncQueue=t,this.localStore=r,this.Ar=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Rr(6e4)}stop(){this.Ar&&(this.Ar.cancel(),this.Ar=null)}get started(){return this.Ar!==null}Rr(e){L(ch,`Garbage collection scheduled in ${e}ms`),this.Ar=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Ar=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){Br(t)?L(ch,"Ignoring IndexedDB error during garbage collection: ",t):await $r(t)}await this.Rr(3e5)})}}class Vv{constructor(e,t){this.Vr=e,this.params=t}calculateTargetCount(e,t){return this.Vr.mr(e).next(r=>Math.floor(t/100*r))}nthSequenceNumber(e,t){if(t===0)return C.resolve(fo.ue);const r=new Pv(t);return this.Vr.forEachTarget(e,s=>r.Er(s.sequenceNumber)).next(()=>this.Vr.gr(e,s=>r.Er(s))).next(()=>r.maxValue)}removeTargets(e,t,r){return this.Vr.removeTargets(e,t,r)}removeOrphanedDocuments(e,t){return this.Vr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(L("LruGarbageCollector","Garbage collection skipped; disabled"),C.resolve(lh)):this.getCacheSize(e).next(r=>r<this.params.cacheSizeCollectionThreshold?(L("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),lh):this.pr(e,t))}getCacheSize(e){return this.Vr.getCacheSize(e)}pr(e,t){let r,s,i,a,l,u,h;const f=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(m=>(m>this.params.maximumSequenceNumbersToCollect?(L("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${m}`),s=this.params.maximumSequenceNumbersToCollect):s=m,a=Date.now(),this.nthSequenceNumber(e,s))).next(m=>(r=m,l=Date.now(),this.removeTargets(e,r,t))).next(m=>(i=m,u=Date.now(),this.removeOrphanedDocuments(e,r))).next(m=>(h=Date.now(),hr()<=Y.DEBUG&&L("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-f}ms
	Determined least recently used ${s} in `+(l-a)+`ms
	Removed ${i} targets in `+(u-l)+`ms
	Removed ${m} documents in `+(h-u)+`ms
Total Duration: ${h-f}ms`),C.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:m})))}}function Nv(n,e){return new Vv(n,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dv{constructor(){this.changes=new Zn(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,Qe.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return r!==void 0?C.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xv{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ov{constructor(e,t,r,s){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=s}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next(s=>(r=s,this.remoteDocumentCache.getEntry(e,t))).next(s=>(r!==null&&ys(r.mutation,s,ot.empty(),ge.now()),s))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.getLocalViewOfDocuments(e,r,Z()).next(()=>r))}getLocalViewOfDocuments(e,t,r=Z()){const s=$n();return this.populateOverlays(e,s,t).next(()=>this.computeViews(e,t,s,r).next(i=>{let a=us();return i.forEach((l,u)=>{a=a.insert(l,u.overlayedDocument)}),a}))}getOverlayedDocuments(e,t){const r=$n();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,Z()))}populateOverlays(e,t,r){const s=[];return r.forEach(i=>{t.has(i)||s.push(i)}),this.documentOverlayCache.getOverlays(e,s).next(i=>{i.forEach((a,l)=>{t.set(a,l)})})}computeViews(e,t,r,s){let i=zt();const a=_s(),l=function(){return _s()}();return t.forEach((u,h)=>{const f=r.get(h.key);s.has(h.key)&&(f===void 0||f.mutation instanceof Sn)?i=i.insert(h.key,h):f!==void 0?(a.set(h.key,f.mutation.getFieldMask()),ys(f.mutation,h,f.mutation.getFieldMask(),ge.now())):a.set(h.key,ot.empty())}),this.recalculateAndSaveOverlays(e,i).next(u=>(u.forEach((h,f)=>a.set(h,f)),t.forEach((h,f)=>{var m;return l.set(h,new xv(f,(m=a.get(h))!==null&&m!==void 0?m:null))}),l))}recalculateAndSaveOverlays(e,t){const r=_s();let s=new be((a,l)=>a-l),i=Z();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(a=>{for(const l of a)l.keys().forEach(u=>{const h=t.get(u);if(h===null)return;let f=r.get(u)||ot.empty();f=l.applyToLocalView(h,f),r.set(u,f);const m=(s.get(l.batchId)||Z()).add(u);s=s.insert(l.batchId,m)})}).next(()=>{const a=[],l=s.getReverseIterator();for(;l.hasNext();){const u=l.getNext(),h=u.key,f=u.value,m=hf();f.forEach(g=>{if(!i.has(g)){const S=_f(t.get(g),r.get(g));S!==null&&m.set(g,S),i=i.add(g)}}),a.push(this.documentOverlayCache.saveOverlays(e,h,m))}return C.waitFor(a)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,t,r,s){return function(a){return $.isDocumentKey(a.path)&&a.collectionGroup===null&&a.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):of(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,s):this.getDocumentsMatchingCollectionQuery(e,t,r,s)}getNextDocuments(e,t,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,s).next(i=>{const a=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,s-i.size):C.resolve($n());let l=bs,u=i;return a.next(h=>C.forEach(h,(f,m)=>(l<m.largestBatchId&&(l=m.largestBatchId),i.get(f)?C.resolve():this.remoteDocumentCache.getEntry(e,f).next(g=>{u=u.insert(f,g)}))).next(()=>this.populateOverlays(e,h,i)).next(()=>this.computeViews(e,u,h,Z())).next(f=>({batchId:l,changes:uf(f)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new $(t)).next(r=>{let s=us();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s})}getDocumentsMatchingCollectionGroupQuery(e,t,r,s){const i=t.collectionGroup;let a=us();return this.indexManager.getCollectionParents(e,i).next(l=>C.forEach(l,u=>{const h=function(m,g){return new qr(g,null,m.explicitOrderBy.slice(),m.filters.slice(),m.limit,m.limitType,m.startAt,m.endAt)}(t,u.child(i));return this.getDocumentsMatchingCollectionQuery(e,h,r,s).next(f=>{f.forEach((m,g)=>{a=a.insert(m,g)})})}).next(()=>a))}getDocumentsMatchingCollectionQuery(e,t,r,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next(a=>(i=a,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,i,s))).next(a=>{i.forEach((u,h)=>{const f=h.getKey();a.get(f)===null&&(a=a.insert(f,Qe.newInvalidDocument(f)))});let l=us();return a.forEach((u,h)=>{const f=i.get(u);f!==void 0&&ys(f.mutation,h,ot.empty(),ge.now()),yo(t,h)&&(l=l.insert(u,h))}),l})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mv{constructor(e){this.serializer=e,this.Br=new Map,this.Lr=new Map}getBundleMetadata(e,t){return C.resolve(this.Br.get(t))}saveBundleMetadata(e,t){return this.Br.set(t.id,function(s){return{id:s.id,version:s.version,createTime:At(s.createTime)}}(t)),C.resolve()}getNamedQuery(e,t){return C.resolve(this.Lr.get(t))}saveNamedQuery(e,t){return this.Lr.set(t.name,function(s){return{name:s.name,query:Av(s.bundledQuery),readTime:At(s.readTime)}}(t)),C.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lv{constructor(){this.overlays=new be($.comparator),this.kr=new Map}getOverlay(e,t){return C.resolve(this.overlays.get(t))}getOverlays(e,t){const r=$n();return C.forEach(t,s=>this.getOverlay(e,s).next(i=>{i!==null&&r.set(s,i)})).next(()=>r)}saveOverlays(e,t,r){return r.forEach((s,i)=>{this.wt(e,t,i)}),C.resolve()}removeOverlaysForBatchId(e,t,r){const s=this.kr.get(r);return s!==void 0&&(s.forEach(i=>this.overlays=this.overlays.remove(i)),this.kr.delete(r)),C.resolve()}getOverlaysForCollection(e,t,r){const s=$n(),i=t.length+1,a=new $(t.child("")),l=this.overlays.getIteratorFrom(a);for(;l.hasNext();){const u=l.getNext().value,h=u.getKey();if(!t.isPrefixOf(h.path))break;h.path.length===i&&u.largestBatchId>r&&s.set(u.getKey(),u)}return C.resolve(s)}getOverlaysForCollectionGroup(e,t,r,s){let i=new be((h,f)=>h-f);const a=this.overlays.getIterator();for(;a.hasNext();){const h=a.getNext().value;if(h.getKey().getCollectionGroup()===t&&h.largestBatchId>r){let f=i.get(h.largestBatchId);f===null&&(f=$n(),i=i.insert(h.largestBatchId,f)),f.set(h.getKey(),h)}}const l=$n(),u=i.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach((h,f)=>l.set(h,f)),!(l.size()>=s)););return C.resolve(l)}wt(e,t,r){const s=this.overlays.get(r.key);if(s!==null){const a=this.kr.get(s.largestBatchId).delete(r.key);this.kr.set(s.largestBatchId,a)}this.overlays=this.overlays.insert(r.key,new nv(t,r));let i=this.kr.get(t);i===void 0&&(i=Z(),this.kr.set(t,i)),this.kr.set(t,i.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fv{constructor(){this.sessionToken=$e.EMPTY_BYTE_STRING}getSessionToken(e){return C.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,C.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ol{constructor(){this.qr=new Ve(xe.Qr),this.$r=new Ve(xe.Ur)}isEmpty(){return this.qr.isEmpty()}addReference(e,t){const r=new xe(e,t);this.qr=this.qr.add(r),this.$r=this.$r.add(r)}Kr(e,t){e.forEach(r=>this.addReference(r,t))}removeReference(e,t){this.Wr(new xe(e,t))}Gr(e,t){e.forEach(r=>this.removeReference(r,t))}zr(e){const t=new $(new de([])),r=new xe(t,e),s=new xe(t,e+1),i=[];return this.$r.forEachInRange([r,s],a=>{this.Wr(a),i.push(a.key)}),i}jr(){this.qr.forEach(e=>this.Wr(e))}Wr(e){this.qr=this.qr.delete(e),this.$r=this.$r.delete(e)}Jr(e){const t=new $(new de([])),r=new xe(t,e),s=new xe(t,e+1);let i=Z();return this.$r.forEachInRange([r,s],a=>{i=i.add(a.key)}),i}containsKey(e){const t=new xe(e,0),r=this.qr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}}class xe{constructor(e,t){this.key=e,this.Hr=t}static Qr(e,t){return $.comparator(e.key,t.key)||J(e.Hr,t.Hr)}static Ur(e,t){return J(e.Hr,t.Hr)||$.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uv{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.er=1,this.Yr=new Ve(xe.Qr)}checkEmpty(e){return C.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,s){const i=this.er;this.er++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new tv(i,t,r,s);this.mutationQueue.push(a);for(const l of s)this.Yr=this.Yr.add(new xe(l.key,i)),this.indexManager.addToCollectionParentIndex(e,l.key.path.popLast());return C.resolve(a)}lookupMutationBatch(e,t){return C.resolve(this.Zr(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,s=this.Xr(r),i=s<0?0:s;return C.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return C.resolve(this.mutationQueue.length===0?Sl:this.er-1)}getAllMutationBatches(e){return C.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new xe(t,0),s=new xe(t,Number.POSITIVE_INFINITY),i=[];return this.Yr.forEachInRange([r,s],a=>{const l=this.Zr(a.Hr);i.push(l)}),C.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new Ve(J);return t.forEach(s=>{const i=new xe(s,0),a=new xe(s,Number.POSITIVE_INFINITY);this.Yr.forEachInRange([i,a],l=>{r=r.add(l.Hr)})}),C.resolve(this.ei(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,s=r.length+1;let i=r;$.isDocumentKey(i)||(i=i.child(""));const a=new xe(new $(i),0);let l=new Ve(J);return this.Yr.forEachWhile(u=>{const h=u.key.path;return!!r.isPrefixOf(h)&&(h.length===s&&(l=l.add(u.Hr)),!0)},a),C.resolve(this.ei(l))}ei(e){const t=[];return e.forEach(r=>{const s=this.Zr(r);s!==null&&t.push(s)}),t}removeMutationBatch(e,t){ie(this.ti(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.Yr;return C.forEach(t.mutations,s=>{const i=new xe(s.key,t.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)}).next(()=>{this.Yr=r})}rr(e){}containsKey(e,t){const r=new xe(t,0),s=this.Yr.firstAfterOrEqual(r);return C.resolve(t.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,C.resolve()}ti(e,t){return this.Xr(e)}Xr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Zr(e){const t=this.Xr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $v{constructor(e){this.ni=e,this.docs=function(){return new be($.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,s=this.docs.get(r),i=s?s.size:0,a=this.ni(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:a}),this.size+=a-i,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return C.resolve(r?r.document.mutableCopy():Qe.newInvalidDocument(t))}getEntries(e,t){let r=zt();return t.forEach(s=>{const i=this.docs.get(s);r=r.insert(s,i?i.document.mutableCopy():Qe.newInvalidDocument(s))}),C.resolve(r)}getDocumentsMatchingQuery(e,t,r,s){let i=zt();const a=t.path,l=new $(a.child("__id-9223372036854775808__")),u=this.docs.getIteratorFrom(l);for(;u.hasNext();){const{key:h,value:{document:f}}=u.getNext();if(!a.isPrefixOf(h.path))break;h.path.length>a.length+1||my(py(f),r)<=0||(s.has(f.key)||yo(t,f))&&(i=i.insert(f.key,f.mutableCopy()))}return C.resolve(i)}getAllFromCollectionGroup(e,t,r,s){j(9500)}ri(e,t){return C.forEach(this.docs,r=>t(r))}newChangeBuffer(e){return new Bv(this)}getSize(e){return C.resolve(this.size)}}class Bv extends Dv{constructor(e){super(),this.Or=e}applyChanges(e){const t=[];return this.changes.forEach((r,s)=>{s.isValidDocument()?t.push(this.Or.addEntry(e,s)):this.Or.removeEntry(r)}),C.waitFor(t)}getFromCache(e,t){return this.Or.getEntry(e,t)}getAllFromCache(e,t){return this.Or.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qv{constructor(e){this.persistence=e,this.ii=new Zn(t=>Pl(t),Cl),this.lastRemoteSnapshotVersion=W.min(),this.highestTargetId=0,this.si=0,this.oi=new Ol,this.targetCount=0,this._i=Vr.ar()}forEachTarget(e,t){return this.ii.forEach((r,s)=>t(s)),C.resolve()}getLastRemoteSnapshotVersion(e){return C.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return C.resolve(this.si)}allocateTargetId(e){return this.highestTargetId=this._i.next(),C.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.si&&(this.si=t),C.resolve()}hr(e){this.ii.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this._i=new Vr(t),this.highestTargetId=t),e.sequenceNumber>this.si&&(this.si=e.sequenceNumber)}addTargetData(e,t){return this.hr(t),this.targetCount+=1,C.resolve()}updateTargetData(e,t){return this.hr(t),C.resolve()}removeTargetData(e,t){return this.ii.delete(t.target),this.oi.zr(t.targetId),this.targetCount-=1,C.resolve()}removeTargets(e,t,r){let s=0;const i=[];return this.ii.forEach((a,l)=>{l.sequenceNumber<=t&&r.get(l.targetId)===null&&(this.ii.delete(a),i.push(this.removeMatchingKeysForTargetId(e,l.targetId)),s++)}),C.waitFor(i).next(()=>s)}getTargetCount(e){return C.resolve(this.targetCount)}getTargetData(e,t){const r=this.ii.get(t)||null;return C.resolve(r)}addMatchingKeys(e,t,r){return this.oi.Kr(t,r),C.resolve()}removeMatchingKeys(e,t,r){this.oi.Gr(t,r);const s=this.persistence.referenceDelegate,i=[];return s&&t.forEach(a=>{i.push(s.markPotentiallyOrphaned(e,a))}),C.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this.oi.zr(t),C.resolve()}getMatchingKeysForTargetId(e,t){const r=this.oi.Jr(t);return C.resolve(r)}containsKey(e,t){return C.resolve(this.oi.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vf{constructor(e,t){this.ai={},this.overlays={},this.ui=new fo(0),this.ci=!1,this.ci=!0,this.li=new Fv,this.referenceDelegate=e(this),this.hi=new qv(this),this.indexManager=new Sv,this.remoteDocumentCache=function(s){return new $v(s)}(r=>this.referenceDelegate.Pi(r)),this.serializer=new bv(t),this.Ti=new Mv(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ci=!1,Promise.resolve()}get started(){return this.ci}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new Lv,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.ai[e.toKey()];return r||(r=new Uv(t,this.referenceDelegate),this.ai[e.toKey()]=r),r}getGlobalsCache(){return this.li}getTargetCache(){return this.hi}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ti}runTransaction(e,t,r){L("MemoryPersistence","Starting transaction:",e);const s=new jv(this.ui.next());return this.referenceDelegate.Ii(),r(s).next(i=>this.referenceDelegate.di(s).next(()=>i)).toPromise().then(i=>(s.raiseOnCommittedEvent(),i))}Ei(e,t){return C.or(Object.values(this.ai).map(r=>()=>r.containsKey(e,t)))}}class jv extends _y{constructor(e){super(),this.currentSequenceNumber=e}}class Ml{constructor(e){this.persistence=e,this.Ai=new Ol,this.Ri=null}static Vi(e){return new Ml(e)}get mi(){if(this.Ri)return this.Ri;throw j(60996)}addReference(e,t,r){return this.Ai.addReference(r,t),this.mi.delete(r.toString()),C.resolve()}removeReference(e,t,r){return this.Ai.removeReference(r,t),this.mi.add(r.toString()),C.resolve()}markPotentiallyOrphaned(e,t){return this.mi.add(t.toString()),C.resolve()}removeTarget(e,t){this.Ai.zr(t.targetId).forEach(s=>this.mi.add(s.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next(s=>{s.forEach(i=>this.mi.add(i.toString()))}).next(()=>r.removeTargetData(e,t))}Ii(){this.Ri=new Set}di(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return C.forEach(this.mi,r=>{const s=$.fromPath(r);return this.fi(e,s).next(i=>{i||t.removeEntry(s,W.min())})}).next(()=>(this.Ri=null,t.apply(e)))}updateLimboDocument(e,t){return this.fi(e,t).next(r=>{r?this.mi.delete(t.toString()):this.mi.add(t.toString())})}Pi(e){return 0}fi(e,t){return C.or([()=>C.resolve(this.Ai.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ei(e,t)])}}class Qi{constructor(e,t){this.persistence=e,this.gi=new Zn(r=>Ey(r.path),(r,s)=>r.isEqual(s)),this.garbageCollector=Nv(this,t)}static Vi(e,t){return new Qi(e,t)}Ii(){}di(e){return C.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}mr(e){const t=this.yr(e);return this.persistence.getTargetCache().getTargetCount(e).next(r=>t.next(s=>r+s))}yr(e){let t=0;return this.gr(e,r=>{t++}).next(()=>t)}gr(e,t){return C.forEach(this.gi,(r,s)=>this.Sr(e,r,s).next(i=>i?C.resolve():t(s)))}removeTargets(e,t,r){return this.persistence.getTargetCache().removeTargets(e,t,r)}removeOrphanedDocuments(e,t){let r=0;const s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.ri(e,a=>this.Sr(e,a,t).next(l=>{l||(r++,i.removeEntry(a,W.min()))})).next(()=>i.apply(e)).next(()=>r)}markPotentiallyOrphaned(e,t){return this.gi.set(t,e.currentSequenceNumber),C.resolve()}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,t,r){return this.gi.set(r,e.currentSequenceNumber),C.resolve()}removeReference(e,t,r){return this.gi.set(r,e.currentSequenceNumber),C.resolve()}updateLimboDocument(e,t){return this.gi.set(t,e.currentSequenceNumber),C.resolve()}Pi(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=Ai(e.data.value)),t}Sr(e,t,r){return C.or([()=>this.persistence.Ei(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const s=this.gi.get(t);return C.resolve(s!==void 0&&s>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ll{constructor(e,t,r,s){this.targetId=e,this.fromCache=t,this.Is=r,this.ds=s}static Es(e,t){let r=Z(),s=Z();for(const i of t.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new Ll(e,t.fromCache,r,s)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zv{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hv{constructor(){this.As=!1,this.Rs=!1,this.Vs=100,this.fs=function(){return Ug()?8:yy(Xe())>0?6:4}()}initialize(e,t){this.gs=e,this.indexManager=t,this.As=!0}getDocumentsMatchingQuery(e,t,r,s){const i={result:null};return this.ps(e,t).next(a=>{i.result=a}).next(()=>{if(!i.result)return this.ys(e,t,s,r).next(a=>{i.result=a})}).next(()=>{if(i.result)return;const a=new zv;return this.ws(e,t,a).next(l=>{if(i.result=l,this.Rs)return this.Ss(e,t,a,l.size)})}).next(()=>i.result)}Ss(e,t,r,s){return r.documentReadCount<this.Vs?(hr()<=Y.DEBUG&&L("QueryEngine","SDK will not create cache indexes for query:",dr(t),"since it only creates cache indexes for collection contains","more than or equal to",this.Vs,"documents"),C.resolve()):(hr()<=Y.DEBUG&&L("QueryEngine","Query:",dr(t),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.fs*s?(hr()<=Y.DEBUG&&L("QueryEngine","The SDK decides to create cache indexes for query:",dr(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,bt(t))):C.resolve())}ps(e,t){if(Yu(t))return C.resolve(null);let r=bt(t);return this.indexManager.getIndexType(e,r).next(s=>s===0?null:(t.limit!==null&&s===1&&(t=Ka(t,null,"F"),r=bt(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next(i=>{const a=Z(...i);return this.gs.getDocuments(e,a).next(l=>this.indexManager.getMinOffset(e,r).next(u=>{const h=this.bs(t,l);return this.Ds(t,h,a,u.readTime)?this.ps(e,Ka(t,null,"F")):this.vs(e,h,t,u)}))})))}ys(e,t,r,s){return Yu(t)||s.isEqual(W.min())?C.resolve(null):this.gs.getDocuments(e,r).next(i=>{const a=this.bs(t,i);return this.Ds(t,a,r,s)?C.resolve(null):(hr()<=Y.DEBUG&&L("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),dr(t)),this.vs(e,a,t,fy(s,bs)).next(l=>l))})}bs(e,t){let r=new Ve(lf(e));return t.forEach((s,i)=>{yo(e,i)&&(r=r.add(i))}),r}Ds(e,t,r,s){if(e.limit===null)return!1;if(r.size!==t.size)return!0;const i=e.limitType==="F"?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}ws(e,t,r){return hr()<=Y.DEBUG&&L("QueryEngine","Using full collection scan to execute query:",dr(t)),this.gs.getDocumentsMatchingQuery(e,t,yn.min(),r)}vs(e,t,r,s){return this.gs.getDocumentsMatchingQuery(e,r,s).next(i=>(t.forEach(a=>{i=i.insert(a.key,a)}),i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fl="LocalStore",Gv=3e8;class Wv{constructor(e,t,r,s){this.persistence=e,this.Cs=t,this.serializer=s,this.Fs=new be(J),this.Ms=new Zn(i=>Pl(i),Cl),this.xs=new Map,this.Os=e.getRemoteDocumentCache(),this.hi=e.getTargetCache(),this.Ti=e.getBundleCache(),this.Ns(r)}Ns(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new Ov(this.Os,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Os.setIndexManager(this.indexManager),this.Cs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.Fs))}}function Kv(n,e,t,r){return new Wv(n,e,t,r)}async function Nf(n,e){const t=Q(n);return await t.persistence.runTransaction("Handle user change","readonly",r=>{let s;return t.mutationQueue.getAllMutationBatches(r).next(i=>(s=i,t.Ns(e),t.mutationQueue.getAllMutationBatches(r))).next(i=>{const a=[],l=[];let u=Z();for(const h of s){a.push(h.batchId);for(const f of h.mutations)u=u.add(f.key)}for(const h of i){l.push(h.batchId);for(const f of h.mutations)u=u.add(f.key)}return t.localDocuments.getDocuments(r,u).next(h=>({Bs:h,removedBatchIds:a,addedBatchIds:l}))})})}function Qv(n,e){const t=Q(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const s=e.batch.keys(),i=t.Os.newChangeBuffer({trackRemovals:!0});return function(l,u,h,f){const m=h.batch,g=m.keys();let S=C.resolve();return g.forEach(k=>{S=S.next(()=>f.getEntry(u,k)).next(N=>{const V=h.docVersions.get(k);ie(V!==null,48541),N.version.compareTo(V)<0&&(m.applyToRemoteDocument(N,h),N.isValidDocument()&&(N.setReadTime(h.commitVersion),f.addEntry(N)))})}),S.next(()=>l.mutationQueue.removeMutationBatch(u,m))}(t,r,e,i).next(()=>i.apply(r)).next(()=>t.mutationQueue.performConsistencyCheck(r)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(r,s,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(l){let u=Z();for(let h=0;h<l.mutationResults.length;++h)l.mutationResults[h].transformResults.length>0&&(u=u.add(l.batch.mutations[h].key));return u}(e))).next(()=>t.localDocuments.getDocuments(r,s))})}function Df(n){const e=Q(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.hi.getLastRemoteSnapshotVersion(t))}function Jv(n,e){const t=Q(n),r=e.snapshotVersion;let s=t.Fs;return t.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{const a=t.Os.newChangeBuffer({trackRemovals:!0});s=t.Fs;const l=[];e.targetChanges.forEach((f,m)=>{const g=s.get(m);if(!g)return;l.push(t.hi.removeMatchingKeys(i,f.removedDocuments,m).next(()=>t.hi.addMatchingKeys(i,f.addedDocuments,m)));let S=g.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(m)!==null?S=S.withResumeToken($e.EMPTY_BYTE_STRING,W.min()).withLastLimboFreeSnapshotVersion(W.min()):f.resumeToken.approximateByteSize()>0&&(S=S.withResumeToken(f.resumeToken,r)),s=s.insert(m,S),function(N,V,G){return N.resumeToken.approximateByteSize()===0||V.snapshotVersion.toMicroseconds()-N.snapshotVersion.toMicroseconds()>=Gv?!0:G.addedDocuments.size+G.modifiedDocuments.size+G.removedDocuments.size>0}(g,S,f)&&l.push(t.hi.updateTargetData(i,S))});let u=zt(),h=Z();if(e.documentUpdates.forEach(f=>{e.resolvedLimboDocuments.has(f)&&l.push(t.persistence.referenceDelegate.updateLimboDocument(i,f))}),l.push(Xv(i,a,e.documentUpdates).next(f=>{u=f.Ls,h=f.ks})),!r.isEqual(W.min())){const f=t.hi.getLastRemoteSnapshotVersion(i).next(m=>t.hi.setTargetsMetadata(i,i.currentSequenceNumber,r));l.push(f)}return C.waitFor(l).next(()=>a.apply(i)).next(()=>t.localDocuments.getLocalViewOfDocuments(i,u,h)).next(()=>u)}).then(i=>(t.Fs=s,i))}function Xv(n,e,t){let r=Z(),s=Z();return t.forEach(i=>r=r.add(i)),e.getEntries(n,r).next(i=>{let a=zt();return t.forEach((l,u)=>{const h=i.get(l);u.isFoundDocument()!==h.isFoundDocument()&&(s=s.add(l)),u.isNoDocument()&&u.version.isEqual(W.min())?(e.removeEntry(l,u.readTime),a=a.insert(l,u)):!h.isValidDocument()||u.version.compareTo(h.version)>0||u.version.compareTo(h.version)===0&&h.hasPendingWrites?(e.addEntry(u),a=a.insert(l,u)):L(Fl,"Ignoring outdated watch update for ",l,". Current version:",h.version," Watch version:",u.version)}),{Ls:a,ks:s}})}function Yv(n,e){const t=Q(n);return t.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=Sl),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function Zv(n,e){const t=Q(n);return t.persistence.runTransaction("Allocate target","readwrite",r=>{let s;return t.hi.getTargetData(r,e).next(i=>i?(s=i,C.resolve(s)):t.hi.allocateTargetId(r).next(a=>(s=new rn(e,a,"TargetPurposeListen",r.currentSequenceNumber),t.hi.addTargetData(r,s).next(()=>s))))}).then(r=>{const s=t.Fs.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(t.Fs=t.Fs.insert(r.targetId,r),t.Ms.set(e,r.targetId)),r})}async function Za(n,e,t){const r=Q(n),s=r.Fs.get(e),i=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",i,a=>r.persistence.referenceDelegate.removeTarget(a,s))}catch(a){if(!Br(a))throw a;L(Fl,`Failed to update sequence numbers for target ${e}: ${a}`)}r.Fs=r.Fs.remove(e),r.Ms.delete(s.target)}function hh(n,e,t){const r=Q(n);let s=W.min(),i=Z();return r.persistence.runTransaction("Execute query","readwrite",a=>function(u,h,f){const m=Q(u),g=m.Ms.get(f);return g!==void 0?C.resolve(m.Fs.get(g)):m.hi.getTargetData(h,f)}(r,a,bt(e)).next(l=>{if(l)return s=l.lastLimboFreeSnapshotVersion,r.hi.getMatchingKeysForTargetId(a,l.targetId).next(u=>{i=u})}).next(()=>r.Cs.getDocumentsMatchingQuery(a,e,t?s:W.min(),t?i:Z())).next(l=>(e0(r,Uy(e),l),{documents:l,qs:i})))}function e0(n,e,t){let r=n.xs.get(e)||W.min();t.forEach((s,i)=>{i.readTime.compareTo(r)>0&&(r=i.readTime)}),n.xs.set(e,r)}class dh{constructor(){this.activeTargetIds=Hy()}Gs(e){this.activeTargetIds=this.activeTargetIds.add(e)}zs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Ws(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class t0{constructor(){this.Fo=new dh,this.Mo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.Fo.Gs(e),this.Mo[e]||"not-current"}updateQueryState(e,t,r){this.Mo[e]=t}removeLocalQueryTarget(e){this.Fo.zs(e)}isLocalQueryTarget(e){return this.Fo.activeTargetIds.has(e)}clearQueryState(e){delete this.Mo[e]}getAllActiveQueryTargets(){return this.Fo.activeTargetIds}isActiveQueryTarget(e){return this.Fo.activeTargetIds.has(e)}start(){return this.Fo=new dh,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class n0{xo(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fh="ConnectivityMonitor";class ph{constructor(){this.Oo=()=>this.No(),this.Bo=()=>this.Lo(),this.ko=[],this.qo()}xo(e){this.ko.push(e)}shutdown(){window.removeEventListener("online",this.Oo),window.removeEventListener("offline",this.Bo)}qo(){window.addEventListener("online",this.Oo),window.addEventListener("offline",this.Bo)}No(){L(fh,"Network connectivity changed: AVAILABLE");for(const e of this.ko)e(0)}Lo(){L(fh,"Network connectivity changed: UNAVAILABLE");for(const e of this.ko)e(1)}static C(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let yi=null;function el(){return yi===null?yi=function(){return 268435456+Math.round(2147483648*Math.random())}():yi++,"0x"+yi.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _a="RestConnection",r0={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class s0{get Qo(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.$o=t+"://"+e.host,this.Uo=`projects/${r}/databases/${s}`,this.Ko=this.databaseId.database===zi?`project_id=${r}`:`project_id=${r}&database_id=${s}`}Wo(e,t,r,s,i){const a=el(),l=this.Go(e,t.toUriEncodedString());L(_a,`Sending RPC '${e}' ${a}:`,l,r);const u={"google-cloud-resource-prefix":this.Uo,"x-goog-request-params":this.Ko};this.zo(u,s,i);const{host:h}=new URL(l),f=Lr(h);return this.jo(e,l,u,r,f).then(m=>(L(_a,`Received RPC '${e}' ${a}: `,m),m),m=>{throw _n(_a,`RPC '${e}' ${a} failed with error: `,m,"url: ",l,"request:",r),m})}Jo(e,t,r,s,i,a){return this.Wo(e,t,r,s,i)}zo(e,t,r){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+Ur}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((s,i)=>e[i]=s),r&&r.headers.forEach((s,i)=>e[i]=s)}Go(e,t){const r=r0[e];return`${this.$o}/v1/${t}:${r}`}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class i0{constructor(e){this.Ho=e.Ho,this.Yo=e.Yo}Zo(e){this.Xo=e}e_(e){this.t_=e}n_(e){this.r_=e}onMessage(e){this.i_=e}close(){this.Yo()}send(e){this.Ho(e)}s_(){this.Xo()}o_(){this.t_()}__(e){this.r_(e)}a_(e){this.i_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const He="WebChannelConnection";class o0 extends s0{constructor(e){super(e),this.u_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}jo(e,t,r,s,i){const a=el();return new Promise((l,u)=>{const h=new Dd;h.setWithCredentials(!0),h.listenOnce(xd.COMPLETE,()=>{try{switch(h.getLastErrorCode()){case bi.NO_ERROR:const m=h.getResponseJson();L(He,`XHR for RPC '${e}' ${a} received:`,JSON.stringify(m)),l(m);break;case bi.TIMEOUT:L(He,`RPC '${e}' ${a} timed out`),u(new M(P.DEADLINE_EXCEEDED,"Request time out"));break;case bi.HTTP_ERROR:const g=h.getStatus();if(L(He,`RPC '${e}' ${a} failed with status:`,g,"response text:",h.getResponseText()),g>0){let S=h.getResponseJson();Array.isArray(S)&&(S=S[0]);const k=S==null?void 0:S.error;if(k&&k.status&&k.message){const N=function(G){const z=G.toLowerCase().replace(/_/g,"-");return Object.values(P).indexOf(z)>=0?z:P.UNKNOWN}(k.status);u(new M(N,k.message))}else u(new M(P.UNKNOWN,"Server responded with status "+h.getStatus()))}else u(new M(P.UNAVAILABLE,"Connection failed."));break;default:j(9055,{c_:e,streamId:a,l_:h.getLastErrorCode(),h_:h.getLastError()})}}finally{L(He,`RPC '${e}' ${a} completed.`)}});const f=JSON.stringify(s);L(He,`RPC '${e}' ${a} sending request:`,s),h.send(t,"POST",f,r,15)})}P_(e,t,r){const s=el(),i=[this.$o,"/","google.firestore.v1.Firestore","/",e,"/channel"],a=Ld(),l=Md(),u={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},h=this.longPollingOptions.timeoutSeconds;h!==void 0&&(u.longPollingTimeout=Math.round(1e3*h)),this.useFetchStreams&&(u.useFetchStreams=!0),this.zo(u.initMessageHeaders,t,r),u.encodeInitMessageHeaders=!0;const f=i.join("");L(He,`Creating RPC '${e}' stream ${s}: ${f}`,u);const m=a.createWebChannel(f,u);this.T_(m);let g=!1,S=!1;const k=new i0({Ho:V=>{S?L(He,`Not sending because RPC '${e}' stream ${s} is closed:`,V):(g||(L(He,`Opening RPC '${e}' stream ${s} transport.`),m.open(),g=!0),L(He,`RPC '${e}' stream ${s} sending:`,V),m.send(V))},Yo:()=>m.close()}),N=(V,G,z)=>{V.listen(G,X=>{try{z(X)}catch(fe){setTimeout(()=>{throw fe},0)}})};return N(m,cs.EventType.OPEN,()=>{S||(L(He,`RPC '${e}' stream ${s} transport opened.`),k.s_())}),N(m,cs.EventType.CLOSE,()=>{S||(S=!0,L(He,`RPC '${e}' stream ${s} transport closed`),k.__(),this.I_(m))}),N(m,cs.EventType.ERROR,V=>{S||(S=!0,_n(He,`RPC '${e}' stream ${s} transport errored. Name:`,V.name,"Message:",V.message),k.__(new M(P.UNAVAILABLE,"The operation could not be completed")))}),N(m,cs.EventType.MESSAGE,V=>{var G;if(!S){const z=V.data[0];ie(!!z,16349);const X=z,fe=(X==null?void 0:X.error)||((G=X[0])===null||G===void 0?void 0:G.error);if(fe){L(He,`RPC '${e}' stream ${s} received error:`,fe);const tt=fe.status;let ve=function(y){const E=ke[y];if(E!==void 0)return Ef(E)}(tt),w=fe.message;ve===void 0&&(ve=P.INTERNAL,w="Unknown error status: "+tt+" with message "+fe.message),S=!0,k.__(new M(ve,w)),m.close()}else L(He,`RPC '${e}' stream ${s} received:`,z),k.a_(z)}}),N(l,Od.STAT_EVENT,V=>{V.stat===Ba.PROXY?L(He,`RPC '${e}' stream ${s} detected buffering proxy`):V.stat===Ba.NOPROXY&&L(He,`RPC '${e}' stream ${s} detected no buffering proxy`)}),setTimeout(()=>{k.o_()},0),k}terminate(){this.u_.forEach(e=>e.close()),this.u_=[]}T_(e){this.u_.push(e)}I_(e){this.u_=this.u_.filter(t=>t===e)}}function ya(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function To(n){return new uv(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xf{constructor(e,t,r=1e3,s=1.5,i=6e4){this.Fi=e,this.timerId=t,this.d_=r,this.E_=s,this.A_=i,this.R_=0,this.V_=null,this.m_=Date.now(),this.reset()}reset(){this.R_=0}f_(){this.R_=this.A_}g_(e){this.cancel();const t=Math.floor(this.R_+this.p_()),r=Math.max(0,Date.now()-this.m_),s=Math.max(0,t-r);s>0&&L("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.R_} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.V_=this.Fi.enqueueAfterDelay(this.timerId,s,()=>(this.m_=Date.now(),e())),this.R_*=this.E_,this.R_<this.d_&&(this.R_=this.d_),this.R_>this.A_&&(this.R_=this.A_)}y_(){this.V_!==null&&(this.V_.skipDelay(),this.V_=null)}cancel(){this.V_!==null&&(this.V_.cancel(),this.V_=null)}p_(){return(Math.random()-.5)*this.R_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mh="PersistentStream";class Of{constructor(e,t,r,s,i,a,l,u){this.Fi=e,this.w_=r,this.S_=s,this.connection=i,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=l,this.listener=u,this.state=0,this.b_=0,this.D_=null,this.v_=null,this.stream=null,this.C_=0,this.F_=new xf(e,t)}M_(){return this.state===1||this.state===5||this.x_()}x_(){return this.state===2||this.state===3}start(){this.C_=0,this.state!==4?this.auth():this.O_()}async stop(){this.M_()&&await this.close(0)}N_(){this.state=0,this.F_.reset()}B_(){this.x_()&&this.D_===null&&(this.D_=this.Fi.enqueueAfterDelay(this.w_,6e4,()=>this.L_()))}k_(e){this.q_(),this.stream.send(e)}async L_(){if(this.x_())return this.close(0)}q_(){this.D_&&(this.D_.cancel(),this.D_=null)}Q_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,t){this.q_(),this.Q_(),this.F_.cancel(),this.b_++,e!==4?this.F_.reset():t&&t.code===P.RESOURCE_EXHAUSTED?(jt(t.toString()),jt("Using maximum backoff delay to prevent overloading the backend."),this.F_.f_()):t&&t.code===P.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.U_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.n_(t)}U_(){}auth(){this.state=1;const e=this.K_(this.b_),t=this.b_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,s])=>{this.b_===t&&this.W_(r,s)},r=>{e(()=>{const s=new M(P.UNKNOWN,"Fetching auth token failed: "+r.message);return this.G_(s)})})}W_(e,t){const r=this.K_(this.b_);this.stream=this.z_(e,t),this.stream.Zo(()=>{r(()=>this.listener.Zo())}),this.stream.e_(()=>{r(()=>(this.state=2,this.v_=this.Fi.enqueueAfterDelay(this.S_,1e4,()=>(this.x_()&&(this.state=3),Promise.resolve())),this.listener.e_()))}),this.stream.n_(s=>{r(()=>this.G_(s))}),this.stream.onMessage(s=>{r(()=>++this.C_==1?this.j_(s):this.onNext(s))})}O_(){this.state=5,this.F_.g_(async()=>{this.state=0,this.start()})}G_(e){return L(mh,`close with error: ${e}`),this.stream=null,this.close(4,e)}K_(e){return t=>{this.Fi.enqueueAndForget(()=>this.b_===e?t():(L(mh,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class a0 extends Of{constructor(e,t,r,s,i,a){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,s,a),this.serializer=i}z_(e,t){return this.connection.P_("Listen",e,t)}j_(e){return this.onNext(e)}onNext(e){this.F_.reset();const t=fv(this.serializer,e),r=function(i){if(!("targetChange"in i))return W.min();const a=i.targetChange;return a.targetIds&&a.targetIds.length?W.min():a.readTime?At(a.readTime):W.min()}(e);return this.listener.J_(t,r)}H_(e){const t={};t.database=Ya(this.serializer),t.addTarget=function(i,a){let l;const u=a.target;if(l=Ga(u)?{documents:gv(i,u)}:{query:_v(i,u).Vt},l.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){l.resumeToken=If(i,a.resumeToken);const h=Qa(i,a.expectedCount);h!==null&&(l.expectedCount=h)}else if(a.snapshotVersion.compareTo(W.min())>0){l.readTime=Ki(i,a.snapshotVersion.toTimestamp());const h=Qa(i,a.expectedCount);h!==null&&(l.expectedCount=h)}return l}(this.serializer,e);const r=vv(this.serializer,e);r&&(t.labels=r),this.k_(t)}Y_(e){const t={};t.database=Ya(this.serializer),t.removeTarget=e,this.k_(t)}}class l0 extends Of{constructor(e,t,r,s,i,a){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,s,a),this.serializer=i}get Z_(){return this.C_>0}start(){this.lastStreamToken=void 0,super.start()}U_(){this.Z_&&this.X_([])}z_(e,t){return this.connection.P_("Write",e,t)}j_(e){return ie(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,ie(!e.writeResults||e.writeResults.length===0,55816),this.listener.ea()}onNext(e){ie(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.F_.reset();const t=mv(e.writeResults,e.commitTime),r=At(e.commitTime);return this.listener.ta(r,t)}na(){const e={};e.database=Ya(this.serializer),this.k_(e)}X_(e){const t={streamToken:this.lastStreamToken,writes:e.map(r=>pv(this.serializer,r))};this.k_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class c0{}class u0 extends c0{constructor(e,t,r,s){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=s,this.ra=!1}ia(){if(this.ra)throw new M(P.FAILED_PRECONDITION,"The client has already been terminated.")}Wo(e,t,r,s){return this.ia(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,a])=>this.connection.Wo(e,Ja(t,r),s,i,a)).catch(i=>{throw i.name==="FirebaseError"?(i.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new M(P.UNKNOWN,i.toString())})}Jo(e,t,r,s,i){return this.ia(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([a,l])=>this.connection.Jo(e,Ja(t,r),s,a,l,i)).catch(a=>{throw a.name==="FirebaseError"?(a.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new M(P.UNKNOWN,a.toString())})}terminate(){this.ra=!0,this.connection.terminate()}}class h0{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.sa=0,this.oa=null,this._a=!0}aa(){this.sa===0&&(this.ua("Unknown"),this.oa=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.oa=null,this.ca("Backend didn't respond within 10 seconds."),this.ua("Offline"),Promise.resolve())))}la(e){this.state==="Online"?this.ua("Unknown"):(this.sa++,this.sa>=1&&(this.ha(),this.ca(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ua("Offline")))}set(e){this.ha(),this.sa=0,e==="Online"&&(this._a=!1),this.ua(e)}ua(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}ca(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this._a?(jt(t),this._a=!1):L("OnlineStateTracker",t)}ha(){this.oa!==null&&(this.oa.cancel(),this.oa=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jn="RemoteStore";class d0{constructor(e,t,r,s,i){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.Pa=[],this.Ta=new Map,this.Ia=new Set,this.da=[],this.Ea=i,this.Ea.xo(a=>{r.enqueueAndForget(async()=>{er(this)&&(L(Jn,"Restarting streams for network reachability change."),await async function(u){const h=Q(u);h.Ia.add(4),await Bs(h),h.Aa.set("Unknown"),h.Ia.delete(4),await Io(h)}(this))})}),this.Aa=new h0(r,s)}}async function Io(n){if(er(n))for(const e of n.da)await e(!0)}async function Bs(n){for(const e of n.da)await e(!1)}function Mf(n,e){const t=Q(n);t.Ta.has(e.targetId)||(t.Ta.set(e.targetId,e),ql(t)?Bl(t):jr(t).x_()&&$l(t,e))}function Ul(n,e){const t=Q(n),r=jr(t);t.Ta.delete(e),r.x_()&&Lf(t,e),t.Ta.size===0&&(r.x_()?r.B_():er(t)&&t.Aa.set("Unknown"))}function $l(n,e){if(n.Ra.$e(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(W.min())>0){const t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}jr(n).H_(e)}function Lf(n,e){n.Ra.$e(e),jr(n).Y_(e)}function Bl(n){n.Ra=new ov({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),Et:e=>n.Ta.get(e)||null,lt:()=>n.datastore.serializer.databaseId}),jr(n).start(),n.Aa.aa()}function ql(n){return er(n)&&!jr(n).M_()&&n.Ta.size>0}function er(n){return Q(n).Ia.size===0}function Ff(n){n.Ra=void 0}async function f0(n){n.Aa.set("Online")}async function p0(n){n.Ta.forEach((e,t)=>{$l(n,e)})}async function m0(n,e){Ff(n),ql(n)?(n.Aa.la(e),Bl(n)):n.Aa.set("Unknown")}async function g0(n,e,t){if(n.Aa.set("Online"),e instanceof Tf&&e.state===2&&e.cause)try{await async function(s,i){const a=i.cause;for(const l of i.targetIds)s.Ta.has(l)&&(await s.remoteSyncer.rejectListen(l,a),s.Ta.delete(l),s.Ra.removeTarget(l))}(n,e)}catch(r){L(Jn,"Failed to remove targets %s: %s ",e.targetIds.join(","),r),await Ji(n,r)}else if(e instanceof ki?n.Ra.Ye(e):e instanceof wf?n.Ra.it(e):n.Ra.et(e),!t.isEqual(W.min()))try{const r=await Df(n.localStore);t.compareTo(r)>=0&&await function(i,a){const l=i.Ra.Pt(a);return l.targetChanges.forEach((u,h)=>{if(u.resumeToken.approximateByteSize()>0){const f=i.Ta.get(h);f&&i.Ta.set(h,f.withResumeToken(u.resumeToken,a))}}),l.targetMismatches.forEach((u,h)=>{const f=i.Ta.get(u);if(!f)return;i.Ta.set(u,f.withResumeToken($e.EMPTY_BYTE_STRING,f.snapshotVersion)),Lf(i,u);const m=new rn(f.target,u,h,f.sequenceNumber);$l(i,m)}),i.remoteSyncer.applyRemoteEvent(l)}(n,t)}catch(r){L(Jn,"Failed to raise snapshot:",r),await Ji(n,r)}}async function Ji(n,e,t){if(!Br(e))throw e;n.Ia.add(1),await Bs(n),n.Aa.set("Offline"),t||(t=()=>Df(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{L(Jn,"Retrying IndexedDB access"),await t(),n.Ia.delete(1),await Io(n)})}function Uf(n,e){return e().catch(t=>Ji(n,t,e))}async function bo(n){const e=Q(n),t=Tn(e);let r=e.Pa.length>0?e.Pa[e.Pa.length-1].batchId:Sl;for(;_0(e);)try{const s=await Yv(e.localStore,r);if(s===null){e.Pa.length===0&&t.B_();break}r=s.batchId,y0(e,s)}catch(s){await Ji(e,s)}$f(e)&&Bf(e)}function _0(n){return er(n)&&n.Pa.length<10}function y0(n,e){n.Pa.push(e);const t=Tn(n);t.x_()&&t.Z_&&t.X_(e.mutations)}function $f(n){return er(n)&&!Tn(n).M_()&&n.Pa.length>0}function Bf(n){Tn(n).start()}async function v0(n){Tn(n).na()}async function E0(n){const e=Tn(n);for(const t of n.Pa)e.X_(t.mutations)}async function w0(n,e,t){const r=n.Pa.shift(),s=Nl.from(r,e,t);await Uf(n,()=>n.remoteSyncer.applySuccessfulWrite(s)),await bo(n)}async function T0(n,e){e&&Tn(n).Z_&&await async function(r,s){if(function(a){return sv(a)&&a!==P.ABORTED}(s.code)){const i=r.Pa.shift();Tn(r).N_(),await Uf(r,()=>r.remoteSyncer.rejectFailedWrite(i.batchId,s)),await bo(r)}}(n,e),$f(n)&&Bf(n)}async function gh(n,e){const t=Q(n);t.asyncQueue.verifyOperationInProgress(),L(Jn,"RemoteStore received new credentials");const r=er(t);t.Ia.add(3),await Bs(t),r&&t.Aa.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.Ia.delete(3),await Io(t)}async function I0(n,e){const t=Q(n);e?(t.Ia.delete(2),await Io(t)):e||(t.Ia.add(2),await Bs(t),t.Aa.set("Unknown"))}function jr(n){return n.Va||(n.Va=function(t,r,s){const i=Q(t);return i.ia(),new a0(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(n.datastore,n.asyncQueue,{Zo:f0.bind(null,n),e_:p0.bind(null,n),n_:m0.bind(null,n),J_:g0.bind(null,n)}),n.da.push(async e=>{e?(n.Va.N_(),ql(n)?Bl(n):n.Aa.set("Unknown")):(await n.Va.stop(),Ff(n))})),n.Va}function Tn(n){return n.ma||(n.ma=function(t,r,s){const i=Q(t);return i.ia(),new l0(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(n.datastore,n.asyncQueue,{Zo:()=>Promise.resolve(),e_:v0.bind(null,n),n_:T0.bind(null,n),ea:E0.bind(null,n),ta:w0.bind(null,n)}),n.da.push(async e=>{e?(n.ma.N_(),await bo(n)):(await n.ma.stop(),n.Pa.length>0&&(L(Jn,`Stopping write stream with ${n.Pa.length} pending writes`),n.Pa=[]))})),n.ma}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jl{constructor(e,t,r,s,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new un,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(a=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,s,i){const a=Date.now()+r,l=new jl(e,t,a,s,i);return l.start(r),l}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new M(P.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function zl(n,e){if(jt("AsyncQueue",`${e}: ${n}`),Br(n))return new M(P.UNAVAILABLE,`${e}: ${n}`);throw n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vr{static emptySet(e){return new vr(e.comparator)}constructor(e){this.comparator=e?(t,r)=>e(t,r)||$.comparator(t.key,r.key):(t,r)=>$.comparator(t.key,r.key),this.keyedMap=us(),this.sortedSet=new be(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,r)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof vr)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const r=new vr;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _h{constructor(){this.fa=new be($.comparator)}track(e){const t=e.doc.key,r=this.fa.get(t);r?e.type!==0&&r.type===3?this.fa=this.fa.insert(t,e):e.type===3&&r.type!==1?this.fa=this.fa.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.fa=this.fa.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.fa=this.fa.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.fa=this.fa.remove(t):e.type===1&&r.type===2?this.fa=this.fa.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.fa=this.fa.insert(t,{type:2,doc:e.doc}):j(63341,{At:e,ga:r}):this.fa=this.fa.insert(t,e)}pa(){const e=[];return this.fa.inorderTraversal((t,r)=>{e.push(r)}),e}}class Nr{constructor(e,t,r,s,i,a,l,u,h){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=a,this.syncStateChanged=l,this.excludesMetadataChanges=u,this.hasCachedResults=h}static fromInitialDocuments(e,t,r,s,i){const a=[];return t.forEach(l=>{a.push({type:0,doc:l})}),new Nr(e,t,vr.emptySet(t),a,r,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&_o(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let s=0;s<t.length;s++)if(t[s].type!==r[s].type||!t[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class b0{constructor(){this.ya=void 0,this.wa=[]}Sa(){return this.wa.some(e=>e.ba())}}class A0{constructor(){this.queries=yh(),this.onlineState="Unknown",this.Da=new Set}terminate(){(function(t,r){const s=Q(t),i=s.queries;s.queries=yh(),i.forEach((a,l)=>{for(const u of l.wa)u.onError(r)})})(this,new M(P.ABORTED,"Firestore shutting down"))}}function yh(){return new Zn(n=>af(n),_o)}async function qf(n,e){const t=Q(n);let r=3;const s=e.query;let i=t.queries.get(s);i?!i.Sa()&&e.ba()&&(r=2):(i=new b0,r=e.ba()?0:1);try{switch(r){case 0:i.ya=await t.onListen(s,!0);break;case 1:i.ya=await t.onListen(s,!1);break;case 2:await t.onFirstRemoteStoreListen(s)}}catch(a){const l=zl(a,`Initialization of query '${dr(e.query)}' failed`);return void e.onError(l)}t.queries.set(s,i),i.wa.push(e),e.va(t.onlineState),i.ya&&e.Ca(i.ya)&&Hl(t)}async function jf(n,e){const t=Q(n),r=e.query;let s=3;const i=t.queries.get(r);if(i){const a=i.wa.indexOf(e);a>=0&&(i.wa.splice(a,1),i.wa.length===0?s=e.ba()?0:1:!i.Sa()&&e.ba()&&(s=2))}switch(s){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function S0(n,e){const t=Q(n);let r=!1;for(const s of e){const i=s.query,a=t.queries.get(i);if(a){for(const l of a.wa)l.Ca(s)&&(r=!0);a.ya=s}}r&&Hl(t)}function R0(n,e,t){const r=Q(n),s=r.queries.get(e);if(s)for(const i of s.wa)i.onError(t);r.queries.delete(e)}function Hl(n){n.Da.forEach(e=>{e.next()})}var tl,vh;(vh=tl||(tl={})).Fa="default",vh.Cache="cache";class zf{constructor(e,t,r){this.query=e,this.Ma=t,this.xa=!1,this.Oa=null,this.onlineState="Unknown",this.options=r||{}}Ca(e){if(!this.options.includeMetadataChanges){const r=[];for(const s of e.docChanges)s.type!==3&&r.push(s);e=new Nr(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.xa?this.Na(e)&&(this.Ma.next(e),t=!0):this.Ba(e,this.onlineState)&&(this.La(e),t=!0),this.Oa=e,t}onError(e){this.Ma.error(e)}va(e){this.onlineState=e;let t=!1;return this.Oa&&!this.xa&&this.Ba(this.Oa,e)&&(this.La(this.Oa),t=!0),t}Ba(e,t){if(!e.fromCache||!this.ba())return!0;const r=t!=="Offline";return(!this.options.ka||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}Na(e){if(e.docChanges.length>0)return!0;const t=this.Oa&&this.Oa.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}La(e){e=Nr.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.xa=!0,this.Ma.next(e)}ba(){return this.options.source!==tl.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hf{constructor(e){this.key=e}}class Gf{constructor(e){this.key=e}}class k0{constructor(e,t){this.query=e,this.Ha=t,this.Ya=null,this.hasCachedResults=!1,this.current=!1,this.Za=Z(),this.mutatedKeys=Z(),this.Xa=lf(e),this.eu=new vr(this.Xa)}get tu(){return this.Ha}nu(e,t){const r=t?t.ru:new _h,s=t?t.eu:this.eu;let i=t?t.mutatedKeys:this.mutatedKeys,a=s,l=!1;const u=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,h=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal((f,m)=>{const g=s.get(f),S=yo(this.query,m)?m:null,k=!!g&&this.mutatedKeys.has(g.key),N=!!S&&(S.hasLocalMutations||this.mutatedKeys.has(S.key)&&S.hasCommittedMutations);let V=!1;g&&S?g.data.isEqual(S.data)?k!==N&&(r.track({type:3,doc:S}),V=!0):this.iu(g,S)||(r.track({type:2,doc:S}),V=!0,(u&&this.Xa(S,u)>0||h&&this.Xa(S,h)<0)&&(l=!0)):!g&&S?(r.track({type:0,doc:S}),V=!0):g&&!S&&(r.track({type:1,doc:g}),V=!0,(u||h)&&(l=!0)),V&&(S?(a=a.add(S),i=N?i.add(f):i.delete(f)):(a=a.delete(f),i=i.delete(f)))}),this.query.limit!==null)for(;a.size>this.query.limit;){const f=this.query.limitType==="F"?a.last():a.first();a=a.delete(f.key),i=i.delete(f.key),r.track({type:1,doc:f})}return{eu:a,ru:r,Ds:l,mutatedKeys:i}}iu(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,s){const i=this.eu;this.eu=e.eu,this.mutatedKeys=e.mutatedKeys;const a=e.ru.pa();a.sort((f,m)=>function(S,k){const N=V=>{switch(V){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return j(20277,{At:V})}};return N(S)-N(k)}(f.type,m.type)||this.Xa(f.doc,m.doc)),this.su(r),s=s!=null&&s;const l=t&&!s?this.ou():[],u=this.Za.size===0&&this.current&&!s?1:0,h=u!==this.Ya;return this.Ya=u,a.length!==0||h?{snapshot:new Nr(this.query,e.eu,i,a,e.mutatedKeys,u===0,h,!1,!!r&&r.resumeToken.approximateByteSize()>0),_u:l}:{_u:l}}va(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({eu:this.eu,ru:new _h,mutatedKeys:this.mutatedKeys,Ds:!1},!1)):{_u:[]}}au(e){return!this.Ha.has(e)&&!!this.eu.has(e)&&!this.eu.get(e).hasLocalMutations}su(e){e&&(e.addedDocuments.forEach(t=>this.Ha=this.Ha.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.Ha=this.Ha.delete(t)),this.current=e.current)}ou(){if(!this.current)return[];const e=this.Za;this.Za=Z(),this.eu.forEach(r=>{this.au(r.key)&&(this.Za=this.Za.add(r.key))});const t=[];return e.forEach(r=>{this.Za.has(r)||t.push(new Gf(r))}),this.Za.forEach(r=>{e.has(r)||t.push(new Hf(r))}),t}uu(e){this.Ha=e.qs,this.Za=Z();const t=this.nu(e.documents);return this.applyChanges(t,!0)}cu(){return Nr.fromInitialDocuments(this.query,this.eu,this.mutatedKeys,this.Ya===0,this.hasCachedResults)}}const Gl="SyncEngine";class P0{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class C0{constructor(e){this.key=e,this.lu=!1}}class V0{constructor(e,t,r,s,i,a){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=a,this.hu={},this.Pu=new Zn(l=>af(l),_o),this.Tu=new Map,this.Iu=new Set,this.du=new be($.comparator),this.Eu=new Map,this.Au=new Ol,this.Ru={},this.Vu=new Map,this.mu=Vr.ur(),this.onlineState="Unknown",this.fu=void 0}get isPrimaryClient(){return this.fu===!0}}async function N0(n,e,t=!0){const r=Yf(n);let s;const i=r.Pu.get(e);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.cu()):s=await Wf(r,e,t,!0),s}async function D0(n,e){const t=Yf(n);await Wf(t,e,!0,!1)}async function Wf(n,e,t,r){const s=await Zv(n.localStore,bt(e)),i=s.targetId,a=n.sharedClientState.addLocalQueryTarget(i,t);let l;return r&&(l=await x0(n,e,i,a==="current",s.resumeToken)),n.isPrimaryClient&&t&&Mf(n.remoteStore,s),l}async function x0(n,e,t,r,s){n.gu=(m,g,S)=>async function(N,V,G,z){let X=V.view.nu(G);X.Ds&&(X=await hh(N.localStore,V.query,!1).then(({documents:w})=>V.view.nu(w,X)));const fe=z&&z.targetChanges.get(V.targetId),tt=z&&z.targetMismatches.get(V.targetId)!=null,ve=V.view.applyChanges(X,N.isPrimaryClient,fe,tt);return wh(N,V.targetId,ve._u),ve.snapshot}(n,m,g,S);const i=await hh(n.localStore,e,!0),a=new k0(e,i.qs),l=a.nu(i.documents),u=$s.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",s),h=a.applyChanges(l,n.isPrimaryClient,u);wh(n,t,h._u);const f=new P0(e,t,a);return n.Pu.set(e,f),n.Tu.has(t)?n.Tu.get(t).push(e):n.Tu.set(t,[e]),h.snapshot}async function O0(n,e,t){const r=Q(n),s=r.Pu.get(e),i=r.Tu.get(s.targetId);if(i.length>1)return r.Tu.set(s.targetId,i.filter(a=>!_o(a,e))),void r.Pu.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await Za(r.localStore,s.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(s.targetId),t&&Ul(r.remoteStore,s.targetId),nl(r,s.targetId)}).catch($r)):(nl(r,s.targetId),await Za(r.localStore,s.targetId,!0))}async function M0(n,e){const t=Q(n),r=t.Pu.get(e),s=t.Tu.get(r.targetId);t.isPrimaryClient&&s.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),Ul(t.remoteStore,r.targetId))}async function L0(n,e,t){const r=z0(n);try{const s=await function(a,l){const u=Q(a),h=ge.now(),f=l.reduce((S,k)=>S.add(k.key),Z());let m,g;return u.persistence.runTransaction("Locally write mutations","readwrite",S=>{let k=zt(),N=Z();return u.Os.getEntries(S,f).next(V=>{k=V,k.forEach((G,z)=>{z.isValidDocument()||(N=N.add(G))})}).next(()=>u.localDocuments.getOverlayedDocuments(S,k)).next(V=>{m=V;const G=[];for(const z of l){const X=Zy(z,m.get(z.key).overlayedDocument);X!=null&&G.push(new Sn(z.key,X,Yd(X.value.mapValue),gt.exists(!0)))}return u.mutationQueue.addMutationBatch(S,h,G,l)}).next(V=>{g=V;const G=V.applyToLocalDocumentSet(m,N);return u.documentOverlayCache.saveOverlays(S,V.batchId,G)})}).then(()=>({batchId:g.batchId,changes:uf(m)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(s.batchId),function(a,l,u){let h=a.Ru[a.currentUser.toKey()];h||(h=new be(J)),h=h.insert(l,u),a.Ru[a.currentUser.toKey()]=h}(r,s.batchId,t),await qs(r,s.changes),await bo(r.remoteStore)}catch(s){const i=zl(s,"Failed to persist write");t.reject(i)}}async function Kf(n,e){const t=Q(n);try{const r=await Jv(t.localStore,e);e.targetChanges.forEach((s,i)=>{const a=t.Eu.get(i);a&&(ie(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?a.lu=!0:s.modifiedDocuments.size>0?ie(a.lu,14607):s.removedDocuments.size>0&&(ie(a.lu,42227),a.lu=!1))}),await qs(t,r,e)}catch(r){await $r(r)}}function Eh(n,e,t){const r=Q(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){const s=[];r.Pu.forEach((i,a)=>{const l=a.view.va(e);l.snapshot&&s.push(l.snapshot)}),function(a,l){const u=Q(a);u.onlineState=l;let h=!1;u.queries.forEach((f,m)=>{for(const g of m.wa)g.va(l)&&(h=!0)}),h&&Hl(u)}(r.eventManager,e),s.length&&r.hu.J_(s),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function F0(n,e,t){const r=Q(n);r.sharedClientState.updateQueryState(e,"rejected",t);const s=r.Eu.get(e),i=s&&s.key;if(i){let a=new be($.comparator);a=a.insert(i,Qe.newNoDocument(i,W.min()));const l=Z().add(i),u=new wo(W.min(),new Map,new be(J),a,l);await Kf(r,u),r.du=r.du.remove(i),r.Eu.delete(e),Wl(r)}else await Za(r.localStore,e,!1).then(()=>nl(r,e,t)).catch($r)}async function U0(n,e){const t=Q(n),r=e.batch.batchId;try{const s=await Qv(t.localStore,e);Jf(t,r,null),Qf(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await qs(t,s)}catch(s){await $r(s)}}async function $0(n,e,t){const r=Q(n);try{const s=await function(a,l){const u=Q(a);return u.persistence.runTransaction("Reject batch","readwrite-primary",h=>{let f;return u.mutationQueue.lookupMutationBatch(h,l).next(m=>(ie(m!==null,37113),f=m.keys(),u.mutationQueue.removeMutationBatch(h,m))).next(()=>u.mutationQueue.performConsistencyCheck(h)).next(()=>u.documentOverlayCache.removeOverlaysForBatchId(h,f,l)).next(()=>u.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(h,f)).next(()=>u.localDocuments.getDocuments(h,f))})}(r.localStore,e);Jf(r,e,t),Qf(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await qs(r,s)}catch(s){await $r(s)}}function Qf(n,e){(n.Vu.get(e)||[]).forEach(t=>{t.resolve()}),n.Vu.delete(e)}function Jf(n,e,t){const r=Q(n);let s=r.Ru[r.currentUser.toKey()];if(s){const i=s.get(e);i&&(t?i.reject(t):i.resolve(),s=s.remove(e)),r.Ru[r.currentUser.toKey()]=s}}function nl(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const r of n.Tu.get(e))n.Pu.delete(r),t&&n.hu.pu(r,t);n.Tu.delete(e),n.isPrimaryClient&&n.Au.zr(e).forEach(r=>{n.Au.containsKey(r)||Xf(n,r)})}function Xf(n,e){n.Iu.delete(e.path.canonicalString());const t=n.du.get(e);t!==null&&(Ul(n.remoteStore,t),n.du=n.du.remove(e),n.Eu.delete(t),Wl(n))}function wh(n,e,t){for(const r of t)r instanceof Hf?(n.Au.addReference(r.key,e),B0(n,r)):r instanceof Gf?(L(Gl,"Document no longer in limbo: "+r.key),n.Au.removeReference(r.key,e),n.Au.containsKey(r.key)||Xf(n,r.key)):j(19791,{yu:r})}function B0(n,e){const t=e.key,r=t.path.canonicalString();n.du.get(t)||n.Iu.has(r)||(L(Gl,"New document in limbo: "+t),n.Iu.add(r),Wl(n))}function Wl(n){for(;n.Iu.size>0&&n.du.size<n.maxConcurrentLimboResolutions;){const e=n.Iu.values().next().value;n.Iu.delete(e);const t=new $(de.fromString(e)),r=n.mu.next();n.Eu.set(r,new C0(t)),n.du=n.du.insert(t,r),Mf(n.remoteStore,new rn(bt(go(t.path)),r,"TargetPurposeLimboResolution",fo.ue))}}async function qs(n,e,t){const r=Q(n),s=[],i=[],a=[];r.Pu.isEmpty()||(r.Pu.forEach((l,u)=>{a.push(r.gu(u,e,t).then(h=>{var f;if((h||t)&&r.isPrimaryClient){const m=h?!h.fromCache:(f=t==null?void 0:t.targetChanges.get(u.targetId))===null||f===void 0?void 0:f.current;r.sharedClientState.updateQueryState(u.targetId,m?"current":"not-current")}if(h){s.push(h);const m=Ll.Es(u.targetId,h);i.push(m)}}))}),await Promise.all(a),r.hu.J_(s),await async function(u,h){const f=Q(u);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",m=>C.forEach(h,g=>C.forEach(g.Is,S=>f.persistence.referenceDelegate.addReference(m,g.targetId,S)).next(()=>C.forEach(g.ds,S=>f.persistence.referenceDelegate.removeReference(m,g.targetId,S)))))}catch(m){if(!Br(m))throw m;L(Fl,"Failed to update sequence numbers: "+m)}for(const m of h){const g=m.targetId;if(!m.fromCache){const S=f.Fs.get(g),k=S.snapshotVersion,N=S.withLastLimboFreeSnapshotVersion(k);f.Fs=f.Fs.insert(g,N)}}}(r.localStore,i))}async function q0(n,e){const t=Q(n);if(!t.currentUser.isEqual(e)){L(Gl,"User change. New user:",e.toKey());const r=await Nf(t.localStore,e);t.currentUser=e,function(i,a){i.Vu.forEach(l=>{l.forEach(u=>{u.reject(new M(P.CANCELLED,a))})}),i.Vu.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await qs(t,r.Bs)}}function j0(n,e){const t=Q(n),r=t.Eu.get(e);if(r&&r.lu)return Z().add(r.key);{let s=Z();const i=t.Tu.get(e);if(!i)return s;for(const a of i){const l=t.Pu.get(a);s=s.unionWith(l.view.tu)}return s}}function Yf(n){const e=Q(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=Kf.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=j0.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=F0.bind(null,e),e.hu.J_=S0.bind(null,e.eventManager),e.hu.pu=R0.bind(null,e.eventManager),e}function z0(n){const e=Q(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=U0.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=$0.bind(null,e),e}class Xi{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=To(e.databaseInfo.databaseId),this.sharedClientState=this.bu(e),this.persistence=this.Du(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Cu(e,this.localStore),this.indexBackfillerScheduler=this.Fu(e,this.localStore)}Cu(e,t){return null}Fu(e,t){return null}vu(e){return Kv(this.persistence,new Hv,e.initialUser,this.serializer)}Du(e){return new Vf(Ml.Vi,this.serializer)}bu(e){return new t0}async terminate(){var e,t;(e=this.gcScheduler)===null||e===void 0||e.stop(),(t=this.indexBackfillerScheduler)===null||t===void 0||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Xi.provider={build:()=>new Xi};class H0 extends Xi{constructor(e){super(),this.cacheSizeBytes=e}Cu(e,t){ie(this.persistence.referenceDelegate instanceof Qi,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new Cv(r,e.asyncQueue,t)}Du(e){const t=this.cacheSizeBytes!==void 0?nt.withCacheSize(this.cacheSizeBytes):nt.DEFAULT;return new Vf(r=>Qi.Vi(r,t),this.serializer)}}class rl{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>Eh(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=q0.bind(null,this.syncEngine),await I0(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new A0}()}createDatastore(e){const t=To(e.databaseInfo.databaseId),r=function(i){return new o0(i)}(e.databaseInfo);return function(i,a,l,u){return new u0(i,a,l,u)}(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return function(r,s,i,a,l){return new d0(r,s,i,a,l)}(this.localStore,this.datastore,e.asyncQueue,t=>Eh(this.syncEngine,t,0),function(){return ph.C()?new ph:new n0}())}createSyncEngine(e,t){return function(s,i,a,l,u,h,f){const m=new V0(s,i,a,l,u,h);return f&&(m.fu=!0),m}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(s){const i=Q(s);L(Jn,"RemoteStore shutting down."),i.Ia.add(5),await Bs(i),i.Ea.shutdown(),i.Aa.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(t=this.eventManager)===null||t===void 0||t.terminate()}}rl.provider={build:()=>new rl};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zf{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.xu(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.xu(this.observer.error,e):jt("Uncaught Error in snapshot listener:",e.toString()))}Ou(){this.muted=!0}xu(e,t){setTimeout(()=>{this.muted||e(t)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const In="FirestoreClient";class G0{constructor(e,t,r,s,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this.databaseInfo=s,this.user=Ke.UNAUTHENTICATED,this.clientId=Al.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(r,async a=>{L(In,"Received user=",a.uid),await this.authCredentialListener(a),this.user=a}),this.appCheckCredentials.start(r,a=>(L(In,"Received new app check token=",a),this.appCheckCredentialListener(a,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new un;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=zl(t,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function va(n,e){n.asyncQueue.verifyOperationInProgress(),L(In,"Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener(async s=>{r.isEqual(s)||(await Nf(e.localStore,s),r=s)}),e.persistence.setDatabaseDeletedListener(()=>{_n("Terminating Firestore due to IndexedDb database deletion"),n.terminate().then(()=>{L("Terminating Firestore due to IndexedDb database deletion completed successfully")}).catch(s=>{_n("Terminating Firestore due to IndexedDb database deletion failed",s)})}),n._offlineComponents=e}async function Th(n,e){n.asyncQueue.verifyOperationInProgress();const t=await W0(n);L(In,"Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener(r=>gh(e.remoteStore,r)),n.setAppCheckTokenChangeListener((r,s)=>gh(e.remoteStore,s)),n._onlineComponents=e}async function W0(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){L(In,"Using user provided OfflineComponentProvider");try{await va(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!function(s){return s.name==="FirebaseError"?s.code===P.FAILED_PRECONDITION||s.code===P.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11}(t))throw t;_n("Error using user provided cache. Falling back to memory cache: "+t),await va(n,new Xi)}}else L(In,"Using default OfflineComponentProvider"),await va(n,new H0(void 0));return n._offlineComponents}async function ep(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(L(In,"Using user provided OnlineComponentProvider"),await Th(n,n._uninitializedComponentsProvider._online)):(L(In,"Using default OnlineComponentProvider"),await Th(n,new rl))),n._onlineComponents}function K0(n){return ep(n).then(e=>e.syncEngine)}async function sl(n){const e=await ep(n),t=e.eventManager;return t.onListen=N0.bind(null,e.syncEngine),t.onUnlisten=O0.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=D0.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=M0.bind(null,e.syncEngine),t}function Q0(n,e,t={}){const r=new un;return n.asyncQueue.enqueueAndForget(async()=>function(i,a,l,u,h){const f=new Zf({next:g=>{f.Ou(),a.enqueueAndForget(()=>jf(i,m));const S=g.docs.has(l);!S&&g.fromCache?h.reject(new M(P.UNAVAILABLE,"Failed to get document because the client is offline.")):S&&g.fromCache&&u&&u.source==="server"?h.reject(new M(P.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):h.resolve(g)},error:g=>h.reject(g)}),m=new zf(go(l.path),f,{includeMetadataChanges:!0,ka:!0});return qf(i,m)}(await sl(n),n.asyncQueue,e,t,r)),r.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tp(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ih=new Map;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const np="firestore.googleapis.com",bh=!0;class Ah{constructor(e){var t,r;if(e.host===void 0){if(e.ssl!==void 0)throw new M(P.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=np,this.ssl=bh}else this.host=e.host,this.ssl=(t=e.ssl)!==null&&t!==void 0?t:bh;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=Cf;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<kv)throw new M(P.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}dy("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=tp((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(i){if(i.timeoutSeconds!==void 0){if(isNaN(i.timeoutSeconds))throw new M(P.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (must not be NaN)`);if(i.timeoutSeconds<5)throw new M(P.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (minimum allowed value is 5)`);if(i.timeoutSeconds>30)throw new M(P.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,s){return r.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Ao{constructor(e,t,r,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Ah({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new M(P.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new M(P.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Ah(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new ry;switch(r.type){case"firstParty":return new ay(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new M(P.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const r=Ih.get(t);r&&(L("ComponentProvider","Removing Datastore"),Ih.delete(t),r.terminate())}(this),Promise.resolve()}}function J0(n,e,t,r={}){var s;n=mt(n,Ao);const i=Lr(e),a=n._getSettings(),l=Object.assign(Object.assign({},a),{emulatorOptions:n._getEmulatorOptions()}),u=`${e}:${t}`;i&&(bd(`https://${u}`),Ad("Firestore",!0)),a.host!==np&&a.host!==u&&_n("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const h=Object.assign(Object.assign({},a),{host:u,ssl:i,emulatorOptions:r});if(!Wn(h,l)&&(n._setSettings(h),r.mockUserToken)){let f,m;if(typeof r.mockUserToken=="string")f=r.mockUserToken,m=Ke.MOCK_USER;else{f=Cg(r.mockUserToken,(s=n._app)===null||s===void 0?void 0:s.options.projectId);const g=r.mockUserToken.sub||r.mockUserToken.user_id;if(!g)throw new M(P.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");m=new Ke(g)}n._authCredentials=new sy(new Ud(f,m))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tr{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new tr(this.firestore,e,this._query)}}class Se{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new hn(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new Se(this.firestore,e,this._key)}toJSON(){return{type:Se._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,r){if(Fs(t,Se._jsonSchema))return new Se(e,r||null,new $(de.fromString(t.referencePath)))}}Se._jsonSchemaVersion="firestore/documentReference/1.0",Se._jsonSchema={type:Ce("string",Se._jsonSchemaVersion),referencePath:Ce("string")};class hn extends tr{constructor(e,t,r){super(e,t,go(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new Se(this.firestore,null,new $(e))}withConverter(e){return new hn(this.firestore,e,this._path)}}function Ea(n,e,...t){if(n=Ue(n),Bd("collection","path",e),n instanceof Ao){const r=de.fromString(e,...t);return Fu(r),new hn(n,null,r)}{if(!(n instanceof Se||n instanceof hn))throw new M(P.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(de.fromString(e,...t));return Fu(r),new hn(n.firestore,null,r)}}function Mn(n,e,...t){if(n=Ue(n),arguments.length===1&&(e=Al.newId()),Bd("doc","path",e),n instanceof Ao){const r=de.fromString(e,...t);return Lu(r),new Se(n,null,new $(r))}{if(!(n instanceof Se||n instanceof hn))throw new M(P.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(de.fromString(e,...t));return Lu(r),new Se(n.firestore,n instanceof hn?n.converter:null,new $(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sh="AsyncQueue";class Rh{constructor(e=Promise.resolve()){this.Zu=[],this.Xu=!1,this.ec=[],this.tc=null,this.nc=!1,this.rc=!1,this.sc=[],this.F_=new xf(this,"async_queue_retry"),this.oc=()=>{const r=ya();r&&L(Sh,"Visibility state changed to "+r.visibilityState),this.F_.y_()},this._c=e;const t=ya();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.oc)}get isShuttingDown(){return this.Xu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.ac(),this.uc(e)}enterRestrictedMode(e){if(!this.Xu){this.Xu=!0,this.rc=e||!1;const t=ya();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.oc)}}enqueue(e){if(this.ac(),this.Xu)return new Promise(()=>{});const t=new un;return this.uc(()=>this.Xu&&this.rc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Zu.push(e),this.cc()))}async cc(){if(this.Zu.length!==0){try{await this.Zu[0](),this.Zu.shift(),this.F_.reset()}catch(e){if(!Br(e))throw e;L(Sh,"Operation failed with retryable error: "+e)}this.Zu.length>0&&this.F_.g_(()=>this.cc())}}uc(e){const t=this._c.then(()=>(this.nc=!0,e().catch(r=>{throw this.tc=r,this.nc=!1,jt("INTERNAL UNHANDLED ERROR: ",kh(r)),r}).then(r=>(this.nc=!1,r))));return this._c=t,t}enqueueAfterDelay(e,t,r){this.ac(),this.sc.indexOf(e)>-1&&(t=0);const s=jl.createAndSchedule(this,e,t,r,i=>this.lc(i));return this.ec.push(s),s}ac(){this.tc&&j(47125,{hc:kh(this.tc)})}verifyOperationInProgress(){}async Pc(){let e;do e=this._c,await e;while(e!==this._c)}Tc(e){for(const t of this.ec)if(t.timerId===e)return!0;return!1}Ic(e){return this.Pc().then(()=>{this.ec.sort((t,r)=>t.targetTimeMs-r.targetTimeMs);for(const t of this.ec)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Pc()})}dc(e){this.sc.push(e)}lc(e){const t=this.ec.indexOf(e);this.ec.splice(t,1)}}function kh(n){let e=n.message||"";return n.stack&&(e=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ph(n){return function(t,r){if(typeof t!="object"||t===null)return!1;const s=t;for(const i of r)if(i in s&&typeof s[i]=="function")return!0;return!1}(n,["next","error","complete"])}class Xn extends Ao{constructor(e,t,r,s){super(e,t,r,s),this.type="firestore",this._queue=new Rh,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Rh(e),this._firestoreClient=void 0,await e}}}function X0(n,e){const t=typeof n=="object"?n:Pd(),r=typeof n=="string"?n:zi,s=Il(t,"firestore").getImmediate({identifier:r});if(!s._initialized){const i=kg("firestore");i&&J0(s,...i)}return s}function Kl(n){if(n._terminated)throw new M(P.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||Y0(n),n._firestoreClient}function Y0(n){var e,t,r;const s=n._freezeSettings(),i=function(l,u,h,f){return new Iy(l,u,h,f.host,f.ssl,f.experimentalForceLongPolling,f.experimentalAutoDetectLongPolling,tp(f.experimentalLongPollingOptions),f.useFetchStreams,f.isUsingEmulator)}(n._databaseId,((e=n._app)===null||e===void 0?void 0:e.options.appId)||"",n._persistenceKey,s);n._componentsProvider||!((t=s.localCache)===null||t===void 0)&&t._offlineComponentProvider&&(!((r=s.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(n._componentsProvider={_offline:s.localCache._offlineComponentProvider,_online:s.localCache._onlineComponentProvider}),n._firestoreClient=new G0(n._authCredentials,n._appCheckCredentials,n._queue,i,n._componentsProvider&&function(l){const u=l==null?void 0:l._online.build();return{_offline:l==null?void 0:l._offline.build(u),_online:u}}(n._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ct{constructor(e){this._byteString=e}static fromBase64String(e){try{return new ct($e.fromBase64String(e))}catch(t){throw new M(P.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new ct($e.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:ct._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(Fs(e,ct._jsonSchema))return ct.fromBase64String(e.bytes)}}ct._jsonSchemaVersion="firestore/bytes/1.0",ct._jsonSchema={type:Ce("string",ct._jsonSchemaVersion),bytes:Ce("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class So{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new M(P.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Le(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ro{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class St{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new M(P.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new M(P.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return J(this._lat,e._lat)||J(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:St._jsonSchemaVersion}}static fromJSON(e){if(Fs(e,St._jsonSchema))return new St(e.latitude,e.longitude)}}St._jsonSchemaVersion="firestore/geoPoint/1.0",St._jsonSchema={type:Ce("string",St._jsonSchemaVersion),latitude:Ce("number"),longitude:Ce("number")};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rt{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,s){if(r.length!==s.length)return!1;for(let i=0;i<r.length;++i)if(r[i]!==s[i])return!1;return!0}(this._values,e._values)}toJSON(){return{type:Rt._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(Fs(e,Rt._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(t=>typeof t=="number"))return new Rt(e.vectorValues);throw new M(P.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}Rt._jsonSchemaVersion="firestore/vectorValue/1.0",Rt._jsonSchema={type:Ce("string",Rt._jsonSchemaVersion),vectorValues:Ce("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Z0=/^__.*__$/;class eE{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new Sn(e,this.data,this.fieldMask,t,this.fieldTransforms):new Us(e,this.data,t,this.fieldTransforms)}}class rp{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return new Sn(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function sp(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw j(40011,{Ec:n})}}class Ql{constructor(e,t,r,s,i,a){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=s,i===void 0&&this.Ac(),this.fieldTransforms=i||[],this.fieldMask=a||[]}get path(){return this.settings.path}get Ec(){return this.settings.Ec}Rc(e){return new Ql(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Vc(e){var t;const r=(t=this.path)===null||t===void 0?void 0:t.child(e),s=this.Rc({path:r,mc:!1});return s.fc(e),s}gc(e){var t;const r=(t=this.path)===null||t===void 0?void 0:t.child(e),s=this.Rc({path:r,mc:!1});return s.Ac(),s}yc(e){return this.Rc({path:void 0,mc:!0})}wc(e){return Yi(e,this.settings.methodName,this.settings.Sc||!1,this.path,this.settings.bc)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}Ac(){if(this.path)for(let e=0;e<this.path.length;e++)this.fc(this.path.get(e))}fc(e){if(e.length===0)throw this.wc("Document fields must not be empty");if(sp(this.Ec)&&Z0.test(e))throw this.wc('Document fields cannot begin and end with "__"')}}class tE{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||To(e)}Dc(e,t,r,s=!1){return new Ql({Ec:e,methodName:t,bc:r,path:Le.emptyPath(),mc:!1,Sc:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function ko(n){const e=n._freezeSettings(),t=To(n._databaseId);return new tE(n._databaseId,!!e.ignoreUndefinedProperties,t)}function ip(n,e,t,r,s,i={}){const a=n.Dc(i.merge||i.mergeFields?2:0,e,t,s);Xl("Data must be an object, but it was:",a,r);const l=op(r,a);let u,h;if(i.merge)u=new ot(a.fieldMask),h=a.fieldTransforms;else if(i.mergeFields){const f=[];for(const m of i.mergeFields){const g=il(e,m,t);if(!a.contains(g))throw new M(P.INVALID_ARGUMENT,`Field '${g}' is specified in your field mask but missing from your input data.`);lp(f,g)||f.push(g)}u=new ot(f),h=a.fieldTransforms.filter(m=>u.covers(m.field))}else u=null,h=a.fieldTransforms;return new eE(new rt(l),u,h)}class Po extends Ro{_toFieldTransform(e){if(e.Ec!==2)throw e.Ec===1?e.wc(`${this._methodName}() can only appear at the top level of your update data`):e.wc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof Po}}class Jl extends Ro{_toFieldTransform(e){return new Qy(e.path,new Ps)}isEqual(e){return e instanceof Jl}}function nE(n,e,t,r){const s=n.Dc(1,e,t);Xl("Data must be an object, but it was:",s,r);const i=[],a=rt.empty();An(r,(u,h)=>{const f=Yl(e,u,t);h=Ue(h);const m=s.gc(f);if(h instanceof Po)i.push(f);else{const g=js(h,m);g!=null&&(i.push(f),a.set(f,g))}});const l=new ot(i);return new rp(a,l,s.fieldTransforms)}function rE(n,e,t,r,s,i){const a=n.Dc(1,e,t),l=[il(e,r,t)],u=[s];if(i.length%2!=0)throw new M(P.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let g=0;g<i.length;g+=2)l.push(il(e,i[g])),u.push(i[g+1]);const h=[],f=rt.empty();for(let g=l.length-1;g>=0;--g)if(!lp(h,l[g])){const S=l[g];let k=u[g];k=Ue(k);const N=a.gc(S);if(k instanceof Po)h.push(S);else{const V=js(k,N);V!=null&&(h.push(S),f.set(S,V))}}const m=new ot(h);return new rp(f,m,a.fieldTransforms)}function sE(n,e,t,r=!1){return js(t,n.Dc(r?4:3,e))}function js(n,e){if(ap(n=Ue(n)))return Xl("Unsupported field value:",e,n),op(n,e);if(n instanceof Ro)return function(r,s){if(!sp(s.Ec))throw s.wc(`${r._methodName}() can only be used with update() and set()`);if(!s.path)throw s.wc(`${r._methodName}() is not currently supported inside arrays`);const i=r._toFieldTransform(s);i&&s.fieldTransforms.push(i)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.mc&&e.Ec!==4)throw e.wc("Nested arrays are not supported");return function(r,s){const i=[];let a=0;for(const l of r){let u=js(l,s.yc(a));u==null&&(u={nullValue:"NULL_VALUE"}),i.push(u),a++}return{arrayValue:{values:i}}}(n,e)}return function(r,s){if((r=Ue(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return Gy(s.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const i=ge.fromDate(r);return{timestampValue:Ki(s.serializer,i)}}if(r instanceof ge){const i=new ge(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:Ki(s.serializer,i)}}if(r instanceof St)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof ct)return{bytesValue:If(s.serializer,r._byteString)};if(r instanceof Se){const i=s.databaseId,a=r.firestore._databaseId;if(!a.isEqual(i))throw s.wc(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:xl(r.firestore._databaseId||s.databaseId,r._key.path)}}if(r instanceof Rt)return function(a,l){return{mapValue:{fields:{[Jd]:{stringValue:Xd},[Hi]:{arrayValue:{values:a.toArray().map(h=>{if(typeof h!="number")throw l.wc("VectorValues must only contain numeric values.");return Vl(l.serializer,h)})}}}}}}(r,s);throw s.wc(`Unsupported field value: ${ho(r)}`)}(n,e)}function op(n,e){const t={};return zd(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):An(n,(r,s)=>{const i=js(s,e.Vc(r));i!=null&&(t[r]=i)}),{mapValue:{fields:t}}}function ap(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof ge||n instanceof St||n instanceof ct||n instanceof Se||n instanceof Ro||n instanceof Rt)}function Xl(n,e,t){if(!ap(t)||!qd(t)){const r=ho(t);throw r==="an object"?e.wc(n+" a custom object"):e.wc(n+" "+r)}}function il(n,e,t){if((e=Ue(e))instanceof So)return e._internalPath;if(typeof e=="string")return Yl(n,e);throw Yi("Field path arguments must be of type string or ",n,!1,void 0,t)}const iE=new RegExp("[~\\*/\\[\\]]");function Yl(n,e,t){if(e.search(iE)>=0)throw Yi(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new So(...e.split("."))._internalPath}catch{throw Yi(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function Yi(n,e,t,r,s){const i=r&&!r.isEmpty(),a=s!==void 0;let l=`Function ${e}() called with invalid data`;t&&(l+=" (via `toFirestore()`)"),l+=". ";let u="";return(i||a)&&(u+=" (found",i&&(u+=` in field ${r}`),a&&(u+=` in document ${s}`),u+=")"),new M(P.INVALID_ARGUMENT,l+n+u)}function lp(n,e){return n.some(t=>t.isEqual(e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cp{constructor(e,t,r,s,i){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new Se(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new oE(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(Zl("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class oE extends cp{data(){return super.data()}}function Zl(n,e){return typeof e=="string"?Yl(n,e):e instanceof So?e._internalPath:e._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function aE(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new M(P.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class ec{}class up extends ec{}function lE(n,e,...t){let r=[];e instanceof ec&&r.push(e),r=r.concat(t),function(i){const a=i.filter(u=>u instanceof nc).length,l=i.filter(u=>u instanceof tc).length;if(a>1||a>0&&l>0)throw new M(P.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(const s of r)n=s._apply(n);return n}class tc extends up{constructor(e,t,r){super(),this._field=e,this._op=t,this._value=r,this.type="where"}static _create(e,t,r){return new tc(e,t,r)}_apply(e){const t=this._parse(e);return hp(e._query,t),new tr(e.firestore,e.converter,Wa(e._query,t))}_parse(e){const t=ko(e.firestore);return function(i,a,l,u,h,f,m){let g;if(h.isKeyField()){if(f==="array-contains"||f==="array-contains-any")throw new M(P.INVALID_ARGUMENT,`Invalid Query. You can't perform '${f}' queries on documentId().`);if(f==="in"||f==="not-in"){Vh(m,f);const k=[];for(const N of m)k.push(Ch(u,i,N));g={arrayValue:{values:k}}}else g=Ch(u,i,m)}else f!=="in"&&f!=="not-in"&&f!=="array-contains-any"||Vh(m,f),g=sE(l,a,m,f==="in"||f==="not-in");return Pe.create(h,f,g)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}class nc extends ec{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new nc(e,t)}_parse(e){const t=this._queryConstraints.map(r=>r._parse(e)).filter(r=>r.getFilters().length>0);return t.length===1?t[0]:yt.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:(function(s,i){let a=s;const l=i.getFlattenedFilters();for(const u of l)hp(a,u),a=Wa(a,u)}(e._query,t),new tr(e.firestore,e.converter,Wa(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class rc extends up{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new rc(e,t)}_apply(e){const t=function(s,i,a){if(s.startAt!==null)throw new M(P.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(s.endAt!==null)throw new M(P.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new ks(i,a)}(e._query,this._field,this._direction);return new tr(e.firestore,e.converter,function(s,i){const a=s.explicitOrderBy.concat([i]);return new qr(s.path,s.collectionGroup,a,s.filters.slice(),s.limit,s.limitType,s.startAt,s.endAt)}(e._query,t))}}function cE(n,e="asc"){const t=e,r=Zl("orderBy",n);return rc._create(r,t)}function Ch(n,e,t){if(typeof(t=Ue(t))=="string"){if(t==="")throw new M(P.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!of(e)&&t.indexOf("/")!==-1)throw new M(P.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const r=e.path.child(de.fromString(t));if(!$.isDocumentKey(r))throw new M(P.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return Gu(n,new $(r))}if(t instanceof Se)return Gu(n,t._key);throw new M(P.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${ho(t)}.`)}function Vh(n,e){if(!Array.isArray(n)||n.length===0)throw new M(P.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function hp(n,e){const t=function(s,i){for(const a of s)for(const l of a.getFlattenedFilters())if(i.indexOf(l.op)>=0)return l.op;return null}(n.filters,function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(t!==null)throw t===e.op?new M(P.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new M(P.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}class uE{convertValue(e,t="none"){switch(wn(e)){case 0:return null;case 1:return e.booleanValue;case 2:return Re(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(En(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw j(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const r={};return An(e,(s,i)=>{r[s]=this.convertValue(i,t)}),r}convertVectorValue(e){var t,r,s;const i=(s=(r=(t=e.fields)===null||t===void 0?void 0:t[Hi].arrayValue)===null||r===void 0?void 0:r.values)===null||s===void 0?void 0:s.map(a=>Re(a.doubleValue));return new Rt(i)}convertGeoPoint(e){return new St(Re(e.latitude),Re(e.longitude))}convertArray(e,t){return(e.values||[]).map(r=>this.convertValue(r,t))}convertServerTimestamp(e,t){switch(t){case"previous":const r=mo(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(As(e));default:return null}}convertTimestamp(e){const t=vn(e);return new ge(t.seconds,t.nanos)}convertDocumentKey(e,t){const r=de.fromString(e);ie(Pf(r),9688,{name:e});const s=new Ss(r.get(1),r.get(3)),i=new $(r.popFirst(5));return s.isEqual(t)||jt(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dp(n,e,t){let r;return r=n?n.toFirestore(e):e,r}class ds{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class zn extends cp{constructor(e,t,r,s,i,a){super(e,t,r,s,a),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new Pi(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const r=this._document.data.field(Zl("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new M(P.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=zn._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}}zn._jsonSchemaVersion="firestore/documentSnapshot/1.0",zn._jsonSchema={type:Ce("string",zn._jsonSchemaVersion),bundleSource:Ce("string","DocumentSnapshot"),bundleName:Ce("string"),bundle:Ce("string")};class Pi extends zn{data(e={}){return super.data(e)}}class Er{constructor(e,t,r,s){this._firestore=e,this._userDataWriter=t,this._snapshot=s,this.metadata=new ds(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(r=>{e.call(t,new Pi(this._firestore,this._userDataWriter,r.key,r,new ds(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new M(P.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(s,i){if(s._snapshot.oldDocs.isEmpty()){let a=0;return s._snapshot.docChanges.map(l=>{const u=new Pi(s._firestore,s._userDataWriter,l.doc.key,l.doc,new ds(s._snapshot.mutatedKeys.has(l.doc.key),s._snapshot.fromCache),s.query.converter);return l.doc,{type:"added",doc:u,oldIndex:-1,newIndex:a++}})}{let a=s._snapshot.oldDocs;return s._snapshot.docChanges.filter(l=>i||l.type!==3).map(l=>{const u=new Pi(s._firestore,s._userDataWriter,l.doc.key,l.doc,new ds(s._snapshot.mutatedKeys.has(l.doc.key),s._snapshot.fromCache),s.query.converter);let h=-1,f=-1;return l.type!==0&&(h=a.indexOf(l.doc.key),a=a.delete(l.doc.key)),l.type!==1&&(a=a.add(l.doc),f=a.indexOf(l.doc.key)),{type:hE(l.type),doc:u,oldIndex:h,newIndex:f}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new M(P.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=Er._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=Al.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],r=[],s=[];return this.docs.forEach(i=>{i._document!==null&&(t.push(i._document),r.push(this._userDataWriter.convertObjectMap(i._document.data.value.mapValue.fields,"previous")),s.push(i.ref.path))}),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function hE(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return j(61501,{type:n})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wa(n){n=mt(n,Se);const e=mt(n.firestore,Xn);return Q0(Kl(e),n._key).then(t=>pp(e,n,t))}Er._jsonSchemaVersion="firestore/querySnapshot/1.0",Er._jsonSchema={type:Ce("string",Er._jsonSchemaVersion),bundleSource:Ce("string","QuerySnapshot"),bundleName:Ce("string"),bundle:Ce("string")};class fp extends uE{constructor(e){super(),this.firestore=e}convertBytes(e){return new ct(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new Se(this.firestore,null,t)}}function Nh(n,e,t){n=mt(n,Se);const r=mt(n.firestore,Xn),s=dp(n.converter,e);return sc(r,[ip(ko(r),"setDoc",n._key,s,n.converter!==null,t).toMutation(n._key,gt.none())])}function dE(n,e,t,...r){n=mt(n,Se);const s=mt(n.firestore,Xn),i=ko(s);let a;return a=typeof(e=Ue(e))=="string"||e instanceof So?rE(i,"updateDoc",n._key,e,t,r):nE(i,"updateDoc",n._key,e),sc(s,[a.toMutation(n._key,gt.exists(!0))])}function fE(n,e){const t=mt(n.firestore,Xn),r=Mn(n),s=dp(n.converter,e);return sc(t,[ip(ko(n.firestore),"addDoc",r._key,s,n.converter!==null,{}).toMutation(r._key,gt.exists(!1))]).then(()=>r)}function Ta(n,...e){var t,r,s;n=Ue(n);let i={includeMetadataChanges:!1,source:"default"},a=0;typeof e[a]!="object"||Ph(e[a])||(i=e[a++]);const l={includeMetadataChanges:i.includeMetadataChanges,source:i.source};if(Ph(e[a])){const m=e[a];e[a]=(t=m.next)===null||t===void 0?void 0:t.bind(m),e[a+1]=(r=m.error)===null||r===void 0?void 0:r.bind(m),e[a+2]=(s=m.complete)===null||s===void 0?void 0:s.bind(m)}let u,h,f;if(n instanceof Se)h=mt(n.firestore,Xn),f=go(n._key.path),u={next:m=>{e[a]&&e[a](pp(h,n,m))},error:e[a+1],complete:e[a+2]};else{const m=mt(n,tr);h=mt(m.firestore,Xn),f=m._query;const g=new fp(h);u={next:S=>{e[a]&&e[a](new Er(h,g,m,S))},error:e[a+1],complete:e[a+2]},aE(n._query)}return function(g,S,k,N){const V=new Zf(N),G=new zf(S,V,k);return g.asyncQueue.enqueueAndForget(async()=>qf(await sl(g),G)),()=>{V.Ou(),g.asyncQueue.enqueueAndForget(async()=>jf(await sl(g),G))}}(Kl(h),f,l,u)}function sc(n,e){return function(r,s){const i=new un;return r.asyncQueue.enqueueAndForget(async()=>L0(await K0(r),s,i)),i.promise}(Kl(n),e)}function pp(n,e,t){const r=t.docs.get(e._key),s=new fp(n);return new zn(n,s,e._key,r,new ds(t.hasPendingWrites,t.fromCache),e.converter)}function pE(){return new Jl("serverTimestamp")}(function(e,t=!0){(function(s){Ur=s})(Fr),Rr(new Kn("firestore",(r,{instanceIdentifier:s,options:i})=>{const a=r.getProvider("app").getImmediate(),l=new Xn(new iy(r.getProvider("auth-internal")),new ly(a,r.getProvider("app-check-internal")),function(h,f){if(!Object.prototype.hasOwnProperty.apply(h.options,["projectId"]))throw new M(P.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Ss(h.options.projectId,f)}(a,s),a);return i=Object.assign({useFetchStreams:t},i),l._setSettings(i),l},"PUBLIC").setMultipleInstances(!0)),ln(Nu,Du,e),ln(Nu,Du,"esm2017")})();var mE="firebase",gE="11.10.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ln(mE,gE,"app");function ic(n,e){var t={};for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&e.indexOf(r)<0&&(t[r]=n[r]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,r=Object.getOwnPropertySymbols(n);s<r.length;s++)e.indexOf(r[s])<0&&Object.prototype.propertyIsEnumerable.call(n,r[s])&&(t[r[s]]=n[r[s]]);return t}function mp(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const _E=mp,gp=new Ms("auth","Firebase",mp());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zi=new wl("@firebase/auth");function yE(n,...e){Zi.logLevel<=Y.WARN&&Zi.warn(`Auth (${Fr}): ${n}`,...e)}function Ci(n,...e){Zi.logLevel<=Y.ERROR&&Zi.error(`Auth (${Fr}): ${n}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ht(n,...e){throw oc(n,...e)}function kt(n,...e){return oc(n,...e)}function _p(n,e,t){const r=Object.assign(Object.assign({},_E()),{[e]:t});return new Ms("auth","Firebase",r).create(e,{appName:n.name})}function dn(n){return _p(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function oc(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return gp.create(n,...e)}function H(n,e,...t){if(!n)throw oc(e,...t)}function Ot(n){const e="INTERNAL ASSERTION FAILED: "+n;throw Ci(e),new Error(e)}function Gt(n,e){n||Ot(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ol(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.href)||""}function vE(){return Dh()==="http:"||Dh()==="https:"}function Dh(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function EE(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(vE()||Mg()||"connection"in navigator)?navigator.onLine:!0}function wE(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zs{constructor(e,t){this.shortDelay=e,this.longDelay=t,Gt(t>e,"Short delay should be less than long delay!"),this.isMobile=Dg()||Lg()}get(){return EE()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ac(n,e){Gt(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yp{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Ot("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Ot("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Ot("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const TE={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const IE=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],bE=new zs(3e4,6e4);function Co(n,e){return n.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:n.tenantId}):e}async function zr(n,e,t,r,s={}){return vp(n,s,async()=>{let i={},a={};r&&(e==="GET"?a=r:i={body:JSON.stringify(r)});const l=Ls(Object.assign({key:n.config.apiKey},a)).slice(1),u=await n._getAdditionalHeaders();u["Content-Type"]="application/json",n.languageCode&&(u["X-Firebase-Locale"]=n.languageCode);const h=Object.assign({method:e,headers:u},i);return Og()||(h.referrerPolicy="no-referrer"),n.emulatorConfig&&Lr(n.emulatorConfig.host)&&(h.credentials="include"),yp.fetch()(await wp(n,n.config.apiHost,t,l),h)})}async function vp(n,e,t){n._canInitEmulator=!1;const r=Object.assign(Object.assign({},TE),e);try{const s=new AE(n),i=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const a=await i.json();if("needConfirmation"in a)throw vi(n,"account-exists-with-different-credential",a);if(i.ok&&!("errorMessage"in a))return a;{const l=i.ok?a.errorMessage:a.error.message,[u,h]=l.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw vi(n,"credential-already-in-use",a);if(u==="EMAIL_EXISTS")throw vi(n,"email-already-in-use",a);if(u==="USER_DISABLED")throw vi(n,"user-disabled",a);const f=r[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(h)throw _p(n,f,h);Ht(n,f)}}catch(s){if(s instanceof Wt)throw s;Ht(n,"network-request-failed",{message:String(s)})}}async function Ep(n,e,t,r,s={}){const i=await zr(n,e,t,r,s);return"mfaPendingCredential"in i&&Ht(n,"multi-factor-auth-required",{_serverResponse:i}),i}async function wp(n,e,t,r){const s=`${e}${t}?${r}`,i=n,a=i.config.emulator?ac(n.config,s):`${n.config.apiScheme}://${s}`;return IE.includes(t)&&(await i._persistenceManagerAvailable,i._getPersistenceType()==="COOKIE")?i._getPersistence()._getFinalTarget(a).toString():a}class AE{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(kt(this.auth,"network-request-failed")),bE.get())})}}function vi(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const s=kt(n,e,r);return s.customData._tokenResponse=t,s}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function SE(n,e){return zr(n,"POST","/v1/accounts:delete",e)}async function eo(n,e){return zr(n,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vs(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function RE(n,e=!1){const t=Ue(n),r=await t.getIdToken(e),s=lc(r);H(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,a=i==null?void 0:i.sign_in_provider;return{claims:s,token:r,authTime:vs(Ia(s.auth_time)),issuedAtTime:vs(Ia(s.iat)),expirationTime:vs(Ia(s.exp)),signInProvider:a||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function Ia(n){return Number(n)*1e3}function lc(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return Ci("JWT malformed, contained fewer than 3 sections"),null;try{const s=Ed(t);return s?JSON.parse(s):(Ci("Failed to decode base64 JWT payload"),null)}catch(s){return Ci("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function xh(n){const e=lc(n);return H(e,"internal-error"),H(typeof e.exp<"u","internal-error"),H(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ns(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof Wt&&kE(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function kE({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class PE{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const s=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class al{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=vs(this.lastLoginAt),this.creationTime=vs(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function to(n){var e;const t=n.auth,r=await n.getIdToken(),s=await Ns(n,eo(t,{idToken:r}));H(s==null?void 0:s.users.length,t,"internal-error");const i=s.users[0];n._notifyReloadListener(i);const a=!((e=i.providerUserInfo)===null||e===void 0)&&e.length?Tp(i.providerUserInfo):[],l=VE(n.providerData,a),u=n.isAnonymous,h=!(n.email&&i.passwordHash)&&!(l!=null&&l.length),f=u?h:!1,m={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:l,metadata:new al(i.createdAt,i.lastLoginAt),isAnonymous:f};Object.assign(n,m)}async function CE(n){const e=Ue(n);await to(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function VE(n,e){return[...n.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function Tp(n){return n.map(e=>{var{providerId:t}=e,r=ic(e,["providerId"]);return{providerId:t,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function NE(n,e){const t=await vp(n,{},async()=>{const r=Ls({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=n.config,a=await wp(n,s,"/v1/token",`key=${i}`),l=await n._getAdditionalHeaders();l["Content-Type"]="application/x-www-form-urlencoded";const u={method:"POST",headers:l,body:r};return n.emulatorConfig&&Lr(n.emulatorConfig.host)&&(u.credentials="include"),yp.fetch()(a,u)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function DE(n,e){return zr(n,"POST","/v2/accounts:revokeToken",Co(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wr{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){H(e.idToken,"internal-error"),H(typeof e.idToken<"u","internal-error"),H(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):xh(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){H(e.length!==0,"internal-error");const t=xh(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(H(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:s,expiresIn:i}=await NE(e,t);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:s,expirationTime:i}=t,a=new wr;return r&&(H(typeof r=="string","internal-error",{appName:e}),a.refreshToken=r),s&&(H(typeof s=="string","internal-error",{appName:e}),a.accessToken=s),i&&(H(typeof i=="number","internal-error",{appName:e}),a.expirationTime=i),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new wr,this.toJSON())}_performRefresh(){return Ot("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xt(n,e){H(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class pt{constructor(e){var{uid:t,auth:r,stsTokenManager:s}=e,i=ic(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new PE(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=r,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new al(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const t=await Ns(this,this.stsTokenManager.getToken(this.auth,e));return H(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return RE(this,e)}reload(){return CE(this)}_assign(e){this!==e&&(H(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new pt(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){H(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await to(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(ft(this.auth.app))return Promise.reject(dn(this.auth));const e=await this.getIdToken();return await Ns(this,SE(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var r,s,i,a,l,u,h,f;const m=(r=t.displayName)!==null&&r!==void 0?r:void 0,g=(s=t.email)!==null&&s!==void 0?s:void 0,S=(i=t.phoneNumber)!==null&&i!==void 0?i:void 0,k=(a=t.photoURL)!==null&&a!==void 0?a:void 0,N=(l=t.tenantId)!==null&&l!==void 0?l:void 0,V=(u=t._redirectEventId)!==null&&u!==void 0?u:void 0,G=(h=t.createdAt)!==null&&h!==void 0?h:void 0,z=(f=t.lastLoginAt)!==null&&f!==void 0?f:void 0,{uid:X,emailVerified:fe,isAnonymous:tt,providerData:ve,stsTokenManager:w}=t;H(X&&w,e,"internal-error");const _=wr.fromJSON(this.name,w);H(typeof X=="string",e,"internal-error"),Xt(m,e.name),Xt(g,e.name),H(typeof fe=="boolean",e,"internal-error"),H(typeof tt=="boolean",e,"internal-error"),Xt(S,e.name),Xt(k,e.name),Xt(N,e.name),Xt(V,e.name),Xt(G,e.name),Xt(z,e.name);const y=new pt({uid:X,auth:e,email:g,emailVerified:fe,displayName:m,isAnonymous:tt,photoURL:k,phoneNumber:S,tenantId:N,stsTokenManager:_,createdAt:G,lastLoginAt:z});return ve&&Array.isArray(ve)&&(y.providerData=ve.map(E=>Object.assign({},E))),V&&(y._redirectEventId=V),y}static async _fromIdTokenResponse(e,t,r=!1){const s=new wr;s.updateFromServerResponse(t);const i=new pt({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await to(i),i}static async _fromGetAccountInfoResponse(e,t,r){const s=t.users[0];H(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?Tp(s.providerUserInfo):[],a=!(s.email&&s.passwordHash)&&!(i!=null&&i.length),l=new wr;l.updateFromIdToken(r);const u=new pt({uid:s.localId,auth:e,stsTokenManager:l,isAnonymous:a}),h={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new al(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(i!=null&&i.length)};return Object.assign(u,h),u}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Oh=new Map;function Mt(n){Gt(n instanceof Function,"Expected a class definition");let e=Oh.get(n);return e?(Gt(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,Oh.set(n,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ip{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}Ip.type="NONE";const Mh=Ip;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vi(n,e,t){return`firebase:${n}:${e}:${t}`}class Tr{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=Vi(this.userKey,s.apiKey,i),this.fullPersistenceKey=Vi("persistence",s.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await eo(this.auth,{idToken:e}).catch(()=>{});return t?pt._fromGetAccountInfoResponse(this.auth,t,e):null}return pt._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new Tr(Mt(Mh),e,r);const s=(await Promise.all(t.map(async h=>{if(await h._isAvailable())return h}))).filter(h=>h);let i=s[0]||Mt(Mh);const a=Vi(r,e.config.apiKey,e.name);let l=null;for(const h of t)try{const f=await h._get(a);if(f){let m;if(typeof f=="string"){const g=await eo(e,{idToken:f}).catch(()=>{});if(!g)break;m=await pt._fromGetAccountInfoResponse(e,g,f)}else m=pt._fromJSON(e,f);h!==i&&(l=m),i=h;break}}catch{}const u=s.filter(h=>h._shouldAllowMigration);return!i._shouldAllowMigration||!u.length?new Tr(i,e,r):(i=u[0],l&&await i._set(a,l.toJSON()),await Promise.all(t.map(async h=>{if(h!==i)try{await h._remove(a)}catch{}})),new Tr(i,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lh(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Rp(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(bp(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Pp(e))return"Blackberry";if(Cp(e))return"Webos";if(Ap(e))return"Safari";if((e.includes("chrome/")||Sp(e))&&!e.includes("edge/"))return"Chrome";if(kp(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function bp(n=Xe()){return/firefox\//i.test(n)}function Ap(n=Xe()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Sp(n=Xe()){return/crios\//i.test(n)}function Rp(n=Xe()){return/iemobile/i.test(n)}function kp(n=Xe()){return/android/i.test(n)}function Pp(n=Xe()){return/blackberry/i.test(n)}function Cp(n=Xe()){return/webos/i.test(n)}function cc(n=Xe()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function xE(n=Xe()){var e;return cc(n)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function OE(){return Fg()&&document.documentMode===10}function Vp(n=Xe()){return cc(n)||kp(n)||Cp(n)||Pp(n)||/windows phone/i.test(n)||Rp(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Np(n,e=[]){let t;switch(n){case"Browser":t=Lh(Xe());break;case"Worker":t=`${Lh(Xe())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${Fr}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ME{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=i=>new Promise((a,l)=>{try{const u=e(i);a(u)}catch(u){l(u)}});r.onAbort=t,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function LE(n,e={}){return zr(n,"GET","/v2/passwordPolicy",Co(n,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const FE=6;class UE{constructor(e){var t,r,s,i;const a=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=a.minPasswordLength)!==null&&t!==void 0?t:FE,a.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=a.maxPasswordLength),a.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=a.containsLowercaseCharacter),a.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=a.containsUppercaseCharacter),a.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=a.containsNumericCharacter),a.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=a.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(s=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&s!==void 0?s:"",this.forceUpgradeOnSignin=(i=e.forceUpgradeOnSignin)!==null&&i!==void 0?i:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,r,s,i,a,l;const u={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,u),this.validatePasswordCharacterOptions(e,u),u.isValid&&(u.isValid=(t=u.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),u.isValid&&(u.isValid=(r=u.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),u.isValid&&(u.isValid=(s=u.containsLowercaseLetter)!==null&&s!==void 0?s:!0),u.isValid&&(u.isValid=(i=u.containsUppercaseLetter)!==null&&i!==void 0?i:!0),u.isValid&&(u.isValid=(a=u.containsNumericCharacter)!==null&&a!==void 0?a:!0),u.isValid&&(u.isValid=(l=u.containsNonAlphanumericCharacter)!==null&&l!==void 0?l:!0),u}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $E{constructor(e,t,r,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Fh(this),this.idTokenSubscription=new Fh(this),this.beforeStateQueue=new ME(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=gp,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(i=>this._resolvePersistenceManagerAvailable=i)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=Mt(t)),this._initializationPromise=this.queue(async()=>{var r,s,i;if(!this._deleted&&(this.persistenceManager=await Tr.create(this,e),(r=this._resolvePersistenceManagerAvailable)===null||r===void 0||r.call(this),!this._deleted)){if(!((s=this._popupRedirectResolver)===null||s===void 0)&&s._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((i=this.currentUser)===null||i===void 0?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await eo(this,{idToken:e}),r=await pt._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(ft(this.app)){const a=this.app.settings.authIdToken;return a?new Promise(l=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(a).then(l,l))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let s=r,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const a=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,l=s==null?void 0:s._redirectEventId,u=await this.tryRedirectSignIn(e);(!a||a===l)&&(u!=null&&u.user)&&(s=u.user,i=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(s)}catch(a){s=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(a))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return H(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await to(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=wE()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(ft(this.app))return Promise.reject(dn(this));const t=e?Ue(e):null;return t&&H(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&H(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return ft(this.app)?Promise.reject(dn(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return ft(this.app)?Promise.reject(dn(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Mt(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await LE(this),t=new UE(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new Ms("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await DE(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&Mt(e)||this._popupRedirectResolver;H(t,this,"argument-error"),this.redirectPersistenceManager=await Tr.create(this,[Mt(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,s){if(this._deleted)return()=>{};const i=typeof t=="function"?t:t.next.bind(t);let a=!1;const l=this._isInitialized?Promise.resolve():this._initializationPromise;if(H(l,this,"internal-error"),l.then(()=>{a||i(this.currentUser)}),typeof t=="function"){const u=e.addObserver(t,r,s);return()=>{a=!0,u()}}else{const u=e.addObserver(t);return()=>{a=!0,u()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return H(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Np(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(t["X-Firebase-Client"]=r);const s=await this._getAppCheckToken();return s&&(t["X-Firebase-AppCheck"]=s),t}async _getAppCheckToken(){var e;if(ft(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t!=null&&t.error&&yE(`Error while retrieving App Check token: ${t.error}`),t==null?void 0:t.token}}function Vo(n){return Ue(n)}class Fh{constructor(e){this.auth=e,this.observer=null,this.addObserver=Gg(t=>this.observer=t)}get next(){return H(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let uc={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function BE(n){uc=n}function qE(n){return uc.loadJS(n)}function jE(){return uc.gapiScript}function zE(n){return`__${n}${Math.floor(Math.random()*1e6)}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function HE(n,e){const t=Il(n,"auth");if(t.isInitialized()){const s=t.getImmediate(),i=t.getOptions();if(Wn(i,e??{}))return s;Ht(s,"already-initialized")}return t.initialize({options:e})}function GE(n,e){const t=(e==null?void 0:e.persistence)||[],r=(Array.isArray(t)?t:[t]).map(Mt);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function WE(n,e,t){const r=Vo(n);H(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!1,i=Dp(e),{host:a,port:l}=KE(e),u=l===null?"":`:${l}`,h={url:`${i}//${a}${u}/`},f=Object.freeze({host:a,port:l,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!r._canInitEmulator){H(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),H(Wn(h,r.config.emulator)&&Wn(f,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=h,r.emulatorConfig=f,r.settings.appVerificationDisabledForTesting=!0,Lr(a)?(bd(`${i}//${a}${u}`),Ad("Auth",!0)):QE()}function Dp(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function KE(n){const e=Dp(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:Uh(r.substr(i.length+1))}}else{const[i,a]=r.split(":");return{host:i,port:Uh(a)}}}function Uh(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function QE(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xp{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return Ot("not implemented")}_getIdTokenResponse(e){return Ot("not implemented")}_linkToIdToken(e,t){return Ot("not implemented")}_getReauthenticationResolver(e){return Ot("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ir(n,e){return Ep(n,"POST","/v1/accounts:signInWithIdp",Co(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const JE="http://localhost";class Yn extends xp{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new Yn(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):Ht("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s}=t,i=ic(t,["providerId","signInMethod"]);if(!r||!s)return null;const a=new Yn(r,s);return a.idToken=i.idToken||void 0,a.accessToken=i.accessToken||void 0,a.secret=i.secret,a.nonce=i.nonce,a.pendingToken=i.pendingToken||null,a}_getIdTokenResponse(e){const t=this.buildRequest();return Ir(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,Ir(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Ir(e,t)}buildRequest(){const e={requestUri:JE,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=Ls(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Op{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hs extends Op{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zt extends Hs{constructor(){super("facebook.com")}static credential(e){return Yn._fromParams({providerId:Zt.PROVIDER_ID,signInMethod:Zt.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Zt.credentialFromTaggedObject(e)}static credentialFromError(e){return Zt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Zt.credential(e.oauthAccessToken)}catch{return null}}}Zt.FACEBOOK_SIGN_IN_METHOD="facebook.com";Zt.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class en extends Hs{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return Yn._fromParams({providerId:en.PROVIDER_ID,signInMethod:en.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return en.credentialFromTaggedObject(e)}static credentialFromError(e){return en.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return en.credential(t,r)}catch{return null}}}en.GOOGLE_SIGN_IN_METHOD="google.com";en.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tn extends Hs{constructor(){super("github.com")}static credential(e){return Yn._fromParams({providerId:tn.PROVIDER_ID,signInMethod:tn.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return tn.credentialFromTaggedObject(e)}static credentialFromError(e){return tn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return tn.credential(e.oauthAccessToken)}catch{return null}}}tn.GITHUB_SIGN_IN_METHOD="github.com";tn.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nn extends Hs{constructor(){super("twitter.com")}static credential(e,t){return Yn._fromParams({providerId:nn.PROVIDER_ID,signInMethod:nn.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return nn.credentialFromTaggedObject(e)}static credentialFromError(e){return nn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return nn.credential(t,r)}catch{return null}}}nn.TWITTER_SIGN_IN_METHOD="twitter.com";nn.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function XE(n,e){return Ep(n,"POST","/v1/accounts:signUp",Co(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bn{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,s=!1){const i=await pt._fromIdTokenResponse(e,r,s),a=$h(r);return new bn({user:i,providerId:a,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const s=$h(r);return new bn({user:e,providerId:s,_tokenResponse:r,operationType:t})}}function $h(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function YE(n){var e;if(ft(n.app))return Promise.reject(dn(n));const t=Vo(n);if(await t._initializationPromise,!((e=t.currentUser)===null||e===void 0)&&e.isAnonymous)return new bn({user:t.currentUser,providerId:null,operationType:"signIn"});const r=await XE(t,{returnSecureToken:!0}),s=await bn._fromIdTokenResponse(t,"signIn",r,!0);return await t._updateCurrentUser(s.user),s}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class no extends Wt{constructor(e,t,r,s){var i;super(t.code,t.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,no.prototype),this.customData={appName:e.name,tenantId:(i=e.tenantId)!==null&&i!==void 0?i:void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,s){return new no(e,t,r,s)}}function Mp(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?no._fromErrorAndOperation(n,i,e,r):i})}async function ZE(n,e,t=!1){const r=await Ns(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return bn._forOperation(n,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ew(n,e,t=!1){const{auth:r}=n;if(ft(r.app))return Promise.reject(dn(r));const s="reauthenticate";try{const i=await Ns(n,Mp(r,s,e,n),t);H(i.idToken,r,"internal-error");const a=lc(i.idToken);H(a,r,"internal-error");const{sub:l}=a;return H(n.uid===l,r,"user-mismatch"),bn._forOperation(n,s,i)}catch(i){throw(i==null?void 0:i.code)==="auth/user-not-found"&&Ht(r,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function tw(n,e,t=!1){if(ft(n.app))return Promise.reject(dn(n));const r="signIn",s=await Mp(n,r,e),i=await bn._fromIdTokenResponse(n,r,s);return t||await n._updateCurrentUser(i.user),i}function nw(n,e,t,r){return Ue(n).onIdTokenChanged(e,t,r)}function rw(n,e,t){return Ue(n).beforeAuthStateChanged(e,t)}function sw(n,e,t,r){return Ue(n).onAuthStateChanged(e,t,r)}const ro="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lp{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(ro,"1"),this.storage.removeItem(ro),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const iw=1e3,ow=10;class Fp extends Lp{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Vp(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),s=this.localCache[t];r!==s&&e(t,s,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((a,l,u)=>{this.notifyListeners(a,u)});return}const r=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const a=this.storage.getItem(r);!t&&this.localCache[r]===a||this.notifyListeners(r,a)},i=this.storage.getItem(r);OE()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,ow):s()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},iw)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}Fp.type="LOCAL";const aw=Fp;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Up extends Lp{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}Up.type="SESSION";const $p=Up;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lw(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class No{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const r=new No(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:s,data:i}=t.data,a=this.handlersMap[s];if(!(a!=null&&a.size))return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const l=Array.from(a).map(async h=>h(t.origin,i)),u=await lw(l);t.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:u})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}No.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hc(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cw{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,a;return new Promise((l,u)=>{const h=hc("",20);s.port1.start();const f=setTimeout(()=>{u(new Error("unsupported_event"))},r);a={messageChannel:s,onMessage(m){const g=m;if(g.data.eventId===h)switch(g.data.status){case"ack":clearTimeout(f),i=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),l(g.data.response);break;default:clearTimeout(f),clearTimeout(i),u(new Error("invalid_response"));break}}},this.handlers.add(a),s.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:e,eventId:h,data:t},[s.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pt(){return window}function uw(n){Pt().location.href=n}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bp(){return typeof Pt().WorkerGlobalScope<"u"&&typeof Pt().importScripts=="function"}async function hw(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function dw(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)===null||n===void 0?void 0:n.controller)||null}function fw(){return Bp()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qp="firebaseLocalStorageDb",pw=1,so="firebaseLocalStorage",jp="fbase_key";class Gs{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function Do(n,e){return n.transaction([so],e?"readwrite":"readonly").objectStore(so)}function mw(){const n=indexedDB.deleteDatabase(qp);return new Gs(n).toPromise()}function ll(){const n=indexedDB.open(qp,pw);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(so,{keyPath:jp})}catch(s){t(s)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(so)?e(r):(r.close(),await mw(),e(await ll()))})})}async function Bh(n,e,t){const r=Do(n,!0).put({[jp]:e,value:t});return new Gs(r).toPromise()}async function gw(n,e){const t=Do(n,!1).get(e),r=await new Gs(t).toPromise();return r===void 0?null:r.value}function qh(n,e){const t=Do(n,!0).delete(e);return new Gs(t).toPromise()}const _w=800,yw=3;class zp{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await ll(),this.db)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>yw)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Bp()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=No._getInstance(fw()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await hw(),!this.activeServiceWorker)return;this.sender=new cw(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((t=r[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||dw()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await ll();return await Bh(e,ro,"1"),await qh(e,ro),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>Bh(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>gw(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>qh(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=Do(s,!1).getAll();return new Gs(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),_w)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}zp.type="LOCAL";const vw=zp;new zs(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ew(n,e){return e?Mt(e):(H(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dc extends xp{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Ir(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Ir(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Ir(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function ww(n){return tw(n.auth,new dc(n),n.bypassAuthState)}function Tw(n){const{auth:e,user:t}=n;return H(t,e,"internal-error"),ew(t,new dc(n),n.bypassAuthState)}async function Iw(n){const{auth:e,user:t}=n;return H(t,e,"internal-error"),ZE(t,new dc(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hp{constructor(e,t,r,s,i=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:s,tenantId:i,error:a,type:l}=e;if(a){this.reject(a);return}const u={auth:this.auth,requestUri:t,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(l)(u))}catch(h){this.reject(h)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return ww;case"linkViaPopup":case"linkViaRedirect":return Iw;case"reauthViaPopup":case"reauthViaRedirect":return Tw;default:Ht(this.auth,"internal-error")}}resolve(e){Gt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Gt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bw=new zs(2e3,1e4);class gr extends Hp{constructor(e,t,r,s,i){super(e,t,s,i),this.provider=r,this.authWindow=null,this.pollId=null,gr.currentPopupAction&&gr.currentPopupAction.cancel(),gr.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return H(e,this.auth,"internal-error"),e}async onExecution(){Gt(this.filter.length===1,"Popup operations only handle one event");const e=hc();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(kt(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(kt(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,gr.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,r;if(!((r=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(kt(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,bw.get())};e()}}gr.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Aw="pendingRedirect",Ni=new Map;class Sw extends Hp{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=Ni.get(this.auth._key());if(!e){try{const r=await Rw(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}Ni.set(this.auth._key(),e)}return this.bypassAuthState||Ni.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function Rw(n,e){const t=Cw(e),r=Pw(n);if(!await r._isAvailable())return!1;const s=await r._get(t)==="true";return await r._remove(t),s}function kw(n,e){Ni.set(n._key(),e)}function Pw(n){return Mt(n._redirectPersistence)}function Cw(n){return Vi(Aw,n.config.apiKey,n.name)}async function Vw(n,e,t=!1){if(ft(n.app))return Promise.reject(dn(n));const r=Vo(n),s=Ew(r,e),a=await new Sw(r,s,t).execute();return a&&!t&&(delete a.user._redirectEventId,await r._persistUserIfCurrent(a.user),await r._setRedirectUser(null,e)),a}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nw=10*60*1e3;class Dw{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!xw(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!Gp(e)){const s=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";t.onError(kt(this.auth,s))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=Nw&&this.cachedEventUids.clear(),this.cachedEventUids.has(jh(e))}saveEventToCache(e){this.cachedEventUids.add(jh(e)),this.lastProcessedEventTime=Date.now()}}function jh(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function Gp({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function xw(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Gp(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ow(n,e={}){return zr(n,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mw=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Lw=/^https?/;async function Fw(n){if(n.config.emulator)return;const{authorizedDomains:e}=await Ow(n);for(const t of e)try{if(Uw(t))return}catch{}Ht(n,"unauthorized-domain")}function Uw(n){const e=ol(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const a=new URL(n);return a.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&a.hostname===r}if(!Lw.test(t))return!1;if(Mw.test(n))return r===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $w=new zs(3e4,6e4);function zh(){const n=Pt().___jsl;if(n!=null&&n.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function Bw(n){return new Promise((e,t)=>{var r,s,i;function a(){zh(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{zh(),t(kt(n,"network-request-failed"))},timeout:$w.get()})}if(!((s=(r=Pt().gapi)===null||r===void 0?void 0:r.iframes)===null||s===void 0)&&s.Iframe)e(gapi.iframes.getContext());else if(!((i=Pt().gapi)===null||i===void 0)&&i.load)a();else{const l=zE("iframefcb");return Pt()[l]=()=>{gapi.load?a():t(kt(n,"network-request-failed"))},qE(`${jE()}?onload=${l}`).catch(u=>t(u))}}).catch(e=>{throw Di=null,e})}let Di=null;function qw(n){return Di=Di||Bw(n),Di}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jw=new zs(5e3,15e3),zw="__/auth/iframe",Hw="emulator/auth/iframe",Gw={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Ww=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Kw(n){const e=n.config;H(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?ac(e,Hw):`https://${n.config.authDomain}/${zw}`,r={apiKey:e.apiKey,appName:n.name,v:Fr},s=Ww.get(n.config.apiHost);s&&(r.eid=s);const i=n._getFrameworks();return i.length&&(r.fw=i.join(",")),`${t}?${Ls(r).slice(1)}`}async function Qw(n){const e=await qw(n),t=Pt().gapi;return H(t,n,"internal-error"),e.open({where:document.body,url:Kw(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Gw,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const a=kt(n,"network-request-failed"),l=Pt().setTimeout(()=>{i(a)},jw.get());function u(){Pt().clearTimeout(l),s(r)}r.ping(u).then(u,()=>{i(a)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jw={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Xw=500,Yw=600,Zw="_blank",eT="http://localhost";class Hh{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function tT(n,e,t,r=Xw,s=Yw){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),a=Math.max((window.screen.availWidth-r)/2,0).toString();let l="";const u=Object.assign(Object.assign({},Jw),{width:r.toString(),height:s.toString(),top:i,left:a}),h=Xe().toLowerCase();t&&(l=Sp(h)?Zw:t),bp(h)&&(e=e||eT,u.scrollbars="yes");const f=Object.entries(u).reduce((g,[S,k])=>`${g}${S}=${k},`,"");if(xE(h)&&l!=="_self")return nT(e||"",l),new Hh(null);const m=window.open(e||"",l,f);H(m,n,"popup-blocked");try{m.focus()}catch{}return new Hh(m)}function nT(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rT="__/auth/handler",sT="emulator/auth/handler",iT=encodeURIComponent("fac");async function Gh(n,e,t,r,s,i){H(n.config.authDomain,n,"auth-domain-config-required"),H(n.config.apiKey,n,"invalid-api-key");const a={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:Fr,eventId:s};if(e instanceof Op){e.setDefaultLanguage(n.languageCode),a.providerId=e.providerId||"",Hg(e.getCustomParameters())||(a.customParameters=JSON.stringify(e.getCustomParameters()));for(const[f,m]of Object.entries({}))a[f]=m}if(e instanceof Hs){const f=e.getScopes().filter(m=>m!=="");f.length>0&&(a.scopes=f.join(","))}n.tenantId&&(a.tid=n.tenantId);const l=a;for(const f of Object.keys(l))l[f]===void 0&&delete l[f];const u=await n._getAppCheckToken(),h=u?`#${iT}=${encodeURIComponent(u)}`:"";return`${oT(n)}?${Ls(l).slice(1)}${h}`}function oT({config:n}){return n.emulator?ac(n,sT):`https://${n.authDomain}/${rT}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ba="webStorageSupport";class aT{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=$p,this._completeRedirectFn=Vw,this._overrideRedirectResult=kw}async _openPopup(e,t,r,s){var i;Gt((i=this.eventManagers[e._key()])===null||i===void 0?void 0:i.manager,"_initialize() not called before _openPopup()");const a=await Gh(e,t,r,ol(),s);return tT(e,a,hc())}async _openRedirect(e,t,r,s){await this._originValidation(e);const i=await Gh(e,t,r,ol(),s);return uw(i),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:i}=this.eventManagers[t];return s?Promise.resolve(s):(Gt(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await Qw(e),r=new Dw(e);return t.register("authEvent",s=>(H(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(ba,{type:ba},s=>{var i;const a=(i=s==null?void 0:s[0])===null||i===void 0?void 0:i[ba];a!==void 0&&t(!!a),Ht(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=Fw(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Vp()||Ap()||cc()}}const lT=aT;var Wh="@firebase/auth",Kh="1.10.8";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cT{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){H(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function uT(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function hT(n){Rr(new Kn("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:a,authDomain:l}=r.options;H(a&&!a.includes(":"),"invalid-api-key",{appName:r.name});const u={apiKey:a,authDomain:l,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Np(n)},h=new $E(r,s,i,u);return GE(h,t),h},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),Rr(new Kn("auth-internal",e=>{const t=Vo(e.getProvider("auth").getImmediate());return(r=>new cT(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),ln(Wh,Kh,uT(n)),ln(Wh,Kh,"esm2017")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dT=5*60,fT=Id("authIdTokenMaxAge")||dT;let Qh=null;const pT=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>fT)return;const s=t==null?void 0:t.token;Qh!==s&&(Qh=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function mT(n=Pd()){const e=Il(n,"auth");if(e.isInitialized())return e.getImmediate();const t=HE(n,{popupRedirectResolver:lT,persistence:[vw,aw,$p]}),r=Id("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(r,location.origin);if(location.origin===i.origin){const a=pT(i.toString());rw(t,a,()=>a(t.currentUser)),nw(t,l=>a(l))}}const s=wd("auth");return s&&WE(t,`http://${s}`),t}function gT(){var n,e;return(e=(n=document.getElementsByTagName("head"))===null||n===void 0?void 0:n[0])!==null&&e!==void 0?e:document}BE({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=s=>{const i=kt("internal-error");i.customData=s,t(i)},r.type="text/javascript",r.charset="UTF-8",gT().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});hT("Browser");const Wp={apiKey:"AIzaSyAsw466_wzsiLtbjw6FXZ1_O3HQ_AkVyU8",authDomain:"album-apexora.firebaseapp.com",projectId:"album-apexora",appId:"1:17231648284:web:20edb8477453f50473f1d9"},cl=!Object.values(Wp).some(n=>n.startsWith("PEGA")),Kp=kd(Wp),xn=X0(Kp),Jh=mT(Kp);function Aa(){return new Promise((n,e)=>{const t=sw(Jh,r=>{t(),r?n(r):YE(Jh).then(s=>n(s.user),e)})})}function Yt(n){const e=n,t=String((e==null?void 0:e.code)??"");return cl?t.includes("operation-not-allowed")||t.includes("admin-restricted")?"Activa el acceso Anónimo en Firebase → Authentication → Sign-in method.":t.includes("api-key")||t.includes("invalid-app")?"La firebaseConfig de src/net/firebase.ts no es válida.":t.includes("permission-denied")?"Firebase rechazó la operación (¿sala llena, ya empezada o reglas sin publicar?).":t.includes("unavailable")||t.includes("network")?"Sin conexión con Firebase.":(e==null?void 0:e.message)??"Error de conexión":"Falta pegar tu firebaseConfig en src/net/firebase.ts"}const _T=n=>md([Fi.Luminarae,Fi.Umbra],n);function ul(n,e){if(e===0)return n;const t=r=>1-r;return{...n,p:[n.p[1],n.p[0]],token:t(n.token),active:t(n.active),winner:n.winner===null||n.winner===-1?n.winner:t(n.winner),tok:[n.tok[1],n.tok[0]],mull:[n.mull[1],n.mull[0]],stack:n.stack.map(r=>({...r,owner:t(r.owner)}))}}function Qp(n,e,t){return!t||typeof t.type!="string"?!1:t.type==="mulligan"?n.phase==="mulligan"&&t.player===e&&!n.mull[e]:n.phase!=="mulligan"&&n.active===e}function Jp(n,e,t){if(e===-1||!Qp(n,e,t))return n;try{return Ts(n,t)}catch{return n}}const yT=(n,e)=>n.type==="mulligan"?{...n,player:e}:n,vT=n=>n.type==="mulligan"?{...n,player:0}:n,Xh="ABCDEFGHJKLMNPQRSTUVWXYZ23456789",ET=()=>Array.from({length:4},()=>Xh[Math.floor(Math.random()*Xh.length)]).join(""),Sa="tcgRoom";class fn{constructor(e){Ne(this,"code","");Ne(this,"seat",0);Ne(this,"uid","");Ne(this,"g");Ne(this,"host","");Ne(this,"guest","");Ne(this,"seed",0);Ne(this,"applied",0);Ne(this,"sending",!1);Ne(this,"sentAt",-1);Ne(this,"unsubs",[]);Ne(this,"chatSeen",new Set);Ne(this,"ready",!1);Ne(this,"pulled",!1);Ne(this,"waiters",[]);this.h=e}static savedCode(){try{return localStorage.getItem(Sa)}catch{return null}}save(){try{localStorage.setItem(Sa,this.code)}catch{}}static clearSaved(){try{localStorage.removeItem(Sa)}catch{}}async create(){if(!cl)throw new Error(Yt(null));try{const e=await Aa();this.uid=e.uid,this.seat=0,this.seed=Math.floor(Math.random()*2**31);for(let t=0;t<8;t++){const r=ET();if(!(await wa(Mn(xn,"tcgGames",r))).exists())return await Nh(Mn(xn,"tcgGames",r),{host:e.uid,guest:null,seed:this.seed,status:"waiting",createdAt:pE()}),this.code=r,this.save(),this.h.onStatus(`Sala ${r}: esperando rival…`),this.listen(),r}}catch(e){throw new Error(Yt(e))}throw new Error("No se pudo crear la sala, inténtalo de nuevo")}async join(e){var r,s;if(!cl)throw new Error(Yt(null));const t=e.trim().toUpperCase();if(t.length!==4)throw new Error("El código tiene 4 caracteres");try{const i=await Aa();this.uid=i.uid;const a=Mn(xn,"tcgGames",t),l=await wa(a);if(!l.exists())throw new Error("Esa sala no existe");const u=l.data();if(u.host===i.uid)this.seat=0;else if(u.guest===i.uid)this.seat=1;else{if(u.guest)throw new Error("La sala ya está llena");await dE(a,{guest:i.uid,status:"playing"}),this.seat=1}this.code=t,this.save(),this.listen()}catch(i){throw new Error((r=i.message)!=null&&r.startsWith("Esa sala")||(s=i.message)!=null&&s.startsWith("La sala")?i.message:Yt(i))}}async resume(e){try{const t=await Aa(),r=await wa(Mn(xn,"tcgGames",e.trim().toUpperCase())),s=r.data();if(!r.exists()||(s==null?void 0:s.status)!=="playing"||s.host!==t.uid&&s.guest!==t.uid)throw fn.clearSaved(),new Error("Sala no disponible")}catch(t){throw fn.clearSaved(),t}await this.join(e)}listen(){const e=Mn(xn,"tcgGames",this.code);this.unsubs.push(Ta(e,t=>{const r=t.data();r&&(this.host=r.host,this.guest=r.guest??"",this.seed=r.seed,r.status==="playing"&&this.guest&&!this.ready&&(this.ready=!0,this.g=_T(this.seed),this.applied=0,this.pulled=!1,this.h.onReady(),this.h.onStatus(`Sala ${this.code}: ¡partida en marcha!`),this.unsubs.push(Ta(lE(Ea(e,"chat"),cE("t")),s=>s.docChanges().forEach(i=>{var l,u;if(i.type!=="added"||this.chatSeen.has(i.doc.id))return;this.chatSeen.add(i.doc.id);const a=i.doc.data();(u=(l=this.h).onChat)==null||u.call(l,{id:i.doc.id,mine:a.by===this.uid,text:String(a.text??"")})}),s=>this.h.onStatus("Chat: "+Yt(s)))),this.unsubs.push(Ta(Ea(e,"moves"),{includeMetadataChanges:!0},s=>this.pull(s.docs),s=>this.h.onStatus(Yt(s))))))},t=>this.h.onStatus(Yt(t))))}pull(e){const t=new Map;for(const l of e)l.metadata.hasPendingWrites||t.set(Number(l.id),l.data());const r=!this.pulled;this.pulled=!0;const s=[],i=this.applied;let a=!1;for(;t.has(this.applied);){const l=this.applied,u=t.get(l),h=u.by===this.host?0:u.by===this.guest?1:-1,f=this.g,m=Jp(f,h,u.action);m!==f&&h!==-1&&s.push({before:f,action:u.action,seat:h}),this.g=m,this.applied++,this.sending&&u.by===this.uid&&l===this.sentAt&&(this.sending=!1,a=!0)}this.applied===i&&!r||(this.h.onMoves(this.g,s,r||s.length>3),a&&this.h.onSettled(),this.waiters.splice(0).forEach(l=>l()))}waitAdvance(e,t){return new Promise(r=>{if(this.applied>e)return r(!0);const s=setTimeout(()=>r(!1),t);this.waiters.push(()=>{clearTimeout(s),r(this.applied>e)})})}async send(e){if(this.sending||!this.ready)return!1;this.sending=!0;for(let t=0;t<3;t++){const r=this.applied,s=JSON.parse(JSON.stringify(yT(e,this.seat)));this.sentAt=r;try{return await Nh(Mn(xn,"tcgGames",this.code,"moves",String(r)),{by:this.uid,action:s,t:Date.now()}),!0}catch{if(!await this.waitAdvance(r,4e3)||!Qp(this.g,this.seat,s))break}}return this.sending=!1,this.h.onStatus("No se pudo enviar la jugada; revisa el tablero y repítela."),!1}async sendChat(e){if(!this.ready)throw new Error("El chat se activa cuando entra el rival.");try{await fE(Ea(xn,"tcgGames",this.code,"chat"),{by:this.uid,text:e.slice(0,140),t:Date.now()})}catch(t){throw new Error(Yt(t))}}get busy(){return this.sending}get isReady(){return this.ready}close(){this.unsubs.forEach(e=>e()),this.unsubs=[],this.waiters=[],fn.clearSaved()}}const wT=`
.onl{position:fixed;inset:0;z-index:9000;display:grid;place-items:center;background:rgba(5,5,12,.78)}
.onl>div{background:#14141f;border:1px solid #3a3a5a;border-radius:14px;padding:22px 24px;width:min(92vw,340px);display:grid;gap:12px;color:#eee;text-align:center}
.onl h2{margin:0}.onl input{padding:10px;font-size:22px;letter-spacing:6px;text-align:center;text-transform:uppercase;border-radius:8px;border:1px solid #444;background:#0c0c14;color:#fff}
.onl .st{min-height:1.2em;font-size:13px;opacity:.85}
.roomtag{position:fixed;top:6px;left:50%;transform:translateX(-50%);z-index:8000;font-size:12px;padding:3px 10px;border-radius:99px;background:rgba(20,20,31,.85);color:#ddd;pointer-events:none}
`;let cr=null,et=null;function Xp(){if(!document.getElementById("onl-css")){const n=document.createElement("style");n.id="onl-css",n.textContent=wT,document.head.append(n)}}function Ds(n){Xp(),cr||(cr=document.createElement("div"),cr.className="roomtag",document.body.append(cr)),cr.textContent=n,cr.hidden=!n}function Es(){et==null||et.remove(),et=null}function io(n){const e=et==null?void 0:et.querySelector(".st");e&&(e.textContent=n)}function hl(n){Xp(),Es(),et=document.createElement("div"),et.className="onl",et.innerHTML=`<div><h2>Jugar online</h2>
    ${n.inRoom?'<p>Ya estás en una sala.</p><button class="btn" data-x="leave">Salir de la sala</button>':'<button class="btn" data-x="create">Crear sala</button><p style="margin:0;opacity:.7">o únete con un código</p><input data-x="code" maxlength="4" placeholder="K7QF" autocomplete="off"><button class="btn" data-x="join">Unirse</button>'}
    <div class="st"></div><button class="ghost" data-x="close">Cerrar</button></div>`,document.body.append(et);const e=t=>{io("Conectando…"),t().catch(r=>io((r==null?void 0:r.message)??"Error"))};et.addEventListener("click",t=>{var s;const r=t.target.dataset.x;r&&(r==="close"?Es():r==="create"?e(n.create):r==="join"?e(()=>n.join(et.querySelector("[data-x=code]").value)):r==="leave"&&((s=n.leave)==null||s.call(n),Es()))}),et.addEventListener("keydown",t=>{var r;t.stopPropagation(),t.key==="Enter"&&((r=et.querySelector("[data-x=join]"))==null||r.click())})}const xs=document.getElementById("app"),dt=document.createElement("div");dt.className="preview";document.body.append(dt);const Yp={barrera:"Barrera",robovida:"Robo de vida",arrollar:"Arrollar",letal:"Letal",rapido:"Ataque rápido",duro:"Duro",elusivo:"Elusivo",temible:"Temible",retador:"Retador",regenera:"Regeneración",efimero:"Efímero"},TT={barrera:"anula el siguiente daño que recibiría y luego se pierde.",robovida:"el daño que inflige cura a tu Nexo.",arrollar:"el daño sobrante sobre su bloqueador va al Nexo.",letal:"destruye cualquier unidad a la que dañe.",rapido:"al atacar, golpea antes que su bloqueador.",duro:"recibe 1 de daño menos de cada fuente.",elusivo:"solo puede ser bloqueada por unidades elusivas.",temible:"solo la bloquean unidades con 3 o más de poder.",retador:"al atacar, elige qué enemigo debe bloquearla.",regenera:"se cura por completo al final de cada ronda.",efimero:"muere al golpear o al acabar la ronda."},IT={barrera:"🛡",robovida:"🩸",arrollar:"🐗",letal:"☠",rapido:"⚡",duro:"🪨",elusivo:"🌫",temible:"👁",retador:"⚔",regenera:"♻",efimero:"⏳"},bT={burst:"Ráfaga",focus:"Enfoque",fast:"Rápido",slow:"Lento"},AT={burst:"Ráfaga: se resuelve al instante, no pasa la prioridad y sirve como reacción.",focus:"Enfoque: se resuelve al instante, no pasa la prioridad; solo como acción original.",fast:"Rápido: va a la pila; el rival puede responder. Sirve como reacción.",slow:"Lento: va a la pila; solo como acción original (con la pila vacía)."},ws=n=>n.replace(/[&<>"]/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[e]),xo=()=>md([Fi.Luminarae,Fi.Umbra],Date.now());let A=xo(),Fe=new Set,Tt=new Set,Os=!1,Je=!1,oo=!1,Dr=0,Ee=null,Lt=null,Ut=null,at=[20,20],_r=new Set,ao=[0,0],Ln=0,br=new Map,Bn=[[],[]],yr=A;const Yh=new Map;let dl=!1,Zh=0,ed=-1,Ra=0,se=null,pn=0;const fl=n=>(n+pn)%2,pl=n=>fl(n)?"Umbra":"Luminarae",ka=n=>{se||Bt.react(n)};function Fn(n,e=""){const t=document.createElement("div");t.className="vfx "+n,t.textContent=e,document.body.append(t),setTimeout(()=>t.remove(),1400)}function $t(n){document.querySelectorAll(".toast").forEach(t=>t.remove());const e=document.createElement("div");e.className="vfx toast",e.textContent=n,document.body.append(e),setTimeout(()=>e.remove(),1800)}const Bt=new vg,_t=document.createElement("aside");_t.className="chat";_t.innerHTML=`<div class="tabs"><button data-t="chat" class="on">Chat</button><button data-t="log">Registro</button></div>
  <div class="msgs" id="msgs"></div><div class="logv" id="logv" hidden></div>
  <div class="inp"><input id="chat-in" maxlength="140" placeholder="Escribe un mensaje…" autocomplete="off"><button id="chat-send">➤</button></div>`;document.body.append(_t);const xi=_t.querySelector("#msgs"),Zp=_t.querySelector("#logv"),ml=_t.querySelector("#chat-in");Bt.onMessage(n=>{const e=document.createElement("div");if(e.className="msg "+n.side,n.side==="sys")e.textContent=n.text;else{const t=document.createElement("b");t.textContent=n.from+":",e.append(t,document.createTextNode(n.text))}xi.append(e),xi.scrollTop=xi.scrollHeight,n.side==="foe"&&he("msg")});const em=()=>{const n=ml.value.trim();n&&(ml.value="",se?se.sendChat(n).catch(e=>Bt.sys((e==null?void 0:e.message)??"No se pudo enviar el mensaje")):Bt.send(n))};_t.querySelector("#chat-send").addEventListener("click",em);ml.addEventListener("keydown",n=>{n.key==="Enter"&&em(),n.stopPropagation()});_t.querySelectorAll(".tabs button").forEach(n=>n.addEventListener("click",()=>{const e=n.dataset.t==="log";Zp.hidden=!e,xi.hidden=e,_t.querySelector(".inp").hidden=e,_t.querySelectorAll(".tabs button").forEach(t=>t.classList.toggle("on",t===n))}));Bt.sys("Chat local: escribe y el rival te responderá. Más adelante puede conectarse a Firebase.");function Oi(n,e,t=-1){const r=Ie[n],s=e.map(a=>`<p><b>${Yp[a]}:</b> ${TT[a]}</p>`),i=Or(n);if(r.type==="spell"){const a=Math.min(A.p[0].spell,r.cost);s.push(`<p>✦ ${AT[r.speed??"fast"]}</p><p>💎 Se paga primero con la reserva de hechizo: ${a} de reserva + ${r.cost-a} de maná.</p>`)}else s.push("<p>Puede atacar nada más jugarla. Solo el jugador con la ficha de ataque puede atacar.</p>");if(i&&s.push(`<p>🎯 Eliges tú el objetivo (${i==="enemy"?"unidad enemiga":"unidad aliada"}). Si desaparece antes de resolverse, el hechizo se disipa.</p>`),r.fx.some(a=>a.t==="sacDraw"||a.t==="sacDmg")&&s.push("<p>⚠ Sacrifica a tu unidad más débil.</p>"),t>=0&&!Mr(A,0,t)){const a=A.p[0],l=r.type==="spell"?a.mana+a.spell:a.mana;s.push(`<p>⛔ ${r.cost>l?`Maná insuficiente: cuesta ${r.cost}, tienes ${l}.`:A.active!==0?"Ahora no tienes la prioridad.":r.type==="unit"?a.board.length>=6?"Tu tablero está lleno.":"Solo se juegan unidades con la pila vacía, en tu turno.":"Ahora no puedes jugarla (¿necesita objetivo o pila vacía?)."}</p>`)}return`<div class="rules">${s.join("")}</div>`}const ST=n=>{const e=n.slice(0,3);return`<div class="art"><span class="glyph">${Ie[n].type==="spell"?"✦":e==="lum"?"☀":"☾"}</span><img src="${_g(n)}" onerror="this.remove()"></div>`};function Ft(n,e="",t="",r,s=""){const i=Ie[n],a=n.slice(0,3),l=r?r.kw:i.kw,u=r&&r.dmg>0?"dmg":"",h=(i.type==="spell"?[bT[i.speed??"fast"]]:[]).concat(l.map(f=>Yp[f])).join(" · ");return`<div class="card ${i.type} ${a} ${t}" ${e}>${ST(n)}
    <div class="side"><i class="cost">${i.cost}</i>${l.map(f=>`<i class="ki">${IT[f]}</i>`).join("")}</div>
    <div class="panel"><div class="nm">${Et(n)}</div><div class="orn"></div><p class="tx"><em>${h}</em>${i.text}</p></div>
    ${i.type==="unit"?`<b class="atk ${r&&r.ta?"tmp":""}">${r?ae(r):i.atk}<s>⚔</s></b><b class="hp ${u}">${r?Te(r):i.hp}<s>♥</s></b>`:""}${s}</div>`}function td(n,e,t){document.querySelectorAll(".spot").forEach(s=>s.remove());const r=document.createElement("div");r.className="vfx spot",r.innerHTML=`<div class="spot-l">Juegas</div>${Ft(n,"","",t)}`,document.body.append(r),setTimeout(()=>r.remove(),1250)}function nd(n,e,t){document.querySelectorAll(".reader").forEach(l=>l.remove());const r=Ie[n],s=r.type==="spell"?6500:3800,i=document.createElement("div");i.className="reader foe",dl=!0,i.innerHTML=`<div class="rd-h">⚠ El rival juega</div>${Ft(n,"","",t)}<div class="rd-t"><b>${ws(Et(n))}</b> · coste ${r.cost}<p>${ws(r.text)}</p></div>${Oi(n,t?t.kw:r.kw)}<button class="rd-ok" type="button">Entendido ✓</button><i class="rd-bar" style="animation-duration:${s}ms"></i>`,document.body.append(i);const a=()=>{i.isConnected&&(i.remove(),dl=!1)};i.querySelector(".rd-ok").addEventListener("click",a),i.addEventListener("click",a),setTimeout(a,s)}function rd(n,e,t){const r=n.nexus<at[e]?"hit":n.nexus>at[e]?"heal":"",s=n.nexus-at[e],i=Array.from({length:n.maxMana},(a,l)=>`<u class="${l<n.mana?"on":""}"></u>`).join("");return`<div class="pt ${e?"foe":"me"}"><div class="ava"><span>${fl(e)?"☾":"☀"}</span><img src="/Apexora-TCG/img/avatar_${fl(e)?"umb":"lum"}.webp" onerror="this.remove()"></div>
    <div class="orb ${r}">${Math.max(0,n.nexus)}${s?`<span class="fx">${s>0?"+":""}${s}</span>`:""}</div>
    <div class="pname">${t}</div><div class="pmana">${i}<span class="sm">${[0,1,2].map(a=>`<i class="${a<n.spell?"on":""}"></i>`).join("")}</span></div></div>`}function tm(n,e){if(A.phase!=="main")return;if(se){qn({type:"attack",units:n});return}const t=Dr;Je=!0,Ut={side:e,idx:n},he("attack"),Fn("banner small",`⚔ ${e?"El rival ataca":"Atacas"} con ${n.length}`),we(),setTimeout(()=>{if(t!==Dr)return;Ut=null,Je=!1;const r=Ts(A,{type:"attack",units:n});if(r===A){$t("No puedes atacar ahora"),Fe.clear(),we();return}A=r,Fe.clear(),we(),Hr()},900)}function RT(n,e){const t=n.token,r=1-t,s=n.p[r].nexus-e.p[r].nexus,i=g=>n.p[g].board.filter(S=>!e.p[g].board.some(k=>k.uid===S.uid)).map(S=>Et(S.card)),a=i(0),l=i(1),u=n.attackers.length,h=[`${t?"El rival atacó":"Atacaste"} con ${u}`,s>0?`${t?"Tu Nexo":"Nexo rival"} −${s}`:"sin daño al Nexo"];a.length&&h.push("Tuyas caídas: "+a.join(", ")),l.length&&h.push("Rivales caídas: "+l.join(", "));const f="⚔ "+h.join(" · "),m=document.createElement("div");m.className="vfx report"+(t?"":" good"),m.textContent=f,document.body.append(m),setTimeout(()=>m.remove(),3600),Bt.sys(f)}function we(){A.round!==Ln&&A.round>0&&A.phase!=="mulligan"&&(Zh=Date.now()+1400,setTimeout(()=>we(),1450)),dt.style.display="none",Fm(A.phase==="block"||A.stack.length?1:0);const n=A.p[0],e=A.p[1],t=A.active===0&&A.winner===null&&!Je&&A.phase!=="mulligan",r=A.phase==="block"&&A.token===1&&A.active===0,s=new Set(Object.values(A.blocks)),i=new Set(A.attackers),a=A.attackers.length?A.token:0,l=[];A.attackers.length?A.attackers.forEach(O=>{const F=A.p[a].board.findIndex(_e=>_e.uid===O);if(F<0)return;const B=A.blocks[String(O)],ce=B===void 0?-1:A.p[1-a].board.findIndex(_e=>_e.uid===B);l.push({a:A.p[a].board[F],ai:F,b:ce>=0?A.p[1-a].board[ce]:void 0,bi:ce})}):A.phase==="main"&&Fe.size&&[...Fe].forEach(O=>{n.board[O]&&l.push({a:n.board[O],ai:O,bi:-1})});const u=(O,F)=>l.some(B=>(F===a?B.a:B.b)===O),h=(O,F,B)=>{const ce=B===0,_e=br.get(O.uid),Vt=Te(O);let ue="",oe="";_e&&A.round===Ln&&(Vt<_e[1]?(oe="hurt",ue=String(Vt-_e[1])):(Vt>_e[1]||ae(O)>_e[0])&&(oe="boost",ue="+"+(Vt>_e[1]?Vt-_e[1]:ae(O)-_e[0]))),Yh.set(O.uid,Ft(O.card,"","mini dying",O));const nr=Ee&&(Ee.kind==="enemy"&&!ce||Ee.kind==="ally"&&ce),kn=nr?"tgt":ce?"unit":r&&i.has(O.uid)?"enemy-unit":"view",Oo=ce&&t&&A.phase==="main"&&A.tok[0]&&!A.attackers.length,rr=`mini ${Fe.has(F)&&ce?"sel ":""}${Oo?"can ":""}${_r.has(O.uid)?"":"enter "}${oe} ${nr?"tgtok ":""}${!ce&&Lt===F?"blocktarget ":""}${ce&&s.has(O.uid)?"assignedblock ":""}${A.forced.includes(O.uid)||A.forced.some(Mo=>A.blocks[String(Mo)]===O.uid)?"forced ":""}${i.has(O.uid)?"atkr ":""}${Ut&&Ut.side===B&&Ut.idx.includes(F)?"attacking "+(B?"down":"up"):""}`;return Ft(O.card,`data-u="${B}:${F}" data-a="${kn}" data-i="${F}" data-uid="${O.uid}"`,rr,O,ue?`<span class="fx">${ue}</span>`:"")},f=(O,F)=>{const B=[],ce=[];O.board.forEach((ue,oe)=>{u(ue,F)||B.push(h(ue,oe,F))}),l.forEach(ue=>{const oe=F===a?ue.a:ue.b,nr=F===a?ue.ai:ue.bi;ce.push(oe?h(oe,nr,F):`<div class="slot cslot ${F?"umb":"lum"} ${r&&F===0?"ask":""}">${r&&F===0?"<span>Elige<br>defensor</span>":""}</div>`)});const _e=Bn[F].filter(ue=>!O.board.some(oe=>oe.uid===ue)).map(ue=>Yh.get(ue)??""),Vt=Array.from({length:Math.max(0,6-O.board.length)},(ue,oe)=>`<div class="slot ${F?"umb":"lum"}">${_e[oe]??""}</div>`).join("");return{back:B.join("")+Vt,comb:ce.join("")}},m=f(e,1),g=f(n,0),S=A.phase==="mulligan"?"Mulligan":A.phase==="main"?"Prioridad":A.phase==="block"?"Bloqueos":"Pila",k=A.winner!==null?A.winner===-1?"Empate":A.winner===0?"¡Victoria!":"Derrota":Ee?`Elige objetivo para ${Et(n.hand[Ee.hand])} · Esc cancela`:A.phase==="stack"?t?`Responde o pulsa OK · ${A.stack.length} en la pila`:`Pila · ${A.stack.length}`:A.phase==="block"?r?"Toca un atacante y luego tu bloqueador":A.active===0?"Rival bloqueó: puedes responder o resolver":"El rival asigna bloqueos…":t?A.passes===1?"El rival pasó: pasa también para cerrar la ronda":A.tok[0]?"Tu turno: juega cartas o selecciona unidades y ataca":"Tu turno: juega cartas o pasa":"El rival tiene la prioridad…",N=A.log.slice(-14).map(O=>O.replace(/\{(\w+)\}/g,(F,B)=>`<b>${Et(B)}</b>`)).join("<br>"),V=A.attackers.length?`<div class="blocksummary"><b>⚔ Combate</b>${A.attackers.map(O=>{const F=A.p[A.token].board.find(_e=>_e.uid===O),B=A.blocks[String(O)],ce=B===void 0?void 0:A.p[1-A.token].board.find(_e=>_e.uid===B);return`<span>${F?Et(F.card):"?"} <i>→</i> ${ce?Et(ce.card):"<em>Sin bloquear</em>"}</span>`}).join("")}</div>`:"";let G="RIVAL",z="wait";t&&(A.phase==="main"?Fe.size?(G=`ATACAR ${Fe.size}`,z="atk"):(G=A.passes===1?"FIN DE RONDA":"PASAR",z="go"):A.phase==="block"?(G=r?Object.keys(A.blocks).length?"BLOQUEAR":"SIN BLOQUEO":"RESOLVER",z="go"):(G="OK",z="go"));const X=O=>{const F=O===void 0?void 0:[...A.p[0].board,...A.p[1].board].find(B=>B.uid===O);return F?Et(F.card):""},fe=A.stack.length?`<div class="stacktray"><b>✦ Pila · se resuelve de arriba abajo</b>${[...A.stack].map((O,F)=>({x:O,k:F})).reverse().map(({x:O,k:F},B)=>{const ce=Ie[O.card],_e=X(O.target);return`<div data-st="${F}" class="stackitem ${O.owner?"foe":"me"} ${B===0?"top":""}"><div class="si-h"><em>${O.owner?"Rival":"Tú"}</em><strong>${Et(O.card)}</strong><i>${ce.cost}</i></div><p>${ws(ce.text)}</p>${_e?`<small>🎯 Objetivo: ${ws(_e)}</small>`:""}</div>`}).join("")}</div>`:"",tt=Date.now()<Zh&&A.phase!=="mulligan",ve=A.phase==="block"||A.phase==="stack"&&A.resumePhase==="block",w=A.phase==="mulligan"?-1:tt?0:ve?2:A.passes===1&&!A.attackers.length&&A.phase==="main"?3:1,_=[["ROBO","Robas 1 carta y ganas 1 de maná"],["INVOCACIÓN","Juega unidades y hechizos"],["COMBATE","Ataque y bloqueo · hechizos rápidos permitidos"],["FINAL","Si ambos pasáis, acaba la ronda y pasa el turno"]];xs.dataset.ph=String(w);const y=A.winner!==null||A.phase==="mulligan"?"":A.active===0?"mine":"theirs",E=`<div class="phasehud ${y}"><div class="who">${y==="mine"?"⚡ TU TURNO":y?"⏳ TURNO RIVAL":"PARTIDA"}</div><ol>${_.map((O,F)=>`<li class="${F===w?"on":F<w?"done":""}"><i>${F+1}</i><span>${O[0]}</span>${F===w?`<small>${O[1]}</small>`:""}</li>`).join("")}</ol>${A.stack.length?'<div class="hstack">✦ Pila activa</div>':""}</div>`,T=n.hand.length,b=n.hand.map((O,F)=>{const B=F-(T-1)/2;return`<div class="slotc" data-a="hand" data-i="${F}" style="--rot:${(B*3.2).toFixed(1)}deg;--y:${(B*B*2.6).toFixed(1)}px" aria-label="${ws(Et(O))}, coste ${Ie[O].cost}">${Ft(O,"",`${t&&Mr(A,0,F)?"ok":"no"} ${(Ee==null?void 0:Ee.hand)===F?"sel":""}`)}</div>`}).join(""),v=A.phase==="mulligan"&&A.mull[0]?'<div class="mull"><h2>Mulligan</h2><p>Esperando al rival…</p></div>':A.phase==="mulligan"?`<div class="mull"><h2>Mulligan</h2><p>Toca las cartas que quieras reemplazar (0 a 4)</p><div class="mrow">${n.hand.map((O,F)=>Ft(O,`data-a="mul" data-i="${F}"`,Tt.has(F)?"sel swap":"")).join("")}</div><button class="btn" data-a="mulgo">${Tt.size?`Reemplazar ${Tt.size}`:"Conservar mano"}</button></div>`:"";xs.innerHTML=`<header><div class="brand"><span class="brand-mark">✦</span><h1>Cartas <small>ALFA</small></h1></div><div class="header-state"><span class="rd">Ronda ${A.round}/40</span><span class="phase-chip">${S}</span><span class="tok">${A.tok[0]?"⚑ Tienes la ficha de ataque":A.tok[1]?"⚑ Ficha de ataque: rival":"⚑ Ficha gastada"}</span></div>
    <nav class="toolbar"><button class="ghost" data-a="chat">${Os?"✕ Cerrar":"☰ Chat / registro"}</button><button class="ghost icon-btn" data-a="mute">${Mm()?"🔇":"🔊"}</button><button class="ghost" data-a="menu">⌂ Menú</button><button class="ghost" data-a="online">🌐 Online</button><button class="ghost" data-a="new">↻ Nueva partida</button></nav></header><main class="stage ${Ee?"targeting":""}">
      <div class="foehand">${Array.from({length:e.hand.length},()=>"<i></i>").join("")}</div>
      <div class="plane-wrap"><div class="plane"><div class="lane foeback">${m.back}</div><div class="lane foecomb">${m.comb}</div><div class="lane mycomb">${g.comb}</div><div class="lane myback">${g.back}</div></div></div>
      
      <div class="msgbar"><span class="pill ${t?"go":""}">${k}</span></div>
      <aside class="sideL">${E}${fe}${V}<div class="pgroup me"><div class="pile p0" data-l="MAZO" title="Tu mazo"><b>${n.deck.length}</b></div>${rd(n,0,`${pl(0)} · Tú`)}</div></aside>
      <aside class="sideR"><div class="pgroup foe">${rd(e,1,`${pl(1)} · Rival`)}<div class="pile p1" data-l="MAZO" title="Mazo rival"><b>${e.deck.length}</b></div></div>
      <div class="manapanel"><div class="mrow2"><b>MANÁ</b><span>${n.mana}/${n.maxMana}</span></div><div class="gems">${Array.from({length:Math.max(n.maxMana,1)},(O,F)=>`<u class="${F<n.mana?"on":""}"></u>`).join("")}</div>
        <div class="mrow2" title="Reserva exclusiva para hechizos: se gasta ANTES que el maná normal y se rellena con el maná que te sobra al acabar la ronda (máximo 3)."><b>RESERVA ✦</b><span>${n.spell}/3</span></div><div class="gems sp">${[0,1,2].map(O=>`<u class="${O<n.spell?"on":""}"></u>`).join("")}</div><p class="mnote">Reserva: solo hechizos, se gasta primero. Se llena con el maná que sobra al cerrar la ronda (máx. 3).</p></div>
      <button class="endbtn ${z}" data-a="${z==="atk"?"attack":"go"}" ${z==="wait"?"disabled":""}><span>${G}</span></button></aside>
      <div class="fan">${b}</div></main>`+v+(A.winner!==null?`<div class="over"><h2>${k}</h2><button class="btn" data-a="new">Jugar de nuevo</button></div>`:"");const ut=A.p.some(O=>O.board.some(F=>!_r.has(F.uid))),Rn=Bn.some(O=>O.some(F=>!A.p.some(B=>B.board.some(ce=>ce.uid===F))));ut&&he("summon"),Rn&&he("death"),A.p.forEach((O,F)=>O.board.filter(B=>!_r.has(B.uid)).forEach(B=>F?nd(B.card,1,B):td(B.card,0,B))),n.nexus<at[0]?Fn("vhit"):n.nexus>at[0]&&Fn("vheal"),(n.nexus<at[0]||e.nexus<at[1])&&he("hurt"),(n.nexus>at[0]||e.nexus>at[1])&&he("heal"),A.p.forEach((O,F)=>{const B=O.played[O.played.length-1];O.played.length>ao[F]&&B&&Ie[B].type==="spell"&&(Fn("cast "+B.slice(0,3)),he("spell_"+B.slice(0,3)),F?nd(B):td(B),F===1&&ka("cast"))}),A.round!==Ln&&A.round>0&&(Fn("banner",`Ronda ${A.round}`),he("round"),n.spell>Ra&&setTimeout(()=>$t(`✦ +${n.spell-Ra} reserva de hechizo (maná sobrante)`),1500)),A.active===0&&ed!==0&&!Je&&A.winner===null&&A.phase!=="mulligan"&&A.round===Ln&&(Fn("banner small turn",r?"🛡 Tu turno · bloquea":"⚡ Tu turno"),he("round")),ed=A.phase==="mulligan"?-1:A.active,Ra=n.spell,yr.attackers.length&&!A.attackers.length&&yr.round===A.round&&RT(yr,A),at=[n.nexus,e.nexus],ao=A.p.map(O=>O.played.length),Ln=A.round,yr=A,br=new Map,Bn=[[],[]],A.p.forEach((O,F)=>O.board.forEach(B=>{_r.add(B.uid),br.set(B.uid,[ae(B),Te(B)]),Bn[F].push(B.uid)})),A.winner!==null&&!oo&&(oo=!0,se&&fn.clearSaved(),he(A.winner===0?"win":"lose"),A.winner===0?ka("win"):A.winner===1&&ka("lose")),Zp.innerHTML=N,_t.hidden=!Os}function qn(n){if(se){if(Je||se.busy)return;if(!se.isReady){$t("Esperando al rival… Para jugar contra la IA, sal de la sala desde 🌐 Online");return}if(Ts(A,vT(n))===A){$t(n.type==="block"?"Ese bloqueo no es válido (Elusivo/Temible/ya asignado)":n.type==="play"?"No puedes jugar eso ahora":"Acción no válida");return}(n.type==="pass"||n.type==="confirmBlocks")&&he("pass"),Je=!0,Fe.clear(),Ee=null,Lt=null,we(),se.send(n).then(r=>{r||(Je=!1,we())});return}const e=Ts(A,n);if(e===A){$t(n.type==="block"?"Ese bloqueo no es válido (Elusivo/Temible/ya asignado)":n.type==="play"?"No puedes jugar eso ahora":"Acción no válida");return}(n.type==="pass"||n.type==="confirmBlocks")&&he("pass"),A=e,Fe.clear(),Ee=null,Lt=null,we(),Hr()}function Hr(){if(se||A.winner!==null||A.active!==1||A.phase==="mulligan")return;const n=Dr,e=()=>{if(n!==Dr||Je||A.winner!==null||A.active!==1)return;if(dl){setTimeout(e,300);return}const t=mg(A);if(t.type==="attack"){tm(t.units,1);return}A=Ts(A,t),we(),Hr()};setTimeout(e,1200)}function gl(){A.active===0&&A.winner===null&&!Je&&(he("click"),A.phase==="main"&&Fe.size?tm([...Fe],0):A.phase==="block"&&A.token===1?qn({type:"confirmBlocks"}):qn({type:"pass"}))}xs.addEventListener("click",n=>{const e=n.target.closest("[data-a]");if(Ee&&(e==null?void 0:e.dataset.a)!=="tgt"&&(Ee=null,we(),!e||e.dataset.a==="hand")||!e)return;const t=e.dataset.a,r=Number(e.dataset.i),s=A.active===0&&A.winner===null&&!Je&&A.phase!=="mulligan";if(t==="chat")Os=!Os,he("click"),we();else if(t==="mute")Lm(),he("click"),we();else if(t==="new"&&se)$t("Para otra partida online crea o únete a una sala nueva"),hl(_l());else if(t==="menu")he("click"),cd();else if(t==="online")he("click"),hl(_l());else if(t==="new")he("click"),Dr++,Je=!1,Ut=null,Lt=null,Ee=null,A=xo(),Fe.clear(),Tt.clear(),at=[20,20],_r.clear(),ao=[0,0],Ln=0,br.clear(),Bn=[[],[]],oo=!1,yr=A,we();else if(t==="mul")he("select"),Tt.has(r)?Tt.delete(r):Tt.add(r),we();else if(t==="mulgo"){he("click");const i=[...Tt];Tt.clear(),qn({type:"mulligan",idx:i})}else if(s)if(t==="tgt"){if(Ee){const i=Number(e.dataset.uid),a=Ee.hand;qn({type:"play",hand:a,target:i})}}else if(t==="hand"){if(!Mr(A,0,r)){$t("No puedes jugar esa carta ahora");return}const i=Or(A.p[0].hand[r]);he("select"),i?(Ee={hand:r,kind:i},we()):qn({type:"play",hand:r})}else t==="go"||t==="attack"?gl():t==="enemy-unit"&&A.phase==="block"?(Lt=r,he("select"),we()):t==="unit"&&A.phase==="block"&&A.token===1?Lt===null?$t("Primero toca al atacante rival"):qn({type:"block",attacker:Lt,blocker:r}):t==="unit"&&A.phase==="main"&&A.tok[0]&&!A.attackers.length&&(Fe.has(r)?Fe.delete(r):Fe.add(r),he("select"),we());else return});document.addEventListener("keydown",n=>{n.target.tagName!=="INPUT"&&(n.key==="Escape"&&Ee?(Ee=null,we()):n.key===" "&&A.phase!=="mulligan"&&(n.preventDefault(),gl()))});document.addEventListener("contextmenu",n=>{Ee&&(n.preventDefault(),Ee=null,we())});const nm=()=>document.querySelectorAll(".manapanel u.pay").forEach(n=>n.classList.remove("pay"));function kT(n){nm();const e=Ie[n],t=A.p[0],r=e.type==="spell"?Math.min(t.spell,e.cost):0,s=e.cost-r,i=document.querySelectorAll(".manapanel .gems"),a=(l,u,h)=>{var m;if(!l)return;const f=l.querySelectorAll("u");for(let g=u-1;g>=Math.max(0,u-h);g--)(m=f[g])==null||m.classList.add("pay")};a(i[0],t.mana,s),a(i[1],t.spell,r)}xs.addEventListener("mouseover",n=>{var r,s;const e=n.target.closest("[data-st]");if(e){const i=(r=A.stack[Number(e.dataset.st)])==null?void 0:r.card;i&&(dt.innerHTML=Ft(i)+Oi(i,Ie[i].kw),dt.style.display="block");return}const t=n.target.closest('[data-u],[data-a="hand"]');if((!t||!t.dataset.i||t.dataset.a!=="hand")&&nm(),(t==null?void 0:t.dataset.a)==="hand"){const i=A.p[0].hand[Number(t.dataset.i)];i&&kT(i)}if(!t){dt.style.display="none";return}if(t.dataset.u){const[i,a]=t.dataset.u.split(":").map(Number),l=(s=A.p[i])==null?void 0:s.board[a];l&&(dt.innerHTML=Ft(l.card,"","",l)+Oi(l.card,l.kw),dt.style.display="block")}else{const i=Number(t.dataset.i),a=A.p[0].hand[i];a&&(dt.innerHTML=Ft(a)+Oi(a,Ie[a].kw,i),dt.style.display="block")}});xs.addEventListener("mouseleave",()=>{dt.style.display="none"});const Hn=[];let xr=!1;function lo(n){Dr++,Je=!1,Ut=null,Lt=null,Ee=null,A=n,Fe.clear(),Tt.clear(),oo=n.winner!==null,at=[n.p[0].nexus,n.p[1].nexus],ao=n.p.map(e=>e.played.length),Ln=n.round,yr=n,_r=new Set(n.p.flatMap(e=>e.board.map(t=>t.uid))),br=new Map,Bn=[[],[]],n.p.forEach((e,t)=>e.board.forEach(r=>{br.set(r.uid,[ae(r),Te(r)]),Bn[t].push(r.uid)})),we()}function rm(){const n=Hn.shift();if(!n){xr=!1;return}xr=!0;const e=ul(Jp(n.before,n.seat,n.action),pn),t=()=>{Ut=null,Je=!1,A=e,Fe.clear(),Ee=null,Lt=null,we(),setTimeout(rm,0)};if(n.action.type==="attack"&&Hn.length===0){const r=n.seat===pn?0:1;Je=!0,Ut={side:r,idx:n.action.units},he("attack"),Fn("banner small",`⚔ ${r?"El rival ataca":"Atacas"} con ${n.action.units.length}`),we(),setTimeout(t,900)}else t()}function _l(){return{inRoom:!!se,create:async()=>{yl();try{const n=await se.create();Ds(`Sala ${n} · esperando rival…`),io(`Código de sala: ${n} — pásaselo a tu rival`)}catch(n){throw se=null,n}},join:async n=>{yl();try{await se.join(n)}catch(e){throw se=null,e}},leave:()=>{se==null||se.close(),se=null,pn=0,Hn.length=0,xr=!1,Ds(""),lo(xo()),Hr()}}}function yl(){se||(se=new fn({onStatus:n=>{Ds(n),io(n)},onChat:n=>{Bt.push({from:n.mine?"Tú":"Rival",text:n.text,side:n.mine?"me":"foe"}),!n.mine&&!Os&&$t("💬 Rival: "+n.text.slice(0,60))},onReady:()=>{pn=se.seat,Es(),ud(),Bt.sys("Chat online activo: puedes escribir a tu rival."),lo(ul(se.g,pn)),Bt.sys(`Sala ${se.code}: juegas con ${pl(0)}.`)},onMoves:(n,e,t)=>{t?(Hn.length=0,lo(ul(n,pn))):(Hn.push(...e),xr||rm())},onSettled:()=>{!xr&&!Hn.length&&Je&&(Je=!1,we())}}))}const sd=fn.savedCode();sd&&(yl(),se.resume(sd).catch(()=>{se=null,fn.clearSaved(),Ds("")}));document.addEventListener("menu:ia",()=>{se&&(se.close(),se=null,pn=0,Hn.length=0,xr=!1,Ds(""),Es(),lo(xo()),Hr())});document.addEventListener("menu:online",()=>hl(_l()));we();Hr();ig();
