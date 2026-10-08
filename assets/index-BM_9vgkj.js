var xm=Object.defineProperty;var Om=(n,e,t)=>e in n?xm(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var Ne=(n,e,t)=>Om(n,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=t(s);fetch(s.href,i)}})();let j,jn,ds,Ei,os,Ra=!1,It=!1,uu=!1,sd=0,sa=0,hu=0,ui=0;try{It=localStorage.getItem("cartas-mute")==="1"}catch{}const Mm=()=>It;function Lm(){It=!It;try{localStorage.setItem("cartas-mute",It?"1":"0")}catch{}return Ra&&Ei.gain.setTargetAtTime(It?0:.85,j.currentTime,.06),It}function Fm(n){sd=n}const ne=n=>440*Math.pow(2,(n-69)/12),as=(n,e)=>n+Math.random()*(e-n);function Um(n){const e=j.sampleRate,t=Math.floor(e*n),r=j.createBuffer(2,t,e);for(let s=0;s<2;s++){const i=r.getChannelData(s);let a=0;for(let c=0;c<t;c++){const u=c/t,h=.9-.78*u;a+=(Math.random()*2-1-a)*h,i[c]=c<e*.018?0:a*Math.pow(1-u,2.8)*(c<e*.02?.2:1)}for(const[c,u]of[[23,.5],[37,.35],[53,.3],[71,.22]])i[Math.floor(e*(c+s*5)/1e3)]+=u*(s?-1:1)}return r}function id(){if(Ra){j.state==="suspended"&&j.resume();return}j=new AudioContext,Ra=!0;const n=j.createDynamicsCompressor();n.threshold.value=-20,n.knee.value=18,n.ratio.value=3.5,n.attack.value=.004,n.release.value=.22;const e=j.createBiquadFilter();e.type="lowshelf",e.frequency.value=140,e.gain.value=2.5;const t=j.createBiquadFilter();t.type="highshelf",t.frequency.value=6500,t.gain.value=1.5,Ei=j.createGain(),Ei.gain.value=It?0:.85;const r=j.createGain();r.connect(e).connect(t).connect(n).connect(Ei).connect(j.destination);const s=j.createConvolver();s.buffer=Um(3.2);const i=j.createGain();i.gain.value=.9,s.connect(i).connect(r);const a=j.createDelay(1);a.delayTime.value=.375;const c=j.createGain();c.gain.value=.4;const u=j.createBiquadFilter();u.type="lowpass",u.frequency.value=2200,a.connect(u).connect(c).connect(a),u.connect(r),u.connect(s),jn=j.createGain(),ds=j.createGain(),ds.gain.value=.55;const h=(m,g,S)=>{m.connect(r);const P=j.createGain();if(P.gain.value=g,m.connect(P).connect(s),S){const x=j.createGain();x.gain.value=S,m.connect(x).connect(a)}};h(jn,.32,.06),h(ds,.6,.22),os=j.createWaveShaper();const f=new Float32Array(1024);for(let m=0;m<1024;m++){const g=m/512-1;f[m]=Math.tanh(g*4)*.8}os.curve=f,os.oversample="2x",os.connect(jn)}function De(n,e,t,r={}){const s=j.createGain(),i=j.createBiquadFilter(),a=j.createStereoPanner(),c=(r.vol??.1)*(r.det?.6:1),u=r.att??.004;if(i.type="lowpass",i.Q.value=r.q??.7,i.frequency.setValueAtTime(r.lp??9e3,e),r.lpEnd&&i.frequency.exponentialRampToValueAtTime(Math.max(40,r.lpEnd),e+t),a.pan.value=r.pan??0,s.gain.setValueAtTime(1e-4,e),s.gain.linearRampToValueAtTime(c,e+u),r.pad){const h=r.rel??t*.4;s.gain.setValueAtTime(c,e+Math.max(u,t-h)),s.gain.linearRampToValueAtTime(1e-4,e+t)}else s.gain.exponentialRampToValueAtTime(1e-4,e+t);i.connect(s).connect(a).connect(r.bus??jn);for(const h of r.det?[-r.det,r.det]:[0]){const f=j.createOscillator();if(f.type=r.type??"sine",f.frequency.setValueAtTime(n,e),f.detune.value=h,r.slide&&f.frequency.exponentialRampToValueAtTime(Math.max(20,n*Math.pow(2,r.slide/12)),e+t),r.vib){const m=j.createOscillator(),g=j.createGain();m.frequency.value=5,g.gain.value=r.vib,m.connect(g).connect(f.detune),m.start(e),m.stop(e+t+.1)}f.connect(i),f.start(e),f.stop(e+t+.1)}}function Ge(n,e,t,r={}){const s=j.createOscillator(),i=j.createOscillator(),a=j.createGain(),c=j.createGain(),u=j.createStereoPanner(),h=(r.idx??2)*n;s.frequency.value=n,i.frequency.value=n*(r.ratio??2.01),a.gain.setValueAtTime(h,e),a.gain.exponentialRampToValueAtTime(Math.max(1,h*.02),e+t),i.connect(a).connect(s.frequency),c.gain.setValueAtTime(1e-4,e),c.gain.linearRampToValueAtTime(r.vol??.1,e+(r.att??.003)),c.gain.exponentialRampToValueAtTime(1e-4,e+t),u.pan.value=r.pan??0,s.connect(c).connect(u).connect(r.bus??jn),s.start(e),i.start(e),s.stop(e+t+.1),i.stop(e+t+.1)}let ss;function od(){if(ss)return ss;ss=j.createBuffer(1,j.sampleRate*2,j.sampleRate);const n=ss.getChannelData(0);let e=0,t=0,r=0;for(let s=0;s<n.length;s++){const i=Math.random()*2-1;e=.99765*e+i*.099,t=.963*t+i*.2965,r=.57*r+i*1.0527,n[s]=(e+t+r+i*.1848)*.2}return ss}function it(n,e,t={}){const r=j.createBufferSource(),s=j.createBiquadFilter(),i=j.createGain(),a=j.createStereoPanner(),c=t.att??.004;r.buffer=od(),s.type=t.type??"bandpass",s.Q.value=t.q??1,s.frequency.setValueAtTime(t.f0??1e3,n),s.frequency.exponentialRampToValueAtTime(Math.max(30,t.f1??t.f0??1e3),n+e),i.gain.setValueAtTime(1e-4,n),i.gain.linearRampToValueAtTime(t.vol??.1,n+c),i.gain.exponentialRampToValueAtTime(1e-4,n+e),a.pan.value=t.pan??0,r.connect(s).connect(i).connect(a).connect(t.bus??jn),r.start(n,Math.random()*1.4),r.stop(n+e+.05)}function vt(n,e,t,r){const s=j.createOscillator(),i=j.createGain();s.frequency.setValueAtTime(e*2.2,n),s.frequency.exponentialRampToValueAtTime(e,n+.09),i.gain.setValueAtTime(t,n),i.gain.exponentialRampToValueAtTime(1e-4,n+.7),s.connect(i).connect(r??jn),s.start(n),s.stop(n+.75),it(n,.06,{type:"lowpass",f0:1200,f1:300,vol:t*.5,bus:r})}const ze=()=>j.currentTime+.01,ia={hover:()=>Ge(ne(96),ze(),.09,{vol:.02,ratio:3.5,idx:.8,pan:as(-.3,.3)}),click:()=>{const n=ze();it(n,.06,{f0:2200,f1:900,q:2,vol:.12}),De(220,n,.1,{vol:.14,slide:-7})},select:()=>{const n=ze();Ge(ne(84),n,.5,{vol:.07,ratio:2,idx:1.2,pan:-.15}),Ge(ne(91),n+.06,.6,{vol:.05,ratio:2,idx:1,pan:.15})},start:()=>{const n=ze();[38,45,50,57,62,65].forEach((t,r)=>De(ne(t),n,2.4,{type:"sawtooth",vol:.035,att:1,pad:!0,rel:1.2,lp:300,lpEnd:3200,det:9,pan:(r-2.5)*.15})),it(n,1.3,{f0:300,f1:7e3,q:.8,vol:.13,att:1.15}),vt(n,40,.5);const e=n+1.25;vt(e,48,1),[62,65,69,74,81].forEach((t,r)=>De(ne(t),e,2.6,{type:"triangle",vol:.06,lp:4e3,pan:(r-2)*.25})),Ge(ne(86),e,3,{vol:.09,ratio:1.5,idx:2})},pass:()=>{const n=ze();it(n,.35,{f0:600,f1:200,q:1.2,vol:.09,att:.08}),De(ne(50),n,.3,{vol:.08,slide:-5})},summon:()=>{const n=ze();vt(n,48,.9),it(n,.5,{type:"lowpass",f0:3e3,f1:150,q:.7,vol:.25}),[81,86,90,93].forEach((e,t)=>Ge(ne(e),n+.05+t*.05,1.2,{vol:.05,ratio:3,idx:1.5,pan:(t-1.5)*.3})),De(ne(38),n,.9,{type:"sawtooth",vol:.08,lp:1500,lpEnd:150,det:12,att:.02})},spell_lum:()=>{const n=ze();[74,76,78,81,83,86,90].forEach((e,t)=>De(ne(e),n+t*.055,1.3,{type:"triangle",vol:.07,pan:-.5+t*.16})),Ge(ne(93),n+.4,2.2,{vol:.06,ratio:2.76,idx:1}),it(n,1.2,{type:"highpass",f0:5e3,f1:9e3,vol:.05,att:.5})},spell_umb:()=>{const n=ze();De(ne(50),n,1.4,{type:"sawtooth",vol:.12,slide:-12,lp:2400,lpEnd:100,det:15}),De(ne(25),n,1.6,{vol:.35,att:.05}),it(n,1.2,{type:"lowpass",f0:200,f1:2600,vol:.18,att:.9}),Ge(ne(63),n+.2,2,{ratio:1.414,idx:3,vol:.06,pan:-.3}),Ge(ne(57),n+.2,2,{ratio:1.414,idx:3,vol:.05,pan:.3})},attack:()=>{const n=ze(),e=n+.2;it(n,.22,{f0:800,f1:7e3,q:1.5,vol:.18,att:.12}),Ge(ne(88),e,.7,{ratio:3.1,idx:3,vol:.09}),Ge(ne(95),e,.5,{ratio:4.7,idx:2,vol:.05}),vt(e,70,.5),it(e,.12,{type:"highpass",f0:3e3,f1:1500,vol:.15})},hurt:()=>{const n=ze();vt(n,45,1),De(ne(40),n,.5,{type:"sawtooth",vol:.18,lp:1200,lpEnd:120,bus:os}),it(n,.35,{type:"lowpass",f0:2500,f1:100,vol:.3}),Ge(ne(79),n+.02,1.2,{ratio:1.41,idx:2,vol:.04})},heal:()=>{const n=ze();[74,78,81,86].forEach((e,t)=>Ge(ne(e),n+t*.08,1.4,{vol:.06,ratio:2,idx:.8,pan:-.3+t*.2})),[62,69].forEach(e=>De(ne(e),n,1.6,{vol:.08,att:.3,pad:!0}))},death:()=>{const n=ze();De(ne(55),n,1,{type:"sawtooth",vol:.14,slide:-14,lp:2500,lpEnd:100,det:14}),it(n,.9,{f0:3e3,f1:150,q:.6,vol:.16}),vt(n+.05,42,.7)},round:()=>{const n=ze();[1,2.32,3.17,4.1,5.4].forEach((e,t)=>De(ne(43)*e,n,3.6-t*.4,{vol:.09/(t+1),pan:(t%2?1:-1)*.2})),vt(n,52,.8),it(n,.5,{f0:500,f1:3e3,vol:.06,att:.4})},win:()=>{const n=ze();[[62,66,69,74],[67,71,74,79],[69,73,76,81,86]].forEach((e,t)=>{e.forEach((r,s)=>{De(ne(r),n+t*.45,1.9,{type:"triangle",vol:.055,lp:5e3,pan:(s-2)*.2}),Ge(ne(r+12),n+t*.45+.02*s,1.8,{vol:.03,ratio:2,idx:.7})})}),vt(n+.9,50,.8)},lose:()=>{const n=ze();[62,60,57,55,50].forEach((e,t)=>De(ne(e),n+t*.5,2,{type:"sawtooth",vol:.07,lp:900,lpEnd:150,det:10,att:.1})),De(ne(26),n,3,{vol:.2,att:.4,pad:!0})},msg:()=>{const n=ze();Ge(ne(93),n,.5,{vol:.05,ratio:2,idx:.6}),Ge(ne(98),n+.08,.6,{vol:.04,ratio:2,idx:.6})}},wi=new Map;function $m(n){wi.has(n)||(wi.set(n,null),fetch(`/sfx/${n}.mp3`).then(e=>{e.ok&&(e.headers.get("content-type")||"").startsWith("audio")&&wi.set(n,e.url)}).catch(()=>{}))}function he(n){var t;if(It)return;$m(n);const e=wi.get(n);if(e){const r=new Audio(e);r.volume=.7,r.play().catch(()=>{});return}try{id(),(t=ia[n])==null||t.call(ia)}catch{}}const Ti=60/72,Ii=Ti*4,Bm=[38,34,41,36],jm=[[62,65,69,74],[58,62,65,70],[57,60,65,69],[55,60,64,67]],du=[62,65,67,69,72,74,77];function qm(n,e){if(It||document.hidden)return;sa+=(sd-sa)*.5;const t=e%4,r=jm[t],s=sa,i=ds;if(r.forEach((c,u)=>De(ne(c),n,Ii*1.08,{type:"sawtooth",vol:.02,att:1.2,pad:!0,rel:1.3,lp:650+s*900,det:8+u*2,pan:(u-1.5)*.35,bus:i})),De(ne(Bm[t]),n,Ii*1.02,{vol:.15,att:.25,pad:!0,rel:1,bus:i}),[0,2,1,3,2,1,3,2].forEach((c,u)=>{if(Math.random()<(s?.9:.7)){const h=r[c]+(u%4===3&&Math.random()<.4?12:0)+12;De(ne(h),n+u*Ti/2,1.1,{type:"triangle",vol:.035+s*.01,pan:Math.sin(u)*.5,bus:i})}}),e%2===0&&Math.random()<.7&&Ge(ne(du[Math.floor(Math.random()*du.length)]+12),n+Ti*(Math.random()<.5?0:2),3,{vol:.045,ratio:2,idx:.7,pan:as(-.5,.5),bus:i}),t===0&&vt(n,44,.35,i),s>.5)for(let c=0;c<4;c++)vt(n+c*Ti,c%2?80:58,c===2?.28:.18,i);for(let c=0;c<4;c++)Math.random()<.6&&it(n+as(0,Ii),.03,{type:"highpass",f0:4e3,f1:3e3,vol:as(.008,.02),pan:as(-.8,.8),bus:i})}function zm(){const n=j.createBufferSource(),e=j.createBiquadFilter(),t=j.createGain(),r=j.createOscillator(),s=j.createGain();n.buffer=od(),n.loop=!0,e.type="bandpass",e.frequency.value=420,e.Q.value=.9,t.gain.value=.045,r.frequency.value=.07,s.gain.value=.03,r.connect(s).connect(t.gain);const i=j.createOscillator(),a=j.createGain();return i.frequency.value=.05,a.gain.value=250,i.connect(a).connect(e.frequency),n.connect(e).connect(t).connect(ds),n.start(),r.start(),i.start(),()=>{t.gain.setTargetAtTime(0,j.currentTime,.4),setTimeout(()=>{n.stop(),r.stop(),i.stop()},2e3)}}function Hm(){uu||(id(),uu=!0,hu=0,ui=j.currentTime+.15,zm(),window.setInterval(()=>{for(;ui<j.currentTime+1.3;)qm(ui,hu++),ui+=Ii},400))}const Gm={lum:[45,168],umb:[272,350],fire:[22,48],heal:[145,50]},Ae=Math.random,U=(n,e)=>n+Ae()*(e-n),oa=n=>1-(1-n)**3;let ar,V,br=0,mn=0,ka=!1,Pa=0;const lr=[];function X(n){lr.push({x:0,y:0,vx:0,vy:0,g:0,d:1,t:0,life:600,delay:0,sz:4,gr:0,rot:0,vr:0,h:45,s:100,l:70,a:1,n:0,w:2,add:!0,x1:0,y1:0,bulge:0,pts:[],cx:0,cy:0,ang:0,rad:0,va:0,vrad:0,...n}),ka||(ka=!0,Pa=performance.now(),requestAnimationFrame(ad))}const mc=(n,e)=>setTimeout(e,n);function ad(n){const e=Math.min(40,n-Pa),t=e/16.667;Pa=n,V.clearRect(0,0,br,mn);for(let r=lr.length-1;r>=0;r--){const s=lr[r];if(s.delay>0){s.delay-=e;continue}if(s.t+=e,s.t>=s.life){lr.splice(r,1);continue}if(s.k==="vort"){if(s.ang+=s.va*e,s.rad+=s.vrad*e,s.rad<2){lr.splice(r,1);continue}s.x=s.cx+Math.cos(s.ang)*s.rad,s.y=s.cy+Math.sin(s.ang)*s.rad}else{s.vy+=s.g*t;const i=s.d**t;s.vx*=i,s.vy*=i,s.x+=s.vx*t,s.y+=s.vy*t,s.rot+=s.vr*t}Wm(s)}V.globalCompositeOperation="source-over",lr.length?requestAnimationFrame(ad):(ka=!1,V.clearRect(0,0,br,mn))}function Wm(n){const e=n.t/n.life,t=1-e,r=s=>`hsla(${n.h},${n.s}%,${n.l}%,${Math.max(0,s)})`;switch(V.globalCompositeOperation=n.add?"lighter":"source-over",n.k){case"spark":V.lineCap="round",V.strokeStyle=r(t*.45),V.lineWidth=n.sz*2.6*t+1,V.beginPath(),V.moveTo(n.x,n.y),V.lineTo(n.x-n.vx*2.6,n.y-n.vy*2.6),V.stroke(),V.strokeStyle=`hsla(${n.h},60%,92%,${t})`,V.lineWidth=n.sz*t+.4,V.stroke();break;case"glow":case"smoke":case"vort":{const s=Math.max(1,n.sz*(1+n.gr*(n.k==="vort"?0:e))),i=n.a*(n.k==="smoke"?Math.min(1,e*6)*t:t),a=V.createRadialGradient(n.x,n.y,0,n.x,n.y,s);a.addColorStop(0,r(i)),a.addColorStop(.4,r(i*.45)),a.addColorStop(1,r(0)),V.fillStyle=a,V.beginPath(),V.arc(n.x,n.y,s,0,6.3),V.fill();break}case"ring":V.strokeStyle=r(n.a*t),V.lineWidth=n.w*t+.6,V.beginPath(),V.arc(n.x,n.y,n.sz+n.gr*oa(e),0,6.3),V.stroke();break;case"shard":V.save(),V.translate(n.x,n.y),V.rotate(n.rot),V.fillStyle=r(t*.95),V.beginPath(),V.moveTo(0,-n.sz),V.lineTo(n.sz*.45,n.sz*.6),V.lineTo(-n.sz*.4,n.sz*.5),V.closePath(),V.fill(),V.strokeStyle=`hsla(${n.h},40%,95%,${t})`,V.lineWidth=1,V.stroke(),V.restore();break;case"rune":{const s=n.sz*oa(Math.min(1,e*2.6)),i=n.a*(e<.12?e/.12:e>.6?(1-e)/.4:1),a=n.rot+n.vr*n.t;V.strokeStyle=r(i),V.lineWidth=2.2,V.beginPath(),V.arc(n.x,n.y,s,0,6.3),V.stroke(),V.lineWidth=1,V.beginPath(),V.arc(n.x,n.y,s*.84,0,6.3),V.stroke(),V.lineWidth=1.6,V.beginPath();for(let c=0;c<n.n;c++){const u=a+c/n.n*6.283,h=c%2?.93:.88;V.moveTo(n.x+Math.cos(u)*s*.84,n.y+Math.sin(u)*s*.84),V.lineTo(n.x+Math.cos(u)*s*(h+.07),n.y+Math.sin(u)*s*(h+.07))}if(V.stroke(),n.w>2){const c=n.w,u=c%2?(c-1)/2:c/2-1||1;V.lineWidth=1.8,V.beginPath();for(let h=0;h<=c;h++){const f=-a*.7-1.5708+h*u%c/c*6.283,m=n.x+Math.cos(f)*s*.8,g=n.y+Math.sin(f)*s*.8;h?V.lineTo(m,g):V.moveTo(m,g)}V.stroke()}break}case"pillar":{const s=n.sz*(.35+.65*Math.sin(Math.min(1,e*1.4)*1.57))*(e>.6?(1-e)/.4:1),i=n.a*(e<.1?e/.1:e>.55?(1-e)/.45:1),a=V.createLinearGradient(n.x-s,0,n.x+s,0);a.addColorStop(0,r(0)),a.addColorStop(.5,r(i)),a.addColorStop(1,r(0));const c=V.createLinearGradient(0,n.y-n.gr,0,n.y);c.addColorStop(0,"rgba(255,255,255,0)"),c.addColorStop(.4,"rgba(255,255,255,1)"),c.addColorStop(1,"rgba(255,255,255,0)"),V.fillStyle=a,V.fillRect(n.x-s,n.y-n.gr,s*2,n.gr);break}case"bolt":if(Ae()<.25)break;V.lineJoin="round",V.strokeStyle=r(t*.7),V.lineWidth=n.sz*3,V.beginPath(),n.pts.forEach((s,i)=>i?V.lineTo(s[0],s[1]):V.moveTo(s[0],s[1])),V.stroke(),V.strokeStyle=`hsla(${n.h},50%,96%,${t})`,V.lineWidth=n.sz*.8,V.stroke();break;case"slash":{const s=oa(Math.min(1,e*4)),i=n.x+(n.x1-n.x)*s,a=n.y+(n.y1-n.y)*s,c=(n.x+i)/2,u=(n.y+a)/2,h=-(a-n.y),f=i-n.x,m=Math.hypot(h,f)||1,g=n.bulge*s,S=h/m*g,P=f/m*g;V.beginPath(),V.moveTo(n.x,n.y),V.quadraticCurveTo(c+S,u+P,i,a),V.quadraticCurveTo(c+S*.3,u+P*.3,n.x,n.y),V.fillStyle=`hsla(${n.h},60%,96%,${t})`,V.shadowColor=`hsl(${n.h},100%,60%)`,V.shadowBlur=24,V.fill(),V.shadowBlur=0,V.strokeStyle=r(t*.7),V.lineWidth=3,V.stroke();break}}}const ct=(n,e=0)=>Gm[n][e];function gc(n,e,t,r,s,i={}){for(let a=0;a<t;a++){const c=i.rot??Ae()*6.283,u=U(.35,1)*s,h=i.rot!==void 0?U(-.5,.5):0;X({k:"spark",x:n,y:e,vx:Math.cos(c+h)*u,vy:Math.sin(c+h)*u,g:.16,d:.93,life:U(420,820),sz:U(1.6,3),h:ct(r,Ae()<.35?1:0),l:66,...i,rot:0})}}function cd(n,e,t,r,s=U(-.9,-.5)){const i=Math.cos(s)*t,a=Math.sin(s)*t;X({k:"slash",x:n-i,y:e-a,x1:n+i,y1:e+a,bulge:t*.28,life:420,h:ct(r),s:100,l:66,add:!0}),X({k:"slash",x:n-i*.8,y:e-a*.8+t*.12,x1:n+i*.9,y1:e+a*.9+t*.12,bulge:t*.2,life:360,delay:60,h:ct(r,1),s:100,l:70,add:!0})}function hi(n,e,t,r,s=1){X({k:"glow",x:n,y:e,sz:t*.95,gr:1.1,life:420,h:ct(r),l:78,a:.95}),X({k:"glow",x:n,y:e,sz:t*.38,gr:.3,life:180,h:50,s:40,l:96,a:1}),X({k:"ring",x:n,y:e,sz:t*.12,gr:t*1.05,w:7,life:520,h:ct(r),l:72}),X({k:"ring",x:n,y:e,sz:t*.1,gr:t*.75,w:3,life:480,delay:90,h:ct(r,1),l:74}),cd(n,e,t*.8,r),gc(n,e,Math.round(26*s),r,t*.1);for(let i=0;i<7*s;i++){const a=Ae()*6.283,c=U(2,6)*t/110;X({k:"shard",x:n,y:e,vx:Math.cos(a)*c,vy:Math.sin(a)*c-1.5,g:.2,d:.97,rot:Ae()*6,vr:U(-.25,.25),sz:t*U(.05,.1),life:U(520,860),h:ct(r,i%2),l:62})}for(let i=0;i<3;i++)X({k:"smoke",x:n+U(-8,8),y:e,vx:U(-.5,.5),vy:U(-.7,-.1),d:.98,sz:t*U(.3,.5),gr:1,life:U(700,1e3),a:.3,h:r==="umb"?272:30,s:40,l:r==="umb"?30:60})}const fu=n=>n.getBoundingClientRect();function Km(n,e,t){X({k:"glow",x:n,y:e,sz:t*.9,gr:.6,life:1100,h:46,l:82,a:.55}),X({k:"pillar",x:n,y:mn,sz:t*.55,gr:mn*1.1,life:1250,h:48,l:76,a:.7}),X({k:"rune",x:n,y:e,sz:t,n:28,w:8,life:1500,rot:0,vr:7e-4,h:46,l:72,a:.95}),X({k:"rune",x:n,y:e,sz:t*.62,n:18,w:6,life:1400,delay:80,rot:1,vr:-.0011,h:168,l:70,a:.85});for(let r=0;r<46;r++){const s=Ae()*6.283,i=U(.2,1)*t;X({k:"glow",x:n+Math.cos(s)*i,y:e+Math.sin(s)*i*.55+t*.3,vx:U(-.3,.3),vy:-U(.8,3.2),g:-.01,d:.995,sz:U(3,8),life:U(800,1500),delay:Ae()*600,h:Ae()<.3?168:48,l:82,a:.9})}mc(460,()=>{X({k:"ring",x:n,y:e,sz:t*.2,gr:t*2.1,w:10,life:800,h:48,l:80}),X({k:"ring",x:n,y:e,sz:t*.1,gr:t*1.5,w:4,life:700,h:168,l:80}),X({k:"glow",x:n,y:e,sz:t*1.3,gr:.5,life:500,h:50,s:40,l:96,a:.8}),gc(n,e,44,"lum",t*.085)})}function Qm(n,e,t){X({k:"smoke",x:n,y:e,sz:t*1.2,gr:.8,life:1500,h:270,s:60,l:14,a:.55,add:!1}),X({k:"rune",x:n,y:e,sz:t,n:20,w:5,life:1500,rot:0,vr:-9e-4,h:350,l:62,a:.95}),X({k:"rune",x:n,y:e,sz:t*.66,n:12,w:0,life:1400,delay:70,rot:2,vr:.0012,h:272,l:68,a:.85});for(let r=0;r<80;r++)X({k:"vort",cx:n,cy:e,ang:Ae()*6.283,rad:U(.55,1.5)*t,va:U(.0035,.006),vrad:-U(6e-4,.0011)*t,sz:U(3,7),life:1200,delay:Ae()*350,h:Ae()<.5?272:350,l:68,a:.9});mc(720,()=>{X({k:"glow",x:n,y:e,sz:t*1.1,gr:.8,life:520,h:300,s:90,l:70,a:.85}),X({k:"ring",x:n,y:e,sz:t*.15,gr:t*2.2,w:11,life:800,h:350,l:62}),X({k:"ring",x:n,y:e,sz:t*.1,gr:t*1.6,w:4,life:740,delay:80,h:272,l:72}),gc(n,e,52,"umb",t*.09);for(let r=0;r<7;r++){const s=Ae()*6.283,i=[[n,e]];let a=n,c=e,u=s;for(let h=0;h<9;h++)u+=U(-.55,.55),a+=Math.cos(u)*t*.17,c+=Math.sin(u)*t*.17,i.push([a,c]);X({k:"bolt",pts:i,sz:2.4,life:520,h:r%2?350:280,l:66})}for(let r=0;r<8;r++){const s=Ae()*6.283,i=U(3,8);X({k:"shard",x:n,y:e,vx:Math.cos(s)*i,vy:Math.sin(s)*i,d:.965,rot:Ae()*6,vr:U(-.3,.3),sz:U(8,16),life:800,h:r%2?350:272,l:58})}for(let r=0;r<6;r++)X({k:"smoke",x:n+U(-30,30),y:e+U(-20,20),vx:U(-1,1),vy:U(-1,.2),d:.985,sz:t*U(.3,.55),gr:1.1,life:1300,h:275,s:55,l:16,a:.5,add:!1})})}const di=new Map,Dn=(n,e)=>{const t=performance.now();return t-(di.get(n)??-1e9)<e?!1:(di.set(n,t),di.size>80&&di.clear(),!0)},pu=n=>n.classList.contains("umb")?"umb":"lum";function Jm(n){var a;const e=fu(n),t=e.left+e.width/2,r=e.top+e.height/2,s=n.className.split(" ")[0]+Math.round(t/24)+","+Math.round(r/24),i=n.classList;if(i.contains("cast")){if(!Dn("cast",500))return;const c=document.querySelector(".plane-wrap"),u=c?fu(c):null,h=u?u.left+u.width/2:br/2,f=u?u.top+u.height*.5:mn/2,m=Math.min(u?u.width:br,u?u.height:mn)*.42;(i.contains("umb")?Qm:Km)(h,f,m)}else if(i.contains("card")&&i.contains("attacking")){if(!Dn("a"+s,800))return;const c=pu(n),u=i.contains("up")?-1:1,h=e.width;X({k:"glow",x:t,y:r,sz:h*.95,gr:.2,life:520,h:ct(c),l:70,a:.6});for(let f=0;f<18;f++){const m=Ae()*6.283,g=h*U(.8,1.5);X({k:"vort",cx:t,cy:r,ang:m,rad:g,va:.004,vrad:-g/360,sz:U(2.5,5),life:380,delay:Ae()*90,h:ct(c,f%3?0:1),l:76,a:.9})}mc(430,()=>{const f=t,m=r+u*(e.height*.5+46);for(let g=0;g<12;g++)X({k:"spark",x:t+U(-h*.4,h*.4),y:r+u*e.height*.3,vx:U(-1.2,1.2),vy:-u*U(3,9),g:0,d:.93,life:U(260,480),sz:2,h:ct(c,g%2),l:72});X({k:"ring",x:f,y:m,sz:h*.1,gr:h*.95,w:6,life:380,h:ct(c),l:76}),cd(f,m,h*.75,c,u<0?U(-2.5,-2.1):U(.55,1))})}else if(i.contains("card")&&i.contains("dying")){if(!Dn("d"+s,900))return;const c=pu(n),u=e.width;hi(t,r,u*1.05,c,1.1);for(let h=0;h<14;h++)X({k:"glow",x:t+U(-u*.35,u*.35),y:r+U(-u*.2,u*.3),vx:U(-.3,.3),vy:-U(.6,2),g:-.008,sz:U(3,7),life:U(900,1500),delay:Ae()*250,h:ct(c,h%2),l:80,a:.9})}else if(i.contains("card")&&i.contains("hurt")){if(!Dn("h"+s,500))return;hi(t,r,e.width*.75,"fire",.7)}else if(i.contains("card")&&i.contains("boost")){if(!Dn("b"+s,500))return;X({k:"ring",x:t,y:r+e.height*.2,sz:e.width*.2,gr:e.width*.8,w:4,life:600,h:145,l:74});for(let c=0;c<16;c++)X({k:"glow",x:t+U(-e.width*.4,e.width*.4),y:r+e.height*.35,vy:-U(1,3.2),g:-.02,d:.99,sz:U(3,6),life:U(600,1e3),delay:Ae()*250,h:Ae()<.5?145:48,l:78,a:.9})}else if(i.contains("orb")&&i.contains("hit")){if(!Dn("oh"+s,700))return;const c=Math.abs(parseInt((((a=n.querySelector(".fx"))==null?void 0:a.textContent)??"3").replace(/[^\d-]/g,""),10)||3),u=Math.min(1.9,.8+c*.12);hi(t,r,e.width*1.7*u,"fire",u+.3),hi(t,r,e.width*1.1,"umb",.5)}else if(i.contains("orb")&&i.contains("heal")){if(!Dn("oe"+s,700))return;X({k:"ring",x:t,y:r,sz:e.width*.3,gr:e.width*1.5,w:5,life:700,h:145,l:74}),X({k:"glow",x:t,y:r,sz:e.width*1.3,gr:.5,life:600,h:145,l:78,a:.7});for(let c=0;c<22;c++)X({k:"glow",x:t+U(-e.width,e.width),y:r+U(0,e.width*.6),vy:-U(1,3),g:-.02,d:.99,sz:U(3,7),life:U(700,1300),delay:Ae()*300,h:Ae()<.5?145:48,l:80,a:.9})}}const mu=".card.attacking,.card.dying,.card.hurt,.card.boost,.orb.hit,.orb.heal,.vfx.cast";function Xm(){if(matchMedia("(prefers-reduced-motion:reduce)").matches)return;ar=document.createElement("canvas"),ar.id="combatfx",document.body.append(ar),V=ar.getContext("2d");const n=()=>{const e=Math.min(2,devicePixelRatio||1);br=innerWidth,mn=innerHeight,ar.width=br*e,ar.height=mn*e,V.setTransform(e,0,0,e,0,0)};n(),addEventListener("resize",n),new MutationObserver(e=>{const t=[];e.forEach(r=>r.addedNodes.forEach(s=>{s instanceof HTMLElement&&(s.matches(mu)&&t.push(s),s.querySelectorAll(mu).forEach(i=>t.push(i)))})),t.forEach(Jm)}).observe(document.body,{childList:!0,subtree:!0})}const aa=(n,e,t)=>n.style.setProperty(e,t);function Ym(){const n=document.createElement("canvas");n.id="embers",document.body.prepend(n);const e=n.getContext("2d");let t=0,r=0;const s=[],i=()=>{t=n.width=innerWidth,r=n.height=innerHeight};i(),addEventListener("resize",i);for(let c=0;c<90;c++)s.push({x:Math.random()*2e3,y:Math.random()*1200,r:Math.random()*2+.4,v:Math.random()*.5+.12,a:Math.random()*.6+.2,hue:Math.random()<.55?40:265,ph:Math.random()*6});let a=0;(function c(){a+=.01,e.clearRect(0,0,t,r);for(const u of s){u.y-=u.v,u.x+=Math.sin(a+u.ph)*.35,u.y<-10&&(u.y=r+10,u.x=Math.random()*t);const h=.6+Math.sin(a*3+u.ph)*.4;e.beginPath(),e.fillStyle=`hsla(${u.hue},95%,68%,${u.a*h})`,e.shadowColor=`hsl(${u.hue},95%,60%)`,e.shadowBlur=10,e.arc(u.x%t,u.y,u.r,0,6.3),e.fill()}requestAnimationFrame(c)})()}function Zm(){const n=document.createElement("div");n.id="glow",document.body.append(n);let e=0,t=0,r=0,s=0;addEventListener("pointermove",i=>{r=i.clientX,s=i.clientY}),function i(){e+=(r-e)*.14,t+=(s-t)*.14,n.style.transform=`translate(${e-160}px,${t-160}px)`,requestAnimationFrame(i)}()}function eg(){let n=null;document.addEventListener("pointermove",t=>{const r=t.target.closest(".card");if(!r)return;const s=r.getBoundingClientRect(),i=(t.clientX-s.left)/s.width,a=(t.clientY-s.top)/s.height;aa(r,"--mx",(i*100).toFixed(1)+"%"),aa(r,"--my",(a*100).toFixed(1)+"%"),aa(r,"--ang",((i-.5)*60).toFixed(1)+"deg")});let e=0;document.addEventListener("pointerover",t=>{const r=t.target.closest(".slotc,.card[data-a],button,.btn");if(!r||r===n)return;n=r;const s=performance.now();s-e>70&&(he("hover"),e=s)}),document.addEventListener("pointerout",()=>{n=null})}function tg(){new MutationObserver(n=>n.forEach(e=>e.addedNodes.forEach(t=>{if(!(t instanceof HTMLElement)||!t.classList.contains("vfx"))return;const r=t.classList;r.contains("vhit")?fi("hard"):r.contains("banner")&&!r.contains("small")?gu("#ffd27a33"):r.contains("cast")?(gu(r.contains("lum")?"#8fe9ff33":"#a24dff44"),fi("soft")):r.contains("report")&&fi("soft")}))).observe(document.body,{childList:!0}),new MutationObserver(()=>document.querySelectorAll(".card.attacking:not(.fxdone)").forEach(n=>{n.classList.add("fxdone"),fi("soft")})).observe(document.getElementById("app"),{childList:!0,subtree:!0})}function fi(n){const e=document.getElementById("app");e.classList.remove("shk-soft","shk-hard"),e.offsetWidth,e.classList.add("shk-"+n)}function gu(n){const e=document.createElement("div");e.className="flash",e.style.background=`radial-gradient(circle at 50% 50%,${n},transparent 70%)`,document.body.append(e),setTimeout(()=>e.remove(),700)}let Mi=null;function ld(){if(Mi)return;const n=Mi=document.createElement("div");n.id="title",n.innerHTML=`<div class="t-rays"></div><div class="t-in"><p class="t-kicker">DUELO DE LEYENDAS</p><h1>CARTAS<span>ALFA</span></h1>
    <div class="t-fac"><b class="l">☀ LUMINARAE</b><i>VS</i><b class="u">UMBRA ☾</b></div>
    <div class="t-menu"><button class="t-go" data-m="ia" autofocus>⚔ JUGAR CONTRA LA IA</button><button class="t-go alt" data-m="online">🌐 JUGAR ONLINE</button></div>
    <p class="t-hint">Elige un modo · sonido activado</p></div>`,document.body.append(n),n.querySelectorAll("[data-m]").forEach(e=>e.addEventListener("click",()=>{he("start"),Hm(),e.dataset.m==="ia"?(ud(),document.dispatchEvent(new Event("menu:ia"))):document.dispatchEvent(new Event("menu:online"))}))}function ud(){const n=Mi;n&&(Mi=null,n.classList.add("out"),setTimeout(()=>n.remove(),900))}function ng(){ld()}function rg(){Xm(),Ym(),Zm(),eg(),tg(),ng()}const ee=(n,e,t,r,s,i=[],a="",c=[],u)=>({id:n,name:e,cost:t,type:"unit",atk:r,hp:s,kw:i,text:a,fx:c,grow:u}),me=(n,e,t,r,s,i)=>({id:n,name:e,cost:t,type:"spell",atk:0,hp:0,kw:[],text:s,fx:i,speed:r}),hd=[ee("lum_acolita","Acólita del Alba",1,1,1,[],"Al jugarla: cura 2 a tu Nexo.",[{t:"healNexus",n:2}]),ee("lum_vigia","Vigía del Alba",1,1,2,["regenera"]),ee("lum_centinela","Centinela Radiante",2,2,2,["barrera"]),ee("lum_portador","Portador de Luz",2,2,1,[],"Al jugarla: +1/+1 a otra aliada.",[{t:"buffOther",a:1,h:1}]),ee("lum_halcon","Halcón Dorado",2,3,1,["elusivo"]),ee("lum_novicia","Novicia Curandera",2,1,3,["robovida"]),ee("lum_sanadora","Sanadora de Aurora",3,3,3,["robovida"]),ee("lum_vidente","Vidente del Alba",3,2,3,[],"Al jugarla: roba 1.",[{t:"draw",n:1}]),ee("lum_oraculo","Oráculo Sereno",3,2,2,[],"Al jugarla: roba 1 y cura 2 a tu Nexo.",[{t:"draw",n:1},{t:"healNexus",n:2}]),ee("lum_paladin","Paladín Alado",4,3,4,["barrera"]),ee("lum_heraldo","Heraldo Solar",4,2,3,[],"Al jugarla: +1/+1 a tus unidades.",[{t:"buffAll",a:1,h:1}]),ee("lum_coloso","Coloso de Marfil",5,4,4,["barrera","robovida"]),ee("lum_lider","Capitana Aurora",5,4,5,["rapido","retador"]),ee("lum_serafin","Serafín Eterno",6,5,6,["elusivo","robovida"]),ee("lum_arcangel","Arcángel del Amanecer",7,5,5,["barrera"],"Al jugarla: cura 4 a tu Nexo.",[{t:"healNexus",n:4}]),me("lum_destello","Destello Sanador",1,"burst","Cura 4 a tu Nexo.",[{t:"healNexus",n:4}]),me("lum_rocio","Rocío Vital",1,"burst","Cura 3 a una unidad aliada.",[{t:"healUnit",n:3}]),me("lum_fervor","Fervor",2,"burst","Una aliada gana +2/+0 esta ronda.",[{t:"tempBuff",a:2,h:0}]),me("lum_escudo","Escudo de Fe",2,"fast","Una aliada gana Barrera.",[{t:"giveKw",kw:"barrera"}]),me("lum_velo","Velo Etéreo",2,"fast","Una aliada gana Elusivo.",[{t:"giveKw",kw:"elusivo"}]),me("lum_absorcion","Luz Absorbente",2,"fast","Inflige 2 a una enemiga y cura 2 a tu Nexo.",[{t:"drain",n:2}]),me("lum_plegaria","Plegaria",3,"fast","Cura 5 a tu Nexo y roba 1.",[{t:"healNexus",n:5},{t:"draw",n:1}]),me("lum_resplandor","Resplandor",3,"fast","Tus unidades ganan +1/+1 esta ronda.",[{t:"tempBuffAll",a:1,h:1}]),me("lum_juicio","Juicio Radiante",4,"fast","Inflige 4 a una unidad enemiga.",[{t:"dmgEnemy",n:4}]),me("lum_escarcha","Escarcha Sagrada",3,"focus","Una unidad enemiga tiene 0 de poder esta ronda.",[{t:"frost"}]),me("lum_vision","Visión del Alba",2,"focus","Roba 2 cartas.",[{t:"draw",n:2}]),me("lum_bendicion","Bendición",2,"slow","Una aliada gana +2/+2.",[{t:"buffAlly",a:2,h:2}]),me("lum_renacer","Renacer",3,"slow","Una aliada gana Regeneración y se cura 4.",[{t:"giveKw",kw:"regenera"},{t:"healUnit",n:4}]),me("lum_estrellas","Lluvia de Estrellas",4,"slow","Inflige 2 a todas las unidades enemigas y cura 2 a tu Nexo.",[{t:"dmgAll",n:2},{t:"healNexus",n:2}]),me("lum_amanecer","Amanecer Eterno",6,"slow","Cura 6 a tu Nexo y +1/+1 a tus unidades.",[{t:"healNexus",n:6},{t:"buffAll",a:1,h:1}])],dd=[ee("umb_sombra","Sombra Inquieta",1,2,1),ee("umb_aprendiz","Aprendiz de Huesos",1,1,2,["duro"]),ee("umb_acechador","Acechador Nocturno",2,1,1,["letal"]),ee("umb_cultista","Cultista del Vacío",2,3,3,[],"Al jugarla: tu Nexo recibe 1.",[{t:"hurtNexus",n:1}]),ee("umb_espectro","Espectro Fugaz",2,3,1,["rapido","efimero"]),ee("umb_esqueleto","Esqueleto Guardián",2,1,4,["duro"]),ee("umb_reptante","Reptante Abisal",3,2,3,["temible"]),ee("umb_lobo","Lobo de Ceniza",3,3,3,["arrollar"]),ee("umb_sanguijuela","Sanguijuela",3,3,2,["robovida"]),ee("umb_ritualista","Ritualista",3,2,2,[],"Al jugarla: sacrifica una aliada para robar 2.",[{t:"sacDraw",n:2}]),ee("umb_golem","Gólem de Hierro",3,2,5,["duro"]),ee("umb_verdugo","Verdugo Sombrío",4,3,3,["letal"]),ee("umb_jinete","Jinete Espectral",4,5,3,["arrollar"]),ee("umb_basalto","Centinela de Basalto",4,3,5,["duro"]),ee("umb_devoradora","Devoradora de Almas",5,4,4,[],"Gana +1/+1 cuando muere una aliada.",[],{a:1,h:1}),ee("umb_azote","Azote del Vacío",5,4,3,["rapido","arrollar"]),ee("umb_behemot","Behemot de Hierro",5,5,5,["duro"]),ee("umb_abisal","Coloso Abisal",6,5,5,["duro","robovida"]),ee("umb_senor","Señor de la Noche Eterna",7,6,6,["letal"]),ee("umb_titan","Titán Regenerante",8,7,7,["regenera","arrollar"]),me("umb_punalada","Puñalada",1,"burst","Inflige 2 a una unidad enemiga.",[{t:"dmgEnemy",n:2}]),me("umb_piel","Piel de Hierro",2,"burst","Una aliada gana Duro.",[{t:"giveKw",kw:"duro"}]),me("umb_embestida","Embestida",3,"focus","Inflige 3 al Nexo enemigo.",[{t:"dmgNexus",n:3}]),me("umb_furia","Furia Sombría",2,"fast","Una aliada gana +3/+0 esta ronda.",[{t:"tempBuff",a:3,h:0}]),me("umb_drenar","Drenar",3,"fast","Inflige 3 a una enemiga y cura 3 a tu Nexo.",[{t:"drain",n:3}]),me("umb_plaga","Plaga Sombría",3,"fast","Inflige 1 a todas las unidades enemigas.",[{t:"dmgAll",n:1}]),me("umb_pacto","Pacto de Sangre",2,"slow","Sacrifica tu unidad más débil; daña a una enemiga igual a su ataque.",[{t:"sacDmg"}]),me("umb_maldicion","Maldición de Sombras",4,"slow","Las unidades enemigas pierden 2/2.",[{t:"debuffEnemies",a:2,h:2}]),me("umb_aplastar","Aplastar",4,"slow","Inflige 5 a una unidad enemiga.",[{t:"dmgEnemy",n:5}]),me("umb_eclipse","Eclipse",6,"slow","Destruye una unidad enemiga y roba 1.",[{t:"destroyEnemy"},{t:"draw",n:1}])],Te=Object.fromEntries([...hd,...dd].map(n=>[n.id,n])),sg=["lum_acolita","lum_vigia","lum_centinela","lum_portador","lum_novicia","lum_halcon","lum_destello","lum_rocio","lum_escudo","lum_bendicion"],ig=["umb_sombra","umb_aprendiz","umb_acechador","umb_esqueleto","umb_cultista","umb_lobo","umb_golem","umb_punalada","umb_furia","umb_drenar"],Li={Luminarae:[...hd.map(n=>n.id),...sg],Umbra:[...dd.map(n=>n.id),...ig]},We=n=>1-n;function fd(n){n.seed=n.seed+1831565813|0;let e=n.seed;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function pd(n,e){for(let t=e.length-1;t>0;t--){const r=Math.floor(fd(n)*(t+1));[e[t],e[r]]=[e[r],e[t]]}}function Ar(n,e,t){const r=n.p[e];for(let s=0;s<t;s++){const i=r.deck.pop();if(!i){n.winner=We(e);break}r.hand.length<10&&r.hand.push(i)}}const Fi=(n,e,t)=>{n.p[e].nexus=Math.min(20,n.p[e].nexus+t)},ae=n=>Math.max(0,n.atk+n.ta),we=n=>n.hp+n.th-n.dmg,sn=n=>{n.dmg=n.hp+n.th+999},Ui=n=>ae(n)*1e6+we(n)*1e3+Te[n.card].cost,xt=n=>n.reduce((e,t)=>!e||Ui(t)>Ui(e)?t:e,void 0),_u=n=>n.reduce((e,t)=>!e||Ui(t)<Ui(e)?t:e,void 0),og=["dmgEnemy","drain","destroyEnemy","sacDmg","frost"],ag=["buffAlly","giveKw","tempBuff","healUnit"];function xr(n){const e=Te[n];return!e||e.type!=="spell"?null:e.fx.some(t=>og.includes(t.t))?"enemy":e.fx.some(t=>ag.includes(t.t))?"ally":null}function _c(n,e){return!(n.kw.includes("elusivo")&&!e.kw.includes("elusivo")||n.kw.includes("temible")&&ae(e)<3)}function md(n,e){const t=s=>({nexus:20,deck:[...s],hand:[],board:[],mana:0,maxMana:0,spell:0,played:[]}),r={p:[t(n[0]),t(n[1])],round:0,token:0,active:0,phase:"mulligan",passes:0,winner:null,seed:e,uid:0,log:[],stack:[],attackers:[],blocks:{},forced:[],tok:[!1,!1],resumePhase:"main",mull:[!1,!1]};return r.p.forEach(s=>pd(r,s.deck)),Ar(r,0,4),Ar(r,1,4),r.token=fd(r)<.5?0:1,r}function ca(n,e,t){const r=n.p[e],s=[...new Set(t)].filter(i=>i>=0&&i<r.hand.length).sort((i,a)=>a-i);for(const i of s)r.deck.push(r.hand.splice(i,1)[0]);pd(n,r.deck),Ar(n,e,s.length)}function Ca(n){if(n.round++,n.round>40){n.winner=-1;return}n.token=We(n.token),n.active=n.token,n.phase="main",n.passes=0,n.attackers=[],n.blocks={},n.forced=[],n.stack=[],n.tok=[!1,!1],n.tok[n.token]=!0;for(const e of[n.token,We(n.token)]){const t=n.p[e];if(t.maxMana=Math.min(10,t.maxMana+1),t.mana=t.maxMana,Ar(n,e,1),n.winner!==null)return}n.log=n.log.slice(-40),n.log.push(`— Ronda ${n.round} (ficha: J${n.token+1}) —`),Hn(n)}function cg(n){for(const e of n.p)e.spell=Math.min(3,e.spell+e.mana),e.mana=0;for(const e of n.p)e.board.forEach(t=>{t.kw.includes("regenera")&&(t.dmg=0)});for(const e of n.p)e.board.forEach(t=>{t.kw.includes("efimero")&&sn(t)});gn(n);for(const e of n.p)e.board.forEach(t=>{t.ta=0,t.th=0,t.dmg>=t.hp&&(t.dmg=t.hp-1)});Hn(n),n.winner===null&&Ca(n)}function Hn(n){if(n.winner!==null)return;const e=n.p[0].nexus<=0,t=n.p[1].nexus<=0;e&&t?n.winner=-1:e?n.winner=1:t&&(n.winner=0)}function gn(n){for(let e=!0;e;){e=!1;for(const t of n.p){const r=t.board.filter(s=>we(s)<=0);if(r.length){e=!0,t.board=t.board.filter(s=>we(s)>0);for(const s of t.board){const i=Te[s.card].grow;i&&(s.atk+=i.a*r.length,s.hp+=i.h*r.length)}}}}}function pr(n,e,t,r){if(t<=0)return 0;const s=e.kw.indexOf("barrera");if(s>=0)return e.kw.splice(s,1),0;if(e.kw.includes("duro")&&(t=Math.max(0,t-1)),t<=0)return 0;const i=Math.min(t,Math.max(0,we(e)));return e.dmg+=t,r&&(r.u.kw.includes("letal")&&sn(e),r.u.kw.includes("robovida")&&Fi(n,r.owner,i)),i}function Va(n,e,t,r,s){const i=n.p[e],a=n.p[We(e)];switch(t.t){case"healNexus":Fi(n,e,t.n);break;case"hurtNexus":i.nexus-=t.n;break;case"dmgNexus":a.nexus-=t.n;break;case"draw":Ar(n,e,t.n);break;case"buffOther":{const c=xt(i.board.filter(u=>u!==r));c&&(c.atk+=t.a,c.hp+=t.h);break}case"buffAlly":{const c=s??xt(i.board);c&&(c.atk+=t.a,c.hp+=t.h);break}case"tempBuff":{const c=s??xt(i.board);c&&(c.ta+=t.a,c.th+=t.h);break}case"healUnit":{const c=s??i.board.find(u=>u.dmg>0);c&&(c.dmg=Math.max(0,c.dmg-t.n));break}case"tempBuffAll":i.board.forEach(c=>{c.ta+=t.a,c.th+=t.h});break;case"buffAll":i.board.forEach(c=>{c.atk+=t.a,c.hp+=t.h});break;case"giveKw":{const c=s??xt(i.board);c&&!c.kw.includes(t.kw)&&c.kw.push(t.kw);break}case"dmgEnemy":{const c=s??xt(a.board);c&&pr(n,c,t.n);break}case"drain":{const c=s??xt(a.board);c&&Fi(n,e,pr(n,c,t.n));break}case"dmgAll":a.board.forEach(c=>pr(n,c,t.n));break;case"frost":{const c=s??xt(a.board);c&&(c.ta-=ae(c));break}case"sacDraw":{const c=_u(i.board.filter(u=>u!==r));c&&(sn(c),gn(n),Ar(n,e,t.n));break}case"sacDmg":{const c=_u(i.board),u=s??xt(a.board);if(c&&u){const h=ae(c);sn(c),pr(n,u,h)}break}case"debuffEnemies":a.board.forEach(c=>{c.atk=Math.max(0,c.atk-t.a),c.hp-=t.h});break;case"destroyEnemy":{const c=s??xt(a.board);c&&sn(c);break}}gn(n)}function Or(n,e,t){const r=n.p[e],s=Te[r.hand[t]];if(!s||n.winner!==null||n.active!==e||n.phase==="mulligan")return!1;if(s.type==="unit")return n.phase==="main"&&!n.stack.length&&!n.attackers.length&&r.board.length<6&&s.cost<=r.mana;if(s.cost>r.mana+r.spell)return!1;const i=s.speed??"fast";if((i==="slow"||i==="focus")&&(n.phase!=="main"||n.stack.length||n.attackers.length))return!1;const a=xr(s.id);return!(a==="enemy"&&!n.p[We(e)].board.length||a==="ally"&&!r.board.length||s.fx.some(c=>c.t==="sacDmg")&&!r.board.length)}function gd(n){if(n.phase!=="block"&&!(n.phase==="stack"&&n.resumePhase==="block"))return;const e=n.p[n.token],t=n.p[We(n.token)];for(const r of Object.keys(n.blocks)){const s=e.board.find(a=>String(a.uid)===r),i=t.board.find(a=>a.uid===n.blocks[r]);s&&i&&_c(s,i)||(s&&i&&n.log.push(`Bloqueo anulado: {${i.card}} ya no puede bloquear a {${s.card}}`),delete n.blocks[r],n.forced=n.forced.filter(a=>String(a)!==r))}}function lg(n){const e=n.stack.pop();if(!e)return;const t=Te[e.card],r=xr(e.card);let s;if(r&&(s=[...n.p[0].board,...n.p[1].board].find(i=>i.uid===e.target),!s)){n.log.push(`{${e.card}} se disipa: el objetivo ya no existe`);return}n.log.push(`Se resuelve {${e.card}}`),t.fx.forEach(i=>Va(n,e.owner,i,void 0,s)),gn(n),Hn(n)}function ug(n){var t;const e=((t=n.stack[0])==null?void 0:t.owner)??n.active;for(;n.stack.length&&n.winner===null;)lg(n);n.winner===null&&(gd(n),n.phase=n.resumePhase,n.active=We(e),n.passes=0)}function hg(n){const e=n.token,t=We(e),r=n.p[e],s=n.p[t],i=n.attackers.map(h=>r.board.find(f=>f.uid===h)).filter(h=>!!h).map(h=>({u:h,had:n.blocks[String(h.uid)]!==void 0,b:s.board.find(f=>f.uid===n.blocks[String(h.uid)])})),a=new Set,c=(h,f)=>{f<=0||(n.p[t].nexus-=f,h.kw.includes("robovida")&&Fi(n,e,f))},u=(h,f,m)=>{const g=we(m)+(m.kw.includes("duro")?1:0),S=ae(h);return pr(n,m,S,{u:h,owner:f}),a.add(h.uid),Math.max(0,S-g)};for(const{u:h,b:f}of i)if(f&&h.kw.includes("rapido")&&ae(h)>0){const m=u(h,e,f);h.kw.includes("arrollar")&&c(h,m),h.kw.includes("efimero")&&sn(h)}if(gn(n),Hn(n),n.winner===null){for(const{u:h,had:f,b:m}of i){if(we(h)<=0)continue;const g=a.has(h.uid);if(m&&we(m)>0){let S=0;!g&&ae(h)>0&&(S=u(h,e,m)),ae(m)>0&&pr(n,h,ae(m),{u:m,owner:t}),h.kw.includes("arrollar")&&!g&&c(h,S),h.kw.includes("efimero")&&!g&&sn(h)}else f?h.kw.includes("arrollar")&&!g&&c(h,ae(h)):(c(h,ae(h)),h.kw.includes("efimero")&&ae(h)>0&&sn(h))}gn(n),Hn(n),n.attackers=[],n.blocks={},n.forced=[],n.winner===null&&(n.phase="main",n.active=t,n.passes=0)}}function ws(n,e){if(n.winner!==null)return n;const t=structuredClone(n),r=t.active,s=t.p[r],i=t.p[We(r)];if(e.type==="mulligan")return t.phase!=="mulligan"?n:e.player!==void 0?e.player!==0&&e.player!==1||t.mull[e.player]||!Array.isArray(e.idx)?n:(ca(t,e.player,e.idx),t.mull[e.player]=!0,t.mull[0]&&t.mull[1]&&Ca(t),t):(ca(t,0,e.idx),ca(t,1,t.p[1].hand.map((a,c)=>Te[a].cost>=4?c:-1).filter(a=>a>=0)),Ca(t),t);if(t.phase==="mulligan")return n;if(e.type==="play"){if(!Or(t,r,e.hand))return n;const a=s.hand[e.hand],c=Te[a],u=xr(a);let h;if(u&&(h=(u==="enemy"?i:s).board.find(f=>f.uid===e.target),!h))return n;if(c.type==="unit")s.mana-=c.cost;else{const f=Math.min(s.spell,c.cost);s.spell-=f,s.mana-=c.cost-f}if(s.hand.splice(e.hand,1),s.played.push(a),t.log.push(`J${r+1} juega {${a}}`),c.type==="unit"){const f={uid:++t.uid,card:a,atk:c.atk,hp:c.hp,dmg:0,kw:[...c.kw],ta:0,th:0};s.board.push(f),c.fx.forEach(m=>Va(t,r,m,f)),gn(t),Hn(t),t.active=We(r),t.passes=0}else{const f=c.speed??"fast";f==="burst"||f==="focus"?(c.fx.forEach(m=>Va(t,r,m,void 0,h)),gn(t),Hn(t),gd(t)):(t.resumePhase=t.phase==="stack"?t.resumePhase:t.phase,t.stack.push({card:a,owner:r,target:h==null?void 0:h.uid}),t.phase="stack",t.active=We(r),t.passes=0)}}else if(e.type==="pass"||e.type==="confirmBlocks"){if(e.type==="confirmBlocks"&&!(t.phase==="block"&&r===We(t.token)))return n;t.log.push(`J${r+1} pasa prioridad`),t.phase==="stack"?ug(t):t.phase==="block"?r===We(t.token)?(t.active=t.token,t.passes=1):hg(t):++t.passes>=2?cg(t):t.active=We(r)}else if(e.type==="attack"){if(t.phase!=="main"||t.stack.length||t.attackers.length||!t.tok[r])return n;const a=[...new Set(e.units)].map(u=>s.board[u]).filter(u=>!!u);if(!a.length)return n;t.tok[r]=!1,t.attackers=a.map(u=>u.uid),t.blocks={},t.forced=[];const c=new Set;for(const u of a)if(u.kw.includes("retador")){const h=i.board.filter(f=>!c.has(f.uid)).sort((f,m)=>(ae(u)>=we(m)?1:0)-(ae(u)>=we(f)?1:0)||we(f)-we(m))[0];h&&(t.blocks[String(u.uid)]=h.uid,t.forced.push(u.uid),c.add(h.uid))}t.phase="block",t.active=We(r),t.passes=0,t.log.push(`J${r+1} declara ataque con ${a.length} unidad(es)`)}else if(e.type==="block"){if(t.phase!=="block"||r!==We(t.token))return n;const a=t.p[t.token].board[e.attacker],c=s.board[e.blocker];if(!a||!c||!t.attackers.includes(a.uid)||t.forced.includes(a.uid)||!_c(a,c))return n;const u=String(a.uid);if(t.blocks[u]===c.uid)delete t.blocks[u];else{if(Object.values(t.blocks).includes(c.uid))return n;t.blocks[u]=c.uid}}return t}const dg=n=>Te[n].fx.reduce((e,t)=>e+(t.t==="dmgEnemy"||t.t==="drain"?t.n:0),0),is=n=>ae(n)*10+we(n);function yu(n,e){const t=n.p[e],r=n.p[1-e];let s=null;return t.hand.forEach((i,a)=>{const c=Te[i];if(c.type!=="spell"||!Or(n,e,a))return;const u=xr(i);let h=0,f;if(u==="enemy"){const m=[...r.board].sort((P,x)=>is(x)-is(P)),g=dg(i),S=m.find(P=>g>0&&we(P)<=g)??(c.fx.some(P=>P.t==="destroyEnemy"||P.t==="frost")?m[0]:void 0);if(!S||c.fx.some(P=>P.t==="sacDmg")&&t.board.length<2)return;f=S.uid,h=is(S)/2+c.cost}else if(u==="ally"){const m=c.fx.some(P=>P.t==="healUnit"),S=[...m?t.board.filter(P=>P.dmg>0):t.board].sort((P,x)=>m?x.dmg-P.dmg:is(x)-is(P))[0];if(!S)return;f=S.uid,h=m?2+S.dmg:3}else for(const m of c.fx)m.t==="healNexus"&&t.nexus<=20-m.n?h+=2:m.t==="buffAll"&&t.board.length>=2||(m.t==="debuffEnemies"||m.t==="dmgAll")&&r.board.length>=2?h+=3:m.t==="dmgNexus"?h+=r.nexus<=m.n?20:1:m.t==="tempBuffAll"&&t.board.length>=2&&n.tok[e]?h+=3:m.t==="draw"&&(h+=t.hand.length<6?2:0);h>0&&(!s||h>s.sc)&&(s={a:{type:"play",hand:a,target:f},sc:h})}),s?s.a:null}function fg(n){const e=n.active,t=n.p[e],r=n.p[1-e];if(n.phase==="mulligan")return{type:"mulligan",idx:[]};if(n.phase==="block"){if(e===n.token)return{type:"pass"};const a=n.attackers.map(h=>n.p[n.token].board.find(f=>f.uid===h)).filter(h=>!!h),c=a.reduce((h,f)=>h+ae(f),0),u=new Set(Object.values(n.blocks));for(const h of a.filter(f=>n.blocks[String(f.uid)]===void 0).sort((f,m)=>ae(m)-ae(f))){const f=t.board.map((g,S)=>({u:g,k:S})).filter(g=>!u.has(g.u.uid)&&_c(h,g.u)),m=f.find(g=>ae(g.u)>=we(h)&&we(g.u)>ae(h))??f.find(g=>(ae(g.u)>=we(h)||g.u.kw.includes("letal"))&&ae(h)>=3)??(t.nexus<=c?f.sort((g,S)=>we(S.u)-we(g.u))[0]:void 0);if(m)return{type:"block",attacker:n.p[n.token].board.indexOf(h),blocker:m.k}}return{type:"confirmBlocks"}}if(n.phase==="stack")return(Math.random()<.5?yu(n,e):null)??{type:"pass"};let s=-1;if(t.hand.forEach((a,c)=>{Te[a].type==="unit"&&Or(n,e,c)&&(s<0||Te[a].cost>Te[t.hand[s]].cost)&&(s=c)}),s>=0)return{type:"play",hand:s};const i=yu(n,e);if(i&&Math.random()<.7)return i;if(n.tok[e]&&!n.attackers.length){const a=t.board.map((h,f)=>({u:h,k:f})),c=a.reduce((h,f)=>h+ae(f.u),0)>=r.nexus,u=a.filter(({u:h})=>c||!r.board.length||h.kw.includes("barrera")||h.kw.includes("elusivo")||r.board.every(f=>ae(f)<we(h)&&!f.kw.includes("letal")));if(u.length)return{type:"attack",units:u.map(h=>h.k)}}return{type:"pass"}}const _d={},pg="cartas-skins";let yc={};try{yc=JSON.parse(localStorage.getItem(pg)||"{}")}catch{}const Et=n=>{var e,t;return((e=yc[n])==null?void 0:e.name)||((t=_d[n])==null?void 0:t.name)||Te[n].name},mg=n=>{var e,t;return((e=yc[n])==null?void 0:e.image)||((t=_d[n])==null?void 0:t.image)||`/Apexora-TCG/img/${n}.webp`},gg={hello:["Las sombras te saludan.","Hola, mortal. Disfruta tus últimos turnos.","¿Listo para caer?"],gg:["Buena partida. La próxima será peor para ti.","GG… por ahora."],idle:["Interesante… aunque inútil.","Habla todo lo que quieras.","La oscuridad escucha.","Juega tu carta.","..."],cast:["¿Sentiste eso?","Las sombras obedecen.","Eso va a doler."],win:["Imposible… la luz me venció esta vez.","Buena partida. Quiero la revancha."],lose:["La noche siempre gana.","Tu luz se apaga."]};class _g{constructor(){Ne(this,"cbs",[]);Ne(this,"last",0)}onMessage(e){this.cbs.push(e)}emit(e){this.cbs.forEach(t=>t(e))}push(e){this.emit(e)}sys(e){this.emit({from:"",text:e,side:"sys"})}send(e){this.emit({from:"Tú",text:e,side:"me"});const t=/hola|buenas|hey/i.test(e)?"hello":/\bgg\b|bien jugado/i.test(e)?"gg":"idle";setTimeout(()=>this.say(t),700+Math.random()*900)}react(e){e==="cast"&&(Date.now()-this.last<2e4||Math.random()>.35)||this.say(e)}say(e){const t=gg[e];this.last=Date.now(),this.emit({from:"Umbra",text:t[Math.floor(Math.random()*t.length)],side:"foe"})}}const yg=()=>{};var vu={};/**
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
 */const yd=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},vg=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const s=n[t++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=n[t++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=n[t++],a=n[t++],c=n[t++],u=((s&7)<<18|(i&63)<<12|(a&63)<<6|c&63)-65536;e[r++]=String.fromCharCode(55296+(u>>10)),e[r++]=String.fromCharCode(56320+(u&1023))}else{const i=n[t++],a=n[t++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|a&63)}}return e.join("")},vd={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){const i=n[s],a=s+1<n.length,c=a?n[s+1]:0,u=s+2<n.length,h=u?n[s+2]:0,f=i>>2,m=(i&3)<<4|c>>4;let g=(c&15)<<2|h>>6,S=h&63;u||(S=64,a||(g=64)),r.push(t[f],t[m],t[g],t[S])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(yd(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):vg(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){const i=t[n.charAt(s++)],c=s<n.length?t[n.charAt(s)]:0;++s;const h=s<n.length?t[n.charAt(s)]:64;++s;const m=s<n.length?t[n.charAt(s)]:64;if(++s,i==null||c==null||h==null||m==null)throw new Eg;const g=i<<2|c>>4;if(r.push(g),h!==64){const S=c<<4&240|h>>2;if(r.push(S),m!==64){const P=h<<6&192|m;r.push(P)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class Eg extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const wg=function(n){const e=yd(n);return vd.encodeByteArray(e,!0)},$i=function(n){return wg(n).replace(/\./g,"")},Ed=function(n){try{return vd.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function Tg(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const Ig=()=>Tg().__FIREBASE_DEFAULTS__,bg=()=>{if(typeof process>"u"||typeof vu>"u")return;const n=vu.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},Ag=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&Ed(n[1]);return e&&JSON.parse(e)},co=()=>{try{return yg()||Ig()||bg()||Ag()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},wd=n=>{var e,t;return(t=(e=co())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},Sg=n=>{const e=wd(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},Td=()=>{var n;return(n=co())===null||n===void 0?void 0:n.config},Id=n=>{var e;return(e=co())===null||e===void 0?void 0:e[`_${n}`]};/**
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
 */class Rg{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
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
 */function Mr(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function bd(n){return(await fetch(n,{credentials:"include"})).ok}/**
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
 */function kg(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},r=e||"demo-project",s=n.iat||0,i=n.sub||n.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}}},n);return[$i(JSON.stringify(t)),$i(JSON.stringify(a)),""].join(".")}const fs={};function Pg(){const n={prod:[],emulator:[]};for(const e of Object.keys(fs))fs[e]?n.emulator.push(e):n.prod.push(e);return n}function Cg(n){let e=document.getElementById(n),t=!1;return e||(e=document.createElement("div"),e.setAttribute("id",n),t=!0),{created:t,element:e}}let Eu=!1;function Ad(n,e){if(typeof window>"u"||typeof document>"u"||!Mr(window.location.host)||fs[n]===e||fs[n]||Eu)return;fs[n]=e;function t(g){return`__firebase__banner__${g}`}const r="__firebase__banner",i=Pg().prod.length>0;function a(){const g=document.getElementById(r);g&&g.remove()}function c(g){g.style.display="flex",g.style.background="#7faaf0",g.style.position="fixed",g.style.bottom="5px",g.style.left="5px",g.style.padding=".5em",g.style.borderRadius="5px",g.style.alignItems="center"}function u(g,S){g.setAttribute("width","24"),g.setAttribute("id",S),g.setAttribute("height","24"),g.setAttribute("viewBox","0 0 24 24"),g.setAttribute("fill","none"),g.style.marginLeft="-6px"}function h(){const g=document.createElement("span");return g.style.cursor="pointer",g.style.marginLeft="16px",g.style.fontSize="24px",g.innerHTML=" &times;",g.onclick=()=>{Eu=!0,a()},g}function f(g,S){g.setAttribute("id",S),g.innerText="Learn more",g.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",g.setAttribute("target","__blank"),g.style.paddingLeft="5px",g.style.textDecoration="underline"}function m(){const g=Cg(r),S=t("text"),P=document.getElementById(S)||document.createElement("span"),x=t("learnmore"),N=document.getElementById(x)||document.createElement("a"),K=t("preprendIcon"),z=document.getElementById(K)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(g.created){const J=g.element;c(J),f(N,x);const fe=h();u(z,K),J.append(z,P,N,fe),document.body.appendChild(J)}i?(P.innerText="Preview backend disconnected.",z.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
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
</defs>`,P.innerText="Preview backend running in this workspace."),P.setAttribute("id",S)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",m):m()}/**
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
 */function Xe(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Vg(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Xe())}function Ng(){var n;const e=(n=co())===null||n===void 0?void 0:n.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function Dg(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function xg(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function Og(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Mg(){const n=Xe();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function Lg(){return!Ng()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Fg(){try{return typeof indexedDB=="object"}catch{return!1}}function Ug(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{var i;e(((i=s.error)===null||i===void 0?void 0:i.message)||"")}}catch(t){e(t)}})}/**
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
 */const $g="FirebaseError";class Wt extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=$g,Object.setPrototypeOf(this,Wt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Os.prototype.create)}}class Os{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},s=`${this.service}/${e}`,i=this.errors[e],a=i?Bg(i,r):"Error",c=`${this.serviceName}: ${a} (${s}).`;return new Wt(s,c,r)}}function Bg(n,e){return n.replace(jg,(t,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const jg=/\{\$([^}]+)}/g;function qg(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function Gn(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const s of t){if(!r.includes(s))return!1;const i=n[s],a=e[s];if(wu(i)&&wu(a)){if(!Gn(i,a))return!1}else if(i!==a)return!1}for(const s of r)if(!t.includes(s))return!1;return!0}function wu(n){return n!==null&&typeof n=="object"}/**
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
 */function Ms(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function zg(n,e){const t=new Hg(n,e);return t.subscribe.bind(t)}class Hg{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let s;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");Gg(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:r},s.next===void 0&&(s.next=la),s.error===void 0&&(s.error=la),s.complete===void 0&&(s.complete=la);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Gg(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function la(){}/**
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
 */function Ue(n){return n&&n._delegate?n._delegate:n}class Wn{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */class Wg{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new Rg;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(t=e==null?void 0:e.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(i){if(s)return null;throw i}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Qg(e))try{this.getOrInitializeService({instanceIdentifier:On})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=On){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=On){return this.instances.has(e)}getOptions(e=On){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[i,a]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(i);r===c&&a.resolve(s)}return s}onInit(e,t){var r;const s=this.normalizeInstanceIdentifier(t),i=(r=this.onInitCallbacks.get(s))!==null&&r!==void 0?r:new Set;i.add(e),this.onInitCallbacks.set(s,i);const a=this.instances.get(s);return a&&e(a,s),()=>{i.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const s of r)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:Kg(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=On){return this.component?this.component.multipleInstances?e:On:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Kg(n){return n===On?void 0:n}function Qg(n){return n.instantiationMode==="EAGER"}/**
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
 */class Jg{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new Wg(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var Y;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(Y||(Y={}));const Xg={debug:Y.DEBUG,verbose:Y.VERBOSE,info:Y.INFO,warn:Y.WARN,error:Y.ERROR,silent:Y.SILENT},Yg=Y.INFO,Zg={[Y.DEBUG]:"log",[Y.VERBOSE]:"log",[Y.INFO]:"info",[Y.WARN]:"warn",[Y.ERROR]:"error"},e_=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),s=Zg[e];if(s)console[s](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class vc{constructor(e){this.name=e,this._logLevel=Yg,this._logHandler=e_,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in Y))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Xg[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,Y.DEBUG,...e),this._logHandler(this,Y.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,Y.VERBOSE,...e),this._logHandler(this,Y.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,Y.INFO,...e),this._logHandler(this,Y.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,Y.WARN,...e),this._logHandler(this,Y.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,Y.ERROR,...e),this._logHandler(this,Y.ERROR,...e)}}const t_=(n,e)=>e.some(t=>n instanceof t);let Tu,Iu;function n_(){return Tu||(Tu=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function r_(){return Iu||(Iu=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Sd=new WeakMap,Na=new WeakMap,Rd=new WeakMap,ua=new WeakMap,Ec=new WeakMap;function s_(n){const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("success",i),n.removeEventListener("error",a)},i=()=>{t(on(n.result)),s()},a=()=>{r(n.error),s()};n.addEventListener("success",i),n.addEventListener("error",a)});return e.then(t=>{t instanceof IDBCursor&&Sd.set(t,n)}).catch(()=>{}),Ec.set(e,n),e}function i_(n){if(Na.has(n))return;const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("complete",i),n.removeEventListener("error",a),n.removeEventListener("abort",a)},i=()=>{t(),s()},a=()=>{r(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",i),n.addEventListener("error",a),n.addEventListener("abort",a)});Na.set(n,e)}let Da={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return Na.get(n);if(e==="objectStoreNames")return n.objectStoreNames||Rd.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return on(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function o_(n){Da=n(Da)}function a_(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const r=n.call(ha(this),e,...t);return Rd.set(r,e.sort?e.sort():[e]),on(r)}:r_().includes(n)?function(...e){return n.apply(ha(this),e),on(Sd.get(this))}:function(...e){return on(n.apply(ha(this),e))}}function c_(n){return typeof n=="function"?a_(n):(n instanceof IDBTransaction&&i_(n),t_(n,n_())?new Proxy(n,Da):n)}function on(n){if(n instanceof IDBRequest)return s_(n);if(ua.has(n))return ua.get(n);const e=c_(n);return e!==n&&(ua.set(n,e),Ec.set(e,n)),e}const ha=n=>Ec.get(n);function l_(n,e,{blocked:t,upgrade:r,blocking:s,terminated:i}={}){const a=indexedDB.open(n,e),c=on(a);return r&&a.addEventListener("upgradeneeded",u=>{r(on(a.result),u.oldVersion,u.newVersion,on(a.transaction),u)}),t&&a.addEventListener("blocked",u=>t(u.oldVersion,u.newVersion,u)),c.then(u=>{i&&u.addEventListener("close",()=>i()),s&&u.addEventListener("versionchange",h=>s(h.oldVersion,h.newVersion,h))}).catch(()=>{}),c}const u_=["get","getKey","getAll","getAllKeys","count"],h_=["put","add","delete","clear"],da=new Map;function bu(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(da.get(e))return da.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,s=h_.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(s||u_.includes(t)))return;const i=async function(a,...c){const u=this.transaction(a,s?"readwrite":"readonly");let h=u.store;return r&&(h=h.index(c.shift())),(await Promise.all([h[t](...c),s&&u.done]))[0]};return da.set(e,i),i}o_(n=>({...n,get:(e,t,r)=>bu(e,t)||n.get(e,t,r),has:(e,t)=>!!bu(e,t)||n.has(e,t)}));/**
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
 */class d_{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(f_(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function f_(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const xa="@firebase/app",Au="0.13.2";/**
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
 */const jt=new vc("@firebase/app"),p_="@firebase/app-compat",m_="@firebase/analytics-compat",g_="@firebase/analytics",__="@firebase/app-check-compat",y_="@firebase/app-check",v_="@firebase/auth",E_="@firebase/auth-compat",w_="@firebase/database",T_="@firebase/data-connect",I_="@firebase/database-compat",b_="@firebase/functions",A_="@firebase/functions-compat",S_="@firebase/installations",R_="@firebase/installations-compat",k_="@firebase/messaging",P_="@firebase/messaging-compat",C_="@firebase/performance",V_="@firebase/performance-compat",N_="@firebase/remote-config",D_="@firebase/remote-config-compat",x_="@firebase/storage",O_="@firebase/storage-compat",M_="@firebase/firestore",L_="@firebase/ai",F_="@firebase/firestore-compat",U_="firebase",$_="11.10.0";/**
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
 */const Oa="[DEFAULT]",B_={[xa]:"fire-core",[p_]:"fire-core-compat",[g_]:"fire-analytics",[m_]:"fire-analytics-compat",[y_]:"fire-app-check",[__]:"fire-app-check-compat",[v_]:"fire-auth",[E_]:"fire-auth-compat",[w_]:"fire-rtdb",[T_]:"fire-data-connect",[I_]:"fire-rtdb-compat",[b_]:"fire-fn",[A_]:"fire-fn-compat",[S_]:"fire-iid",[R_]:"fire-iid-compat",[k_]:"fire-fcm",[P_]:"fire-fcm-compat",[C_]:"fire-perf",[V_]:"fire-perf-compat",[N_]:"fire-rc",[D_]:"fire-rc-compat",[x_]:"fire-gcs",[O_]:"fire-gcs-compat",[M_]:"fire-fst",[F_]:"fire-fst-compat",[L_]:"fire-vertex","fire-js":"fire-js",[U_]:"fire-js-all"};/**
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
 */const Bi=new Map,j_=new Map,Ma=new Map;function Su(n,e){try{n.container.addComponent(e)}catch(t){jt.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Sr(n){const e=n.name;if(Ma.has(e))return jt.debug(`There were multiple attempts to register component ${e}.`),!1;Ma.set(e,n);for(const t of Bi.values())Su(t,n);for(const t of j_.values())Su(t,n);return!0}function wc(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function ft(n){return n==null?!1:n.settings!==void 0}/**
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
 */const q_={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},an=new Os("app","Firebase",q_);/**
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
 */class z_{constructor(e,t,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Wn("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw an.create("app-deleted",{appName:this._name})}}/**
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
 */const Lr=$_;function kd(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r=Object.assign({name:Oa,automaticDataCollectionEnabled:!0},e),s=r.name;if(typeof s!="string"||!s)throw an.create("bad-app-name",{appName:String(s)});if(t||(t=Td()),!t)throw an.create("no-options");const i=Bi.get(s);if(i){if(Gn(t,i.options)&&Gn(r,i.config))return i;throw an.create("duplicate-app",{appName:s})}const a=new Jg(s);for(const u of Ma.values())a.addComponent(u);const c=new z_(t,r,a);return Bi.set(s,c),c}function Pd(n=Oa){const e=Bi.get(n);if(!e&&n===Oa&&Td())return kd();if(!e)throw an.create("no-app",{appName:n});return e}function cn(n,e,t){var r;let s=(r=B_[n])!==null&&r!==void 0?r:n;t&&(s+=`-${t}`);const i=s.match(/\s|\//),a=e.match(/\s|\//);if(i||a){const c=[`Unable to register library "${s}" with version "${e}":`];i&&c.push(`library name "${s}" contains illegal characters (whitespace or "/")`),i&&a&&c.push("and"),a&&c.push(`version name "${e}" contains illegal characters (whitespace or "/")`),jt.warn(c.join(" "));return}Sr(new Wn(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
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
 */const H_="firebase-heartbeat-database",G_=1,Ts="firebase-heartbeat-store";let fa=null;function Cd(){return fa||(fa=l_(H_,G_,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(Ts)}catch(t){console.warn(t)}}}}).catch(n=>{throw an.create("idb-open",{originalErrorMessage:n.message})})),fa}async function W_(n){try{const t=(await Cd()).transaction(Ts),r=await t.objectStore(Ts).get(Vd(n));return await t.done,r}catch(e){if(e instanceof Wt)jt.warn(e.message);else{const t=an.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});jt.warn(t.message)}}}async function Ru(n,e){try{const r=(await Cd()).transaction(Ts,"readwrite");await r.objectStore(Ts).put(e,Vd(n)),await r.done}catch(t){if(t instanceof Wt)jt.warn(t.message);else{const r=an.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});jt.warn(r.message)}}}function Vd(n){return`${n.name}!${n.options.appId}`}/**
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
 */const K_=1024,Q_=30;class J_{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new Y_(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,t;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=ku();if(((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(a=>a.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:s}),this._heartbeatsCache.heartbeats.length>Q_){const a=Z_(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(a,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){jt.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=ku(),{heartbeatsToSend:r,unsentEntries:s}=X_(this._heartbeatsCache.heartbeats),i=$i(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(t){return jt.warn(t),""}}}function ku(){return new Date().toISOString().substring(0,10)}function X_(n,e=K_){const t=[];let r=n.slice();for(const s of n){const i=t.find(a=>a.agent===s.agent);if(i){if(i.dates.push(s.date),Pu(t)>e){i.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),Pu(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class Y_{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Fg()?Ug().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await W_(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return Ru(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return Ru(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function Pu(n){return $i(JSON.stringify({version:2,heartbeats:n})).length}function Z_(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let r=1;r<n.length;r++)n[r].date<t&&(t=n[r].date,e=r);return e}/**
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
 */function ey(n){Sr(new Wn("platform-logger",e=>new d_(e),"PRIVATE")),Sr(new Wn("heartbeat",e=>new J_(e),"PRIVATE")),cn(xa,Au,n),cn(xa,Au,"esm2017"),cn("fire-js","")}ey("");var Cu=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var ln,Nd;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(w,_){function y(){}y.prototype=_.prototype,w.D=_.prototype,w.prototype=new y,w.prototype.constructor=w,w.C=function(E,T,b){for(var v=Array(arguments.length-2),ut=2;ut<arguments.length;ut++)v[ut-2]=arguments[ut];return _.prototype[T].apply(E,v)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,t),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(w,_,y){y||(y=0);var E=Array(16);if(typeof _=="string")for(var T=0;16>T;++T)E[T]=_.charCodeAt(y++)|_.charCodeAt(y++)<<8|_.charCodeAt(y++)<<16|_.charCodeAt(y++)<<24;else for(T=0;16>T;++T)E[T]=_[y++]|_[y++]<<8|_[y++]<<16|_[y++]<<24;_=w.g[0],y=w.g[1],T=w.g[2];var b=w.g[3],v=_+(b^y&(T^b))+E[0]+3614090360&4294967295;_=y+(v<<7&4294967295|v>>>25),v=b+(T^_&(y^T))+E[1]+3905402710&4294967295,b=_+(v<<12&4294967295|v>>>20),v=T+(y^b&(_^y))+E[2]+606105819&4294967295,T=b+(v<<17&4294967295|v>>>15),v=y+(_^T&(b^_))+E[3]+3250441966&4294967295,y=T+(v<<22&4294967295|v>>>10),v=_+(b^y&(T^b))+E[4]+4118548399&4294967295,_=y+(v<<7&4294967295|v>>>25),v=b+(T^_&(y^T))+E[5]+1200080426&4294967295,b=_+(v<<12&4294967295|v>>>20),v=T+(y^b&(_^y))+E[6]+2821735955&4294967295,T=b+(v<<17&4294967295|v>>>15),v=y+(_^T&(b^_))+E[7]+4249261313&4294967295,y=T+(v<<22&4294967295|v>>>10),v=_+(b^y&(T^b))+E[8]+1770035416&4294967295,_=y+(v<<7&4294967295|v>>>25),v=b+(T^_&(y^T))+E[9]+2336552879&4294967295,b=_+(v<<12&4294967295|v>>>20),v=T+(y^b&(_^y))+E[10]+4294925233&4294967295,T=b+(v<<17&4294967295|v>>>15),v=y+(_^T&(b^_))+E[11]+2304563134&4294967295,y=T+(v<<22&4294967295|v>>>10),v=_+(b^y&(T^b))+E[12]+1804603682&4294967295,_=y+(v<<7&4294967295|v>>>25),v=b+(T^_&(y^T))+E[13]+4254626195&4294967295,b=_+(v<<12&4294967295|v>>>20),v=T+(y^b&(_^y))+E[14]+2792965006&4294967295,T=b+(v<<17&4294967295|v>>>15),v=y+(_^T&(b^_))+E[15]+1236535329&4294967295,y=T+(v<<22&4294967295|v>>>10),v=_+(T^b&(y^T))+E[1]+4129170786&4294967295,_=y+(v<<5&4294967295|v>>>27),v=b+(y^T&(_^y))+E[6]+3225465664&4294967295,b=_+(v<<9&4294967295|v>>>23),v=T+(_^y&(b^_))+E[11]+643717713&4294967295,T=b+(v<<14&4294967295|v>>>18),v=y+(b^_&(T^b))+E[0]+3921069994&4294967295,y=T+(v<<20&4294967295|v>>>12),v=_+(T^b&(y^T))+E[5]+3593408605&4294967295,_=y+(v<<5&4294967295|v>>>27),v=b+(y^T&(_^y))+E[10]+38016083&4294967295,b=_+(v<<9&4294967295|v>>>23),v=T+(_^y&(b^_))+E[15]+3634488961&4294967295,T=b+(v<<14&4294967295|v>>>18),v=y+(b^_&(T^b))+E[4]+3889429448&4294967295,y=T+(v<<20&4294967295|v>>>12),v=_+(T^b&(y^T))+E[9]+568446438&4294967295,_=y+(v<<5&4294967295|v>>>27),v=b+(y^T&(_^y))+E[14]+3275163606&4294967295,b=_+(v<<9&4294967295|v>>>23),v=T+(_^y&(b^_))+E[3]+4107603335&4294967295,T=b+(v<<14&4294967295|v>>>18),v=y+(b^_&(T^b))+E[8]+1163531501&4294967295,y=T+(v<<20&4294967295|v>>>12),v=_+(T^b&(y^T))+E[13]+2850285829&4294967295,_=y+(v<<5&4294967295|v>>>27),v=b+(y^T&(_^y))+E[2]+4243563512&4294967295,b=_+(v<<9&4294967295|v>>>23),v=T+(_^y&(b^_))+E[7]+1735328473&4294967295,T=b+(v<<14&4294967295|v>>>18),v=y+(b^_&(T^b))+E[12]+2368359562&4294967295,y=T+(v<<20&4294967295|v>>>12),v=_+(y^T^b)+E[5]+4294588738&4294967295,_=y+(v<<4&4294967295|v>>>28),v=b+(_^y^T)+E[8]+2272392833&4294967295,b=_+(v<<11&4294967295|v>>>21),v=T+(b^_^y)+E[11]+1839030562&4294967295,T=b+(v<<16&4294967295|v>>>16),v=y+(T^b^_)+E[14]+4259657740&4294967295,y=T+(v<<23&4294967295|v>>>9),v=_+(y^T^b)+E[1]+2763975236&4294967295,_=y+(v<<4&4294967295|v>>>28),v=b+(_^y^T)+E[4]+1272893353&4294967295,b=_+(v<<11&4294967295|v>>>21),v=T+(b^_^y)+E[7]+4139469664&4294967295,T=b+(v<<16&4294967295|v>>>16),v=y+(T^b^_)+E[10]+3200236656&4294967295,y=T+(v<<23&4294967295|v>>>9),v=_+(y^T^b)+E[13]+681279174&4294967295,_=y+(v<<4&4294967295|v>>>28),v=b+(_^y^T)+E[0]+3936430074&4294967295,b=_+(v<<11&4294967295|v>>>21),v=T+(b^_^y)+E[3]+3572445317&4294967295,T=b+(v<<16&4294967295|v>>>16),v=y+(T^b^_)+E[6]+76029189&4294967295,y=T+(v<<23&4294967295|v>>>9),v=_+(y^T^b)+E[9]+3654602809&4294967295,_=y+(v<<4&4294967295|v>>>28),v=b+(_^y^T)+E[12]+3873151461&4294967295,b=_+(v<<11&4294967295|v>>>21),v=T+(b^_^y)+E[15]+530742520&4294967295,T=b+(v<<16&4294967295|v>>>16),v=y+(T^b^_)+E[2]+3299628645&4294967295,y=T+(v<<23&4294967295|v>>>9),v=_+(T^(y|~b))+E[0]+4096336452&4294967295,_=y+(v<<6&4294967295|v>>>26),v=b+(y^(_|~T))+E[7]+1126891415&4294967295,b=_+(v<<10&4294967295|v>>>22),v=T+(_^(b|~y))+E[14]+2878612391&4294967295,T=b+(v<<15&4294967295|v>>>17),v=y+(b^(T|~_))+E[5]+4237533241&4294967295,y=T+(v<<21&4294967295|v>>>11),v=_+(T^(y|~b))+E[12]+1700485571&4294967295,_=y+(v<<6&4294967295|v>>>26),v=b+(y^(_|~T))+E[3]+2399980690&4294967295,b=_+(v<<10&4294967295|v>>>22),v=T+(_^(b|~y))+E[10]+4293915773&4294967295,T=b+(v<<15&4294967295|v>>>17),v=y+(b^(T|~_))+E[1]+2240044497&4294967295,y=T+(v<<21&4294967295|v>>>11),v=_+(T^(y|~b))+E[8]+1873313359&4294967295,_=y+(v<<6&4294967295|v>>>26),v=b+(y^(_|~T))+E[15]+4264355552&4294967295,b=_+(v<<10&4294967295|v>>>22),v=T+(_^(b|~y))+E[6]+2734768916&4294967295,T=b+(v<<15&4294967295|v>>>17),v=y+(b^(T|~_))+E[13]+1309151649&4294967295,y=T+(v<<21&4294967295|v>>>11),v=_+(T^(y|~b))+E[4]+4149444226&4294967295,_=y+(v<<6&4294967295|v>>>26),v=b+(y^(_|~T))+E[11]+3174756917&4294967295,b=_+(v<<10&4294967295|v>>>22),v=T+(_^(b|~y))+E[2]+718787259&4294967295,T=b+(v<<15&4294967295|v>>>17),v=y+(b^(T|~_))+E[9]+3951481745&4294967295,w.g[0]=w.g[0]+_&4294967295,w.g[1]=w.g[1]+(T+(v<<21&4294967295|v>>>11))&4294967295,w.g[2]=w.g[2]+T&4294967295,w.g[3]=w.g[3]+b&4294967295}r.prototype.u=function(w,_){_===void 0&&(_=w.length);for(var y=_-this.blockSize,E=this.B,T=this.h,b=0;b<_;){if(T==0)for(;b<=y;)s(this,w,b),b+=this.blockSize;if(typeof w=="string"){for(;b<_;)if(E[T++]=w.charCodeAt(b++),T==this.blockSize){s(this,E),T=0;break}}else for(;b<_;)if(E[T++]=w[b++],T==this.blockSize){s(this,E),T=0;break}}this.h=T,this.o+=_},r.prototype.v=function(){var w=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);w[0]=128;for(var _=1;_<w.length-8;++_)w[_]=0;var y=8*this.o;for(_=w.length-8;_<w.length;++_)w[_]=y&255,y/=256;for(this.u(w),w=Array(16),_=y=0;4>_;++_)for(var E=0;32>E;E+=8)w[y++]=this.g[_]>>>E&255;return w};function i(w,_){var y=c;return Object.prototype.hasOwnProperty.call(y,w)?y[w]:y[w]=_(w)}function a(w,_){this.h=_;for(var y=[],E=!0,T=w.length-1;0<=T;T--){var b=w[T]|0;E&&b==_||(y[T]=b,E=!1)}this.g=y}var c={};function u(w){return-128<=w&&128>w?i(w,function(_){return new a([_|0],0>_?-1:0)}):new a([w|0],0>w?-1:0)}function h(w){if(isNaN(w)||!isFinite(w))return m;if(0>w)return N(h(-w));for(var _=[],y=1,E=0;w>=y;E++)_[E]=w/y|0,y*=4294967296;return new a(_,0)}function f(w,_){if(w.length==0)throw Error("number format error: empty string");if(_=_||10,2>_||36<_)throw Error("radix out of range: "+_);if(w.charAt(0)=="-")return N(f(w.substring(1),_));if(0<=w.indexOf("-"))throw Error('number format error: interior "-" character');for(var y=h(Math.pow(_,8)),E=m,T=0;T<w.length;T+=8){var b=Math.min(8,w.length-T),v=parseInt(w.substring(T,T+b),_);8>b?(b=h(Math.pow(_,b)),E=E.j(b).add(h(v))):(E=E.j(y),E=E.add(h(v)))}return E}var m=u(0),g=u(1),S=u(16777216);n=a.prototype,n.m=function(){if(x(this))return-N(this).m();for(var w=0,_=1,y=0;y<this.g.length;y++){var E=this.i(y);w+=(0<=E?E:4294967296+E)*_,_*=4294967296}return w},n.toString=function(w){if(w=w||10,2>w||36<w)throw Error("radix out of range: "+w);if(P(this))return"0";if(x(this))return"-"+N(this).toString(w);for(var _=h(Math.pow(w,6)),y=this,E="";;){var T=fe(y,_).g;y=K(y,T.j(_));var b=((0<y.g.length?y.g[0]:y.h)>>>0).toString(w);if(y=T,P(y))return b+E;for(;6>b.length;)b="0"+b;E=b+E}},n.i=function(w){return 0>w?0:w<this.g.length?this.g[w]:this.h};function P(w){if(w.h!=0)return!1;for(var _=0;_<w.g.length;_++)if(w.g[_]!=0)return!1;return!0}function x(w){return w.h==-1}n.l=function(w){return w=K(this,w),x(w)?-1:P(w)?0:1};function N(w){for(var _=w.g.length,y=[],E=0;E<_;E++)y[E]=~w.g[E];return new a(y,~w.h).add(g)}n.abs=function(){return x(this)?N(this):this},n.add=function(w){for(var _=Math.max(this.g.length,w.g.length),y=[],E=0,T=0;T<=_;T++){var b=E+(this.i(T)&65535)+(w.i(T)&65535),v=(b>>>16)+(this.i(T)>>>16)+(w.i(T)>>>16);E=v>>>16,b&=65535,v&=65535,y[T]=v<<16|b}return new a(y,y[y.length-1]&-2147483648?-1:0)};function K(w,_){return w.add(N(_))}n.j=function(w){if(P(this)||P(w))return m;if(x(this))return x(w)?N(this).j(N(w)):N(N(this).j(w));if(x(w))return N(this.j(N(w)));if(0>this.l(S)&&0>w.l(S))return h(this.m()*w.m());for(var _=this.g.length+w.g.length,y=[],E=0;E<2*_;E++)y[E]=0;for(E=0;E<this.g.length;E++)for(var T=0;T<w.g.length;T++){var b=this.i(E)>>>16,v=this.i(E)&65535,ut=w.i(T)>>>16,Rn=w.i(T)&65535;y[2*E+2*T]+=v*Rn,z(y,2*E+2*T),y[2*E+2*T+1]+=b*Rn,z(y,2*E+2*T+1),y[2*E+2*T+1]+=v*ut,z(y,2*E+2*T+1),y[2*E+2*T+2]+=b*ut,z(y,2*E+2*T+2)}for(E=0;E<_;E++)y[E]=y[2*E+1]<<16|y[2*E];for(E=_;E<2*_;E++)y[E]=0;return new a(y,0)};function z(w,_){for(;(w[_]&65535)!=w[_];)w[_+1]+=w[_]>>>16,w[_]&=65535,_++}function J(w,_){this.g=w,this.h=_}function fe(w,_){if(P(_))throw Error("division by zero");if(P(w))return new J(m,m);if(x(w))return _=fe(N(w),_),new J(N(_.g),N(_.h));if(x(_))return _=fe(w,N(_)),new J(N(_.g),_.h);if(30<w.g.length){if(x(w)||x(_))throw Error("slowDivide_ only works with positive integers.");for(var y=g,E=_;0>=E.l(w);)y=tt(y),E=tt(E);var T=ye(y,1),b=ye(E,1);for(E=ye(E,2),y=ye(y,2);!P(E);){var v=b.add(E);0>=v.l(w)&&(T=T.add(y),b=v),E=ye(E,1),y=ye(y,1)}return _=K(w,T.j(_)),new J(T,_)}for(T=m;0<=w.l(_);){for(y=Math.max(1,Math.floor(w.m()/_.m())),E=Math.ceil(Math.log(y)/Math.LN2),E=48>=E?1:Math.pow(2,E-48),b=h(y),v=b.j(_);x(v)||0<v.l(w);)y-=E,b=h(y),v=b.j(_);P(b)&&(b=g),T=T.add(b),w=K(w,v)}return new J(T,w)}n.A=function(w){return fe(this,w).h},n.and=function(w){for(var _=Math.max(this.g.length,w.g.length),y=[],E=0;E<_;E++)y[E]=this.i(E)&w.i(E);return new a(y,this.h&w.h)},n.or=function(w){for(var _=Math.max(this.g.length,w.g.length),y=[],E=0;E<_;E++)y[E]=this.i(E)|w.i(E);return new a(y,this.h|w.h)},n.xor=function(w){for(var _=Math.max(this.g.length,w.g.length),y=[],E=0;E<_;E++)y[E]=this.i(E)^w.i(E);return new a(y,this.h^w.h)};function tt(w){for(var _=w.g.length+1,y=[],E=0;E<_;E++)y[E]=w.i(E)<<1|w.i(E-1)>>>31;return new a(y,w.h)}function ye(w,_){var y=_>>5;_%=32;for(var E=w.g.length-y,T=[],b=0;b<E;b++)T[b]=0<_?w.i(b+y)>>>_|w.i(b+y+1)<<32-_:w.i(b+y);return new a(T,w.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,Nd=r,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.A,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=h,a.fromString=f,ln=a}).apply(typeof Cu<"u"?Cu:typeof self<"u"?self:typeof window<"u"?window:{});var pi=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Dd,cs,xd,bi,La,Od,Md,Ld;(function(){var n,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(o,l,d){return o==Array.prototype||o==Object.prototype||(o[l]=d.value),o};function t(o){o=[typeof globalThis=="object"&&globalThis,o,typeof window=="object"&&window,typeof self=="object"&&self,typeof pi=="object"&&pi];for(var l=0;l<o.length;++l){var d=o[l];if(d&&d.Math==Math)return d}throw Error("Cannot find global object")}var r=t(this);function s(o,l){if(l)e:{var d=r;o=o.split(".");for(var p=0;p<o.length-1;p++){var I=o[p];if(!(I in d))break e;d=d[I]}o=o[o.length-1],p=d[o],l=l(p),l!=p&&l!=null&&e(d,o,{configurable:!0,writable:!0,value:l})}}function i(o,l){o instanceof String&&(o+="");var d=0,p=!1,I={next:function(){if(!p&&d<o.length){var R=d++;return{value:l(R,o[R]),done:!1}}return p=!0,{done:!0,value:void 0}}};return I[Symbol.iterator]=function(){return I},I}s("Array.prototype.values",function(o){return o||function(){return i(this,function(l,d){return d})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var a=a||{},c=this||self;function u(o){var l=typeof o;return l=l!="object"?l:o?Array.isArray(o)?"array":l:"null",l=="array"||l=="object"&&typeof o.length=="number"}function h(o){var l=typeof o;return l=="object"&&o!=null||l=="function"}function f(o,l,d){return o.call.apply(o.bind,arguments)}function m(o,l,d){if(!o)throw Error();if(2<arguments.length){var p=Array.prototype.slice.call(arguments,2);return function(){var I=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(I,p),o.apply(l,I)}}return function(){return o.apply(l,arguments)}}function g(o,l,d){return g=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?f:m,g.apply(null,arguments)}function S(o,l){var d=Array.prototype.slice.call(arguments,1);return function(){var p=d.slice();return p.push.apply(p,arguments),o.apply(this,p)}}function P(o,l){function d(){}d.prototype=l.prototype,o.aa=l.prototype,o.prototype=new d,o.prototype.constructor=o,o.Qb=function(p,I,R){for(var D=Array(arguments.length-2),ce=2;ce<arguments.length;ce++)D[ce-2]=arguments[ce];return l.prototype[I].apply(p,D)}}function x(o){const l=o.length;if(0<l){const d=Array(l);for(let p=0;p<l;p++)d[p]=o[p];return d}return[]}function N(o,l){for(let d=1;d<arguments.length;d++){const p=arguments[d];if(u(p)){const I=o.length||0,R=p.length||0;o.length=I+R;for(let D=0;D<R;D++)o[I+D]=p[D]}else o.push(p)}}class K{constructor(l,d){this.i=l,this.j=d,this.h=0,this.g=null}get(){let l;return 0<this.h?(this.h--,l=this.g,this.g=l.next,l.next=null):l=this.i(),l}}function z(o){return/^[\s\xa0]*$/.test(o)}function J(){var o=c.navigator;return o&&(o=o.userAgent)?o:""}function fe(o){return fe[" "](o),o}fe[" "]=function(){};var tt=J().indexOf("Gecko")!=-1&&!(J().toLowerCase().indexOf("webkit")!=-1&&J().indexOf("Edge")==-1)&&!(J().indexOf("Trident")!=-1||J().indexOf("MSIE")!=-1)&&J().indexOf("Edge")==-1;function ye(o,l,d){for(const p in o)l.call(d,o[p],p,o)}function w(o,l){for(const d in o)l.call(void 0,o[d],d,o)}function _(o){const l={};for(const d in o)l[d]=o[d];return l}const y="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function E(o,l){let d,p;for(let I=1;I<arguments.length;I++){p=arguments[I];for(d in p)o[d]=p[d];for(let R=0;R<y.length;R++)d=y[R],Object.prototype.hasOwnProperty.call(p,d)&&(o[d]=p[d])}}function T(o){var l=1;o=o.split(":");const d=[];for(;0<l&&o.length;)d.push(o.shift()),l--;return o.length&&d.push(o.join(":")),d}function b(o){c.setTimeout(()=>{throw o},0)}function v(){var o=le;let l=null;return o.g&&(l=o.g,o.g=o.g.next,o.g||(o.h=null),l.next=null),l}class ut{constructor(){this.h=this.g=null}add(l,d){const p=Rn.get();p.set(l,d),this.h?this.h.next=p:this.g=p,this.h=p}}var Rn=new K(()=>new O,o=>o.reset());class O{constructor(){this.next=this.g=this.h=null}set(l,d){this.h=l,this.g=d,this.next=null}reset(){this.next=this.g=this.h=null}}let F,B=!1,le=new ut,_e=()=>{const o=c.Promise.resolve(void 0);F=()=>{o.then(Vt)}};var Vt=()=>{for(var o;o=v();){try{o.h.call(o.g)}catch(d){b(d)}var l=Rn;l.j(o),100>l.h&&(l.h++,o.next=l.g,l.g=o)}B=!1};function ue(){this.s=this.s,this.C=this.C}ue.prototype.s=!1,ue.prototype.ma=function(){this.s||(this.s=!0,this.N())},ue.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function oe(o,l){this.type=o,this.g=this.target=l,this.defaultPrevented=!1}oe.prototype.h=function(){this.defaultPrevented=!0};var tr=function(){if(!c.addEventListener||!Object.defineProperty)return!1;var o=!1,l=Object.defineProperty({},"passive",{get:function(){o=!0}});try{const d=()=>{};c.addEventListener("test",d,l),c.removeEventListener("test",d,l)}catch{}return o}();function kn(o,l){if(oe.call(this,o?o.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,o){var d=this.type=o.type,p=o.changedTouches&&o.changedTouches.length?o.changedTouches[0]:null;if(this.target=o.target||o.srcElement,this.g=l,l=o.relatedTarget){if(tt){e:{try{fe(l.nodeName);var I=!0;break e}catch{}I=!1}I||(l=null)}}else d=="mouseover"?l=o.fromElement:d=="mouseout"&&(l=o.toElement);this.relatedTarget=l,p?(this.clientX=p.clientX!==void 0?p.clientX:p.pageX,this.clientY=p.clientY!==void 0?p.clientY:p.pageY,this.screenX=p.screenX||0,this.screenY=p.screenY||0):(this.clientX=o.clientX!==void 0?o.clientX:o.pageX,this.clientY=o.clientY!==void 0?o.clientY:o.pageY,this.screenX=o.screenX||0,this.screenY=o.screenY||0),this.button=o.button,this.key=o.key||"",this.ctrlKey=o.ctrlKey,this.altKey=o.altKey,this.shiftKey=o.shiftKey,this.metaKey=o.metaKey,this.pointerId=o.pointerId||0,this.pointerType=typeof o.pointerType=="string"?o.pointerType:Do[o.pointerType]||"",this.state=o.state,this.i=o,o.defaultPrevented&&kn.aa.h.call(this)}}P(kn,oe);var Do={2:"touch",3:"pen",4:"mouse"};kn.prototype.h=function(){kn.aa.h.call(this);var o=this.i;o.preventDefault?o.preventDefault():o.returnValue=!1};var nr="closure_listenable_"+(1e6*Math.random()|0),xo=0;function sm(o,l,d,p,I){this.listener=o,this.proxy=null,this.src=l,this.type=d,this.capture=!!p,this.ha=I,this.key=++xo,this.da=this.fa=!1}function Gs(o){o.da=!0,o.listener=null,o.proxy=null,o.src=null,o.ha=null}function Ws(o){this.src=o,this.g={},this.h=0}Ws.prototype.add=function(o,l,d,p,I){var R=o.toString();o=this.g[R],o||(o=this.g[R]=[],this.h++);var D=Mo(o,l,p,I);return-1<D?(l=o[D],d||(l.fa=!1)):(l=new sm(l,this.src,R,!!p,I),l.fa=d,o.push(l)),l};function Oo(o,l){var d=l.type;if(d in o.g){var p=o.g[d],I=Array.prototype.indexOf.call(p,l,void 0),R;(R=0<=I)&&Array.prototype.splice.call(p,I,1),R&&(Gs(l),o.g[d].length==0&&(delete o.g[d],o.h--))}}function Mo(o,l,d,p){for(var I=0;I<o.length;++I){var R=o[I];if(!R.da&&R.listener==l&&R.capture==!!d&&R.ha==p)return I}return-1}var Lo="closure_lm_"+(1e6*Math.random()|0),Fo={};function hl(o,l,d,p,I){if(Array.isArray(l)){for(var R=0;R<l.length;R++)hl(o,l[R],d,p,I);return null}return d=pl(d),o&&o[nr]?o.K(l,d,h(p)?!!p.capture:!1,I):im(o,l,d,!1,p,I)}function im(o,l,d,p,I,R){if(!l)throw Error("Invalid event type");var D=h(I)?!!I.capture:!!I,ce=$o(o);if(ce||(o[Lo]=ce=new Ws(o)),d=ce.add(l,d,p,D,R),d.proxy)return d;if(p=om(),d.proxy=p,p.src=o,p.listener=d,o.addEventListener)tr||(I=D),I===void 0&&(I=!1),o.addEventListener(l.toString(),p,I);else if(o.attachEvent)o.attachEvent(fl(l.toString()),p);else if(o.addListener&&o.removeListener)o.addListener(p);else throw Error("addEventListener and attachEvent are unavailable.");return d}function om(){function o(d){return l.call(o.src,o.listener,d)}const l=am;return o}function dl(o,l,d,p,I){if(Array.isArray(l))for(var R=0;R<l.length;R++)dl(o,l[R],d,p,I);else p=h(p)?!!p.capture:!!p,d=pl(d),o&&o[nr]?(o=o.i,l=String(l).toString(),l in o.g&&(R=o.g[l],d=Mo(R,d,p,I),-1<d&&(Gs(R[d]),Array.prototype.splice.call(R,d,1),R.length==0&&(delete o.g[l],o.h--)))):o&&(o=$o(o))&&(l=o.g[l.toString()],o=-1,l&&(o=Mo(l,d,p,I)),(d=-1<o?l[o]:null)&&Uo(d))}function Uo(o){if(typeof o!="number"&&o&&!o.da){var l=o.src;if(l&&l[nr])Oo(l.i,o);else{var d=o.type,p=o.proxy;l.removeEventListener?l.removeEventListener(d,p,o.capture):l.detachEvent?l.detachEvent(fl(d),p):l.addListener&&l.removeListener&&l.removeListener(p),(d=$o(l))?(Oo(d,o),d.h==0&&(d.src=null,l[Lo]=null)):Gs(o)}}}function fl(o){return o in Fo?Fo[o]:Fo[o]="on"+o}function am(o,l){if(o.da)o=!0;else{l=new kn(l,this);var d=o.listener,p=o.ha||o.src;o.fa&&Uo(o),o=d.call(p,l)}return o}function $o(o){return o=o[Lo],o instanceof Ws?o:null}var Bo="__closure_events_fn_"+(1e9*Math.random()>>>0);function pl(o){return typeof o=="function"?o:(o[Bo]||(o[Bo]=function(l){return o.handleEvent(l)}),o[Bo])}function Be(){ue.call(this),this.i=new Ws(this),this.M=this,this.F=null}P(Be,ue),Be.prototype[nr]=!0,Be.prototype.removeEventListener=function(o,l,d,p){dl(this,o,l,d,p)};function Ye(o,l){var d,p=o.F;if(p)for(d=[];p;p=p.F)d.push(p);if(o=o.M,p=l.type||l,typeof l=="string")l=new oe(l,o);else if(l instanceof oe)l.target=l.target||o;else{var I=l;l=new oe(p,o),E(l,I)}if(I=!0,d)for(var R=d.length-1;0<=R;R--){var D=l.g=d[R];I=Ks(D,p,!0,l)&&I}if(D=l.g=o,I=Ks(D,p,!0,l)&&I,I=Ks(D,p,!1,l)&&I,d)for(R=0;R<d.length;R++)D=l.g=d[R],I=Ks(D,p,!1,l)&&I}Be.prototype.N=function(){if(Be.aa.N.call(this),this.i){var o=this.i,l;for(l in o.g){for(var d=o.g[l],p=0;p<d.length;p++)Gs(d[p]);delete o.g[l],o.h--}}this.F=null},Be.prototype.K=function(o,l,d,p){return this.i.add(String(o),l,!1,d,p)},Be.prototype.L=function(o,l,d,p){return this.i.add(String(o),l,!0,d,p)};function Ks(o,l,d,p){if(l=o.i.g[String(l)],!l)return!0;l=l.concat();for(var I=!0,R=0;R<l.length;++R){var D=l[R];if(D&&!D.da&&D.capture==d){var ce=D.listener,Oe=D.ha||D.src;D.fa&&Oo(o.i,D),I=ce.call(Oe,p)!==!1&&I}}return I&&!p.defaultPrevented}function ml(o,l,d){if(typeof o=="function")d&&(o=g(o,d));else if(o&&typeof o.handleEvent=="function")o=g(o.handleEvent,o);else throw Error("Invalid listener argument");return 2147483647<Number(l)?-1:c.setTimeout(o,l||0)}function gl(o){o.g=ml(()=>{o.g=null,o.i&&(o.i=!1,gl(o))},o.l);const l=o.h;o.h=null,o.m.apply(null,l)}class cm extends ue{constructor(l,d){super(),this.m=l,this.l=d,this.h=null,this.i=!1,this.g=null}j(l){this.h=arguments,this.g?this.i=!0:gl(this)}N(){super.N(),this.g&&(c.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Hr(o){ue.call(this),this.h=o,this.g={}}P(Hr,ue);var _l=[];function yl(o){ye(o.g,function(l,d){this.g.hasOwnProperty(d)&&Uo(l)},o),o.g={}}Hr.prototype.N=function(){Hr.aa.N.call(this),yl(this)},Hr.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var jo=c.JSON.stringify,lm=c.JSON.parse,um=class{stringify(o){return c.JSON.stringify(o,void 0)}parse(o){return c.JSON.parse(o,void 0)}};function qo(){}qo.prototype.h=null;function vl(o){return o.h||(o.h=o.i())}function El(){}var Gr={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function zo(){oe.call(this,"d")}P(zo,oe);function Ho(){oe.call(this,"c")}P(Ho,oe);var Pn={},wl=null;function Qs(){return wl=wl||new Be}Pn.La="serverreachability";function Tl(o){oe.call(this,Pn.La,o)}P(Tl,oe);function Wr(o){const l=Qs();Ye(l,new Tl(l))}Pn.STAT_EVENT="statevent";function Il(o,l){oe.call(this,Pn.STAT_EVENT,o),this.stat=l}P(Il,oe);function Ze(o){const l=Qs();Ye(l,new Il(l,o))}Pn.Ma="timingevent";function bl(o,l){oe.call(this,Pn.Ma,o),this.size=l}P(bl,oe);function Kr(o,l){if(typeof o!="function")throw Error("Fn must not be null and must be a function");return c.setTimeout(function(){o()},l)}function Qr(){this.g=!0}Qr.prototype.xa=function(){this.g=!1};function hm(o,l,d,p,I,R){o.info(function(){if(o.g)if(R)for(var D="",ce=R.split("&"),Oe=0;Oe<ce.length;Oe++){var re=ce[Oe].split("=");if(1<re.length){var je=re[0];re=re[1];var qe=je.split("_");D=2<=qe.length&&qe[1]=="type"?D+(je+"="+re+"&"):D+(je+"=redacted&")}}else D=null;else D=R;return"XMLHTTP REQ ("+p+") [attempt "+I+"]: "+l+`
`+d+`
`+D})}function dm(o,l,d,p,I,R,D){o.info(function(){return"XMLHTTP RESP ("+p+") [ attempt "+I+"]: "+l+`
`+d+`
`+R+" "+D})}function rr(o,l,d,p){o.info(function(){return"XMLHTTP TEXT ("+l+"): "+pm(o,d)+(p?" "+p:"")})}function fm(o,l){o.info(function(){return"TIMEOUT: "+l})}Qr.prototype.info=function(){};function pm(o,l){if(!o.g)return l;if(!l)return null;try{var d=JSON.parse(l);if(d){for(o=0;o<d.length;o++)if(Array.isArray(d[o])){var p=d[o];if(!(2>p.length)){var I=p[1];if(Array.isArray(I)&&!(1>I.length)){var R=I[0];if(R!="noop"&&R!="stop"&&R!="close")for(var D=1;D<I.length;D++)I[D]=""}}}}return jo(d)}catch{return l}}var Js={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},Al={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},Go;function Xs(){}P(Xs,qo),Xs.prototype.g=function(){return new XMLHttpRequest},Xs.prototype.i=function(){return{}},Go=new Xs;function Kt(o,l,d,p){this.j=o,this.i=l,this.l=d,this.R=p||1,this.U=new Hr(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new Sl}function Sl(){this.i=null,this.g="",this.h=!1}var Rl={},Wo={};function Ko(o,l,d){o.L=1,o.v=ti(Nt(l)),o.m=d,o.P=!0,kl(o,null)}function kl(o,l){o.F=Date.now(),Ys(o),o.A=Nt(o.v);var d=o.A,p=o.R;Array.isArray(p)||(p=[String(p)]),jl(d.i,"t",p),o.C=0,d=o.j.J,o.h=new Sl,o.g=ou(o.j,d?l:null,!o.m),0<o.O&&(o.M=new cm(g(o.Y,o,o.g),o.O)),l=o.U,d=o.g,p=o.ca;var I="readystatechange";Array.isArray(I)||(I&&(_l[0]=I.toString()),I=_l);for(var R=0;R<I.length;R++){var D=hl(d,I[R],p||l.handleEvent,!1,l.h||l);if(!D)break;l.g[D.key]=D}l=o.H?_(o.H):{},o.m?(o.u||(o.u="POST"),l["Content-Type"]="application/x-www-form-urlencoded",o.g.ea(o.A,o.u,o.m,l)):(o.u="GET",o.g.ea(o.A,o.u,null,l)),Wr(),hm(o.i,o.u,o.A,o.l,o.R,o.m)}Kt.prototype.ca=function(o){o=o.target;const l=this.M;l&&Dt(o)==3?l.j():this.Y(o)},Kt.prototype.Y=function(o){try{if(o==this.g)e:{const qe=Dt(this.g);var l=this.g.Ba();const or=this.g.Z();if(!(3>qe)&&(qe!=3||this.g&&(this.h.h||this.g.oa()||Ql(this.g)))){this.J||qe!=4||l==7||(l==8||0>=or?Wr(3):Wr(2)),Qo(this);var d=this.g.Z();this.X=d;t:if(Pl(this)){var p=Ql(this.g);o="";var I=p.length,R=Dt(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){Cn(this),Jr(this);var D="";break t}this.h.i=new c.TextDecoder}for(l=0;l<I;l++)this.h.h=!0,o+=this.h.i.decode(p[l],{stream:!(R&&l==I-1)});p.length=0,this.h.g+=o,this.C=0,D=this.h.g}else D=this.g.oa();if(this.o=d==200,dm(this.i,this.u,this.A,this.l,this.R,qe,d),this.o){if(this.T&&!this.K){t:{if(this.g){var ce,Oe=this.g;if((ce=Oe.g?Oe.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!z(ce)){var re=ce;break t}}re=null}if(d=re)rr(this.i,this.l,d,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Jo(this,d);else{this.o=!1,this.s=3,Ze(12),Cn(this),Jr(this);break e}}if(this.P){d=!0;let ht;for(;!this.J&&this.C<D.length;)if(ht=mm(this,D),ht==Wo){qe==4&&(this.s=4,Ze(14),d=!1),rr(this.i,this.l,null,"[Incomplete Response]");break}else if(ht==Rl){this.s=4,Ze(15),rr(this.i,this.l,D,"[Invalid Chunk]"),d=!1;break}else rr(this.i,this.l,ht,null),Jo(this,ht);if(Pl(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),qe!=4||D.length!=0||this.h.h||(this.s=1,Ze(16),d=!1),this.o=this.o&&d,!d)rr(this.i,this.l,D,"[Invalid Chunked Response]"),Cn(this),Jr(this);else if(0<D.length&&!this.W){this.W=!0;var je=this.j;je.g==this&&je.ba&&!je.M&&(je.j.info("Great, no buffering proxy detected. Bytes received: "+D.length),na(je),je.M=!0,Ze(11))}}else rr(this.i,this.l,D,null),Jo(this,D);qe==4&&Cn(this),this.o&&!this.J&&(qe==4?nu(this.j,this):(this.o=!1,Ys(this)))}else Nm(this.g),d==400&&0<D.indexOf("Unknown SID")?(this.s=3,Ze(12)):(this.s=0,Ze(13)),Cn(this),Jr(this)}}}catch{}finally{}};function Pl(o){return o.g?o.u=="GET"&&o.L!=2&&o.j.Ca:!1}function mm(o,l){var d=o.C,p=l.indexOf(`
`,d);return p==-1?Wo:(d=Number(l.substring(d,p)),isNaN(d)?Rl:(p+=1,p+d>l.length?Wo:(l=l.slice(p,p+d),o.C=p+d,l)))}Kt.prototype.cancel=function(){this.J=!0,Cn(this)};function Ys(o){o.S=Date.now()+o.I,Cl(o,o.I)}function Cl(o,l){if(o.B!=null)throw Error("WatchDog timer not null");o.B=Kr(g(o.ba,o),l)}function Qo(o){o.B&&(c.clearTimeout(o.B),o.B=null)}Kt.prototype.ba=function(){this.B=null;const o=Date.now();0<=o-this.S?(fm(this.i,this.A),this.L!=2&&(Wr(),Ze(17)),Cn(this),this.s=2,Jr(this)):Cl(this,this.S-o)};function Jr(o){o.j.G==0||o.J||nu(o.j,o)}function Cn(o){Qo(o);var l=o.M;l&&typeof l.ma=="function"&&l.ma(),o.M=null,yl(o.U),o.g&&(l=o.g,o.g=null,l.abort(),l.ma())}function Jo(o,l){try{var d=o.j;if(d.G!=0&&(d.g==o||Xo(d.h,o))){if(!o.K&&Xo(d.h,o)&&d.G==3){try{var p=d.Da.g.parse(l)}catch{p=null}if(Array.isArray(p)&&p.length==3){var I=p;if(I[0]==0){e:if(!d.u){if(d.g)if(d.g.F+3e3<o.F)ai(d),ii(d);else break e;ta(d),Ze(18)}}else d.za=I[1],0<d.za-d.T&&37500>I[2]&&d.F&&d.v==0&&!d.C&&(d.C=Kr(g(d.Za,d),6e3));if(1>=Dl(d.h)&&d.ca){try{d.ca()}catch{}d.ca=void 0}}else Nn(d,11)}else if((o.K||d.g==o)&&ai(d),!z(l))for(I=d.Da.g.parse(l),l=0;l<I.length;l++){let re=I[l];if(d.T=re[0],re=re[1],d.G==2)if(re[0]=="c"){d.K=re[1],d.ia=re[2];const je=re[3];je!=null&&(d.la=je,d.j.info("VER="+d.la));const qe=re[4];qe!=null&&(d.Aa=qe,d.j.info("SVER="+d.Aa));const or=re[5];or!=null&&typeof or=="number"&&0<or&&(p=1.5*or,d.L=p,d.j.info("backChannelRequestTimeoutMs_="+p)),p=d;const ht=o.g;if(ht){const li=ht.g?ht.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(li){var R=p.h;R.g||li.indexOf("spdy")==-1&&li.indexOf("quic")==-1&&li.indexOf("h2")==-1||(R.j=R.l,R.g=new Set,R.h&&(Yo(R,R.h),R.h=null))}if(p.D){const ra=ht.g?ht.g.getResponseHeader("X-HTTP-Session-Id"):null;ra&&(p.ya=ra,pe(p.I,p.D,ra))}}d.G=3,d.l&&d.l.ua(),d.ba&&(d.R=Date.now()-o.F,d.j.info("Handshake RTT: "+d.R+"ms")),p=d;var D=o;if(p.qa=iu(p,p.J?p.ia:null,p.W),D.K){xl(p.h,D);var ce=D,Oe=p.L;Oe&&(ce.I=Oe),ce.B&&(Qo(ce),Ys(ce)),p.g=D}else eu(p);0<d.i.length&&oi(d)}else re[0]!="stop"&&re[0]!="close"||Nn(d,7);else d.G==3&&(re[0]=="stop"||re[0]=="close"?re[0]=="stop"?Nn(d,7):ea(d):re[0]!="noop"&&d.l&&d.l.ta(re),d.v=0)}}Wr(4)}catch{}}var gm=class{constructor(o,l){this.g=o,this.map=l}};function Vl(o){this.l=o||10,c.PerformanceNavigationTiming?(o=c.performance.getEntriesByType("navigation"),o=0<o.length&&(o[0].nextHopProtocol=="hq"||o[0].nextHopProtocol=="h2")):o=!!(c.chrome&&c.chrome.loadTimes&&c.chrome.loadTimes()&&c.chrome.loadTimes().wasFetchedViaSpdy),this.j=o?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function Nl(o){return o.h?!0:o.g?o.g.size>=o.j:!1}function Dl(o){return o.h?1:o.g?o.g.size:0}function Xo(o,l){return o.h?o.h==l:o.g?o.g.has(l):!1}function Yo(o,l){o.g?o.g.add(l):o.h=l}function xl(o,l){o.h&&o.h==l?o.h=null:o.g&&o.g.has(l)&&o.g.delete(l)}Vl.prototype.cancel=function(){if(this.i=Ol(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const o of this.g.values())o.cancel();this.g.clear()}};function Ol(o){if(o.h!=null)return o.i.concat(o.h.D);if(o.g!=null&&o.g.size!==0){let l=o.i;for(const d of o.g.values())l=l.concat(d.D);return l}return x(o.i)}function _m(o){if(o.V&&typeof o.V=="function")return o.V();if(typeof Map<"u"&&o instanceof Map||typeof Set<"u"&&o instanceof Set)return Array.from(o.values());if(typeof o=="string")return o.split("");if(u(o)){for(var l=[],d=o.length,p=0;p<d;p++)l.push(o[p]);return l}l=[],d=0;for(p in o)l[d++]=o[p];return l}function ym(o){if(o.na&&typeof o.na=="function")return o.na();if(!o.V||typeof o.V!="function"){if(typeof Map<"u"&&o instanceof Map)return Array.from(o.keys());if(!(typeof Set<"u"&&o instanceof Set)){if(u(o)||typeof o=="string"){var l=[];o=o.length;for(var d=0;d<o;d++)l.push(d);return l}l=[],d=0;for(const p in o)l[d++]=p;return l}}}function Ml(o,l){if(o.forEach&&typeof o.forEach=="function")o.forEach(l,void 0);else if(u(o)||typeof o=="string")Array.prototype.forEach.call(o,l,void 0);else for(var d=ym(o),p=_m(o),I=p.length,R=0;R<I;R++)l.call(void 0,p[R],d&&d[R],o)}var Ll=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function vm(o,l){if(o){o=o.split("&");for(var d=0;d<o.length;d++){var p=o[d].indexOf("="),I=null;if(0<=p){var R=o[d].substring(0,p);I=o[d].substring(p+1)}else R=o[d];l(R,I?decodeURIComponent(I.replace(/\+/g," ")):"")}}}function Vn(o){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,o instanceof Vn){this.h=o.h,Zs(this,o.j),this.o=o.o,this.g=o.g,ei(this,o.s),this.l=o.l;var l=o.i,d=new Zr;d.i=l.i,l.g&&(d.g=new Map(l.g),d.h=l.h),Fl(this,d),this.m=o.m}else o&&(l=String(o).match(Ll))?(this.h=!1,Zs(this,l[1]||"",!0),this.o=Xr(l[2]||""),this.g=Xr(l[3]||"",!0),ei(this,l[4]),this.l=Xr(l[5]||"",!0),Fl(this,l[6]||"",!0),this.m=Xr(l[7]||"")):(this.h=!1,this.i=new Zr(null,this.h))}Vn.prototype.toString=function(){var o=[],l=this.j;l&&o.push(Yr(l,Ul,!0),":");var d=this.g;return(d||l=="file")&&(o.push("//"),(l=this.o)&&o.push(Yr(l,Ul,!0),"@"),o.push(encodeURIComponent(String(d)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),d=this.s,d!=null&&o.push(":",String(d))),(d=this.l)&&(this.g&&d.charAt(0)!="/"&&o.push("/"),o.push(Yr(d,d.charAt(0)=="/"?Tm:wm,!0))),(d=this.i.toString())&&o.push("?",d),(d=this.m)&&o.push("#",Yr(d,bm)),o.join("")};function Nt(o){return new Vn(o)}function Zs(o,l,d){o.j=d?Xr(l,!0):l,o.j&&(o.j=o.j.replace(/:$/,""))}function ei(o,l){if(l){if(l=Number(l),isNaN(l)||0>l)throw Error("Bad port number "+l);o.s=l}else o.s=null}function Fl(o,l,d){l instanceof Zr?(o.i=l,Am(o.i,o.h)):(d||(l=Yr(l,Im)),o.i=new Zr(l,o.h))}function pe(o,l,d){o.i.set(l,d)}function ti(o){return pe(o,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),o}function Xr(o,l){return o?l?decodeURI(o.replace(/%25/g,"%2525")):decodeURIComponent(o):""}function Yr(o,l,d){return typeof o=="string"?(o=encodeURI(o).replace(l,Em),d&&(o=o.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),o):null}function Em(o){return o=o.charCodeAt(0),"%"+(o>>4&15).toString(16)+(o&15).toString(16)}var Ul=/[#\/\?@]/g,wm=/[#\?:]/g,Tm=/[#\?]/g,Im=/[#\?@]/g,bm=/#/g;function Zr(o,l){this.h=this.g=null,this.i=o||null,this.j=!!l}function Qt(o){o.g||(o.g=new Map,o.h=0,o.i&&vm(o.i,function(l,d){o.add(decodeURIComponent(l.replace(/\+/g," ")),d)}))}n=Zr.prototype,n.add=function(o,l){Qt(this),this.i=null,o=sr(this,o);var d=this.g.get(o);return d||this.g.set(o,d=[]),d.push(l),this.h+=1,this};function $l(o,l){Qt(o),l=sr(o,l),o.g.has(l)&&(o.i=null,o.h-=o.g.get(l).length,o.g.delete(l))}function Bl(o,l){return Qt(o),l=sr(o,l),o.g.has(l)}n.forEach=function(o,l){Qt(this),this.g.forEach(function(d,p){d.forEach(function(I){o.call(l,I,p,this)},this)},this)},n.na=function(){Qt(this);const o=Array.from(this.g.values()),l=Array.from(this.g.keys()),d=[];for(let p=0;p<l.length;p++){const I=o[p];for(let R=0;R<I.length;R++)d.push(l[p])}return d},n.V=function(o){Qt(this);let l=[];if(typeof o=="string")Bl(this,o)&&(l=l.concat(this.g.get(sr(this,o))));else{o=Array.from(this.g.values());for(let d=0;d<o.length;d++)l=l.concat(o[d])}return l},n.set=function(o,l){return Qt(this),this.i=null,o=sr(this,o),Bl(this,o)&&(this.h-=this.g.get(o).length),this.g.set(o,[l]),this.h+=1,this},n.get=function(o,l){return o?(o=this.V(o),0<o.length?String(o[0]):l):l};function jl(o,l,d){$l(o,l),0<d.length&&(o.i=null,o.g.set(sr(o,l),x(d)),o.h+=d.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const o=[],l=Array.from(this.g.keys());for(var d=0;d<l.length;d++){var p=l[d];const R=encodeURIComponent(String(p)),D=this.V(p);for(p=0;p<D.length;p++){var I=R;D[p]!==""&&(I+="="+encodeURIComponent(String(D[p]))),o.push(I)}}return this.i=o.join("&")};function sr(o,l){return l=String(l),o.j&&(l=l.toLowerCase()),l}function Am(o,l){l&&!o.j&&(Qt(o),o.i=null,o.g.forEach(function(d,p){var I=p.toLowerCase();p!=I&&($l(this,p),jl(this,I,d))},o)),o.j=l}function Sm(o,l){const d=new Qr;if(c.Image){const p=new Image;p.onload=S(Jt,d,"TestLoadImage: loaded",!0,l,p),p.onerror=S(Jt,d,"TestLoadImage: error",!1,l,p),p.onabort=S(Jt,d,"TestLoadImage: abort",!1,l,p),p.ontimeout=S(Jt,d,"TestLoadImage: timeout",!1,l,p),c.setTimeout(function(){p.ontimeout&&p.ontimeout()},1e4),p.src=o}else l(!1)}function Rm(o,l){const d=new Qr,p=new AbortController,I=setTimeout(()=>{p.abort(),Jt(d,"TestPingServer: timeout",!1,l)},1e4);fetch(o,{signal:p.signal}).then(R=>{clearTimeout(I),R.ok?Jt(d,"TestPingServer: ok",!0,l):Jt(d,"TestPingServer: server error",!1,l)}).catch(()=>{clearTimeout(I),Jt(d,"TestPingServer: error",!1,l)})}function Jt(o,l,d,p,I){try{I&&(I.onload=null,I.onerror=null,I.onabort=null,I.ontimeout=null),p(d)}catch{}}function km(){this.g=new um}function Pm(o,l,d){const p=d||"";try{Ml(o,function(I,R){let D=I;h(I)&&(D=jo(I)),l.push(p+R+"="+encodeURIComponent(D))})}catch(I){throw l.push(p+"type="+encodeURIComponent("_badmap")),I}}function ni(o){this.l=o.Ub||null,this.j=o.eb||!1}P(ni,qo),ni.prototype.g=function(){return new ri(this.l,this.j)},ni.prototype.i=function(o){return function(){return o}}({});function ri(o,l){Be.call(this),this.D=o,this.o=l,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}P(ri,Be),n=ri.prototype,n.open=function(o,l){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=o,this.A=l,this.readyState=1,ts(this)},n.send=function(o){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const l={headers:this.u,method:this.B,credentials:this.m,cache:void 0};o&&(l.body=o),(this.D||c).fetch(new Request(this.A,l)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,es(this)),this.readyState=0},n.Sa=function(o){if(this.g&&(this.l=o,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=o.headers,this.readyState=2,ts(this)),this.g&&(this.readyState=3,ts(this),this.g)))if(this.responseType==="arraybuffer")o.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof c.ReadableStream<"u"&&"body"in o){if(this.j=o.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;ql(this)}else o.text().then(this.Ra.bind(this),this.ga.bind(this))};function ql(o){o.j.read().then(o.Pa.bind(o)).catch(o.ga.bind(o))}n.Pa=function(o){if(this.g){if(this.o&&o.value)this.response.push(o.value);else if(!this.o){var l=o.value?o.value:new Uint8Array(0);(l=this.v.decode(l,{stream:!o.done}))&&(this.response=this.responseText+=l)}o.done?es(this):ts(this),this.readyState==3&&ql(this)}},n.Ra=function(o){this.g&&(this.response=this.responseText=o,es(this))},n.Qa=function(o){this.g&&(this.response=o,es(this))},n.ga=function(){this.g&&es(this)};function es(o){o.readyState=4,o.l=null,o.j=null,o.v=null,ts(o)}n.setRequestHeader=function(o,l){this.u.append(o,l)},n.getResponseHeader=function(o){return this.h&&this.h.get(o.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const o=[],l=this.h.entries();for(var d=l.next();!d.done;)d=d.value,o.push(d[0]+": "+d[1]),d=l.next();return o.join(`\r
`)};function ts(o){o.onreadystatechange&&o.onreadystatechange.call(o)}Object.defineProperty(ri.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(o){this.m=o?"include":"same-origin"}});function zl(o){let l="";return ye(o,function(d,p){l+=p,l+=":",l+=d,l+=`\r
`}),l}function Zo(o,l,d){e:{for(p in d){var p=!1;break e}p=!0}p||(d=zl(d),typeof o=="string"?d!=null&&encodeURIComponent(String(d)):pe(o,l,d))}function be(o){Be.call(this),this.headers=new Map,this.o=o||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}P(be,Be);var Cm=/^https?$/i,Vm=["POST","PUT"];n=be.prototype,n.Ha=function(o){this.J=o},n.ea=function(o,l,d,p){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+o);l=l?l.toUpperCase():"GET",this.D=o,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Go.g(),this.v=this.o?vl(this.o):vl(Go),this.g.onreadystatechange=g(this.Ea,this);try{this.B=!0,this.g.open(l,String(o),!0),this.B=!1}catch(R){Hl(this,R);return}if(o=d||"",d=new Map(this.headers),p)if(Object.getPrototypeOf(p)===Object.prototype)for(var I in p)d.set(I,p[I]);else if(typeof p.keys=="function"&&typeof p.get=="function")for(const R of p.keys())d.set(R,p.get(R));else throw Error("Unknown input type for opt_headers: "+String(p));p=Array.from(d.keys()).find(R=>R.toLowerCase()=="content-type"),I=c.FormData&&o instanceof c.FormData,!(0<=Array.prototype.indexOf.call(Vm,l,void 0))||p||I||d.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[R,D]of d)this.g.setRequestHeader(R,D);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Kl(this),this.u=!0,this.g.send(o),this.u=!1}catch(R){Hl(this,R)}};function Hl(o,l){o.h=!1,o.g&&(o.j=!0,o.g.abort(),o.j=!1),o.l=l,o.m=5,Gl(o),si(o)}function Gl(o){o.A||(o.A=!0,Ye(o,"complete"),Ye(o,"error"))}n.abort=function(o){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=o||7,Ye(this,"complete"),Ye(this,"abort"),si(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),si(this,!0)),be.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?Wl(this):this.bb())},n.bb=function(){Wl(this)};function Wl(o){if(o.h&&typeof a<"u"&&(!o.v[1]||Dt(o)!=4||o.Z()!=2)){if(o.u&&Dt(o)==4)ml(o.Ea,0,o);else if(Ye(o,"readystatechange"),Dt(o)==4){o.h=!1;try{const D=o.Z();e:switch(D){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var l=!0;break e;default:l=!1}var d;if(!(d=l)){var p;if(p=D===0){var I=String(o.D).match(Ll)[1]||null;!I&&c.self&&c.self.location&&(I=c.self.location.protocol.slice(0,-1)),p=!Cm.test(I?I.toLowerCase():"")}d=p}if(d)Ye(o,"complete"),Ye(o,"success");else{o.m=6;try{var R=2<Dt(o)?o.g.statusText:""}catch{R=""}o.l=R+" ["+o.Z()+"]",Gl(o)}}finally{si(o)}}}}function si(o,l){if(o.g){Kl(o);const d=o.g,p=o.v[0]?()=>{}:null;o.g=null,o.v=null,l||Ye(o,"ready");try{d.onreadystatechange=p}catch{}}}function Kl(o){o.I&&(c.clearTimeout(o.I),o.I=null)}n.isActive=function(){return!!this.g};function Dt(o){return o.g?o.g.readyState:0}n.Z=function(){try{return 2<Dt(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(o){if(this.g){var l=this.g.responseText;return o&&l.indexOf(o)==0&&(l=l.substring(o.length)),lm(l)}};function Ql(o){try{if(!o.g)return null;if("response"in o.g)return o.g.response;switch(o.H){case"":case"text":return o.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in o.g)return o.g.mozResponseArrayBuffer}return null}catch{return null}}function Nm(o){const l={};o=(o.g&&2<=Dt(o)&&o.g.getAllResponseHeaders()||"").split(`\r
`);for(let p=0;p<o.length;p++){if(z(o[p]))continue;var d=T(o[p]);const I=d[0];if(d=d[1],typeof d!="string")continue;d=d.trim();const R=l[I]||[];l[I]=R,R.push(d)}w(l,function(p){return p.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function ns(o,l,d){return d&&d.internalChannelParams&&d.internalChannelParams[o]||l}function Jl(o){this.Aa=0,this.i=[],this.j=new Qr,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=ns("failFast",!1,o),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=ns("baseRetryDelayMs",5e3,o),this.cb=ns("retryDelaySeedMs",1e4,o),this.Wa=ns("forwardChannelMaxRetries",2,o),this.wa=ns("forwardChannelRequestTimeoutMs",2e4,o),this.pa=o&&o.xmlHttpFactory||void 0,this.Xa=o&&o.Tb||void 0,this.Ca=o&&o.useFetchStreams||!1,this.L=void 0,this.J=o&&o.supportsCrossDomainXhr||!1,this.K="",this.h=new Vl(o&&o.concurrentRequestLimit),this.Da=new km,this.P=o&&o.fastHandshake||!1,this.O=o&&o.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=o&&o.Rb||!1,o&&o.xa&&this.j.xa(),o&&o.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&o&&o.detectBufferingProxy||!1,this.ja=void 0,o&&o.longPollingTimeout&&0<o.longPollingTimeout&&(this.ja=o.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=Jl.prototype,n.la=8,n.G=1,n.connect=function(o,l,d,p){Ze(0),this.W=o,this.H=l||{},d&&p!==void 0&&(this.H.OSID=d,this.H.OAID=p),this.F=this.X,this.I=iu(this,null,this.W),oi(this)};function ea(o){if(Xl(o),o.G==3){var l=o.U++,d=Nt(o.I);if(pe(d,"SID",o.K),pe(d,"RID",l),pe(d,"TYPE","terminate"),rs(o,d),l=new Kt(o,o.j,l),l.L=2,l.v=ti(Nt(d)),d=!1,c.navigator&&c.navigator.sendBeacon)try{d=c.navigator.sendBeacon(l.v.toString(),"")}catch{}!d&&c.Image&&(new Image().src=l.v,d=!0),d||(l.g=ou(l.j,null),l.g.ea(l.v)),l.F=Date.now(),Ys(l)}su(o)}function ii(o){o.g&&(na(o),o.g.cancel(),o.g=null)}function Xl(o){ii(o),o.u&&(c.clearTimeout(o.u),o.u=null),ai(o),o.h.cancel(),o.s&&(typeof o.s=="number"&&c.clearTimeout(o.s),o.s=null)}function oi(o){if(!Nl(o.h)&&!o.s){o.s=!0;var l=o.Ga;F||_e(),B||(F(),B=!0),le.add(l,o),o.B=0}}function Dm(o,l){return Dl(o.h)>=o.h.j-(o.s?1:0)?!1:o.s?(o.i=l.D.concat(o.i),!0):o.G==1||o.G==2||o.B>=(o.Va?0:o.Wa)?!1:(o.s=Kr(g(o.Ga,o,l),ru(o,o.B)),o.B++,!0)}n.Ga=function(o){if(this.s)if(this.s=null,this.G==1){if(!o){this.U=Math.floor(1e5*Math.random()),o=this.U++;const I=new Kt(this,this.j,o);let R=this.o;if(this.S&&(R?(R=_(R),E(R,this.S)):R=this.S),this.m!==null||this.O||(I.H=R,R=null),this.P)e:{for(var l=0,d=0;d<this.i.length;d++){t:{var p=this.i[d];if("__data__"in p.map&&(p=p.map.__data__,typeof p=="string")){p=p.length;break t}p=void 0}if(p===void 0)break;if(l+=p,4096<l){l=d;break e}if(l===4096||d===this.i.length-1){l=d+1;break e}}l=1e3}else l=1e3;l=Zl(this,I,l),d=Nt(this.I),pe(d,"RID",o),pe(d,"CVER",22),this.D&&pe(d,"X-HTTP-Session-Id",this.D),rs(this,d),R&&(this.O?l="headers="+encodeURIComponent(String(zl(R)))+"&"+l:this.m&&Zo(d,this.m,R)),Yo(this.h,I),this.Ua&&pe(d,"TYPE","init"),this.P?(pe(d,"$req",l),pe(d,"SID","null"),I.T=!0,Ko(I,d,null)):Ko(I,d,l),this.G=2}}else this.G==3&&(o?Yl(this,o):this.i.length==0||Nl(this.h)||Yl(this))};function Yl(o,l){var d;l?d=l.l:d=o.U++;const p=Nt(o.I);pe(p,"SID",o.K),pe(p,"RID",d),pe(p,"AID",o.T),rs(o,p),o.m&&o.o&&Zo(p,o.m,o.o),d=new Kt(o,o.j,d,o.B+1),o.m===null&&(d.H=o.o),l&&(o.i=l.D.concat(o.i)),l=Zl(o,d,1e3),d.I=Math.round(.5*o.wa)+Math.round(.5*o.wa*Math.random()),Yo(o.h,d),Ko(d,p,l)}function rs(o,l){o.H&&ye(o.H,function(d,p){pe(l,p,d)}),o.l&&Ml({},function(d,p){pe(l,p,d)})}function Zl(o,l,d){d=Math.min(o.i.length,d);var p=o.l?g(o.l.Na,o.l,o):null;e:{var I=o.i;let R=-1;for(;;){const D=["count="+d];R==-1?0<d?(R=I[0].g,D.push("ofs="+R)):R=0:D.push("ofs="+R);let ce=!0;for(let Oe=0;Oe<d;Oe++){let re=I[Oe].g;const je=I[Oe].map;if(re-=R,0>re)R=Math.max(0,I[Oe].g-100),ce=!1;else try{Pm(je,D,"req"+re+"_")}catch{p&&p(je)}}if(ce){p=D.join("&");break e}}}return o=o.i.splice(0,d),l.D=o,p}function eu(o){if(!o.g&&!o.u){o.Y=1;var l=o.Fa;F||_e(),B||(F(),B=!0),le.add(l,o),o.v=0}}function ta(o){return o.g||o.u||3<=o.v?!1:(o.Y++,o.u=Kr(g(o.Fa,o),ru(o,o.v)),o.v++,!0)}n.Fa=function(){if(this.u=null,tu(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var o=2*this.R;this.j.info("BP detection timer enabled: "+o),this.A=Kr(g(this.ab,this),o)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,Ze(10),ii(this),tu(this))};function na(o){o.A!=null&&(c.clearTimeout(o.A),o.A=null)}function tu(o){o.g=new Kt(o,o.j,"rpc",o.Y),o.m===null&&(o.g.H=o.o),o.g.O=0;var l=Nt(o.qa);pe(l,"RID","rpc"),pe(l,"SID",o.K),pe(l,"AID",o.T),pe(l,"CI",o.F?"0":"1"),!o.F&&o.ja&&pe(l,"TO",o.ja),pe(l,"TYPE","xmlhttp"),rs(o,l),o.m&&o.o&&Zo(l,o.m,o.o),o.L&&(o.g.I=o.L);var d=o.g;o=o.ia,d.L=1,d.v=ti(Nt(l)),d.m=null,d.P=!0,kl(d,o)}n.Za=function(){this.C!=null&&(this.C=null,ii(this),ta(this),Ze(19))};function ai(o){o.C!=null&&(c.clearTimeout(o.C),o.C=null)}function nu(o,l){var d=null;if(o.g==l){ai(o),na(o),o.g=null;var p=2}else if(Xo(o.h,l))d=l.D,xl(o.h,l),p=1;else return;if(o.G!=0){if(l.o)if(p==1){d=l.m?l.m.length:0,l=Date.now()-l.F;var I=o.B;p=Qs(),Ye(p,new bl(p,d)),oi(o)}else eu(o);else if(I=l.s,I==3||I==0&&0<l.X||!(p==1&&Dm(o,l)||p==2&&ta(o)))switch(d&&0<d.length&&(l=o.h,l.i=l.i.concat(d)),I){case 1:Nn(o,5);break;case 4:Nn(o,10);break;case 3:Nn(o,6);break;default:Nn(o,2)}}}function ru(o,l){let d=o.Ta+Math.floor(Math.random()*o.cb);return o.isActive()||(d*=2),d*l}function Nn(o,l){if(o.j.info("Error code "+l),l==2){var d=g(o.fb,o),p=o.Xa;const I=!p;p=new Vn(p||"//www.google.com/images/cleardot.gif"),c.location&&c.location.protocol=="http"||Zs(p,"https"),ti(p),I?Sm(p.toString(),d):Rm(p.toString(),d)}else Ze(2);o.G=0,o.l&&o.l.sa(l),su(o),Xl(o)}n.fb=function(o){o?(this.j.info("Successfully pinged google.com"),Ze(2)):(this.j.info("Failed to ping google.com"),Ze(1))};function su(o){if(o.G=0,o.ka=[],o.l){const l=Ol(o.h);(l.length!=0||o.i.length!=0)&&(N(o.ka,l),N(o.ka,o.i),o.h.i.length=0,x(o.i),o.i.length=0),o.l.ra()}}function iu(o,l,d){var p=d instanceof Vn?Nt(d):new Vn(d);if(p.g!="")l&&(p.g=l+"."+p.g),ei(p,p.s);else{var I=c.location;p=I.protocol,l=l?l+"."+I.hostname:I.hostname,I=+I.port;var R=new Vn(null);p&&Zs(R,p),l&&(R.g=l),I&&ei(R,I),d&&(R.l=d),p=R}return d=o.D,l=o.ya,d&&l&&pe(p,d,l),pe(p,"VER",o.la),rs(o,p),p}function ou(o,l,d){if(l&&!o.J)throw Error("Can't create secondary domain capable XhrIo object.");return l=o.Ca&&!o.pa?new be(new ni({eb:d})):new be(o.pa),l.Ha(o.J),l}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function au(){}n=au.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function ci(){}ci.prototype.g=function(o,l){return new st(o,l)};function st(o,l){Be.call(this),this.g=new Jl(l),this.l=o,this.h=l&&l.messageUrlParams||null,o=l&&l.messageHeaders||null,l&&l.clientProtocolHeaderRequired&&(o?o["X-Client-Protocol"]="webchannel":o={"X-Client-Protocol":"webchannel"}),this.g.o=o,o=l&&l.initMessageHeaders||null,l&&l.messageContentType&&(o?o["X-WebChannel-Content-Type"]=l.messageContentType:o={"X-WebChannel-Content-Type":l.messageContentType}),l&&l.va&&(o?o["X-WebChannel-Client-Profile"]=l.va:o={"X-WebChannel-Client-Profile":l.va}),this.g.S=o,(o=l&&l.Sb)&&!z(o)&&(this.g.m=o),this.v=l&&l.supportsCrossDomainXhr||!1,this.u=l&&l.sendRawJson||!1,(l=l&&l.httpSessionIdParam)&&!z(l)&&(this.g.D=l,o=this.h,o!==null&&l in o&&(o=this.h,l in o&&delete o[l])),this.j=new ir(this)}P(st,Be),st.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},st.prototype.close=function(){ea(this.g)},st.prototype.o=function(o){var l=this.g;if(typeof o=="string"){var d={};d.__data__=o,o=d}else this.u&&(d={},d.__data__=jo(o),o=d);l.i.push(new gm(l.Ya++,o)),l.G==3&&oi(l)},st.prototype.N=function(){this.g.l=null,delete this.j,ea(this.g),delete this.g,st.aa.N.call(this)};function cu(o){zo.call(this),o.__headers__&&(this.headers=o.__headers__,this.statusCode=o.__status__,delete o.__headers__,delete o.__status__);var l=o.__sm__;if(l){e:{for(const d in l){o=d;break e}o=void 0}(this.i=o)&&(o=this.i,l=l!==null&&o in l?l[o]:void 0),this.data=l}else this.data=o}P(cu,zo);function lu(){Ho.call(this),this.status=1}P(lu,Ho);function ir(o){this.g=o}P(ir,au),ir.prototype.ua=function(){Ye(this.g,"a")},ir.prototype.ta=function(o){Ye(this.g,new cu(o))},ir.prototype.sa=function(o){Ye(this.g,new lu)},ir.prototype.ra=function(){Ye(this.g,"b")},ci.prototype.createWebChannel=ci.prototype.g,st.prototype.send=st.prototype.o,st.prototype.open=st.prototype.m,st.prototype.close=st.prototype.close,Ld=function(){return new ci},Md=function(){return Qs()},Od=Pn,La={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},Js.NO_ERROR=0,Js.TIMEOUT=8,Js.HTTP_ERROR=6,bi=Js,Al.COMPLETE="complete",xd=Al,El.EventType=Gr,Gr.OPEN="a",Gr.CLOSE="b",Gr.ERROR="c",Gr.MESSAGE="d",Be.prototype.listen=Be.prototype.K,cs=El,be.prototype.listenOnce=be.prototype.L,be.prototype.getLastError=be.prototype.Ka,be.prototype.getLastErrorCode=be.prototype.Ba,be.prototype.getStatus=be.prototype.Z,be.prototype.getResponseJson=be.prototype.Oa,be.prototype.getResponseText=be.prototype.oa,be.prototype.send=be.prototype.ea,be.prototype.setWithCredentials=be.prototype.Ha,Dd=be}).apply(typeof pi<"u"?pi:typeof self<"u"?self:typeof window<"u"?window:{});const Vu="@firebase/firestore",Nu="4.8.0";/**
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
 */let Fr="11.10.0";/**
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
 */const Kn=new vc("@firebase/firestore");function ur(){return Kn.logLevel}function L(n,...e){if(Kn.logLevel<=Y.DEBUG){const t=e.map(Tc);Kn.debug(`Firestore (${Fr}): ${n}`,...t)}}function qt(n,...e){if(Kn.logLevel<=Y.ERROR){const t=e.map(Tc);Kn.error(`Firestore (${Fr}): ${n}`,...t)}}function _n(n,...e){if(Kn.logLevel<=Y.WARN){const t=e.map(Tc);Kn.warn(`Firestore (${Fr}): ${n}`,...t)}}function Tc(n){if(typeof n=="string")return n;try{/**
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
 */function q(n,e,t){let r="Unexpected state";typeof e=="string"?r=e:t=e,Fd(n,r,t)}function Fd(n,e,t){let r=`FIRESTORE (${Fr}) INTERNAL ASSERTION FAILED: ${e} (ID: ${n.toString(16)})`;if(t!==void 0)try{r+=" CONTEXT: "+JSON.stringify(t)}catch{r+=" CONTEXT: "+t}throw qt(r),new Error(r)}function ie(n,e,t,r){let s="Unexpected state";typeof t=="string"?s=t:r=t,n||Fd(e,s,r)}function W(n,e){return n}/**
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
 */const k={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class M extends Wt{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
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
 */class Ud{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class ty{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(Ke.UNAUTHENTICATED))}shutdown(){}}class ny{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class ry{constructor(e){this.t=e,this.currentUser=Ke.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){ie(this.o===void 0,42304);let r=this.i;const s=u=>this.i!==r?(r=this.i,t(u)):Promise.resolve();let i=new un;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new un,e.enqueueRetryable(()=>s(this.currentUser))};const a=()=>{const u=i;e.enqueueRetryable(async()=>{await u.promise,await s(this.currentUser)})},c=u=>{L("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit(u=>c(u)),setTimeout(()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?c(u):(L("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new un)}},0),a()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(r=>this.i!==e?(L("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(ie(typeof r.accessToken=="string",31837,{l:r}),new Ud(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return ie(e===null||typeof e=="string",2055,{h:e}),new Ke(e)}}class sy{constructor(e,t,r){this.P=e,this.T=t,this.I=r,this.type="FirstParty",this.user=Ke.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const e=this.R();return e&&this.A.set("Authorization",e),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class iy{constructor(e,t,r){this.P=e,this.T=t,this.I=r}getToken(){return Promise.resolve(new sy(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable(()=>t(Ke.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class Du{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class oy{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,ft(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){ie(this.o===void 0,3512);const r=i=>{i.error!=null&&L("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const a=i.token!==this.m;return this.m=i.token,L("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?t(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable(()=>r(i))};const s=i=>{L("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(i=>s(i)),setTimeout(()=>{if(!this.appCheck){const i=this.V.getImmediate({optional:!0});i?s(i):L("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new Du(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(ie(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new Du(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
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
 */function ay(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
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
 */class Ic{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const s=ay(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<t&&(r+=e.charAt(s[i]%62))}return r}}function Q(n,e){return n<e?-1:n>e?1:0}function Fa(n,e){let t=0;for(;t<n.length&&t<e.length;){const r=n.codePointAt(t),s=e.codePointAt(t);if(r!==s){if(r<128&&s<128)return Q(r,s);{const i=$d(),a=cy(i.encode(xu(n,t)),i.encode(xu(e,t)));return a!==0?a:Q(r,s)}}t+=r>65535?2:1}return Q(n.length,e.length)}function xu(n,e){return n.codePointAt(e)>65535?n.substring(e,e+2):n.substring(e,e+1)}function cy(n,e){for(let t=0;t<n.length&&t<e.length;++t)if(n[t]!==e[t])return Q(n[t],e[t]);return Q(n.length,e.length)}function Rr(n,e,t){return n.length===e.length&&n.every((r,s)=>t(r,e[s]))}/**
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
 */const Ou="__name__";class wt{constructor(e,t,r){t===void 0?t=0:t>e.length&&q(637,{offset:t,range:e.length}),r===void 0?r=e.length-t:r>e.length-t&&q(1746,{length:r,range:e.length-t}),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return wt.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof wt?e.forEach(r=>{t.push(r)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let s=0;s<r;s++){const i=wt.compareSegments(e.get(s),t.get(s));if(i!==0)return i}return Q(e.length,t.length)}static compareSegments(e,t){const r=wt.isNumericId(e),s=wt.isNumericId(t);return r&&!s?-1:!r&&s?1:r&&s?wt.extractNumericId(e).compare(wt.extractNumericId(t)):Fa(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return ln.fromString(e.substring(4,e.length-2))}}class de extends wt{construct(e,t,r){return new de(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new M(k.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter(s=>s.length>0))}return new de(t)}static emptyPath(){return new de([])}}const ly=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Le extends wt{construct(e,t,r){return new Le(e,t,r)}static isValidIdentifier(e){return ly.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Le.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Ou}static keyField(){return new Le([Ou])}static fromServerFormat(e){const t=[];let r="",s=0;const i=()=>{if(r.length===0)throw new M(k.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let a=!1;for(;s<e.length;){const c=e[s];if(c==="\\"){if(s+1===e.length)throw new M(k.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const u=e[s+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new M(k.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=u,s+=2}else c==="`"?(a=!a,s++):c!=="."||a?(r+=c,s++):(i(),s++)}if(i(),a)throw new M(k.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new Le(t)}static emptyPath(){return new Le([])}}/**
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
 */function Bd(n,e,t){if(!t)throw new M(k.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function uy(n,e,t,r){if(e===!0&&r===!0)throw new M(k.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function Mu(n){if(!$.isDocumentKey(n))throw new M(k.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function Lu(n){if($.isDocumentKey(n))throw new M(k.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function jd(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function lo(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":q(12329,{type:typeof n})}function mt(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new M(k.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=lo(n);throw new M(k.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}/**
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
 */function Ce(n,e){const t={typeString:n};return e&&(t.value=e),t}function Ls(n,e){if(!jd(n))throw new M(k.INVALID_ARGUMENT,"JSON must be an object");let t;for(const r in e)if(e[r]){const s=e[r].typeString,i="value"in e[r]?{value:e[r].value}:void 0;if(!(r in n)){t=`JSON missing required field: '${r}'`;break}const a=n[r];if(s&&typeof a!==s){t=`JSON field '${r}' must be a ${s}.`;break}if(i!==void 0&&a!==i.value){t=`Expected '${r}' field to equal '${i.value}'`;break}}if(t)throw new M(k.INVALID_ARGUMENT,t);return!0}/**
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
 */const Fu=-62135596800,Uu=1e6;class ge{static now(){return ge.fromMillis(Date.now())}static fromDate(e){return ge.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor((e-1e3*t)*Uu);return new ge(t,r)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new M(k.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new M(k.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<Fu)throw new M(k.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new M(k.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/Uu}_compareTo(e){return this.seconds===e.seconds?Q(this.nanoseconds,e.nanoseconds):Q(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:ge._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(Ls(e,ge._jsonSchema))return new ge(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-Fu;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}ge._jsonSchemaVersion="firestore/timestamp/1.0",ge._jsonSchema={type:Ce("string",ge._jsonSchemaVersion),seconds:Ce("number"),nanoseconds:Ce("number")};/**
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
 */class G{static fromTimestamp(e){return new G(e)}static min(){return new G(new ge(0,0))}static max(){return new G(new ge(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
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
 */const Is=-1;function hy(n,e){const t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,s=G.fromTimestamp(r===1e9?new ge(t+1,0):new ge(t,r));return new yn(s,$.empty(),e)}function dy(n){return new yn(n.readTime,n.key,Is)}class yn{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new yn(G.min(),$.empty(),Is)}static max(){return new yn(G.max(),$.empty(),Is)}}function fy(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=$.comparator(n.documentKey,e.documentKey),t!==0?t:Q(n.largestBatchId,e.largestBatchId))}/**
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
 */const py="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class my{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
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
 */async function Ur(n){if(n.code!==k.FAILED_PRECONDITION||n.message!==py)throw n;L("LocalStore","Unexpectedly lost primary lease")}/**
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
 */class C{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&q(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new C((r,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(r,s)},this.catchCallback=i=>{this.wrapFailure(t,i).next(r,s)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof C?t:C.resolve(t)}catch(t){return C.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):C.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):C.reject(t)}static resolve(e){return new C((t,r)=>{t(e)})}static reject(e){return new C((t,r)=>{r(e)})}static waitFor(e){return new C((t,r)=>{let s=0,i=0,a=!1;e.forEach(c=>{++s,c.next(()=>{++i,a&&i===s&&t()},u=>r(u))}),a=!0,i===s&&t()})}static or(e){let t=C.resolve(!1);for(const r of e)t=t.next(s=>s?C.resolve(s):r());return t}static forEach(e,t){const r=[];return e.forEach((s,i)=>{r.push(t.call(this,s,i))}),this.waitFor(r)}static mapArray(e,t){return new C((r,s)=>{const i=e.length,a=new Array(i);let c=0;for(let u=0;u<i;u++){const h=u;t(e[h]).next(f=>{a[h]=f,++c,c===i&&r(a)},f=>s(f))}})}static doWhile(e,t){return new C((r,s)=>{const i=()=>{e()===!0?t().next(()=>{i()},s):r()};i()})}}function gy(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function $r(n){return n.name==="IndexedDbTransactionError"}/**
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
 */class uo{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this._e(r),this.ae=r=>t.writeSequenceNumber(r))}_e(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ae&&this.ae(e),e}}uo.ue=-1;/**
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
 */const bc=-1;function ho(n){return n==null}function ji(n){return n===0&&1/n==-1/0}function _y(n){return typeof n=="number"&&Number.isInteger(n)&&!ji(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
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
 */const qd="";function yy(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=$u(e)),e=vy(n.get(t),e);return $u(e)}function vy(n,e){let t=e;const r=n.length;for(let s=0;s<r;s++){const i=n.charAt(s);switch(i){case"\0":t+="";break;case qd:t+="";break;default:t+=i}}return t}function $u(n){return n+qd+""}/**
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
 */function Bu(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function An(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function zd(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
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
 */class Ie{constructor(e,t){this.comparator=e,this.root=t||Me.EMPTY}insert(e,t){return new Ie(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,Me.BLACK,null,null))}remove(e){return new Ie(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Me.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(e,r.key);if(s===0)return t+r.left.size;s<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,r)=>(e(t,r),!1))}toString(){const e=[];return this.inorderTraversal((t,r)=>(e.push(`${t}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new mi(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new mi(this.root,e,this.comparator,!1)}getReverseIterator(){return new mi(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new mi(this.root,e,this.comparator,!0)}}class mi{constructor(e,t,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?r(e.key,t):1,t&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class Me{constructor(e,t,r,s,i){this.key=e,this.value=t,this.color=r??Me.RED,this.left=s??Me.EMPTY,this.right=i??Me.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,s,i){return new Me(e??this.key,t??this.value,r??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let s=this;const i=r(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,t,r),null):i===0?s.copy(null,t,null,null,null):s.copy(null,null,null,null,s.right.insert(e,t,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return Me.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,s=this;if(t(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),t(e,s.key)===0){if(s.right.isEmpty())return Me.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,Me.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,Me.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw q(43730,{key:this.key,value:this.value});if(this.right.isRed())throw q(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw q(27949);return e+(this.isRed()?0:1)}}Me.EMPTY=null,Me.RED=!0,Me.BLACK=!1;Me.EMPTY=new class{constructor(){this.size=0}get key(){throw q(57766)}get value(){throw q(16141)}get color(){throw q(16727)}get left(){throw q(29726)}get right(){throw q(36894)}copy(e,t,r,s,i){return this}insert(e,t,r){return new Me(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
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
 */class Ve{constructor(e){this.comparator=e,this.data=new Ie(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,r)=>(e(t),!1))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,e[1])>=0)return;t(s.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new ju(this.data.getIterator())}getIteratorFrom(e){return new ju(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(r=>{t=t.add(r)}),t}isEqual(e){if(!(e instanceof Ve)||this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new Ve(this.comparator);return t.data=e,t}}class ju{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
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
 */class ot{constructor(e){this.fields=e,e.sort(Le.comparator)}static empty(){return new ot([])}unionWith(e){let t=new Ve(Le.comparator);for(const r of this.fields)t=t.add(r);for(const r of e)t=t.add(r);return new ot(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return Rr(this.fields,e.fields,(t,r)=>t.isEqual(r))}}/**
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
 */class $e{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new Hd("Invalid base64 string: "+i):i}}(e);return new $e(t)}static fromUint8Array(e){const t=function(s){let i="";for(let a=0;a<s.length;++a)i+=String.fromCharCode(s[a]);return i}(e);return new $e(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const r=new Uint8Array(t.length);for(let s=0;s<t.length;s++)r[s]=t.charCodeAt(s);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return Q(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}$e.EMPTY_BYTE_STRING=new $e("");const Ey=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function vn(n){if(ie(!!n,39018),typeof n=="string"){let e=0;const t=Ey.exec(n);if(ie(!!t,46558,{timestamp:n}),t[1]){let s=t[1];s=(s+"000000000").substr(0,9),e=Number(s)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:Re(n.seconds),nanos:Re(n.nanos)}}function Re(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function En(n){return typeof n=="string"?$e.fromBase64String(n):$e.fromUint8Array(n)}/**
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
 */const Gd="server_timestamp",Wd="__type__",Kd="__previous_value__",Qd="__local_write_time__";function Ac(n){var e,t;return((t=(((e=n==null?void 0:n.mapValue)===null||e===void 0?void 0:e.fields)||{})[Wd])===null||t===void 0?void 0:t.stringValue)===Gd}function fo(n){const e=n.mapValue.fields[Kd];return Ac(e)?fo(e):e}function bs(n){const e=vn(n.mapValue.fields[Qd].timestampValue);return new ge(e.seconds,e.nanos)}/**
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
 */class wy{constructor(e,t,r,s,i,a,c,u,h,f){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=a,this.autoDetectLongPolling=c,this.longPollingOptions=u,this.useFetchStreams=h,this.isUsingEmulator=f}}const qi="(default)";class As{constructor(e,t){this.projectId=e,this.database=t||qi}static empty(){return new As("","")}get isDefaultDatabase(){return this.database===qi}isEqual(e){return e instanceof As&&e.projectId===this.projectId&&e.database===this.database}}/**
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
 */const Jd="__type__",Ty="__max__",gi={mapValue:{}},Xd="__vector__",zi="value";function wn(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?Ac(n)?4:by(n)?9007199254740991:Iy(n)?10:11:q(28295,{value:n})}function Ct(n,e){if(n===e)return!0;const t=wn(n);if(t!==wn(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return bs(n).isEqual(bs(e));case 3:return function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const a=vn(s.timestampValue),c=vn(i.timestampValue);return a.seconds===c.seconds&&a.nanos===c.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(s,i){return En(s.bytesValue).isEqual(En(i.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(s,i){return Re(s.geoPointValue.latitude)===Re(i.geoPointValue.latitude)&&Re(s.geoPointValue.longitude)===Re(i.geoPointValue.longitude)}(n,e);case 2:return function(s,i){if("integerValue"in s&&"integerValue"in i)return Re(s.integerValue)===Re(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const a=Re(s.doubleValue),c=Re(i.doubleValue);return a===c?ji(a)===ji(c):isNaN(a)&&isNaN(c)}return!1}(n,e);case 9:return Rr(n.arrayValue.values||[],e.arrayValue.values||[],Ct);case 10:case 11:return function(s,i){const a=s.mapValue.fields||{},c=i.mapValue.fields||{};if(Bu(a)!==Bu(c))return!1;for(const u in a)if(a.hasOwnProperty(u)&&(c[u]===void 0||!Ct(a[u],c[u])))return!1;return!0}(n,e);default:return q(52216,{left:n})}}function Ss(n,e){return(n.values||[]).find(t=>Ct(t,e))!==void 0}function kr(n,e){if(n===e)return 0;const t=wn(n),r=wn(e);if(t!==r)return Q(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return Q(n.booleanValue,e.booleanValue);case 2:return function(i,a){const c=Re(i.integerValue||i.doubleValue),u=Re(a.integerValue||a.doubleValue);return c<u?-1:c>u?1:c===u?0:isNaN(c)?isNaN(u)?0:-1:1}(n,e);case 3:return qu(n.timestampValue,e.timestampValue);case 4:return qu(bs(n),bs(e));case 5:return Fa(n.stringValue,e.stringValue);case 6:return function(i,a){const c=En(i),u=En(a);return c.compareTo(u)}(n.bytesValue,e.bytesValue);case 7:return function(i,a){const c=i.split("/"),u=a.split("/");for(let h=0;h<c.length&&h<u.length;h++){const f=Q(c[h],u[h]);if(f!==0)return f}return Q(c.length,u.length)}(n.referenceValue,e.referenceValue);case 8:return function(i,a){const c=Q(Re(i.latitude),Re(a.latitude));return c!==0?c:Q(Re(i.longitude),Re(a.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return zu(n.arrayValue,e.arrayValue);case 10:return function(i,a){var c,u,h,f;const m=i.fields||{},g=a.fields||{},S=(c=m[zi])===null||c===void 0?void 0:c.arrayValue,P=(u=g[zi])===null||u===void 0?void 0:u.arrayValue,x=Q(((h=S==null?void 0:S.values)===null||h===void 0?void 0:h.length)||0,((f=P==null?void 0:P.values)===null||f===void 0?void 0:f.length)||0);return x!==0?x:zu(S,P)}(n.mapValue,e.mapValue);case 11:return function(i,a){if(i===gi.mapValue&&a===gi.mapValue)return 0;if(i===gi.mapValue)return 1;if(a===gi.mapValue)return-1;const c=i.fields||{},u=Object.keys(c),h=a.fields||{},f=Object.keys(h);u.sort(),f.sort();for(let m=0;m<u.length&&m<f.length;++m){const g=Fa(u[m],f[m]);if(g!==0)return g;const S=kr(c[u[m]],h[f[m]]);if(S!==0)return S}return Q(u.length,f.length)}(n.mapValue,e.mapValue);default:throw q(23264,{le:t})}}function qu(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return Q(n,e);const t=vn(n),r=vn(e),s=Q(t.seconds,r.seconds);return s!==0?s:Q(t.nanos,r.nanos)}function zu(n,e){const t=n.values||[],r=e.values||[];for(let s=0;s<t.length&&s<r.length;++s){const i=kr(t[s],r[s]);if(i)return i}return Q(t.length,r.length)}function Pr(n){return Ua(n)}function Ua(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(t){const r=vn(t);return`time(${r.seconds},${r.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(t){return En(t).toBase64()}(n.bytesValue):"referenceValue"in n?function(t){return $.fromName(t).toString()}(n.referenceValue):"geoPointValue"in n?function(t){return`geo(${t.latitude},${t.longitude})`}(n.geoPointValue):"arrayValue"in n?function(t){let r="[",s=!0;for(const i of t.values||[])s?s=!1:r+=",",r+=Ua(i);return r+"]"}(n.arrayValue):"mapValue"in n?function(t){const r=Object.keys(t.fields||{}).sort();let s="{",i=!0;for(const a of r)i?i=!1:s+=",",s+=`${a}:${Ua(t.fields[a])}`;return s+"}"}(n.mapValue):q(61005,{value:n})}function Ai(n){switch(wn(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=fo(n);return e?16+Ai(e):16;case 5:return 2*n.stringValue.length;case 6:return En(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return function(r){return(r.values||[]).reduce((s,i)=>s+Ai(i),0)}(n.arrayValue);case 10:case 11:return function(r){let s=0;return An(r.fields,(i,a)=>{s+=i.length+Ai(a)}),s}(n.mapValue);default:throw q(13486,{value:n})}}function Hu(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function $a(n){return!!n&&"integerValue"in n}function Sc(n){return!!n&&"arrayValue"in n}function Gu(n){return!!n&&"nullValue"in n}function Wu(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function Si(n){return!!n&&"mapValue"in n}function Iy(n){var e,t;return((t=(((e=n==null?void 0:n.mapValue)===null||e===void 0?void 0:e.fields)||{})[Jd])===null||t===void 0?void 0:t.stringValue)===Xd}function ps(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){const e={mapValue:{fields:{}}};return An(n.mapValue.fields,(t,r)=>e.mapValue.fields[t]=ps(r)),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=ps(n.arrayValue.values[t]);return e}return Object.assign({},n)}function by(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===Ty}/**
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
 */class rt{constructor(e){this.value=e}static empty(){return new rt({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!Si(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=ps(t)}setAll(e){let t=Le.emptyPath(),r={},s=[];e.forEach((a,c)=>{if(!t.isImmediateParentOf(c)){const u=this.getFieldsMap(t);this.applyChanges(u,r,s),r={},s=[],t=c.popLast()}a?r[c.lastSegment()]=ps(a):s.push(c.lastSegment())});const i=this.getFieldsMap(t);this.applyChanges(i,r,s)}delete(e){const t=this.field(e.popLast());Si(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return Ct(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let s=t.mapValue.fields[e.get(r)];Si(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=s),t=s}return t.mapValue.fields}applyChanges(e,t,r){An(t,(s,i)=>e[s]=i);for(const s of r)delete e[s]}clone(){return new rt(ps(this.value))}}function Yd(n){const e=[];return An(n.fields,(t,r)=>{const s=new Le([t]);if(Si(r)){const i=Yd(r.mapValue).fields;if(i.length===0)e.push(s);else for(const a of i)e.push(s.child(a))}else e.push(s)}),new ot(e)}/**
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
 */class Qe{constructor(e,t,r,s,i,a,c){this.key=e,this.documentType=t,this.version=r,this.readTime=s,this.createTime=i,this.data=a,this.documentState=c}static newInvalidDocument(e){return new Qe(e,0,G.min(),G.min(),G.min(),rt.empty(),0)}static newFoundDocument(e,t,r,s){return new Qe(e,1,t,G.min(),r,s,0)}static newNoDocument(e,t){return new Qe(e,2,t,G.min(),G.min(),rt.empty(),0)}static newUnknownDocument(e,t){return new Qe(e,3,t,G.min(),G.min(),rt.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(G.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=rt.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=rt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=G.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof Qe&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new Qe(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
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
 */class Hi{constructor(e,t){this.position=e,this.inclusive=t}}function Ku(n,e,t){let r=0;for(let s=0;s<n.position.length;s++){const i=e[s],a=n.position[s];if(i.field.isKeyField()?r=$.comparator($.fromName(a.referenceValue),t.key):r=kr(a,t.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function Qu(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!Ct(n.position[t],e.position[t]))return!1;return!0}/**
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
 */class Rs{constructor(e,t="asc"){this.field=e,this.dir=t}}function Ay(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
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
 */class Zd{}class Pe extends Zd{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new Ry(e,t,r):t==="array-contains"?new Cy(e,r):t==="in"?new Vy(e,r):t==="not-in"?new Ny(e,r):t==="array-contains-any"?new Dy(e,r):new Pe(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new ky(e,r):new Py(e,r)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(kr(t,this.value)):t!==null&&wn(this.value)===wn(t)&&this.matchesComparison(kr(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return q(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class yt extends Zd{constructor(e,t){super(),this.filters=e,this.op=t,this.he=null}static create(e,t){return new yt(e,t)}matches(e){return ef(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.he!==null||(this.he=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.he}getFilters(){return Object.assign([],this.filters)}}function ef(n){return n.op==="and"}function tf(n){return Sy(n)&&ef(n)}function Sy(n){for(const e of n.filters)if(e instanceof yt)return!1;return!0}function Ba(n){if(n instanceof Pe)return n.field.canonicalString()+n.op.toString()+Pr(n.value);if(tf(n))return n.filters.map(e=>Ba(e)).join(",");{const e=n.filters.map(t=>Ba(t)).join(",");return`${n.op}(${e})`}}function nf(n,e){return n instanceof Pe?function(r,s){return s instanceof Pe&&r.op===s.op&&r.field.isEqual(s.field)&&Ct(r.value,s.value)}(n,e):n instanceof yt?function(r,s){return s instanceof yt&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce((i,a,c)=>i&&nf(a,s.filters[c]),!0):!1}(n,e):void q(19439)}function rf(n){return n instanceof Pe?function(t){return`${t.field.canonicalString()} ${t.op} ${Pr(t.value)}`}(n):n instanceof yt?function(t){return t.op.toString()+" {"+t.getFilters().map(rf).join(" ,")+"}"}(n):"Filter"}class Ry extends Pe{constructor(e,t,r){super(e,t,r),this.key=$.fromName(r.referenceValue)}matches(e){const t=$.comparator(e.key,this.key);return this.matchesComparison(t)}}class ky extends Pe{constructor(e,t){super(e,"in",t),this.keys=sf("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class Py extends Pe{constructor(e,t){super(e,"not-in",t),this.keys=sf("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function sf(n,e){var t;return(((t=e.arrayValue)===null||t===void 0?void 0:t.values)||[]).map(r=>$.fromName(r.referenceValue))}class Cy extends Pe{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return Sc(t)&&Ss(t.arrayValue,this.value)}}class Vy extends Pe{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&Ss(this.value.arrayValue,t)}}class Ny extends Pe{constructor(e,t){super(e,"not-in",t)}matches(e){if(Ss(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!Ss(this.value.arrayValue,t)}}class Dy extends Pe{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!Sc(t)||!t.arrayValue.values)&&t.arrayValue.values.some(r=>Ss(this.value.arrayValue,r))}}/**
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
 */class xy{constructor(e,t=null,r=[],s=[],i=null,a=null,c=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=a,this.endAt=c,this.Pe=null}}function Ju(n,e=null,t=[],r=[],s=null,i=null,a=null){return new xy(n,e,t,r,s,i,a)}function Rc(n){const e=W(n);if(e.Pe===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(r=>Ba(r)).join(","),t+="|ob:",t+=e.orderBy.map(r=>function(i){return i.field.canonicalString()+i.dir}(r)).join(","),ho(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(r=>Pr(r)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(r=>Pr(r)).join(",")),e.Pe=t}return e.Pe}function kc(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!Ay(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!nf(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!Qu(n.startAt,e.startAt)&&Qu(n.endAt,e.endAt)}function ja(n){return $.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
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
 */class Br{constructor(e,t=null,r=[],s=[],i=null,a="F",c=null,u=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=a,this.startAt=c,this.endAt=u,this.Te=null,this.Ie=null,this.de=null,this.startAt,this.endAt}}function Oy(n,e,t,r,s,i,a,c){return new Br(n,e,t,r,s,i,a,c)}function po(n){return new Br(n)}function Xu(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function of(n){return n.collectionGroup!==null}function ms(n){const e=W(n);if(e.Te===null){e.Te=[];const t=new Set;for(const i of e.explicitOrderBy)e.Te.push(i),t.add(i.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(a){let c=new Ve(Le.comparator);return a.filters.forEach(u=>{u.getFlattenedFilters().forEach(h=>{h.isInequality()&&(c=c.add(h.field))})}),c})(e).forEach(i=>{t.has(i.canonicalString())||i.isKeyField()||e.Te.push(new Rs(i,r))}),t.has(Le.keyField().canonicalString())||e.Te.push(new Rs(Le.keyField(),r))}return e.Te}function bt(n){const e=W(n);return e.Ie||(e.Ie=My(e,ms(n))),e.Ie}function My(n,e){if(n.limitType==="F")return Ju(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(s=>{const i=s.dir==="desc"?"asc":"desc";return new Rs(s.field,i)});const t=n.endAt?new Hi(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new Hi(n.startAt.position,n.startAt.inclusive):null;return Ju(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function qa(n,e){const t=n.filters.concat([e]);return new Br(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function za(n,e,t){return new Br(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function mo(n,e){return kc(bt(n),bt(e))&&n.limitType===e.limitType}function af(n){return`${Rc(bt(n))}|lt:${n.limitType}`}function hr(n){return`Query(target=${function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map(s=>rf(s)).join(", ")}]`),ho(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map(s=>function(a){return`${a.field.canonicalString()} (${a.dir})`}(s)).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map(s=>Pr(s)).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map(s=>Pr(s)).join(",")),`Target(${r})`}(bt(n))}; limitType=${n.limitType})`}function go(n,e){return e.isFoundDocument()&&function(r,s){const i=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(i):$.isDocumentKey(r.path)?r.path.isEqual(i):r.path.isImmediateParentOf(i)}(n,e)&&function(r,s){for(const i of ms(r))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0}(n,e)&&function(r,s){for(const i of r.filters)if(!i.matches(s))return!1;return!0}(n,e)&&function(r,s){return!(r.startAt&&!function(a,c,u){const h=Ku(a,c,u);return a.inclusive?h<=0:h<0}(r.startAt,ms(r),s)||r.endAt&&!function(a,c,u){const h=Ku(a,c,u);return a.inclusive?h>=0:h>0}(r.endAt,ms(r),s))}(n,e)}function Ly(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function cf(n){return(e,t)=>{let r=!1;for(const s of ms(n)){const i=Fy(s,e,t);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function Fy(n,e,t){const r=n.field.isKeyField()?$.comparator(e.key,t.key):function(i,a,c){const u=a.data.field(i),h=c.data.field(i);return u!==null&&h!==null?kr(u,h):q(42886)}(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return q(19790,{direction:n.dir})}}/**
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
 */class Yn{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(const[s,i]of r)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,t){const r=this.mapKeyFn(e),s=this.inner[r];if(s===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,t]);s.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return r.length===1?delete this.inner[t]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(e){An(this.inner,(t,r)=>{for(const[s,i]of r)e(s,i)})}isEmpty(){return zd(this.inner)}size(){return this.innerSize}}/**
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
 */const Uy=new Ie($.comparator);function zt(){return Uy}const lf=new Ie($.comparator);function ls(...n){let e=lf;for(const t of n)e=e.insert(t.key,t);return e}function uf(n){let e=lf;return n.forEach((t,r)=>e=e.insert(t,r.overlayedDocument)),e}function Un(){return gs()}function hf(){return gs()}function gs(){return new Yn(n=>n.toString(),(n,e)=>n.isEqual(e))}const $y=new Ie($.comparator),By=new Ve($.comparator);function Z(...n){let e=By;for(const t of n)e=e.add(t);return e}const jy=new Ve(Q);function qy(){return jy}/**
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
 */function Pc(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:ji(e)?"-0":e}}function df(n){return{integerValue:""+n}}function zy(n,e){return _y(e)?df(e):Pc(n,e)}/**
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
 */class _o{constructor(){this._=void 0}}function Hy(n,e,t){return n instanceof ks?function(s,i){const a={fields:{[Wd]:{stringValue:Gd},[Qd]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&Ac(i)&&(i=fo(i)),i&&(a.fields[Kd]=i),{mapValue:a}}(t,e):n instanceof Ps?pf(n,e):n instanceof Cs?mf(n,e):function(s,i){const a=ff(s,i),c=Yu(a)+Yu(s.Ee);return $a(a)&&$a(s.Ee)?df(c):Pc(s.serializer,c)}(n,e)}function Gy(n,e,t){return n instanceof Ps?pf(n,e):n instanceof Cs?mf(n,e):t}function ff(n,e){return n instanceof Gi?function(r){return $a(r)||function(i){return!!i&&"doubleValue"in i}(r)}(e)?e:{integerValue:0}:null}class ks extends _o{}class Ps extends _o{constructor(e){super(),this.elements=e}}function pf(n,e){const t=gf(e);for(const r of n.elements)t.some(s=>Ct(s,r))||t.push(r);return{arrayValue:{values:t}}}class Cs extends _o{constructor(e){super(),this.elements=e}}function mf(n,e){let t=gf(e);for(const r of n.elements)t=t.filter(s=>!Ct(s,r));return{arrayValue:{values:t}}}class Gi extends _o{constructor(e,t){super(),this.serializer=e,this.Ee=t}}function Yu(n){return Re(n.integerValue||n.doubleValue)}function gf(n){return Sc(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
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
 */class Wy{constructor(e,t){this.field=e,this.transform=t}}function Ky(n,e){return n.field.isEqual(e.field)&&function(r,s){return r instanceof Ps&&s instanceof Ps||r instanceof Cs&&s instanceof Cs?Rr(r.elements,s.elements,Ct):r instanceof Gi&&s instanceof Gi?Ct(r.Ee,s.Ee):r instanceof ks&&s instanceof ks}(n.transform,e.transform)}class Qy{constructor(e,t){this.version=e,this.transformResults=t}}class gt{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new gt}static exists(e){return new gt(void 0,e)}static updateTime(e){return new gt(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Ri(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class yo{}function _f(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new vf(n.key,gt.none()):new Fs(n.key,n.data,gt.none());{const t=n.data,r=rt.empty();let s=new Ve(Le.comparator);for(let i of e.fields)if(!s.has(i)){let a=t.field(i);a===null&&i.length>1&&(i=i.popLast(),a=t.field(i)),a===null?r.delete(i):r.set(i,a),s=s.add(i)}return new Sn(n.key,r,new ot(s.toArray()),gt.none())}}function Jy(n,e,t){n instanceof Fs?function(s,i,a){const c=s.value.clone(),u=eh(s.fieldTransforms,i,a.transformResults);c.setAll(u),i.convertToFoundDocument(a.version,c).setHasCommittedMutations()}(n,e,t):n instanceof Sn?function(s,i,a){if(!Ri(s.precondition,i))return void i.convertToUnknownDocument(a.version);const c=eh(s.fieldTransforms,i,a.transformResults),u=i.data;u.setAll(yf(s)),u.setAll(c),i.convertToFoundDocument(a.version,u).setHasCommittedMutations()}(n,e,t):function(s,i,a){i.convertToNoDocument(a.version).setHasCommittedMutations()}(0,e,t)}function _s(n,e,t,r){return n instanceof Fs?function(i,a,c,u){if(!Ri(i.precondition,a))return c;const h=i.value.clone(),f=th(i.fieldTransforms,u,a);return h.setAll(f),a.convertToFoundDocument(a.version,h).setHasLocalMutations(),null}(n,e,t,r):n instanceof Sn?function(i,a,c,u){if(!Ri(i.precondition,a))return c;const h=th(i.fieldTransforms,u,a),f=a.data;return f.setAll(yf(i)),f.setAll(h),a.convertToFoundDocument(a.version,f).setHasLocalMutations(),c===null?null:c.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map(m=>m.field))}(n,e,t,r):function(i,a,c){return Ri(i.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):c}(n,e,t)}function Xy(n,e){let t=null;for(const r of n.fieldTransforms){const s=e.data.field(r.field),i=ff(r.transform,s||null);i!=null&&(t===null&&(t=rt.empty()),t.set(r.field,i))}return t||null}function Zu(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&Rr(r,s,(i,a)=>Ky(i,a))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class Fs extends yo{constructor(e,t,r,s=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class Sn extends yo{constructor(e,t,r,s,i=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function yf(n){const e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){const r=n.data.field(t);e.set(t,r)}}),e}function eh(n,e,t){const r=new Map;ie(n.length===t.length,32656,{Ae:t.length,Re:n.length});for(let s=0;s<t.length;s++){const i=n[s],a=i.transform,c=e.data.field(i.field);r.set(i.field,Gy(a,c,t[s]))}return r}function th(n,e,t){const r=new Map;for(const s of n){const i=s.transform,a=t.data.field(s.field);r.set(s.field,Hy(i,a,e))}return r}class vf extends yo{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class Yy extends yo{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
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
 */class Zy{constructor(e,t,r,s){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&Jy(i,e,r[s])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=_s(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=_s(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=hf();return this.mutations.forEach(s=>{const i=e.get(s.key),a=i.overlayedDocument;let c=this.applyToLocalView(a,i.mutatedFields);c=t.has(s.key)?null:c;const u=_f(a,c);u!==null&&r.set(s.key,u),a.isValidDocument()||a.convertToNoDocument(G.min())}),r}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),Z())}isEqual(e){return this.batchId===e.batchId&&Rr(this.mutations,e.mutations,(t,r)=>Zu(t,r))&&Rr(this.baseMutations,e.baseMutations,(t,r)=>Zu(t,r))}}class Cc{constructor(e,t,r,s){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=s}static from(e,t,r){ie(e.mutations.length===r.length,58842,{Ve:e.mutations.length,me:r.length});let s=function(){return $y}();const i=e.mutations;for(let a=0;a<i.length;a++)s=s.insert(i[a].key,r[a].version);return new Cc(e,t,r,s)}}/**
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
 */class ev{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
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
 */class tv{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
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
 */var ke,te;function nv(n){switch(n){case k.OK:return q(64938);case k.CANCELLED:case k.UNKNOWN:case k.DEADLINE_EXCEEDED:case k.RESOURCE_EXHAUSTED:case k.INTERNAL:case k.UNAVAILABLE:case k.UNAUTHENTICATED:return!1;case k.INVALID_ARGUMENT:case k.NOT_FOUND:case k.ALREADY_EXISTS:case k.PERMISSION_DENIED:case k.FAILED_PRECONDITION:case k.ABORTED:case k.OUT_OF_RANGE:case k.UNIMPLEMENTED:case k.DATA_LOSS:return!0;default:return q(15467,{code:n})}}function Ef(n){if(n===void 0)return qt("GRPC error has no .code"),k.UNKNOWN;switch(n){case ke.OK:return k.OK;case ke.CANCELLED:return k.CANCELLED;case ke.UNKNOWN:return k.UNKNOWN;case ke.DEADLINE_EXCEEDED:return k.DEADLINE_EXCEEDED;case ke.RESOURCE_EXHAUSTED:return k.RESOURCE_EXHAUSTED;case ke.INTERNAL:return k.INTERNAL;case ke.UNAVAILABLE:return k.UNAVAILABLE;case ke.UNAUTHENTICATED:return k.UNAUTHENTICATED;case ke.INVALID_ARGUMENT:return k.INVALID_ARGUMENT;case ke.NOT_FOUND:return k.NOT_FOUND;case ke.ALREADY_EXISTS:return k.ALREADY_EXISTS;case ke.PERMISSION_DENIED:return k.PERMISSION_DENIED;case ke.FAILED_PRECONDITION:return k.FAILED_PRECONDITION;case ke.ABORTED:return k.ABORTED;case ke.OUT_OF_RANGE:return k.OUT_OF_RANGE;case ke.UNIMPLEMENTED:return k.UNIMPLEMENTED;case ke.DATA_LOSS:return k.DATA_LOSS;default:return q(39323,{code:n})}}(te=ke||(ke={}))[te.OK=0]="OK",te[te.CANCELLED=1]="CANCELLED",te[te.UNKNOWN=2]="UNKNOWN",te[te.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",te[te.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",te[te.NOT_FOUND=5]="NOT_FOUND",te[te.ALREADY_EXISTS=6]="ALREADY_EXISTS",te[te.PERMISSION_DENIED=7]="PERMISSION_DENIED",te[te.UNAUTHENTICATED=16]="UNAUTHENTICATED",te[te.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",te[te.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",te[te.ABORTED=10]="ABORTED",te[te.OUT_OF_RANGE=11]="OUT_OF_RANGE",te[te.UNIMPLEMENTED=12]="UNIMPLEMENTED",te[te.INTERNAL=13]="INTERNAL",te[te.UNAVAILABLE=14]="UNAVAILABLE",te[te.DATA_LOSS=15]="DATA_LOSS";/**
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
 */const rv=new ln([4294967295,4294967295],0);function nh(n){const e=$d().encode(n),t=new Nd;return t.update(e),new Uint8Array(t.digest())}function rh(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new ln([t,r],0),new ln([s,i],0)]}class Vc{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new us(`Invalid padding: ${t}`);if(r<0)throw new us(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new us(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new us(`Invalid padding when bitmap length is 0: ${t}`);this.fe=8*e.length-t,this.ge=ln.fromNumber(this.fe)}pe(e,t,r){let s=e.add(t.multiply(ln.fromNumber(r)));return s.compare(rv)===1&&(s=new ln([s.getBits(0),s.getBits(1)],0)),s.modulo(this.ge).toNumber()}ye(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.fe===0)return!1;const t=nh(e),[r,s]=rh(t);for(let i=0;i<this.hashCount;i++){const a=this.pe(r,s,i);if(!this.ye(a))return!1}return!0}static create(e,t,r){const s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),a=new Vc(i,s,t);return r.forEach(c=>a.insert(c)),a}insert(e){if(this.fe===0)return;const t=nh(e),[r,s]=rh(t);for(let i=0;i<this.hashCount;i++){const a=this.pe(r,s,i);this.we(a)}}we(e){const t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}}class us extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
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
 */class vo{constructor(e,t,r,s,i){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,t,r){const s=new Map;return s.set(e,Us.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new vo(G.min(),s,new Ie(Q),zt(),Z())}}class Us{constructor(e,t,r,s,i){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new Us(r,t,Z(),Z(),Z())}}/**
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
 */class ki{constructor(e,t,r,s){this.Se=e,this.removedTargetIds=t,this.key=r,this.be=s}}class wf{constructor(e,t){this.targetId=e,this.De=t}}class Tf{constructor(e,t,r=$e.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=s}}class sh{constructor(){this.ve=0,this.Ce=ih(),this.Fe=$e.EMPTY_BYTE_STRING,this.Me=!1,this.xe=!0}get current(){return this.Me}get resumeToken(){return this.Fe}get Oe(){return this.ve!==0}get Ne(){return this.xe}Be(e){e.approximateByteSize()>0&&(this.xe=!0,this.Fe=e)}Le(){let e=Z(),t=Z(),r=Z();return this.Ce.forEach((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:t=t.add(s);break;case 1:r=r.add(s);break;default:q(38017,{changeType:i})}}),new Us(this.Fe,this.Me,e,t,r)}ke(){this.xe=!1,this.Ce=ih()}qe(e,t){this.xe=!0,this.Ce=this.Ce.insert(e,t)}Qe(e){this.xe=!0,this.Ce=this.Ce.remove(e)}$e(){this.ve+=1}Ue(){this.ve-=1,ie(this.ve>=0,3241,{ve:this.ve})}Ke(){this.xe=!0,this.Me=!0}}class sv{constructor(e){this.We=e,this.Ge=new Map,this.ze=zt(),this.je=_i(),this.Je=_i(),this.He=new Ie(Q)}Ye(e){for(const t of e.Se)e.be&&e.be.isFoundDocument()?this.Ze(t,e.be):this.Xe(t,e.key,e.be);for(const t of e.removedTargetIds)this.Xe(t,e.key,e.be)}et(e){this.forEachTarget(e,t=>{const r=this.tt(t);switch(e.state){case 0:this.nt(t)&&r.Be(e.resumeToken);break;case 1:r.Ue(),r.Oe||r.ke(),r.Be(e.resumeToken);break;case 2:r.Ue(),r.Oe||this.removeTarget(t);break;case 3:this.nt(t)&&(r.Ke(),r.Be(e.resumeToken));break;case 4:this.nt(t)&&(this.rt(t),r.Be(e.resumeToken));break;default:q(56790,{state:e.state})}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.Ge.forEach((r,s)=>{this.nt(s)&&t(s)})}it(e){const t=e.targetId,r=e.De.count,s=this.st(t);if(s){const i=s.target;if(ja(i))if(r===0){const a=new $(i.path);this.Xe(t,a,Qe.newNoDocument(a,G.min()))}else ie(r===1,20013,{expectedCount:r});else{const a=this.ot(t);if(a!==r){const c=this._t(e),u=c?this.ut(c,e,a):1;if(u!==0){this.rt(t);const h=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.He=this.He.insert(t,h)}}}}}_t(e){const t=e.De.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:i=0}=t;let a,c;try{a=En(r).toUint8Array()}catch(u){if(u instanceof Hd)return _n("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw u}try{c=new Vc(a,s,i)}catch(u){return _n(u instanceof us?"BloomFilter error: ":"Applying bloom filter failed: ",u),null}return c.fe===0?null:c}ut(e,t,r){return t.De.count===r-this.ht(e,t.targetId)?0:2}ht(e,t){const r=this.We.getRemoteKeysForTarget(t);let s=0;return r.forEach(i=>{const a=this.We.lt(),c=`projects/${a.projectId}/databases/${a.database}/documents/${i.path.canonicalString()}`;e.mightContain(c)||(this.Xe(t,i,null),s++)}),s}Pt(e){const t=new Map;this.Ge.forEach((i,a)=>{const c=this.st(a);if(c){if(i.current&&ja(c.target)){const u=new $(c.target.path);this.Tt(u).has(a)||this.It(a,u)||this.Xe(a,u,Qe.newNoDocument(u,e))}i.Ne&&(t.set(a,i.Le()),i.ke())}});let r=Z();this.Je.forEach((i,a)=>{let c=!0;a.forEachWhile(u=>{const h=this.st(u);return!h||h.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)}),c&&(r=r.add(i))}),this.ze.forEach((i,a)=>a.setReadTime(e));const s=new vo(e,t,this.He,this.ze,r);return this.ze=zt(),this.je=_i(),this.Je=_i(),this.He=new Ie(Q),s}Ze(e,t){if(!this.nt(e))return;const r=this.It(e,t.key)?2:0;this.tt(e).qe(t.key,r),this.ze=this.ze.insert(t.key,t),this.je=this.je.insert(t.key,this.Tt(t.key).add(e)),this.Je=this.Je.insert(t.key,this.dt(t.key).add(e))}Xe(e,t,r){if(!this.nt(e))return;const s=this.tt(e);this.It(e,t)?s.qe(t,1):s.Qe(t),this.Je=this.Je.insert(t,this.dt(t).delete(e)),this.Je=this.Je.insert(t,this.dt(t).add(e)),r&&(this.ze=this.ze.insert(t,r))}removeTarget(e){this.Ge.delete(e)}ot(e){const t=this.tt(e).Le();return this.We.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}$e(e){this.tt(e).$e()}tt(e){let t=this.Ge.get(e);return t||(t=new sh,this.Ge.set(e,t)),t}dt(e){let t=this.Je.get(e);return t||(t=new Ve(Q),this.Je=this.Je.insert(e,t)),t}Tt(e){let t=this.je.get(e);return t||(t=new Ve(Q),this.je=this.je.insert(e,t)),t}nt(e){const t=this.st(e)!==null;return t||L("WatchChangeAggregator","Detected inactive target",e),t}st(e){const t=this.Ge.get(e);return t&&t.Oe?null:this.We.Et(e)}rt(e){this.Ge.set(e,new sh),this.We.getRemoteKeysForTarget(e).forEach(t=>{this.Xe(e,t,null)})}It(e,t){return this.We.getRemoteKeysForTarget(e).has(t)}}function _i(){return new Ie($.comparator)}function ih(){return new Ie($.comparator)}const iv={asc:"ASCENDING",desc:"DESCENDING"},ov={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},av={and:"AND",or:"OR"};class cv{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function Ha(n,e){return n.useProto3Json||ho(e)?e:{value:e}}function Wi(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function If(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function lv(n,e){return Wi(n,e.toTimestamp())}function At(n){return ie(!!n,49232),G.fromTimestamp(function(t){const r=vn(t);return new ge(r.seconds,r.nanos)}(n))}function Nc(n,e){return Ga(n,e).canonicalString()}function Ga(n,e){const t=function(s){return new de(["projects",s.projectId,"databases",s.database])}(n).child("documents");return e===void 0?t:t.child(e)}function bf(n){const e=de.fromString(n);return ie(Pf(e),10190,{key:e.toString()}),e}function Wa(n,e){return Nc(n.databaseId,e.path)}function pa(n,e){const t=bf(e);if(t.get(1)!==n.databaseId.projectId)throw new M(k.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new M(k.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new $(Sf(t))}function Af(n,e){return Nc(n.databaseId,e)}function uv(n){const e=bf(n);return e.length===4?de.emptyPath():Sf(e)}function Ka(n){return new de(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function Sf(n){return ie(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function oh(n,e,t){return{name:Wa(n,e),fields:t.value.mapValue.fields}}function hv(n,e){let t;if("targetChange"in e){e.targetChange;const r=function(h){return h==="NO_CHANGE"?0:h==="ADD"?1:h==="REMOVE"?2:h==="CURRENT"?3:h==="RESET"?4:q(39313,{state:h})}(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=function(h,f){return h.useProto3Json?(ie(f===void 0||typeof f=="string",58123),$e.fromBase64String(f||"")):(ie(f===void 0||f instanceof Buffer||f instanceof Uint8Array,16193),$e.fromUint8Array(f||new Uint8Array))}(n,e.targetChange.resumeToken),a=e.targetChange.cause,c=a&&function(h){const f=h.code===void 0?k.UNKNOWN:Ef(h.code);return new M(f,h.message||"")}(a);t=new Tf(r,s,i,c||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const s=pa(n,r.document.name),i=At(r.document.updateTime),a=r.document.createTime?At(r.document.createTime):G.min(),c=new rt({mapValue:{fields:r.document.fields}}),u=Qe.newFoundDocument(s,i,a,c),h=r.targetIds||[],f=r.removedTargetIds||[];t=new ki(h,f,u.key,u)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const s=pa(n,r.document),i=r.readTime?At(r.readTime):G.min(),a=Qe.newNoDocument(s,i),c=r.removedTargetIds||[];t=new ki([],c,a.key,a)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const s=pa(n,r.document),i=r.removedTargetIds||[];t=new ki([],i,s,null)}else{if(!("filter"in e))return q(11601,{At:e});{e.filter;const r=e.filter;r.targetId;const{count:s=0,unchangedNames:i}=r,a=new tv(s,i),c=r.targetId;t=new wf(c,a)}}return t}function dv(n,e){let t;if(e instanceof Fs)t={update:oh(n,e.key,e.value)};else if(e instanceof vf)t={delete:Wa(n,e.key)};else if(e instanceof Sn)t={update:oh(n,e.key,e.data),updateMask:wv(e.fieldMask)};else{if(!(e instanceof Yy))return q(16599,{Rt:e.type});t={verify:Wa(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(r=>function(i,a){const c=a.transform;if(c instanceof ks)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof Ps)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof Cs)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof Gi)return{fieldPath:a.field.canonicalString(),increment:c.Ee};throw q(20930,{transform:a.transform})}(0,r))),e.precondition.isNone||(t.currentDocument=function(s,i){return i.updateTime!==void 0?{updateTime:lv(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:q(27497)}(n,e.precondition)),t}function fv(n,e){return n&&n.length>0?(ie(e!==void 0,14353),n.map(t=>function(s,i){let a=s.updateTime?At(s.updateTime):At(i);return a.isEqual(G.min())&&(a=At(i)),new Qy(a,s.transformResults||[])}(t,e))):[]}function pv(n,e){return{documents:[Af(n,e.path)]}}function mv(n,e){const t={structuredQuery:{}},r=e.path;let s;e.collectionGroup!==null?(s=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=Af(n,s);const i=function(h){if(h.length!==0)return kf(yt.create(h,"and"))}(e.filters);i&&(t.structuredQuery.where=i);const a=function(h){if(h.length!==0)return h.map(f=>function(g){return{field:dr(g.field),direction:yv(g.dir)}}(f))}(e.orderBy);a&&(t.structuredQuery.orderBy=a);const c=Ha(n,e.limit);return c!==null&&(t.structuredQuery.limit=c),e.startAt&&(t.structuredQuery.startAt=function(h){return{before:h.inclusive,values:h.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(h){return{before:!h.inclusive,values:h.position}}(e.endAt)),{Vt:t,parent:s}}function gv(n){let e=uv(n.parent);const t=n.structuredQuery,r=t.from?t.from.length:0;let s=null;if(r>0){ie(r===1,65062);const f=t.from[0];f.allDescendants?s=f.collectionId:e=e.child(f.collectionId)}let i=[];t.where&&(i=function(m){const g=Rf(m);return g instanceof yt&&tf(g)?g.getFilters():[g]}(t.where));let a=[];t.orderBy&&(a=function(m){return m.map(g=>function(P){return new Rs(fr(P.field),function(N){switch(N){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(P.direction))}(g))}(t.orderBy));let c=null;t.limit&&(c=function(m){let g;return g=typeof m=="object"?m.value:m,ho(g)?null:g}(t.limit));let u=null;t.startAt&&(u=function(m){const g=!!m.before,S=m.values||[];return new Hi(S,g)}(t.startAt));let h=null;return t.endAt&&(h=function(m){const g=!m.before,S=m.values||[];return new Hi(S,g)}(t.endAt)),Oy(e,s,a,i,c,"F",u,h)}function _v(n,e){const t=function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return q(28987,{purpose:s})}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function Rf(n){return n.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":const r=fr(t.unaryFilter.field);return Pe.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=fr(t.unaryFilter.field);return Pe.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=fr(t.unaryFilter.field);return Pe.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=fr(t.unaryFilter.field);return Pe.create(a,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return q(61313);default:return q(60726)}}(n):n.fieldFilter!==void 0?function(t){return Pe.create(fr(t.fieldFilter.field),function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return q(58110);default:return q(50506)}}(t.fieldFilter.op),t.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(t){return yt.create(t.compositeFilter.filters.map(r=>Rf(r)),function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return q(1026)}}(t.compositeFilter.op))}(n):q(30097,{filter:n})}function yv(n){return iv[n]}function vv(n){return ov[n]}function Ev(n){return av[n]}function dr(n){return{fieldPath:n.canonicalString()}}function fr(n){return Le.fromServerFormat(n.fieldPath)}function kf(n){return n instanceof Pe?function(t){if(t.op==="=="){if(Wu(t.value))return{unaryFilter:{field:dr(t.field),op:"IS_NAN"}};if(Gu(t.value))return{unaryFilter:{field:dr(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(Wu(t.value))return{unaryFilter:{field:dr(t.field),op:"IS_NOT_NAN"}};if(Gu(t.value))return{unaryFilter:{field:dr(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:dr(t.field),op:vv(t.op),value:t.value}}}(n):n instanceof yt?function(t){const r=t.getFilters().map(s=>kf(s));return r.length===1?r[0]:{compositeFilter:{op:Ev(t.op),filters:r}}}(n):q(54877,{filter:n})}function wv(n){const e=[];return n.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function Pf(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
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
 */class rn{constructor(e,t,r,s,i=G.min(),a=G.min(),c=$e.EMPTY_BYTE_STRING,u=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=c,this.expectedCount=u}withSequenceNumber(e){return new rn(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new rn(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new rn(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new rn(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
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
 */class Tv{constructor(e){this.gt=e}}function Iv(n){const e=gv({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?za(e,e.limit,"L"):e}/**
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
 */class bv{constructor(){this.Dn=new Av}addToCollectionParentIndex(e,t){return this.Dn.add(t),C.resolve()}getCollectionParents(e,t){return C.resolve(this.Dn.getEntries(t))}addFieldIndex(e,t){return C.resolve()}deleteFieldIndex(e,t){return C.resolve()}deleteAllFieldIndexes(e){return C.resolve()}createTargetIndexes(e,t){return C.resolve()}getDocumentsMatchingTarget(e,t){return C.resolve(null)}getIndexType(e,t){return C.resolve(0)}getFieldIndexes(e,t){return C.resolve([])}getNextCollectionGroupToUpdate(e){return C.resolve(null)}getMinOffset(e,t){return C.resolve(yn.min())}getMinOffsetFromCollectionGroup(e,t){return C.resolve(yn.min())}updateCollectionGroup(e,t,r){return C.resolve()}updateIndexEntries(e,t){return C.resolve()}}class Av{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t]||new Ve(de.comparator),i=!s.has(r);return this.index[t]=s.add(r),i}has(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t];return s&&s.has(r)}getEntries(e){return(this.index[e]||new Ve(de.comparator)).toArray()}}/**
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
 */const ah={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},Cf=41943040;class nt{static withCacheSize(e){return new nt(e,nt.DEFAULT_COLLECTION_PERCENTILE,nt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}}/**
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
 */class Cr{constructor(e){this._r=e}next(){return this._r+=2,this._r}static ar(){return new Cr(0)}static ur(){return new Cr(-1)}}/**
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
 */const ch="LruGarbageCollector",Sv=1048576;function lh([n,e],[t,r]){const s=Q(n,t);return s===0?Q(e,r):s}class Rv{constructor(e){this.Tr=e,this.buffer=new Ve(lh),this.Ir=0}dr(){return++this.Ir}Er(e){const t=[e,this.dr()];if(this.buffer.size<this.Tr)this.buffer=this.buffer.add(t);else{const r=this.buffer.last();lh(t,r)<0&&(this.buffer=this.buffer.delete(r).add(t))}}get maxValue(){return this.buffer.last()[0]}}class kv{constructor(e,t,r){this.garbageCollector=e,this.asyncQueue=t,this.localStore=r,this.Ar=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Rr(6e4)}stop(){this.Ar&&(this.Ar.cancel(),this.Ar=null)}get started(){return this.Ar!==null}Rr(e){L(ch,`Garbage collection scheduled in ${e}ms`),this.Ar=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Ar=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){$r(t)?L(ch,"Ignoring IndexedDB error during garbage collection: ",t):await Ur(t)}await this.Rr(3e5)})}}class Pv{constructor(e,t){this.Vr=e,this.params=t}calculateTargetCount(e,t){return this.Vr.mr(e).next(r=>Math.floor(t/100*r))}nthSequenceNumber(e,t){if(t===0)return C.resolve(uo.ue);const r=new Rv(t);return this.Vr.forEachTarget(e,s=>r.Er(s.sequenceNumber)).next(()=>this.Vr.gr(e,s=>r.Er(s))).next(()=>r.maxValue)}removeTargets(e,t,r){return this.Vr.removeTargets(e,t,r)}removeOrphanedDocuments(e,t){return this.Vr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(L("LruGarbageCollector","Garbage collection skipped; disabled"),C.resolve(ah)):this.getCacheSize(e).next(r=>r<this.params.cacheSizeCollectionThreshold?(L("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),ah):this.pr(e,t))}getCacheSize(e){return this.Vr.getCacheSize(e)}pr(e,t){let r,s,i,a,c,u,h;const f=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(m=>(m>this.params.maximumSequenceNumbersToCollect?(L("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${m}`),s=this.params.maximumSequenceNumbersToCollect):s=m,a=Date.now(),this.nthSequenceNumber(e,s))).next(m=>(r=m,c=Date.now(),this.removeTargets(e,r,t))).next(m=>(i=m,u=Date.now(),this.removeOrphanedDocuments(e,r))).next(m=>(h=Date.now(),ur()<=Y.DEBUG&&L("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-f}ms
	Determined least recently used ${s} in `+(c-a)+`ms
	Removed ${i} targets in `+(u-c)+`ms
	Removed ${m} documents in `+(h-u)+`ms
Total Duration: ${h-f}ms`),C.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:m})))}}function Cv(n,e){return new Pv(n,e)}/**
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
 */class Vv{constructor(){this.changes=new Yn(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,Qe.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return r!==void 0?C.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
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
 */class Nv{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
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
 */class Dv{constructor(e,t,r,s){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=s}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next(s=>(r=s,this.remoteDocumentCache.getEntry(e,t))).next(s=>(r!==null&&_s(r.mutation,s,ot.empty(),ge.now()),s))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.getLocalViewOfDocuments(e,r,Z()).next(()=>r))}getLocalViewOfDocuments(e,t,r=Z()){const s=Un();return this.populateOverlays(e,s,t).next(()=>this.computeViews(e,t,s,r).next(i=>{let a=ls();return i.forEach((c,u)=>{a=a.insert(c,u.overlayedDocument)}),a}))}getOverlayedDocuments(e,t){const r=Un();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,Z()))}populateOverlays(e,t,r){const s=[];return r.forEach(i=>{t.has(i)||s.push(i)}),this.documentOverlayCache.getOverlays(e,s).next(i=>{i.forEach((a,c)=>{t.set(a,c)})})}computeViews(e,t,r,s){let i=zt();const a=gs(),c=function(){return gs()}();return t.forEach((u,h)=>{const f=r.get(h.key);s.has(h.key)&&(f===void 0||f.mutation instanceof Sn)?i=i.insert(h.key,h):f!==void 0?(a.set(h.key,f.mutation.getFieldMask()),_s(f.mutation,h,f.mutation.getFieldMask(),ge.now())):a.set(h.key,ot.empty())}),this.recalculateAndSaveOverlays(e,i).next(u=>(u.forEach((h,f)=>a.set(h,f)),t.forEach((h,f)=>{var m;return c.set(h,new Nv(f,(m=a.get(h))!==null&&m!==void 0?m:null))}),c))}recalculateAndSaveOverlays(e,t){const r=gs();let s=new Ie((a,c)=>a-c),i=Z();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(a=>{for(const c of a)c.keys().forEach(u=>{const h=t.get(u);if(h===null)return;let f=r.get(u)||ot.empty();f=c.applyToLocalView(h,f),r.set(u,f);const m=(s.get(c.batchId)||Z()).add(u);s=s.insert(c.batchId,m)})}).next(()=>{const a=[],c=s.getReverseIterator();for(;c.hasNext();){const u=c.getNext(),h=u.key,f=u.value,m=hf();f.forEach(g=>{if(!i.has(g)){const S=_f(t.get(g),r.get(g));S!==null&&m.set(g,S),i=i.add(g)}}),a.push(this.documentOverlayCache.saveOverlays(e,h,m))}return C.waitFor(a)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,t,r,s){return function(a){return $.isDocumentKey(a.path)&&a.collectionGroup===null&&a.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):of(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,s):this.getDocumentsMatchingCollectionQuery(e,t,r,s)}getNextDocuments(e,t,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,s).next(i=>{const a=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,s-i.size):C.resolve(Un());let c=Is,u=i;return a.next(h=>C.forEach(h,(f,m)=>(c<m.largestBatchId&&(c=m.largestBatchId),i.get(f)?C.resolve():this.remoteDocumentCache.getEntry(e,f).next(g=>{u=u.insert(f,g)}))).next(()=>this.populateOverlays(e,h,i)).next(()=>this.computeViews(e,u,h,Z())).next(f=>({batchId:c,changes:uf(f)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new $(t)).next(r=>{let s=ls();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s})}getDocumentsMatchingCollectionGroupQuery(e,t,r,s){const i=t.collectionGroup;let a=ls();return this.indexManager.getCollectionParents(e,i).next(c=>C.forEach(c,u=>{const h=function(m,g){return new Br(g,null,m.explicitOrderBy.slice(),m.filters.slice(),m.limit,m.limitType,m.startAt,m.endAt)}(t,u.child(i));return this.getDocumentsMatchingCollectionQuery(e,h,r,s).next(f=>{f.forEach((m,g)=>{a=a.insert(m,g)})})}).next(()=>a))}getDocumentsMatchingCollectionQuery(e,t,r,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next(a=>(i=a,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,i,s))).next(a=>{i.forEach((u,h)=>{const f=h.getKey();a.get(f)===null&&(a=a.insert(f,Qe.newInvalidDocument(f)))});let c=ls();return a.forEach((u,h)=>{const f=i.get(u);f!==void 0&&_s(f.mutation,h,ot.empty(),ge.now()),go(t,h)&&(c=c.insert(u,h))}),c})}}/**
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
 */class xv{constructor(e){this.serializer=e,this.Br=new Map,this.Lr=new Map}getBundleMetadata(e,t){return C.resolve(this.Br.get(t))}saveBundleMetadata(e,t){return this.Br.set(t.id,function(s){return{id:s.id,version:s.version,createTime:At(s.createTime)}}(t)),C.resolve()}getNamedQuery(e,t){return C.resolve(this.Lr.get(t))}saveNamedQuery(e,t){return this.Lr.set(t.name,function(s){return{name:s.name,query:Iv(s.bundledQuery),readTime:At(s.readTime)}}(t)),C.resolve()}}/**
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
 */class Ov{constructor(){this.overlays=new Ie($.comparator),this.kr=new Map}getOverlay(e,t){return C.resolve(this.overlays.get(t))}getOverlays(e,t){const r=Un();return C.forEach(t,s=>this.getOverlay(e,s).next(i=>{i!==null&&r.set(s,i)})).next(()=>r)}saveOverlays(e,t,r){return r.forEach((s,i)=>{this.wt(e,t,i)}),C.resolve()}removeOverlaysForBatchId(e,t,r){const s=this.kr.get(r);return s!==void 0&&(s.forEach(i=>this.overlays=this.overlays.remove(i)),this.kr.delete(r)),C.resolve()}getOverlaysForCollection(e,t,r){const s=Un(),i=t.length+1,a=new $(t.child("")),c=this.overlays.getIteratorFrom(a);for(;c.hasNext();){const u=c.getNext().value,h=u.getKey();if(!t.isPrefixOf(h.path))break;h.path.length===i&&u.largestBatchId>r&&s.set(u.getKey(),u)}return C.resolve(s)}getOverlaysForCollectionGroup(e,t,r,s){let i=new Ie((h,f)=>h-f);const a=this.overlays.getIterator();for(;a.hasNext();){const h=a.getNext().value;if(h.getKey().getCollectionGroup()===t&&h.largestBatchId>r){let f=i.get(h.largestBatchId);f===null&&(f=Un(),i=i.insert(h.largestBatchId,f)),f.set(h.getKey(),h)}}const c=Un(),u=i.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach((h,f)=>c.set(h,f)),!(c.size()>=s)););return C.resolve(c)}wt(e,t,r){const s=this.overlays.get(r.key);if(s!==null){const a=this.kr.get(s.largestBatchId).delete(r.key);this.kr.set(s.largestBatchId,a)}this.overlays=this.overlays.insert(r.key,new ev(t,r));let i=this.kr.get(t);i===void 0&&(i=Z(),this.kr.set(t,i)),this.kr.set(t,i.add(r.key))}}/**
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
 */class Mv{constructor(){this.sessionToken=$e.EMPTY_BYTE_STRING}getSessionToken(e){return C.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,C.resolve()}}/**
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
 */class Dc{constructor(){this.qr=new Ve(xe.Qr),this.$r=new Ve(xe.Ur)}isEmpty(){return this.qr.isEmpty()}addReference(e,t){const r=new xe(e,t);this.qr=this.qr.add(r),this.$r=this.$r.add(r)}Kr(e,t){e.forEach(r=>this.addReference(r,t))}removeReference(e,t){this.Wr(new xe(e,t))}Gr(e,t){e.forEach(r=>this.removeReference(r,t))}zr(e){const t=new $(new de([])),r=new xe(t,e),s=new xe(t,e+1),i=[];return this.$r.forEachInRange([r,s],a=>{this.Wr(a),i.push(a.key)}),i}jr(){this.qr.forEach(e=>this.Wr(e))}Wr(e){this.qr=this.qr.delete(e),this.$r=this.$r.delete(e)}Jr(e){const t=new $(new de([])),r=new xe(t,e),s=new xe(t,e+1);let i=Z();return this.$r.forEachInRange([r,s],a=>{i=i.add(a.key)}),i}containsKey(e){const t=new xe(e,0),r=this.qr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}}class xe{constructor(e,t){this.key=e,this.Hr=t}static Qr(e,t){return $.comparator(e.key,t.key)||Q(e.Hr,t.Hr)}static Ur(e,t){return Q(e.Hr,t.Hr)||$.comparator(e.key,t.key)}}/**
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
 */class Lv{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.er=1,this.Yr=new Ve(xe.Qr)}checkEmpty(e){return C.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,s){const i=this.er;this.er++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new Zy(i,t,r,s);this.mutationQueue.push(a);for(const c of s)this.Yr=this.Yr.add(new xe(c.key,i)),this.indexManager.addToCollectionParentIndex(e,c.key.path.popLast());return C.resolve(a)}lookupMutationBatch(e,t){return C.resolve(this.Zr(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,s=this.Xr(r),i=s<0?0:s;return C.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return C.resolve(this.mutationQueue.length===0?bc:this.er-1)}getAllMutationBatches(e){return C.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new xe(t,0),s=new xe(t,Number.POSITIVE_INFINITY),i=[];return this.Yr.forEachInRange([r,s],a=>{const c=this.Zr(a.Hr);i.push(c)}),C.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new Ve(Q);return t.forEach(s=>{const i=new xe(s,0),a=new xe(s,Number.POSITIVE_INFINITY);this.Yr.forEachInRange([i,a],c=>{r=r.add(c.Hr)})}),C.resolve(this.ei(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,s=r.length+1;let i=r;$.isDocumentKey(i)||(i=i.child(""));const a=new xe(new $(i),0);let c=new Ve(Q);return this.Yr.forEachWhile(u=>{const h=u.key.path;return!!r.isPrefixOf(h)&&(h.length===s&&(c=c.add(u.Hr)),!0)},a),C.resolve(this.ei(c))}ei(e){const t=[];return e.forEach(r=>{const s=this.Zr(r);s!==null&&t.push(s)}),t}removeMutationBatch(e,t){ie(this.ti(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.Yr;return C.forEach(t.mutations,s=>{const i=new xe(s.key,t.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)}).next(()=>{this.Yr=r})}rr(e){}containsKey(e,t){const r=new xe(t,0),s=this.Yr.firstAfterOrEqual(r);return C.resolve(t.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,C.resolve()}ti(e,t){return this.Xr(e)}Xr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Zr(e){const t=this.Xr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
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
 */class Fv{constructor(e){this.ni=e,this.docs=function(){return new Ie($.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,s=this.docs.get(r),i=s?s.size:0,a=this.ni(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:a}),this.size+=a-i,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return C.resolve(r?r.document.mutableCopy():Qe.newInvalidDocument(t))}getEntries(e,t){let r=zt();return t.forEach(s=>{const i=this.docs.get(s);r=r.insert(s,i?i.document.mutableCopy():Qe.newInvalidDocument(s))}),C.resolve(r)}getDocumentsMatchingQuery(e,t,r,s){let i=zt();const a=t.path,c=new $(a.child("__id-9223372036854775808__")),u=this.docs.getIteratorFrom(c);for(;u.hasNext();){const{key:h,value:{document:f}}=u.getNext();if(!a.isPrefixOf(h.path))break;h.path.length>a.length+1||fy(dy(f),r)<=0||(s.has(f.key)||go(t,f))&&(i=i.insert(f.key,f.mutableCopy()))}return C.resolve(i)}getAllFromCollectionGroup(e,t,r,s){q(9500)}ri(e,t){return C.forEach(this.docs,r=>t(r))}newChangeBuffer(e){return new Uv(this)}getSize(e){return C.resolve(this.size)}}class Uv extends Vv{constructor(e){super(),this.Or=e}applyChanges(e){const t=[];return this.changes.forEach((r,s)=>{s.isValidDocument()?t.push(this.Or.addEntry(e,s)):this.Or.removeEntry(r)}),C.waitFor(t)}getFromCache(e,t){return this.Or.getEntry(e,t)}getAllFromCache(e,t){return this.Or.getEntries(e,t)}}/**
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
 */class $v{constructor(e){this.persistence=e,this.ii=new Yn(t=>Rc(t),kc),this.lastRemoteSnapshotVersion=G.min(),this.highestTargetId=0,this.si=0,this.oi=new Dc,this.targetCount=0,this._i=Cr.ar()}forEachTarget(e,t){return this.ii.forEach((r,s)=>t(s)),C.resolve()}getLastRemoteSnapshotVersion(e){return C.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return C.resolve(this.si)}allocateTargetId(e){return this.highestTargetId=this._i.next(),C.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.si&&(this.si=t),C.resolve()}hr(e){this.ii.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this._i=new Cr(t),this.highestTargetId=t),e.sequenceNumber>this.si&&(this.si=e.sequenceNumber)}addTargetData(e,t){return this.hr(t),this.targetCount+=1,C.resolve()}updateTargetData(e,t){return this.hr(t),C.resolve()}removeTargetData(e,t){return this.ii.delete(t.target),this.oi.zr(t.targetId),this.targetCount-=1,C.resolve()}removeTargets(e,t,r){let s=0;const i=[];return this.ii.forEach((a,c)=>{c.sequenceNumber<=t&&r.get(c.targetId)===null&&(this.ii.delete(a),i.push(this.removeMatchingKeysForTargetId(e,c.targetId)),s++)}),C.waitFor(i).next(()=>s)}getTargetCount(e){return C.resolve(this.targetCount)}getTargetData(e,t){const r=this.ii.get(t)||null;return C.resolve(r)}addMatchingKeys(e,t,r){return this.oi.Kr(t,r),C.resolve()}removeMatchingKeys(e,t,r){this.oi.Gr(t,r);const s=this.persistence.referenceDelegate,i=[];return s&&t.forEach(a=>{i.push(s.markPotentiallyOrphaned(e,a))}),C.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this.oi.zr(t),C.resolve()}getMatchingKeysForTargetId(e,t){const r=this.oi.Jr(t);return C.resolve(r)}containsKey(e,t){return C.resolve(this.oi.containsKey(t))}}/**
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
 */class Vf{constructor(e,t){this.ai={},this.overlays={},this.ui=new uo(0),this.ci=!1,this.ci=!0,this.li=new Mv,this.referenceDelegate=e(this),this.hi=new $v(this),this.indexManager=new bv,this.remoteDocumentCache=function(s){return new Fv(s)}(r=>this.referenceDelegate.Pi(r)),this.serializer=new Tv(t),this.Ti=new xv(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ci=!1,Promise.resolve()}get started(){return this.ci}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new Ov,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.ai[e.toKey()];return r||(r=new Lv(t,this.referenceDelegate),this.ai[e.toKey()]=r),r}getGlobalsCache(){return this.li}getTargetCache(){return this.hi}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ti}runTransaction(e,t,r){L("MemoryPersistence","Starting transaction:",e);const s=new Bv(this.ui.next());return this.referenceDelegate.Ii(),r(s).next(i=>this.referenceDelegate.di(s).next(()=>i)).toPromise().then(i=>(s.raiseOnCommittedEvent(),i))}Ei(e,t){return C.or(Object.values(this.ai).map(r=>()=>r.containsKey(e,t)))}}class Bv extends my{constructor(e){super(),this.currentSequenceNumber=e}}class xc{constructor(e){this.persistence=e,this.Ai=new Dc,this.Ri=null}static Vi(e){return new xc(e)}get mi(){if(this.Ri)return this.Ri;throw q(60996)}addReference(e,t,r){return this.Ai.addReference(r,t),this.mi.delete(r.toString()),C.resolve()}removeReference(e,t,r){return this.Ai.removeReference(r,t),this.mi.add(r.toString()),C.resolve()}markPotentiallyOrphaned(e,t){return this.mi.add(t.toString()),C.resolve()}removeTarget(e,t){this.Ai.zr(t.targetId).forEach(s=>this.mi.add(s.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next(s=>{s.forEach(i=>this.mi.add(i.toString()))}).next(()=>r.removeTargetData(e,t))}Ii(){this.Ri=new Set}di(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return C.forEach(this.mi,r=>{const s=$.fromPath(r);return this.fi(e,s).next(i=>{i||t.removeEntry(s,G.min())})}).next(()=>(this.Ri=null,t.apply(e)))}updateLimboDocument(e,t){return this.fi(e,t).next(r=>{r?this.mi.delete(t.toString()):this.mi.add(t.toString())})}Pi(e){return 0}fi(e,t){return C.or([()=>C.resolve(this.Ai.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ei(e,t)])}}class Ki{constructor(e,t){this.persistence=e,this.gi=new Yn(r=>yy(r.path),(r,s)=>r.isEqual(s)),this.garbageCollector=Cv(this,t)}static Vi(e,t){return new Ki(e,t)}Ii(){}di(e){return C.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}mr(e){const t=this.yr(e);return this.persistence.getTargetCache().getTargetCount(e).next(r=>t.next(s=>r+s))}yr(e){let t=0;return this.gr(e,r=>{t++}).next(()=>t)}gr(e,t){return C.forEach(this.gi,(r,s)=>this.Sr(e,r,s).next(i=>i?C.resolve():t(s)))}removeTargets(e,t,r){return this.persistence.getTargetCache().removeTargets(e,t,r)}removeOrphanedDocuments(e,t){let r=0;const s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.ri(e,a=>this.Sr(e,a,t).next(c=>{c||(r++,i.removeEntry(a,G.min()))})).next(()=>i.apply(e)).next(()=>r)}markPotentiallyOrphaned(e,t){return this.gi.set(t,e.currentSequenceNumber),C.resolve()}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,t,r){return this.gi.set(r,e.currentSequenceNumber),C.resolve()}removeReference(e,t,r){return this.gi.set(r,e.currentSequenceNumber),C.resolve()}updateLimboDocument(e,t){return this.gi.set(t,e.currentSequenceNumber),C.resolve()}Pi(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=Ai(e.data.value)),t}Sr(e,t,r){return C.or([()=>this.persistence.Ei(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const s=this.gi.get(t);return C.resolve(s!==void 0&&s>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
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
 */class Oc{constructor(e,t,r,s){this.targetId=e,this.fromCache=t,this.Is=r,this.ds=s}static Es(e,t){let r=Z(),s=Z();for(const i of t.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new Oc(e,t.fromCache,r,s)}}/**
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
 */class jv{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
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
 */class qv{constructor(){this.As=!1,this.Rs=!1,this.Vs=100,this.fs=function(){return Lg()?8:gy(Xe())>0?6:4}()}initialize(e,t){this.gs=e,this.indexManager=t,this.As=!0}getDocumentsMatchingQuery(e,t,r,s){const i={result:null};return this.ps(e,t).next(a=>{i.result=a}).next(()=>{if(!i.result)return this.ys(e,t,s,r).next(a=>{i.result=a})}).next(()=>{if(i.result)return;const a=new jv;return this.ws(e,t,a).next(c=>{if(i.result=c,this.Rs)return this.Ss(e,t,a,c.size)})}).next(()=>i.result)}Ss(e,t,r,s){return r.documentReadCount<this.Vs?(ur()<=Y.DEBUG&&L("QueryEngine","SDK will not create cache indexes for query:",hr(t),"since it only creates cache indexes for collection contains","more than or equal to",this.Vs,"documents"),C.resolve()):(ur()<=Y.DEBUG&&L("QueryEngine","Query:",hr(t),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.fs*s?(ur()<=Y.DEBUG&&L("QueryEngine","The SDK decides to create cache indexes for query:",hr(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,bt(t))):C.resolve())}ps(e,t){if(Xu(t))return C.resolve(null);let r=bt(t);return this.indexManager.getIndexType(e,r).next(s=>s===0?null:(t.limit!==null&&s===1&&(t=za(t,null,"F"),r=bt(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next(i=>{const a=Z(...i);return this.gs.getDocuments(e,a).next(c=>this.indexManager.getMinOffset(e,r).next(u=>{const h=this.bs(t,c);return this.Ds(t,h,a,u.readTime)?this.ps(e,za(t,null,"F")):this.vs(e,h,t,u)}))})))}ys(e,t,r,s){return Xu(t)||s.isEqual(G.min())?C.resolve(null):this.gs.getDocuments(e,r).next(i=>{const a=this.bs(t,i);return this.Ds(t,a,r,s)?C.resolve(null):(ur()<=Y.DEBUG&&L("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),hr(t)),this.vs(e,a,t,hy(s,Is)).next(c=>c))})}bs(e,t){let r=new Ve(cf(e));return t.forEach((s,i)=>{go(e,i)&&(r=r.add(i))}),r}Ds(e,t,r,s){if(e.limit===null)return!1;if(r.size!==t.size)return!0;const i=e.limitType==="F"?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}ws(e,t,r){return ur()<=Y.DEBUG&&L("QueryEngine","Using full collection scan to execute query:",hr(t)),this.gs.getDocumentsMatchingQuery(e,t,yn.min(),r)}vs(e,t,r,s){return this.gs.getDocumentsMatchingQuery(e,r,s).next(i=>(t.forEach(a=>{i=i.insert(a.key,a)}),i))}}/**
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
 */const Mc="LocalStore",zv=3e8;class Hv{constructor(e,t,r,s){this.persistence=e,this.Cs=t,this.serializer=s,this.Fs=new Ie(Q),this.Ms=new Yn(i=>Rc(i),kc),this.xs=new Map,this.Os=e.getRemoteDocumentCache(),this.hi=e.getTargetCache(),this.Ti=e.getBundleCache(),this.Ns(r)}Ns(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new Dv(this.Os,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Os.setIndexManager(this.indexManager),this.Cs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.Fs))}}function Gv(n,e,t,r){return new Hv(n,e,t,r)}async function Nf(n,e){const t=W(n);return await t.persistence.runTransaction("Handle user change","readonly",r=>{let s;return t.mutationQueue.getAllMutationBatches(r).next(i=>(s=i,t.Ns(e),t.mutationQueue.getAllMutationBatches(r))).next(i=>{const a=[],c=[];let u=Z();for(const h of s){a.push(h.batchId);for(const f of h.mutations)u=u.add(f.key)}for(const h of i){c.push(h.batchId);for(const f of h.mutations)u=u.add(f.key)}return t.localDocuments.getDocuments(r,u).next(h=>({Bs:h,removedBatchIds:a,addedBatchIds:c}))})})}function Wv(n,e){const t=W(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const s=e.batch.keys(),i=t.Os.newChangeBuffer({trackRemovals:!0});return function(c,u,h,f){const m=h.batch,g=m.keys();let S=C.resolve();return g.forEach(P=>{S=S.next(()=>f.getEntry(u,P)).next(x=>{const N=h.docVersions.get(P);ie(N!==null,48541),x.version.compareTo(N)<0&&(m.applyToRemoteDocument(x,h),x.isValidDocument()&&(x.setReadTime(h.commitVersion),f.addEntry(x)))})}),S.next(()=>c.mutationQueue.removeMutationBatch(u,m))}(t,r,e,i).next(()=>i.apply(r)).next(()=>t.mutationQueue.performConsistencyCheck(r)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(r,s,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(c){let u=Z();for(let h=0;h<c.mutationResults.length;++h)c.mutationResults[h].transformResults.length>0&&(u=u.add(c.batch.mutations[h].key));return u}(e))).next(()=>t.localDocuments.getDocuments(r,s))})}function Df(n){const e=W(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.hi.getLastRemoteSnapshotVersion(t))}function Kv(n,e){const t=W(n),r=e.snapshotVersion;let s=t.Fs;return t.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{const a=t.Os.newChangeBuffer({trackRemovals:!0});s=t.Fs;const c=[];e.targetChanges.forEach((f,m)=>{const g=s.get(m);if(!g)return;c.push(t.hi.removeMatchingKeys(i,f.removedDocuments,m).next(()=>t.hi.addMatchingKeys(i,f.addedDocuments,m)));let S=g.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(m)!==null?S=S.withResumeToken($e.EMPTY_BYTE_STRING,G.min()).withLastLimboFreeSnapshotVersion(G.min()):f.resumeToken.approximateByteSize()>0&&(S=S.withResumeToken(f.resumeToken,r)),s=s.insert(m,S),function(x,N,K){return x.resumeToken.approximateByteSize()===0||N.snapshotVersion.toMicroseconds()-x.snapshotVersion.toMicroseconds()>=zv?!0:K.addedDocuments.size+K.modifiedDocuments.size+K.removedDocuments.size>0}(g,S,f)&&c.push(t.hi.updateTargetData(i,S))});let u=zt(),h=Z();if(e.documentUpdates.forEach(f=>{e.resolvedLimboDocuments.has(f)&&c.push(t.persistence.referenceDelegate.updateLimboDocument(i,f))}),c.push(Qv(i,a,e.documentUpdates).next(f=>{u=f.Ls,h=f.ks})),!r.isEqual(G.min())){const f=t.hi.getLastRemoteSnapshotVersion(i).next(m=>t.hi.setTargetsMetadata(i,i.currentSequenceNumber,r));c.push(f)}return C.waitFor(c).next(()=>a.apply(i)).next(()=>t.localDocuments.getLocalViewOfDocuments(i,u,h)).next(()=>u)}).then(i=>(t.Fs=s,i))}function Qv(n,e,t){let r=Z(),s=Z();return t.forEach(i=>r=r.add(i)),e.getEntries(n,r).next(i=>{let a=zt();return t.forEach((c,u)=>{const h=i.get(c);u.isFoundDocument()!==h.isFoundDocument()&&(s=s.add(c)),u.isNoDocument()&&u.version.isEqual(G.min())?(e.removeEntry(c,u.readTime),a=a.insert(c,u)):!h.isValidDocument()||u.version.compareTo(h.version)>0||u.version.compareTo(h.version)===0&&h.hasPendingWrites?(e.addEntry(u),a=a.insert(c,u)):L(Mc,"Ignoring outdated watch update for ",c,". Current version:",h.version," Watch version:",u.version)}),{Ls:a,ks:s}})}function Jv(n,e){const t=W(n);return t.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=bc),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function Xv(n,e){const t=W(n);return t.persistence.runTransaction("Allocate target","readwrite",r=>{let s;return t.hi.getTargetData(r,e).next(i=>i?(s=i,C.resolve(s)):t.hi.allocateTargetId(r).next(a=>(s=new rn(e,a,"TargetPurposeListen",r.currentSequenceNumber),t.hi.addTargetData(r,s).next(()=>s))))}).then(r=>{const s=t.Fs.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(t.Fs=t.Fs.insert(r.targetId,r),t.Ms.set(e,r.targetId)),r})}async function Qa(n,e,t){const r=W(n),s=r.Fs.get(e),i=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",i,a=>r.persistence.referenceDelegate.removeTarget(a,s))}catch(a){if(!$r(a))throw a;L(Mc,`Failed to update sequence numbers for target ${e}: ${a}`)}r.Fs=r.Fs.remove(e),r.Ms.delete(s.target)}function uh(n,e,t){const r=W(n);let s=G.min(),i=Z();return r.persistence.runTransaction("Execute query","readwrite",a=>function(u,h,f){const m=W(u),g=m.Ms.get(f);return g!==void 0?C.resolve(m.Fs.get(g)):m.hi.getTargetData(h,f)}(r,a,bt(e)).next(c=>{if(c)return s=c.lastLimboFreeSnapshotVersion,r.hi.getMatchingKeysForTargetId(a,c.targetId).next(u=>{i=u})}).next(()=>r.Cs.getDocumentsMatchingQuery(a,e,t?s:G.min(),t?i:Z())).next(c=>(Yv(r,Ly(e),c),{documents:c,qs:i})))}function Yv(n,e,t){let r=n.xs.get(e)||G.min();t.forEach((s,i)=>{i.readTime.compareTo(r)>0&&(r=i.readTime)}),n.xs.set(e,r)}class hh{constructor(){this.activeTargetIds=qy()}Gs(e){this.activeTargetIds=this.activeTargetIds.add(e)}zs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Ws(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class Zv{constructor(){this.Fo=new hh,this.Mo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.Fo.Gs(e),this.Mo[e]||"not-current"}updateQueryState(e,t,r){this.Mo[e]=t}removeLocalQueryTarget(e){this.Fo.zs(e)}isLocalQueryTarget(e){return this.Fo.activeTargetIds.has(e)}clearQueryState(e){delete this.Mo[e]}getAllActiveQueryTargets(){return this.Fo.activeTargetIds}isActiveQueryTarget(e){return this.Fo.activeTargetIds.has(e)}start(){return this.Fo=new hh,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
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
 */class e0{xo(e){}shutdown(){}}/**
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
 */const dh="ConnectivityMonitor";class fh{constructor(){this.Oo=()=>this.No(),this.Bo=()=>this.Lo(),this.ko=[],this.qo()}xo(e){this.ko.push(e)}shutdown(){window.removeEventListener("online",this.Oo),window.removeEventListener("offline",this.Bo)}qo(){window.addEventListener("online",this.Oo),window.addEventListener("offline",this.Bo)}No(){L(dh,"Network connectivity changed: AVAILABLE");for(const e of this.ko)e(0)}Lo(){L(dh,"Network connectivity changed: UNAVAILABLE");for(const e of this.ko)e(1)}static C(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
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
 */let yi=null;function Ja(){return yi===null?yi=function(){return 268435456+Math.round(2147483648*Math.random())}():yi++,"0x"+yi.toString(16)}/**
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
 */const ma="RestConnection",t0={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class n0{get Qo(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.$o=t+"://"+e.host,this.Uo=`projects/${r}/databases/${s}`,this.Ko=this.databaseId.database===qi?`project_id=${r}`:`project_id=${r}&database_id=${s}`}Wo(e,t,r,s,i){const a=Ja(),c=this.Go(e,t.toUriEncodedString());L(ma,`Sending RPC '${e}' ${a}:`,c,r);const u={"google-cloud-resource-prefix":this.Uo,"x-goog-request-params":this.Ko};this.zo(u,s,i);const{host:h}=new URL(c),f=Mr(h);return this.jo(e,c,u,r,f).then(m=>(L(ma,`Received RPC '${e}' ${a}: `,m),m),m=>{throw _n(ma,`RPC '${e}' ${a} failed with error: `,m,"url: ",c,"request:",r),m})}Jo(e,t,r,s,i,a){return this.Wo(e,t,r,s,i)}zo(e,t,r){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+Fr}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((s,i)=>e[i]=s),r&&r.headers.forEach((s,i)=>e[i]=s)}Go(e,t){const r=t0[e];return`${this.$o}/v1/${t}:${r}`}terminate(){}}/**
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
 */class r0{constructor(e){this.Ho=e.Ho,this.Yo=e.Yo}Zo(e){this.Xo=e}e_(e){this.t_=e}n_(e){this.r_=e}onMessage(e){this.i_=e}close(){this.Yo()}send(e){this.Ho(e)}s_(){this.Xo()}o_(){this.t_()}__(e){this.r_(e)}a_(e){this.i_(e)}}/**
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
 */const He="WebChannelConnection";class s0 extends n0{constructor(e){super(e),this.u_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}jo(e,t,r,s,i){const a=Ja();return new Promise((c,u)=>{const h=new Dd;h.setWithCredentials(!0),h.listenOnce(xd.COMPLETE,()=>{try{switch(h.getLastErrorCode()){case bi.NO_ERROR:const m=h.getResponseJson();L(He,`XHR for RPC '${e}' ${a} received:`,JSON.stringify(m)),c(m);break;case bi.TIMEOUT:L(He,`RPC '${e}' ${a} timed out`),u(new M(k.DEADLINE_EXCEEDED,"Request time out"));break;case bi.HTTP_ERROR:const g=h.getStatus();if(L(He,`RPC '${e}' ${a} failed with status:`,g,"response text:",h.getResponseText()),g>0){let S=h.getResponseJson();Array.isArray(S)&&(S=S[0]);const P=S==null?void 0:S.error;if(P&&P.status&&P.message){const x=function(K){const z=K.toLowerCase().replace(/_/g,"-");return Object.values(k).indexOf(z)>=0?z:k.UNKNOWN}(P.status);u(new M(x,P.message))}else u(new M(k.UNKNOWN,"Server responded with status "+h.getStatus()))}else u(new M(k.UNAVAILABLE,"Connection failed."));break;default:q(9055,{c_:e,streamId:a,l_:h.getLastErrorCode(),h_:h.getLastError()})}}finally{L(He,`RPC '${e}' ${a} completed.`)}});const f=JSON.stringify(s);L(He,`RPC '${e}' ${a} sending request:`,s),h.send(t,"POST",f,r,15)})}P_(e,t,r){const s=Ja(),i=[this.$o,"/","google.firestore.v1.Firestore","/",e,"/channel"],a=Ld(),c=Md(),u={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},h=this.longPollingOptions.timeoutSeconds;h!==void 0&&(u.longPollingTimeout=Math.round(1e3*h)),this.useFetchStreams&&(u.useFetchStreams=!0),this.zo(u.initMessageHeaders,t,r),u.encodeInitMessageHeaders=!0;const f=i.join("");L(He,`Creating RPC '${e}' stream ${s}: ${f}`,u);const m=a.createWebChannel(f,u);this.T_(m);let g=!1,S=!1;const P=new r0({Ho:N=>{S?L(He,`Not sending because RPC '${e}' stream ${s} is closed:`,N):(g||(L(He,`Opening RPC '${e}' stream ${s} transport.`),m.open(),g=!0),L(He,`RPC '${e}' stream ${s} sending:`,N),m.send(N))},Yo:()=>m.close()}),x=(N,K,z)=>{N.listen(K,J=>{try{z(J)}catch(fe){setTimeout(()=>{throw fe},0)}})};return x(m,cs.EventType.OPEN,()=>{S||(L(He,`RPC '${e}' stream ${s} transport opened.`),P.s_())}),x(m,cs.EventType.CLOSE,()=>{S||(S=!0,L(He,`RPC '${e}' stream ${s} transport closed`),P.__(),this.I_(m))}),x(m,cs.EventType.ERROR,N=>{S||(S=!0,_n(He,`RPC '${e}' stream ${s} transport errored. Name:`,N.name,"Message:",N.message),P.__(new M(k.UNAVAILABLE,"The operation could not be completed")))}),x(m,cs.EventType.MESSAGE,N=>{var K;if(!S){const z=N.data[0];ie(!!z,16349);const J=z,fe=(J==null?void 0:J.error)||((K=J[0])===null||K===void 0?void 0:K.error);if(fe){L(He,`RPC '${e}' stream ${s} received error:`,fe);const tt=fe.status;let ye=function(y){const E=ke[y];if(E!==void 0)return Ef(E)}(tt),w=fe.message;ye===void 0&&(ye=k.INTERNAL,w="Unknown error status: "+tt+" with message "+fe.message),S=!0,P.__(new M(ye,w)),m.close()}else L(He,`RPC '${e}' stream ${s} received:`,z),P.a_(z)}}),x(c,Od.STAT_EVENT,N=>{N.stat===La.PROXY?L(He,`RPC '${e}' stream ${s} detected buffering proxy`):N.stat===La.NOPROXY&&L(He,`RPC '${e}' stream ${s} detected no buffering proxy`)}),setTimeout(()=>{P.o_()},0),P}terminate(){this.u_.forEach(e=>e.close()),this.u_=[]}T_(e){this.u_.push(e)}I_(e){this.u_=this.u_.filter(t=>t===e)}}function ga(){return typeof document<"u"?document:null}/**
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
 */function Eo(n){return new cv(n,!0)}/**
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
 */const ph="PersistentStream";class Of{constructor(e,t,r,s,i,a,c,u){this.Fi=e,this.w_=r,this.S_=s,this.connection=i,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=c,this.listener=u,this.state=0,this.b_=0,this.D_=null,this.v_=null,this.stream=null,this.C_=0,this.F_=new xf(e,t)}M_(){return this.state===1||this.state===5||this.x_()}x_(){return this.state===2||this.state===3}start(){this.C_=0,this.state!==4?this.auth():this.O_()}async stop(){this.M_()&&await this.close(0)}N_(){this.state=0,this.F_.reset()}B_(){this.x_()&&this.D_===null&&(this.D_=this.Fi.enqueueAfterDelay(this.w_,6e4,()=>this.L_()))}k_(e){this.q_(),this.stream.send(e)}async L_(){if(this.x_())return this.close(0)}q_(){this.D_&&(this.D_.cancel(),this.D_=null)}Q_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,t){this.q_(),this.Q_(),this.F_.cancel(),this.b_++,e!==4?this.F_.reset():t&&t.code===k.RESOURCE_EXHAUSTED?(qt(t.toString()),qt("Using maximum backoff delay to prevent overloading the backend."),this.F_.f_()):t&&t.code===k.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.U_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.n_(t)}U_(){}auth(){this.state=1;const e=this.K_(this.b_),t=this.b_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,s])=>{this.b_===t&&this.W_(r,s)},r=>{e(()=>{const s=new M(k.UNKNOWN,"Fetching auth token failed: "+r.message);return this.G_(s)})})}W_(e,t){const r=this.K_(this.b_);this.stream=this.z_(e,t),this.stream.Zo(()=>{r(()=>this.listener.Zo())}),this.stream.e_(()=>{r(()=>(this.state=2,this.v_=this.Fi.enqueueAfterDelay(this.S_,1e4,()=>(this.x_()&&(this.state=3),Promise.resolve())),this.listener.e_()))}),this.stream.n_(s=>{r(()=>this.G_(s))}),this.stream.onMessage(s=>{r(()=>++this.C_==1?this.j_(s):this.onNext(s))})}O_(){this.state=5,this.F_.g_(async()=>{this.state=0,this.start()})}G_(e){return L(ph,`close with error: ${e}`),this.stream=null,this.close(4,e)}K_(e){return t=>{this.Fi.enqueueAndForget(()=>this.b_===e?t():(L(ph,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class i0 extends Of{constructor(e,t,r,s,i,a){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,s,a),this.serializer=i}z_(e,t){return this.connection.P_("Listen",e,t)}j_(e){return this.onNext(e)}onNext(e){this.F_.reset();const t=hv(this.serializer,e),r=function(i){if(!("targetChange"in i))return G.min();const a=i.targetChange;return a.targetIds&&a.targetIds.length?G.min():a.readTime?At(a.readTime):G.min()}(e);return this.listener.J_(t,r)}H_(e){const t={};t.database=Ka(this.serializer),t.addTarget=function(i,a){let c;const u=a.target;if(c=ja(u)?{documents:pv(i,u)}:{query:mv(i,u).Vt},c.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){c.resumeToken=If(i,a.resumeToken);const h=Ha(i,a.expectedCount);h!==null&&(c.expectedCount=h)}else if(a.snapshotVersion.compareTo(G.min())>0){c.readTime=Wi(i,a.snapshotVersion.toTimestamp());const h=Ha(i,a.expectedCount);h!==null&&(c.expectedCount=h)}return c}(this.serializer,e);const r=_v(this.serializer,e);r&&(t.labels=r),this.k_(t)}Y_(e){const t={};t.database=Ka(this.serializer),t.removeTarget=e,this.k_(t)}}class o0 extends Of{constructor(e,t,r,s,i,a){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,s,a),this.serializer=i}get Z_(){return this.C_>0}start(){this.lastStreamToken=void 0,super.start()}U_(){this.Z_&&this.X_([])}z_(e,t){return this.connection.P_("Write",e,t)}j_(e){return ie(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,ie(!e.writeResults||e.writeResults.length===0,55816),this.listener.ea()}onNext(e){ie(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.F_.reset();const t=fv(e.writeResults,e.commitTime),r=At(e.commitTime);return this.listener.ta(r,t)}na(){const e={};e.database=Ka(this.serializer),this.k_(e)}X_(e){const t={streamToken:this.lastStreamToken,writes:e.map(r=>dv(this.serializer,r))};this.k_(t)}}/**
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
 */class a0{}class c0 extends a0{constructor(e,t,r,s){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=s,this.ra=!1}ia(){if(this.ra)throw new M(k.FAILED_PRECONDITION,"The client has already been terminated.")}Wo(e,t,r,s){return this.ia(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,a])=>this.connection.Wo(e,Ga(t,r),s,i,a)).catch(i=>{throw i.name==="FirebaseError"?(i.code===k.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new M(k.UNKNOWN,i.toString())})}Jo(e,t,r,s,i){return this.ia(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([a,c])=>this.connection.Jo(e,Ga(t,r),s,a,c,i)).catch(a=>{throw a.name==="FirebaseError"?(a.code===k.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new M(k.UNKNOWN,a.toString())})}terminate(){this.ra=!0,this.connection.terminate()}}class l0{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.sa=0,this.oa=null,this._a=!0}aa(){this.sa===0&&(this.ua("Unknown"),this.oa=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.oa=null,this.ca("Backend didn't respond within 10 seconds."),this.ua("Offline"),Promise.resolve())))}la(e){this.state==="Online"?this.ua("Unknown"):(this.sa++,this.sa>=1&&(this.ha(),this.ca(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ua("Offline")))}set(e){this.ha(),this.sa=0,e==="Online"&&(this._a=!1),this.ua(e)}ua(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}ca(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this._a?(qt(t),this._a=!1):L("OnlineStateTracker",t)}ha(){this.oa!==null&&(this.oa.cancel(),this.oa=null)}}/**
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
 */const Qn="RemoteStore";class u0{constructor(e,t,r,s,i){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.Pa=[],this.Ta=new Map,this.Ia=new Set,this.da=[],this.Ea=i,this.Ea.xo(a=>{r.enqueueAndForget(async()=>{Zn(this)&&(L(Qn,"Restarting streams for network reachability change."),await async function(u){const h=W(u);h.Ia.add(4),await $s(h),h.Aa.set("Unknown"),h.Ia.delete(4),await wo(h)}(this))})}),this.Aa=new l0(r,s)}}async function wo(n){if(Zn(n))for(const e of n.da)await e(!0)}async function $s(n){for(const e of n.da)await e(!1)}function Mf(n,e){const t=W(n);t.Ta.has(e.targetId)||(t.Ta.set(e.targetId,e),$c(t)?Uc(t):jr(t).x_()&&Fc(t,e))}function Lc(n,e){const t=W(n),r=jr(t);t.Ta.delete(e),r.x_()&&Lf(t,e),t.Ta.size===0&&(r.x_()?r.B_():Zn(t)&&t.Aa.set("Unknown"))}function Fc(n,e){if(n.Ra.$e(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(G.min())>0){const t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}jr(n).H_(e)}function Lf(n,e){n.Ra.$e(e),jr(n).Y_(e)}function Uc(n){n.Ra=new sv({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),Et:e=>n.Ta.get(e)||null,lt:()=>n.datastore.serializer.databaseId}),jr(n).start(),n.Aa.aa()}function $c(n){return Zn(n)&&!jr(n).M_()&&n.Ta.size>0}function Zn(n){return W(n).Ia.size===0}function Ff(n){n.Ra=void 0}async function h0(n){n.Aa.set("Online")}async function d0(n){n.Ta.forEach((e,t)=>{Fc(n,e)})}async function f0(n,e){Ff(n),$c(n)?(n.Aa.la(e),Uc(n)):n.Aa.set("Unknown")}async function p0(n,e,t){if(n.Aa.set("Online"),e instanceof Tf&&e.state===2&&e.cause)try{await async function(s,i){const a=i.cause;for(const c of i.targetIds)s.Ta.has(c)&&(await s.remoteSyncer.rejectListen(c,a),s.Ta.delete(c),s.Ra.removeTarget(c))}(n,e)}catch(r){L(Qn,"Failed to remove targets %s: %s ",e.targetIds.join(","),r),await Qi(n,r)}else if(e instanceof ki?n.Ra.Ye(e):e instanceof wf?n.Ra.it(e):n.Ra.et(e),!t.isEqual(G.min()))try{const r=await Df(n.localStore);t.compareTo(r)>=0&&await function(i,a){const c=i.Ra.Pt(a);return c.targetChanges.forEach((u,h)=>{if(u.resumeToken.approximateByteSize()>0){const f=i.Ta.get(h);f&&i.Ta.set(h,f.withResumeToken(u.resumeToken,a))}}),c.targetMismatches.forEach((u,h)=>{const f=i.Ta.get(u);if(!f)return;i.Ta.set(u,f.withResumeToken($e.EMPTY_BYTE_STRING,f.snapshotVersion)),Lf(i,u);const m=new rn(f.target,u,h,f.sequenceNumber);Fc(i,m)}),i.remoteSyncer.applyRemoteEvent(c)}(n,t)}catch(r){L(Qn,"Failed to raise snapshot:",r),await Qi(n,r)}}async function Qi(n,e,t){if(!$r(e))throw e;n.Ia.add(1),await $s(n),n.Aa.set("Offline"),t||(t=()=>Df(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{L(Qn,"Retrying IndexedDB access"),await t(),n.Ia.delete(1),await wo(n)})}function Uf(n,e){return e().catch(t=>Qi(n,t,e))}async function To(n){const e=W(n),t=Tn(e);let r=e.Pa.length>0?e.Pa[e.Pa.length-1].batchId:bc;for(;m0(e);)try{const s=await Jv(e.localStore,r);if(s===null){e.Pa.length===0&&t.B_();break}r=s.batchId,g0(e,s)}catch(s){await Qi(e,s)}$f(e)&&Bf(e)}function m0(n){return Zn(n)&&n.Pa.length<10}function g0(n,e){n.Pa.push(e);const t=Tn(n);t.x_()&&t.Z_&&t.X_(e.mutations)}function $f(n){return Zn(n)&&!Tn(n).M_()&&n.Pa.length>0}function Bf(n){Tn(n).start()}async function _0(n){Tn(n).na()}async function y0(n){const e=Tn(n);for(const t of n.Pa)e.X_(t.mutations)}async function v0(n,e,t){const r=n.Pa.shift(),s=Cc.from(r,e,t);await Uf(n,()=>n.remoteSyncer.applySuccessfulWrite(s)),await To(n)}async function E0(n,e){e&&Tn(n).Z_&&await async function(r,s){if(function(a){return nv(a)&&a!==k.ABORTED}(s.code)){const i=r.Pa.shift();Tn(r).N_(),await Uf(r,()=>r.remoteSyncer.rejectFailedWrite(i.batchId,s)),await To(r)}}(n,e),$f(n)&&Bf(n)}async function mh(n,e){const t=W(n);t.asyncQueue.verifyOperationInProgress(),L(Qn,"RemoteStore received new credentials");const r=Zn(t);t.Ia.add(3),await $s(t),r&&t.Aa.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.Ia.delete(3),await wo(t)}async function w0(n,e){const t=W(n);e?(t.Ia.delete(2),await wo(t)):e||(t.Ia.add(2),await $s(t),t.Aa.set("Unknown"))}function jr(n){return n.Va||(n.Va=function(t,r,s){const i=W(t);return i.ia(),new i0(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(n.datastore,n.asyncQueue,{Zo:h0.bind(null,n),e_:d0.bind(null,n),n_:f0.bind(null,n),J_:p0.bind(null,n)}),n.da.push(async e=>{e?(n.Va.N_(),$c(n)?Uc(n):n.Aa.set("Unknown")):(await n.Va.stop(),Ff(n))})),n.Va}function Tn(n){return n.ma||(n.ma=function(t,r,s){const i=W(t);return i.ia(),new o0(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(n.datastore,n.asyncQueue,{Zo:()=>Promise.resolve(),e_:_0.bind(null,n),n_:E0.bind(null,n),ea:y0.bind(null,n),ta:v0.bind(null,n)}),n.da.push(async e=>{e?(n.ma.N_(),await To(n)):(await n.ma.stop(),n.Pa.length>0&&(L(Qn,`Stopping write stream with ${n.Pa.length} pending writes`),n.Pa=[]))})),n.ma}/**
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
 */class Bc{constructor(e,t,r,s,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new un,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(a=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,s,i){const a=Date.now()+r,c=new Bc(e,t,a,s,i);return c.start(r),c}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new M(k.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function jc(n,e){if(qt("AsyncQueue",`${e}: ${n}`),$r(n))return new M(k.UNAVAILABLE,`${e}: ${n}`);throw n}/**
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
 */class yr{static emptySet(e){return new yr(e.comparator)}constructor(e){this.comparator=e?(t,r)=>e(t,r)||$.comparator(t.key,r.key):(t,r)=>$.comparator(t.key,r.key),this.keyedMap=ls(),this.sortedSet=new Ie(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,r)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof yr)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const r=new yr;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}}/**
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
 */class gh{constructor(){this.fa=new Ie($.comparator)}track(e){const t=e.doc.key,r=this.fa.get(t);r?e.type!==0&&r.type===3?this.fa=this.fa.insert(t,e):e.type===3&&r.type!==1?this.fa=this.fa.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.fa=this.fa.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.fa=this.fa.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.fa=this.fa.remove(t):e.type===1&&r.type===2?this.fa=this.fa.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.fa=this.fa.insert(t,{type:2,doc:e.doc}):q(63341,{At:e,ga:r}):this.fa=this.fa.insert(t,e)}pa(){const e=[];return this.fa.inorderTraversal((t,r)=>{e.push(r)}),e}}class Vr{constructor(e,t,r,s,i,a,c,u,h){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=a,this.syncStateChanged=c,this.excludesMetadataChanges=u,this.hasCachedResults=h}static fromInitialDocuments(e,t,r,s,i){const a=[];return t.forEach(c=>{a.push({type:0,doc:c})}),new Vr(e,t,yr.emptySet(t),a,r,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&mo(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let s=0;s<t.length;s++)if(t[s].type!==r[s].type||!t[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
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
 */class T0{constructor(){this.ya=void 0,this.wa=[]}Sa(){return this.wa.some(e=>e.ba())}}class I0{constructor(){this.queries=_h(),this.onlineState="Unknown",this.Da=new Set}terminate(){(function(t,r){const s=W(t),i=s.queries;s.queries=_h(),i.forEach((a,c)=>{for(const u of c.wa)u.onError(r)})})(this,new M(k.ABORTED,"Firestore shutting down"))}}function _h(){return new Yn(n=>af(n),mo)}async function jf(n,e){const t=W(n);let r=3;const s=e.query;let i=t.queries.get(s);i?!i.Sa()&&e.ba()&&(r=2):(i=new T0,r=e.ba()?0:1);try{switch(r){case 0:i.ya=await t.onListen(s,!0);break;case 1:i.ya=await t.onListen(s,!1);break;case 2:await t.onFirstRemoteStoreListen(s)}}catch(a){const c=jc(a,`Initialization of query '${hr(e.query)}' failed`);return void e.onError(c)}t.queries.set(s,i),i.wa.push(e),e.va(t.onlineState),i.ya&&e.Ca(i.ya)&&qc(t)}async function qf(n,e){const t=W(n),r=e.query;let s=3;const i=t.queries.get(r);if(i){const a=i.wa.indexOf(e);a>=0&&(i.wa.splice(a,1),i.wa.length===0?s=e.ba()?0:1:!i.Sa()&&e.ba()&&(s=2))}switch(s){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function b0(n,e){const t=W(n);let r=!1;for(const s of e){const i=s.query,a=t.queries.get(i);if(a){for(const c of a.wa)c.Ca(s)&&(r=!0);a.ya=s}}r&&qc(t)}function A0(n,e,t){const r=W(n),s=r.queries.get(e);if(s)for(const i of s.wa)i.onError(t);r.queries.delete(e)}function qc(n){n.Da.forEach(e=>{e.next()})}var Xa,yh;(yh=Xa||(Xa={})).Fa="default",yh.Cache="cache";class zf{constructor(e,t,r){this.query=e,this.Ma=t,this.xa=!1,this.Oa=null,this.onlineState="Unknown",this.options=r||{}}Ca(e){if(!this.options.includeMetadataChanges){const r=[];for(const s of e.docChanges)s.type!==3&&r.push(s);e=new Vr(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.xa?this.Na(e)&&(this.Ma.next(e),t=!0):this.Ba(e,this.onlineState)&&(this.La(e),t=!0),this.Oa=e,t}onError(e){this.Ma.error(e)}va(e){this.onlineState=e;let t=!1;return this.Oa&&!this.xa&&this.Ba(this.Oa,e)&&(this.La(this.Oa),t=!0),t}Ba(e,t){if(!e.fromCache||!this.ba())return!0;const r=t!=="Offline";return(!this.options.ka||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}Na(e){if(e.docChanges.length>0)return!0;const t=this.Oa&&this.Oa.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}La(e){e=Vr.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.xa=!0,this.Ma.next(e)}ba(){return this.options.source!==Xa.Cache}}/**
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
 */class Hf{constructor(e){this.key=e}}class Gf{constructor(e){this.key=e}}class S0{constructor(e,t){this.query=e,this.Ha=t,this.Ya=null,this.hasCachedResults=!1,this.current=!1,this.Za=Z(),this.mutatedKeys=Z(),this.Xa=cf(e),this.eu=new yr(this.Xa)}get tu(){return this.Ha}nu(e,t){const r=t?t.ru:new gh,s=t?t.eu:this.eu;let i=t?t.mutatedKeys:this.mutatedKeys,a=s,c=!1;const u=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,h=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal((f,m)=>{const g=s.get(f),S=go(this.query,m)?m:null,P=!!g&&this.mutatedKeys.has(g.key),x=!!S&&(S.hasLocalMutations||this.mutatedKeys.has(S.key)&&S.hasCommittedMutations);let N=!1;g&&S?g.data.isEqual(S.data)?P!==x&&(r.track({type:3,doc:S}),N=!0):this.iu(g,S)||(r.track({type:2,doc:S}),N=!0,(u&&this.Xa(S,u)>0||h&&this.Xa(S,h)<0)&&(c=!0)):!g&&S?(r.track({type:0,doc:S}),N=!0):g&&!S&&(r.track({type:1,doc:g}),N=!0,(u||h)&&(c=!0)),N&&(S?(a=a.add(S),i=x?i.add(f):i.delete(f)):(a=a.delete(f),i=i.delete(f)))}),this.query.limit!==null)for(;a.size>this.query.limit;){const f=this.query.limitType==="F"?a.last():a.first();a=a.delete(f.key),i=i.delete(f.key),r.track({type:1,doc:f})}return{eu:a,ru:r,Ds:c,mutatedKeys:i}}iu(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,s){const i=this.eu;this.eu=e.eu,this.mutatedKeys=e.mutatedKeys;const a=e.ru.pa();a.sort((f,m)=>function(S,P){const x=N=>{switch(N){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return q(20277,{At:N})}};return x(S)-x(P)}(f.type,m.type)||this.Xa(f.doc,m.doc)),this.su(r),s=s!=null&&s;const c=t&&!s?this.ou():[],u=this.Za.size===0&&this.current&&!s?1:0,h=u!==this.Ya;return this.Ya=u,a.length!==0||h?{snapshot:new Vr(this.query,e.eu,i,a,e.mutatedKeys,u===0,h,!1,!!r&&r.resumeToken.approximateByteSize()>0),_u:c}:{_u:c}}va(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({eu:this.eu,ru:new gh,mutatedKeys:this.mutatedKeys,Ds:!1},!1)):{_u:[]}}au(e){return!this.Ha.has(e)&&!!this.eu.has(e)&&!this.eu.get(e).hasLocalMutations}su(e){e&&(e.addedDocuments.forEach(t=>this.Ha=this.Ha.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.Ha=this.Ha.delete(t)),this.current=e.current)}ou(){if(!this.current)return[];const e=this.Za;this.Za=Z(),this.eu.forEach(r=>{this.au(r.key)&&(this.Za=this.Za.add(r.key))});const t=[];return e.forEach(r=>{this.Za.has(r)||t.push(new Gf(r))}),this.Za.forEach(r=>{e.has(r)||t.push(new Hf(r))}),t}uu(e){this.Ha=e.qs,this.Za=Z();const t=this.nu(e.documents);return this.applyChanges(t,!0)}cu(){return Vr.fromInitialDocuments(this.query,this.eu,this.mutatedKeys,this.Ya===0,this.hasCachedResults)}}const zc="SyncEngine";class R0{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class k0{constructor(e){this.key=e,this.lu=!1}}class P0{constructor(e,t,r,s,i,a){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=a,this.hu={},this.Pu=new Yn(c=>af(c),mo),this.Tu=new Map,this.Iu=new Set,this.du=new Ie($.comparator),this.Eu=new Map,this.Au=new Dc,this.Ru={},this.Vu=new Map,this.mu=Cr.ur(),this.onlineState="Unknown",this.fu=void 0}get isPrimaryClient(){return this.fu===!0}}async function C0(n,e,t=!0){const r=Yf(n);let s;const i=r.Pu.get(e);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.cu()):s=await Wf(r,e,t,!0),s}async function V0(n,e){const t=Yf(n);await Wf(t,e,!0,!1)}async function Wf(n,e,t,r){const s=await Xv(n.localStore,bt(e)),i=s.targetId,a=n.sharedClientState.addLocalQueryTarget(i,t);let c;return r&&(c=await N0(n,e,i,a==="current",s.resumeToken)),n.isPrimaryClient&&t&&Mf(n.remoteStore,s),c}async function N0(n,e,t,r,s){n.gu=(m,g,S)=>async function(x,N,K,z){let J=N.view.nu(K);J.Ds&&(J=await uh(x.localStore,N.query,!1).then(({documents:w})=>N.view.nu(w,J)));const fe=z&&z.targetChanges.get(N.targetId),tt=z&&z.targetMismatches.get(N.targetId)!=null,ye=N.view.applyChanges(J,x.isPrimaryClient,fe,tt);return Eh(x,N.targetId,ye._u),ye.snapshot}(n,m,g,S);const i=await uh(n.localStore,e,!0),a=new S0(e,i.qs),c=a.nu(i.documents),u=Us.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",s),h=a.applyChanges(c,n.isPrimaryClient,u);Eh(n,t,h._u);const f=new R0(e,t,a);return n.Pu.set(e,f),n.Tu.has(t)?n.Tu.get(t).push(e):n.Tu.set(t,[e]),h.snapshot}async function D0(n,e,t){const r=W(n),s=r.Pu.get(e),i=r.Tu.get(s.targetId);if(i.length>1)return r.Tu.set(s.targetId,i.filter(a=>!mo(a,e))),void r.Pu.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await Qa(r.localStore,s.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(s.targetId),t&&Lc(r.remoteStore,s.targetId),Ya(r,s.targetId)}).catch(Ur)):(Ya(r,s.targetId),await Qa(r.localStore,s.targetId,!0))}async function x0(n,e){const t=W(n),r=t.Pu.get(e),s=t.Tu.get(r.targetId);t.isPrimaryClient&&s.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),Lc(t.remoteStore,r.targetId))}async function O0(n,e,t){const r=j0(n);try{const s=await function(a,c){const u=W(a),h=ge.now(),f=c.reduce((S,P)=>S.add(P.key),Z());let m,g;return u.persistence.runTransaction("Locally write mutations","readwrite",S=>{let P=zt(),x=Z();return u.Os.getEntries(S,f).next(N=>{P=N,P.forEach((K,z)=>{z.isValidDocument()||(x=x.add(K))})}).next(()=>u.localDocuments.getOverlayedDocuments(S,P)).next(N=>{m=N;const K=[];for(const z of c){const J=Xy(z,m.get(z.key).overlayedDocument);J!=null&&K.push(new Sn(z.key,J,Yd(J.value.mapValue),gt.exists(!0)))}return u.mutationQueue.addMutationBatch(S,h,K,c)}).next(N=>{g=N;const K=N.applyToLocalDocumentSet(m,x);return u.documentOverlayCache.saveOverlays(S,N.batchId,K)})}).then(()=>({batchId:g.batchId,changes:uf(m)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(s.batchId),function(a,c,u){let h=a.Ru[a.currentUser.toKey()];h||(h=new Ie(Q)),h=h.insert(c,u),a.Ru[a.currentUser.toKey()]=h}(r,s.batchId,t),await Bs(r,s.changes),await To(r.remoteStore)}catch(s){const i=jc(s,"Failed to persist write");t.reject(i)}}async function Kf(n,e){const t=W(n);try{const r=await Kv(t.localStore,e);e.targetChanges.forEach((s,i)=>{const a=t.Eu.get(i);a&&(ie(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?a.lu=!0:s.modifiedDocuments.size>0?ie(a.lu,14607):s.removedDocuments.size>0&&(ie(a.lu,42227),a.lu=!1))}),await Bs(t,r,e)}catch(r){await Ur(r)}}function vh(n,e,t){const r=W(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){const s=[];r.Pu.forEach((i,a)=>{const c=a.view.va(e);c.snapshot&&s.push(c.snapshot)}),function(a,c){const u=W(a);u.onlineState=c;let h=!1;u.queries.forEach((f,m)=>{for(const g of m.wa)g.va(c)&&(h=!0)}),h&&qc(u)}(r.eventManager,e),s.length&&r.hu.J_(s),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function M0(n,e,t){const r=W(n);r.sharedClientState.updateQueryState(e,"rejected",t);const s=r.Eu.get(e),i=s&&s.key;if(i){let a=new Ie($.comparator);a=a.insert(i,Qe.newNoDocument(i,G.min()));const c=Z().add(i),u=new vo(G.min(),new Map,new Ie(Q),a,c);await Kf(r,u),r.du=r.du.remove(i),r.Eu.delete(e),Hc(r)}else await Qa(r.localStore,e,!1).then(()=>Ya(r,e,t)).catch(Ur)}async function L0(n,e){const t=W(n),r=e.batch.batchId;try{const s=await Wv(t.localStore,e);Jf(t,r,null),Qf(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await Bs(t,s)}catch(s){await Ur(s)}}async function F0(n,e,t){const r=W(n);try{const s=await function(a,c){const u=W(a);return u.persistence.runTransaction("Reject batch","readwrite-primary",h=>{let f;return u.mutationQueue.lookupMutationBatch(h,c).next(m=>(ie(m!==null,37113),f=m.keys(),u.mutationQueue.removeMutationBatch(h,m))).next(()=>u.mutationQueue.performConsistencyCheck(h)).next(()=>u.documentOverlayCache.removeOverlaysForBatchId(h,f,c)).next(()=>u.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(h,f)).next(()=>u.localDocuments.getDocuments(h,f))})}(r.localStore,e);Jf(r,e,t),Qf(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await Bs(r,s)}catch(s){await Ur(s)}}function Qf(n,e){(n.Vu.get(e)||[]).forEach(t=>{t.resolve()}),n.Vu.delete(e)}function Jf(n,e,t){const r=W(n);let s=r.Ru[r.currentUser.toKey()];if(s){const i=s.get(e);i&&(t?i.reject(t):i.resolve(),s=s.remove(e)),r.Ru[r.currentUser.toKey()]=s}}function Ya(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const r of n.Tu.get(e))n.Pu.delete(r),t&&n.hu.pu(r,t);n.Tu.delete(e),n.isPrimaryClient&&n.Au.zr(e).forEach(r=>{n.Au.containsKey(r)||Xf(n,r)})}function Xf(n,e){n.Iu.delete(e.path.canonicalString());const t=n.du.get(e);t!==null&&(Lc(n.remoteStore,t),n.du=n.du.remove(e),n.Eu.delete(t),Hc(n))}function Eh(n,e,t){for(const r of t)r instanceof Hf?(n.Au.addReference(r.key,e),U0(n,r)):r instanceof Gf?(L(zc,"Document no longer in limbo: "+r.key),n.Au.removeReference(r.key,e),n.Au.containsKey(r.key)||Xf(n,r.key)):q(19791,{yu:r})}function U0(n,e){const t=e.key,r=t.path.canonicalString();n.du.get(t)||n.Iu.has(r)||(L(zc,"New document in limbo: "+t),n.Iu.add(r),Hc(n))}function Hc(n){for(;n.Iu.size>0&&n.du.size<n.maxConcurrentLimboResolutions;){const e=n.Iu.values().next().value;n.Iu.delete(e);const t=new $(de.fromString(e)),r=n.mu.next();n.Eu.set(r,new k0(t)),n.du=n.du.insert(t,r),Mf(n.remoteStore,new rn(bt(po(t.path)),r,"TargetPurposeLimboResolution",uo.ue))}}async function Bs(n,e,t){const r=W(n),s=[],i=[],a=[];r.Pu.isEmpty()||(r.Pu.forEach((c,u)=>{a.push(r.gu(u,e,t).then(h=>{var f;if((h||t)&&r.isPrimaryClient){const m=h?!h.fromCache:(f=t==null?void 0:t.targetChanges.get(u.targetId))===null||f===void 0?void 0:f.current;r.sharedClientState.updateQueryState(u.targetId,m?"current":"not-current")}if(h){s.push(h);const m=Oc.Es(u.targetId,h);i.push(m)}}))}),await Promise.all(a),r.hu.J_(s),await async function(u,h){const f=W(u);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",m=>C.forEach(h,g=>C.forEach(g.Is,S=>f.persistence.referenceDelegate.addReference(m,g.targetId,S)).next(()=>C.forEach(g.ds,S=>f.persistence.referenceDelegate.removeReference(m,g.targetId,S)))))}catch(m){if(!$r(m))throw m;L(Mc,"Failed to update sequence numbers: "+m)}for(const m of h){const g=m.targetId;if(!m.fromCache){const S=f.Fs.get(g),P=S.snapshotVersion,x=S.withLastLimboFreeSnapshotVersion(P);f.Fs=f.Fs.insert(g,x)}}}(r.localStore,i))}async function $0(n,e){const t=W(n);if(!t.currentUser.isEqual(e)){L(zc,"User change. New user:",e.toKey());const r=await Nf(t.localStore,e);t.currentUser=e,function(i,a){i.Vu.forEach(c=>{c.forEach(u=>{u.reject(new M(k.CANCELLED,a))})}),i.Vu.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await Bs(t,r.Bs)}}function B0(n,e){const t=W(n),r=t.Eu.get(e);if(r&&r.lu)return Z().add(r.key);{let s=Z();const i=t.Tu.get(e);if(!i)return s;for(const a of i){const c=t.Pu.get(a);s=s.unionWith(c.view.tu)}return s}}function Yf(n){const e=W(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=Kf.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=B0.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=M0.bind(null,e),e.hu.J_=b0.bind(null,e.eventManager),e.hu.pu=A0.bind(null,e.eventManager),e}function j0(n){const e=W(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=L0.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=F0.bind(null,e),e}class Ji{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Eo(e.databaseInfo.databaseId),this.sharedClientState=this.bu(e),this.persistence=this.Du(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Cu(e,this.localStore),this.indexBackfillerScheduler=this.Fu(e,this.localStore)}Cu(e,t){return null}Fu(e,t){return null}vu(e){return Gv(this.persistence,new qv,e.initialUser,this.serializer)}Du(e){return new Vf(xc.Vi,this.serializer)}bu(e){return new Zv}async terminate(){var e,t;(e=this.gcScheduler)===null||e===void 0||e.stop(),(t=this.indexBackfillerScheduler)===null||t===void 0||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Ji.provider={build:()=>new Ji};class q0 extends Ji{constructor(e){super(),this.cacheSizeBytes=e}Cu(e,t){ie(this.persistence.referenceDelegate instanceof Ki,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new kv(r,e.asyncQueue,t)}Du(e){const t=this.cacheSizeBytes!==void 0?nt.withCacheSize(this.cacheSizeBytes):nt.DEFAULT;return new Vf(r=>Ki.Vi(r,t),this.serializer)}}class Za{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>vh(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=$0.bind(null,this.syncEngine),await w0(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new I0}()}createDatastore(e){const t=Eo(e.databaseInfo.databaseId),r=function(i){return new s0(i)}(e.databaseInfo);return function(i,a,c,u){return new c0(i,a,c,u)}(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return function(r,s,i,a,c){return new u0(r,s,i,a,c)}(this.localStore,this.datastore,e.asyncQueue,t=>vh(this.syncEngine,t,0),function(){return fh.C()?new fh:new e0}())}createSyncEngine(e,t){return function(s,i,a,c,u,h,f){const m=new P0(s,i,a,c,u,h);return f&&(m.fu=!0),m}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(s){const i=W(s);L(Qn,"RemoteStore shutting down."),i.Ia.add(5),await $s(i),i.Ea.shutdown(),i.Aa.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(t=this.eventManager)===null||t===void 0||t.terminate()}}Za.provider={build:()=>new Za};/**
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
 */class Zf{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.xu(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.xu(this.observer.error,e):qt("Uncaught Error in snapshot listener:",e.toString()))}Ou(){this.muted=!0}xu(e,t){setTimeout(()=>{this.muted||e(t)},0)}}/**
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
 */const In="FirestoreClient";class z0{constructor(e,t,r,s,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this.databaseInfo=s,this.user=Ke.UNAUTHENTICATED,this.clientId=Ic.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(r,async a=>{L(In,"Received user=",a.uid),await this.authCredentialListener(a),this.user=a}),this.appCheckCredentials.start(r,a=>(L(In,"Received new app check token=",a),this.appCheckCredentialListener(a,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new un;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=jc(t,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function _a(n,e){n.asyncQueue.verifyOperationInProgress(),L(In,"Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener(async s=>{r.isEqual(s)||(await Nf(e.localStore,s),r=s)}),e.persistence.setDatabaseDeletedListener(()=>{_n("Terminating Firestore due to IndexedDb database deletion"),n.terminate().then(()=>{L("Terminating Firestore due to IndexedDb database deletion completed successfully")}).catch(s=>{_n("Terminating Firestore due to IndexedDb database deletion failed",s)})}),n._offlineComponents=e}async function wh(n,e){n.asyncQueue.verifyOperationInProgress();const t=await H0(n);L(In,"Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener(r=>mh(e.remoteStore,r)),n.setAppCheckTokenChangeListener((r,s)=>mh(e.remoteStore,s)),n._onlineComponents=e}async function H0(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){L(In,"Using user provided OfflineComponentProvider");try{await _a(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!function(s){return s.name==="FirebaseError"?s.code===k.FAILED_PRECONDITION||s.code===k.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11}(t))throw t;_n("Error using user provided cache. Falling back to memory cache: "+t),await _a(n,new Ji)}}else L(In,"Using default OfflineComponentProvider"),await _a(n,new q0(void 0));return n._offlineComponents}async function ep(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(L(In,"Using user provided OnlineComponentProvider"),await wh(n,n._uninitializedComponentsProvider._online)):(L(In,"Using default OnlineComponentProvider"),await wh(n,new Za))),n._onlineComponents}function G0(n){return ep(n).then(e=>e.syncEngine)}async function ec(n){const e=await ep(n),t=e.eventManager;return t.onListen=C0.bind(null,e.syncEngine),t.onUnlisten=D0.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=V0.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=x0.bind(null,e.syncEngine),t}function W0(n,e,t={}){const r=new un;return n.asyncQueue.enqueueAndForget(async()=>function(i,a,c,u,h){const f=new Zf({next:g=>{f.Ou(),a.enqueueAndForget(()=>qf(i,m));const S=g.docs.has(c);!S&&g.fromCache?h.reject(new M(k.UNAVAILABLE,"Failed to get document because the client is offline.")):S&&g.fromCache&&u&&u.source==="server"?h.reject(new M(k.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):h.resolve(g)},error:g=>h.reject(g)}),m=new zf(po(c.path),f,{includeMetadataChanges:!0,ka:!0});return jf(i,m)}(await ec(n),n.asyncQueue,e,t,r)),r.promise}/**
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
 */const Th=new Map;/**
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
 */const np="firestore.googleapis.com",Ih=!0;class bh{constructor(e){var t,r;if(e.host===void 0){if(e.ssl!==void 0)throw new M(k.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=np,this.ssl=Ih}else this.host=e.host,this.ssl=(t=e.ssl)!==null&&t!==void 0?t:Ih;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=Cf;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<Sv)throw new M(k.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}uy("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=tp((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(i){if(i.timeoutSeconds!==void 0){if(isNaN(i.timeoutSeconds))throw new M(k.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (must not be NaN)`);if(i.timeoutSeconds<5)throw new M(k.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (minimum allowed value is 5)`);if(i.timeoutSeconds>30)throw new M(k.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,s){return r.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Io{constructor(e,t,r,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new bh({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new M(k.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new M(k.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new bh(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new ty;switch(r.type){case"firstParty":return new iy(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new M(k.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const r=Th.get(t);r&&(L("ComponentProvider","Removing Datastore"),Th.delete(t),r.terminate())}(this),Promise.resolve()}}function K0(n,e,t,r={}){var s;n=mt(n,Io);const i=Mr(e),a=n._getSettings(),c=Object.assign(Object.assign({},a),{emulatorOptions:n._getEmulatorOptions()}),u=`${e}:${t}`;i&&(bd(`https://${u}`),Ad("Firestore",!0)),a.host!==np&&a.host!==u&&_n("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const h=Object.assign(Object.assign({},a),{host:u,ssl:i,emulatorOptions:r});if(!Gn(h,c)&&(n._setSettings(h),r.mockUserToken)){let f,m;if(typeof r.mockUserToken=="string")f=r.mockUserToken,m=Ke.MOCK_USER;else{f=kg(r.mockUserToken,(s=n._app)===null||s===void 0?void 0:s.options.projectId);const g=r.mockUserToken.sub||r.mockUserToken.user_id;if(!g)throw new M(k.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");m=new Ke(g)}n._authCredentials=new ny(new Ud(f,m))}}/**
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
 */class er{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new er(this.firestore,e,this._query)}}class Se{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new hn(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new Se(this.firestore,e,this._key)}toJSON(){return{type:Se._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,r){if(Ls(t,Se._jsonSchema))return new Se(e,r||null,new $(de.fromString(t.referencePath)))}}Se._jsonSchemaVersion="firestore/documentReference/1.0",Se._jsonSchema={type:Ce("string",Se._jsonSchemaVersion),referencePath:Ce("string")};class hn extends er{constructor(e,t,r){super(e,t,po(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new Se(this.firestore,null,new $(e))}withConverter(e){return new hn(this.firestore,e,this._path)}}function ya(n,e,...t){if(n=Ue(n),Bd("collection","path",e),n instanceof Io){const r=de.fromString(e,...t);return Lu(r),new hn(n,null,r)}{if(!(n instanceof Se||n instanceof hn))throw new M(k.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(de.fromString(e,...t));return Lu(r),new hn(n.firestore,null,r)}}function Mn(n,e,...t){if(n=Ue(n),arguments.length===1&&(e=Ic.newId()),Bd("doc","path",e),n instanceof Io){const r=de.fromString(e,...t);return Mu(r),new Se(n,null,new $(r))}{if(!(n instanceof Se||n instanceof hn))throw new M(k.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(de.fromString(e,...t));return Mu(r),new Se(n.firestore,n instanceof hn?n.converter:null,new $(r))}}/**
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
 */const Ah="AsyncQueue";class Sh{constructor(e=Promise.resolve()){this.Zu=[],this.Xu=!1,this.ec=[],this.tc=null,this.nc=!1,this.rc=!1,this.sc=[],this.F_=new xf(this,"async_queue_retry"),this.oc=()=>{const r=ga();r&&L(Ah,"Visibility state changed to "+r.visibilityState),this.F_.y_()},this._c=e;const t=ga();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.oc)}get isShuttingDown(){return this.Xu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.ac(),this.uc(e)}enterRestrictedMode(e){if(!this.Xu){this.Xu=!0,this.rc=e||!1;const t=ga();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.oc)}}enqueue(e){if(this.ac(),this.Xu)return new Promise(()=>{});const t=new un;return this.uc(()=>this.Xu&&this.rc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Zu.push(e),this.cc()))}async cc(){if(this.Zu.length!==0){try{await this.Zu[0](),this.Zu.shift(),this.F_.reset()}catch(e){if(!$r(e))throw e;L(Ah,"Operation failed with retryable error: "+e)}this.Zu.length>0&&this.F_.g_(()=>this.cc())}}uc(e){const t=this._c.then(()=>(this.nc=!0,e().catch(r=>{throw this.tc=r,this.nc=!1,qt("INTERNAL UNHANDLED ERROR: ",Rh(r)),r}).then(r=>(this.nc=!1,r))));return this._c=t,t}enqueueAfterDelay(e,t,r){this.ac(),this.sc.indexOf(e)>-1&&(t=0);const s=Bc.createAndSchedule(this,e,t,r,i=>this.lc(i));return this.ec.push(s),s}ac(){this.tc&&q(47125,{hc:Rh(this.tc)})}verifyOperationInProgress(){}async Pc(){let e;do e=this._c,await e;while(e!==this._c)}Tc(e){for(const t of this.ec)if(t.timerId===e)return!0;return!1}Ic(e){return this.Pc().then(()=>{this.ec.sort((t,r)=>t.targetTimeMs-r.targetTimeMs);for(const t of this.ec)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Pc()})}dc(e){this.sc.push(e)}lc(e){const t=this.ec.indexOf(e);this.ec.splice(t,1)}}function Rh(n){let e=n.message||"";return n.stack&&(e=n.stack.includes(n.message)?n.stack:n.message+`
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
 */function kh(n){return function(t,r){if(typeof t!="object"||t===null)return!1;const s=t;for(const i of r)if(i in s&&typeof s[i]=="function")return!0;return!1}(n,["next","error","complete"])}class Jn extends Io{constructor(e,t,r,s){super(e,t,r,s),this.type="firestore",this._queue=new Sh,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Sh(e),this._firestoreClient=void 0,await e}}}function Q0(n,e){const t=typeof n=="object"?n:Pd(),r=typeof n=="string"?n:qi,s=wc(t,"firestore").getImmediate({identifier:r});if(!s._initialized){const i=Sg("firestore");i&&K0(s,...i)}return s}function Gc(n){if(n._terminated)throw new M(k.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||J0(n),n._firestoreClient}function J0(n){var e,t,r;const s=n._freezeSettings(),i=function(c,u,h,f){return new wy(c,u,h,f.host,f.ssl,f.experimentalForceLongPolling,f.experimentalAutoDetectLongPolling,tp(f.experimentalLongPollingOptions),f.useFetchStreams,f.isUsingEmulator)}(n._databaseId,((e=n._app)===null||e===void 0?void 0:e.options.appId)||"",n._persistenceKey,s);n._componentsProvider||!((t=s.localCache)===null||t===void 0)&&t._offlineComponentProvider&&(!((r=s.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(n._componentsProvider={_offline:s.localCache._offlineComponentProvider,_online:s.localCache._onlineComponentProvider}),n._firestoreClient=new z0(n._authCredentials,n._appCheckCredentials,n._queue,i,n._componentsProvider&&function(c){const u=c==null?void 0:c._online.build();return{_offline:c==null?void 0:c._offline.build(u),_online:u}}(n._componentsProvider))}/**
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
 */class lt{constructor(e){this._byteString=e}static fromBase64String(e){try{return new lt($e.fromBase64String(e))}catch(t){throw new M(k.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new lt($e.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:lt._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(Ls(e,lt._jsonSchema))return lt.fromBase64String(e.bytes)}}lt._jsonSchemaVersion="firestore/bytes/1.0",lt._jsonSchema={type:Ce("string",lt._jsonSchemaVersion),bytes:Ce("string")};/**
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
 */class bo{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new M(k.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Le(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
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
 */class Ao{constructor(e){this._methodName=e}}/**
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
 */class St{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new M(k.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new M(k.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return Q(this._lat,e._lat)||Q(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:St._jsonSchemaVersion}}static fromJSON(e){if(Ls(e,St._jsonSchema))return new St(e.latitude,e.longitude)}}St._jsonSchemaVersion="firestore/geoPoint/1.0",St._jsonSchema={type:Ce("string",St._jsonSchemaVersion),latitude:Ce("number"),longitude:Ce("number")};/**
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
 */class Rt{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,s){if(r.length!==s.length)return!1;for(let i=0;i<r.length;++i)if(r[i]!==s[i])return!1;return!0}(this._values,e._values)}toJSON(){return{type:Rt._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(Ls(e,Rt._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(t=>typeof t=="number"))return new Rt(e.vectorValues);throw new M(k.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}Rt._jsonSchemaVersion="firestore/vectorValue/1.0",Rt._jsonSchema={type:Ce("string",Rt._jsonSchemaVersion),vectorValues:Ce("object")};/**
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
 */const X0=/^__.*__$/;class Y0{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new Sn(e,this.data,this.fieldMask,t,this.fieldTransforms):new Fs(e,this.data,t,this.fieldTransforms)}}class rp{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return new Sn(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function sp(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw q(40011,{Ec:n})}}class Wc{constructor(e,t,r,s,i,a){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=s,i===void 0&&this.Ac(),this.fieldTransforms=i||[],this.fieldMask=a||[]}get path(){return this.settings.path}get Ec(){return this.settings.Ec}Rc(e){return new Wc(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Vc(e){var t;const r=(t=this.path)===null||t===void 0?void 0:t.child(e),s=this.Rc({path:r,mc:!1});return s.fc(e),s}gc(e){var t;const r=(t=this.path)===null||t===void 0?void 0:t.child(e),s=this.Rc({path:r,mc:!1});return s.Ac(),s}yc(e){return this.Rc({path:void 0,mc:!0})}wc(e){return Xi(e,this.settings.methodName,this.settings.Sc||!1,this.path,this.settings.bc)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}Ac(){if(this.path)for(let e=0;e<this.path.length;e++)this.fc(this.path.get(e))}fc(e){if(e.length===0)throw this.wc("Document fields must not be empty");if(sp(this.Ec)&&X0.test(e))throw this.wc('Document fields cannot begin and end with "__"')}}class Z0{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||Eo(e)}Dc(e,t,r,s=!1){return new Wc({Ec:e,methodName:t,bc:r,path:Le.emptyPath(),mc:!1,Sc:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function So(n){const e=n._freezeSettings(),t=Eo(n._databaseId);return new Z0(n._databaseId,!!e.ignoreUndefinedProperties,t)}function ip(n,e,t,r,s,i={}){const a=n.Dc(i.merge||i.mergeFields?2:0,e,t,s);Qc("Data must be an object, but it was:",a,r);const c=op(r,a);let u,h;if(i.merge)u=new ot(a.fieldMask),h=a.fieldTransforms;else if(i.mergeFields){const f=[];for(const m of i.mergeFields){const g=tc(e,m,t);if(!a.contains(g))throw new M(k.INVALID_ARGUMENT,`Field '${g}' is specified in your field mask but missing from your input data.`);cp(f,g)||f.push(g)}u=new ot(f),h=a.fieldTransforms.filter(m=>u.covers(m.field))}else u=null,h=a.fieldTransforms;return new Y0(new rt(c),u,h)}class Ro extends Ao{_toFieldTransform(e){if(e.Ec!==2)throw e.Ec===1?e.wc(`${this._methodName}() can only appear at the top level of your update data`):e.wc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof Ro}}class Kc extends Ao{_toFieldTransform(e){return new Wy(e.path,new ks)}isEqual(e){return e instanceof Kc}}function eE(n,e,t,r){const s=n.Dc(1,e,t);Qc("Data must be an object, but it was:",s,r);const i=[],a=rt.empty();An(r,(u,h)=>{const f=Jc(e,u,t);h=Ue(h);const m=s.gc(f);if(h instanceof Ro)i.push(f);else{const g=js(h,m);g!=null&&(i.push(f),a.set(f,g))}});const c=new ot(i);return new rp(a,c,s.fieldTransforms)}function tE(n,e,t,r,s,i){const a=n.Dc(1,e,t),c=[tc(e,r,t)],u=[s];if(i.length%2!=0)throw new M(k.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let g=0;g<i.length;g+=2)c.push(tc(e,i[g])),u.push(i[g+1]);const h=[],f=rt.empty();for(let g=c.length-1;g>=0;--g)if(!cp(h,c[g])){const S=c[g];let P=u[g];P=Ue(P);const x=a.gc(S);if(P instanceof Ro)h.push(S);else{const N=js(P,x);N!=null&&(h.push(S),f.set(S,N))}}const m=new ot(h);return new rp(f,m,a.fieldTransforms)}function nE(n,e,t,r=!1){return js(t,n.Dc(r?4:3,e))}function js(n,e){if(ap(n=Ue(n)))return Qc("Unsupported field value:",e,n),op(n,e);if(n instanceof Ao)return function(r,s){if(!sp(s.Ec))throw s.wc(`${r._methodName}() can only be used with update() and set()`);if(!s.path)throw s.wc(`${r._methodName}() is not currently supported inside arrays`);const i=r._toFieldTransform(s);i&&s.fieldTransforms.push(i)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.mc&&e.Ec!==4)throw e.wc("Nested arrays are not supported");return function(r,s){const i=[];let a=0;for(const c of r){let u=js(c,s.yc(a));u==null&&(u={nullValue:"NULL_VALUE"}),i.push(u),a++}return{arrayValue:{values:i}}}(n,e)}return function(r,s){if((r=Ue(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return zy(s.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const i=ge.fromDate(r);return{timestampValue:Wi(s.serializer,i)}}if(r instanceof ge){const i=new ge(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:Wi(s.serializer,i)}}if(r instanceof St)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof lt)return{bytesValue:If(s.serializer,r._byteString)};if(r instanceof Se){const i=s.databaseId,a=r.firestore._databaseId;if(!a.isEqual(i))throw s.wc(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:Nc(r.firestore._databaseId||s.databaseId,r._key.path)}}if(r instanceof Rt)return function(a,c){return{mapValue:{fields:{[Jd]:{stringValue:Xd},[zi]:{arrayValue:{values:a.toArray().map(h=>{if(typeof h!="number")throw c.wc("VectorValues must only contain numeric values.");return Pc(c.serializer,h)})}}}}}}(r,s);throw s.wc(`Unsupported field value: ${lo(r)}`)}(n,e)}function op(n,e){const t={};return zd(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):An(n,(r,s)=>{const i=js(s,e.Vc(r));i!=null&&(t[r]=i)}),{mapValue:{fields:t}}}function ap(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof ge||n instanceof St||n instanceof lt||n instanceof Se||n instanceof Ao||n instanceof Rt)}function Qc(n,e,t){if(!ap(t)||!jd(t)){const r=lo(t);throw r==="an object"?e.wc(n+" a custom object"):e.wc(n+" "+r)}}function tc(n,e,t){if((e=Ue(e))instanceof bo)return e._internalPath;if(typeof e=="string")return Jc(n,e);throw Xi("Field path arguments must be of type string or ",n,!1,void 0,t)}const rE=new RegExp("[~\\*/\\[\\]]");function Jc(n,e,t){if(e.search(rE)>=0)throw Xi(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new bo(...e.split("."))._internalPath}catch{throw Xi(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function Xi(n,e,t,r,s){const i=r&&!r.isEmpty(),a=s!==void 0;let c=`Function ${e}() called with invalid data`;t&&(c+=" (via `toFirestore()`)"),c+=". ";let u="";return(i||a)&&(u+=" (found",i&&(u+=` in field ${r}`),a&&(u+=` in document ${s}`),u+=")"),new M(k.INVALID_ARGUMENT,c+n+u)}function cp(n,e){return n.some(t=>t.isEqual(e))}/**
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
 */class lp{constructor(e,t,r,s,i){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new Se(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new sE(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(Xc("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class sE extends lp{data(){return super.data()}}function Xc(n,e){return typeof e=="string"?Jc(n,e):e instanceof bo?e._internalPath:e._delegate._internalPath}/**
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
 */function iE(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new M(k.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class Yc{}class up extends Yc{}function oE(n,e,...t){let r=[];e instanceof Yc&&r.push(e),r=r.concat(t),function(i){const a=i.filter(u=>u instanceof el).length,c=i.filter(u=>u instanceof Zc).length;if(a>1||a>0&&c>0)throw new M(k.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(const s of r)n=s._apply(n);return n}class Zc extends up{constructor(e,t,r){super(),this._field=e,this._op=t,this._value=r,this.type="where"}static _create(e,t,r){return new Zc(e,t,r)}_apply(e){const t=this._parse(e);return hp(e._query,t),new er(e.firestore,e.converter,qa(e._query,t))}_parse(e){const t=So(e.firestore);return function(i,a,c,u,h,f,m){let g;if(h.isKeyField()){if(f==="array-contains"||f==="array-contains-any")throw new M(k.INVALID_ARGUMENT,`Invalid Query. You can't perform '${f}' queries on documentId().`);if(f==="in"||f==="not-in"){Ch(m,f);const P=[];for(const x of m)P.push(Ph(u,i,x));g={arrayValue:{values:P}}}else g=Ph(u,i,m)}else f!=="in"&&f!=="not-in"&&f!=="array-contains-any"||Ch(m,f),g=nE(c,a,m,f==="in"||f==="not-in");return Pe.create(h,f,g)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}class el extends Yc{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new el(e,t)}_parse(e){const t=this._queryConstraints.map(r=>r._parse(e)).filter(r=>r.getFilters().length>0);return t.length===1?t[0]:yt.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:(function(s,i){let a=s;const c=i.getFlattenedFilters();for(const u of c)hp(a,u),a=qa(a,u)}(e._query,t),new er(e.firestore,e.converter,qa(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class tl extends up{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new tl(e,t)}_apply(e){const t=function(s,i,a){if(s.startAt!==null)throw new M(k.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(s.endAt!==null)throw new M(k.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new Rs(i,a)}(e._query,this._field,this._direction);return new er(e.firestore,e.converter,function(s,i){const a=s.explicitOrderBy.concat([i]);return new Br(s.path,s.collectionGroup,a,s.filters.slice(),s.limit,s.limitType,s.startAt,s.endAt)}(e._query,t))}}function aE(n,e="asc"){const t=e,r=Xc("orderBy",n);return tl._create(r,t)}function Ph(n,e,t){if(typeof(t=Ue(t))=="string"){if(t==="")throw new M(k.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!of(e)&&t.indexOf("/")!==-1)throw new M(k.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const r=e.path.child(de.fromString(t));if(!$.isDocumentKey(r))throw new M(k.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return Hu(n,new $(r))}if(t instanceof Se)return Hu(n,t._key);throw new M(k.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${lo(t)}.`)}function Ch(n,e){if(!Array.isArray(n)||n.length===0)throw new M(k.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function hp(n,e){const t=function(s,i){for(const a of s)for(const c of a.getFlattenedFilters())if(i.indexOf(c.op)>=0)return c.op;return null}(n.filters,function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(t!==null)throw t===e.op?new M(k.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new M(k.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}class cE{convertValue(e,t="none"){switch(wn(e)){case 0:return null;case 1:return e.booleanValue;case 2:return Re(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(En(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw q(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const r={};return An(e,(s,i)=>{r[s]=this.convertValue(i,t)}),r}convertVectorValue(e){var t,r,s;const i=(s=(r=(t=e.fields)===null||t===void 0?void 0:t[zi].arrayValue)===null||r===void 0?void 0:r.values)===null||s===void 0?void 0:s.map(a=>Re(a.doubleValue));return new Rt(i)}convertGeoPoint(e){return new St(Re(e.latitude),Re(e.longitude))}convertArray(e,t){return(e.values||[]).map(r=>this.convertValue(r,t))}convertServerTimestamp(e,t){switch(t){case"previous":const r=fo(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(bs(e));default:return null}}convertTimestamp(e){const t=vn(e);return new ge(t.seconds,t.nanos)}convertDocumentKey(e,t){const r=de.fromString(e);ie(Pf(r),9688,{name:e});const s=new As(r.get(1),r.get(3)),i=new $(r.popFirst(5));return s.isEqual(t)||qt(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}/**
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
 */function dp(n,e,t){let r;return r=n?n.toFirestore(e):e,r}class hs{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class qn extends lp{constructor(e,t,r,s,i,a){super(e,t,r,s,a),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new Pi(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const r=this._document.data.field(Xc("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new M(k.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=qn._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}}qn._jsonSchemaVersion="firestore/documentSnapshot/1.0",qn._jsonSchema={type:Ce("string",qn._jsonSchemaVersion),bundleSource:Ce("string","DocumentSnapshot"),bundleName:Ce("string"),bundle:Ce("string")};class Pi extends qn{data(e={}){return super.data(e)}}class vr{constructor(e,t,r,s){this._firestore=e,this._userDataWriter=t,this._snapshot=s,this.metadata=new hs(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(r=>{e.call(t,new Pi(this._firestore,this._userDataWriter,r.key,r,new hs(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new M(k.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(s,i){if(s._snapshot.oldDocs.isEmpty()){let a=0;return s._snapshot.docChanges.map(c=>{const u=new Pi(s._firestore,s._userDataWriter,c.doc.key,c.doc,new hs(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);return c.doc,{type:"added",doc:u,oldIndex:-1,newIndex:a++}})}{let a=s._snapshot.oldDocs;return s._snapshot.docChanges.filter(c=>i||c.type!==3).map(c=>{const u=new Pi(s._firestore,s._userDataWriter,c.doc.key,c.doc,new hs(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);let h=-1,f=-1;return c.type!==0&&(h=a.indexOf(c.doc.key),a=a.delete(c.doc.key)),c.type!==1&&(a=a.add(c.doc),f=a.indexOf(c.doc.key)),{type:lE(c.type),doc:u,oldIndex:h,newIndex:f}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new M(k.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=vr._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=Ic.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],r=[],s=[];return this.docs.forEach(i=>{i._document!==null&&(t.push(i._document),r.push(this._userDataWriter.convertObjectMap(i._document.data.value.mapValue.fields,"previous")),s.push(i.ref.path))}),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function lE(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return q(61501,{type:n})}}/**
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
 */function va(n){n=mt(n,Se);const e=mt(n.firestore,Jn);return W0(Gc(e),n._key).then(t=>pp(e,n,t))}vr._jsonSchemaVersion="firestore/querySnapshot/1.0",vr._jsonSchema={type:Ce("string",vr._jsonSchemaVersion),bundleSource:Ce("string","QuerySnapshot"),bundleName:Ce("string"),bundle:Ce("string")};class fp extends cE{constructor(e){super(),this.firestore=e}convertBytes(e){return new lt(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new Se(this.firestore,null,t)}}function Vh(n,e,t){n=mt(n,Se);const r=mt(n.firestore,Jn),s=dp(n.converter,e);return nl(r,[ip(So(r),"setDoc",n._key,s,n.converter!==null,t).toMutation(n._key,gt.none())])}function uE(n,e,t,...r){n=mt(n,Se);const s=mt(n.firestore,Jn),i=So(s);let a;return a=typeof(e=Ue(e))=="string"||e instanceof bo?tE(i,"updateDoc",n._key,e,t,r):eE(i,"updateDoc",n._key,e),nl(s,[a.toMutation(n._key,gt.exists(!0))])}function hE(n,e){const t=mt(n.firestore,Jn),r=Mn(n),s=dp(n.converter,e);return nl(t,[ip(So(n.firestore),"addDoc",r._key,s,n.converter!==null,{}).toMutation(r._key,gt.exists(!1))]).then(()=>r)}function Ea(n,...e){var t,r,s;n=Ue(n);let i={includeMetadataChanges:!1,source:"default"},a=0;typeof e[a]!="object"||kh(e[a])||(i=e[a++]);const c={includeMetadataChanges:i.includeMetadataChanges,source:i.source};if(kh(e[a])){const m=e[a];e[a]=(t=m.next)===null||t===void 0?void 0:t.bind(m),e[a+1]=(r=m.error)===null||r===void 0?void 0:r.bind(m),e[a+2]=(s=m.complete)===null||s===void 0?void 0:s.bind(m)}let u,h,f;if(n instanceof Se)h=mt(n.firestore,Jn),f=po(n._key.path),u={next:m=>{e[a]&&e[a](pp(h,n,m))},error:e[a+1],complete:e[a+2]};else{const m=mt(n,er);h=mt(m.firestore,Jn),f=m._query;const g=new fp(h);u={next:S=>{e[a]&&e[a](new vr(h,g,m,S))},error:e[a+1],complete:e[a+2]},iE(n._query)}return function(g,S,P,x){const N=new Zf(x),K=new zf(S,N,P);return g.asyncQueue.enqueueAndForget(async()=>jf(await ec(g),K)),()=>{N.Ou(),g.asyncQueue.enqueueAndForget(async()=>qf(await ec(g),K))}}(Gc(h),f,c,u)}function nl(n,e){return function(r,s){const i=new un;return r.asyncQueue.enqueueAndForget(async()=>O0(await G0(r),s,i)),i.promise}(Gc(n),e)}function pp(n,e,t){const r=t.docs.get(e._key),s=new fp(n);return new qn(n,s,e._key,r,new hs(t.hasPendingWrites,t.fromCache),e.converter)}function dE(){return new Kc("serverTimestamp")}(function(e,t=!0){(function(s){Fr=s})(Lr),Sr(new Wn("firestore",(r,{instanceIdentifier:s,options:i})=>{const a=r.getProvider("app").getImmediate(),c=new Jn(new ry(r.getProvider("auth-internal")),new oy(a,r.getProvider("app-check-internal")),function(h,f){if(!Object.prototype.hasOwnProperty.apply(h.options,["projectId"]))throw new M(k.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new As(h.options.projectId,f)}(a,s),a);return i=Object.assign({useFetchStreams:t},i),c._setSettings(i),c},"PUBLIC").setMultipleInstances(!0)),cn(Vu,Nu,e),cn(Vu,Nu,"esm2017")})();var fE="firebase",pE="11.10.0";/**
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
 */cn(fE,pE,"app");function rl(n,e){var t={};for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&e.indexOf(r)<0&&(t[r]=n[r]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,r=Object.getOwnPropertySymbols(n);s<r.length;s++)e.indexOf(r[s])<0&&Object.prototype.propertyIsEnumerable.call(n,r[s])&&(t[r[s]]=n[r[s]]);return t}function mp(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const mE=mp,gp=new Os("auth","Firebase",mp());/**
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
 */const Yi=new vc("@firebase/auth");function gE(n,...e){Yi.logLevel<=Y.WARN&&Yi.warn(`Auth (${Lr}): ${n}`,...e)}function Ci(n,...e){Yi.logLevel<=Y.ERROR&&Yi.error(`Auth (${Lr}): ${n}`,...e)}/**
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
 */function Ht(n,...e){throw sl(n,...e)}function kt(n,...e){return sl(n,...e)}function _p(n,e,t){const r=Object.assign(Object.assign({},mE()),{[e]:t});return new Os("auth","Firebase",r).create(e,{appName:n.name})}function dn(n){return _p(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function sl(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return gp.create(n,...e)}function H(n,e,...t){if(!n)throw sl(e,...t)}function Ot(n){const e="INTERNAL ASSERTION FAILED: "+n;throw Ci(e),new Error(e)}function Gt(n,e){n||Ot(e)}/**
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
 */function nc(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.href)||""}function _E(){return Nh()==="http:"||Nh()==="https:"}function Nh(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}/**
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
 */function yE(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(_E()||xg()||"connection"in navigator)?navigator.onLine:!0}function vE(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
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
 */class qs{constructor(e,t){this.shortDelay=e,this.longDelay=t,Gt(t>e,"Short delay should be less than long delay!"),this.isMobile=Vg()||Og()}get(){return yE()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */function il(n,e){Gt(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
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
 */const EE={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
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
 */const wE=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],TE=new qs(3e4,6e4);function ko(n,e){return n.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:n.tenantId}):e}async function qr(n,e,t,r,s={}){return vp(n,s,async()=>{let i={},a={};r&&(e==="GET"?a=r:i={body:JSON.stringify(r)});const c=Ms(Object.assign({key:n.config.apiKey},a)).slice(1),u=await n._getAdditionalHeaders();u["Content-Type"]="application/json",n.languageCode&&(u["X-Firebase-Locale"]=n.languageCode);const h=Object.assign({method:e,headers:u},i);return Dg()||(h.referrerPolicy="no-referrer"),n.emulatorConfig&&Mr(n.emulatorConfig.host)&&(h.credentials="include"),yp.fetch()(await wp(n,n.config.apiHost,t,c),h)})}async function vp(n,e,t){n._canInitEmulator=!1;const r=Object.assign(Object.assign({},EE),e);try{const s=new IE(n),i=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const a=await i.json();if("needConfirmation"in a)throw vi(n,"account-exists-with-different-credential",a);if(i.ok&&!("errorMessage"in a))return a;{const c=i.ok?a.errorMessage:a.error.message,[u,h]=c.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw vi(n,"credential-already-in-use",a);if(u==="EMAIL_EXISTS")throw vi(n,"email-already-in-use",a);if(u==="USER_DISABLED")throw vi(n,"user-disabled",a);const f=r[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(h)throw _p(n,f,h);Ht(n,f)}}catch(s){if(s instanceof Wt)throw s;Ht(n,"network-request-failed",{message:String(s)})}}async function Ep(n,e,t,r,s={}){const i=await qr(n,e,t,r,s);return"mfaPendingCredential"in i&&Ht(n,"multi-factor-auth-required",{_serverResponse:i}),i}async function wp(n,e,t,r){const s=`${e}${t}?${r}`,i=n,a=i.config.emulator?il(n.config,s):`${n.config.apiScheme}://${s}`;return wE.includes(t)&&(await i._persistenceManagerAvailable,i._getPersistenceType()==="COOKIE")?i._getPersistence()._getFinalTarget(a).toString():a}class IE{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(kt(this.auth,"network-request-failed")),TE.get())})}}function vi(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const s=kt(n,e,r);return s.customData._tokenResponse=t,s}/**
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
 */async function bE(n,e){return qr(n,"POST","/v1/accounts:delete",e)}async function Zi(n,e){return qr(n,"POST","/v1/accounts:lookup",e)}/**
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
 */function ys(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function AE(n,e=!1){const t=Ue(n),r=await t.getIdToken(e),s=ol(r);H(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,a=i==null?void 0:i.sign_in_provider;return{claims:s,token:r,authTime:ys(wa(s.auth_time)),issuedAtTime:ys(wa(s.iat)),expirationTime:ys(wa(s.exp)),signInProvider:a||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function wa(n){return Number(n)*1e3}function ol(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return Ci("JWT malformed, contained fewer than 3 sections"),null;try{const s=Ed(t);return s?JSON.parse(s):(Ci("Failed to decode base64 JWT payload"),null)}catch(s){return Ci("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function Dh(n){const e=ol(n);return H(e,"internal-error"),H(typeof e.exp<"u","internal-error"),H(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
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
 */async function Vs(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof Wt&&SE(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function SE({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
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
 */class RE{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const s=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */class rc{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=ys(this.lastLoginAt),this.creationTime=ys(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function eo(n){var e;const t=n.auth,r=await n.getIdToken(),s=await Vs(n,Zi(t,{idToken:r}));H(s==null?void 0:s.users.length,t,"internal-error");const i=s.users[0];n._notifyReloadListener(i);const a=!((e=i.providerUserInfo)===null||e===void 0)&&e.length?Tp(i.providerUserInfo):[],c=PE(n.providerData,a),u=n.isAnonymous,h=!(n.email&&i.passwordHash)&&!(c!=null&&c.length),f=u?h:!1,m={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:c,metadata:new rc(i.createdAt,i.lastLoginAt),isAnonymous:f};Object.assign(n,m)}async function kE(n){const e=Ue(n);await eo(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function PE(n,e){return[...n.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function Tp(n){return n.map(e=>{var{providerId:t}=e,r=rl(e,["providerId"]);return{providerId:t,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
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
 */async function CE(n,e){const t=await vp(n,{},async()=>{const r=Ms({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=n.config,a=await wp(n,s,"/v1/token",`key=${i}`),c=await n._getAdditionalHeaders();c["Content-Type"]="application/x-www-form-urlencoded";const u={method:"POST",headers:c,body:r};return n.emulatorConfig&&Mr(n.emulatorConfig.host)&&(u.credentials="include"),yp.fetch()(a,u)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function VE(n,e){return qr(n,"POST","/v2/accounts:revokeToken",ko(n,e))}/**
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
 */class Er{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){H(e.idToken,"internal-error"),H(typeof e.idToken<"u","internal-error"),H(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Dh(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){H(e.length!==0,"internal-error");const t=Dh(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(H(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:s,expiresIn:i}=await CE(e,t);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:s,expirationTime:i}=t,a=new Er;return r&&(H(typeof r=="string","internal-error",{appName:e}),a.refreshToken=r),s&&(H(typeof s=="string","internal-error",{appName:e}),a.accessToken=s),i&&(H(typeof i=="number","internal-error",{appName:e}),a.expirationTime=i),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Er,this.toJSON())}_performRefresh(){return Ot("not implemented")}}/**
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
 */function Xt(n,e){H(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class pt{constructor(e){var{uid:t,auth:r,stsTokenManager:s}=e,i=rl(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new RE(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=r,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new rc(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const t=await Vs(this,this.stsTokenManager.getToken(this.auth,e));return H(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return AE(this,e)}reload(){return kE(this)}_assign(e){this!==e&&(H(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new pt(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){H(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await eo(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(ft(this.auth.app))return Promise.reject(dn(this.auth));const e=await this.getIdToken();return await Vs(this,bE(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var r,s,i,a,c,u,h,f;const m=(r=t.displayName)!==null&&r!==void 0?r:void 0,g=(s=t.email)!==null&&s!==void 0?s:void 0,S=(i=t.phoneNumber)!==null&&i!==void 0?i:void 0,P=(a=t.photoURL)!==null&&a!==void 0?a:void 0,x=(c=t.tenantId)!==null&&c!==void 0?c:void 0,N=(u=t._redirectEventId)!==null&&u!==void 0?u:void 0,K=(h=t.createdAt)!==null&&h!==void 0?h:void 0,z=(f=t.lastLoginAt)!==null&&f!==void 0?f:void 0,{uid:J,emailVerified:fe,isAnonymous:tt,providerData:ye,stsTokenManager:w}=t;H(J&&w,e,"internal-error");const _=Er.fromJSON(this.name,w);H(typeof J=="string",e,"internal-error"),Xt(m,e.name),Xt(g,e.name),H(typeof fe=="boolean",e,"internal-error"),H(typeof tt=="boolean",e,"internal-error"),Xt(S,e.name),Xt(P,e.name),Xt(x,e.name),Xt(N,e.name),Xt(K,e.name),Xt(z,e.name);const y=new pt({uid:J,auth:e,email:g,emailVerified:fe,displayName:m,isAnonymous:tt,photoURL:P,phoneNumber:S,tenantId:x,stsTokenManager:_,createdAt:K,lastLoginAt:z});return ye&&Array.isArray(ye)&&(y.providerData=ye.map(E=>Object.assign({},E))),N&&(y._redirectEventId=N),y}static async _fromIdTokenResponse(e,t,r=!1){const s=new Er;s.updateFromServerResponse(t);const i=new pt({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await eo(i),i}static async _fromGetAccountInfoResponse(e,t,r){const s=t.users[0];H(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?Tp(s.providerUserInfo):[],a=!(s.email&&s.passwordHash)&&!(i!=null&&i.length),c=new Er;c.updateFromIdToken(r);const u=new pt({uid:s.localId,auth:e,stsTokenManager:c,isAnonymous:a}),h={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new rc(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(i!=null&&i.length)};return Object.assign(u,h),u}}/**
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
 */const xh=new Map;function Mt(n){Gt(n instanceof Function,"Expected a class definition");let e=xh.get(n);return e?(Gt(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,xh.set(n,e),e)}/**
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
 */class Ip{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}Ip.type="NONE";const Oh=Ip;/**
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
 */function Vi(n,e,t){return`firebase:${n}:${e}:${t}`}class wr{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=Vi(this.userKey,s.apiKey,i),this.fullPersistenceKey=Vi("persistence",s.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await Zi(this.auth,{idToken:e}).catch(()=>{});return t?pt._fromGetAccountInfoResponse(this.auth,t,e):null}return pt._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new wr(Mt(Oh),e,r);const s=(await Promise.all(t.map(async h=>{if(await h._isAvailable())return h}))).filter(h=>h);let i=s[0]||Mt(Oh);const a=Vi(r,e.config.apiKey,e.name);let c=null;for(const h of t)try{const f=await h._get(a);if(f){let m;if(typeof f=="string"){const g=await Zi(e,{idToken:f}).catch(()=>{});if(!g)break;m=await pt._fromGetAccountInfoResponse(e,g,f)}else m=pt._fromJSON(e,f);h!==i&&(c=m),i=h;break}}catch{}const u=s.filter(h=>h._shouldAllowMigration);return!i._shouldAllowMigration||!u.length?new wr(i,e,r):(i=u[0],c&&await i._set(a,c.toJSON()),await Promise.all(t.map(async h=>{if(h!==i)try{await h._remove(a)}catch{}})),new wr(i,e,r))}}/**
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
 */function Mh(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Rp(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(bp(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Pp(e))return"Blackberry";if(Cp(e))return"Webos";if(Ap(e))return"Safari";if((e.includes("chrome/")||Sp(e))&&!e.includes("edge/"))return"Chrome";if(kp(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function bp(n=Xe()){return/firefox\//i.test(n)}function Ap(n=Xe()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Sp(n=Xe()){return/crios\//i.test(n)}function Rp(n=Xe()){return/iemobile/i.test(n)}function kp(n=Xe()){return/android/i.test(n)}function Pp(n=Xe()){return/blackberry/i.test(n)}function Cp(n=Xe()){return/webos/i.test(n)}function al(n=Xe()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function NE(n=Xe()){var e;return al(n)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function DE(){return Mg()&&document.documentMode===10}function Vp(n=Xe()){return al(n)||kp(n)||Cp(n)||Pp(n)||/windows phone/i.test(n)||Rp(n)}/**
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
 */function Np(n,e=[]){let t;switch(n){case"Browser":t=Mh(Xe());break;case"Worker":t=`${Mh(Xe())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${Lr}/${r}`}/**
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
 */class xE{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=i=>new Promise((a,c)=>{try{const u=e(i);a(u)}catch(u){c(u)}});r.onAbort=t,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
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
 */async function OE(n,e={}){return qr(n,"GET","/v2/passwordPolicy",ko(n,e))}/**
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
 */const ME=6;class LE{constructor(e){var t,r,s,i;const a=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=a.minPasswordLength)!==null&&t!==void 0?t:ME,a.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=a.maxPasswordLength),a.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=a.containsLowercaseCharacter),a.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=a.containsUppercaseCharacter),a.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=a.containsNumericCharacter),a.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=a.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(s=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&s!==void 0?s:"",this.forceUpgradeOnSignin=(i=e.forceUpgradeOnSignin)!==null&&i!==void 0?i:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,r,s,i,a,c;const u={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,u),this.validatePasswordCharacterOptions(e,u),u.isValid&&(u.isValid=(t=u.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),u.isValid&&(u.isValid=(r=u.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),u.isValid&&(u.isValid=(s=u.containsLowercaseLetter)!==null&&s!==void 0?s:!0),u.isValid&&(u.isValid=(i=u.containsUppercaseLetter)!==null&&i!==void 0?i:!0),u.isValid&&(u.isValid=(a=u.containsNumericCharacter)!==null&&a!==void 0?a:!0),u.isValid&&(u.isValid=(c=u.containsNonAlphanumericCharacter)!==null&&c!==void 0?c:!0),u}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
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
 */class FE{constructor(e,t,r,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Lh(this),this.idTokenSubscription=new Lh(this),this.beforeStateQueue=new xE(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=gp,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(i=>this._resolvePersistenceManagerAvailable=i)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=Mt(t)),this._initializationPromise=this.queue(async()=>{var r,s,i;if(!this._deleted&&(this.persistenceManager=await wr.create(this,e),(r=this._resolvePersistenceManagerAvailable)===null||r===void 0||r.call(this),!this._deleted)){if(!((s=this._popupRedirectResolver)===null||s===void 0)&&s._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((i=this.currentUser)===null||i===void 0?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await Zi(this,{idToken:e}),r=await pt._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(ft(this.app)){const a=this.app.settings.authIdToken;return a?new Promise(c=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(a).then(c,c))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let s=r,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const a=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,c=s==null?void 0:s._redirectEventId,u=await this.tryRedirectSignIn(e);(!a||a===c)&&(u!=null&&u.user)&&(s=u.user,i=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(s)}catch(a){s=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(a))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return H(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await eo(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=vE()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(ft(this.app))return Promise.reject(dn(this));const t=e?Ue(e):null;return t&&H(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&H(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return ft(this.app)?Promise.reject(dn(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return ft(this.app)?Promise.reject(dn(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Mt(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await OE(this),t=new LE(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new Os("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await VE(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&Mt(e)||this._popupRedirectResolver;H(t,this,"argument-error"),this.redirectPersistenceManager=await wr.create(this,[Mt(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,s){if(this._deleted)return()=>{};const i=typeof t=="function"?t:t.next.bind(t);let a=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(H(c,this,"internal-error"),c.then(()=>{a||i(this.currentUser)}),typeof t=="function"){const u=e.addObserver(t,r,s);return()=>{a=!0,u()}}else{const u=e.addObserver(t);return()=>{a=!0,u()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return H(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Np(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(t["X-Firebase-Client"]=r);const s=await this._getAppCheckToken();return s&&(t["X-Firebase-AppCheck"]=s),t}async _getAppCheckToken(){var e;if(ft(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t!=null&&t.error&&gE(`Error while retrieving App Check token: ${t.error}`),t==null?void 0:t.token}}function Po(n){return Ue(n)}class Lh{constructor(e){this.auth=e,this.observer=null,this.addObserver=zg(t=>this.observer=t)}get next(){return H(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
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
 */let cl={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function UE(n){cl=n}function $E(n){return cl.loadJS(n)}function BE(){return cl.gapiScript}function jE(n){return`__${n}${Math.floor(Math.random()*1e6)}`}/**
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
 */function qE(n,e){const t=wc(n,"auth");if(t.isInitialized()){const s=t.getImmediate(),i=t.getOptions();if(Gn(i,e??{}))return s;Ht(s,"already-initialized")}return t.initialize({options:e})}function zE(n,e){const t=(e==null?void 0:e.persistence)||[],r=(Array.isArray(t)?t:[t]).map(Mt);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function HE(n,e,t){const r=Po(n);H(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!1,i=Dp(e),{host:a,port:c}=GE(e),u=c===null?"":`:${c}`,h={url:`${i}//${a}${u}/`},f=Object.freeze({host:a,port:c,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!r._canInitEmulator){H(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),H(Gn(h,r.config.emulator)&&Gn(f,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=h,r.emulatorConfig=f,r.settings.appVerificationDisabledForTesting=!0,Mr(a)?(bd(`${i}//${a}${u}`),Ad("Auth",!0)):WE()}function Dp(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function GE(n){const e=Dp(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:Fh(r.substr(i.length+1))}}else{const[i,a]=r.split(":");return{host:i,port:Fh(a)}}}function Fh(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function WE(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
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
 */async function Tr(n,e){return Ep(n,"POST","/v1/accounts:signInWithIdp",ko(n,e))}/**
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
 */const KE="http://localhost";class Xn extends xp{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new Xn(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):Ht("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s}=t,i=rl(t,["providerId","signInMethod"]);if(!r||!s)return null;const a=new Xn(r,s);return a.idToken=i.idToken||void 0,a.accessToken=i.accessToken||void 0,a.secret=i.secret,a.nonce=i.nonce,a.pendingToken=i.pendingToken||null,a}_getIdTokenResponse(e){const t=this.buildRequest();return Tr(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,Tr(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Tr(e,t)}buildRequest(){const e={requestUri:KE,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=Ms(t)}return e}}/**
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
 */class zs extends Op{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
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
 */class Zt extends zs{constructor(){super("facebook.com")}static credential(e){return Xn._fromParams({providerId:Zt.PROVIDER_ID,signInMethod:Zt.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Zt.credentialFromTaggedObject(e)}static credentialFromError(e){return Zt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Zt.credential(e.oauthAccessToken)}catch{return null}}}Zt.FACEBOOK_SIGN_IN_METHOD="facebook.com";Zt.PROVIDER_ID="facebook.com";/**
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
 */class en extends zs{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return Xn._fromParams({providerId:en.PROVIDER_ID,signInMethod:en.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return en.credentialFromTaggedObject(e)}static credentialFromError(e){return en.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return en.credential(t,r)}catch{return null}}}en.GOOGLE_SIGN_IN_METHOD="google.com";en.PROVIDER_ID="google.com";/**
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
 */class tn extends zs{constructor(){super("github.com")}static credential(e){return Xn._fromParams({providerId:tn.PROVIDER_ID,signInMethod:tn.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return tn.credentialFromTaggedObject(e)}static credentialFromError(e){return tn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return tn.credential(e.oauthAccessToken)}catch{return null}}}tn.GITHUB_SIGN_IN_METHOD="github.com";tn.PROVIDER_ID="github.com";/**
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
 */class nn extends zs{constructor(){super("twitter.com")}static credential(e,t){return Xn._fromParams({providerId:nn.PROVIDER_ID,signInMethod:nn.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return nn.credentialFromTaggedObject(e)}static credentialFromError(e){return nn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return nn.credential(t,r)}catch{return null}}}nn.TWITTER_SIGN_IN_METHOD="twitter.com";nn.PROVIDER_ID="twitter.com";/**
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
 */async function QE(n,e){return Ep(n,"POST","/v1/accounts:signUp",ko(n,e))}/**
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
 */class bn{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,s=!1){const i=await pt._fromIdTokenResponse(e,r,s),a=Uh(r);return new bn({user:i,providerId:a,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const s=Uh(r);return new bn({user:e,providerId:s,_tokenResponse:r,operationType:t})}}function Uh(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
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
 */async function JE(n){var e;if(ft(n.app))return Promise.reject(dn(n));const t=Po(n);if(await t._initializationPromise,!((e=t.currentUser)===null||e===void 0)&&e.isAnonymous)return new bn({user:t.currentUser,providerId:null,operationType:"signIn"});const r=await QE(t,{returnSecureToken:!0}),s=await bn._fromIdTokenResponse(t,"signIn",r,!0);return await t._updateCurrentUser(s.user),s}/**
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
 */class to extends Wt{constructor(e,t,r,s){var i;super(t.code,t.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,to.prototype),this.customData={appName:e.name,tenantId:(i=e.tenantId)!==null&&i!==void 0?i:void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,s){return new to(e,t,r,s)}}function Mp(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?to._fromErrorAndOperation(n,i,e,r):i})}async function XE(n,e,t=!1){const r=await Vs(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return bn._forOperation(n,"link",r)}/**
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
 */async function YE(n,e,t=!1){const{auth:r}=n;if(ft(r.app))return Promise.reject(dn(r));const s="reauthenticate";try{const i=await Vs(n,Mp(r,s,e,n),t);H(i.idToken,r,"internal-error");const a=ol(i.idToken);H(a,r,"internal-error");const{sub:c}=a;return H(n.uid===c,r,"user-mismatch"),bn._forOperation(n,s,i)}catch(i){throw(i==null?void 0:i.code)==="auth/user-not-found"&&Ht(r,"user-mismatch"),i}}/**
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
 */async function ZE(n,e,t=!1){if(ft(n.app))return Promise.reject(dn(n));const r="signIn",s=await Mp(n,r,e),i=await bn._fromIdTokenResponse(n,r,s);return t||await n._updateCurrentUser(i.user),i}function ew(n,e,t,r){return Ue(n).onIdTokenChanged(e,t,r)}function tw(n,e,t){return Ue(n).beforeAuthStateChanged(e,t)}function nw(n,e,t,r){return Ue(n).onAuthStateChanged(e,t,r)}const no="__sak";/**
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
 */class Lp{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(no,"1"),this.storage.removeItem(no),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
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
 */const rw=1e3,sw=10;class Fp extends Lp{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Vp(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),s=this.localCache[t];r!==s&&e(t,s,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((a,c,u)=>{this.notifyListeners(a,u)});return}const r=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const a=this.storage.getItem(r);!t&&this.localCache[r]===a||this.notifyListeners(r,a)},i=this.storage.getItem(r);DE()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,sw):s()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},rw)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}Fp.type="LOCAL";const iw=Fp;/**
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
 */function ow(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
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
 */class Co{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const r=new Co(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:s,data:i}=t.data,a=this.handlersMap[s];if(!(a!=null&&a.size))return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const c=Array.from(a).map(async h=>h(t.origin,i)),u=await ow(c);t.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:u})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Co.receivers=[];/**
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
 */function ll(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
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
 */class aw{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,a;return new Promise((c,u)=>{const h=ll("",20);s.port1.start();const f=setTimeout(()=>{u(new Error("unsupported_event"))},r);a={messageChannel:s,onMessage(m){const g=m;if(g.data.eventId===h)switch(g.data.status){case"ack":clearTimeout(f),i=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),c(g.data.response);break;default:clearTimeout(f),clearTimeout(i),u(new Error("invalid_response"));break}}},this.handlers.add(a),s.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:e,eventId:h,data:t},[s.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}}/**
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
 */function Pt(){return window}function cw(n){Pt().location.href=n}/**
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
 */function Bp(){return typeof Pt().WorkerGlobalScope<"u"&&typeof Pt().importScripts=="function"}async function lw(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function uw(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)===null||n===void 0?void 0:n.controller)||null}function hw(){return Bp()?self:null}/**
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
 */const jp="firebaseLocalStorageDb",dw=1,ro="firebaseLocalStorage",qp="fbase_key";class Hs{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function Vo(n,e){return n.transaction([ro],e?"readwrite":"readonly").objectStore(ro)}function fw(){const n=indexedDB.deleteDatabase(jp);return new Hs(n).toPromise()}function sc(){const n=indexedDB.open(jp,dw);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(ro,{keyPath:qp})}catch(s){t(s)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(ro)?e(r):(r.close(),await fw(),e(await sc()))})})}async function $h(n,e,t){const r=Vo(n,!0).put({[qp]:e,value:t});return new Hs(r).toPromise()}async function pw(n,e){const t=Vo(n,!1).get(e),r=await new Hs(t).toPromise();return r===void 0?null:r.value}function Bh(n,e){const t=Vo(n,!0).delete(e);return new Hs(t).toPromise()}const mw=800,gw=3;class zp{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await sc(),this.db)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>gw)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Bp()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Co._getInstance(hw()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await lw(),!this.activeServiceWorker)return;this.sender=new aw(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((t=r[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||uw()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await sc();return await $h(e,no,"1"),await Bh(e,no),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>$h(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>pw(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>Bh(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=Vo(s,!1).getAll();return new Hs(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),mw)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}zp.type="LOCAL";const _w=zp;new qs(3e4,6e4);/**
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
 */function yw(n,e){return e?Mt(e):(H(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
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
 */class ul extends xp{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Tr(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Tr(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Tr(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function vw(n){return ZE(n.auth,new ul(n),n.bypassAuthState)}function Ew(n){const{auth:e,user:t}=n;return H(t,e,"internal-error"),YE(t,new ul(n),n.bypassAuthState)}async function ww(n){const{auth:e,user:t}=n;return H(t,e,"internal-error"),XE(t,new ul(n),n.bypassAuthState)}/**
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
 */class Hp{constructor(e,t,r,s,i=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:s,tenantId:i,error:a,type:c}=e;if(a){this.reject(a);return}const u={auth:this.auth,requestUri:t,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(u))}catch(h){this.reject(h)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return vw;case"linkViaPopup":case"linkViaRedirect":return ww;case"reauthViaPopup":case"reauthViaRedirect":return Ew;default:Ht(this.auth,"internal-error")}}resolve(e){Gt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Gt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
 */const Tw=new qs(2e3,1e4);class mr extends Hp{constructor(e,t,r,s,i){super(e,t,s,i),this.provider=r,this.authWindow=null,this.pollId=null,mr.currentPopupAction&&mr.currentPopupAction.cancel(),mr.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return H(e,this.auth,"internal-error"),e}async onExecution(){Gt(this.filter.length===1,"Popup operations only handle one event");const e=ll();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(kt(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(kt(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,mr.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,r;if(!((r=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(kt(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,Tw.get())};e()}}mr.currentPopupAction=null;/**
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
 */const Iw="pendingRedirect",Ni=new Map;class bw extends Hp{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=Ni.get(this.auth._key());if(!e){try{const r=await Aw(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}Ni.set(this.auth._key(),e)}return this.bypassAuthState||Ni.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function Aw(n,e){const t=kw(e),r=Rw(n);if(!await r._isAvailable())return!1;const s=await r._get(t)==="true";return await r._remove(t),s}function Sw(n,e){Ni.set(n._key(),e)}function Rw(n){return Mt(n._redirectPersistence)}function kw(n){return Vi(Iw,n.config.apiKey,n.name)}async function Pw(n,e,t=!1){if(ft(n.app))return Promise.reject(dn(n));const r=Po(n),s=yw(r,e),a=await new bw(r,s,t).execute();return a&&!t&&(delete a.user._redirectEventId,await r._persistUserIfCurrent(a.user),await r._setRedirectUser(null,e)),a}/**
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
 */const Cw=10*60*1e3;class Vw{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!Nw(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!Gp(e)){const s=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";t.onError(kt(this.auth,s))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=Cw&&this.cachedEventUids.clear(),this.cachedEventUids.has(jh(e))}saveEventToCache(e){this.cachedEventUids.add(jh(e)),this.lastProcessedEventTime=Date.now()}}function jh(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function Gp({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function Nw(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Gp(n);default:return!1}}/**
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
 */async function Dw(n,e={}){return qr(n,"GET","/v1/projects",e)}/**
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
 */const xw=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Ow=/^https?/;async function Mw(n){if(n.config.emulator)return;const{authorizedDomains:e}=await Dw(n);for(const t of e)try{if(Lw(t))return}catch{}Ht(n,"unauthorized-domain")}function Lw(n){const e=nc(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const a=new URL(n);return a.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&a.hostname===r}if(!Ow.test(t))return!1;if(xw.test(n))return r===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
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
 */const Fw=new qs(3e4,6e4);function qh(){const n=Pt().___jsl;if(n!=null&&n.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function Uw(n){return new Promise((e,t)=>{var r,s,i;function a(){qh(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{qh(),t(kt(n,"network-request-failed"))},timeout:Fw.get()})}if(!((s=(r=Pt().gapi)===null||r===void 0?void 0:r.iframes)===null||s===void 0)&&s.Iframe)e(gapi.iframes.getContext());else if(!((i=Pt().gapi)===null||i===void 0)&&i.load)a();else{const c=jE("iframefcb");return Pt()[c]=()=>{gapi.load?a():t(kt(n,"network-request-failed"))},$E(`${BE()}?onload=${c}`).catch(u=>t(u))}}).catch(e=>{throw Di=null,e})}let Di=null;function $w(n){return Di=Di||Uw(n),Di}/**
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
 */const Bw=new qs(5e3,15e3),jw="__/auth/iframe",qw="emulator/auth/iframe",zw={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Hw=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Gw(n){const e=n.config;H(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?il(e,qw):`https://${n.config.authDomain}/${jw}`,r={apiKey:e.apiKey,appName:n.name,v:Lr},s=Hw.get(n.config.apiHost);s&&(r.eid=s);const i=n._getFrameworks();return i.length&&(r.fw=i.join(",")),`${t}?${Ms(r).slice(1)}`}async function Ww(n){const e=await $w(n),t=Pt().gapi;return H(t,n,"internal-error"),e.open({where:document.body,url:Gw(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:zw,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const a=kt(n,"network-request-failed"),c=Pt().setTimeout(()=>{i(a)},Bw.get());function u(){Pt().clearTimeout(c),s(r)}r.ping(u).then(u,()=>{i(a)})}))}/**
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
 */const Kw={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Qw=500,Jw=600,Xw="_blank",Yw="http://localhost";class zh{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function Zw(n,e,t,r=Qw,s=Jw){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),a=Math.max((window.screen.availWidth-r)/2,0).toString();let c="";const u=Object.assign(Object.assign({},Kw),{width:r.toString(),height:s.toString(),top:i,left:a}),h=Xe().toLowerCase();t&&(c=Sp(h)?Xw:t),bp(h)&&(e=e||Yw,u.scrollbars="yes");const f=Object.entries(u).reduce((g,[S,P])=>`${g}${S}=${P},`,"");if(NE(h)&&c!=="_self")return eT(e||"",c),new zh(null);const m=window.open(e||"",c,f);H(m,n,"popup-blocked");try{m.focus()}catch{}return new zh(m)}function eT(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
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
 */const tT="__/auth/handler",nT="emulator/auth/handler",rT=encodeURIComponent("fac");async function Hh(n,e,t,r,s,i){H(n.config.authDomain,n,"auth-domain-config-required"),H(n.config.apiKey,n,"invalid-api-key");const a={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:Lr,eventId:s};if(e instanceof Op){e.setDefaultLanguage(n.languageCode),a.providerId=e.providerId||"",qg(e.getCustomParameters())||(a.customParameters=JSON.stringify(e.getCustomParameters()));for(const[f,m]of Object.entries({}))a[f]=m}if(e instanceof zs){const f=e.getScopes().filter(m=>m!=="");f.length>0&&(a.scopes=f.join(","))}n.tenantId&&(a.tid=n.tenantId);const c=a;for(const f of Object.keys(c))c[f]===void 0&&delete c[f];const u=await n._getAppCheckToken(),h=u?`#${rT}=${encodeURIComponent(u)}`:"";return`${sT(n)}?${Ms(c).slice(1)}${h}`}function sT({config:n}){return n.emulator?il(n,nT):`https://${n.authDomain}/${tT}`}/**
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
 */const Ta="webStorageSupport";class iT{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=$p,this._completeRedirectFn=Pw,this._overrideRedirectResult=Sw}async _openPopup(e,t,r,s){var i;Gt((i=this.eventManagers[e._key()])===null||i===void 0?void 0:i.manager,"_initialize() not called before _openPopup()");const a=await Hh(e,t,r,nc(),s);return Zw(e,a,ll())}async _openRedirect(e,t,r,s){await this._originValidation(e);const i=await Hh(e,t,r,nc(),s);return cw(i),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:i}=this.eventManagers[t];return s?Promise.resolve(s):(Gt(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await Ww(e),r=new Vw(e);return t.register("authEvent",s=>(H(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Ta,{type:Ta},s=>{var i;const a=(i=s==null?void 0:s[0])===null||i===void 0?void 0:i[Ta];a!==void 0&&t(!!a),Ht(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=Mw(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Vp()||Ap()||al()}}const oT=iT;var Gh="@firebase/auth",Wh="1.10.8";/**
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
 */class aT{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){H(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function cT(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function lT(n){Sr(new Wn("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:a,authDomain:c}=r.options;H(a&&!a.includes(":"),"invalid-api-key",{appName:r.name});const u={apiKey:a,authDomain:c,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Np(n)},h=new FE(r,s,i,u);return zE(h,t),h},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),Sr(new Wn("auth-internal",e=>{const t=Po(e.getProvider("auth").getImmediate());return(r=>new aT(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),cn(Gh,Wh,cT(n)),cn(Gh,Wh,"esm2017")}/**
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
 */const uT=5*60,hT=Id("authIdTokenMaxAge")||uT;let Kh=null;const dT=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>hT)return;const s=t==null?void 0:t.token;Kh!==s&&(Kh=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function fT(n=Pd()){const e=wc(n,"auth");if(e.isInitialized())return e.getImmediate();const t=qE(n,{popupRedirectResolver:oT,persistence:[_w,iw,$p]}),r=Id("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(r,location.origin);if(location.origin===i.origin){const a=dT(i.toString());tw(t,a,()=>a(t.currentUser)),ew(t,c=>a(c))}}const s=wd("auth");return s&&HE(t,`http://${s}`),t}function pT(){var n,e;return(e=(n=document.getElementsByTagName("head"))===null||n===void 0?void 0:n[0])!==null&&e!==void 0?e:document}UE({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=s=>{const i=kt("internal-error");i.customData=s,t(i)},r.type="text/javascript",r.charset="UTF-8",pT().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});lT("Browser");const Wp={apiKey:"AIzaSyAsw466_wzsiLtbjw6FXZ1_O3HQ_AkVyU8",authDomain:"album-apexora.firebaseapp.com",projectId:"album-apexora",appId:"1:17231648284:web:20edb8477453f50473f1d9"},ic=!Object.values(Wp).some(n=>n.startsWith("PEGA")),Kp=kd(Wp),xn=Q0(Kp),Qh=fT(Kp);function Ia(){return new Promise((n,e)=>{const t=nw(Qh,r=>{t(),r?n(r):JE(Qh).then(s=>n(s.user),e)})})}function Yt(n){const e=n,t=String((e==null?void 0:e.code)??"");return ic?t.includes("operation-not-allowed")||t.includes("admin-restricted")?"Activa el acceso Anónimo en Firebase → Authentication → Sign-in method.":t.includes("api-key")||t.includes("invalid-app")?"La firebaseConfig de src/net/firebase.ts no es válida.":t.includes("permission-denied")?"Firebase rechazó la operación (¿sala llena, ya empezada o reglas sin publicar?).":t.includes("unavailable")||t.includes("network")?"Sin conexión con Firebase.":(e==null?void 0:e.message)??"Error de conexión":"Falta pegar tu firebaseConfig en src/net/firebase.ts"}const mT=n=>md([Li.Luminarae,Li.Umbra],n);function oc(n,e){if(e===0)return n;const t=r=>1-r;return{...n,p:[n.p[1],n.p[0]],token:t(n.token),active:t(n.active),winner:n.winner===null||n.winner===-1?n.winner:t(n.winner),tok:[n.tok[1],n.tok[0]],mull:[n.mull[1],n.mull[0]],stack:n.stack.map(r=>({...r,owner:t(r.owner)}))}}function Qp(n,e,t){return!t||typeof t.type!="string"?!1:t.type==="mulligan"?n.phase==="mulligan"&&t.player===e&&!n.mull[e]:n.phase!=="mulligan"&&n.active===e}function Jp(n,e,t){if(e===-1||!Qp(n,e,t))return n;try{return ws(n,t)}catch{return n}}const gT=(n,e)=>n.type==="mulligan"?{...n,player:e}:n,_T=n=>n.type==="mulligan"?{...n,player:0}:n,Jh="ABCDEFGHJKLMNPQRSTUVWXYZ23456789",yT=()=>Array.from({length:4},()=>Jh[Math.floor(Math.random()*Jh.length)]).join(""),ba="tcgRoom";class fn{constructor(e){Ne(this,"code","");Ne(this,"seat",0);Ne(this,"uid","");Ne(this,"g");Ne(this,"host","");Ne(this,"guest","");Ne(this,"seed",0);Ne(this,"applied",0);Ne(this,"sending",!1);Ne(this,"sentAt",-1);Ne(this,"unsubs",[]);Ne(this,"chatSeen",new Set);Ne(this,"ready",!1);Ne(this,"pulled",!1);Ne(this,"waiters",[]);this.h=e}static savedCode(){try{return localStorage.getItem(ba)}catch{return null}}save(){try{localStorage.setItem(ba,this.code)}catch{}}static clearSaved(){try{localStorage.removeItem(ba)}catch{}}async create(){if(!ic)throw new Error(Yt(null));try{const e=await Ia();this.uid=e.uid,this.seat=0,this.seed=Math.floor(Math.random()*2**31);for(let t=0;t<8;t++){const r=yT();if(!(await va(Mn(xn,"tcgGames",r))).exists())return await Vh(Mn(xn,"tcgGames",r),{host:e.uid,guest:null,seed:this.seed,status:"waiting",createdAt:dE()}),this.code=r,this.save(),this.h.onStatus(`Sala ${r}: esperando rival…`),this.listen(),r}}catch(e){throw new Error(Yt(e))}throw new Error("No se pudo crear la sala, inténtalo de nuevo")}async join(e){var r,s;if(!ic)throw new Error(Yt(null));const t=e.trim().toUpperCase();if(t.length!==4)throw new Error("El código tiene 4 caracteres");try{const i=await Ia();this.uid=i.uid;const a=Mn(xn,"tcgGames",t),c=await va(a);if(!c.exists())throw new Error("Esa sala no existe");const u=c.data();if(u.host===i.uid)this.seat=0;else if(u.guest===i.uid)this.seat=1;else{if(u.guest)throw new Error("La sala ya está llena");await uE(a,{guest:i.uid,status:"playing"}),this.seat=1}this.code=t,this.save(),this.listen()}catch(i){throw new Error((r=i.message)!=null&&r.startsWith("Esa sala")||(s=i.message)!=null&&s.startsWith("La sala")?i.message:Yt(i))}}async resume(e){try{const t=await Ia(),r=await va(Mn(xn,"tcgGames",e.trim().toUpperCase())),s=r.data();if(!r.exists()||(s==null?void 0:s.status)!=="playing"||s.host!==t.uid&&s.guest!==t.uid)throw fn.clearSaved(),new Error("Sala no disponible")}catch(t){throw fn.clearSaved(),t}await this.join(e)}listen(){const e=Mn(xn,"tcgGames",this.code);this.unsubs.push(Ea(e,t=>{const r=t.data();r&&(this.host=r.host,this.guest=r.guest??"",this.seed=r.seed,r.status==="playing"&&this.guest&&!this.ready&&(this.ready=!0,this.g=mT(this.seed),this.applied=0,this.pulled=!1,this.h.onReady(),this.h.onStatus(`Sala ${this.code}: ¡partida en marcha!`),this.unsubs.push(Ea(oE(ya(e,"chat"),aE("t")),s=>s.docChanges().forEach(i=>{var c,u;if(i.type!=="added"||this.chatSeen.has(i.doc.id))return;this.chatSeen.add(i.doc.id);const a=i.doc.data();(u=(c=this.h).onChat)==null||u.call(c,{id:i.doc.id,mine:a.by===this.uid,text:String(a.text??"")})}),s=>this.h.onStatus("Chat: "+Yt(s)))),this.unsubs.push(Ea(ya(e,"moves"),{includeMetadataChanges:!0},s=>this.pull(s.docs),s=>this.h.onStatus(Yt(s))))))},t=>this.h.onStatus(Yt(t))))}pull(e){const t=new Map;for(const c of e)c.metadata.hasPendingWrites||t.set(Number(c.id),c.data());const r=!this.pulled;this.pulled=!0;const s=[],i=this.applied;let a=!1;for(;t.has(this.applied);){const c=this.applied,u=t.get(c),h=u.by===this.host?0:u.by===this.guest?1:-1,f=this.g,m=Jp(f,h,u.action);m!==f&&h!==-1&&s.push({before:f,action:u.action,seat:h}),this.g=m,this.applied++,this.sending&&u.by===this.uid&&c===this.sentAt&&(this.sending=!1,a=!0)}this.applied===i&&!r||(this.h.onMoves(this.g,s,r||s.length>3),a&&this.h.onSettled(),this.waiters.splice(0).forEach(c=>c()))}waitAdvance(e,t){return new Promise(r=>{if(this.applied>e)return r(!0);const s=setTimeout(()=>r(!1),t);this.waiters.push(()=>{clearTimeout(s),r(this.applied>e)})})}async send(e){if(this.sending||!this.ready)return!1;this.sending=!0;for(let t=0;t<3;t++){const r=this.applied,s=JSON.parse(JSON.stringify(gT(e,this.seat)));this.sentAt=r;try{return await Vh(Mn(xn,"tcgGames",this.code,"moves",String(r)),{by:this.uid,action:s,t:Date.now()}),!0}catch{if(!await this.waitAdvance(r,4e3)||!Qp(this.g,this.seat,s))break}}return this.sending=!1,this.h.onStatus("No se pudo enviar la jugada; revisa el tablero y repítela."),!1}async sendChat(e){if(!this.ready)throw new Error("El chat se activa cuando entra el rival.");try{await hE(ya(xn,"tcgGames",this.code,"chat"),{by:this.uid,text:e.slice(0,140),t:Date.now()})}catch(t){throw new Error(Yt(t))}}get busy(){return this.sending}get isReady(){return this.ready}close(){this.unsubs.forEach(e=>e()),this.unsubs=[],this.waiters=[],fn.clearSaved()}}const vT=`
.onl{position:fixed;inset:0;z-index:9000;display:grid;place-items:center;background:rgba(5,5,12,.78)}
.onl>div{background:#14141f;border:1px solid #3a3a5a;border-radius:14px;padding:22px 24px;width:min(92vw,340px);display:grid;gap:12px;color:#eee;text-align:center}
.onl h2{margin:0}.onl input{padding:10px;font-size:22px;letter-spacing:6px;text-align:center;text-transform:uppercase;border-radius:8px;border:1px solid #444;background:#0c0c14;color:#fff}
.onl .st{min-height:1.2em;font-size:13px;opacity:.85}
.roomtag{position:fixed;top:6px;left:50%;transform:translateX(-50%);z-index:8000;font-size:12px;padding:3px 10px;border-radius:99px;background:rgba(20,20,31,.85);color:#ddd;pointer-events:none}
`;let cr=null,et=null;function Xp(){if(!document.getElementById("onl-css")){const n=document.createElement("style");n.id="onl-css",n.textContent=vT,document.head.append(n)}}function Ns(n){Xp(),cr||(cr=document.createElement("div"),cr.className="roomtag",document.body.append(cr)),cr.textContent=n,cr.hidden=!n}function vs(){et==null||et.remove(),et=null}function so(n){const e=et==null?void 0:et.querySelector(".st");e&&(e.textContent=n)}function ac(n){Xp(),vs(),et=document.createElement("div"),et.className="onl",et.innerHTML=`<div><h2>Jugar online</h2>
    ${n.inRoom?'<p>Ya estás en una sala.</p><button class="btn" data-x="leave">Salir de la sala</button>':'<button class="btn" data-x="create">Crear sala</button><p style="margin:0;opacity:.7">o únete con un código</p><input data-x="code" maxlength="4" placeholder="K7QF" autocomplete="off"><button class="btn" data-x="join">Unirse</button>'}
    <div class="st"></div><button class="ghost" data-x="close">Cerrar</button></div>`,document.body.append(et);const e=t=>{so("Conectando…"),t().catch(r=>so((r==null?void 0:r.message)??"Error"))};et.addEventListener("click",t=>{var s;const r=t.target.dataset.x;r&&(r==="close"?vs():r==="create"?e(n.create):r==="join"?e(()=>n.join(et.querySelector("[data-x=code]").value)):r==="leave"&&((s=n.leave)==null||s.call(n),vs()))}),et.addEventListener("keydown",t=>{var r;t.stopPropagation(),t.key==="Enter"&&((r=et.querySelector("[data-x=join]"))==null||r.click())})}const Ds=document.getElementById("app"),dt=document.createElement("div");dt.className="preview";document.body.append(dt);const Yp={barrera:"Barrera",robovida:"Robo de vida",arrollar:"Arrollar",letal:"Letal",rapido:"Ataque rápido",duro:"Duro",elusivo:"Elusivo",temible:"Temible",retador:"Retador",regenera:"Regeneración",efimero:"Efímero"},ET={barrera:"anula el siguiente daño que recibiría y luego se pierde.",robovida:"el daño que inflige cura a tu Nexo.",arrollar:"el daño sobrante sobre su bloqueador va al Nexo.",letal:"destruye cualquier unidad a la que dañe.",rapido:"al atacar, golpea antes que su bloqueador.",duro:"recibe 1 de daño menos de cada fuente.",elusivo:"solo puede ser bloqueada por unidades elusivas.",temible:"solo la bloquean unidades con 3 o más de poder.",retador:"al atacar, elige qué enemigo debe bloquearla.",regenera:"se cura por completo al final de cada ronda.",efimero:"muere al golpear o al acabar la ronda."},wT={barrera:"🛡",robovida:"🩸",arrollar:"🐗",letal:"☠",rapido:"⚡",duro:"🪨",elusivo:"🌫",temible:"👁",retador:"⚔",regenera:"♻",efimero:"⏳"},TT={burst:"Ráfaga",focus:"Enfoque",fast:"Rápido",slow:"Lento"},IT={burst:"Ráfaga: se resuelve al instante, no pasa la prioridad y sirve como reacción.",focus:"Enfoque: se resuelve al instante, no pasa la prioridad; solo como acción original.",fast:"Rápido: va a la pila; el rival puede responder. Sirve como reacción.",slow:"Lento: va a la pila; solo como acción original (con la pila vacía)."},Es=n=>n.replace(/[&<>"]/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[e]),No=()=>md([Li.Luminarae,Li.Umbra],Date.now());let A=No(),Fe=new Set,Tt=new Set,xs=!1,Je=!1,io=!1,Nr=0,ve=null,Lt=null,Ut=null,at=[20,20],gr=new Set,oo=[0,0],Ln=0,Ir=new Map,$n=[[],[]],_r=A;const Xh=new Map;let cc=!1,Yh=0,Zh=-1,Aa=0,se=null,pn=0;const lc=n=>(n+pn)%2,uc=n=>lc(n)?"Umbra":"Luminarae",Sa=n=>{se||Bt.react(n)};function Fn(n,e=""){const t=document.createElement("div");t.className="vfx "+n,t.textContent=e,document.body.append(t),setTimeout(()=>t.remove(),1400)}function $t(n){document.querySelectorAll(".toast").forEach(t=>t.remove());const e=document.createElement("div");e.className="vfx toast",e.textContent=n,document.body.append(e),setTimeout(()=>e.remove(),1800)}const Bt=new _g,_t=document.createElement("aside");_t.className="chat";_t.innerHTML=`<div class="tabs"><button data-t="chat" class="on">Chat</button><button data-t="log">Registro</button></div>
  <div class="msgs" id="msgs"></div><div class="logv" id="logv" hidden></div>
  <div class="inp"><input id="chat-in" maxlength="140" placeholder="Escribe un mensaje…" autocomplete="off"><button id="chat-send">➤</button></div>`;document.body.append(_t);const xi=_t.querySelector("#msgs"),Zp=_t.querySelector("#logv"),hc=_t.querySelector("#chat-in");Bt.onMessage(n=>{const e=document.createElement("div");if(e.className="msg "+n.side,n.side==="sys")e.textContent=n.text;else{const t=document.createElement("b");t.textContent=n.from+":",e.append(t,document.createTextNode(n.text))}xi.append(e),xi.scrollTop=xi.scrollHeight,n.side==="foe"&&he("msg")});const em=()=>{const n=hc.value.trim();n&&(hc.value="",se?se.sendChat(n).catch(e=>Bt.sys((e==null?void 0:e.message)??"No se pudo enviar el mensaje")):Bt.send(n))};_t.querySelector("#chat-send").addEventListener("click",em);hc.addEventListener("keydown",n=>{n.key==="Enter"&&em(),n.stopPropagation()});_t.querySelectorAll(".tabs button").forEach(n=>n.addEventListener("click",()=>{const e=n.dataset.t==="log";Zp.hidden=!e,xi.hidden=e,_t.querySelector(".inp").hidden=e,_t.querySelectorAll(".tabs button").forEach(t=>t.classList.toggle("on",t===n))}));Bt.sys("Chat local: escribe y el rival te responderá. Más adelante puede conectarse a Firebase.");function Oi(n,e,t=-1){const r=Te[n],s=e.map(a=>`<p><b>${Yp[a]}:</b> ${ET[a]}</p>`),i=xr(n);if(r.type==="spell"){const a=Math.min(A.p[0].spell,r.cost);s.push(`<p>✦ ${IT[r.speed??"fast"]}</p><p>💎 Se paga primero con la reserva de hechizo: ${a} de reserva + ${r.cost-a} de maná.</p>`)}else s.push("<p>Puede atacar nada más jugarla. Solo el jugador con la ficha de ataque puede atacar.</p>");if(i&&s.push(`<p>🎯 Eliges tú el objetivo (${i==="enemy"?"unidad enemiga":"unidad aliada"}). Si desaparece antes de resolverse, el hechizo se disipa.</p>`),r.fx.some(a=>a.t==="sacDraw"||a.t==="sacDmg")&&s.push("<p>⚠ Sacrifica a tu unidad más débil.</p>"),t>=0&&!Or(A,0,t)){const a=A.p[0],c=r.type==="spell"?a.mana+a.spell:a.mana;s.push(`<p>⛔ ${r.cost>c?`Maná insuficiente: cuesta ${r.cost}, tienes ${c}.`:A.active!==0?"Ahora no tienes la prioridad.":r.type==="unit"?a.board.length>=6?"Tu tablero está lleno.":"Solo se juegan unidades con la pila vacía, en tu turno.":"Ahora no puedes jugarla (¿necesita objetivo o pila vacía?)."}</p>`)}return`<div class="rules">${s.join("")}</div>`}const bT=n=>{const e=n.slice(0,3);return`<div class="art"><span class="glyph">${Te[n].type==="spell"?"✦":e==="lum"?"☀":"☾"}</span><img src="${mg(n)}" onerror="this.remove()"></div>`};function Ft(n,e="",t="",r,s=""){const i=Te[n],a=n.slice(0,3),c=r?r.kw:i.kw,u=r&&r.dmg>0?"dmg":"",h=(i.type==="spell"?[TT[i.speed??"fast"]]:[]).concat(c.map(f=>Yp[f])).join(" · ");return`<div class="card ${i.type} ${a} ${t}" ${e}>${bT(n)}
    <div class="side"><i class="cost">${i.cost}</i>${c.map(f=>`<i class="ki">${wT[f]}</i>`).join("")}</div>
    <div class="panel"><div class="nm">${Et(n)}</div><div class="orn"></div><p class="tx"><em>${h}</em>${i.text}</p></div>
    ${i.type==="unit"?`<b class="atk ${r&&r.ta?"tmp":""}">${r?ae(r):i.atk}<s>⚔</s></b><b class="hp ${u}">${r?we(r):i.hp}<s>♥</s></b>`:""}${s}</div>`}function ed(n,e,t){document.querySelectorAll(".spot").forEach(s=>s.remove());const r=document.createElement("div");r.className="vfx spot",r.innerHTML=`<div class="spot-l">Juegas</div>${Ft(n,"","",t)}`,document.body.append(r),setTimeout(()=>r.remove(),1250)}function td(n,e,t){document.querySelectorAll(".reader").forEach(c=>c.remove());const r=Te[n],s=r.type==="spell"?6500:3800,i=document.createElement("div");i.className="reader foe",cc=!0,i.innerHTML=`<div class="rd-h">⚠ El rival juega</div>${Ft(n,"","",t)}<div class="rd-t"><b>${Es(Et(n))}</b> · coste ${r.cost}<p>${Es(r.text)}</p></div>${Oi(n,t?t.kw:r.kw)}<button class="rd-ok" type="button">Entendido ✓</button><i class="rd-bar" style="animation-duration:${s}ms"></i>`,document.body.append(i);const a=()=>{i.isConnected&&(i.remove(),cc=!1)};i.querySelector(".rd-ok").addEventListener("click",a),i.addEventListener("click",a),setTimeout(a,s)}function nd(n,e,t){const r=n.nexus<at[e]?"hit":n.nexus>at[e]?"heal":"",s=n.nexus-at[e],i=Array.from({length:n.maxMana},(a,c)=>`<u class="${c<n.mana?"on":""}"></u>`).join("");return`<div class="pt ${e?"foe":"me"}"><div class="ava"><span>${lc(e)?"☾":"☀"}</span><img src="/Apexora-TCG/img/avatar_${lc(e)?"umb":"lum"}.webp" onerror="this.remove()"></div>
    <div class="orb ${r}">${Math.max(0,n.nexus)}${s?`<span class="fx">${s>0?"+":""}${s}</span>`:""}</div>
    <div class="pname">${t}</div><div class="pmana">${i}<span class="sm">${[0,1,2].map(a=>`<i class="${a<n.spell?"on":""}"></i>`).join("")}</span></div></div>`}function tm(n,e){if(A.phase!=="main")return;if(se){Bn({type:"attack",units:n});return}const t=Nr;Je=!0,Ut={side:e,idx:n},he("attack"),Fn("banner small",`⚔ ${e?"El rival ataca":"Atacas"} con ${n.length}`),Ee(),setTimeout(()=>{if(t!==Nr)return;Ut=null,Je=!1;const r=ws(A,{type:"attack",units:n});if(r===A){$t("No puedes atacar ahora"),Fe.clear(),Ee();return}A=r,Fe.clear(),Ee(),zr()},900)}function AT(n,e){const t=n.token,r=1-t,s=n.p[r].nexus-e.p[r].nexus,i=g=>n.p[g].board.filter(S=>!e.p[g].board.some(P=>P.uid===S.uid)).map(S=>Et(S.card)),a=i(0),c=i(1),u=n.attackers.length,h=[`${t?"El rival atacó":"Atacaste"} con ${u}`,s>0?`${t?"Tu Nexo":"Nexo rival"} −${s}`:"sin daño al Nexo"];a.length&&h.push("Tuyas caídas: "+a.join(", ")),c.length&&h.push("Rivales caídas: "+c.join(", "));const f="⚔ "+h.join(" · "),m=document.createElement("div");m.className="vfx report"+(t?"":" good"),m.textContent=f,document.body.append(m),setTimeout(()=>m.remove(),3600),Bt.sys(f)}function Ee(){A.round!==Ln&&A.round>0&&A.phase!=="mulligan"&&(Yh=Date.now()+1400,setTimeout(()=>Ee(),1450)),dt.style.display="none",Fm(A.phase==="block"||A.stack.length?1:0);const n=A.p[0],e=A.p[1],t=A.active===0&&A.winner===null&&!Je&&A.phase!=="mulligan",r=A.phase==="block"&&A.token===1&&A.active===0,s=new Set(Object.values(A.blocks)),i=new Set(A.attackers),a=A.attackers.length?A.token:0,c=[];A.attackers.length?A.attackers.forEach(O=>{const F=A.p[a].board.findIndex(_e=>_e.uid===O);if(F<0)return;const B=A.blocks[String(O)],le=B===void 0?-1:A.p[1-a].board.findIndex(_e=>_e.uid===B);c.push({a:A.p[a].board[F],ai:F,b:le>=0?A.p[1-a].board[le]:void 0,bi:le})}):A.phase==="main"&&Fe.size&&[...Fe].forEach(O=>{n.board[O]&&c.push({a:n.board[O],ai:O,bi:-1})});const u=(O,F)=>c.some(B=>(F===a?B.a:B.b)===O),h=(O,F,B)=>{const le=B===0,_e=Ir.get(O.uid),Vt=we(O);let ue="",oe="";_e&&A.round===Ln&&(Vt<_e[1]?(oe="hurt",ue=String(Vt-_e[1])):(Vt>_e[1]||ae(O)>_e[0])&&(oe="boost",ue="+"+(Vt>_e[1]?Vt-_e[1]:ae(O)-_e[0]))),Xh.set(O.uid,Ft(O.card,"","mini dying",O));const tr=ve&&(ve.kind==="enemy"&&!le||ve.kind==="ally"&&le),kn=tr?"tgt":le?"unit":r&&i.has(O.uid)?"enemy-unit":"view",Do=le&&t&&A.phase==="main"&&A.tok[0]&&!A.attackers.length,nr=`mini ${Fe.has(F)&&le?"sel ":""}${Do?"can ":""}${gr.has(O.uid)?"":"enter "}${oe} ${tr?"tgtok ":""}${!le&&Lt===F?"blocktarget ":""}${le&&s.has(O.uid)?"assignedblock ":""}${A.forced.includes(O.uid)||A.forced.some(xo=>A.blocks[String(xo)]===O.uid)?"forced ":""}${i.has(O.uid)?"atkr ":""}${Ut&&Ut.side===B&&Ut.idx.includes(F)?"attacking "+(B?"down":"up"):""}`;return Ft(O.card,`data-u="${B}:${F}" data-a="${kn}" data-i="${F}" data-uid="${O.uid}"`,nr,O,ue?`<span class="fx">${ue}</span>`:"")},f=(O,F)=>{const B=[],le=[];O.board.forEach((ue,oe)=>{u(ue,F)||B.push(h(ue,oe,F))}),c.forEach(ue=>{const oe=F===a?ue.a:ue.b,tr=F===a?ue.ai:ue.bi;le.push(oe?h(oe,tr,F):`<div class="slot cslot ${F?"umb":"lum"} ${r&&F===0?"ask":""}">${r&&F===0?"<span>Elige<br>defensor</span>":""}</div>`)});const _e=$n[F].filter(ue=>!O.board.some(oe=>oe.uid===ue)).map(ue=>Xh.get(ue)??""),Vt=Array.from({length:Math.max(0,6-O.board.length)},(ue,oe)=>`<div class="slot ${F?"umb":"lum"}">${_e[oe]??""}</div>`).join("");return{back:B.join("")+Vt,comb:le.join("")}},m=f(e,1),g=f(n,0),S=A.phase==="mulligan"?"Mulligan":A.phase==="main"?"Prioridad":A.phase==="block"?"Bloqueos":"Pila",P=A.winner!==null?A.winner===-1?"Empate":A.winner===0?"¡Victoria!":"Derrota":ve?`Elige objetivo para ${Et(n.hand[ve.hand])} · Esc cancela`:A.phase==="stack"?t?`Responde o pulsa OK · ${A.stack.length} en la pila`:`Pila · ${A.stack.length}`:A.phase==="block"?r?"Toca un atacante y luego tu bloqueador":A.active===0?"Rival bloqueó: puedes responder o resolver":"El rival asigna bloqueos…":t?A.passes===1?"El rival pasó: pasa también para cerrar la ronda":A.tok[0]?"Tu turno: juega cartas o selecciona unidades y ataca":"Tu turno: juega cartas o pasa":"El rival tiene la prioridad…",x=A.log.slice(-14).map(O=>O.replace(/\{(\w+)\}/g,(F,B)=>`<b>${Et(B)}</b>`)).join("<br>"),N=A.attackers.length?`<div class="blocksummary"><b>⚔ Combate</b>${A.attackers.map(O=>{const F=A.p[A.token].board.find(_e=>_e.uid===O),B=A.blocks[String(O)],le=B===void 0?void 0:A.p[1-A.token].board.find(_e=>_e.uid===B);return`<span>${F?Et(F.card):"?"} <i>→</i> ${le?Et(le.card):"<em>Sin bloquear</em>"}</span>`}).join("")}</div>`:"";let K="RIVAL",z="wait";t&&(A.phase==="main"?Fe.size?(K=`ATACAR ${Fe.size}`,z="atk"):(K=A.passes===1?"FIN DE RONDA":"PASAR",z="go"):A.phase==="block"?(K=r?Object.keys(A.blocks).length?"BLOQUEAR":"SIN BLOQUEO":"RESOLVER",z="go"):(K="OK",z="go"));const J=O=>{const F=O===void 0?void 0:[...A.p[0].board,...A.p[1].board].find(B=>B.uid===O);return F?Et(F.card):""},fe=A.stack.length?`<div class="stacktray"><b>✦ Pila · se resuelve de arriba abajo</b>${[...A.stack].map((O,F)=>({x:O,k:F})).reverse().map(({x:O,k:F},B)=>{const le=Te[O.card],_e=J(O.target);return`<div data-st="${F}" class="stackitem ${O.owner?"foe":"me"} ${B===0?"top":""}"><div class="si-h"><em>${O.owner?"Rival":"Tú"}</em><strong>${Et(O.card)}</strong><i>${le.cost}</i></div><p>${Es(le.text)}</p>${_e?`<small>🎯 Objetivo: ${Es(_e)}</small>`:""}</div>`}).join("")}</div>`:"",tt=Date.now()<Yh&&A.phase!=="mulligan",ye=A.phase==="block"||A.phase==="stack"&&A.resumePhase==="block",w=A.phase==="mulligan"?-1:tt?0:ye?2:A.passes===1&&!A.attackers.length&&A.phase==="main"?3:1,_=[["ROBO","Robas 1 carta y ganas 1 de maná"],["INVOCACIÓN","Juega unidades y hechizos"],["COMBATE","Ataque y bloqueo · hechizos rápidos permitidos"],["FINAL","Si ambos pasáis, acaba la ronda y pasa el turno"]];Ds.dataset.ph=String(w);const y=A.winner!==null||A.phase==="mulligan"?"":A.active===0?"mine":"theirs",E=`<div class="phasehud ${y}"><div class="who">${y==="mine"?"⚡ TU TURNO":y?"⏳ TURNO RIVAL":"PARTIDA"}</div><ol>${_.map((O,F)=>`<li class="${F===w?"on":F<w?"done":""}"><i>${F+1}</i><span>${O[0]}</span>${F===w?`<small>${O[1]}</small>`:""}</li>`).join("")}</ol>${A.stack.length?'<div class="hstack">✦ Pila activa</div>':""}</div>`,T=n.hand.length,b=n.hand.map((O,F)=>{const B=F-(T-1)/2;return`<div class="slotc" data-a="hand" data-i="${F}" style="--rot:${(B*3.2).toFixed(1)}deg;--y:${(B*B*2.6).toFixed(1)}px" aria-label="${Es(Et(O))}, coste ${Te[O].cost}">${Ft(O,"",`${t&&Or(A,0,F)?"ok":"no"} ${(ve==null?void 0:ve.hand)===F?"sel":""}`)}</div>`}).join(""),v=A.phase==="mulligan"&&A.mull[0]?'<div class="mull"><h2>Mulligan</h2><p>Esperando al rival…</p></div>':A.phase==="mulligan"?`<div class="mull"><h2>Mulligan</h2><p>Toca las cartas que quieras reemplazar (0 a 4)</p><div class="mrow">${n.hand.map((O,F)=>Ft(O,`data-a="mul" data-i="${F}"`,Tt.has(F)?"sel swap":"")).join("")}</div><button class="btn" data-a="mulgo">${Tt.size?`Reemplazar ${Tt.size}`:"Conservar mano"}</button></div>`:"";Ds.innerHTML=`<header><div class="brand"><span class="brand-mark">✦</span><h1>Cartas <small>ALFA</small></h1></div><div class="header-state"><span class="rd">Ronda ${A.round}/40</span><span class="phase-chip">${S}</span><span class="tok">${A.tok[0]?"⚑ Tienes la ficha de ataque":A.tok[1]?"⚑ Ficha de ataque: rival":"⚑ Ficha gastada"}</span></div>
    <nav class="toolbar"><button class="ghost" data-a="chat">${xs?"✕ Cerrar":"☰ Chat / registro"}</button><button class="ghost icon-btn" data-a="mute">${Mm()?"🔇":"🔊"}</button><button class="ghost" data-a="menu">⌂ Menú</button><button class="ghost" data-a="online">🌐 Online</button><button class="ghost" data-a="new">↻ Nueva partida</button></nav></header><main class="stage ${ve?"targeting":""}">
      <div class="foehand">${Array.from({length:e.hand.length},()=>"<i></i>").join("")}</div>
      <div class="plane-wrap"><div class="plane"><div class="lane foeback">${m.back}</div><div class="lane foecomb">${m.comb}</div><div class="lane mycomb">${g.comb}</div><div class="lane myback">${g.back}</div></div></div>
      
      <div class="msgbar"><span class="pill ${t?"go":""}">${P}</span></div>
      <aside class="sideL">${E}${fe}${N}<div class="pgroup me"><div class="pile p0" data-l="MAZO" title="Tu mazo"><b>${n.deck.length}</b></div>${nd(n,0,`${uc(0)} · Tú`)}</div></aside>
      <aside class="sideR"><div class="pgroup foe">${nd(e,1,`${uc(1)} · Rival`)}<div class="pile p1" data-l="MAZO" title="Mazo rival"><b>${e.deck.length}</b></div></div>
      <div class="manapanel"><div class="mrow2"><b>MANÁ</b><span>${n.mana}/${n.maxMana}</span></div><div class="gems">${Array.from({length:Math.max(n.maxMana,1)},(O,F)=>`<u class="${F<n.mana?"on":""}"></u>`).join("")}</div>
        <div class="mrow2" title="Reserva exclusiva para hechizos: se gasta ANTES que el maná normal y se rellena con el maná que te sobra al acabar la ronda (máximo 3)."><b>RESERVA ✦</b><span>${n.spell}/3</span></div><div class="gems sp">${[0,1,2].map(O=>`<u class="${O<n.spell?"on":""}"></u>`).join("")}</div><p class="mnote">Reserva: solo hechizos, se gasta primero. Se llena con el maná que sobra al cerrar la ronda (máx. 3).</p></div>
      <button class="endbtn ${z}" data-a="${z==="atk"?"attack":"go"}" ${z==="wait"?"disabled":""}><span>${K}</span></button></aside>
      <div class="fan">${b}</div></main>`+v+(A.winner!==null?`<div class="over"><h2>${P}</h2><button class="btn" data-a="new">Jugar de nuevo</button></div>`:"");const ut=A.p.some(O=>O.board.some(F=>!gr.has(F.uid))),Rn=$n.some(O=>O.some(F=>!A.p.some(B=>B.board.some(le=>le.uid===F))));ut&&he("summon"),Rn&&he("death"),A.p.forEach((O,F)=>O.board.filter(B=>!gr.has(B.uid)).forEach(B=>F?td(B.card,1,B):ed(B.card,0,B))),n.nexus<at[0]?Fn("vhit"):n.nexus>at[0]&&Fn("vheal"),(n.nexus<at[0]||e.nexus<at[1])&&he("hurt"),(n.nexus>at[0]||e.nexus>at[1])&&he("heal"),A.p.forEach((O,F)=>{const B=O.played[O.played.length-1];O.played.length>oo[F]&&B&&Te[B].type==="spell"&&(Fn("cast "+B.slice(0,3)),he("spell_"+B.slice(0,3)),F?td(B):ed(B),F===1&&Sa("cast"))}),A.round!==Ln&&A.round>0&&(Fn("banner",`Ronda ${A.round}`),he("round"),n.spell>Aa&&setTimeout(()=>$t(`✦ +${n.spell-Aa} reserva de hechizo (maná sobrante)`),1500)),A.active===0&&Zh!==0&&!Je&&A.winner===null&&A.phase!=="mulligan"&&A.round===Ln&&(Fn("banner small turn",r?"🛡 Tu turno · bloquea":"⚡ Tu turno"),he("round")),Zh=A.phase==="mulligan"?-1:A.active,Aa=n.spell,_r.attackers.length&&!A.attackers.length&&_r.round===A.round&&AT(_r,A),at=[n.nexus,e.nexus],oo=A.p.map(O=>O.played.length),Ln=A.round,_r=A,Ir=new Map,$n=[[],[]],A.p.forEach((O,F)=>O.board.forEach(B=>{gr.add(B.uid),Ir.set(B.uid,[ae(B),we(B)]),$n[F].push(B.uid)})),A.winner!==null&&!io&&(io=!0,se&&fn.clearSaved(),he(A.winner===0?"win":"lose"),A.winner===0?Sa("win"):A.winner===1&&Sa("lose")),Zp.innerHTML=x,_t.hidden=!xs}function Bn(n){if(se){if(Je||se.busy)return;if(!se.isReady){$t("Esperando al rival… Para jugar contra la IA, sal de la sala desde 🌐 Online");return}if(ws(A,_T(n))===A){$t(n.type==="block"?"Ese bloqueo no es válido (Elusivo/Temible/ya asignado)":n.type==="play"?"No puedes jugar eso ahora":"Acción no válida");return}(n.type==="pass"||n.type==="confirmBlocks")&&he("pass"),Je=!0,Fe.clear(),ve=null,Lt=null,Ee(),se.send(n).then(r=>{r||(Je=!1,Ee())});return}const e=ws(A,n);if(e===A){$t(n.type==="block"?"Ese bloqueo no es válido (Elusivo/Temible/ya asignado)":n.type==="play"?"No puedes jugar eso ahora":"Acción no válida");return}(n.type==="pass"||n.type==="confirmBlocks")&&he("pass"),A=e,Fe.clear(),ve=null,Lt=null,Ee(),zr()}function zr(){if(se||A.winner!==null||A.active!==1||A.phase==="mulligan")return;const n=Nr,e=()=>{if(n!==Nr||Je||A.winner!==null||A.active!==1)return;if(cc){setTimeout(e,300);return}const t=fg(A);if(t.type==="attack"){tm(t.units,1);return}A=ws(A,t),Ee(),zr()};setTimeout(e,1200)}function dc(){A.active===0&&A.winner===null&&!Je&&(he("click"),A.phase==="main"&&Fe.size?tm([...Fe],0):A.phase==="block"&&A.token===1?Bn({type:"confirmBlocks"}):Bn({type:"pass"}))}Ds.addEventListener("click",n=>{const e=n.target.closest("[data-a]");if(ve&&(e==null?void 0:e.dataset.a)!=="tgt"&&(ve=null,Ee(),!e||e.dataset.a==="hand")||!e)return;const t=e.dataset.a,r=Number(e.dataset.i),s=A.active===0&&A.winner===null&&!Je&&A.phase!=="mulligan";if(t==="chat")xs=!xs,he("click"),Ee();else if(t==="mute")Lm(),he("click"),Ee();else if(t==="new"&&se)$t("Para otra partida online crea o únete a una sala nueva"),ac(fc());else if(t==="menu")he("click"),ld();else if(t==="online")he("click"),ac(fc());else if(t==="new")he("click"),Nr++,Je=!1,Ut=null,Lt=null,ve=null,A=No(),Fe.clear(),Tt.clear(),at=[20,20],gr.clear(),oo=[0,0],Ln=0,Ir.clear(),$n=[[],[]],io=!1,_r=A,Ee();else if(t==="mul")he("select"),Tt.has(r)?Tt.delete(r):Tt.add(r),Ee();else if(t==="mulgo"){he("click");const i=[...Tt];Tt.clear(),Bn({type:"mulligan",idx:i})}else if(s)if(t==="tgt"){if(ve){const i=Number(e.dataset.uid),a=ve.hand;Bn({type:"play",hand:a,target:i})}}else if(t==="hand"){if(!Or(A,0,r)){$t("No puedes jugar esa carta ahora");return}const i=xr(A.p[0].hand[r]);he("select"),i?(ve={hand:r,kind:i},Ee()):Bn({type:"play",hand:r})}else t==="go"||t==="attack"?dc():t==="enemy-unit"&&A.phase==="block"?(Lt=r,he("select"),Ee()):t==="unit"&&A.phase==="block"&&A.token===1?Lt===null?$t("Primero toca al atacante rival"):Bn({type:"block",attacker:Lt,blocker:r}):t==="unit"&&A.phase==="main"&&A.tok[0]&&!A.attackers.length&&(Fe.has(r)?Fe.delete(r):Fe.add(r),he("select"),Ee());else return});document.addEventListener("keydown",n=>{n.target.tagName!=="INPUT"&&(n.key==="Escape"&&ve?(ve=null,Ee()):n.key===" "&&A.phase!=="mulligan"&&(n.preventDefault(),dc()))});document.addEventListener("contextmenu",n=>{ve&&(n.preventDefault(),ve=null,Ee())});const nm=()=>document.querySelectorAll(".manapanel u.pay").forEach(n=>n.classList.remove("pay"));function ST(n){nm();const e=Te[n],t=A.p[0],r=e.type==="spell"?Math.min(t.spell,e.cost):0,s=e.cost-r,i=document.querySelectorAll(".manapanel .gems"),a=(c,u,h)=>{var m;if(!c)return;const f=c.querySelectorAll("u");for(let g=u-1;g>=Math.max(0,u-h);g--)(m=f[g])==null||m.classList.add("pay")};a(i[0],t.mana,s),a(i[1],t.spell,r)}Ds.addEventListener("mouseover",n=>{var r,s;const e=n.target.closest("[data-st]");if(e){const i=(r=A.stack[Number(e.dataset.st)])==null?void 0:r.card;i&&(dt.innerHTML=Ft(i)+Oi(i,Te[i].kw),dt.style.display="block");return}const t=n.target.closest('[data-u],[data-a="hand"]');if((!t||!t.dataset.i||t.dataset.a!=="hand")&&nm(),(t==null?void 0:t.dataset.a)==="hand"){const i=A.p[0].hand[Number(t.dataset.i)];i&&ST(i)}if(!t){dt.style.display="none";return}if(t.dataset.u){const[i,a]=t.dataset.u.split(":").map(Number),c=(s=A.p[i])==null?void 0:s.board[a];c&&(dt.innerHTML=Ft(c.card,"","",c)+Oi(c.card,c.kw),dt.style.display="block")}else{const i=Number(t.dataset.i),a=A.p[0].hand[i];a&&(dt.innerHTML=Ft(a)+Oi(a,Te[a].kw,i),dt.style.display="block")}});Ds.addEventListener("mouseleave",()=>{dt.style.display="none"});const zn=[];let Dr=!1;function ao(n){Nr++,Je=!1,Ut=null,Lt=null,ve=null,A=n,Fe.clear(),Tt.clear(),io=n.winner!==null,at=[n.p[0].nexus,n.p[1].nexus],oo=n.p.map(e=>e.played.length),Ln=n.round,_r=n,gr=new Set(n.p.flatMap(e=>e.board.map(t=>t.uid))),Ir=new Map,$n=[[],[]],n.p.forEach((e,t)=>e.board.forEach(r=>{Ir.set(r.uid,[ae(r),we(r)]),$n[t].push(r.uid)})),Ee()}function rm(){const n=zn.shift();if(!n){Dr=!1;return}Dr=!0;const e=oc(Jp(n.before,n.seat,n.action),pn),t=()=>{Ut=null,Je=!1,A=e,Fe.clear(),ve=null,Lt=null,Ee(),setTimeout(rm,0)};if(n.action.type==="attack"&&zn.length===0){const r=n.seat===pn?0:1;Je=!0,Ut={side:r,idx:n.action.units},he("attack"),Fn("banner small",`⚔ ${r?"El rival ataca":"Atacas"} con ${n.action.units.length}`),Ee(),setTimeout(t,900)}else t()}function fc(){return{inRoom:!!se,create:async()=>{pc();try{const n=await se.create();Ns(`Sala ${n} · esperando rival…`),so(`Código de sala: ${n} — pásaselo a tu rival`)}catch(n){throw se=null,n}},join:async n=>{pc();try{await se.join(n)}catch(e){throw se=null,e}},leave:()=>{se==null||se.close(),se=null,pn=0,zn.length=0,Dr=!1,Ns(""),ao(No()),zr()}}}function pc(){se||(se=new fn({onStatus:n=>{Ns(n),so(n)},onChat:n=>{Bt.push({from:n.mine?"Tú":"Rival",text:n.text,side:n.mine?"me":"foe"}),!n.mine&&!xs&&$t("💬 Rival: "+n.text.slice(0,60))},onReady:()=>{pn=se.seat,vs(),ud(),Bt.sys("Chat online activo: puedes escribir a tu rival."),ao(oc(se.g,pn)),Bt.sys(`Sala ${se.code}: juegas con ${uc(0)}.`)},onMoves:(n,e,t)=>{t?(zn.length=0,ao(oc(n,pn))):(zn.push(...e),Dr||rm())},onSettled:()=>{!Dr&&!zn.length&&Je&&(Je=!1,Ee())}}))}const rd=fn.savedCode();rd&&(pc(),se.resume(rd).catch(()=>{se=null,fn.clearSaved(),Ns("")}));document.addEventListener("menu:ia",()=>{se&&(se.close(),se=null,pn=0,zn.length=0,Dr=!1,Ns(""),vs(),ao(No()),zr())});document.addEventListener("menu:online",()=>ac(fc()));Ee();zr();rg();
