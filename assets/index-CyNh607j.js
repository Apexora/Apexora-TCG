var ng=Object.defineProperty;var rg=(n,e,t)=>e in n?ng(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var $e=(n,e,t)=>rg(n,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=t(s);fetch(s.href,i)}})();let G,er,ks,Li,ws,Ja=!1,vt=!1,Vu=!1,Ad=0,Ia=0,Nu=0,Ri=0;try{vt=localStorage.getItem("cartas-mute")==="1"}catch{}const sg=()=>vt;function ig(){vt=!vt;try{localStorage.setItem("cartas-mute",vt?"1":"0")}catch{}return Ja&&Li.gain.setTargetAtTime(vt?0:.85,G.currentTime,.06),vt}function og(n){Ad=n}const K=n=>440*Math.pow(2,(n-69)/12),Ts=(n,e)=>n+Math.random()*(e-n);function ag(n){const e=G.sampleRate,t=Math.floor(e*n),r=G.createBuffer(2,t,e);for(let s=0;s<2;s++){const i=r.getChannelData(s);let a=0;for(let l=0;l<t;l++){const u=l/t,h=.9-.78*u;a+=(Math.random()*2-1-a)*h,i[l]=l<e*.018?0:a*Math.pow(1-u,2.8)*(l<e*.02?.2:1)}for(const[l,u]of[[23,.5],[37,.35],[53,.3],[71,.22]])i[Math.floor(e*(l+s*5)/1e3)]+=u*(s?-1:1)}return r}function Ll(){if(Ja){G.state==="suspended"&&G.resume();return}G=new AudioContext,Ja=!0;const n=G.createDynamicsCompressor();n.threshold.value=-20,n.knee.value=18,n.ratio.value=3.5,n.attack.value=.004,n.release.value=.22;const e=G.createBiquadFilter();e.type="lowshelf",e.frequency.value=140,e.gain.value=2.5;const t=G.createBiquadFilter();t.type="highshelf",t.frequency.value=6500,t.gain.value=1.5,Li=G.createGain(),Li.gain.value=vt?0:.85;const r=G.createGain();r.connect(e).connect(t).connect(n).connect(Li).connect(G.destination);const s=G.createConvolver();s.buffer=ag(3.2);const i=G.createGain();i.gain.value=.9,s.connect(i).connect(r);const a=G.createDelay(1);a.delayTime.value=.375;const l=G.createGain();l.gain.value=.4;const u=G.createBiquadFilter();u.type="lowpass",u.frequency.value=2200,a.connect(u).connect(l).connect(a),u.connect(r),u.connect(s),er=G.createGain(),ks=G.createGain(),ks.gain.value=.55;const h=(p,g,S)=>{p.connect(r);const k=G.createGain();if(k.gain.value=g,p.connect(k).connect(s),S){const V=G.createGain();V.gain.value=S,p.connect(V).connect(a)}};h(er,.32,.06),h(ks,.6,.22),ws=G.createWaveShaper();const f=new Float32Array(1024);for(let p=0;p<1024;p++){const g=p/512-1;f[p]=Math.tanh(g*4)*.8}ws.curve=f,ws.oversample="2x",ws.connect(er)}function ge(n,e,t,r={}){const s=G.createGain(),i=G.createBiquadFilter(),a=G.createStereoPanner(),l=(r.vol??.1)*(r.det?.6:1),u=r.att??.004;if(i.type="lowpass",i.Q.value=r.q??.7,i.frequency.setValueAtTime(r.lp??9e3,e),r.lpEnd&&i.frequency.exponentialRampToValueAtTime(Math.max(40,r.lpEnd),e+t),a.pan.value=r.pan??0,s.gain.setValueAtTime(1e-4,e),s.gain.linearRampToValueAtTime(l,e+u),r.pad){const h=r.rel??t*.4;s.gain.setValueAtTime(l,e+Math.max(u,t-h)),s.gain.linearRampToValueAtTime(1e-4,e+t)}else s.gain.exponentialRampToValueAtTime(1e-4,e+t);i.connect(s).connect(a).connect(r.bus??er);for(const h of r.det?[-r.det,r.det]:[0]){const f=G.createOscillator();if(f.type=r.type??"sine",f.frequency.setValueAtTime(n,e),f.detune.value=h,r.slide&&f.frequency.exponentialRampToValueAtTime(Math.max(20,n*Math.pow(2,r.slide/12)),e+t),r.vib){const p=G.createOscillator(),g=G.createGain();p.frequency.value=5,g.gain.value=r.vib,p.connect(g).connect(f.detune),p.start(e),p.stop(e+t+.1)}f.connect(i),f.start(e),f.stop(e+t+.1)}}function ke(n,e,t,r={}){const s=G.createOscillator(),i=G.createOscillator(),a=G.createGain(),l=G.createGain(),u=G.createStereoPanner(),h=(r.idx??2)*n;s.frequency.value=n,i.frequency.value=n*(r.ratio??2.01),a.gain.setValueAtTime(h,e),a.gain.exponentialRampToValueAtTime(Math.max(1,h*.02),e+t),i.connect(a).connect(s.frequency),l.gain.setValueAtTime(1e-4,e),l.gain.linearRampToValueAtTime(r.vol??.1,e+(r.att??.003)),l.gain.exponentialRampToValueAtTime(1e-4,e+t),u.pan.value=r.pan??0,s.connect(l).connect(u).connect(r.bus??er),s.start(e),i.start(e),s.stop(e+t+.1),i.stop(e+t+.1)}let _s;function Sd(){if(_s)return _s;_s=G.createBuffer(1,G.sampleRate*2,G.sampleRate);const n=_s.getChannelData(0);let e=0,t=0,r=0;for(let s=0;s<n.length;s++){const i=Math.random()*2-1;e=.99765*e+i*.099,t=.963*t+i*.2965,r=.57*r+i*1.0527,n[s]=(e+t+r+i*.1848)*.2}return _s}function Ve(n,e,t={}){const r=G.createBufferSource(),s=G.createBiquadFilter(),i=G.createGain(),a=G.createStereoPanner(),l=t.att??.004;r.buffer=Sd(),s.type=t.type??"bandpass",s.Q.value=t.q??1,s.frequency.setValueAtTime(t.f0??1e3,n),s.frequency.exponentialRampToValueAtTime(Math.max(30,t.f1??t.f0??1e3),n+e),i.gain.setValueAtTime(1e-4,n),i.gain.linearRampToValueAtTime(t.vol??.1,n+l),i.gain.exponentialRampToValueAtTime(1e-4,n+e),a.pan.value=t.pan??0,r.connect(s).connect(i).connect(a).connect(t.bus??er),r.start(n,Math.random()*1.4),r.stop(n+e+.05)}function pe(n,e,t,r){const s=G.createOscillator(),i=G.createGain();s.frequency.setValueAtTime(e*2.2,n),s.frequency.exponentialRampToValueAtTime(e,n+.09),i.gain.setValueAtTime(t,n),i.gain.exponentialRampToValueAtTime(1e-4,n+.7),s.connect(i).connect(r??er),s.start(n),s.stop(n+.75),Ve(n,.06,{type:"lowpass",f0:1200,f1:300,vol:t*.5,bus:r})}const Le=()=>G.currentTime+.01,Cr={hover:()=>ke(K(96),Le(),.09,{vol:.02,ratio:3.5,idx:.8,pan:Ts(-.3,.3)}),click:()=>{const n=Le();Ve(n,.06,{f0:2200,f1:900,q:2,vol:.12}),ge(220,n,.1,{vol:.14,slide:-7})},select:()=>{const n=Le();ke(K(84),n,.5,{vol:.07,ratio:2,idx:1.2,pan:-.15}),ke(K(91),n+.06,.6,{vol:.05,ratio:2,idx:1,pan:.15})},start:()=>{const n=Le();[38,45,50,57,62,65].forEach((t,r)=>ge(K(t),n,2.4,{type:"sawtooth",vol:.035,att:1,pad:!0,rel:1.2,lp:300,lpEnd:3200,det:9,pan:(r-2.5)*.15})),Ve(n,1.3,{f0:300,f1:7e3,q:.8,vol:.13,att:1.15}),pe(n,40,.5);const e=n+1.25;pe(e,48,1),[62,65,69,74,81].forEach((t,r)=>ge(K(t),e,2.6,{type:"triangle",vol:.06,lp:4e3,pan:(r-2)*.25})),ke(K(86),e,3,{vol:.09,ratio:1.5,idx:2})},pass:()=>{const n=Le();Ve(n,.35,{f0:600,f1:200,q:1.2,vol:.09,att:.08}),ge(K(50),n,.3,{vol:.08,slide:-5})},summon:()=>{const n=Le();pe(n,48,.9),Ve(n,.5,{type:"lowpass",f0:3e3,f1:150,q:.7,vol:.25}),[81,86,90,93].forEach((e,t)=>ke(K(e),n+.05+t*.05,1.2,{vol:.05,ratio:3,idx:1.5,pan:(t-1.5)*.3})),ge(K(38),n,.9,{type:"sawtooth",vol:.08,lp:1500,lpEnd:150,det:12,att:.02})},summon_lum:()=>{const n=Le();pe(n,52,.85),Ve(n,.75,{type:"bandpass",f0:400,f1:6500,q:.8,vol:.12,att:.4}),ge(K(45),n+.12,1.3,{type:"triangle",vol:.11,lp:1800,att:.03}),[69,73,76,81,85].forEach((e,t)=>ke(K(e),n+.2+t*.06,1.7,{vol:.06,ratio:2,idx:1.4,pan:(t-2)*.25})),ke(K(93),n+.45,2.2,{vol:.045,ratio:3.01,idx:1})},summon_umb:()=>{const n=Le();ge(K(33),n,1.4,{type:"sawtooth",vol:.16,slide:-9,lp:1800,lpEnd:90,det:14,att:.02}),pe(n,40,1),Ve(n,.9,{type:"lowpass",f0:2200,f1:90,q:.7,vol:.22}),Ve(n+.1,.8,{type:"bandpass",f0:300,f1:1500,q:2,vol:.08,att:.3}),ke(K(58),n+.05,1.9,{vol:.06,ratio:1.41,idx:3}),ke(K(65),n+.12,1.7,{vol:.05,ratio:1.41,idx:2.5,pan:.3})},spell_lum:()=>{const n=Le();[74,76,78,81,83,86,90].forEach((e,t)=>ge(K(e),n+t*.055,1.3,{type:"triangle",vol:.07,pan:-.5+t*.16})),ke(K(93),n+.4,2.2,{vol:.06,ratio:2.76,idx:1}),Ve(n,1.2,{type:"highpass",f0:5e3,f1:9e3,vol:.05,att:.5})},spell_umb:()=>{const n=Le();ge(K(50),n,1.4,{type:"sawtooth",vol:.12,slide:-12,lp:2400,lpEnd:100,det:15}),ge(K(25),n,1.6,{vol:.35,att:.05}),Ve(n,1.2,{type:"lowpass",f0:200,f1:2600,vol:.18,att:.9}),ke(K(63),n+.2,2,{ratio:1.414,idx:3,vol:.06,pan:-.3}),ke(K(57),n+.2,2,{ratio:1.414,idx:3,vol:.05,pan:.3})},attack:()=>{const n=Le(),e=n+.2;Ve(n,.22,{f0:800,f1:7e3,q:1.5,vol:.18,att:.12}),ke(K(88),e,.7,{ratio:3.1,idx:3,vol:.09}),ke(K(95),e,.5,{ratio:4.7,idx:2,vol:.05}),pe(e,70,.5),Ve(e,.12,{type:"highpass",f0:3e3,f1:1500,vol:.15})},hurt:()=>{const n=Le();pe(n,45,1),ge(K(40),n,.5,{type:"sawtooth",vol:.18,lp:1200,lpEnd:120,bus:ws}),Ve(n,.35,{type:"lowpass",f0:2500,f1:100,vol:.3}),ke(K(79),n+.02,1.2,{ratio:1.41,idx:2,vol:.04})},heal:()=>{const n=Le();[74,78,81,86].forEach((e,t)=>ke(K(e),n+t*.08,1.4,{vol:.06,ratio:2,idx:.8,pan:-.3+t*.2})),[62,69].forEach(e=>ge(K(e),n,1.6,{vol:.08,att:.3,pad:!0}))},death:()=>{const n=Le();ge(K(55),n,1,{type:"sawtooth",vol:.14,slide:-14,lp:2500,lpEnd:100,det:14}),Ve(n,.9,{f0:3e3,f1:150,q:.6,vol:.16}),pe(n+.05,42,.7)},round:()=>{const n=Le();[1,2.32,3.17,4.1,5.4].forEach((e,t)=>ge(K(43)*e,n,3.6-t*.4,{vol:.09/(t+1),pan:(t%2?1:-1)*.2})),pe(n,52,.8),Ve(n,.5,{f0:500,f1:3e3,vol:.06,att:.4})},win:()=>{const n=Le();[[62,66,69,74],[67,71,74,79],[69,73,76,81,86]].forEach((e,t)=>{e.forEach((r,s)=>{ge(K(r),n+t*.45,1.9,{type:"triangle",vol:.055,lp:5e3,pan:(s-2)*.2}),ke(K(r+12),n+t*.45+.02*s,1.8,{vol:.03,ratio:2,idx:.7})})}),pe(n+.9,50,.8)},lose:()=>{const n=Le();[62,60,57,55,50].forEach((e,t)=>ge(K(e),n+t*.5,2,{type:"sawtooth",vol:.07,lp:900,lpEnd:150,det:10,att:.1})),ge(K(26),n,3,{vol:.2,att:.4,pad:!0})},msg:()=>{const n=Le();ke(K(93),n,.5,{vol:.05,ratio:2,idx:.6}),ke(K(98),n+.08,.6,{vol:.04,ratio:2,idx:.6})}},Fi=new Map;function lg(n){Fi.has(n)||(Fi.set(n,null),fetch(`/Apexora-TCG/sfx/${n}.mp3`).then(e=>{e.ok&&(e.headers.get("content-type")||"").startsWith("audio")&&Fi.set(n,e.url)}).catch(()=>{}))}const ot=(n,e,t=.07,r=.06,s=2,i=1.4)=>e.forEach((a,l)=>ke(K(a),n+l*t,1.5,{vol:r,ratio:s,idx:i,pan:(l-(e.length-1)/2)*.25})),ba=(n,e,t=.06,r=.07)=>e.forEach((s,i)=>ge(K(s),n+i*t,1.1,{type:"triangle",vol:r,pan:(i-(e.length-1)/2)*.2})),on=(n,e,t=.9,r=.1)=>ge(K(e),n,t,{type:"sawtooth",vol:r,lp:500,lpEnd:2600,att:.12,det:8}),Rt=(n,e,t=1,r=.14,s=-8)=>ge(K(e),n,t,{type:"sawtooth",vol:r,slide:s,lp:1800,lpEnd:90,det:14,att:.02}),Aa=(n,e,t=1.2,r=.1)=>ge(K(e),n,t,{type:"sawtooth",vol:r,slide:5,lp:1500,lpEnd:600,vib:25,att:.2}),kt=(n,e,t=1.6,r=.04)=>e.forEach((s,i)=>ge(K(s),n,t,{type:"sawtooth",vol:r,pad:!0,att:.5,rel:.8,lp:1400,vib:12,det:6,pan:(i-(e.length-1)/2)*.3})),_t=(n,e,t,r=.6,s=.12,i=.3)=>Ve(n,r,{type:"bandpass",f0:e,f1:t,q:.9,vol:s,att:i}),ki=(n,e=.5,t=.08)=>Ve(n,e,{type:"highpass",f0:5e3,f1:9e3,vol:t,att:.1}),ys=(n,e=1,t=.2)=>Ve(n,e,{type:"lowpass",f0:900,f1:80,q:.7,vol:t,att:.06}),at=(n,e,t=.07)=>{ke(K(e),n,1.6,{vol:t,ratio:1.41,idx:3}),ke(K(e+7),n+.02,1.3,{vol:t*.7,ratio:2.76,idx:2})},vs=(n,e,t=.05,r=.1)=>{for(let s=0;s<e;s++)Ve(n+s*t,.04,{type:"highpass",f0:3e3,f1:6e3,vol:r,pan:s%2?.3:-.3})},Sa=(n,e,t=.05,r=.09)=>{for(let s=0;s<e;s++)Ve(n+s*t,.09,{type:"bandpass",f0:1500,f1:600,q:1,vol:r,att:.02,pan:s%2?.4:-.4})},cg={lum_acolita:n=>{ot(n,[84,88,91],.08,.05),ba(n+.05,[76,79],.1,.05)},lum_vigia:n=>{on(n,57,.5,.08),ot(n+.2,[88],.1,.05),pe(n,55,.4)},lum_centinela:n=>{at(n,62),at(n+.1,69,.05),pe(n,50,.7)},lum_portador:n=>{ba(n,[72,76,79,84],.07),_t(n,800,4e3,.5,.08)},lum_halcon:n=>{_t(n,3e3,800,.4,.12,.05),Sa(n+.05,5,.04),ot(n+.3,[96],.1,.05)},lum_novicia:n=>{kt(n,[69,72,76],1.2),ot(n+.2,[81],.1,.05)},lum_sanadora:n=>{ba(n,[67,71,74,79,83],.08),kt(n,[67,74],1.5)},lum_vidente:n=>{ot(n,[88,93,98],.12),_t(n,2e3,6e3,.7,.06,.4)},lum_oraculo:n=>{kt(n,[62,69,74],1.7),ot(n+.2,[86,90],.15),ki(n,.6,.05)},lum_paladin:n=>{on(n,50,.9,.12),at(n+.05,67),Sa(n+.1,6,.05,.07)},lum_heraldo:n=>{on(n,62,.8),on(n+.15,69,.8),ot(n+.3,[93],.1)},lum_coloso:n=>{pe(n,43,1),at(n,38,.09),kt(n,[50,57],1.6),pe(n+.2,40,.7)},lum_lider:n=>{on(n,55,.5),on(n+.25,62,.5),on(n+.5,67,.9,.12),at(n+.5,74),pe(n+.5,48,.8)},lum_serafin:n=>{Sa(n,10,.045),kt(n,[74,81,86,93],2),ot(n+.3,[98,105],.15)},lum_arcangel:n=>{pe(n,40,1),on(n,45,1.4,.14),kt(n,[57,64,69,76],2.2),ot(n+.4,[93,100,105],.14),_t(n,500,7e3,.9,.1,.5)},umb_sombra:n=>{_t(n,1500,300,.6,.12,.08),Rt(n,45,.7,.06,-5)},umb_aprendiz:n=>{vs(n,4,.06),Rt(n+.1,52,.4,.08,-4)},umb_acechador:n=>{ki(n,.35,.1),at(n+.05,86,.04),pe(n+.05,48,.5)},umb_cultista:n=>{kt(n,[45,48,52],1.5,.05),ot(n+.2,[63,69],.2,.05,1.41,2.5)},umb_espectro:n=>{_t(n,4e3,500,.5,.1,.05),ge(K(88),n,.7,{vol:.06,slide:-14,vib:30})},umb_esqueleto:n=>{vs(n,8,.04,.12),pe(n+.1,55,.5),at(n+.3,60,.03)},umb_reptante:n=>{ki(n,.9,.1),Rt(n,40,.9,.1,-3),vs(n+.3,3,.08,.08)},umb_lobo:n=>{Aa(n,57,1.3),Rt(n,40,.6,.1)},umb_sanguijuela:n=>{Ve(n,.5,{type:"lowpass",f0:900,f1:200,vol:.18,att:.15}),ge(K(52),n,.6,{vol:.08,slide:7,vib:40})},umb_ritualista:n=>{kt(n,[45,51,58],1.8,.05),ot(n+.15,[63,69],.2,.05,1.41,2.5),_t(n,400,2500,.8,.06,.4)},umb_golem:n=>{pe(n,36,1),at(n,40,.1),ys(n,1,.2),at(n+.18,43,.07)},umb_verdugo:n=>{_t(n,3e3,400,.3,.12,.05),at(n+.2,50,.1),pe(n+.2,38,.9),Rt(n+.2,38,.8,.1)},umb_jinete:n=>{[0,.12,.24,.36].forEach((e,t)=>pe(n+e,t%2?55:60,.6)),Aa(n+.3,69,1,.08),_t(n,600,3e3,.7,.08,.3)},umb_basalto:n=>{pe(n,38,1),ys(n,1.1,.2),at(n,43,.08),vs(n+.1,3,.07,.1)},umb_devoradora:n=>{Rt(n,35,1.4,.15,-9),ki(n,.8,.09),ot(n+.2,[58,64],.15,.05,1.41,3),Aa(n+.3,45,1.1,.06)},umb_azote:n=>{_t(n,800,5e3,.3,.14,.04),at(n+.1,74,.08),Rt(n+.1,43,.6,.12),vs(n+.15,3,.05)},umb_behemot:n=>{pe(n,34,1),pe(n+.35,34,.8),Rt(n,31,1.6,.2,-6),ys(n,1.2,.22)},umb_abisal:n=>{Rt(n,29,2,.2,-10),kt(n,[34,41,46],2.4,.05),ys(n,1.6,.18),ot(n+.3,[58,65],.2,.05,1.41,3)},umb_senor:n=>{pe(n,32,1),kt(n,[38,45,50,57],2.4,.05),at(n+.05,33,.12),_t(n,300,4e3,1,.08,.5),ot(n+.5,[69,75],.2,.05,1.41,3)},umb_titan:n=>{[0,.3,.6].forEach(e=>pe(n+e,30,1)),Rt(n,26,2.2,.22,-8),ys(n,1.8,.24),at(n+.6,36,.12)}};for(const[n,e]of Object.entries(cg))Cr["u_"+n]=()=>e(Le());function ug(n){if(!vt)try{Ll(),(Cr["u_"+n]??Cr[n.startsWith("umb")?"summon_umb":"summon_lum"])()}catch{}}function _e(n){var t;if(vt)return;lg(n);const e=Fi.get(n);if(e){const r=new Audio(e);r.volume=.7,r.play().catch(()=>{});return}try{Ll(),(t=Cr[n])==null||t.call(Cr)}catch{}}const Ui=60/72,$i=Ui*4,hg=[38,34,41,36],dg=[[62,65,69,74],[58,62,65,70],[57,60,65,69],[55,60,64,67]],xu=[62,65,67,69,72,74,77];function fg(n,e){if(vt||document.hidden)return;Ia+=(Ad-Ia)*.5;const t=e%4,r=dg[t],s=Ia,i=ks;if(r.forEach((l,u)=>ge(K(l),n,$i*1.08,{type:"sawtooth",vol:.02,att:1.2,pad:!0,rel:1.3,lp:650+s*900,det:8+u*2,pan:(u-1.5)*.35,bus:i})),ge(K(hg[t]),n,$i*1.02,{vol:.15,att:.25,pad:!0,rel:1,bus:i}),[0,2,1,3,2,1,3,2].forEach((l,u)=>{if(Math.random()<(s?.9:.7)){const h=r[l]+(u%4===3&&Math.random()<.4?12:0)+12;ge(K(h),n+u*Ui/2,1.1,{type:"triangle",vol:.035+s*.01,pan:Math.sin(u)*.5,bus:i})}}),e%2===0&&Math.random()<.7&&ke(K(xu[Math.floor(Math.random()*xu.length)]+12),n+Ui*(Math.random()<.5?0:2),3,{vol:.045,ratio:2,idx:.7,pan:Ts(-.5,.5),bus:i}),t===0&&pe(n,44,.35,i),s>.5)for(let l=0;l<4;l++)pe(n+l*Ui,l%2?80:58,l===2?.28:.18,i);for(let l=0;l<4;l++)Math.random()<.6&&Ve(n+Ts(0,$i),.03,{type:"highpass",f0:4e3,f1:3e3,vol:Ts(.008,.02),pan:Ts(-.8,.8),bus:i})}function pg(){const n=G.createBufferSource(),e=G.createBiquadFilter(),t=G.createGain(),r=G.createOscillator(),s=G.createGain();n.buffer=Sd(),n.loop=!0,e.type="bandpass",e.frequency.value=420,e.Q.value=.9,t.gain.value=.045,r.frequency.value=.07,s.gain.value=.03,r.connect(s).connect(t.gain);const i=G.createOscillator(),a=G.createGain();return i.frequency.value=.05,a.gain.value=250,i.connect(a).connect(e.frequency),n.connect(e).connect(t).connect(ks),n.start(),r.start(),i.start(),()=>{t.gain.setTargetAtTime(0,G.currentTime,.4),setTimeout(()=>{n.stop(),r.stop(),i.stop()},2e3)}}function mg(){Vu||(Ll(),Vu=!0,Nu=0,Ri=G.currentTime+.15,pg(),window.setInterval(()=>{for(;Ri<G.currentTime+1.3;)fg(Ri,Nu++),Ri+=$i},400))}const gg={lum:[45,168],umb:[272,350],fire:[22,48],heal:[145,50]},Se=Math.random,L=(n,e)=>n+Se()*(e-n),Ra=n=>1-(1-n)**3;let vr,x,Fr=0,An=0,Xa=!1,Ya=0;const Tr=[];function J(n){Tr.push({x:0,y:0,vx:0,vy:0,g:0,d:1,t:0,life:600,delay:0,sz:4,gr:0,rot:0,vr:0,h:45,s:100,l:70,a:1,n:0,w:2,add:!0,x1:0,y1:0,bulge:0,pts:[],cx:0,cy:0,ang:0,rad:0,va:0,vrad:0,...n}),Xa||(Xa=!0,Ya=performance.now(),requestAnimationFrame(Rd))}const Vr=(n,e)=>setTimeout(e,n);function Rd(n){const e=Math.min(40,n-Ya),t=e/16.667;Ya=n,x.clearRect(0,0,Fr,An);for(let r=Tr.length-1;r>=0;r--){const s=Tr[r];if(s.delay>0){s.delay-=e;continue}if(s.t+=e,s.t>=s.life){Tr.splice(r,1);continue}if(s.k==="vort"){if(s.ang+=s.va*e,s.rad+=s.vrad*e,s.rad<2){Tr.splice(r,1);continue}s.x=s.cx+Math.cos(s.ang)*s.rad,s.y=s.cy+Math.sin(s.ang)*s.rad}else{s.vy+=s.g*t;const i=s.d**t;s.vx*=i,s.vy*=i,s.x+=s.vx*t,s.y+=s.vy*t,s.rot+=s.vr*t}_g(s)}x.globalCompositeOperation="source-over",Tr.length?requestAnimationFrame(Rd):(Xa=!1,x.clearRect(0,0,Fr,An))}function _g(n){const e=n.t/n.life,t=1-e,r=s=>`hsla(${n.h},${n.s}%,${n.l}%,${Math.max(0,s)})`;switch(x.globalCompositeOperation=n.add?"lighter":"source-over",n.k){case"spark":x.lineCap="round",x.strokeStyle=r(t*.45),x.lineWidth=n.sz*2.6*t+1,x.beginPath(),x.moveTo(n.x,n.y),x.lineTo(n.x-n.vx*2.6,n.y-n.vy*2.6),x.stroke(),x.strokeStyle=`hsla(${n.h},60%,92%,${t})`,x.lineWidth=n.sz*t+.4,x.stroke();break;case"glow":case"smoke":case"vort":{const s=Math.max(1,n.sz*(1+n.gr*(n.k==="vort"?0:e))),i=n.a*(n.k==="smoke"?Math.min(1,e*6)*t:t),a=x.createRadialGradient(n.x,n.y,0,n.x,n.y,s);a.addColorStop(0,r(i)),a.addColorStop(.4,r(i*.45)),a.addColorStop(1,r(0)),x.fillStyle=a,x.beginPath(),x.arc(n.x,n.y,s,0,6.3),x.fill();break}case"ring":x.strokeStyle=r(n.a*t),x.lineWidth=n.w*t+.6,x.beginPath(),x.arc(n.x,n.y,n.sz+n.gr*Ra(e),0,6.3),x.stroke();break;case"shard":x.save(),x.translate(n.x,n.y),x.rotate(n.rot),x.fillStyle=r(t*.95),x.beginPath(),x.moveTo(0,-n.sz),x.lineTo(n.sz*.45,n.sz*.6),x.lineTo(-n.sz*.4,n.sz*.5),x.closePath(),x.fill(),x.strokeStyle=`hsla(${n.h},40%,95%,${t})`,x.lineWidth=1,x.stroke(),x.restore();break;case"rune":{const s=n.sz*Ra(Math.min(1,e*2.6)),i=n.a*(e<.12?e/.12:e>.6?(1-e)/.4:1),a=n.rot+n.vr*n.t;x.strokeStyle=r(i),x.lineWidth=2.2,x.beginPath(),x.arc(n.x,n.y,s,0,6.3),x.stroke(),x.lineWidth=1,x.beginPath(),x.arc(n.x,n.y,s*.84,0,6.3),x.stroke(),x.lineWidth=1.6,x.beginPath();for(let l=0;l<n.n;l++){const u=a+l/n.n*6.283,h=l%2?.93:.88;x.moveTo(n.x+Math.cos(u)*s*.84,n.y+Math.sin(u)*s*.84),x.lineTo(n.x+Math.cos(u)*s*(h+.07),n.y+Math.sin(u)*s*(h+.07))}if(x.stroke(),n.w>2){const l=n.w,u=l%2?(l-1)/2:l/2-1||1;x.lineWidth=1.8,x.beginPath();for(let h=0;h<=l;h++){const f=-a*.7-1.5708+h*u%l/l*6.283,p=n.x+Math.cos(f)*s*.8,g=n.y+Math.sin(f)*s*.8;h?x.lineTo(p,g):x.moveTo(p,g)}x.stroke()}break}case"pillar":{const s=n.sz*(.35+.65*Math.sin(Math.min(1,e*1.4)*1.57))*(e>.6?(1-e)/.4:1),i=n.a*(e<.1?e/.1:e>.55?(1-e)/.45:1),a=x.createLinearGradient(n.x-s,0,n.x+s,0);a.addColorStop(0,r(0)),a.addColorStop(.5,r(i)),a.addColorStop(1,r(0));const l=x.createLinearGradient(0,n.y-n.gr,0,n.y);l.addColorStop(0,"rgba(255,255,255,0)"),l.addColorStop(.4,"rgba(255,255,255,1)"),l.addColorStop(1,"rgba(255,255,255,0)"),x.fillStyle=a,x.fillRect(n.x-s,n.y-n.gr,s*2,n.gr);break}case"bolt":if(Se()<.25)break;x.lineJoin="round",x.strokeStyle=r(t*.7),x.lineWidth=n.sz*3,x.beginPath(),n.pts.forEach((s,i)=>i?x.lineTo(s[0],s[1]):x.moveTo(s[0],s[1])),x.stroke(),x.strokeStyle=`hsla(${n.h},50%,96%,${t})`,x.lineWidth=n.sz*.8,x.stroke();break;case"slash":{const s=Ra(Math.min(1,e*4)),i=n.x+(n.x1-n.x)*s,a=n.y+(n.y1-n.y)*s,l=(n.x+i)/2,u=(n.y+a)/2,h=-(a-n.y),f=i-n.x,p=Math.hypot(h,f)||1,g=n.bulge*s,S=h/p*g,k=f/p*g;x.beginPath(),x.moveTo(n.x,n.y),x.quadraticCurveTo(l+S,u+k,i,a),x.quadraticCurveTo(l+S*.3,u+k*.3,n.x,n.y),x.fillStyle=`hsla(${n.h},60%,96%,${t})`,x.shadowColor=`hsl(${n.h},100%,60%)`,x.shadowBlur=24,x.fill(),x.shadowBlur=0,x.strokeStyle=r(t*.7),x.lineWidth=3,x.stroke();break}}}const ct=(n,e=0)=>gg[n][e];function Jn(n,e,t,r,s,i={}){for(let a=0;a<t;a++){const l=i.rot??Se()*6.283,u=L(.35,1)*s,h=i.rot!==void 0?L(-.5,.5):0;J({k:"spark",x:n,y:e,vx:Math.cos(l+h)*u,vy:Math.sin(l+h)*u,g:.16,d:.93,life:L(420,820),sz:L(1.6,3),h:ct(r,Se()<.35?1:0),l:66,...i,rot:0})}}function eo(n,e,t,r,s=L(-.9,-.5)){const i=Math.cos(s)*t,a=Math.sin(s)*t;J({k:"slash",x:n-i,y:e-a,x1:n+i,y1:e+a,bulge:t*.28,life:420,h:ct(r),s:100,l:66,add:!0}),J({k:"slash",x:n-i*.8,y:e-a*.8+t*.12,x1:n+i*.9,y1:e+a*.9+t*.12,bulge:t*.2,life:360,delay:60,h:ct(r,1),s:100,l:70,add:!0})}function Is(n,e,t,r,s=1){J({k:"glow",x:n,y:e,sz:t*.95,gr:1.1,life:420,h:ct(r),l:78,a:.95}),J({k:"glow",x:n,y:e,sz:t*.38,gr:.3,life:180,h:50,s:40,l:96,a:1}),J({k:"ring",x:n,y:e,sz:t*.12,gr:t*1.05,w:7,life:520,h:ct(r),l:72}),J({k:"ring",x:n,y:e,sz:t*.1,gr:t*.75,w:3,life:480,delay:90,h:ct(r,1),l:74}),eo(n,e,t*.8,r),Jn(n,e,Math.round(26*s),r,t*.1);for(let i=0;i<7*s;i++){const a=Se()*6.283,l=L(2,6)*t/110;J({k:"shard",x:n,y:e,vx:Math.cos(a)*l,vy:Math.sin(a)*l-1.5,g:.2,d:.97,rot:Se()*6,vr:L(-.25,.25),sz:t*L(.05,.1),life:L(520,860),h:ct(r,i%2),l:62})}for(let i=0;i<3;i++)J({k:"smoke",x:n+L(-8,8),y:e,vx:L(-.5,.5),vy:L(-.7,-.1),d:.98,sz:t*L(.3,.5),gr:1,life:L(700,1e3),a:.3,h:r==="umb"?272:30,s:40,l:r==="umb"?30:60})}const Bi=n=>n.getBoundingClientRect();function Du(){const n=document.getElementById("app");n&&(n.classList.remove("shk-soft","shk-hard"),n.offsetWidth,n.classList.add("shk-hard"))}function yg(n,e,t,r){const a=e.width,l=e.height,u=e.left+a/2,h=e.top+l/2,f=Array.from({length:5},(V,N)=>Array.from({length:4},(W,B)=>[B/3*a+(B&&B<3?L(-.09,.09)*a:0),N/4*l+(N&&N<4?L(-.07,.07)*l:0)])),p=n.cloneNode(!0);p.classList.remove("dying","enter","hurt","boost"),p.removeAttribute("data-a"),p.removeAttribute("data-uid"),p.style.cssText=`--w:${a}px;position:fixed;left:${e.left}px;top:${e.top}px;width:${a}px;height:${l}px;margin:0;animation:none;transition:none;pointer-events:none;z-index:90;will-change:transform,opacity`;const g=document.createDocumentFragment(),S=[],k=[];for(let V=0;V<4;V++)for(let N=0;N<3;N++){const W=f[V][N],B=f[V][N+1],$=f[V+1][N+1],z=f[V+1][N],ae=(N+V)%2;for(const q of ae?[[W,B,z],[B,$,z]]:[[W,B,$],[W,$,z]]){const E=p.cloneNode(!0),_=(q[0][0]+q[1][0]+q[2][0])/3,y=(q[0][1]+q[1][1]+q[2][1])/3;E.style.clipPath=`polygon(${q.map(St=>St[0].toFixed(1)+"px "+St[1].toFixed(1)+"px").join(",")})`;const w=_-a/2,T=y-l/2,I=Math.hypot(w,T)||1,v=L(.8,1.9)*a*.55*r,it=L(-240,240)*r;g.append(E),k.push(E),S.push(E.animate([{transform:"translate(0,0) rotate(0)",opacity:1,filter:"brightness(2.6) saturate(1.4)"},{transform:`translate(${w/I*v*.55}px,${T/I*v*.55-l*.12}px) rotate(${it*.5}deg)`,opacity:1,filter:"brightness(1.2)",offset:.35},{transform:`translate(${w/I*v}px,${T/I*v+l*L(.5,1)}px) rotate(${it}deg) scale(.8)`,opacity:0,filter:"brightness(.6)"}],{duration:L(650,1e3),easing:"cubic-bezier(.2,.7,.4,1)",fill:"forwards"}))}}document.body.append(g),Promise.allSettled(S.map(V=>V.finished)).then(()=>k.forEach(V=>V.remove())),J({k:"glow",x:u,y:h,sz:a*1.1,gr:.6,life:380,h:ct(t),l:85,a:.8}),J({k:"ring",x:u,y:h,sz:a*.2,gr:a*1.2*r,w:6,life:520,h:ct(t),l:78})}function vg(n,e,t){J({k:"glow",x:n,y:e,sz:t*.9,gr:.6,life:1100,h:46,l:82,a:.55}),J({k:"pillar",x:n,y:An,sz:t*.55,gr:An*1.1,life:1250,h:48,l:76,a:.7}),J({k:"rune",x:n,y:e,sz:t,n:28,w:8,life:1500,rot:0,vr:7e-4,h:46,l:72,a:.95}),J({k:"rune",x:n,y:e,sz:t*.62,n:18,w:6,life:1400,delay:80,rot:1,vr:-.0011,h:168,l:70,a:.85});for(let r=0;r<46;r++){const s=Se()*6.283,i=L(.2,1)*t;J({k:"glow",x:n+Math.cos(s)*i,y:e+Math.sin(s)*i*.55+t*.3,vx:L(-.3,.3),vy:-L(.8,3.2),g:-.01,d:.995,sz:L(3,8),life:L(800,1500),delay:Se()*600,h:Se()<.3?168:48,l:82,a:.9})}Vr(460,()=>{J({k:"ring",x:n,y:e,sz:t*.2,gr:t*2.1,w:10,life:800,h:48,l:80}),J({k:"ring",x:n,y:e,sz:t*.1,gr:t*1.5,w:4,life:700,h:168,l:80}),J({k:"glow",x:n,y:e,sz:t*1.3,gr:.5,life:500,h:50,s:40,l:96,a:.8}),Jn(n,e,44,"lum",t*.085)})}function Eg(n,e,t){J({k:"smoke",x:n,y:e,sz:t*1.2,gr:.8,life:1500,h:270,s:60,l:14,a:.55,add:!1}),J({k:"rune",x:n,y:e,sz:t,n:20,w:5,life:1500,rot:0,vr:-9e-4,h:350,l:62,a:.95}),J({k:"rune",x:n,y:e,sz:t*.66,n:12,w:0,life:1400,delay:70,rot:2,vr:.0012,h:272,l:68,a:.85});for(let r=0;r<80;r++)J({k:"vort",cx:n,cy:e,ang:Se()*6.283,rad:L(.55,1.5)*t,va:L(.0035,.006),vrad:-L(6e-4,.0011)*t,sz:L(3,7),life:1200,delay:Se()*350,h:Se()<.5?272:350,l:68,a:.9});Vr(720,()=>{J({k:"glow",x:n,y:e,sz:t*1.1,gr:.8,life:520,h:300,s:90,l:70,a:.85}),J({k:"ring",x:n,y:e,sz:t*.15,gr:t*2.2,w:11,life:800,h:350,l:62}),J({k:"ring",x:n,y:e,sz:t*.1,gr:t*1.6,w:4,life:740,delay:80,h:272,l:72}),Jn(n,e,52,"umb",t*.09);for(let r=0;r<7;r++){const s=Se()*6.283,i=[[n,e]];let a=n,l=e,u=s;for(let h=0;h<9;h++)u+=L(-.55,.55),a+=Math.cos(u)*t*.17,l+=Math.sin(u)*t*.17,i.push([a,l]);J({k:"bolt",pts:i,sz:2.4,life:520,h:r%2?350:280,l:66})}for(let r=0;r<8;r++){const s=Se()*6.283,i=L(3,8);J({k:"shard",x:n,y:e,vx:Math.cos(s)*i,vy:Math.sin(s)*i,d:.965,rot:Se()*6,vr:L(-.3,.3),sz:L(8,16),life:800,h:r%2?350:272,l:58})}for(let r=0;r<6;r++)J({k:"smoke",x:n+L(-30,30),y:e+L(-20,20),vx:L(-1,1),vy:L(-1,.2),d:.985,sz:t*L(.3,.55),gr:1.1,life:1300,h:275,s:55,l:16,a:.5,add:!1})})}function wg(n,e,t,r){const s=document.createElement("div");s.className="dmgnum "+r,s.textContent=t,s.style.left=n+"px",s.style.top=e+"px",document.body.append(s),setTimeout(()=>s.remove(),1500)}function Tg(n,e){var k;const t=n.closest(".pt"),r=t==null?void 0:t.querySelector(".ava"),s=r?Bi(r):e,i=!!(t!=null&&t.classList.contains("me")),a=(((k=n.querySelector(".fx"))==null?void 0:k.textContent)??"").trim(),l=Math.abs(parseInt(a.replace(/[^\d-]/g,""),10)||3),u=Math.min(2,.8+l*.13),h=s.left+s.width/2,f=s.top+s.height/2,p=s.width*2.3*u;J({k:"glow",x:h,y:f,sz:p*1.35,gr:.9,life:560,h:358,l:62,a:1}),J({k:"glow",x:h,y:f,sz:p*.55,gr:.4,life:240,h:40,s:30,l:97,a:1}),J({k:"ring",x:h,y:f,sz:p*.15,gr:p*1.7,w:14,life:760,h:355,l:62}),J({k:"ring",x:h,y:f,sz:p*.1,gr:p*1.2,w:7,life:700,delay:80,h:25,l:68}),J({k:"ring",x:h,y:f,sz:p*.1,gr:p*2.4,w:3,life:900,delay:170,h:350,l:70}),eo(h,f,p*.95,"fire",-.75),eo(h,f,p*.95,"umb",.75);for(let V=0;V<16;V++){const N=V/16*6.283+L(-.1,.1);Jn(h,f,1,"fire",p*.26,{rot:N,life:L(380,620),sz:3.4})}Jn(h,f,Math.round(60*u),"fire",p*.12),Jn(h,f,24,"umb",p*.1);for(let V=0;V<16;V++){const N=Se()*6.283,W=L(3,9)*p/140;J({k:"shard",x:h,y:f,vx:Math.cos(N)*W,vy:Math.sin(N)*W-2,g:.24,d:.975,rot:Se()*6,vr:L(-.3,.3),sz:p*L(.05,.11),life:L(600,1e3),h:V%3?355:28,l:60})}for(let V=0;V<5;V++)J({k:"smoke",x:h+L(-14,14),y:f,vx:L(-.8,.8),vy:L(-1,-.2),d:.985,sz:p*L(.3,.5),gr:1.1,life:L(900,1300),a:.35,h:355,s:50,l:22,add:!1});Vr(140,()=>{Is(h,f,p*.6,"fire",1),Jn(h,f,30,"fire",p*.14)});const g=document.createElement("div");g.className="nexflash"+(i?" mine":" foe"),document.body.append(g),setTimeout(()=>g.remove(),900);const S=document.getElementById("app");S&&(S.classList.remove("shk-soft","shk-hard"),S.offsetWidth,S.classList.add("shk-hard")),wg(h,f-s.height*.15,a||"−"+l,i?"mine":"foe")}let Ou=-1e9,ka="lum";const Pi=new Map,qn=(n,e)=>{const t=performance.now();return t-(Pi.get(n)??-1e9)<e?!1:(Pi.set(n,t),Pi.size>80&&Pi.clear(),!0)},Pa=n=>n.classList.contains("umb")?"umb":"lum";function Ig(n){const e=Bi(n),t=e.left+e.width/2,r=e.top+e.height/2,s=n.className.split(" ")[0]+Math.round(t/24)+","+Math.round(r/24),i=n.classList;if(i.contains("cast")){if(!qn("cast",500))return;const a=document.querySelector(".plane-wrap"),l=a?Bi(a):null,u=l?l.left+l.width/2:Fr/2,h=l?l.top+l.height*.5:An/2,f=Math.min(l?l.width:Fr,l?l.height:An)*.42;Ou=performance.now(),ka=i.contains("umb")?"umb":"lum",(i.contains("umb")?Eg:vg)(u,h,f)}else if(i.contains("card")&&i.contains("attacking")){if(!qn("a"+s,800))return;const a=Pa(n),l=i.contains("up")?-1:1,u=e.width;J({k:"glow",x:t,y:r,sz:u*.95,gr:.2,life:520,h:ct(a),l:70,a:.6});for(let h=0;h<18;h++){const f=Se()*6.283,p=u*L(.8,1.5);J({k:"vort",cx:t,cy:r,ang:f,rad:p,va:.004,vrad:-p/360,sz:L(2.5,5),life:380,delay:Se()*90,h:ct(a,h%3?0:1),l:76,a:.9})}Vr(430,()=>{const h=t,f=r+l*(e.height*.5+46);for(let p=0;p<12;p++)J({k:"spark",x:t+L(-u*.4,u*.4),y:r+l*e.height*.3,vx:L(-1.2,1.2),vy:-l*L(3,9),g:0,d:.93,life:L(260,480),sz:2,h:ct(a,p%2),l:72});J({k:"ring",x:h,y:f,sz:u*.1,gr:u*.95,w:6,life:380,h:ct(a),l:76}),eo(h,f,u*.75,a,l<0?L(-2.5,-2.1):L(.55,1))})}else if(i.contains("card")&&i.contains("strike")&&i.contains("clash")){const a=document.querySelector(".card.duelblk");if(!a)return;const l=Pa(n),u=Bi(a),h=Math.sign(u.top+u.height/2-r)||1,f=e.width;Vr(250,()=>{const p=u.left+u.width/2,g=u.top+u.height/2-h*u.height/2+h*4;J({k:"glow",x:p,y:g,sz:f*1.3,gr:.5,life:260,h:48,s:40,l:96,a:1}),Is(p,g,f*1.15,l,1.4),Is(p,g,f*.7,"fire",1),Du()})}else if(i.contains("card")&&i.contains("dying")){if(!qn("d"+s,900))return;const a=Pa(n),l=e.width,u=performance.now()-Ou<2200,h=u?ka:a;n.style.animation="none",Vr(u?ka==="umb"?720:460:0,()=>{n.style.opacity="0",yg(n,e,h,u?1.7:1.15),Is(t,r,l*1.05,h,u?1.5:1.1),u&&Du();for(let f=0;f<14;f++)J({k:"glow",x:t+L(-l*.35,l*.35),y:r+L(-l*.2,l*.3),vx:L(-.3,.3),vy:-L(.6,2),g:-.008,sz:L(3,7),life:L(900,1500),delay:Se()*250,h:ct(h,f%2),l:80,a:.9})})}else if(i.contains("card")&&i.contains("hurt")){if(!qn("h"+s,500))return;Is(t,r,e.width*.75,"fire",.7)}else if(i.contains("card")&&i.contains("boost")){if(!qn("b"+s,500))return;J({k:"ring",x:t,y:r+e.height*.2,sz:e.width*.2,gr:e.width*.8,w:4,life:600,h:145,l:74});for(let a=0;a<16;a++)J({k:"glow",x:t+L(-e.width*.4,e.width*.4),y:r+e.height*.35,vy:-L(1,3.2),g:-.02,d:.99,sz:L(3,6),life:L(600,1e3),delay:Se()*250,h:Se()<.5?145:48,l:78,a:.9})}else if(i.contains("orb")&&i.contains("hit")){if(!qn("oh"+s,700))return;Tg(n,e)}else if(i.contains("orb")&&i.contains("heal")){if(!qn("oe"+s,700))return;J({k:"ring",x:t,y:r,sz:e.width*.3,gr:e.width*1.5,w:5,life:700,h:145,l:74}),J({k:"glow",x:t,y:r,sz:e.width*1.3,gr:.5,life:600,h:145,l:78,a:.7});for(let a=0;a<22;a++)J({k:"glow",x:t+L(-e.width,e.width),y:r+L(0,e.width*.6),vy:-L(1,3),g:-.02,d:.99,sz:L(3,7),life:L(700,1300),delay:Se()*300,h:Se()<.5?145:48,l:80,a:.9})}}const Mu=".card.strike.clash,.card.attacking,.card.dying,.card.hurt,.card.boost,.orb.hit,.orb.heal,.vfx.cast";function bg(){if(matchMedia("(prefers-reduced-motion:reduce)").matches)return;vr=document.createElement("canvas"),vr.id="combatfx",document.body.append(vr),x=vr.getContext("2d");const n=()=>{const e=Math.min(2,devicePixelRatio||1);Fr=innerWidth,An=innerHeight,vr.width=Fr*e,vr.height=An*e,x.setTransform(e,0,0,e,0,0)};n(),addEventListener("resize",n),new MutationObserver(e=>{const t=[];e.forEach(r=>r.addedNodes.forEach(s=>{s instanceof HTMLElement&&(s.matches(Mu)&&t.push(s),s.querySelectorAll(Mu).forEach(i=>t.push(i)))})),t.sort((r,s)=>+s.classList.contains("cast")-+r.classList.contains("cast")).forEach(Ig)}).observe(document.body,{childList:!0,subtree:!0})}const Ca=(n,e,t)=>n.style.setProperty(e,t);function Ag(){const n=document.createElement("canvas");n.id="embers",document.body.prepend(n);const e=n.getContext("2d");let t=0,r=0;const s=[],i=()=>{t=n.width=innerWidth,r=n.height=innerHeight};i(),addEventListener("resize",i);for(let l=0;l<90;l++)s.push({x:Math.random()*2e3,y:Math.random()*1200,r:Math.random()*2+.4,v:Math.random()*.5+.12,a:Math.random()*.6+.2,hue:Math.random()<.55?40:265,ph:Math.random()*6});let a=0;(function l(){a+=.01,e.clearRect(0,0,t,r);for(const u of s){u.y-=u.v,u.x+=Math.sin(a+u.ph)*.35,u.y<-10&&(u.y=r+10,u.x=Math.random()*t);const h=.6+Math.sin(a*3+u.ph)*.4;e.beginPath(),e.fillStyle=`hsla(${u.hue},95%,68%,${u.a*h})`,e.shadowColor=`hsl(${u.hue},95%,60%)`,e.shadowBlur=10,e.arc(u.x%t,u.y,u.r,0,6.3),e.fill()}requestAnimationFrame(l)})()}function Sg(){const n=document.createElement("div");n.id="glow",document.body.append(n);let e=0,t=0,r=0,s=0;addEventListener("pointermove",i=>{r=i.clientX,s=i.clientY}),function i(){e+=(r-e)*.14,t+=(s-t)*.14,n.style.transform=`translate(${e-160}px,${t-160}px)`,requestAnimationFrame(i)}()}function Rg(){let n=null;document.addEventListener("pointermove",t=>{const r=t.target.closest(".card");if(!r)return;const s=r.getBoundingClientRect(),i=(t.clientX-s.left)/s.width,a=(t.clientY-s.top)/s.height;Ca(r,"--mx",(i*100).toFixed(1)+"%"),Ca(r,"--my",(a*100).toFixed(1)+"%"),Ca(r,"--ang",((i-.5)*60).toFixed(1)+"deg")});let e=0;document.addEventListener("pointerover",t=>{const r=t.target.closest(".slotc,.card[data-a],button,.btn");if(!r||r===n)return;n=r;const s=performance.now();s-e>70&&(_e("hover"),e=s)}),document.addEventListener("pointerout",()=>{n=null})}function kg(){new MutationObserver(n=>n.forEach(e=>e.addedNodes.forEach(t=>{if(!(t instanceof HTMLElement)||!t.classList.contains("vfx"))return;const r=t.classList;r.contains("vhit")?Ci("hard"):r.contains("banner")&&!r.contains("small")?Lu("#ffd27a33"):r.contains("cast")?(Lu(r.contains("lum")?"#8fe9ff33":"#a24dff44"),Ci("soft")):r.contains("report")&&Ci("soft")}))).observe(document.body,{childList:!0}),new MutationObserver(()=>document.querySelectorAll(".card.attacking:not(.fxdone)").forEach(n=>{n.classList.add("fxdone"),Ci("soft")})).observe(document.getElementById("app"),{childList:!0,subtree:!0})}function Ci(n){const e=document.getElementById("app");e.classList.remove("shk-soft","shk-hard"),e.offsetWidth,e.classList.add("shk-"+n)}function Lu(n){const e=document.createElement("div");e.className="flash",e.style.background=`radial-gradient(circle at 50% 50%,${n},transparent 70%)`,document.body.append(e),setTimeout(()=>e.remove(),700)}let to=null;function kd(){if(to)return;const n=to=document.createElement("div");n.id="title",n.innerHTML=`<div class="t-bg"></div><div class="t-art l"></div><div class="t-art u"></div>
    <div class="t-in"><p class="t-kicker"><i></i>DUELO DE LEYENDAS<i></i></p><h1>CARTAS</h1><div class="t-sub"><i></i><span>ALFA</span><i></i></div>
    <div class="t-fac"><b class="l">☀ LUMINARAE</b><i>◆</i><b class="u">UMBRA ☾</b></div>
    <div class="t-menu"><button class="t-go" data-m="ia" autofocus>⚔ JUGAR CONTRA LA IA</button><button class="t-go alt" data-m="online">🌐 JUGAR ONLINE</button></div>
    <p class="t-hint">Elige un modo · sonido activado</p></div>`,document.body.append(n),n.querySelectorAll("[data-m]").forEach(e=>e.addEventListener("click",()=>{_e("start"),mg(),e.dataset.m==="ia"?(Pd(),document.dispatchEvent(new Event("menu:ia"))):document.dispatchEvent(new Event("menu:online"))}))}function Pd(){const n=to;n&&(to=null,n.classList.add("out"),setTimeout(()=>n.remove(),900))}function Pg(){kd()}function Cg(){bg(),Ag(),Sg(),Rg(),kg(),Pg()}const se=(n,e,t,r,s,i=[],a="",l=[],u)=>({id:n,name:e,cost:t,type:"unit",atk:r,hp:s,kw:i,text:a,fx:l,grow:u}),Te=(n,e,t,r,s,i)=>({id:n,name:e,cost:t,type:"spell",atk:0,hp:0,kw:[],text:s,fx:i,speed:r}),Cd=[se("lum_acolita","Acólita del Alba",1,1,1,[],"Al jugarla: cura 2 a tu Nexo.",[{t:"healNexus",n:2}]),se("lum_vigia","Vigía del Alba",1,1,2,["regenera"]),se("lum_centinela","Centinela Radiante",2,2,2,["barrera"]),se("lum_portador","Portador de Luz",2,2,1,[],"Al jugarla: +1/+1 a otra aliada.",[{t:"buffOther",a:1,h:1}]),se("lum_halcon","Halcón Dorado",2,3,1,["elusivo"]),se("lum_novicia","Novicia Curandera",2,1,3,["robovida"]),se("lum_sanadora","Sanadora de Aurora",3,3,3,["robovida"]),se("lum_vidente","Vidente del Alba",3,2,3,[],"Al jugarla: roba 1.",[{t:"draw",n:1}]),se("lum_oraculo","Oráculo Sereno",3,2,2,[],"Al jugarla: roba 1 y cura 2 a tu Nexo.",[{t:"draw",n:1},{t:"healNexus",n:2}]),se("lum_paladin","Paladín Alado",4,3,4,["barrera"]),se("lum_heraldo","Heraldo Solar",4,2,3,[],"Al jugarla: +1/+1 a tus unidades.",[{t:"buffAll",a:1,h:1}]),se("lum_coloso","Coloso de Marfil",5,4,4,["barrera","robovida"]),se("lum_lider","Capitana Aurora",5,4,5,["rapido","retador"]),se("lum_serafin","Serafín Eterno",6,5,6,["elusivo","robovida"]),se("lum_arcangel","Arcángel del Amanecer",7,5,5,["barrera"],"Al jugarla: cura 4 a tu Nexo.",[{t:"healNexus",n:4}]),Te("lum_destello","Destello Sanador",1,"burst","Cura 4 a tu Nexo.",[{t:"healNexus",n:4}]),Te("lum_rocio","Rocío Vital",1,"burst","Cura 3 a una unidad aliada.",[{t:"healUnit",n:3}]),Te("lum_fervor","Fervor",2,"burst","Una aliada gana +2/+0 esta ronda.",[{t:"tempBuff",a:2,h:0}]),Te("lum_escudo","Escudo de Fe",2,"fast","Una aliada gana Barrera.",[{t:"giveKw",kw:"barrera"}]),Te("lum_velo","Velo Etéreo",2,"fast","Una aliada gana Elusivo.",[{t:"giveKw",kw:"elusivo"}]),Te("lum_absorcion","Luz Absorbente",2,"fast","Inflige 2 a una enemiga y cura 2 a tu Nexo.",[{t:"drain",n:2}]),Te("lum_plegaria","Plegaria",3,"fast","Cura 5 a tu Nexo y roba 1.",[{t:"healNexus",n:5},{t:"draw",n:1}]),Te("lum_resplandor","Resplandor",3,"fast","Tus unidades ganan +1/+1 esta ronda.",[{t:"tempBuffAll",a:1,h:1}]),Te("lum_juicio","Juicio Radiante",4,"fast","Inflige 4 a una unidad enemiga.",[{t:"dmgEnemy",n:4}]),Te("lum_escarcha","Escarcha Sagrada",3,"focus","Una unidad enemiga tiene 0 de poder esta ronda.",[{t:"frost"}]),Te("lum_vision","Visión del Alba",2,"focus","Roba 2 cartas.",[{t:"draw",n:2}]),Te("lum_bendicion","Bendición",2,"slow","Una aliada gana +2/+2.",[{t:"buffAlly",a:2,h:2}]),Te("lum_renacer","Renacer",3,"slow","Una aliada gana Regeneración y se cura 4.",[{t:"giveKw",kw:"regenera"},{t:"healUnit",n:4}]),Te("lum_estrellas","Lluvia de Estrellas",4,"slow","Inflige 2 a todas las unidades enemigas y cura 2 a tu Nexo.",[{t:"dmgAll",n:2},{t:"healNexus",n:2}]),Te("lum_amanecer","Amanecer Eterno",6,"slow","Cura 6 a tu Nexo y +1/+1 a tus unidades.",[{t:"healNexus",n:6},{t:"buffAll",a:1,h:1}])],Vd=[se("umb_sombra","Sombra Inquieta",1,2,1),se("umb_aprendiz","Aprendiz de Huesos",1,1,2,["duro"]),se("umb_acechador","Acechador Nocturno",2,1,1,["letal"]),se("umb_cultista","Cultista del Vacío",2,3,3,[],"Al jugarla: tu Nexo recibe 1.",[{t:"hurtNexus",n:1}]),se("umb_espectro","Espectro Fugaz",2,3,1,["rapido","efimero"]),se("umb_esqueleto","Esqueleto Guardián",2,1,4,["duro"]),se("umb_reptante","Reptante Abisal",3,2,3,["temible"]),se("umb_lobo","Lobo de Ceniza",3,3,3,["arrollar"]),se("umb_sanguijuela","Sanguijuela",3,3,2,["robovida"]),se("umb_ritualista","Ritualista",3,2,2,[],"Al jugarla: sacrifica una aliada para robar 2.",[{t:"sacDraw",n:2}]),se("umb_golem","Gólem de Hierro",3,2,5,["duro"]),se("umb_verdugo","Verdugo Sombrío",4,3,3,["letal"]),se("umb_jinete","Jinete Espectral",4,5,3,["arrollar"]),se("umb_basalto","Centinela de Basalto",4,3,5,["duro"]),se("umb_devoradora","Devoradora de Almas",5,4,4,[],"Gana +1/+1 cuando muere una aliada.",[],{a:1,h:1}),se("umb_azote","Azote del Vacío",5,4,3,["rapido","arrollar"]),se("umb_behemot","Behemot de Hierro",5,5,5,["duro"]),se("umb_abisal","Coloso Abisal",6,5,5,["duro","robovida"]),se("umb_senor","Señor de la Noche Eterna",7,6,6,["letal"]),se("umb_titan","Titán Regenerante",8,7,7,["regenera","arrollar"]),Te("umb_punalada","Puñalada",1,"burst","Inflige 2 a una unidad enemiga.",[{t:"dmgEnemy",n:2}]),Te("umb_piel","Piel de Hierro",2,"burst","Una aliada gana Duro.",[{t:"giveKw",kw:"duro"}]),Te("umb_embestida","Embestida",3,"focus","Inflige 3 al Nexo enemigo.",[{t:"dmgNexus",n:3}]),Te("umb_furia","Furia Sombría",2,"fast","Una aliada gana +3/+0 esta ronda.",[{t:"tempBuff",a:3,h:0}]),Te("umb_drenar","Drenar",3,"fast","Inflige 3 a una enemiga y cura 3 a tu Nexo.",[{t:"drain",n:3}]),Te("umb_plaga","Plaga Sombría",3,"fast","Inflige 1 a todas las unidades enemigas.",[{t:"dmgAll",n:1}]),Te("umb_pacto","Pacto de Sangre",2,"slow","Sacrifica tu unidad más débil; daña a una enemiga igual a su ataque.",[{t:"sacDmg"}]),Te("umb_maldicion","Maldición de Sombras",4,"slow","Las unidades enemigas pierden 2/2.",[{t:"debuffEnemies",a:2,h:2}]),Te("umb_aplastar","Aplastar",4,"slow","Inflige 5 a una unidad enemiga.",[{t:"dmgEnemy",n:5}]),Te("umb_eclipse","Eclipse",6,"slow","Destruye una unidad enemiga y roba 1.",[{t:"destroyEnemy"},{t:"draw",n:1}])],ce=Object.fromEntries([...Cd,...Vd].map(n=>[n.id,n])),Vg=["lum_acolita","lum_vigia","lum_centinela","lum_portador","lum_novicia","lum_halcon","lum_destello","lum_rocio","lum_escudo","lum_bendicion"],Ng=["umb_sombra","umb_aprendiz","umb_acechador","umb_esqueleto","umb_cultista","umb_lobo","umb_golem","umb_punalada","umb_furia","umb_drenar"],Ms={Luminarae:[...Cd.map(n=>n.id),...Vg],Umbra:[...Vd.map(n=>n.id),...Ng]},Ye=n=>1-n;function Nd(n){n.seed=n.seed+1831565813|0;let e=n.seed;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function xd(n,e){for(let t=e.length-1;t>0;t--){const r=Math.floor(Nd(n)*(t+1));[e[t],e[r]]=[e[r],e[t]]}}function Ur(n,e,t){const r=n.p[e];for(let s=0;s<t;s++){const i=r.deck.pop();if(!i){n.winner=Ye(e);break}r.hand.length<10&&r.hand.push(i)}}const no=(n,e,t)=>{n.p[e].nexus=Math.min(20,n.p[e].nexus+t)},le=n=>Math.max(0,n.atk+n.ta),Re=n=>n.hp+n.th-n.dmg,pn=n=>{n.dmg=n.hp+n.th+999},ro=n=>le(n)*1e6+Re(n)*1e3+ce[n.card].cost,Ht=n=>n.reduce((e,t)=>!e||ro(t)>ro(e)?t:e,void 0),Fu=n=>n.reduce((e,t)=>!e||ro(t)<ro(e)?t:e,void 0),xg=["dmgEnemy","drain","destroyEnemy","sacDmg","frost"],Dg=["buffAlly","giveKw","tempBuff","healUnit"];function Kr(n){const e=ce[n];return!e||e.type!=="spell"?null:e.fx.some(t=>xg.includes(t.t))?"enemy":e.fx.some(t=>Dg.includes(t.t))?"ally":null}function Fl(n,e){return!(n.kw.includes("elusivo")&&!e.kw.includes("elusivo")||n.kw.includes("temible")&&le(e)<3)}function Dd(n,e){const t=s=>({nexus:20,deck:[...s],hand:[],board:[],mana:0,maxMana:0,spell:0,played:[]}),r={p:[t(n[0]),t(n[1])],round:0,token:0,active:0,phase:"mulligan",passes:0,winner:null,seed:e,uid:0,log:[],stack:[],attackers:[],blocks:{},forced:[],tok:[!1,!1],resumePhase:"main",mull:[!1,!1]};return r.p.forEach(s=>xd(r,s.deck)),Ur(r,0,4),Ur(r,1,4),r.token=Nd(r)<.5?0:1,r}function Va(n,e,t){const r=n.p[e],s=[...new Set(t)].filter(i=>i>=0&&i<r.hand.length).sort((i,a)=>a-i);for(const i of s)r.deck.push(r.hand.splice(i,1)[0]);xd(n,r.deck),Ur(n,e,s.length)}function Za(n){if(n.round++,n.round>40){n.winner=-1;return}n.token=Ye(n.token),n.active=n.token,n.phase="main",n.passes=0,n.attackers=[],n.blocks={},n.forced=[],n.stack=[],n.tok=[!1,!1],n.tok[n.token]=!0;for(const e of[n.token,Ye(n.token)]){const t=n.p[e];if(t.maxMana=Math.min(10,t.maxMana+1),t.mana=t.maxMana,Ur(n,e,1),n.winner!==null)return}n.log=n.log.slice(-40),n.log.push(`— Ronda ${n.round} (ficha: J${n.token+1}) —`),rr(n)}function Og(n){for(const e of n.p)e.spell=Math.min(3,e.spell+e.mana),e.mana=0;for(const e of n.p)e.board.forEach(t=>{t.kw.includes("regenera")&&(t.dmg=0)});for(const e of n.p)e.board.forEach(t=>{t.kw.includes("efimero")&&pn(t)});Sn(n);for(const e of n.p)e.board.forEach(t=>{t.ta=0,t.th=0,t.dmg>=t.hp&&(t.dmg=t.hp-1)});rr(n),n.winner===null&&Za(n)}function rr(n){if(n.winner!==null)return;const e=n.p[0].nexus<=0,t=n.p[1].nexus<=0;e&&t?n.winner=-1:e?n.winner=1:t&&(n.winner=0)}function Sn(n){for(let e=!0;e;){e=!1;for(const t of n.p){const r=t.board.filter(s=>Re(s)<=0);if(r.length){e=!0,t.board=t.board.filter(s=>Re(s)>0);for(const s of t.board){const i=ce[s.card].grow;i&&(s.atk+=i.a*r.length,s.hp+=i.h*r.length)}}}}}function Rr(n,e,t,r){if(t<=0)return 0;const s=e.kw.indexOf("barrera");if(s>=0)return e.kw.splice(s,1),0;if(e.kw.includes("duro")&&(t=Math.max(0,t-1)),t<=0)return 0;const i=Math.min(t,Math.max(0,Re(e)));return e.dmg+=t,r&&(r.u.kw.includes("letal")&&pn(e),r.u.kw.includes("robovida")&&no(n,r.owner,i)),i}function el(n,e,t,r,s){const i=n.p[e],a=n.p[Ye(e)];switch(t.t){case"healNexus":no(n,e,t.n);break;case"hurtNexus":i.nexus-=t.n;break;case"dmgNexus":a.nexus-=t.n;break;case"draw":Ur(n,e,t.n);break;case"buffOther":{const l=Ht(i.board.filter(u=>u!==r));l&&(l.atk+=t.a,l.hp+=t.h);break}case"buffAlly":{const l=s??Ht(i.board);l&&(l.atk+=t.a,l.hp+=t.h);break}case"tempBuff":{const l=s??Ht(i.board);l&&(l.ta+=t.a,l.th+=t.h);break}case"healUnit":{const l=s??i.board.find(u=>u.dmg>0);l&&(l.dmg=Math.max(0,l.dmg-t.n));break}case"tempBuffAll":i.board.forEach(l=>{l.ta+=t.a,l.th+=t.h});break;case"buffAll":i.board.forEach(l=>{l.atk+=t.a,l.hp+=t.h});break;case"giveKw":{const l=s??Ht(i.board);l&&!l.kw.includes(t.kw)&&l.kw.push(t.kw);break}case"dmgEnemy":{const l=s??Ht(a.board);l&&Rr(n,l,t.n);break}case"drain":{const l=s??Ht(a.board);l&&no(n,e,Rr(n,l,t.n));break}case"dmgAll":a.board.forEach(l=>Rr(n,l,t.n));break;case"frost":{const l=s??Ht(a.board);l&&(l.ta-=le(l));break}case"sacDraw":{const l=Fu(i.board.filter(u=>u!==r));l&&(pn(l),Sn(n),Ur(n,e,t.n));break}case"sacDmg":{const l=Fu(i.board),u=s??Ht(a.board);if(l&&u){const h=le(l);pn(l),Rr(n,u,h)}break}case"debuffEnemies":a.board.forEach(l=>{l.atk=Math.max(0,l.atk-t.a),l.hp-=t.h});break;case"destroyEnemy":{const l=s??Ht(a.board);l&&pn(l);break}}Sn(n)}function Qr(n,e,t){const r=n.p[e],s=ce[r.hand[t]];if(!s||n.winner!==null||n.active!==e||n.phase==="mulligan")return!1;if(s.type==="unit")return n.phase==="main"&&!n.stack.length&&!n.attackers.length&&r.board.length<6&&s.cost<=r.mana;if(s.cost>r.mana+r.spell)return!1;const i=s.speed??"fast";if((i==="slow"||i==="focus")&&(n.phase!=="main"||n.stack.length||n.attackers.length))return!1;const a=Kr(s.id);return!(a==="enemy"&&!n.p[Ye(e)].board.length||a==="ally"&&!r.board.length||s.fx.some(l=>l.t==="sacDmg")&&!r.board.length)}function Od(n){if(n.phase!=="block"&&!(n.phase==="stack"&&n.resumePhase==="block"))return;const e=n.p[n.token],t=n.p[Ye(n.token)];for(const r of Object.keys(n.blocks)){const s=e.board.find(a=>String(a.uid)===r),i=t.board.find(a=>a.uid===n.blocks[r]);s&&i&&Fl(s,i)||(s&&i&&n.log.push(`Bloqueo anulado: {${i.card}} ya no puede bloquear a {${s.card}}`),delete n.blocks[r],n.forced=n.forced.filter(a=>String(a)!==r))}}function Mg(n){const e=n.stack.pop();if(!e)return;const t=ce[e.card],r=Kr(e.card);let s;if(r&&(s=[...n.p[0].board,...n.p[1].board].find(i=>i.uid===e.target),!s)){n.log.push(`{${e.card}} se disipa: el objetivo ya no existe`);return}n.log.push(`Se resuelve {${e.card}}`),t.fx.forEach(i=>el(n,e.owner,i,void 0,s)),Sn(n),rr(n)}function Lg(n){var t;const e=((t=n.stack[0])==null?void 0:t.owner)??n.active;for(;n.stack.length&&n.winner===null;)Mg(n);n.winner===null&&(Od(n),n.phase=n.resumePhase,n.active=Ye(e),n.passes=0)}function Fg(n){const e=n.token,t=Ye(e),r=n.p[e],s=n.p[t],i=n.attackers.map(h=>r.board.find(f=>f.uid===h)).filter(h=>!!h).map(h=>({u:h,had:n.blocks[String(h.uid)]!==void 0,b:s.board.find(f=>f.uid===n.blocks[String(h.uid)])})),a=new Set,l=(h,f)=>{f<=0||(n.p[t].nexus-=f,h.kw.includes("robovida")&&no(n,e,f))},u=(h,f,p)=>{const g=Re(p)+(p.kw.includes("duro")?1:0),S=le(h);return Rr(n,p,S,{u:h,owner:f}),a.add(h.uid),Math.max(0,S-g)};for(const{u:h,b:f}of i)if(f&&h.kw.includes("rapido")&&le(h)>0){const p=u(h,e,f);h.kw.includes("arrollar")&&l(h,p),h.kw.includes("efimero")&&pn(h)}if(Sn(n),rr(n),n.winner===null){for(const{u:h,had:f,b:p}of i){if(Re(h)<=0)continue;const g=a.has(h.uid);if(p&&Re(p)>0){let S=0;!g&&le(h)>0&&(S=u(h,e,p)),le(p)>0&&Rr(n,h,le(p),{u:p,owner:t}),h.kw.includes("arrollar")&&!g&&l(h,S),h.kw.includes("efimero")&&!g&&pn(h)}else f?h.kw.includes("arrollar")&&!g&&l(h,le(h)):(l(h,le(h)),h.kw.includes("efimero")&&le(h)>0&&pn(h))}Sn(n),rr(n),n.attackers=[],n.blocks={},n.forced=[],n.winner===null&&(n.phase="main",n.active=t,n.passes=0)}}function Ls(n,e){if(n.winner!==null)return n;const t=structuredClone(n),r=t.active,s=t.p[r],i=t.p[Ye(r)];if(e.type==="mulligan")return t.phase!=="mulligan"?n:e.player!==void 0?e.player!==0&&e.player!==1||t.mull[e.player]||!Array.isArray(e.idx)?n:(Va(t,e.player,e.idx),t.mull[e.player]=!0,t.mull[0]&&t.mull[1]&&Za(t),t):(Va(t,0,e.idx),Va(t,1,t.p[1].hand.map((a,l)=>ce[a].cost>=4?l:-1).filter(a=>a>=0)),Za(t),t);if(t.phase==="mulligan")return n;if(e.type==="play"){if(!Qr(t,r,e.hand))return n;const a=s.hand[e.hand],l=ce[a],u=Kr(a);let h;if(u&&(h=(u==="enemy"?i:s).board.find(f=>f.uid===e.target),!h))return n;if(l.type==="unit")s.mana-=l.cost;else{const f=Math.min(s.spell,l.cost);s.spell-=f,s.mana-=l.cost-f}if(s.hand.splice(e.hand,1),s.played.push(a),t.log.push(`J${r+1} juega {${a}}`),l.type==="unit"){const f={uid:++t.uid,card:a,atk:l.atk,hp:l.hp,dmg:0,kw:[...l.kw],ta:0,th:0};s.board.push(f),l.fx.forEach(p=>el(t,r,p,f)),Sn(t),rr(t),t.active=Ye(r),t.passes=0}else{const f=l.speed??"fast";f==="burst"||f==="focus"?(l.fx.forEach(p=>el(t,r,p,void 0,h)),Sn(t),rr(t),Od(t)):(t.resumePhase=t.phase==="stack"?t.resumePhase:t.phase,t.stack.push({card:a,owner:r,target:h==null?void 0:h.uid}),t.phase="stack",t.active=Ye(r),t.passes=0)}}else if(e.type==="pass"||e.type==="confirmBlocks"){if(e.type==="confirmBlocks"&&!(t.phase==="block"&&r===Ye(t.token)))return n;t.log.push(`J${r+1} pasa prioridad`),t.phase==="stack"?Lg(t):t.phase==="block"?r===Ye(t.token)?(t.active=t.token,t.passes=1):Fg(t):++t.passes>=2?Og(t):t.active=Ye(r)}else if(e.type==="attack"){if(t.phase!=="main"||t.stack.length||t.attackers.length||!t.tok[r])return n;const a=[...new Set(e.units)].map(u=>s.board[u]).filter(u=>!!u);if(!a.length)return n;t.tok[r]=!1,t.attackers=a.map(u=>u.uid),t.blocks={},t.forced=[];const l=new Set;for(const u of a)if(u.kw.includes("retador")){const h=i.board.filter(f=>!l.has(f.uid)).sort((f,p)=>(le(u)>=Re(p)?1:0)-(le(u)>=Re(f)?1:0)||Re(f)-Re(p))[0];h&&(t.blocks[String(u.uid)]=h.uid,t.forced.push(u.uid),l.add(h.uid))}t.phase="block",t.active=Ye(r),t.passes=0,t.log.push(`J${r+1} declara ataque con ${a.length} unidad(es)`)}else if(e.type==="block"){if(t.phase!=="block"||r!==Ye(t.token))return n;const a=t.p[t.token].board[e.attacker],l=s.board[e.blocker];if(!a||!l||!t.attackers.includes(a.uid)||t.forced.includes(a.uid)||!Fl(a,l))return n;const u=String(a.uid);if(t.blocks[u]===l.uid)delete t.blocks[u];else{if(Object.values(t.blocks).includes(l.uid))return n;t.blocks[u]=l.uid}}return t}const Ug=n=>ce[n].fx.reduce((e,t)=>e+(t.t==="dmgEnemy"||t.t==="drain"?t.n:0),0),Es=n=>le(n)*10+Re(n);function Uu(n,e){const t=n.p[e],r=n.p[1-e];let s=null;return t.hand.forEach((i,a)=>{const l=ce[i];if(l.type!=="spell"||!Qr(n,e,a))return;const u=Kr(i);let h=0,f;if(u==="enemy"){const p=[...r.board].sort((k,V)=>Es(V)-Es(k)),g=Ug(i),S=p.find(k=>g>0&&Re(k)<=g)??(l.fx.some(k=>k.t==="destroyEnemy"||k.t==="frost")?p[0]:void 0);if(!S||l.fx.some(k=>k.t==="sacDmg")&&t.board.length<2)return;f=S.uid,h=Es(S)/2+l.cost}else if(u==="ally"){const p=l.fx.some(k=>k.t==="healUnit"),S=[...p?t.board.filter(k=>k.dmg>0):t.board].sort((k,V)=>p?V.dmg-k.dmg:Es(V)-Es(k))[0];if(!S)return;f=S.uid,h=p?2+S.dmg:3}else for(const p of l.fx)p.t==="healNexus"&&t.nexus<=20-p.n?h+=2:p.t==="buffAll"&&t.board.length>=2||(p.t==="debuffEnemies"||p.t==="dmgAll")&&r.board.length>=2?h+=3:p.t==="dmgNexus"?h+=r.nexus<=p.n?20:1:p.t==="tempBuffAll"&&t.board.length>=2&&n.tok[e]?h+=3:p.t==="draw"&&(h+=t.hand.length<6?2:0);h>0&&(!s||h>s.sc)&&(s={a:{type:"play",hand:a,target:f},sc:h})}),s?s.a:null}function $g(n){const e=n.active,t=n.p[e],r=n.p[1-e];if(n.phase==="mulligan")return{type:"mulligan",idx:[]};if(n.phase==="block"){if(e===n.token)return{type:"pass"};const a=n.attackers.map(h=>n.p[n.token].board.find(f=>f.uid===h)).filter(h=>!!h),l=a.reduce((h,f)=>h+le(f),0),u=new Set(Object.values(n.blocks));for(const h of a.filter(f=>n.blocks[String(f.uid)]===void 0).sort((f,p)=>le(p)-le(f))){const f=t.board.map((g,S)=>({u:g,k:S})).filter(g=>!u.has(g.u.uid)&&Fl(h,g.u)),p=f.find(g=>le(g.u)>=Re(h)&&Re(g.u)>le(h))??f.find(g=>(le(g.u)>=Re(h)||g.u.kw.includes("letal"))&&le(h)>=3)??(t.nexus<=l?f.sort((g,S)=>Re(S.u)-Re(g.u))[0]:void 0);if(p)return{type:"block",attacker:n.p[n.token].board.indexOf(h),blocker:p.k}}return{type:"confirmBlocks"}}if(n.phase==="stack")return(Math.random()<.5?Uu(n,e):null)??{type:"pass"};let s=-1;if(t.hand.forEach((a,l)=>{ce[a].type==="unit"&&Qr(n,e,l)&&(s<0||ce[a].cost>ce[t.hand[s]].cost)&&(s=l)}),s>=0)return{type:"play",hand:s};const i=Uu(n,e);if(i&&Math.random()<.7)return i;if(n.tok[e]&&!n.attackers.length){const a=t.board.map((h,f)=>({u:h,k:f})),l=a.reduce((h,f)=>h+le(f.u),0)>=r.nexus,u=a.filter(({u:h})=>l||!r.board.length||h.kw.includes("barrera")||h.kw.includes("elusivo")||r.board.every(f=>le(f)<Re(h)&&!f.kw.includes("letal")));if(u.length)return{type:"attack",units:u.map(h=>h.k)}}return{type:"pass"}}const Md={},Bg="cartas-skins";let Ul={};try{Ul=JSON.parse(localStorage.getItem(Bg)||"{}")}catch{}const ft=n=>{var e,t;return((e=Ul[n])==null?void 0:e.name)||((t=Md[n])==null?void 0:t.name)||ce[n].name},qg=n=>{var e,t;return((e=Ul[n])==null?void 0:e.image)||((t=Md[n])==null?void 0:t.image)||`/Apexora-TCG/img/${n}.webp`},jg=new Set(Object.values(Ms).map(n=>n.filter(e=>ce[e].type==="unit").sort((e,t)=>ce[t].cost-ce[e].cost||ce[t].atk+ce[t].hp-ce[e].atk-ce[e].hp)[0])),zg=n=>jg.has(n),Hg=3300;let Er=null;function Gg(n,e,t){Er==null||Er.remove();const r=n.slice(0,3)==="umb"?"umb":"lum",s=ce[n],i=Er=document.createElement("div");i.className=`epic ${r}`;const a=Array.from({length:18},()=>`<i style="--x:${(Math.random()*100).toFixed(1)}%;--d:${(2.2+Math.random()*2.6).toFixed(2)}s;--t:${(Math.random()*1.6).toFixed(2)}s;--s:${(2+Math.random()*4).toFixed(1)}px"></i>`).join("");i.innerHTML=`<div class="ep-dim"></div><div class="ep-rays"></div><div class="ep-rays r2"></div><div class="ep-beam"></div><div class="ep-halo"></div>
    <div class="ep-dust">${a}</div><div class="ep-stage"><div class="ep-card">${e}<div class="ep-shine"></div></div>
    <div class="ep-name"><small>${r==="umb"?"EL VACÍO SE ALZA":"LA LUZ DESCIENDE"}</small><b>${s.name}</b></div></div>
    <div class="ep-ring"></div><div class="ep-flash"></div>`,document.body.append(i),document.body.classList.add("epic-on");const l=document.getElementById("app");setTimeout(()=>{i.isConnected&&l&&(l.classList.remove("shk-soft","shk-hard"),l.offsetWidth,l.classList.add("shk-hard"))},780);let u=!1;const h=()=>{u||(u=!0,i.classList.add("out"),setTimeout(()=>{i.remove(),Er===i&&(Er=null,document.body.classList.remove("epic-on")),t()},520))};i.addEventListener("click",h),setTimeout(h,Hg)}const Wg={hello:["Las sombras te saludan.","Hola, mortal. Disfruta tus últimos turnos.","¿Listo para caer?"],gg:["Buena partida. La próxima será peor para ti.","GG… por ahora."],idle:["Interesante… aunque inútil.","Habla todo lo que quieras.","La oscuridad escucha.","Juega tu carta.","..."],cast:["¿Sentiste eso?","Las sombras obedecen.","Eso va a doler."],win:["Imposible… la luz me venció esta vez.","Buena partida. Quiero la revancha."],lose:["La noche siempre gana.","Tu luz se apaga."]};class Kg{constructor(){$e(this,"cbs",[]);$e(this,"last",0)}onMessage(e){this.cbs.push(e)}emit(e){this.cbs.forEach(t=>t(e))}push(e){this.emit(e)}sys(e){this.emit({from:"",text:e,side:"sys"})}send(e){this.emit({from:"Tú",text:e,side:"me"});const t=/hola|buenas|hey/i.test(e)?"hello":/\bgg\b|bien jugado/i.test(e)?"gg":"idle";setTimeout(()=>this.say(t),700+Math.random()*900)}react(e){e==="cast"&&(Date.now()-this.last<2e4||Math.random()>.35)||this.say(e)}say(e){const t=Wg[e];this.last=Date.now(),this.emit({from:"Umbra",text:t[Math.floor(Math.random()*t.length)],side:"foe"})}}const Qg=()=>{};var $u={};/**
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
 */const Ld=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},Jg=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const s=n[t++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=n[t++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=n[t++],a=n[t++],l=n[t++],u=((s&7)<<18|(i&63)<<12|(a&63)<<6|l&63)-65536;e[r++]=String.fromCharCode(55296+(u>>10)),e[r++]=String.fromCharCode(56320+(u&1023))}else{const i=n[t++],a=n[t++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|a&63)}}return e.join("")},Fd={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){const i=n[s],a=s+1<n.length,l=a?n[s+1]:0,u=s+2<n.length,h=u?n[s+2]:0,f=i>>2,p=(i&3)<<4|l>>4;let g=(l&15)<<2|h>>6,S=h&63;u||(S=64,a||(g=64)),r.push(t[f],t[p],t[g],t[S])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Ld(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):Jg(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){const i=t[n.charAt(s++)],l=s<n.length?t[n.charAt(s)]:0;++s;const h=s<n.length?t[n.charAt(s)]:64;++s;const p=s<n.length?t[n.charAt(s)]:64;if(++s,i==null||l==null||h==null||p==null)throw new Xg;const g=i<<2|l>>4;if(r.push(g),h!==64){const S=l<<4&240|h>>2;if(r.push(S),p!==64){const k=h<<6&192|p;r.push(k)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class Xg extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Yg=function(n){const e=Ld(n);return Fd.encodeByteArray(e,!0)},so=function(n){return Yg(n).replace(/\./g,"")},Ud=function(n){try{return Fd.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function Zg(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const e_=()=>Zg().__FIREBASE_DEFAULTS__,t_=()=>{if(typeof process>"u"||typeof $u>"u")return;const n=$u.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},n_=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&Ud(n[1]);return e&&JSON.parse(e)},Ro=()=>{try{return Qg()||e_()||t_()||n_()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},$d=n=>{var e,t;return(t=(e=Ro())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},r_=n=>{const e=$d(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},Bd=()=>{var n;return(n=Ro())===null||n===void 0?void 0:n.config},qd=n=>{var e;return(e=Ro())===null||e===void 0?void 0:e[`_${n}`]};/**
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
 */class s_{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
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
 */function Jr(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function jd(n){return(await fetch(n,{credentials:"include"})).ok}/**
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
 */function i_(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},r=e||"demo-project",s=n.iat||0,i=n.sub||n.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}}},n);return[so(JSON.stringify(t)),so(JSON.stringify(a)),""].join(".")}const Ps={};function o_(){const n={prod:[],emulator:[]};for(const e of Object.keys(Ps))Ps[e]?n.emulator.push(e):n.prod.push(e);return n}function a_(n){let e=document.getElementById(n),t=!1;return e||(e=document.createElement("div"),e.setAttribute("id",n),t=!0),{created:t,element:e}}let Bu=!1;function zd(n,e){if(typeof window>"u"||typeof document>"u"||!Jr(window.location.host)||Ps[n]===e||Ps[n]||Bu)return;Ps[n]=e;function t(g){return`__firebase__banner__${g}`}const r="__firebase__banner",i=o_().prod.length>0;function a(){const g=document.getElementById(r);g&&g.remove()}function l(g){g.style.display="flex",g.style.background="#7faaf0",g.style.position="fixed",g.style.bottom="5px",g.style.left="5px",g.style.padding=".5em",g.style.borderRadius="5px",g.style.alignItems="center"}function u(g,S){g.setAttribute("width","24"),g.setAttribute("id",S),g.setAttribute("height","24"),g.setAttribute("viewBox","0 0 24 24"),g.setAttribute("fill","none"),g.style.marginLeft="-6px"}function h(){const g=document.createElement("span");return g.style.cursor="pointer",g.style.marginLeft="16px",g.style.fontSize="24px",g.innerHTML=" &times;",g.onclick=()=>{Bu=!0,a()},g}function f(g,S){g.setAttribute("id",S),g.innerText="Learn more",g.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",g.setAttribute("target","__blank"),g.style.paddingLeft="5px",g.style.textDecoration="underline"}function p(){const g=a_(r),S=t("text"),k=document.getElementById(S)||document.createElement("span"),V=t("learnmore"),N=document.getElementById(V)||document.createElement("a"),W=t("preprendIcon"),B=document.getElementById(W)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(g.created){const $=g.element;l($),f(N,V);const z=h();u(B,W),$.append(B,k,N,z),document.body.appendChild($)}i?(k.innerText="Preview backend disconnected.",B.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(B.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,k.innerText="Preview backend running in this workspace."),k.setAttribute("id",S)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",p):p()}/**
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
 */function tt(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function l_(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(tt())}function c_(){var n;const e=(n=Ro())===null||n===void 0?void 0:n.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function u_(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function h_(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function d_(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function f_(){const n=tt();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function p_(){return!c_()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function m_(){try{return typeof indexedDB=="object"}catch{return!1}}function g_(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{var i;e(((i=s.error)===null||i===void 0?void 0:i.message)||"")}}catch(t){e(t)}})}/**
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
 */const __="FirebaseError";class tn extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=__,Object.setPrototypeOf(this,tn.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Ys.prototype.create)}}class Ys{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},s=`${this.service}/${e}`,i=this.errors[e],a=i?y_(i,r):"Error",l=`${this.serviceName}: ${a} (${s}).`;return new tn(s,l,r)}}function y_(n,e){return n.replace(v_,(t,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const v_=/\{\$([^}]+)}/g;function E_(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function sr(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const s of t){if(!r.includes(s))return!1;const i=n[s],a=e[s];if(qu(i)&&qu(a)){if(!sr(i,a))return!1}else if(i!==a)return!1}for(const s of r)if(!t.includes(s))return!1;return!0}function qu(n){return n!==null&&typeof n=="object"}/**
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
 */function Zs(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function w_(n,e){const t=new T_(n,e);return t.subscribe.bind(t)}class T_{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let s;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");I_(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:r},s.next===void 0&&(s.next=Na),s.error===void 0&&(s.error=Na),s.complete===void 0&&(s.complete=Na);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function I_(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function Na(){}/**
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
 */function Ge(n){return n&&n._delegate?n._delegate:n}class ir{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const zn="[DEFAULT]";/**
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
 */class b_{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new s_;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(t=e==null?void 0:e.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(i){if(s)return null;throw i}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(S_(e))try{this.getOrInitializeService({instanceIdentifier:zn})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=zn){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=zn){return this.instances.has(e)}getOptions(e=zn){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[i,a]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(i);r===l&&a.resolve(s)}return s}onInit(e,t){var r;const s=this.normalizeInstanceIdentifier(t),i=(r=this.onInitCallbacks.get(s))!==null&&r!==void 0?r:new Set;i.add(e),this.onInitCallbacks.set(s,i);const a=this.instances.get(s);return a&&e(a,s),()=>{i.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const s of r)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:A_(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=zn){return this.component?this.component.multipleInstances?e:zn:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function A_(n){return n===zn?void 0:n}function S_(n){return n.instantiationMode==="EAGER"}/**
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
 */class R_{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new b_(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var ne;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(ne||(ne={}));const k_={debug:ne.DEBUG,verbose:ne.VERBOSE,info:ne.INFO,warn:ne.WARN,error:ne.ERROR,silent:ne.SILENT},P_=ne.INFO,C_={[ne.DEBUG]:"log",[ne.VERBOSE]:"log",[ne.INFO]:"info",[ne.WARN]:"warn",[ne.ERROR]:"error"},V_=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),s=C_[e];if(s)console[s](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class $l{constructor(e){this.name=e,this._logLevel=P_,this._logHandler=V_,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in ne))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?k_[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,ne.DEBUG,...e),this._logHandler(this,ne.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,ne.VERBOSE,...e),this._logHandler(this,ne.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,ne.INFO,...e),this._logHandler(this,ne.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,ne.WARN,...e),this._logHandler(this,ne.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,ne.ERROR,...e),this._logHandler(this,ne.ERROR,...e)}}const N_=(n,e)=>e.some(t=>n instanceof t);let ju,zu;function x_(){return ju||(ju=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function D_(){return zu||(zu=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Hd=new WeakMap,tl=new WeakMap,Gd=new WeakMap,xa=new WeakMap,Bl=new WeakMap;function O_(n){const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("success",i),n.removeEventListener("error",a)},i=()=>{t(mn(n.result)),s()},a=()=>{r(n.error),s()};n.addEventListener("success",i),n.addEventListener("error",a)});return e.then(t=>{t instanceof IDBCursor&&Hd.set(t,n)}).catch(()=>{}),Bl.set(e,n),e}function M_(n){if(tl.has(n))return;const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("complete",i),n.removeEventListener("error",a),n.removeEventListener("abort",a)},i=()=>{t(),s()},a=()=>{r(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",i),n.addEventListener("error",a),n.addEventListener("abort",a)});tl.set(n,e)}let nl={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return tl.get(n);if(e==="objectStoreNames")return n.objectStoreNames||Gd.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return mn(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function L_(n){nl=n(nl)}function F_(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const r=n.call(Da(this),e,...t);return Gd.set(r,e.sort?e.sort():[e]),mn(r)}:D_().includes(n)?function(...e){return n.apply(Da(this),e),mn(Hd.get(this))}:function(...e){return mn(n.apply(Da(this),e))}}function U_(n){return typeof n=="function"?F_(n):(n instanceof IDBTransaction&&M_(n),N_(n,x_())?new Proxy(n,nl):n)}function mn(n){if(n instanceof IDBRequest)return O_(n);if(xa.has(n))return xa.get(n);const e=U_(n);return e!==n&&(xa.set(n,e),Bl.set(e,n)),e}const Da=n=>Bl.get(n);function $_(n,e,{blocked:t,upgrade:r,blocking:s,terminated:i}={}){const a=indexedDB.open(n,e),l=mn(a);return r&&a.addEventListener("upgradeneeded",u=>{r(mn(a.result),u.oldVersion,u.newVersion,mn(a.transaction),u)}),t&&a.addEventListener("blocked",u=>t(u.oldVersion,u.newVersion,u)),l.then(u=>{i&&u.addEventListener("close",()=>i()),s&&u.addEventListener("versionchange",h=>s(h.oldVersion,h.newVersion,h))}).catch(()=>{}),l}const B_=["get","getKey","getAll","getAllKeys","count"],q_=["put","add","delete","clear"],Oa=new Map;function Hu(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(Oa.get(e))return Oa.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,s=q_.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(s||B_.includes(t)))return;const i=async function(a,...l){const u=this.transaction(a,s?"readwrite":"readonly");let h=u.store;return r&&(h=h.index(l.shift())),(await Promise.all([h[t](...l),s&&u.done]))[0]};return Oa.set(e,i),i}L_(n=>({...n,get:(e,t,r)=>Hu(e,t)||n.get(e,t,r),has:(e,t)=>!!Hu(e,t)||n.has(e,t)}));/**
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
 */class j_{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(z_(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function z_(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const rl="@firebase/app",Gu="0.13.2";/**
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
 */const Jt=new $l("@firebase/app"),H_="@firebase/app-compat",G_="@firebase/analytics-compat",W_="@firebase/analytics",K_="@firebase/app-check-compat",Q_="@firebase/app-check",J_="@firebase/auth",X_="@firebase/auth-compat",Y_="@firebase/database",Z_="@firebase/data-connect",e0="@firebase/database-compat",t0="@firebase/functions",n0="@firebase/functions-compat",r0="@firebase/installations",s0="@firebase/installations-compat",i0="@firebase/messaging",o0="@firebase/messaging-compat",a0="@firebase/performance",l0="@firebase/performance-compat",c0="@firebase/remote-config",u0="@firebase/remote-config-compat",h0="@firebase/storage",d0="@firebase/storage-compat",f0="@firebase/firestore",p0="@firebase/ai",m0="@firebase/firestore-compat",g0="firebase",_0="11.10.0";/**
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
 */const sl="[DEFAULT]",y0={[rl]:"fire-core",[H_]:"fire-core-compat",[W_]:"fire-analytics",[G_]:"fire-analytics-compat",[Q_]:"fire-app-check",[K_]:"fire-app-check-compat",[J_]:"fire-auth",[X_]:"fire-auth-compat",[Y_]:"fire-rtdb",[Z_]:"fire-data-connect",[e0]:"fire-rtdb-compat",[t0]:"fire-fn",[n0]:"fire-fn-compat",[r0]:"fire-iid",[s0]:"fire-iid-compat",[i0]:"fire-fcm",[o0]:"fire-fcm-compat",[a0]:"fire-perf",[l0]:"fire-perf-compat",[c0]:"fire-rc",[u0]:"fire-rc-compat",[h0]:"fire-gcs",[d0]:"fire-gcs-compat",[f0]:"fire-fst",[m0]:"fire-fst-compat",[p0]:"fire-vertex","fire-js":"fire-js",[g0]:"fire-js-all"};/**
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
 */const io=new Map,v0=new Map,il=new Map;function Wu(n,e){try{n.container.addComponent(e)}catch(t){Jt.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function $r(n){const e=n.name;if(il.has(e))return Jt.debug(`There were multiple attempts to register component ${e}.`),!1;il.set(e,n);for(const t of io.values())Wu(t,n);for(const t of v0.values())Wu(t,n);return!0}function ql(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function Et(n){return n==null?!1:n.settings!==void 0}/**
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
 */const E0={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},gn=new Ys("app","Firebase",E0);/**
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
 */class w0{constructor(e,t,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new ir("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw gn.create("app-deleted",{appName:this._name})}}/**
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
 */const Xr=_0;function Wd(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r=Object.assign({name:sl,automaticDataCollectionEnabled:!0},e),s=r.name;if(typeof s!="string"||!s)throw gn.create("bad-app-name",{appName:String(s)});if(t||(t=Bd()),!t)throw gn.create("no-options");const i=io.get(s);if(i){if(sr(t,i.options)&&sr(r,i.config))return i;throw gn.create("duplicate-app",{appName:s})}const a=new R_(s);for(const u of il.values())a.addComponent(u);const l=new w0(t,r,a);return io.set(s,l),l}function Kd(n=sl){const e=io.get(n);if(!e&&n===sl&&Bd())return Wd();if(!e)throw gn.create("no-app",{appName:n});return e}function _n(n,e,t){var r;let s=(r=y0[n])!==null&&r!==void 0?r:n;t&&(s+=`-${t}`);const i=s.match(/\s|\//),a=e.match(/\s|\//);if(i||a){const l=[`Unable to register library "${s}" with version "${e}":`];i&&l.push(`library name "${s}" contains illegal characters (whitespace or "/")`),i&&a&&l.push("and"),a&&l.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Jt.warn(l.join(" "));return}$r(new ir(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
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
 */const T0="firebase-heartbeat-database",I0=1,Fs="firebase-heartbeat-store";let Ma=null;function Qd(){return Ma||(Ma=$_(T0,I0,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(Fs)}catch(t){console.warn(t)}}}}).catch(n=>{throw gn.create("idb-open",{originalErrorMessage:n.message})})),Ma}async function b0(n){try{const t=(await Qd()).transaction(Fs),r=await t.objectStore(Fs).get(Jd(n));return await t.done,r}catch(e){if(e instanceof tn)Jt.warn(e.message);else{const t=gn.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Jt.warn(t.message)}}}async function Ku(n,e){try{const r=(await Qd()).transaction(Fs,"readwrite");await r.objectStore(Fs).put(e,Jd(n)),await r.done}catch(t){if(t instanceof tn)Jt.warn(t.message);else{const r=gn.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});Jt.warn(r.message)}}}function Jd(n){return`${n.name}!${n.options.appId}`}/**
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
 */const A0=1024,S0=30;class R0{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new P0(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,t;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=Qu();if(((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(a=>a.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:s}),this._heartbeatsCache.heartbeats.length>S0){const a=C0(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(a,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){Jt.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=Qu(),{heartbeatsToSend:r,unsentEntries:s}=k0(this._heartbeatsCache.heartbeats),i=so(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(t){return Jt.warn(t),""}}}function Qu(){return new Date().toISOString().substring(0,10)}function k0(n,e=A0){const t=[];let r=n.slice();for(const s of n){const i=t.find(a=>a.agent===s.agent);if(i){if(i.dates.push(s.date),Ju(t)>e){i.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),Ju(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class P0{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return m_()?g_().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await b0(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return Ku(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return Ku(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function Ju(n){return so(JSON.stringify({version:2,heartbeats:n})).length}function C0(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let r=1;r<n.length;r++)n[r].date<t&&(t=n[r].date,e=r);return e}/**
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
 */function V0(n){$r(new ir("platform-logger",e=>new j_(e),"PRIVATE")),$r(new ir("heartbeat",e=>new R0(e),"PRIVATE")),_n(rl,Gu,n),_n(rl,Gu,"esm2017"),_n("fire-js","")}V0("");var Xu=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var yn,Xd;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(E,_){function y(){}y.prototype=_.prototype,E.D=_.prototype,E.prototype=new y,E.prototype.constructor=E,E.C=function(w,T,I){for(var v=Array(arguments.length-2),it=2;it<arguments.length;it++)v[it-2]=arguments[it];return _.prototype[T].apply(w,v)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,t),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(E,_,y){y||(y=0);var w=Array(16);if(typeof _=="string")for(var T=0;16>T;++T)w[T]=_.charCodeAt(y++)|_.charCodeAt(y++)<<8|_.charCodeAt(y++)<<16|_.charCodeAt(y++)<<24;else for(T=0;16>T;++T)w[T]=_[y++]|_[y++]<<8|_[y++]<<16|_[y++]<<24;_=E.g[0],y=E.g[1],T=E.g[2];var I=E.g[3],v=_+(I^y&(T^I))+w[0]+3614090360&4294967295;_=y+(v<<7&4294967295|v>>>25),v=I+(T^_&(y^T))+w[1]+3905402710&4294967295,I=_+(v<<12&4294967295|v>>>20),v=T+(y^I&(_^y))+w[2]+606105819&4294967295,T=I+(v<<17&4294967295|v>>>15),v=y+(_^T&(I^_))+w[3]+3250441966&4294967295,y=T+(v<<22&4294967295|v>>>10),v=_+(I^y&(T^I))+w[4]+4118548399&4294967295,_=y+(v<<7&4294967295|v>>>25),v=I+(T^_&(y^T))+w[5]+1200080426&4294967295,I=_+(v<<12&4294967295|v>>>20),v=T+(y^I&(_^y))+w[6]+2821735955&4294967295,T=I+(v<<17&4294967295|v>>>15),v=y+(_^T&(I^_))+w[7]+4249261313&4294967295,y=T+(v<<22&4294967295|v>>>10),v=_+(I^y&(T^I))+w[8]+1770035416&4294967295,_=y+(v<<7&4294967295|v>>>25),v=I+(T^_&(y^T))+w[9]+2336552879&4294967295,I=_+(v<<12&4294967295|v>>>20),v=T+(y^I&(_^y))+w[10]+4294925233&4294967295,T=I+(v<<17&4294967295|v>>>15),v=y+(_^T&(I^_))+w[11]+2304563134&4294967295,y=T+(v<<22&4294967295|v>>>10),v=_+(I^y&(T^I))+w[12]+1804603682&4294967295,_=y+(v<<7&4294967295|v>>>25),v=I+(T^_&(y^T))+w[13]+4254626195&4294967295,I=_+(v<<12&4294967295|v>>>20),v=T+(y^I&(_^y))+w[14]+2792965006&4294967295,T=I+(v<<17&4294967295|v>>>15),v=y+(_^T&(I^_))+w[15]+1236535329&4294967295,y=T+(v<<22&4294967295|v>>>10),v=_+(T^I&(y^T))+w[1]+4129170786&4294967295,_=y+(v<<5&4294967295|v>>>27),v=I+(y^T&(_^y))+w[6]+3225465664&4294967295,I=_+(v<<9&4294967295|v>>>23),v=T+(_^y&(I^_))+w[11]+643717713&4294967295,T=I+(v<<14&4294967295|v>>>18),v=y+(I^_&(T^I))+w[0]+3921069994&4294967295,y=T+(v<<20&4294967295|v>>>12),v=_+(T^I&(y^T))+w[5]+3593408605&4294967295,_=y+(v<<5&4294967295|v>>>27),v=I+(y^T&(_^y))+w[10]+38016083&4294967295,I=_+(v<<9&4294967295|v>>>23),v=T+(_^y&(I^_))+w[15]+3634488961&4294967295,T=I+(v<<14&4294967295|v>>>18),v=y+(I^_&(T^I))+w[4]+3889429448&4294967295,y=T+(v<<20&4294967295|v>>>12),v=_+(T^I&(y^T))+w[9]+568446438&4294967295,_=y+(v<<5&4294967295|v>>>27),v=I+(y^T&(_^y))+w[14]+3275163606&4294967295,I=_+(v<<9&4294967295|v>>>23),v=T+(_^y&(I^_))+w[3]+4107603335&4294967295,T=I+(v<<14&4294967295|v>>>18),v=y+(I^_&(T^I))+w[8]+1163531501&4294967295,y=T+(v<<20&4294967295|v>>>12),v=_+(T^I&(y^T))+w[13]+2850285829&4294967295,_=y+(v<<5&4294967295|v>>>27),v=I+(y^T&(_^y))+w[2]+4243563512&4294967295,I=_+(v<<9&4294967295|v>>>23),v=T+(_^y&(I^_))+w[7]+1735328473&4294967295,T=I+(v<<14&4294967295|v>>>18),v=y+(I^_&(T^I))+w[12]+2368359562&4294967295,y=T+(v<<20&4294967295|v>>>12),v=_+(y^T^I)+w[5]+4294588738&4294967295,_=y+(v<<4&4294967295|v>>>28),v=I+(_^y^T)+w[8]+2272392833&4294967295,I=_+(v<<11&4294967295|v>>>21),v=T+(I^_^y)+w[11]+1839030562&4294967295,T=I+(v<<16&4294967295|v>>>16),v=y+(T^I^_)+w[14]+4259657740&4294967295,y=T+(v<<23&4294967295|v>>>9),v=_+(y^T^I)+w[1]+2763975236&4294967295,_=y+(v<<4&4294967295|v>>>28),v=I+(_^y^T)+w[4]+1272893353&4294967295,I=_+(v<<11&4294967295|v>>>21),v=T+(I^_^y)+w[7]+4139469664&4294967295,T=I+(v<<16&4294967295|v>>>16),v=y+(T^I^_)+w[10]+3200236656&4294967295,y=T+(v<<23&4294967295|v>>>9),v=_+(y^T^I)+w[13]+681279174&4294967295,_=y+(v<<4&4294967295|v>>>28),v=I+(_^y^T)+w[0]+3936430074&4294967295,I=_+(v<<11&4294967295|v>>>21),v=T+(I^_^y)+w[3]+3572445317&4294967295,T=I+(v<<16&4294967295|v>>>16),v=y+(T^I^_)+w[6]+76029189&4294967295,y=T+(v<<23&4294967295|v>>>9),v=_+(y^T^I)+w[9]+3654602809&4294967295,_=y+(v<<4&4294967295|v>>>28),v=I+(_^y^T)+w[12]+3873151461&4294967295,I=_+(v<<11&4294967295|v>>>21),v=T+(I^_^y)+w[15]+530742520&4294967295,T=I+(v<<16&4294967295|v>>>16),v=y+(T^I^_)+w[2]+3299628645&4294967295,y=T+(v<<23&4294967295|v>>>9),v=_+(T^(y|~I))+w[0]+4096336452&4294967295,_=y+(v<<6&4294967295|v>>>26),v=I+(y^(_|~T))+w[7]+1126891415&4294967295,I=_+(v<<10&4294967295|v>>>22),v=T+(_^(I|~y))+w[14]+2878612391&4294967295,T=I+(v<<15&4294967295|v>>>17),v=y+(I^(T|~_))+w[5]+4237533241&4294967295,y=T+(v<<21&4294967295|v>>>11),v=_+(T^(y|~I))+w[12]+1700485571&4294967295,_=y+(v<<6&4294967295|v>>>26),v=I+(y^(_|~T))+w[3]+2399980690&4294967295,I=_+(v<<10&4294967295|v>>>22),v=T+(_^(I|~y))+w[10]+4293915773&4294967295,T=I+(v<<15&4294967295|v>>>17),v=y+(I^(T|~_))+w[1]+2240044497&4294967295,y=T+(v<<21&4294967295|v>>>11),v=_+(T^(y|~I))+w[8]+1873313359&4294967295,_=y+(v<<6&4294967295|v>>>26),v=I+(y^(_|~T))+w[15]+4264355552&4294967295,I=_+(v<<10&4294967295|v>>>22),v=T+(_^(I|~y))+w[6]+2734768916&4294967295,T=I+(v<<15&4294967295|v>>>17),v=y+(I^(T|~_))+w[13]+1309151649&4294967295,y=T+(v<<21&4294967295|v>>>11),v=_+(T^(y|~I))+w[4]+4149444226&4294967295,_=y+(v<<6&4294967295|v>>>26),v=I+(y^(_|~T))+w[11]+3174756917&4294967295,I=_+(v<<10&4294967295|v>>>22),v=T+(_^(I|~y))+w[2]+718787259&4294967295,T=I+(v<<15&4294967295|v>>>17),v=y+(I^(T|~_))+w[9]+3951481745&4294967295,E.g[0]=E.g[0]+_&4294967295,E.g[1]=E.g[1]+(T+(v<<21&4294967295|v>>>11))&4294967295,E.g[2]=E.g[2]+T&4294967295,E.g[3]=E.g[3]+I&4294967295}r.prototype.u=function(E,_){_===void 0&&(_=E.length);for(var y=_-this.blockSize,w=this.B,T=this.h,I=0;I<_;){if(T==0)for(;I<=y;)s(this,E,I),I+=this.blockSize;if(typeof E=="string"){for(;I<_;)if(w[T++]=E.charCodeAt(I++),T==this.blockSize){s(this,w),T=0;break}}else for(;I<_;)if(w[T++]=E[I++],T==this.blockSize){s(this,w),T=0;break}}this.h=T,this.o+=_},r.prototype.v=function(){var E=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);E[0]=128;for(var _=1;_<E.length-8;++_)E[_]=0;var y=8*this.o;for(_=E.length-8;_<E.length;++_)E[_]=y&255,y/=256;for(this.u(E),E=Array(16),_=y=0;4>_;++_)for(var w=0;32>w;w+=8)E[y++]=this.g[_]>>>w&255;return E};function i(E,_){var y=l;return Object.prototype.hasOwnProperty.call(y,E)?y[E]:y[E]=_(E)}function a(E,_){this.h=_;for(var y=[],w=!0,T=E.length-1;0<=T;T--){var I=E[T]|0;w&&I==_||(y[T]=I,w=!1)}this.g=y}var l={};function u(E){return-128<=E&&128>E?i(E,function(_){return new a([_|0],0>_?-1:0)}):new a([E|0],0>E?-1:0)}function h(E){if(isNaN(E)||!isFinite(E))return p;if(0>E)return N(h(-E));for(var _=[],y=1,w=0;E>=y;w++)_[w]=E/y|0,y*=4294967296;return new a(_,0)}function f(E,_){if(E.length==0)throw Error("number format error: empty string");if(_=_||10,2>_||36<_)throw Error("radix out of range: "+_);if(E.charAt(0)=="-")return N(f(E.substring(1),_));if(0<=E.indexOf("-"))throw Error('number format error: interior "-" character');for(var y=h(Math.pow(_,8)),w=p,T=0;T<E.length;T+=8){var I=Math.min(8,E.length-T),v=parseInt(E.substring(T,T+I),_);8>I?(I=h(Math.pow(_,I)),w=w.j(I).add(h(v))):(w=w.j(y),w=w.add(h(v)))}return w}var p=u(0),g=u(1),S=u(16777216);n=a.prototype,n.m=function(){if(V(this))return-N(this).m();for(var E=0,_=1,y=0;y<this.g.length;y++){var w=this.i(y);E+=(0<=w?w:4294967296+w)*_,_*=4294967296}return E},n.toString=function(E){if(E=E||10,2>E||36<E)throw Error("radix out of range: "+E);if(k(this))return"0";if(V(this))return"-"+N(this).toString(E);for(var _=h(Math.pow(E,6)),y=this,w="";;){var T=z(y,_).g;y=W(y,T.j(_));var I=((0<y.g.length?y.g[0]:y.h)>>>0).toString(E);if(y=T,k(y))return I+w;for(;6>I.length;)I="0"+I;w=I+w}},n.i=function(E){return 0>E?0:E<this.g.length?this.g[E]:this.h};function k(E){if(E.h!=0)return!1;for(var _=0;_<E.g.length;_++)if(E.g[_]!=0)return!1;return!0}function V(E){return E.h==-1}n.l=function(E){return E=W(this,E),V(E)?-1:k(E)?0:1};function N(E){for(var _=E.g.length,y=[],w=0;w<_;w++)y[w]=~E.g[w];return new a(y,~E.h).add(g)}n.abs=function(){return V(this)?N(this):this},n.add=function(E){for(var _=Math.max(this.g.length,E.g.length),y=[],w=0,T=0;T<=_;T++){var I=w+(this.i(T)&65535)+(E.i(T)&65535),v=(I>>>16)+(this.i(T)>>>16)+(E.i(T)>>>16);w=v>>>16,I&=65535,v&=65535,y[T]=v<<16|I}return new a(y,y[y.length-1]&-2147483648?-1:0)};function W(E,_){return E.add(N(_))}n.j=function(E){if(k(this)||k(E))return p;if(V(this))return V(E)?N(this).j(N(E)):N(N(this).j(E));if(V(E))return N(this.j(N(E)));if(0>this.l(S)&&0>E.l(S))return h(this.m()*E.m());for(var _=this.g.length+E.g.length,y=[],w=0;w<2*_;w++)y[w]=0;for(w=0;w<this.g.length;w++)for(var T=0;T<E.g.length;T++){var I=this.i(w)>>>16,v=this.i(w)&65535,it=E.i(T)>>>16,St=E.i(T)&65535;y[2*w+2*T]+=v*St,B(y,2*w+2*T),y[2*w+2*T+1]+=I*St,B(y,2*w+2*T+1),y[2*w+2*T+1]+=v*it,B(y,2*w+2*T+1),y[2*w+2*T+2]+=I*it,B(y,2*w+2*T+2)}for(w=0;w<_;w++)y[w]=y[2*w+1]<<16|y[2*w];for(w=_;w<2*_;w++)y[w]=0;return new a(y,0)};function B(E,_){for(;(E[_]&65535)!=E[_];)E[_+1]+=E[_]>>>16,E[_]&=65535,_++}function $(E,_){this.g=E,this.h=_}function z(E,_){if(k(_))throw Error("division by zero");if(k(E))return new $(p,p);if(V(E))return _=z(N(E),_),new $(N(_.g),N(_.h));if(V(_))return _=z(E,N(_)),new $(N(_.g),_.h);if(30<E.g.length){if(V(E)||V(_))throw Error("slowDivide_ only works with positive integers.");for(var y=g,w=_;0>=w.l(E);)y=ae(y),w=ae(w);var T=q(y,1),I=q(w,1);for(w=q(w,2),y=q(y,2);!k(w);){var v=I.add(w);0>=v.l(E)&&(T=T.add(y),I=v),w=q(w,1),y=q(y,1)}return _=W(E,T.j(_)),new $(T,_)}for(T=p;0<=E.l(_);){for(y=Math.max(1,Math.floor(E.m()/_.m())),w=Math.ceil(Math.log(y)/Math.LN2),w=48>=w?1:Math.pow(2,w-48),I=h(y),v=I.j(_);V(v)||0<v.l(E);)y-=w,I=h(y),v=I.j(_);k(I)&&(I=g),T=T.add(I),E=W(E,v)}return new $(T,E)}n.A=function(E){return z(this,E).h},n.and=function(E){for(var _=Math.max(this.g.length,E.g.length),y=[],w=0;w<_;w++)y[w]=this.i(w)&E.i(w);return new a(y,this.h&E.h)},n.or=function(E){for(var _=Math.max(this.g.length,E.g.length),y=[],w=0;w<_;w++)y[w]=this.i(w)|E.i(w);return new a(y,this.h|E.h)},n.xor=function(E){for(var _=Math.max(this.g.length,E.g.length),y=[],w=0;w<_;w++)y[w]=this.i(w)^E.i(w);return new a(y,this.h^E.h)};function ae(E){for(var _=E.g.length+1,y=[],w=0;w<_;w++)y[w]=E.i(w)<<1|E.i(w-1)>>>31;return new a(y,E.h)}function q(E,_){var y=_>>5;_%=32;for(var w=E.g.length-y,T=[],I=0;I<w;I++)T[I]=0<_?E.i(I+y)>>>_|E.i(I+y+1)<<32-_:E.i(I+y);return new a(T,E.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,Xd=r,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.A,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=h,a.fromString=f,yn=a}).apply(typeof Xu<"u"?Xu:typeof self<"u"?self:typeof window<"u"?window:{});var Vi=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Yd,bs,Zd,qi,ol,ef,tf,nf;(function(){var n,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(o,c,d){return o==Array.prototype||o==Object.prototype||(o[c]=d.value),o};function t(o){o=[typeof globalThis=="object"&&globalThis,o,typeof window=="object"&&window,typeof self=="object"&&self,typeof Vi=="object"&&Vi];for(var c=0;c<o.length;++c){var d=o[c];if(d&&d.Math==Math)return d}throw Error("Cannot find global object")}var r=t(this);function s(o,c){if(c)e:{var d=r;o=o.split(".");for(var m=0;m<o.length-1;m++){var b=o[m];if(!(b in d))break e;d=d[b]}o=o[o.length-1],m=d[o],c=c(m),c!=m&&c!=null&&e(d,o,{configurable:!0,writable:!0,value:c})}}function i(o,c){o instanceof String&&(o+="");var d=0,m=!1,b={next:function(){if(!m&&d<o.length){var R=d++;return{value:c(R,o[R]),done:!1}}return m=!0,{done:!0,value:void 0}}};return b[Symbol.iterator]=function(){return b},b}s("Array.prototype.values",function(o){return o||function(){return i(this,function(c,d){return d})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var a=a||{},l=this||self;function u(o){var c=typeof o;return c=c!="object"?c:o?Array.isArray(o)?"array":c:"null",c=="array"||c=="object"&&typeof o.length=="number"}function h(o){var c=typeof o;return c=="object"&&o!=null||c=="function"}function f(o,c,d){return o.call.apply(o.bind,arguments)}function p(o,c,d){if(!o)throw Error();if(2<arguments.length){var m=Array.prototype.slice.call(arguments,2);return function(){var b=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(b,m),o.apply(c,b)}}return function(){return o.apply(c,arguments)}}function g(o,c,d){return g=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?f:p,g.apply(null,arguments)}function S(o,c){var d=Array.prototype.slice.call(arguments,1);return function(){var m=d.slice();return m.push.apply(m,arguments),o.apply(this,m)}}function k(o,c){function d(){}d.prototype=c.prototype,o.aa=c.prototype,o.prototype=new d,o.prototype.constructor=o,o.Qb=function(m,b,R){for(var O=Array(arguments.length-2),me=2;me<arguments.length;me++)O[me-2]=arguments[me];return c.prototype[b].apply(m,O)}}function V(o){const c=o.length;if(0<c){const d=Array(c);for(let m=0;m<c;m++)d[m]=o[m];return d}return[]}function N(o,c){for(let d=1;d<arguments.length;d++){const m=arguments[d];if(u(m)){const b=o.length||0,R=m.length||0;o.length=b+R;for(let O=0;O<R;O++)o[b+O]=m[O]}else o.push(m)}}class W{constructor(c,d){this.i=c,this.j=d,this.h=0,this.g=null}get(){let c;return 0<this.h?(this.h--,c=this.g,this.g=c.next,c.next=null):c=this.i(),c}}function B(o){return/^[\s\xa0]*$/.test(o)}function $(){var o=l.navigator;return o&&(o=o.userAgent)?o:""}function z(o){return z[" "](o),o}z[" "]=function(){};var ae=$().indexOf("Gecko")!=-1&&!($().toLowerCase().indexOf("webkit")!=-1&&$().indexOf("Edge")==-1)&&!($().indexOf("Trident")!=-1||$().indexOf("MSIE")!=-1)&&$().indexOf("Edge")==-1;function q(o,c,d){for(const m in o)c.call(d,o[m],m,o)}function E(o,c){for(const d in o)c.call(void 0,o[d],d,o)}function _(o){const c={};for(const d in o)c[d]=o[d];return c}const y="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function w(o,c){let d,m;for(let b=1;b<arguments.length;b++){m=arguments[b];for(d in m)o[d]=m[d];for(let R=0;R<y.length;R++)d=y[R],Object.prototype.hasOwnProperty.call(m,d)&&(o[d]=m[d])}}function T(o){var c=1;o=o.split(":");const d=[];for(;0<c&&o.length;)d.push(o.shift()),c--;return o.length&&d.push(o.join(":")),d}function I(o){l.setTimeout(()=>{throw o},0)}function v(){var o=fe;let c=null;return o.g&&(c=o.g,o.g=o.g.next,o.g||(o.h=null),c.next=null),c}class it{constructor(){this.h=this.g=null}add(c,d){const m=St.get();m.set(c,d),this.h?this.h.next=m:this.g=m,this.h=m}}var St=new W(()=>new D,o=>o.reset());class D{constructor(){this.next=this.g=this.h=null}set(c,d){this.h=c,this.g=d,this.next=null}reset(){this.next=this.g=this.h=null}}let M,j=!1,fe=new it,be=()=>{const o=l.Promise.resolve(void 0);M=()=>{o.then(qt)}};var qt=()=>{for(var o;o=v();){try{o.h.call(o.g)}catch(d){I(d)}var c=St;c.j(o),100>c.h&&(c.h++,o.next=c.g,c.g=o)}j=!1};function ye(){this.s=this.s,this.C=this.C}ye.prototype.s=!1,ye.prototype.ma=function(){this.s||(this.s=!0,this.N())},ye.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function de(o,c){this.type=o,this.g=this.target=c,this.defaultPrevented=!1}de.prototype.h=function(){this.defaultPrevented=!0};var fr=function(){if(!l.addEventListener||!Object.defineProperty)return!1;var o=!1,c=Object.defineProperty({},"passive",{get:function(){o=!0}});try{const d=()=>{};l.addEventListener("test",d,c),l.removeEventListener("test",d,c)}catch{}return o}();function Ln(o,c){if(de.call(this,o?o.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,o){var d=this.type=o.type,m=o.changedTouches&&o.changedTouches.length?o.changedTouches[0]:null;if(this.target=o.target||o.srcElement,this.g=c,c=o.relatedTarget){if(ae){e:{try{z(c.nodeName);var b=!0;break e}catch{}b=!1}b||(c=null)}}else d=="mouseover"?c=o.fromElement:d=="mouseout"&&(c=o.toElement);this.relatedTarget=c,m?(this.clientX=m.clientX!==void 0?m.clientX:m.pageX,this.clientY=m.clientY!==void 0?m.clientY:m.pageY,this.screenX=m.screenX||0,this.screenY=m.screenY||0):(this.clientX=o.clientX!==void 0?o.clientX:o.pageX,this.clientY=o.clientY!==void 0?o.clientY:o.pageY,this.screenX=o.screenX||0,this.screenY=o.screenY||0),this.button=o.button,this.key=o.key||"",this.ctrlKey=o.ctrlKey,this.altKey=o.altKey,this.shiftKey=o.shiftKey,this.metaKey=o.metaKey,this.pointerId=o.pointerId||0,this.pointerType=typeof o.pointerType=="string"?o.pointerType:Xo[o.pointerType]||"",this.state=o.state,this.i=o,o.defaultPrevented&&Ln.aa.h.call(this)}}k(Ln,de);var Xo={2:"touch",3:"pen",4:"mouse"};Ln.prototype.h=function(){Ln.aa.h.call(this);var o=this.i;o.preventDefault?o.preventDefault():o.returnValue=!1};var pr="closure_listenable_"+(1e6*Math.random()|0),Yo=0;function Zo(o,c,d,m,b){this.listener=o,this.proxy=null,this.src=c,this.type=d,this.capture=!!m,this.ha=b,this.key=++Yo,this.da=this.fa=!1}function ci(o){o.da=!0,o.listener=null,o.proxy=null,o.src=null,o.ha=null}function ui(o){this.src=o,this.g={},this.h=0}ui.prototype.add=function(o,c,d,m,b){var R=o.toString();o=this.g[R],o||(o=this.g[R]=[],this.h++);var O=ta(o,c,m,b);return-1<O?(c=o[O],d||(c.fa=!1)):(c=new Zo(c,this.src,R,!!m,b),c.fa=d,o.push(c)),c};function ea(o,c){var d=c.type;if(d in o.g){var m=o.g[d],b=Array.prototype.indexOf.call(m,c,void 0),R;(R=0<=b)&&Array.prototype.splice.call(m,b,1),R&&(ci(c),o.g[d].length==0&&(delete o.g[d],o.h--))}}function ta(o,c,d,m){for(var b=0;b<o.length;++b){var R=o[b];if(!R.da&&R.listener==c&&R.capture==!!d&&R.ha==m)return b}return-1}var na="closure_lm_"+(1e6*Math.random()|0),ra={};function Nc(o,c,d,m,b){if(Array.isArray(c)){for(var R=0;R<c.length;R++)Nc(o,c[R],d,m,b);return null}return d=Oc(d),o&&o[pr]?o.K(c,d,h(m)?!!m.capture:!1,b):Rm(o,c,d,!1,m,b)}function Rm(o,c,d,m,b,R){if(!c)throw Error("Invalid event type");var O=h(b)?!!b.capture:!!b,me=ia(o);if(me||(o[na]=me=new ui(o)),d=me.add(c,d,m,O,R),d.proxy)return d;if(m=km(),d.proxy=m,m.src=o,m.listener=d,o.addEventListener)fr||(b=O),b===void 0&&(b=!1),o.addEventListener(c.toString(),m,b);else if(o.attachEvent)o.attachEvent(Dc(c.toString()),m);else if(o.addListener&&o.removeListener)o.addListener(m);else throw Error("addEventListener and attachEvent are unavailable.");return d}function km(){function o(d){return c.call(o.src,o.listener,d)}const c=Pm;return o}function xc(o,c,d,m,b){if(Array.isArray(c))for(var R=0;R<c.length;R++)xc(o,c[R],d,m,b);else m=h(m)?!!m.capture:!!m,d=Oc(d),o&&o[pr]?(o=o.i,c=String(c).toString(),c in o.g&&(R=o.g[c],d=ta(R,d,m,b),-1<d&&(ci(R[d]),Array.prototype.splice.call(R,d,1),R.length==0&&(delete o.g[c],o.h--)))):o&&(o=ia(o))&&(c=o.g[c.toString()],o=-1,c&&(o=ta(c,d,m,b)),(d=-1<o?c[o]:null)&&sa(d))}function sa(o){if(typeof o!="number"&&o&&!o.da){var c=o.src;if(c&&c[pr])ea(c.i,o);else{var d=o.type,m=o.proxy;c.removeEventListener?c.removeEventListener(d,m,o.capture):c.detachEvent?c.detachEvent(Dc(d),m):c.addListener&&c.removeListener&&c.removeListener(m),(d=ia(c))?(ea(d,o),d.h==0&&(d.src=null,c[na]=null)):ci(o)}}}function Dc(o){return o in ra?ra[o]:ra[o]="on"+o}function Pm(o,c){if(o.da)o=!0;else{c=new Ln(c,this);var d=o.listener,m=o.ha||o.src;o.fa&&sa(o),o=d.call(m,c)}return o}function ia(o){return o=o[na],o instanceof ui?o:null}var oa="__closure_events_fn_"+(1e9*Math.random()>>>0);function Oc(o){return typeof o=="function"?o:(o[oa]||(o[oa]=function(c){return o.handleEvent(c)}),o[oa])}function Ke(){ye.call(this),this.i=new ui(this),this.M=this,this.F=null}k(Ke,ye),Ke.prototype[pr]=!0,Ke.prototype.removeEventListener=function(o,c,d,m){xc(this,o,c,d,m)};function nt(o,c){var d,m=o.F;if(m)for(d=[];m;m=m.F)d.push(m);if(o=o.M,m=c.type||c,typeof c=="string")c=new de(c,o);else if(c instanceof de)c.target=c.target||o;else{var b=c;c=new de(m,o),w(c,b)}if(b=!0,d)for(var R=d.length-1;0<=R;R--){var O=c.g=d[R];b=hi(O,m,!0,c)&&b}if(O=c.g=o,b=hi(O,m,!0,c)&&b,b=hi(O,m,!1,c)&&b,d)for(R=0;R<d.length;R++)O=c.g=d[R],b=hi(O,m,!1,c)&&b}Ke.prototype.N=function(){if(Ke.aa.N.call(this),this.i){var o=this.i,c;for(c in o.g){for(var d=o.g[c],m=0;m<d.length;m++)ci(d[m]);delete o.g[c],o.h--}}this.F=null},Ke.prototype.K=function(o,c,d,m){return this.i.add(String(o),c,!1,d,m)},Ke.prototype.L=function(o,c,d,m){return this.i.add(String(o),c,!0,d,m)};function hi(o,c,d,m){if(c=o.i.g[String(c)],!c)return!0;c=c.concat();for(var b=!0,R=0;R<c.length;++R){var O=c[R];if(O&&!O.da&&O.capture==d){var me=O.listener,je=O.ha||O.src;O.fa&&ea(o.i,O),b=me.call(je,m)!==!1&&b}}return b&&!m.defaultPrevented}function Mc(o,c,d){if(typeof o=="function")d&&(o=g(o,d));else if(o&&typeof o.handleEvent=="function")o=g(o.handleEvent,o);else throw Error("Invalid listener argument");return 2147483647<Number(c)?-1:l.setTimeout(o,c||0)}function Lc(o){o.g=Mc(()=>{o.g=null,o.i&&(o.i=!1,Lc(o))},o.l);const c=o.h;o.h=null,o.m.apply(null,c)}class Cm extends ye{constructor(c,d){super(),this.m=c,this.l=d,this.h=null,this.i=!1,this.g=null}j(c){this.h=arguments,this.g?this.i=!0:Lc(this)}N(){super.N(),this.g&&(l.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function ss(o){ye.call(this),this.h=o,this.g={}}k(ss,ye);var Fc=[];function Uc(o){q(o.g,function(c,d){this.g.hasOwnProperty(d)&&sa(c)},o),o.g={}}ss.prototype.N=function(){ss.aa.N.call(this),Uc(this)},ss.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var aa=l.JSON.stringify,Vm=l.JSON.parse,Nm=class{stringify(o){return l.JSON.stringify(o,void 0)}parse(o){return l.JSON.parse(o,void 0)}};function la(){}la.prototype.h=null;function $c(o){return o.h||(o.h=o.i())}function Bc(){}var is={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function ca(){de.call(this,"d")}k(ca,de);function ua(){de.call(this,"c")}k(ua,de);var Fn={},qc=null;function di(){return qc=qc||new Ke}Fn.La="serverreachability";function jc(o){de.call(this,Fn.La,o)}k(jc,de);function os(o){const c=di();nt(c,new jc(c))}Fn.STAT_EVENT="statevent";function zc(o,c){de.call(this,Fn.STAT_EVENT,o),this.stat=c}k(zc,de);function rt(o){const c=di();nt(c,new zc(c,o))}Fn.Ma="timingevent";function Hc(o,c){de.call(this,Fn.Ma,o),this.size=c}k(Hc,de);function as(o,c){if(typeof o!="function")throw Error("Fn must not be null and must be a function");return l.setTimeout(function(){o()},c)}function ls(){this.g=!0}ls.prototype.xa=function(){this.g=!1};function xm(o,c,d,m,b,R){o.info(function(){if(o.g)if(R)for(var O="",me=R.split("&"),je=0;je<me.length;je++){var oe=me[je].split("=");if(1<oe.length){var Qe=oe[0];oe=oe[1];var Je=Qe.split("_");O=2<=Je.length&&Je[1]=="type"?O+(Qe+"="+oe+"&"):O+(Qe+"=redacted&")}}else O=null;else O=R;return"XMLHTTP REQ ("+m+") [attempt "+b+"]: "+c+`
`+d+`
`+O})}function Dm(o,c,d,m,b,R,O){o.info(function(){return"XMLHTTP RESP ("+m+") [ attempt "+b+"]: "+c+`
`+d+`
`+R+" "+O})}function mr(o,c,d,m){o.info(function(){return"XMLHTTP TEXT ("+c+"): "+Mm(o,d)+(m?" "+m:"")})}function Om(o,c){o.info(function(){return"TIMEOUT: "+c})}ls.prototype.info=function(){};function Mm(o,c){if(!o.g)return c;if(!c)return null;try{var d=JSON.parse(c);if(d){for(o=0;o<d.length;o++)if(Array.isArray(d[o])){var m=d[o];if(!(2>m.length)){var b=m[1];if(Array.isArray(b)&&!(1>b.length)){var R=b[0];if(R!="noop"&&R!="stop"&&R!="close")for(var O=1;O<b.length;O++)b[O]=""}}}}return aa(d)}catch{return c}}var fi={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},Gc={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},ha;function pi(){}k(pi,la),pi.prototype.g=function(){return new XMLHttpRequest},pi.prototype.i=function(){return{}},ha=new pi;function nn(o,c,d,m){this.j=o,this.i=c,this.l=d,this.R=m||1,this.U=new ss(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new Wc}function Wc(){this.i=null,this.g="",this.h=!1}var Kc={},da={};function fa(o,c,d){o.L=1,o.v=yi(jt(c)),o.m=d,o.P=!0,Qc(o,null)}function Qc(o,c){o.F=Date.now(),mi(o),o.A=jt(o.v);var d=o.A,m=o.R;Array.isArray(m)||(m=[String(m)]),cu(d.i,"t",m),o.C=0,d=o.j.J,o.h=new Wc,o.g=Ru(o.j,d?c:null,!o.m),0<o.O&&(o.M=new Cm(g(o.Y,o,o.g),o.O)),c=o.U,d=o.g,m=o.ca;var b="readystatechange";Array.isArray(b)||(b&&(Fc[0]=b.toString()),b=Fc);for(var R=0;R<b.length;R++){var O=Nc(d,b[R],m||c.handleEvent,!1,c.h||c);if(!O)break;c.g[O.key]=O}c=o.H?_(o.H):{},o.m?(o.u||(o.u="POST"),c["Content-Type"]="application/x-www-form-urlencoded",o.g.ea(o.A,o.u,o.m,c)):(o.u="GET",o.g.ea(o.A,o.u,null,c)),os(),xm(o.i,o.u,o.A,o.l,o.R,o.m)}nn.prototype.ca=function(o){o=o.target;const c=this.M;c&&zt(o)==3?c.j():this.Y(o)},nn.prototype.Y=function(o){try{if(o==this.g)e:{const Je=zt(this.g);var c=this.g.Ba();const yr=this.g.Z();if(!(3>Je)&&(Je!=3||this.g&&(this.h.h||this.g.oa()||gu(this.g)))){this.J||Je!=4||c==7||(c==8||0>=yr?os(3):os(2)),pa(this);var d=this.g.Z();this.X=d;t:if(Jc(this)){var m=gu(this.g);o="";var b=m.length,R=zt(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){Un(this),cs(this);var O="";break t}this.h.i=new l.TextDecoder}for(c=0;c<b;c++)this.h.h=!0,o+=this.h.i.decode(m[c],{stream:!(R&&c==b-1)});m.length=0,this.h.g+=o,this.C=0,O=this.h.g}else O=this.g.oa();if(this.o=d==200,Dm(this.i,this.u,this.A,this.l,this.R,Je,d),this.o){if(this.T&&!this.K){t:{if(this.g){var me,je=this.g;if((me=je.g?je.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!B(me)){var oe=me;break t}}oe=null}if(d=oe)mr(this.i,this.l,d,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,ma(this,d);else{this.o=!1,this.s=3,rt(12),Un(this),cs(this);break e}}if(this.P){d=!0;let gt;for(;!this.J&&this.C<O.length;)if(gt=Lm(this,O),gt==da){Je==4&&(this.s=4,rt(14),d=!1),mr(this.i,this.l,null,"[Incomplete Response]");break}else if(gt==Kc){this.s=4,rt(15),mr(this.i,this.l,O,"[Invalid Chunk]"),d=!1;break}else mr(this.i,this.l,gt,null),ma(this,gt);if(Jc(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),Je!=4||O.length!=0||this.h.h||(this.s=1,rt(16),d=!1),this.o=this.o&&d,!d)mr(this.i,this.l,O,"[Invalid Chunked Response]"),Un(this),cs(this);else if(0<O.length&&!this.W){this.W=!0;var Qe=this.j;Qe.g==this&&Qe.ba&&!Qe.M&&(Qe.j.info("Great, no buffering proxy detected. Bytes received: "+O.length),wa(Qe),Qe.M=!0,rt(11))}}else mr(this.i,this.l,O,null),ma(this,O);Je==4&&Un(this),this.o&&!this.J&&(Je==4?Iu(this.j,this):(this.o=!1,mi(this)))}else eg(this.g),d==400&&0<O.indexOf("Unknown SID")?(this.s=3,rt(12)):(this.s=0,rt(13)),Un(this),cs(this)}}}catch{}finally{}};function Jc(o){return o.g?o.u=="GET"&&o.L!=2&&o.j.Ca:!1}function Lm(o,c){var d=o.C,m=c.indexOf(`
`,d);return m==-1?da:(d=Number(c.substring(d,m)),isNaN(d)?Kc:(m+=1,m+d>c.length?da:(c=c.slice(m,m+d),o.C=m+d,c)))}nn.prototype.cancel=function(){this.J=!0,Un(this)};function mi(o){o.S=Date.now()+o.I,Xc(o,o.I)}function Xc(o,c){if(o.B!=null)throw Error("WatchDog timer not null");o.B=as(g(o.ba,o),c)}function pa(o){o.B&&(l.clearTimeout(o.B),o.B=null)}nn.prototype.ba=function(){this.B=null;const o=Date.now();0<=o-this.S?(Om(this.i,this.A),this.L!=2&&(os(),rt(17)),Un(this),this.s=2,cs(this)):Xc(this,this.S-o)};function cs(o){o.j.G==0||o.J||Iu(o.j,o)}function Un(o){pa(o);var c=o.M;c&&typeof c.ma=="function"&&c.ma(),o.M=null,Uc(o.U),o.g&&(c=o.g,o.g=null,c.abort(),c.ma())}function ma(o,c){try{var d=o.j;if(d.G!=0&&(d.g==o||ga(d.h,o))){if(!o.K&&ga(d.h,o)&&d.G==3){try{var m=d.Da.g.parse(c)}catch{m=null}if(Array.isArray(m)&&m.length==3){var b=m;if(b[0]==0){e:if(!d.u){if(d.g)if(d.g.F+3e3<o.F)bi(d),Ti(d);else break e;Ea(d),rt(18)}}else d.za=b[1],0<d.za-d.T&&37500>b[2]&&d.F&&d.v==0&&!d.C&&(d.C=as(g(d.Za,d),6e3));if(1>=eu(d.h)&&d.ca){try{d.ca()}catch{}d.ca=void 0}}else Bn(d,11)}else if((o.K||d.g==o)&&bi(d),!B(c))for(b=d.Da.g.parse(c),c=0;c<b.length;c++){let oe=b[c];if(d.T=oe[0],oe=oe[1],d.G==2)if(oe[0]=="c"){d.K=oe[1],d.ia=oe[2];const Qe=oe[3];Qe!=null&&(d.la=Qe,d.j.info("VER="+d.la));const Je=oe[4];Je!=null&&(d.Aa=Je,d.j.info("SVER="+d.Aa));const yr=oe[5];yr!=null&&typeof yr=="number"&&0<yr&&(m=1.5*yr,d.L=m,d.j.info("backChannelRequestTimeoutMs_="+m)),m=d;const gt=o.g;if(gt){const Si=gt.g?gt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Si){var R=m.h;R.g||Si.indexOf("spdy")==-1&&Si.indexOf("quic")==-1&&Si.indexOf("h2")==-1||(R.j=R.l,R.g=new Set,R.h&&(_a(R,R.h),R.h=null))}if(m.D){const Ta=gt.g?gt.g.getResponseHeader("X-HTTP-Session-Id"):null;Ta&&(m.ya=Ta,we(m.I,m.D,Ta))}}d.G=3,d.l&&d.l.ua(),d.ba&&(d.R=Date.now()-o.F,d.j.info("Handshake RTT: "+d.R+"ms")),m=d;var O=o;if(m.qa=Su(m,m.J?m.ia:null,m.W),O.K){tu(m.h,O);var me=O,je=m.L;je&&(me.I=je),me.B&&(pa(me),mi(me)),m.g=O}else wu(m);0<d.i.length&&Ii(d)}else oe[0]!="stop"&&oe[0]!="close"||Bn(d,7);else d.G==3&&(oe[0]=="stop"||oe[0]=="close"?oe[0]=="stop"?Bn(d,7):va(d):oe[0]!="noop"&&d.l&&d.l.ta(oe),d.v=0)}}os(4)}catch{}}var Fm=class{constructor(o,c){this.g=o,this.map=c}};function Yc(o){this.l=o||10,l.PerformanceNavigationTiming?(o=l.performance.getEntriesByType("navigation"),o=0<o.length&&(o[0].nextHopProtocol=="hq"||o[0].nextHopProtocol=="h2")):o=!!(l.chrome&&l.chrome.loadTimes&&l.chrome.loadTimes()&&l.chrome.loadTimes().wasFetchedViaSpdy),this.j=o?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function Zc(o){return o.h?!0:o.g?o.g.size>=o.j:!1}function eu(o){return o.h?1:o.g?o.g.size:0}function ga(o,c){return o.h?o.h==c:o.g?o.g.has(c):!1}function _a(o,c){o.g?o.g.add(c):o.h=c}function tu(o,c){o.h&&o.h==c?o.h=null:o.g&&o.g.has(c)&&o.g.delete(c)}Yc.prototype.cancel=function(){if(this.i=nu(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const o of this.g.values())o.cancel();this.g.clear()}};function nu(o){if(o.h!=null)return o.i.concat(o.h.D);if(o.g!=null&&o.g.size!==0){let c=o.i;for(const d of o.g.values())c=c.concat(d.D);return c}return V(o.i)}function Um(o){if(o.V&&typeof o.V=="function")return o.V();if(typeof Map<"u"&&o instanceof Map||typeof Set<"u"&&o instanceof Set)return Array.from(o.values());if(typeof o=="string")return o.split("");if(u(o)){for(var c=[],d=o.length,m=0;m<d;m++)c.push(o[m]);return c}c=[],d=0;for(m in o)c[d++]=o[m];return c}function $m(o){if(o.na&&typeof o.na=="function")return o.na();if(!o.V||typeof o.V!="function"){if(typeof Map<"u"&&o instanceof Map)return Array.from(o.keys());if(!(typeof Set<"u"&&o instanceof Set)){if(u(o)||typeof o=="string"){var c=[];o=o.length;for(var d=0;d<o;d++)c.push(d);return c}c=[],d=0;for(const m in o)c[d++]=m;return c}}}function ru(o,c){if(o.forEach&&typeof o.forEach=="function")o.forEach(c,void 0);else if(u(o)||typeof o=="string")Array.prototype.forEach.call(o,c,void 0);else for(var d=$m(o),m=Um(o),b=m.length,R=0;R<b;R++)c.call(void 0,m[R],d&&d[R],o)}var su=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Bm(o,c){if(o){o=o.split("&");for(var d=0;d<o.length;d++){var m=o[d].indexOf("="),b=null;if(0<=m){var R=o[d].substring(0,m);b=o[d].substring(m+1)}else R=o[d];c(R,b?decodeURIComponent(b.replace(/\+/g," ")):"")}}}function $n(o){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,o instanceof $n){this.h=o.h,gi(this,o.j),this.o=o.o,this.g=o.g,_i(this,o.s),this.l=o.l;var c=o.i,d=new ds;d.i=c.i,c.g&&(d.g=new Map(c.g),d.h=c.h),iu(this,d),this.m=o.m}else o&&(c=String(o).match(su))?(this.h=!1,gi(this,c[1]||"",!0),this.o=us(c[2]||""),this.g=us(c[3]||"",!0),_i(this,c[4]),this.l=us(c[5]||"",!0),iu(this,c[6]||"",!0),this.m=us(c[7]||"")):(this.h=!1,this.i=new ds(null,this.h))}$n.prototype.toString=function(){var o=[],c=this.j;c&&o.push(hs(c,ou,!0),":");var d=this.g;return(d||c=="file")&&(o.push("//"),(c=this.o)&&o.push(hs(c,ou,!0),"@"),o.push(encodeURIComponent(String(d)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),d=this.s,d!=null&&o.push(":",String(d))),(d=this.l)&&(this.g&&d.charAt(0)!="/"&&o.push("/"),o.push(hs(d,d.charAt(0)=="/"?zm:jm,!0))),(d=this.i.toString())&&o.push("?",d),(d=this.m)&&o.push("#",hs(d,Gm)),o.join("")};function jt(o){return new $n(o)}function gi(o,c,d){o.j=d?us(c,!0):c,o.j&&(o.j=o.j.replace(/:$/,""))}function _i(o,c){if(c){if(c=Number(c),isNaN(c)||0>c)throw Error("Bad port number "+c);o.s=c}else o.s=null}function iu(o,c,d){c instanceof ds?(o.i=c,Wm(o.i,o.h)):(d||(c=hs(c,Hm)),o.i=new ds(c,o.h))}function we(o,c,d){o.i.set(c,d)}function yi(o){return we(o,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),o}function us(o,c){return o?c?decodeURI(o.replace(/%25/g,"%2525")):decodeURIComponent(o):""}function hs(o,c,d){return typeof o=="string"?(o=encodeURI(o).replace(c,qm),d&&(o=o.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),o):null}function qm(o){return o=o.charCodeAt(0),"%"+(o>>4&15).toString(16)+(o&15).toString(16)}var ou=/[#\/\?@]/g,jm=/[#\?:]/g,zm=/[#\?]/g,Hm=/[#\?@]/g,Gm=/#/g;function ds(o,c){this.h=this.g=null,this.i=o||null,this.j=!!c}function rn(o){o.g||(o.g=new Map,o.h=0,o.i&&Bm(o.i,function(c,d){o.add(decodeURIComponent(c.replace(/\+/g," ")),d)}))}n=ds.prototype,n.add=function(o,c){rn(this),this.i=null,o=gr(this,o);var d=this.g.get(o);return d||this.g.set(o,d=[]),d.push(c),this.h+=1,this};function au(o,c){rn(o),c=gr(o,c),o.g.has(c)&&(o.i=null,o.h-=o.g.get(c).length,o.g.delete(c))}function lu(o,c){return rn(o),c=gr(o,c),o.g.has(c)}n.forEach=function(o,c){rn(this),this.g.forEach(function(d,m){d.forEach(function(b){o.call(c,b,m,this)},this)},this)},n.na=function(){rn(this);const o=Array.from(this.g.values()),c=Array.from(this.g.keys()),d=[];for(let m=0;m<c.length;m++){const b=o[m];for(let R=0;R<b.length;R++)d.push(c[m])}return d},n.V=function(o){rn(this);let c=[];if(typeof o=="string")lu(this,o)&&(c=c.concat(this.g.get(gr(this,o))));else{o=Array.from(this.g.values());for(let d=0;d<o.length;d++)c=c.concat(o[d])}return c},n.set=function(o,c){return rn(this),this.i=null,o=gr(this,o),lu(this,o)&&(this.h-=this.g.get(o).length),this.g.set(o,[c]),this.h+=1,this},n.get=function(o,c){return o?(o=this.V(o),0<o.length?String(o[0]):c):c};function cu(o,c,d){au(o,c),0<d.length&&(o.i=null,o.g.set(gr(o,c),V(d)),o.h+=d.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const o=[],c=Array.from(this.g.keys());for(var d=0;d<c.length;d++){var m=c[d];const R=encodeURIComponent(String(m)),O=this.V(m);for(m=0;m<O.length;m++){var b=R;O[m]!==""&&(b+="="+encodeURIComponent(String(O[m]))),o.push(b)}}return this.i=o.join("&")};function gr(o,c){return c=String(c),o.j&&(c=c.toLowerCase()),c}function Wm(o,c){c&&!o.j&&(rn(o),o.i=null,o.g.forEach(function(d,m){var b=m.toLowerCase();m!=b&&(au(this,m),cu(this,b,d))},o)),o.j=c}function Km(o,c){const d=new ls;if(l.Image){const m=new Image;m.onload=S(sn,d,"TestLoadImage: loaded",!0,c,m),m.onerror=S(sn,d,"TestLoadImage: error",!1,c,m),m.onabort=S(sn,d,"TestLoadImage: abort",!1,c,m),m.ontimeout=S(sn,d,"TestLoadImage: timeout",!1,c,m),l.setTimeout(function(){m.ontimeout&&m.ontimeout()},1e4),m.src=o}else c(!1)}function Qm(o,c){const d=new ls,m=new AbortController,b=setTimeout(()=>{m.abort(),sn(d,"TestPingServer: timeout",!1,c)},1e4);fetch(o,{signal:m.signal}).then(R=>{clearTimeout(b),R.ok?sn(d,"TestPingServer: ok",!0,c):sn(d,"TestPingServer: server error",!1,c)}).catch(()=>{clearTimeout(b),sn(d,"TestPingServer: error",!1,c)})}function sn(o,c,d,m,b){try{b&&(b.onload=null,b.onerror=null,b.onabort=null,b.ontimeout=null),m(d)}catch{}}function Jm(){this.g=new Nm}function Xm(o,c,d){const m=d||"";try{ru(o,function(b,R){let O=b;h(b)&&(O=aa(b)),c.push(m+R+"="+encodeURIComponent(O))})}catch(b){throw c.push(m+"type="+encodeURIComponent("_badmap")),b}}function vi(o){this.l=o.Ub||null,this.j=o.eb||!1}k(vi,la),vi.prototype.g=function(){return new Ei(this.l,this.j)},vi.prototype.i=function(o){return function(){return o}}({});function Ei(o,c){Ke.call(this),this.D=o,this.o=c,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}k(Ei,Ke),n=Ei.prototype,n.open=function(o,c){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=o,this.A=c,this.readyState=1,ps(this)},n.send=function(o){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const c={headers:this.u,method:this.B,credentials:this.m,cache:void 0};o&&(c.body=o),(this.D||l).fetch(new Request(this.A,c)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,fs(this)),this.readyState=0},n.Sa=function(o){if(this.g&&(this.l=o,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=o.headers,this.readyState=2,ps(this)),this.g&&(this.readyState=3,ps(this),this.g)))if(this.responseType==="arraybuffer")o.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof l.ReadableStream<"u"&&"body"in o){if(this.j=o.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;uu(this)}else o.text().then(this.Ra.bind(this),this.ga.bind(this))};function uu(o){o.j.read().then(o.Pa.bind(o)).catch(o.ga.bind(o))}n.Pa=function(o){if(this.g){if(this.o&&o.value)this.response.push(o.value);else if(!this.o){var c=o.value?o.value:new Uint8Array(0);(c=this.v.decode(c,{stream:!o.done}))&&(this.response=this.responseText+=c)}o.done?fs(this):ps(this),this.readyState==3&&uu(this)}},n.Ra=function(o){this.g&&(this.response=this.responseText=o,fs(this))},n.Qa=function(o){this.g&&(this.response=o,fs(this))},n.ga=function(){this.g&&fs(this)};function fs(o){o.readyState=4,o.l=null,o.j=null,o.v=null,ps(o)}n.setRequestHeader=function(o,c){this.u.append(o,c)},n.getResponseHeader=function(o){return this.h&&this.h.get(o.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const o=[],c=this.h.entries();for(var d=c.next();!d.done;)d=d.value,o.push(d[0]+": "+d[1]),d=c.next();return o.join(`\r
`)};function ps(o){o.onreadystatechange&&o.onreadystatechange.call(o)}Object.defineProperty(Ei.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(o){this.m=o?"include":"same-origin"}});function hu(o){let c="";return q(o,function(d,m){c+=m,c+=":",c+=d,c+=`\r
`}),c}function ya(o,c,d){e:{for(m in d){var m=!1;break e}m=!0}m||(d=hu(d),typeof o=="string"?d!=null&&encodeURIComponent(String(d)):we(o,c,d))}function Ce(o){Ke.call(this),this.headers=new Map,this.o=o||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}k(Ce,Ke);var Ym=/^https?$/i,Zm=["POST","PUT"];n=Ce.prototype,n.Ha=function(o){this.J=o},n.ea=function(o,c,d,m){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+o);c=c?c.toUpperCase():"GET",this.D=o,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():ha.g(),this.v=this.o?$c(this.o):$c(ha),this.g.onreadystatechange=g(this.Ea,this);try{this.B=!0,this.g.open(c,String(o),!0),this.B=!1}catch(R){du(this,R);return}if(o=d||"",d=new Map(this.headers),m)if(Object.getPrototypeOf(m)===Object.prototype)for(var b in m)d.set(b,m[b]);else if(typeof m.keys=="function"&&typeof m.get=="function")for(const R of m.keys())d.set(R,m.get(R));else throw Error("Unknown input type for opt_headers: "+String(m));m=Array.from(d.keys()).find(R=>R.toLowerCase()=="content-type"),b=l.FormData&&o instanceof l.FormData,!(0<=Array.prototype.indexOf.call(Zm,c,void 0))||m||b||d.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[R,O]of d)this.g.setRequestHeader(R,O);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{mu(this),this.u=!0,this.g.send(o),this.u=!1}catch(R){du(this,R)}};function du(o,c){o.h=!1,o.g&&(o.j=!0,o.g.abort(),o.j=!1),o.l=c,o.m=5,fu(o),wi(o)}function fu(o){o.A||(o.A=!0,nt(o,"complete"),nt(o,"error"))}n.abort=function(o){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=o||7,nt(this,"complete"),nt(this,"abort"),wi(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),wi(this,!0)),Ce.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?pu(this):this.bb())},n.bb=function(){pu(this)};function pu(o){if(o.h&&typeof a<"u"&&(!o.v[1]||zt(o)!=4||o.Z()!=2)){if(o.u&&zt(o)==4)Mc(o.Ea,0,o);else if(nt(o,"readystatechange"),zt(o)==4){o.h=!1;try{const O=o.Z();e:switch(O){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var c=!0;break e;default:c=!1}var d;if(!(d=c)){var m;if(m=O===0){var b=String(o.D).match(su)[1]||null;!b&&l.self&&l.self.location&&(b=l.self.location.protocol.slice(0,-1)),m=!Ym.test(b?b.toLowerCase():"")}d=m}if(d)nt(o,"complete"),nt(o,"success");else{o.m=6;try{var R=2<zt(o)?o.g.statusText:""}catch{R=""}o.l=R+" ["+o.Z()+"]",fu(o)}}finally{wi(o)}}}}function wi(o,c){if(o.g){mu(o);const d=o.g,m=o.v[0]?()=>{}:null;o.g=null,o.v=null,c||nt(o,"ready");try{d.onreadystatechange=m}catch{}}}function mu(o){o.I&&(l.clearTimeout(o.I),o.I=null)}n.isActive=function(){return!!this.g};function zt(o){return o.g?o.g.readyState:0}n.Z=function(){try{return 2<zt(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(o){if(this.g){var c=this.g.responseText;return o&&c.indexOf(o)==0&&(c=c.substring(o.length)),Vm(c)}};function gu(o){try{if(!o.g)return null;if("response"in o.g)return o.g.response;switch(o.H){case"":case"text":return o.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in o.g)return o.g.mozResponseArrayBuffer}return null}catch{return null}}function eg(o){const c={};o=(o.g&&2<=zt(o)&&o.g.getAllResponseHeaders()||"").split(`\r
`);for(let m=0;m<o.length;m++){if(B(o[m]))continue;var d=T(o[m]);const b=d[0];if(d=d[1],typeof d!="string")continue;d=d.trim();const R=c[b]||[];c[b]=R,R.push(d)}E(c,function(m){return m.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function ms(o,c,d){return d&&d.internalChannelParams&&d.internalChannelParams[o]||c}function _u(o){this.Aa=0,this.i=[],this.j=new ls,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=ms("failFast",!1,o),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=ms("baseRetryDelayMs",5e3,o),this.cb=ms("retryDelaySeedMs",1e4,o),this.Wa=ms("forwardChannelMaxRetries",2,o),this.wa=ms("forwardChannelRequestTimeoutMs",2e4,o),this.pa=o&&o.xmlHttpFactory||void 0,this.Xa=o&&o.Tb||void 0,this.Ca=o&&o.useFetchStreams||!1,this.L=void 0,this.J=o&&o.supportsCrossDomainXhr||!1,this.K="",this.h=new Yc(o&&o.concurrentRequestLimit),this.Da=new Jm,this.P=o&&o.fastHandshake||!1,this.O=o&&o.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=o&&o.Rb||!1,o&&o.xa&&this.j.xa(),o&&o.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&o&&o.detectBufferingProxy||!1,this.ja=void 0,o&&o.longPollingTimeout&&0<o.longPollingTimeout&&(this.ja=o.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=_u.prototype,n.la=8,n.G=1,n.connect=function(o,c,d,m){rt(0),this.W=o,this.H=c||{},d&&m!==void 0&&(this.H.OSID=d,this.H.OAID=m),this.F=this.X,this.I=Su(this,null,this.W),Ii(this)};function va(o){if(yu(o),o.G==3){var c=o.U++,d=jt(o.I);if(we(d,"SID",o.K),we(d,"RID",c),we(d,"TYPE","terminate"),gs(o,d),c=new nn(o,o.j,c),c.L=2,c.v=yi(jt(d)),d=!1,l.navigator&&l.navigator.sendBeacon)try{d=l.navigator.sendBeacon(c.v.toString(),"")}catch{}!d&&l.Image&&(new Image().src=c.v,d=!0),d||(c.g=Ru(c.j,null),c.g.ea(c.v)),c.F=Date.now(),mi(c)}Au(o)}function Ti(o){o.g&&(wa(o),o.g.cancel(),o.g=null)}function yu(o){Ti(o),o.u&&(l.clearTimeout(o.u),o.u=null),bi(o),o.h.cancel(),o.s&&(typeof o.s=="number"&&l.clearTimeout(o.s),o.s=null)}function Ii(o){if(!Zc(o.h)&&!o.s){o.s=!0;var c=o.Ga;M||be(),j||(M(),j=!0),fe.add(c,o),o.B=0}}function tg(o,c){return eu(o.h)>=o.h.j-(o.s?1:0)?!1:o.s?(o.i=c.D.concat(o.i),!0):o.G==1||o.G==2||o.B>=(o.Va?0:o.Wa)?!1:(o.s=as(g(o.Ga,o,c),bu(o,o.B)),o.B++,!0)}n.Ga=function(o){if(this.s)if(this.s=null,this.G==1){if(!o){this.U=Math.floor(1e5*Math.random()),o=this.U++;const b=new nn(this,this.j,o);let R=this.o;if(this.S&&(R?(R=_(R),w(R,this.S)):R=this.S),this.m!==null||this.O||(b.H=R,R=null),this.P)e:{for(var c=0,d=0;d<this.i.length;d++){t:{var m=this.i[d];if("__data__"in m.map&&(m=m.map.__data__,typeof m=="string")){m=m.length;break t}m=void 0}if(m===void 0)break;if(c+=m,4096<c){c=d;break e}if(c===4096||d===this.i.length-1){c=d+1;break e}}c=1e3}else c=1e3;c=Eu(this,b,c),d=jt(this.I),we(d,"RID",o),we(d,"CVER",22),this.D&&we(d,"X-HTTP-Session-Id",this.D),gs(this,d),R&&(this.O?c="headers="+encodeURIComponent(String(hu(R)))+"&"+c:this.m&&ya(d,this.m,R)),_a(this.h,b),this.Ua&&we(d,"TYPE","init"),this.P?(we(d,"$req",c),we(d,"SID","null"),b.T=!0,fa(b,d,null)):fa(b,d,c),this.G=2}}else this.G==3&&(o?vu(this,o):this.i.length==0||Zc(this.h)||vu(this))};function vu(o,c){var d;c?d=c.l:d=o.U++;const m=jt(o.I);we(m,"SID",o.K),we(m,"RID",d),we(m,"AID",o.T),gs(o,m),o.m&&o.o&&ya(m,o.m,o.o),d=new nn(o,o.j,d,o.B+1),o.m===null&&(d.H=o.o),c&&(o.i=c.D.concat(o.i)),c=Eu(o,d,1e3),d.I=Math.round(.5*o.wa)+Math.round(.5*o.wa*Math.random()),_a(o.h,d),fa(d,m,c)}function gs(o,c){o.H&&q(o.H,function(d,m){we(c,m,d)}),o.l&&ru({},function(d,m){we(c,m,d)})}function Eu(o,c,d){d=Math.min(o.i.length,d);var m=o.l?g(o.l.Na,o.l,o):null;e:{var b=o.i;let R=-1;for(;;){const O=["count="+d];R==-1?0<d?(R=b[0].g,O.push("ofs="+R)):R=0:O.push("ofs="+R);let me=!0;for(let je=0;je<d;je++){let oe=b[je].g;const Qe=b[je].map;if(oe-=R,0>oe)R=Math.max(0,b[je].g-100),me=!1;else try{Xm(Qe,O,"req"+oe+"_")}catch{m&&m(Qe)}}if(me){m=O.join("&");break e}}}return o=o.i.splice(0,d),c.D=o,m}function wu(o){if(!o.g&&!o.u){o.Y=1;var c=o.Fa;M||be(),j||(M(),j=!0),fe.add(c,o),o.v=0}}function Ea(o){return o.g||o.u||3<=o.v?!1:(o.Y++,o.u=as(g(o.Fa,o),bu(o,o.v)),o.v++,!0)}n.Fa=function(){if(this.u=null,Tu(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var o=2*this.R;this.j.info("BP detection timer enabled: "+o),this.A=as(g(this.ab,this),o)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,rt(10),Ti(this),Tu(this))};function wa(o){o.A!=null&&(l.clearTimeout(o.A),o.A=null)}function Tu(o){o.g=new nn(o,o.j,"rpc",o.Y),o.m===null&&(o.g.H=o.o),o.g.O=0;var c=jt(o.qa);we(c,"RID","rpc"),we(c,"SID",o.K),we(c,"AID",o.T),we(c,"CI",o.F?"0":"1"),!o.F&&o.ja&&we(c,"TO",o.ja),we(c,"TYPE","xmlhttp"),gs(o,c),o.m&&o.o&&ya(c,o.m,o.o),o.L&&(o.g.I=o.L);var d=o.g;o=o.ia,d.L=1,d.v=yi(jt(c)),d.m=null,d.P=!0,Qc(d,o)}n.Za=function(){this.C!=null&&(this.C=null,Ti(this),Ea(this),rt(19))};function bi(o){o.C!=null&&(l.clearTimeout(o.C),o.C=null)}function Iu(o,c){var d=null;if(o.g==c){bi(o),wa(o),o.g=null;var m=2}else if(ga(o.h,c))d=c.D,tu(o.h,c),m=1;else return;if(o.G!=0){if(c.o)if(m==1){d=c.m?c.m.length:0,c=Date.now()-c.F;var b=o.B;m=di(),nt(m,new Hc(m,d)),Ii(o)}else wu(o);else if(b=c.s,b==3||b==0&&0<c.X||!(m==1&&tg(o,c)||m==2&&Ea(o)))switch(d&&0<d.length&&(c=o.h,c.i=c.i.concat(d)),b){case 1:Bn(o,5);break;case 4:Bn(o,10);break;case 3:Bn(o,6);break;default:Bn(o,2)}}}function bu(o,c){let d=o.Ta+Math.floor(Math.random()*o.cb);return o.isActive()||(d*=2),d*c}function Bn(o,c){if(o.j.info("Error code "+c),c==2){var d=g(o.fb,o),m=o.Xa;const b=!m;m=new $n(m||"//www.google.com/images/cleardot.gif"),l.location&&l.location.protocol=="http"||gi(m,"https"),yi(m),b?Km(m.toString(),d):Qm(m.toString(),d)}else rt(2);o.G=0,o.l&&o.l.sa(c),Au(o),yu(o)}n.fb=function(o){o?(this.j.info("Successfully pinged google.com"),rt(2)):(this.j.info("Failed to ping google.com"),rt(1))};function Au(o){if(o.G=0,o.ka=[],o.l){const c=nu(o.h);(c.length!=0||o.i.length!=0)&&(N(o.ka,c),N(o.ka,o.i),o.h.i.length=0,V(o.i),o.i.length=0),o.l.ra()}}function Su(o,c,d){var m=d instanceof $n?jt(d):new $n(d);if(m.g!="")c&&(m.g=c+"."+m.g),_i(m,m.s);else{var b=l.location;m=b.protocol,c=c?c+"."+b.hostname:b.hostname,b=+b.port;var R=new $n(null);m&&gi(R,m),c&&(R.g=c),b&&_i(R,b),d&&(R.l=d),m=R}return d=o.D,c=o.ya,d&&c&&we(m,d,c),we(m,"VER",o.la),gs(o,m),m}function Ru(o,c,d){if(c&&!o.J)throw Error("Can't create secondary domain capable XhrIo object.");return c=o.Ca&&!o.pa?new Ce(new vi({eb:d})):new Ce(o.pa),c.Ha(o.J),c}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function ku(){}n=ku.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function Ai(){}Ai.prototype.g=function(o,c){return new ht(o,c)};function ht(o,c){Ke.call(this),this.g=new _u(c),this.l=o,this.h=c&&c.messageUrlParams||null,o=c&&c.messageHeaders||null,c&&c.clientProtocolHeaderRequired&&(o?o["X-Client-Protocol"]="webchannel":o={"X-Client-Protocol":"webchannel"}),this.g.o=o,o=c&&c.initMessageHeaders||null,c&&c.messageContentType&&(o?o["X-WebChannel-Content-Type"]=c.messageContentType:o={"X-WebChannel-Content-Type":c.messageContentType}),c&&c.va&&(o?o["X-WebChannel-Client-Profile"]=c.va:o={"X-WebChannel-Client-Profile":c.va}),this.g.S=o,(o=c&&c.Sb)&&!B(o)&&(this.g.m=o),this.v=c&&c.supportsCrossDomainXhr||!1,this.u=c&&c.sendRawJson||!1,(c=c&&c.httpSessionIdParam)&&!B(c)&&(this.g.D=c,o=this.h,o!==null&&c in o&&(o=this.h,c in o&&delete o[c])),this.j=new _r(this)}k(ht,Ke),ht.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},ht.prototype.close=function(){va(this.g)},ht.prototype.o=function(o){var c=this.g;if(typeof o=="string"){var d={};d.__data__=o,o=d}else this.u&&(d={},d.__data__=aa(o),o=d);c.i.push(new Fm(c.Ya++,o)),c.G==3&&Ii(c)},ht.prototype.N=function(){this.g.l=null,delete this.j,va(this.g),delete this.g,ht.aa.N.call(this)};function Pu(o){ca.call(this),o.__headers__&&(this.headers=o.__headers__,this.statusCode=o.__status__,delete o.__headers__,delete o.__status__);var c=o.__sm__;if(c){e:{for(const d in c){o=d;break e}o=void 0}(this.i=o)&&(o=this.i,c=c!==null&&o in c?c[o]:void 0),this.data=c}else this.data=o}k(Pu,ca);function Cu(){ua.call(this),this.status=1}k(Cu,ua);function _r(o){this.g=o}k(_r,ku),_r.prototype.ua=function(){nt(this.g,"a")},_r.prototype.ta=function(o){nt(this.g,new Pu(o))},_r.prototype.sa=function(o){nt(this.g,new Cu)},_r.prototype.ra=function(){nt(this.g,"b")},Ai.prototype.createWebChannel=Ai.prototype.g,ht.prototype.send=ht.prototype.o,ht.prototype.open=ht.prototype.m,ht.prototype.close=ht.prototype.close,nf=function(){return new Ai},tf=function(){return di()},ef=Fn,ol={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},fi.NO_ERROR=0,fi.TIMEOUT=8,fi.HTTP_ERROR=6,qi=fi,Gc.COMPLETE="complete",Zd=Gc,Bc.EventType=is,is.OPEN="a",is.CLOSE="b",is.ERROR="c",is.MESSAGE="d",Ke.prototype.listen=Ke.prototype.K,bs=Bc,Ce.prototype.listenOnce=Ce.prototype.L,Ce.prototype.getLastError=Ce.prototype.Ka,Ce.prototype.getLastErrorCode=Ce.prototype.Ba,Ce.prototype.getStatus=Ce.prototype.Z,Ce.prototype.getResponseJson=Ce.prototype.Oa,Ce.prototype.getResponseText=Ce.prototype.oa,Ce.prototype.send=Ce.prototype.ea,Ce.prototype.setWithCredentials=Ce.prototype.Ha,Yd=Ce}).apply(typeof Vi<"u"?Vi:typeof self<"u"?self:typeof window<"u"?window:{});const Yu="@firebase/firestore",Zu="4.8.0";/**
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
 */class Ze{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}Ze.UNAUTHENTICATED=new Ze(null),Ze.GOOGLE_CREDENTIALS=new Ze("google-credentials-uid"),Ze.FIRST_PARTY=new Ze("first-party-uid"),Ze.MOCK_USER=new Ze("mock-user");/**
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
 */let Yr="11.10.0";/**
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
 */const or=new $l("@firebase/firestore");function Ir(){return or.logLevel}function U(n,...e){if(or.logLevel<=ne.DEBUG){const t=e.map(jl);or.debug(`Firestore (${Yr}): ${n}`,...t)}}function Xt(n,...e){if(or.logLevel<=ne.ERROR){const t=e.map(jl);or.error(`Firestore (${Yr}): ${n}`,...t)}}function Rn(n,...e){if(or.logLevel<=ne.WARN){const t=e.map(jl);or.warn(`Firestore (${Yr}): ${n}`,...t)}}function jl(n){if(typeof n=="string")return n;try{/**
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
 */function Q(n,e,t){let r="Unexpected state";typeof e=="string"?r=e:t=e,rf(n,r,t)}function rf(n,e,t){let r=`FIRESTORE (${Yr}) INTERNAL ASSERTION FAILED: ${e} (ID: ${n.toString(16)})`;if(t!==void 0)try{r+=" CONTEXT: "+JSON.stringify(t)}catch{r+=" CONTEXT: "+t}throw Xt(r),new Error(r)}function he(n,e,t,r){let s="Unexpected state";typeof t=="string"?s=t:r=t,n||rf(e,s,r)}function Z(n,e){return n}/**
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
 */const P={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class F extends tn{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
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
 */class vn{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
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
 */class sf{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class N0{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(Ze.UNAUTHENTICATED))}shutdown(){}}class x0{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class D0{constructor(e){this.t=e,this.currentUser=Ze.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){he(this.o===void 0,42304);let r=this.i;const s=u=>this.i!==r?(r=this.i,t(u)):Promise.resolve();let i=new vn;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new vn,e.enqueueRetryable(()=>s(this.currentUser))};const a=()=>{const u=i;e.enqueueRetryable(async()=>{await u.promise,await s(this.currentUser)})},l=u=>{U("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit(u=>l(u)),setTimeout(()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?l(u):(U("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new vn)}},0),a()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(r=>this.i!==e?(U("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(he(typeof r.accessToken=="string",31837,{l:r}),new sf(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return he(e===null||typeof e=="string",2055,{h:e}),new Ze(e)}}class O0{constructor(e,t,r){this.P=e,this.T=t,this.I=r,this.type="FirstParty",this.user=Ze.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const e=this.R();return e&&this.A.set("Authorization",e),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class M0{constructor(e,t,r){this.P=e,this.T=t,this.I=r}getToken(){return Promise.resolve(new O0(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable(()=>t(Ze.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class eh{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class L0{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,Et(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){he(this.o===void 0,3512);const r=i=>{i.error!=null&&U("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const a=i.token!==this.m;return this.m=i.token,U("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?t(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable(()=>r(i))};const s=i=>{U("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(i=>s(i)),setTimeout(()=>{if(!this.appCheck){const i=this.V.getImmediate({optional:!0});i?s(i):U("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new eh(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(he(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new eh(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
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
 */function F0(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
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
 */class zl{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const s=F0(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<t&&(r+=e.charAt(s[i]%62))}return r}}function ee(n,e){return n<e?-1:n>e?1:0}function al(n,e){let t=0;for(;t<n.length&&t<e.length;){const r=n.codePointAt(t),s=e.codePointAt(t);if(r!==s){if(r<128&&s<128)return ee(r,s);{const i=of(),a=U0(i.encode(th(n,t)),i.encode(th(e,t)));return a!==0?a:ee(r,s)}}t+=r>65535?2:1}return ee(n.length,e.length)}function th(n,e){return n.codePointAt(e)>65535?n.substring(e,e+2):n.substring(e,e+1)}function U0(n,e){for(let t=0;t<n.length&&t<e.length;++t)if(n[t]!==e[t])return ee(n[t],e[t]);return ee(n.length,e.length)}function Br(n,e,t){return n.length===e.length&&n.every((r,s)=>t(r,e[s]))}/**
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
 */const nh="__name__";class Pt{constructor(e,t,r){t===void 0?t=0:t>e.length&&Q(637,{offset:t,range:e.length}),r===void 0?r=e.length-t:r>e.length-t&&Q(1746,{length:r,range:e.length-t}),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return Pt.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof Pt?e.forEach(r=>{t.push(r)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let s=0;s<r;s++){const i=Pt.compareSegments(e.get(s),t.get(s));if(i!==0)return i}return ee(e.length,t.length)}static compareSegments(e,t){const r=Pt.isNumericId(e),s=Pt.isNumericId(t);return r&&!s?-1:!r&&s?1:r&&s?Pt.extractNumericId(e).compare(Pt.extractNumericId(t)):al(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return yn.fromString(e.substring(4,e.length-2))}}class Ee extends Pt{construct(e,t,r){return new Ee(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new F(P.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter(s=>s.length>0))}return new Ee(t)}static emptyPath(){return new Ee([])}}const $0=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class He extends Pt{construct(e,t,r){return new He(e,t,r)}static isValidIdentifier(e){return $0.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),He.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===nh}static keyField(){return new He([nh])}static fromServerFormat(e){const t=[];let r="",s=0;const i=()=>{if(r.length===0)throw new F(P.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let a=!1;for(;s<e.length;){const l=e[s];if(l==="\\"){if(s+1===e.length)throw new F(P.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const u=e[s+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new F(P.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=u,s+=2}else l==="`"?(a=!a,s++):l!=="."||a?(r+=l,s++):(i(),s++)}if(i(),a)throw new F(P.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new He(t)}static emptyPath(){return new He([])}}/**
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
 */function af(n,e,t){if(!t)throw new F(P.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function B0(n,e,t,r){if(e===!0&&r===!0)throw new F(P.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function rh(n){if(!H.isDocumentKey(n))throw new F(P.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function sh(n){if(H.isDocumentKey(n))throw new F(P.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function lf(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function ko(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":Q(12329,{type:typeof n})}function Tt(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new F(P.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=ko(n);throw new F(P.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}/**
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
 */function Me(n,e){const t={typeString:n};return e&&(t.value=e),t}function ei(n,e){if(!lf(n))throw new F(P.INVALID_ARGUMENT,"JSON must be an object");let t;for(const r in e)if(e[r]){const s=e[r].typeString,i="value"in e[r]?{value:e[r].value}:void 0;if(!(r in n)){t=`JSON missing required field: '${r}'`;break}const a=n[r];if(s&&typeof a!==s){t=`JSON field '${r}' must be a ${s}.`;break}if(i!==void 0&&a!==i.value){t=`Expected '${r}' field to equal '${i.value}'`;break}}if(t)throw new F(P.INVALID_ARGUMENT,t);return!0}/**
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
 */const ih=-62135596800,oh=1e6;class Ie{static now(){return Ie.fromMillis(Date.now())}static fromDate(e){return Ie.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor((e-1e3*t)*oh);return new Ie(t,r)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new F(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new F(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<ih)throw new F(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new F(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/oh}_compareTo(e){return this.seconds===e.seconds?ee(this.nanoseconds,e.nanoseconds):ee(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:Ie._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(ei(e,Ie._jsonSchema))return new Ie(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-ih;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}Ie._jsonSchemaVersion="firestore/timestamp/1.0",Ie._jsonSchema={type:Me("string",Ie._jsonSchemaVersion),seconds:Me("number"),nanoseconds:Me("number")};/**
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
 */class Y{static fromTimestamp(e){return new Y(e)}static min(){return new Y(new Ie(0,0))}static max(){return new Y(new Ie(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
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
 */const Us=-1;function q0(n,e){const t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,s=Y.fromTimestamp(r===1e9?new Ie(t+1,0):new Ie(t,r));return new kn(s,H.empty(),e)}function j0(n){return new kn(n.readTime,n.key,Us)}class kn{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new kn(Y.min(),H.empty(),Us)}static max(){return new kn(Y.max(),H.empty(),Us)}}function z0(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=H.comparator(n.documentKey,e.documentKey),t!==0?t:ee(n.largestBatchId,e.largestBatchId))}/**
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
 */const H0="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class G0{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
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
 */async function Zr(n){if(n.code!==P.FAILED_PRECONDITION||n.message!==H0)throw n;U("LocalStore","Unexpectedly lost primary lease")}/**
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
 */class C{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&Q(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new C((r,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(r,s)},this.catchCallback=i=>{this.wrapFailure(t,i).next(r,s)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof C?t:C.resolve(t)}catch(t){return C.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):C.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):C.reject(t)}static resolve(e){return new C((t,r)=>{t(e)})}static reject(e){return new C((t,r)=>{r(e)})}static waitFor(e){return new C((t,r)=>{let s=0,i=0,a=!1;e.forEach(l=>{++s,l.next(()=>{++i,a&&i===s&&t()},u=>r(u))}),a=!0,i===s&&t()})}static or(e){let t=C.resolve(!1);for(const r of e)t=t.next(s=>s?C.resolve(s):r());return t}static forEach(e,t){const r=[];return e.forEach((s,i)=>{r.push(t.call(this,s,i))}),this.waitFor(r)}static mapArray(e,t){return new C((r,s)=>{const i=e.length,a=new Array(i);let l=0;for(let u=0;u<i;u++){const h=u;t(e[h]).next(f=>{a[h]=f,++l,l===i&&r(a)},f=>s(f))}})}static doWhile(e,t){return new C((r,s)=>{const i=()=>{e()===!0?t().next(()=>{i()},s):r()};i()})}}function W0(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function es(n){return n.name==="IndexedDbTransactionError"}/**
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
 */class Po{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this._e(r),this.ae=r=>t.writeSequenceNumber(r))}_e(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ae&&this.ae(e),e}}Po.ue=-1;/**
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
 */const Hl=-1;function Co(n){return n==null}function oo(n){return n===0&&1/n==-1/0}function K0(n){return typeof n=="number"&&Number.isInteger(n)&&!oo(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
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
 */const cf="";function Q0(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=ah(e)),e=J0(n.get(t),e);return ah(e)}function J0(n,e){let t=e;const r=n.length;for(let s=0;s<r;s++){const i=n.charAt(s);switch(i){case"\0":t+="";break;case cf:t+="";break;default:t+=i}}return t}function ah(n){return n+cf+""}/**
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
 */function lh(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function On(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function uf(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
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
 */class Pe{constructor(e,t){this.comparator=e,this.root=t||ze.EMPTY}insert(e,t){return new Pe(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,ze.BLACK,null,null))}remove(e){return new Pe(this.comparator,this.root.remove(e,this.comparator).copy(null,null,ze.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(e,r.key);if(s===0)return t+r.left.size;s<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,r)=>(e(t,r),!1))}toString(){const e=[];return this.inorderTraversal((t,r)=>(e.push(`${t}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Ni(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Ni(this.root,e,this.comparator,!1)}getReverseIterator(){return new Ni(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Ni(this.root,e,this.comparator,!0)}}class Ni{constructor(e,t,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?r(e.key,t):1,t&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class ze{constructor(e,t,r,s,i){this.key=e,this.value=t,this.color=r??ze.RED,this.left=s??ze.EMPTY,this.right=i??ze.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,s,i){return new ze(e??this.key,t??this.value,r??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let s=this;const i=r(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,t,r),null):i===0?s.copy(null,t,null,null,null):s.copy(null,null,null,null,s.right.insert(e,t,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return ze.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,s=this;if(t(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),t(e,s.key)===0){if(s.right.isEmpty())return ze.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,ze.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,ze.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw Q(43730,{key:this.key,value:this.value});if(this.right.isRed())throw Q(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw Q(27949);return e+(this.isRed()?0:1)}}ze.EMPTY=null,ze.RED=!0,ze.BLACK=!1;ze.EMPTY=new class{constructor(){this.size=0}get key(){throw Q(57766)}get value(){throw Q(16141)}get color(){throw Q(16727)}get left(){throw Q(29726)}get right(){throw Q(36894)}copy(e,t,r,s,i){return this}insert(e,t,r){return new ze(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
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
 */class Fe{constructor(e){this.comparator=e,this.data=new Pe(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,r)=>(e(t),!1))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,e[1])>=0)return;t(s.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new ch(this.data.getIterator())}getIteratorFrom(e){return new ch(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(r=>{t=t.add(r)}),t}isEqual(e){if(!(e instanceof Fe)||this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new Fe(this.comparator);return t.data=e,t}}class ch{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
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
 */class dt{constructor(e){this.fields=e,e.sort(He.comparator)}static empty(){return new dt([])}unionWith(e){let t=new Fe(He.comparator);for(const r of this.fields)t=t.add(r);for(const r of e)t=t.add(r);return new dt(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return Br(this.fields,e.fields,(t,r)=>t.isEqual(r))}}/**
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
 */class We{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new hf("Invalid base64 string: "+i):i}}(e);return new We(t)}static fromUint8Array(e){const t=function(s){let i="";for(let a=0;a<s.length;++a)i+=String.fromCharCode(s[a]);return i}(e);return new We(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const r=new Uint8Array(t.length);for(let s=0;s<t.length;s++)r[s]=t.charCodeAt(s);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return ee(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}We.EMPTY_BYTE_STRING=new We("");const X0=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Pn(n){if(he(!!n,39018),typeof n=="string"){let e=0;const t=X0.exec(n);if(he(!!t,46558,{timestamp:n}),t[1]){let s=t[1];s=(s+"000000000").substr(0,9),e=Number(s)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:xe(n.seconds),nanos:xe(n.nanos)}}function xe(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function Cn(n){return typeof n=="string"?We.fromBase64String(n):We.fromUint8Array(n)}/**
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
 */const df="server_timestamp",ff="__type__",pf="__previous_value__",mf="__local_write_time__";function Gl(n){var e,t;return((t=(((e=n==null?void 0:n.mapValue)===null||e===void 0?void 0:e.fields)||{})[ff])===null||t===void 0?void 0:t.stringValue)===df}function Vo(n){const e=n.mapValue.fields[pf];return Gl(e)?Vo(e):e}function $s(n){const e=Pn(n.mapValue.fields[mf].timestampValue);return new Ie(e.seconds,e.nanos)}/**
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
 */class Y0{constructor(e,t,r,s,i,a,l,u,h,f){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=a,this.autoDetectLongPolling=l,this.longPollingOptions=u,this.useFetchStreams=h,this.isUsingEmulator=f}}const ao="(default)";class Bs{constructor(e,t){this.projectId=e,this.database=t||ao}static empty(){return new Bs("","")}get isDefaultDatabase(){return this.database===ao}isEqual(e){return e instanceof Bs&&e.projectId===this.projectId&&e.database===this.database}}/**
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
 */const gf="__type__",Z0="__max__",xi={mapValue:{}},_f="__vector__",lo="value";function Vn(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?Gl(n)?4:ty(n)?9007199254740991:ey(n)?10:11:Q(28295,{value:n})}function Bt(n,e){if(n===e)return!0;const t=Vn(n);if(t!==Vn(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return $s(n).isEqual($s(e));case 3:return function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const a=Pn(s.timestampValue),l=Pn(i.timestampValue);return a.seconds===l.seconds&&a.nanos===l.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(s,i){return Cn(s.bytesValue).isEqual(Cn(i.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(s,i){return xe(s.geoPointValue.latitude)===xe(i.geoPointValue.latitude)&&xe(s.geoPointValue.longitude)===xe(i.geoPointValue.longitude)}(n,e);case 2:return function(s,i){if("integerValue"in s&&"integerValue"in i)return xe(s.integerValue)===xe(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const a=xe(s.doubleValue),l=xe(i.doubleValue);return a===l?oo(a)===oo(l):isNaN(a)&&isNaN(l)}return!1}(n,e);case 9:return Br(n.arrayValue.values||[],e.arrayValue.values||[],Bt);case 10:case 11:return function(s,i){const a=s.mapValue.fields||{},l=i.mapValue.fields||{};if(lh(a)!==lh(l))return!1;for(const u in a)if(a.hasOwnProperty(u)&&(l[u]===void 0||!Bt(a[u],l[u])))return!1;return!0}(n,e);default:return Q(52216,{left:n})}}function qs(n,e){return(n.values||[]).find(t=>Bt(t,e))!==void 0}function qr(n,e){if(n===e)return 0;const t=Vn(n),r=Vn(e);if(t!==r)return ee(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return ee(n.booleanValue,e.booleanValue);case 2:return function(i,a){const l=xe(i.integerValue||i.doubleValue),u=xe(a.integerValue||a.doubleValue);return l<u?-1:l>u?1:l===u?0:isNaN(l)?isNaN(u)?0:-1:1}(n,e);case 3:return uh(n.timestampValue,e.timestampValue);case 4:return uh($s(n),$s(e));case 5:return al(n.stringValue,e.stringValue);case 6:return function(i,a){const l=Cn(i),u=Cn(a);return l.compareTo(u)}(n.bytesValue,e.bytesValue);case 7:return function(i,a){const l=i.split("/"),u=a.split("/");for(let h=0;h<l.length&&h<u.length;h++){const f=ee(l[h],u[h]);if(f!==0)return f}return ee(l.length,u.length)}(n.referenceValue,e.referenceValue);case 8:return function(i,a){const l=ee(xe(i.latitude),xe(a.latitude));return l!==0?l:ee(xe(i.longitude),xe(a.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return hh(n.arrayValue,e.arrayValue);case 10:return function(i,a){var l,u,h,f;const p=i.fields||{},g=a.fields||{},S=(l=p[lo])===null||l===void 0?void 0:l.arrayValue,k=(u=g[lo])===null||u===void 0?void 0:u.arrayValue,V=ee(((h=S==null?void 0:S.values)===null||h===void 0?void 0:h.length)||0,((f=k==null?void 0:k.values)===null||f===void 0?void 0:f.length)||0);return V!==0?V:hh(S,k)}(n.mapValue,e.mapValue);case 11:return function(i,a){if(i===xi.mapValue&&a===xi.mapValue)return 0;if(i===xi.mapValue)return 1;if(a===xi.mapValue)return-1;const l=i.fields||{},u=Object.keys(l),h=a.fields||{},f=Object.keys(h);u.sort(),f.sort();for(let p=0;p<u.length&&p<f.length;++p){const g=al(u[p],f[p]);if(g!==0)return g;const S=qr(l[u[p]],h[f[p]]);if(S!==0)return S}return ee(u.length,f.length)}(n.mapValue,e.mapValue);default:throw Q(23264,{le:t})}}function uh(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return ee(n,e);const t=Pn(n),r=Pn(e),s=ee(t.seconds,r.seconds);return s!==0?s:ee(t.nanos,r.nanos)}function hh(n,e){const t=n.values||[],r=e.values||[];for(let s=0;s<t.length&&s<r.length;++s){const i=qr(t[s],r[s]);if(i)return i}return ee(t.length,r.length)}function jr(n){return ll(n)}function ll(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(t){const r=Pn(t);return`time(${r.seconds},${r.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(t){return Cn(t).toBase64()}(n.bytesValue):"referenceValue"in n?function(t){return H.fromName(t).toString()}(n.referenceValue):"geoPointValue"in n?function(t){return`geo(${t.latitude},${t.longitude})`}(n.geoPointValue):"arrayValue"in n?function(t){let r="[",s=!0;for(const i of t.values||[])s?s=!1:r+=",",r+=ll(i);return r+"]"}(n.arrayValue):"mapValue"in n?function(t){const r=Object.keys(t.fields||{}).sort();let s="{",i=!0;for(const a of r)i?i=!1:s+=",",s+=`${a}:${ll(t.fields[a])}`;return s+"}"}(n.mapValue):Q(61005,{value:n})}function ji(n){switch(Vn(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=Vo(n);return e?16+ji(e):16;case 5:return 2*n.stringValue.length;case 6:return Cn(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return function(r){return(r.values||[]).reduce((s,i)=>s+ji(i),0)}(n.arrayValue);case 10:case 11:return function(r){let s=0;return On(r.fields,(i,a)=>{s+=i.length+ji(a)}),s}(n.mapValue);default:throw Q(13486,{value:n})}}function dh(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function cl(n){return!!n&&"integerValue"in n}function Wl(n){return!!n&&"arrayValue"in n}function fh(n){return!!n&&"nullValue"in n}function ph(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function zi(n){return!!n&&"mapValue"in n}function ey(n){var e,t;return((t=(((e=n==null?void 0:n.mapValue)===null||e===void 0?void 0:e.fields)||{})[gf])===null||t===void 0?void 0:t.stringValue)===_f}function Cs(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){const e={mapValue:{fields:{}}};return On(n.mapValue.fields,(t,r)=>e.mapValue.fields[t]=Cs(r)),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=Cs(n.arrayValue.values[t]);return e}return Object.assign({},n)}function ty(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===Z0}/**
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
 */class ut{constructor(e){this.value=e}static empty(){return new ut({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!zi(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=Cs(t)}setAll(e){let t=He.emptyPath(),r={},s=[];e.forEach((a,l)=>{if(!t.isImmediateParentOf(l)){const u=this.getFieldsMap(t);this.applyChanges(u,r,s),r={},s=[],t=l.popLast()}a?r[l.lastSegment()]=Cs(a):s.push(l.lastSegment())});const i=this.getFieldsMap(t);this.applyChanges(i,r,s)}delete(e){const t=this.field(e.popLast());zi(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return Bt(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let s=t.mapValue.fields[e.get(r)];zi(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=s),t=s}return t.mapValue.fields}applyChanges(e,t,r){On(t,(s,i)=>e[s]=i);for(const s of r)delete e[s]}clone(){return new ut(Cs(this.value))}}function yf(n){const e=[];return On(n.fields,(t,r)=>{const s=new He([t]);if(zi(r)){const i=yf(r.mapValue).fields;if(i.length===0)e.push(s);else for(const a of i)e.push(s.child(a))}else e.push(s)}),new dt(e)}/**
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
 */class et{constructor(e,t,r,s,i,a,l){this.key=e,this.documentType=t,this.version=r,this.readTime=s,this.createTime=i,this.data=a,this.documentState=l}static newInvalidDocument(e){return new et(e,0,Y.min(),Y.min(),Y.min(),ut.empty(),0)}static newFoundDocument(e,t,r,s){return new et(e,1,t,Y.min(),r,s,0)}static newNoDocument(e,t){return new et(e,2,t,Y.min(),Y.min(),ut.empty(),0)}static newUnknownDocument(e,t){return new et(e,3,t,Y.min(),Y.min(),ut.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(Y.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=ut.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=ut.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=Y.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof et&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new et(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
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
 */class co{constructor(e,t){this.position=e,this.inclusive=t}}function mh(n,e,t){let r=0;for(let s=0;s<n.position.length;s++){const i=e[s],a=n.position[s];if(i.field.isKeyField()?r=H.comparator(H.fromName(a.referenceValue),t.key):r=qr(a,t.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function gh(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!Bt(n.position[t],e.position[t]))return!1;return!0}/**
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
 */class js{constructor(e,t="asc"){this.field=e,this.dir=t}}function ny(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
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
 */class vf{}class Oe extends vf{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new sy(e,t,r):t==="array-contains"?new ay(e,r):t==="in"?new ly(e,r):t==="not-in"?new cy(e,r):t==="array-contains-any"?new uy(e,r):new Oe(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new iy(e,r):new oy(e,r)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(qr(t,this.value)):t!==null&&Vn(this.value)===Vn(t)&&this.matchesComparison(qr(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return Q(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class At extends vf{constructor(e,t){super(),this.filters=e,this.op=t,this.he=null}static create(e,t){return new At(e,t)}matches(e){return Ef(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.he!==null||(this.he=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.he}getFilters(){return Object.assign([],this.filters)}}function Ef(n){return n.op==="and"}function wf(n){return ry(n)&&Ef(n)}function ry(n){for(const e of n.filters)if(e instanceof At)return!1;return!0}function ul(n){if(n instanceof Oe)return n.field.canonicalString()+n.op.toString()+jr(n.value);if(wf(n))return n.filters.map(e=>ul(e)).join(",");{const e=n.filters.map(t=>ul(t)).join(",");return`${n.op}(${e})`}}function Tf(n,e){return n instanceof Oe?function(r,s){return s instanceof Oe&&r.op===s.op&&r.field.isEqual(s.field)&&Bt(r.value,s.value)}(n,e):n instanceof At?function(r,s){return s instanceof At&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce((i,a,l)=>i&&Tf(a,s.filters[l]),!0):!1}(n,e):void Q(19439)}function If(n){return n instanceof Oe?function(t){return`${t.field.canonicalString()} ${t.op} ${jr(t.value)}`}(n):n instanceof At?function(t){return t.op.toString()+" {"+t.getFilters().map(If).join(" ,")+"}"}(n):"Filter"}class sy extends Oe{constructor(e,t,r){super(e,t,r),this.key=H.fromName(r.referenceValue)}matches(e){const t=H.comparator(e.key,this.key);return this.matchesComparison(t)}}class iy extends Oe{constructor(e,t){super(e,"in",t),this.keys=bf("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class oy extends Oe{constructor(e,t){super(e,"not-in",t),this.keys=bf("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function bf(n,e){var t;return(((t=e.arrayValue)===null||t===void 0?void 0:t.values)||[]).map(r=>H.fromName(r.referenceValue))}class ay extends Oe{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return Wl(t)&&qs(t.arrayValue,this.value)}}class ly extends Oe{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&qs(this.value.arrayValue,t)}}class cy extends Oe{constructor(e,t){super(e,"not-in",t)}matches(e){if(qs(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!qs(this.value.arrayValue,t)}}class uy extends Oe{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!Wl(t)||!t.arrayValue.values)&&t.arrayValue.values.some(r=>qs(this.value.arrayValue,r))}}/**
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
 */class hy{constructor(e,t=null,r=[],s=[],i=null,a=null,l=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=a,this.endAt=l,this.Pe=null}}function _h(n,e=null,t=[],r=[],s=null,i=null,a=null){return new hy(n,e,t,r,s,i,a)}function Kl(n){const e=Z(n);if(e.Pe===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(r=>ul(r)).join(","),t+="|ob:",t+=e.orderBy.map(r=>function(i){return i.field.canonicalString()+i.dir}(r)).join(","),Co(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(r=>jr(r)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(r=>jr(r)).join(",")),e.Pe=t}return e.Pe}function Ql(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!ny(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!Tf(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!gh(n.startAt,e.startAt)&&gh(n.endAt,e.endAt)}function hl(n){return H.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
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
 */class ts{constructor(e,t=null,r=[],s=[],i=null,a="F",l=null,u=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=a,this.startAt=l,this.endAt=u,this.Te=null,this.Ie=null,this.de=null,this.startAt,this.endAt}}function dy(n,e,t,r,s,i,a,l){return new ts(n,e,t,r,s,i,a,l)}function No(n){return new ts(n)}function yh(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function Af(n){return n.collectionGroup!==null}function Vs(n){const e=Z(n);if(e.Te===null){e.Te=[];const t=new Set;for(const i of e.explicitOrderBy)e.Te.push(i),t.add(i.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(a){let l=new Fe(He.comparator);return a.filters.forEach(u=>{u.getFlattenedFilters().forEach(h=>{h.isInequality()&&(l=l.add(h.field))})}),l})(e).forEach(i=>{t.has(i.canonicalString())||i.isKeyField()||e.Te.push(new js(i,r))}),t.has(He.keyField().canonicalString())||e.Te.push(new js(He.keyField(),r))}return e.Te}function Dt(n){const e=Z(n);return e.Ie||(e.Ie=fy(e,Vs(n))),e.Ie}function fy(n,e){if(n.limitType==="F")return _h(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(s=>{const i=s.dir==="desc"?"asc":"desc";return new js(s.field,i)});const t=n.endAt?new co(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new co(n.startAt.position,n.startAt.inclusive):null;return _h(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function dl(n,e){const t=n.filters.concat([e]);return new ts(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function fl(n,e,t){return new ts(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function xo(n,e){return Ql(Dt(n),Dt(e))&&n.limitType===e.limitType}function Sf(n){return`${Kl(Dt(n))}|lt:${n.limitType}`}function br(n){return`Query(target=${function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map(s=>If(s)).join(", ")}]`),Co(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map(s=>function(a){return`${a.field.canonicalString()} (${a.dir})`}(s)).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map(s=>jr(s)).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map(s=>jr(s)).join(",")),`Target(${r})`}(Dt(n))}; limitType=${n.limitType})`}function Do(n,e){return e.isFoundDocument()&&function(r,s){const i=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(i):H.isDocumentKey(r.path)?r.path.isEqual(i):r.path.isImmediateParentOf(i)}(n,e)&&function(r,s){for(const i of Vs(r))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0}(n,e)&&function(r,s){for(const i of r.filters)if(!i.matches(s))return!1;return!0}(n,e)&&function(r,s){return!(r.startAt&&!function(a,l,u){const h=mh(a,l,u);return a.inclusive?h<=0:h<0}(r.startAt,Vs(r),s)||r.endAt&&!function(a,l,u){const h=mh(a,l,u);return a.inclusive?h>=0:h>0}(r.endAt,Vs(r),s))}(n,e)}function py(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function Rf(n){return(e,t)=>{let r=!1;for(const s of Vs(n)){const i=my(s,e,t);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function my(n,e,t){const r=n.field.isKeyField()?H.comparator(e.key,t.key):function(i,a,l){const u=a.data.field(i),h=l.data.field(i);return u!==null&&h!==null?qr(u,h):Q(42886)}(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return Q(19790,{direction:n.dir})}}/**
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
 */class ur{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(const[s,i]of r)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,t){const r=this.mapKeyFn(e),s=this.inner[r];if(s===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,t]);s.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return r.length===1?delete this.inner[t]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(e){On(this.inner,(t,r)=>{for(const[s,i]of r)e(s,i)})}isEmpty(){return uf(this.inner)}size(){return this.innerSize}}/**
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
 */const gy=new Pe(H.comparator);function Yt(){return gy}const kf=new Pe(H.comparator);function As(...n){let e=kf;for(const t of n)e=e.insert(t.key,t);return e}function Pf(n){let e=kf;return n.forEach((t,r)=>e=e.insert(t,r.overlayedDocument)),e}function Xn(){return Ns()}function Cf(){return Ns()}function Ns(){return new ur(n=>n.toString(),(n,e)=>n.isEqual(e))}const _y=new Pe(H.comparator),yy=new Fe(H.comparator);function re(...n){let e=yy;for(const t of n)e=e.add(t);return e}const vy=new Fe(ee);function Ey(){return vy}/**
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
 */function Jl(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:oo(e)?"-0":e}}function Vf(n){return{integerValue:""+n}}function wy(n,e){return K0(e)?Vf(e):Jl(n,e)}/**
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
 */class Oo{constructor(){this._=void 0}}function Ty(n,e,t){return n instanceof zs?function(s,i){const a={fields:{[ff]:{stringValue:df},[mf]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&Gl(i)&&(i=Vo(i)),i&&(a.fields[pf]=i),{mapValue:a}}(t,e):n instanceof Hs?xf(n,e):n instanceof Gs?Df(n,e):function(s,i){const a=Nf(s,i),l=vh(a)+vh(s.Ee);return cl(a)&&cl(s.Ee)?Vf(l):Jl(s.serializer,l)}(n,e)}function Iy(n,e,t){return n instanceof Hs?xf(n,e):n instanceof Gs?Df(n,e):t}function Nf(n,e){return n instanceof uo?function(r){return cl(r)||function(i){return!!i&&"doubleValue"in i}(r)}(e)?e:{integerValue:0}:null}class zs extends Oo{}class Hs extends Oo{constructor(e){super(),this.elements=e}}function xf(n,e){const t=Of(e);for(const r of n.elements)t.some(s=>Bt(s,r))||t.push(r);return{arrayValue:{values:t}}}class Gs extends Oo{constructor(e){super(),this.elements=e}}function Df(n,e){let t=Of(e);for(const r of n.elements)t=t.filter(s=>!Bt(s,r));return{arrayValue:{values:t}}}class uo extends Oo{constructor(e,t){super(),this.serializer=e,this.Ee=t}}function vh(n){return xe(n.integerValue||n.doubleValue)}function Of(n){return Wl(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
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
 */class by{constructor(e,t){this.field=e,this.transform=t}}function Ay(n,e){return n.field.isEqual(e.field)&&function(r,s){return r instanceof Hs&&s instanceof Hs||r instanceof Gs&&s instanceof Gs?Br(r.elements,s.elements,Bt):r instanceof uo&&s instanceof uo?Bt(r.Ee,s.Ee):r instanceof zs&&s instanceof zs}(n.transform,e.transform)}class Sy{constructor(e,t){this.version=e,this.transformResults=t}}class It{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new It}static exists(e){return new It(void 0,e)}static updateTime(e){return new It(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Hi(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class Mo{}function Mf(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new Ff(n.key,It.none()):new ti(n.key,n.data,It.none());{const t=n.data,r=ut.empty();let s=new Fe(He.comparator);for(let i of e.fields)if(!s.has(i)){let a=t.field(i);a===null&&i.length>1&&(i=i.popLast(),a=t.field(i)),a===null?r.delete(i):r.set(i,a),s=s.add(i)}return new Mn(n.key,r,new dt(s.toArray()),It.none())}}function Ry(n,e,t){n instanceof ti?function(s,i,a){const l=s.value.clone(),u=wh(s.fieldTransforms,i,a.transformResults);l.setAll(u),i.convertToFoundDocument(a.version,l).setHasCommittedMutations()}(n,e,t):n instanceof Mn?function(s,i,a){if(!Hi(s.precondition,i))return void i.convertToUnknownDocument(a.version);const l=wh(s.fieldTransforms,i,a.transformResults),u=i.data;u.setAll(Lf(s)),u.setAll(l),i.convertToFoundDocument(a.version,u).setHasCommittedMutations()}(n,e,t):function(s,i,a){i.convertToNoDocument(a.version).setHasCommittedMutations()}(0,e,t)}function xs(n,e,t,r){return n instanceof ti?function(i,a,l,u){if(!Hi(i.precondition,a))return l;const h=i.value.clone(),f=Th(i.fieldTransforms,u,a);return h.setAll(f),a.convertToFoundDocument(a.version,h).setHasLocalMutations(),null}(n,e,t,r):n instanceof Mn?function(i,a,l,u){if(!Hi(i.precondition,a))return l;const h=Th(i.fieldTransforms,u,a),f=a.data;return f.setAll(Lf(i)),f.setAll(h),a.convertToFoundDocument(a.version,f).setHasLocalMutations(),l===null?null:l.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map(p=>p.field))}(n,e,t,r):function(i,a,l){return Hi(i.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):l}(n,e,t)}function ky(n,e){let t=null;for(const r of n.fieldTransforms){const s=e.data.field(r.field),i=Nf(r.transform,s||null);i!=null&&(t===null&&(t=ut.empty()),t.set(r.field,i))}return t||null}function Eh(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&Br(r,s,(i,a)=>Ay(i,a))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class ti extends Mo{constructor(e,t,r,s=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class Mn extends Mo{constructor(e,t,r,s,i=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function Lf(n){const e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){const r=n.data.field(t);e.set(t,r)}}),e}function wh(n,e,t){const r=new Map;he(n.length===t.length,32656,{Ae:t.length,Re:n.length});for(let s=0;s<t.length;s++){const i=n[s],a=i.transform,l=e.data.field(i.field);r.set(i.field,Iy(a,l,t[s]))}return r}function Th(n,e,t){const r=new Map;for(const s of n){const i=s.transform,a=t.data.field(s.field);r.set(s.field,Ty(i,a,e))}return r}class Ff extends Mo{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class Py extends Mo{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
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
 */class Cy{constructor(e,t,r,s){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&Ry(i,e,r[s])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=xs(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=xs(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=Cf();return this.mutations.forEach(s=>{const i=e.get(s.key),a=i.overlayedDocument;let l=this.applyToLocalView(a,i.mutatedFields);l=t.has(s.key)?null:l;const u=Mf(a,l);u!==null&&r.set(s.key,u),a.isValidDocument()||a.convertToNoDocument(Y.min())}),r}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),re())}isEqual(e){return this.batchId===e.batchId&&Br(this.mutations,e.mutations,(t,r)=>Eh(t,r))&&Br(this.baseMutations,e.baseMutations,(t,r)=>Eh(t,r))}}class Xl{constructor(e,t,r,s){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=s}static from(e,t,r){he(e.mutations.length===r.length,58842,{Ve:e.mutations.length,me:r.length});let s=function(){return _y}();const i=e.mutations;for(let a=0;a<i.length;a++)s=s.insert(i[a].key,r[a].version);return new Xl(e,t,r,s)}}/**
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
 */class Vy{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
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
 */class Ny{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
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
 */var De,ie;function xy(n){switch(n){case P.OK:return Q(64938);case P.CANCELLED:case P.UNKNOWN:case P.DEADLINE_EXCEEDED:case P.RESOURCE_EXHAUSTED:case P.INTERNAL:case P.UNAVAILABLE:case P.UNAUTHENTICATED:return!1;case P.INVALID_ARGUMENT:case P.NOT_FOUND:case P.ALREADY_EXISTS:case P.PERMISSION_DENIED:case P.FAILED_PRECONDITION:case P.ABORTED:case P.OUT_OF_RANGE:case P.UNIMPLEMENTED:case P.DATA_LOSS:return!0;default:return Q(15467,{code:n})}}function Uf(n){if(n===void 0)return Xt("GRPC error has no .code"),P.UNKNOWN;switch(n){case De.OK:return P.OK;case De.CANCELLED:return P.CANCELLED;case De.UNKNOWN:return P.UNKNOWN;case De.DEADLINE_EXCEEDED:return P.DEADLINE_EXCEEDED;case De.RESOURCE_EXHAUSTED:return P.RESOURCE_EXHAUSTED;case De.INTERNAL:return P.INTERNAL;case De.UNAVAILABLE:return P.UNAVAILABLE;case De.UNAUTHENTICATED:return P.UNAUTHENTICATED;case De.INVALID_ARGUMENT:return P.INVALID_ARGUMENT;case De.NOT_FOUND:return P.NOT_FOUND;case De.ALREADY_EXISTS:return P.ALREADY_EXISTS;case De.PERMISSION_DENIED:return P.PERMISSION_DENIED;case De.FAILED_PRECONDITION:return P.FAILED_PRECONDITION;case De.ABORTED:return P.ABORTED;case De.OUT_OF_RANGE:return P.OUT_OF_RANGE;case De.UNIMPLEMENTED:return P.UNIMPLEMENTED;case De.DATA_LOSS:return P.DATA_LOSS;default:return Q(39323,{code:n})}}(ie=De||(De={}))[ie.OK=0]="OK",ie[ie.CANCELLED=1]="CANCELLED",ie[ie.UNKNOWN=2]="UNKNOWN",ie[ie.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",ie[ie.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",ie[ie.NOT_FOUND=5]="NOT_FOUND",ie[ie.ALREADY_EXISTS=6]="ALREADY_EXISTS",ie[ie.PERMISSION_DENIED=7]="PERMISSION_DENIED",ie[ie.UNAUTHENTICATED=16]="UNAUTHENTICATED",ie[ie.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",ie[ie.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",ie[ie.ABORTED=10]="ABORTED",ie[ie.OUT_OF_RANGE=11]="OUT_OF_RANGE",ie[ie.UNIMPLEMENTED=12]="UNIMPLEMENTED",ie[ie.INTERNAL=13]="INTERNAL",ie[ie.UNAVAILABLE=14]="UNAVAILABLE",ie[ie.DATA_LOSS=15]="DATA_LOSS";/**
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
 */const Dy=new yn([4294967295,4294967295],0);function Ih(n){const e=of().encode(n),t=new Xd;return t.update(e),new Uint8Array(t.digest())}function bh(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new yn([t,r],0),new yn([s,i],0)]}class Yl{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new Ss(`Invalid padding: ${t}`);if(r<0)throw new Ss(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new Ss(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new Ss(`Invalid padding when bitmap length is 0: ${t}`);this.fe=8*e.length-t,this.ge=yn.fromNumber(this.fe)}pe(e,t,r){let s=e.add(t.multiply(yn.fromNumber(r)));return s.compare(Dy)===1&&(s=new yn([s.getBits(0),s.getBits(1)],0)),s.modulo(this.ge).toNumber()}ye(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.fe===0)return!1;const t=Ih(e),[r,s]=bh(t);for(let i=0;i<this.hashCount;i++){const a=this.pe(r,s,i);if(!this.ye(a))return!1}return!0}static create(e,t,r){const s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),a=new Yl(i,s,t);return r.forEach(l=>a.insert(l)),a}insert(e){if(this.fe===0)return;const t=Ih(e),[r,s]=bh(t);for(let i=0;i<this.hashCount;i++){const a=this.pe(r,s,i);this.we(a)}}we(e){const t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}}class Ss extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
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
 */class Lo{constructor(e,t,r,s,i){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,t,r){const s=new Map;return s.set(e,ni.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new Lo(Y.min(),s,new Pe(ee),Yt(),re())}}class ni{constructor(e,t,r,s,i){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new ni(r,t,re(),re(),re())}}/**
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
 */class Gi{constructor(e,t,r,s){this.Se=e,this.removedTargetIds=t,this.key=r,this.be=s}}class $f{constructor(e,t){this.targetId=e,this.De=t}}class Bf{constructor(e,t,r=We.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=s}}class Ah{constructor(){this.ve=0,this.Ce=Sh(),this.Fe=We.EMPTY_BYTE_STRING,this.Me=!1,this.xe=!0}get current(){return this.Me}get resumeToken(){return this.Fe}get Oe(){return this.ve!==0}get Ne(){return this.xe}Be(e){e.approximateByteSize()>0&&(this.xe=!0,this.Fe=e)}Le(){let e=re(),t=re(),r=re();return this.Ce.forEach((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:t=t.add(s);break;case 1:r=r.add(s);break;default:Q(38017,{changeType:i})}}),new ni(this.Fe,this.Me,e,t,r)}ke(){this.xe=!1,this.Ce=Sh()}qe(e,t){this.xe=!0,this.Ce=this.Ce.insert(e,t)}Qe(e){this.xe=!0,this.Ce=this.Ce.remove(e)}$e(){this.ve+=1}Ue(){this.ve-=1,he(this.ve>=0,3241,{ve:this.ve})}Ke(){this.xe=!0,this.Me=!0}}class Oy{constructor(e){this.We=e,this.Ge=new Map,this.ze=Yt(),this.je=Di(),this.Je=Di(),this.He=new Pe(ee)}Ye(e){for(const t of e.Se)e.be&&e.be.isFoundDocument()?this.Ze(t,e.be):this.Xe(t,e.key,e.be);for(const t of e.removedTargetIds)this.Xe(t,e.key,e.be)}et(e){this.forEachTarget(e,t=>{const r=this.tt(t);switch(e.state){case 0:this.nt(t)&&r.Be(e.resumeToken);break;case 1:r.Ue(),r.Oe||r.ke(),r.Be(e.resumeToken);break;case 2:r.Ue(),r.Oe||this.removeTarget(t);break;case 3:this.nt(t)&&(r.Ke(),r.Be(e.resumeToken));break;case 4:this.nt(t)&&(this.rt(t),r.Be(e.resumeToken));break;default:Q(56790,{state:e.state})}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.Ge.forEach((r,s)=>{this.nt(s)&&t(s)})}it(e){const t=e.targetId,r=e.De.count,s=this.st(t);if(s){const i=s.target;if(hl(i))if(r===0){const a=new H(i.path);this.Xe(t,a,et.newNoDocument(a,Y.min()))}else he(r===1,20013,{expectedCount:r});else{const a=this.ot(t);if(a!==r){const l=this._t(e),u=l?this.ut(l,e,a):1;if(u!==0){this.rt(t);const h=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.He=this.He.insert(t,h)}}}}}_t(e){const t=e.De.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:i=0}=t;let a,l;try{a=Cn(r).toUint8Array()}catch(u){if(u instanceof hf)return Rn("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw u}try{l=new Yl(a,s,i)}catch(u){return Rn(u instanceof Ss?"BloomFilter error: ":"Applying bloom filter failed: ",u),null}return l.fe===0?null:l}ut(e,t,r){return t.De.count===r-this.ht(e,t.targetId)?0:2}ht(e,t){const r=this.We.getRemoteKeysForTarget(t);let s=0;return r.forEach(i=>{const a=this.We.lt(),l=`projects/${a.projectId}/databases/${a.database}/documents/${i.path.canonicalString()}`;e.mightContain(l)||(this.Xe(t,i,null),s++)}),s}Pt(e){const t=new Map;this.Ge.forEach((i,a)=>{const l=this.st(a);if(l){if(i.current&&hl(l.target)){const u=new H(l.target.path);this.Tt(u).has(a)||this.It(a,u)||this.Xe(a,u,et.newNoDocument(u,e))}i.Ne&&(t.set(a,i.Le()),i.ke())}});let r=re();this.Je.forEach((i,a)=>{let l=!0;a.forEachWhile(u=>{const h=this.st(u);return!h||h.purpose==="TargetPurposeLimboResolution"||(l=!1,!1)}),l&&(r=r.add(i))}),this.ze.forEach((i,a)=>a.setReadTime(e));const s=new Lo(e,t,this.He,this.ze,r);return this.ze=Yt(),this.je=Di(),this.Je=Di(),this.He=new Pe(ee),s}Ze(e,t){if(!this.nt(e))return;const r=this.It(e,t.key)?2:0;this.tt(e).qe(t.key,r),this.ze=this.ze.insert(t.key,t),this.je=this.je.insert(t.key,this.Tt(t.key).add(e)),this.Je=this.Je.insert(t.key,this.dt(t.key).add(e))}Xe(e,t,r){if(!this.nt(e))return;const s=this.tt(e);this.It(e,t)?s.qe(t,1):s.Qe(t),this.Je=this.Je.insert(t,this.dt(t).delete(e)),this.Je=this.Je.insert(t,this.dt(t).add(e)),r&&(this.ze=this.ze.insert(t,r))}removeTarget(e){this.Ge.delete(e)}ot(e){const t=this.tt(e).Le();return this.We.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}$e(e){this.tt(e).$e()}tt(e){let t=this.Ge.get(e);return t||(t=new Ah,this.Ge.set(e,t)),t}dt(e){let t=this.Je.get(e);return t||(t=new Fe(ee),this.Je=this.Je.insert(e,t)),t}Tt(e){let t=this.je.get(e);return t||(t=new Fe(ee),this.je=this.je.insert(e,t)),t}nt(e){const t=this.st(e)!==null;return t||U("WatchChangeAggregator","Detected inactive target",e),t}st(e){const t=this.Ge.get(e);return t&&t.Oe?null:this.We.Et(e)}rt(e){this.Ge.set(e,new Ah),this.We.getRemoteKeysForTarget(e).forEach(t=>{this.Xe(e,t,null)})}It(e,t){return this.We.getRemoteKeysForTarget(e).has(t)}}function Di(){return new Pe(H.comparator)}function Sh(){return new Pe(H.comparator)}const My={asc:"ASCENDING",desc:"DESCENDING"},Ly={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},Fy={and:"AND",or:"OR"};class Uy{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function pl(n,e){return n.useProto3Json||Co(e)?e:{value:e}}function ho(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function qf(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function $y(n,e){return ho(n,e.toTimestamp())}function Ot(n){return he(!!n,49232),Y.fromTimestamp(function(t){const r=Pn(t);return new Ie(r.seconds,r.nanos)}(n))}function Zl(n,e){return ml(n,e).canonicalString()}function ml(n,e){const t=function(s){return new Ee(["projects",s.projectId,"databases",s.database])}(n).child("documents");return e===void 0?t:t.child(e)}function jf(n){const e=Ee.fromString(n);return he(Kf(e),10190,{key:e.toString()}),e}function gl(n,e){return Zl(n.databaseId,e.path)}function La(n,e){const t=jf(e);if(t.get(1)!==n.databaseId.projectId)throw new F(P.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new F(P.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new H(Hf(t))}function zf(n,e){return Zl(n.databaseId,e)}function By(n){const e=jf(n);return e.length===4?Ee.emptyPath():Hf(e)}function _l(n){return new Ee(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function Hf(n){return he(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function Rh(n,e,t){return{name:gl(n,e),fields:t.value.mapValue.fields}}function qy(n,e){let t;if("targetChange"in e){e.targetChange;const r=function(h){return h==="NO_CHANGE"?0:h==="ADD"?1:h==="REMOVE"?2:h==="CURRENT"?3:h==="RESET"?4:Q(39313,{state:h})}(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=function(h,f){return h.useProto3Json?(he(f===void 0||typeof f=="string",58123),We.fromBase64String(f||"")):(he(f===void 0||f instanceof Buffer||f instanceof Uint8Array,16193),We.fromUint8Array(f||new Uint8Array))}(n,e.targetChange.resumeToken),a=e.targetChange.cause,l=a&&function(h){const f=h.code===void 0?P.UNKNOWN:Uf(h.code);return new F(f,h.message||"")}(a);t=new Bf(r,s,i,l||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const s=La(n,r.document.name),i=Ot(r.document.updateTime),a=r.document.createTime?Ot(r.document.createTime):Y.min(),l=new ut({mapValue:{fields:r.document.fields}}),u=et.newFoundDocument(s,i,a,l),h=r.targetIds||[],f=r.removedTargetIds||[];t=new Gi(h,f,u.key,u)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const s=La(n,r.document),i=r.readTime?Ot(r.readTime):Y.min(),a=et.newNoDocument(s,i),l=r.removedTargetIds||[];t=new Gi([],l,a.key,a)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const s=La(n,r.document),i=r.removedTargetIds||[];t=new Gi([],i,s,null)}else{if(!("filter"in e))return Q(11601,{At:e});{e.filter;const r=e.filter;r.targetId;const{count:s=0,unchangedNames:i}=r,a=new Ny(s,i),l=r.targetId;t=new $f(l,a)}}return t}function jy(n,e){let t;if(e instanceof ti)t={update:Rh(n,e.key,e.value)};else if(e instanceof Ff)t={delete:gl(n,e.key)};else if(e instanceof Mn)t={update:Rh(n,e.key,e.data),updateMask:Yy(e.fieldMask)};else{if(!(e instanceof Py))return Q(16599,{Rt:e.type});t={verify:gl(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(r=>function(i,a){const l=a.transform;if(l instanceof zs)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(l instanceof Hs)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:l.elements}};if(l instanceof Gs)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:l.elements}};if(l instanceof uo)return{fieldPath:a.field.canonicalString(),increment:l.Ee};throw Q(20930,{transform:a.transform})}(0,r))),e.precondition.isNone||(t.currentDocument=function(s,i){return i.updateTime!==void 0?{updateTime:$y(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:Q(27497)}(n,e.precondition)),t}function zy(n,e){return n&&n.length>0?(he(e!==void 0,14353),n.map(t=>function(s,i){let a=s.updateTime?Ot(s.updateTime):Ot(i);return a.isEqual(Y.min())&&(a=Ot(i)),new Sy(a,s.transformResults||[])}(t,e))):[]}function Hy(n,e){return{documents:[zf(n,e.path)]}}function Gy(n,e){const t={structuredQuery:{}},r=e.path;let s;e.collectionGroup!==null?(s=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=zf(n,s);const i=function(h){if(h.length!==0)return Wf(At.create(h,"and"))}(e.filters);i&&(t.structuredQuery.where=i);const a=function(h){if(h.length!==0)return h.map(f=>function(g){return{field:Ar(g.field),direction:Qy(g.dir)}}(f))}(e.orderBy);a&&(t.structuredQuery.orderBy=a);const l=pl(n,e.limit);return l!==null&&(t.structuredQuery.limit=l),e.startAt&&(t.structuredQuery.startAt=function(h){return{before:h.inclusive,values:h.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(h){return{before:!h.inclusive,values:h.position}}(e.endAt)),{Vt:t,parent:s}}function Wy(n){let e=By(n.parent);const t=n.structuredQuery,r=t.from?t.from.length:0;let s=null;if(r>0){he(r===1,65062);const f=t.from[0];f.allDescendants?s=f.collectionId:e=e.child(f.collectionId)}let i=[];t.where&&(i=function(p){const g=Gf(p);return g instanceof At&&wf(g)?g.getFilters():[g]}(t.where));let a=[];t.orderBy&&(a=function(p){return p.map(g=>function(k){return new js(Sr(k.field),function(N){switch(N){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(k.direction))}(g))}(t.orderBy));let l=null;t.limit&&(l=function(p){let g;return g=typeof p=="object"?p.value:p,Co(g)?null:g}(t.limit));let u=null;t.startAt&&(u=function(p){const g=!!p.before,S=p.values||[];return new co(S,g)}(t.startAt));let h=null;return t.endAt&&(h=function(p){const g=!p.before,S=p.values||[];return new co(S,g)}(t.endAt)),dy(e,s,a,i,l,"F",u,h)}function Ky(n,e){const t=function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return Q(28987,{purpose:s})}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function Gf(n){return n.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":const r=Sr(t.unaryFilter.field);return Oe.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=Sr(t.unaryFilter.field);return Oe.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=Sr(t.unaryFilter.field);return Oe.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=Sr(t.unaryFilter.field);return Oe.create(a,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return Q(61313);default:return Q(60726)}}(n):n.fieldFilter!==void 0?function(t){return Oe.create(Sr(t.fieldFilter.field),function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return Q(58110);default:return Q(50506)}}(t.fieldFilter.op),t.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(t){return At.create(t.compositeFilter.filters.map(r=>Gf(r)),function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return Q(1026)}}(t.compositeFilter.op))}(n):Q(30097,{filter:n})}function Qy(n){return My[n]}function Jy(n){return Ly[n]}function Xy(n){return Fy[n]}function Ar(n){return{fieldPath:n.canonicalString()}}function Sr(n){return He.fromServerFormat(n.fieldPath)}function Wf(n){return n instanceof Oe?function(t){if(t.op==="=="){if(ph(t.value))return{unaryFilter:{field:Ar(t.field),op:"IS_NAN"}};if(fh(t.value))return{unaryFilter:{field:Ar(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(ph(t.value))return{unaryFilter:{field:Ar(t.field),op:"IS_NOT_NAN"}};if(fh(t.value))return{unaryFilter:{field:Ar(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Ar(t.field),op:Jy(t.op),value:t.value}}}(n):n instanceof At?function(t){const r=t.getFilters().map(s=>Wf(s));return r.length===1?r[0]:{compositeFilter:{op:Xy(t.op),filters:r}}}(n):Q(54877,{filter:n})}function Yy(n){const e=[];return n.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function Kf(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
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
 */class fn{constructor(e,t,r,s,i=Y.min(),a=Y.min(),l=We.EMPTY_BYTE_STRING,u=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=l,this.expectedCount=u}withSequenceNumber(e){return new fn(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new fn(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new fn(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new fn(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
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
 */class Zy{constructor(e){this.gt=e}}function ev(n){const e=Wy({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?fl(e,e.limit,"L"):e}/**
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
 */class tv{constructor(){this.Dn=new nv}addToCollectionParentIndex(e,t){return this.Dn.add(t),C.resolve()}getCollectionParents(e,t){return C.resolve(this.Dn.getEntries(t))}addFieldIndex(e,t){return C.resolve()}deleteFieldIndex(e,t){return C.resolve()}deleteAllFieldIndexes(e){return C.resolve()}createTargetIndexes(e,t){return C.resolve()}getDocumentsMatchingTarget(e,t){return C.resolve(null)}getIndexType(e,t){return C.resolve(0)}getFieldIndexes(e,t){return C.resolve([])}getNextCollectionGroupToUpdate(e){return C.resolve(null)}getMinOffset(e,t){return C.resolve(kn.min())}getMinOffsetFromCollectionGroup(e,t){return C.resolve(kn.min())}updateCollectionGroup(e,t,r){return C.resolve()}updateIndexEntries(e,t){return C.resolve()}}class nv{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t]||new Fe(Ee.comparator),i=!s.has(r);return this.index[t]=s.add(r),i}has(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t];return s&&s.has(r)}getEntries(e){return(this.index[e]||new Fe(Ee.comparator)).toArray()}}/**
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
 */const kh={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},Qf=41943040;class lt{static withCacheSize(e){return new lt(e,lt.DEFAULT_COLLECTION_PERCENTILE,lt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}}/**
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
 */lt.DEFAULT_COLLECTION_PERCENTILE=10,lt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,lt.DEFAULT=new lt(Qf,lt.DEFAULT_COLLECTION_PERCENTILE,lt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),lt.DISABLED=new lt(-1,0,0);/**
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
 */class zr{constructor(e){this._r=e}next(){return this._r+=2,this._r}static ar(){return new zr(0)}static ur(){return new zr(-1)}}/**
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
 */const Ph="LruGarbageCollector",rv=1048576;function Ch([n,e],[t,r]){const s=ee(n,t);return s===0?ee(e,r):s}class sv{constructor(e){this.Tr=e,this.buffer=new Fe(Ch),this.Ir=0}dr(){return++this.Ir}Er(e){const t=[e,this.dr()];if(this.buffer.size<this.Tr)this.buffer=this.buffer.add(t);else{const r=this.buffer.last();Ch(t,r)<0&&(this.buffer=this.buffer.delete(r).add(t))}}get maxValue(){return this.buffer.last()[0]}}class iv{constructor(e,t,r){this.garbageCollector=e,this.asyncQueue=t,this.localStore=r,this.Ar=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Rr(6e4)}stop(){this.Ar&&(this.Ar.cancel(),this.Ar=null)}get started(){return this.Ar!==null}Rr(e){U(Ph,`Garbage collection scheduled in ${e}ms`),this.Ar=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Ar=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){es(t)?U(Ph,"Ignoring IndexedDB error during garbage collection: ",t):await Zr(t)}await this.Rr(3e5)})}}class ov{constructor(e,t){this.Vr=e,this.params=t}calculateTargetCount(e,t){return this.Vr.mr(e).next(r=>Math.floor(t/100*r))}nthSequenceNumber(e,t){if(t===0)return C.resolve(Po.ue);const r=new sv(t);return this.Vr.forEachTarget(e,s=>r.Er(s.sequenceNumber)).next(()=>this.Vr.gr(e,s=>r.Er(s))).next(()=>r.maxValue)}removeTargets(e,t,r){return this.Vr.removeTargets(e,t,r)}removeOrphanedDocuments(e,t){return this.Vr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(U("LruGarbageCollector","Garbage collection skipped; disabled"),C.resolve(kh)):this.getCacheSize(e).next(r=>r<this.params.cacheSizeCollectionThreshold?(U("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),kh):this.pr(e,t))}getCacheSize(e){return this.Vr.getCacheSize(e)}pr(e,t){let r,s,i,a,l,u,h;const f=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(p=>(p>this.params.maximumSequenceNumbersToCollect?(U("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${p}`),s=this.params.maximumSequenceNumbersToCollect):s=p,a=Date.now(),this.nthSequenceNumber(e,s))).next(p=>(r=p,l=Date.now(),this.removeTargets(e,r,t))).next(p=>(i=p,u=Date.now(),this.removeOrphanedDocuments(e,r))).next(p=>(h=Date.now(),Ir()<=ne.DEBUG&&U("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-f}ms
	Determined least recently used ${s} in `+(l-a)+`ms
	Removed ${i} targets in `+(u-l)+`ms
	Removed ${p} documents in `+(h-u)+`ms
Total Duration: ${h-f}ms`),C.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:p})))}}function av(n,e){return new ov(n,e)}/**
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
 */class lv{constructor(){this.changes=new ur(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,et.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return r!==void 0?C.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
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
 */class cv{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
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
 */class uv{constructor(e,t,r,s){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=s}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next(s=>(r=s,this.remoteDocumentCache.getEntry(e,t))).next(s=>(r!==null&&xs(r.mutation,s,dt.empty(),Ie.now()),s))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.getLocalViewOfDocuments(e,r,re()).next(()=>r))}getLocalViewOfDocuments(e,t,r=re()){const s=Xn();return this.populateOverlays(e,s,t).next(()=>this.computeViews(e,t,s,r).next(i=>{let a=As();return i.forEach((l,u)=>{a=a.insert(l,u.overlayedDocument)}),a}))}getOverlayedDocuments(e,t){const r=Xn();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,re()))}populateOverlays(e,t,r){const s=[];return r.forEach(i=>{t.has(i)||s.push(i)}),this.documentOverlayCache.getOverlays(e,s).next(i=>{i.forEach((a,l)=>{t.set(a,l)})})}computeViews(e,t,r,s){let i=Yt();const a=Ns(),l=function(){return Ns()}();return t.forEach((u,h)=>{const f=r.get(h.key);s.has(h.key)&&(f===void 0||f.mutation instanceof Mn)?i=i.insert(h.key,h):f!==void 0?(a.set(h.key,f.mutation.getFieldMask()),xs(f.mutation,h,f.mutation.getFieldMask(),Ie.now())):a.set(h.key,dt.empty())}),this.recalculateAndSaveOverlays(e,i).next(u=>(u.forEach((h,f)=>a.set(h,f)),t.forEach((h,f)=>{var p;return l.set(h,new cv(f,(p=a.get(h))!==null&&p!==void 0?p:null))}),l))}recalculateAndSaveOverlays(e,t){const r=Ns();let s=new Pe((a,l)=>a-l),i=re();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(a=>{for(const l of a)l.keys().forEach(u=>{const h=t.get(u);if(h===null)return;let f=r.get(u)||dt.empty();f=l.applyToLocalView(h,f),r.set(u,f);const p=(s.get(l.batchId)||re()).add(u);s=s.insert(l.batchId,p)})}).next(()=>{const a=[],l=s.getReverseIterator();for(;l.hasNext();){const u=l.getNext(),h=u.key,f=u.value,p=Cf();f.forEach(g=>{if(!i.has(g)){const S=Mf(t.get(g),r.get(g));S!==null&&p.set(g,S),i=i.add(g)}}),a.push(this.documentOverlayCache.saveOverlays(e,h,p))}return C.waitFor(a)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,t,r,s){return function(a){return H.isDocumentKey(a.path)&&a.collectionGroup===null&&a.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):Af(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,s):this.getDocumentsMatchingCollectionQuery(e,t,r,s)}getNextDocuments(e,t,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,s).next(i=>{const a=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,s-i.size):C.resolve(Xn());let l=Us,u=i;return a.next(h=>C.forEach(h,(f,p)=>(l<p.largestBatchId&&(l=p.largestBatchId),i.get(f)?C.resolve():this.remoteDocumentCache.getEntry(e,f).next(g=>{u=u.insert(f,g)}))).next(()=>this.populateOverlays(e,h,i)).next(()=>this.computeViews(e,u,h,re())).next(f=>({batchId:l,changes:Pf(f)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new H(t)).next(r=>{let s=As();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s})}getDocumentsMatchingCollectionGroupQuery(e,t,r,s){const i=t.collectionGroup;let a=As();return this.indexManager.getCollectionParents(e,i).next(l=>C.forEach(l,u=>{const h=function(p,g){return new ts(g,null,p.explicitOrderBy.slice(),p.filters.slice(),p.limit,p.limitType,p.startAt,p.endAt)}(t,u.child(i));return this.getDocumentsMatchingCollectionQuery(e,h,r,s).next(f=>{f.forEach((p,g)=>{a=a.insert(p,g)})})}).next(()=>a))}getDocumentsMatchingCollectionQuery(e,t,r,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next(a=>(i=a,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,i,s))).next(a=>{i.forEach((u,h)=>{const f=h.getKey();a.get(f)===null&&(a=a.insert(f,et.newInvalidDocument(f)))});let l=As();return a.forEach((u,h)=>{const f=i.get(u);f!==void 0&&xs(f.mutation,h,dt.empty(),Ie.now()),Do(t,h)&&(l=l.insert(u,h))}),l})}}/**
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
 */class hv{constructor(e){this.serializer=e,this.Br=new Map,this.Lr=new Map}getBundleMetadata(e,t){return C.resolve(this.Br.get(t))}saveBundleMetadata(e,t){return this.Br.set(t.id,function(s){return{id:s.id,version:s.version,createTime:Ot(s.createTime)}}(t)),C.resolve()}getNamedQuery(e,t){return C.resolve(this.Lr.get(t))}saveNamedQuery(e,t){return this.Lr.set(t.name,function(s){return{name:s.name,query:ev(s.bundledQuery),readTime:Ot(s.readTime)}}(t)),C.resolve()}}/**
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
 */class dv{constructor(){this.overlays=new Pe(H.comparator),this.kr=new Map}getOverlay(e,t){return C.resolve(this.overlays.get(t))}getOverlays(e,t){const r=Xn();return C.forEach(t,s=>this.getOverlay(e,s).next(i=>{i!==null&&r.set(s,i)})).next(()=>r)}saveOverlays(e,t,r){return r.forEach((s,i)=>{this.wt(e,t,i)}),C.resolve()}removeOverlaysForBatchId(e,t,r){const s=this.kr.get(r);return s!==void 0&&(s.forEach(i=>this.overlays=this.overlays.remove(i)),this.kr.delete(r)),C.resolve()}getOverlaysForCollection(e,t,r){const s=Xn(),i=t.length+1,a=new H(t.child("")),l=this.overlays.getIteratorFrom(a);for(;l.hasNext();){const u=l.getNext().value,h=u.getKey();if(!t.isPrefixOf(h.path))break;h.path.length===i&&u.largestBatchId>r&&s.set(u.getKey(),u)}return C.resolve(s)}getOverlaysForCollectionGroup(e,t,r,s){let i=new Pe((h,f)=>h-f);const a=this.overlays.getIterator();for(;a.hasNext();){const h=a.getNext().value;if(h.getKey().getCollectionGroup()===t&&h.largestBatchId>r){let f=i.get(h.largestBatchId);f===null&&(f=Xn(),i=i.insert(h.largestBatchId,f)),f.set(h.getKey(),h)}}const l=Xn(),u=i.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach((h,f)=>l.set(h,f)),!(l.size()>=s)););return C.resolve(l)}wt(e,t,r){const s=this.overlays.get(r.key);if(s!==null){const a=this.kr.get(s.largestBatchId).delete(r.key);this.kr.set(s.largestBatchId,a)}this.overlays=this.overlays.insert(r.key,new Vy(t,r));let i=this.kr.get(t);i===void 0&&(i=re(),this.kr.set(t,i)),this.kr.set(t,i.add(r.key))}}/**
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
 */class fv{constructor(){this.sessionToken=We.EMPTY_BYTE_STRING}getSessionToken(e){return C.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,C.resolve()}}/**
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
 */class ec{constructor(){this.qr=new Fe(Be.Qr),this.$r=new Fe(Be.Ur)}isEmpty(){return this.qr.isEmpty()}addReference(e,t){const r=new Be(e,t);this.qr=this.qr.add(r),this.$r=this.$r.add(r)}Kr(e,t){e.forEach(r=>this.addReference(r,t))}removeReference(e,t){this.Wr(new Be(e,t))}Gr(e,t){e.forEach(r=>this.removeReference(r,t))}zr(e){const t=new H(new Ee([])),r=new Be(t,e),s=new Be(t,e+1),i=[];return this.$r.forEachInRange([r,s],a=>{this.Wr(a),i.push(a.key)}),i}jr(){this.qr.forEach(e=>this.Wr(e))}Wr(e){this.qr=this.qr.delete(e),this.$r=this.$r.delete(e)}Jr(e){const t=new H(new Ee([])),r=new Be(t,e),s=new Be(t,e+1);let i=re();return this.$r.forEachInRange([r,s],a=>{i=i.add(a.key)}),i}containsKey(e){const t=new Be(e,0),r=this.qr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}}class Be{constructor(e,t){this.key=e,this.Hr=t}static Qr(e,t){return H.comparator(e.key,t.key)||ee(e.Hr,t.Hr)}static Ur(e,t){return ee(e.Hr,t.Hr)||H.comparator(e.key,t.key)}}/**
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
 */class pv{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.er=1,this.Yr=new Fe(Be.Qr)}checkEmpty(e){return C.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,s){const i=this.er;this.er++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new Cy(i,t,r,s);this.mutationQueue.push(a);for(const l of s)this.Yr=this.Yr.add(new Be(l.key,i)),this.indexManager.addToCollectionParentIndex(e,l.key.path.popLast());return C.resolve(a)}lookupMutationBatch(e,t){return C.resolve(this.Zr(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,s=this.Xr(r),i=s<0?0:s;return C.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return C.resolve(this.mutationQueue.length===0?Hl:this.er-1)}getAllMutationBatches(e){return C.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new Be(t,0),s=new Be(t,Number.POSITIVE_INFINITY),i=[];return this.Yr.forEachInRange([r,s],a=>{const l=this.Zr(a.Hr);i.push(l)}),C.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new Fe(ee);return t.forEach(s=>{const i=new Be(s,0),a=new Be(s,Number.POSITIVE_INFINITY);this.Yr.forEachInRange([i,a],l=>{r=r.add(l.Hr)})}),C.resolve(this.ei(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,s=r.length+1;let i=r;H.isDocumentKey(i)||(i=i.child(""));const a=new Be(new H(i),0);let l=new Fe(ee);return this.Yr.forEachWhile(u=>{const h=u.key.path;return!!r.isPrefixOf(h)&&(h.length===s&&(l=l.add(u.Hr)),!0)},a),C.resolve(this.ei(l))}ei(e){const t=[];return e.forEach(r=>{const s=this.Zr(r);s!==null&&t.push(s)}),t}removeMutationBatch(e,t){he(this.ti(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.Yr;return C.forEach(t.mutations,s=>{const i=new Be(s.key,t.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)}).next(()=>{this.Yr=r})}rr(e){}containsKey(e,t){const r=new Be(t,0),s=this.Yr.firstAfterOrEqual(r);return C.resolve(t.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,C.resolve()}ti(e,t){return this.Xr(e)}Xr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Zr(e){const t=this.Xr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
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
 */class mv{constructor(e){this.ni=e,this.docs=function(){return new Pe(H.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,s=this.docs.get(r),i=s?s.size:0,a=this.ni(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:a}),this.size+=a-i,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return C.resolve(r?r.document.mutableCopy():et.newInvalidDocument(t))}getEntries(e,t){let r=Yt();return t.forEach(s=>{const i=this.docs.get(s);r=r.insert(s,i?i.document.mutableCopy():et.newInvalidDocument(s))}),C.resolve(r)}getDocumentsMatchingQuery(e,t,r,s){let i=Yt();const a=t.path,l=new H(a.child("__id-9223372036854775808__")),u=this.docs.getIteratorFrom(l);for(;u.hasNext();){const{key:h,value:{document:f}}=u.getNext();if(!a.isPrefixOf(h.path))break;h.path.length>a.length+1||z0(j0(f),r)<=0||(s.has(f.key)||Do(t,f))&&(i=i.insert(f.key,f.mutableCopy()))}return C.resolve(i)}getAllFromCollectionGroup(e,t,r,s){Q(9500)}ri(e,t){return C.forEach(this.docs,r=>t(r))}newChangeBuffer(e){return new gv(this)}getSize(e){return C.resolve(this.size)}}class gv extends lv{constructor(e){super(),this.Or=e}applyChanges(e){const t=[];return this.changes.forEach((r,s)=>{s.isValidDocument()?t.push(this.Or.addEntry(e,s)):this.Or.removeEntry(r)}),C.waitFor(t)}getFromCache(e,t){return this.Or.getEntry(e,t)}getAllFromCache(e,t){return this.Or.getEntries(e,t)}}/**
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
 */class _v{constructor(e){this.persistence=e,this.ii=new ur(t=>Kl(t),Ql),this.lastRemoteSnapshotVersion=Y.min(),this.highestTargetId=0,this.si=0,this.oi=new ec,this.targetCount=0,this._i=zr.ar()}forEachTarget(e,t){return this.ii.forEach((r,s)=>t(s)),C.resolve()}getLastRemoteSnapshotVersion(e){return C.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return C.resolve(this.si)}allocateTargetId(e){return this.highestTargetId=this._i.next(),C.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.si&&(this.si=t),C.resolve()}hr(e){this.ii.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this._i=new zr(t),this.highestTargetId=t),e.sequenceNumber>this.si&&(this.si=e.sequenceNumber)}addTargetData(e,t){return this.hr(t),this.targetCount+=1,C.resolve()}updateTargetData(e,t){return this.hr(t),C.resolve()}removeTargetData(e,t){return this.ii.delete(t.target),this.oi.zr(t.targetId),this.targetCount-=1,C.resolve()}removeTargets(e,t,r){let s=0;const i=[];return this.ii.forEach((a,l)=>{l.sequenceNumber<=t&&r.get(l.targetId)===null&&(this.ii.delete(a),i.push(this.removeMatchingKeysForTargetId(e,l.targetId)),s++)}),C.waitFor(i).next(()=>s)}getTargetCount(e){return C.resolve(this.targetCount)}getTargetData(e,t){const r=this.ii.get(t)||null;return C.resolve(r)}addMatchingKeys(e,t,r){return this.oi.Kr(t,r),C.resolve()}removeMatchingKeys(e,t,r){this.oi.Gr(t,r);const s=this.persistence.referenceDelegate,i=[];return s&&t.forEach(a=>{i.push(s.markPotentiallyOrphaned(e,a))}),C.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this.oi.zr(t),C.resolve()}getMatchingKeysForTargetId(e,t){const r=this.oi.Jr(t);return C.resolve(r)}containsKey(e,t){return C.resolve(this.oi.containsKey(t))}}/**
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
 */class Jf{constructor(e,t){this.ai={},this.overlays={},this.ui=new Po(0),this.ci=!1,this.ci=!0,this.li=new fv,this.referenceDelegate=e(this),this.hi=new _v(this),this.indexManager=new tv,this.remoteDocumentCache=function(s){return new mv(s)}(r=>this.referenceDelegate.Pi(r)),this.serializer=new Zy(t),this.Ti=new hv(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ci=!1,Promise.resolve()}get started(){return this.ci}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new dv,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.ai[e.toKey()];return r||(r=new pv(t,this.referenceDelegate),this.ai[e.toKey()]=r),r}getGlobalsCache(){return this.li}getTargetCache(){return this.hi}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ti}runTransaction(e,t,r){U("MemoryPersistence","Starting transaction:",e);const s=new yv(this.ui.next());return this.referenceDelegate.Ii(),r(s).next(i=>this.referenceDelegate.di(s).next(()=>i)).toPromise().then(i=>(s.raiseOnCommittedEvent(),i))}Ei(e,t){return C.or(Object.values(this.ai).map(r=>()=>r.containsKey(e,t)))}}class yv extends G0{constructor(e){super(),this.currentSequenceNumber=e}}class tc{constructor(e){this.persistence=e,this.Ai=new ec,this.Ri=null}static Vi(e){return new tc(e)}get mi(){if(this.Ri)return this.Ri;throw Q(60996)}addReference(e,t,r){return this.Ai.addReference(r,t),this.mi.delete(r.toString()),C.resolve()}removeReference(e,t,r){return this.Ai.removeReference(r,t),this.mi.add(r.toString()),C.resolve()}markPotentiallyOrphaned(e,t){return this.mi.add(t.toString()),C.resolve()}removeTarget(e,t){this.Ai.zr(t.targetId).forEach(s=>this.mi.add(s.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next(s=>{s.forEach(i=>this.mi.add(i.toString()))}).next(()=>r.removeTargetData(e,t))}Ii(){this.Ri=new Set}di(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return C.forEach(this.mi,r=>{const s=H.fromPath(r);return this.fi(e,s).next(i=>{i||t.removeEntry(s,Y.min())})}).next(()=>(this.Ri=null,t.apply(e)))}updateLimboDocument(e,t){return this.fi(e,t).next(r=>{r?this.mi.delete(t.toString()):this.mi.add(t.toString())})}Pi(e){return 0}fi(e,t){return C.or([()=>C.resolve(this.Ai.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ei(e,t)])}}class fo{constructor(e,t){this.persistence=e,this.gi=new ur(r=>Q0(r.path),(r,s)=>r.isEqual(s)),this.garbageCollector=av(this,t)}static Vi(e,t){return new fo(e,t)}Ii(){}di(e){return C.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}mr(e){const t=this.yr(e);return this.persistence.getTargetCache().getTargetCount(e).next(r=>t.next(s=>r+s))}yr(e){let t=0;return this.gr(e,r=>{t++}).next(()=>t)}gr(e,t){return C.forEach(this.gi,(r,s)=>this.Sr(e,r,s).next(i=>i?C.resolve():t(s)))}removeTargets(e,t,r){return this.persistence.getTargetCache().removeTargets(e,t,r)}removeOrphanedDocuments(e,t){let r=0;const s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.ri(e,a=>this.Sr(e,a,t).next(l=>{l||(r++,i.removeEntry(a,Y.min()))})).next(()=>i.apply(e)).next(()=>r)}markPotentiallyOrphaned(e,t){return this.gi.set(t,e.currentSequenceNumber),C.resolve()}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,t,r){return this.gi.set(r,e.currentSequenceNumber),C.resolve()}removeReference(e,t,r){return this.gi.set(r,e.currentSequenceNumber),C.resolve()}updateLimboDocument(e,t){return this.gi.set(t,e.currentSequenceNumber),C.resolve()}Pi(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=ji(e.data.value)),t}Sr(e,t,r){return C.or([()=>this.persistence.Ei(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const s=this.gi.get(t);return C.resolve(s!==void 0&&s>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
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
 */class nc{constructor(e,t,r,s){this.targetId=e,this.fromCache=t,this.Is=r,this.ds=s}static Es(e,t){let r=re(),s=re();for(const i of t.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new nc(e,t.fromCache,r,s)}}/**
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
 */class vv{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
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
 */class Ev{constructor(){this.As=!1,this.Rs=!1,this.Vs=100,this.fs=function(){return p_()?8:W0(tt())>0?6:4}()}initialize(e,t){this.gs=e,this.indexManager=t,this.As=!0}getDocumentsMatchingQuery(e,t,r,s){const i={result:null};return this.ps(e,t).next(a=>{i.result=a}).next(()=>{if(!i.result)return this.ys(e,t,s,r).next(a=>{i.result=a})}).next(()=>{if(i.result)return;const a=new vv;return this.ws(e,t,a).next(l=>{if(i.result=l,this.Rs)return this.Ss(e,t,a,l.size)})}).next(()=>i.result)}Ss(e,t,r,s){return r.documentReadCount<this.Vs?(Ir()<=ne.DEBUG&&U("QueryEngine","SDK will not create cache indexes for query:",br(t),"since it only creates cache indexes for collection contains","more than or equal to",this.Vs,"documents"),C.resolve()):(Ir()<=ne.DEBUG&&U("QueryEngine","Query:",br(t),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.fs*s?(Ir()<=ne.DEBUG&&U("QueryEngine","The SDK decides to create cache indexes for query:",br(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,Dt(t))):C.resolve())}ps(e,t){if(yh(t))return C.resolve(null);let r=Dt(t);return this.indexManager.getIndexType(e,r).next(s=>s===0?null:(t.limit!==null&&s===1&&(t=fl(t,null,"F"),r=Dt(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next(i=>{const a=re(...i);return this.gs.getDocuments(e,a).next(l=>this.indexManager.getMinOffset(e,r).next(u=>{const h=this.bs(t,l);return this.Ds(t,h,a,u.readTime)?this.ps(e,fl(t,null,"F")):this.vs(e,h,t,u)}))})))}ys(e,t,r,s){return yh(t)||s.isEqual(Y.min())?C.resolve(null):this.gs.getDocuments(e,r).next(i=>{const a=this.bs(t,i);return this.Ds(t,a,r,s)?C.resolve(null):(Ir()<=ne.DEBUG&&U("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),br(t)),this.vs(e,a,t,q0(s,Us)).next(l=>l))})}bs(e,t){let r=new Fe(Rf(e));return t.forEach((s,i)=>{Do(e,i)&&(r=r.add(i))}),r}Ds(e,t,r,s){if(e.limit===null)return!1;if(r.size!==t.size)return!0;const i=e.limitType==="F"?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}ws(e,t,r){return Ir()<=ne.DEBUG&&U("QueryEngine","Using full collection scan to execute query:",br(t)),this.gs.getDocumentsMatchingQuery(e,t,kn.min(),r)}vs(e,t,r,s){return this.gs.getDocumentsMatchingQuery(e,r,s).next(i=>(t.forEach(a=>{i=i.insert(a.key,a)}),i))}}/**
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
 */const rc="LocalStore",wv=3e8;class Tv{constructor(e,t,r,s){this.persistence=e,this.Cs=t,this.serializer=s,this.Fs=new Pe(ee),this.Ms=new ur(i=>Kl(i),Ql),this.xs=new Map,this.Os=e.getRemoteDocumentCache(),this.hi=e.getTargetCache(),this.Ti=e.getBundleCache(),this.Ns(r)}Ns(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new uv(this.Os,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Os.setIndexManager(this.indexManager),this.Cs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.Fs))}}function Iv(n,e,t,r){return new Tv(n,e,t,r)}async function Xf(n,e){const t=Z(n);return await t.persistence.runTransaction("Handle user change","readonly",r=>{let s;return t.mutationQueue.getAllMutationBatches(r).next(i=>(s=i,t.Ns(e),t.mutationQueue.getAllMutationBatches(r))).next(i=>{const a=[],l=[];let u=re();for(const h of s){a.push(h.batchId);for(const f of h.mutations)u=u.add(f.key)}for(const h of i){l.push(h.batchId);for(const f of h.mutations)u=u.add(f.key)}return t.localDocuments.getDocuments(r,u).next(h=>({Bs:h,removedBatchIds:a,addedBatchIds:l}))})})}function bv(n,e){const t=Z(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const s=e.batch.keys(),i=t.Os.newChangeBuffer({trackRemovals:!0});return function(l,u,h,f){const p=h.batch,g=p.keys();let S=C.resolve();return g.forEach(k=>{S=S.next(()=>f.getEntry(u,k)).next(V=>{const N=h.docVersions.get(k);he(N!==null,48541),V.version.compareTo(N)<0&&(p.applyToRemoteDocument(V,h),V.isValidDocument()&&(V.setReadTime(h.commitVersion),f.addEntry(V)))})}),S.next(()=>l.mutationQueue.removeMutationBatch(u,p))}(t,r,e,i).next(()=>i.apply(r)).next(()=>t.mutationQueue.performConsistencyCheck(r)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(r,s,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(l){let u=re();for(let h=0;h<l.mutationResults.length;++h)l.mutationResults[h].transformResults.length>0&&(u=u.add(l.batch.mutations[h].key));return u}(e))).next(()=>t.localDocuments.getDocuments(r,s))})}function Yf(n){const e=Z(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.hi.getLastRemoteSnapshotVersion(t))}function Av(n,e){const t=Z(n),r=e.snapshotVersion;let s=t.Fs;return t.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{const a=t.Os.newChangeBuffer({trackRemovals:!0});s=t.Fs;const l=[];e.targetChanges.forEach((f,p)=>{const g=s.get(p);if(!g)return;l.push(t.hi.removeMatchingKeys(i,f.removedDocuments,p).next(()=>t.hi.addMatchingKeys(i,f.addedDocuments,p)));let S=g.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(p)!==null?S=S.withResumeToken(We.EMPTY_BYTE_STRING,Y.min()).withLastLimboFreeSnapshotVersion(Y.min()):f.resumeToken.approximateByteSize()>0&&(S=S.withResumeToken(f.resumeToken,r)),s=s.insert(p,S),function(V,N,W){return V.resumeToken.approximateByteSize()===0||N.snapshotVersion.toMicroseconds()-V.snapshotVersion.toMicroseconds()>=wv?!0:W.addedDocuments.size+W.modifiedDocuments.size+W.removedDocuments.size>0}(g,S,f)&&l.push(t.hi.updateTargetData(i,S))});let u=Yt(),h=re();if(e.documentUpdates.forEach(f=>{e.resolvedLimboDocuments.has(f)&&l.push(t.persistence.referenceDelegate.updateLimboDocument(i,f))}),l.push(Sv(i,a,e.documentUpdates).next(f=>{u=f.Ls,h=f.ks})),!r.isEqual(Y.min())){const f=t.hi.getLastRemoteSnapshotVersion(i).next(p=>t.hi.setTargetsMetadata(i,i.currentSequenceNumber,r));l.push(f)}return C.waitFor(l).next(()=>a.apply(i)).next(()=>t.localDocuments.getLocalViewOfDocuments(i,u,h)).next(()=>u)}).then(i=>(t.Fs=s,i))}function Sv(n,e,t){let r=re(),s=re();return t.forEach(i=>r=r.add(i)),e.getEntries(n,r).next(i=>{let a=Yt();return t.forEach((l,u)=>{const h=i.get(l);u.isFoundDocument()!==h.isFoundDocument()&&(s=s.add(l)),u.isNoDocument()&&u.version.isEqual(Y.min())?(e.removeEntry(l,u.readTime),a=a.insert(l,u)):!h.isValidDocument()||u.version.compareTo(h.version)>0||u.version.compareTo(h.version)===0&&h.hasPendingWrites?(e.addEntry(u),a=a.insert(l,u)):U(rc,"Ignoring outdated watch update for ",l,". Current version:",h.version," Watch version:",u.version)}),{Ls:a,ks:s}})}function Rv(n,e){const t=Z(n);return t.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=Hl),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function kv(n,e){const t=Z(n);return t.persistence.runTransaction("Allocate target","readwrite",r=>{let s;return t.hi.getTargetData(r,e).next(i=>i?(s=i,C.resolve(s)):t.hi.allocateTargetId(r).next(a=>(s=new fn(e,a,"TargetPurposeListen",r.currentSequenceNumber),t.hi.addTargetData(r,s).next(()=>s))))}).then(r=>{const s=t.Fs.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(t.Fs=t.Fs.insert(r.targetId,r),t.Ms.set(e,r.targetId)),r})}async function yl(n,e,t){const r=Z(n),s=r.Fs.get(e),i=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",i,a=>r.persistence.referenceDelegate.removeTarget(a,s))}catch(a){if(!es(a))throw a;U(rc,`Failed to update sequence numbers for target ${e}: ${a}`)}r.Fs=r.Fs.remove(e),r.Ms.delete(s.target)}function Vh(n,e,t){const r=Z(n);let s=Y.min(),i=re();return r.persistence.runTransaction("Execute query","readwrite",a=>function(u,h,f){const p=Z(u),g=p.Ms.get(f);return g!==void 0?C.resolve(p.Fs.get(g)):p.hi.getTargetData(h,f)}(r,a,Dt(e)).next(l=>{if(l)return s=l.lastLimboFreeSnapshotVersion,r.hi.getMatchingKeysForTargetId(a,l.targetId).next(u=>{i=u})}).next(()=>r.Cs.getDocumentsMatchingQuery(a,e,t?s:Y.min(),t?i:re())).next(l=>(Pv(r,py(e),l),{documents:l,qs:i})))}function Pv(n,e,t){let r=n.xs.get(e)||Y.min();t.forEach((s,i)=>{i.readTime.compareTo(r)>0&&(r=i.readTime)}),n.xs.set(e,r)}class Nh{constructor(){this.activeTargetIds=Ey()}Gs(e){this.activeTargetIds=this.activeTargetIds.add(e)}zs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Ws(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class Cv{constructor(){this.Fo=new Nh,this.Mo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.Fo.Gs(e),this.Mo[e]||"not-current"}updateQueryState(e,t,r){this.Mo[e]=t}removeLocalQueryTarget(e){this.Fo.zs(e)}isLocalQueryTarget(e){return this.Fo.activeTargetIds.has(e)}clearQueryState(e){delete this.Mo[e]}getAllActiveQueryTargets(){return this.Fo.activeTargetIds}isActiveQueryTarget(e){return this.Fo.activeTargetIds.has(e)}start(){return this.Fo=new Nh,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
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
 */class Vv{xo(e){}shutdown(){}}/**
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
 */const xh="ConnectivityMonitor";class Dh{constructor(){this.Oo=()=>this.No(),this.Bo=()=>this.Lo(),this.ko=[],this.qo()}xo(e){this.ko.push(e)}shutdown(){window.removeEventListener("online",this.Oo),window.removeEventListener("offline",this.Bo)}qo(){window.addEventListener("online",this.Oo),window.addEventListener("offline",this.Bo)}No(){U(xh,"Network connectivity changed: AVAILABLE");for(const e of this.ko)e(0)}Lo(){U(xh,"Network connectivity changed: UNAVAILABLE");for(const e of this.ko)e(1)}static C(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
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
 */let Oi=null;function vl(){return Oi===null?Oi=function(){return 268435456+Math.round(2147483648*Math.random())}():Oi++,"0x"+Oi.toString(16)}/**
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
 */const Fa="RestConnection",Nv={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class xv{get Qo(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.$o=t+"://"+e.host,this.Uo=`projects/${r}/databases/${s}`,this.Ko=this.databaseId.database===ao?`project_id=${r}`:`project_id=${r}&database_id=${s}`}Wo(e,t,r,s,i){const a=vl(),l=this.Go(e,t.toUriEncodedString());U(Fa,`Sending RPC '${e}' ${a}:`,l,r);const u={"google-cloud-resource-prefix":this.Uo,"x-goog-request-params":this.Ko};this.zo(u,s,i);const{host:h}=new URL(l),f=Jr(h);return this.jo(e,l,u,r,f).then(p=>(U(Fa,`Received RPC '${e}' ${a}: `,p),p),p=>{throw Rn(Fa,`RPC '${e}' ${a} failed with error: `,p,"url: ",l,"request:",r),p})}Jo(e,t,r,s,i,a){return this.Wo(e,t,r,s,i)}zo(e,t,r){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+Yr}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((s,i)=>e[i]=s),r&&r.headers.forEach((s,i)=>e[i]=s)}Go(e,t){const r=Nv[e];return`${this.$o}/v1/${t}:${r}`}terminate(){}}/**
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
 */class Dv{constructor(e){this.Ho=e.Ho,this.Yo=e.Yo}Zo(e){this.Xo=e}e_(e){this.t_=e}n_(e){this.r_=e}onMessage(e){this.i_=e}close(){this.Yo()}send(e){this.Ho(e)}s_(){this.Xo()}o_(){this.t_()}__(e){this.r_(e)}a_(e){this.i_(e)}}/**
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
 */const Xe="WebChannelConnection";class Ov extends xv{constructor(e){super(e),this.u_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}jo(e,t,r,s,i){const a=vl();return new Promise((l,u)=>{const h=new Yd;h.setWithCredentials(!0),h.listenOnce(Zd.COMPLETE,()=>{try{switch(h.getLastErrorCode()){case qi.NO_ERROR:const p=h.getResponseJson();U(Xe,`XHR for RPC '${e}' ${a} received:`,JSON.stringify(p)),l(p);break;case qi.TIMEOUT:U(Xe,`RPC '${e}' ${a} timed out`),u(new F(P.DEADLINE_EXCEEDED,"Request time out"));break;case qi.HTTP_ERROR:const g=h.getStatus();if(U(Xe,`RPC '${e}' ${a} failed with status:`,g,"response text:",h.getResponseText()),g>0){let S=h.getResponseJson();Array.isArray(S)&&(S=S[0]);const k=S==null?void 0:S.error;if(k&&k.status&&k.message){const V=function(W){const B=W.toLowerCase().replace(/_/g,"-");return Object.values(P).indexOf(B)>=0?B:P.UNKNOWN}(k.status);u(new F(V,k.message))}else u(new F(P.UNKNOWN,"Server responded with status "+h.getStatus()))}else u(new F(P.UNAVAILABLE,"Connection failed."));break;default:Q(9055,{c_:e,streamId:a,l_:h.getLastErrorCode(),h_:h.getLastError()})}}finally{U(Xe,`RPC '${e}' ${a} completed.`)}});const f=JSON.stringify(s);U(Xe,`RPC '${e}' ${a} sending request:`,s),h.send(t,"POST",f,r,15)})}P_(e,t,r){const s=vl(),i=[this.$o,"/","google.firestore.v1.Firestore","/",e,"/channel"],a=nf(),l=tf(),u={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},h=this.longPollingOptions.timeoutSeconds;h!==void 0&&(u.longPollingTimeout=Math.round(1e3*h)),this.useFetchStreams&&(u.useFetchStreams=!0),this.zo(u.initMessageHeaders,t,r),u.encodeInitMessageHeaders=!0;const f=i.join("");U(Xe,`Creating RPC '${e}' stream ${s}: ${f}`,u);const p=a.createWebChannel(f,u);this.T_(p);let g=!1,S=!1;const k=new Dv({Ho:N=>{S?U(Xe,`Not sending because RPC '${e}' stream ${s} is closed:`,N):(g||(U(Xe,`Opening RPC '${e}' stream ${s} transport.`),p.open(),g=!0),U(Xe,`RPC '${e}' stream ${s} sending:`,N),p.send(N))},Yo:()=>p.close()}),V=(N,W,B)=>{N.listen(W,$=>{try{B($)}catch(z){setTimeout(()=>{throw z},0)}})};return V(p,bs.EventType.OPEN,()=>{S||(U(Xe,`RPC '${e}' stream ${s} transport opened.`),k.s_())}),V(p,bs.EventType.CLOSE,()=>{S||(S=!0,U(Xe,`RPC '${e}' stream ${s} transport closed`),k.__(),this.I_(p))}),V(p,bs.EventType.ERROR,N=>{S||(S=!0,Rn(Xe,`RPC '${e}' stream ${s} transport errored. Name:`,N.name,"Message:",N.message),k.__(new F(P.UNAVAILABLE,"The operation could not be completed")))}),V(p,bs.EventType.MESSAGE,N=>{var W;if(!S){const B=N.data[0];he(!!B,16349);const $=B,z=($==null?void 0:$.error)||((W=$[0])===null||W===void 0?void 0:W.error);if(z){U(Xe,`RPC '${e}' stream ${s} received error:`,z);const ae=z.status;let q=function(y){const w=De[y];if(w!==void 0)return Uf(w)}(ae),E=z.message;q===void 0&&(q=P.INTERNAL,E="Unknown error status: "+ae+" with message "+z.message),S=!0,k.__(new F(q,E)),p.close()}else U(Xe,`RPC '${e}' stream ${s} received:`,B),k.a_(B)}}),V(l,ef.STAT_EVENT,N=>{N.stat===ol.PROXY?U(Xe,`RPC '${e}' stream ${s} detected buffering proxy`):N.stat===ol.NOPROXY&&U(Xe,`RPC '${e}' stream ${s} detected no buffering proxy`)}),setTimeout(()=>{k.o_()},0),k}terminate(){this.u_.forEach(e=>e.close()),this.u_=[]}T_(e){this.u_.push(e)}I_(e){this.u_=this.u_.filter(t=>t===e)}}function Ua(){return typeof document<"u"?document:null}/**
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
 */function Fo(n){return new Uy(n,!0)}/**
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
 */class Zf{constructor(e,t,r=1e3,s=1.5,i=6e4){this.Fi=e,this.timerId=t,this.d_=r,this.E_=s,this.A_=i,this.R_=0,this.V_=null,this.m_=Date.now(),this.reset()}reset(){this.R_=0}f_(){this.R_=this.A_}g_(e){this.cancel();const t=Math.floor(this.R_+this.p_()),r=Math.max(0,Date.now()-this.m_),s=Math.max(0,t-r);s>0&&U("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.R_} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.V_=this.Fi.enqueueAfterDelay(this.timerId,s,()=>(this.m_=Date.now(),e())),this.R_*=this.E_,this.R_<this.d_&&(this.R_=this.d_),this.R_>this.A_&&(this.R_=this.A_)}y_(){this.V_!==null&&(this.V_.skipDelay(),this.V_=null)}cancel(){this.V_!==null&&(this.V_.cancel(),this.V_=null)}p_(){return(Math.random()-.5)*this.R_}}/**
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
 */const Oh="PersistentStream";class ep{constructor(e,t,r,s,i,a,l,u){this.Fi=e,this.w_=r,this.S_=s,this.connection=i,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=l,this.listener=u,this.state=0,this.b_=0,this.D_=null,this.v_=null,this.stream=null,this.C_=0,this.F_=new Zf(e,t)}M_(){return this.state===1||this.state===5||this.x_()}x_(){return this.state===2||this.state===3}start(){this.C_=0,this.state!==4?this.auth():this.O_()}async stop(){this.M_()&&await this.close(0)}N_(){this.state=0,this.F_.reset()}B_(){this.x_()&&this.D_===null&&(this.D_=this.Fi.enqueueAfterDelay(this.w_,6e4,()=>this.L_()))}k_(e){this.q_(),this.stream.send(e)}async L_(){if(this.x_())return this.close(0)}q_(){this.D_&&(this.D_.cancel(),this.D_=null)}Q_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,t){this.q_(),this.Q_(),this.F_.cancel(),this.b_++,e!==4?this.F_.reset():t&&t.code===P.RESOURCE_EXHAUSTED?(Xt(t.toString()),Xt("Using maximum backoff delay to prevent overloading the backend."),this.F_.f_()):t&&t.code===P.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.U_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.n_(t)}U_(){}auth(){this.state=1;const e=this.K_(this.b_),t=this.b_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,s])=>{this.b_===t&&this.W_(r,s)},r=>{e(()=>{const s=new F(P.UNKNOWN,"Fetching auth token failed: "+r.message);return this.G_(s)})})}W_(e,t){const r=this.K_(this.b_);this.stream=this.z_(e,t),this.stream.Zo(()=>{r(()=>this.listener.Zo())}),this.stream.e_(()=>{r(()=>(this.state=2,this.v_=this.Fi.enqueueAfterDelay(this.S_,1e4,()=>(this.x_()&&(this.state=3),Promise.resolve())),this.listener.e_()))}),this.stream.n_(s=>{r(()=>this.G_(s))}),this.stream.onMessage(s=>{r(()=>++this.C_==1?this.j_(s):this.onNext(s))})}O_(){this.state=5,this.F_.g_(async()=>{this.state=0,this.start()})}G_(e){return U(Oh,`close with error: ${e}`),this.stream=null,this.close(4,e)}K_(e){return t=>{this.Fi.enqueueAndForget(()=>this.b_===e?t():(U(Oh,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class Mv extends ep{constructor(e,t,r,s,i,a){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,s,a),this.serializer=i}z_(e,t){return this.connection.P_("Listen",e,t)}j_(e){return this.onNext(e)}onNext(e){this.F_.reset();const t=qy(this.serializer,e),r=function(i){if(!("targetChange"in i))return Y.min();const a=i.targetChange;return a.targetIds&&a.targetIds.length?Y.min():a.readTime?Ot(a.readTime):Y.min()}(e);return this.listener.J_(t,r)}H_(e){const t={};t.database=_l(this.serializer),t.addTarget=function(i,a){let l;const u=a.target;if(l=hl(u)?{documents:Hy(i,u)}:{query:Gy(i,u).Vt},l.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){l.resumeToken=qf(i,a.resumeToken);const h=pl(i,a.expectedCount);h!==null&&(l.expectedCount=h)}else if(a.snapshotVersion.compareTo(Y.min())>0){l.readTime=ho(i,a.snapshotVersion.toTimestamp());const h=pl(i,a.expectedCount);h!==null&&(l.expectedCount=h)}return l}(this.serializer,e);const r=Ky(this.serializer,e);r&&(t.labels=r),this.k_(t)}Y_(e){const t={};t.database=_l(this.serializer),t.removeTarget=e,this.k_(t)}}class Lv extends ep{constructor(e,t,r,s,i,a){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,s,a),this.serializer=i}get Z_(){return this.C_>0}start(){this.lastStreamToken=void 0,super.start()}U_(){this.Z_&&this.X_([])}z_(e,t){return this.connection.P_("Write",e,t)}j_(e){return he(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,he(!e.writeResults||e.writeResults.length===0,55816),this.listener.ea()}onNext(e){he(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.F_.reset();const t=zy(e.writeResults,e.commitTime),r=Ot(e.commitTime);return this.listener.ta(r,t)}na(){const e={};e.database=_l(this.serializer),this.k_(e)}X_(e){const t={streamToken:this.lastStreamToken,writes:e.map(r=>jy(this.serializer,r))};this.k_(t)}}/**
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
 */class Fv{}class Uv extends Fv{constructor(e,t,r,s){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=s,this.ra=!1}ia(){if(this.ra)throw new F(P.FAILED_PRECONDITION,"The client has already been terminated.")}Wo(e,t,r,s){return this.ia(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,a])=>this.connection.Wo(e,ml(t,r),s,i,a)).catch(i=>{throw i.name==="FirebaseError"?(i.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new F(P.UNKNOWN,i.toString())})}Jo(e,t,r,s,i){return this.ia(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([a,l])=>this.connection.Jo(e,ml(t,r),s,a,l,i)).catch(a=>{throw a.name==="FirebaseError"?(a.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new F(P.UNKNOWN,a.toString())})}terminate(){this.ra=!0,this.connection.terminate()}}class $v{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.sa=0,this.oa=null,this._a=!0}aa(){this.sa===0&&(this.ua("Unknown"),this.oa=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.oa=null,this.ca("Backend didn't respond within 10 seconds."),this.ua("Offline"),Promise.resolve())))}la(e){this.state==="Online"?this.ua("Unknown"):(this.sa++,this.sa>=1&&(this.ha(),this.ca(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ua("Offline")))}set(e){this.ha(),this.sa=0,e==="Online"&&(this._a=!1),this.ua(e)}ua(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}ca(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this._a?(Xt(t),this._a=!1):U("OnlineStateTracker",t)}ha(){this.oa!==null&&(this.oa.cancel(),this.oa=null)}}/**
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
 */const ar="RemoteStore";class Bv{constructor(e,t,r,s,i){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.Pa=[],this.Ta=new Map,this.Ia=new Set,this.da=[],this.Ea=i,this.Ea.xo(a=>{r.enqueueAndForget(async()=>{hr(this)&&(U(ar,"Restarting streams for network reachability change."),await async function(u){const h=Z(u);h.Ia.add(4),await ri(h),h.Aa.set("Unknown"),h.Ia.delete(4),await Uo(h)}(this))})}),this.Aa=new $v(r,s)}}async function Uo(n){if(hr(n))for(const e of n.da)await e(!0)}async function ri(n){for(const e of n.da)await e(!1)}function tp(n,e){const t=Z(n);t.Ta.has(e.targetId)||(t.Ta.set(e.targetId,e),ac(t)?oc(t):ns(t).x_()&&ic(t,e))}function sc(n,e){const t=Z(n),r=ns(t);t.Ta.delete(e),r.x_()&&np(t,e),t.Ta.size===0&&(r.x_()?r.B_():hr(t)&&t.Aa.set("Unknown"))}function ic(n,e){if(n.Ra.$e(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(Y.min())>0){const t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}ns(n).H_(e)}function np(n,e){n.Ra.$e(e),ns(n).Y_(e)}function oc(n){n.Ra=new Oy({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),Et:e=>n.Ta.get(e)||null,lt:()=>n.datastore.serializer.databaseId}),ns(n).start(),n.Aa.aa()}function ac(n){return hr(n)&&!ns(n).M_()&&n.Ta.size>0}function hr(n){return Z(n).Ia.size===0}function rp(n){n.Ra=void 0}async function qv(n){n.Aa.set("Online")}async function jv(n){n.Ta.forEach((e,t)=>{ic(n,e)})}async function zv(n,e){rp(n),ac(n)?(n.Aa.la(e),oc(n)):n.Aa.set("Unknown")}async function Hv(n,e,t){if(n.Aa.set("Online"),e instanceof Bf&&e.state===2&&e.cause)try{await async function(s,i){const a=i.cause;for(const l of i.targetIds)s.Ta.has(l)&&(await s.remoteSyncer.rejectListen(l,a),s.Ta.delete(l),s.Ra.removeTarget(l))}(n,e)}catch(r){U(ar,"Failed to remove targets %s: %s ",e.targetIds.join(","),r),await po(n,r)}else if(e instanceof Gi?n.Ra.Ye(e):e instanceof $f?n.Ra.it(e):n.Ra.et(e),!t.isEqual(Y.min()))try{const r=await Yf(n.localStore);t.compareTo(r)>=0&&await function(i,a){const l=i.Ra.Pt(a);return l.targetChanges.forEach((u,h)=>{if(u.resumeToken.approximateByteSize()>0){const f=i.Ta.get(h);f&&i.Ta.set(h,f.withResumeToken(u.resumeToken,a))}}),l.targetMismatches.forEach((u,h)=>{const f=i.Ta.get(u);if(!f)return;i.Ta.set(u,f.withResumeToken(We.EMPTY_BYTE_STRING,f.snapshotVersion)),np(i,u);const p=new fn(f.target,u,h,f.sequenceNumber);ic(i,p)}),i.remoteSyncer.applyRemoteEvent(l)}(n,t)}catch(r){U(ar,"Failed to raise snapshot:",r),await po(n,r)}}async function po(n,e,t){if(!es(e))throw e;n.Ia.add(1),await ri(n),n.Aa.set("Offline"),t||(t=()=>Yf(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{U(ar,"Retrying IndexedDB access"),await t(),n.Ia.delete(1),await Uo(n)})}function sp(n,e){return e().catch(t=>po(n,t,e))}async function $o(n){const e=Z(n),t=Nn(e);let r=e.Pa.length>0?e.Pa[e.Pa.length-1].batchId:Hl;for(;Gv(e);)try{const s=await Rv(e.localStore,r);if(s===null){e.Pa.length===0&&t.B_();break}r=s.batchId,Wv(e,s)}catch(s){await po(e,s)}ip(e)&&op(e)}function Gv(n){return hr(n)&&n.Pa.length<10}function Wv(n,e){n.Pa.push(e);const t=Nn(n);t.x_()&&t.Z_&&t.X_(e.mutations)}function ip(n){return hr(n)&&!Nn(n).M_()&&n.Pa.length>0}function op(n){Nn(n).start()}async function Kv(n){Nn(n).na()}async function Qv(n){const e=Nn(n);for(const t of n.Pa)e.X_(t.mutations)}async function Jv(n,e,t){const r=n.Pa.shift(),s=Xl.from(r,e,t);await sp(n,()=>n.remoteSyncer.applySuccessfulWrite(s)),await $o(n)}async function Xv(n,e){e&&Nn(n).Z_&&await async function(r,s){if(function(a){return xy(a)&&a!==P.ABORTED}(s.code)){const i=r.Pa.shift();Nn(r).N_(),await sp(r,()=>r.remoteSyncer.rejectFailedWrite(i.batchId,s)),await $o(r)}}(n,e),ip(n)&&op(n)}async function Mh(n,e){const t=Z(n);t.asyncQueue.verifyOperationInProgress(),U(ar,"RemoteStore received new credentials");const r=hr(t);t.Ia.add(3),await ri(t),r&&t.Aa.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.Ia.delete(3),await Uo(t)}async function Yv(n,e){const t=Z(n);e?(t.Ia.delete(2),await Uo(t)):e||(t.Ia.add(2),await ri(t),t.Aa.set("Unknown"))}function ns(n){return n.Va||(n.Va=function(t,r,s){const i=Z(t);return i.ia(),new Mv(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(n.datastore,n.asyncQueue,{Zo:qv.bind(null,n),e_:jv.bind(null,n),n_:zv.bind(null,n),J_:Hv.bind(null,n)}),n.da.push(async e=>{e?(n.Va.N_(),ac(n)?oc(n):n.Aa.set("Unknown")):(await n.Va.stop(),rp(n))})),n.Va}function Nn(n){return n.ma||(n.ma=function(t,r,s){const i=Z(t);return i.ia(),new Lv(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(n.datastore,n.asyncQueue,{Zo:()=>Promise.resolve(),e_:Kv.bind(null,n),n_:Xv.bind(null,n),ea:Qv.bind(null,n),ta:Jv.bind(null,n)}),n.da.push(async e=>{e?(n.ma.N_(),await $o(n)):(await n.ma.stop(),n.Pa.length>0&&(U(ar,`Stopping write stream with ${n.Pa.length} pending writes`),n.Pa=[]))})),n.ma}/**
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
 */class lc{constructor(e,t,r,s,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new vn,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(a=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,s,i){const a=Date.now()+r,l=new lc(e,t,a,s,i);return l.start(r),l}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new F(P.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function cc(n,e){if(Xt("AsyncQueue",`${e}: ${n}`),es(n))return new F(P.UNAVAILABLE,`${e}: ${n}`);throw n}/**
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
 */class Nr{static emptySet(e){return new Nr(e.comparator)}constructor(e){this.comparator=e?(t,r)=>e(t,r)||H.comparator(t.key,r.key):(t,r)=>H.comparator(t.key,r.key),this.keyedMap=As(),this.sortedSet=new Pe(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,r)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof Nr)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const r=new Nr;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}}/**
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
 */class Lh{constructor(){this.fa=new Pe(H.comparator)}track(e){const t=e.doc.key,r=this.fa.get(t);r?e.type!==0&&r.type===3?this.fa=this.fa.insert(t,e):e.type===3&&r.type!==1?this.fa=this.fa.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.fa=this.fa.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.fa=this.fa.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.fa=this.fa.remove(t):e.type===1&&r.type===2?this.fa=this.fa.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.fa=this.fa.insert(t,{type:2,doc:e.doc}):Q(63341,{At:e,ga:r}):this.fa=this.fa.insert(t,e)}pa(){const e=[];return this.fa.inorderTraversal((t,r)=>{e.push(r)}),e}}class Hr{constructor(e,t,r,s,i,a,l,u,h){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=a,this.syncStateChanged=l,this.excludesMetadataChanges=u,this.hasCachedResults=h}static fromInitialDocuments(e,t,r,s,i){const a=[];return t.forEach(l=>{a.push({type:0,doc:l})}),new Hr(e,t,Nr.emptySet(t),a,r,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&xo(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let s=0;s<t.length;s++)if(t[s].type!==r[s].type||!t[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
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
 */class Zv{constructor(){this.ya=void 0,this.wa=[]}Sa(){return this.wa.some(e=>e.ba())}}class eE{constructor(){this.queries=Fh(),this.onlineState="Unknown",this.Da=new Set}terminate(){(function(t,r){const s=Z(t),i=s.queries;s.queries=Fh(),i.forEach((a,l)=>{for(const u of l.wa)u.onError(r)})})(this,new F(P.ABORTED,"Firestore shutting down"))}}function Fh(){return new ur(n=>Sf(n),xo)}async function ap(n,e){const t=Z(n);let r=3;const s=e.query;let i=t.queries.get(s);i?!i.Sa()&&e.ba()&&(r=2):(i=new Zv,r=e.ba()?0:1);try{switch(r){case 0:i.ya=await t.onListen(s,!0);break;case 1:i.ya=await t.onListen(s,!1);break;case 2:await t.onFirstRemoteStoreListen(s)}}catch(a){const l=cc(a,`Initialization of query '${br(e.query)}' failed`);return void e.onError(l)}t.queries.set(s,i),i.wa.push(e),e.va(t.onlineState),i.ya&&e.Ca(i.ya)&&uc(t)}async function lp(n,e){const t=Z(n),r=e.query;let s=3;const i=t.queries.get(r);if(i){const a=i.wa.indexOf(e);a>=0&&(i.wa.splice(a,1),i.wa.length===0?s=e.ba()?0:1:!i.Sa()&&e.ba()&&(s=2))}switch(s){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function tE(n,e){const t=Z(n);let r=!1;for(const s of e){const i=s.query,a=t.queries.get(i);if(a){for(const l of a.wa)l.Ca(s)&&(r=!0);a.ya=s}}r&&uc(t)}function nE(n,e,t){const r=Z(n),s=r.queries.get(e);if(s)for(const i of s.wa)i.onError(t);r.queries.delete(e)}function uc(n){n.Da.forEach(e=>{e.next()})}var El,Uh;(Uh=El||(El={})).Fa="default",Uh.Cache="cache";class cp{constructor(e,t,r){this.query=e,this.Ma=t,this.xa=!1,this.Oa=null,this.onlineState="Unknown",this.options=r||{}}Ca(e){if(!this.options.includeMetadataChanges){const r=[];for(const s of e.docChanges)s.type!==3&&r.push(s);e=new Hr(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.xa?this.Na(e)&&(this.Ma.next(e),t=!0):this.Ba(e,this.onlineState)&&(this.La(e),t=!0),this.Oa=e,t}onError(e){this.Ma.error(e)}va(e){this.onlineState=e;let t=!1;return this.Oa&&!this.xa&&this.Ba(this.Oa,e)&&(this.La(this.Oa),t=!0),t}Ba(e,t){if(!e.fromCache||!this.ba())return!0;const r=t!=="Offline";return(!this.options.ka||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}Na(e){if(e.docChanges.length>0)return!0;const t=this.Oa&&this.Oa.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}La(e){e=Hr.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.xa=!0,this.Ma.next(e)}ba(){return this.options.source!==El.Cache}}/**
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
 */class up{constructor(e){this.key=e}}class hp{constructor(e){this.key=e}}class rE{constructor(e,t){this.query=e,this.Ha=t,this.Ya=null,this.hasCachedResults=!1,this.current=!1,this.Za=re(),this.mutatedKeys=re(),this.Xa=Rf(e),this.eu=new Nr(this.Xa)}get tu(){return this.Ha}nu(e,t){const r=t?t.ru:new Lh,s=t?t.eu:this.eu;let i=t?t.mutatedKeys:this.mutatedKeys,a=s,l=!1;const u=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,h=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal((f,p)=>{const g=s.get(f),S=Do(this.query,p)?p:null,k=!!g&&this.mutatedKeys.has(g.key),V=!!S&&(S.hasLocalMutations||this.mutatedKeys.has(S.key)&&S.hasCommittedMutations);let N=!1;g&&S?g.data.isEqual(S.data)?k!==V&&(r.track({type:3,doc:S}),N=!0):this.iu(g,S)||(r.track({type:2,doc:S}),N=!0,(u&&this.Xa(S,u)>0||h&&this.Xa(S,h)<0)&&(l=!0)):!g&&S?(r.track({type:0,doc:S}),N=!0):g&&!S&&(r.track({type:1,doc:g}),N=!0,(u||h)&&(l=!0)),N&&(S?(a=a.add(S),i=V?i.add(f):i.delete(f)):(a=a.delete(f),i=i.delete(f)))}),this.query.limit!==null)for(;a.size>this.query.limit;){const f=this.query.limitType==="F"?a.last():a.first();a=a.delete(f.key),i=i.delete(f.key),r.track({type:1,doc:f})}return{eu:a,ru:r,Ds:l,mutatedKeys:i}}iu(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,s){const i=this.eu;this.eu=e.eu,this.mutatedKeys=e.mutatedKeys;const a=e.ru.pa();a.sort((f,p)=>function(S,k){const V=N=>{switch(N){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return Q(20277,{At:N})}};return V(S)-V(k)}(f.type,p.type)||this.Xa(f.doc,p.doc)),this.su(r),s=s!=null&&s;const l=t&&!s?this.ou():[],u=this.Za.size===0&&this.current&&!s?1:0,h=u!==this.Ya;return this.Ya=u,a.length!==0||h?{snapshot:new Hr(this.query,e.eu,i,a,e.mutatedKeys,u===0,h,!1,!!r&&r.resumeToken.approximateByteSize()>0),_u:l}:{_u:l}}va(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({eu:this.eu,ru:new Lh,mutatedKeys:this.mutatedKeys,Ds:!1},!1)):{_u:[]}}au(e){return!this.Ha.has(e)&&!!this.eu.has(e)&&!this.eu.get(e).hasLocalMutations}su(e){e&&(e.addedDocuments.forEach(t=>this.Ha=this.Ha.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.Ha=this.Ha.delete(t)),this.current=e.current)}ou(){if(!this.current)return[];const e=this.Za;this.Za=re(),this.eu.forEach(r=>{this.au(r.key)&&(this.Za=this.Za.add(r.key))});const t=[];return e.forEach(r=>{this.Za.has(r)||t.push(new hp(r))}),this.Za.forEach(r=>{e.has(r)||t.push(new up(r))}),t}uu(e){this.Ha=e.qs,this.Za=re();const t=this.nu(e.documents);return this.applyChanges(t,!0)}cu(){return Hr.fromInitialDocuments(this.query,this.eu,this.mutatedKeys,this.Ya===0,this.hasCachedResults)}}const hc="SyncEngine";class sE{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class iE{constructor(e){this.key=e,this.lu=!1}}class oE{constructor(e,t,r,s,i,a){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=a,this.hu={},this.Pu=new ur(l=>Sf(l),xo),this.Tu=new Map,this.Iu=new Set,this.du=new Pe(H.comparator),this.Eu=new Map,this.Au=new ec,this.Ru={},this.Vu=new Map,this.mu=zr.ur(),this.onlineState="Unknown",this.fu=void 0}get isPrimaryClient(){return this.fu===!0}}async function aE(n,e,t=!0){const r=_p(n);let s;const i=r.Pu.get(e);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.cu()):s=await dp(r,e,t,!0),s}async function lE(n,e){const t=_p(n);await dp(t,e,!0,!1)}async function dp(n,e,t,r){const s=await kv(n.localStore,Dt(e)),i=s.targetId,a=n.sharedClientState.addLocalQueryTarget(i,t);let l;return r&&(l=await cE(n,e,i,a==="current",s.resumeToken)),n.isPrimaryClient&&t&&tp(n.remoteStore,s),l}async function cE(n,e,t,r,s){n.gu=(p,g,S)=>async function(V,N,W,B){let $=N.view.nu(W);$.Ds&&($=await Vh(V.localStore,N.query,!1).then(({documents:E})=>N.view.nu(E,$)));const z=B&&B.targetChanges.get(N.targetId),ae=B&&B.targetMismatches.get(N.targetId)!=null,q=N.view.applyChanges($,V.isPrimaryClient,z,ae);return Bh(V,N.targetId,q._u),q.snapshot}(n,p,g,S);const i=await Vh(n.localStore,e,!0),a=new rE(e,i.qs),l=a.nu(i.documents),u=ni.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",s),h=a.applyChanges(l,n.isPrimaryClient,u);Bh(n,t,h._u);const f=new sE(e,t,a);return n.Pu.set(e,f),n.Tu.has(t)?n.Tu.get(t).push(e):n.Tu.set(t,[e]),h.snapshot}async function uE(n,e,t){const r=Z(n),s=r.Pu.get(e),i=r.Tu.get(s.targetId);if(i.length>1)return r.Tu.set(s.targetId,i.filter(a=>!xo(a,e))),void r.Pu.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await yl(r.localStore,s.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(s.targetId),t&&sc(r.remoteStore,s.targetId),wl(r,s.targetId)}).catch(Zr)):(wl(r,s.targetId),await yl(r.localStore,s.targetId,!0))}async function hE(n,e){const t=Z(n),r=t.Pu.get(e),s=t.Tu.get(r.targetId);t.isPrimaryClient&&s.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),sc(t.remoteStore,r.targetId))}async function dE(n,e,t){const r=vE(n);try{const s=await function(a,l){const u=Z(a),h=Ie.now(),f=l.reduce((S,k)=>S.add(k.key),re());let p,g;return u.persistence.runTransaction("Locally write mutations","readwrite",S=>{let k=Yt(),V=re();return u.Os.getEntries(S,f).next(N=>{k=N,k.forEach((W,B)=>{B.isValidDocument()||(V=V.add(W))})}).next(()=>u.localDocuments.getOverlayedDocuments(S,k)).next(N=>{p=N;const W=[];for(const B of l){const $=ky(B,p.get(B.key).overlayedDocument);$!=null&&W.push(new Mn(B.key,$,yf($.value.mapValue),It.exists(!0)))}return u.mutationQueue.addMutationBatch(S,h,W,l)}).next(N=>{g=N;const W=N.applyToLocalDocumentSet(p,V);return u.documentOverlayCache.saveOverlays(S,N.batchId,W)})}).then(()=>({batchId:g.batchId,changes:Pf(p)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(s.batchId),function(a,l,u){let h=a.Ru[a.currentUser.toKey()];h||(h=new Pe(ee)),h=h.insert(l,u),a.Ru[a.currentUser.toKey()]=h}(r,s.batchId,t),await si(r,s.changes),await $o(r.remoteStore)}catch(s){const i=cc(s,"Failed to persist write");t.reject(i)}}async function fp(n,e){const t=Z(n);try{const r=await Av(t.localStore,e);e.targetChanges.forEach((s,i)=>{const a=t.Eu.get(i);a&&(he(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?a.lu=!0:s.modifiedDocuments.size>0?he(a.lu,14607):s.removedDocuments.size>0&&(he(a.lu,42227),a.lu=!1))}),await si(t,r,e)}catch(r){await Zr(r)}}function $h(n,e,t){const r=Z(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){const s=[];r.Pu.forEach((i,a)=>{const l=a.view.va(e);l.snapshot&&s.push(l.snapshot)}),function(a,l){const u=Z(a);u.onlineState=l;let h=!1;u.queries.forEach((f,p)=>{for(const g of p.wa)g.va(l)&&(h=!0)}),h&&uc(u)}(r.eventManager,e),s.length&&r.hu.J_(s),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function fE(n,e,t){const r=Z(n);r.sharedClientState.updateQueryState(e,"rejected",t);const s=r.Eu.get(e),i=s&&s.key;if(i){let a=new Pe(H.comparator);a=a.insert(i,et.newNoDocument(i,Y.min()));const l=re().add(i),u=new Lo(Y.min(),new Map,new Pe(ee),a,l);await fp(r,u),r.du=r.du.remove(i),r.Eu.delete(e),dc(r)}else await yl(r.localStore,e,!1).then(()=>wl(r,e,t)).catch(Zr)}async function pE(n,e){const t=Z(n),r=e.batch.batchId;try{const s=await bv(t.localStore,e);mp(t,r,null),pp(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await si(t,s)}catch(s){await Zr(s)}}async function mE(n,e,t){const r=Z(n);try{const s=await function(a,l){const u=Z(a);return u.persistence.runTransaction("Reject batch","readwrite-primary",h=>{let f;return u.mutationQueue.lookupMutationBatch(h,l).next(p=>(he(p!==null,37113),f=p.keys(),u.mutationQueue.removeMutationBatch(h,p))).next(()=>u.mutationQueue.performConsistencyCheck(h)).next(()=>u.documentOverlayCache.removeOverlaysForBatchId(h,f,l)).next(()=>u.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(h,f)).next(()=>u.localDocuments.getDocuments(h,f))})}(r.localStore,e);mp(r,e,t),pp(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await si(r,s)}catch(s){await Zr(s)}}function pp(n,e){(n.Vu.get(e)||[]).forEach(t=>{t.resolve()}),n.Vu.delete(e)}function mp(n,e,t){const r=Z(n);let s=r.Ru[r.currentUser.toKey()];if(s){const i=s.get(e);i&&(t?i.reject(t):i.resolve(),s=s.remove(e)),r.Ru[r.currentUser.toKey()]=s}}function wl(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const r of n.Tu.get(e))n.Pu.delete(r),t&&n.hu.pu(r,t);n.Tu.delete(e),n.isPrimaryClient&&n.Au.zr(e).forEach(r=>{n.Au.containsKey(r)||gp(n,r)})}function gp(n,e){n.Iu.delete(e.path.canonicalString());const t=n.du.get(e);t!==null&&(sc(n.remoteStore,t),n.du=n.du.remove(e),n.Eu.delete(t),dc(n))}function Bh(n,e,t){for(const r of t)r instanceof up?(n.Au.addReference(r.key,e),gE(n,r)):r instanceof hp?(U(hc,"Document no longer in limbo: "+r.key),n.Au.removeReference(r.key,e),n.Au.containsKey(r.key)||gp(n,r.key)):Q(19791,{yu:r})}function gE(n,e){const t=e.key,r=t.path.canonicalString();n.du.get(t)||n.Iu.has(r)||(U(hc,"New document in limbo: "+t),n.Iu.add(r),dc(n))}function dc(n){for(;n.Iu.size>0&&n.du.size<n.maxConcurrentLimboResolutions;){const e=n.Iu.values().next().value;n.Iu.delete(e);const t=new H(Ee.fromString(e)),r=n.mu.next();n.Eu.set(r,new iE(t)),n.du=n.du.insert(t,r),tp(n.remoteStore,new fn(Dt(No(t.path)),r,"TargetPurposeLimboResolution",Po.ue))}}async function si(n,e,t){const r=Z(n),s=[],i=[],a=[];r.Pu.isEmpty()||(r.Pu.forEach((l,u)=>{a.push(r.gu(u,e,t).then(h=>{var f;if((h||t)&&r.isPrimaryClient){const p=h?!h.fromCache:(f=t==null?void 0:t.targetChanges.get(u.targetId))===null||f===void 0?void 0:f.current;r.sharedClientState.updateQueryState(u.targetId,p?"current":"not-current")}if(h){s.push(h);const p=nc.Es(u.targetId,h);i.push(p)}}))}),await Promise.all(a),r.hu.J_(s),await async function(u,h){const f=Z(u);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",p=>C.forEach(h,g=>C.forEach(g.Is,S=>f.persistence.referenceDelegate.addReference(p,g.targetId,S)).next(()=>C.forEach(g.ds,S=>f.persistence.referenceDelegate.removeReference(p,g.targetId,S)))))}catch(p){if(!es(p))throw p;U(rc,"Failed to update sequence numbers: "+p)}for(const p of h){const g=p.targetId;if(!p.fromCache){const S=f.Fs.get(g),k=S.snapshotVersion,V=S.withLastLimboFreeSnapshotVersion(k);f.Fs=f.Fs.insert(g,V)}}}(r.localStore,i))}async function _E(n,e){const t=Z(n);if(!t.currentUser.isEqual(e)){U(hc,"User change. New user:",e.toKey());const r=await Xf(t.localStore,e);t.currentUser=e,function(i,a){i.Vu.forEach(l=>{l.forEach(u=>{u.reject(new F(P.CANCELLED,a))})}),i.Vu.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await si(t,r.Bs)}}function yE(n,e){const t=Z(n),r=t.Eu.get(e);if(r&&r.lu)return re().add(r.key);{let s=re();const i=t.Tu.get(e);if(!i)return s;for(const a of i){const l=t.Pu.get(a);s=s.unionWith(l.view.tu)}return s}}function _p(n){const e=Z(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=fp.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=yE.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=fE.bind(null,e),e.hu.J_=tE.bind(null,e.eventManager),e.hu.pu=nE.bind(null,e.eventManager),e}function vE(n){const e=Z(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=pE.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=mE.bind(null,e),e}class mo{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Fo(e.databaseInfo.databaseId),this.sharedClientState=this.bu(e),this.persistence=this.Du(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Cu(e,this.localStore),this.indexBackfillerScheduler=this.Fu(e,this.localStore)}Cu(e,t){return null}Fu(e,t){return null}vu(e){return Iv(this.persistence,new Ev,e.initialUser,this.serializer)}Du(e){return new Jf(tc.Vi,this.serializer)}bu(e){return new Cv}async terminate(){var e,t;(e=this.gcScheduler)===null||e===void 0||e.stop(),(t=this.indexBackfillerScheduler)===null||t===void 0||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}mo.provider={build:()=>new mo};class EE extends mo{constructor(e){super(),this.cacheSizeBytes=e}Cu(e,t){he(this.persistence.referenceDelegate instanceof fo,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new iv(r,e.asyncQueue,t)}Du(e){const t=this.cacheSizeBytes!==void 0?lt.withCacheSize(this.cacheSizeBytes):lt.DEFAULT;return new Jf(r=>fo.Vi(r,t),this.serializer)}}class Tl{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>$h(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=_E.bind(null,this.syncEngine),await Yv(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new eE}()}createDatastore(e){const t=Fo(e.databaseInfo.databaseId),r=function(i){return new Ov(i)}(e.databaseInfo);return function(i,a,l,u){return new Uv(i,a,l,u)}(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return function(r,s,i,a,l){return new Bv(r,s,i,a,l)}(this.localStore,this.datastore,e.asyncQueue,t=>$h(this.syncEngine,t,0),function(){return Dh.C()?new Dh:new Vv}())}createSyncEngine(e,t){return function(s,i,a,l,u,h,f){const p=new oE(s,i,a,l,u,h);return f&&(p.fu=!0),p}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(s){const i=Z(s);U(ar,"RemoteStore shutting down."),i.Ia.add(5),await ri(i),i.Ea.shutdown(),i.Aa.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(t=this.eventManager)===null||t===void 0||t.terminate()}}Tl.provider={build:()=>new Tl};/**
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
 */class yp{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.xu(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.xu(this.observer.error,e):Xt("Uncaught Error in snapshot listener:",e.toString()))}Ou(){this.muted=!0}xu(e,t){setTimeout(()=>{this.muted||e(t)},0)}}/**
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
 */const xn="FirestoreClient";class wE{constructor(e,t,r,s,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this.databaseInfo=s,this.user=Ze.UNAUTHENTICATED,this.clientId=zl.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(r,async a=>{U(xn,"Received user=",a.uid),await this.authCredentialListener(a),this.user=a}),this.appCheckCredentials.start(r,a=>(U(xn,"Received new app check token=",a),this.appCheckCredentialListener(a,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new vn;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=cc(t,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function $a(n,e){n.asyncQueue.verifyOperationInProgress(),U(xn,"Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener(async s=>{r.isEqual(s)||(await Xf(e.localStore,s),r=s)}),e.persistence.setDatabaseDeletedListener(()=>{Rn("Terminating Firestore due to IndexedDb database deletion"),n.terminate().then(()=>{U("Terminating Firestore due to IndexedDb database deletion completed successfully")}).catch(s=>{Rn("Terminating Firestore due to IndexedDb database deletion failed",s)})}),n._offlineComponents=e}async function qh(n,e){n.asyncQueue.verifyOperationInProgress();const t=await TE(n);U(xn,"Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener(r=>Mh(e.remoteStore,r)),n.setAppCheckTokenChangeListener((r,s)=>Mh(e.remoteStore,s)),n._onlineComponents=e}async function TE(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){U(xn,"Using user provided OfflineComponentProvider");try{await $a(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!function(s){return s.name==="FirebaseError"?s.code===P.FAILED_PRECONDITION||s.code===P.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11}(t))throw t;Rn("Error using user provided cache. Falling back to memory cache: "+t),await $a(n,new mo)}}else U(xn,"Using default OfflineComponentProvider"),await $a(n,new EE(void 0));return n._offlineComponents}async function vp(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(U(xn,"Using user provided OnlineComponentProvider"),await qh(n,n._uninitializedComponentsProvider._online)):(U(xn,"Using default OnlineComponentProvider"),await qh(n,new Tl))),n._onlineComponents}function IE(n){return vp(n).then(e=>e.syncEngine)}async function Il(n){const e=await vp(n),t=e.eventManager;return t.onListen=aE.bind(null,e.syncEngine),t.onUnlisten=uE.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=lE.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=hE.bind(null,e.syncEngine),t}function bE(n,e,t={}){const r=new vn;return n.asyncQueue.enqueueAndForget(async()=>function(i,a,l,u,h){const f=new yp({next:g=>{f.Ou(),a.enqueueAndForget(()=>lp(i,p));const S=g.docs.has(l);!S&&g.fromCache?h.reject(new F(P.UNAVAILABLE,"Failed to get document because the client is offline.")):S&&g.fromCache&&u&&u.source==="server"?h.reject(new F(P.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):h.resolve(g)},error:g=>h.reject(g)}),p=new cp(No(l.path),f,{includeMetadataChanges:!0,ka:!0});return ap(i,p)}(await Il(n),n.asyncQueue,e,t,r)),r.promise}/**
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
 */const jh=new Map;/**
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
 */const wp="firestore.googleapis.com",zh=!0;class Hh{constructor(e){var t,r;if(e.host===void 0){if(e.ssl!==void 0)throw new F(P.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=wp,this.ssl=zh}else this.host=e.host,this.ssl=(t=e.ssl)!==null&&t!==void 0?t:zh;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=Qf;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<rv)throw new F(P.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}B0("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Ep((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(i){if(i.timeoutSeconds!==void 0){if(isNaN(i.timeoutSeconds))throw new F(P.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (must not be NaN)`);if(i.timeoutSeconds<5)throw new F(P.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (minimum allowed value is 5)`);if(i.timeoutSeconds>30)throw new F(P.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,s){return r.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Bo{constructor(e,t,r,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Hh({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new F(P.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new F(P.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Hh(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new N0;switch(r.type){case"firstParty":return new M0(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new F(P.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const r=jh.get(t);r&&(U("ComponentProvider","Removing Datastore"),jh.delete(t),r.terminate())}(this),Promise.resolve()}}function AE(n,e,t,r={}){var s;n=Tt(n,Bo);const i=Jr(e),a=n._getSettings(),l=Object.assign(Object.assign({},a),{emulatorOptions:n._getEmulatorOptions()}),u=`${e}:${t}`;i&&(jd(`https://${u}`),zd("Firestore",!0)),a.host!==wp&&a.host!==u&&Rn("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const h=Object.assign(Object.assign({},a),{host:u,ssl:i,emulatorOptions:r});if(!sr(h,l)&&(n._setSettings(h),r.mockUserToken)){let f,p;if(typeof r.mockUserToken=="string")f=r.mockUserToken,p=Ze.MOCK_USER;else{f=i_(r.mockUserToken,(s=n._app)===null||s===void 0?void 0:s.options.projectId);const g=r.mockUserToken.sub||r.mockUserToken.user_id;if(!g)throw new F(P.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");p=new Ze(g)}n._authCredentials=new x0(new sf(f,p))}}/**
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
 */class dr{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new dr(this.firestore,e,this._query)}}class Ne{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new En(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new Ne(this.firestore,e,this._key)}toJSON(){return{type:Ne._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,r){if(ei(t,Ne._jsonSchema))return new Ne(e,r||null,new H(Ee.fromString(t.referencePath)))}}Ne._jsonSchemaVersion="firestore/documentReference/1.0",Ne._jsonSchema={type:Me("string",Ne._jsonSchemaVersion),referencePath:Me("string")};class En extends dr{constructor(e,t,r){super(e,t,No(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new Ne(this.firestore,null,new H(e))}withConverter(e){return new En(this.firestore,e,this._path)}}function Ba(n,e,...t){if(n=Ge(n),af("collection","path",e),n instanceof Bo){const r=Ee.fromString(e,...t);return sh(r),new En(n,null,r)}{if(!(n instanceof Ne||n instanceof En))throw new F(P.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(Ee.fromString(e,...t));return sh(r),new En(n.firestore,null,r)}}function Hn(n,e,...t){if(n=Ge(n),arguments.length===1&&(e=zl.newId()),af("doc","path",e),n instanceof Bo){const r=Ee.fromString(e,...t);return rh(r),new Ne(n,null,new H(r))}{if(!(n instanceof Ne||n instanceof En))throw new F(P.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(Ee.fromString(e,...t));return rh(r),new Ne(n.firestore,n instanceof En?n.converter:null,new H(r))}}/**
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
 */const Gh="AsyncQueue";class Wh{constructor(e=Promise.resolve()){this.Zu=[],this.Xu=!1,this.ec=[],this.tc=null,this.nc=!1,this.rc=!1,this.sc=[],this.F_=new Zf(this,"async_queue_retry"),this.oc=()=>{const r=Ua();r&&U(Gh,"Visibility state changed to "+r.visibilityState),this.F_.y_()},this._c=e;const t=Ua();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.oc)}get isShuttingDown(){return this.Xu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.ac(),this.uc(e)}enterRestrictedMode(e){if(!this.Xu){this.Xu=!0,this.rc=e||!1;const t=Ua();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.oc)}}enqueue(e){if(this.ac(),this.Xu)return new Promise(()=>{});const t=new vn;return this.uc(()=>this.Xu&&this.rc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Zu.push(e),this.cc()))}async cc(){if(this.Zu.length!==0){try{await this.Zu[0](),this.Zu.shift(),this.F_.reset()}catch(e){if(!es(e))throw e;U(Gh,"Operation failed with retryable error: "+e)}this.Zu.length>0&&this.F_.g_(()=>this.cc())}}uc(e){const t=this._c.then(()=>(this.nc=!0,e().catch(r=>{throw this.tc=r,this.nc=!1,Xt("INTERNAL UNHANDLED ERROR: ",Kh(r)),r}).then(r=>(this.nc=!1,r))));return this._c=t,t}enqueueAfterDelay(e,t,r){this.ac(),this.sc.indexOf(e)>-1&&(t=0);const s=lc.createAndSchedule(this,e,t,r,i=>this.lc(i));return this.ec.push(s),s}ac(){this.tc&&Q(47125,{hc:Kh(this.tc)})}verifyOperationInProgress(){}async Pc(){let e;do e=this._c,await e;while(e!==this._c)}Tc(e){for(const t of this.ec)if(t.timerId===e)return!0;return!1}Ic(e){return this.Pc().then(()=>{this.ec.sort((t,r)=>t.targetTimeMs-r.targetTimeMs);for(const t of this.ec)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Pc()})}dc(e){this.sc.push(e)}lc(e){const t=this.ec.indexOf(e);this.ec.splice(t,1)}}function Kh(n){let e=n.message||"";return n.stack&&(e=n.stack.includes(n.message)?n.stack:n.message+`
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
 */function Qh(n){return function(t,r){if(typeof t!="object"||t===null)return!1;const s=t;for(const i of r)if(i in s&&typeof s[i]=="function")return!0;return!1}(n,["next","error","complete"])}class lr extends Bo{constructor(e,t,r,s){super(e,t,r,s),this.type="firestore",this._queue=new Wh,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Wh(e),this._firestoreClient=void 0,await e}}}function SE(n,e){const t=typeof n=="object"?n:Kd(),r=typeof n=="string"?n:ao,s=ql(t,"firestore").getImmediate({identifier:r});if(!s._initialized){const i=r_("firestore");i&&AE(s,...i)}return s}function fc(n){if(n._terminated)throw new F(P.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||RE(n),n._firestoreClient}function RE(n){var e,t,r;const s=n._freezeSettings(),i=function(l,u,h,f){return new Y0(l,u,h,f.host,f.ssl,f.experimentalForceLongPolling,f.experimentalAutoDetectLongPolling,Ep(f.experimentalLongPollingOptions),f.useFetchStreams,f.isUsingEmulator)}(n._databaseId,((e=n._app)===null||e===void 0?void 0:e.options.appId)||"",n._persistenceKey,s);n._componentsProvider||!((t=s.localCache)===null||t===void 0)&&t._offlineComponentProvider&&(!((r=s.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(n._componentsProvider={_offline:s.localCache._offlineComponentProvider,_online:s.localCache._onlineComponentProvider}),n._firestoreClient=new wE(n._authCredentials,n._appCheckCredentials,n._queue,i,n._componentsProvider&&function(l){const u=l==null?void 0:l._online.build();return{_offline:l==null?void 0:l._offline.build(u),_online:u}}(n._componentsProvider))}/**
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
 */class mt{constructor(e){this._byteString=e}static fromBase64String(e){try{return new mt(We.fromBase64String(e))}catch(t){throw new F(P.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new mt(We.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:mt._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(ei(e,mt._jsonSchema))return mt.fromBase64String(e.bytes)}}mt._jsonSchemaVersion="firestore/bytes/1.0",mt._jsonSchema={type:Me("string",mt._jsonSchemaVersion),bytes:Me("string")};/**
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
 */class qo{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new F(P.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new He(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
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
 */class jo{constructor(e){this._methodName=e}}/**
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
 */class Mt{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new F(P.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new F(P.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return ee(this._lat,e._lat)||ee(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:Mt._jsonSchemaVersion}}static fromJSON(e){if(ei(e,Mt._jsonSchema))return new Mt(e.latitude,e.longitude)}}Mt._jsonSchemaVersion="firestore/geoPoint/1.0",Mt._jsonSchema={type:Me("string",Mt._jsonSchemaVersion),latitude:Me("number"),longitude:Me("number")};/**
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
 */class Lt{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,s){if(r.length!==s.length)return!1;for(let i=0;i<r.length;++i)if(r[i]!==s[i])return!1;return!0}(this._values,e._values)}toJSON(){return{type:Lt._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(ei(e,Lt._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(t=>typeof t=="number"))return new Lt(e.vectorValues);throw new F(P.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}Lt._jsonSchemaVersion="firestore/vectorValue/1.0",Lt._jsonSchema={type:Me("string",Lt._jsonSchemaVersion),vectorValues:Me("object")};/**
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
 */const kE=/^__.*__$/;class PE{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new Mn(e,this.data,this.fieldMask,t,this.fieldTransforms):new ti(e,this.data,t,this.fieldTransforms)}}class Tp{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return new Mn(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function Ip(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw Q(40011,{Ec:n})}}class pc{constructor(e,t,r,s,i,a){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=s,i===void 0&&this.Ac(),this.fieldTransforms=i||[],this.fieldMask=a||[]}get path(){return this.settings.path}get Ec(){return this.settings.Ec}Rc(e){return new pc(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Vc(e){var t;const r=(t=this.path)===null||t===void 0?void 0:t.child(e),s=this.Rc({path:r,mc:!1});return s.fc(e),s}gc(e){var t;const r=(t=this.path)===null||t===void 0?void 0:t.child(e),s=this.Rc({path:r,mc:!1});return s.Ac(),s}yc(e){return this.Rc({path:void 0,mc:!0})}wc(e){return go(e,this.settings.methodName,this.settings.Sc||!1,this.path,this.settings.bc)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}Ac(){if(this.path)for(let e=0;e<this.path.length;e++)this.fc(this.path.get(e))}fc(e){if(e.length===0)throw this.wc("Document fields must not be empty");if(Ip(this.Ec)&&kE.test(e))throw this.wc('Document fields cannot begin and end with "__"')}}class CE{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||Fo(e)}Dc(e,t,r,s=!1){return new pc({Ec:e,methodName:t,bc:r,path:He.emptyPath(),mc:!1,Sc:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function zo(n){const e=n._freezeSettings(),t=Fo(n._databaseId);return new CE(n._databaseId,!!e.ignoreUndefinedProperties,t)}function bp(n,e,t,r,s,i={}){const a=n.Dc(i.merge||i.mergeFields?2:0,e,t,s);gc("Data must be an object, but it was:",a,r);const l=Ap(r,a);let u,h;if(i.merge)u=new dt(a.fieldMask),h=a.fieldTransforms;else if(i.mergeFields){const f=[];for(const p of i.mergeFields){const g=bl(e,p,t);if(!a.contains(g))throw new F(P.INVALID_ARGUMENT,`Field '${g}' is specified in your field mask but missing from your input data.`);Rp(f,g)||f.push(g)}u=new dt(f),h=a.fieldTransforms.filter(p=>u.covers(p.field))}else u=null,h=a.fieldTransforms;return new PE(new ut(l),u,h)}class Ho extends jo{_toFieldTransform(e){if(e.Ec!==2)throw e.Ec===1?e.wc(`${this._methodName}() can only appear at the top level of your update data`):e.wc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof Ho}}class mc extends jo{_toFieldTransform(e){return new by(e.path,new zs)}isEqual(e){return e instanceof mc}}function VE(n,e,t,r){const s=n.Dc(1,e,t);gc("Data must be an object, but it was:",s,r);const i=[],a=ut.empty();On(r,(u,h)=>{const f=_c(e,u,t);h=Ge(h);const p=s.gc(f);if(h instanceof Ho)i.push(f);else{const g=ii(h,p);g!=null&&(i.push(f),a.set(f,g))}});const l=new dt(i);return new Tp(a,l,s.fieldTransforms)}function NE(n,e,t,r,s,i){const a=n.Dc(1,e,t),l=[bl(e,r,t)],u=[s];if(i.length%2!=0)throw new F(P.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let g=0;g<i.length;g+=2)l.push(bl(e,i[g])),u.push(i[g+1]);const h=[],f=ut.empty();for(let g=l.length-1;g>=0;--g)if(!Rp(h,l[g])){const S=l[g];let k=u[g];k=Ge(k);const V=a.gc(S);if(k instanceof Ho)h.push(S);else{const N=ii(k,V);N!=null&&(h.push(S),f.set(S,N))}}const p=new dt(h);return new Tp(f,p,a.fieldTransforms)}function xE(n,e,t,r=!1){return ii(t,n.Dc(r?4:3,e))}function ii(n,e){if(Sp(n=Ge(n)))return gc("Unsupported field value:",e,n),Ap(n,e);if(n instanceof jo)return function(r,s){if(!Ip(s.Ec))throw s.wc(`${r._methodName}() can only be used with update() and set()`);if(!s.path)throw s.wc(`${r._methodName}() is not currently supported inside arrays`);const i=r._toFieldTransform(s);i&&s.fieldTransforms.push(i)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.mc&&e.Ec!==4)throw e.wc("Nested arrays are not supported");return function(r,s){const i=[];let a=0;for(const l of r){let u=ii(l,s.yc(a));u==null&&(u={nullValue:"NULL_VALUE"}),i.push(u),a++}return{arrayValue:{values:i}}}(n,e)}return function(r,s){if((r=Ge(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return wy(s.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const i=Ie.fromDate(r);return{timestampValue:ho(s.serializer,i)}}if(r instanceof Ie){const i=new Ie(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:ho(s.serializer,i)}}if(r instanceof Mt)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof mt)return{bytesValue:qf(s.serializer,r._byteString)};if(r instanceof Ne){const i=s.databaseId,a=r.firestore._databaseId;if(!a.isEqual(i))throw s.wc(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:Zl(r.firestore._databaseId||s.databaseId,r._key.path)}}if(r instanceof Lt)return function(a,l){return{mapValue:{fields:{[gf]:{stringValue:_f},[lo]:{arrayValue:{values:a.toArray().map(h=>{if(typeof h!="number")throw l.wc("VectorValues must only contain numeric values.");return Jl(l.serializer,h)})}}}}}}(r,s);throw s.wc(`Unsupported field value: ${ko(r)}`)}(n,e)}function Ap(n,e){const t={};return uf(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):On(n,(r,s)=>{const i=ii(s,e.Vc(r));i!=null&&(t[r]=i)}),{mapValue:{fields:t}}}function Sp(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof Ie||n instanceof Mt||n instanceof mt||n instanceof Ne||n instanceof jo||n instanceof Lt)}function gc(n,e,t){if(!Sp(t)||!lf(t)){const r=ko(t);throw r==="an object"?e.wc(n+" a custom object"):e.wc(n+" "+r)}}function bl(n,e,t){if((e=Ge(e))instanceof qo)return e._internalPath;if(typeof e=="string")return _c(n,e);throw go("Field path arguments must be of type string or ",n,!1,void 0,t)}const DE=new RegExp("[~\\*/\\[\\]]");function _c(n,e,t){if(e.search(DE)>=0)throw go(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new qo(...e.split("."))._internalPath}catch{throw go(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function go(n,e,t,r,s){const i=r&&!r.isEmpty(),a=s!==void 0;let l=`Function ${e}() called with invalid data`;t&&(l+=" (via `toFirestore()`)"),l+=". ";let u="";return(i||a)&&(u+=" (found",i&&(u+=` in field ${r}`),a&&(u+=` in document ${s}`),u+=")"),new F(P.INVALID_ARGUMENT,l+n+u)}function Rp(n,e){return n.some(t=>t.isEqual(e))}/**
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
 */class kp{constructor(e,t,r,s,i){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new Ne(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new OE(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(yc("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class OE extends kp{data(){return super.data()}}function yc(n,e){return typeof e=="string"?_c(n,e):e instanceof qo?e._internalPath:e._delegate._internalPath}/**
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
 */function ME(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new F(P.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class vc{}class Pp extends vc{}function LE(n,e,...t){let r=[];e instanceof vc&&r.push(e),r=r.concat(t),function(i){const a=i.filter(u=>u instanceof wc).length,l=i.filter(u=>u instanceof Ec).length;if(a>1||a>0&&l>0)throw new F(P.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(const s of r)n=s._apply(n);return n}class Ec extends Pp{constructor(e,t,r){super(),this._field=e,this._op=t,this._value=r,this.type="where"}static _create(e,t,r){return new Ec(e,t,r)}_apply(e){const t=this._parse(e);return Cp(e._query,t),new dr(e.firestore,e.converter,dl(e._query,t))}_parse(e){const t=zo(e.firestore);return function(i,a,l,u,h,f,p){let g;if(h.isKeyField()){if(f==="array-contains"||f==="array-contains-any")throw new F(P.INVALID_ARGUMENT,`Invalid Query. You can't perform '${f}' queries on documentId().`);if(f==="in"||f==="not-in"){Xh(p,f);const k=[];for(const V of p)k.push(Jh(u,i,V));g={arrayValue:{values:k}}}else g=Jh(u,i,p)}else f!=="in"&&f!=="not-in"&&f!=="array-contains-any"||Xh(p,f),g=xE(l,a,p,f==="in"||f==="not-in");return Oe.create(h,f,g)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}class wc extends vc{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new wc(e,t)}_parse(e){const t=this._queryConstraints.map(r=>r._parse(e)).filter(r=>r.getFilters().length>0);return t.length===1?t[0]:At.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:(function(s,i){let a=s;const l=i.getFlattenedFilters();for(const u of l)Cp(a,u),a=dl(a,u)}(e._query,t),new dr(e.firestore,e.converter,dl(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class Tc extends Pp{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new Tc(e,t)}_apply(e){const t=function(s,i,a){if(s.startAt!==null)throw new F(P.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(s.endAt!==null)throw new F(P.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new js(i,a)}(e._query,this._field,this._direction);return new dr(e.firestore,e.converter,function(s,i){const a=s.explicitOrderBy.concat([i]);return new ts(s.path,s.collectionGroup,a,s.filters.slice(),s.limit,s.limitType,s.startAt,s.endAt)}(e._query,t))}}function FE(n,e="asc"){const t=e,r=yc("orderBy",n);return Tc._create(r,t)}function Jh(n,e,t){if(typeof(t=Ge(t))=="string"){if(t==="")throw new F(P.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Af(e)&&t.indexOf("/")!==-1)throw new F(P.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const r=e.path.child(Ee.fromString(t));if(!H.isDocumentKey(r))throw new F(P.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return dh(n,new H(r))}if(t instanceof Ne)return dh(n,t._key);throw new F(P.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${ko(t)}.`)}function Xh(n,e){if(!Array.isArray(n)||n.length===0)throw new F(P.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function Cp(n,e){const t=function(s,i){for(const a of s)for(const l of a.getFlattenedFilters())if(i.indexOf(l.op)>=0)return l.op;return null}(n.filters,function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(t!==null)throw t===e.op?new F(P.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new F(P.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}class UE{convertValue(e,t="none"){switch(Vn(e)){case 0:return null;case 1:return e.booleanValue;case 2:return xe(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(Cn(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw Q(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const r={};return On(e,(s,i)=>{r[s]=this.convertValue(i,t)}),r}convertVectorValue(e){var t,r,s;const i=(s=(r=(t=e.fields)===null||t===void 0?void 0:t[lo].arrayValue)===null||r===void 0?void 0:r.values)===null||s===void 0?void 0:s.map(a=>xe(a.doubleValue));return new Lt(i)}convertGeoPoint(e){return new Mt(xe(e.latitude),xe(e.longitude))}convertArray(e,t){return(e.values||[]).map(r=>this.convertValue(r,t))}convertServerTimestamp(e,t){switch(t){case"previous":const r=Vo(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp($s(e));default:return null}}convertTimestamp(e){const t=Pn(e);return new Ie(t.seconds,t.nanos)}convertDocumentKey(e,t){const r=Ee.fromString(e);he(Kf(r),9688,{name:e});const s=new Bs(r.get(1),r.get(3)),i=new H(r.popFirst(5));return s.isEqual(t)||Xt(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}/**
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
 */function Vp(n,e,t){let r;return r=n?n.toFirestore(e):e,r}class Rs{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class tr extends kp{constructor(e,t,r,s,i,a){super(e,t,r,s,a),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new Wi(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const r=this._document.data.field(yc("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new F(P.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=tr._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}}tr._jsonSchemaVersion="firestore/documentSnapshot/1.0",tr._jsonSchema={type:Me("string",tr._jsonSchemaVersion),bundleSource:Me("string","DocumentSnapshot"),bundleName:Me("string"),bundle:Me("string")};class Wi extends tr{data(e={}){return super.data(e)}}class xr{constructor(e,t,r,s){this._firestore=e,this._userDataWriter=t,this._snapshot=s,this.metadata=new Rs(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(r=>{e.call(t,new Wi(this._firestore,this._userDataWriter,r.key,r,new Rs(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new F(P.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(s,i){if(s._snapshot.oldDocs.isEmpty()){let a=0;return s._snapshot.docChanges.map(l=>{const u=new Wi(s._firestore,s._userDataWriter,l.doc.key,l.doc,new Rs(s._snapshot.mutatedKeys.has(l.doc.key),s._snapshot.fromCache),s.query.converter);return l.doc,{type:"added",doc:u,oldIndex:-1,newIndex:a++}})}{let a=s._snapshot.oldDocs;return s._snapshot.docChanges.filter(l=>i||l.type!==3).map(l=>{const u=new Wi(s._firestore,s._userDataWriter,l.doc.key,l.doc,new Rs(s._snapshot.mutatedKeys.has(l.doc.key),s._snapshot.fromCache),s.query.converter);let h=-1,f=-1;return l.type!==0&&(h=a.indexOf(l.doc.key),a=a.delete(l.doc.key)),l.type!==1&&(a=a.add(l.doc),f=a.indexOf(l.doc.key)),{type:$E(l.type),doc:u,oldIndex:h,newIndex:f}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new F(P.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=xr._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=zl.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],r=[],s=[];return this.docs.forEach(i=>{i._document!==null&&(t.push(i._document),r.push(this._userDataWriter.convertObjectMap(i._document.data.value.mapValue.fields,"previous")),s.push(i.ref.path))}),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function $E(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return Q(61501,{type:n})}}/**
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
 */function qa(n){n=Tt(n,Ne);const e=Tt(n.firestore,lr);return bE(fc(e),n._key).then(t=>xp(e,n,t))}xr._jsonSchemaVersion="firestore/querySnapshot/1.0",xr._jsonSchema={type:Me("string",xr._jsonSchemaVersion),bundleSource:Me("string","QuerySnapshot"),bundleName:Me("string"),bundle:Me("string")};class Np extends UE{constructor(e){super(),this.firestore=e}convertBytes(e){return new mt(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new Ne(this.firestore,null,t)}}function Yh(n,e,t){n=Tt(n,Ne);const r=Tt(n.firestore,lr),s=Vp(n.converter,e);return Ic(r,[bp(zo(r),"setDoc",n._key,s,n.converter!==null,t).toMutation(n._key,It.none())])}function BE(n,e,t,...r){n=Tt(n,Ne);const s=Tt(n.firestore,lr),i=zo(s);let a;return a=typeof(e=Ge(e))=="string"||e instanceof qo?NE(i,"updateDoc",n._key,e,t,r):VE(i,"updateDoc",n._key,e),Ic(s,[a.toMutation(n._key,It.exists(!0))])}function qE(n,e){const t=Tt(n.firestore,lr),r=Hn(n),s=Vp(n.converter,e);return Ic(t,[bp(zo(n.firestore),"addDoc",r._key,s,n.converter!==null,{}).toMutation(r._key,It.exists(!1))]).then(()=>r)}function ja(n,...e){var t,r,s;n=Ge(n);let i={includeMetadataChanges:!1,source:"default"},a=0;typeof e[a]!="object"||Qh(e[a])||(i=e[a++]);const l={includeMetadataChanges:i.includeMetadataChanges,source:i.source};if(Qh(e[a])){const p=e[a];e[a]=(t=p.next)===null||t===void 0?void 0:t.bind(p),e[a+1]=(r=p.error)===null||r===void 0?void 0:r.bind(p),e[a+2]=(s=p.complete)===null||s===void 0?void 0:s.bind(p)}let u,h,f;if(n instanceof Ne)h=Tt(n.firestore,lr),f=No(n._key.path),u={next:p=>{e[a]&&e[a](xp(h,n,p))},error:e[a+1],complete:e[a+2]};else{const p=Tt(n,dr);h=Tt(p.firestore,lr),f=p._query;const g=new Np(h);u={next:S=>{e[a]&&e[a](new xr(h,g,p,S))},error:e[a+1],complete:e[a+2]},ME(n._query)}return function(g,S,k,V){const N=new yp(V),W=new cp(S,N,k);return g.asyncQueue.enqueueAndForget(async()=>ap(await Il(g),W)),()=>{N.Ou(),g.asyncQueue.enqueueAndForget(async()=>lp(await Il(g),W))}}(fc(h),f,l,u)}function Ic(n,e){return function(r,s){const i=new vn;return r.asyncQueue.enqueueAndForget(async()=>dE(await IE(r),s,i)),i.promise}(fc(n),e)}function xp(n,e,t){const r=t.docs.get(e._key),s=new Np(n);return new tr(n,s,e._key,r,new Rs(t.hasPendingWrites,t.fromCache),e.converter)}function jE(){return new mc("serverTimestamp")}(function(e,t=!0){(function(s){Yr=s})(Xr),$r(new ir("firestore",(r,{instanceIdentifier:s,options:i})=>{const a=r.getProvider("app").getImmediate(),l=new lr(new D0(r.getProvider("auth-internal")),new L0(a,r.getProvider("app-check-internal")),function(h,f){if(!Object.prototype.hasOwnProperty.apply(h.options,["projectId"]))throw new F(P.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Bs(h.options.projectId,f)}(a,s),a);return i=Object.assign({useFetchStreams:t},i),l._setSettings(i),l},"PUBLIC").setMultipleInstances(!0)),_n(Yu,Zu,e),_n(Yu,Zu,"esm2017")})();var zE="firebase",HE="11.10.0";/**
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
 */_n(zE,HE,"app");function bc(n,e){var t={};for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&e.indexOf(r)<0&&(t[r]=n[r]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,r=Object.getOwnPropertySymbols(n);s<r.length;s++)e.indexOf(r[s])<0&&Object.prototype.propertyIsEnumerable.call(n,r[s])&&(t[r[s]]=n[r[s]]);return t}function Dp(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const GE=Dp,Op=new Ys("auth","Firebase",Dp());/**
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
 */const _o=new $l("@firebase/auth");function WE(n,...e){_o.logLevel<=ne.WARN&&_o.warn(`Auth (${Xr}): ${n}`,...e)}function Ki(n,...e){_o.logLevel<=ne.ERROR&&_o.error(`Auth (${Xr}): ${n}`,...e)}/**
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
 */function Zt(n,...e){throw Ac(n,...e)}function Ft(n,...e){return Ac(n,...e)}function Mp(n,e,t){const r=Object.assign(Object.assign({},GE()),{[e]:t});return new Ys("auth","Firebase",r).create(e,{appName:n.name})}function wn(n){return Mp(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Ac(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return Op.create(n,...e)}function X(n,e,...t){if(!n)throw Ac(e,...t)}function Gt(n){const e="INTERNAL ASSERTION FAILED: "+n;throw Ki(e),new Error(e)}function en(n,e){n||Gt(e)}/**
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
 */function Al(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.href)||""}function KE(){return Zh()==="http:"||Zh()==="https:"}function Zh(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}/**
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
 */function QE(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(KE()||h_()||"connection"in navigator)?navigator.onLine:!0}function JE(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
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
 */class oi{constructor(e,t){this.shortDelay=e,this.longDelay=t,en(t>e,"Short delay should be less than long delay!"),this.isMobile=l_()||d_()}get(){return QE()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */function Sc(n,e){en(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
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
 */class Lp{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Gt("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Gt("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Gt("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const XE={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
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
 */const YE=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],ZE=new oi(3e4,6e4);function Go(n,e){return n.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:n.tenantId}):e}async function rs(n,e,t,r,s={}){return Fp(n,s,async()=>{let i={},a={};r&&(e==="GET"?a=r:i={body:JSON.stringify(r)});const l=Zs(Object.assign({key:n.config.apiKey},a)).slice(1),u=await n._getAdditionalHeaders();u["Content-Type"]="application/json",n.languageCode&&(u["X-Firebase-Locale"]=n.languageCode);const h=Object.assign({method:e,headers:u},i);return u_()||(h.referrerPolicy="no-referrer"),n.emulatorConfig&&Jr(n.emulatorConfig.host)&&(h.credentials="include"),Lp.fetch()(await $p(n,n.config.apiHost,t,l),h)})}async function Fp(n,e,t){n._canInitEmulator=!1;const r=Object.assign(Object.assign({},XE),e);try{const s=new ew(n),i=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const a=await i.json();if("needConfirmation"in a)throw Mi(n,"account-exists-with-different-credential",a);if(i.ok&&!("errorMessage"in a))return a;{const l=i.ok?a.errorMessage:a.error.message,[u,h]=l.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw Mi(n,"credential-already-in-use",a);if(u==="EMAIL_EXISTS")throw Mi(n,"email-already-in-use",a);if(u==="USER_DISABLED")throw Mi(n,"user-disabled",a);const f=r[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(h)throw Mp(n,f,h);Zt(n,f)}}catch(s){if(s instanceof tn)throw s;Zt(n,"network-request-failed",{message:String(s)})}}async function Up(n,e,t,r,s={}){const i=await rs(n,e,t,r,s);return"mfaPendingCredential"in i&&Zt(n,"multi-factor-auth-required",{_serverResponse:i}),i}async function $p(n,e,t,r){const s=`${e}${t}?${r}`,i=n,a=i.config.emulator?Sc(n.config,s):`${n.config.apiScheme}://${s}`;return YE.includes(t)&&(await i._persistenceManagerAvailable,i._getPersistenceType()==="COOKIE")?i._getPersistence()._getFinalTarget(a).toString():a}class ew{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(Ft(this.auth,"network-request-failed")),ZE.get())})}}function Mi(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const s=Ft(n,e,r);return s.customData._tokenResponse=t,s}/**
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
 */async function tw(n,e){return rs(n,"POST","/v1/accounts:delete",e)}async function yo(n,e){return rs(n,"POST","/v1/accounts:lookup",e)}/**
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
 */function Ds(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function nw(n,e=!1){const t=Ge(n),r=await t.getIdToken(e),s=Rc(r);X(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,a=i==null?void 0:i.sign_in_provider;return{claims:s,token:r,authTime:Ds(za(s.auth_time)),issuedAtTime:Ds(za(s.iat)),expirationTime:Ds(za(s.exp)),signInProvider:a||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function za(n){return Number(n)*1e3}function Rc(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return Ki("JWT malformed, contained fewer than 3 sections"),null;try{const s=Ud(t);return s?JSON.parse(s):(Ki("Failed to decode base64 JWT payload"),null)}catch(s){return Ki("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function ed(n){const e=Rc(n);return X(e,"internal-error"),X(typeof e.exp<"u","internal-error"),X(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
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
 */async function Ws(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof tn&&rw(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function rw({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
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
 */class sw{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const s=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */class Sl{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Ds(this.lastLoginAt),this.creationTime=Ds(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function vo(n){var e;const t=n.auth,r=await n.getIdToken(),s=await Ws(n,yo(t,{idToken:r}));X(s==null?void 0:s.users.length,t,"internal-error");const i=s.users[0];n._notifyReloadListener(i);const a=!((e=i.providerUserInfo)===null||e===void 0)&&e.length?Bp(i.providerUserInfo):[],l=ow(n.providerData,a),u=n.isAnonymous,h=!(n.email&&i.passwordHash)&&!(l!=null&&l.length),f=u?h:!1,p={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:l,metadata:new Sl(i.createdAt,i.lastLoginAt),isAnonymous:f};Object.assign(n,p)}async function iw(n){const e=Ge(n);await vo(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function ow(n,e){return[...n.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function Bp(n){return n.map(e=>{var{providerId:t}=e,r=bc(e,["providerId"]);return{providerId:t,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
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
 */async function aw(n,e){const t=await Fp(n,{},async()=>{const r=Zs({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=n.config,a=await $p(n,s,"/v1/token",`key=${i}`),l=await n._getAdditionalHeaders();l["Content-Type"]="application/x-www-form-urlencoded";const u={method:"POST",headers:l,body:r};return n.emulatorConfig&&Jr(n.emulatorConfig.host)&&(u.credentials="include"),Lp.fetch()(a,u)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function lw(n,e){return rs(n,"POST","/v2/accounts:revokeToken",Go(n,e))}/**
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
 */class Dr{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){X(e.idToken,"internal-error"),X(typeof e.idToken<"u","internal-error"),X(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):ed(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){X(e.length!==0,"internal-error");const t=ed(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(X(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:s,expiresIn:i}=await aw(e,t);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:s,expirationTime:i}=t,a=new Dr;return r&&(X(typeof r=="string","internal-error",{appName:e}),a.refreshToken=r),s&&(X(typeof s=="string","internal-error",{appName:e}),a.accessToken=s),i&&(X(typeof i=="number","internal-error",{appName:e}),a.expirationTime=i),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Dr,this.toJSON())}_performRefresh(){return Gt("not implemented")}}/**
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
 */function an(n,e){X(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class wt{constructor(e){var{uid:t,auth:r,stsTokenManager:s}=e,i=bc(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new sw(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=r,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new Sl(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const t=await Ws(this,this.stsTokenManager.getToken(this.auth,e));return X(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return nw(this,e)}reload(){return iw(this)}_assign(e){this!==e&&(X(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new wt(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){X(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await vo(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Et(this.auth.app))return Promise.reject(wn(this.auth));const e=await this.getIdToken();return await Ws(this,tw(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var r,s,i,a,l,u,h,f;const p=(r=t.displayName)!==null&&r!==void 0?r:void 0,g=(s=t.email)!==null&&s!==void 0?s:void 0,S=(i=t.phoneNumber)!==null&&i!==void 0?i:void 0,k=(a=t.photoURL)!==null&&a!==void 0?a:void 0,V=(l=t.tenantId)!==null&&l!==void 0?l:void 0,N=(u=t._redirectEventId)!==null&&u!==void 0?u:void 0,W=(h=t.createdAt)!==null&&h!==void 0?h:void 0,B=(f=t.lastLoginAt)!==null&&f!==void 0?f:void 0,{uid:$,emailVerified:z,isAnonymous:ae,providerData:q,stsTokenManager:E}=t;X($&&E,e,"internal-error");const _=Dr.fromJSON(this.name,E);X(typeof $=="string",e,"internal-error"),an(p,e.name),an(g,e.name),X(typeof z=="boolean",e,"internal-error"),X(typeof ae=="boolean",e,"internal-error"),an(S,e.name),an(k,e.name),an(V,e.name),an(N,e.name),an(W,e.name),an(B,e.name);const y=new wt({uid:$,auth:e,email:g,emailVerified:z,displayName:p,isAnonymous:ae,photoURL:k,phoneNumber:S,tenantId:V,stsTokenManager:_,createdAt:W,lastLoginAt:B});return q&&Array.isArray(q)&&(y.providerData=q.map(w=>Object.assign({},w))),N&&(y._redirectEventId=N),y}static async _fromIdTokenResponse(e,t,r=!1){const s=new Dr;s.updateFromServerResponse(t);const i=new wt({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await vo(i),i}static async _fromGetAccountInfoResponse(e,t,r){const s=t.users[0];X(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?Bp(s.providerUserInfo):[],a=!(s.email&&s.passwordHash)&&!(i!=null&&i.length),l=new Dr;l.updateFromIdToken(r);const u=new wt({uid:s.localId,auth:e,stsTokenManager:l,isAnonymous:a}),h={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new Sl(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(i!=null&&i.length)};return Object.assign(u,h),u}}/**
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
 */const td=new Map;function Wt(n){en(n instanceof Function,"Expected a class definition");let e=td.get(n);return e?(en(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,td.set(n,e),e)}/**
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
 */class qp{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}qp.type="NONE";const nd=qp;/**
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
 */function Qi(n,e,t){return`firebase:${n}:${e}:${t}`}class Or{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=Qi(this.userKey,s.apiKey,i),this.fullPersistenceKey=Qi("persistence",s.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await yo(this.auth,{idToken:e}).catch(()=>{});return t?wt._fromGetAccountInfoResponse(this.auth,t,e):null}return wt._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new Or(Wt(nd),e,r);const s=(await Promise.all(t.map(async h=>{if(await h._isAvailable())return h}))).filter(h=>h);let i=s[0]||Wt(nd);const a=Qi(r,e.config.apiKey,e.name);let l=null;for(const h of t)try{const f=await h._get(a);if(f){let p;if(typeof f=="string"){const g=await yo(e,{idToken:f}).catch(()=>{});if(!g)break;p=await wt._fromGetAccountInfoResponse(e,g,f)}else p=wt._fromJSON(e,f);h!==i&&(l=p),i=h;break}}catch{}const u=s.filter(h=>h._shouldAllowMigration);return!i._shouldAllowMigration||!u.length?new Or(i,e,r):(i=u[0],l&&await i._set(a,l.toJSON()),await Promise.all(t.map(async h=>{if(h!==i)try{await h._remove(a)}catch{}})),new Or(i,e,r))}}/**
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
 */function rd(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Gp(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(jp(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Kp(e))return"Blackberry";if(Qp(e))return"Webos";if(zp(e))return"Safari";if((e.includes("chrome/")||Hp(e))&&!e.includes("edge/"))return"Chrome";if(Wp(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function jp(n=tt()){return/firefox\//i.test(n)}function zp(n=tt()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Hp(n=tt()){return/crios\//i.test(n)}function Gp(n=tt()){return/iemobile/i.test(n)}function Wp(n=tt()){return/android/i.test(n)}function Kp(n=tt()){return/blackberry/i.test(n)}function Qp(n=tt()){return/webos/i.test(n)}function kc(n=tt()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function cw(n=tt()){var e;return kc(n)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function uw(){return f_()&&document.documentMode===10}function Jp(n=tt()){return kc(n)||Wp(n)||Qp(n)||Kp(n)||/windows phone/i.test(n)||Gp(n)}/**
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
 */function Xp(n,e=[]){let t;switch(n){case"Browser":t=rd(tt());break;case"Worker":t=`${rd(tt())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${Xr}/${r}`}/**
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
 */class hw{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=i=>new Promise((a,l)=>{try{const u=e(i);a(u)}catch(u){l(u)}});r.onAbort=t,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
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
 */async function dw(n,e={}){return rs(n,"GET","/v2/passwordPolicy",Go(n,e))}/**
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
 */const fw=6;class pw{constructor(e){var t,r,s,i;const a=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=a.minPasswordLength)!==null&&t!==void 0?t:fw,a.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=a.maxPasswordLength),a.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=a.containsLowercaseCharacter),a.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=a.containsUppercaseCharacter),a.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=a.containsNumericCharacter),a.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=a.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(s=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&s!==void 0?s:"",this.forceUpgradeOnSignin=(i=e.forceUpgradeOnSignin)!==null&&i!==void 0?i:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,r,s,i,a,l;const u={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,u),this.validatePasswordCharacterOptions(e,u),u.isValid&&(u.isValid=(t=u.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),u.isValid&&(u.isValid=(r=u.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),u.isValid&&(u.isValid=(s=u.containsLowercaseLetter)!==null&&s!==void 0?s:!0),u.isValid&&(u.isValid=(i=u.containsUppercaseLetter)!==null&&i!==void 0?i:!0),u.isValid&&(u.isValid=(a=u.containsNumericCharacter)!==null&&a!==void 0?a:!0),u.isValid&&(u.isValid=(l=u.containsNonAlphanumericCharacter)!==null&&l!==void 0?l:!0),u}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
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
 */class mw{constructor(e,t,r,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new sd(this),this.idTokenSubscription=new sd(this),this.beforeStateQueue=new hw(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Op,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(i=>this._resolvePersistenceManagerAvailable=i)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=Wt(t)),this._initializationPromise=this.queue(async()=>{var r,s,i;if(!this._deleted&&(this.persistenceManager=await Or.create(this,e),(r=this._resolvePersistenceManagerAvailable)===null||r===void 0||r.call(this),!this._deleted)){if(!((s=this._popupRedirectResolver)===null||s===void 0)&&s._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((i=this.currentUser)===null||i===void 0?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await yo(this,{idToken:e}),r=await wt._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(Et(this.app)){const a=this.app.settings.authIdToken;return a?new Promise(l=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(a).then(l,l))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let s=r,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const a=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,l=s==null?void 0:s._redirectEventId,u=await this.tryRedirectSignIn(e);(!a||a===l)&&(u!=null&&u.user)&&(s=u.user,i=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(s)}catch(a){s=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(a))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return X(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await vo(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=JE()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Et(this.app))return Promise.reject(wn(this));const t=e?Ge(e):null;return t&&X(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&X(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Et(this.app)?Promise.reject(wn(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Et(this.app)?Promise.reject(wn(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Wt(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await dw(this),t=new pw(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new Ys("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await lw(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&Wt(e)||this._popupRedirectResolver;X(t,this,"argument-error"),this.redirectPersistenceManager=await Or.create(this,[Wt(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,s){if(this._deleted)return()=>{};const i=typeof t=="function"?t:t.next.bind(t);let a=!1;const l=this._isInitialized?Promise.resolve():this._initializationPromise;if(X(l,this,"internal-error"),l.then(()=>{a||i(this.currentUser)}),typeof t=="function"){const u=e.addObserver(t,r,s);return()=>{a=!0,u()}}else{const u=e.addObserver(t);return()=>{a=!0,u()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return X(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Xp(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(t["X-Firebase-Client"]=r);const s=await this._getAppCheckToken();return s&&(t["X-Firebase-AppCheck"]=s),t}async _getAppCheckToken(){var e;if(Et(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t!=null&&t.error&&WE(`Error while retrieving App Check token: ${t.error}`),t==null?void 0:t.token}}function Wo(n){return Ge(n)}class sd{constructor(e){this.auth=e,this.observer=null,this.addObserver=w_(t=>this.observer=t)}get next(){return X(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
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
 */let Pc={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function gw(n){Pc=n}function _w(n){return Pc.loadJS(n)}function yw(){return Pc.gapiScript}function vw(n){return`__${n}${Math.floor(Math.random()*1e6)}`}/**
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
 */function Ew(n,e){const t=ql(n,"auth");if(t.isInitialized()){const s=t.getImmediate(),i=t.getOptions();if(sr(i,e??{}))return s;Zt(s,"already-initialized")}return t.initialize({options:e})}function ww(n,e){const t=(e==null?void 0:e.persistence)||[],r=(Array.isArray(t)?t:[t]).map(Wt);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function Tw(n,e,t){const r=Wo(n);X(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!1,i=Yp(e),{host:a,port:l}=Iw(e),u=l===null?"":`:${l}`,h={url:`${i}//${a}${u}/`},f=Object.freeze({host:a,port:l,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!r._canInitEmulator){X(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),X(sr(h,r.config.emulator)&&sr(f,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=h,r.emulatorConfig=f,r.settings.appVerificationDisabledForTesting=!0,Jr(a)?(jd(`${i}//${a}${u}`),zd("Auth",!0)):bw()}function Yp(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function Iw(n){const e=Yp(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:id(r.substr(i.length+1))}}else{const[i,a]=r.split(":");return{host:i,port:id(a)}}}function id(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function bw(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
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
 */class Zp{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return Gt("not implemented")}_getIdTokenResponse(e){return Gt("not implemented")}_linkToIdToken(e,t){return Gt("not implemented")}_getReauthenticationResolver(e){return Gt("not implemented")}}/**
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
 */async function Mr(n,e){return Up(n,"POST","/v1/accounts:signInWithIdp",Go(n,e))}/**
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
 */const Aw="http://localhost";class cr extends Zp{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new cr(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):Zt("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s}=t,i=bc(t,["providerId","signInMethod"]);if(!r||!s)return null;const a=new cr(r,s);return a.idToken=i.idToken||void 0,a.accessToken=i.accessToken||void 0,a.secret=i.secret,a.nonce=i.nonce,a.pendingToken=i.pendingToken||null,a}_getIdTokenResponse(e){const t=this.buildRequest();return Mr(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,Mr(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Mr(e,t)}buildRequest(){const e={requestUri:Aw,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=Zs(t)}return e}}/**
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
 */class ai extends em{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
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
 */class cn extends ai{constructor(){super("facebook.com")}static credential(e){return cr._fromParams({providerId:cn.PROVIDER_ID,signInMethod:cn.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return cn.credentialFromTaggedObject(e)}static credentialFromError(e){return cn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return cn.credential(e.oauthAccessToken)}catch{return null}}}cn.FACEBOOK_SIGN_IN_METHOD="facebook.com";cn.PROVIDER_ID="facebook.com";/**
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
 */class un extends ai{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return cr._fromParams({providerId:un.PROVIDER_ID,signInMethod:un.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return un.credentialFromTaggedObject(e)}static credentialFromError(e){return un.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return un.credential(t,r)}catch{return null}}}un.GOOGLE_SIGN_IN_METHOD="google.com";un.PROVIDER_ID="google.com";/**
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
 */class hn extends ai{constructor(){super("github.com")}static credential(e){return cr._fromParams({providerId:hn.PROVIDER_ID,signInMethod:hn.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return hn.credentialFromTaggedObject(e)}static credentialFromError(e){return hn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return hn.credential(e.oauthAccessToken)}catch{return null}}}hn.GITHUB_SIGN_IN_METHOD="github.com";hn.PROVIDER_ID="github.com";/**
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
 */class dn extends ai{constructor(){super("twitter.com")}static credential(e,t){return cr._fromParams({providerId:dn.PROVIDER_ID,signInMethod:dn.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return dn.credentialFromTaggedObject(e)}static credentialFromError(e){return dn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return dn.credential(t,r)}catch{return null}}}dn.TWITTER_SIGN_IN_METHOD="twitter.com";dn.PROVIDER_ID="twitter.com";/**
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
 */async function Sw(n,e){return Up(n,"POST","/v1/accounts:signUp",Go(n,e))}/**
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
 */class Dn{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,s=!1){const i=await wt._fromIdTokenResponse(e,r,s),a=od(r);return new Dn({user:i,providerId:a,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const s=od(r);return new Dn({user:e,providerId:s,_tokenResponse:r,operationType:t})}}function od(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
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
 */async function Rw(n){var e;if(Et(n.app))return Promise.reject(wn(n));const t=Wo(n);if(await t._initializationPromise,!((e=t.currentUser)===null||e===void 0)&&e.isAnonymous)return new Dn({user:t.currentUser,providerId:null,operationType:"signIn"});const r=await Sw(t,{returnSecureToken:!0}),s=await Dn._fromIdTokenResponse(t,"signIn",r,!0);return await t._updateCurrentUser(s.user),s}/**
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
 */class Eo extends tn{constructor(e,t,r,s){var i;super(t.code,t.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,Eo.prototype),this.customData={appName:e.name,tenantId:(i=e.tenantId)!==null&&i!==void 0?i:void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,s){return new Eo(e,t,r,s)}}function tm(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?Eo._fromErrorAndOperation(n,i,e,r):i})}async function kw(n,e,t=!1){const r=await Ws(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return Dn._forOperation(n,"link",r)}/**
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
 */async function Pw(n,e,t=!1){const{auth:r}=n;if(Et(r.app))return Promise.reject(wn(r));const s="reauthenticate";try{const i=await Ws(n,tm(r,s,e,n),t);X(i.idToken,r,"internal-error");const a=Rc(i.idToken);X(a,r,"internal-error");const{sub:l}=a;return X(n.uid===l,r,"user-mismatch"),Dn._forOperation(n,s,i)}catch(i){throw(i==null?void 0:i.code)==="auth/user-not-found"&&Zt(r,"user-mismatch"),i}}/**
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
 */async function Cw(n,e,t=!1){if(Et(n.app))return Promise.reject(wn(n));const r="signIn",s=await tm(n,r,e),i=await Dn._fromIdTokenResponse(n,r,s);return t||await n._updateCurrentUser(i.user),i}function Vw(n,e,t,r){return Ge(n).onIdTokenChanged(e,t,r)}function Nw(n,e,t){return Ge(n).beforeAuthStateChanged(e,t)}function xw(n,e,t,r){return Ge(n).onAuthStateChanged(e,t,r)}const wo="__sak";/**
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
 */class nm{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(wo,"1"),this.storage.removeItem(wo),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
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
 */const Dw=1e3,Ow=10;class rm extends nm{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Jp(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),s=this.localCache[t];r!==s&&e(t,s,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((a,l,u)=>{this.notifyListeners(a,u)});return}const r=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const a=this.storage.getItem(r);!t&&this.localCache[r]===a||this.notifyListeners(r,a)},i=this.storage.getItem(r);uw()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,Ow):s()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},Dw)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}rm.type="LOCAL";const Mw=rm;/**
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
 */function Lw(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
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
 */class Ko{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const r=new Ko(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:s,data:i}=t.data,a=this.handlersMap[s];if(!(a!=null&&a.size))return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const l=Array.from(a).map(async h=>h(t.origin,i)),u=await Lw(l);t.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:u})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Ko.receivers=[];/**
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
 */function Cc(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
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
 */class Fw{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,a;return new Promise((l,u)=>{const h=Cc("",20);s.port1.start();const f=setTimeout(()=>{u(new Error("unsupported_event"))},r);a={messageChannel:s,onMessage(p){const g=p;if(g.data.eventId===h)switch(g.data.status){case"ack":clearTimeout(f),i=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),l(g.data.response);break;default:clearTimeout(f),clearTimeout(i),u(new Error("invalid_response"));break}}},this.handlers.add(a),s.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:e,eventId:h,data:t},[s.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}}/**
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
 */function Ut(){return window}function Uw(n){Ut().location.href=n}/**
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
 */function om(){return typeof Ut().WorkerGlobalScope<"u"&&typeof Ut().importScripts=="function"}async function $w(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Bw(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)===null||n===void 0?void 0:n.controller)||null}function qw(){return om()?self:null}/**
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
 */const am="firebaseLocalStorageDb",jw=1,To="firebaseLocalStorage",lm="fbase_key";class li{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function Qo(n,e){return n.transaction([To],e?"readwrite":"readonly").objectStore(To)}function zw(){const n=indexedDB.deleteDatabase(am);return new li(n).toPromise()}function Rl(){const n=indexedDB.open(am,jw);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(To,{keyPath:lm})}catch(s){t(s)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(To)?e(r):(r.close(),await zw(),e(await Rl()))})})}async function ad(n,e,t){const r=Qo(n,!0).put({[lm]:e,value:t});return new li(r).toPromise()}async function Hw(n,e){const t=Qo(n,!1).get(e),r=await new li(t).toPromise();return r===void 0?null:r.value}function ld(n,e){const t=Qo(n,!0).delete(e);return new li(t).toPromise()}const Gw=800,Ww=3;class cm{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Rl(),this.db)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>Ww)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return om()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Ko._getInstance(qw()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await $w(),!this.activeServiceWorker)return;this.sender=new Fw(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((t=r[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Bw()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Rl();return await ad(e,wo,"1"),await ld(e,wo),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>ad(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>Hw(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>ld(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=Qo(s,!1).getAll();return new li(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Gw)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}cm.type="LOCAL";const Kw=cm;new oi(3e4,6e4);/**
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
 */function Qw(n,e){return e?Wt(e):(X(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
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
 */class Vc extends Zp{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Mr(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Mr(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Mr(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function Jw(n){return Cw(n.auth,new Vc(n),n.bypassAuthState)}function Xw(n){const{auth:e,user:t}=n;return X(t,e,"internal-error"),Pw(t,new Vc(n),n.bypassAuthState)}async function Yw(n){const{auth:e,user:t}=n;return X(t,e,"internal-error"),kw(t,new Vc(n),n.bypassAuthState)}/**
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
 */class um{constructor(e,t,r,s,i=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:s,tenantId:i,error:a,type:l}=e;if(a){this.reject(a);return}const u={auth:this.auth,requestUri:t,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(l)(u))}catch(h){this.reject(h)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Jw;case"linkViaPopup":case"linkViaRedirect":return Yw;case"reauthViaPopup":case"reauthViaRedirect":return Xw;default:Zt(this.auth,"internal-error")}}resolve(e){en(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){en(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
 */const Zw=new oi(2e3,1e4);class kr extends um{constructor(e,t,r,s,i){super(e,t,s,i),this.provider=r,this.authWindow=null,this.pollId=null,kr.currentPopupAction&&kr.currentPopupAction.cancel(),kr.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return X(e,this.auth,"internal-error"),e}async onExecution(){en(this.filter.length===1,"Popup operations only handle one event");const e=Cc();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(Ft(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(Ft(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,kr.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,r;if(!((r=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Ft(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,Zw.get())};e()}}kr.currentPopupAction=null;/**
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
 */const eT="pendingRedirect",Ji=new Map;class tT extends um{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=Ji.get(this.auth._key());if(!e){try{const r=await nT(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}Ji.set(this.auth._key(),e)}return this.bypassAuthState||Ji.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function nT(n,e){const t=iT(e),r=sT(n);if(!await r._isAvailable())return!1;const s=await r._get(t)==="true";return await r._remove(t),s}function rT(n,e){Ji.set(n._key(),e)}function sT(n){return Wt(n._redirectPersistence)}function iT(n){return Qi(eT,n.config.apiKey,n.name)}async function oT(n,e,t=!1){if(Et(n.app))return Promise.reject(wn(n));const r=Wo(n),s=Qw(r,e),a=await new tT(r,s,t).execute();return a&&!t&&(delete a.user._redirectEventId,await r._persistUserIfCurrent(a.user),await r._setRedirectUser(null,e)),a}/**
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
 */const aT=10*60*1e3;class lT{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!cT(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!hm(e)){const s=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";t.onError(Ft(this.auth,s))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=aT&&this.cachedEventUids.clear(),this.cachedEventUids.has(cd(e))}saveEventToCache(e){this.cachedEventUids.add(cd(e)),this.lastProcessedEventTime=Date.now()}}function cd(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function hm({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function cT(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return hm(n);default:return!1}}/**
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
 */async function uT(n,e={}){return rs(n,"GET","/v1/projects",e)}/**
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
 */const hT=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,dT=/^https?/;async function fT(n){if(n.config.emulator)return;const{authorizedDomains:e}=await uT(n);for(const t of e)try{if(pT(t))return}catch{}Zt(n,"unauthorized-domain")}function pT(n){const e=Al(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const a=new URL(n);return a.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&a.hostname===r}if(!dT.test(t))return!1;if(hT.test(n))return r===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
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
 */const mT=new oi(3e4,6e4);function ud(){const n=Ut().___jsl;if(n!=null&&n.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function gT(n){return new Promise((e,t)=>{var r,s,i;function a(){ud(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{ud(),t(Ft(n,"network-request-failed"))},timeout:mT.get()})}if(!((s=(r=Ut().gapi)===null||r===void 0?void 0:r.iframes)===null||s===void 0)&&s.Iframe)e(gapi.iframes.getContext());else if(!((i=Ut().gapi)===null||i===void 0)&&i.load)a();else{const l=vw("iframefcb");return Ut()[l]=()=>{gapi.load?a():t(Ft(n,"network-request-failed"))},_w(`${yw()}?onload=${l}`).catch(u=>t(u))}}).catch(e=>{throw Xi=null,e})}let Xi=null;function _T(n){return Xi=Xi||gT(n),Xi}/**
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
 */const yT=new oi(5e3,15e3),vT="__/auth/iframe",ET="emulator/auth/iframe",wT={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},TT=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function IT(n){const e=n.config;X(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?Sc(e,ET):`https://${n.config.authDomain}/${vT}`,r={apiKey:e.apiKey,appName:n.name,v:Xr},s=TT.get(n.config.apiHost);s&&(r.eid=s);const i=n._getFrameworks();return i.length&&(r.fw=i.join(",")),`${t}?${Zs(r).slice(1)}`}async function bT(n){const e=await _T(n),t=Ut().gapi;return X(t,n,"internal-error"),e.open({where:document.body,url:IT(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:wT,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const a=Ft(n,"network-request-failed"),l=Ut().setTimeout(()=>{i(a)},yT.get());function u(){Ut().clearTimeout(l),s(r)}r.ping(u).then(u,()=>{i(a)})}))}/**
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
 */const AT={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},ST=500,RT=600,kT="_blank",PT="http://localhost";class hd{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function CT(n,e,t,r=ST,s=RT){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),a=Math.max((window.screen.availWidth-r)/2,0).toString();let l="";const u=Object.assign(Object.assign({},AT),{width:r.toString(),height:s.toString(),top:i,left:a}),h=tt().toLowerCase();t&&(l=Hp(h)?kT:t),jp(h)&&(e=e||PT,u.scrollbars="yes");const f=Object.entries(u).reduce((g,[S,k])=>`${g}${S}=${k},`,"");if(cw(h)&&l!=="_self")return VT(e||"",l),new hd(null);const p=window.open(e||"",l,f);X(p,n,"popup-blocked");try{p.focus()}catch{}return new hd(p)}function VT(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
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
 */const NT="__/auth/handler",xT="emulator/auth/handler",DT=encodeURIComponent("fac");async function dd(n,e,t,r,s,i){X(n.config.authDomain,n,"auth-domain-config-required"),X(n.config.apiKey,n,"invalid-api-key");const a={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:Xr,eventId:s};if(e instanceof em){e.setDefaultLanguage(n.languageCode),a.providerId=e.providerId||"",E_(e.getCustomParameters())||(a.customParameters=JSON.stringify(e.getCustomParameters()));for(const[f,p]of Object.entries({}))a[f]=p}if(e instanceof ai){const f=e.getScopes().filter(p=>p!=="");f.length>0&&(a.scopes=f.join(","))}n.tenantId&&(a.tid=n.tenantId);const l=a;for(const f of Object.keys(l))l[f]===void 0&&delete l[f];const u=await n._getAppCheckToken(),h=u?`#${DT}=${encodeURIComponent(u)}`:"";return`${OT(n)}?${Zs(l).slice(1)}${h}`}function OT({config:n}){return n.emulator?Sc(n,xT):`https://${n.authDomain}/${NT}`}/**
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
 */const Ha="webStorageSupport";class MT{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=im,this._completeRedirectFn=oT,this._overrideRedirectResult=rT}async _openPopup(e,t,r,s){var i;en((i=this.eventManagers[e._key()])===null||i===void 0?void 0:i.manager,"_initialize() not called before _openPopup()");const a=await dd(e,t,r,Al(),s);return CT(e,a,Cc())}async _openRedirect(e,t,r,s){await this._originValidation(e);const i=await dd(e,t,r,Al(),s);return Uw(i),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:i}=this.eventManagers[t];return s?Promise.resolve(s):(en(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await bT(e),r=new lT(e);return t.register("authEvent",s=>(X(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Ha,{type:Ha},s=>{var i;const a=(i=s==null?void 0:s[0])===null||i===void 0?void 0:i[Ha];a!==void 0&&t(!!a),Zt(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=fT(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Jp()||zp()||kc()}}const LT=MT;var fd="@firebase/auth",pd="1.10.8";/**
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
 */class FT{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){X(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function UT(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function $T(n){$r(new ir("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:a,authDomain:l}=r.options;X(a&&!a.includes(":"),"invalid-api-key",{appName:r.name});const u={apiKey:a,authDomain:l,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Xp(n)},h=new mw(r,s,i,u);return ww(h,t),h},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),$r(new ir("auth-internal",e=>{const t=Wo(e.getProvider("auth").getImmediate());return(r=>new FT(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),_n(fd,pd,UT(n)),_n(fd,pd,"esm2017")}/**
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
 */const BT=5*60,qT=qd("authIdTokenMaxAge")||BT;let md=null;const jT=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>qT)return;const s=t==null?void 0:t.token;md!==s&&(md=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function zT(n=Kd()){const e=ql(n,"auth");if(e.isInitialized())return e.getImmediate();const t=Ew(n,{popupRedirectResolver:LT,persistence:[Kw,Mw,im]}),r=qd("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(r,location.origin);if(location.origin===i.origin){const a=jT(i.toString());Nw(t,a,()=>a(t.currentUser)),Vw(t,l=>a(l))}}const s=$d("auth");return s&&Tw(t,`http://${s}`),t}function HT(){var n,e;return(e=(n=document.getElementsByTagName("head"))===null||n===void 0?void 0:n[0])!==null&&e!==void 0?e:document}gw({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=s=>{const i=Ft("internal-error");i.customData=s,t(i)},r.type="text/javascript",r.charset="UTF-8",HT().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});$T("Browser");const dm={apiKey:"AIzaSyAsw466_wzsiLtbjw6FXZ1_O3HQ_AkVyU8",authDomain:"album-apexora.firebaseapp.com",projectId:"album-apexora",appId:"1:17231648284:web:20edb8477453f50473f1d9"},kl=!Object.values(dm).some(n=>n.startsWith("PEGA")),fm=Wd(dm),jn=SE(fm),gd=zT(fm);function Ga(){return new Promise((n,e)=>{const t=xw(gd,r=>{t(),r?n(r):Rw(gd).then(s=>n(s.user),e)})})}function ln(n){const e=n,t=String((e==null?void 0:e.code)??"");return kl?t.includes("operation-not-allowed")||t.includes("admin-restricted")?"Activa el acceso Anónimo en Firebase → Authentication → Sign-in method.":t.includes("api-key")||t.includes("invalid-app")?"La firebaseConfig de src/net/firebase.ts no es válida.":t.includes("permission-denied")?"Firebase rechazó la operación (¿sala llena, ya empezada o reglas sin publicar?).":t.includes("unavailable")||t.includes("network")?"Sin conexión con Firebase.":(e==null?void 0:e.message)??"Error de conexión":"Falta pegar tu firebaseConfig en src/net/firebase.ts"}const GT=n=>Dd([Ms.Luminarae,Ms.Umbra],n);function Pl(n,e){if(e===0)return n;const t=r=>1-r;return{...n,p:[n.p[1],n.p[0]],token:t(n.token),active:t(n.active),winner:n.winner===null||n.winner===-1?n.winner:t(n.winner),tok:[n.tok[1],n.tok[0]],mull:[n.mull[1],n.mull[0]],stack:n.stack.map(r=>({...r,owner:t(r.owner)}))}}function pm(n,e,t){return!t||typeof t.type!="string"?!1:t.type==="mulligan"?n.phase==="mulligan"&&t.player===e&&!n.mull[e]:n.phase!=="mulligan"&&n.active===e}function mm(n,e,t){if(e===-1||!pm(n,e,t))return n;try{return Ls(n,t)}catch{return n}}const WT=(n,e)=>n.type==="mulligan"?{...n,player:e}:n,KT=n=>n.type==="mulligan"?{...n,player:0}:n,_d="ABCDEFGHJKLMNPQRSTUVWXYZ23456789",QT=()=>Array.from({length:4},()=>_d[Math.floor(Math.random()*_d.length)]).join(""),Wa="tcgRoom";class Tn{constructor(e){$e(this,"code","");$e(this,"seat",0);$e(this,"uid","");$e(this,"g");$e(this,"host","");$e(this,"guest","");$e(this,"seed",0);$e(this,"applied",0);$e(this,"sending",!1);$e(this,"sentAt",-1);$e(this,"unsubs",[]);$e(this,"chatSeen",new Set);$e(this,"ready",!1);$e(this,"pulled",!1);$e(this,"waiters",[]);this.h=e}static savedCode(){try{return localStorage.getItem(Wa)}catch{return null}}save(){try{localStorage.setItem(Wa,this.code)}catch{}}static clearSaved(){try{localStorage.removeItem(Wa)}catch{}}async create(){if(!kl)throw new Error(ln(null));try{const e=await Ga();this.uid=e.uid,this.seat=0,this.seed=Math.floor(Math.random()*2**31);for(let t=0;t<8;t++){const r=QT();if(!(await qa(Hn(jn,"tcgGames",r))).exists())return await Yh(Hn(jn,"tcgGames",r),{host:e.uid,guest:null,seed:this.seed,status:"waiting",createdAt:jE()}),this.code=r,this.save(),this.h.onStatus(`Sala ${r}: esperando rival…`),this.listen(),r}}catch(e){throw new Error(ln(e))}throw new Error("No se pudo crear la sala, inténtalo de nuevo")}async join(e){var r,s;if(!kl)throw new Error(ln(null));const t=e.trim().toUpperCase();if(t.length!==4)throw new Error("El código tiene 4 caracteres");try{const i=await Ga();this.uid=i.uid;const a=Hn(jn,"tcgGames",t),l=await qa(a);if(!l.exists())throw new Error("Esa sala no existe");const u=l.data();if(u.host===i.uid)this.seat=0;else if(u.guest===i.uid)this.seat=1;else{if(u.guest)throw new Error("La sala ya está llena");await BE(a,{guest:i.uid,status:"playing"}),this.seat=1}this.code=t,this.save(),this.listen()}catch(i){throw new Error((r=i.message)!=null&&r.startsWith("Esa sala")||(s=i.message)!=null&&s.startsWith("La sala")?i.message:ln(i))}}async resume(e){try{const t=await Ga(),r=await qa(Hn(jn,"tcgGames",e.trim().toUpperCase())),s=r.data();if(!r.exists()||(s==null?void 0:s.status)!=="playing"||s.host!==t.uid&&s.guest!==t.uid)throw Tn.clearSaved(),new Error("Sala no disponible")}catch(t){throw Tn.clearSaved(),t}await this.join(e)}listen(){const e=Hn(jn,"tcgGames",this.code);this.unsubs.push(ja(e,t=>{const r=t.data();r&&(this.host=r.host,this.guest=r.guest??"",this.seed=r.seed,r.status==="playing"&&this.guest&&!this.ready&&(this.ready=!0,this.g=GT(this.seed),this.applied=0,this.pulled=!1,this.h.onReady(),this.h.onStatus(`Sala ${this.code}: ¡partida en marcha!`),this.unsubs.push(ja(LE(Ba(e,"chat"),FE("t")),s=>s.docChanges().forEach(i=>{var l,u;if(i.type!=="added"||this.chatSeen.has(i.doc.id))return;this.chatSeen.add(i.doc.id);const a=i.doc.data();(u=(l=this.h).onChat)==null||u.call(l,{id:i.doc.id,mine:a.by===this.uid,text:String(a.text??"")})}),s=>this.h.onStatus("Chat: "+ln(s)))),this.unsubs.push(ja(Ba(e,"moves"),{includeMetadataChanges:!0},s=>this.pull(s.docs),s=>this.h.onStatus(ln(s))))))},t=>this.h.onStatus(ln(t))))}pull(e){const t=new Map;for(const l of e)l.metadata.hasPendingWrites||t.set(Number(l.id),l.data());const r=!this.pulled;this.pulled=!0;const s=[],i=this.applied;let a=!1;for(;t.has(this.applied);){const l=this.applied,u=t.get(l),h=u.by===this.host?0:u.by===this.guest?1:-1,f=this.g,p=mm(f,h,u.action);p!==f&&h!==-1&&s.push({before:f,action:u.action,seat:h}),this.g=p,this.applied++,this.sending&&u.by===this.uid&&l===this.sentAt&&(this.sending=!1,a=!0)}this.applied===i&&!r||(this.h.onMoves(this.g,s,r||s.length>3),a&&this.h.onSettled(),this.waiters.splice(0).forEach(l=>l()))}waitAdvance(e,t){return new Promise(r=>{if(this.applied>e)return r(!0);const s=setTimeout(()=>r(!1),t);this.waiters.push(()=>{clearTimeout(s),r(this.applied>e)})})}async send(e){if(this.sending||!this.ready)return!1;this.sending=!0;for(let t=0;t<3;t++){const r=this.applied,s=JSON.parse(JSON.stringify(WT(e,this.seat)));this.sentAt=r;try{return await Yh(Hn(jn,"tcgGames",this.code,"moves",String(r)),{by:this.uid,action:s,t:Date.now()}),!0}catch{if(!await this.waitAdvance(r,4e3)||!pm(this.g,this.seat,s))break}}return this.sending=!1,this.h.onStatus("No se pudo enviar la jugada; revisa el tablero y repítela."),!1}async sendChat(e){if(!this.ready)throw new Error("El chat se activa cuando entra el rival.");try{await qE(Ba(jn,"tcgGames",this.code,"chat"),{by:this.uid,text:e.slice(0,140),t:Date.now()})}catch(t){throw new Error(ln(t))}}get busy(){return this.sending}get isReady(){return this.ready}close(){this.unsubs.forEach(e=>e()),this.unsubs=[],this.waiters=[],Tn.clearSaved()}}const JT=`
.onl{position:fixed;inset:0;z-index:9000;display:grid;place-items:center;background:rgba(5,5,12,.78)}
.onl>div{background:#14141f;border:1px solid #3a3a5a;border-radius:14px;padding:22px 24px;width:min(92vw,340px);display:grid;gap:12px;color:#eee;text-align:center}
.onl h2{margin:0}.onl input{padding:10px;font-size:22px;letter-spacing:6px;text-align:center;text-transform:uppercase;border-radius:8px;border:1px solid #444;background:#0c0c14;color:#fff}
.onl .st{min-height:1.2em;font-size:13px;opacity:.85}
.roomtag{position:fixed;top:6px;left:50%;transform:translateX(-50%);z-index:8000;font-size:12px;padding:3px 10px;border-radius:99px;background:rgba(20,20,31,.85);color:#ddd;pointer-events:none}
`;let wr=null,st=null;function gm(){if(!document.getElementById("onl-css")){const n=document.createElement("style");n.id="onl-css",n.textContent=JT,document.head.append(n)}}function Ks(n){gm(),wr||(wr=document.createElement("div"),wr.className="roomtag",document.body.append(wr)),wr.textContent=n,wr.hidden=!n}function Os(){st==null||st.remove(),st=null}function Io(n){const e=st==null?void 0:st.querySelector(".st");e&&(e.textContent=n)}function Cl(n){gm(),Os(),st=document.createElement("div"),st.className="onl",st.innerHTML=`<div><h2>Jugar online</h2>
    ${n.inRoom?'<p>Ya estás en una sala.</p><button class="btn" data-x="leave">Salir de la sala</button>':'<button class="btn" data-x="create">Crear sala</button><p style="margin:0;opacity:.7">o únete con un código</p><input data-x="code" maxlength="4" placeholder="K7QF" autocomplete="off"><button class="btn" data-x="join">Unirse</button>'}
    <div class="st"></div><button class="ghost" data-x="close">Cerrar</button></div>`,document.body.append(st);const e=t=>{Io("Conectando…"),t().catch(r=>Io((r==null?void 0:r.message)??"Error"))};st.addEventListener("click",t=>{var s;const r=t.target.dataset.x;r&&(r==="close"?Os():r==="create"?e(n.create):r==="join"?e(()=>n.join(st.querySelector("[data-x=code]").value)):r==="leave"&&((s=n.leave)==null||s.call(n),Os()))}),st.addEventListener("keydown",t=>{var r;t.stopPropagation(),t.key==="Enter"&&((r=st.querySelector("[data-x=join]"))==null||r.click())})}const Qs=document.getElementById("app"),yt=document.createElement("div");yt.className="preview";document.body.append(yt);const _m={barrera:"Barrera",robovida:"Robo de vida",arrollar:"Arrollar",letal:"Letal",rapido:"Ataque rápido",duro:"Duro",elusivo:"Elusivo",temible:"Temible",retador:"Retador",regenera:"Regeneración",efimero:"Efímero"},XT={barrera:"anula el siguiente daño que recibiría y luego se pierde.",robovida:"el daño que inflige cura a tu Nexo.",arrollar:"el daño sobrante sobre su bloqueador va al Nexo.",letal:"destruye cualquier unidad a la que dañe.",rapido:"al atacar, golpea antes que su bloqueador.",duro:"recibe 1 de daño menos de cada fuente.",elusivo:"solo puede ser bloqueada por unidades elusivas.",temible:"solo la bloquean unidades con 3 o más de poder.",retador:"al atacar, elige qué enemigo debe bloquearla.",regenera:"se cura por completo al final de cada ronda.",efimero:"muere al golpear o al acabar la ronda."},YT={barrera:"🛡",robovida:"🩸",arrollar:"🐗",letal:"☠",rapido:"⚡",duro:"🪨",elusivo:"🌫",temible:"👁",retador:"⚔",regenera:"♻",efimero:"⏳"},ZT={burst:"Ráfaga",focus:"Enfoque",fast:"Rápido",slow:"Lento"},eI={burst:"Ráfaga: se resuelve al instante, no pasa la prioridad y sirve como reacción.",focus:"Enfoque: se resuelve al instante, no pasa la prioridad; solo como acción original.",fast:"Rápido: va a la pila; el rival puede responder. Sirve como reacción.",slow:"Lento: va a la pila; solo como acción original (con la pila vacía)."},nr=n=>n.replace(/[&<>"]/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[e]),Jo=()=>Dd([Ms.Luminarae,Ms.Umbra],Date.now());let A=Jo(),te=null,Gn=!1,qe=new Set,Ct=new Set,Js=!1,Ue=!1,bo=!1,Nt=0,Ae=null,xt=null,$t=null,pt=[20,20],Wn=new Set,Ao=[0,0],Kn=0,Lr=new Map,Yn=[[],[]],Pr=A;const yd=new Map;let Xs=!1,vd=0,Ed=-1,Ka=0,ue=null,In=0;const Vl=n=>(n+In)%2,Nl=n=>Vl(n)?"Umbra":"Luminarae",Qa=n=>{ue||Qt.react(n)};function Qn(n,e=""){const t=document.createElement("div");t.className="vfx "+n,t.textContent=e,document.body.append(t),setTimeout(()=>t.remove(),1400)}function Kt(n){document.querySelectorAll(".toast").forEach(t=>t.remove());const e=document.createElement("div");e.className="vfx toast",e.textContent=n,document.body.append(e),setTimeout(()=>e.remove(),1800)}const Qt=new Kg,bt=document.createElement("aside");bt.className="chat";bt.innerHTML=`<div class="tabs"><button data-t="chat" class="on">Chat</button><button data-t="log">Registro</button></div>
  <div class="msgs" id="msgs"></div><div class="logv" id="logv" hidden></div>
  <div class="inp"><input id="chat-in" maxlength="140" placeholder="Escribe un mensaje…" autocomplete="off"><button id="chat-send">➤</button></div>`;document.body.append(bt);const Yi=bt.querySelector("#msgs"),ym=bt.querySelector("#logv"),xl=bt.querySelector("#chat-in");Qt.onMessage(n=>{const e=document.createElement("div");if(e.className="msg "+n.side,n.side==="sys")e.textContent=n.text;else{const t=document.createElement("b");t.textContent=n.from+":",e.append(t,document.createTextNode(n.text))}Yi.append(e),Yi.scrollTop=Yi.scrollHeight,n.side==="foe"&&_e("msg")});const vm=()=>{const n=xl.value.trim();n&&(xl.value="",ue?ue.sendChat(n).catch(e=>Qt.sys((e==null?void 0:e.message)??"No se pudo enviar el mensaje")):Qt.send(n))};bt.querySelector("#chat-send").addEventListener("click",vm);xl.addEventListener("keydown",n=>{n.key==="Enter"&&vm(),n.stopPropagation()});bt.querySelectorAll(".tabs button").forEach(n=>n.addEventListener("click",()=>{const e=n.dataset.t==="log";ym.hidden=!e,Yi.hidden=e,bt.querySelector(".inp").hidden=e,bt.querySelectorAll(".tabs button").forEach(t=>t.classList.toggle("on",t===n))}));Qt.sys("Chat local: escribe y el rival te responderá. Más adelante puede conectarse a Firebase.");function Zi(n,e,t=-1){const r=ce[n],s=e.map(a=>`<p><b>${_m[a]}:</b> ${XT[a]}</p>`),i=Kr(n);if(r.type==="spell"){const a=Math.min(A.p[0].spell,r.cost);s.push(`<p>✦ ${eI[r.speed??"fast"]}</p><p>💎 Se paga primero con la reserva de hechizo: ${a} de reserva + ${r.cost-a} de maná.</p>`)}else s.push("<p>Puede atacar nada más jugarla. Solo el jugador con la ficha de ataque puede atacar.</p>");if(i&&s.push(`<p>🎯 Eliges tú el objetivo (${i==="enemy"?"unidad enemiga":"unidad aliada"}). Si desaparece antes de resolverse, el hechizo se disipa.</p>`),r.fx.some(a=>a.t==="sacDraw"||a.t==="sacDmg")&&s.push("<p>⚠ Sacrifica a tu unidad más débil.</p>"),t>=0&&!Qr(A,0,t)){const a=A.p[0],l=r.type==="spell"?a.mana+a.spell:a.mana;s.push(`<p>⛔ ${r.cost>l?`Maná insuficiente: cuesta ${r.cost}, tienes ${l}.`:A.active!==0?"Ahora no tienes la prioridad.":r.type==="unit"?a.board.length>=6?"Tu tablero está lleno.":"Solo se juegan unidades con la pila vacía, en tu turno.":"Ahora no puedes jugarla (¿necesita objetivo o pila vacía?)."}</p>`)}return`<div class="rules">${s.join("")}</div>`}const tI=n=>{const e=n.slice(0,3);return`<div class="art"><span class="glyph">${ce[n].type==="spell"?"✦":e==="lum"?"☀":"☾"}</span><img src="${qg(n)}" onerror="this.remove()"></div>`};function Vt(n,e="",t="",r,s=""){const i=ce[n],a=n.slice(0,3),l=r?r.kw:i.kw,u=r&&r.dmg>0?"dmg":"",h=(i.type==="spell"?[ZT[i.speed??"fast"]]:[]).concat(l.map(f=>_m[f])).join(" · ");return`<div class="card ${i.type} ${a} ${t}" ${e}>${tI(n)}
    <div class="side"><i class="cost">${i.cost}</i>${l.map(f=>`<i class="ki">${YT[f]}</i>`).join("")}</div>
    <div class="panel"><div class="nm">${ft(n)}</div><div class="orn"></div><p class="tx"><em>${h}</em>${i.text}</p></div>
    ${i.type==="unit"?`<b class="atk ${r&&r.ta?"tmp":""}">${r?le(r):i.atk}<s>⚔</s></b><b class="hp ${u}">${r?Re(r):i.hp}<s>♥</s></b>`:""}${s}</div>`}function wd(n,e,t){document.querySelectorAll(".spot").forEach(s=>s.remove());const r=document.createElement("div");r.className="vfx spot",r.innerHTML=`<div class="spot-l">Juegas</div>${Vt(n,"","",t)}`,document.body.append(r),setTimeout(()=>r.remove(),1250)}function Td(n,e,t){document.querySelectorAll(".reader").forEach(l=>l.remove());const r=ce[n],s=r.type==="spell"?6500:3800,i=document.createElement("div");i.className="reader foe",Xs=!0,i.innerHTML=`<div class="rd-h">⚠ El rival juega</div>${Vt(n,"","",t)}<div class="rd-t"><b>${nr(ft(n))}</b> · coste ${r.cost}<p>${nr(r.text)}</p></div>${Zi(n,t?t.kw:r.kw)}<button class="rd-ok" type="button">Entendido ✓</button><i class="rd-bar" style="animation-duration:${s}ms"></i>`,document.body.append(i);const a=()=>{i.isConnected&&(i.remove(),Xs=!1)};i.querySelector(".rd-ok").addEventListener("click",a),i.addEventListener("click",a),setTimeout(a,s)}function Id(n,e,t){const r=n.nexus<pt[e]?"hit":n.nexus>pt[e]?"heal":"",s=n.nexus-pt[e],i=Array.from({length:n.maxMana},(a,l)=>`<u class="${l<n.mana?"on":""}"></u>`).join("");return`<div class="pt ${e?"foe":"me"}"><div class="ava"><span>${Vl(e)?"☾":"☀"}</span><img src="/Apexora-TCG/img/avatar_${Vl(e)?"umb":"lum"}.webp" onerror="this.remove()"></div>
    <div class="orb ${r}">${Math.max(0,n.nexus)}${s?`<span class="fx">${s>0?"+":""}${s}</span>`:""}</div>
    <div class="pname">${t}</div><div class="pmana">${i}<span class="sm">${[0,1,2].map(a=>`<i class="${a<n.spell?"on":""}"></i>`).join("")}</span></div></div>`}function Em(n,e){if(A.phase!=="main")return;if(ue){Zn({type:"attack",units:n});return}const t=Nt;Ue=!0,$t={side:e,idx:n},_e("attack"),Qn("banner small",`⚔ ${e?"El rival ataca":"Atacas"} con ${n.length}`),ve(),setTimeout(()=>{if(t!==Nt)return;$t=null,Ue=!1;const r=Ls(A,{type:"attack",units:n});if(r===A){Kt("No puedes atacar ahora"),qe.clear(),ve();return}A=r,qe.clear(),ve(),Gr()},900)}function wm(n,e){const t=n.token,r=1-t,s=n.p[r].nexus-e.p[r].nexus,i=g=>n.p[g].board.filter(S=>!e.p[g].board.some(k=>k.uid===S.uid)).map(S=>ft(S.card)),a=i(0),l=i(1),u=n.attackers.length,h=[`${t?"El rival atacó":"Atacaste"} con ${u}`,s>0?`${t?"Tu Nexo":"Nexo rival"} −${s}`:"sin daño al Nexo"];a.length&&h.push("Tuyas caídas: "+a.join(", ")),l.length&&h.push("Rivales caídas: "+l.join(", "));const f="⚔ "+h.join(" · "),p=document.createElement("div");p.className="vfx report"+(t?"":" good"),p.textContent=f,document.body.append(p),setTimeout(()=>p.remove(),3600),Qt.sys(f)}const Tm=(n,e)=>n!==e&&n.phase==="block"&&n.attackers.length>0&&e.attackers.length===0&&n.round===e.round;function Im(n,e,t){const r=Nt,s=n.token,i=1-s,a=n.attackers.filter($=>n.p[s].board.some(z=>z.uid===$)).map($=>({uid:$,bid:n.blocks[String($)]}));if(!a.length){t();return}const l=Math.max(0,n.p[i].nexus-e.p[i].nexus),u=a.map(({uid:$,bid:z})=>{const ae=n.p[s].board.find(E=>E.uid===$),q=z!==void 0?n.p[i].board.find(E=>E.uid===z):void 0;return q?ae.kw.includes("arrollar")?Math.max(0,le(ae)-Re(q)-(q.kw.includes("duro")?1:0)):0:z===void 0||ae.kw.includes("arrollar")?le(ae):0}),h=u.reduce(($,z)=>$+z,0),f=[];let p=0;u.forEach(($,z)=>{const ae=z===u.length-1?l-p:h?Math.round($/h*l):0;f.push(Math.max(0,ae)),p+=f[z]});const g=$=>{const z=structuredClone(n),ae=new Set;a.slice(0,$+1).forEach(({uid:q,bid:E})=>{ae.add(q),E!==void 0&&ae.add(E)});for(const q of[0,1])z.p[q].board=z.p[q].board.filter(E=>!ae.has(E.uid)||e.p[q].board.some(_=>_.uid===E.uid)),z.p[q].board.forEach(E=>{if(ae.has(E.uid)){const _=e.p[q].board.find(y=>y.uid===E.uid);_&&Object.assign(E,_)}});return z.p[i].nexus=n.p[i].nexus-f.slice(0,$+1).reduce((q,E)=>q+E,0),z.attackers=a.slice($+1).map(q=>q.uid),z.blocks={},z.attackers.forEach(q=>{const E=n.blocks[String(q)];E!==void 0&&z.p[i].board.some(_=>_.uid===E)&&(z.blocks[String(q)]=E)}),z.forced=z.forced.filter(q=>z.attackers.includes(q)),z},S=a.length>3?.7:1,k=480*S,V=340,N=850*S;Gn=!0,qe.clear(),Ae=null,xt=null;const W=()=>{te=null,Gn=!1,wm(n,e),t()},B=$=>{if(r!==Nt){te=null,Gn=!1;return}if($>=a.length){W();return}const{uid:z,bid:ae}=a[$],q=ae!==void 0?n.p[i].board.find(_=>_.uid===ae):void 0,E=n.p[s].board.find(_=>_.uid===z);A=$?g($-1):n,te={atk:z,blk:q?q.uid:null,strike:!1,def:i,cap:`⚔ Duelo ${$+1}/${a.length} · ${nr(ft(E.card))} ${q?"contra "+nr(ft(q.card)):"→ directo al Nexo"}`},ve(),setTimeout(()=>{if(r!==Nt){te=null,Gn=!1;return}const _=document.querySelector(`[data-uid="${z}"]`),y=q?document.querySelector(`[data-uid="${q.uid}"]`):null;if(_&&y){const w=_.getBoundingClientRect(),T=y.getBoundingClientRect(),I=T.top+T.height/2-(w.top+w.height/2),v=Math.sign(I)||1;te.dx=T.left+T.width/2-(w.left+w.width/2),te.dir=v,te.dy=I-v*((w.height/1.12*1.2+T.height/1.08)/2-4)}te.strike=!0,_e("attack"),ve(),setTimeout(()=>{if(r!==Nt){te=null,Gn=!1;return}A=g($),te.strike=!1,te.back=te.dx!==void 0,ve(),setTimeout(()=>B($+1),N)},V)},k)};B(0)}function bm(n){if(qe.clear(),Ae=null,xt=null,Tm(A,n)){Ue=!0,Im(A,n,()=>{Ue=!1,A=n,ve(),Gr()});return}A=n,ve(),Gr()}function ve(){A.round!==Kn&&A.round>0&&A.phase!=="mulligan"&&(vd=Date.now()+1400,setTimeout(()=>ve(),1450)),yt.style.display="none",og(A.phase==="block"||A.stack.length?1:0);const n=A.p[0],e=A.p[1],t=A.active===0&&A.winner===null&&!Ue&&A.phase!=="mulligan",r=A.phase==="block"&&A.token===1&&A.active===0,s=new Set(Object.values(A.blocks)),i=new Set(A.attackers),a=A.attackers.length?A.token:0,l=[];A.attackers.length?A.attackers.forEach(D=>{const M=A.p[a].board.findIndex(be=>be.uid===D);if(M<0)return;const j=A.blocks[String(D)],fe=j===void 0?-1:A.p[1-a].board.findIndex(be=>be.uid===j);l.push({a:A.p[a].board[M],ai:M,b:fe>=0?A.p[1-a].board[fe]:void 0,bi:fe})}):A.phase==="main"&&qe.size&&[...qe].forEach(D=>{n.board[D]&&l.push({a:n.board[D],ai:D,bi:-1})});const u=(D,M)=>l.some(j=>(M===a?j.a:j.b)===D),h=(D,M,j)=>{const fe=j===0,be=Lr.get(D.uid),qt=Re(D);let ye="",de="";be&&A.round===Kn&&(qt<be[1]?(de="hurt",ye=String(qt-be[1])):(qt>be[1]||le(D)>be[0])&&(de="boost",ye="+"+(qt>be[1]?qt-be[1]:le(D)-be[0]))),yd.set(D.uid,Vt(D.card,"","mini dying",D));const fr=Ae&&(Ae.kind==="enemy"&&!fe||Ae.kind==="ally"&&fe),Ln=fr?"tgt":fe?"unit":r&&i.has(D.uid)?"enemy-unit":"view",Xo=fe&&t&&A.phase==="main"&&A.tok[0]&&!A.attackers.length,pr=`mini ${qe.has(M)&&fe?"sel ":""}${Xo?"can ":""}${Wn.has(D.uid)?"":"enter "}${de} ${fr?"tgtok ":""}${!fe&&xt===M?"blocktarget ":""}${fe&&s.has(D.uid)?"assignedblock ":""}${A.forced.includes(D.uid)||A.forced.some(Zo=>A.blocks[String(Zo)]===D.uid)?"forced ":""}${i.has(D.uid)?"atkr ":""}${$t&&$t.side===j&&$t.idx.includes(M)?"attacking "+(j?"down":"up"):""}${te&&D.uid===te.atk?"duel duelatk "+(te.strike?"strike "+(te.dx!==void 0?"clash ":"")+(j?"sdown":"sup"):te.back?"back ":""):te&&D.uid===te.blk?"duel duelblk "+(te.strike&&te.dx!==void 0?"hit ":""):""}`,Yo=te&&te.dx!==void 0&&(D.uid===te.atk&&(te.strike||te.back)||D.uid===te.blk&&te.strike)?` style="--dx:${te.dx.toFixed(1)}px;--dy:${te.dy.toFixed(1)}px;--dir:${te.dir}"`:"";return Vt(D.card,`data-u="${j}:${M}" data-a="${Ln}" data-i="${M}" data-uid="${D.uid}"${Yo}`,pr,D,ye?`<span class="fx">${ye}</span>`:"")},f=(D,M)=>{const j=[],fe=[];D.board.forEach((ye,de)=>{u(ye,M)||j.push(h(ye,de,M))}),l.forEach(ye=>{const de=M===a?ye.a:ye.b,fr=M===a?ye.ai:ye.bi;fe.push(de?h(de,fr,M):`<div class="slot cslot ${M?"umb":"lum"} ${r&&M===0?"ask":""}">${r&&M===0?"<span>Elige<br>defensor</span>":""}</div>`)});const be=Yn[M].filter(ye=>!D.board.some(de=>de.uid===ye)).map(ye=>yd.get(ye)??""),qt=Array.from({length:Math.max(0,6-D.board.length)},(ye,de)=>`<div class="slot ${M?"umb":"lum"}">${be[de]??""}</div>`).join("");return{back:j.join("")+qt,comb:fe.join("")}},p=f(e,1),g=f(n,0),S=A.phase==="mulligan"?"Mulligan":A.phase==="main"?"Prioridad":A.phase==="block"?"Bloqueos":"Pila",k=A.winner!==null?A.winner===-1?"Empate":A.winner===0?"¡Victoria!":"Derrota":Ae?`Elige objetivo para ${ft(n.hand[Ae.hand])} · Esc cancela`:A.phase==="stack"?t?`Responde o pulsa OK · ${A.stack.length} en la pila`:`Pila · ${A.stack.length}`:A.phase==="block"?r?"Toca un atacante y luego tu bloqueador":A.active===0?"Rival bloqueó: puedes responder o resolver":"El rival asigna bloqueos…":t?A.passes===1?"El rival pasó: pasa también para cerrar la ronda":A.tok[0]?"Tu turno: juega cartas o selecciona unidades y ataca":"Tu turno: juega cartas o pasa":"El rival tiene la prioridad…",V=A.log.slice(-14).map(D=>D.replace(/\{(\w+)\}/g,(M,j)=>`<b>${ft(j)}</b>`)).join("<br>"),N=A.attackers.length?`<div class="blocksummary"><b>⚔ Combate</b>${A.attackers.map(D=>{const M=A.p[A.token].board.find(be=>be.uid===D),j=A.blocks[String(D)],fe=j===void 0?void 0:A.p[1-A.token].board.find(be=>be.uid===j);return`<span>${M?ft(M.card):"?"} <i>→</i> ${fe?ft(fe.card):"<em>Sin bloquear</em>"}</span>`}).join("")}</div>`:"";let W="RIVAL",B="wait";t&&(A.phase==="main"?qe.size?(W=`ATACAR ${qe.size}`,B="atk"):(W=A.passes===1?"FIN DE RONDA":"PASAR",B="go"):A.phase==="block"?(W=r?Object.keys(A.blocks).length?"BLOQUEAR":"SIN BLOQUEO":"RESOLVER",B="go"):(W="OK",B="go"));const $=D=>{const M=D===void 0?void 0:[...A.p[0].board,...A.p[1].board].find(j=>j.uid===D);return M?ft(M.card):""},z=A.stack.length?`<div class="stacktray"><b>✦ Pila · se resuelve de arriba abajo</b>${[...A.stack].map((D,M)=>({x:D,k:M})).reverse().map(({x:D,k:M},j)=>{const fe=ce[D.card],be=$(D.target);return`<div data-st="${M}" class="stackitem ${D.owner?"foe":"me"} ${j===0?"top":""}"><div class="si-h"><em>${D.owner?"Rival":"Tú"}</em><strong>${ft(D.card)}</strong><i>${fe.cost}</i></div><p>${nr(fe.text)}</p>${be?`<small>🎯 Objetivo: ${nr(be)}</small>`:""}</div>`}).join("")}</div>`:"",ae=Date.now()<vd&&A.phase!=="mulligan",q=A.phase==="block"||A.phase==="stack"&&A.resumePhase==="block",E=A.phase==="mulligan"?-1:ae?0:q?2:A.passes===1&&!A.attackers.length&&A.phase==="main"?3:1,_=[["ROBO","Robas 1 carta y ganas 1 de maná"],["INVOCACIÓN","Juega unidades y hechizos"],["COMBATE","Ataque y bloqueo · hechizos rápidos permitidos"],["FINAL","Si ambos pasáis, acaba la ronda y pasa el turno"]];Qs.dataset.ph=String(E);const y=A.winner!==null||A.phase==="mulligan"?"":A.active===0?"mine":"theirs",w=`<div class="phasehud ${y}"><div class="who">${y==="mine"?"⚡ TU TURNO":y?"⏳ TURNO RIVAL":"PARTIDA"}</div><ol>${_.map((D,M)=>`<li class="${M===E?"on":M<E?"done":""}"><i>${M+1}</i><span>${D[0]}</span>${M===E?`<small>${D[1]}</small>`:""}</li>`).join("")}</ol>${A.stack.length?'<div class="hstack">✦ Pila activa</div>':""}</div>`,T=n.hand.length,I=n.hand.map((D,M)=>{const j=M-(T-1)/2;return`<div class="slotc" data-a="hand" data-i="${M}" style="--rot:${(j*3.2).toFixed(1)}deg;--y:${(j*j*2.6).toFixed(1)}px" aria-label="${nr(ft(D))}, coste ${ce[D].cost}">${Vt(D,"",`${t&&Qr(A,0,M)?"ok":"no"} ${(Ae==null?void 0:Ae.hand)===M?"sel":""}`)}</div>`}).join(""),v=A.phase==="mulligan"&&A.mull[0]?'<div class="mull"><h2>Mulligan</h2><p>Esperando al rival…</p></div>':A.phase==="mulligan"?`<div class="mull"><h2>Mulligan</h2><p>Toca las cartas que quieras reemplazar (0 a 4)</p><div class="mrow">${n.hand.map((D,M)=>Vt(D,`data-a="mul" data-i="${M}"`,Ct.has(M)?"sel swap":"")).join("")}</div><button class="btn" data-a="mulgo">${Ct.size?`Reemplazar ${Ct.size}`:"Conservar mano"}</button></div>`:"";Qs.innerHTML=`<header><div class="brand"><span class="brand-mark">✦</span><h1>Cartas <small>ALFA</small></h1></div><div class="header-state"><span class="rd">Ronda ${A.round}/40</span><span class="phase-chip">${S}</span><span class="tok">${A.tok[0]?"⚑ Tienes la ficha de ataque":A.tok[1]?"⚑ Ficha de ataque: rival":"⚑ Ficha gastada"}</span></div>
    <nav class="toolbar"><button class="ghost" data-a="chat">${Js?"✕ Cerrar":"☰ Chat / registro"}</button><button class="ghost icon-btn" data-a="mute">${sg()?"🔇":"🔊"}</button><button class="ghost" data-a="menu">⌂ Menú</button><button class="ghost" data-a="online">🌐 Online</button><button class="ghost" data-a="new">↻ Nueva partida</button></nav></header><main class="stage ${Ae?"targeting":""}${Gn?" dueling":""}" data-dnex="${te&&te.blk===null?te.def:""}">${te?`<div class="duelcap">${te.cap}</div>`:""}
      <div class="foehand">${Array.from({length:e.hand.length},()=>"<i></i>").join("")}</div>
      <div class="plane-wrap"><div class="plane"><div class="lane foeback">${p.back}</div><div class="lane foecomb">${p.comb}</div><div class="lane mycomb">${g.comb}</div><div class="lane myback">${g.back}</div></div></div>
      
      <div class="msgbar"><span class="pill ${t?"go":""}">${k}</span></div>
      <aside class="sideL">${w}${z}${N}<div class="pgroup me"><div class="pile p0" data-l="MAZO" title="Tu mazo"><b>${n.deck.length}</b></div>${Id(n,0,`${Nl(0)} · Tú`)}</div></aside>
      <aside class="sideR"><div class="pgroup foe">${Id(e,1,`${Nl(1)} · Rival`)}<div class="pile p1" data-l="MAZO" title="Mazo rival"><b>${e.deck.length}</b></div></div>
      <div class="manapanel"><div class="mrow2"><b>MANÁ</b><span>${n.mana}/${n.maxMana}</span></div><div class="gems">${Array.from({length:Math.max(n.maxMana,1)},(D,M)=>`<u class="${M<n.mana?"on":""}"></u>`).join("")}</div>
        <div class="mrow2" title="Reserva exclusiva para hechizos: se gasta ANTES que el maná normal y se rellena con el maná que te sobra al acabar la ronda (máximo 3)."><b>RESERVA ✦</b><span>${n.spell}/3</span></div><div class="gems sp">${[0,1,2].map(D=>`<u class="${D<n.spell?"on":""}"></u>`).join("")}</div><p class="mnote">Reserva: solo hechizos, se gasta primero. Se llena con el maná que sobra al cerrar la ronda (máx. 3).</p></div>
      <button class="endbtn ${B}" data-a="${B==="atk"?"attack":"go"}" ${B==="wait"?"disabled":""}><span>${W}</span></button></aside>
      <div class="fan">${I}</div></main>`+v+(A.winner!==null?`<div class="over"><h2>${k}</h2><button class="btn" data-a="new">Jugar de nuevo</button></div>`:"");const it=A.p.some(D=>D.board.some(M=>!Wn.has(M.uid))),St=Yn.some(D=>D.some(M=>!A.p.some(j=>j.board.some(fe=>fe.uid===M))));it&&A.p.flatMap(D=>D.board.filter(M=>!Wn.has(M.uid)).map(M=>M.card)).forEach((D,M)=>setTimeout(()=>ug(D),M*170)),St&&_e("death"),A.p.forEach((D,M)=>D.board.filter(j=>!Wn.has(j.uid)).forEach(j=>{zg(j.card)?(document.querySelectorAll(".spot,.reader").forEach(fe=>fe.remove()),Xs=!0,_e("round"),Gg(j.card,Vt(j.card,"","",j),()=>{Xs=!1})):M?Td(j.card,1,j):wd(j.card,0,j)})),n.nexus<pt[0]?Qn("vhit"):n.nexus>pt[0]&&Qn("vheal"),(n.nexus<pt[0]||e.nexus<pt[1])&&_e("hurt"),(n.nexus>pt[0]||e.nexus>pt[1])&&_e("heal"),A.p.forEach((D,M)=>{const j=D.played[D.played.length-1];D.played.length>Ao[M]&&j&&ce[j].type==="spell"&&(Qn("cast "+j.slice(0,3)),_e("spell_"+j.slice(0,3)),M?Td(j):wd(j),M===1&&Qa("cast"))}),A.round!==Kn&&A.round>0&&(Qn("banner",`Ronda ${A.round}`),_e("round"),n.spell>Ka&&setTimeout(()=>Kt(`✦ +${n.spell-Ka} reserva de hechizo (maná sobrante)`),1500)),A.active===0&&Ed!==0&&!Ue&&A.winner===null&&A.phase!=="mulligan"&&A.round===Kn&&(Qn("banner small turn",r?"🛡 Tu turno · bloquea":"⚡ Tu turno"),_e("round")),Ed=A.phase==="mulligan"?-1:A.active,Ka=n.spell,!Gn&&Pr.attackers.length&&!A.attackers.length&&Pr.round===A.round&&wm(Pr,A),pt=[n.nexus,e.nexus],Ao=A.p.map(D=>D.played.length),Kn=A.round,Pr=A,Lr=new Map,Yn=[[],[]],A.p.forEach((D,M)=>D.board.forEach(j=>{Wn.add(j.uid),Lr.set(j.uid,[le(j),Re(j)]),Yn[M].push(j.uid)})),A.winner!==null&&!bo&&(bo=!0,ue&&Tn.clearSaved(),_e(A.winner===0?"win":"lose"),A.winner===0?Qa("win"):A.winner===1&&Qa("lose")),ym.innerHTML=V,bt.hidden=!Js}function Zn(n){if(ue){if(Ue||ue.busy)return;if(!ue.isReady){Kt("Esperando al rival… Para jugar contra la IA, sal de la sala desde 🌐 Online");return}if(Ls(A,KT(n))===A){Kt(n.type==="block"?"Ese bloqueo no es válido (Elusivo/Temible/ya asignado)":n.type==="play"?"No puedes jugar eso ahora":"Acción no válida");return}(n.type==="pass"||n.type==="confirmBlocks")&&_e("pass"),Ue=!0,qe.clear(),Ae=null,xt=null,ve(),ue.send(n).then(r=>{r||(Ue=!1,ve())});return}const e=Ls(A,n);if(e===A){Kt(n.type==="block"?"Ese bloqueo no es válido (Elusivo/Temible/ya asignado)":n.type==="play"?"No puedes jugar eso ahora":"Acción no válida");return}(n.type==="pass"||n.type==="confirmBlocks")&&_e("pass"),bm(e)}function Gr(){if(ue||A.winner!==null||A.active!==1||A.phase==="mulligan")return;const n=Nt,e=()=>{if(n!==Nt||Ue||A.winner!==null||A.active!==1)return;if(Xs){setTimeout(e,300);return}const t=$g(A);if(t.type==="attack"){Em(t.units,1);return}bm(Ls(A,t))};setTimeout(e,1200)}function Dl(){A.active===0&&A.winner===null&&!Ue&&(_e("click"),A.phase==="main"&&qe.size?Em([...qe],0):A.phase==="block"&&A.token===1?Zn({type:"confirmBlocks"}):Zn({type:"pass"}))}Qs.addEventListener("click",n=>{const e=n.target.closest("[data-a]");if(Ae&&(e==null?void 0:e.dataset.a)!=="tgt"&&(Ae=null,ve(),!e||e.dataset.a==="hand")||!e)return;const t=e.dataset.a,r=Number(e.dataset.i),s=A.active===0&&A.winner===null&&!Ue&&A.phase!=="mulligan";if(t==="chat")Js=!Js,_e("click"),ve();else if(t==="mute")ig(),_e("click"),ve();else if(t==="new"&&ue)Kt("Para otra partida online crea o únete a una sala nueva"),Cl(Ol());else if(t==="menu")_e("click"),kd();else if(t==="online")_e("click"),Cl(Ol());else if(t==="new")_e("click"),Nt++,Ue=!1,$t=null,xt=null,Ae=null,A=Jo(),qe.clear(),Ct.clear(),pt=[20,20],Wn.clear(),Ao=[0,0],Kn=0,Lr.clear(),Yn=[[],[]],bo=!1,Pr=A,ve();else if(t==="mul")_e("select"),Ct.has(r)?Ct.delete(r):Ct.add(r),ve();else if(t==="mulgo"){_e("click");const i=[...Ct];Ct.clear(),Zn({type:"mulligan",idx:i})}else if(s)if(t==="tgt"){if(Ae){const i=Number(e.dataset.uid),a=Ae.hand;Zn({type:"play",hand:a,target:i})}}else if(t==="hand"){if(!Qr(A,0,r)){Kt("No puedes jugar esa carta ahora");return}const i=Kr(A.p[0].hand[r]);_e("select"),i?(Ae={hand:r,kind:i},ve()):Zn({type:"play",hand:r})}else t==="go"||t==="attack"?Dl():t==="enemy-unit"&&A.phase==="block"?(xt=r,_e("select"),ve()):t==="unit"&&A.phase==="block"&&A.token===1?xt===null?Kt("Primero toca al atacante rival"):Zn({type:"block",attacker:xt,blocker:r}):t==="unit"&&A.phase==="main"&&A.tok[0]&&!A.attackers.length&&(qe.has(r)?qe.delete(r):qe.add(r),_e("select"),ve());else return});document.addEventListener("keydown",n=>{n.target.tagName!=="INPUT"&&(n.key==="Escape"&&Ae?(Ae=null,ve()):n.key===" "&&A.phase!=="mulligan"&&(n.preventDefault(),Dl()))});document.addEventListener("contextmenu",n=>{Ae&&(n.preventDefault(),Ae=null,ve())});const Am=()=>document.querySelectorAll(".manapanel u.pay").forEach(n=>n.classList.remove("pay"));function nI(n){Am();const e=ce[n],t=A.p[0],r=e.type==="spell"?Math.min(t.spell,e.cost):0,s=e.cost-r,i=document.querySelectorAll(".manapanel .gems"),a=(l,u,h)=>{var p;if(!l)return;const f=l.querySelectorAll("u");for(let g=u-1;g>=Math.max(0,u-h);g--)(p=f[g])==null||p.classList.add("pay")};a(i[0],t.mana,s),a(i[1],t.spell,r)}Qs.addEventListener("mouseover",n=>{var r,s;const e=n.target.closest("[data-st]");if(e){const i=(r=A.stack[Number(e.dataset.st)])==null?void 0:r.card;i&&(yt.innerHTML=Vt(i)+Zi(i,ce[i].kw),yt.style.display="block");return}const t=n.target.closest('[data-u],[data-a="hand"]');if((!t||!t.dataset.i||t.dataset.a!=="hand")&&Am(),(t==null?void 0:t.dataset.a)==="hand"){const i=A.p[0].hand[Number(t.dataset.i)];i&&nI(i)}if(!t){yt.style.display="none";return}if(t.dataset.u){const[i,a]=t.dataset.u.split(":").map(Number),l=(s=A.p[i])==null?void 0:s.board[a];l&&(yt.innerHTML=Vt(l.card,"","",l)+Zi(l.card,l.kw),yt.style.display="block")}else{const i=Number(t.dataset.i),a=A.p[0].hand[i];a&&(yt.innerHTML=Vt(a)+Zi(a,ce[a].kw,i),yt.style.display="block")}});Qs.addEventListener("mouseleave",()=>{yt.style.display="none"});const bn=[];let Wr=!1;function So(n){Nt++,Ue=!1,$t=null,xt=null,Ae=null,A=n,qe.clear(),Ct.clear(),bo=n.winner!==null,pt=[n.p[0].nexus,n.p[1].nexus],Ao=n.p.map(e=>e.played.length),Kn=n.round,Pr=n,Wn=new Set(n.p.flatMap(e=>e.board.map(t=>t.uid))),Lr=new Map,Yn=[[],[]],n.p.forEach((e,t)=>e.board.forEach(r=>{Lr.set(r.uid,[le(r),Re(r)]),Yn[t].push(r.uid)})),ve()}function Sm(){const n=bn.shift();if(!n){Wr=!1;return}Wr=!0;const e=Pl(mm(n.before,n.seat,n.action),In),t=()=>{$t=null,Ue=!1,A=e,qe.clear(),Ae=null,xt=null,ve(),setTimeout(Sm,0)},r=()=>{Tm(A,e)&&bn.length===0?(Ue=!0,$t=null,Im(A,e,t)):t()};if(n.action.type==="attack"&&bn.length===0){const s=n.seat===In?0:1;Ue=!0,$t={side:s,idx:n.action.units},_e("attack"),Qn("banner small",`⚔ ${s?"El rival ataca":"Atacas"} con ${n.action.units.length}`),ve(),setTimeout(r,900)}else r()}function Ol(){return{inRoom:!!ue,create:async()=>{Ml();try{const n=await ue.create();Ks(`Sala ${n} · esperando rival…`),Io(`Código de sala: ${n} — pásaselo a tu rival`)}catch(n){throw ue=null,n}},join:async n=>{Ml();try{await ue.join(n)}catch(e){throw ue=null,e}},leave:()=>{ue==null||ue.close(),ue=null,In=0,bn.length=0,Wr=!1,Ks(""),So(Jo()),Gr()}}}function Ml(){ue||(ue=new Tn({onStatus:n=>{Ks(n),Io(n)},onChat:n=>{Qt.push({from:n.mine?"Tú":"Rival",text:n.text,side:n.mine?"me":"foe"}),!n.mine&&!Js&&Kt("💬 Rival: "+n.text.slice(0,60))},onReady:()=>{In=ue.seat,Os(),Pd(),Qt.sys("Chat online activo: puedes escribir a tu rival."),So(Pl(ue.g,In)),Qt.sys(`Sala ${ue.code}: juegas con ${Nl(0)}.`)},onMoves:(n,e,t)=>{t?(bn.length=0,So(Pl(n,In))):(bn.push(...e),Wr||Sm())},onSettled:()=>{!Wr&&!bn.length&&Ue&&(Ue=!1,ve())}}))}const bd=Tn.savedCode();bd&&(Ml(),ue.resume(bd).catch(()=>{ue=null,Tn.clearSaved(),Ks("")}));document.addEventListener("menu:ia",()=>{ue&&(ue.close(),ue=null,In=0,bn.length=0,Wr=!1,Ks(""),Os(),So(Jo()),Gr())});document.addEventListener("menu:online",()=>Cl(Ol()));ve();Gr();Cg();
