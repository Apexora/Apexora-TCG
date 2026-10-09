var ng=Object.defineProperty;var rg=(n,e,t)=>e in n?ng(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var Be=(n,e,t)=>rg(n,typeof e!="symbol"?e+"":e,t);import{onSesion as sg,registrarVisita as ig}from"https://apexora.github.io/portal/apexora-core.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=t(s);fetch(s.href,i)}})();let G,or,Vs,Bi,As,Qa=!1,It=!1,Cu=!1,bd=0,Ia=0,Vu=0,Vi=0;try{It=localStorage.getItem("cartas-mute")==="1"}catch{}const og=()=>It;function ag(){It=!It;try{localStorage.setItem("cartas-mute",It?"1":"0")}catch{}return Qa&&Bi.gain.setTargetAtTime(It?0:.85,G.currentTime,.06),It}function lg(n){bd=n}const K=n=>440*Math.pow(2,(n-69)/12),Ss=(n,e)=>n+Math.random()*(e-n);function cg(n){const e=G.sampleRate,t=Math.floor(e*n),r=G.createBuffer(2,t,e);for(let s=0;s<2;s++){const i=r.getChannelData(s);let a=0;for(let l=0;l<t;l++){const u=l/t,h=.9-.78*u;a+=(Math.random()*2-1-a)*h,i[l]=l<e*.018?0:a*Math.pow(1-u,2.8)*(l<e*.02?.2:1)}for(const[l,u]of[[23,.5],[37,.35],[53,.3],[71,.22]])i[Math.floor(e*(l+s*5)/1e3)]+=u*(s?-1:1)}return r}function Ml(){if(Qa){G.state==="suspended"&&G.resume();return}G=new AudioContext,Qa=!0;const n=G.createDynamicsCompressor();n.threshold.value=-20,n.knee.value=18,n.ratio.value=3.5,n.attack.value=.004,n.release.value=.22;const e=G.createBiquadFilter();e.type="lowshelf",e.frequency.value=140,e.gain.value=2.5;const t=G.createBiquadFilter();t.type="highshelf",t.frequency.value=6500,t.gain.value=1.5,Bi=G.createGain(),Bi.gain.value=It?0:.85;const r=G.createGain();r.connect(e).connect(t).connect(n).connect(Bi).connect(G.destination);const s=G.createConvolver();s.buffer=cg(3.2);const i=G.createGain();i.gain.value=.9,s.connect(i).connect(r);const a=G.createDelay(1);a.delayTime.value=.375;const l=G.createGain();l.gain.value=.4;const u=G.createBiquadFilter();u.type="lowpass",u.frequency.value=2200,a.connect(u).connect(l).connect(a),u.connect(r),u.connect(s),or=G.createGain(),Vs=G.createGain(),Vs.gain.value=.55;const h=(p,_,A)=>{p.connect(r);const k=G.createGain();if(k.gain.value=_,p.connect(k).connect(s),A){const V=G.createGain();V.gain.value=A,p.connect(V).connect(a)}};h(or,.32,.06),h(Vs,.6,.22),As=G.createWaveShaper();const f=new Float32Array(1024);for(let p=0;p<1024;p++){const _=p/512-1;f[p]=Math.tanh(_*4)*.8}As.curve=f,As.oversample="2x",As.connect(or)}function _e(n,e,t,r={}){const s=G.createGain(),i=G.createBiquadFilter(),a=G.createStereoPanner(),l=(r.vol??.1)*(r.det?.6:1),u=r.att??.004;if(i.type="lowpass",i.Q.value=r.q??.7,i.frequency.setValueAtTime(r.lp??9e3,e),r.lpEnd&&i.frequency.exponentialRampToValueAtTime(Math.max(40,r.lpEnd),e+t),a.pan.value=r.pan??0,s.gain.setValueAtTime(1e-4,e),s.gain.linearRampToValueAtTime(l,e+u),r.pad){const h=r.rel??t*.4;s.gain.setValueAtTime(l,e+Math.max(u,t-h)),s.gain.linearRampToValueAtTime(1e-4,e+t)}else s.gain.exponentialRampToValueAtTime(1e-4,e+t);i.connect(s).connect(a).connect(r.bus??or);for(const h of r.det?[-r.det,r.det]:[0]){const f=G.createOscillator();if(f.type=r.type??"sine",f.frequency.setValueAtTime(n,e),f.detune.value=h,r.slide&&f.frequency.exponentialRampToValueAtTime(Math.max(20,n*Math.pow(2,r.slide/12)),e+t),r.vib){const p=G.createOscillator(),_=G.createGain();p.frequency.value=5,_.gain.value=r.vib,p.connect(_).connect(f.detune),p.start(e),p.stop(e+t+.1)}f.connect(i),f.start(e),f.stop(e+t+.1)}}function ke(n,e,t,r={}){const s=G.createOscillator(),i=G.createOscillator(),a=G.createGain(),l=G.createGain(),u=G.createStereoPanner(),h=(r.idx??2)*n;s.frequency.value=n,i.frequency.value=n*(r.ratio??2.01),a.gain.setValueAtTime(h,e),a.gain.exponentialRampToValueAtTime(Math.max(1,h*.02),e+t),i.connect(a).connect(s.frequency),l.gain.setValueAtTime(1e-4,e),l.gain.linearRampToValueAtTime(r.vol??.1,e+(r.att??.003)),l.gain.exponentialRampToValueAtTime(1e-4,e+t),u.pan.value=r.pan??0,s.connect(l).connect(u).connect(r.bus??or),s.start(e),i.start(e),s.stop(e+t+.1),i.stop(e+t+.1)}let ws;function Ad(){if(ws)return ws;ws=G.createBuffer(1,G.sampleRate*2,G.sampleRate);const n=ws.getChannelData(0);let e=0,t=0,r=0;for(let s=0;s<n.length;s++){const i=Math.random()*2-1;e=.99765*e+i*.099,t=.963*t+i*.2965,r=.57*r+i*1.0527,n[s]=(e+t+r+i*.1848)*.2}return ws}function Ve(n,e,t={}){const r=G.createBufferSource(),s=G.createBiquadFilter(),i=G.createGain(),a=G.createStereoPanner(),l=t.att??.004;r.buffer=Ad(),s.type=t.type??"bandpass",s.Q.value=t.q??1,s.frequency.setValueAtTime(t.f0??1e3,n),s.frequency.exponentialRampToValueAtTime(Math.max(30,t.f1??t.f0??1e3),n+e),i.gain.setValueAtTime(1e-4,n),i.gain.linearRampToValueAtTime(t.vol??.1,n+l),i.gain.exponentialRampToValueAtTime(1e-4,n+e),a.pan.value=t.pan??0,r.connect(s).connect(i).connect(a).connect(t.bus??or),r.start(n,Math.random()*1.4),r.stop(n+e+.05)}function pe(n,e,t,r){const s=G.createOscillator(),i=G.createGain();s.frequency.setValueAtTime(e*2.2,n),s.frequency.exponentialRampToValueAtTime(e,n+.09),i.gain.setValueAtTime(t,n),i.gain.exponentialRampToValueAtTime(1e-4,n+.7),s.connect(i).connect(r??or),s.start(n),s.stop(n+.75),Ve(n,.06,{type:"lowpass",f0:1200,f1:300,vol:t*.5,bus:r})}const Fe=()=>G.currentTime+.01,Dr={hover:()=>ke(K(96),Fe(),.09,{vol:.02,ratio:3.5,idx:.8,pan:Ss(-.3,.3)}),click:()=>{const n=Fe();Ve(n,.06,{f0:2200,f1:900,q:2,vol:.12}),_e(220,n,.1,{vol:.14,slide:-7})},select:()=>{const n=Fe();ke(K(84),n,.5,{vol:.07,ratio:2,idx:1.2,pan:-.15}),ke(K(91),n+.06,.6,{vol:.05,ratio:2,idx:1,pan:.15})},start:()=>{const n=Fe();[38,45,50,57,62,65].forEach((t,r)=>_e(K(t),n,2.4,{type:"sawtooth",vol:.035,att:1,pad:!0,rel:1.2,lp:300,lpEnd:3200,det:9,pan:(r-2.5)*.15})),Ve(n,1.3,{f0:300,f1:7e3,q:.8,vol:.13,att:1.15}),pe(n,40,.5);const e=n+1.25;pe(e,48,1),[62,65,69,74,81].forEach((t,r)=>_e(K(t),e,2.6,{type:"triangle",vol:.06,lp:4e3,pan:(r-2)*.25})),ke(K(86),e,3,{vol:.09,ratio:1.5,idx:2})},pass:()=>{const n=Fe();Ve(n,.35,{f0:600,f1:200,q:1.2,vol:.09,att:.08}),_e(K(50),n,.3,{vol:.08,slide:-5})},summon:()=>{const n=Fe();pe(n,48,.9),Ve(n,.5,{type:"lowpass",f0:3e3,f1:150,q:.7,vol:.25}),[81,86,90,93].forEach((e,t)=>ke(K(e),n+.05+t*.05,1.2,{vol:.05,ratio:3,idx:1.5,pan:(t-1.5)*.3})),_e(K(38),n,.9,{type:"sawtooth",vol:.08,lp:1500,lpEnd:150,det:12,att:.02})},summon_lum:()=>{const n=Fe();pe(n,52,.85),Ve(n,.75,{type:"bandpass",f0:400,f1:6500,q:.8,vol:.12,att:.4}),_e(K(45),n+.12,1.3,{type:"triangle",vol:.11,lp:1800,att:.03}),[69,73,76,81,85].forEach((e,t)=>ke(K(e),n+.2+t*.06,1.7,{vol:.06,ratio:2,idx:1.4,pan:(t-2)*.25})),ke(K(93),n+.45,2.2,{vol:.045,ratio:3.01,idx:1})},summon_umb:()=>{const n=Fe();_e(K(33),n,1.4,{type:"sawtooth",vol:.16,slide:-9,lp:1800,lpEnd:90,det:14,att:.02}),pe(n,40,1),Ve(n,.9,{type:"lowpass",f0:2200,f1:90,q:.7,vol:.22}),Ve(n+.1,.8,{type:"bandpass",f0:300,f1:1500,q:2,vol:.08,att:.3}),ke(K(58),n+.05,1.9,{vol:.06,ratio:1.41,idx:3}),ke(K(65),n+.12,1.7,{vol:.05,ratio:1.41,idx:2.5,pan:.3})},spell_lum:()=>{const n=Fe();[74,76,78,81,83,86,90].forEach((e,t)=>_e(K(e),n+t*.055,1.3,{type:"triangle",vol:.07,pan:-.5+t*.16})),ke(K(93),n+.4,2.2,{vol:.06,ratio:2.76,idx:1}),Ve(n,1.2,{type:"highpass",f0:5e3,f1:9e3,vol:.05,att:.5})},spell_umb:()=>{const n=Fe();_e(K(50),n,1.4,{type:"sawtooth",vol:.12,slide:-12,lp:2400,lpEnd:100,det:15}),_e(K(25),n,1.6,{vol:.35,att:.05}),Ve(n,1.2,{type:"lowpass",f0:200,f1:2600,vol:.18,att:.9}),ke(K(63),n+.2,2,{ratio:1.414,idx:3,vol:.06,pan:-.3}),ke(K(57),n+.2,2,{ratio:1.414,idx:3,vol:.05,pan:.3})},attack:()=>{const n=Fe(),e=n+.2;Ve(n,.22,{f0:800,f1:7e3,q:1.5,vol:.18,att:.12}),ke(K(88),e,.7,{ratio:3.1,idx:3,vol:.09}),ke(K(95),e,.5,{ratio:4.7,idx:2,vol:.05}),pe(e,70,.5),Ve(e,.12,{type:"highpass",f0:3e3,f1:1500,vol:.15})},hurt:()=>{const n=Fe();pe(n,45,1),_e(K(40),n,.5,{type:"sawtooth",vol:.18,lp:1200,lpEnd:120,bus:As}),Ve(n,.35,{type:"lowpass",f0:2500,f1:100,vol:.3}),ke(K(79),n+.02,1.2,{ratio:1.41,idx:2,vol:.04})},heal:()=>{const n=Fe();[74,78,81,86].forEach((e,t)=>ke(K(e),n+t*.08,1.4,{vol:.06,ratio:2,idx:.8,pan:-.3+t*.2})),[62,69].forEach(e=>_e(K(e),n,1.6,{vol:.08,att:.3,pad:!0}))},death:()=>{const n=Fe();_e(K(55),n,1,{type:"sawtooth",vol:.14,slide:-14,lp:2500,lpEnd:100,det:14}),Ve(n,.9,{f0:3e3,f1:150,q:.6,vol:.16}),pe(n+.05,42,.7)},round:()=>{const n=Fe();[1,2.32,3.17,4.1,5.4].forEach((e,t)=>_e(K(43)*e,n,3.6-t*.4,{vol:.09/(t+1),pan:(t%2?1:-1)*.2})),pe(n,52,.8),Ve(n,.5,{f0:500,f1:3e3,vol:.06,att:.4})},win:()=>{const n=Fe();[[62,66,69,74],[67,71,74,79],[69,73,76,81,86]].forEach((e,t)=>{e.forEach((r,s)=>{_e(K(r),n+t*.45,1.9,{type:"triangle",vol:.055,lp:5e3,pan:(s-2)*.2}),ke(K(r+12),n+t*.45+.02*s,1.8,{vol:.03,ratio:2,idx:.7})})}),pe(n+.9,50,.8)},lose:()=>{const n=Fe();[62,60,57,55,50].forEach((e,t)=>_e(K(e),n+t*.5,2,{type:"sawtooth",vol:.07,lp:900,lpEnd:150,det:10,att:.1})),_e(K(26),n,3,{vol:.2,att:.4,pad:!0})},msg:()=>{const n=Fe();ke(K(93),n,.5,{vol:.05,ratio:2,idx:.6}),ke(K(98),n+.08,.6,{vol:.04,ratio:2,idx:.6})}},qi=new Map;function ug(n){qi.has(n)||(qi.set(n,null),fetch(`/Apexora-TCG/sfx/${n}.mp3`).then(e=>{e.ok&&(e.headers.get("content-type")||"").startsWith("audio")&&qi.set(n,e.url)}).catch(()=>{}))}const ct=(n,e,t=.07,r=.06,s=2,i=1.4)=>e.forEach((a,l)=>ke(K(a),n+l*t,1.5,{vol:r,ratio:s,idx:i,pan:(l-(e.length-1)/2)*.25})),ba=(n,e,t=.06,r=.07)=>e.forEach((s,i)=>_e(K(s),n+i*t,1.1,{type:"triangle",vol:r,pan:(i-(e.length-1)/2)*.2})),un=(n,e,t=.9,r=.1)=>_e(K(e),n,t,{type:"sawtooth",vol:r,lp:500,lpEnd:2600,att:.12,det:8}),Ct=(n,e,t=1,r=.14,s=-8)=>_e(K(e),n,t,{type:"sawtooth",vol:r,slide:s,lp:1800,lpEnd:90,det:14,att:.02}),Aa=(n,e,t=1.2,r=.1)=>_e(K(e),n,t,{type:"sawtooth",vol:r,slide:5,lp:1500,lpEnd:600,vib:25,att:.2}),Vt=(n,e,t=1.6,r=.04)=>e.forEach((s,i)=>_e(K(s),n,t,{type:"sawtooth",vol:r,pad:!0,att:.5,rel:.8,lp:1400,vib:12,det:6,pan:(i-(e.length-1)/2)*.3})),wt=(n,e,t,r=.6,s=.12,i=.3)=>Ve(n,r,{type:"bandpass",f0:e,f1:t,q:.9,vol:s,att:i}),Ni=(n,e=.5,t=.08)=>Ve(n,e,{type:"highpass",f0:5e3,f1:9e3,vol:t,att:.1}),Ts=(n,e=1,t=.2)=>Ve(n,e,{type:"lowpass",f0:900,f1:80,q:.7,vol:t,att:.06}),ut=(n,e,t=.07)=>{ke(K(e),n,1.6,{vol:t,ratio:1.41,idx:3}),ke(K(e+7),n+.02,1.3,{vol:t*.7,ratio:2.76,idx:2})},Is=(n,e,t=.05,r=.1)=>{for(let s=0;s<e;s++)Ve(n+s*t,.04,{type:"highpass",f0:3e3,f1:6e3,vol:r,pan:s%2?.3:-.3})},Sa=(n,e,t=.05,r=.09)=>{for(let s=0;s<e;s++)Ve(n+s*t,.09,{type:"bandpass",f0:1500,f1:600,q:1,vol:r,att:.02,pan:s%2?.4:-.4})},hg={lum_acolita:n=>{ct(n,[84,88,91],.08,.05),ba(n+.05,[76,79],.1,.05)},lum_vigia:n=>{un(n,57,.5,.08),ct(n+.2,[88],.1,.05),pe(n,55,.4)},lum_centinela:n=>{ut(n,62),ut(n+.1,69,.05),pe(n,50,.7)},lum_portador:n=>{ba(n,[72,76,79,84],.07),wt(n,800,4e3,.5,.08)},lum_halcon:n=>{wt(n,3e3,800,.4,.12,.05),Sa(n+.05,5,.04),ct(n+.3,[96],.1,.05)},lum_novicia:n=>{Vt(n,[69,72,76],1.2),ct(n+.2,[81],.1,.05)},lum_sanadora:n=>{ba(n,[67,71,74,79,83],.08),Vt(n,[67,74],1.5)},lum_vidente:n=>{ct(n,[88,93,98],.12),wt(n,2e3,6e3,.7,.06,.4)},lum_oraculo:n=>{Vt(n,[62,69,74],1.7),ct(n+.2,[86,90],.15),Ni(n,.6,.05)},lum_paladin:n=>{un(n,50,.9,.12),ut(n+.05,67),Sa(n+.1,6,.05,.07)},lum_heraldo:n=>{un(n,62,.8),un(n+.15,69,.8),ct(n+.3,[93],.1)},lum_coloso:n=>{pe(n,43,1),ut(n,38,.09),Vt(n,[50,57],1.6),pe(n+.2,40,.7)},lum_lider:n=>{un(n,55,.5),un(n+.25,62,.5),un(n+.5,67,.9,.12),ut(n+.5,74),pe(n+.5,48,.8)},lum_serafin:n=>{Sa(n,10,.045),Vt(n,[74,81,86,93],2),ct(n+.3,[98,105],.15)},lum_arcangel:n=>{pe(n,40,1),un(n,45,1.4,.14),Vt(n,[57,64,69,76],2.2),ct(n+.4,[93,100,105],.14),wt(n,500,7e3,.9,.1,.5)},umb_sombra:n=>{wt(n,1500,300,.6,.12,.08),Ct(n,45,.7,.06,-5)},umb_aprendiz:n=>{Is(n,4,.06),Ct(n+.1,52,.4,.08,-4)},umb_acechador:n=>{Ni(n,.35,.1),ut(n+.05,86,.04),pe(n+.05,48,.5)},umb_cultista:n=>{Vt(n,[45,48,52],1.5,.05),ct(n+.2,[63,69],.2,.05,1.41,2.5)},umb_espectro:n=>{wt(n,4e3,500,.5,.1,.05),_e(K(88),n,.7,{vol:.06,slide:-14,vib:30})},umb_esqueleto:n=>{Is(n,8,.04,.12),pe(n+.1,55,.5),ut(n+.3,60,.03)},umb_reptante:n=>{Ni(n,.9,.1),Ct(n,40,.9,.1,-3),Is(n+.3,3,.08,.08)},umb_lobo:n=>{Aa(n,57,1.3),Ct(n,40,.6,.1)},umb_sanguijuela:n=>{Ve(n,.5,{type:"lowpass",f0:900,f1:200,vol:.18,att:.15}),_e(K(52),n,.6,{vol:.08,slide:7,vib:40})},umb_ritualista:n=>{Vt(n,[45,51,58],1.8,.05),ct(n+.15,[63,69],.2,.05,1.41,2.5),wt(n,400,2500,.8,.06,.4)},umb_golem:n=>{pe(n,36,1),ut(n,40,.1),Ts(n,1,.2),ut(n+.18,43,.07)},umb_verdugo:n=>{wt(n,3e3,400,.3,.12,.05),ut(n+.2,50,.1),pe(n+.2,38,.9),Ct(n+.2,38,.8,.1)},umb_jinete:n=>{[0,.12,.24,.36].forEach((e,t)=>pe(n+e,t%2?55:60,.6)),Aa(n+.3,69,1,.08),wt(n,600,3e3,.7,.08,.3)},umb_basalto:n=>{pe(n,38,1),Ts(n,1.1,.2),ut(n,43,.08),Is(n+.1,3,.07,.1)},umb_devoradora:n=>{Ct(n,35,1.4,.15,-9),Ni(n,.8,.09),ct(n+.2,[58,64],.15,.05,1.41,3),Aa(n+.3,45,1.1,.06)},umb_azote:n=>{wt(n,800,5e3,.3,.14,.04),ut(n+.1,74,.08),Ct(n+.1,43,.6,.12),Is(n+.15,3,.05)},umb_behemot:n=>{pe(n,34,1),pe(n+.35,34,.8),Ct(n,31,1.6,.2,-6),Ts(n,1.2,.22)},umb_abisal:n=>{Ct(n,29,2,.2,-10),Vt(n,[34,41,46],2.4,.05),Ts(n,1.6,.18),ct(n+.3,[58,65],.2,.05,1.41,3)},umb_senor:n=>{pe(n,32,1),Vt(n,[38,45,50,57],2.4,.05),ut(n+.05,33,.12),wt(n,300,4e3,1,.08,.5),ct(n+.5,[69,75],.2,.05,1.41,3)},umb_titan:n=>{[0,.3,.6].forEach(e=>pe(n+e,30,1)),Ct(n,26,2.2,.22,-8),Ts(n,1.8,.24),ut(n+.6,36,.12)}};for(const[n,e]of Object.entries(hg))Dr["u_"+n]=()=>e(Fe());function dg(n){if(!It)try{Ml(),(Dr["u_"+n]??Dr[n.startsWith("umb")?"summon_umb":"summon_lum"])()}catch{}}function ye(n){var t;if(It)return;ug(n);const e=qi.get(n);if(e){const r=new Audio(e);r.volume=.7,r.play().catch(()=>{});return}try{Ml(),(t=Dr[n])==null||t.call(Dr)}catch{}}const ji=60/72,zi=ji*4,fg=[38,34,41,36],pg=[[62,65,69,74],[58,62,65,70],[57,60,65,69],[55,60,64,67]],Nu=[62,65,67,69,72,74,77];function mg(n,e){if(It||document.hidden)return;Ia+=(bd-Ia)*.5;const t=e%4,r=pg[t],s=Ia,i=Vs;if(r.forEach((l,u)=>_e(K(l),n,zi*1.08,{type:"sawtooth",vol:.02,att:1.2,pad:!0,rel:1.3,lp:650+s*900,det:8+u*2,pan:(u-1.5)*.35,bus:i})),_e(K(fg[t]),n,zi*1.02,{vol:.15,att:.25,pad:!0,rel:1,bus:i}),[0,2,1,3,2,1,3,2].forEach((l,u)=>{if(Math.random()<(s?.9:.7)){const h=r[l]+(u%4===3&&Math.random()<.4?12:0)+12;_e(K(h),n+u*ji/2,1.1,{type:"triangle",vol:.035+s*.01,pan:Math.sin(u)*.5,bus:i})}}),e%2===0&&Math.random()<.7&&ke(K(Nu[Math.floor(Math.random()*Nu.length)]+12),n+ji*(Math.random()<.5?0:2),3,{vol:.045,ratio:2,idx:.7,pan:Ss(-.5,.5),bus:i}),t===0&&pe(n,44,.35,i),s>.5)for(let l=0;l<4;l++)pe(n+l*ji,l%2?80:58,l===2?.28:.18,i);for(let l=0;l<4;l++)Math.random()<.6&&Ve(n+Ss(0,zi),.03,{type:"highpass",f0:4e3,f1:3e3,vol:Ss(.008,.02),pan:Ss(-.8,.8),bus:i})}function gg(){const n=G.createBufferSource(),e=G.createBiquadFilter(),t=G.createGain(),r=G.createOscillator(),s=G.createGain();n.buffer=Ad(),n.loop=!0,e.type="bandpass",e.frequency.value=420,e.Q.value=.9,t.gain.value=.045,r.frequency.value=.07,s.gain.value=.03,r.connect(s).connect(t.gain);const i=G.createOscillator(),a=G.createGain();return i.frequency.value=.05,a.gain.value=250,i.connect(a).connect(e.frequency),n.connect(e).connect(t).connect(Vs),n.start(),r.start(),i.start(),()=>{t.gain.setTargetAtTime(0,G.currentTime,.4),setTimeout(()=>{n.stop(),r.stop(),i.stop()},2e3)}}function _g(){Cu||(Ml(),Cu=!0,Vu=0,Vi=G.currentTime+.15,gg(),window.setInterval(()=>{for(;Vi<G.currentTime+1.3;)mg(Vi,Vu++),Vi+=zi},400))}const yg={lum:[45,168],umb:[272,350],fire:[22,48],heal:[145,50]},Ie=Math.random,M=(n,e)=>n+Ie()*(e-n),Ra=n=>1-(1-n)**3;let Ir,x,Br=0,Pn=0,Ja=!1,Xa=0;const Sr=[];function Q(n){Sr.push({x:0,y:0,vx:0,vy:0,g:0,d:1,t:0,life:600,delay:0,sz:4,gr:0,rot:0,vr:0,h:45,s:100,l:70,a:1,n:0,w:2,add:!0,x1:0,y1:0,bulge:0,pts:[],cx:0,cy:0,ang:0,rad:0,va:0,vrad:0,...n}),Ja||(Ja=!0,Xa=performance.now(),requestAnimationFrame(Sd))}const Us=(n,e)=>setTimeout(e,n);function Sd(n){const e=Math.min(40,n-Xa),t=e/16.667;Xa=n,x.clearRect(0,0,Br,Pn);for(let r=Sr.length-1;r>=0;r--){const s=Sr[r];if(s.delay>0){s.delay-=e;continue}if(s.t+=e,s.t>=s.life){Sr.splice(r,1);continue}if(s.k==="vort"){if(s.ang+=s.va*e,s.rad+=s.vrad*e,s.rad<2){Sr.splice(r,1);continue}s.x=s.cx+Math.cos(s.ang)*s.rad,s.y=s.cy+Math.sin(s.ang)*s.rad}else{s.vy+=s.g*t;const i=s.d**t;s.vx*=i,s.vy*=i,s.x+=s.vx*t,s.y+=s.vy*t,s.rot+=s.vr*t}vg(s)}x.globalCompositeOperation="source-over",Sr.length?requestAnimationFrame(Sd):(Ja=!1,x.clearRect(0,0,Br,Pn))}function vg(n){const e=n.t/n.life,t=1-e,r=s=>`hsla(${n.h},${n.s}%,${n.l}%,${Math.max(0,s)})`;switch(x.globalCompositeOperation=n.add?"lighter":"source-over",n.k){case"spark":x.lineCap="round",x.strokeStyle=r(t*.45),x.lineWidth=n.sz*2.6*t+1,x.beginPath(),x.moveTo(n.x,n.y),x.lineTo(n.x-n.vx*2.6,n.y-n.vy*2.6),x.stroke(),x.strokeStyle=`hsla(${n.h},60%,92%,${t})`,x.lineWidth=n.sz*t+.4,x.stroke();break;case"glow":case"smoke":case"vort":{const s=Math.max(1,n.sz*(1+n.gr*(n.k==="vort"?0:e))),i=n.a*(n.k==="smoke"?Math.min(1,e*6)*t:t),a=x.createRadialGradient(n.x,n.y,0,n.x,n.y,s);a.addColorStop(0,r(i)),a.addColorStop(.4,r(i*.45)),a.addColorStop(1,r(0)),x.fillStyle=a,x.beginPath(),x.arc(n.x,n.y,s,0,6.3),x.fill();break}case"ring":x.strokeStyle=r(n.a*t),x.lineWidth=n.w*t+.6,x.beginPath(),x.arc(n.x,n.y,n.sz+n.gr*Ra(e),0,6.3),x.stroke();break;case"shard":x.save(),x.translate(n.x,n.y),x.rotate(n.rot),x.fillStyle=r(t*.95),x.beginPath(),x.moveTo(0,-n.sz),x.lineTo(n.sz*.45,n.sz*.6),x.lineTo(-n.sz*.4,n.sz*.5),x.closePath(),x.fill(),x.strokeStyle=`hsla(${n.h},40%,95%,${t})`,x.lineWidth=1,x.stroke(),x.restore();break;case"rune":{const s=n.sz*Ra(Math.min(1,e*2.6)),i=n.a*(e<.12?e/.12:e>.6?(1-e)/.4:1),a=n.rot+n.vr*n.t;x.strokeStyle=r(i),x.lineWidth=2.2,x.beginPath(),x.arc(n.x,n.y,s,0,6.3),x.stroke(),x.lineWidth=1,x.beginPath(),x.arc(n.x,n.y,s*.84,0,6.3),x.stroke(),x.lineWidth=1.6,x.beginPath();for(let l=0;l<n.n;l++){const u=a+l/n.n*6.283,h=l%2?.93:.88;x.moveTo(n.x+Math.cos(u)*s*.84,n.y+Math.sin(u)*s*.84),x.lineTo(n.x+Math.cos(u)*s*(h+.07),n.y+Math.sin(u)*s*(h+.07))}if(x.stroke(),n.w>2){const l=n.w,u=l%2?(l-1)/2:l/2-1||1;x.lineWidth=1.8,x.beginPath();for(let h=0;h<=l;h++){const f=-a*.7-1.5708+h*u%l/l*6.283,p=n.x+Math.cos(f)*s*.8,_=n.y+Math.sin(f)*s*.8;h?x.lineTo(p,_):x.moveTo(p,_)}x.stroke()}break}case"pillar":{const s=n.sz*(.35+.65*Math.sin(Math.min(1,e*1.4)*1.57))*(e>.6?(1-e)/.4:1),i=n.a*(e<.1?e/.1:e>.55?(1-e)/.45:1),a=x.createLinearGradient(n.x-s,0,n.x+s,0);a.addColorStop(0,r(0)),a.addColorStop(.5,r(i)),a.addColorStop(1,r(0));const l=x.createLinearGradient(0,n.y-n.gr,0,n.y);l.addColorStop(0,"rgba(255,255,255,0)"),l.addColorStop(.4,"rgba(255,255,255,1)"),l.addColorStop(1,"rgba(255,255,255,0)"),x.fillStyle=a,x.fillRect(n.x-s,n.y-n.gr,s*2,n.gr);break}case"bolt":if(Ie()<.25)break;x.lineJoin="round",x.strokeStyle=r(t*.7),x.lineWidth=n.sz*3,x.beginPath(),n.pts.forEach((s,i)=>i?x.lineTo(s[0],s[1]):x.moveTo(s[0],s[1])),x.stroke(),x.strokeStyle=`hsla(${n.h},50%,96%,${t})`,x.lineWidth=n.sz*.8,x.stroke();break;case"slash":{const s=Ra(Math.min(1,e*4)),i=n.x+(n.x1-n.x)*s,a=n.y+(n.y1-n.y)*s,l=(n.x+i)/2,u=(n.y+a)/2,h=-(a-n.y),f=i-n.x,p=Math.hypot(h,f)||1,_=n.bulge*s,A=h/p*_,k=f/p*_;x.beginPath(),x.moveTo(n.x,n.y),x.quadraticCurveTo(l+A,u+k,i,a),x.quadraticCurveTo(l+A*.3,u+k*.3,n.x,n.y),x.fillStyle=`hsla(${n.h},60%,96%,${t})`,x.shadowColor=`hsl(${n.h},100%,60%)`,x.shadowBlur=24,x.fill(),x.shadowBlur=0,x.strokeStyle=r(t*.7),x.lineWidth=3,x.stroke();break}}}const rt=(n,e=0)=>yg[n][e];function nr(n,e,t,r,s,i={}){for(let a=0;a<t;a++){const l=i.rot??Ie()*6.283,u=M(.35,1)*s,h=i.rot!==void 0?M(-.5,.5):0;Q({k:"spark",x:n,y:e,vx:Math.cos(l+h)*u,vy:Math.sin(l+h)*u,g:.16,d:.93,life:M(420,820),sz:M(1.6,3),h:rt(r,Ie()<.35?1:0),l:66,...i,rot:0})}}function ro(n,e,t,r,s=M(-.9,-.5)){const i=Math.cos(s)*t,a=Math.sin(s)*t;Q({k:"slash",x:n-i,y:e-a,x1:n+i,y1:e+a,bulge:t*.28,life:420,h:rt(r),s:100,l:66,add:!0}),Q({k:"slash",x:n-i*.8,y:e-a*.8+t*.12,x1:n+i*.9,y1:e+a*.9+t*.12,bulge:t*.2,life:360,delay:60,h:rt(r,1),s:100,l:70,add:!0})}function $s(n,e,t,r,s=1){Q({k:"glow",x:n,y:e,sz:t*.95,gr:1.1,life:420,h:rt(r),l:78,a:.95}),Q({k:"glow",x:n,y:e,sz:t*.38,gr:.3,life:180,h:50,s:40,l:96,a:1}),Q({k:"ring",x:n,y:e,sz:t*.12,gr:t*1.05,w:7,life:520,h:rt(r),l:72}),Q({k:"ring",x:n,y:e,sz:t*.1,gr:t*.75,w:3,life:480,delay:90,h:rt(r,1),l:74}),ro(n,e,t*.8,r),nr(n,e,Math.round(26*s),r,t*.1);for(let i=0;i<7*s;i++){const a=Ie()*6.283,l=M(2,6)*t/110;Q({k:"shard",x:n,y:e,vx:Math.cos(a)*l,vy:Math.sin(a)*l-1.5,g:.2,d:.97,rot:Ie()*6,vr:M(-.25,.25),sz:t*M(.05,.1),life:M(520,860),h:rt(r,i%2),l:62})}for(let i=0;i<3;i++)Q({k:"smoke",x:n+M(-8,8),y:e,vx:M(-.5,.5),vy:M(-.7,-.1),d:.98,sz:t*M(.3,.5),gr:1,life:M(700,1e3),a:.3,h:r==="umb"?272:30,s:40,l:r==="umb"?30:60})}const so=n=>n.getBoundingClientRect();function Rd(){const n=document.getElementById("app");n&&(n.classList.remove("shk-soft","shk-hard"),n.offsetWidth,n.classList.add("shk-hard"))}function Eg(n,e,t,r){const a=e.width,l=e.height,u=e.left+a/2,h=e.top+l/2,f=Array.from({length:5},(V,N)=>Array.from({length:4},(W,z)=>[z/3*a+(z&&z<3?M(-.09,.09)*a:0),N/4*l+(N&&N<4?M(-.07,.07)*l:0)])),p=n.cloneNode(!0);p.classList.remove("dying","enter","hurt","boost"),p.removeAttribute("data-a"),p.removeAttribute("data-uid"),p.style.cssText=`--w:${a}px;position:fixed;left:${e.left}px;top:${e.top}px;width:${a}px;height:${l}px;margin:0;animation:none;transition:none;pointer-events:none;z-index:90;will-change:transform,opacity`;const _=document.createDocumentFragment(),A=[],k=[];for(let V=0;V<4;V++)for(let N=0;N<3;N++){const W=f[V][N],z=f[V][N+1],B=f[V+1][N+1],j=f[V+1][N],le=(N+V)%2;for(const q of le?[[W,z,j],[z,B,j]]:[[W,z,B],[W,B,j]]){const E=p.cloneNode(!0),g=(q[0][0]+q[1][0]+q[2][0])/3,y=(q[0][1]+q[1][1]+q[2][1])/3;E.style.clipPath=`polygon(${q.map(ft=>ft[0].toFixed(1)+"px "+ft[1].toFixed(1)+"px").join(",")})`;const w=g-a/2,T=y-l/2,I=Math.hypot(w,T)||1,v=M(.8,1.9)*a*.55*r,De=M(-240,240)*r;_.append(E),k.push(E),A.push(E.animate([{transform:"translate(0,0) rotate(0)",opacity:1,filter:"brightness(2.6) saturate(1.4)"},{transform:`translate(${w/I*v*.55}px,${T/I*v*.55-l*.12}px) rotate(${De*.5}deg)`,opacity:1,filter:"brightness(1.2)",offset:.35},{transform:`translate(${w/I*v}px,${T/I*v+l*M(.5,1)}px) rotate(${De}deg) scale(.8)`,opacity:0,filter:"brightness(.6)"}],{duration:M(650,1e3),easing:"cubic-bezier(.2,.7,.4,1)",fill:"forwards"}))}}document.body.append(_),Promise.allSettled(A.map(V=>V.finished)).then(()=>k.forEach(V=>V.remove())),Q({k:"glow",x:u,y:h,sz:a*1.1,gr:.6,life:380,h:rt(t),l:85,a:.8}),Q({k:"ring",x:u,y:h,sz:a*.2,gr:a*1.2*r,w:6,life:520,h:rt(t),l:78})}function wg(n,e,t,r){x&&(Q({k:"glow",x:n,y:e,sz:t*1.3,gr:.5,life:260,h:48,s:40,l:96,a:1}),$s(n,e,t*1.15,r,1.4),$s(n,e,t*.7,"fire",1),Rd())}function Tg(n,e,t){if(!x)return;const r=performance.now();let s=NaN,i=NaN;const a=()=>{if(!n.isConnected||performance.now()-r>e)return;const l=so(n),u=l.left+l.width/2,h=l.top+l.height/2,f=l.width;if(!isNaN(s)){const p=Math.hypot(u-s,h-i),_=Math.min(14,Math.ceil(p/(f*.16)));if(p>1.5)for(let A=1;A<=_;A++){const k=A/_,V=s+(u-s)*k,N=i+(h-i)*k;Q({k:"glow",x:V,y:N,sz:f*M(.42,.6),gr:-.35,life:360,h:rt(t,A%2),l:68,a:.42}),Ie()<.4&&Q({k:"spark",x:V+M(-f*.3,f*.3),y:N+M(-f*.3,f*.3),vx:-(u-s)*.08,vy:-(h-i)*.08,g:0,d:.92,life:M(260,440),sz:1.8,h:rt(t),l:78})}}s=u,i=h,requestAnimationFrame(a)};requestAnimationFrame(a)}function Ig(n,e,t){Q({k:"glow",x:n,y:e,sz:t*.9,gr:.6,life:1100,h:46,l:82,a:.55}),Q({k:"pillar",x:n,y:Pn,sz:t*.55,gr:Pn*1.1,life:1250,h:48,l:76,a:.7}),Q({k:"rune",x:n,y:e,sz:t,n:28,w:8,life:1500,rot:0,vr:7e-4,h:46,l:72,a:.95}),Q({k:"rune",x:n,y:e,sz:t*.62,n:18,w:6,life:1400,delay:80,rot:1,vr:-.0011,h:168,l:70,a:.85});for(let r=0;r<46;r++){const s=Ie()*6.283,i=M(.2,1)*t;Q({k:"glow",x:n+Math.cos(s)*i,y:e+Math.sin(s)*i*.55+t*.3,vx:M(-.3,.3),vy:-M(.8,3.2),g:-.01,d:.995,sz:M(3,8),life:M(800,1500),delay:Ie()*600,h:Ie()<.3?168:48,l:82,a:.9})}Us(460,()=>{Q({k:"ring",x:n,y:e,sz:t*.2,gr:t*2.1,w:10,life:800,h:48,l:80}),Q({k:"ring",x:n,y:e,sz:t*.1,gr:t*1.5,w:4,life:700,h:168,l:80}),Q({k:"glow",x:n,y:e,sz:t*1.3,gr:.5,life:500,h:50,s:40,l:96,a:.8}),nr(n,e,44,"lum",t*.085)})}function bg(n,e,t){Q({k:"smoke",x:n,y:e,sz:t*1.2,gr:.8,life:1500,h:270,s:60,l:14,a:.55,add:!1}),Q({k:"rune",x:n,y:e,sz:t,n:20,w:5,life:1500,rot:0,vr:-9e-4,h:350,l:62,a:.95}),Q({k:"rune",x:n,y:e,sz:t*.66,n:12,w:0,life:1400,delay:70,rot:2,vr:.0012,h:272,l:68,a:.85});for(let r=0;r<80;r++)Q({k:"vort",cx:n,cy:e,ang:Ie()*6.283,rad:M(.55,1.5)*t,va:M(.0035,.006),vrad:-M(6e-4,.0011)*t,sz:M(3,7),life:1200,delay:Ie()*350,h:Ie()<.5?272:350,l:68,a:.9});Us(720,()=>{Q({k:"glow",x:n,y:e,sz:t*1.1,gr:.8,life:520,h:300,s:90,l:70,a:.85}),Q({k:"ring",x:n,y:e,sz:t*.15,gr:t*2.2,w:11,life:800,h:350,l:62}),Q({k:"ring",x:n,y:e,sz:t*.1,gr:t*1.6,w:4,life:740,delay:80,h:272,l:72}),nr(n,e,52,"umb",t*.09);for(let r=0;r<7;r++){const s=Ie()*6.283,i=[[n,e]];let a=n,l=e,u=s;for(let h=0;h<9;h++)u+=M(-.55,.55),a+=Math.cos(u)*t*.17,l+=Math.sin(u)*t*.17,i.push([a,l]);Q({k:"bolt",pts:i,sz:2.4,life:520,h:r%2?350:280,l:66})}for(let r=0;r<8;r++){const s=Ie()*6.283,i=M(3,8);Q({k:"shard",x:n,y:e,vx:Math.cos(s)*i,vy:Math.sin(s)*i,d:.965,rot:Ie()*6,vr:M(-.3,.3),sz:M(8,16),life:800,h:r%2?350:272,l:58})}for(let r=0;r<6;r++)Q({k:"smoke",x:n+M(-30,30),y:e+M(-20,20),vx:M(-1,1),vy:M(-1,.2),d:.985,sz:t*M(.3,.55),gr:1.1,life:1300,h:275,s:55,l:16,a:.5,add:!1})})}function Ag(n,e,t,r){const s=document.createElement("div");s.className="dmgnum "+r,s.textContent=t,s.style.left=n+"px",s.style.top=e+"px",document.body.append(s),setTimeout(()=>s.remove(),1500)}function Sg(n,e){var k;const t=n.closest(".pt"),r=t==null?void 0:t.querySelector(".ava"),s=r?so(r):e,i=!!(t!=null&&t.classList.contains("me")),a=(((k=n.querySelector(".fx"))==null?void 0:k.textContent)??"").trim(),l=Math.abs(parseInt(a.replace(/[^\d-]/g,""),10)||3),u=Math.min(2,.8+l*.13),h=s.left+s.width/2,f=s.top+s.height/2,p=s.width*2.3*u;Q({k:"glow",x:h,y:f,sz:p*1.35,gr:.9,life:560,h:358,l:62,a:1}),Q({k:"glow",x:h,y:f,sz:p*.55,gr:.4,life:240,h:40,s:30,l:97,a:1}),Q({k:"ring",x:h,y:f,sz:p*.15,gr:p*1.7,w:14,life:760,h:355,l:62}),Q({k:"ring",x:h,y:f,sz:p*.1,gr:p*1.2,w:7,life:700,delay:80,h:25,l:68}),Q({k:"ring",x:h,y:f,sz:p*.1,gr:p*2.4,w:3,life:900,delay:170,h:350,l:70}),ro(h,f,p*.95,"fire",-.75),ro(h,f,p*.95,"umb",.75);for(let V=0;V<16;V++){const N=V/16*6.283+M(-.1,.1);nr(h,f,1,"fire",p*.26,{rot:N,life:M(380,620),sz:3.4})}nr(h,f,Math.round(60*u),"fire",p*.12),nr(h,f,24,"umb",p*.1);for(let V=0;V<16;V++){const N=Ie()*6.283,W=M(3,9)*p/140;Q({k:"shard",x:h,y:f,vx:Math.cos(N)*W,vy:Math.sin(N)*W-2,g:.24,d:.975,rot:Ie()*6,vr:M(-.3,.3),sz:p*M(.05,.11),life:M(600,1e3),h:V%3?355:28,l:60})}for(let V=0;V<5;V++)Q({k:"smoke",x:h+M(-14,14),y:f,vx:M(-.8,.8),vy:M(-1,-.2),d:.985,sz:p*M(.3,.5),gr:1.1,life:M(900,1300),a:.35,h:355,s:50,l:22,add:!1});Us(140,()=>{$s(h,f,p*.6,"fire",1),nr(h,f,30,"fire",p*.14)});const _=document.createElement("div");_.className="nexflash"+(i?" mine":" foe"),document.body.append(_),setTimeout(()=>_.remove(),900);const A=document.getElementById("app");A&&(A.classList.remove("shk-soft","shk-hard"),A.offsetWidth,A.classList.add("shk-hard")),Ag(h,f-s.height*.15,a||"−"+l,i?"mine":"foe")}let xu=-1e9,ka="lum";const xi=new Map,Kn=(n,e)=>{const t=performance.now();return t-(xi.get(n)??-1e9)<e?!1:(xi.set(n,t),xi.size>80&&xi.clear(),!0)},Du=n=>n.classList.contains("umb")?"umb":"lum";function Rg(n){const e=so(n),t=e.left+e.width/2,r=e.top+e.height/2,s=n.className.split(" ")[0]+Math.round(t/24)+","+Math.round(r/24),i=n.classList;if(i.contains("cast")){if(!Kn("cast",500))return;const a=document.querySelector(".plane-wrap"),l=a?so(a):null,u=l?l.left+l.width/2:Br/2,h=l?l.top+l.height*.5:Pn/2,f=Math.min(l?l.width:Br,l?l.height:Pn)*.42;xu=performance.now(),ka=i.contains("umb")?"umb":"lum",(i.contains("umb")?bg:Ig)(u,h,f)}else if(i.contains("card")&&i.contains("attacking")){if(!Kn("a"+s,800))return;const a=Du(n),l=i.contains("up")?-1:1,u=e.width;Q({k:"glow",x:t,y:r,sz:u*.95,gr:.2,life:520,h:rt(a),l:70,a:.6});for(let h=0;h<18;h++){const f=Ie()*6.283,p=u*M(.8,1.5);Q({k:"vort",cx:t,cy:r,ang:f,rad:p,va:.004,vrad:-p/360,sz:M(2.5,5),life:380,delay:Ie()*90,h:rt(a,h%3?0:1),l:76,a:.9})}Us(430,()=>{const h=t,f=r+l*(e.height*.5+46);for(let p=0;p<12;p++)Q({k:"spark",x:t+M(-u*.4,u*.4),y:r+l*e.height*.3,vx:M(-1.2,1.2),vy:-l*M(3,9),g:0,d:.93,life:M(260,480),sz:2,h:rt(a,p%2),l:72});Q({k:"ring",x:h,y:f,sz:u*.1,gr:u*.95,w:6,life:380,h:rt(a),l:76}),ro(h,f,u*.75,a,l<0?M(-2.5,-2.1):M(.55,1))})}else if(i.contains("card")&&i.contains("dying")){if(!Kn("d"+s,900))return;const a=Du(n),l=e.width,u=performance.now()-xu<2200,h=u?ka:a;n.style.animation="none",Us(u?ka==="umb"?720:460:0,()=>{n.style.opacity="0",Eg(n,e,h,u?1.7:1.15),$s(t,r,l*1.05,h,u?1.5:1.1),u&&Rd();for(let f=0;f<14;f++)Q({k:"glow",x:t+M(-l*.35,l*.35),y:r+M(-l*.2,l*.3),vx:M(-.3,.3),vy:-M(.6,2),g:-.008,sz:M(3,7),life:M(900,1500),delay:Ie()*250,h:rt(h,f%2),l:80,a:.9})})}else if(i.contains("card")&&i.contains("hurt")){if(!Kn("h"+s,500))return;$s(t,r,e.width*.75,"fire",.7)}else if(i.contains("card")&&i.contains("boost")){if(!Kn("b"+s,500))return;Q({k:"ring",x:t,y:r+e.height*.2,sz:e.width*.2,gr:e.width*.8,w:4,life:600,h:145,l:74});for(let a=0;a<16;a++)Q({k:"glow",x:t+M(-e.width*.4,e.width*.4),y:r+e.height*.35,vy:-M(1,3.2),g:-.02,d:.99,sz:M(3,6),life:M(600,1e3),delay:Ie()*250,h:Ie()<.5?145:48,l:78,a:.9})}else if(i.contains("orb")&&i.contains("hit")){if(!Kn("oh"+s,700))return;Sg(n,e)}else if(i.contains("orb")&&i.contains("heal")){if(!Kn("oe"+s,700))return;Q({k:"ring",x:t,y:r,sz:e.width*.3,gr:e.width*1.5,w:5,life:700,h:145,l:74}),Q({k:"glow",x:t,y:r,sz:e.width*1.3,gr:.5,life:600,h:145,l:78,a:.7});for(let a=0;a<22;a++)Q({k:"glow",x:t+M(-e.width,e.width),y:r+M(0,e.width*.6),vy:-M(1,3),g:-.02,d:.99,sz:M(3,7),life:M(700,1300),delay:Ie()*300,h:Ie()<.5?145:48,l:80,a:.9})}}const Ou=".card.attacking,.card.dying,.card.hurt,.card.boost,.orb.hit,.orb.heal,.vfx.cast";function kg(){if(matchMedia("(prefers-reduced-motion:reduce)").matches)return;Ir=document.createElement("canvas"),Ir.id="combatfx",document.body.append(Ir),x=Ir.getContext("2d");const n=()=>{const e=Math.min(2,devicePixelRatio||1);Br=innerWidth,Pn=innerHeight,Ir.width=Br*e,Ir.height=Pn*e,x.setTransform(e,0,0,e,0,0)};n(),addEventListener("resize",n),new MutationObserver(e=>{const t=[];e.forEach(r=>r.addedNodes.forEach(s=>{s instanceof HTMLElement&&(s.matches(Ou)&&t.push(s),s.querySelectorAll(Ou).forEach(i=>t.push(i)))})),t.sort((r,s)=>+s.classList.contains("cast")-+r.classList.contains("cast")).forEach(Rg)}).observe(document.body,{childList:!0,subtree:!0})}const Pa=(n,e,t)=>n.style.setProperty(e,t);function Pg(){const n=document.createElement("canvas");n.id="embers",document.body.prepend(n);const e=n.getContext("2d");let t=0,r=0;const s=[],i=()=>{t=n.width=innerWidth,r=n.height=innerHeight};i(),addEventListener("resize",i);for(let l=0;l<90;l++)s.push({x:Math.random()*2e3,y:Math.random()*1200,r:Math.random()*2+.4,v:Math.random()*.5+.12,a:Math.random()*.6+.2,hue:Math.random()<.55?40:265,ph:Math.random()*6});let a=0;(function l(){a+=.01,e.clearRect(0,0,t,r);for(const u of s){u.y-=u.v,u.x+=Math.sin(a+u.ph)*.35,u.y<-10&&(u.y=r+10,u.x=Math.random()*t);const h=.6+Math.sin(a*3+u.ph)*.4;e.beginPath(),e.fillStyle=`hsla(${u.hue},95%,68%,${u.a*h})`,e.shadowColor=`hsl(${u.hue},95%,60%)`,e.shadowBlur=10,e.arc(u.x%t,u.y,u.r,0,6.3),e.fill()}requestAnimationFrame(l)})()}function Cg(){const n=document.createElement("div");n.id="glow",document.body.append(n);let e=0,t=0,r=0,s=0;addEventListener("pointermove",i=>{r=i.clientX,s=i.clientY}),function i(){e+=(r-e)*.14,t+=(s-t)*.14,n.style.transform=`translate(${e-160}px,${t-160}px)`,requestAnimationFrame(i)}()}function Vg(){let n=null;document.addEventListener("pointermove",t=>{const r=t.target.closest(".card");if(!r)return;const s=r.getBoundingClientRect(),i=(t.clientX-s.left)/s.width,a=(t.clientY-s.top)/s.height;Pa(r,"--mx",(i*100).toFixed(1)+"%"),Pa(r,"--my",(a*100).toFixed(1)+"%"),Pa(r,"--ang",((i-.5)*60).toFixed(1)+"deg")});let e=0;document.addEventListener("pointerover",t=>{const r=t.target.closest(".slotc,.card[data-a],button,.btn");if(!r||r===n)return;n=r;const s=performance.now();s-e>70&&(ye("hover"),e=s)}),document.addEventListener("pointerout",()=>{n=null})}function Ng(){new MutationObserver(n=>n.forEach(e=>e.addedNodes.forEach(t=>{if(!(t instanceof HTMLElement)||!t.classList.contains("vfx"))return;const r=t.classList;r.contains("vhit")?Di("hard"):r.contains("banner")&&!r.contains("small")?Mu("#ffd27a33"):r.contains("cast")?(Mu(r.contains("lum")?"#8fe9ff33":"#a24dff44"),Di("soft")):r.contains("report")&&Di("soft")}))).observe(document.body,{childList:!0}),new MutationObserver(()=>document.querySelectorAll(".card.attacking:not(.fxdone)").forEach(n=>{n.classList.add("fxdone"),Di("soft")})).observe(document.getElementById("app"),{childList:!0,subtree:!0})}function Di(n){const e=document.getElementById("app");e.classList.remove("shk-soft","shk-hard"),e.offsetWidth,e.classList.add("shk-"+n)}function Mu(n){const e=document.createElement("div");e.className="flash",e.style.background=`radial-gradient(circle at 50% 50%,${n},transparent 70%)`,document.body.append(e),setTimeout(()=>e.remove(),700)}let io=null;function kd(){if(io)return;const n=io=document.createElement("div");n.id="title",n.innerHTML=`<div class="t-bg"></div><div class="t-art l"></div><div class="t-art u"></div>
    <div class="t-in"><p class="t-kicker"><i></i>DUELO DE LEYENDAS<i></i></p><h1>CARTAS</h1><div class="t-sub"><i></i><span>ALFA</span><i></i></div>
    <div class="t-fac"><b class="l">☀ LUMINARAE</b><i>◆</i><b class="u">UMBRA ☾</b></div>
    <div class="t-menu"><button class="t-go" data-m="ia" autofocus>⚔ JUGAR CONTRA LA IA</button><button class="t-go alt" data-m="online">🌐 JUGAR ONLINE</button></div>
    <p class="t-hint">Elige un modo · sonido activado</p></div>`,document.body.append(n),n.querySelectorAll("[data-m]").forEach(e=>e.addEventListener("click",()=>{ye("start"),_g(),e.dataset.m==="ia"?(Pd(),document.dispatchEvent(new Event("menu:ia"))):document.dispatchEvent(new Event("menu:online"))}))}function Pd(){const n=io;n&&(io=null,n.classList.add("out"),setTimeout(()=>n.remove(),900))}function xg(){kd()}function Dg(){kg(),Pg(),Cg(),Vg(),Ng(),xg()}const se=(n,e,t,r,s,i=[],a="",l=[],u)=>({id:n,name:e,cost:t,type:"unit",atk:r,hp:s,kw:i,text:a,fx:l,grow:u}),Te=(n,e,t,r,s,i)=>({id:n,name:e,cost:t,type:"spell",atk:0,hp:0,kw:[],text:s,fx:i,speed:r}),Cd=[se("lum_acolita","Acólita del Alba",1,1,1,[],"Al jugarla: cura 2 a tu Nexo.",[{t:"healNexus",n:2}]),se("lum_vigia","Vigía del Alba",1,1,2,["regenera"]),se("lum_centinela","Centinela Radiante",2,2,2,["barrera"]),se("lum_portador","Portador de Luz",2,2,1,[],"Al jugarla: +1/+1 a otra aliada.",[{t:"buffOther",a:1,h:1}]),se("lum_halcon","Halcón Dorado",2,3,1,["elusivo"]),se("lum_novicia","Novicia Curandera",2,1,3,["robovida"]),se("lum_sanadora","Sanadora de Aurora",3,3,3,["robovida"]),se("lum_vidente","Vidente del Alba",3,2,3,[],"Al jugarla: roba 1.",[{t:"draw",n:1}]),se("lum_oraculo","Oráculo Sereno",3,2,2,[],"Al jugarla: roba 1 y cura 2 a tu Nexo.",[{t:"draw",n:1},{t:"healNexus",n:2}]),se("lum_paladin","Paladín Alado",4,3,4,["barrera"]),se("lum_heraldo","Heraldo Solar",4,2,3,[],"Al jugarla: +1/+1 a tus unidades.",[{t:"buffAll",a:1,h:1}]),se("lum_coloso","Coloso de Marfil",5,4,4,["barrera","robovida"]),se("lum_lider","Capitana Aurora",5,4,5,["rapido","retador"]),se("lum_serafin","Serafín Eterno",6,5,6,["elusivo","robovida"]),se("lum_arcangel","Arcángel del Amanecer",7,5,5,["barrera"],"Al jugarla: cura 4 a tu Nexo.",[{t:"healNexus",n:4}]),Te("lum_destello","Destello Sanador",1,"burst","Cura 4 a tu Nexo.",[{t:"healNexus",n:4}]),Te("lum_rocio","Rocío Vital",1,"burst","Cura 3 a una unidad aliada.",[{t:"healUnit",n:3}]),Te("lum_fervor","Fervor",2,"burst","Una aliada gana +2/+0 esta ronda.",[{t:"tempBuff",a:2,h:0}]),Te("lum_escudo","Escudo de Fe",2,"fast","Una aliada gana Barrera.",[{t:"giveKw",kw:"barrera"}]),Te("lum_velo","Velo Etéreo",2,"fast","Una aliada gana Elusivo.",[{t:"giveKw",kw:"elusivo"}]),Te("lum_absorcion","Luz Absorbente",2,"fast","Inflige 2 a una enemiga y cura 2 a tu Nexo.",[{t:"drain",n:2}]),Te("lum_plegaria","Plegaria",3,"fast","Cura 5 a tu Nexo y roba 1.",[{t:"healNexus",n:5},{t:"draw",n:1}]),Te("lum_resplandor","Resplandor",3,"fast","Tus unidades ganan +1/+1 esta ronda.",[{t:"tempBuffAll",a:1,h:1}]),Te("lum_juicio","Juicio Radiante",4,"fast","Inflige 4 a una unidad enemiga.",[{t:"dmgEnemy",n:4}]),Te("lum_escarcha","Escarcha Sagrada",3,"focus","Una unidad enemiga tiene 0 de poder esta ronda.",[{t:"frost"}]),Te("lum_vision","Visión del Alba",2,"focus","Roba 2 cartas.",[{t:"draw",n:2}]),Te("lum_bendicion","Bendición",2,"slow","Una aliada gana +2/+2.",[{t:"buffAlly",a:2,h:2}]),Te("lum_renacer","Renacer",3,"slow","Una aliada gana Regeneración y se cura 4.",[{t:"giveKw",kw:"regenera"},{t:"healUnit",n:4}]),Te("lum_estrellas","Lluvia de Estrellas",4,"slow","Inflige 2 a todas las unidades enemigas y cura 2 a tu Nexo.",[{t:"dmgAll",n:2},{t:"healNexus",n:2}]),Te("lum_amanecer","Amanecer Eterno",6,"slow","Cura 6 a tu Nexo y +1/+1 a tus unidades.",[{t:"healNexus",n:6},{t:"buffAll",a:1,h:1}])],Vd=[se("umb_sombra","Sombra Inquieta",1,2,1),se("umb_aprendiz","Aprendiz de Huesos",1,1,2,["duro"]),se("umb_acechador","Acechador Nocturno",2,1,1,["letal"]),se("umb_cultista","Cultista del Vacío",2,3,3,[],"Al jugarla: tu Nexo recibe 1.",[{t:"hurtNexus",n:1}]),se("umb_espectro","Espectro Fugaz",2,3,1,["rapido","efimero"]),se("umb_esqueleto","Esqueleto Guardián",2,1,4,["duro"]),se("umb_reptante","Reptante Abisal",3,2,3,["temible"]),se("umb_lobo","Lobo de Ceniza",3,3,3,["arrollar"]),se("umb_sanguijuela","Sanguijuela",3,3,2,["robovida"]),se("umb_ritualista","Ritualista",3,2,2,[],"Al jugarla: sacrifica una aliada para robar 2.",[{t:"sacDraw",n:2}]),se("umb_golem","Gólem de Hierro",3,2,5,["duro"]),se("umb_verdugo","Verdugo Sombrío",4,3,3,["letal"]),se("umb_jinete","Jinete Espectral",4,5,3,["arrollar"]),se("umb_basalto","Centinela de Basalto",4,3,5,["duro"]),se("umb_devoradora","Devoradora de Almas",5,4,4,[],"Gana +1/+1 cuando muere una aliada.",[],{a:1,h:1}),se("umb_azote","Azote del Vacío",5,4,3,["rapido","arrollar"]),se("umb_behemot","Behemot de Hierro",5,5,5,["duro"]),se("umb_abisal","Coloso Abisal",6,5,5,["duro","robovida"]),se("umb_senor","Señor de la Noche Eterna",7,6,6,["letal"]),se("umb_titan","Titán Regenerante",8,7,7,["regenera","arrollar"]),Te("umb_punalada","Puñalada",1,"burst","Inflige 2 a una unidad enemiga.",[{t:"dmgEnemy",n:2}]),Te("umb_piel","Piel de Hierro",2,"burst","Una aliada gana Duro.",[{t:"giveKw",kw:"duro"}]),Te("umb_embestida","Embestida",3,"focus","Inflige 3 al Nexo enemigo.",[{t:"dmgNexus",n:3}]),Te("umb_furia","Furia Sombría",2,"fast","Una aliada gana +3/+0 esta ronda.",[{t:"tempBuff",a:3,h:0}]),Te("umb_drenar","Drenar",3,"fast","Inflige 3 a una enemiga y cura 3 a tu Nexo.",[{t:"drain",n:3}]),Te("umb_plaga","Plaga Sombría",3,"fast","Inflige 1 a todas las unidades enemigas.",[{t:"dmgAll",n:1}]),Te("umb_pacto","Pacto de Sangre",2,"slow","Sacrifica tu unidad más débil; daña a una enemiga igual a su ataque.",[{t:"sacDmg"}]),Te("umb_maldicion","Maldición de Sombras",4,"slow","Las unidades enemigas pierden 2/2.",[{t:"debuffEnemies",a:2,h:2}]),Te("umb_aplastar","Aplastar",4,"slow","Inflige 5 a una unidad enemiga.",[{t:"dmgEnemy",n:5}]),Te("umb_eclipse","Eclipse",6,"slow","Destruye una unidad enemiga y roba 1.",[{t:"destroyEnemy"},{t:"draw",n:1}])],ue=Object.fromEntries([...Cd,...Vd].map(n=>[n.id,n])),Og=["lum_acolita","lum_vigia","lum_centinela","lum_portador","lum_novicia","lum_halcon","lum_destello","lum_rocio","lum_escudo","lum_bendicion"],Mg=["umb_sombra","umb_aprendiz","umb_acechador","umb_esqueleto","umb_cultista","umb_lobo","umb_golem","umb_punalada","umb_furia","umb_drenar"],Bs={Luminarae:[...Cd.map(n=>n.id),...Og],Umbra:[...Vd.map(n=>n.id),...Mg]},et=n=>1-n;function Nd(n){n.seed=n.seed+1831565813|0;let e=n.seed;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function xd(n,e){for(let t=e.length-1;t>0;t--){const r=Math.floor(Nd(n)*(t+1));[e[t],e[r]]=[e[r],e[t]]}}function qr(n,e,t){const r=n.p[e];for(let s=0;s<t;s++){const i=r.deck.pop();if(!i){n.winner=et(e);break}r.hand.length<10&&r.hand.push(i)}}const oo=(n,e,t)=>{n.p[e].nexus=Math.min(20,n.p[e].nexus+t)},ce=n=>Math.max(0,n.atk+n.ta),Re=n=>n.hp+n.th-n.dmg,yn=n=>{n.dmg=n.hp+n.th+999},ao=n=>ce(n)*1e6+Re(n)*1e3+ue[n.card].cost,Kt=n=>n.reduce((e,t)=>!e||ao(t)>ao(e)?t:e,void 0),Lu=n=>n.reduce((e,t)=>!e||ao(t)<ao(e)?t:e,void 0),Lg=["dmgEnemy","drain","destroyEnemy","sacDmg","frost"],Fg=["buffAlly","giveKw","tempBuff","healUnit"];function Xr(n){const e=ue[n];return!e||e.type!=="spell"?null:e.fx.some(t=>Lg.includes(t.t))?"enemy":e.fx.some(t=>Fg.includes(t.t))?"ally":null}function Ll(n,e){return!(n.kw.includes("elusivo")&&!e.kw.includes("elusivo")||n.kw.includes("temible")&&ce(e)<3)}function Dd(n,e){const t=s=>({nexus:20,deck:[...s],hand:[],board:[],mana:0,maxMana:0,spell:0,played:[]}),r={p:[t(n[0]),t(n[1])],round:0,token:0,active:0,phase:"mulligan",passes:0,winner:null,seed:e,uid:0,log:[],stack:[],attackers:[],blocks:{},forced:[],tok:[!1,!1],resumePhase:"main",mull:[!1,!1]};return r.p.forEach(s=>xd(r,s.deck)),qr(r,0,4),qr(r,1,4),r.token=Nd(r)<.5?0:1,r}function Ca(n,e,t){const r=n.p[e],s=[...new Set(t)].filter(i=>i>=0&&i<r.hand.length).sort((i,a)=>a-i);for(const i of s)r.deck.push(r.hand.splice(i,1)[0]);xd(n,r.deck),qr(n,e,s.length)}function Ya(n){if(n.round++,n.round>40){n.winner=-1;return}n.token=et(n.token),n.active=n.token,n.phase="main",n.passes=0,n.attackers=[],n.blocks={},n.forced=[],n.stack=[],n.tok=[!1,!1],n.tok[n.token]=!0;for(const e of[n.token,et(n.token)]){const t=n.p[e];if(t.maxMana=Math.min(10,t.maxMana+1),t.mana=t.maxMana,qr(n,e,1),n.winner!==null)return}n.log=n.log.slice(-40),n.log.push(`— Ronda ${n.round} (ficha: J${n.token+1}) —`),cr(n)}function Ug(n){for(const e of n.p)e.spell=Math.min(3,e.spell+e.mana),e.mana=0;for(const e of n.p)e.board.forEach(t=>{t.kw.includes("regenera")&&(t.dmg=0)});for(const e of n.p)e.board.forEach(t=>{t.kw.includes("efimero")&&yn(t)});Cn(n);for(const e of n.p)e.board.forEach(t=>{t.ta=0,t.th=0,t.dmg>=t.hp&&(t.dmg=t.hp-1)});cr(n),n.winner===null&&Ya(n)}function cr(n){if(n.winner!==null)return;const e=n.p[0].nexus<=0,t=n.p[1].nexus<=0;e&&t?n.winner=-1:e?n.winner=1:t&&(n.winner=0)}function Cn(n){for(let e=!0;e;){e=!1;for(const t of n.p){const r=t.board.filter(s=>Re(s)<=0);if(r.length){e=!0,t.board=t.board.filter(s=>Re(s)>0);for(const s of t.board){const i=ue[s.card].grow;i&&(s.atk+=i.a*r.length,s.hp+=i.h*r.length)}}}}}function Vr(n,e,t,r){if(t<=0)return 0;const s=e.kw.indexOf("barrera");if(s>=0)return e.kw.splice(s,1),0;if(e.kw.includes("duro")&&(t=Math.max(0,t-1)),t<=0)return 0;const i=Math.min(t,Math.max(0,Re(e)));return e.dmg+=t,r&&(r.u.kw.includes("letal")&&yn(e),r.u.kw.includes("robovida")&&oo(n,r.owner,i)),i}function Za(n,e,t,r,s){const i=n.p[e],a=n.p[et(e)];switch(t.t){case"healNexus":oo(n,e,t.n);break;case"hurtNexus":i.nexus-=t.n;break;case"dmgNexus":a.nexus-=t.n;break;case"draw":qr(n,e,t.n);break;case"buffOther":{const l=Kt(i.board.filter(u=>u!==r));l&&(l.atk+=t.a,l.hp+=t.h);break}case"buffAlly":{const l=s??Kt(i.board);l&&(l.atk+=t.a,l.hp+=t.h);break}case"tempBuff":{const l=s??Kt(i.board);l&&(l.ta+=t.a,l.th+=t.h);break}case"healUnit":{const l=s??i.board.find(u=>u.dmg>0);l&&(l.dmg=Math.max(0,l.dmg-t.n));break}case"tempBuffAll":i.board.forEach(l=>{l.ta+=t.a,l.th+=t.h});break;case"buffAll":i.board.forEach(l=>{l.atk+=t.a,l.hp+=t.h});break;case"giveKw":{const l=s??Kt(i.board);l&&!l.kw.includes(t.kw)&&l.kw.push(t.kw);break}case"dmgEnemy":{const l=s??Kt(a.board);l&&Vr(n,l,t.n);break}case"drain":{const l=s??Kt(a.board);l&&oo(n,e,Vr(n,l,t.n));break}case"dmgAll":a.board.forEach(l=>Vr(n,l,t.n));break;case"frost":{const l=s??Kt(a.board);l&&(l.ta-=ce(l));break}case"sacDraw":{const l=Lu(i.board.filter(u=>u!==r));l&&(yn(l),Cn(n),qr(n,e,t.n));break}case"sacDmg":{const l=Lu(i.board),u=s??Kt(a.board);if(l&&u){const h=ce(l);yn(l),Vr(n,u,h)}break}case"debuffEnemies":a.board.forEach(l=>{l.atk=Math.max(0,l.atk-t.a),l.hp-=t.h});break;case"destroyEnemy":{const l=s??Kt(a.board);l&&yn(l);break}}Cn(n)}function Yr(n,e,t){const r=n.p[e],s=ue[r.hand[t]];if(!s||n.winner!==null||n.active!==e||n.phase==="mulligan")return!1;if(s.type==="unit")return n.phase==="main"&&!n.stack.length&&!n.attackers.length&&r.board.length<6&&s.cost<=r.mana;if(s.cost>r.mana+r.spell)return!1;const i=s.speed??"fast";if((i==="slow"||i==="focus")&&(n.phase!=="main"||n.stack.length||n.attackers.length))return!1;const a=Xr(s.id);return!(a==="enemy"&&!n.p[et(e)].board.length||a==="ally"&&!r.board.length||s.fx.some(l=>l.t==="sacDmg")&&!r.board.length)}function Od(n){if(n.phase!=="block"&&!(n.phase==="stack"&&n.resumePhase==="block"))return;const e=n.p[n.token],t=n.p[et(n.token)];for(const r of Object.keys(n.blocks)){const s=e.board.find(a=>String(a.uid)===r),i=t.board.find(a=>a.uid===n.blocks[r]);s&&i&&Ll(s,i)||(s&&i&&n.log.push(`Bloqueo anulado: {${i.card}} ya no puede bloquear a {${s.card}}`),delete n.blocks[r],n.forced=n.forced.filter(a=>String(a)!==r))}}function $g(n){const e=n.stack.pop();if(!e)return;const t=ue[e.card],r=Xr(e.card);let s;if(r&&(s=[...n.p[0].board,...n.p[1].board].find(i=>i.uid===e.target),!s)){n.log.push(`{${e.card}} se disipa: el objetivo ya no existe`);return}n.log.push(`Se resuelve {${e.card}}`),t.fx.forEach(i=>Za(n,e.owner,i,void 0,s)),Cn(n),cr(n)}function Bg(n){var t;const e=((t=n.stack[0])==null?void 0:t.owner)??n.active;for(;n.stack.length&&n.winner===null;)$g(n);n.winner===null&&(Od(n),n.phase=n.resumePhase,n.active=et(e),n.passes=0)}function qg(n){const e=n.token,t=et(e),r=n.p[e],s=n.p[t],i=n.attackers.map(h=>r.board.find(f=>f.uid===h)).filter(h=>!!h).map(h=>({u:h,had:n.blocks[String(h.uid)]!==void 0,b:s.board.find(f=>f.uid===n.blocks[String(h.uid)])})),a=new Set,l=(h,f)=>{f<=0||(n.p[t].nexus-=f,h.kw.includes("robovida")&&oo(n,e,f))},u=(h,f,p)=>{const _=Re(p)+(p.kw.includes("duro")?1:0),A=ce(h);return Vr(n,p,A,{u:h,owner:f}),a.add(h.uid),Math.max(0,A-_)};for(const{u:h,b:f}of i)if(f&&h.kw.includes("rapido")&&ce(h)>0){const p=u(h,e,f);h.kw.includes("arrollar")&&l(h,p),h.kw.includes("efimero")&&yn(h)}if(Cn(n),cr(n),n.winner===null){for(const{u:h,had:f,b:p}of i){if(Re(h)<=0)continue;const _=a.has(h.uid);if(p&&Re(p)>0){let A=0;!_&&ce(h)>0&&(A=u(h,e,p)),ce(p)>0&&Vr(n,h,ce(p),{u:p,owner:t}),h.kw.includes("arrollar")&&!_&&l(h,A),h.kw.includes("efimero")&&!_&&yn(h)}else f?h.kw.includes("arrollar")&&!_&&l(h,ce(h)):(l(h,ce(h)),h.kw.includes("efimero")&&ce(h)>0&&yn(h))}Cn(n),cr(n),n.attackers=[],n.blocks={},n.forced=[],n.winner===null&&(n.phase="main",n.active=t,n.passes=0)}}function qs(n,e){if(n.winner!==null)return n;const t=structuredClone(n),r=t.active,s=t.p[r],i=t.p[et(r)];if(e.type==="mulligan")return t.phase!=="mulligan"?n:e.player!==void 0?e.player!==0&&e.player!==1||t.mull[e.player]||!Array.isArray(e.idx)?n:(Ca(t,e.player,e.idx),t.mull[e.player]=!0,t.mull[0]&&t.mull[1]&&Ya(t),t):(Ca(t,0,e.idx),Ca(t,1,t.p[1].hand.map((a,l)=>ue[a].cost>=4?l:-1).filter(a=>a>=0)),Ya(t),t);if(t.phase==="mulligan")return n;if(e.type==="play"){if(!Yr(t,r,e.hand))return n;const a=s.hand[e.hand],l=ue[a],u=Xr(a);let h;if(u&&(h=(u==="enemy"?i:s).board.find(f=>f.uid===e.target),!h))return n;if(l.type==="unit")s.mana-=l.cost;else{const f=Math.min(s.spell,l.cost);s.spell-=f,s.mana-=l.cost-f}if(s.hand.splice(e.hand,1),s.played.push(a),t.log.push(`J${r+1} juega {${a}}`),l.type==="unit"){const f={uid:++t.uid,card:a,atk:l.atk,hp:l.hp,dmg:0,kw:[...l.kw],ta:0,th:0};s.board.push(f),l.fx.forEach(p=>Za(t,r,p,f)),Cn(t),cr(t),t.active=et(r),t.passes=0}else{const f=l.speed??"fast";f==="burst"||f==="focus"?(l.fx.forEach(p=>Za(t,r,p,void 0,h)),Cn(t),cr(t),Od(t)):(t.resumePhase=t.phase==="stack"?t.resumePhase:t.phase,t.stack.push({card:a,owner:r,target:h==null?void 0:h.uid}),t.phase="stack",t.active=et(r),t.passes=0)}}else if(e.type==="pass"||e.type==="confirmBlocks"){if(e.type==="confirmBlocks"&&!(t.phase==="block"&&r===et(t.token)))return n;t.log.push(`J${r+1} pasa prioridad`),t.phase==="stack"?Bg(t):t.phase==="block"?r===et(t.token)?(t.active=t.token,t.passes=1):qg(t):++t.passes>=2?Ug(t):t.active=et(r)}else if(e.type==="attack"){if(t.phase!=="main"||t.stack.length||t.attackers.length||!t.tok[r])return n;const a=[...new Set(e.units)].map(u=>s.board[u]).filter(u=>!!u);if(!a.length)return n;t.tok[r]=!1,t.attackers=a.map(u=>u.uid),t.blocks={},t.forced=[];const l=new Set;for(const u of a)if(u.kw.includes("retador")){const h=i.board.filter(f=>!l.has(f.uid)).sort((f,p)=>(ce(u)>=Re(p)?1:0)-(ce(u)>=Re(f)?1:0)||Re(f)-Re(p))[0];h&&(t.blocks[String(u.uid)]=h.uid,t.forced.push(u.uid),l.add(h.uid))}t.phase="block",t.active=et(r),t.passes=0,t.log.push(`J${r+1} declara ataque con ${a.length} unidad(es)`)}else if(e.type==="block"){if(t.phase!=="block"||r!==et(t.token))return n;const a=t.p[t.token].board[e.attacker],l=s.board[e.blocker];if(!a||!l||!t.attackers.includes(a.uid)||t.forced.includes(a.uid)||!Ll(a,l))return n;const u=String(a.uid);if(t.blocks[u]===l.uid)delete t.blocks[u];else{if(Object.values(t.blocks).includes(l.uid))return n;t.blocks[u]=l.uid}}return t}const jg=n=>ue[n].fx.reduce((e,t)=>e+(t.t==="dmgEnemy"||t.t==="drain"?t.n:0),0),bs=n=>ce(n)*10+Re(n);function Fu(n,e){const t=n.p[e],r=n.p[1-e];let s=null;return t.hand.forEach((i,a)=>{const l=ue[i];if(l.type!=="spell"||!Yr(n,e,a))return;const u=Xr(i);let h=0,f;if(u==="enemy"){const p=[...r.board].sort((k,V)=>bs(V)-bs(k)),_=jg(i),A=p.find(k=>_>0&&Re(k)<=_)??(l.fx.some(k=>k.t==="destroyEnemy"||k.t==="frost")?p[0]:void 0);if(!A||l.fx.some(k=>k.t==="sacDmg")&&t.board.length<2)return;f=A.uid,h=bs(A)/2+l.cost}else if(u==="ally"){const p=l.fx.some(k=>k.t==="healUnit"),A=[...p?t.board.filter(k=>k.dmg>0):t.board].sort((k,V)=>p?V.dmg-k.dmg:bs(V)-bs(k))[0];if(!A)return;f=A.uid,h=p?2+A.dmg:3}else for(const p of l.fx)p.t==="healNexus"&&t.nexus<=20-p.n?h+=2:p.t==="buffAll"&&t.board.length>=2||(p.t==="debuffEnemies"||p.t==="dmgAll")&&r.board.length>=2?h+=3:p.t==="dmgNexus"?h+=r.nexus<=p.n?20:1:p.t==="tempBuffAll"&&t.board.length>=2&&n.tok[e]?h+=3:p.t==="draw"&&(h+=t.hand.length<6?2:0);h>0&&(!s||h>s.sc)&&(s={a:{type:"play",hand:a,target:f},sc:h})}),s?s.a:null}function zg(n){const e=n.active,t=n.p[e],r=n.p[1-e];if(n.phase==="mulligan")return{type:"mulligan",idx:[]};if(n.phase==="block"){if(e===n.token)return{type:"pass"};const a=n.attackers.map(h=>n.p[n.token].board.find(f=>f.uid===h)).filter(h=>!!h),l=a.reduce((h,f)=>h+ce(f),0),u=new Set(Object.values(n.blocks));for(const h of a.filter(f=>n.blocks[String(f.uid)]===void 0).sort((f,p)=>ce(p)-ce(f))){const f=t.board.map((_,A)=>({u:_,k:A})).filter(_=>!u.has(_.u.uid)&&Ll(h,_.u)),p=f.find(_=>ce(_.u)>=Re(h)&&Re(_.u)>ce(h))??f.find(_=>(ce(_.u)>=Re(h)||_.u.kw.includes("letal"))&&ce(h)>=3)??(t.nexus<=l?f.sort((_,A)=>Re(A.u)-Re(_.u))[0]:void 0);if(p)return{type:"block",attacker:n.p[n.token].board.indexOf(h),blocker:p.k}}return{type:"confirmBlocks"}}if(n.phase==="stack")return(Math.random()<.5?Fu(n,e):null)??{type:"pass"};let s=-1;if(t.hand.forEach((a,l)=>{ue[a].type==="unit"&&Yr(n,e,l)&&(s<0||ue[a].cost>ue[t.hand[s]].cost)&&(s=l)}),s>=0)return{type:"play",hand:s};const i=Fu(n,e);if(i&&Math.random()<.7)return i;if(n.tok[e]&&!n.attackers.length){const a=t.board.map((h,f)=>({u:h,k:f})),l=a.reduce((h,f)=>h+ce(f.u),0)>=r.nexus,u=a.filter(({u:h})=>l||!r.board.length||h.kw.includes("barrera")||h.kw.includes("elusivo")||r.board.every(f=>ce(f)<Re(h)&&!f.kw.includes("letal")));if(u.length)return{type:"attack",units:u.map(h=>h.k)}}return{type:"pass"}}const Md={},Hg="cartas-skins";let Fl={};try{Fl=JSON.parse(localStorage.getItem(Hg)||"{}")}catch{}const gt=n=>{var e,t;return((e=Fl[n])==null?void 0:e.name)||((t=Md[n])==null?void 0:t.name)||ue[n].name},Gg=n=>{var e,t;return((e=Fl[n])==null?void 0:e.image)||((t=Md[n])==null?void 0:t.image)||`/Apexora-TCG/img/${n}.webp`},Wg=new Set(Object.values(Bs).map(n=>n.filter(e=>ue[e].type==="unit").sort((e,t)=>ue[t].cost-ue[e].cost||ue[t].atk+ue[t].hp-ue[e].atk-ue[e].hp)[0])),Kg=n=>Wg.has(n),Qg=3300;let br=null;function Jg(n,e,t){br==null||br.remove();const r=n.slice(0,3)==="umb"?"umb":"lum",s=ue[n],i=br=document.createElement("div");i.className=`epic ${r}`;const a=Array.from({length:18},()=>`<i style="--x:${(Math.random()*100).toFixed(1)}%;--d:${(2.2+Math.random()*2.6).toFixed(2)}s;--t:${(Math.random()*1.6).toFixed(2)}s;--s:${(2+Math.random()*4).toFixed(1)}px"></i>`).join("");i.innerHTML=`<div class="ep-dim"></div><div class="ep-rays"></div><div class="ep-rays r2"></div><div class="ep-beam"></div><div class="ep-halo"></div>
    <div class="ep-dust">${a}</div><div class="ep-stage"><div class="ep-card">${e}<div class="ep-shine"></div></div>
    <div class="ep-name"><small>${r==="umb"?"EL VACÍO SE ALZA":"LA LUZ DESCIENDE"}</small><b>${s.name}</b></div></div>
    <div class="ep-ring"></div><div class="ep-flash"></div>`,document.body.append(i),document.body.classList.add("epic-on");const l=document.getElementById("app");setTimeout(()=>{i.isConnected&&l&&(l.classList.remove("shk-soft","shk-hard"),l.offsetWidth,l.classList.add("shk-hard"))},780);let u=!1;const h=()=>{u||(u=!0,i.classList.add("out"),setTimeout(()=>{i.remove(),br===i&&(br=null,document.body.classList.remove("epic-on")),t()},520))};i.addEventListener("click",h),setTimeout(h,Qg)}const Xg={hello:["Las sombras te saludan.","Hola, mortal. Disfruta tus últimos turnos.","¿Listo para caer?"],gg:["Buena partida. La próxima será peor para ti.","GG… por ahora."],idle:["Interesante… aunque inútil.","Habla todo lo que quieras.","La oscuridad escucha.","Juega tu carta.","..."],cast:["¿Sentiste eso?","Las sombras obedecen.","Eso va a doler."],win:["Imposible… la luz me venció esta vez.","Buena partida. Quiero la revancha."],lose:["La noche siempre gana.","Tu luz se apaga."]};class Yg{constructor(){Be(this,"cbs",[]);Be(this,"last",0)}onMessage(e){this.cbs.push(e)}emit(e){this.cbs.forEach(t=>t(e))}push(e){this.emit(e)}sys(e){this.emit({from:"",text:e,side:"sys"})}send(e){this.emit({from:"Tú",text:e,side:"me"});const t=/hola|buenas|hey/i.test(e)?"hello":/\bgg\b|bien jugado/i.test(e)?"gg":"idle";setTimeout(()=>this.say(t),700+Math.random()*900)}react(e){e==="cast"&&(Date.now()-this.last<2e4||Math.random()>.35)||this.say(e)}say(e){const t=Xg[e];this.last=Date.now(),this.emit({from:"Umbra",text:t[Math.floor(Math.random()*t.length)],side:"foe"})}}const Zg=()=>{};var Uu={};/**
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
 */const Ld=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},e_=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const s=n[t++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=n[t++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=n[t++],a=n[t++],l=n[t++],u=((s&7)<<18|(i&63)<<12|(a&63)<<6|l&63)-65536;e[r++]=String.fromCharCode(55296+(u>>10)),e[r++]=String.fromCharCode(56320+(u&1023))}else{const i=n[t++],a=n[t++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|a&63)}}return e.join("")},Fd={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){const i=n[s],a=s+1<n.length,l=a?n[s+1]:0,u=s+2<n.length,h=u?n[s+2]:0,f=i>>2,p=(i&3)<<4|l>>4;let _=(l&15)<<2|h>>6,A=h&63;u||(A=64,a||(_=64)),r.push(t[f],t[p],t[_],t[A])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Ld(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):e_(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){const i=t[n.charAt(s++)],l=s<n.length?t[n.charAt(s)]:0;++s;const h=s<n.length?t[n.charAt(s)]:64;++s;const p=s<n.length?t[n.charAt(s)]:64;if(++s,i==null||l==null||h==null||p==null)throw new t_;const _=i<<2|l>>4;if(r.push(_),h!==64){const A=l<<4&240|h>>2;if(r.push(A),p!==64){const k=h<<6&192|p;r.push(k)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class t_ extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const n_=function(n){const e=Ld(n);return Fd.encodeByteArray(e,!0)},lo=function(n){return n_(n).replace(/\./g,"")},Ud=function(n){try{return Fd.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function r_(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const s_=()=>r_().__FIREBASE_DEFAULTS__,i_=()=>{if(typeof process>"u"||typeof Uu>"u")return;const n=Uu.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},o_=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&Ud(n[1]);return e&&JSON.parse(e)},Vo=()=>{try{return Zg()||s_()||i_()||o_()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},$d=n=>{var e,t;return(t=(e=Vo())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},a_=n=>{const e=$d(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},Bd=()=>{var n;return(n=Vo())===null||n===void 0?void 0:n.config},qd=n=>{var e;return(e=Vo())===null||e===void 0?void 0:e[`_${n}`]};/**
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
 */class l_{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
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
 */function Zr(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function jd(n){return(await fetch(n,{credentials:"include"})).ok}/**
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
 */function c_(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},r=e||"demo-project",s=n.iat||0,i=n.sub||n.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}}},n);return[lo(JSON.stringify(t)),lo(JSON.stringify(a)),""].join(".")}const Ns={};function u_(){const n={prod:[],emulator:[]};for(const e of Object.keys(Ns))Ns[e]?n.emulator.push(e):n.prod.push(e);return n}function h_(n){let e=document.getElementById(n),t=!1;return e||(e=document.createElement("div"),e.setAttribute("id",n),t=!0),{created:t,element:e}}let $u=!1;function zd(n,e){if(typeof window>"u"||typeof document>"u"||!Zr(window.location.host)||Ns[n]===e||Ns[n]||$u)return;Ns[n]=e;function t(_){return`__firebase__banner__${_}`}const r="__firebase__banner",i=u_().prod.length>0;function a(){const _=document.getElementById(r);_&&_.remove()}function l(_){_.style.display="flex",_.style.background="#7faaf0",_.style.position="fixed",_.style.bottom="5px",_.style.left="5px",_.style.padding=".5em",_.style.borderRadius="5px",_.style.alignItems="center"}function u(_,A){_.setAttribute("width","24"),_.setAttribute("id",A),_.setAttribute("height","24"),_.setAttribute("viewBox","0 0 24 24"),_.setAttribute("fill","none"),_.style.marginLeft="-6px"}function h(){const _=document.createElement("span");return _.style.cursor="pointer",_.style.marginLeft="16px",_.style.fontSize="24px",_.innerHTML=" &times;",_.onclick=()=>{$u=!0,a()},_}function f(_,A){_.setAttribute("id",A),_.innerText="Learn more",_.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",_.setAttribute("target","__blank"),_.style.paddingLeft="5px",_.style.textDecoration="underline"}function p(){const _=h_(r),A=t("text"),k=document.getElementById(A)||document.createElement("span"),V=t("learnmore"),N=document.getElementById(V)||document.createElement("a"),W=t("preprendIcon"),z=document.getElementById(W)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(_.created){const B=_.element;l(B),f(N,V);const j=h();u(z,W),B.append(z,k,N,j),document.body.appendChild(B)}i?(k.innerText="Preview backend disconnected.",z.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
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
</defs>`,k.innerText="Preview backend running in this workspace."),k.setAttribute("id",A)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",p):p()}/**
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
 */function st(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function d_(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(st())}function f_(){var n;const e=(n=Vo())===null||n===void 0?void 0:n.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function p_(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function m_(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function g_(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function __(){const n=st();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function y_(){return!f_()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function v_(){try{return typeof indexedDB=="object"}catch{return!1}}function E_(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{var i;e(((i=s.error)===null||i===void 0?void 0:i.message)||"")}}catch(t){e(t)}})}/**
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
 */const w_="FirebaseError";class sn extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=w_,Object.setPrototypeOf(this,sn.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,ri.prototype.create)}}class ri{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},s=`${this.service}/${e}`,i=this.errors[e],a=i?T_(i,r):"Error",l=`${this.serviceName}: ${a} (${s}).`;return new sn(s,l,r)}}function T_(n,e){return n.replace(I_,(t,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const I_=/\{\$([^}]+)}/g;function b_(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function ur(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const s of t){if(!r.includes(s))return!1;const i=n[s],a=e[s];if(Bu(i)&&Bu(a)){if(!ur(i,a))return!1}else if(i!==a)return!1}for(const s of r)if(!t.includes(s))return!1;return!0}function Bu(n){return n!==null&&typeof n=="object"}/**
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
 */function si(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function A_(n,e){const t=new S_(n,e);return t.subscribe.bind(t)}class S_{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let s;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");R_(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:r},s.next===void 0&&(s.next=Va),s.error===void 0&&(s.error=Va),s.complete===void 0&&(s.complete=Va);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function R_(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function Va(){}/**
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
 */function We(n){return n&&n._delegate?n._delegate:n}class hr{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const Jn="[DEFAULT]";/**
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
 */class k_{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new l_;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(t=e==null?void 0:e.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(i){if(s)return null;throw i}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(C_(e))try{this.getOrInitializeService({instanceIdentifier:Jn})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=Jn){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Jn){return this.instances.has(e)}getOptions(e=Jn){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[i,a]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(i);r===l&&a.resolve(s)}return s}onInit(e,t){var r;const s=this.normalizeInstanceIdentifier(t),i=(r=this.onInitCallbacks.get(s))!==null&&r!==void 0?r:new Set;i.add(e),this.onInitCallbacks.set(s,i);const a=this.instances.get(s);return a&&e(a,s),()=>{i.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const s of r)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:P_(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=Jn){return this.component?this.component.multipleInstances?e:Jn:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function P_(n){return n===Jn?void 0:n}function C_(n){return n.instantiationMode==="EAGER"}/**
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
 */class V_{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new k_(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var ne;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(ne||(ne={}));const N_={debug:ne.DEBUG,verbose:ne.VERBOSE,info:ne.INFO,warn:ne.WARN,error:ne.ERROR,silent:ne.SILENT},x_=ne.INFO,D_={[ne.DEBUG]:"log",[ne.VERBOSE]:"log",[ne.INFO]:"info",[ne.WARN]:"warn",[ne.ERROR]:"error"},O_=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),s=D_[e];if(s)console[s](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Ul{constructor(e){this.name=e,this._logLevel=x_,this._logHandler=O_,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in ne))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?N_[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,ne.DEBUG,...e),this._logHandler(this,ne.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,ne.VERBOSE,...e),this._logHandler(this,ne.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,ne.INFO,...e),this._logHandler(this,ne.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,ne.WARN,...e),this._logHandler(this,ne.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,ne.ERROR,...e),this._logHandler(this,ne.ERROR,...e)}}const M_=(n,e)=>e.some(t=>n instanceof t);let qu,ju;function L_(){return qu||(qu=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function F_(){return ju||(ju=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Hd=new WeakMap,el=new WeakMap,Gd=new WeakMap,Na=new WeakMap,$l=new WeakMap;function U_(n){const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("success",i),n.removeEventListener("error",a)},i=()=>{t(vn(n.result)),s()},a=()=>{r(n.error),s()};n.addEventListener("success",i),n.addEventListener("error",a)});return e.then(t=>{t instanceof IDBCursor&&Hd.set(t,n)}).catch(()=>{}),$l.set(e,n),e}function $_(n){if(el.has(n))return;const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("complete",i),n.removeEventListener("error",a),n.removeEventListener("abort",a)},i=()=>{t(),s()},a=()=>{r(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",i),n.addEventListener("error",a),n.addEventListener("abort",a)});el.set(n,e)}let tl={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return el.get(n);if(e==="objectStoreNames")return n.objectStoreNames||Gd.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return vn(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function B_(n){tl=n(tl)}function q_(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const r=n.call(xa(this),e,...t);return Gd.set(r,e.sort?e.sort():[e]),vn(r)}:F_().includes(n)?function(...e){return n.apply(xa(this),e),vn(Hd.get(this))}:function(...e){return vn(n.apply(xa(this),e))}}function j_(n){return typeof n=="function"?q_(n):(n instanceof IDBTransaction&&$_(n),M_(n,L_())?new Proxy(n,tl):n)}function vn(n){if(n instanceof IDBRequest)return U_(n);if(Na.has(n))return Na.get(n);const e=j_(n);return e!==n&&(Na.set(n,e),$l.set(e,n)),e}const xa=n=>$l.get(n);function z_(n,e,{blocked:t,upgrade:r,blocking:s,terminated:i}={}){const a=indexedDB.open(n,e),l=vn(a);return r&&a.addEventListener("upgradeneeded",u=>{r(vn(a.result),u.oldVersion,u.newVersion,vn(a.transaction),u)}),t&&a.addEventListener("blocked",u=>t(u.oldVersion,u.newVersion,u)),l.then(u=>{i&&u.addEventListener("close",()=>i()),s&&u.addEventListener("versionchange",h=>s(h.oldVersion,h.newVersion,h))}).catch(()=>{}),l}const H_=["get","getKey","getAll","getAllKeys","count"],G_=["put","add","delete","clear"],Da=new Map;function zu(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(Da.get(e))return Da.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,s=G_.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(s||H_.includes(t)))return;const i=async function(a,...l){const u=this.transaction(a,s?"readwrite":"readonly");let h=u.store;return r&&(h=h.index(l.shift())),(await Promise.all([h[t](...l),s&&u.done]))[0]};return Da.set(e,i),i}B_(n=>({...n,get:(e,t,r)=>zu(e,t)||n.get(e,t,r),has:(e,t)=>!!zu(e,t)||n.has(e,t)}));/**
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
 */class W_{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(K_(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function K_(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const nl="@firebase/app",Hu="0.13.2";/**
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
 */const Zt=new Ul("@firebase/app"),Q_="@firebase/app-compat",J_="@firebase/analytics-compat",X_="@firebase/analytics",Y_="@firebase/app-check-compat",Z_="@firebase/app-check",e0="@firebase/auth",t0="@firebase/auth-compat",n0="@firebase/database",r0="@firebase/data-connect",s0="@firebase/database-compat",i0="@firebase/functions",o0="@firebase/functions-compat",a0="@firebase/installations",l0="@firebase/installations-compat",c0="@firebase/messaging",u0="@firebase/messaging-compat",h0="@firebase/performance",d0="@firebase/performance-compat",f0="@firebase/remote-config",p0="@firebase/remote-config-compat",m0="@firebase/storage",g0="@firebase/storage-compat",_0="@firebase/firestore",y0="@firebase/ai",v0="@firebase/firestore-compat",E0="firebase",w0="11.10.0";/**
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
 */const rl="[DEFAULT]",T0={[nl]:"fire-core",[Q_]:"fire-core-compat",[X_]:"fire-analytics",[J_]:"fire-analytics-compat",[Z_]:"fire-app-check",[Y_]:"fire-app-check-compat",[e0]:"fire-auth",[t0]:"fire-auth-compat",[n0]:"fire-rtdb",[r0]:"fire-data-connect",[s0]:"fire-rtdb-compat",[i0]:"fire-fn",[o0]:"fire-fn-compat",[a0]:"fire-iid",[l0]:"fire-iid-compat",[c0]:"fire-fcm",[u0]:"fire-fcm-compat",[h0]:"fire-perf",[d0]:"fire-perf-compat",[f0]:"fire-rc",[p0]:"fire-rc-compat",[m0]:"fire-gcs",[g0]:"fire-gcs-compat",[_0]:"fire-fst",[v0]:"fire-fst-compat",[y0]:"fire-vertex","fire-js":"fire-js",[E0]:"fire-js-all"};/**
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
 */const co=new Map,I0=new Map,sl=new Map;function Gu(n,e){try{n.container.addComponent(e)}catch(t){Zt.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function jr(n){const e=n.name;if(sl.has(e))return Zt.debug(`There were multiple attempts to register component ${e}.`),!1;sl.set(e,n);for(const t of co.values())Gu(t,n);for(const t of I0.values())Gu(t,n);return!0}function Bl(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function bt(n){return n==null?!1:n.settings!==void 0}/**
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
 */const b0={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},En=new ri("app","Firebase",b0);/**
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
 */class A0{constructor(e,t,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new hr("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw En.create("app-deleted",{appName:this._name})}}/**
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
 */const es=w0;function Wd(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r=Object.assign({name:rl,automaticDataCollectionEnabled:!0},e),s=r.name;if(typeof s!="string"||!s)throw En.create("bad-app-name",{appName:String(s)});if(t||(t=Bd()),!t)throw En.create("no-options");const i=co.get(s);if(i){if(ur(t,i.options)&&ur(r,i.config))return i;throw En.create("duplicate-app",{appName:s})}const a=new V_(s);for(const u of sl.values())a.addComponent(u);const l=new A0(t,r,a);return co.set(s,l),l}function Kd(n=rl){const e=co.get(n);if(!e&&n===rl&&Bd())return Wd();if(!e)throw En.create("no-app",{appName:n});return e}function wn(n,e,t){var r;let s=(r=T0[n])!==null&&r!==void 0?r:n;t&&(s+=`-${t}`);const i=s.match(/\s|\//),a=e.match(/\s|\//);if(i||a){const l=[`Unable to register library "${s}" with version "${e}":`];i&&l.push(`library name "${s}" contains illegal characters (whitespace or "/")`),i&&a&&l.push("and"),a&&l.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Zt.warn(l.join(" "));return}jr(new hr(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
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
 */const S0="firebase-heartbeat-database",R0=1,js="firebase-heartbeat-store";let Oa=null;function Qd(){return Oa||(Oa=z_(S0,R0,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(js)}catch(t){console.warn(t)}}}}).catch(n=>{throw En.create("idb-open",{originalErrorMessage:n.message})})),Oa}async function k0(n){try{const t=(await Qd()).transaction(js),r=await t.objectStore(js).get(Jd(n));return await t.done,r}catch(e){if(e instanceof sn)Zt.warn(e.message);else{const t=En.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Zt.warn(t.message)}}}async function Wu(n,e){try{const r=(await Qd()).transaction(js,"readwrite");await r.objectStore(js).put(e,Jd(n)),await r.done}catch(t){if(t instanceof sn)Zt.warn(t.message);else{const r=En.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});Zt.warn(r.message)}}}function Jd(n){return`${n.name}!${n.options.appId}`}/**
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
 */const P0=1024,C0=30;class V0{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new x0(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,t;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=Ku();if(((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(a=>a.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:s}),this._heartbeatsCache.heartbeats.length>C0){const a=D0(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(a,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){Zt.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=Ku(),{heartbeatsToSend:r,unsentEntries:s}=N0(this._heartbeatsCache.heartbeats),i=lo(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(t){return Zt.warn(t),""}}}function Ku(){return new Date().toISOString().substring(0,10)}function N0(n,e=P0){const t=[];let r=n.slice();for(const s of n){const i=t.find(a=>a.agent===s.agent);if(i){if(i.dates.push(s.date),Qu(t)>e){i.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),Qu(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class x0{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return v_()?E_().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await k0(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return Wu(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return Wu(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function Qu(n){return lo(JSON.stringify({version:2,heartbeats:n})).length}function D0(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let r=1;r<n.length;r++)n[r].date<t&&(t=n[r].date,e=r);return e}/**
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
 */function O0(n){jr(new hr("platform-logger",e=>new W_(e),"PRIVATE")),jr(new hr("heartbeat",e=>new V0(e),"PRIVATE")),wn(nl,Hu,n),wn(nl,Hu,"esm2017"),wn("fire-js","")}O0("");var Ju=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Tn,Xd;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(E,g){function y(){}y.prototype=g.prototype,E.D=g.prototype,E.prototype=new y,E.prototype.constructor=E,E.C=function(w,T,I){for(var v=Array(arguments.length-2),De=2;De<arguments.length;De++)v[De-2]=arguments[De];return g.prototype[T].apply(w,v)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,t),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(E,g,y){y||(y=0);var w=Array(16);if(typeof g=="string")for(var T=0;16>T;++T)w[T]=g.charCodeAt(y++)|g.charCodeAt(y++)<<8|g.charCodeAt(y++)<<16|g.charCodeAt(y++)<<24;else for(T=0;16>T;++T)w[T]=g[y++]|g[y++]<<8|g[y++]<<16|g[y++]<<24;g=E.g[0],y=E.g[1],T=E.g[2];var I=E.g[3],v=g+(I^y&(T^I))+w[0]+3614090360&4294967295;g=y+(v<<7&4294967295|v>>>25),v=I+(T^g&(y^T))+w[1]+3905402710&4294967295,I=g+(v<<12&4294967295|v>>>20),v=T+(y^I&(g^y))+w[2]+606105819&4294967295,T=I+(v<<17&4294967295|v>>>15),v=y+(g^T&(I^g))+w[3]+3250441966&4294967295,y=T+(v<<22&4294967295|v>>>10),v=g+(I^y&(T^I))+w[4]+4118548399&4294967295,g=y+(v<<7&4294967295|v>>>25),v=I+(T^g&(y^T))+w[5]+1200080426&4294967295,I=g+(v<<12&4294967295|v>>>20),v=T+(y^I&(g^y))+w[6]+2821735955&4294967295,T=I+(v<<17&4294967295|v>>>15),v=y+(g^T&(I^g))+w[7]+4249261313&4294967295,y=T+(v<<22&4294967295|v>>>10),v=g+(I^y&(T^I))+w[8]+1770035416&4294967295,g=y+(v<<7&4294967295|v>>>25),v=I+(T^g&(y^T))+w[9]+2336552879&4294967295,I=g+(v<<12&4294967295|v>>>20),v=T+(y^I&(g^y))+w[10]+4294925233&4294967295,T=I+(v<<17&4294967295|v>>>15),v=y+(g^T&(I^g))+w[11]+2304563134&4294967295,y=T+(v<<22&4294967295|v>>>10),v=g+(I^y&(T^I))+w[12]+1804603682&4294967295,g=y+(v<<7&4294967295|v>>>25),v=I+(T^g&(y^T))+w[13]+4254626195&4294967295,I=g+(v<<12&4294967295|v>>>20),v=T+(y^I&(g^y))+w[14]+2792965006&4294967295,T=I+(v<<17&4294967295|v>>>15),v=y+(g^T&(I^g))+w[15]+1236535329&4294967295,y=T+(v<<22&4294967295|v>>>10),v=g+(T^I&(y^T))+w[1]+4129170786&4294967295,g=y+(v<<5&4294967295|v>>>27),v=I+(y^T&(g^y))+w[6]+3225465664&4294967295,I=g+(v<<9&4294967295|v>>>23),v=T+(g^y&(I^g))+w[11]+643717713&4294967295,T=I+(v<<14&4294967295|v>>>18),v=y+(I^g&(T^I))+w[0]+3921069994&4294967295,y=T+(v<<20&4294967295|v>>>12),v=g+(T^I&(y^T))+w[5]+3593408605&4294967295,g=y+(v<<5&4294967295|v>>>27),v=I+(y^T&(g^y))+w[10]+38016083&4294967295,I=g+(v<<9&4294967295|v>>>23),v=T+(g^y&(I^g))+w[15]+3634488961&4294967295,T=I+(v<<14&4294967295|v>>>18),v=y+(I^g&(T^I))+w[4]+3889429448&4294967295,y=T+(v<<20&4294967295|v>>>12),v=g+(T^I&(y^T))+w[9]+568446438&4294967295,g=y+(v<<5&4294967295|v>>>27),v=I+(y^T&(g^y))+w[14]+3275163606&4294967295,I=g+(v<<9&4294967295|v>>>23),v=T+(g^y&(I^g))+w[3]+4107603335&4294967295,T=I+(v<<14&4294967295|v>>>18),v=y+(I^g&(T^I))+w[8]+1163531501&4294967295,y=T+(v<<20&4294967295|v>>>12),v=g+(T^I&(y^T))+w[13]+2850285829&4294967295,g=y+(v<<5&4294967295|v>>>27),v=I+(y^T&(g^y))+w[2]+4243563512&4294967295,I=g+(v<<9&4294967295|v>>>23),v=T+(g^y&(I^g))+w[7]+1735328473&4294967295,T=I+(v<<14&4294967295|v>>>18),v=y+(I^g&(T^I))+w[12]+2368359562&4294967295,y=T+(v<<20&4294967295|v>>>12),v=g+(y^T^I)+w[5]+4294588738&4294967295,g=y+(v<<4&4294967295|v>>>28),v=I+(g^y^T)+w[8]+2272392833&4294967295,I=g+(v<<11&4294967295|v>>>21),v=T+(I^g^y)+w[11]+1839030562&4294967295,T=I+(v<<16&4294967295|v>>>16),v=y+(T^I^g)+w[14]+4259657740&4294967295,y=T+(v<<23&4294967295|v>>>9),v=g+(y^T^I)+w[1]+2763975236&4294967295,g=y+(v<<4&4294967295|v>>>28),v=I+(g^y^T)+w[4]+1272893353&4294967295,I=g+(v<<11&4294967295|v>>>21),v=T+(I^g^y)+w[7]+4139469664&4294967295,T=I+(v<<16&4294967295|v>>>16),v=y+(T^I^g)+w[10]+3200236656&4294967295,y=T+(v<<23&4294967295|v>>>9),v=g+(y^T^I)+w[13]+681279174&4294967295,g=y+(v<<4&4294967295|v>>>28),v=I+(g^y^T)+w[0]+3936430074&4294967295,I=g+(v<<11&4294967295|v>>>21),v=T+(I^g^y)+w[3]+3572445317&4294967295,T=I+(v<<16&4294967295|v>>>16),v=y+(T^I^g)+w[6]+76029189&4294967295,y=T+(v<<23&4294967295|v>>>9),v=g+(y^T^I)+w[9]+3654602809&4294967295,g=y+(v<<4&4294967295|v>>>28),v=I+(g^y^T)+w[12]+3873151461&4294967295,I=g+(v<<11&4294967295|v>>>21),v=T+(I^g^y)+w[15]+530742520&4294967295,T=I+(v<<16&4294967295|v>>>16),v=y+(T^I^g)+w[2]+3299628645&4294967295,y=T+(v<<23&4294967295|v>>>9),v=g+(T^(y|~I))+w[0]+4096336452&4294967295,g=y+(v<<6&4294967295|v>>>26),v=I+(y^(g|~T))+w[7]+1126891415&4294967295,I=g+(v<<10&4294967295|v>>>22),v=T+(g^(I|~y))+w[14]+2878612391&4294967295,T=I+(v<<15&4294967295|v>>>17),v=y+(I^(T|~g))+w[5]+4237533241&4294967295,y=T+(v<<21&4294967295|v>>>11),v=g+(T^(y|~I))+w[12]+1700485571&4294967295,g=y+(v<<6&4294967295|v>>>26),v=I+(y^(g|~T))+w[3]+2399980690&4294967295,I=g+(v<<10&4294967295|v>>>22),v=T+(g^(I|~y))+w[10]+4293915773&4294967295,T=I+(v<<15&4294967295|v>>>17),v=y+(I^(T|~g))+w[1]+2240044497&4294967295,y=T+(v<<21&4294967295|v>>>11),v=g+(T^(y|~I))+w[8]+1873313359&4294967295,g=y+(v<<6&4294967295|v>>>26),v=I+(y^(g|~T))+w[15]+4264355552&4294967295,I=g+(v<<10&4294967295|v>>>22),v=T+(g^(I|~y))+w[6]+2734768916&4294967295,T=I+(v<<15&4294967295|v>>>17),v=y+(I^(T|~g))+w[13]+1309151649&4294967295,y=T+(v<<21&4294967295|v>>>11),v=g+(T^(y|~I))+w[4]+4149444226&4294967295,g=y+(v<<6&4294967295|v>>>26),v=I+(y^(g|~T))+w[11]+3174756917&4294967295,I=g+(v<<10&4294967295|v>>>22),v=T+(g^(I|~y))+w[2]+718787259&4294967295,T=I+(v<<15&4294967295|v>>>17),v=y+(I^(T|~g))+w[9]+3951481745&4294967295,E.g[0]=E.g[0]+g&4294967295,E.g[1]=E.g[1]+(T+(v<<21&4294967295|v>>>11))&4294967295,E.g[2]=E.g[2]+T&4294967295,E.g[3]=E.g[3]+I&4294967295}r.prototype.u=function(E,g){g===void 0&&(g=E.length);for(var y=g-this.blockSize,w=this.B,T=this.h,I=0;I<g;){if(T==0)for(;I<=y;)s(this,E,I),I+=this.blockSize;if(typeof E=="string"){for(;I<g;)if(w[T++]=E.charCodeAt(I++),T==this.blockSize){s(this,w),T=0;break}}else for(;I<g;)if(w[T++]=E[I++],T==this.blockSize){s(this,w),T=0;break}}this.h=T,this.o+=g},r.prototype.v=function(){var E=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);E[0]=128;for(var g=1;g<E.length-8;++g)E[g]=0;var y=8*this.o;for(g=E.length-8;g<E.length;++g)E[g]=y&255,y/=256;for(this.u(E),E=Array(16),g=y=0;4>g;++g)for(var w=0;32>w;w+=8)E[y++]=this.g[g]>>>w&255;return E};function i(E,g){var y=l;return Object.prototype.hasOwnProperty.call(y,E)?y[E]:y[E]=g(E)}function a(E,g){this.h=g;for(var y=[],w=!0,T=E.length-1;0<=T;T--){var I=E[T]|0;w&&I==g||(y[T]=I,w=!1)}this.g=y}var l={};function u(E){return-128<=E&&128>E?i(E,function(g){return new a([g|0],0>g?-1:0)}):new a([E|0],0>E?-1:0)}function h(E){if(isNaN(E)||!isFinite(E))return p;if(0>E)return N(h(-E));for(var g=[],y=1,w=0;E>=y;w++)g[w]=E/y|0,y*=4294967296;return new a(g,0)}function f(E,g){if(E.length==0)throw Error("number format error: empty string");if(g=g||10,2>g||36<g)throw Error("radix out of range: "+g);if(E.charAt(0)=="-")return N(f(E.substring(1),g));if(0<=E.indexOf("-"))throw Error('number format error: interior "-" character');for(var y=h(Math.pow(g,8)),w=p,T=0;T<E.length;T+=8){var I=Math.min(8,E.length-T),v=parseInt(E.substring(T,T+I),g);8>I?(I=h(Math.pow(g,I)),w=w.j(I).add(h(v))):(w=w.j(y),w=w.add(h(v)))}return w}var p=u(0),_=u(1),A=u(16777216);n=a.prototype,n.m=function(){if(V(this))return-N(this).m();for(var E=0,g=1,y=0;y<this.g.length;y++){var w=this.i(y);E+=(0<=w?w:4294967296+w)*g,g*=4294967296}return E},n.toString=function(E){if(E=E||10,2>E||36<E)throw Error("radix out of range: "+E);if(k(this))return"0";if(V(this))return"-"+N(this).toString(E);for(var g=h(Math.pow(E,6)),y=this,w="";;){var T=j(y,g).g;y=W(y,T.j(g));var I=((0<y.g.length?y.g[0]:y.h)>>>0).toString(E);if(y=T,k(y))return I+w;for(;6>I.length;)I="0"+I;w=I+w}},n.i=function(E){return 0>E?0:E<this.g.length?this.g[E]:this.h};function k(E){if(E.h!=0)return!1;for(var g=0;g<E.g.length;g++)if(E.g[g]!=0)return!1;return!0}function V(E){return E.h==-1}n.l=function(E){return E=W(this,E),V(E)?-1:k(E)?0:1};function N(E){for(var g=E.g.length,y=[],w=0;w<g;w++)y[w]=~E.g[w];return new a(y,~E.h).add(_)}n.abs=function(){return V(this)?N(this):this},n.add=function(E){for(var g=Math.max(this.g.length,E.g.length),y=[],w=0,T=0;T<=g;T++){var I=w+(this.i(T)&65535)+(E.i(T)&65535),v=(I>>>16)+(this.i(T)>>>16)+(E.i(T)>>>16);w=v>>>16,I&=65535,v&=65535,y[T]=v<<16|I}return new a(y,y[y.length-1]&-2147483648?-1:0)};function W(E,g){return E.add(N(g))}n.j=function(E){if(k(this)||k(E))return p;if(V(this))return V(E)?N(this).j(N(E)):N(N(this).j(E));if(V(E))return N(this.j(N(E)));if(0>this.l(A)&&0>E.l(A))return h(this.m()*E.m());for(var g=this.g.length+E.g.length,y=[],w=0;w<2*g;w++)y[w]=0;for(w=0;w<this.g.length;w++)for(var T=0;T<E.g.length;T++){var I=this.i(w)>>>16,v=this.i(w)&65535,De=E.i(T)>>>16,ft=E.i(T)&65535;y[2*w+2*T]+=v*ft,z(y,2*w+2*T),y[2*w+2*T+1]+=I*ft,z(y,2*w+2*T+1),y[2*w+2*T+1]+=v*De,z(y,2*w+2*T+1),y[2*w+2*T+2]+=I*De,z(y,2*w+2*T+2)}for(w=0;w<g;w++)y[w]=y[2*w+1]<<16|y[2*w];for(w=g;w<2*g;w++)y[w]=0;return new a(y,0)};function z(E,g){for(;(E[g]&65535)!=E[g];)E[g+1]+=E[g]>>>16,E[g]&=65535,g++}function B(E,g){this.g=E,this.h=g}function j(E,g){if(k(g))throw Error("division by zero");if(k(E))return new B(p,p);if(V(E))return g=j(N(E),g),new B(N(g.g),N(g.h));if(V(g))return g=j(E,N(g)),new B(N(g.g),g.h);if(30<E.g.length){if(V(E)||V(g))throw Error("slowDivide_ only works with positive integers.");for(var y=_,w=g;0>=w.l(E);)y=le(y),w=le(w);var T=q(y,1),I=q(w,1);for(w=q(w,2),y=q(y,2);!k(w);){var v=I.add(w);0>=v.l(E)&&(T=T.add(y),I=v),w=q(w,1),y=q(y,1)}return g=W(E,T.j(g)),new B(T,g)}for(T=p;0<=E.l(g);){for(y=Math.max(1,Math.floor(E.m()/g.m())),w=Math.ceil(Math.log(y)/Math.LN2),w=48>=w?1:Math.pow(2,w-48),I=h(y),v=I.j(g);V(v)||0<v.l(E);)y-=w,I=h(y),v=I.j(g);k(I)&&(I=_),T=T.add(I),E=W(E,v)}return new B(T,E)}n.A=function(E){return j(this,E).h},n.and=function(E){for(var g=Math.max(this.g.length,E.g.length),y=[],w=0;w<g;w++)y[w]=this.i(w)&E.i(w);return new a(y,this.h&E.h)},n.or=function(E){for(var g=Math.max(this.g.length,E.g.length),y=[],w=0;w<g;w++)y[w]=this.i(w)|E.i(w);return new a(y,this.h|E.h)},n.xor=function(E){for(var g=Math.max(this.g.length,E.g.length),y=[],w=0;w<g;w++)y[w]=this.i(w)^E.i(w);return new a(y,this.h^E.h)};function le(E){for(var g=E.g.length+1,y=[],w=0;w<g;w++)y[w]=E.i(w)<<1|E.i(w-1)>>>31;return new a(y,E.h)}function q(E,g){var y=g>>5;g%=32;for(var w=E.g.length-y,T=[],I=0;I<w;I++)T[I]=0<g?E.i(I+y)>>>g|E.i(I+y+1)<<32-g:E.i(I+y);return new a(T,E.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,Xd=r,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.A,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=h,a.fromString=f,Tn=a}).apply(typeof Ju<"u"?Ju:typeof self<"u"?self:typeof window<"u"?window:{});var Oi=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Yd,Rs,Zd,Hi,il,ef,tf,nf;(function(){var n,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(o,c,d){return o==Array.prototype||o==Object.prototype||(o[c]=d.value),o};function t(o){o=[typeof globalThis=="object"&&globalThis,o,typeof window=="object"&&window,typeof self=="object"&&self,typeof Oi=="object"&&Oi];for(var c=0;c<o.length;++c){var d=o[c];if(d&&d.Math==Math)return d}throw Error("Cannot find global object")}var r=t(this);function s(o,c){if(c)e:{var d=r;o=o.split(".");for(var m=0;m<o.length-1;m++){var b=o[m];if(!(b in d))break e;d=d[b]}o=o[o.length-1],m=d[o],c=c(m),c!=m&&c!=null&&e(d,o,{configurable:!0,writable:!0,value:c})}}function i(o,c){o instanceof String&&(o+="");var d=0,m=!1,b={next:function(){if(!m&&d<o.length){var R=d++;return{value:c(R,o[R]),done:!1}}return m=!0,{done:!0,value:void 0}}};return b[Symbol.iterator]=function(){return b},b}s("Array.prototype.values",function(o){return o||function(){return i(this,function(c,d){return d})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var a=a||{},l=this||self;function u(o){var c=typeof o;return c=c!="object"?c:o?Array.isArray(o)?"array":c:"null",c=="array"||c=="object"&&typeof o.length=="number"}function h(o){var c=typeof o;return c=="object"&&o!=null||c=="function"}function f(o,c,d){return o.call.apply(o.bind,arguments)}function p(o,c,d){if(!o)throw Error();if(2<arguments.length){var m=Array.prototype.slice.call(arguments,2);return function(){var b=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(b,m),o.apply(c,b)}}return function(){return o.apply(c,arguments)}}function _(o,c,d){return _=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?f:p,_.apply(null,arguments)}function A(o,c){var d=Array.prototype.slice.call(arguments,1);return function(){var m=d.slice();return m.push.apply(m,arguments),o.apply(this,m)}}function k(o,c){function d(){}d.prototype=c.prototype,o.aa=c.prototype,o.prototype=new d,o.prototype.constructor=o,o.Qb=function(m,b,R){for(var O=Array(arguments.length-2),ge=2;ge<arguments.length;ge++)O[ge-2]=arguments[ge];return c.prototype[b].apply(m,O)}}function V(o){const c=o.length;if(0<c){const d=Array(c);for(let m=0;m<c;m++)d[m]=o[m];return d}return[]}function N(o,c){for(let d=1;d<arguments.length;d++){const m=arguments[d];if(u(m)){const b=o.length||0,R=m.length||0;o.length=b+R;for(let O=0;O<R;O++)o[b+O]=m[O]}else o.push(m)}}class W{constructor(c,d){this.i=c,this.j=d,this.h=0,this.g=null}get(){let c;return 0<this.h?(this.h--,c=this.g,this.g=c.next,c.next=null):c=this.i(),c}}function z(o){return/^[\s\xa0]*$/.test(o)}function B(){var o=l.navigator;return o&&(o=o.userAgent)?o:""}function j(o){return j[" "](o),o}j[" "]=function(){};var le=B().indexOf("Gecko")!=-1&&!(B().toLowerCase().indexOf("webkit")!=-1&&B().indexOf("Edge")==-1)&&!(B().indexOf("Trident")!=-1||B().indexOf("MSIE")!=-1)&&B().indexOf("Edge")==-1;function q(o,c,d){for(const m in o)c.call(d,o[m],m,o)}function E(o,c){for(const d in o)c.call(void 0,o[d],d,o)}function g(o){const c={};for(const d in o)c[d]=o[d];return c}const y="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function w(o,c){let d,m;for(let b=1;b<arguments.length;b++){m=arguments[b];for(d in m)o[d]=m[d];for(let R=0;R<y.length;R++)d=y[R],Object.prototype.hasOwnProperty.call(m,d)&&(o[d]=m[d])}}function T(o){var c=1;o=o.split(":");const d=[];for(;0<c&&o.length;)d.push(o.shift()),c--;return o.length&&d.push(o.join(":")),d}function I(o){l.setTimeout(()=>{throw o},0)}function v(){var o=ee;let c=null;return o.g&&(c=o.g,o.g=o.g.next,o.g||(o.h=null),c.next=null),c}class De{constructor(){this.h=this.g=null}add(c,d){const m=ft.get();m.set(c,d),this.h?this.h.next=m:this.g=m,this.h=m}}var ft=new W(()=>new D,o=>o.reset());class D{constructor(){this.next=this.g=this.h=null}set(c,d){this.h=c,this.g=d,this.next=null}reset(){this.next=this.g=this.h=null}}let L,F=!1,ee=new De,me=()=>{const o=l.Promise.resolve(void 0);L=()=>{o.then(it)}};var it=()=>{for(var o;o=v();){try{o.h.call(o.g)}catch(d){I(d)}var c=ft;c.j(o),100>c.h&&(c.h++,o.next=c.g,c.g=o)}F=!1};function he(){this.s=this.s,this.C=this.C}he.prototype.s=!1,he.prototype.ma=function(){this.s||(this.s=!0,this.N())},he.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function oe(o,c){this.type=o,this.g=this.target=c,this.defaultPrevented=!1}oe.prototype.h=function(){this.defaultPrevented=!0};var vt=function(){if(!l.addEventListener||!Object.defineProperty)return!1;var o=!1,c=Object.defineProperty({},"passive",{get:function(){o=!0}});try{const d=()=>{};l.addEventListener("test",d,c),l.removeEventListener("test",d,c)}catch{}return o}();function Ht(o,c){if(oe.call(this,o?o.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,o){var d=this.type=o.type,m=o.changedTouches&&o.changedTouches.length?o.changedTouches[0]:null;if(this.target=o.target||o.srcElement,this.g=c,c=o.relatedTarget){if(le){e:{try{j(c.nodeName);var b=!0;break e}catch{}b=!1}b||(c=null)}}else d=="mouseover"?c=o.fromElement:d=="mouseout"&&(c=o.toElement);this.relatedTarget=c,m?(this.clientX=m.clientX!==void 0?m.clientX:m.pageX,this.clientY=m.clientY!==void 0?m.clientY:m.pageY,this.screenX=m.screenX||0,this.screenY=m.screenY||0):(this.clientX=o.clientX!==void 0?o.clientX:o.pageX,this.clientY=o.clientY!==void 0?o.clientY:o.pageY,this.screenX=o.screenX||0,this.screenY=o.screenY||0),this.button=o.button,this.key=o.key||"",this.ctrlKey=o.ctrlKey,this.altKey=o.altKey,this.shiftKey=o.shiftKey,this.metaKey=o.metaKey,this.pointerId=o.pointerId||0,this.pointerType=typeof o.pointerType=="string"?o.pointerType:as[o.pointerType]||"",this.state=o.state,this.i=o,o.defaultPrevented&&Ht.aa.h.call(this)}}k(Ht,oe);var as={2:"touch",3:"pen",4:"mouse"};Ht.prototype.h=function(){Ht.aa.h.call(this);var o=this.i;o.preventDefault?o.preventDefault():o.returnValue=!1};var Qe="closure_listenable_"+(1e6*Math.random()|0),Bn=0;function pi(o,c,d,m,b){this.listener=o,this.proxy=null,this.src=c,this.type=d,this.capture=!!m,this.ha=b,this.key=++Bn,this.da=this.fa=!1}function qn(o){o.da=!0,o.listener=null,o.proxy=null,o.src=null,o.ha=null}function jn(o){this.src=o,this.g={},this.h=0}jn.prototype.add=function(o,c,d,m,b){var R=o.toString();o=this.g[R],o||(o=this.g[R]=[],this.h++);var O=ta(o,c,m,b);return-1<O?(c=o[O],d||(c.fa=!1)):(c=new pi(c,this.src,R,!!m,b),c.fa=d,o.push(c)),c};function on(o,c){var d=c.type;if(d in o.g){var m=o.g[d],b=Array.prototype.indexOf.call(m,c,void 0),R;(R=0<=b)&&Array.prototype.splice.call(m,b,1),R&&(qn(c),o.g[d].length==0&&(delete o.g[d],o.h--))}}function ta(o,c,d,m){for(var b=0;b<o.length;++b){var R=o[b];if(!R.da&&R.listener==c&&R.capture==!!d&&R.ha==m)return b}return-1}var na="closure_lm_"+(1e6*Math.random()|0),ra={};function Vc(o,c,d,m,b){if(Array.isArray(c)){for(var R=0;R<c.length;R++)Vc(o,c[R],d,m,b);return null}return d=Dc(d),o&&o[Qe]?o.K(c,d,h(m)?!!m.capture:!1,b):Rm(o,c,d,!1,m,b)}function Rm(o,c,d,m,b,R){if(!c)throw Error("Invalid event type");var O=h(b)?!!b.capture:!!b,ge=ia(o);if(ge||(o[na]=ge=new jn(o)),d=ge.add(c,d,m,O,R),d.proxy)return d;if(m=km(),d.proxy=m,m.src=o,m.listener=d,o.addEventListener)vt||(b=O),b===void 0&&(b=!1),o.addEventListener(c.toString(),m,b);else if(o.attachEvent)o.attachEvent(xc(c.toString()),m);else if(o.addListener&&o.removeListener)o.addListener(m);else throw Error("addEventListener and attachEvent are unavailable.");return d}function km(){function o(d){return c.call(o.src,o.listener,d)}const c=Pm;return o}function Nc(o,c,d,m,b){if(Array.isArray(c))for(var R=0;R<c.length;R++)Nc(o,c[R],d,m,b);else m=h(m)?!!m.capture:!!m,d=Dc(d),o&&o[Qe]?(o=o.i,c=String(c).toString(),c in o.g&&(R=o.g[c],d=ta(R,d,m,b),-1<d&&(qn(R[d]),Array.prototype.splice.call(R,d,1),R.length==0&&(delete o.g[c],o.h--)))):o&&(o=ia(o))&&(c=o.g[c.toString()],o=-1,c&&(o=ta(c,d,m,b)),(d=-1<o?c[o]:null)&&sa(d))}function sa(o){if(typeof o!="number"&&o&&!o.da){var c=o.src;if(c&&c[Qe])on(c.i,o);else{var d=o.type,m=o.proxy;c.removeEventListener?c.removeEventListener(d,m,o.capture):c.detachEvent?c.detachEvent(xc(d),m):c.addListener&&c.removeListener&&c.removeListener(m),(d=ia(c))?(on(d,o),d.h==0&&(d.src=null,c[na]=null)):qn(o)}}}function xc(o){return o in ra?ra[o]:ra[o]="on"+o}function Pm(o,c){if(o.da)o=!0;else{c=new Ht(c,this);var d=o.listener,m=o.ha||o.src;o.fa&&sa(o),o=d.call(m,c)}return o}function ia(o){return o=o[na],o instanceof jn?o:null}var oa="__closure_events_fn_"+(1e9*Math.random()>>>0);function Dc(o){return typeof o=="function"?o:(o[oa]||(o[oa]=function(c){return o.handleEvent(c)}),o[oa])}function Je(){he.call(this),this.i=new jn(this),this.M=this,this.F=null}k(Je,he),Je.prototype[Qe]=!0,Je.prototype.removeEventListener=function(o,c,d,m){Nc(this,o,c,d,m)};function ot(o,c){var d,m=o.F;if(m)for(d=[];m;m=m.F)d.push(m);if(o=o.M,m=c.type||c,typeof c=="string")c=new oe(c,o);else if(c instanceof oe)c.target=c.target||o;else{var b=c;c=new oe(m,o),w(c,b)}if(b=!0,d)for(var R=d.length-1;0<=R;R--){var O=c.g=d[R];b=mi(O,m,!0,c)&&b}if(O=c.g=o,b=mi(O,m,!0,c)&&b,b=mi(O,m,!1,c)&&b,d)for(R=0;R<d.length;R++)O=c.g=d[R],b=mi(O,m,!1,c)&&b}Je.prototype.N=function(){if(Je.aa.N.call(this),this.i){var o=this.i,c;for(c in o.g){for(var d=o.g[c],m=0;m<d.length;m++)qn(d[m]);delete o.g[c],o.h--}}this.F=null},Je.prototype.K=function(o,c,d,m){return this.i.add(String(o),c,!1,d,m)},Je.prototype.L=function(o,c,d,m){return this.i.add(String(o),c,!0,d,m)};function mi(o,c,d,m){if(c=o.i.g[String(c)],!c)return!0;c=c.concat();for(var b=!0,R=0;R<c.length;++R){var O=c[R];if(O&&!O.da&&O.capture==d){var ge=O.listener,ze=O.ha||O.src;O.fa&&on(o.i,O),b=ge.call(ze,m)!==!1&&b}}return b&&!m.defaultPrevented}function Oc(o,c,d){if(typeof o=="function")d&&(o=_(o,d));else if(o&&typeof o.handleEvent=="function")o=_(o.handleEvent,o);else throw Error("Invalid listener argument");return 2147483647<Number(c)?-1:l.setTimeout(o,c||0)}function Mc(o){o.g=Oc(()=>{o.g=null,o.i&&(o.i=!1,Mc(o))},o.l);const c=o.h;o.h=null,o.m.apply(null,c)}class Cm extends he{constructor(c,d){super(),this.m=c,this.l=d,this.h=null,this.i=!1,this.g=null}j(c){this.h=arguments,this.g?this.i=!0:Mc(this)}N(){super.N(),this.g&&(l.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function ls(o){he.call(this),this.h=o,this.g={}}k(ls,he);var Lc=[];function Fc(o){q(o.g,function(c,d){this.g.hasOwnProperty(d)&&sa(c)},o),o.g={}}ls.prototype.N=function(){ls.aa.N.call(this),Fc(this)},ls.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var aa=l.JSON.stringify,Vm=l.JSON.parse,Nm=class{stringify(o){return l.JSON.stringify(o,void 0)}parse(o){return l.JSON.parse(o,void 0)}};function la(){}la.prototype.h=null;function Uc(o){return o.h||(o.h=o.i())}function $c(){}var cs={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function ca(){oe.call(this,"d")}k(ca,oe);function ua(){oe.call(this,"c")}k(ua,oe);var zn={},Bc=null;function gi(){return Bc=Bc||new Je}zn.La="serverreachability";function qc(o){oe.call(this,zn.La,o)}k(qc,oe);function us(o){const c=gi();ot(c,new qc(c))}zn.STAT_EVENT="statevent";function jc(o,c){oe.call(this,zn.STAT_EVENT,o),this.stat=c}k(jc,oe);function at(o){const c=gi();ot(c,new jc(c,o))}zn.Ma="timingevent";function zc(o,c){oe.call(this,zn.Ma,o),this.size=c}k(zc,oe);function hs(o,c){if(typeof o!="function")throw Error("Fn must not be null and must be a function");return l.setTimeout(function(){o()},c)}function ds(){this.g=!0}ds.prototype.xa=function(){this.g=!1};function xm(o,c,d,m,b,R){o.info(function(){if(o.g)if(R)for(var O="",ge=R.split("&"),ze=0;ze<ge.length;ze++){var ae=ge[ze].split("=");if(1<ae.length){var Xe=ae[0];ae=ae[1];var Ye=Xe.split("_");O=2<=Ye.length&&Ye[1]=="type"?O+(Xe+"="+ae+"&"):O+(Xe+"=redacted&")}}else O=null;else O=R;return"XMLHTTP REQ ("+m+") [attempt "+b+"]: "+c+`
`+d+`
`+O})}function Dm(o,c,d,m,b,R,O){o.info(function(){return"XMLHTTP RESP ("+m+") [ attempt "+b+"]: "+c+`
`+d+`
`+R+" "+O})}function vr(o,c,d,m){o.info(function(){return"XMLHTTP TEXT ("+c+"): "+Mm(o,d)+(m?" "+m:"")})}function Om(o,c){o.info(function(){return"TIMEOUT: "+c})}ds.prototype.info=function(){};function Mm(o,c){if(!o.g)return c;if(!c)return null;try{var d=JSON.parse(c);if(d){for(o=0;o<d.length;o++)if(Array.isArray(d[o])){var m=d[o];if(!(2>m.length)){var b=m[1];if(Array.isArray(b)&&!(1>b.length)){var R=b[0];if(R!="noop"&&R!="stop"&&R!="close")for(var O=1;O<b.length;O++)b[O]=""}}}}return aa(d)}catch{return c}}var _i={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},Hc={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},ha;function yi(){}k(yi,la),yi.prototype.g=function(){return new XMLHttpRequest},yi.prototype.i=function(){return{}},ha=new yi;function an(o,c,d,m){this.j=o,this.i=c,this.l=d,this.R=m||1,this.U=new ls(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new Gc}function Gc(){this.i=null,this.g="",this.h=!1}var Wc={},da={};function fa(o,c,d){o.L=1,o.v=Ti(Gt(c)),o.m=d,o.P=!0,Kc(o,null)}function Kc(o,c){o.F=Date.now(),vi(o),o.A=Gt(o.v);var d=o.A,m=o.R;Array.isArray(m)||(m=[String(m)]),lu(d.i,"t",m),o.C=0,d=o.j.J,o.h=new Gc,o.g=Su(o.j,d?c:null,!o.m),0<o.O&&(o.M=new Cm(_(o.Y,o,o.g),o.O)),c=o.U,d=o.g,m=o.ca;var b="readystatechange";Array.isArray(b)||(b&&(Lc[0]=b.toString()),b=Lc);for(var R=0;R<b.length;R++){var O=Vc(d,b[R],m||c.handleEvent,!1,c.h||c);if(!O)break;c.g[O.key]=O}c=o.H?g(o.H):{},o.m?(o.u||(o.u="POST"),c["Content-Type"]="application/x-www-form-urlencoded",o.g.ea(o.A,o.u,o.m,c)):(o.u="GET",o.g.ea(o.A,o.u,null,c)),us(),xm(o.i,o.u,o.A,o.l,o.R,o.m)}an.prototype.ca=function(o){o=o.target;const c=this.M;c&&Wt(o)==3?c.j():this.Y(o)},an.prototype.Y=function(o){try{if(o==this.g)e:{const Ye=Wt(this.g);var c=this.g.Ba();const Tr=this.g.Z();if(!(3>Ye)&&(Ye!=3||this.g&&(this.h.h||this.g.oa()||mu(this.g)))){this.J||Ye!=4||c==7||(c==8||0>=Tr?us(3):us(2)),pa(this);var d=this.g.Z();this.X=d;t:if(Qc(this)){var m=mu(this.g);o="";var b=m.length,R=Wt(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){Hn(this),fs(this);var O="";break t}this.h.i=new l.TextDecoder}for(c=0;c<b;c++)this.h.h=!0,o+=this.h.i.decode(m[c],{stream:!(R&&c==b-1)});m.length=0,this.h.g+=o,this.C=0,O=this.h.g}else O=this.g.oa();if(this.o=d==200,Dm(this.i,this.u,this.A,this.l,this.R,Ye,d),this.o){if(this.T&&!this.K){t:{if(this.g){var ge,ze=this.g;if((ge=ze.g?ze.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!z(ge)){var ae=ge;break t}}ae=null}if(d=ae)vr(this.i,this.l,d,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,ma(this,d);else{this.o=!1,this.s=3,at(12),Hn(this),fs(this);break e}}if(this.P){d=!0;let Et;for(;!this.J&&this.C<O.length;)if(Et=Lm(this,O),Et==da){Ye==4&&(this.s=4,at(14),d=!1),vr(this.i,this.l,null,"[Incomplete Response]");break}else if(Et==Wc){this.s=4,at(15),vr(this.i,this.l,O,"[Invalid Chunk]"),d=!1;break}else vr(this.i,this.l,Et,null),ma(this,Et);if(Qc(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),Ye!=4||O.length!=0||this.h.h||(this.s=1,at(16),d=!1),this.o=this.o&&d,!d)vr(this.i,this.l,O,"[Invalid Chunked Response]"),Hn(this),fs(this);else if(0<O.length&&!this.W){this.W=!0;var Xe=this.j;Xe.g==this&&Xe.ba&&!Xe.M&&(Xe.j.info("Great, no buffering proxy detected. Bytes received: "+O.length),wa(Xe),Xe.M=!0,at(11))}}else vr(this.i,this.l,O,null),ma(this,O);Ye==4&&Hn(this),this.o&&!this.J&&(Ye==4?Tu(this.j,this):(this.o=!1,vi(this)))}else eg(this.g),d==400&&0<O.indexOf("Unknown SID")?(this.s=3,at(12)):(this.s=0,at(13)),Hn(this),fs(this)}}}catch{}finally{}};function Qc(o){return o.g?o.u=="GET"&&o.L!=2&&o.j.Ca:!1}function Lm(o,c){var d=o.C,m=c.indexOf(`
`,d);return m==-1?da:(d=Number(c.substring(d,m)),isNaN(d)?Wc:(m+=1,m+d>c.length?da:(c=c.slice(m,m+d),o.C=m+d,c)))}an.prototype.cancel=function(){this.J=!0,Hn(this)};function vi(o){o.S=Date.now()+o.I,Jc(o,o.I)}function Jc(o,c){if(o.B!=null)throw Error("WatchDog timer not null");o.B=hs(_(o.ba,o),c)}function pa(o){o.B&&(l.clearTimeout(o.B),o.B=null)}an.prototype.ba=function(){this.B=null;const o=Date.now();0<=o-this.S?(Om(this.i,this.A),this.L!=2&&(us(),at(17)),Hn(this),this.s=2,fs(this)):Jc(this,this.S-o)};function fs(o){o.j.G==0||o.J||Tu(o.j,o)}function Hn(o){pa(o);var c=o.M;c&&typeof c.ma=="function"&&c.ma(),o.M=null,Fc(o.U),o.g&&(c=o.g,o.g=null,c.abort(),c.ma())}function ma(o,c){try{var d=o.j;if(d.G!=0&&(d.g==o||ga(d.h,o))){if(!o.K&&ga(d.h,o)&&d.G==3){try{var m=d.Da.g.parse(c)}catch{m=null}if(Array.isArray(m)&&m.length==3){var b=m;if(b[0]==0){e:if(!d.u){if(d.g)if(d.g.F+3e3<o.F)ki(d),Si(d);else break e;Ea(d),at(18)}}else d.za=b[1],0<d.za-d.T&&37500>b[2]&&d.F&&d.v==0&&!d.C&&(d.C=hs(_(d.Za,d),6e3));if(1>=Zc(d.h)&&d.ca){try{d.ca()}catch{}d.ca=void 0}}else Wn(d,11)}else if((o.K||d.g==o)&&ki(d),!z(c))for(b=d.Da.g.parse(c),c=0;c<b.length;c++){let ae=b[c];if(d.T=ae[0],ae=ae[1],d.G==2)if(ae[0]=="c"){d.K=ae[1],d.ia=ae[2];const Xe=ae[3];Xe!=null&&(d.la=Xe,d.j.info("VER="+d.la));const Ye=ae[4];Ye!=null&&(d.Aa=Ye,d.j.info("SVER="+d.Aa));const Tr=ae[5];Tr!=null&&typeof Tr=="number"&&0<Tr&&(m=1.5*Tr,d.L=m,d.j.info("backChannelRequestTimeoutMs_="+m)),m=d;const Et=o.g;if(Et){const Ci=Et.g?Et.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Ci){var R=m.h;R.g||Ci.indexOf("spdy")==-1&&Ci.indexOf("quic")==-1&&Ci.indexOf("h2")==-1||(R.j=R.l,R.g=new Set,R.h&&(_a(R,R.h),R.h=null))}if(m.D){const Ta=Et.g?Et.g.getResponseHeader("X-HTTP-Session-Id"):null;Ta&&(m.ya=Ta,we(m.I,m.D,Ta))}}d.G=3,d.l&&d.l.ua(),d.ba&&(d.R=Date.now()-o.F,d.j.info("Handshake RTT: "+d.R+"ms")),m=d;var O=o;if(m.qa=Au(m,m.J?m.ia:null,m.W),O.K){eu(m.h,O);var ge=O,ze=m.L;ze&&(ge.I=ze),ge.B&&(pa(ge),vi(ge)),m.g=O}else Eu(m);0<d.i.length&&Ri(d)}else ae[0]!="stop"&&ae[0]!="close"||Wn(d,7);else d.G==3&&(ae[0]=="stop"||ae[0]=="close"?ae[0]=="stop"?Wn(d,7):va(d):ae[0]!="noop"&&d.l&&d.l.ta(ae),d.v=0)}}us(4)}catch{}}var Fm=class{constructor(o,c){this.g=o,this.map=c}};function Xc(o){this.l=o||10,l.PerformanceNavigationTiming?(o=l.performance.getEntriesByType("navigation"),o=0<o.length&&(o[0].nextHopProtocol=="hq"||o[0].nextHopProtocol=="h2")):o=!!(l.chrome&&l.chrome.loadTimes&&l.chrome.loadTimes()&&l.chrome.loadTimes().wasFetchedViaSpdy),this.j=o?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function Yc(o){return o.h?!0:o.g?o.g.size>=o.j:!1}function Zc(o){return o.h?1:o.g?o.g.size:0}function ga(o,c){return o.h?o.h==c:o.g?o.g.has(c):!1}function _a(o,c){o.g?o.g.add(c):o.h=c}function eu(o,c){o.h&&o.h==c?o.h=null:o.g&&o.g.has(c)&&o.g.delete(c)}Xc.prototype.cancel=function(){if(this.i=tu(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const o of this.g.values())o.cancel();this.g.clear()}};function tu(o){if(o.h!=null)return o.i.concat(o.h.D);if(o.g!=null&&o.g.size!==0){let c=o.i;for(const d of o.g.values())c=c.concat(d.D);return c}return V(o.i)}function Um(o){if(o.V&&typeof o.V=="function")return o.V();if(typeof Map<"u"&&o instanceof Map||typeof Set<"u"&&o instanceof Set)return Array.from(o.values());if(typeof o=="string")return o.split("");if(u(o)){for(var c=[],d=o.length,m=0;m<d;m++)c.push(o[m]);return c}c=[],d=0;for(m in o)c[d++]=o[m];return c}function $m(o){if(o.na&&typeof o.na=="function")return o.na();if(!o.V||typeof o.V!="function"){if(typeof Map<"u"&&o instanceof Map)return Array.from(o.keys());if(!(typeof Set<"u"&&o instanceof Set)){if(u(o)||typeof o=="string"){var c=[];o=o.length;for(var d=0;d<o;d++)c.push(d);return c}c=[],d=0;for(const m in o)c[d++]=m;return c}}}function nu(o,c){if(o.forEach&&typeof o.forEach=="function")o.forEach(c,void 0);else if(u(o)||typeof o=="string")Array.prototype.forEach.call(o,c,void 0);else for(var d=$m(o),m=Um(o),b=m.length,R=0;R<b;R++)c.call(void 0,m[R],d&&d[R],o)}var ru=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Bm(o,c){if(o){o=o.split("&");for(var d=0;d<o.length;d++){var m=o[d].indexOf("="),b=null;if(0<=m){var R=o[d].substring(0,m);b=o[d].substring(m+1)}else R=o[d];c(R,b?decodeURIComponent(b.replace(/\+/g," ")):"")}}}function Gn(o){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,o instanceof Gn){this.h=o.h,Ei(this,o.j),this.o=o.o,this.g=o.g,wi(this,o.s),this.l=o.l;var c=o.i,d=new gs;d.i=c.i,c.g&&(d.g=new Map(c.g),d.h=c.h),su(this,d),this.m=o.m}else o&&(c=String(o).match(ru))?(this.h=!1,Ei(this,c[1]||"",!0),this.o=ps(c[2]||""),this.g=ps(c[3]||"",!0),wi(this,c[4]),this.l=ps(c[5]||"",!0),su(this,c[6]||"",!0),this.m=ps(c[7]||"")):(this.h=!1,this.i=new gs(null,this.h))}Gn.prototype.toString=function(){var o=[],c=this.j;c&&o.push(ms(c,iu,!0),":");var d=this.g;return(d||c=="file")&&(o.push("//"),(c=this.o)&&o.push(ms(c,iu,!0),"@"),o.push(encodeURIComponent(String(d)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),d=this.s,d!=null&&o.push(":",String(d))),(d=this.l)&&(this.g&&d.charAt(0)!="/"&&o.push("/"),o.push(ms(d,d.charAt(0)=="/"?zm:jm,!0))),(d=this.i.toString())&&o.push("?",d),(d=this.m)&&o.push("#",ms(d,Gm)),o.join("")};function Gt(o){return new Gn(o)}function Ei(o,c,d){o.j=d?ps(c,!0):c,o.j&&(o.j=o.j.replace(/:$/,""))}function wi(o,c){if(c){if(c=Number(c),isNaN(c)||0>c)throw Error("Bad port number "+c);o.s=c}else o.s=null}function su(o,c,d){c instanceof gs?(o.i=c,Wm(o.i,o.h)):(d||(c=ms(c,Hm)),o.i=new gs(c,o.h))}function we(o,c,d){o.i.set(c,d)}function Ti(o){return we(o,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),o}function ps(o,c){return o?c?decodeURI(o.replace(/%25/g,"%2525")):decodeURIComponent(o):""}function ms(o,c,d){return typeof o=="string"?(o=encodeURI(o).replace(c,qm),d&&(o=o.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),o):null}function qm(o){return o=o.charCodeAt(0),"%"+(o>>4&15).toString(16)+(o&15).toString(16)}var iu=/[#\/\?@]/g,jm=/[#\?:]/g,zm=/[#\?]/g,Hm=/[#\?@]/g,Gm=/#/g;function gs(o,c){this.h=this.g=null,this.i=o||null,this.j=!!c}function ln(o){o.g||(o.g=new Map,o.h=0,o.i&&Bm(o.i,function(c,d){o.add(decodeURIComponent(c.replace(/\+/g," ")),d)}))}n=gs.prototype,n.add=function(o,c){ln(this),this.i=null,o=Er(this,o);var d=this.g.get(o);return d||this.g.set(o,d=[]),d.push(c),this.h+=1,this};function ou(o,c){ln(o),c=Er(o,c),o.g.has(c)&&(o.i=null,o.h-=o.g.get(c).length,o.g.delete(c))}function au(o,c){return ln(o),c=Er(o,c),o.g.has(c)}n.forEach=function(o,c){ln(this),this.g.forEach(function(d,m){d.forEach(function(b){o.call(c,b,m,this)},this)},this)},n.na=function(){ln(this);const o=Array.from(this.g.values()),c=Array.from(this.g.keys()),d=[];for(let m=0;m<c.length;m++){const b=o[m];for(let R=0;R<b.length;R++)d.push(c[m])}return d},n.V=function(o){ln(this);let c=[];if(typeof o=="string")au(this,o)&&(c=c.concat(this.g.get(Er(this,o))));else{o=Array.from(this.g.values());for(let d=0;d<o.length;d++)c=c.concat(o[d])}return c},n.set=function(o,c){return ln(this),this.i=null,o=Er(this,o),au(this,o)&&(this.h-=this.g.get(o).length),this.g.set(o,[c]),this.h+=1,this},n.get=function(o,c){return o?(o=this.V(o),0<o.length?String(o[0]):c):c};function lu(o,c,d){ou(o,c),0<d.length&&(o.i=null,o.g.set(Er(o,c),V(d)),o.h+=d.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const o=[],c=Array.from(this.g.keys());for(var d=0;d<c.length;d++){var m=c[d];const R=encodeURIComponent(String(m)),O=this.V(m);for(m=0;m<O.length;m++){var b=R;O[m]!==""&&(b+="="+encodeURIComponent(String(O[m]))),o.push(b)}}return this.i=o.join("&")};function Er(o,c){return c=String(c),o.j&&(c=c.toLowerCase()),c}function Wm(o,c){c&&!o.j&&(ln(o),o.i=null,o.g.forEach(function(d,m){var b=m.toLowerCase();m!=b&&(ou(this,m),lu(this,b,d))},o)),o.j=c}function Km(o,c){const d=new ds;if(l.Image){const m=new Image;m.onload=A(cn,d,"TestLoadImage: loaded",!0,c,m),m.onerror=A(cn,d,"TestLoadImage: error",!1,c,m),m.onabort=A(cn,d,"TestLoadImage: abort",!1,c,m),m.ontimeout=A(cn,d,"TestLoadImage: timeout",!1,c,m),l.setTimeout(function(){m.ontimeout&&m.ontimeout()},1e4),m.src=o}else c(!1)}function Qm(o,c){const d=new ds,m=new AbortController,b=setTimeout(()=>{m.abort(),cn(d,"TestPingServer: timeout",!1,c)},1e4);fetch(o,{signal:m.signal}).then(R=>{clearTimeout(b),R.ok?cn(d,"TestPingServer: ok",!0,c):cn(d,"TestPingServer: server error",!1,c)}).catch(()=>{clearTimeout(b),cn(d,"TestPingServer: error",!1,c)})}function cn(o,c,d,m,b){try{b&&(b.onload=null,b.onerror=null,b.onabort=null,b.ontimeout=null),m(d)}catch{}}function Jm(){this.g=new Nm}function Xm(o,c,d){const m=d||"";try{nu(o,function(b,R){let O=b;h(b)&&(O=aa(b)),c.push(m+R+"="+encodeURIComponent(O))})}catch(b){throw c.push(m+"type="+encodeURIComponent("_badmap")),b}}function Ii(o){this.l=o.Ub||null,this.j=o.eb||!1}k(Ii,la),Ii.prototype.g=function(){return new bi(this.l,this.j)},Ii.prototype.i=function(o){return function(){return o}}({});function bi(o,c){Je.call(this),this.D=o,this.o=c,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}k(bi,Je),n=bi.prototype,n.open=function(o,c){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=o,this.A=c,this.readyState=1,ys(this)},n.send=function(o){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const c={headers:this.u,method:this.B,credentials:this.m,cache:void 0};o&&(c.body=o),(this.D||l).fetch(new Request(this.A,c)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,_s(this)),this.readyState=0},n.Sa=function(o){if(this.g&&(this.l=o,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=o.headers,this.readyState=2,ys(this)),this.g&&(this.readyState=3,ys(this),this.g)))if(this.responseType==="arraybuffer")o.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof l.ReadableStream<"u"&&"body"in o){if(this.j=o.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;cu(this)}else o.text().then(this.Ra.bind(this),this.ga.bind(this))};function cu(o){o.j.read().then(o.Pa.bind(o)).catch(o.ga.bind(o))}n.Pa=function(o){if(this.g){if(this.o&&o.value)this.response.push(o.value);else if(!this.o){var c=o.value?o.value:new Uint8Array(0);(c=this.v.decode(c,{stream:!o.done}))&&(this.response=this.responseText+=c)}o.done?_s(this):ys(this),this.readyState==3&&cu(this)}},n.Ra=function(o){this.g&&(this.response=this.responseText=o,_s(this))},n.Qa=function(o){this.g&&(this.response=o,_s(this))},n.ga=function(){this.g&&_s(this)};function _s(o){o.readyState=4,o.l=null,o.j=null,o.v=null,ys(o)}n.setRequestHeader=function(o,c){this.u.append(o,c)},n.getResponseHeader=function(o){return this.h&&this.h.get(o.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const o=[],c=this.h.entries();for(var d=c.next();!d.done;)d=d.value,o.push(d[0]+": "+d[1]),d=c.next();return o.join(`\r
`)};function ys(o){o.onreadystatechange&&o.onreadystatechange.call(o)}Object.defineProperty(bi.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(o){this.m=o?"include":"same-origin"}});function uu(o){let c="";return q(o,function(d,m){c+=m,c+=":",c+=d,c+=`\r
`}),c}function ya(o,c,d){e:{for(m in d){var m=!1;break e}m=!0}m||(d=uu(d),typeof o=="string"?d!=null&&encodeURIComponent(String(d)):we(o,c,d))}function Ce(o){Je.call(this),this.headers=new Map,this.o=o||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}k(Ce,Je);var Ym=/^https?$/i,Zm=["POST","PUT"];n=Ce.prototype,n.Ha=function(o){this.J=o},n.ea=function(o,c,d,m){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+o);c=c?c.toUpperCase():"GET",this.D=o,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():ha.g(),this.v=this.o?Uc(this.o):Uc(ha),this.g.onreadystatechange=_(this.Ea,this);try{this.B=!0,this.g.open(c,String(o),!0),this.B=!1}catch(R){hu(this,R);return}if(o=d||"",d=new Map(this.headers),m)if(Object.getPrototypeOf(m)===Object.prototype)for(var b in m)d.set(b,m[b]);else if(typeof m.keys=="function"&&typeof m.get=="function")for(const R of m.keys())d.set(R,m.get(R));else throw Error("Unknown input type for opt_headers: "+String(m));m=Array.from(d.keys()).find(R=>R.toLowerCase()=="content-type"),b=l.FormData&&o instanceof l.FormData,!(0<=Array.prototype.indexOf.call(Zm,c,void 0))||m||b||d.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[R,O]of d)this.g.setRequestHeader(R,O);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{pu(this),this.u=!0,this.g.send(o),this.u=!1}catch(R){hu(this,R)}};function hu(o,c){o.h=!1,o.g&&(o.j=!0,o.g.abort(),o.j=!1),o.l=c,o.m=5,du(o),Ai(o)}function du(o){o.A||(o.A=!0,ot(o,"complete"),ot(o,"error"))}n.abort=function(o){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=o||7,ot(this,"complete"),ot(this,"abort"),Ai(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Ai(this,!0)),Ce.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?fu(this):this.bb())},n.bb=function(){fu(this)};function fu(o){if(o.h&&typeof a<"u"&&(!o.v[1]||Wt(o)!=4||o.Z()!=2)){if(o.u&&Wt(o)==4)Oc(o.Ea,0,o);else if(ot(o,"readystatechange"),Wt(o)==4){o.h=!1;try{const O=o.Z();e:switch(O){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var c=!0;break e;default:c=!1}var d;if(!(d=c)){var m;if(m=O===0){var b=String(o.D).match(ru)[1]||null;!b&&l.self&&l.self.location&&(b=l.self.location.protocol.slice(0,-1)),m=!Ym.test(b?b.toLowerCase():"")}d=m}if(d)ot(o,"complete"),ot(o,"success");else{o.m=6;try{var R=2<Wt(o)?o.g.statusText:""}catch{R=""}o.l=R+" ["+o.Z()+"]",du(o)}}finally{Ai(o)}}}}function Ai(o,c){if(o.g){pu(o);const d=o.g,m=o.v[0]?()=>{}:null;o.g=null,o.v=null,c||ot(o,"ready");try{d.onreadystatechange=m}catch{}}}function pu(o){o.I&&(l.clearTimeout(o.I),o.I=null)}n.isActive=function(){return!!this.g};function Wt(o){return o.g?o.g.readyState:0}n.Z=function(){try{return 2<Wt(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(o){if(this.g){var c=this.g.responseText;return o&&c.indexOf(o)==0&&(c=c.substring(o.length)),Vm(c)}};function mu(o){try{if(!o.g)return null;if("response"in o.g)return o.g.response;switch(o.H){case"":case"text":return o.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in o.g)return o.g.mozResponseArrayBuffer}return null}catch{return null}}function eg(o){const c={};o=(o.g&&2<=Wt(o)&&o.g.getAllResponseHeaders()||"").split(`\r
`);for(let m=0;m<o.length;m++){if(z(o[m]))continue;var d=T(o[m]);const b=d[0];if(d=d[1],typeof d!="string")continue;d=d.trim();const R=c[b]||[];c[b]=R,R.push(d)}E(c,function(m){return m.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function vs(o,c,d){return d&&d.internalChannelParams&&d.internalChannelParams[o]||c}function gu(o){this.Aa=0,this.i=[],this.j=new ds,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=vs("failFast",!1,o),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=vs("baseRetryDelayMs",5e3,o),this.cb=vs("retryDelaySeedMs",1e4,o),this.Wa=vs("forwardChannelMaxRetries",2,o),this.wa=vs("forwardChannelRequestTimeoutMs",2e4,o),this.pa=o&&o.xmlHttpFactory||void 0,this.Xa=o&&o.Tb||void 0,this.Ca=o&&o.useFetchStreams||!1,this.L=void 0,this.J=o&&o.supportsCrossDomainXhr||!1,this.K="",this.h=new Xc(o&&o.concurrentRequestLimit),this.Da=new Jm,this.P=o&&o.fastHandshake||!1,this.O=o&&o.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=o&&o.Rb||!1,o&&o.xa&&this.j.xa(),o&&o.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&o&&o.detectBufferingProxy||!1,this.ja=void 0,o&&o.longPollingTimeout&&0<o.longPollingTimeout&&(this.ja=o.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=gu.prototype,n.la=8,n.G=1,n.connect=function(o,c,d,m){at(0),this.W=o,this.H=c||{},d&&m!==void 0&&(this.H.OSID=d,this.H.OAID=m),this.F=this.X,this.I=Au(this,null,this.W),Ri(this)};function va(o){if(_u(o),o.G==3){var c=o.U++,d=Gt(o.I);if(we(d,"SID",o.K),we(d,"RID",c),we(d,"TYPE","terminate"),Es(o,d),c=new an(o,o.j,c),c.L=2,c.v=Ti(Gt(d)),d=!1,l.navigator&&l.navigator.sendBeacon)try{d=l.navigator.sendBeacon(c.v.toString(),"")}catch{}!d&&l.Image&&(new Image().src=c.v,d=!0),d||(c.g=Su(c.j,null),c.g.ea(c.v)),c.F=Date.now(),vi(c)}bu(o)}function Si(o){o.g&&(wa(o),o.g.cancel(),o.g=null)}function _u(o){Si(o),o.u&&(l.clearTimeout(o.u),o.u=null),ki(o),o.h.cancel(),o.s&&(typeof o.s=="number"&&l.clearTimeout(o.s),o.s=null)}function Ri(o){if(!Yc(o.h)&&!o.s){o.s=!0;var c=o.Ga;L||me(),F||(L(),F=!0),ee.add(c,o),o.B=0}}function tg(o,c){return Zc(o.h)>=o.h.j-(o.s?1:0)?!1:o.s?(o.i=c.D.concat(o.i),!0):o.G==1||o.G==2||o.B>=(o.Va?0:o.Wa)?!1:(o.s=hs(_(o.Ga,o,c),Iu(o,o.B)),o.B++,!0)}n.Ga=function(o){if(this.s)if(this.s=null,this.G==1){if(!o){this.U=Math.floor(1e5*Math.random()),o=this.U++;const b=new an(this,this.j,o);let R=this.o;if(this.S&&(R?(R=g(R),w(R,this.S)):R=this.S),this.m!==null||this.O||(b.H=R,R=null),this.P)e:{for(var c=0,d=0;d<this.i.length;d++){t:{var m=this.i[d];if("__data__"in m.map&&(m=m.map.__data__,typeof m=="string")){m=m.length;break t}m=void 0}if(m===void 0)break;if(c+=m,4096<c){c=d;break e}if(c===4096||d===this.i.length-1){c=d+1;break e}}c=1e3}else c=1e3;c=vu(this,b,c),d=Gt(this.I),we(d,"RID",o),we(d,"CVER",22),this.D&&we(d,"X-HTTP-Session-Id",this.D),Es(this,d),R&&(this.O?c="headers="+encodeURIComponent(String(uu(R)))+"&"+c:this.m&&ya(d,this.m,R)),_a(this.h,b),this.Ua&&we(d,"TYPE","init"),this.P?(we(d,"$req",c),we(d,"SID","null"),b.T=!0,fa(b,d,null)):fa(b,d,c),this.G=2}}else this.G==3&&(o?yu(this,o):this.i.length==0||Yc(this.h)||yu(this))};function yu(o,c){var d;c?d=c.l:d=o.U++;const m=Gt(o.I);we(m,"SID",o.K),we(m,"RID",d),we(m,"AID",o.T),Es(o,m),o.m&&o.o&&ya(m,o.m,o.o),d=new an(o,o.j,d,o.B+1),o.m===null&&(d.H=o.o),c&&(o.i=c.D.concat(o.i)),c=vu(o,d,1e3),d.I=Math.round(.5*o.wa)+Math.round(.5*o.wa*Math.random()),_a(o.h,d),fa(d,m,c)}function Es(o,c){o.H&&q(o.H,function(d,m){we(c,m,d)}),o.l&&nu({},function(d,m){we(c,m,d)})}function vu(o,c,d){d=Math.min(o.i.length,d);var m=o.l?_(o.l.Na,o.l,o):null;e:{var b=o.i;let R=-1;for(;;){const O=["count="+d];R==-1?0<d?(R=b[0].g,O.push("ofs="+R)):R=0:O.push("ofs="+R);let ge=!0;for(let ze=0;ze<d;ze++){let ae=b[ze].g;const Xe=b[ze].map;if(ae-=R,0>ae)R=Math.max(0,b[ze].g-100),ge=!1;else try{Xm(Xe,O,"req"+ae+"_")}catch{m&&m(Xe)}}if(ge){m=O.join("&");break e}}}return o=o.i.splice(0,d),c.D=o,m}function Eu(o){if(!o.g&&!o.u){o.Y=1;var c=o.Fa;L||me(),F||(L(),F=!0),ee.add(c,o),o.v=0}}function Ea(o){return o.g||o.u||3<=o.v?!1:(o.Y++,o.u=hs(_(o.Fa,o),Iu(o,o.v)),o.v++,!0)}n.Fa=function(){if(this.u=null,wu(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var o=2*this.R;this.j.info("BP detection timer enabled: "+o),this.A=hs(_(this.ab,this),o)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,at(10),Si(this),wu(this))};function wa(o){o.A!=null&&(l.clearTimeout(o.A),o.A=null)}function wu(o){o.g=new an(o,o.j,"rpc",o.Y),o.m===null&&(o.g.H=o.o),o.g.O=0;var c=Gt(o.qa);we(c,"RID","rpc"),we(c,"SID",o.K),we(c,"AID",o.T),we(c,"CI",o.F?"0":"1"),!o.F&&o.ja&&we(c,"TO",o.ja),we(c,"TYPE","xmlhttp"),Es(o,c),o.m&&o.o&&ya(c,o.m,o.o),o.L&&(o.g.I=o.L);var d=o.g;o=o.ia,d.L=1,d.v=Ti(Gt(c)),d.m=null,d.P=!0,Kc(d,o)}n.Za=function(){this.C!=null&&(this.C=null,Si(this),Ea(this),at(19))};function ki(o){o.C!=null&&(l.clearTimeout(o.C),o.C=null)}function Tu(o,c){var d=null;if(o.g==c){ki(o),wa(o),o.g=null;var m=2}else if(ga(o.h,c))d=c.D,eu(o.h,c),m=1;else return;if(o.G!=0){if(c.o)if(m==1){d=c.m?c.m.length:0,c=Date.now()-c.F;var b=o.B;m=gi(),ot(m,new zc(m,d)),Ri(o)}else Eu(o);else if(b=c.s,b==3||b==0&&0<c.X||!(m==1&&tg(o,c)||m==2&&Ea(o)))switch(d&&0<d.length&&(c=o.h,c.i=c.i.concat(d)),b){case 1:Wn(o,5);break;case 4:Wn(o,10);break;case 3:Wn(o,6);break;default:Wn(o,2)}}}function Iu(o,c){let d=o.Ta+Math.floor(Math.random()*o.cb);return o.isActive()||(d*=2),d*c}function Wn(o,c){if(o.j.info("Error code "+c),c==2){var d=_(o.fb,o),m=o.Xa;const b=!m;m=new Gn(m||"//www.google.com/images/cleardot.gif"),l.location&&l.location.protocol=="http"||Ei(m,"https"),Ti(m),b?Km(m.toString(),d):Qm(m.toString(),d)}else at(2);o.G=0,o.l&&o.l.sa(c),bu(o),_u(o)}n.fb=function(o){o?(this.j.info("Successfully pinged google.com"),at(2)):(this.j.info("Failed to ping google.com"),at(1))};function bu(o){if(o.G=0,o.ka=[],o.l){const c=tu(o.h);(c.length!=0||o.i.length!=0)&&(N(o.ka,c),N(o.ka,o.i),o.h.i.length=0,V(o.i),o.i.length=0),o.l.ra()}}function Au(o,c,d){var m=d instanceof Gn?Gt(d):new Gn(d);if(m.g!="")c&&(m.g=c+"."+m.g),wi(m,m.s);else{var b=l.location;m=b.protocol,c=c?c+"."+b.hostname:b.hostname,b=+b.port;var R=new Gn(null);m&&Ei(R,m),c&&(R.g=c),b&&wi(R,b),d&&(R.l=d),m=R}return d=o.D,c=o.ya,d&&c&&we(m,d,c),we(m,"VER",o.la),Es(o,m),m}function Su(o,c,d){if(c&&!o.J)throw Error("Can't create secondary domain capable XhrIo object.");return c=o.Ca&&!o.pa?new Ce(new Ii({eb:d})):new Ce(o.pa),c.Ha(o.J),c}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function Ru(){}n=Ru.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function Pi(){}Pi.prototype.g=function(o,c){return new pt(o,c)};function pt(o,c){Je.call(this),this.g=new gu(c),this.l=o,this.h=c&&c.messageUrlParams||null,o=c&&c.messageHeaders||null,c&&c.clientProtocolHeaderRequired&&(o?o["X-Client-Protocol"]="webchannel":o={"X-Client-Protocol":"webchannel"}),this.g.o=o,o=c&&c.initMessageHeaders||null,c&&c.messageContentType&&(o?o["X-WebChannel-Content-Type"]=c.messageContentType:o={"X-WebChannel-Content-Type":c.messageContentType}),c&&c.va&&(o?o["X-WebChannel-Client-Profile"]=c.va:o={"X-WebChannel-Client-Profile":c.va}),this.g.S=o,(o=c&&c.Sb)&&!z(o)&&(this.g.m=o),this.v=c&&c.supportsCrossDomainXhr||!1,this.u=c&&c.sendRawJson||!1,(c=c&&c.httpSessionIdParam)&&!z(c)&&(this.g.D=c,o=this.h,o!==null&&c in o&&(o=this.h,c in o&&delete o[c])),this.j=new wr(this)}k(pt,Je),pt.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},pt.prototype.close=function(){va(this.g)},pt.prototype.o=function(o){var c=this.g;if(typeof o=="string"){var d={};d.__data__=o,o=d}else this.u&&(d={},d.__data__=aa(o),o=d);c.i.push(new Fm(c.Ya++,o)),c.G==3&&Ri(c)},pt.prototype.N=function(){this.g.l=null,delete this.j,va(this.g),delete this.g,pt.aa.N.call(this)};function ku(o){ca.call(this),o.__headers__&&(this.headers=o.__headers__,this.statusCode=o.__status__,delete o.__headers__,delete o.__status__);var c=o.__sm__;if(c){e:{for(const d in c){o=d;break e}o=void 0}(this.i=o)&&(o=this.i,c=c!==null&&o in c?c[o]:void 0),this.data=c}else this.data=o}k(ku,ca);function Pu(){ua.call(this),this.status=1}k(Pu,ua);function wr(o){this.g=o}k(wr,Ru),wr.prototype.ua=function(){ot(this.g,"a")},wr.prototype.ta=function(o){ot(this.g,new ku(o))},wr.prototype.sa=function(o){ot(this.g,new Pu)},wr.prototype.ra=function(){ot(this.g,"b")},Pi.prototype.createWebChannel=Pi.prototype.g,pt.prototype.send=pt.prototype.o,pt.prototype.open=pt.prototype.m,pt.prototype.close=pt.prototype.close,nf=function(){return new Pi},tf=function(){return gi()},ef=zn,il={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},_i.NO_ERROR=0,_i.TIMEOUT=8,_i.HTTP_ERROR=6,Hi=_i,Hc.COMPLETE="complete",Zd=Hc,$c.EventType=cs,cs.OPEN="a",cs.CLOSE="b",cs.ERROR="c",cs.MESSAGE="d",Je.prototype.listen=Je.prototype.K,Rs=$c,Ce.prototype.listenOnce=Ce.prototype.L,Ce.prototype.getLastError=Ce.prototype.Ka,Ce.prototype.getLastErrorCode=Ce.prototype.Ba,Ce.prototype.getStatus=Ce.prototype.Z,Ce.prototype.getResponseJson=Ce.prototype.Oa,Ce.prototype.getResponseText=Ce.prototype.oa,Ce.prototype.send=Ce.prototype.ea,Ce.prototype.setWithCredentials=Ce.prototype.Ha,Yd=Ce}).apply(typeof Oi<"u"?Oi:typeof self<"u"?self:typeof window<"u"?window:{});const Xu="@firebase/firestore",Yu="4.8.0";/**
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
 */class tt{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}tt.UNAUTHENTICATED=new tt(null),tt.GOOGLE_CREDENTIALS=new tt("google-credentials-uid"),tt.FIRST_PARTY=new tt("first-party-uid"),tt.MOCK_USER=new tt("mock-user");/**
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
 */let ts="11.10.0";/**
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
 */const dr=new Ul("@firebase/firestore");function Rr(){return dr.logLevel}function $(n,...e){if(dr.logLevel<=ne.DEBUG){const t=e.map(ql);dr.debug(`Firestore (${ts}): ${n}`,...t)}}function en(n,...e){if(dr.logLevel<=ne.ERROR){const t=e.map(ql);dr.error(`Firestore (${ts}): ${n}`,...t)}}function Vn(n,...e){if(dr.logLevel<=ne.WARN){const t=e.map(ql);dr.warn(`Firestore (${ts}): ${n}`,...t)}}function ql(n){if(typeof n=="string")return n;try{/**
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
 */function J(n,e,t){let r="Unexpected state";typeof e=="string"?r=e:t=e,rf(n,r,t)}function rf(n,e,t){let r=`FIRESTORE (${ts}) INTERNAL ASSERTION FAILED: ${e} (ID: ${n.toString(16)})`;if(t!==void 0)try{r+=" CONTEXT: "+JSON.stringify(t)}catch{r+=" CONTEXT: "+t}throw en(r),new Error(r)}function fe(n,e,t,r){let s="Unexpected state";typeof t=="string"?s=t:r=t,n||rf(e,s,r)}function Z(n,e){return n}/**
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
 */const P={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class U extends sn{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
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
 */class In{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
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
 */class sf{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class M0{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(tt.UNAUTHENTICATED))}shutdown(){}}class L0{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class F0{constructor(e){this.t=e,this.currentUser=tt.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){fe(this.o===void 0,42304);let r=this.i;const s=u=>this.i!==r?(r=this.i,t(u)):Promise.resolve();let i=new In;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new In,e.enqueueRetryable(()=>s(this.currentUser))};const a=()=>{const u=i;e.enqueueRetryable(async()=>{await u.promise,await s(this.currentUser)})},l=u=>{$("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit(u=>l(u)),setTimeout(()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?l(u):($("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new In)}},0),a()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(r=>this.i!==e?($("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(fe(typeof r.accessToken=="string",31837,{l:r}),new sf(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return fe(e===null||typeof e=="string",2055,{h:e}),new tt(e)}}class U0{constructor(e,t,r){this.P=e,this.T=t,this.I=r,this.type="FirstParty",this.user=tt.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const e=this.R();return e&&this.A.set("Authorization",e),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class $0{constructor(e,t,r){this.P=e,this.T=t,this.I=r}getToken(){return Promise.resolve(new U0(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable(()=>t(tt.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class Zu{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class B0{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,bt(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){fe(this.o===void 0,3512);const r=i=>{i.error!=null&&$("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const a=i.token!==this.m;return this.m=i.token,$("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?t(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable(()=>r(i))};const s=i=>{$("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(i=>s(i)),setTimeout(()=>{if(!this.appCheck){const i=this.V.getImmediate({optional:!0});i?s(i):$("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new Zu(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(fe(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new Zu(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
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
 */function q0(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
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
 */function of(){return new TextEncoder}/**
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
 */class jl{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const s=q0(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<t&&(r+=e.charAt(s[i]%62))}return r}}function te(n,e){return n<e?-1:n>e?1:0}function ol(n,e){let t=0;for(;t<n.length&&t<e.length;){const r=n.codePointAt(t),s=e.codePointAt(t);if(r!==s){if(r<128&&s<128)return te(r,s);{const i=of(),a=j0(i.encode(eh(n,t)),i.encode(eh(e,t)));return a!==0?a:te(r,s)}}t+=r>65535?2:1}return te(n.length,e.length)}function eh(n,e){return n.codePointAt(e)>65535?n.substring(e,e+2):n.substring(e,e+1)}function j0(n,e){for(let t=0;t<n.length&&t<e.length;++t)if(n[t]!==e[t])return te(n[t],e[t]);return te(n.length,e.length)}function zr(n,e,t){return n.length===e.length&&n.every((r,s)=>t(r,e[s]))}/**
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
 */const th="__name__";class Nt{constructor(e,t,r){t===void 0?t=0:t>e.length&&J(637,{offset:t,range:e.length}),r===void 0?r=e.length-t:r>e.length-t&&J(1746,{length:r,range:e.length-t}),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return Nt.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof Nt?e.forEach(r=>{t.push(r)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let s=0;s<r;s++){const i=Nt.compareSegments(e.get(s),t.get(s));if(i!==0)return i}return te(e.length,t.length)}static compareSegments(e,t){const r=Nt.isNumericId(e),s=Nt.isNumericId(t);return r&&!s?-1:!r&&s?1:r&&s?Nt.extractNumericId(e).compare(Nt.extractNumericId(t)):ol(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return Tn.fromString(e.substring(4,e.length-2))}}class Ee extends Nt{construct(e,t,r){return new Ee(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new U(P.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter(s=>s.length>0))}return new Ee(t)}static emptyPath(){return new Ee([])}}const z0=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Ge extends Nt{construct(e,t,r){return new Ge(e,t,r)}static isValidIdentifier(e){return z0.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Ge.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===th}static keyField(){return new Ge([th])}static fromServerFormat(e){const t=[];let r="",s=0;const i=()=>{if(r.length===0)throw new U(P.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let a=!1;for(;s<e.length;){const l=e[s];if(l==="\\"){if(s+1===e.length)throw new U(P.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const u=e[s+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new U(P.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=u,s+=2}else l==="`"?(a=!a,s++):l!=="."||a?(r+=l,s++):(i(),s++)}if(i(),a)throw new U(P.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new Ge(t)}static emptyPath(){return new Ge([])}}/**
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
 */class H{constructor(e){this.path=e}static fromPath(e){return new H(Ee.fromString(e))}static fromName(e){return new H(Ee.fromString(e).popFirst(5))}static empty(){return new H(Ee.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&Ee.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return Ee.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new H(new Ee(e.slice()))}}/**
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
 */function af(n,e,t){if(!t)throw new U(P.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function H0(n,e,t,r){if(e===!0&&r===!0)throw new U(P.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function nh(n){if(!H.isDocumentKey(n))throw new U(P.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function rh(n){if(H.isDocumentKey(n))throw new U(P.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function lf(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function No(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":J(12329,{type:typeof n})}function St(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new U(P.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=No(n);throw new U(P.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}/**
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
 */function Le(n,e){const t={typeString:n};return e&&(t.value=e),t}function ii(n,e){if(!lf(n))throw new U(P.INVALID_ARGUMENT,"JSON must be an object");let t;for(const r in e)if(e[r]){const s=e[r].typeString,i="value"in e[r]?{value:e[r].value}:void 0;if(!(r in n)){t=`JSON missing required field: '${r}'`;break}const a=n[r];if(s&&typeof a!==s){t=`JSON field '${r}' must be a ${s}.`;break}if(i!==void 0&&a!==i.value){t=`Expected '${r}' field to equal '${i.value}'`;break}}if(t)throw new U(P.INVALID_ARGUMENT,t);return!0}/**
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
 */const sh=-62135596800,ih=1e6;class be{static now(){return be.fromMillis(Date.now())}static fromDate(e){return be.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor((e-1e3*t)*ih);return new be(t,r)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new U(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new U(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<sh)throw new U(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new U(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/ih}_compareTo(e){return this.seconds===e.seconds?te(this.nanoseconds,e.nanoseconds):te(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:be._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(ii(e,be._jsonSchema))return new be(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-sh;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}be._jsonSchemaVersion="firestore/timestamp/1.0",be._jsonSchema={type:Le("string",be._jsonSchemaVersion),seconds:Le("number"),nanoseconds:Le("number")};/**
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
 */class Y{static fromTimestamp(e){return new Y(e)}static min(){return new Y(new be(0,0))}static max(){return new Y(new be(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
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
 */const zs=-1;function G0(n,e){const t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,s=Y.fromTimestamp(r===1e9?new be(t+1,0):new be(t,r));return new Nn(s,H.empty(),e)}function W0(n){return new Nn(n.readTime,n.key,zs)}class Nn{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new Nn(Y.min(),H.empty(),zs)}static max(){return new Nn(Y.max(),H.empty(),zs)}}function K0(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=H.comparator(n.documentKey,e.documentKey),t!==0?t:te(n.largestBatchId,e.largestBatchId))}/**
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
 */const Q0="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class J0{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
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
 */async function ns(n){if(n.code!==P.FAILED_PRECONDITION||n.message!==Q0)throw n;$("LocalStore","Unexpectedly lost primary lease")}/**
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
 */class C{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&J(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new C((r,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(r,s)},this.catchCallback=i=>{this.wrapFailure(t,i).next(r,s)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof C?t:C.resolve(t)}catch(t){return C.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):C.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):C.reject(t)}static resolve(e){return new C((t,r)=>{t(e)})}static reject(e){return new C((t,r)=>{r(e)})}static waitFor(e){return new C((t,r)=>{let s=0,i=0,a=!1;e.forEach(l=>{++s,l.next(()=>{++i,a&&i===s&&t()},u=>r(u))}),a=!0,i===s&&t()})}static or(e){let t=C.resolve(!1);for(const r of e)t=t.next(s=>s?C.resolve(s):r());return t}static forEach(e,t){const r=[];return e.forEach((s,i)=>{r.push(t.call(this,s,i))}),this.waitFor(r)}static mapArray(e,t){return new C((r,s)=>{const i=e.length,a=new Array(i);let l=0;for(let u=0;u<i;u++){const h=u;t(e[h]).next(f=>{a[h]=f,++l,l===i&&r(a)},f=>s(f))}})}static doWhile(e,t){return new C((r,s)=>{const i=()=>{e()===!0?t().next(()=>{i()},s):r()};i()})}}function X0(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function rs(n){return n.name==="IndexedDbTransactionError"}/**
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
 */class xo{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this._e(r),this.ae=r=>t.writeSequenceNumber(r))}_e(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ae&&this.ae(e),e}}xo.ue=-1;/**
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
 */const zl=-1;function Do(n){return n==null}function uo(n){return n===0&&1/n==-1/0}function Y0(n){return typeof n=="number"&&Number.isInteger(n)&&!uo(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
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
 */const cf="";function Z0(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=oh(e)),e=ey(n.get(t),e);return oh(e)}function ey(n,e){let t=e;const r=n.length;for(let s=0;s<r;s++){const i=n.charAt(s);switch(i){case"\0":t+="";break;case cf:t+="";break;default:t+=i}}return t}function oh(n){return n+cf+""}/**
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
 */function ah(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function Un(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function uf(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
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
 */class Pe{constructor(e,t){this.comparator=e,this.root=t||He.EMPTY}insert(e,t){return new Pe(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,He.BLACK,null,null))}remove(e){return new Pe(this.comparator,this.root.remove(e,this.comparator).copy(null,null,He.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(e,r.key);if(s===0)return t+r.left.size;s<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,r)=>(e(t,r),!1))}toString(){const e=[];return this.inorderTraversal((t,r)=>(e.push(`${t}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Mi(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Mi(this.root,e,this.comparator,!1)}getReverseIterator(){return new Mi(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Mi(this.root,e,this.comparator,!0)}}class Mi{constructor(e,t,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?r(e.key,t):1,t&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class He{constructor(e,t,r,s,i){this.key=e,this.value=t,this.color=r??He.RED,this.left=s??He.EMPTY,this.right=i??He.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,s,i){return new He(e??this.key,t??this.value,r??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let s=this;const i=r(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,t,r),null):i===0?s.copy(null,t,null,null,null):s.copy(null,null,null,null,s.right.insert(e,t,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return He.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,s=this;if(t(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),t(e,s.key)===0){if(s.right.isEmpty())return He.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,He.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,He.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw J(43730,{key:this.key,value:this.value});if(this.right.isRed())throw J(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw J(27949);return e+(this.isRed()?0:1)}}He.EMPTY=null,He.RED=!0,He.BLACK=!1;He.EMPTY=new class{constructor(){this.size=0}get key(){throw J(57766)}get value(){throw J(16141)}get color(){throw J(16727)}get left(){throw J(29726)}get right(){throw J(36894)}copy(e,t,r,s,i){return this}insert(e,t,r){return new He(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
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
 */class Ue{constructor(e){this.comparator=e,this.data=new Pe(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,r)=>(e(t),!1))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,e[1])>=0)return;t(s.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new lh(this.data.getIterator())}getIteratorFrom(e){return new lh(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(r=>{t=t.add(r)}),t}isEqual(e){if(!(e instanceof Ue)||this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new Ue(this.comparator);return t.data=e,t}}class lh{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
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
 */class mt{constructor(e){this.fields=e,e.sort(Ge.comparator)}static empty(){return new mt([])}unionWith(e){let t=new Ue(Ge.comparator);for(const r of this.fields)t=t.add(r);for(const r of e)t=t.add(r);return new mt(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return zr(this.fields,e.fields,(t,r)=>t.isEqual(r))}}/**
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
 */class hf extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
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
 */class Ke{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new hf("Invalid base64 string: "+i):i}}(e);return new Ke(t)}static fromUint8Array(e){const t=function(s){let i="";for(let a=0;a<s.length;++a)i+=String.fromCharCode(s[a]);return i}(e);return new Ke(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const r=new Uint8Array(t.length);for(let s=0;s<t.length;s++)r[s]=t.charCodeAt(s);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return te(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}Ke.EMPTY_BYTE_STRING=new Ke("");const ty=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function xn(n){if(fe(!!n,39018),typeof n=="string"){let e=0;const t=ty.exec(n);if(fe(!!t,46558,{timestamp:n}),t[1]){let s=t[1];s=(s+"000000000").substr(0,9),e=Number(s)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:xe(n.seconds),nanos:xe(n.nanos)}}function xe(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function Dn(n){return typeof n=="string"?Ke.fromBase64String(n):Ke.fromUint8Array(n)}/**
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
 */const df="server_timestamp",ff="__type__",pf="__previous_value__",mf="__local_write_time__";function Hl(n){var e,t;return((t=(((e=n==null?void 0:n.mapValue)===null||e===void 0?void 0:e.fields)||{})[ff])===null||t===void 0?void 0:t.stringValue)===df}function Oo(n){const e=n.mapValue.fields[pf];return Hl(e)?Oo(e):e}function Hs(n){const e=xn(n.mapValue.fields[mf].timestampValue);return new be(e.seconds,e.nanos)}/**
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
 */class ny{constructor(e,t,r,s,i,a,l,u,h,f){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=a,this.autoDetectLongPolling=l,this.longPollingOptions=u,this.useFetchStreams=h,this.isUsingEmulator=f}}const ho="(default)";class Gs{constructor(e,t){this.projectId=e,this.database=t||ho}static empty(){return new Gs("","")}get isDefaultDatabase(){return this.database===ho}isEqual(e){return e instanceof Gs&&e.projectId===this.projectId&&e.database===this.database}}/**
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
 */const gf="__type__",ry="__max__",Li={mapValue:{}},_f="__vector__",fo="value";function On(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?Hl(n)?4:iy(n)?9007199254740991:sy(n)?10:11:J(28295,{value:n})}function zt(n,e){if(n===e)return!0;const t=On(n);if(t!==On(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return Hs(n).isEqual(Hs(e));case 3:return function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const a=xn(s.timestampValue),l=xn(i.timestampValue);return a.seconds===l.seconds&&a.nanos===l.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(s,i){return Dn(s.bytesValue).isEqual(Dn(i.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(s,i){return xe(s.geoPointValue.latitude)===xe(i.geoPointValue.latitude)&&xe(s.geoPointValue.longitude)===xe(i.geoPointValue.longitude)}(n,e);case 2:return function(s,i){if("integerValue"in s&&"integerValue"in i)return xe(s.integerValue)===xe(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const a=xe(s.doubleValue),l=xe(i.doubleValue);return a===l?uo(a)===uo(l):isNaN(a)&&isNaN(l)}return!1}(n,e);case 9:return zr(n.arrayValue.values||[],e.arrayValue.values||[],zt);case 10:case 11:return function(s,i){const a=s.mapValue.fields||{},l=i.mapValue.fields||{};if(ah(a)!==ah(l))return!1;for(const u in a)if(a.hasOwnProperty(u)&&(l[u]===void 0||!zt(a[u],l[u])))return!1;return!0}(n,e);default:return J(52216,{left:n})}}function Ws(n,e){return(n.values||[]).find(t=>zt(t,e))!==void 0}function Hr(n,e){if(n===e)return 0;const t=On(n),r=On(e);if(t!==r)return te(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return te(n.booleanValue,e.booleanValue);case 2:return function(i,a){const l=xe(i.integerValue||i.doubleValue),u=xe(a.integerValue||a.doubleValue);return l<u?-1:l>u?1:l===u?0:isNaN(l)?isNaN(u)?0:-1:1}(n,e);case 3:return ch(n.timestampValue,e.timestampValue);case 4:return ch(Hs(n),Hs(e));case 5:return ol(n.stringValue,e.stringValue);case 6:return function(i,a){const l=Dn(i),u=Dn(a);return l.compareTo(u)}(n.bytesValue,e.bytesValue);case 7:return function(i,a){const l=i.split("/"),u=a.split("/");for(let h=0;h<l.length&&h<u.length;h++){const f=te(l[h],u[h]);if(f!==0)return f}return te(l.length,u.length)}(n.referenceValue,e.referenceValue);case 8:return function(i,a){const l=te(xe(i.latitude),xe(a.latitude));return l!==0?l:te(xe(i.longitude),xe(a.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return uh(n.arrayValue,e.arrayValue);case 10:return function(i,a){var l,u,h,f;const p=i.fields||{},_=a.fields||{},A=(l=p[fo])===null||l===void 0?void 0:l.arrayValue,k=(u=_[fo])===null||u===void 0?void 0:u.arrayValue,V=te(((h=A==null?void 0:A.values)===null||h===void 0?void 0:h.length)||0,((f=k==null?void 0:k.values)===null||f===void 0?void 0:f.length)||0);return V!==0?V:uh(A,k)}(n.mapValue,e.mapValue);case 11:return function(i,a){if(i===Li.mapValue&&a===Li.mapValue)return 0;if(i===Li.mapValue)return 1;if(a===Li.mapValue)return-1;const l=i.fields||{},u=Object.keys(l),h=a.fields||{},f=Object.keys(h);u.sort(),f.sort();for(let p=0;p<u.length&&p<f.length;++p){const _=ol(u[p],f[p]);if(_!==0)return _;const A=Hr(l[u[p]],h[f[p]]);if(A!==0)return A}return te(u.length,f.length)}(n.mapValue,e.mapValue);default:throw J(23264,{le:t})}}function ch(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return te(n,e);const t=xn(n),r=xn(e),s=te(t.seconds,r.seconds);return s!==0?s:te(t.nanos,r.nanos)}function uh(n,e){const t=n.values||[],r=e.values||[];for(let s=0;s<t.length&&s<r.length;++s){const i=Hr(t[s],r[s]);if(i)return i}return te(t.length,r.length)}function Gr(n){return al(n)}function al(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(t){const r=xn(t);return`time(${r.seconds},${r.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(t){return Dn(t).toBase64()}(n.bytesValue):"referenceValue"in n?function(t){return H.fromName(t).toString()}(n.referenceValue):"geoPointValue"in n?function(t){return`geo(${t.latitude},${t.longitude})`}(n.geoPointValue):"arrayValue"in n?function(t){let r="[",s=!0;for(const i of t.values||[])s?s=!1:r+=",",r+=al(i);return r+"]"}(n.arrayValue):"mapValue"in n?function(t){const r=Object.keys(t.fields||{}).sort();let s="{",i=!0;for(const a of r)i?i=!1:s+=",",s+=`${a}:${al(t.fields[a])}`;return s+"}"}(n.mapValue):J(61005,{value:n})}function Gi(n){switch(On(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=Oo(n);return e?16+Gi(e):16;case 5:return 2*n.stringValue.length;case 6:return Dn(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return function(r){return(r.values||[]).reduce((s,i)=>s+Gi(i),0)}(n.arrayValue);case 10:case 11:return function(r){let s=0;return Un(r.fields,(i,a)=>{s+=i.length+Gi(a)}),s}(n.mapValue);default:throw J(13486,{value:n})}}function hh(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function ll(n){return!!n&&"integerValue"in n}function Gl(n){return!!n&&"arrayValue"in n}function dh(n){return!!n&&"nullValue"in n}function fh(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function Wi(n){return!!n&&"mapValue"in n}function sy(n){var e,t;return((t=(((e=n==null?void 0:n.mapValue)===null||e===void 0?void 0:e.fields)||{})[gf])===null||t===void 0?void 0:t.stringValue)===_f}function xs(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){const e={mapValue:{fields:{}}};return Un(n.mapValue.fields,(t,r)=>e.mapValue.fields[t]=xs(r)),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=xs(n.arrayValue.values[t]);return e}return Object.assign({},n)}function iy(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===ry}/**
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
 */class dt{constructor(e){this.value=e}static empty(){return new dt({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!Wi(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=xs(t)}setAll(e){let t=Ge.emptyPath(),r={},s=[];e.forEach((a,l)=>{if(!t.isImmediateParentOf(l)){const u=this.getFieldsMap(t);this.applyChanges(u,r,s),r={},s=[],t=l.popLast()}a?r[l.lastSegment()]=xs(a):s.push(l.lastSegment())});const i=this.getFieldsMap(t);this.applyChanges(i,r,s)}delete(e){const t=this.field(e.popLast());Wi(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return zt(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let s=t.mapValue.fields[e.get(r)];Wi(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=s),t=s}return t.mapValue.fields}applyChanges(e,t,r){Un(t,(s,i)=>e[s]=i);for(const s of r)delete e[s]}clone(){return new dt(xs(this.value))}}function yf(n){const e=[];return Un(n.fields,(t,r)=>{const s=new Ge([t]);if(Wi(r)){const i=yf(r.mapValue).fields;if(i.length===0)e.push(s);else for(const a of i)e.push(s.child(a))}else e.push(s)}),new mt(e)}/**
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
 */class nt{constructor(e,t,r,s,i,a,l){this.key=e,this.documentType=t,this.version=r,this.readTime=s,this.createTime=i,this.data=a,this.documentState=l}static newInvalidDocument(e){return new nt(e,0,Y.min(),Y.min(),Y.min(),dt.empty(),0)}static newFoundDocument(e,t,r,s){return new nt(e,1,t,Y.min(),r,s,0)}static newNoDocument(e,t){return new nt(e,2,t,Y.min(),Y.min(),dt.empty(),0)}static newUnknownDocument(e,t){return new nt(e,3,t,Y.min(),Y.min(),dt.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(Y.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=dt.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=dt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=Y.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof nt&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new nt(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
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
 */class po{constructor(e,t){this.position=e,this.inclusive=t}}function ph(n,e,t){let r=0;for(let s=0;s<n.position.length;s++){const i=e[s],a=n.position[s];if(i.field.isKeyField()?r=H.comparator(H.fromName(a.referenceValue),t.key):r=Hr(a,t.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function mh(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!zt(n.position[t],e.position[t]))return!1;return!0}/**
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
 */class Ks{constructor(e,t="asc"){this.field=e,this.dir=t}}function oy(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
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
 */class vf{}class Me extends vf{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new ly(e,t,r):t==="array-contains"?new hy(e,r):t==="in"?new dy(e,r):t==="not-in"?new fy(e,r):t==="array-contains-any"?new py(e,r):new Me(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new cy(e,r):new uy(e,r)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(Hr(t,this.value)):t!==null&&On(this.value)===On(t)&&this.matchesComparison(Hr(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return J(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Pt extends vf{constructor(e,t){super(),this.filters=e,this.op=t,this.he=null}static create(e,t){return new Pt(e,t)}matches(e){return Ef(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.he!==null||(this.he=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.he}getFilters(){return Object.assign([],this.filters)}}function Ef(n){return n.op==="and"}function wf(n){return ay(n)&&Ef(n)}function ay(n){for(const e of n.filters)if(e instanceof Pt)return!1;return!0}function cl(n){if(n instanceof Me)return n.field.canonicalString()+n.op.toString()+Gr(n.value);if(wf(n))return n.filters.map(e=>cl(e)).join(",");{const e=n.filters.map(t=>cl(t)).join(",");return`${n.op}(${e})`}}function Tf(n,e){return n instanceof Me?function(r,s){return s instanceof Me&&r.op===s.op&&r.field.isEqual(s.field)&&zt(r.value,s.value)}(n,e):n instanceof Pt?function(r,s){return s instanceof Pt&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce((i,a,l)=>i&&Tf(a,s.filters[l]),!0):!1}(n,e):void J(19439)}function If(n){return n instanceof Me?function(t){return`${t.field.canonicalString()} ${t.op} ${Gr(t.value)}`}(n):n instanceof Pt?function(t){return t.op.toString()+" {"+t.getFilters().map(If).join(" ,")+"}"}(n):"Filter"}class ly extends Me{constructor(e,t,r){super(e,t,r),this.key=H.fromName(r.referenceValue)}matches(e){const t=H.comparator(e.key,this.key);return this.matchesComparison(t)}}class cy extends Me{constructor(e,t){super(e,"in",t),this.keys=bf("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class uy extends Me{constructor(e,t){super(e,"not-in",t),this.keys=bf("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function bf(n,e){var t;return(((t=e.arrayValue)===null||t===void 0?void 0:t.values)||[]).map(r=>H.fromName(r.referenceValue))}class hy extends Me{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return Gl(t)&&Ws(t.arrayValue,this.value)}}class dy extends Me{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&Ws(this.value.arrayValue,t)}}class fy extends Me{constructor(e,t){super(e,"not-in",t)}matches(e){if(Ws(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!Ws(this.value.arrayValue,t)}}class py extends Me{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!Gl(t)||!t.arrayValue.values)&&t.arrayValue.values.some(r=>Ws(this.value.arrayValue,r))}}/**
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
 */class my{constructor(e,t=null,r=[],s=[],i=null,a=null,l=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=a,this.endAt=l,this.Pe=null}}function gh(n,e=null,t=[],r=[],s=null,i=null,a=null){return new my(n,e,t,r,s,i,a)}function Wl(n){const e=Z(n);if(e.Pe===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(r=>cl(r)).join(","),t+="|ob:",t+=e.orderBy.map(r=>function(i){return i.field.canonicalString()+i.dir}(r)).join(","),Do(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(r=>Gr(r)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(r=>Gr(r)).join(",")),e.Pe=t}return e.Pe}function Kl(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!oy(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!Tf(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!mh(n.startAt,e.startAt)&&mh(n.endAt,e.endAt)}function ul(n){return H.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
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
 */class ss{constructor(e,t=null,r=[],s=[],i=null,a="F",l=null,u=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=a,this.startAt=l,this.endAt=u,this.Te=null,this.Ie=null,this.de=null,this.startAt,this.endAt}}function gy(n,e,t,r,s,i,a,l){return new ss(n,e,t,r,s,i,a,l)}function Mo(n){return new ss(n)}function _h(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function Af(n){return n.collectionGroup!==null}function Ds(n){const e=Z(n);if(e.Te===null){e.Te=[];const t=new Set;for(const i of e.explicitOrderBy)e.Te.push(i),t.add(i.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(a){let l=new Ue(Ge.comparator);return a.filters.forEach(u=>{u.getFlattenedFilters().forEach(h=>{h.isInequality()&&(l=l.add(h.field))})}),l})(e).forEach(i=>{t.has(i.canonicalString())||i.isKeyField()||e.Te.push(new Ks(i,r))}),t.has(Ge.keyField().canonicalString())||e.Te.push(new Ks(Ge.keyField(),r))}return e.Te}function Lt(n){const e=Z(n);return e.Ie||(e.Ie=_y(e,Ds(n))),e.Ie}function _y(n,e){if(n.limitType==="F")return gh(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(s=>{const i=s.dir==="desc"?"asc":"desc";return new Ks(s.field,i)});const t=n.endAt?new po(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new po(n.startAt.position,n.startAt.inclusive):null;return gh(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function hl(n,e){const t=n.filters.concat([e]);return new ss(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function dl(n,e,t){return new ss(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function Lo(n,e){return Kl(Lt(n),Lt(e))&&n.limitType===e.limitType}function Sf(n){return`${Wl(Lt(n))}|lt:${n.limitType}`}function kr(n){return`Query(target=${function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map(s=>If(s)).join(", ")}]`),Do(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map(s=>function(a){return`${a.field.canonicalString()} (${a.dir})`}(s)).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map(s=>Gr(s)).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map(s=>Gr(s)).join(",")),`Target(${r})`}(Lt(n))}; limitType=${n.limitType})`}function Fo(n,e){return e.isFoundDocument()&&function(r,s){const i=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(i):H.isDocumentKey(r.path)?r.path.isEqual(i):r.path.isImmediateParentOf(i)}(n,e)&&function(r,s){for(const i of Ds(r))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0}(n,e)&&function(r,s){for(const i of r.filters)if(!i.matches(s))return!1;return!0}(n,e)&&function(r,s){return!(r.startAt&&!function(a,l,u){const h=ph(a,l,u);return a.inclusive?h<=0:h<0}(r.startAt,Ds(r),s)||r.endAt&&!function(a,l,u){const h=ph(a,l,u);return a.inclusive?h>=0:h>0}(r.endAt,Ds(r),s))}(n,e)}function yy(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function Rf(n){return(e,t)=>{let r=!1;for(const s of Ds(n)){const i=vy(s,e,t);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function vy(n,e,t){const r=n.field.isKeyField()?H.comparator(e.key,t.key):function(i,a,l){const u=a.data.field(i),h=l.data.field(i);return u!==null&&h!==null?Hr(u,h):J(42886)}(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return J(19790,{direction:n.dir})}}/**
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
 */class gr{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(const[s,i]of r)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,t){const r=this.mapKeyFn(e),s=this.inner[r];if(s===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,t]);s.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return r.length===1?delete this.inner[t]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(e){Un(this.inner,(t,r)=>{for(const[s,i]of r)e(s,i)})}isEmpty(){return uf(this.inner)}size(){return this.innerSize}}/**
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
 */const Ey=new Pe(H.comparator);function tn(){return Ey}const kf=new Pe(H.comparator);function ks(...n){let e=kf;for(const t of n)e=e.insert(t.key,t);return e}function Pf(n){let e=kf;return n.forEach((t,r)=>e=e.insert(t,r.overlayedDocument)),e}function rr(){return Os()}function Cf(){return Os()}function Os(){return new gr(n=>n.toString(),(n,e)=>n.isEqual(e))}const wy=new Pe(H.comparator),Ty=new Ue(H.comparator);function re(...n){let e=Ty;for(const t of n)e=e.add(t);return e}const Iy=new Ue(te);function by(){return Iy}/**
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
 */function Ql(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:uo(e)?"-0":e}}function Vf(n){return{integerValue:""+n}}function Ay(n,e){return Y0(e)?Vf(e):Ql(n,e)}/**
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
 */class Uo{constructor(){this._=void 0}}function Sy(n,e,t){return n instanceof Qs?function(s,i){const a={fields:{[ff]:{stringValue:df},[mf]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&Hl(i)&&(i=Oo(i)),i&&(a.fields[pf]=i),{mapValue:a}}(t,e):n instanceof Js?xf(n,e):n instanceof Xs?Df(n,e):function(s,i){const a=Nf(s,i),l=yh(a)+yh(s.Ee);return ll(a)&&ll(s.Ee)?Vf(l):Ql(s.serializer,l)}(n,e)}function Ry(n,e,t){return n instanceof Js?xf(n,e):n instanceof Xs?Df(n,e):t}function Nf(n,e){return n instanceof mo?function(r){return ll(r)||function(i){return!!i&&"doubleValue"in i}(r)}(e)?e:{integerValue:0}:null}class Qs extends Uo{}class Js extends Uo{constructor(e){super(),this.elements=e}}function xf(n,e){const t=Of(e);for(const r of n.elements)t.some(s=>zt(s,r))||t.push(r);return{arrayValue:{values:t}}}class Xs extends Uo{constructor(e){super(),this.elements=e}}function Df(n,e){let t=Of(e);for(const r of n.elements)t=t.filter(s=>!zt(s,r));return{arrayValue:{values:t}}}class mo extends Uo{constructor(e,t){super(),this.serializer=e,this.Ee=t}}function yh(n){return xe(n.integerValue||n.doubleValue)}function Of(n){return Gl(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
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
 */class ky{constructor(e,t){this.field=e,this.transform=t}}function Py(n,e){return n.field.isEqual(e.field)&&function(r,s){return r instanceof Js&&s instanceof Js||r instanceof Xs&&s instanceof Xs?zr(r.elements,s.elements,zt):r instanceof mo&&s instanceof mo?zt(r.Ee,s.Ee):r instanceof Qs&&s instanceof Qs}(n.transform,e.transform)}class Cy{constructor(e,t){this.version=e,this.transformResults=t}}class Rt{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new Rt}static exists(e){return new Rt(void 0,e)}static updateTime(e){return new Rt(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Ki(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class $o{}function Mf(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new Ff(n.key,Rt.none()):new oi(n.key,n.data,Rt.none());{const t=n.data,r=dt.empty();let s=new Ue(Ge.comparator);for(let i of e.fields)if(!s.has(i)){let a=t.field(i);a===null&&i.length>1&&(i=i.popLast(),a=t.field(i)),a===null?r.delete(i):r.set(i,a),s=s.add(i)}return new $n(n.key,r,new mt(s.toArray()),Rt.none())}}function Vy(n,e,t){n instanceof oi?function(s,i,a){const l=s.value.clone(),u=Eh(s.fieldTransforms,i,a.transformResults);l.setAll(u),i.convertToFoundDocument(a.version,l).setHasCommittedMutations()}(n,e,t):n instanceof $n?function(s,i,a){if(!Ki(s.precondition,i))return void i.convertToUnknownDocument(a.version);const l=Eh(s.fieldTransforms,i,a.transformResults),u=i.data;u.setAll(Lf(s)),u.setAll(l),i.convertToFoundDocument(a.version,u).setHasCommittedMutations()}(n,e,t):function(s,i,a){i.convertToNoDocument(a.version).setHasCommittedMutations()}(0,e,t)}function Ms(n,e,t,r){return n instanceof oi?function(i,a,l,u){if(!Ki(i.precondition,a))return l;const h=i.value.clone(),f=wh(i.fieldTransforms,u,a);return h.setAll(f),a.convertToFoundDocument(a.version,h).setHasLocalMutations(),null}(n,e,t,r):n instanceof $n?function(i,a,l,u){if(!Ki(i.precondition,a))return l;const h=wh(i.fieldTransforms,u,a),f=a.data;return f.setAll(Lf(i)),f.setAll(h),a.convertToFoundDocument(a.version,f).setHasLocalMutations(),l===null?null:l.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map(p=>p.field))}(n,e,t,r):function(i,a,l){return Ki(i.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):l}(n,e,t)}function Ny(n,e){let t=null;for(const r of n.fieldTransforms){const s=e.data.field(r.field),i=Nf(r.transform,s||null);i!=null&&(t===null&&(t=dt.empty()),t.set(r.field,i))}return t||null}function vh(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&zr(r,s,(i,a)=>Py(i,a))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class oi extends $o{constructor(e,t,r,s=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class $n extends $o{constructor(e,t,r,s,i=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function Lf(n){const e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){const r=n.data.field(t);e.set(t,r)}}),e}function Eh(n,e,t){const r=new Map;fe(n.length===t.length,32656,{Ae:t.length,Re:n.length});for(let s=0;s<t.length;s++){const i=n[s],a=i.transform,l=e.data.field(i.field);r.set(i.field,Ry(a,l,t[s]))}return r}function wh(n,e,t){const r=new Map;for(const s of n){const i=s.transform,a=t.data.field(s.field);r.set(s.field,Sy(i,a,e))}return r}class Ff extends $o{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class xy extends $o{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
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
 */class Dy{constructor(e,t,r,s){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&Vy(i,e,r[s])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=Ms(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=Ms(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=Cf();return this.mutations.forEach(s=>{const i=e.get(s.key),a=i.overlayedDocument;let l=this.applyToLocalView(a,i.mutatedFields);l=t.has(s.key)?null:l;const u=Mf(a,l);u!==null&&r.set(s.key,u),a.isValidDocument()||a.convertToNoDocument(Y.min())}),r}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),re())}isEqual(e){return this.batchId===e.batchId&&zr(this.mutations,e.mutations,(t,r)=>vh(t,r))&&zr(this.baseMutations,e.baseMutations,(t,r)=>vh(t,r))}}class Jl{constructor(e,t,r,s){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=s}static from(e,t,r){fe(e.mutations.length===r.length,58842,{Ve:e.mutations.length,me:r.length});let s=function(){return wy}();const i=e.mutations;for(let a=0;a<i.length;a++)s=s.insert(i[a].key,r[a].version);return new Jl(e,t,r,s)}}/**
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
 */class Oy{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
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
 */class My{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
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
 */var Oe,ie;function Ly(n){switch(n){case P.OK:return J(64938);case P.CANCELLED:case P.UNKNOWN:case P.DEADLINE_EXCEEDED:case P.RESOURCE_EXHAUSTED:case P.INTERNAL:case P.UNAVAILABLE:case P.UNAUTHENTICATED:return!1;case P.INVALID_ARGUMENT:case P.NOT_FOUND:case P.ALREADY_EXISTS:case P.PERMISSION_DENIED:case P.FAILED_PRECONDITION:case P.ABORTED:case P.OUT_OF_RANGE:case P.UNIMPLEMENTED:case P.DATA_LOSS:return!0;default:return J(15467,{code:n})}}function Uf(n){if(n===void 0)return en("GRPC error has no .code"),P.UNKNOWN;switch(n){case Oe.OK:return P.OK;case Oe.CANCELLED:return P.CANCELLED;case Oe.UNKNOWN:return P.UNKNOWN;case Oe.DEADLINE_EXCEEDED:return P.DEADLINE_EXCEEDED;case Oe.RESOURCE_EXHAUSTED:return P.RESOURCE_EXHAUSTED;case Oe.INTERNAL:return P.INTERNAL;case Oe.UNAVAILABLE:return P.UNAVAILABLE;case Oe.UNAUTHENTICATED:return P.UNAUTHENTICATED;case Oe.INVALID_ARGUMENT:return P.INVALID_ARGUMENT;case Oe.NOT_FOUND:return P.NOT_FOUND;case Oe.ALREADY_EXISTS:return P.ALREADY_EXISTS;case Oe.PERMISSION_DENIED:return P.PERMISSION_DENIED;case Oe.FAILED_PRECONDITION:return P.FAILED_PRECONDITION;case Oe.ABORTED:return P.ABORTED;case Oe.OUT_OF_RANGE:return P.OUT_OF_RANGE;case Oe.UNIMPLEMENTED:return P.UNIMPLEMENTED;case Oe.DATA_LOSS:return P.DATA_LOSS;default:return J(39323,{code:n})}}(ie=Oe||(Oe={}))[ie.OK=0]="OK",ie[ie.CANCELLED=1]="CANCELLED",ie[ie.UNKNOWN=2]="UNKNOWN",ie[ie.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",ie[ie.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",ie[ie.NOT_FOUND=5]="NOT_FOUND",ie[ie.ALREADY_EXISTS=6]="ALREADY_EXISTS",ie[ie.PERMISSION_DENIED=7]="PERMISSION_DENIED",ie[ie.UNAUTHENTICATED=16]="UNAUTHENTICATED",ie[ie.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",ie[ie.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",ie[ie.ABORTED=10]="ABORTED",ie[ie.OUT_OF_RANGE=11]="OUT_OF_RANGE",ie[ie.UNIMPLEMENTED=12]="UNIMPLEMENTED",ie[ie.INTERNAL=13]="INTERNAL",ie[ie.UNAVAILABLE=14]="UNAVAILABLE",ie[ie.DATA_LOSS=15]="DATA_LOSS";/**
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
 */const Fy=new Tn([4294967295,4294967295],0);function Th(n){const e=of().encode(n),t=new Xd;return t.update(e),new Uint8Array(t.digest())}function Ih(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new Tn([t,r],0),new Tn([s,i],0)]}class Xl{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new Ps(`Invalid padding: ${t}`);if(r<0)throw new Ps(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new Ps(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new Ps(`Invalid padding when bitmap length is 0: ${t}`);this.fe=8*e.length-t,this.ge=Tn.fromNumber(this.fe)}pe(e,t,r){let s=e.add(t.multiply(Tn.fromNumber(r)));return s.compare(Fy)===1&&(s=new Tn([s.getBits(0),s.getBits(1)],0)),s.modulo(this.ge).toNumber()}ye(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.fe===0)return!1;const t=Th(e),[r,s]=Ih(t);for(let i=0;i<this.hashCount;i++){const a=this.pe(r,s,i);if(!this.ye(a))return!1}return!0}static create(e,t,r){const s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),a=new Xl(i,s,t);return r.forEach(l=>a.insert(l)),a}insert(e){if(this.fe===0)return;const t=Th(e),[r,s]=Ih(t);for(let i=0;i<this.hashCount;i++){const a=this.pe(r,s,i);this.we(a)}}we(e){const t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}}class Ps extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
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
 */class Bo{constructor(e,t,r,s,i){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,t,r){const s=new Map;return s.set(e,ai.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new Bo(Y.min(),s,new Pe(te),tn(),re())}}class ai{constructor(e,t,r,s,i){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new ai(r,t,re(),re(),re())}}/**
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
 */class Qi{constructor(e,t,r,s){this.Se=e,this.removedTargetIds=t,this.key=r,this.be=s}}class $f{constructor(e,t){this.targetId=e,this.De=t}}class Bf{constructor(e,t,r=Ke.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=s}}class bh{constructor(){this.ve=0,this.Ce=Ah(),this.Fe=Ke.EMPTY_BYTE_STRING,this.Me=!1,this.xe=!0}get current(){return this.Me}get resumeToken(){return this.Fe}get Oe(){return this.ve!==0}get Ne(){return this.xe}Be(e){e.approximateByteSize()>0&&(this.xe=!0,this.Fe=e)}Le(){let e=re(),t=re(),r=re();return this.Ce.forEach((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:t=t.add(s);break;case 1:r=r.add(s);break;default:J(38017,{changeType:i})}}),new ai(this.Fe,this.Me,e,t,r)}ke(){this.xe=!1,this.Ce=Ah()}qe(e,t){this.xe=!0,this.Ce=this.Ce.insert(e,t)}Qe(e){this.xe=!0,this.Ce=this.Ce.remove(e)}$e(){this.ve+=1}Ue(){this.ve-=1,fe(this.ve>=0,3241,{ve:this.ve})}Ke(){this.xe=!0,this.Me=!0}}class Uy{constructor(e){this.We=e,this.Ge=new Map,this.ze=tn(),this.je=Fi(),this.Je=Fi(),this.He=new Pe(te)}Ye(e){for(const t of e.Se)e.be&&e.be.isFoundDocument()?this.Ze(t,e.be):this.Xe(t,e.key,e.be);for(const t of e.removedTargetIds)this.Xe(t,e.key,e.be)}et(e){this.forEachTarget(e,t=>{const r=this.tt(t);switch(e.state){case 0:this.nt(t)&&r.Be(e.resumeToken);break;case 1:r.Ue(),r.Oe||r.ke(),r.Be(e.resumeToken);break;case 2:r.Ue(),r.Oe||this.removeTarget(t);break;case 3:this.nt(t)&&(r.Ke(),r.Be(e.resumeToken));break;case 4:this.nt(t)&&(this.rt(t),r.Be(e.resumeToken));break;default:J(56790,{state:e.state})}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.Ge.forEach((r,s)=>{this.nt(s)&&t(s)})}it(e){const t=e.targetId,r=e.De.count,s=this.st(t);if(s){const i=s.target;if(ul(i))if(r===0){const a=new H(i.path);this.Xe(t,a,nt.newNoDocument(a,Y.min()))}else fe(r===1,20013,{expectedCount:r});else{const a=this.ot(t);if(a!==r){const l=this._t(e),u=l?this.ut(l,e,a):1;if(u!==0){this.rt(t);const h=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.He=this.He.insert(t,h)}}}}}_t(e){const t=e.De.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:i=0}=t;let a,l;try{a=Dn(r).toUint8Array()}catch(u){if(u instanceof hf)return Vn("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw u}try{l=new Xl(a,s,i)}catch(u){return Vn(u instanceof Ps?"BloomFilter error: ":"Applying bloom filter failed: ",u),null}return l.fe===0?null:l}ut(e,t,r){return t.De.count===r-this.ht(e,t.targetId)?0:2}ht(e,t){const r=this.We.getRemoteKeysForTarget(t);let s=0;return r.forEach(i=>{const a=this.We.lt(),l=`projects/${a.projectId}/databases/${a.database}/documents/${i.path.canonicalString()}`;e.mightContain(l)||(this.Xe(t,i,null),s++)}),s}Pt(e){const t=new Map;this.Ge.forEach((i,a)=>{const l=this.st(a);if(l){if(i.current&&ul(l.target)){const u=new H(l.target.path);this.Tt(u).has(a)||this.It(a,u)||this.Xe(a,u,nt.newNoDocument(u,e))}i.Ne&&(t.set(a,i.Le()),i.ke())}});let r=re();this.Je.forEach((i,a)=>{let l=!0;a.forEachWhile(u=>{const h=this.st(u);return!h||h.purpose==="TargetPurposeLimboResolution"||(l=!1,!1)}),l&&(r=r.add(i))}),this.ze.forEach((i,a)=>a.setReadTime(e));const s=new Bo(e,t,this.He,this.ze,r);return this.ze=tn(),this.je=Fi(),this.Je=Fi(),this.He=new Pe(te),s}Ze(e,t){if(!this.nt(e))return;const r=this.It(e,t.key)?2:0;this.tt(e).qe(t.key,r),this.ze=this.ze.insert(t.key,t),this.je=this.je.insert(t.key,this.Tt(t.key).add(e)),this.Je=this.Je.insert(t.key,this.dt(t.key).add(e))}Xe(e,t,r){if(!this.nt(e))return;const s=this.tt(e);this.It(e,t)?s.qe(t,1):s.Qe(t),this.Je=this.Je.insert(t,this.dt(t).delete(e)),this.Je=this.Je.insert(t,this.dt(t).add(e)),r&&(this.ze=this.ze.insert(t,r))}removeTarget(e){this.Ge.delete(e)}ot(e){const t=this.tt(e).Le();return this.We.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}$e(e){this.tt(e).$e()}tt(e){let t=this.Ge.get(e);return t||(t=new bh,this.Ge.set(e,t)),t}dt(e){let t=this.Je.get(e);return t||(t=new Ue(te),this.Je=this.Je.insert(e,t)),t}Tt(e){let t=this.je.get(e);return t||(t=new Ue(te),this.je=this.je.insert(e,t)),t}nt(e){const t=this.st(e)!==null;return t||$("WatchChangeAggregator","Detected inactive target",e),t}st(e){const t=this.Ge.get(e);return t&&t.Oe?null:this.We.Et(e)}rt(e){this.Ge.set(e,new bh),this.We.getRemoteKeysForTarget(e).forEach(t=>{this.Xe(e,t,null)})}It(e,t){return this.We.getRemoteKeysForTarget(e).has(t)}}function Fi(){return new Pe(H.comparator)}function Ah(){return new Pe(H.comparator)}const $y={asc:"ASCENDING",desc:"DESCENDING"},By={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},qy={and:"AND",or:"OR"};class jy{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function fl(n,e){return n.useProto3Json||Do(e)?e:{value:e}}function go(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function qf(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function zy(n,e){return go(n,e.toTimestamp())}function Ft(n){return fe(!!n,49232),Y.fromTimestamp(function(t){const r=xn(t);return new be(r.seconds,r.nanos)}(n))}function Yl(n,e){return pl(n,e).canonicalString()}function pl(n,e){const t=function(s){return new Ee(["projects",s.projectId,"databases",s.database])}(n).child("documents");return e===void 0?t:t.child(e)}function jf(n){const e=Ee.fromString(n);return fe(Kf(e),10190,{key:e.toString()}),e}function ml(n,e){return Yl(n.databaseId,e.path)}function Ma(n,e){const t=jf(e);if(t.get(1)!==n.databaseId.projectId)throw new U(P.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new U(P.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new H(Hf(t))}function zf(n,e){return Yl(n.databaseId,e)}function Hy(n){const e=jf(n);return e.length===4?Ee.emptyPath():Hf(e)}function gl(n){return new Ee(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function Hf(n){return fe(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function Sh(n,e,t){return{name:ml(n,e),fields:t.value.mapValue.fields}}function Gy(n,e){let t;if("targetChange"in e){e.targetChange;const r=function(h){return h==="NO_CHANGE"?0:h==="ADD"?1:h==="REMOVE"?2:h==="CURRENT"?3:h==="RESET"?4:J(39313,{state:h})}(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=function(h,f){return h.useProto3Json?(fe(f===void 0||typeof f=="string",58123),Ke.fromBase64String(f||"")):(fe(f===void 0||f instanceof Buffer||f instanceof Uint8Array,16193),Ke.fromUint8Array(f||new Uint8Array))}(n,e.targetChange.resumeToken),a=e.targetChange.cause,l=a&&function(h){const f=h.code===void 0?P.UNKNOWN:Uf(h.code);return new U(f,h.message||"")}(a);t=new Bf(r,s,i,l||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const s=Ma(n,r.document.name),i=Ft(r.document.updateTime),a=r.document.createTime?Ft(r.document.createTime):Y.min(),l=new dt({mapValue:{fields:r.document.fields}}),u=nt.newFoundDocument(s,i,a,l),h=r.targetIds||[],f=r.removedTargetIds||[];t=new Qi(h,f,u.key,u)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const s=Ma(n,r.document),i=r.readTime?Ft(r.readTime):Y.min(),a=nt.newNoDocument(s,i),l=r.removedTargetIds||[];t=new Qi([],l,a.key,a)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const s=Ma(n,r.document),i=r.removedTargetIds||[];t=new Qi([],i,s,null)}else{if(!("filter"in e))return J(11601,{At:e});{e.filter;const r=e.filter;r.targetId;const{count:s=0,unchangedNames:i}=r,a=new My(s,i),l=r.targetId;t=new $f(l,a)}}return t}function Wy(n,e){let t;if(e instanceof oi)t={update:Sh(n,e.key,e.value)};else if(e instanceof Ff)t={delete:ml(n,e.key)};else if(e instanceof $n)t={update:Sh(n,e.key,e.data),updateMask:nv(e.fieldMask)};else{if(!(e instanceof xy))return J(16599,{Rt:e.type});t={verify:ml(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(r=>function(i,a){const l=a.transform;if(l instanceof Qs)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(l instanceof Js)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:l.elements}};if(l instanceof Xs)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:l.elements}};if(l instanceof mo)return{fieldPath:a.field.canonicalString(),increment:l.Ee};throw J(20930,{transform:a.transform})}(0,r))),e.precondition.isNone||(t.currentDocument=function(s,i){return i.updateTime!==void 0?{updateTime:zy(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:J(27497)}(n,e.precondition)),t}function Ky(n,e){return n&&n.length>0?(fe(e!==void 0,14353),n.map(t=>function(s,i){let a=s.updateTime?Ft(s.updateTime):Ft(i);return a.isEqual(Y.min())&&(a=Ft(i)),new Cy(a,s.transformResults||[])}(t,e))):[]}function Qy(n,e){return{documents:[zf(n,e.path)]}}function Jy(n,e){const t={structuredQuery:{}},r=e.path;let s;e.collectionGroup!==null?(s=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=zf(n,s);const i=function(h){if(h.length!==0)return Wf(Pt.create(h,"and"))}(e.filters);i&&(t.structuredQuery.where=i);const a=function(h){if(h.length!==0)return h.map(f=>function(_){return{field:Pr(_.field),direction:Zy(_.dir)}}(f))}(e.orderBy);a&&(t.structuredQuery.orderBy=a);const l=fl(n,e.limit);return l!==null&&(t.structuredQuery.limit=l),e.startAt&&(t.structuredQuery.startAt=function(h){return{before:h.inclusive,values:h.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(h){return{before:!h.inclusive,values:h.position}}(e.endAt)),{Vt:t,parent:s}}function Xy(n){let e=Hy(n.parent);const t=n.structuredQuery,r=t.from?t.from.length:0;let s=null;if(r>0){fe(r===1,65062);const f=t.from[0];f.allDescendants?s=f.collectionId:e=e.child(f.collectionId)}let i=[];t.where&&(i=function(p){const _=Gf(p);return _ instanceof Pt&&wf(_)?_.getFilters():[_]}(t.where));let a=[];t.orderBy&&(a=function(p){return p.map(_=>function(k){return new Ks(Cr(k.field),function(N){switch(N){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(k.direction))}(_))}(t.orderBy));let l=null;t.limit&&(l=function(p){let _;return _=typeof p=="object"?p.value:p,Do(_)?null:_}(t.limit));let u=null;t.startAt&&(u=function(p){const _=!!p.before,A=p.values||[];return new po(A,_)}(t.startAt));let h=null;return t.endAt&&(h=function(p){const _=!p.before,A=p.values||[];return new po(A,_)}(t.endAt)),gy(e,s,a,i,l,"F",u,h)}function Yy(n,e){const t=function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return J(28987,{purpose:s})}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function Gf(n){return n.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":const r=Cr(t.unaryFilter.field);return Me.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=Cr(t.unaryFilter.field);return Me.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=Cr(t.unaryFilter.field);return Me.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=Cr(t.unaryFilter.field);return Me.create(a,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return J(61313);default:return J(60726)}}(n):n.fieldFilter!==void 0?function(t){return Me.create(Cr(t.fieldFilter.field),function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return J(58110);default:return J(50506)}}(t.fieldFilter.op),t.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(t){return Pt.create(t.compositeFilter.filters.map(r=>Gf(r)),function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return J(1026)}}(t.compositeFilter.op))}(n):J(30097,{filter:n})}function Zy(n){return $y[n]}function ev(n){return By[n]}function tv(n){return qy[n]}function Pr(n){return{fieldPath:n.canonicalString()}}function Cr(n){return Ge.fromServerFormat(n.fieldPath)}function Wf(n){return n instanceof Me?function(t){if(t.op==="=="){if(fh(t.value))return{unaryFilter:{field:Pr(t.field),op:"IS_NAN"}};if(dh(t.value))return{unaryFilter:{field:Pr(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(fh(t.value))return{unaryFilter:{field:Pr(t.field),op:"IS_NOT_NAN"}};if(dh(t.value))return{unaryFilter:{field:Pr(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Pr(t.field),op:ev(t.op),value:t.value}}}(n):n instanceof Pt?function(t){const r=t.getFilters().map(s=>Wf(s));return r.length===1?r[0]:{compositeFilter:{op:tv(t.op),filters:r}}}(n):J(54877,{filter:n})}function nv(n){const e=[];return n.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function Kf(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
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
 */class _n{constructor(e,t,r,s,i=Y.min(),a=Y.min(),l=Ke.EMPTY_BYTE_STRING,u=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=l,this.expectedCount=u}withSequenceNumber(e){return new _n(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new _n(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new _n(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new _n(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
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
 */class rv{constructor(e){this.gt=e}}function sv(n){const e=Xy({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?dl(e,e.limit,"L"):e}/**
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
 */class iv{constructor(){this.Dn=new ov}addToCollectionParentIndex(e,t){return this.Dn.add(t),C.resolve()}getCollectionParents(e,t){return C.resolve(this.Dn.getEntries(t))}addFieldIndex(e,t){return C.resolve()}deleteFieldIndex(e,t){return C.resolve()}deleteAllFieldIndexes(e){return C.resolve()}createTargetIndexes(e,t){return C.resolve()}getDocumentsMatchingTarget(e,t){return C.resolve(null)}getIndexType(e,t){return C.resolve(0)}getFieldIndexes(e,t){return C.resolve([])}getNextCollectionGroupToUpdate(e){return C.resolve(null)}getMinOffset(e,t){return C.resolve(Nn.min())}getMinOffsetFromCollectionGroup(e,t){return C.resolve(Nn.min())}updateCollectionGroup(e,t,r){return C.resolve()}updateIndexEntries(e,t){return C.resolve()}}class ov{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t]||new Ue(Ee.comparator),i=!s.has(r);return this.index[t]=s.add(r),i}has(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t];return s&&s.has(r)}getEntries(e){return(this.index[e]||new Ue(Ee.comparator)).toArray()}}/**
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
 */const Rh={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},Qf=41943040;class ht{static withCacheSize(e){return new ht(e,ht.DEFAULT_COLLECTION_PERCENTILE,ht.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}}/**
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
 */ht.DEFAULT_COLLECTION_PERCENTILE=10,ht.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,ht.DEFAULT=new ht(Qf,ht.DEFAULT_COLLECTION_PERCENTILE,ht.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),ht.DISABLED=new ht(-1,0,0);/**
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
 */class Wr{constructor(e){this._r=e}next(){return this._r+=2,this._r}static ar(){return new Wr(0)}static ur(){return new Wr(-1)}}/**
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
 */const kh="LruGarbageCollector",av=1048576;function Ph([n,e],[t,r]){const s=te(n,t);return s===0?te(e,r):s}class lv{constructor(e){this.Tr=e,this.buffer=new Ue(Ph),this.Ir=0}dr(){return++this.Ir}Er(e){const t=[e,this.dr()];if(this.buffer.size<this.Tr)this.buffer=this.buffer.add(t);else{const r=this.buffer.last();Ph(t,r)<0&&(this.buffer=this.buffer.delete(r).add(t))}}get maxValue(){return this.buffer.last()[0]}}class cv{constructor(e,t,r){this.garbageCollector=e,this.asyncQueue=t,this.localStore=r,this.Ar=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Rr(6e4)}stop(){this.Ar&&(this.Ar.cancel(),this.Ar=null)}get started(){return this.Ar!==null}Rr(e){$(kh,`Garbage collection scheduled in ${e}ms`),this.Ar=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Ar=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){rs(t)?$(kh,"Ignoring IndexedDB error during garbage collection: ",t):await ns(t)}await this.Rr(3e5)})}}class uv{constructor(e,t){this.Vr=e,this.params=t}calculateTargetCount(e,t){return this.Vr.mr(e).next(r=>Math.floor(t/100*r))}nthSequenceNumber(e,t){if(t===0)return C.resolve(xo.ue);const r=new lv(t);return this.Vr.forEachTarget(e,s=>r.Er(s.sequenceNumber)).next(()=>this.Vr.gr(e,s=>r.Er(s))).next(()=>r.maxValue)}removeTargets(e,t,r){return this.Vr.removeTargets(e,t,r)}removeOrphanedDocuments(e,t){return this.Vr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?($("LruGarbageCollector","Garbage collection skipped; disabled"),C.resolve(Rh)):this.getCacheSize(e).next(r=>r<this.params.cacheSizeCollectionThreshold?($("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Rh):this.pr(e,t))}getCacheSize(e){return this.Vr.getCacheSize(e)}pr(e,t){let r,s,i,a,l,u,h;const f=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(p=>(p>this.params.maximumSequenceNumbersToCollect?($("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${p}`),s=this.params.maximumSequenceNumbersToCollect):s=p,a=Date.now(),this.nthSequenceNumber(e,s))).next(p=>(r=p,l=Date.now(),this.removeTargets(e,r,t))).next(p=>(i=p,u=Date.now(),this.removeOrphanedDocuments(e,r))).next(p=>(h=Date.now(),Rr()<=ne.DEBUG&&$("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-f}ms
	Determined least recently used ${s} in `+(l-a)+`ms
	Removed ${i} targets in `+(u-l)+`ms
	Removed ${p} documents in `+(h-u)+`ms
Total Duration: ${h-f}ms`),C.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:p})))}}function hv(n,e){return new uv(n,e)}/**
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
 */class dv{constructor(){this.changes=new gr(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,nt.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return r!==void 0?C.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
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
 */class fv{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
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
 */class pv{constructor(e,t,r,s){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=s}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next(s=>(r=s,this.remoteDocumentCache.getEntry(e,t))).next(s=>(r!==null&&Ms(r.mutation,s,mt.empty(),be.now()),s))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.getLocalViewOfDocuments(e,r,re()).next(()=>r))}getLocalViewOfDocuments(e,t,r=re()){const s=rr();return this.populateOverlays(e,s,t).next(()=>this.computeViews(e,t,s,r).next(i=>{let a=ks();return i.forEach((l,u)=>{a=a.insert(l,u.overlayedDocument)}),a}))}getOverlayedDocuments(e,t){const r=rr();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,re()))}populateOverlays(e,t,r){const s=[];return r.forEach(i=>{t.has(i)||s.push(i)}),this.documentOverlayCache.getOverlays(e,s).next(i=>{i.forEach((a,l)=>{t.set(a,l)})})}computeViews(e,t,r,s){let i=tn();const a=Os(),l=function(){return Os()}();return t.forEach((u,h)=>{const f=r.get(h.key);s.has(h.key)&&(f===void 0||f.mutation instanceof $n)?i=i.insert(h.key,h):f!==void 0?(a.set(h.key,f.mutation.getFieldMask()),Ms(f.mutation,h,f.mutation.getFieldMask(),be.now())):a.set(h.key,mt.empty())}),this.recalculateAndSaveOverlays(e,i).next(u=>(u.forEach((h,f)=>a.set(h,f)),t.forEach((h,f)=>{var p;return l.set(h,new fv(f,(p=a.get(h))!==null&&p!==void 0?p:null))}),l))}recalculateAndSaveOverlays(e,t){const r=Os();let s=new Pe((a,l)=>a-l),i=re();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(a=>{for(const l of a)l.keys().forEach(u=>{const h=t.get(u);if(h===null)return;let f=r.get(u)||mt.empty();f=l.applyToLocalView(h,f),r.set(u,f);const p=(s.get(l.batchId)||re()).add(u);s=s.insert(l.batchId,p)})}).next(()=>{const a=[],l=s.getReverseIterator();for(;l.hasNext();){const u=l.getNext(),h=u.key,f=u.value,p=Cf();f.forEach(_=>{if(!i.has(_)){const A=Mf(t.get(_),r.get(_));A!==null&&p.set(_,A),i=i.add(_)}}),a.push(this.documentOverlayCache.saveOverlays(e,h,p))}return C.waitFor(a)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,t,r,s){return function(a){return H.isDocumentKey(a.path)&&a.collectionGroup===null&&a.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):Af(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,s):this.getDocumentsMatchingCollectionQuery(e,t,r,s)}getNextDocuments(e,t,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,s).next(i=>{const a=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,s-i.size):C.resolve(rr());let l=zs,u=i;return a.next(h=>C.forEach(h,(f,p)=>(l<p.largestBatchId&&(l=p.largestBatchId),i.get(f)?C.resolve():this.remoteDocumentCache.getEntry(e,f).next(_=>{u=u.insert(f,_)}))).next(()=>this.populateOverlays(e,h,i)).next(()=>this.computeViews(e,u,h,re())).next(f=>({batchId:l,changes:Pf(f)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new H(t)).next(r=>{let s=ks();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s})}getDocumentsMatchingCollectionGroupQuery(e,t,r,s){const i=t.collectionGroup;let a=ks();return this.indexManager.getCollectionParents(e,i).next(l=>C.forEach(l,u=>{const h=function(p,_){return new ss(_,null,p.explicitOrderBy.slice(),p.filters.slice(),p.limit,p.limitType,p.startAt,p.endAt)}(t,u.child(i));return this.getDocumentsMatchingCollectionQuery(e,h,r,s).next(f=>{f.forEach((p,_)=>{a=a.insert(p,_)})})}).next(()=>a))}getDocumentsMatchingCollectionQuery(e,t,r,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next(a=>(i=a,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,i,s))).next(a=>{i.forEach((u,h)=>{const f=h.getKey();a.get(f)===null&&(a=a.insert(f,nt.newInvalidDocument(f)))});let l=ks();return a.forEach((u,h)=>{const f=i.get(u);f!==void 0&&Ms(f.mutation,h,mt.empty(),be.now()),Fo(t,h)&&(l=l.insert(u,h))}),l})}}/**
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
 */class mv{constructor(e){this.serializer=e,this.Br=new Map,this.Lr=new Map}getBundleMetadata(e,t){return C.resolve(this.Br.get(t))}saveBundleMetadata(e,t){return this.Br.set(t.id,function(s){return{id:s.id,version:s.version,createTime:Ft(s.createTime)}}(t)),C.resolve()}getNamedQuery(e,t){return C.resolve(this.Lr.get(t))}saveNamedQuery(e,t){return this.Lr.set(t.name,function(s){return{name:s.name,query:sv(s.bundledQuery),readTime:Ft(s.readTime)}}(t)),C.resolve()}}/**
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
 */class gv{constructor(){this.overlays=new Pe(H.comparator),this.kr=new Map}getOverlay(e,t){return C.resolve(this.overlays.get(t))}getOverlays(e,t){const r=rr();return C.forEach(t,s=>this.getOverlay(e,s).next(i=>{i!==null&&r.set(s,i)})).next(()=>r)}saveOverlays(e,t,r){return r.forEach((s,i)=>{this.wt(e,t,i)}),C.resolve()}removeOverlaysForBatchId(e,t,r){const s=this.kr.get(r);return s!==void 0&&(s.forEach(i=>this.overlays=this.overlays.remove(i)),this.kr.delete(r)),C.resolve()}getOverlaysForCollection(e,t,r){const s=rr(),i=t.length+1,a=new H(t.child("")),l=this.overlays.getIteratorFrom(a);for(;l.hasNext();){const u=l.getNext().value,h=u.getKey();if(!t.isPrefixOf(h.path))break;h.path.length===i&&u.largestBatchId>r&&s.set(u.getKey(),u)}return C.resolve(s)}getOverlaysForCollectionGroup(e,t,r,s){let i=new Pe((h,f)=>h-f);const a=this.overlays.getIterator();for(;a.hasNext();){const h=a.getNext().value;if(h.getKey().getCollectionGroup()===t&&h.largestBatchId>r){let f=i.get(h.largestBatchId);f===null&&(f=rr(),i=i.insert(h.largestBatchId,f)),f.set(h.getKey(),h)}}const l=rr(),u=i.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach((h,f)=>l.set(h,f)),!(l.size()>=s)););return C.resolve(l)}wt(e,t,r){const s=this.overlays.get(r.key);if(s!==null){const a=this.kr.get(s.largestBatchId).delete(r.key);this.kr.set(s.largestBatchId,a)}this.overlays=this.overlays.insert(r.key,new Oy(t,r));let i=this.kr.get(t);i===void 0&&(i=re(),this.kr.set(t,i)),this.kr.set(t,i.add(r.key))}}/**
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
 */class _v{constructor(){this.sessionToken=Ke.EMPTY_BYTE_STRING}getSessionToken(e){return C.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,C.resolve()}}/**
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
 */class Zl{constructor(){this.qr=new Ue(qe.Qr),this.$r=new Ue(qe.Ur)}isEmpty(){return this.qr.isEmpty()}addReference(e,t){const r=new qe(e,t);this.qr=this.qr.add(r),this.$r=this.$r.add(r)}Kr(e,t){e.forEach(r=>this.addReference(r,t))}removeReference(e,t){this.Wr(new qe(e,t))}Gr(e,t){e.forEach(r=>this.removeReference(r,t))}zr(e){const t=new H(new Ee([])),r=new qe(t,e),s=new qe(t,e+1),i=[];return this.$r.forEachInRange([r,s],a=>{this.Wr(a),i.push(a.key)}),i}jr(){this.qr.forEach(e=>this.Wr(e))}Wr(e){this.qr=this.qr.delete(e),this.$r=this.$r.delete(e)}Jr(e){const t=new H(new Ee([])),r=new qe(t,e),s=new qe(t,e+1);let i=re();return this.$r.forEachInRange([r,s],a=>{i=i.add(a.key)}),i}containsKey(e){const t=new qe(e,0),r=this.qr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}}class qe{constructor(e,t){this.key=e,this.Hr=t}static Qr(e,t){return H.comparator(e.key,t.key)||te(e.Hr,t.Hr)}static Ur(e,t){return te(e.Hr,t.Hr)||H.comparator(e.key,t.key)}}/**
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
 */class yv{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.er=1,this.Yr=new Ue(qe.Qr)}checkEmpty(e){return C.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,s){const i=this.er;this.er++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new Dy(i,t,r,s);this.mutationQueue.push(a);for(const l of s)this.Yr=this.Yr.add(new qe(l.key,i)),this.indexManager.addToCollectionParentIndex(e,l.key.path.popLast());return C.resolve(a)}lookupMutationBatch(e,t){return C.resolve(this.Zr(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,s=this.Xr(r),i=s<0?0:s;return C.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return C.resolve(this.mutationQueue.length===0?zl:this.er-1)}getAllMutationBatches(e){return C.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new qe(t,0),s=new qe(t,Number.POSITIVE_INFINITY),i=[];return this.Yr.forEachInRange([r,s],a=>{const l=this.Zr(a.Hr);i.push(l)}),C.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new Ue(te);return t.forEach(s=>{const i=new qe(s,0),a=new qe(s,Number.POSITIVE_INFINITY);this.Yr.forEachInRange([i,a],l=>{r=r.add(l.Hr)})}),C.resolve(this.ei(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,s=r.length+1;let i=r;H.isDocumentKey(i)||(i=i.child(""));const a=new qe(new H(i),0);let l=new Ue(te);return this.Yr.forEachWhile(u=>{const h=u.key.path;return!!r.isPrefixOf(h)&&(h.length===s&&(l=l.add(u.Hr)),!0)},a),C.resolve(this.ei(l))}ei(e){const t=[];return e.forEach(r=>{const s=this.Zr(r);s!==null&&t.push(s)}),t}removeMutationBatch(e,t){fe(this.ti(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.Yr;return C.forEach(t.mutations,s=>{const i=new qe(s.key,t.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)}).next(()=>{this.Yr=r})}rr(e){}containsKey(e,t){const r=new qe(t,0),s=this.Yr.firstAfterOrEqual(r);return C.resolve(t.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,C.resolve()}ti(e,t){return this.Xr(e)}Xr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Zr(e){const t=this.Xr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
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
 */class vv{constructor(e){this.ni=e,this.docs=function(){return new Pe(H.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,s=this.docs.get(r),i=s?s.size:0,a=this.ni(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:a}),this.size+=a-i,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return C.resolve(r?r.document.mutableCopy():nt.newInvalidDocument(t))}getEntries(e,t){let r=tn();return t.forEach(s=>{const i=this.docs.get(s);r=r.insert(s,i?i.document.mutableCopy():nt.newInvalidDocument(s))}),C.resolve(r)}getDocumentsMatchingQuery(e,t,r,s){let i=tn();const a=t.path,l=new H(a.child("__id-9223372036854775808__")),u=this.docs.getIteratorFrom(l);for(;u.hasNext();){const{key:h,value:{document:f}}=u.getNext();if(!a.isPrefixOf(h.path))break;h.path.length>a.length+1||K0(W0(f),r)<=0||(s.has(f.key)||Fo(t,f))&&(i=i.insert(f.key,f.mutableCopy()))}return C.resolve(i)}getAllFromCollectionGroup(e,t,r,s){J(9500)}ri(e,t){return C.forEach(this.docs,r=>t(r))}newChangeBuffer(e){return new Ev(this)}getSize(e){return C.resolve(this.size)}}class Ev extends dv{constructor(e){super(),this.Or=e}applyChanges(e){const t=[];return this.changes.forEach((r,s)=>{s.isValidDocument()?t.push(this.Or.addEntry(e,s)):this.Or.removeEntry(r)}),C.waitFor(t)}getFromCache(e,t){return this.Or.getEntry(e,t)}getAllFromCache(e,t){return this.Or.getEntries(e,t)}}/**
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
 */class wv{constructor(e){this.persistence=e,this.ii=new gr(t=>Wl(t),Kl),this.lastRemoteSnapshotVersion=Y.min(),this.highestTargetId=0,this.si=0,this.oi=new Zl,this.targetCount=0,this._i=Wr.ar()}forEachTarget(e,t){return this.ii.forEach((r,s)=>t(s)),C.resolve()}getLastRemoteSnapshotVersion(e){return C.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return C.resolve(this.si)}allocateTargetId(e){return this.highestTargetId=this._i.next(),C.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.si&&(this.si=t),C.resolve()}hr(e){this.ii.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this._i=new Wr(t),this.highestTargetId=t),e.sequenceNumber>this.si&&(this.si=e.sequenceNumber)}addTargetData(e,t){return this.hr(t),this.targetCount+=1,C.resolve()}updateTargetData(e,t){return this.hr(t),C.resolve()}removeTargetData(e,t){return this.ii.delete(t.target),this.oi.zr(t.targetId),this.targetCount-=1,C.resolve()}removeTargets(e,t,r){let s=0;const i=[];return this.ii.forEach((a,l)=>{l.sequenceNumber<=t&&r.get(l.targetId)===null&&(this.ii.delete(a),i.push(this.removeMatchingKeysForTargetId(e,l.targetId)),s++)}),C.waitFor(i).next(()=>s)}getTargetCount(e){return C.resolve(this.targetCount)}getTargetData(e,t){const r=this.ii.get(t)||null;return C.resolve(r)}addMatchingKeys(e,t,r){return this.oi.Kr(t,r),C.resolve()}removeMatchingKeys(e,t,r){this.oi.Gr(t,r);const s=this.persistence.referenceDelegate,i=[];return s&&t.forEach(a=>{i.push(s.markPotentiallyOrphaned(e,a))}),C.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this.oi.zr(t),C.resolve()}getMatchingKeysForTargetId(e,t){const r=this.oi.Jr(t);return C.resolve(r)}containsKey(e,t){return C.resolve(this.oi.containsKey(t))}}/**
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
 */class Jf{constructor(e,t){this.ai={},this.overlays={},this.ui=new xo(0),this.ci=!1,this.ci=!0,this.li=new _v,this.referenceDelegate=e(this),this.hi=new wv(this),this.indexManager=new iv,this.remoteDocumentCache=function(s){return new vv(s)}(r=>this.referenceDelegate.Pi(r)),this.serializer=new rv(t),this.Ti=new mv(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ci=!1,Promise.resolve()}get started(){return this.ci}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new gv,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.ai[e.toKey()];return r||(r=new yv(t,this.referenceDelegate),this.ai[e.toKey()]=r),r}getGlobalsCache(){return this.li}getTargetCache(){return this.hi}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ti}runTransaction(e,t,r){$("MemoryPersistence","Starting transaction:",e);const s=new Tv(this.ui.next());return this.referenceDelegate.Ii(),r(s).next(i=>this.referenceDelegate.di(s).next(()=>i)).toPromise().then(i=>(s.raiseOnCommittedEvent(),i))}Ei(e,t){return C.or(Object.values(this.ai).map(r=>()=>r.containsKey(e,t)))}}class Tv extends J0{constructor(e){super(),this.currentSequenceNumber=e}}class ec{constructor(e){this.persistence=e,this.Ai=new Zl,this.Ri=null}static Vi(e){return new ec(e)}get mi(){if(this.Ri)return this.Ri;throw J(60996)}addReference(e,t,r){return this.Ai.addReference(r,t),this.mi.delete(r.toString()),C.resolve()}removeReference(e,t,r){return this.Ai.removeReference(r,t),this.mi.add(r.toString()),C.resolve()}markPotentiallyOrphaned(e,t){return this.mi.add(t.toString()),C.resolve()}removeTarget(e,t){this.Ai.zr(t.targetId).forEach(s=>this.mi.add(s.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next(s=>{s.forEach(i=>this.mi.add(i.toString()))}).next(()=>r.removeTargetData(e,t))}Ii(){this.Ri=new Set}di(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return C.forEach(this.mi,r=>{const s=H.fromPath(r);return this.fi(e,s).next(i=>{i||t.removeEntry(s,Y.min())})}).next(()=>(this.Ri=null,t.apply(e)))}updateLimboDocument(e,t){return this.fi(e,t).next(r=>{r?this.mi.delete(t.toString()):this.mi.add(t.toString())})}Pi(e){return 0}fi(e,t){return C.or([()=>C.resolve(this.Ai.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ei(e,t)])}}class _o{constructor(e,t){this.persistence=e,this.gi=new gr(r=>Z0(r.path),(r,s)=>r.isEqual(s)),this.garbageCollector=hv(this,t)}static Vi(e,t){return new _o(e,t)}Ii(){}di(e){return C.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}mr(e){const t=this.yr(e);return this.persistence.getTargetCache().getTargetCount(e).next(r=>t.next(s=>r+s))}yr(e){let t=0;return this.gr(e,r=>{t++}).next(()=>t)}gr(e,t){return C.forEach(this.gi,(r,s)=>this.Sr(e,r,s).next(i=>i?C.resolve():t(s)))}removeTargets(e,t,r){return this.persistence.getTargetCache().removeTargets(e,t,r)}removeOrphanedDocuments(e,t){let r=0;const s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.ri(e,a=>this.Sr(e,a,t).next(l=>{l||(r++,i.removeEntry(a,Y.min()))})).next(()=>i.apply(e)).next(()=>r)}markPotentiallyOrphaned(e,t){return this.gi.set(t,e.currentSequenceNumber),C.resolve()}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,t,r){return this.gi.set(r,e.currentSequenceNumber),C.resolve()}removeReference(e,t,r){return this.gi.set(r,e.currentSequenceNumber),C.resolve()}updateLimboDocument(e,t){return this.gi.set(t,e.currentSequenceNumber),C.resolve()}Pi(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=Gi(e.data.value)),t}Sr(e,t,r){return C.or([()=>this.persistence.Ei(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const s=this.gi.get(t);return C.resolve(s!==void 0&&s>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
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
 */class tc{constructor(e,t,r,s){this.targetId=e,this.fromCache=t,this.Is=r,this.ds=s}static Es(e,t){let r=re(),s=re();for(const i of t.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new tc(e,t.fromCache,r,s)}}/**
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
 */class Iv{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
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
 */class bv{constructor(){this.As=!1,this.Rs=!1,this.Vs=100,this.fs=function(){return y_()?8:X0(st())>0?6:4}()}initialize(e,t){this.gs=e,this.indexManager=t,this.As=!0}getDocumentsMatchingQuery(e,t,r,s){const i={result:null};return this.ps(e,t).next(a=>{i.result=a}).next(()=>{if(!i.result)return this.ys(e,t,s,r).next(a=>{i.result=a})}).next(()=>{if(i.result)return;const a=new Iv;return this.ws(e,t,a).next(l=>{if(i.result=l,this.Rs)return this.Ss(e,t,a,l.size)})}).next(()=>i.result)}Ss(e,t,r,s){return r.documentReadCount<this.Vs?(Rr()<=ne.DEBUG&&$("QueryEngine","SDK will not create cache indexes for query:",kr(t),"since it only creates cache indexes for collection contains","more than or equal to",this.Vs,"documents"),C.resolve()):(Rr()<=ne.DEBUG&&$("QueryEngine","Query:",kr(t),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.fs*s?(Rr()<=ne.DEBUG&&$("QueryEngine","The SDK decides to create cache indexes for query:",kr(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,Lt(t))):C.resolve())}ps(e,t){if(_h(t))return C.resolve(null);let r=Lt(t);return this.indexManager.getIndexType(e,r).next(s=>s===0?null:(t.limit!==null&&s===1&&(t=dl(t,null,"F"),r=Lt(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next(i=>{const a=re(...i);return this.gs.getDocuments(e,a).next(l=>this.indexManager.getMinOffset(e,r).next(u=>{const h=this.bs(t,l);return this.Ds(t,h,a,u.readTime)?this.ps(e,dl(t,null,"F")):this.vs(e,h,t,u)}))})))}ys(e,t,r,s){return _h(t)||s.isEqual(Y.min())?C.resolve(null):this.gs.getDocuments(e,r).next(i=>{const a=this.bs(t,i);return this.Ds(t,a,r,s)?C.resolve(null):(Rr()<=ne.DEBUG&&$("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),kr(t)),this.vs(e,a,t,G0(s,zs)).next(l=>l))})}bs(e,t){let r=new Ue(Rf(e));return t.forEach((s,i)=>{Fo(e,i)&&(r=r.add(i))}),r}Ds(e,t,r,s){if(e.limit===null)return!1;if(r.size!==t.size)return!0;const i=e.limitType==="F"?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}ws(e,t,r){return Rr()<=ne.DEBUG&&$("QueryEngine","Using full collection scan to execute query:",kr(t)),this.gs.getDocumentsMatchingQuery(e,t,Nn.min(),r)}vs(e,t,r,s){return this.gs.getDocumentsMatchingQuery(e,r,s).next(i=>(t.forEach(a=>{i=i.insert(a.key,a)}),i))}}/**
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
 */const nc="LocalStore",Av=3e8;class Sv{constructor(e,t,r,s){this.persistence=e,this.Cs=t,this.serializer=s,this.Fs=new Pe(te),this.Ms=new gr(i=>Wl(i),Kl),this.xs=new Map,this.Os=e.getRemoteDocumentCache(),this.hi=e.getTargetCache(),this.Ti=e.getBundleCache(),this.Ns(r)}Ns(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new pv(this.Os,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Os.setIndexManager(this.indexManager),this.Cs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.Fs))}}function Rv(n,e,t,r){return new Sv(n,e,t,r)}async function Xf(n,e){const t=Z(n);return await t.persistence.runTransaction("Handle user change","readonly",r=>{let s;return t.mutationQueue.getAllMutationBatches(r).next(i=>(s=i,t.Ns(e),t.mutationQueue.getAllMutationBatches(r))).next(i=>{const a=[],l=[];let u=re();for(const h of s){a.push(h.batchId);for(const f of h.mutations)u=u.add(f.key)}for(const h of i){l.push(h.batchId);for(const f of h.mutations)u=u.add(f.key)}return t.localDocuments.getDocuments(r,u).next(h=>({Bs:h,removedBatchIds:a,addedBatchIds:l}))})})}function kv(n,e){const t=Z(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const s=e.batch.keys(),i=t.Os.newChangeBuffer({trackRemovals:!0});return function(l,u,h,f){const p=h.batch,_=p.keys();let A=C.resolve();return _.forEach(k=>{A=A.next(()=>f.getEntry(u,k)).next(V=>{const N=h.docVersions.get(k);fe(N!==null,48541),V.version.compareTo(N)<0&&(p.applyToRemoteDocument(V,h),V.isValidDocument()&&(V.setReadTime(h.commitVersion),f.addEntry(V)))})}),A.next(()=>l.mutationQueue.removeMutationBatch(u,p))}(t,r,e,i).next(()=>i.apply(r)).next(()=>t.mutationQueue.performConsistencyCheck(r)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(r,s,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(l){let u=re();for(let h=0;h<l.mutationResults.length;++h)l.mutationResults[h].transformResults.length>0&&(u=u.add(l.batch.mutations[h].key));return u}(e))).next(()=>t.localDocuments.getDocuments(r,s))})}function Yf(n){const e=Z(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.hi.getLastRemoteSnapshotVersion(t))}function Pv(n,e){const t=Z(n),r=e.snapshotVersion;let s=t.Fs;return t.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{const a=t.Os.newChangeBuffer({trackRemovals:!0});s=t.Fs;const l=[];e.targetChanges.forEach((f,p)=>{const _=s.get(p);if(!_)return;l.push(t.hi.removeMatchingKeys(i,f.removedDocuments,p).next(()=>t.hi.addMatchingKeys(i,f.addedDocuments,p)));let A=_.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(p)!==null?A=A.withResumeToken(Ke.EMPTY_BYTE_STRING,Y.min()).withLastLimboFreeSnapshotVersion(Y.min()):f.resumeToken.approximateByteSize()>0&&(A=A.withResumeToken(f.resumeToken,r)),s=s.insert(p,A),function(V,N,W){return V.resumeToken.approximateByteSize()===0||N.snapshotVersion.toMicroseconds()-V.snapshotVersion.toMicroseconds()>=Av?!0:W.addedDocuments.size+W.modifiedDocuments.size+W.removedDocuments.size>0}(_,A,f)&&l.push(t.hi.updateTargetData(i,A))});let u=tn(),h=re();if(e.documentUpdates.forEach(f=>{e.resolvedLimboDocuments.has(f)&&l.push(t.persistence.referenceDelegate.updateLimboDocument(i,f))}),l.push(Cv(i,a,e.documentUpdates).next(f=>{u=f.Ls,h=f.ks})),!r.isEqual(Y.min())){const f=t.hi.getLastRemoteSnapshotVersion(i).next(p=>t.hi.setTargetsMetadata(i,i.currentSequenceNumber,r));l.push(f)}return C.waitFor(l).next(()=>a.apply(i)).next(()=>t.localDocuments.getLocalViewOfDocuments(i,u,h)).next(()=>u)}).then(i=>(t.Fs=s,i))}function Cv(n,e,t){let r=re(),s=re();return t.forEach(i=>r=r.add(i)),e.getEntries(n,r).next(i=>{let a=tn();return t.forEach((l,u)=>{const h=i.get(l);u.isFoundDocument()!==h.isFoundDocument()&&(s=s.add(l)),u.isNoDocument()&&u.version.isEqual(Y.min())?(e.removeEntry(l,u.readTime),a=a.insert(l,u)):!h.isValidDocument()||u.version.compareTo(h.version)>0||u.version.compareTo(h.version)===0&&h.hasPendingWrites?(e.addEntry(u),a=a.insert(l,u)):$(nc,"Ignoring outdated watch update for ",l,". Current version:",h.version," Watch version:",u.version)}),{Ls:a,ks:s}})}function Vv(n,e){const t=Z(n);return t.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=zl),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function Nv(n,e){const t=Z(n);return t.persistence.runTransaction("Allocate target","readwrite",r=>{let s;return t.hi.getTargetData(r,e).next(i=>i?(s=i,C.resolve(s)):t.hi.allocateTargetId(r).next(a=>(s=new _n(e,a,"TargetPurposeListen",r.currentSequenceNumber),t.hi.addTargetData(r,s).next(()=>s))))}).then(r=>{const s=t.Fs.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(t.Fs=t.Fs.insert(r.targetId,r),t.Ms.set(e,r.targetId)),r})}async function _l(n,e,t){const r=Z(n),s=r.Fs.get(e),i=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",i,a=>r.persistence.referenceDelegate.removeTarget(a,s))}catch(a){if(!rs(a))throw a;$(nc,`Failed to update sequence numbers for target ${e}: ${a}`)}r.Fs=r.Fs.remove(e),r.Ms.delete(s.target)}function Ch(n,e,t){const r=Z(n);let s=Y.min(),i=re();return r.persistence.runTransaction("Execute query","readwrite",a=>function(u,h,f){const p=Z(u),_=p.Ms.get(f);return _!==void 0?C.resolve(p.Fs.get(_)):p.hi.getTargetData(h,f)}(r,a,Lt(e)).next(l=>{if(l)return s=l.lastLimboFreeSnapshotVersion,r.hi.getMatchingKeysForTargetId(a,l.targetId).next(u=>{i=u})}).next(()=>r.Cs.getDocumentsMatchingQuery(a,e,t?s:Y.min(),t?i:re())).next(l=>(xv(r,yy(e),l),{documents:l,qs:i})))}function xv(n,e,t){let r=n.xs.get(e)||Y.min();t.forEach((s,i)=>{i.readTime.compareTo(r)>0&&(r=i.readTime)}),n.xs.set(e,r)}class Vh{constructor(){this.activeTargetIds=by()}Gs(e){this.activeTargetIds=this.activeTargetIds.add(e)}zs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Ws(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class Dv{constructor(){this.Fo=new Vh,this.Mo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.Fo.Gs(e),this.Mo[e]||"not-current"}updateQueryState(e,t,r){this.Mo[e]=t}removeLocalQueryTarget(e){this.Fo.zs(e)}isLocalQueryTarget(e){return this.Fo.activeTargetIds.has(e)}clearQueryState(e){delete this.Mo[e]}getAllActiveQueryTargets(){return this.Fo.activeTargetIds}isActiveQueryTarget(e){return this.Fo.activeTargetIds.has(e)}start(){return this.Fo=new Vh,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
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
 */class Ov{xo(e){}shutdown(){}}/**
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
 */const Nh="ConnectivityMonitor";class xh{constructor(){this.Oo=()=>this.No(),this.Bo=()=>this.Lo(),this.ko=[],this.qo()}xo(e){this.ko.push(e)}shutdown(){window.removeEventListener("online",this.Oo),window.removeEventListener("offline",this.Bo)}qo(){window.addEventListener("online",this.Oo),window.addEventListener("offline",this.Bo)}No(){$(Nh,"Network connectivity changed: AVAILABLE");for(const e of this.ko)e(0)}Lo(){$(Nh,"Network connectivity changed: UNAVAILABLE");for(const e of this.ko)e(1)}static C(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
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
 */let Ui=null;function yl(){return Ui===null?Ui=function(){return 268435456+Math.round(2147483648*Math.random())}():Ui++,"0x"+Ui.toString(16)}/**
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
 */const La="RestConnection",Mv={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class Lv{get Qo(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.$o=t+"://"+e.host,this.Uo=`projects/${r}/databases/${s}`,this.Ko=this.databaseId.database===ho?`project_id=${r}`:`project_id=${r}&database_id=${s}`}Wo(e,t,r,s,i){const a=yl(),l=this.Go(e,t.toUriEncodedString());$(La,`Sending RPC '${e}' ${a}:`,l,r);const u={"google-cloud-resource-prefix":this.Uo,"x-goog-request-params":this.Ko};this.zo(u,s,i);const{host:h}=new URL(l),f=Zr(h);return this.jo(e,l,u,r,f).then(p=>($(La,`Received RPC '${e}' ${a}: `,p),p),p=>{throw Vn(La,`RPC '${e}' ${a} failed with error: `,p,"url: ",l,"request:",r),p})}Jo(e,t,r,s,i,a){return this.Wo(e,t,r,s,i)}zo(e,t,r){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+ts}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((s,i)=>e[i]=s),r&&r.headers.forEach((s,i)=>e[i]=s)}Go(e,t){const r=Mv[e];return`${this.$o}/v1/${t}:${r}`}terminate(){}}/**
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
 */class Fv{constructor(e){this.Ho=e.Ho,this.Yo=e.Yo}Zo(e){this.Xo=e}e_(e){this.t_=e}n_(e){this.r_=e}onMessage(e){this.i_=e}close(){this.Yo()}send(e){this.Ho(e)}s_(){this.Xo()}o_(){this.t_()}__(e){this.r_(e)}a_(e){this.i_(e)}}/**
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
 */const Ze="WebChannelConnection";class Uv extends Lv{constructor(e){super(e),this.u_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}jo(e,t,r,s,i){const a=yl();return new Promise((l,u)=>{const h=new Yd;h.setWithCredentials(!0),h.listenOnce(Zd.COMPLETE,()=>{try{switch(h.getLastErrorCode()){case Hi.NO_ERROR:const p=h.getResponseJson();$(Ze,`XHR for RPC '${e}' ${a} received:`,JSON.stringify(p)),l(p);break;case Hi.TIMEOUT:$(Ze,`RPC '${e}' ${a} timed out`),u(new U(P.DEADLINE_EXCEEDED,"Request time out"));break;case Hi.HTTP_ERROR:const _=h.getStatus();if($(Ze,`RPC '${e}' ${a} failed with status:`,_,"response text:",h.getResponseText()),_>0){let A=h.getResponseJson();Array.isArray(A)&&(A=A[0]);const k=A==null?void 0:A.error;if(k&&k.status&&k.message){const V=function(W){const z=W.toLowerCase().replace(/_/g,"-");return Object.values(P).indexOf(z)>=0?z:P.UNKNOWN}(k.status);u(new U(V,k.message))}else u(new U(P.UNKNOWN,"Server responded with status "+h.getStatus()))}else u(new U(P.UNAVAILABLE,"Connection failed."));break;default:J(9055,{c_:e,streamId:a,l_:h.getLastErrorCode(),h_:h.getLastError()})}}finally{$(Ze,`RPC '${e}' ${a} completed.`)}});const f=JSON.stringify(s);$(Ze,`RPC '${e}' ${a} sending request:`,s),h.send(t,"POST",f,r,15)})}P_(e,t,r){const s=yl(),i=[this.$o,"/","google.firestore.v1.Firestore","/",e,"/channel"],a=nf(),l=tf(),u={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},h=this.longPollingOptions.timeoutSeconds;h!==void 0&&(u.longPollingTimeout=Math.round(1e3*h)),this.useFetchStreams&&(u.useFetchStreams=!0),this.zo(u.initMessageHeaders,t,r),u.encodeInitMessageHeaders=!0;const f=i.join("");$(Ze,`Creating RPC '${e}' stream ${s}: ${f}`,u);const p=a.createWebChannel(f,u);this.T_(p);let _=!1,A=!1;const k=new Fv({Ho:N=>{A?$(Ze,`Not sending because RPC '${e}' stream ${s} is closed:`,N):(_||($(Ze,`Opening RPC '${e}' stream ${s} transport.`),p.open(),_=!0),$(Ze,`RPC '${e}' stream ${s} sending:`,N),p.send(N))},Yo:()=>p.close()}),V=(N,W,z)=>{N.listen(W,B=>{try{z(B)}catch(j){setTimeout(()=>{throw j},0)}})};return V(p,Rs.EventType.OPEN,()=>{A||($(Ze,`RPC '${e}' stream ${s} transport opened.`),k.s_())}),V(p,Rs.EventType.CLOSE,()=>{A||(A=!0,$(Ze,`RPC '${e}' stream ${s} transport closed`),k.__(),this.I_(p))}),V(p,Rs.EventType.ERROR,N=>{A||(A=!0,Vn(Ze,`RPC '${e}' stream ${s} transport errored. Name:`,N.name,"Message:",N.message),k.__(new U(P.UNAVAILABLE,"The operation could not be completed")))}),V(p,Rs.EventType.MESSAGE,N=>{var W;if(!A){const z=N.data[0];fe(!!z,16349);const B=z,j=(B==null?void 0:B.error)||((W=B[0])===null||W===void 0?void 0:W.error);if(j){$(Ze,`RPC '${e}' stream ${s} received error:`,j);const le=j.status;let q=function(y){const w=Oe[y];if(w!==void 0)return Uf(w)}(le),E=j.message;q===void 0&&(q=P.INTERNAL,E="Unknown error status: "+le+" with message "+j.message),A=!0,k.__(new U(q,E)),p.close()}else $(Ze,`RPC '${e}' stream ${s} received:`,z),k.a_(z)}}),V(l,ef.STAT_EVENT,N=>{N.stat===il.PROXY?$(Ze,`RPC '${e}' stream ${s} detected buffering proxy`):N.stat===il.NOPROXY&&$(Ze,`RPC '${e}' stream ${s} detected no buffering proxy`)}),setTimeout(()=>{k.o_()},0),k}terminate(){this.u_.forEach(e=>e.close()),this.u_=[]}T_(e){this.u_.push(e)}I_(e){this.u_=this.u_.filter(t=>t===e)}}function Fa(){return typeof document<"u"?document:null}/**
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
 */function qo(n){return new jy(n,!0)}/**
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
 */class Zf{constructor(e,t,r=1e3,s=1.5,i=6e4){this.Fi=e,this.timerId=t,this.d_=r,this.E_=s,this.A_=i,this.R_=0,this.V_=null,this.m_=Date.now(),this.reset()}reset(){this.R_=0}f_(){this.R_=this.A_}g_(e){this.cancel();const t=Math.floor(this.R_+this.p_()),r=Math.max(0,Date.now()-this.m_),s=Math.max(0,t-r);s>0&&$("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.R_} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.V_=this.Fi.enqueueAfterDelay(this.timerId,s,()=>(this.m_=Date.now(),e())),this.R_*=this.E_,this.R_<this.d_&&(this.R_=this.d_),this.R_>this.A_&&(this.R_=this.A_)}y_(){this.V_!==null&&(this.V_.skipDelay(),this.V_=null)}cancel(){this.V_!==null&&(this.V_.cancel(),this.V_=null)}p_(){return(Math.random()-.5)*this.R_}}/**
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
 */const Dh="PersistentStream";class ep{constructor(e,t,r,s,i,a,l,u){this.Fi=e,this.w_=r,this.S_=s,this.connection=i,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=l,this.listener=u,this.state=0,this.b_=0,this.D_=null,this.v_=null,this.stream=null,this.C_=0,this.F_=new Zf(e,t)}M_(){return this.state===1||this.state===5||this.x_()}x_(){return this.state===2||this.state===3}start(){this.C_=0,this.state!==4?this.auth():this.O_()}async stop(){this.M_()&&await this.close(0)}N_(){this.state=0,this.F_.reset()}B_(){this.x_()&&this.D_===null&&(this.D_=this.Fi.enqueueAfterDelay(this.w_,6e4,()=>this.L_()))}k_(e){this.q_(),this.stream.send(e)}async L_(){if(this.x_())return this.close(0)}q_(){this.D_&&(this.D_.cancel(),this.D_=null)}Q_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,t){this.q_(),this.Q_(),this.F_.cancel(),this.b_++,e!==4?this.F_.reset():t&&t.code===P.RESOURCE_EXHAUSTED?(en(t.toString()),en("Using maximum backoff delay to prevent overloading the backend."),this.F_.f_()):t&&t.code===P.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.U_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.n_(t)}U_(){}auth(){this.state=1;const e=this.K_(this.b_),t=this.b_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,s])=>{this.b_===t&&this.W_(r,s)},r=>{e(()=>{const s=new U(P.UNKNOWN,"Fetching auth token failed: "+r.message);return this.G_(s)})})}W_(e,t){const r=this.K_(this.b_);this.stream=this.z_(e,t),this.stream.Zo(()=>{r(()=>this.listener.Zo())}),this.stream.e_(()=>{r(()=>(this.state=2,this.v_=this.Fi.enqueueAfterDelay(this.S_,1e4,()=>(this.x_()&&(this.state=3),Promise.resolve())),this.listener.e_()))}),this.stream.n_(s=>{r(()=>this.G_(s))}),this.stream.onMessage(s=>{r(()=>++this.C_==1?this.j_(s):this.onNext(s))})}O_(){this.state=5,this.F_.g_(async()=>{this.state=0,this.start()})}G_(e){return $(Dh,`close with error: ${e}`),this.stream=null,this.close(4,e)}K_(e){return t=>{this.Fi.enqueueAndForget(()=>this.b_===e?t():($(Dh,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class $v extends ep{constructor(e,t,r,s,i,a){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,s,a),this.serializer=i}z_(e,t){return this.connection.P_("Listen",e,t)}j_(e){return this.onNext(e)}onNext(e){this.F_.reset();const t=Gy(this.serializer,e),r=function(i){if(!("targetChange"in i))return Y.min();const a=i.targetChange;return a.targetIds&&a.targetIds.length?Y.min():a.readTime?Ft(a.readTime):Y.min()}(e);return this.listener.J_(t,r)}H_(e){const t={};t.database=gl(this.serializer),t.addTarget=function(i,a){let l;const u=a.target;if(l=ul(u)?{documents:Qy(i,u)}:{query:Jy(i,u).Vt},l.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){l.resumeToken=qf(i,a.resumeToken);const h=fl(i,a.expectedCount);h!==null&&(l.expectedCount=h)}else if(a.snapshotVersion.compareTo(Y.min())>0){l.readTime=go(i,a.snapshotVersion.toTimestamp());const h=fl(i,a.expectedCount);h!==null&&(l.expectedCount=h)}return l}(this.serializer,e);const r=Yy(this.serializer,e);r&&(t.labels=r),this.k_(t)}Y_(e){const t={};t.database=gl(this.serializer),t.removeTarget=e,this.k_(t)}}class Bv extends ep{constructor(e,t,r,s,i,a){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,s,a),this.serializer=i}get Z_(){return this.C_>0}start(){this.lastStreamToken=void 0,super.start()}U_(){this.Z_&&this.X_([])}z_(e,t){return this.connection.P_("Write",e,t)}j_(e){return fe(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,fe(!e.writeResults||e.writeResults.length===0,55816),this.listener.ea()}onNext(e){fe(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.F_.reset();const t=Ky(e.writeResults,e.commitTime),r=Ft(e.commitTime);return this.listener.ta(r,t)}na(){const e={};e.database=gl(this.serializer),this.k_(e)}X_(e){const t={streamToken:this.lastStreamToken,writes:e.map(r=>Wy(this.serializer,r))};this.k_(t)}}/**
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
 */class qv{}class jv extends qv{constructor(e,t,r,s){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=s,this.ra=!1}ia(){if(this.ra)throw new U(P.FAILED_PRECONDITION,"The client has already been terminated.")}Wo(e,t,r,s){return this.ia(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,a])=>this.connection.Wo(e,pl(t,r),s,i,a)).catch(i=>{throw i.name==="FirebaseError"?(i.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new U(P.UNKNOWN,i.toString())})}Jo(e,t,r,s,i){return this.ia(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([a,l])=>this.connection.Jo(e,pl(t,r),s,a,l,i)).catch(a=>{throw a.name==="FirebaseError"?(a.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new U(P.UNKNOWN,a.toString())})}terminate(){this.ra=!0,this.connection.terminate()}}class zv{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.sa=0,this.oa=null,this._a=!0}aa(){this.sa===0&&(this.ua("Unknown"),this.oa=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.oa=null,this.ca("Backend didn't respond within 10 seconds."),this.ua("Offline"),Promise.resolve())))}la(e){this.state==="Online"?this.ua("Unknown"):(this.sa++,this.sa>=1&&(this.ha(),this.ca(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ua("Offline")))}set(e){this.ha(),this.sa=0,e==="Online"&&(this._a=!1),this.ua(e)}ua(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}ca(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this._a?(en(t),this._a=!1):$("OnlineStateTracker",t)}ha(){this.oa!==null&&(this.oa.cancel(),this.oa=null)}}/**
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
 */const fr="RemoteStore";class Hv{constructor(e,t,r,s,i){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.Pa=[],this.Ta=new Map,this.Ia=new Set,this.da=[],this.Ea=i,this.Ea.xo(a=>{r.enqueueAndForget(async()=>{_r(this)&&($(fr,"Restarting streams for network reachability change."),await async function(u){const h=Z(u);h.Ia.add(4),await li(h),h.Aa.set("Unknown"),h.Ia.delete(4),await jo(h)}(this))})}),this.Aa=new zv(r,s)}}async function jo(n){if(_r(n))for(const e of n.da)await e(!0)}async function li(n){for(const e of n.da)await e(!1)}function tp(n,e){const t=Z(n);t.Ta.has(e.targetId)||(t.Ta.set(e.targetId,e),oc(t)?ic(t):is(t).x_()&&sc(t,e))}function rc(n,e){const t=Z(n),r=is(t);t.Ta.delete(e),r.x_()&&np(t,e),t.Ta.size===0&&(r.x_()?r.B_():_r(t)&&t.Aa.set("Unknown"))}function sc(n,e){if(n.Ra.$e(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(Y.min())>0){const t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}is(n).H_(e)}function np(n,e){n.Ra.$e(e),is(n).Y_(e)}function ic(n){n.Ra=new Uy({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),Et:e=>n.Ta.get(e)||null,lt:()=>n.datastore.serializer.databaseId}),is(n).start(),n.Aa.aa()}function oc(n){return _r(n)&&!is(n).M_()&&n.Ta.size>0}function _r(n){return Z(n).Ia.size===0}function rp(n){n.Ra=void 0}async function Gv(n){n.Aa.set("Online")}async function Wv(n){n.Ta.forEach((e,t)=>{sc(n,e)})}async function Kv(n,e){rp(n),oc(n)?(n.Aa.la(e),ic(n)):n.Aa.set("Unknown")}async function Qv(n,e,t){if(n.Aa.set("Online"),e instanceof Bf&&e.state===2&&e.cause)try{await async function(s,i){const a=i.cause;for(const l of i.targetIds)s.Ta.has(l)&&(await s.remoteSyncer.rejectListen(l,a),s.Ta.delete(l),s.Ra.removeTarget(l))}(n,e)}catch(r){$(fr,"Failed to remove targets %s: %s ",e.targetIds.join(","),r),await yo(n,r)}else if(e instanceof Qi?n.Ra.Ye(e):e instanceof $f?n.Ra.it(e):n.Ra.et(e),!t.isEqual(Y.min()))try{const r=await Yf(n.localStore);t.compareTo(r)>=0&&await function(i,a){const l=i.Ra.Pt(a);return l.targetChanges.forEach((u,h)=>{if(u.resumeToken.approximateByteSize()>0){const f=i.Ta.get(h);f&&i.Ta.set(h,f.withResumeToken(u.resumeToken,a))}}),l.targetMismatches.forEach((u,h)=>{const f=i.Ta.get(u);if(!f)return;i.Ta.set(u,f.withResumeToken(Ke.EMPTY_BYTE_STRING,f.snapshotVersion)),np(i,u);const p=new _n(f.target,u,h,f.sequenceNumber);sc(i,p)}),i.remoteSyncer.applyRemoteEvent(l)}(n,t)}catch(r){$(fr,"Failed to raise snapshot:",r),await yo(n,r)}}async function yo(n,e,t){if(!rs(e))throw e;n.Ia.add(1),await li(n),n.Aa.set("Offline"),t||(t=()=>Yf(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{$(fr,"Retrying IndexedDB access"),await t(),n.Ia.delete(1),await jo(n)})}function sp(n,e){return e().catch(t=>yo(n,t,e))}async function zo(n){const e=Z(n),t=Mn(e);let r=e.Pa.length>0?e.Pa[e.Pa.length-1].batchId:zl;for(;Jv(e);)try{const s=await Vv(e.localStore,r);if(s===null){e.Pa.length===0&&t.B_();break}r=s.batchId,Xv(e,s)}catch(s){await yo(e,s)}ip(e)&&op(e)}function Jv(n){return _r(n)&&n.Pa.length<10}function Xv(n,e){n.Pa.push(e);const t=Mn(n);t.x_()&&t.Z_&&t.X_(e.mutations)}function ip(n){return _r(n)&&!Mn(n).M_()&&n.Pa.length>0}function op(n){Mn(n).start()}async function Yv(n){Mn(n).na()}async function Zv(n){const e=Mn(n);for(const t of n.Pa)e.X_(t.mutations)}async function eE(n,e,t){const r=n.Pa.shift(),s=Jl.from(r,e,t);await sp(n,()=>n.remoteSyncer.applySuccessfulWrite(s)),await zo(n)}async function tE(n,e){e&&Mn(n).Z_&&await async function(r,s){if(function(a){return Ly(a)&&a!==P.ABORTED}(s.code)){const i=r.Pa.shift();Mn(r).N_(),await sp(r,()=>r.remoteSyncer.rejectFailedWrite(i.batchId,s)),await zo(r)}}(n,e),ip(n)&&op(n)}async function Oh(n,e){const t=Z(n);t.asyncQueue.verifyOperationInProgress(),$(fr,"RemoteStore received new credentials");const r=_r(t);t.Ia.add(3),await li(t),r&&t.Aa.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.Ia.delete(3),await jo(t)}async function nE(n,e){const t=Z(n);e?(t.Ia.delete(2),await jo(t)):e||(t.Ia.add(2),await li(t),t.Aa.set("Unknown"))}function is(n){return n.Va||(n.Va=function(t,r,s){const i=Z(t);return i.ia(),new $v(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(n.datastore,n.asyncQueue,{Zo:Gv.bind(null,n),e_:Wv.bind(null,n),n_:Kv.bind(null,n),J_:Qv.bind(null,n)}),n.da.push(async e=>{e?(n.Va.N_(),oc(n)?ic(n):n.Aa.set("Unknown")):(await n.Va.stop(),rp(n))})),n.Va}function Mn(n){return n.ma||(n.ma=function(t,r,s){const i=Z(t);return i.ia(),new Bv(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(n.datastore,n.asyncQueue,{Zo:()=>Promise.resolve(),e_:Yv.bind(null,n),n_:tE.bind(null,n),ea:Zv.bind(null,n),ta:eE.bind(null,n)}),n.da.push(async e=>{e?(n.ma.N_(),await zo(n)):(await n.ma.stop(),n.Pa.length>0&&($(fr,`Stopping write stream with ${n.Pa.length} pending writes`),n.Pa=[]))})),n.ma}/**
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
 */class ac{constructor(e,t,r,s,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new In,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(a=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,s,i){const a=Date.now()+r,l=new ac(e,t,a,s,i);return l.start(r),l}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new U(P.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function lc(n,e){if(en("AsyncQueue",`${e}: ${n}`),rs(n))return new U(P.UNAVAILABLE,`${e}: ${n}`);throw n}/**
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
 */class Or{static emptySet(e){return new Or(e.comparator)}constructor(e){this.comparator=e?(t,r)=>e(t,r)||H.comparator(t.key,r.key):(t,r)=>H.comparator(t.key,r.key),this.keyedMap=ks(),this.sortedSet=new Pe(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,r)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof Or)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const r=new Or;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}}/**
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
 */class Mh{constructor(){this.fa=new Pe(H.comparator)}track(e){const t=e.doc.key,r=this.fa.get(t);r?e.type!==0&&r.type===3?this.fa=this.fa.insert(t,e):e.type===3&&r.type!==1?this.fa=this.fa.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.fa=this.fa.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.fa=this.fa.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.fa=this.fa.remove(t):e.type===1&&r.type===2?this.fa=this.fa.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.fa=this.fa.insert(t,{type:2,doc:e.doc}):J(63341,{At:e,ga:r}):this.fa=this.fa.insert(t,e)}pa(){const e=[];return this.fa.inorderTraversal((t,r)=>{e.push(r)}),e}}class Kr{constructor(e,t,r,s,i,a,l,u,h){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=a,this.syncStateChanged=l,this.excludesMetadataChanges=u,this.hasCachedResults=h}static fromInitialDocuments(e,t,r,s,i){const a=[];return t.forEach(l=>{a.push({type:0,doc:l})}),new Kr(e,t,Or.emptySet(t),a,r,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&Lo(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let s=0;s<t.length;s++)if(t[s].type!==r[s].type||!t[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
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
 */class rE{constructor(){this.ya=void 0,this.wa=[]}Sa(){return this.wa.some(e=>e.ba())}}class sE{constructor(){this.queries=Lh(),this.onlineState="Unknown",this.Da=new Set}terminate(){(function(t,r){const s=Z(t),i=s.queries;s.queries=Lh(),i.forEach((a,l)=>{for(const u of l.wa)u.onError(r)})})(this,new U(P.ABORTED,"Firestore shutting down"))}}function Lh(){return new gr(n=>Sf(n),Lo)}async function ap(n,e){const t=Z(n);let r=3;const s=e.query;let i=t.queries.get(s);i?!i.Sa()&&e.ba()&&(r=2):(i=new rE,r=e.ba()?0:1);try{switch(r){case 0:i.ya=await t.onListen(s,!0);break;case 1:i.ya=await t.onListen(s,!1);break;case 2:await t.onFirstRemoteStoreListen(s)}}catch(a){const l=lc(a,`Initialization of query '${kr(e.query)}' failed`);return void e.onError(l)}t.queries.set(s,i),i.wa.push(e),e.va(t.onlineState),i.ya&&e.Ca(i.ya)&&cc(t)}async function lp(n,e){const t=Z(n),r=e.query;let s=3;const i=t.queries.get(r);if(i){const a=i.wa.indexOf(e);a>=0&&(i.wa.splice(a,1),i.wa.length===0?s=e.ba()?0:1:!i.Sa()&&e.ba()&&(s=2))}switch(s){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function iE(n,e){const t=Z(n);let r=!1;for(const s of e){const i=s.query,a=t.queries.get(i);if(a){for(const l of a.wa)l.Ca(s)&&(r=!0);a.ya=s}}r&&cc(t)}function oE(n,e,t){const r=Z(n),s=r.queries.get(e);if(s)for(const i of s.wa)i.onError(t);r.queries.delete(e)}function cc(n){n.Da.forEach(e=>{e.next()})}var vl,Fh;(Fh=vl||(vl={})).Fa="default",Fh.Cache="cache";class cp{constructor(e,t,r){this.query=e,this.Ma=t,this.xa=!1,this.Oa=null,this.onlineState="Unknown",this.options=r||{}}Ca(e){if(!this.options.includeMetadataChanges){const r=[];for(const s of e.docChanges)s.type!==3&&r.push(s);e=new Kr(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.xa?this.Na(e)&&(this.Ma.next(e),t=!0):this.Ba(e,this.onlineState)&&(this.La(e),t=!0),this.Oa=e,t}onError(e){this.Ma.error(e)}va(e){this.onlineState=e;let t=!1;return this.Oa&&!this.xa&&this.Ba(this.Oa,e)&&(this.La(this.Oa),t=!0),t}Ba(e,t){if(!e.fromCache||!this.ba())return!0;const r=t!=="Offline";return(!this.options.ka||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}Na(e){if(e.docChanges.length>0)return!0;const t=this.Oa&&this.Oa.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}La(e){e=Kr.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.xa=!0,this.Ma.next(e)}ba(){return this.options.source!==vl.Cache}}/**
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
 */class up{constructor(e){this.key=e}}class hp{constructor(e){this.key=e}}class aE{constructor(e,t){this.query=e,this.Ha=t,this.Ya=null,this.hasCachedResults=!1,this.current=!1,this.Za=re(),this.mutatedKeys=re(),this.Xa=Rf(e),this.eu=new Or(this.Xa)}get tu(){return this.Ha}nu(e,t){const r=t?t.ru:new Mh,s=t?t.eu:this.eu;let i=t?t.mutatedKeys:this.mutatedKeys,a=s,l=!1;const u=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,h=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal((f,p)=>{const _=s.get(f),A=Fo(this.query,p)?p:null,k=!!_&&this.mutatedKeys.has(_.key),V=!!A&&(A.hasLocalMutations||this.mutatedKeys.has(A.key)&&A.hasCommittedMutations);let N=!1;_&&A?_.data.isEqual(A.data)?k!==V&&(r.track({type:3,doc:A}),N=!0):this.iu(_,A)||(r.track({type:2,doc:A}),N=!0,(u&&this.Xa(A,u)>0||h&&this.Xa(A,h)<0)&&(l=!0)):!_&&A?(r.track({type:0,doc:A}),N=!0):_&&!A&&(r.track({type:1,doc:_}),N=!0,(u||h)&&(l=!0)),N&&(A?(a=a.add(A),i=V?i.add(f):i.delete(f)):(a=a.delete(f),i=i.delete(f)))}),this.query.limit!==null)for(;a.size>this.query.limit;){const f=this.query.limitType==="F"?a.last():a.first();a=a.delete(f.key),i=i.delete(f.key),r.track({type:1,doc:f})}return{eu:a,ru:r,Ds:l,mutatedKeys:i}}iu(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,s){const i=this.eu;this.eu=e.eu,this.mutatedKeys=e.mutatedKeys;const a=e.ru.pa();a.sort((f,p)=>function(A,k){const V=N=>{switch(N){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return J(20277,{At:N})}};return V(A)-V(k)}(f.type,p.type)||this.Xa(f.doc,p.doc)),this.su(r),s=s!=null&&s;const l=t&&!s?this.ou():[],u=this.Za.size===0&&this.current&&!s?1:0,h=u!==this.Ya;return this.Ya=u,a.length!==0||h?{snapshot:new Kr(this.query,e.eu,i,a,e.mutatedKeys,u===0,h,!1,!!r&&r.resumeToken.approximateByteSize()>0),_u:l}:{_u:l}}va(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({eu:this.eu,ru:new Mh,mutatedKeys:this.mutatedKeys,Ds:!1},!1)):{_u:[]}}au(e){return!this.Ha.has(e)&&!!this.eu.has(e)&&!this.eu.get(e).hasLocalMutations}su(e){e&&(e.addedDocuments.forEach(t=>this.Ha=this.Ha.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.Ha=this.Ha.delete(t)),this.current=e.current)}ou(){if(!this.current)return[];const e=this.Za;this.Za=re(),this.eu.forEach(r=>{this.au(r.key)&&(this.Za=this.Za.add(r.key))});const t=[];return e.forEach(r=>{this.Za.has(r)||t.push(new hp(r))}),this.Za.forEach(r=>{e.has(r)||t.push(new up(r))}),t}uu(e){this.Ha=e.qs,this.Za=re();const t=this.nu(e.documents);return this.applyChanges(t,!0)}cu(){return Kr.fromInitialDocuments(this.query,this.eu,this.mutatedKeys,this.Ya===0,this.hasCachedResults)}}const uc="SyncEngine";class lE{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class cE{constructor(e){this.key=e,this.lu=!1}}class uE{constructor(e,t,r,s,i,a){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=a,this.hu={},this.Pu=new gr(l=>Sf(l),Lo),this.Tu=new Map,this.Iu=new Set,this.du=new Pe(H.comparator),this.Eu=new Map,this.Au=new Zl,this.Ru={},this.Vu=new Map,this.mu=Wr.ur(),this.onlineState="Unknown",this.fu=void 0}get isPrimaryClient(){return this.fu===!0}}async function hE(n,e,t=!0){const r=_p(n);let s;const i=r.Pu.get(e);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.cu()):s=await dp(r,e,t,!0),s}async function dE(n,e){const t=_p(n);await dp(t,e,!0,!1)}async function dp(n,e,t,r){const s=await Nv(n.localStore,Lt(e)),i=s.targetId,a=n.sharedClientState.addLocalQueryTarget(i,t);let l;return r&&(l=await fE(n,e,i,a==="current",s.resumeToken)),n.isPrimaryClient&&t&&tp(n.remoteStore,s),l}async function fE(n,e,t,r,s){n.gu=(p,_,A)=>async function(V,N,W,z){let B=N.view.nu(W);B.Ds&&(B=await Ch(V.localStore,N.query,!1).then(({documents:E})=>N.view.nu(E,B)));const j=z&&z.targetChanges.get(N.targetId),le=z&&z.targetMismatches.get(N.targetId)!=null,q=N.view.applyChanges(B,V.isPrimaryClient,j,le);return $h(V,N.targetId,q._u),q.snapshot}(n,p,_,A);const i=await Ch(n.localStore,e,!0),a=new aE(e,i.qs),l=a.nu(i.documents),u=ai.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",s),h=a.applyChanges(l,n.isPrimaryClient,u);$h(n,t,h._u);const f=new lE(e,t,a);return n.Pu.set(e,f),n.Tu.has(t)?n.Tu.get(t).push(e):n.Tu.set(t,[e]),h.snapshot}async function pE(n,e,t){const r=Z(n),s=r.Pu.get(e),i=r.Tu.get(s.targetId);if(i.length>1)return r.Tu.set(s.targetId,i.filter(a=>!Lo(a,e))),void r.Pu.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await _l(r.localStore,s.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(s.targetId),t&&rc(r.remoteStore,s.targetId),El(r,s.targetId)}).catch(ns)):(El(r,s.targetId),await _l(r.localStore,s.targetId,!0))}async function mE(n,e){const t=Z(n),r=t.Pu.get(e),s=t.Tu.get(r.targetId);t.isPrimaryClient&&s.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),rc(t.remoteStore,r.targetId))}async function gE(n,e,t){const r=IE(n);try{const s=await function(a,l){const u=Z(a),h=be.now(),f=l.reduce((A,k)=>A.add(k.key),re());let p,_;return u.persistence.runTransaction("Locally write mutations","readwrite",A=>{let k=tn(),V=re();return u.Os.getEntries(A,f).next(N=>{k=N,k.forEach((W,z)=>{z.isValidDocument()||(V=V.add(W))})}).next(()=>u.localDocuments.getOverlayedDocuments(A,k)).next(N=>{p=N;const W=[];for(const z of l){const B=Ny(z,p.get(z.key).overlayedDocument);B!=null&&W.push(new $n(z.key,B,yf(B.value.mapValue),Rt.exists(!0)))}return u.mutationQueue.addMutationBatch(A,h,W,l)}).next(N=>{_=N;const W=N.applyToLocalDocumentSet(p,V);return u.documentOverlayCache.saveOverlays(A,N.batchId,W)})}).then(()=>({batchId:_.batchId,changes:Pf(p)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(s.batchId),function(a,l,u){let h=a.Ru[a.currentUser.toKey()];h||(h=new Pe(te)),h=h.insert(l,u),a.Ru[a.currentUser.toKey()]=h}(r,s.batchId,t),await ci(r,s.changes),await zo(r.remoteStore)}catch(s){const i=lc(s,"Failed to persist write");t.reject(i)}}async function fp(n,e){const t=Z(n);try{const r=await Pv(t.localStore,e);e.targetChanges.forEach((s,i)=>{const a=t.Eu.get(i);a&&(fe(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?a.lu=!0:s.modifiedDocuments.size>0?fe(a.lu,14607):s.removedDocuments.size>0&&(fe(a.lu,42227),a.lu=!1))}),await ci(t,r,e)}catch(r){await ns(r)}}function Uh(n,e,t){const r=Z(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){const s=[];r.Pu.forEach((i,a)=>{const l=a.view.va(e);l.snapshot&&s.push(l.snapshot)}),function(a,l){const u=Z(a);u.onlineState=l;let h=!1;u.queries.forEach((f,p)=>{for(const _ of p.wa)_.va(l)&&(h=!0)}),h&&cc(u)}(r.eventManager,e),s.length&&r.hu.J_(s),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function _E(n,e,t){const r=Z(n);r.sharedClientState.updateQueryState(e,"rejected",t);const s=r.Eu.get(e),i=s&&s.key;if(i){let a=new Pe(H.comparator);a=a.insert(i,nt.newNoDocument(i,Y.min()));const l=re().add(i),u=new Bo(Y.min(),new Map,new Pe(te),a,l);await fp(r,u),r.du=r.du.remove(i),r.Eu.delete(e),hc(r)}else await _l(r.localStore,e,!1).then(()=>El(r,e,t)).catch(ns)}async function yE(n,e){const t=Z(n),r=e.batch.batchId;try{const s=await kv(t.localStore,e);mp(t,r,null),pp(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await ci(t,s)}catch(s){await ns(s)}}async function vE(n,e,t){const r=Z(n);try{const s=await function(a,l){const u=Z(a);return u.persistence.runTransaction("Reject batch","readwrite-primary",h=>{let f;return u.mutationQueue.lookupMutationBatch(h,l).next(p=>(fe(p!==null,37113),f=p.keys(),u.mutationQueue.removeMutationBatch(h,p))).next(()=>u.mutationQueue.performConsistencyCheck(h)).next(()=>u.documentOverlayCache.removeOverlaysForBatchId(h,f,l)).next(()=>u.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(h,f)).next(()=>u.localDocuments.getDocuments(h,f))})}(r.localStore,e);mp(r,e,t),pp(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await ci(r,s)}catch(s){await ns(s)}}function pp(n,e){(n.Vu.get(e)||[]).forEach(t=>{t.resolve()}),n.Vu.delete(e)}function mp(n,e,t){const r=Z(n);let s=r.Ru[r.currentUser.toKey()];if(s){const i=s.get(e);i&&(t?i.reject(t):i.resolve(),s=s.remove(e)),r.Ru[r.currentUser.toKey()]=s}}function El(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const r of n.Tu.get(e))n.Pu.delete(r),t&&n.hu.pu(r,t);n.Tu.delete(e),n.isPrimaryClient&&n.Au.zr(e).forEach(r=>{n.Au.containsKey(r)||gp(n,r)})}function gp(n,e){n.Iu.delete(e.path.canonicalString());const t=n.du.get(e);t!==null&&(rc(n.remoteStore,t),n.du=n.du.remove(e),n.Eu.delete(t),hc(n))}function $h(n,e,t){for(const r of t)r instanceof up?(n.Au.addReference(r.key,e),EE(n,r)):r instanceof hp?($(uc,"Document no longer in limbo: "+r.key),n.Au.removeReference(r.key,e),n.Au.containsKey(r.key)||gp(n,r.key)):J(19791,{yu:r})}function EE(n,e){const t=e.key,r=t.path.canonicalString();n.du.get(t)||n.Iu.has(r)||($(uc,"New document in limbo: "+t),n.Iu.add(r),hc(n))}function hc(n){for(;n.Iu.size>0&&n.du.size<n.maxConcurrentLimboResolutions;){const e=n.Iu.values().next().value;n.Iu.delete(e);const t=new H(Ee.fromString(e)),r=n.mu.next();n.Eu.set(r,new cE(t)),n.du=n.du.insert(t,r),tp(n.remoteStore,new _n(Lt(Mo(t.path)),r,"TargetPurposeLimboResolution",xo.ue))}}async function ci(n,e,t){const r=Z(n),s=[],i=[],a=[];r.Pu.isEmpty()||(r.Pu.forEach((l,u)=>{a.push(r.gu(u,e,t).then(h=>{var f;if((h||t)&&r.isPrimaryClient){const p=h?!h.fromCache:(f=t==null?void 0:t.targetChanges.get(u.targetId))===null||f===void 0?void 0:f.current;r.sharedClientState.updateQueryState(u.targetId,p?"current":"not-current")}if(h){s.push(h);const p=tc.Es(u.targetId,h);i.push(p)}}))}),await Promise.all(a),r.hu.J_(s),await async function(u,h){const f=Z(u);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",p=>C.forEach(h,_=>C.forEach(_.Is,A=>f.persistence.referenceDelegate.addReference(p,_.targetId,A)).next(()=>C.forEach(_.ds,A=>f.persistence.referenceDelegate.removeReference(p,_.targetId,A)))))}catch(p){if(!rs(p))throw p;$(nc,"Failed to update sequence numbers: "+p)}for(const p of h){const _=p.targetId;if(!p.fromCache){const A=f.Fs.get(_),k=A.snapshotVersion,V=A.withLastLimboFreeSnapshotVersion(k);f.Fs=f.Fs.insert(_,V)}}}(r.localStore,i))}async function wE(n,e){const t=Z(n);if(!t.currentUser.isEqual(e)){$(uc,"User change. New user:",e.toKey());const r=await Xf(t.localStore,e);t.currentUser=e,function(i,a){i.Vu.forEach(l=>{l.forEach(u=>{u.reject(new U(P.CANCELLED,a))})}),i.Vu.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await ci(t,r.Bs)}}function TE(n,e){const t=Z(n),r=t.Eu.get(e);if(r&&r.lu)return re().add(r.key);{let s=re();const i=t.Tu.get(e);if(!i)return s;for(const a of i){const l=t.Pu.get(a);s=s.unionWith(l.view.tu)}return s}}function _p(n){const e=Z(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=fp.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=TE.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=_E.bind(null,e),e.hu.J_=iE.bind(null,e.eventManager),e.hu.pu=oE.bind(null,e.eventManager),e}function IE(n){const e=Z(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=yE.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=vE.bind(null,e),e}class vo{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=qo(e.databaseInfo.databaseId),this.sharedClientState=this.bu(e),this.persistence=this.Du(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Cu(e,this.localStore),this.indexBackfillerScheduler=this.Fu(e,this.localStore)}Cu(e,t){return null}Fu(e,t){return null}vu(e){return Rv(this.persistence,new bv,e.initialUser,this.serializer)}Du(e){return new Jf(ec.Vi,this.serializer)}bu(e){return new Dv}async terminate(){var e,t;(e=this.gcScheduler)===null||e===void 0||e.stop(),(t=this.indexBackfillerScheduler)===null||t===void 0||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}vo.provider={build:()=>new vo};class bE extends vo{constructor(e){super(),this.cacheSizeBytes=e}Cu(e,t){fe(this.persistence.referenceDelegate instanceof _o,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new cv(r,e.asyncQueue,t)}Du(e){const t=this.cacheSizeBytes!==void 0?ht.withCacheSize(this.cacheSizeBytes):ht.DEFAULT;return new Jf(r=>_o.Vi(r,t),this.serializer)}}class wl{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>Uh(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=wE.bind(null,this.syncEngine),await nE(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new sE}()}createDatastore(e){const t=qo(e.databaseInfo.databaseId),r=function(i){return new Uv(i)}(e.databaseInfo);return function(i,a,l,u){return new jv(i,a,l,u)}(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return function(r,s,i,a,l){return new Hv(r,s,i,a,l)}(this.localStore,this.datastore,e.asyncQueue,t=>Uh(this.syncEngine,t,0),function(){return xh.C()?new xh:new Ov}())}createSyncEngine(e,t){return function(s,i,a,l,u,h,f){const p=new uE(s,i,a,l,u,h);return f&&(p.fu=!0),p}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(s){const i=Z(s);$(fr,"RemoteStore shutting down."),i.Ia.add(5),await li(i),i.Ea.shutdown(),i.Aa.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(t=this.eventManager)===null||t===void 0||t.terminate()}}wl.provider={build:()=>new wl};/**
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
 */class yp{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.xu(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.xu(this.observer.error,e):en("Uncaught Error in snapshot listener:",e.toString()))}Ou(){this.muted=!0}xu(e,t){setTimeout(()=>{this.muted||e(t)},0)}}/**
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
 */const Ln="FirestoreClient";class AE{constructor(e,t,r,s,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this.databaseInfo=s,this.user=tt.UNAUTHENTICATED,this.clientId=jl.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(r,async a=>{$(Ln,"Received user=",a.uid),await this.authCredentialListener(a),this.user=a}),this.appCheckCredentials.start(r,a=>($(Ln,"Received new app check token=",a),this.appCheckCredentialListener(a,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new In;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=lc(t,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function Ua(n,e){n.asyncQueue.verifyOperationInProgress(),$(Ln,"Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener(async s=>{r.isEqual(s)||(await Xf(e.localStore,s),r=s)}),e.persistence.setDatabaseDeletedListener(()=>{Vn("Terminating Firestore due to IndexedDb database deletion"),n.terminate().then(()=>{$("Terminating Firestore due to IndexedDb database deletion completed successfully")}).catch(s=>{Vn("Terminating Firestore due to IndexedDb database deletion failed",s)})}),n._offlineComponents=e}async function Bh(n,e){n.asyncQueue.verifyOperationInProgress();const t=await SE(n);$(Ln,"Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener(r=>Oh(e.remoteStore,r)),n.setAppCheckTokenChangeListener((r,s)=>Oh(e.remoteStore,s)),n._onlineComponents=e}async function SE(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){$(Ln,"Using user provided OfflineComponentProvider");try{await Ua(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!function(s){return s.name==="FirebaseError"?s.code===P.FAILED_PRECONDITION||s.code===P.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11}(t))throw t;Vn("Error using user provided cache. Falling back to memory cache: "+t),await Ua(n,new vo)}}else $(Ln,"Using default OfflineComponentProvider"),await Ua(n,new bE(void 0));return n._offlineComponents}async function vp(n){return n._onlineComponents||(n._uninitializedComponentsProvider?($(Ln,"Using user provided OnlineComponentProvider"),await Bh(n,n._uninitializedComponentsProvider._online)):($(Ln,"Using default OnlineComponentProvider"),await Bh(n,new wl))),n._onlineComponents}function RE(n){return vp(n).then(e=>e.syncEngine)}async function Tl(n){const e=await vp(n),t=e.eventManager;return t.onListen=hE.bind(null,e.syncEngine),t.onUnlisten=pE.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=dE.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=mE.bind(null,e.syncEngine),t}function kE(n,e,t={}){const r=new In;return n.asyncQueue.enqueueAndForget(async()=>function(i,a,l,u,h){const f=new yp({next:_=>{f.Ou(),a.enqueueAndForget(()=>lp(i,p));const A=_.docs.has(l);!A&&_.fromCache?h.reject(new U(P.UNAVAILABLE,"Failed to get document because the client is offline.")):A&&_.fromCache&&u&&u.source==="server"?h.reject(new U(P.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):h.resolve(_)},error:_=>h.reject(_)}),p=new cp(Mo(l.path),f,{includeMetadataChanges:!0,ka:!0});return ap(i,p)}(await Tl(n),n.asyncQueue,e,t,r)),r.promise}/**
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
 */function Ep(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
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
 */const qh=new Map;/**
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
 */const wp="firestore.googleapis.com",jh=!0;class zh{constructor(e){var t,r;if(e.host===void 0){if(e.ssl!==void 0)throw new U(P.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=wp,this.ssl=jh}else this.host=e.host,this.ssl=(t=e.ssl)!==null&&t!==void 0?t:jh;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=Qf;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<av)throw new U(P.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}H0("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Ep((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(i){if(i.timeoutSeconds!==void 0){if(isNaN(i.timeoutSeconds))throw new U(P.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (must not be NaN)`);if(i.timeoutSeconds<5)throw new U(P.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (minimum allowed value is 5)`);if(i.timeoutSeconds>30)throw new U(P.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,s){return r.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Ho{constructor(e,t,r,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new zh({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new U(P.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new U(P.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new zh(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new M0;switch(r.type){case"firstParty":return new $0(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new U(P.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const r=qh.get(t);r&&($("ComponentProvider","Removing Datastore"),qh.delete(t),r.terminate())}(this),Promise.resolve()}}function PE(n,e,t,r={}){var s;n=St(n,Ho);const i=Zr(e),a=n._getSettings(),l=Object.assign(Object.assign({},a),{emulatorOptions:n._getEmulatorOptions()}),u=`${e}:${t}`;i&&(jd(`https://${u}`),zd("Firestore",!0)),a.host!==wp&&a.host!==u&&Vn("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const h=Object.assign(Object.assign({},a),{host:u,ssl:i,emulatorOptions:r});if(!ur(h,l)&&(n._setSettings(h),r.mockUserToken)){let f,p;if(typeof r.mockUserToken=="string")f=r.mockUserToken,p=tt.MOCK_USER;else{f=c_(r.mockUserToken,(s=n._app)===null||s===void 0?void 0:s.options.projectId);const _=r.mockUserToken.sub||r.mockUserToken.user_id;if(!_)throw new U(P.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");p=new tt(_)}n._authCredentials=new L0(new sf(f,p))}}/**
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
 */class yr{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new yr(this.firestore,e,this._query)}}class Ne{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new bn(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new Ne(this.firestore,e,this._key)}toJSON(){return{type:Ne._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,r){if(ii(t,Ne._jsonSchema))return new Ne(e,r||null,new H(Ee.fromString(t.referencePath)))}}Ne._jsonSchemaVersion="firestore/documentReference/1.0",Ne._jsonSchema={type:Le("string",Ne._jsonSchemaVersion),referencePath:Le("string")};class bn extends yr{constructor(e,t,r){super(e,t,Mo(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new Ne(this.firestore,null,new H(e))}withConverter(e){return new bn(this.firestore,e,this._path)}}function $a(n,e,...t){if(n=We(n),af("collection","path",e),n instanceof Ho){const r=Ee.fromString(e,...t);return rh(r),new bn(n,null,r)}{if(!(n instanceof Ne||n instanceof bn))throw new U(P.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(Ee.fromString(e,...t));return rh(r),new bn(n.firestore,null,r)}}function Xn(n,e,...t){if(n=We(n),arguments.length===1&&(e=jl.newId()),af("doc","path",e),n instanceof Ho){const r=Ee.fromString(e,...t);return nh(r),new Ne(n,null,new H(r))}{if(!(n instanceof Ne||n instanceof bn))throw new U(P.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(Ee.fromString(e,...t));return nh(r),new Ne(n.firestore,n instanceof bn?n.converter:null,new H(r))}}/**
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
 */const Hh="AsyncQueue";class Gh{constructor(e=Promise.resolve()){this.Zu=[],this.Xu=!1,this.ec=[],this.tc=null,this.nc=!1,this.rc=!1,this.sc=[],this.F_=new Zf(this,"async_queue_retry"),this.oc=()=>{const r=Fa();r&&$(Hh,"Visibility state changed to "+r.visibilityState),this.F_.y_()},this._c=e;const t=Fa();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.oc)}get isShuttingDown(){return this.Xu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.ac(),this.uc(e)}enterRestrictedMode(e){if(!this.Xu){this.Xu=!0,this.rc=e||!1;const t=Fa();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.oc)}}enqueue(e){if(this.ac(),this.Xu)return new Promise(()=>{});const t=new In;return this.uc(()=>this.Xu&&this.rc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Zu.push(e),this.cc()))}async cc(){if(this.Zu.length!==0){try{await this.Zu[0](),this.Zu.shift(),this.F_.reset()}catch(e){if(!rs(e))throw e;$(Hh,"Operation failed with retryable error: "+e)}this.Zu.length>0&&this.F_.g_(()=>this.cc())}}uc(e){const t=this._c.then(()=>(this.nc=!0,e().catch(r=>{throw this.tc=r,this.nc=!1,en("INTERNAL UNHANDLED ERROR: ",Wh(r)),r}).then(r=>(this.nc=!1,r))));return this._c=t,t}enqueueAfterDelay(e,t,r){this.ac(),this.sc.indexOf(e)>-1&&(t=0);const s=ac.createAndSchedule(this,e,t,r,i=>this.lc(i));return this.ec.push(s),s}ac(){this.tc&&J(47125,{hc:Wh(this.tc)})}verifyOperationInProgress(){}async Pc(){let e;do e=this._c,await e;while(e!==this._c)}Tc(e){for(const t of this.ec)if(t.timerId===e)return!0;return!1}Ic(e){return this.Pc().then(()=>{this.ec.sort((t,r)=>t.targetTimeMs-r.targetTimeMs);for(const t of this.ec)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Pc()})}dc(e){this.sc.push(e)}lc(e){const t=this.ec.indexOf(e);this.ec.splice(t,1)}}function Wh(n){let e=n.message||"";return n.stack&&(e=n.stack.includes(n.message)?n.stack:n.message+`
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
 */function Kh(n){return function(t,r){if(typeof t!="object"||t===null)return!1;const s=t;for(const i of r)if(i in s&&typeof s[i]=="function")return!0;return!1}(n,["next","error","complete"])}class pr extends Ho{constructor(e,t,r,s){super(e,t,r,s),this.type="firestore",this._queue=new Gh,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Gh(e),this._firestoreClient=void 0,await e}}}function CE(n,e){const t=typeof n=="object"?n:Kd(),r=typeof n=="string"?n:ho,s=Bl(t,"firestore").getImmediate({identifier:r});if(!s._initialized){const i=a_("firestore");i&&PE(s,...i)}return s}function dc(n){if(n._terminated)throw new U(P.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||VE(n),n._firestoreClient}function VE(n){var e,t,r;const s=n._freezeSettings(),i=function(l,u,h,f){return new ny(l,u,h,f.host,f.ssl,f.experimentalForceLongPolling,f.experimentalAutoDetectLongPolling,Ep(f.experimentalLongPollingOptions),f.useFetchStreams,f.isUsingEmulator)}(n._databaseId,((e=n._app)===null||e===void 0?void 0:e.options.appId)||"",n._persistenceKey,s);n._componentsProvider||!((t=s.localCache)===null||t===void 0)&&t._offlineComponentProvider&&(!((r=s.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(n._componentsProvider={_offline:s.localCache._offlineComponentProvider,_online:s.localCache._onlineComponentProvider}),n._firestoreClient=new AE(n._authCredentials,n._appCheckCredentials,n._queue,i,n._componentsProvider&&function(l){const u=l==null?void 0:l._online.build();return{_offline:l==null?void 0:l._offline.build(u),_online:u}}(n._componentsProvider))}/**
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
 */class yt{constructor(e){this._byteString=e}static fromBase64String(e){try{return new yt(Ke.fromBase64String(e))}catch(t){throw new U(P.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new yt(Ke.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:yt._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(ii(e,yt._jsonSchema))return yt.fromBase64String(e.bytes)}}yt._jsonSchemaVersion="firestore/bytes/1.0",yt._jsonSchema={type:Le("string",yt._jsonSchemaVersion),bytes:Le("string")};/**
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
 */class Go{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new U(P.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Ge(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
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
 */class Wo{constructor(e){this._methodName=e}}/**
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
 */class Ut{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new U(P.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new U(P.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return te(this._lat,e._lat)||te(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:Ut._jsonSchemaVersion}}static fromJSON(e){if(ii(e,Ut._jsonSchema))return new Ut(e.latitude,e.longitude)}}Ut._jsonSchemaVersion="firestore/geoPoint/1.0",Ut._jsonSchema={type:Le("string",Ut._jsonSchemaVersion),latitude:Le("number"),longitude:Le("number")};/**
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
 */class $t{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,s){if(r.length!==s.length)return!1;for(let i=0;i<r.length;++i)if(r[i]!==s[i])return!1;return!0}(this._values,e._values)}toJSON(){return{type:$t._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(ii(e,$t._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(t=>typeof t=="number"))return new $t(e.vectorValues);throw new U(P.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}$t._jsonSchemaVersion="firestore/vectorValue/1.0",$t._jsonSchema={type:Le("string",$t._jsonSchemaVersion),vectorValues:Le("object")};/**
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
 */const NE=/^__.*__$/;class xE{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new $n(e,this.data,this.fieldMask,t,this.fieldTransforms):new oi(e,this.data,t,this.fieldTransforms)}}class Tp{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return new $n(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function Ip(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw J(40011,{Ec:n})}}class fc{constructor(e,t,r,s,i,a){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=s,i===void 0&&this.Ac(),this.fieldTransforms=i||[],this.fieldMask=a||[]}get path(){return this.settings.path}get Ec(){return this.settings.Ec}Rc(e){return new fc(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Vc(e){var t;const r=(t=this.path)===null||t===void 0?void 0:t.child(e),s=this.Rc({path:r,mc:!1});return s.fc(e),s}gc(e){var t;const r=(t=this.path)===null||t===void 0?void 0:t.child(e),s=this.Rc({path:r,mc:!1});return s.Ac(),s}yc(e){return this.Rc({path:void 0,mc:!0})}wc(e){return Eo(e,this.settings.methodName,this.settings.Sc||!1,this.path,this.settings.bc)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}Ac(){if(this.path)for(let e=0;e<this.path.length;e++)this.fc(this.path.get(e))}fc(e){if(e.length===0)throw this.wc("Document fields must not be empty");if(Ip(this.Ec)&&NE.test(e))throw this.wc('Document fields cannot begin and end with "__"')}}class DE{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||qo(e)}Dc(e,t,r,s=!1){return new fc({Ec:e,methodName:t,bc:r,path:Ge.emptyPath(),mc:!1,Sc:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Ko(n){const e=n._freezeSettings(),t=qo(n._databaseId);return new DE(n._databaseId,!!e.ignoreUndefinedProperties,t)}function bp(n,e,t,r,s,i={}){const a=n.Dc(i.merge||i.mergeFields?2:0,e,t,s);mc("Data must be an object, but it was:",a,r);const l=Ap(r,a);let u,h;if(i.merge)u=new mt(a.fieldMask),h=a.fieldTransforms;else if(i.mergeFields){const f=[];for(const p of i.mergeFields){const _=Il(e,p,t);if(!a.contains(_))throw new U(P.INVALID_ARGUMENT,`Field '${_}' is specified in your field mask but missing from your input data.`);Rp(f,_)||f.push(_)}u=new mt(f),h=a.fieldTransforms.filter(p=>u.covers(p.field))}else u=null,h=a.fieldTransforms;return new xE(new dt(l),u,h)}class Qo extends Wo{_toFieldTransform(e){if(e.Ec!==2)throw e.Ec===1?e.wc(`${this._methodName}() can only appear at the top level of your update data`):e.wc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof Qo}}class pc extends Wo{_toFieldTransform(e){return new ky(e.path,new Qs)}isEqual(e){return e instanceof pc}}function OE(n,e,t,r){const s=n.Dc(1,e,t);mc("Data must be an object, but it was:",s,r);const i=[],a=dt.empty();Un(r,(u,h)=>{const f=gc(e,u,t);h=We(h);const p=s.gc(f);if(h instanceof Qo)i.push(f);else{const _=ui(h,p);_!=null&&(i.push(f),a.set(f,_))}});const l=new mt(i);return new Tp(a,l,s.fieldTransforms)}function ME(n,e,t,r,s,i){const a=n.Dc(1,e,t),l=[Il(e,r,t)],u=[s];if(i.length%2!=0)throw new U(P.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let _=0;_<i.length;_+=2)l.push(Il(e,i[_])),u.push(i[_+1]);const h=[],f=dt.empty();for(let _=l.length-1;_>=0;--_)if(!Rp(h,l[_])){const A=l[_];let k=u[_];k=We(k);const V=a.gc(A);if(k instanceof Qo)h.push(A);else{const N=ui(k,V);N!=null&&(h.push(A),f.set(A,N))}}const p=new mt(h);return new Tp(f,p,a.fieldTransforms)}function LE(n,e,t,r=!1){return ui(t,n.Dc(r?4:3,e))}function ui(n,e){if(Sp(n=We(n)))return mc("Unsupported field value:",e,n),Ap(n,e);if(n instanceof Wo)return function(r,s){if(!Ip(s.Ec))throw s.wc(`${r._methodName}() can only be used with update() and set()`);if(!s.path)throw s.wc(`${r._methodName}() is not currently supported inside arrays`);const i=r._toFieldTransform(s);i&&s.fieldTransforms.push(i)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.mc&&e.Ec!==4)throw e.wc("Nested arrays are not supported");return function(r,s){const i=[];let a=0;for(const l of r){let u=ui(l,s.yc(a));u==null&&(u={nullValue:"NULL_VALUE"}),i.push(u),a++}return{arrayValue:{values:i}}}(n,e)}return function(r,s){if((r=We(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return Ay(s.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const i=be.fromDate(r);return{timestampValue:go(s.serializer,i)}}if(r instanceof be){const i=new be(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:go(s.serializer,i)}}if(r instanceof Ut)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof yt)return{bytesValue:qf(s.serializer,r._byteString)};if(r instanceof Ne){const i=s.databaseId,a=r.firestore._databaseId;if(!a.isEqual(i))throw s.wc(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:Yl(r.firestore._databaseId||s.databaseId,r._key.path)}}if(r instanceof $t)return function(a,l){return{mapValue:{fields:{[gf]:{stringValue:_f},[fo]:{arrayValue:{values:a.toArray().map(h=>{if(typeof h!="number")throw l.wc("VectorValues must only contain numeric values.");return Ql(l.serializer,h)})}}}}}}(r,s);throw s.wc(`Unsupported field value: ${No(r)}`)}(n,e)}function Ap(n,e){const t={};return uf(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Un(n,(r,s)=>{const i=ui(s,e.Vc(r));i!=null&&(t[r]=i)}),{mapValue:{fields:t}}}function Sp(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof be||n instanceof Ut||n instanceof yt||n instanceof Ne||n instanceof Wo||n instanceof $t)}function mc(n,e,t){if(!Sp(t)||!lf(t)){const r=No(t);throw r==="an object"?e.wc(n+" a custom object"):e.wc(n+" "+r)}}function Il(n,e,t){if((e=We(e))instanceof Go)return e._internalPath;if(typeof e=="string")return gc(n,e);throw Eo("Field path arguments must be of type string or ",n,!1,void 0,t)}const FE=new RegExp("[~\\*/\\[\\]]");function gc(n,e,t){if(e.search(FE)>=0)throw Eo(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new Go(...e.split("."))._internalPath}catch{throw Eo(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function Eo(n,e,t,r,s){const i=r&&!r.isEmpty(),a=s!==void 0;let l=`Function ${e}() called with invalid data`;t&&(l+=" (via `toFirestore()`)"),l+=". ";let u="";return(i||a)&&(u+=" (found",i&&(u+=` in field ${r}`),a&&(u+=` in document ${s}`),u+=")"),new U(P.INVALID_ARGUMENT,l+n+u)}function Rp(n,e){return n.some(t=>t.isEqual(e))}/**
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
 */class kp{constructor(e,t,r,s,i){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new Ne(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new UE(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(_c("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class UE extends kp{data(){return super.data()}}function _c(n,e){return typeof e=="string"?gc(n,e):e instanceof Go?e._internalPath:e._delegate._internalPath}/**
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
 */function $E(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new U(P.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class yc{}class Pp extends yc{}function BE(n,e,...t){let r=[];e instanceof yc&&r.push(e),r=r.concat(t),function(i){const a=i.filter(u=>u instanceof Ec).length,l=i.filter(u=>u instanceof vc).length;if(a>1||a>0&&l>0)throw new U(P.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(const s of r)n=s._apply(n);return n}class vc extends Pp{constructor(e,t,r){super(),this._field=e,this._op=t,this._value=r,this.type="where"}static _create(e,t,r){return new vc(e,t,r)}_apply(e){const t=this._parse(e);return Cp(e._query,t),new yr(e.firestore,e.converter,hl(e._query,t))}_parse(e){const t=Ko(e.firestore);return function(i,a,l,u,h,f,p){let _;if(h.isKeyField()){if(f==="array-contains"||f==="array-contains-any")throw new U(P.INVALID_ARGUMENT,`Invalid Query. You can't perform '${f}' queries on documentId().`);if(f==="in"||f==="not-in"){Jh(p,f);const k=[];for(const V of p)k.push(Qh(u,i,V));_={arrayValue:{values:k}}}else _=Qh(u,i,p)}else f!=="in"&&f!=="not-in"&&f!=="array-contains-any"||Jh(p,f),_=LE(l,a,p,f==="in"||f==="not-in");return Me.create(h,f,_)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}class Ec extends yc{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new Ec(e,t)}_parse(e){const t=this._queryConstraints.map(r=>r._parse(e)).filter(r=>r.getFilters().length>0);return t.length===1?t[0]:Pt.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:(function(s,i){let a=s;const l=i.getFlattenedFilters();for(const u of l)Cp(a,u),a=hl(a,u)}(e._query,t),new yr(e.firestore,e.converter,hl(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class wc extends Pp{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new wc(e,t)}_apply(e){const t=function(s,i,a){if(s.startAt!==null)throw new U(P.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(s.endAt!==null)throw new U(P.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new Ks(i,a)}(e._query,this._field,this._direction);return new yr(e.firestore,e.converter,function(s,i){const a=s.explicitOrderBy.concat([i]);return new ss(s.path,s.collectionGroup,a,s.filters.slice(),s.limit,s.limitType,s.startAt,s.endAt)}(e._query,t))}}function qE(n,e="asc"){const t=e,r=_c("orderBy",n);return wc._create(r,t)}function Qh(n,e,t){if(typeof(t=We(t))=="string"){if(t==="")throw new U(P.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Af(e)&&t.indexOf("/")!==-1)throw new U(P.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const r=e.path.child(Ee.fromString(t));if(!H.isDocumentKey(r))throw new U(P.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return hh(n,new H(r))}if(t instanceof Ne)return hh(n,t._key);throw new U(P.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${No(t)}.`)}function Jh(n,e){if(!Array.isArray(n)||n.length===0)throw new U(P.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function Cp(n,e){const t=function(s,i){for(const a of s)for(const l of a.getFlattenedFilters())if(i.indexOf(l.op)>=0)return l.op;return null}(n.filters,function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(t!==null)throw t===e.op?new U(P.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new U(P.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}class jE{convertValue(e,t="none"){switch(On(e)){case 0:return null;case 1:return e.booleanValue;case 2:return xe(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(Dn(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw J(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const r={};return Un(e,(s,i)=>{r[s]=this.convertValue(i,t)}),r}convertVectorValue(e){var t,r,s;const i=(s=(r=(t=e.fields)===null||t===void 0?void 0:t[fo].arrayValue)===null||r===void 0?void 0:r.values)===null||s===void 0?void 0:s.map(a=>xe(a.doubleValue));return new $t(i)}convertGeoPoint(e){return new Ut(xe(e.latitude),xe(e.longitude))}convertArray(e,t){return(e.values||[]).map(r=>this.convertValue(r,t))}convertServerTimestamp(e,t){switch(t){case"previous":const r=Oo(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(Hs(e));default:return null}}convertTimestamp(e){const t=xn(e);return new be(t.seconds,t.nanos)}convertDocumentKey(e,t){const r=Ee.fromString(e);fe(Kf(r),9688,{name:e});const s=new Gs(r.get(1),r.get(3)),i=new H(r.popFirst(5));return s.isEqual(t)||en(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}/**
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
 */function Vp(n,e,t){let r;return r=n?n.toFirestore(e):e,r}class Cs{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class ar extends kp{constructor(e,t,r,s,i,a){super(e,t,r,s,a),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new Ji(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const r=this._document.data.field(_c("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new U(P.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=ar._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}}ar._jsonSchemaVersion="firestore/documentSnapshot/1.0",ar._jsonSchema={type:Le("string",ar._jsonSchemaVersion),bundleSource:Le("string","DocumentSnapshot"),bundleName:Le("string"),bundle:Le("string")};class Ji extends ar{data(e={}){return super.data(e)}}class Mr{constructor(e,t,r,s){this._firestore=e,this._userDataWriter=t,this._snapshot=s,this.metadata=new Cs(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(r=>{e.call(t,new Ji(this._firestore,this._userDataWriter,r.key,r,new Cs(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new U(P.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(s,i){if(s._snapshot.oldDocs.isEmpty()){let a=0;return s._snapshot.docChanges.map(l=>{const u=new Ji(s._firestore,s._userDataWriter,l.doc.key,l.doc,new Cs(s._snapshot.mutatedKeys.has(l.doc.key),s._snapshot.fromCache),s.query.converter);return l.doc,{type:"added",doc:u,oldIndex:-1,newIndex:a++}})}{let a=s._snapshot.oldDocs;return s._snapshot.docChanges.filter(l=>i||l.type!==3).map(l=>{const u=new Ji(s._firestore,s._userDataWriter,l.doc.key,l.doc,new Cs(s._snapshot.mutatedKeys.has(l.doc.key),s._snapshot.fromCache),s.query.converter);let h=-1,f=-1;return l.type!==0&&(h=a.indexOf(l.doc.key),a=a.delete(l.doc.key)),l.type!==1&&(a=a.add(l.doc),f=a.indexOf(l.doc.key)),{type:zE(l.type),doc:u,oldIndex:h,newIndex:f}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new U(P.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=Mr._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=jl.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],r=[],s=[];return this.docs.forEach(i=>{i._document!==null&&(t.push(i._document),r.push(this._userDataWriter.convertObjectMap(i._document.data.value.mapValue.fields,"previous")),s.push(i.ref.path))}),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function zE(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return J(61501,{type:n})}}/**
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
 */function Ba(n){n=St(n,Ne);const e=St(n.firestore,pr);return kE(dc(e),n._key).then(t=>xp(e,n,t))}Mr._jsonSchemaVersion="firestore/querySnapshot/1.0",Mr._jsonSchema={type:Le("string",Mr._jsonSchemaVersion),bundleSource:Le("string","QuerySnapshot"),bundleName:Le("string"),bundle:Le("string")};class Np extends jE{constructor(e){super(),this.firestore=e}convertBytes(e){return new yt(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new Ne(this.firestore,null,t)}}function Xh(n,e,t){n=St(n,Ne);const r=St(n.firestore,pr),s=Vp(n.converter,e);return Tc(r,[bp(Ko(r),"setDoc",n._key,s,n.converter!==null,t).toMutation(n._key,Rt.none())])}function HE(n,e,t,...r){n=St(n,Ne);const s=St(n.firestore,pr),i=Ko(s);let a;return a=typeof(e=We(e))=="string"||e instanceof Go?ME(i,"updateDoc",n._key,e,t,r):OE(i,"updateDoc",n._key,e),Tc(s,[a.toMutation(n._key,Rt.exists(!0))])}function GE(n,e){const t=St(n.firestore,pr),r=Xn(n),s=Vp(n.converter,e);return Tc(t,[bp(Ko(n.firestore),"addDoc",r._key,s,n.converter!==null,{}).toMutation(r._key,Rt.exists(!1))]).then(()=>r)}function qa(n,...e){var t,r,s;n=We(n);let i={includeMetadataChanges:!1,source:"default"},a=0;typeof e[a]!="object"||Kh(e[a])||(i=e[a++]);const l={includeMetadataChanges:i.includeMetadataChanges,source:i.source};if(Kh(e[a])){const p=e[a];e[a]=(t=p.next)===null||t===void 0?void 0:t.bind(p),e[a+1]=(r=p.error)===null||r===void 0?void 0:r.bind(p),e[a+2]=(s=p.complete)===null||s===void 0?void 0:s.bind(p)}let u,h,f;if(n instanceof Ne)h=St(n.firestore,pr),f=Mo(n._key.path),u={next:p=>{e[a]&&e[a](xp(h,n,p))},error:e[a+1],complete:e[a+2]};else{const p=St(n,yr);h=St(p.firestore,pr),f=p._query;const _=new Np(h);u={next:A=>{e[a]&&e[a](new Mr(h,_,p,A))},error:e[a+1],complete:e[a+2]},$E(n._query)}return function(_,A,k,V){const N=new yp(V),W=new cp(A,N,k);return _.asyncQueue.enqueueAndForget(async()=>ap(await Tl(_),W)),()=>{N.Ou(),_.asyncQueue.enqueueAndForget(async()=>lp(await Tl(_),W))}}(dc(h),f,l,u)}function Tc(n,e){return function(r,s){const i=new In;return r.asyncQueue.enqueueAndForget(async()=>gE(await RE(r),s,i)),i.promise}(dc(n),e)}function xp(n,e,t){const r=t.docs.get(e._key),s=new Np(n);return new ar(n,s,e._key,r,new Cs(t.hasPendingWrites,t.fromCache),e.converter)}function WE(){return new pc("serverTimestamp")}(function(e,t=!0){(function(s){ts=s})(es),jr(new hr("firestore",(r,{instanceIdentifier:s,options:i})=>{const a=r.getProvider("app").getImmediate(),l=new pr(new F0(r.getProvider("auth-internal")),new B0(a,r.getProvider("app-check-internal")),function(h,f){if(!Object.prototype.hasOwnProperty.apply(h.options,["projectId"]))throw new U(P.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Gs(h.options.projectId,f)}(a,s),a);return i=Object.assign({useFetchStreams:t},i),l._setSettings(i),l},"PUBLIC").setMultipleInstances(!0)),wn(Xu,Yu,e),wn(Xu,Yu,"esm2017")})();var KE="firebase",QE="11.10.0";/**
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
 */wn(KE,QE,"app");function Ic(n,e){var t={};for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&e.indexOf(r)<0&&(t[r]=n[r]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,r=Object.getOwnPropertySymbols(n);s<r.length;s++)e.indexOf(r[s])<0&&Object.prototype.propertyIsEnumerable.call(n,r[s])&&(t[r[s]]=n[r[s]]);return t}function Dp(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const JE=Dp,Op=new ri("auth","Firebase",Dp());/**
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
 */const wo=new Ul("@firebase/auth");function XE(n,...e){wo.logLevel<=ne.WARN&&wo.warn(`Auth (${es}): ${n}`,...e)}function Xi(n,...e){wo.logLevel<=ne.ERROR&&wo.error(`Auth (${es}): ${n}`,...e)}/**
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
 */function nn(n,...e){throw bc(n,...e)}function Bt(n,...e){return bc(n,...e)}function Mp(n,e,t){const r=Object.assign(Object.assign({},JE()),{[e]:t});return new ri("auth","Firebase",r).create(e,{appName:n.name})}function An(n){return Mp(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function bc(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return Op.create(n,...e)}function X(n,e,...t){if(!n)throw bc(e,...t)}function Qt(n){const e="INTERNAL ASSERTION FAILED: "+n;throw Xi(e),new Error(e)}function rn(n,e){n||Qt(e)}/**
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
 */function bl(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.href)||""}function YE(){return Yh()==="http:"||Yh()==="https:"}function Yh(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}/**
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
 */function ZE(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(YE()||m_()||"connection"in navigator)?navigator.onLine:!0}function ew(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
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
 */class hi{constructor(e,t){this.shortDelay=e,this.longDelay=t,rn(t>e,"Short delay should be less than long delay!"),this.isMobile=d_()||g_()}get(){return ZE()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */function Ac(n,e){rn(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
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
 */class Lp{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Qt("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Qt("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Qt("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const tw={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
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
 */const nw=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],rw=new hi(3e4,6e4);function Jo(n,e){return n.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:n.tenantId}):e}async function os(n,e,t,r,s={}){return Fp(n,s,async()=>{let i={},a={};r&&(e==="GET"?a=r:i={body:JSON.stringify(r)});const l=si(Object.assign({key:n.config.apiKey},a)).slice(1),u=await n._getAdditionalHeaders();u["Content-Type"]="application/json",n.languageCode&&(u["X-Firebase-Locale"]=n.languageCode);const h=Object.assign({method:e,headers:u},i);return p_()||(h.referrerPolicy="no-referrer"),n.emulatorConfig&&Zr(n.emulatorConfig.host)&&(h.credentials="include"),Lp.fetch()(await $p(n,n.config.apiHost,t,l),h)})}async function Fp(n,e,t){n._canInitEmulator=!1;const r=Object.assign(Object.assign({},tw),e);try{const s=new sw(n),i=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const a=await i.json();if("needConfirmation"in a)throw $i(n,"account-exists-with-different-credential",a);if(i.ok&&!("errorMessage"in a))return a;{const l=i.ok?a.errorMessage:a.error.message,[u,h]=l.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw $i(n,"credential-already-in-use",a);if(u==="EMAIL_EXISTS")throw $i(n,"email-already-in-use",a);if(u==="USER_DISABLED")throw $i(n,"user-disabled",a);const f=r[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(h)throw Mp(n,f,h);nn(n,f)}}catch(s){if(s instanceof sn)throw s;nn(n,"network-request-failed",{message:String(s)})}}async function Up(n,e,t,r,s={}){const i=await os(n,e,t,r,s);return"mfaPendingCredential"in i&&nn(n,"multi-factor-auth-required",{_serverResponse:i}),i}async function $p(n,e,t,r){const s=`${e}${t}?${r}`,i=n,a=i.config.emulator?Ac(n.config,s):`${n.config.apiScheme}://${s}`;return nw.includes(t)&&(await i._persistenceManagerAvailable,i._getPersistenceType()==="COOKIE")?i._getPersistence()._getFinalTarget(a).toString():a}class sw{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(Bt(this.auth,"network-request-failed")),rw.get())})}}function $i(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const s=Bt(n,e,r);return s.customData._tokenResponse=t,s}/**
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
 */async function iw(n,e){return os(n,"POST","/v1/accounts:delete",e)}async function To(n,e){return os(n,"POST","/v1/accounts:lookup",e)}/**
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
 */function Ls(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function ow(n,e=!1){const t=We(n),r=await t.getIdToken(e),s=Sc(r);X(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,a=i==null?void 0:i.sign_in_provider;return{claims:s,token:r,authTime:Ls(ja(s.auth_time)),issuedAtTime:Ls(ja(s.iat)),expirationTime:Ls(ja(s.exp)),signInProvider:a||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function ja(n){return Number(n)*1e3}function Sc(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return Xi("JWT malformed, contained fewer than 3 sections"),null;try{const s=Ud(t);return s?JSON.parse(s):(Xi("Failed to decode base64 JWT payload"),null)}catch(s){return Xi("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function Zh(n){const e=Sc(n);return X(e,"internal-error"),X(typeof e.exp<"u","internal-error"),X(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
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
 */async function Ys(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof sn&&aw(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function aw({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
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
 */class lw{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const s=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */class Al{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Ls(this.lastLoginAt),this.creationTime=Ls(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function Io(n){var e;const t=n.auth,r=await n.getIdToken(),s=await Ys(n,To(t,{idToken:r}));X(s==null?void 0:s.users.length,t,"internal-error");const i=s.users[0];n._notifyReloadListener(i);const a=!((e=i.providerUserInfo)===null||e===void 0)&&e.length?Bp(i.providerUserInfo):[],l=uw(n.providerData,a),u=n.isAnonymous,h=!(n.email&&i.passwordHash)&&!(l!=null&&l.length),f=u?h:!1,p={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:l,metadata:new Al(i.createdAt,i.lastLoginAt),isAnonymous:f};Object.assign(n,p)}async function cw(n){const e=We(n);await Io(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function uw(n,e){return[...n.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function Bp(n){return n.map(e=>{var{providerId:t}=e,r=Ic(e,["providerId"]);return{providerId:t,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
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
 */async function hw(n,e){const t=await Fp(n,{},async()=>{const r=si({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=n.config,a=await $p(n,s,"/v1/token",`key=${i}`),l=await n._getAdditionalHeaders();l["Content-Type"]="application/x-www-form-urlencoded";const u={method:"POST",headers:l,body:r};return n.emulatorConfig&&Zr(n.emulatorConfig.host)&&(u.credentials="include"),Lp.fetch()(a,u)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function dw(n,e){return os(n,"POST","/v2/accounts:revokeToken",Jo(n,e))}/**
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
 */class Lr{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){X(e.idToken,"internal-error"),X(typeof e.idToken<"u","internal-error"),X(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Zh(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){X(e.length!==0,"internal-error");const t=Zh(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(X(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:s,expiresIn:i}=await hw(e,t);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:s,expirationTime:i}=t,a=new Lr;return r&&(X(typeof r=="string","internal-error",{appName:e}),a.refreshToken=r),s&&(X(typeof s=="string","internal-error",{appName:e}),a.accessToken=s),i&&(X(typeof i=="number","internal-error",{appName:e}),a.expirationTime=i),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Lr,this.toJSON())}_performRefresh(){return Qt("not implemented")}}/**
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
 */function hn(n,e){X(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class At{constructor(e){var{uid:t,auth:r,stsTokenManager:s}=e,i=Ic(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new lw(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=r,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new Al(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const t=await Ys(this,this.stsTokenManager.getToken(this.auth,e));return X(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return ow(this,e)}reload(){return cw(this)}_assign(e){this!==e&&(X(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new At(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){X(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await Io(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(bt(this.auth.app))return Promise.reject(An(this.auth));const e=await this.getIdToken();return await Ys(this,iw(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var r,s,i,a,l,u,h,f;const p=(r=t.displayName)!==null&&r!==void 0?r:void 0,_=(s=t.email)!==null&&s!==void 0?s:void 0,A=(i=t.phoneNumber)!==null&&i!==void 0?i:void 0,k=(a=t.photoURL)!==null&&a!==void 0?a:void 0,V=(l=t.tenantId)!==null&&l!==void 0?l:void 0,N=(u=t._redirectEventId)!==null&&u!==void 0?u:void 0,W=(h=t.createdAt)!==null&&h!==void 0?h:void 0,z=(f=t.lastLoginAt)!==null&&f!==void 0?f:void 0,{uid:B,emailVerified:j,isAnonymous:le,providerData:q,stsTokenManager:E}=t;X(B&&E,e,"internal-error");const g=Lr.fromJSON(this.name,E);X(typeof B=="string",e,"internal-error"),hn(p,e.name),hn(_,e.name),X(typeof j=="boolean",e,"internal-error"),X(typeof le=="boolean",e,"internal-error"),hn(A,e.name),hn(k,e.name),hn(V,e.name),hn(N,e.name),hn(W,e.name),hn(z,e.name);const y=new At({uid:B,auth:e,email:_,emailVerified:j,displayName:p,isAnonymous:le,photoURL:k,phoneNumber:A,tenantId:V,stsTokenManager:g,createdAt:W,lastLoginAt:z});return q&&Array.isArray(q)&&(y.providerData=q.map(w=>Object.assign({},w))),N&&(y._redirectEventId=N),y}static async _fromIdTokenResponse(e,t,r=!1){const s=new Lr;s.updateFromServerResponse(t);const i=new At({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await Io(i),i}static async _fromGetAccountInfoResponse(e,t,r){const s=t.users[0];X(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?Bp(s.providerUserInfo):[],a=!(s.email&&s.passwordHash)&&!(i!=null&&i.length),l=new Lr;l.updateFromIdToken(r);const u=new At({uid:s.localId,auth:e,stsTokenManager:l,isAnonymous:a}),h={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new Al(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(i!=null&&i.length)};return Object.assign(u,h),u}}/**
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
 */const ed=new Map;function Jt(n){rn(n instanceof Function,"Expected a class definition");let e=ed.get(n);return e?(rn(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,ed.set(n,e),e)}/**
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
 */class qp{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}qp.type="NONE";const td=qp;/**
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
 */function Yi(n,e,t){return`firebase:${n}:${e}:${t}`}class Fr{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=Yi(this.userKey,s.apiKey,i),this.fullPersistenceKey=Yi("persistence",s.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await To(this.auth,{idToken:e}).catch(()=>{});return t?At._fromGetAccountInfoResponse(this.auth,t,e):null}return At._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new Fr(Jt(td),e,r);const s=(await Promise.all(t.map(async h=>{if(await h._isAvailable())return h}))).filter(h=>h);let i=s[0]||Jt(td);const a=Yi(r,e.config.apiKey,e.name);let l=null;for(const h of t)try{const f=await h._get(a);if(f){let p;if(typeof f=="string"){const _=await To(e,{idToken:f}).catch(()=>{});if(!_)break;p=await At._fromGetAccountInfoResponse(e,_,f)}else p=At._fromJSON(e,f);h!==i&&(l=p),i=h;break}}catch{}const u=s.filter(h=>h._shouldAllowMigration);return!i._shouldAllowMigration||!u.length?new Fr(i,e,r):(i=u[0],l&&await i._set(a,l.toJSON()),await Promise.all(t.map(async h=>{if(h!==i)try{await h._remove(a)}catch{}})),new Fr(i,e,r))}}/**
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
 */function nd(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Gp(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(jp(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Kp(e))return"Blackberry";if(Qp(e))return"Webos";if(zp(e))return"Safari";if((e.includes("chrome/")||Hp(e))&&!e.includes("edge/"))return"Chrome";if(Wp(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function jp(n=st()){return/firefox\//i.test(n)}function zp(n=st()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Hp(n=st()){return/crios\//i.test(n)}function Gp(n=st()){return/iemobile/i.test(n)}function Wp(n=st()){return/android/i.test(n)}function Kp(n=st()){return/blackberry/i.test(n)}function Qp(n=st()){return/webos/i.test(n)}function Rc(n=st()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function fw(n=st()){var e;return Rc(n)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function pw(){return __()&&document.documentMode===10}function Jp(n=st()){return Rc(n)||Wp(n)||Qp(n)||Kp(n)||/windows phone/i.test(n)||Gp(n)}/**
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
 */function Xp(n,e=[]){let t;switch(n){case"Browser":t=nd(st());break;case"Worker":t=`${nd(st())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${es}/${r}`}/**
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
 */class mw{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=i=>new Promise((a,l)=>{try{const u=e(i);a(u)}catch(u){l(u)}});r.onAbort=t,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
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
 */async function gw(n,e={}){return os(n,"GET","/v2/passwordPolicy",Jo(n,e))}/**
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
 */const _w=6;class yw{constructor(e){var t,r,s,i;const a=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=a.minPasswordLength)!==null&&t!==void 0?t:_w,a.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=a.maxPasswordLength),a.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=a.containsLowercaseCharacter),a.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=a.containsUppercaseCharacter),a.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=a.containsNumericCharacter),a.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=a.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(s=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&s!==void 0?s:"",this.forceUpgradeOnSignin=(i=e.forceUpgradeOnSignin)!==null&&i!==void 0?i:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,r,s,i,a,l;const u={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,u),this.validatePasswordCharacterOptions(e,u),u.isValid&&(u.isValid=(t=u.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),u.isValid&&(u.isValid=(r=u.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),u.isValid&&(u.isValid=(s=u.containsLowercaseLetter)!==null&&s!==void 0?s:!0),u.isValid&&(u.isValid=(i=u.containsUppercaseLetter)!==null&&i!==void 0?i:!0),u.isValid&&(u.isValid=(a=u.containsNumericCharacter)!==null&&a!==void 0?a:!0),u.isValid&&(u.isValid=(l=u.containsNonAlphanumericCharacter)!==null&&l!==void 0?l:!0),u}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
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
 */class vw{constructor(e,t,r,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new rd(this),this.idTokenSubscription=new rd(this),this.beforeStateQueue=new mw(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Op,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(i=>this._resolvePersistenceManagerAvailable=i)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=Jt(t)),this._initializationPromise=this.queue(async()=>{var r,s,i;if(!this._deleted&&(this.persistenceManager=await Fr.create(this,e),(r=this._resolvePersistenceManagerAvailable)===null||r===void 0||r.call(this),!this._deleted)){if(!((s=this._popupRedirectResolver)===null||s===void 0)&&s._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((i=this.currentUser)===null||i===void 0?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await To(this,{idToken:e}),r=await At._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(bt(this.app)){const a=this.app.settings.authIdToken;return a?new Promise(l=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(a).then(l,l))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let s=r,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const a=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,l=s==null?void 0:s._redirectEventId,u=await this.tryRedirectSignIn(e);(!a||a===l)&&(u!=null&&u.user)&&(s=u.user,i=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(s)}catch(a){s=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(a))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return X(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Io(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=ew()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(bt(this.app))return Promise.reject(An(this));const t=e?We(e):null;return t&&X(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&X(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return bt(this.app)?Promise.reject(An(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return bt(this.app)?Promise.reject(An(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Jt(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await gw(this),t=new yw(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new ri("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await dw(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&Jt(e)||this._popupRedirectResolver;X(t,this,"argument-error"),this.redirectPersistenceManager=await Fr.create(this,[Jt(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,s){if(this._deleted)return()=>{};const i=typeof t=="function"?t:t.next.bind(t);let a=!1;const l=this._isInitialized?Promise.resolve():this._initializationPromise;if(X(l,this,"internal-error"),l.then(()=>{a||i(this.currentUser)}),typeof t=="function"){const u=e.addObserver(t,r,s);return()=>{a=!0,u()}}else{const u=e.addObserver(t);return()=>{a=!0,u()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return X(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Xp(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(t["X-Firebase-Client"]=r);const s=await this._getAppCheckToken();return s&&(t["X-Firebase-AppCheck"]=s),t}async _getAppCheckToken(){var e;if(bt(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t!=null&&t.error&&XE(`Error while retrieving App Check token: ${t.error}`),t==null?void 0:t.token}}function Xo(n){return We(n)}class rd{constructor(e){this.auth=e,this.observer=null,this.addObserver=A_(t=>this.observer=t)}get next(){return X(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
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
 */let kc={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function Ew(n){kc=n}function ww(n){return kc.loadJS(n)}function Tw(){return kc.gapiScript}function Iw(n){return`__${n}${Math.floor(Math.random()*1e6)}`}/**
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
 */function bw(n,e){const t=Bl(n,"auth");if(t.isInitialized()){const s=t.getImmediate(),i=t.getOptions();if(ur(i,e??{}))return s;nn(s,"already-initialized")}return t.initialize({options:e})}function Aw(n,e){const t=(e==null?void 0:e.persistence)||[],r=(Array.isArray(t)?t:[t]).map(Jt);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function Sw(n,e,t){const r=Xo(n);X(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!1,i=Yp(e),{host:a,port:l}=Rw(e),u=l===null?"":`:${l}`,h={url:`${i}//${a}${u}/`},f=Object.freeze({host:a,port:l,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!r._canInitEmulator){X(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),X(ur(h,r.config.emulator)&&ur(f,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=h,r.emulatorConfig=f,r.settings.appVerificationDisabledForTesting=!0,Zr(a)?(jd(`${i}//${a}${u}`),zd("Auth",!0)):kw()}function Yp(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function Rw(n){const e=Yp(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:sd(r.substr(i.length+1))}}else{const[i,a]=r.split(":");return{host:i,port:sd(a)}}}function sd(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function kw(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
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
 */class Zp{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return Qt("not implemented")}_getIdTokenResponse(e){return Qt("not implemented")}_linkToIdToken(e,t){return Qt("not implemented")}_getReauthenticationResolver(e){return Qt("not implemented")}}/**
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
 */async function Ur(n,e){return Up(n,"POST","/v1/accounts:signInWithIdp",Jo(n,e))}/**
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
 */const Pw="http://localhost";class mr extends Zp{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new mr(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):nn("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s}=t,i=Ic(t,["providerId","signInMethod"]);if(!r||!s)return null;const a=new mr(r,s);return a.idToken=i.idToken||void 0,a.accessToken=i.accessToken||void 0,a.secret=i.secret,a.nonce=i.nonce,a.pendingToken=i.pendingToken||null,a}_getIdTokenResponse(e){const t=this.buildRequest();return Ur(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,Ur(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Ur(e,t)}buildRequest(){const e={requestUri:Pw,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=si(t)}return e}}/**
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
 */class em{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
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
 */class di extends em{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
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
 */class fn extends di{constructor(){super("facebook.com")}static credential(e){return mr._fromParams({providerId:fn.PROVIDER_ID,signInMethod:fn.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return fn.credentialFromTaggedObject(e)}static credentialFromError(e){return fn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return fn.credential(e.oauthAccessToken)}catch{return null}}}fn.FACEBOOK_SIGN_IN_METHOD="facebook.com";fn.PROVIDER_ID="facebook.com";/**
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
 */class pn extends di{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return mr._fromParams({providerId:pn.PROVIDER_ID,signInMethod:pn.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return pn.credentialFromTaggedObject(e)}static credentialFromError(e){return pn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return pn.credential(t,r)}catch{return null}}}pn.GOOGLE_SIGN_IN_METHOD="google.com";pn.PROVIDER_ID="google.com";/**
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
 */class mn extends di{constructor(){super("github.com")}static credential(e){return mr._fromParams({providerId:mn.PROVIDER_ID,signInMethod:mn.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return mn.credentialFromTaggedObject(e)}static credentialFromError(e){return mn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return mn.credential(e.oauthAccessToken)}catch{return null}}}mn.GITHUB_SIGN_IN_METHOD="github.com";mn.PROVIDER_ID="github.com";/**
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
 */class gn extends di{constructor(){super("twitter.com")}static credential(e,t){return mr._fromParams({providerId:gn.PROVIDER_ID,signInMethod:gn.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return gn.credentialFromTaggedObject(e)}static credentialFromError(e){return gn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return gn.credential(t,r)}catch{return null}}}gn.TWITTER_SIGN_IN_METHOD="twitter.com";gn.PROVIDER_ID="twitter.com";/**
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
 */async function Cw(n,e){return Up(n,"POST","/v1/accounts:signUp",Jo(n,e))}/**
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
 */class Fn{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,s=!1){const i=await At._fromIdTokenResponse(e,r,s),a=id(r);return new Fn({user:i,providerId:a,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const s=id(r);return new Fn({user:e,providerId:s,_tokenResponse:r,operationType:t})}}function id(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
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
 */async function Vw(n){var e;if(bt(n.app))return Promise.reject(An(n));const t=Xo(n);if(await t._initializationPromise,!((e=t.currentUser)===null||e===void 0)&&e.isAnonymous)return new Fn({user:t.currentUser,providerId:null,operationType:"signIn"});const r=await Cw(t,{returnSecureToken:!0}),s=await Fn._fromIdTokenResponse(t,"signIn",r,!0);return await t._updateCurrentUser(s.user),s}/**
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
 */class bo extends sn{constructor(e,t,r,s){var i;super(t.code,t.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,bo.prototype),this.customData={appName:e.name,tenantId:(i=e.tenantId)!==null&&i!==void 0?i:void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,s){return new bo(e,t,r,s)}}function tm(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?bo._fromErrorAndOperation(n,i,e,r):i})}async function Nw(n,e,t=!1){const r=await Ys(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return Fn._forOperation(n,"link",r)}/**
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
 */async function xw(n,e,t=!1){const{auth:r}=n;if(bt(r.app))return Promise.reject(An(r));const s="reauthenticate";try{const i=await Ys(n,tm(r,s,e,n),t);X(i.idToken,r,"internal-error");const a=Sc(i.idToken);X(a,r,"internal-error");const{sub:l}=a;return X(n.uid===l,r,"user-mismatch"),Fn._forOperation(n,s,i)}catch(i){throw(i==null?void 0:i.code)==="auth/user-not-found"&&nn(r,"user-mismatch"),i}}/**
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
 */async function Dw(n,e,t=!1){if(bt(n.app))return Promise.reject(An(n));const r="signIn",s=await tm(n,r,e),i=await Fn._fromIdTokenResponse(n,r,s);return t||await n._updateCurrentUser(i.user),i}function Ow(n,e,t,r){return We(n).onIdTokenChanged(e,t,r)}function Mw(n,e,t){return We(n).beforeAuthStateChanged(e,t)}function Lw(n,e,t,r){return We(n).onAuthStateChanged(e,t,r)}const Ao="__sak";/**
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
 */class nm{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Ao,"1"),this.storage.removeItem(Ao),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
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
 */const Fw=1e3,Uw=10;class rm extends nm{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Jp(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),s=this.localCache[t];r!==s&&e(t,s,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((a,l,u)=>{this.notifyListeners(a,u)});return}const r=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const a=this.storage.getItem(r);!t&&this.localCache[r]===a||this.notifyListeners(r,a)},i=this.storage.getItem(r);pw()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,Uw):s()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},Fw)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}rm.type="LOCAL";const $w=rm;/**
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
 */class sm extends nm{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}sm.type="SESSION";const im=sm;/**
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
 */function Bw(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
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
 */class Yo{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const r=new Yo(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:s,data:i}=t.data,a=this.handlersMap[s];if(!(a!=null&&a.size))return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const l=Array.from(a).map(async h=>h(t.origin,i)),u=await Bw(l);t.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:u})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Yo.receivers=[];/**
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
 */function Pc(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
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
 */class qw{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,a;return new Promise((l,u)=>{const h=Pc("",20);s.port1.start();const f=setTimeout(()=>{u(new Error("unsupported_event"))},r);a={messageChannel:s,onMessage(p){const _=p;if(_.data.eventId===h)switch(_.data.status){case"ack":clearTimeout(f),i=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),l(_.data.response);break;default:clearTimeout(f),clearTimeout(i),u(new Error("invalid_response"));break}}},this.handlers.add(a),s.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:e,eventId:h,data:t},[s.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}}/**
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
 */function qt(){return window}function jw(n){qt().location.href=n}/**
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
 */function om(){return typeof qt().WorkerGlobalScope<"u"&&typeof qt().importScripts=="function"}async function zw(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Hw(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)===null||n===void 0?void 0:n.controller)||null}function Gw(){return om()?self:null}/**
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
 */const am="firebaseLocalStorageDb",Ww=1,So="firebaseLocalStorage",lm="fbase_key";class fi{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function Zo(n,e){return n.transaction([So],e?"readwrite":"readonly").objectStore(So)}function Kw(){const n=indexedDB.deleteDatabase(am);return new fi(n).toPromise()}function Sl(){const n=indexedDB.open(am,Ww);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(So,{keyPath:lm})}catch(s){t(s)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(So)?e(r):(r.close(),await Kw(),e(await Sl()))})})}async function od(n,e,t){const r=Zo(n,!0).put({[lm]:e,value:t});return new fi(r).toPromise()}async function Qw(n,e){const t=Zo(n,!1).get(e),r=await new fi(t).toPromise();return r===void 0?null:r.value}function ad(n,e){const t=Zo(n,!0).delete(e);return new fi(t).toPromise()}const Jw=800,Xw=3;class cm{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Sl(),this.db)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>Xw)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return om()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Yo._getInstance(Gw()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await zw(),!this.activeServiceWorker)return;this.sender=new qw(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((t=r[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Hw()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Sl();return await od(e,Ao,"1"),await ad(e,Ao),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>od(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>Qw(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>ad(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=Zo(s,!1).getAll();return new fi(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Jw)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}cm.type="LOCAL";const Yw=cm;new hi(3e4,6e4);/**
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
 */function Zw(n,e){return e?Jt(e):(X(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
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
 */class Cc extends Zp{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Ur(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Ur(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Ur(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function eT(n){return Dw(n.auth,new Cc(n),n.bypassAuthState)}function tT(n){const{auth:e,user:t}=n;return X(t,e,"internal-error"),xw(t,new Cc(n),n.bypassAuthState)}async function nT(n){const{auth:e,user:t}=n;return X(t,e,"internal-error"),Nw(t,new Cc(n),n.bypassAuthState)}/**
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
 */class um{constructor(e,t,r,s,i=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:s,tenantId:i,error:a,type:l}=e;if(a){this.reject(a);return}const u={auth:this.auth,requestUri:t,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(l)(u))}catch(h){this.reject(h)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return eT;case"linkViaPopup":case"linkViaRedirect":return nT;case"reauthViaPopup":case"reauthViaRedirect":return tT;default:nn(this.auth,"internal-error")}}resolve(e){rn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){rn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
 */const rT=new hi(2e3,1e4);class Nr extends um{constructor(e,t,r,s,i){super(e,t,s,i),this.provider=r,this.authWindow=null,this.pollId=null,Nr.currentPopupAction&&Nr.currentPopupAction.cancel(),Nr.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return X(e,this.auth,"internal-error"),e}async onExecution(){rn(this.filter.length===1,"Popup operations only handle one event");const e=Pc();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(Bt(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(Bt(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Nr.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,r;if(!((r=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Bt(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,rT.get())};e()}}Nr.currentPopupAction=null;/**
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
 */const sT="pendingRedirect",Zi=new Map;class iT extends um{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=Zi.get(this.auth._key());if(!e){try{const r=await oT(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}Zi.set(this.auth._key(),e)}return this.bypassAuthState||Zi.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function oT(n,e){const t=cT(e),r=lT(n);if(!await r._isAvailable())return!1;const s=await r._get(t)==="true";return await r._remove(t),s}function aT(n,e){Zi.set(n._key(),e)}function lT(n){return Jt(n._redirectPersistence)}function cT(n){return Yi(sT,n.config.apiKey,n.name)}async function uT(n,e,t=!1){if(bt(n.app))return Promise.reject(An(n));const r=Xo(n),s=Zw(r,e),a=await new iT(r,s,t).execute();return a&&!t&&(delete a.user._redirectEventId,await r._persistUserIfCurrent(a.user),await r._setRedirectUser(null,e)),a}/**
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
 */const hT=10*60*1e3;class dT{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!fT(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!hm(e)){const s=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";t.onError(Bt(this.auth,s))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=hT&&this.cachedEventUids.clear(),this.cachedEventUids.has(ld(e))}saveEventToCache(e){this.cachedEventUids.add(ld(e)),this.lastProcessedEventTime=Date.now()}}function ld(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function hm({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function fT(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return hm(n);default:return!1}}/**
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
 */async function pT(n,e={}){return os(n,"GET","/v1/projects",e)}/**
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
 */const mT=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,gT=/^https?/;async function _T(n){if(n.config.emulator)return;const{authorizedDomains:e}=await pT(n);for(const t of e)try{if(yT(t))return}catch{}nn(n,"unauthorized-domain")}function yT(n){const e=bl(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const a=new URL(n);return a.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&a.hostname===r}if(!gT.test(t))return!1;if(mT.test(n))return r===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
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
 */const vT=new hi(3e4,6e4);function cd(){const n=qt().___jsl;if(n!=null&&n.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function ET(n){return new Promise((e,t)=>{var r,s,i;function a(){cd(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{cd(),t(Bt(n,"network-request-failed"))},timeout:vT.get()})}if(!((s=(r=qt().gapi)===null||r===void 0?void 0:r.iframes)===null||s===void 0)&&s.Iframe)e(gapi.iframes.getContext());else if(!((i=qt().gapi)===null||i===void 0)&&i.load)a();else{const l=Iw("iframefcb");return qt()[l]=()=>{gapi.load?a():t(Bt(n,"network-request-failed"))},ww(`${Tw()}?onload=${l}`).catch(u=>t(u))}}).catch(e=>{throw eo=null,e})}let eo=null;function wT(n){return eo=eo||ET(n),eo}/**
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
 */const TT=new hi(5e3,15e3),IT="__/auth/iframe",bT="emulator/auth/iframe",AT={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},ST=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function RT(n){const e=n.config;X(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?Ac(e,bT):`https://${n.config.authDomain}/${IT}`,r={apiKey:e.apiKey,appName:n.name,v:es},s=ST.get(n.config.apiHost);s&&(r.eid=s);const i=n._getFrameworks();return i.length&&(r.fw=i.join(",")),`${t}?${si(r).slice(1)}`}async function kT(n){const e=await wT(n),t=qt().gapi;return X(t,n,"internal-error"),e.open({where:document.body,url:RT(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:AT,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const a=Bt(n,"network-request-failed"),l=qt().setTimeout(()=>{i(a)},TT.get());function u(){qt().clearTimeout(l),s(r)}r.ping(u).then(u,()=>{i(a)})}))}/**
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
 */const PT={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},CT=500,VT=600,NT="_blank",xT="http://localhost";class ud{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function DT(n,e,t,r=CT,s=VT){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),a=Math.max((window.screen.availWidth-r)/2,0).toString();let l="";const u=Object.assign(Object.assign({},PT),{width:r.toString(),height:s.toString(),top:i,left:a}),h=st().toLowerCase();t&&(l=Hp(h)?NT:t),jp(h)&&(e=e||xT,u.scrollbars="yes");const f=Object.entries(u).reduce((_,[A,k])=>`${_}${A}=${k},`,"");if(fw(h)&&l!=="_self")return OT(e||"",l),new ud(null);const p=window.open(e||"",l,f);X(p,n,"popup-blocked");try{p.focus()}catch{}return new ud(p)}function OT(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
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
 */const MT="__/auth/handler",LT="emulator/auth/handler",FT=encodeURIComponent("fac");async function hd(n,e,t,r,s,i){X(n.config.authDomain,n,"auth-domain-config-required"),X(n.config.apiKey,n,"invalid-api-key");const a={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:es,eventId:s};if(e instanceof em){e.setDefaultLanguage(n.languageCode),a.providerId=e.providerId||"",b_(e.getCustomParameters())||(a.customParameters=JSON.stringify(e.getCustomParameters()));for(const[f,p]of Object.entries({}))a[f]=p}if(e instanceof di){const f=e.getScopes().filter(p=>p!=="");f.length>0&&(a.scopes=f.join(","))}n.tenantId&&(a.tid=n.tenantId);const l=a;for(const f of Object.keys(l))l[f]===void 0&&delete l[f];const u=await n._getAppCheckToken(),h=u?`#${FT}=${encodeURIComponent(u)}`:"";return`${UT(n)}?${si(l).slice(1)}${h}`}function UT({config:n}){return n.emulator?Ac(n,LT):`https://${n.authDomain}/${MT}`}/**
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
 */const za="webStorageSupport";class $T{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=im,this._completeRedirectFn=uT,this._overrideRedirectResult=aT}async _openPopup(e,t,r,s){var i;rn((i=this.eventManagers[e._key()])===null||i===void 0?void 0:i.manager,"_initialize() not called before _openPopup()");const a=await hd(e,t,r,bl(),s);return DT(e,a,Pc())}async _openRedirect(e,t,r,s){await this._originValidation(e);const i=await hd(e,t,r,bl(),s);return jw(i),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:i}=this.eventManagers[t];return s?Promise.resolve(s):(rn(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await kT(e),r=new dT(e);return t.register("authEvent",s=>(X(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(za,{type:za},s=>{var i;const a=(i=s==null?void 0:s[0])===null||i===void 0?void 0:i[za];a!==void 0&&t(!!a),nn(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=_T(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Jp()||zp()||Rc()}}const BT=$T;var dd="@firebase/auth",fd="1.10.8";/**
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
 */class qT{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){X(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function jT(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function zT(n){jr(new hr("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:a,authDomain:l}=r.options;X(a&&!a.includes(":"),"invalid-api-key",{appName:r.name});const u={apiKey:a,authDomain:l,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Xp(n)},h=new vw(r,s,i,u);return Aw(h,t),h},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),jr(new hr("auth-internal",e=>{const t=Xo(e.getProvider("auth").getImmediate());return(r=>new qT(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),wn(dd,fd,jT(n)),wn(dd,fd,"esm2017")}/**
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
 */const HT=5*60,GT=qd("authIdTokenMaxAge")||HT;let pd=null;const WT=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>GT)return;const s=t==null?void 0:t.token;pd!==s&&(pd=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function KT(n=Kd()){const e=Bl(n,"auth");if(e.isInitialized())return e.getImmediate();const t=bw(n,{popupRedirectResolver:BT,persistence:[Yw,$w,im]}),r=qd("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(r,location.origin);if(location.origin===i.origin){const a=WT(i.toString());Mw(t,a,()=>a(t.currentUser)),Ow(t,l=>a(l))}}const s=$d("auth");return s&&Sw(t,`http://${s}`),t}function QT(){var n,e;return(e=(n=document.getElementsByTagName("head"))===null||n===void 0?void 0:n[0])!==null&&e!==void 0?e:document}Ew({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=s=>{const i=Bt("internal-error");i.customData=s,t(i)},r.type="text/javascript",r.charset="UTF-8",QT().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});zT("Browser");const dm={apiKey:"AIzaSyAsw466_wzsiLtbjw6FXZ1_O3HQ_AkVyU8",authDomain:"album-apexora.firebaseapp.com",projectId:"album-apexora",appId:"1:17231648284:web:20edb8477453f50473f1d9"},Rl=!Object.values(dm).some(n=>n.startsWith("PEGA")),fm=Wd(dm),Qn=CE(fm),md=KT(fm);function Ha(){return new Promise((n,e)=>{const t=Lw(md,r=>{t(),r?n(r):Vw(md).then(s=>n(s.user),e)})})}function dn(n){const e=n,t=String((e==null?void 0:e.code)??"");return Rl?t.includes("operation-not-allowed")||t.includes("admin-restricted")?"Activa el acceso Anónimo en Firebase → Authentication → Sign-in method.":t.includes("api-key")||t.includes("invalid-app")?"La firebaseConfig de src/net/firebase.ts no es válida.":t.includes("permission-denied")?"Firebase rechazó la operación (¿sala llena, ya empezada o reglas sin publicar?).":t.includes("unavailable")||t.includes("network")?"Sin conexión con Firebase.":(e==null?void 0:e.message)??"Error de conexión":"Falta pegar tu firebaseConfig en src/net/firebase.ts"}const JT=n=>Dd([Bs.Luminarae,Bs.Umbra],n);function kl(n,e){if(e===0)return n;const t=r=>1-r;return{...n,p:[n.p[1],n.p[0]],token:t(n.token),active:t(n.active),winner:n.winner===null||n.winner===-1?n.winner:t(n.winner),tok:[n.tok[1],n.tok[0]],mull:[n.mull[1],n.mull[0]],stack:n.stack.map(r=>({...r,owner:t(r.owner)}))}}function pm(n,e,t){return!t||typeof t.type!="string"?!1:t.type==="mulligan"?n.phase==="mulligan"&&t.player===e&&!n.mull[e]:n.phase!=="mulligan"&&n.active===e}function mm(n,e,t){if(e===-1||!pm(n,e,t))return n;try{return qs(n,t)}catch{return n}}const XT=(n,e)=>n.type==="mulligan"?{...n,player:e}:n,YT=n=>n.type==="mulligan"?{...n,player:0}:n,gd="ABCDEFGHJKLMNPQRSTUVWXYZ23456789",ZT=()=>Array.from({length:4},()=>gd[Math.floor(Math.random()*gd.length)]).join(""),Ga="tcgRoom";class Sn{constructor(e){Be(this,"code","");Be(this,"seat",0);Be(this,"uid","");Be(this,"g");Be(this,"host","");Be(this,"guest","");Be(this,"seed",0);Be(this,"applied",0);Be(this,"sending",!1);Be(this,"sentAt",-1);Be(this,"unsubs",[]);Be(this,"chatSeen",new Set);Be(this,"ready",!1);Be(this,"pulled",!1);Be(this,"waiters",[]);this.h=e}static savedCode(){try{return localStorage.getItem(Ga)}catch{return null}}save(){try{localStorage.setItem(Ga,this.code)}catch{}}static clearSaved(){try{localStorage.removeItem(Ga)}catch{}}async create(){if(!Rl)throw new Error(dn(null));try{const e=await Ha();this.uid=e.uid,this.seat=0,this.seed=Math.floor(Math.random()*2**31);for(let t=0;t<8;t++){const r=ZT();if(!(await Ba(Xn(Qn,"tcgGames",r))).exists())return await Xh(Xn(Qn,"tcgGames",r),{host:e.uid,guest:null,seed:this.seed,status:"waiting",createdAt:WE()}),this.code=r,this.save(),this.h.onStatus(`Sala ${r}: esperando rival…`),this.listen(),r}}catch(e){throw new Error(dn(e))}throw new Error("No se pudo crear la sala, inténtalo de nuevo")}async join(e){var r,s;if(!Rl)throw new Error(dn(null));const t=e.trim().toUpperCase();if(t.length!==4)throw new Error("El código tiene 4 caracteres");try{const i=await Ha();this.uid=i.uid;const a=Xn(Qn,"tcgGames",t),l=await Ba(a);if(!l.exists())throw new Error("Esa sala no existe");const u=l.data();if(u.host===i.uid)this.seat=0;else if(u.guest===i.uid)this.seat=1;else{if(u.guest)throw new Error("La sala ya está llena");await HE(a,{guest:i.uid,status:"playing"}),this.seat=1}this.code=t,this.save(),this.listen()}catch(i){throw new Error((r=i.message)!=null&&r.startsWith("Esa sala")||(s=i.message)!=null&&s.startsWith("La sala")?i.message:dn(i))}}async resume(e){try{const t=await Ha(),r=await Ba(Xn(Qn,"tcgGames",e.trim().toUpperCase())),s=r.data();if(!r.exists()||(s==null?void 0:s.status)!=="playing"||s.host!==t.uid&&s.guest!==t.uid)throw Sn.clearSaved(),new Error("Sala no disponible")}catch(t){throw Sn.clearSaved(),t}await this.join(e)}listen(){const e=Xn(Qn,"tcgGames",this.code);this.unsubs.push(qa(e,t=>{const r=t.data();r&&(this.host=r.host,this.guest=r.guest??"",this.seed=r.seed,r.status==="playing"&&this.guest&&!this.ready&&(this.ready=!0,this.g=JT(this.seed),this.applied=0,this.pulled=!1,this.h.onReady(),this.h.onStatus(`Sala ${this.code}: ¡partida en marcha!`),this.unsubs.push(qa(BE($a(e,"chat"),qE("t")),s=>s.docChanges().forEach(i=>{var l,u;if(i.type!=="added"||this.chatSeen.has(i.doc.id))return;this.chatSeen.add(i.doc.id);const a=i.doc.data();(u=(l=this.h).onChat)==null||u.call(l,{id:i.doc.id,mine:a.by===this.uid,text:String(a.text??"")})}),s=>this.h.onStatus("Chat: "+dn(s)))),this.unsubs.push(qa($a(e,"moves"),{includeMetadataChanges:!0},s=>this.pull(s.docs),s=>this.h.onStatus(dn(s))))))},t=>this.h.onStatus(dn(t))))}pull(e){const t=new Map;for(const l of e)l.metadata.hasPendingWrites||t.set(Number(l.id),l.data());const r=!this.pulled;this.pulled=!0;const s=[],i=this.applied;let a=!1;for(;t.has(this.applied);){const l=this.applied,u=t.get(l),h=u.by===this.host?0:u.by===this.guest?1:-1,f=this.g,p=mm(f,h,u.action);p!==f&&h!==-1&&s.push({before:f,action:u.action,seat:h}),this.g=p,this.applied++,this.sending&&u.by===this.uid&&l===this.sentAt&&(this.sending=!1,a=!0)}this.applied===i&&!r||(this.h.onMoves(this.g,s,r||s.length>3),a&&this.h.onSettled(),this.waiters.splice(0).forEach(l=>l()))}waitAdvance(e,t){return new Promise(r=>{if(this.applied>e)return r(!0);const s=setTimeout(()=>r(!1),t);this.waiters.push(()=>{clearTimeout(s),r(this.applied>e)})})}async send(e){if(this.sending||!this.ready)return!1;this.sending=!0;for(let t=0;t<3;t++){const r=this.applied,s=JSON.parse(JSON.stringify(XT(e,this.seat)));this.sentAt=r;try{return await Xh(Xn(Qn,"tcgGames",this.code,"moves",String(r)),{by:this.uid,action:s,t:Date.now()}),!0}catch{if(!await this.waitAdvance(r,4e3)||!pm(this.g,this.seat,s))break}}return this.sending=!1,this.h.onStatus("No se pudo enviar la jugada; revisa el tablero y repítela."),!1}async sendChat(e){if(!this.ready)throw new Error("El chat se activa cuando entra el rival.");try{await GE($a(Qn,"tcgGames",this.code,"chat"),{by:this.uid,text:e.slice(0,140),t:Date.now()})}catch(t){throw new Error(dn(t))}}get busy(){return this.sending}get isReady(){return this.ready}close(){this.unsubs.forEach(e=>e()),this.unsubs=[],this.waiters=[],Sn.clearSaved()}}const eI=`
.onl{position:fixed;inset:0;z-index:9000;display:grid;place-items:center;background:rgba(5,5,12,.78)}
.onl>div{background:#14141f;border:1px solid #3a3a5a;border-radius:14px;padding:22px 24px;width:min(92vw,340px);display:grid;gap:12px;color:#eee;text-align:center}
.onl h2{margin:0}.onl input{padding:10px;font-size:22px;letter-spacing:6px;text-align:center;text-transform:uppercase;border-radius:8px;border:1px solid #444;background:#0c0c14;color:#fff}
.onl .st{min-height:1.2em;font-size:13px;opacity:.85}
.roomtag{position:fixed;top:6px;left:50%;transform:translateX(-50%);z-index:8000;font-size:12px;padding:3px 10px;border-radius:99px;background:rgba(20,20,31,.85);color:#ddd;pointer-events:none}
`;let Ar=null,lt=null;function gm(){if(!document.getElementById("onl-css")){const n=document.createElement("style");n.id="onl-css",n.textContent=eI,document.head.append(n)}}function Zs(n){gm(),Ar||(Ar=document.createElement("div"),Ar.className="roomtag",document.body.append(Ar)),Ar.textContent=n,Ar.hidden=!n}function Fs(){lt==null||lt.remove(),lt=null}function Ro(n){const e=lt==null?void 0:lt.querySelector(".st");e&&(e.textContent=n)}function Pl(n){gm(),Fs(),lt=document.createElement("div"),lt.className="onl",lt.innerHTML=`<div><h2>Jugar online</h2>
    ${n.inRoom?'<p>Ya estás en una sala.</p><button class="btn" data-x="leave">Salir de la sala</button>':'<button class="btn" data-x="create">Crear sala</button><p style="margin:0;opacity:.7">o únete con un código</p><input data-x="code" maxlength="4" placeholder="K7QF" autocomplete="off"><button class="btn" data-x="join">Unirse</button>'}
    <div class="st"></div><button class="ghost" data-x="close">Cerrar</button></div>`,document.body.append(lt);const e=t=>{Ro("Conectando…"),t().catch(r=>Ro((r==null?void 0:r.message)??"Error"))};lt.addEventListener("click",t=>{var s;const r=t.target.dataset.x;r&&(r==="close"?Fs():r==="create"?e(n.create):r==="join"?e(()=>n.join(lt.querySelector("[data-x=code]").value)):r==="leave"&&((s=n.leave)==null||s.call(n),Fs()))}),lt.addEventListener("keydown",t=>{var r;t.stopPropagation(),t.key==="Enter"&&((r=lt.querySelector("[data-x=join]"))==null||r.click())})}const ei=document.getElementById("app"),Tt=document.createElement("div");Tt.className="preview";document.body.append(Tt);const _m={barrera:"Barrera",robovida:"Robo de vida",arrollar:"Arrollar",letal:"Letal",rapido:"Ataque rápido",duro:"Duro",elusivo:"Elusivo",temible:"Temible",retador:"Retador",regenera:"Regeneración",efimero:"Efímero"},tI={barrera:"anula el siguiente daño que recibiría y luego se pierde.",robovida:"el daño que inflige cura a tu Nexo.",arrollar:"el daño sobrante sobre su bloqueador va al Nexo.",letal:"destruye cualquier unidad a la que dañe.",rapido:"al atacar, golpea antes que su bloqueador.",duro:"recibe 1 de daño menos de cada fuente.",elusivo:"solo puede ser bloqueada por unidades elusivas.",temible:"solo la bloquean unidades con 3 o más de poder.",retador:"al atacar, elige qué enemigo debe bloquearla.",regenera:"se cura por completo al final de cada ronda.",efimero:"muere al golpear o al acabar la ronda."},nI={barrera:"🛡",robovida:"🩸",arrollar:"🐗",letal:"☠",rapido:"⚡",duro:"🪨",elusivo:"🌫",temible:"👁",retador:"⚔",regenera:"♻",efimero:"⏳"},rI={burst:"Ráfaga",focus:"Enfoque",fast:"Rápido",slow:"Lento"},sI={burst:"Ráfaga: se resuelve al instante, no pasa la prioridad y sirve como reacción.",focus:"Enfoque: se resuelve al instante, no pasa la prioridad; solo como acción original.",fast:"Rápido: va a la pila; el rival puede responder. Sirve como reacción.",slow:"Lento: va a la pila; solo como acción original (con la pila vacía)."},lr=n=>n.replace(/[&<>"]/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[e]),ea=()=>Dd([Bs.Luminarae,Bs.Umbra],Date.now());let S=ea(),Ae=null,Yn=!1,je=new Set,xt=new Set,ti=!1,$e=!1,ko=!1,Ot=0,Se=null,Mt=null,jt=null,_t=[20,20],Zn=new Set,Po=[0,0],er=0,$r=new Map,sr=[[],[]],xr=S;const _d=new Map;let ni=!1,yd=0,vd=-1,Wa=0,de=null,Rn=0;const Cl=n=>(n+Rn)%2,Vl=n=>Cl(n)?"Umbra":"Luminarae",Ka=n=>{de||Yt.react(n)};function tr(n,e=""){const t=document.createElement("div");t.className="vfx "+n,t.textContent=e,document.body.append(t),setTimeout(()=>t.remove(),1400)}function Xt(n){document.querySelectorAll(".toast").forEach(t=>t.remove());const e=document.createElement("div");e.className="vfx toast",e.textContent=n,document.body.append(e),setTimeout(()=>e.remove(),1800)}const Yt=new Yg,kt=document.createElement("aside");kt.className="chat";kt.innerHTML=`<div class="tabs"><button data-t="chat" class="on">Chat</button><button data-t="log">Registro</button></div>
  <div class="msgs" id="msgs"></div><div class="logv" id="logv" hidden></div>
  <div class="inp"><input id="chat-in" maxlength="140" placeholder="Escribe un mensaje…" autocomplete="off"><button id="chat-send">➤</button></div>`;document.body.append(kt);const to=kt.querySelector("#msgs"),ym=kt.querySelector("#logv"),Nl=kt.querySelector("#chat-in");Yt.onMessage(n=>{const e=document.createElement("div");if(e.className="msg "+n.side,n.side==="sys")e.textContent=n.text;else{const t=document.createElement("b");t.textContent=n.from+":",e.append(t,document.createTextNode(n.text))}to.append(e),to.scrollTop=to.scrollHeight,n.side==="foe"&&ye("msg")});const vm=()=>{const n=Nl.value.trim();n&&(Nl.value="",de?de.sendChat(n).catch(e=>Yt.sys((e==null?void 0:e.message)??"No se pudo enviar el mensaje")):Yt.send(n))};kt.querySelector("#chat-send").addEventListener("click",vm);Nl.addEventListener("keydown",n=>{n.key==="Enter"&&vm(),n.stopPropagation()});kt.querySelectorAll(".tabs button").forEach(n=>n.addEventListener("click",()=>{const e=n.dataset.t==="log";ym.hidden=!e,to.hidden=e,kt.querySelector(".inp").hidden=e,kt.querySelectorAll(".tabs button").forEach(t=>t.classList.toggle("on",t===n))}));Yt.sys("Chat local: escribe y el rival te responderá. Más adelante puede conectarse a Firebase.");function no(n,e,t=-1){const r=ue[n],s=e.map(a=>`<p><b>${_m[a]}:</b> ${tI[a]}</p>`),i=Xr(n);if(r.type==="spell"){const a=Math.min(S.p[0].spell,r.cost);s.push(`<p>✦ ${sI[r.speed??"fast"]}</p><p>💎 Se paga primero con la reserva de hechizo: ${a} de reserva + ${r.cost-a} de maná.</p>`)}else s.push("<p>Puede atacar nada más jugarla. Solo el jugador con la ficha de ataque puede atacar.</p>");if(i&&s.push(`<p>🎯 Eliges tú el objetivo (${i==="enemy"?"unidad enemiga":"unidad aliada"}). Si desaparece antes de resolverse, el hechizo se disipa.</p>`),r.fx.some(a=>a.t==="sacDraw"||a.t==="sacDmg")&&s.push("<p>⚠ Sacrifica a tu unidad más débil.</p>"),t>=0&&!Yr(S,0,t)){const a=S.p[0],l=r.type==="spell"?a.mana+a.spell:a.mana;s.push(`<p>⛔ ${r.cost>l?`Maná insuficiente: cuesta ${r.cost}, tienes ${l}.`:S.active!==0?"Ahora no tienes la prioridad.":r.type==="unit"?a.board.length>=6?"Tu tablero está lleno.":"Solo se juegan unidades con la pila vacía, en tu turno.":"Ahora no puedes jugarla (¿necesita objetivo o pila vacía?)."}</p>`)}return`<div class="rules">${s.join("")}</div>`}const iI=n=>{const e=n.slice(0,3);return`<div class="art"><span class="glyph">${ue[n].type==="spell"?"✦":e==="lum"?"☀":"☾"}</span><img src="${Gg(n)}" onerror="this.remove()"></div>`};function Dt(n,e="",t="",r,s=""){const i=ue[n],a=n.slice(0,3),l=r?r.kw:i.kw,u=r&&r.dmg>0?"dmg":"",h=(i.type==="spell"?[rI[i.speed??"fast"]]:[]).concat(l.map(f=>_m[f])).join(" · ");return`<div class="card ${i.type} ${a} ${t}" ${e}>${iI(n)}
    <div class="side"><i class="cost">${i.cost}</i>${l.map(f=>`<i class="ki">${nI[f]}</i>`).join("")}</div>
    <div class="panel"><div class="nm">${gt(n)}</div><div class="orn"></div><p class="tx"><em>${h}</em>${i.text}</p></div>
    ${i.type==="unit"?`<b class="atk ${r&&r.ta?"tmp":""}">${r?ce(r):i.atk}<s>⚔</s></b><b class="hp ${u}">${r?Re(r):i.hp}<s>♥</s></b>`:""}${s}</div>`}function Ed(n,e,t){document.querySelectorAll(".spot").forEach(s=>s.remove());const r=document.createElement("div");r.className="vfx spot",r.innerHTML=`<div class="spot-l">Juegas</div>${Dt(n,"","",t)}`,document.body.append(r),setTimeout(()=>r.remove(),1250)}function wd(n,e,t){document.querySelectorAll(".reader").forEach(l=>l.remove());const r=ue[n],s=r.type==="spell"?6500:3800,i=document.createElement("div");i.className="reader foe",ni=!0,i.innerHTML=`<div class="rd-h">⚠ El rival juega</div>${Dt(n,"","",t)}<div class="rd-t"><b>${lr(gt(n))}</b> · coste ${r.cost}<p>${lr(r.text)}</p></div>${no(n,t?t.kw:r.kw)}<button class="rd-ok" type="button">Entendido ✓</button><i class="rd-bar" style="animation-duration:${s}ms"></i>`,document.body.append(i);const a=()=>{i.isConnected&&(i.remove(),ni=!1)};i.querySelector(".rd-ok").addEventListener("click",a),i.addEventListener("click",a),setTimeout(a,s)}function Td(n,e,t){const r=n.nexus<_t[e]?"hit":n.nexus>_t[e]?"heal":"",s=n.nexus-_t[e],i=Array.from({length:n.maxMana},(a,l)=>`<u class="${l<n.mana?"on":""}"></u>`).join("");return`<div class="pt ${e?"foe":"me"}"><div class="ava"><span>${Cl(e)?"☾":"☀"}</span><img src="/Apexora-TCG/img/avatar_${Cl(e)?"umb":"lum"}.webp" onerror="this.remove()"></div>
    <div class="orb ${r}">${Math.max(0,n.nexus)}${s?`<span class="fx">${s>0?"+":""}${s}</span>`:""}</div>
    <div class="pname">${t}</div><div class="pmana">${i}<span class="sm">${[0,1,2].map(a=>`<i class="${a<n.spell?"on":""}"></i>`).join("")}</span></div></div>`}function Em(n,e){if(S.phase!=="main")return;if(de){ir({type:"attack",units:n});return}const t=Ot;$e=!0,jt={side:e,idx:n},ye("attack"),tr("banner small",`⚔ ${e?"El rival ataca":"Atacas"} con ${n.length}`),ve(),setTimeout(()=>{if(t!==Ot)return;jt=null,$e=!1;const r=qs(S,{type:"attack",units:n});if(r===S){Xt("No puedes atacar ahora"),je.clear(),ve();return}S=r,je.clear(),ve(),Qr()},900)}function wm(n,e){const t=n.token,r=1-t,s=n.p[r].nexus-e.p[r].nexus,i=_=>n.p[_].board.filter(A=>!e.p[_].board.some(k=>k.uid===A.uid)).map(A=>gt(A.card)),a=i(0),l=i(1),u=n.attackers.length,h=[`${t?"El rival atacó":"Atacaste"} con ${u}`,s>0?`${t?"Tu Nexo":"Nexo rival"} −${s}`:"sin daño al Nexo"];a.length&&h.push("Tuyas caídas: "+a.join(", ")),l.length&&h.push("Rivales caídas: "+l.join(", "));const f="⚔ "+h.join(" · "),p=document.createElement("div");p.className="vfx report"+(t?"":" good"),p.textContent=f,document.body.append(p),setTimeout(()=>p.remove(),3600),Yt.sys(f)}const Tm=(n,e)=>n!==e&&n.phase==="block"&&n.attackers.length>0&&e.attackers.length===0&&n.round===e.round;function Im(n,e,t){const r=Ot,s=n.token,i=1-s,a=n.attackers.filter(B=>n.p[s].board.some(j=>j.uid===B)).map(B=>({uid:B,bid:n.blocks[String(B)]}));if(!a.length){t();return}const l=Math.max(0,n.p[i].nexus-e.p[i].nexus),u=a.map(({uid:B,bid:j})=>{const le=n.p[s].board.find(E=>E.uid===B),q=j!==void 0?n.p[i].board.find(E=>E.uid===j):void 0;return q?le.kw.includes("arrollar")?Math.max(0,ce(le)-Re(q)-(q.kw.includes("duro")?1:0)):0:j===void 0||le.kw.includes("arrollar")?ce(le):0}),h=u.reduce((B,j)=>B+j,0),f=[];let p=0;u.forEach((B,j)=>{const le=j===u.length-1?l-p:h?Math.round(B/h*l):0;f.push(Math.max(0,le)),p+=f[j]});const _=B=>{const j=structuredClone(n),le=new Set;a.slice(0,B+1).forEach(({uid:q,bid:E})=>{le.add(q),E!==void 0&&le.add(E)});for(const q of[0,1])j.p[q].board=j.p[q].board.filter(E=>!le.has(E.uid)||e.p[q].board.some(g=>g.uid===E.uid)),j.p[q].board.forEach(E=>{if(le.has(E.uid)){const g=e.p[q].board.find(y=>y.uid===E.uid);g&&Object.assign(E,g)}});return j.p[i].nexus=n.p[i].nexus-f.slice(0,B+1).reduce((q,E)=>q+E,0),j.attackers=a.slice(B+1).map(q=>q.uid),j.blocks={},j.attackers.forEach(q=>{const E=n.blocks[String(q)];E!==void 0&&j.p[i].board.some(g=>g.uid===E)&&(j.blocks[String(q)]=E)}),j.forced=j.forced.filter(q=>j.attackers.includes(q)),j},A=a.length>3?.7:1,k=480*A,V=340,N=760*A;Yn=!0,je.clear(),Se=null,Mt=null;const W=()=>{Ae=null,Yn=!1,wm(n,e),t()},z=B=>{if(r!==Ot){Ae=null,Yn=!1;return}if(B>=a.length){W();return}const{uid:j,bid:le}=a[B],q=le!==void 0?n.p[i].board.find(g=>g.uid===le):void 0,E=n.p[s].board.find(g=>g.uid===j);S=B?_(B-1):n,Ae={atk:j,blk:q?q.uid:null,strike:!1,def:i,cap:`⚔ Duelo ${B+1}/${a.length} · ${lr(gt(E.card))} ${q?"contra "+lr(gt(q.card)):"→ directo al Nexo"}`},ve(),setTimeout(()=>{if(r!==Ot){Ae=null,Yn=!1;return}const g=document.querySelector(`[data-uid="${j}"]`),y=q?document.querySelector(`[data-uid="${q.uid}"]`):document.querySelector(`.pt.${i===0?"me":"foe"} .ava`),w=150,T=330,I=70,v=560,De=w+T,ft=De+I+v,D=e.p[s].board.some(F=>F.uid===j),L=E.card.startsWith("umb")?"umb":"lum";if(g&&y){const F=g.getBoundingClientRect(),ee=y.getBoundingClientRect(),me=ee.top+ee.height/2-(F.top+F.height/2),it=Math.sign(me)||1,he=ee.left+ee.width/2-(F.left+F.width/2),oe=me-it*((F.height*1.08+ee.height)/2-(q?4:16)),vt=Math.hypot(he,oe)||1,Ht=-he/vt*Math.min(26,vt*.09),as=-oe/vt*Math.min(26,vt*.09),Qe=g.cloneNode(!0);Qe.classList.remove("duel","duelatk","sel","can","enter","atkr"),Qe.removeAttribute("data-a"),Qe.removeAttribute("data-uid"),Qe.style.cssText=`position:fixed;left:${F.left}px;top:${F.top}px;width:${F.width}px;height:${F.height}px;--w:${F.width}px;margin:0;z-index:80;pointer-events:none;will-change:transform;box-shadow:0 0 0 2px #ffd36e,0 12px 30px #000a,0 0 30px #ffd36eaa`,document.body.append(Qe),Ae.fly=!0;const Bn=on=>on/ft,pi="translate(0,0) scale(1)",qn=`translate(${he}px,${oe}px) scale(1.08)`,jn=Qe.animate([{transform:pi,offset:0,easing:"cubic-bezier(.3,0,.4,1)"},{transform:`translate(${Ht}px,${as}px) scale(1.05)`,offset:Bn(w),easing:"cubic-bezier(.6,0,.25,1)"},{transform:qn,offset:Bn(De),easing:"linear"},{transform:qn,offset:Bn(De+I),easing:"cubic-bezier(.45,0,.2,1)"},{transform:pi,offset:1}],{duration:ft,fill:"forwards"});Tg(Qe,w+T+40,L),jn.onfinish=()=>{Qe.remove(),Ae&&Ae.atk===j&&(Ae.fly=!1,ve())},setTimeout(()=>{var on;D||(jn.cancel(),Qe.remove(),Ae&&Ae.atk===j&&(Ae.fly=!1)),wg(ee.left+ee.width/2,ee.top+ee.height/2-it*ee.height/2+it*4,F.width,L),q&&((on=document.querySelector(`[data-uid="${q.uid}"]`))==null||on.animate([{transform:"scale(1.08)"},{transform:`translateY(${it*16}px) rotate(${it*3}deg) scale(1.02)`,filter:"brightness(2.2)",offset:.3},{transform:"scale(1.08)"}],{duration:340,easing:"ease-out"}))},De)}Ae.strike=!0,ye("attack"),ve(),setTimeout(()=>{if(r!==Ot){Ae=null,Yn=!1;return}S=_(B),Ae.strike=!1,ve(),setTimeout(()=>z(B+1),N)},g&&y?De:V)},k)};z(0)}function bm(n){if(je.clear(),Se=null,Mt=null,Tm(S,n)){$e=!0,Im(S,n,()=>{$e=!1,S=n,ve(),Qr()});return}S=n,ve(),Qr()}function ve(){S.round!==er&&S.round>0&&S.phase!=="mulligan"&&(yd=Date.now()+1400,setTimeout(()=>ve(),1450)),Tt.style.display="none",lg(S.phase==="block"||S.stack.length?1:0);const n=S.p[0],e=S.p[1],t=S.active===0&&S.winner===null&&!$e&&S.phase!=="mulligan",r=S.phase==="block"&&S.token===1&&S.active===0,s=new Set(Object.values(S.blocks)),i=new Set(S.attackers),a=S.attackers.length?S.token:0,l=[];S.attackers.length?S.attackers.forEach(D=>{const L=S.p[a].board.findIndex(me=>me.uid===D);if(L<0)return;const F=S.blocks[String(D)],ee=F===void 0?-1:S.p[1-a].board.findIndex(me=>me.uid===F);l.push({a:S.p[a].board[L],ai:L,b:ee>=0?S.p[1-a].board[ee]:void 0,bi:ee})}):S.phase==="main"&&je.size&&[...je].forEach(D=>{n.board[D]&&l.push({a:n.board[D],ai:D,bi:-1})});const u=(D,L)=>l.some(F=>(L===a?F.a:F.b)===D),h=(D,L,F)=>{const ee=F===0,me=$r.get(D.uid),it=Re(D);let he="",oe="";me&&S.round===er&&(it<me[1]?(oe="hurt",he=String(it-me[1])):(it>me[1]||ce(D)>me[0])&&(oe="boost",he="+"+(it>me[1]?it-me[1]:ce(D)-me[0]))),_d.set(D.uid,Dt(D.card,"","mini dying",D));const vt=Se&&(Se.kind==="enemy"&&!ee||Se.kind==="ally"&&ee),Ht=vt?"tgt":ee?"unit":r&&i.has(D.uid)?"enemy-unit":"view",as=ee&&t&&S.phase==="main"&&S.tok[0]&&!S.attackers.length,Qe=`mini ${je.has(L)&&ee?"sel ":""}${as?"can ":""}${Zn.has(D.uid)?"":"enter "}${oe} ${vt?"tgtok ":""}${!ee&&Mt===L?"blocktarget ":""}${ee&&s.has(D.uid)?"assignedblock ":""}${S.forced.includes(D.uid)||S.forced.some(Bn=>S.blocks[String(Bn)]===D.uid)?"forced ":""}${i.has(D.uid)?"atkr ":""}${jt&&jt.side===F&&jt.idx.includes(L)?"attacking "+(F?"down":"up"):""}${Ae&&D.uid===Ae.atk?"duel duelatk "+(Ae.fly?"fly ":""):Ae&&D.uid===Ae.blk?"duel duelblk ":""}`;return Dt(D.card,`data-u="${F}:${L}" data-a="${Ht}" data-i="${L}" data-uid="${D.uid}"`,Qe,D,he?`<span class="fx">${he}</span>`:"")},f=(D,L)=>{const F=[],ee=[];D.board.forEach((he,oe)=>{u(he,L)||F.push(h(he,oe,L))}),l.forEach(he=>{const oe=L===a?he.a:he.b,vt=L===a?he.ai:he.bi;ee.push(oe?h(oe,vt,L):`<div class="slot cslot ${L?"umb":"lum"} ${r&&L===0?"ask":""}">${r&&L===0?"<span>Elige<br>defensor</span>":""}</div>`)});const me=sr[L].filter(he=>!D.board.some(oe=>oe.uid===he)).map(he=>_d.get(he)??""),it=Array.from({length:Math.max(0,6-D.board.length)},(he,oe)=>`<div class="slot ${L?"umb":"lum"}">${me[oe]??""}</div>`).join("");return{back:F.join("")+it,comb:ee.join("")}},p=f(e,1),_=f(n,0),A=S.phase==="mulligan"?"Mulligan":S.phase==="main"?"Prioridad":S.phase==="block"?"Bloqueos":"Pila",k=S.winner!==null?S.winner===-1?"Empate":S.winner===0?"¡Victoria!":"Derrota":Se?`Elige objetivo para ${gt(n.hand[Se.hand])} · Esc cancela`:S.phase==="stack"?t?`Responde o pulsa OK · ${S.stack.length} en la pila`:`Pila · ${S.stack.length}`:S.phase==="block"?r?"Toca un atacante y luego tu bloqueador":S.active===0?"Rival bloqueó: puedes responder o resolver":"El rival asigna bloqueos…":t?S.passes===1?"El rival pasó: pasa también para cerrar la ronda":S.tok[0]?"Tu turno: juega cartas o selecciona unidades y ataca":"Tu turno: juega cartas o pasa":"El rival tiene la prioridad…",V=S.log.slice(-14).map(D=>D.replace(/\{(\w+)\}/g,(L,F)=>`<b>${gt(F)}</b>`)).join("<br>"),N=S.attackers.length?`<div class="blocksummary"><b>⚔ Combate</b>${S.attackers.map(D=>{const L=S.p[S.token].board.find(me=>me.uid===D),F=S.blocks[String(D)],ee=F===void 0?void 0:S.p[1-S.token].board.find(me=>me.uid===F);return`<span>${L?gt(L.card):"?"} <i>→</i> ${ee?gt(ee.card):"<em>Sin bloquear</em>"}</span>`}).join("")}</div>`:"";let W="RIVAL",z="wait";t&&(S.phase==="main"?je.size?(W=`ATACAR ${je.size}`,z="atk"):(W=S.passes===1?"FIN DE RONDA":"PASAR",z="go"):S.phase==="block"?(W=r?Object.keys(S.blocks).length?"BLOQUEAR":"SIN BLOQUEO":"RESOLVER",z="go"):(W="OK",z="go"));const B=D=>{const L=D===void 0?void 0:[...S.p[0].board,...S.p[1].board].find(F=>F.uid===D);return L?gt(L.card):""},j=S.stack.length?`<div class="stacktray"><b>✦ Pila · se resuelve de arriba abajo</b>${[...S.stack].map((D,L)=>({x:D,k:L})).reverse().map(({x:D,k:L},F)=>{const ee=ue[D.card],me=B(D.target);return`<div data-st="${L}" class="stackitem ${D.owner?"foe":"me"} ${F===0?"top":""}"><div class="si-h"><em>${D.owner?"Rival":"Tú"}</em><strong>${gt(D.card)}</strong><i>${ee.cost}</i></div><p>${lr(ee.text)}</p>${me?`<small>🎯 Objetivo: ${lr(me)}</small>`:""}</div>`}).join("")}</div>`:"",le=Date.now()<yd&&S.phase!=="mulligan",q=S.phase==="block"||S.phase==="stack"&&S.resumePhase==="block",E=S.phase==="mulligan"?-1:le?0:q?2:S.passes===1&&!S.attackers.length&&S.phase==="main"?3:1,g=[["ROBO","Robas 1 carta y ganas 1 de maná"],["INVOCACIÓN","Juega unidades y hechizos"],["COMBATE","Ataque y bloqueo · hechizos rápidos permitidos"],["FINAL","Si ambos pasáis, acaba la ronda y pasa el turno"]];ei.dataset.ph=String(E);const y=S.winner!==null||S.phase==="mulligan"?"":S.active===0?"mine":"theirs",w=`<div class="phasehud ${y}"><div class="who">${y==="mine"?"⚡ TU TURNO":y?"⏳ TURNO RIVAL":"PARTIDA"}</div><ol>${g.map((D,L)=>`<li class="${L===E?"on":L<E?"done":""}"><i>${L+1}</i><span>${D[0]}</span>${L===E?`<small>${D[1]}</small>`:""}</li>`).join("")}</ol>${S.stack.length?'<div class="hstack">✦ Pila activa</div>':""}</div>`,T=n.hand.length,I=n.hand.map((D,L)=>{const F=L-(T-1)/2;return`<div class="slotc" data-a="hand" data-i="${L}" style="--rot:${(F*3.2).toFixed(1)}deg;--y:${(F*F*2.6).toFixed(1)}px" aria-label="${lr(gt(D))}, coste ${ue[D].cost}">${Dt(D,"",`${t&&Yr(S,0,L)?"ok":"no"} ${(Se==null?void 0:Se.hand)===L?"sel":""}`)}</div>`}).join(""),v=S.phase==="mulligan"&&S.mull[0]?'<div class="mull"><h2>Mulligan</h2><p>Esperando al rival…</p></div>':S.phase==="mulligan"?`<div class="mull"><h2>Mulligan</h2><p>Toca las cartas que quieras reemplazar (0 a 4)</p><div class="mrow">${n.hand.map((D,L)=>Dt(D,`data-a="mul" data-i="${L}"`,xt.has(L)?"sel swap":"")).join("")}</div><button class="btn" data-a="mulgo">${xt.size?`Reemplazar ${xt.size}`:"Conservar mano"}</button></div>`:"";ei.innerHTML=`<header><div class="brand"><span class="brand-mark">✦</span><h1>Cartas <small>ALFA</small></h1></div><div class="header-state"><span class="rd">Ronda ${S.round}/40</span><span class="phase-chip">${A}</span><span class="tok">${S.tok[0]?"⚑ Tienes la ficha de ataque":S.tok[1]?"⚑ Ficha de ataque: rival":"⚑ Ficha gastada"}</span></div>
    <nav class="toolbar"><button class="ghost" data-a="chat">${ti?"✕ Cerrar":"☰ Chat / registro"}</button><button class="ghost icon-btn" data-a="mute">${og()?"🔇":"🔊"}</button><button class="ghost" data-a="menu">⌂ Menú</button><button class="ghost" data-a="online">🌐 Online</button><button class="ghost" data-a="new">↻ Nueva partida</button></nav></header><main class="stage ${Se?"targeting":""}${Yn?" dueling":""}" data-dnex="${Ae&&Ae.blk===null?Ae.def:""}">${Ae?`<div class="duelcap">${Ae.cap}</div>`:""}
      <div class="foehand">${Array.from({length:e.hand.length},()=>"<i></i>").join("")}</div>
      <div class="plane-wrap"><div class="plane"><div class="lane foeback">${p.back}</div><div class="lane foecomb">${p.comb}</div><div class="lane mycomb">${_.comb}</div><div class="lane myback">${_.back}</div></div></div>
      
      <div class="msgbar"><span class="pill ${t?"go":""}">${k}</span></div>
      <aside class="sideL">${w}${j}${N}<div class="pgroup me"><div class="pile p0" data-l="MAZO" title="Tu mazo"><b>${n.deck.length}</b></div>${Td(n,0,`${Vl(0)} · Tú`)}</div></aside>
      <aside class="sideR"><div class="pgroup foe">${Td(e,1,`${Vl(1)} · Rival`)}<div class="pile p1" data-l="MAZO" title="Mazo rival"><b>${e.deck.length}</b></div></div>
      <div class="manapanel"><div class="mrow2"><b>MANÁ</b><span>${n.mana}/${n.maxMana}</span></div><div class="gems">${Array.from({length:Math.max(n.maxMana,1)},(D,L)=>`<u class="${L<n.mana?"on":""}"></u>`).join("")}</div>
        <div class="mrow2" title="Reserva exclusiva para hechizos: se gasta ANTES que el maná normal y se rellena con el maná que te sobra al acabar la ronda (máximo 3)."><b>RESERVA ✦</b><span>${n.spell}/3</span></div><div class="gems sp">${[0,1,2].map(D=>`<u class="${D<n.spell?"on":""}"></u>`).join("")}</div><p class="mnote">Reserva: solo hechizos, se gasta primero. Se llena con el maná que sobra al cerrar la ronda (máx. 3).</p></div>
      <button class="endbtn ${z}" data-a="${z==="atk"?"attack":"go"}" ${z==="wait"?"disabled":""}><span>${W}</span></button></aside>
      <div class="fan">${I}</div></main>`+v+(S.winner!==null?`<div class="over"><h2>${k}</h2><button class="btn" data-a="new">Jugar de nuevo</button></div>`:"");const De=S.p.some(D=>D.board.some(L=>!Zn.has(L.uid))),ft=sr.some(D=>D.some(L=>!S.p.some(F=>F.board.some(ee=>ee.uid===L))));De&&S.p.flatMap(D=>D.board.filter(L=>!Zn.has(L.uid)).map(L=>L.card)).forEach((D,L)=>setTimeout(()=>dg(D),L*170)),ft&&ye("death"),S.p.forEach((D,L)=>D.board.filter(F=>!Zn.has(F.uid)).forEach(F=>{Kg(F.card)?(document.querySelectorAll(".spot,.reader").forEach(ee=>ee.remove()),ni=!0,ye("round"),Jg(F.card,Dt(F.card,"","",F),()=>{ni=!1})):L?wd(F.card,1,F):Ed(F.card,0,F)})),n.nexus<_t[0]?tr("vhit"):n.nexus>_t[0]&&tr("vheal"),(n.nexus<_t[0]||e.nexus<_t[1])&&ye("hurt"),(n.nexus>_t[0]||e.nexus>_t[1])&&ye("heal"),S.p.forEach((D,L)=>{const F=D.played[D.played.length-1];D.played.length>Po[L]&&F&&ue[F].type==="spell"&&(tr("cast "+F.slice(0,3)),ye("spell_"+F.slice(0,3)),L?wd(F):Ed(F),L===1&&Ka("cast"))}),S.round!==er&&S.round>0&&(tr("banner",`Ronda ${S.round}`),ye("round"),n.spell>Wa&&setTimeout(()=>Xt(`✦ +${n.spell-Wa} reserva de hechizo (maná sobrante)`),1500)),S.active===0&&vd!==0&&!$e&&S.winner===null&&S.phase!=="mulligan"&&S.round===er&&(tr("banner small turn",r?"🛡 Tu turno · bloquea":"⚡ Tu turno"),ye("round")),vd=S.phase==="mulligan"?-1:S.active,Wa=n.spell,!Yn&&xr.attackers.length&&!S.attackers.length&&xr.round===S.round&&wm(xr,S),_t=[n.nexus,e.nexus],Po=S.p.map(D=>D.played.length),er=S.round,xr=S,$r=new Map,sr=[[],[]],S.p.forEach((D,L)=>D.board.forEach(F=>{Zn.add(F.uid),$r.set(F.uid,[ce(F),Re(F)]),sr[L].push(F.uid)})),S.winner!==null&&!ko&&(ko=!0,de&&Sn.clearSaved(),ye(S.winner===0?"win":"lose"),S.winner===0?Ka("win"):S.winner===1&&Ka("lose")),ym.innerHTML=V,kt.hidden=!ti}function ir(n){if(de){if($e||de.busy)return;if(!de.isReady){Xt("Esperando al rival… Para jugar contra la IA, sal de la sala desde 🌐 Online");return}if(qs(S,YT(n))===S){Xt(n.type==="block"?"Ese bloqueo no es válido (Elusivo/Temible/ya asignado)":n.type==="play"?"No puedes jugar eso ahora":"Acción no válida");return}(n.type==="pass"||n.type==="confirmBlocks")&&ye("pass"),$e=!0,je.clear(),Se=null,Mt=null,ve(),de.send(n).then(r=>{r||($e=!1,ve())});return}const e=qs(S,n);if(e===S){Xt(n.type==="block"?"Ese bloqueo no es válido (Elusivo/Temible/ya asignado)":n.type==="play"?"No puedes jugar eso ahora":"Acción no válida");return}(n.type==="pass"||n.type==="confirmBlocks")&&ye("pass"),bm(e)}function Qr(){if(de||S.winner!==null||S.active!==1||S.phase==="mulligan")return;const n=Ot,e=()=>{if(n!==Ot||$e||S.winner!==null||S.active!==1)return;if(ni){setTimeout(e,300);return}const t=zg(S);if(t.type==="attack"){Em(t.units,1);return}bm(qs(S,t))};setTimeout(e,1200)}function xl(){S.active===0&&S.winner===null&&!$e&&(ye("click"),S.phase==="main"&&je.size?Em([...je],0):S.phase==="block"&&S.token===1?ir({type:"confirmBlocks"}):ir({type:"pass"}))}ei.addEventListener("click",n=>{const e=n.target.closest("[data-a]");if(Se&&(e==null?void 0:e.dataset.a)!=="tgt"&&(Se=null,ve(),!e||e.dataset.a==="hand")||!e)return;const t=e.dataset.a,r=Number(e.dataset.i),s=S.active===0&&S.winner===null&&!$e&&S.phase!=="mulligan";if(t==="chat")ti=!ti,ye("click"),ve();else if(t==="mute")ag(),ye("click"),ve();else if(t==="new"&&de)Xt("Para otra partida online crea o únete a una sala nueva"),Pl(Dl());else if(t==="menu")ye("click"),kd();else if(t==="online")ye("click"),Pl(Dl());else if(t==="new")ye("click"),Ot++,$e=!1,jt=null,Mt=null,Se=null,S=ea(),je.clear(),xt.clear(),_t=[20,20],Zn.clear(),Po=[0,0],er=0,$r.clear(),sr=[[],[]],ko=!1,xr=S,ve();else if(t==="mul")ye("select"),xt.has(r)?xt.delete(r):xt.add(r),ve();else if(t==="mulgo"){ye("click");const i=[...xt];xt.clear(),ir({type:"mulligan",idx:i})}else if(s)if(t==="tgt"){if(Se){const i=Number(e.dataset.uid),a=Se.hand;ir({type:"play",hand:a,target:i})}}else if(t==="hand"){if(!Yr(S,0,r)){Xt("No puedes jugar esa carta ahora");return}const i=Xr(S.p[0].hand[r]);ye("select"),i?(Se={hand:r,kind:i},ve()):ir({type:"play",hand:r})}else t==="go"||t==="attack"?xl():t==="enemy-unit"&&S.phase==="block"?(Mt=r,ye("select"),ve()):t==="unit"&&S.phase==="block"&&S.token===1?Mt===null?Xt("Primero toca al atacante rival"):ir({type:"block",attacker:Mt,blocker:r}):t==="unit"&&S.phase==="main"&&S.tok[0]&&!S.attackers.length&&(je.has(r)?je.delete(r):je.add(r),ye("select"),ve());else return});document.addEventListener("keydown",n=>{n.target.tagName!=="INPUT"&&(n.key==="Escape"&&Se?(Se=null,ve()):n.key===" "&&S.phase!=="mulligan"&&(n.preventDefault(),xl()))});document.addEventListener("contextmenu",n=>{Se&&(n.preventDefault(),Se=null,ve())});const Am=()=>document.querySelectorAll(".manapanel u.pay").forEach(n=>n.classList.remove("pay"));function oI(n){Am();const e=ue[n],t=S.p[0],r=e.type==="spell"?Math.min(t.spell,e.cost):0,s=e.cost-r,i=document.querySelectorAll(".manapanel .gems"),a=(l,u,h)=>{var p;if(!l)return;const f=l.querySelectorAll("u");for(let _=u-1;_>=Math.max(0,u-h);_--)(p=f[_])==null||p.classList.add("pay")};a(i[0],t.mana,s),a(i[1],t.spell,r)}ei.addEventListener("mouseover",n=>{var r,s;const e=n.target.closest("[data-st]");if(e){const i=(r=S.stack[Number(e.dataset.st)])==null?void 0:r.card;i&&(Tt.innerHTML=Dt(i)+no(i,ue[i].kw),Tt.style.display="block");return}const t=n.target.closest('[data-u],[data-a="hand"]');if((!t||!t.dataset.i||t.dataset.a!=="hand")&&Am(),(t==null?void 0:t.dataset.a)==="hand"){const i=S.p[0].hand[Number(t.dataset.i)];i&&oI(i)}if(!t){Tt.style.display="none";return}if(t.dataset.u){const[i,a]=t.dataset.u.split(":").map(Number),l=(s=S.p[i])==null?void 0:s.board[a];l&&(Tt.innerHTML=Dt(l.card,"","",l)+no(l.card,l.kw),Tt.style.display="block")}else{const i=Number(t.dataset.i),a=S.p[0].hand[i];a&&(Tt.innerHTML=Dt(a)+no(a,ue[a].kw,i),Tt.style.display="block")}});ei.addEventListener("mouseleave",()=>{Tt.style.display="none"});const kn=[];let Jr=!1;function Co(n){Ot++,$e=!1,jt=null,Mt=null,Se=null,S=n,je.clear(),xt.clear(),ko=n.winner!==null,_t=[n.p[0].nexus,n.p[1].nexus],Po=n.p.map(e=>e.played.length),er=n.round,xr=n,Zn=new Set(n.p.flatMap(e=>e.board.map(t=>t.uid))),$r=new Map,sr=[[],[]],n.p.forEach((e,t)=>e.board.forEach(r=>{$r.set(r.uid,[ce(r),Re(r)]),sr[t].push(r.uid)})),ve()}function Sm(){const n=kn.shift();if(!n){Jr=!1;return}Jr=!0;const e=kl(mm(n.before,n.seat,n.action),Rn),t=()=>{jt=null,$e=!1,S=e,je.clear(),Se=null,Mt=null,ve(),setTimeout(Sm,0)},r=()=>{Tm(S,e)&&kn.length===0?($e=!0,jt=null,Im(S,e,t)):t()};if(n.action.type==="attack"&&kn.length===0){const s=n.seat===Rn?0:1;$e=!0,jt={side:s,idx:n.action.units},ye("attack"),tr("banner small",`⚔ ${s?"El rival ataca":"Atacas"} con ${n.action.units.length}`),ve(),setTimeout(r,900)}else r()}function Dl(){return{inRoom:!!de,create:async()=>{Ol();try{const n=await de.create();Zs(`Sala ${n} · esperando rival…`),Ro(`Código de sala: ${n} — pásaselo a tu rival`)}catch(n){throw de=null,n}},join:async n=>{Ol();try{await de.join(n)}catch(e){throw de=null,e}},leave:()=>{de==null||de.close(),de=null,Rn=0,kn.length=0,Jr=!1,Zs(""),Co(ea()),Qr()}}}function Ol(){de||(de=new Sn({onStatus:n=>{Zs(n),Ro(n)},onChat:n=>{Yt.push({from:n.mine?"Tú":"Rival",text:n.text,side:n.mine?"me":"foe"}),!n.mine&&!ti&&Xt("💬 Rival: "+n.text.slice(0,60))},onReady:()=>{Rn=de.seat,Fs(),Pd(),Yt.sys("Chat online activo: puedes escribir a tu rival."),Co(kl(de.g,Rn)),Yt.sys(`Sala ${de.code}: juegas con ${Vl(0)}.`)},onMoves:(n,e,t)=>{t?(kn.length=0,Co(kl(n,Rn))):(kn.push(...e),Jr||Sm())},onSettled:()=>{!Jr&&!kn.length&&$e&&($e=!1,ve())}}))}const Id=Sn.savedCode();Id&&(Ol(),de.resume(Id).catch(()=>{de=null,Sn.clearSaved(),Zs("")}));document.addEventListener("menu:ia",()=>{de&&(de.close(),de=null,Rn=0,kn.length=0,Jr=!1,Zs(""),Fs(),Co(ea()),Qr())});document.addEventListener("menu:online",()=>Pl(Dl()));ve();Qr();Dg();sg(n=>{n&&ig()});
