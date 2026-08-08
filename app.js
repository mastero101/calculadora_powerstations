/* ============================================================
   DATA
   ============================================================ */
/* ============================================================
   STATION IMAGES — inline SVG fallback + real photo for 6 models
   Format: data URI or path to /images/*.png
   ============================================================ */
const IMG = {
  'ef-river3':   'images/ef-river3.png',
  'ef-delta2':   'images/ef-delta2.png',
  'ef-delta2max':'images/ef-delta2max.png',
  'ef-deltapro': 'images/ef-deltapro.png',
  'ef-deltapro3':'images/ef-deltapro3.png',
  'bt-eb3a':     'images/bt-eb3a.png',
};

/* Brand accent colors for SVG placeholder */
const BRAND_COLOR = {
  'EcoFlow':    '#4fbf9f',
  'Bluetti':    '#3b9ae1',
  'Anker SOLIX':'#f5a623',
  'VTOMAN':     '#ff7043',
};

/* Generate an SVG placeholder for stations without a photo */
function imgPlaceholder(st){
  const c = BRAND_COLOR[st.brand] || '#5c7a94';
  const wh = st.cap.split(' ')[0].replace(/[^0-9,–]/g,'');
  return `<svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ilustración de ${st.name}">
    <defs>
      <linearGradient id="bg${st.id}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#132436"/>
        <stop offset="100%" stop-color="#0a1520"/>
      </linearGradient>
      <filter id="shadow${st.id}">
        <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="rgba(0,0,0,.6)"/>
      </filter>
    </defs>
    <!-- body -->
    <rect x="28" y="30" width="144" height="90" rx="10" fill="url(#bg${st.id})" stroke="${c}" stroke-width="1.5" filter="url(#shadow${st.id})"/>
    <!-- handle -->
    <rect x="70" y="18" width="60" height="16" rx="8" fill="none" stroke="${c}" stroke-width="2"/>
    <!-- display -->
    <rect x="44" y="46" width="72" height="44" rx="5" fill="#0a1520" stroke="${c}30" stroke-width="1"/>
    <text x="80" y="68" font-family="JetBrains Mono,monospace" font-size="9" fill="${c}" text-anchor="middle" font-weight="700">${st.name}</text>
    <text x="80" y="80" font-family="JetBrains Mono,monospace" font-size="7" fill="${c}99" text-anchor="middle">${st.cap}</text>
    <text x="80" y="91" font-family="JetBrains Mono,monospace" font-size="6.5" fill="#5c7a94" text-anchor="middle">${st.pmaxPort}W solar</text>
    <!-- outlet dots -->
    <circle cx="134" cy="56" r="7" fill="#0d1c29" stroke="${c}60" stroke-width="1"/>
    <circle cx="134" cy="74" r="7" fill="#0d1c29" stroke="${c}60" stroke-width="1"/>
    <circle cx="134" cy="92" r="7" fill="#0d1c29" stroke="${c}60" stroke-width="1"/>
    <!-- brand indicator bar -->
    <rect x="28" y="30" width="144" height="4" rx="2" fill="${c}" opacity=".8"/>
    <text x="100" y="130" font-family="JetBrains Mono,monospace" font-size="7" fill="#3a5468" text-anchor="middle">${st.brand}</text>
  </svg>`;
}

const STATIONS = [
  // EcoFlow
  {id:'ef-river3', brand:'EcoFlow', name:'RIVER 3', cap:'245 Wh', priceUSD:199, ports:1, vocMin:11, vocMax:30, imax:7, pmaxPort:110,
    tip:'1 panel de 110 W (Voc 21.8 V). Entrada solar limitada a 110 W máx.', preset:{w:200,voc:24.2,imp:10.3,s:1,p:1}},
  {id:'ef-river3plus', brand:'EcoFlow', name:'RIVER 3 Plus', cap:'286 Wh', priceUSD:279, ports:1, vocMin:11, vocMax:50, imax:13, pmaxPort:220,
    tip:'1 panel de 200 W (Voc 24.2 V, 8.3 A) — aprovecha hasta 220 W solar.', preset:{w:200,voc:24.2,imp:10.3,s:1,p:1}},
  {id:'ef-river2pro', brand:'EcoFlow', name:'RIVER 2 Pro', cap:'768 Wh', priceUSD:499, ports:1, vocMin:11, vocMax:50, imax:13, pmaxPort:220,
    tip:'1 panel de 400 W en modo recorte (limita a 220 W) o panel de 300 W (obtiene ~270 W en óptimas, recorta a 220 W).', preset:{w:300,voc:40.0,imp:9.0,s:1,p:1}},
  {id:'ef-delta2', brand:'EcoFlow', name:'DELTA 2', cap:'1,024 Wh', priceUSD:699, ports:1, vocMin:11, vocMax:60, imax:15, pmaxPort:500,
    tip:'1 panel de 440 W (Voc 50 V, 10.5 A) — 88% de aprovechamiento.', preset:{w:440,voc:50.3,imp:10.5,s:1,p:1}},
  {id:'ef-delta2max', brand:'EcoFlow', name:'DELTA 2 Max', cap:'2,048 Wh', priceUSD:1499, ports:2, vocMin:11, vocMax:60, imax:15, pmaxPort:500,
    tip:'1 panel de 440 W por entrada (2 entradas = 880 W de 1,000 W).', preset:{w:440,voc:50.3,imp:10.5,s:1,p:1}},
  {id:'ef-delta3classic', brand:'EcoFlow', name:'DELTA 3 Classic', cap:'1,024 Wh', priceUSD:699, ports:1, vocMin:11, vocMax:60, imax:15, pmaxPort:500,
    tip:'1 panel de 440 W (Voc 50 V, 10.5 A) — 88% de aprovechamiento con límite de 500 W.', preset:{w:440,voc:50.3,imp:10.5,s:1,p:1}},
  {id:'ef-delta3plus', brand:'EcoFlow', name:'DELTA 3 Plus', cap:'1,024 Wh', priceUSD:799, ports:1, vocMin:11, vocMax:60, imax:15, pmaxPort:800,
    tip:'1 panel de 580 W (Voc 51.7 V, 13.43 A) — aprovechamiento óptimo del 72%.', preset:{w:580,voc:51.7,imp:13.43,s:1,p:1}},
  {id:'ef-delta3', brand:'EcoFlow', name:'DELTA 3', cap:'1,024 Wh', priceUSD:899, ports:1, vocMin:11, vocMax:60, imax:15, pmaxPort:1000,
    tip:'2 paneles de 400 W en paralelo (Voc 46.5 V, 20.6 A) — la corriente recorta a 15 A, entrega ~700 W de pico.', preset:{w:400,voc:46.5,imp:10.3,s:1,p:2}},
  {id:'ef-delta3max', brand:'EcoFlow', name:'DELTA 3 Max', cap:'2,048 Wh', priceUSD:1399, ports:2, vocMin:11, vocMax:60, imax:15, pmaxPort:500,
    tip:'1 panel de 440 W por puerto (2 entradas = 880 W).', preset:{w:440,voc:50.3,imp:10.5,s:1,p:1}},
  {id:'ef-deltapro', brand:'EcoFlow', name:'DELTA Pro', cap:'3,600 Wh', priceUSD:2499, ports:2, vocMin:11, vocMax:150, imax:15, pmaxPort:800,
    tip:'1 panel de 610 W por puerto (2 = 1,220 W de 1,600 W). Un segundo 610 W en el mismo puerto pasaría su tope de 800 W.', preset:{w:610,voc:53.4,imp:13.71,s:1,p:1}},
  {id:'ef-deltapro3', brand:'EcoFlow', name:'DELTA Pro 3', cap:'4,096 Wh', priceUSD:3199, ports:1, vocMin:11, vocMax:150, imax:25, pmaxPort:2600,
    tip:'Entrada solar masiva de 2,600 W (11–150 V, 25 A). Soporta series largas de paneles de 610 W.', preset:{w:610,voc:53.4,imp:13.71,s:2,p:2}},
  {id:'ef-delta3ultraplus', brand:'EcoFlow', name:'DELTA 3 Ultra Plus', cap:'6,144 Wh', priceUSD:4299, ports:2, vocMin:30, vocMax:150, imax:15, pmaxPort:1600,
    tip:'2 paneles de 610 W en serie por entrada (~1,220 W por puerto, 2.4 kW en total).', preset:{w:610,voc:53.4,imp:13.71,s:2,p:1}},
  // Bluetti
  {id:'bt-eb3a', brand:'Bluetti', name:'EB3A', cap:'268 Wh', priceUSD:209, ports:1, vocMin:12, vocMax:28, imax:8.5, pmaxPort:200,
    tip:'1 panel de 200 W (Voc 24.2 V, 8.3 A). La corriente se limita a 8.5 A, aprovechando ~140 W.', preset:{w:200,voc:24.2,imp:8.3,s:1,p:1}},
  {id:'bt-ac2a', brand:'Bluetti', name:'AC2A', cap:'204.8 Wh', priceUSD:159, ports:1, vocMin:12, vocMax:28, imax:8.5, pmaxPort:200,
    tip:'1 panel de 200 W (Voc 24.2 V, 8.3 A). La corriente se limita a 8.5 A, aprovechando ~140 W.', preset:{w:200,voc:24.2,imp:8.3,s:1,p:1}},
  {id:'bt-ac2p', brand:'Bluetti', name:'AC2P', cap:'230.4 Wh', priceUSD:179, ports:1, vocMin:12, vocMax:28, imax:8.2, pmaxPort:200,
    tip:'1 panel de 200 W (Voc 24.2 V, 6.9 A). La corriente se limita a 8.2 A.', preset:{w:200,voc:24.2,imp:6.9,s:1,p:1}},
  {id:'bt-ac50b', brand:'Bluetti', name:'AC50B', cap:'448 Wh', priceUSD:349, ports:1, vocMin:12, vocMax:28, imax:8.5, pmaxPort:200,
    tip:'1 panel de 200 W (Voc 24.2 V, 8.3 A). La corriente al límite de 8.5 A — aprovecha ~170 W.', preset:{w:200,voc:24.2,imp:8.3,s:1,p:1}},
  {id:'bt-ac70', brand:'Bluetti', name:'AC70', cap:'768 Wh', priceUSD:499, ports:1, vocMin:12, vocMax:58, imax:10, pmaxPort:500,
    tip:'1 panel de 440 W (Voc 50.3 V, 8.8 A) — 88% de 500 W. Un segundo panel en paralelo pasa los 10 A.', preset:{w:440,voc:50.3,imp:8.8,s:1,p:1}},
  {id:'bt-ac70p', brand:'Bluetti', name:'AC70P', cap:'864 Wh', priceUSD:549, ports:1, vocMin:12, vocMax:58, imax:10, pmaxPort:500,
    tip:'1 panel de 440 W (Voc 50.3 V, 8.8 A) — 88% de 500 W. Un segundo panel en paralelo pasa los 10 A.', preset:{w:440,voc:50.3,imp:8.8,s:1,p:1}},
  {id:'bt-ac180p', brand:'Bluetti', name:'AC180P', cap:'1,440 Wh', priceUSD:899, ports:1, vocMin:12, vocMax:60, imax:10, pmaxPort:500,
    tip:'1 panel de 440 W (Voc 50.3 V, 8.8 A) — 88% de 500 W. Panel de 580 W recorta a 500 W por amperaje.', preset:{w:440,voc:50.3,imp:8.8,s:1,p:1}},
  {id:'bt-ac200pl', brand:'Bluetti', name:'AC200PL', cap:'2,304 Wh', priceUSD:1499, ports:1, vocMin:12, vocMax:145, imax:15, pmaxPort:1200,
    tip:'2 paneles de 580 W en serie (103.4 V, 13.4 A) — 97% de 1,200 W. Un tercer panel pasa los 15 A.', preset:{w:580,voc:51.7,imp:13.43,s:2,p:1}},
  {id:'bt-ac200l', brand:'Bluetti', name:'AC200L', cap:'2,048 Wh', priceUSD:1399, ports:1, vocMin:12, vocMax:145, imax:15, pmaxPort:1200,
    tip:'2 paneles de 580 W en serie (103.4 V, 13.4 A) — 97% de 1,200 W.', preset:{w:580,voc:51.7,imp:13.43,s:2,p:1}},
  {id:'bt-ac200p', brand:'Bluetti', name:'AC200P', cap:'2,000 Wh', priceUSD:1199, ports:1, vocMin:35, vocMax:150, imax:12, pmaxPort:700,
    tip:'1 panel de 610 W (Voc 53 V entre 35–150 V; 87% de 700 W en modo boost).', preset:{w:610,voc:53.4,imp:13.71,s:1,p:1}},
  {id:'bt-ac300', brand:'Bluetti', name:'AC300', cap:'3,072 Wh (+B300)', priceUSD:2299, ports:2, vocMin:12, vocMax:150, imax:12, pmaxPort:1200,
    tip:'2 paneles de 460 W en serie por entrada — aquí manda el amperaje, no el voltaje.', preset:{w:460,voc:52.3,imp:10.6,s:2,p:1}},
  // Bluetti Elite
  {id:'bt-elite30v2', brand:'Bluetti', name:'Elite 30 V2', cap:'288 Wh', priceUSD:229, ports:1, vocMin:12, vocMax:28, imax:8, pmaxPort:200,
    tip:'1 panel de 200 W (Voc 24.2 V, 8.3 A) — aprovecha ~170 W.', preset:{w:200,voc:24.2,imp:8.3,s:1,p:1}},
  {id:'bt-elite100v2', brand:'Bluetti', name:'Elite 100 V2', cap:'1,024 Wh', priceUSD:699, ports:1, vocMin:12, vocMax:60, imax:20, pmaxPort:1000,
    tip:'1 panel de 550 W (Voc 50 V, 11 A) — 92% de 1,000 W. Su límite de 60V impide series de 2 paneles con paneles estándar.', preset:{w:550,voc:49.95,imp:11.0,s:1,p:1}},
  {id:'bt-elite200v2', brand:'Bluetti', name:'Elite 200 V2', cap:'2,073.6 Wh', priceUSD:1299, ports:1, vocMin:12, vocMax:60, imax:20, pmaxPort:1000,
    tip:'1 panel de 550 W (Voc 50 V, 11 A) — 92% de 1,000 W. Mismo límite de 60V que el Elite 100 V2.', preset:{w:550,voc:49.95,imp:11.0,s:1,p:1}},
  {id:'bt-elite300', brand:'Bluetti', name:'Elite 300', cap:'3,014.4 Wh', priceUSD:1799, ports:1, vocMin:12, vocMax:60, imax:22, pmaxPort:1200,
    tip:'2 paneles de 550 W en paralelo (Voc 50 V, 22 A) — 92% de 1,200 W. Único Elite con margen para 2 paneles gracias a sus 22A.', preset:{w:550,voc:49.95,imp:11.0,s:1,p:2}},
  {id:'bt-elite400', brand:'Bluetti', name:'Elite 400', cap:'3,840 Wh', priceUSD:2199, ports:1, vocMin:12, vocMax:60, imax:20, pmaxPort:1000,
    tip:'1 panel de 550 W (Voc 50 V, 11 A) — 92% de 1,000 W. Con 20A no alcanza para 2 paneles en paralelo.', preset:{w:550,voc:49.95,imp:11.0,s:1,p:1}},
  // Anker SOLIX
  {id:'an-c1000', brand:'Anker SOLIX', name:'C1000', cap:'1,056 Wh', priceUSD:649, ports:1, vocMin:11, vocMax:60, imax:12.5, pmaxPort:600,
    tip:'1 panel de 460 W — el más grande que no se pasa del amperaje (77% de 600 W).', preset:{w:460,voc:52.3,imp:10.6,s:1,p:1}},
  {id:'an-f2000', brand:'Anker SOLIX', name:'F2000', cap:'2,048 Wh', priceUSD:1399, ports:2, vocMin:11, vocMax:60, imax:20, pmaxPort:500,
    tip:'2 entradas MPPT independientes de 500 W cada una (1,000 W solar total).', preset:{w:440,voc:50.3,imp:10.5,s:1,p:2}},
  {id:'an-f2600', brand:'Anker SOLIX', name:'F2600', cap:'2,560 Wh', priceUSD:1699, ports:2, vocMin:11, vocMax:60, imax:20, pmaxPort:500,
    tip:'2 entradas MPPT independientes de 500 W cada una (1,000 W solar total).', preset:{w:440,voc:50.3,imp:10.5,s:1,p:2}},
  {id:'an-f3800', brand:'Anker SOLIX', name:'F3800', cap:'3,840 Wh', priceUSD:2799, ports:2, vocMin:11, vocMax:60, imax:27, pmaxPort:1200,
    tip:'2 entradas MPPT de 1,200 W (2,400 W solar total). Soporta hasta 27 A por puerto.', preset:{w:440,voc:50.3,imp:10.5,s:1,p:2}},
  {id:'an-f3800plus', brand:'Anker SOLIX', name:'F3800 Plus', cap:'3,840 Wh', priceUSD:3299, ports:2, vocMin:11, vocMax:165, imax:17, pmaxPort:1600,
    tip:'2 entradas MPPT de 1,600 W (3,200 W solar total). Voc de hasta 165 V para strings de paneles en serie.', preset:{w:610,voc:53.4,imp:13.71,s:2,p:1}},
  {id:'an-s2000', brand:'Anker SOLIX', name:'S2000', cap:'2,010 Wh', priceUSD:1099, ports:1, vocMin:11, vocMax:60, imax:12.5, pmaxPort:400,
    tip:'1 panel de 400 W (Voc 46.5 V, 10.3 A) — aprovecha los 400 W al límite.', preset:{w:400,voc:46.5,imp:10.3,s:1,p:1}},
  // VTOMAN
  {id:'vt-flashspeed1500', brand:'VTOMAN', name:'FlashSpeed 1500', cap:'1,548 Wh', priceUSD:699, ports:1, vocMin:30, vocMax:60, imax:12, pmaxPort:400,
    tip:'1 panel de 400 W (Voc 30–60V). Carga AC rápida (1h) y función arrancador de auto (V-Starting).', preset:{w:400,voc:46.5,imp:10.3,s:1,p:1}},
  {id:'vt-flashspeed1000', brand:'VTOMAN', name:'FlashSpeed 1000', cap:'828 Wh', priceUSD:499, ports:1, vocMin:12, vocMax:30, imax:10, pmaxPort:300,
    tip:'1 panel de 300 W (Voc 12–30V). Soporta batería extra de expansión y recarga rápida.', preset:{w:300,voc:40.0,imp:9.0,s:1,p:1}},
  {id:'vt-jump1800', brand:'VTOMAN', name:'Jump 1800', cap:'1,548 Wh', priceUSD:599, ports:1, vocMin:12, vocMax:30, imax:10, pmaxPort:200,
    tip:'1 panel de 200 W (Voc 12–30V). Gran capacidad con baterías LiFePO4 expandibles.', preset:{w:200,voc:24.2,imp:8.3,s:1,p:1}},
  {id:'vt-jump1000', brand:'VTOMAN', name:'Jump 1000', cap:'1,408 Wh', priceUSD:499, ports:1, vocMin:12, vocMax:30, imax:8.5, pmaxPort:120,
    tip:'1 panel de 120 W (Voc 12–30V). Batería LiFePO4 duradera de 3,000+ ciclos.', preset:{w:200,voc:24.2,imp:8.3,s:1,p:1}},
  {id:'vt-jump600x', brand:'VTOMAN', name:'Jump 600X', cap:'299 Wh', priceUSD:249, ports:1, vocMin:12, vocMax:28, imax:8.5, pmaxPort:100,
    tip:'1 panel de 100 W. Compacta, portátil y expandible con batería extra.', preset:{w:200,voc:24.2,imp:8.3,s:1,p:1}},
];

const PANELS = [
  {w:200, voc:24.2, imp:10.3},
  {w:300, voc:40.0, imp:9.0},
  {w:330, voc:41.8, imp:9.5},
  {w:400, voc:46.5, imp:10.3},
  {w:440, voc:50.3, imp:10.5},
  {w:460, voc:52.3, imp:10.6},
  {w:550, voc:49.95, imp:13.13},
  {w:580, voc:51.7, imp:13.43},
  {w:610, voc:53.4, imp:13.71},
];

const DEVICES = [
  {id:'phone',   name:'Celular',        w:15,   icon:'📱'},
  {id:'laptop',  name:'Laptop',         w:65,   icon:'💻'},
  {id:'router',  name:'Router WiFi',    w:12,   icon:'📡'},
  {id:'switch-poe', name:'Switch PoE',  w:30,   icon:'🔌'},
  {id:'nvr',     name:'NVR (grabador)', w:25,   icon:'📹'},
  {id:'cam-ip',  name:'Cámara IP',      w:8,    icon:'📷'},
  {id:'starlink-g2', name:'Starlink Gen 2', w:75,  icon:'🛰️'},
  {id:'starlink-g3', name:'Starlink Gen 3', w:130, icon:'🛰️'},
  {id:'radio',   name:'Radio',          w:10,   icon:'📻'},
  {id:'alarm-panel', name:'Panel Alarma', w:20,  icon:'🚨'},
  {id:'led',     name:'Luz LED',        w:10,   icon:'💡'},
  {id:'fan',     name:'Ventilador',     w:40,   icon:'🌀'},
  {id:'tv32',    name:'TV 32"',         w:50,   icon:'📺'},
  {id:'tv55',    name:'TV 55"',         w:120,  icon:'📺'},
  {id:'fridge',  name:'Refrigerador',   w:150,  icon:'🧊'},
  {id:'cpap',    name:'CPAP',           w:40,   icon:'😴'},
  {id:'ps5',     name:'Consola',        w:200,  icon:'🎮'},
  {id:'drill',   name:'Taladro',        w:600,  icon:'🔧'},
  {id:'kettle',  name:'Hervidor',       w:1500, icon:'☕'},
  {id:'microwave',name:'Microondas',    w:1000, icon:'🔥'},
  {id:'heater',  name:'Calentador',    w:1500, icon:'🔥'},
  {id:'ac',      name:'Aire acond.',   w:800,  icon:'❄️'},
];

const USABLE_FACTOR = 0.80;

/* ============================================================
   STATE
   ============================================================ */
let state = {
  stationId: 'ef-deltapro',
  panelIdx: PANELS.findIndex(p=>p.w===610),
  custom: false,
  s: 1,
  p: 1,
};

let autoState = {
  stationId: 'ef-deltapro',
  devices: {}, // { [id]: count }
};

let stationFilterQuery = '';
let autoStationFilterQuery = '';

/* ============================================================
   URL HASH STATE
   ============================================================ */
let navTargetSection = null;

function encodeHash(){
  const p = getPanel();
  const params = new URLSearchParams({
    st: state.stationId,
    pi: state.custom ? 'c' : state.panelIdx,
    s: state.s,
    p: state.p,
    ...(state.custom ? {cw: p.w, cv: p.voc, ci: p.imp} : {}),
    ...(compState.stationA ? {ca: compState.stationA} : {}),
    ...(compState.stationB ? {cb: compState.stationB} : {}),
  });
  return '#' + params.toString();
}

function decodeHash(){
  const hash = window.location.hash.replace('#','');
  if(!hash) return;
  try{
    const params = new URLSearchParams(hash);
    if(params.has('st')){
      const id = params.get('st');
      if(STATIONS.find(s=>s.id===id)) state.stationId = id;
    }
    if(params.has('pi')){
      const pi = params.get('pi');
      if(pi === 'c'){
        state.custom = true;
        if(params.has('cw')) state._customW = parseFloat(params.get('cw'));
        if(params.has('cv')) state._customVoc = parseFloat(params.get('cv'));
        if(params.has('ci')) state._customImp = parseFloat(params.get('ci'));
      } else {
        const idx = parseInt(pi,10);
        if(!isNaN(idx) && idx >= 0 && idx < PANELS.length){
          state.panelIdx = idx;
          state.custom = false;
        }
      }
    }
    if(params.has('s')){ const v=parseInt(params.get('s'),10); if(v>=1&&v<=8) state.s=v; }
    if(params.has('p')){ const v=parseInt(params.get('p'),10); if(v>=1&&v<=8) state.p=v; }
    if(params.has('ca')){
      const ca = params.get('ca');
      if(STATIONS.find(s=>s.id===ca)){
        compState.stationA = ca;
        navTargetSection = 'comparador';
      }
    }
    if(params.has('cb')){
      const cb = params.get('cb');
      if(STATIONS.find(s=>s.id===cb)){
        compState.stationB = cb;
        navTargetSection = 'comparador';
      }
    }
  } catch(e){ /* ignore malformed hash */ }
}

function pushHash(){
  const newHash = encodeHash();
  if(window.location.hash !== newHash){
    history.replaceState(null, '', newHash);
  }
}

/* ============================================================
   HELPERS
   ============================================================ */
function fmt(n, d=1){
  return Number(n).toLocaleString('es-MX', {maximumFractionDigits:d, minimumFractionDigits:0});
}
function getStation(id){ return STATIONS.find(s=>s.id===id); }

/* Animated number tween (counter) */
const numAnimState = new WeakMap();
function animateNumber(el, target, options = {}){
  if(!el) return;
  const {
    duration = 400,
    format = v => fmt(v, 1),
    onDone = null,
  } = options;
  // Read previous numeric value from data-current (or 0)
  const prev = parseFloat(el.dataset.current || '0');
  const tgt = parseFloat(target);
  if(isNaN(tgt)){
    el.textContent = target;
    return;
  }
  if(prev === tgt){
    el.textContent = format(tgt);
    return;
  }
  // Cancel previous animation on this element
  const old = numAnimState.get(el);
  if(old) cancelAnimationFrame(old);
  const start = performance.now();
  const diff = tgt - prev;
  function step(now){
    const t = Math.min(1, (now - start) / duration);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - t, 3);
    const val = prev + diff * eased;
    el.textContent = format(val);
    if(t < 1){
      numAnimState.set(el, requestAnimationFrame(step));
    } else {
      el.textContent = format(tgt);
      el.dataset.current = String(tgt);
      numAnimState.delete(el);
      pulseEl(el);
      if(onDone) onDone();
    }
  }
  el.dataset.current = String(prev);
  numAnimState.set(el, requestAnimationFrame(step));
}

/* Brief scale pulse to indicate a change */
function pulseEl(el){
  if(!el) return;
  el.classList.remove('num-pulse');
  void el.offsetWidth; // force reflow
  el.classList.add('num-pulse');
}
function getPanel(){
  if(state.custom){
    return {
      w: parseFloat(document.getElementById('customW').value)||0,
      voc: parseFloat(document.getElementById('customVoc').value)||0,
      imp: parseFloat(document.getElementById('customImp').value)||0,
    };
  }
  return PANELS[state.panelIdx];
}

function parseCapacity(capStr){
  const cleaned = capStr.replace(/\([^)]*\)/g,'');
  const parts = cleaned.match(/[\d,]+(?:\.\d+)?/g);
  if(!parts) return 0;
  const nums = parts.map(n => parseFloat(n.replace(/,/g,'')));
  if(nums.length >= 2 && /[–-]/.test(cleaned)) return (nums[0] + nums[1]) / 2;
  return nums[0];
}

function formatDurationShort(hours){
  if(hours >= 24) return fmt(hours / 24, 1) + ' d';
  if(hours >= 1){
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    return m > 0 ? `${h} h ${m} min` : `${h} h`;
  }
  const mins = Math.round(hours * 60);
  return mins < 1 ? '< 1 min' : `${mins} min`;
}

function formatDurationMain(hours, totalW){
  if(hours >= 1){
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    return {
      main: h,
      unit: 'h',
      sub: m > 0 ? `y ${m} min · ${totalW} W total` : `con ${totalW} W de consumo`,
    };
  }
  const mins = Math.round(hours * 60);
  return {
    main: mins < 1 ? '<1' : mins,
    unit: 'min',
    sub: `con ${totalW} W de consumo`,
  };
}

function stationMatchesQuery(st, q){
  if(!q) return true;
  const haystack = `${st.name} ${st.brand} ${st.cap}`.toLowerCase();
  return haystack.includes(q);
}

function buildStationSelect(sel, selectedId, filterQuery, onChange){
  const q = filterQuery.trim().toLowerCase();
  sel.innerHTML = '';
  const brands = [...new Set(STATIONS.map(s=>s.brand))];
  let hasVisible = false;
  brands.forEach(brand=>{
    const visible = STATIONS.filter(s=>s.brand===brand && stationMatchesQuery(s, q));
    if(!visible.length) return;
    hasVisible = true;
    const grp = document.createElement('optgroup');
    grp.label = brand;
    visible.forEach(st=>{
      const opt = document.createElement('option');
      opt.value = st.id;
      opt.textContent = st.name + (st.incompatible ? ' ⚠' : '');
      if(st.id === selectedId) opt.selected = true;
      grp.appendChild(opt);
    });
    sel.appendChild(grp);
  });
  if(!hasVisible){
    const opt = document.createElement('option');
    opt.textContent = 'Sin resultados';
    opt.disabled = true;
    sel.appendChild(opt);
    return null;
  }
  const stillVisible = STATIONS.some(s=>s.id===selectedId && stationMatchesQuery(s, q));
  if(!stillVisible){
    const first = sel.querySelector('option:not([disabled])');
    if(first){
      first.selected = true;
      if(onChange) onChange(first.value);
    }
  }
  return sel.value;
}

/* ============================================================
   RENDER: dropdown (grouped by brand)
   ============================================================ */
let stationSelectWired = false;
function renderStationSelect(){
  const sel = document.getElementById('stationSelect');
  buildStationSelect(sel, state.stationId, stationFilterQuery, id=>{
    state.stationId = id;
    syncAutoStation(id);
    render();
  });
  if(!stationSelectWired){
    sel.addEventListener('change', e=>{
      state.stationId = e.target.value;
      syncAutoStation(e.target.value);
      render();
    });
    stationSelectWired = true;
  }
}

function syncAutoStation(id){
  autoState.stationId = id;
  const autoSel = document.getElementById('autoStation');
  if(!autoSel) return;
  if(autoSel.value !== id) buildStationSelect(autoSel, id, autoStationFilterQuery);
  renderAutonomy();
}

/* ============================================================
   RENDER: panel chips
   ============================================================ */
function renderPanelChips(){
  const wrap = document.getElementById('panelChips');
  wrap.innerHTML = '';
  PANELS.forEach((p, i)=>{
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'chip' + (!state.custom && state.panelIdx===i ? ' active' : '');
    chip.textContent = p.w + ' W';
    chip.setAttribute('aria-pressed', (!state.custom && state.panelIdx===i).toString());
    chip.setAttribute('draggable', 'true');
    chip.title = 'Clic para usar · Arrastra a la calculadora';
    chip.addEventListener('click', ()=>{
      state.custom = false;
      state.panelIdx = i;
      document.getElementById('customFields').style.display = 'none';
      render();
    });
    // Drag and drop
    chip.addEventListener('dragstart', (e)=>{
      chip.classList.add('dragging');
      e.dataTransfer.setData('text/panel-idx', String(i));
      e.dataTransfer.effectAllowed = 'copy';
    });
    chip.addEventListener('dragend', ()=>{
      chip.classList.remove('dragging');
    });
    wrap.appendChild(chip);
  });
  const customChip = document.createElement('button');
  customChip.type = 'button';
  customChip.className = 'chip' + (state.custom ? ' active' : '');
  customChip.textContent = 'Personalizado';
  customChip.setAttribute('aria-pressed', state.custom.toString());
  customChip.addEventListener('click', ()=>{
    state.custom = true;
    document.getElementById('customFields').style.display = 'grid';
    render();
  });
  wrap.appendChild(customChip);

  // Restore custom values from hash if needed
  if(state.custom && state._customW){
    document.getElementById('customW').value = state._customW;
    document.getElementById('customVoc').value = state._customVoc || '';
    document.getElementById('customImp').value = state._customImp || '';
    document.getElementById('customFields').style.display = 'grid';
  }
}

/* Wire drop zone on calculator */
function wirePanelDropZone(){
  const dropZone = document.querySelector('.calc');
  if(!dropZone) return;
  dropZone.classList.add('panel-drop-zone');
  dropZone.addEventListener('dragover', (e)=>{
    if(e.dataTransfer.types.includes('text/panel-idx')){
      e.preventDefault();
      e.dataTransfer.dropEffect = 'copy';
      dropZone.classList.add('dragover');
    }
  });
  dropZone.addEventListener('dragleave', (e)=>{
    if(e.target === dropZone) dropZone.classList.remove('dragover');
  });
  dropZone.addEventListener('drop', (e)=>{
    e.preventDefault();
    dropZone.classList.remove('dragover');
    const idx = e.dataTransfer.getData('text/panel-idx');
    if(idx === '') return;
    const i = parseInt(idx, 10);
    if(isNaN(i) || i < 0 || i >= PANELS.length) return;
    state.custom = false;
    state.panelIdx = i;
    document.getElementById('customFields').style.display = 'none';
    render();
    showToast('Panel seleccionado', `${PANELS[i].w} W (Voc ${PANELS[i].voc} V, Imp ${PANELS[i].imp} A)`, 'success');
  });
}

/* ============================================================
   STEPPERS
   ============================================================ */
function wireSteppers(){
  document.getElementById('sMinus').addEventListener('click', ()=>{ state.s = Math.max(1, state.s-1); render(); });
  document.getElementById('sPlus').addEventListener('click',  ()=>{ state.s = Math.min(8, state.s+1); render(); });
  document.getElementById('pMinus').addEventListener('click', ()=>{ state.p = Math.max(1, state.p-1); render(); });
  document.getElementById('pPlus').addEventListener('click',  ()=>{ state.p = Math.min(8, state.p+1); render(); });
  ['customW','customVoc','customImp'].forEach(id=>{
    document.getElementById(id).addEventListener('input', render);
  });
}

/* ============================================================
   SHARE BUTTON
   ============================================================ */
function wireShareBtn(){
  const btn = document.getElementById('shareBtn');
  const txt = document.getElementById('shareBtnText');
  btn.addEventListener('click', ()=>{
    const url = window.location.origin + window.location.pathname + encodeHash();
    const fallback = ()=>{
      const tmp = document.createElement('input');
      tmp.value = url;
      document.body.appendChild(tmp);
      tmp.select();
      document.execCommand('copy');
      document.body.removeChild(tmp);
      showToast('Enlace copiado', 'La configuración está en tu portapapeles', 'success');
    };
    if(navigator.clipboard && window.isSecureContext){
      navigator.clipboard.writeText(url).then(()=>{
        showToast('Enlace copiado', 'La configuración está en tu portapapeles', 'success');
      }).catch(fallback);
    } else {
      fallback();
    }
    btn.classList.add('copied');
    txt.textContent = '¡Copiado!';
    setTimeout(()=>{ btn.classList.remove('copied'); txt.textContent = 'Compartir configuración'; }, 2000);
  });
}

/* ============================================================
   TOAST NOTIFICATIONS
   ============================================================ */
function showToast(title, msg, type){
  const container = document.getElementById('toastContainer');
  if(!container) return;
  const toast = document.createElement('div');
  toast.className = 'toast' + (type ? ' toast-' + type : '');
  const icons = {success:'✅', warn:'⚠️', error:'❌', info:'ℹ️'};
  const icon = icons[type || 'info'] || 'ℹ️';
  toast.innerHTML = `
    <span class="toast-icon">${icon}</span>
    <div class="toast-body">
      <div class="toast-title">${title}</div>
      ${msg ? `<div class="toast-msg">${msg}</div>` : ''}
    </div>
  `;
  container.appendChild(toast);
  setTimeout(()=>{
    toast.classList.add('toast-out');
    setTimeout(()=> toast.remove(), 300);
  }, 3500);
}

/* ============================================================
   SAVED PRESETS (localStorage)
   ============================================================ */
const PRESETS_KEY = 'calc_presets_v1';

function loadPresets(){
  try {
    const raw = localStorage.getItem(PRESETS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch(e){ return []; }
}

function savePresets(presets){
  try {
    localStorage.setItem(PRESETS_KEY, JSON.stringify(presets));
  } catch(e){
    showToast('Error', 'No se pudo guardar el preset', 'error');
  }
}

function addPreset(name){
  const presets = loadPresets();
  const p = getPanel();
  const preset = {
    id: 'p_' + Date.now(),
    name: name || `${getStation(state.stationId).name} · ${p.w}W`,
    stationId: state.stationId,
    panelIdx: state.custom ? null : state.panelIdx,
    custom: state.custom,
    customW: state.custom ? p.w : null,
    customVoc: state.custom ? p.voc : null,
    customImp: state.custom ? p.imp : null,
    s: state.s,
    p: state.p,
    createdAt: Date.now(),
  };
  presets.unshift(preset);
  // Cap at 10 presets
  if(presets.length > 10) presets.length = 10;
  savePresets(presets);
  renderPresets();
  showToast('Guardado', `"${preset.name}" está en tu lista`, 'success');
}

function deletePreset(id){
  const presets = loadPresets().filter(p => p.id !== id);
  savePresets(presets);
  renderPresets();
  showToast('Eliminado', 'Preset borrado', 'info');
}

function loadPreset(id){
  const preset = loadPresets().find(p => p.id === id);
  if(!preset) return;
  state.stationId = preset.stationId;
  if(preset.custom){
    state.custom = true;
    state._customW = preset.customW;
    state._customVoc = preset.customVoc;
    state._customImp = preset.customImp;
    document.getElementById('customW').value = preset.customW;
    document.getElementById('customVoc').value = preset.customVoc;
    document.getElementById('customImp').value = preset.customImp;
    document.getElementById('customFields').style.display = 'grid';
  } else {
    state.custom = false;
    state.panelIdx = preset.panelIdx;
  }
  state.s = preset.s;
  state.p = preset.p;
  document.getElementById('stationSelect').value = preset.stationId;
  renderPanelChips();
  render();
  showToast('Cargado', `"${preset.name}" aplicado a la calculadora`, 'info');
}

function renderPresets(){
  const bar = document.getElementById('presetBar');
  const list = document.getElementById('presetList');
  const presets = loadPresets();
  if(presets.length === 0){
    bar.style.display = 'none';
    return;
  }
  bar.style.display = 'flex';
  list.innerHTML = '';
  presets.forEach(p=>{
    const pill = document.createElement('span');
    pill.className = 'preset-pill';
    pill.title = 'Clic para cargar esta configuración';
    pill.innerHTML = `
      <span class="pp-name" data-id="${p.id}">${p.name}</span>
      <button class="pp-del" data-del="${p.id}" title="Eliminar preset" aria-label="Eliminar">×</button>
    `;
    pill.querySelector('.pp-name').addEventListener('click', ()=> loadPreset(p.id));
    pill.querySelector('.pp-del').addEventListener('click', (e)=>{
      e.stopPropagation();
      deletePreset(p.id);
    });
    list.appendChild(pill);
  });
}

function wirePresets(){
  const saveBtn = document.getElementById('savePresetBtn');
  if(!saveBtn) return;
  saveBtn.addEventListener('click', ()=>{
    const station = getStation(state.stationId);
    const panel = getPanel();
    const defaultName = `${station.name} · ${panel.w}W ×${state.s}S/${state.p}P`;
    const name = prompt('Nombre para esta configuración:', defaultName);
    if(name === null) return; // Cancel
    addPreset(name.trim() || defaultName);
  });
}

/* ============================================================
   SCROLL TO TOP
   ============================================================ */
function wireScrollTop(){
  const btn = document.getElementById('scrollTop');
  window.addEventListener('scroll', ()=>{
    btn.classList.toggle('visible', window.scrollY > 300);
  }, {passive:true});
  btn.addEventListener('click', ()=>{ window.scrollTo({top:0, behavior:'smooth'}); });
}

/* ============================================================
   SCROLL PROGRESS BAR
   ============================================================ */
function wireScrollProgress(){
  const bar = document.querySelector('#scrollProgress .sp-bar');
  if(!bar) return;
  let ticking = false;
  function update(){
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0;
    bar.style.width = pct + '%';
    ticking = false;
  }
  window.addEventListener('scroll', ()=>{
    if(!ticking){
      requestAnimationFrame(update);
      ticking = true;
    }
  }, {passive:true});
  update();
}

/* ============================================================
   THEME TOGGLE
   ============================================================ */
const THEME_KEY = 'calc_theme_v1';

function applyTheme(theme){
  const body = document.body;
  if(theme === 'blueprint'){
    body.setAttribute('data-theme', 'blueprint');
  } else {
    body.removeAttribute('data-theme');
  }
  const btn = document.getElementById('themeToggle');
  if(btn){
    btn.textContent = theme === 'blueprint' ? '☀️' : '🌙';
    btn.setAttribute('aria-pressed', theme === 'blueprint' ? 'true' : 'false');
    btn.setAttribute('aria-label', theme === 'blueprint' ? 'Cambiar a tema oscuro' : 'Cambiar a tema claro');
  }
}

function wireThemeToggle(){
  const btn = document.getElementById('themeToggle');
  if(!btn) return;
  // Restore saved theme
  const saved = (() => { try { return localStorage.getItem(THEME_KEY); } catch(e) { return null; }})();
  if(saved === 'blueprint') applyTheme('blueprint');
  btn.addEventListener('click', ()=>{
    const current = document.body.getAttribute('data-theme');
    const next = current === 'blueprint' ? 'dark' : 'blueprint';
    applyTheme(next === 'dark' ? null : next);
    try { localStorage.setItem(THEME_KEY, next === 'dark' ? '' : next); } catch(e){}
    showToast(
      next === 'blueprint' ? 'Tema blueprint' : 'Tema oscuro',
      next === 'blueprint' ? 'Modo claro tipo papel técnico' : 'Volviendo al tema navy',
      'info'
    );
  });
}

/* ============================================================
   MAIN RENDER
   ============================================================ */
function render(){
  const st = getStation(state.stationId);
  const panel = getPanel();
  document.getElementById('sCount').textContent = state.s;
  document.getElementById('pCount').textContent = state.p;

  document.getElementById('portsNote').textContent =
    st.ports > 1
      ? `Esta estación tiene ${st.ports} entradas MPPT independientes. Los valores de abajo son por UNA entrada — multiplica por ${st.ports} si repites la misma config en cada una.`
      : `Esta estación tiene 1 sola entrada MPPT.`;

  // Update chip aria-pressed
  document.querySelectorAll('#panelChips .chip').forEach((chip,i)=>{
    if(i < PANELS.length){
      chip.classList.toggle('active', !state.custom && state.panelIdx===i);
      chip.setAttribute('aria-pressed', (!state.custom && state.panelIdx===i).toString());
    } else {
      chip.classList.toggle('active', state.custom);
      chip.setAttribute('aria-pressed', state.custom.toString());
    }
  });

  const totalVoc = panel.voc * state.s;
  const totalImp = panel.imp * state.p;
  const totalW   = panel.w  * state.s * state.p;

  // Voltage bar
  document.getElementById('vLabelMin').textContent = st.vocMin + ' V mín';
  document.getElementById('vLabelMax').textContent = st.vocMax + ' V máx';
  const vocPct = Math.min(100, (totalVoc/st.vocMax)*100);
  const vFill = document.getElementById('vFill');
  vFill.style.width = vocPct + '%';
  const minPct = Math.min(100,(st.vocMin/st.vocMax)*100);
  document.getElementById('vMarker').style.left = minPct + '%';

  // Status flags
  const vocOK  = totalVoc >= st.vocMin && totalVoc <= st.vocMax;
  const impOK  = totalImp <= st.imax;
  const wattOK = totalW   <= st.pmaxPort;

  if(!vocOK)          vFill.className = 'vbar-fill bad';
  else if(!impOK||!wattOK) vFill.className = 'vbar-fill warn';
  else                vFill.className = 'vbar-fill';

  // Utilization
  const util = st.incompatible ? 0 : Math.min(100, Math.round((Math.min(totalW, st.pmaxPort)/st.pmaxPort)*100));
  const utilBar = document.getElementById('utilBar');
  const utilPct = document.getElementById('utilPct');
  utilBar.style.width = util + '%';
  if(st.incompatible || !vocOK){ utilBar.className='util-bar-inner bad'; utilPct.style.color='var(--warn)'; }
  else if(!impOK||!wattOK){       utilBar.className='util-bar-inner warn'; utilPct.style.color='var(--copper)'; }
  else{                            utilBar.className='util-bar-inner'; utilPct.style.color='var(--teal)'; }
  utilPct.textContent = st.incompatible ? '—' : util + '%';
  if(!st.incompatible) pulseEl(utilPct);

  // Metric values (with animated counters)
  animateNumber(document.getElementById('outVoc'), totalVoc, {format: v => fmt(v) + ' V'});
  document.getElementById('outVoc').style.color = vocOK ? 'var(--paper)' : 'var(--warn)';
  document.getElementById('outVocLim').textContent = `rango ${st.vocMin}–${st.vocMax} V`;

  animateNumber(document.getElementById('outImp'), totalImp, {format: v => fmt(v) + ' A'});
  document.getElementById('outImp').style.color = impOK ? 'var(--paper)' : 'var(--copper)';
  document.getElementById('outImpLim').textContent = `máx ${fmt(st.imax)} A`;

  animateNumber(document.getElementById('outW'), totalW, {format: v => fmt(v, 0) + ' W'});
  document.getElementById('outW').style.color = wattOK ? 'var(--paper)' : 'var(--copper)';
  document.getElementById('outWLim').textContent = `techo ${fmt(st.pmaxPort,0)} W / entrada`;

  // Status box
  const statusBox = document.getElementById('statusBox');
  if(st.incompatible){
    statusBox.className = 'result-status bad';
    statusBox.textContent = '🚫 Esta estación no acepta paneles de este rango — voltaje mínimo del puerto muy bajo';
  } else if(!vocOK && totalVoc > st.vocMax){
    statusBox.className = 'result-status bad';
    statusBox.textContent = `🚫 Voltaje excede el máximo (${fmt(totalVoc)} V > ${st.vocMax} V) — riesgo de daño al puerto`;
  } else if(!vocOK && totalVoc < st.vocMin){
    statusBox.className = 'result-status warn';
    statusBox.textContent = `⚠ Voltaje por debajo del mínimo (${fmt(totalVoc)} V < ${st.vocMin} V) — puede no iniciar carga`;
  } else if(!impOK){
    statusBox.className = 'result-status warn';
    statusBox.textContent = `⚠ Corriente excede el máximo — el exceso se desperdicia, no daña la unidad`;
  } else if(!wattOK){
    statusBox.className = 'result-status warn';
    statusBox.textContent = `⚠ Potencia por encima del techo — la estación recorta a ${fmt(st.pmaxPort,0)} W`;
  } else {
    statusBox.className = 'result-status ok';
    statusBox.textContent = `✅ Configuración segura — ${util}% de aprovechamiento por entrada`;
  }

  // Total line
  const totalSystemW = Math.min(totalW, st.pmaxPort) * st.ports;
  document.getElementById('totalLine').innerHTML =
    st.ports > 1
      ? `Repitiendo esta config en las <b>${st.ports} entradas</b>: <b>${state.s*state.p*st.ports} paneles</b>, ~<b>${fmt(totalSystemW,0)} W</b> de sistema en total.`
      : `Total del sistema: <b>${state.s*state.p} paneles</b>, ~<b>${fmt(totalSystemW,0)} W</b>.`;

  // Update URL hash
  pushHash();
}

/* ============================================================
   CATALOG / GALLERY
   ============================================================ */
let activeBrand = 'Todas';
let searchQuery  = '';

function renderBrandTabs(){
  const brands = ['Todas', ...new Set(STATIONS.map(s=>s.brand))];
  const wrap = document.getElementById('brandTabs');
  wrap.innerHTML = '';
  brands.forEach(b=>{
    const btn = document.createElement('button');
    btn.className = 'brand-tab' + (activeBrand===b ? ' active' : '');
    btn.textContent = b;
    btn.setAttribute('role','tab');
    btn.setAttribute('aria-selected', activeBrand===b ? 'true':'false');
    btn.addEventListener('click', ()=>{ activeBrand = b; renderBrandTabs(); renderPlates(); });
    wrap.appendChild(btn);
  });
}

function buildImgHtml(st){
  const src = IMG[st.id];
  if(src){
    return `<img src="${src}" alt="Foto de ${st.name}" loading="lazy" data-station-id="${st.id}">`;
  }
  return imgPlaceholder(st);
}

function renderPlates(){
  const grid = document.getElementById('plateGrid');
  const q = searchQuery.trim().toLowerCase();

  const filtered = STATIONS.filter(s=>{
    const brandMatch = activeBrand==='Todas' || s.brand===activeBrand;
    if(!q) return brandMatch;
    const haystack = `${s.name} ${s.brand} ${s.cap} ${s.pmaxPort}W`.toLowerCase();
    return brandMatch && haystack.includes(q);
  });

  // Update count
  const countEl = document.getElementById('searchCount');
  if(q || activeBrand!=='Todas'){
    countEl.textContent = `${filtered.length} resultado${filtered.length!==1?'s':''}`;
  } else {
    countEl.textContent = '';
  }

  grid.innerHTML = '';

  if(filtered.length === 0){
    grid.innerHTML = `<div class="no-results"><span>🔍</span>No se encontraron estaciones para "${q}".</div>`;
    return;
  }

  filtered.forEach(st=>{
    const plate = document.createElement('div');
    plate.className = 'plate';
    const badgeClass = st.ports > 1 ? 'mppt-badge' : 'mppt-badge single';
    const badgeLabel = st.ports > 1 ? `${st.ports}× MPPT` : '1× MPPT';
    plate.innerHTML = `
      <div class="plate-img-col">${buildImgHtml(st)}</div>
      <div class="plate-content">
        <div class="plate-top">
          <div>
            <div class="plate-name">${st.name}</div>
            <div class="plate-cap mono">${st.brand} · ${st.cap}</div>
          </div>
          <span class="${badgeClass}" aria-label="${st.ports} entrada${st.ports>1?'s':''} MPPT">${badgeLabel}</span>
        </div>
        <div class="plate-specs">
          <div class="spec"><div class="k" data-tip="Rango de voltaje en circuito abierto que acepta la entrada MPPT. Si los paneles en serie lo exceden, dispara la protección.">Voc range</div><div class="v">${st.vocMin}–${st.vocMax} V</div></div>
          <div class="spec"><div class="k" data-tip="Corriente máxima que la entrada MPPT puede manejar. Excederlo no daña la estación pero la corriente sobrante se desperdicia.">Imax</div><div class="v">${fmt(st.imax)} A</div></div>
          <div class="spec"><div class="k" data-tip="Potencia máxima de paneles que la entrada puede aprovechar. Sumar más potencia desperdicia el excedente.">Pmax / entrada</div><div class="v">${fmt(st.pmaxPort,0)} W</div></div>
        </div>
        <div class="plate-foot">
          <div class="plate-tip">${st.tip}</div>
          <button class="use-btn" data-id="${st.id}" ${st.incompatible ? 'disabled aria-disabled="true"' : ''}>
            ${st.incompatible ? 'No compatible' : 'Usar en calculadora ↑'}
          </button>
        </div>
      </div>
    `;
    grid.appendChild(plate);

    const imgEl = plate.querySelector('img[data-station-id]');
    if(imgEl){
      imgEl.addEventListener('error', () => {
        imgEl.parentNode.innerHTML = imgPlaceholder(getStation(imgEl.dataset.stationId));
      }, { once: true });
    }
  });

  document.querySelectorAll('.use-btn:not([disabled])').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const id = btn.getAttribute('data-id');
      const st = getStation(id);
      state.stationId = id;
      document.getElementById('stationSelect').value = id;
      syncAutoStation(id);
      if(st.preset){
        state.custom = false;
        state.panelIdx = PANELS.findIndex(p=>p.w===st.preset.w);
        state.s = st.preset.s;
        state.p = st.preset.p;
      }
      renderPanelChips();
      render();
      document.getElementById('calculadora').scrollIntoView({behavior:'smooth', block:'start'});
    });
  });
}

/* ============================================================
   STATION SEARCH (calculator + autonomy)
   ============================================================ */
function wireStationSearch(){
  const input = document.getElementById('stationSearch');
  const clearBtn = document.getElementById('stationSearchClear');
  input.addEventListener('input', ()=>{
    stationFilterQuery = input.value;
    clearBtn.style.display = stationFilterQuery ? 'block' : 'none';
    renderStationSelect();
    render();
  });
  clearBtn.addEventListener('click', ()=>{
    input.value = '';
    stationFilterQuery = '';
    clearBtn.style.display = 'none';
    input.focus();
    renderStationSelect();
    render();
  });
}

function wireAutoStationSearch(){
  const input = document.getElementById('autoStationSearch');
  const clearBtn = document.getElementById('autoStationSearchClear');
  input.addEventListener('input', ()=>{
    autoStationFilterQuery = input.value;
    clearBtn.style.display = autoStationFilterQuery ? 'block' : 'none';
    renderAutoStationSelect();
  });
  clearBtn.addEventListener('click', ()=>{
    input.value = '';
    autoStationFilterQuery = '';
    clearBtn.style.display = 'none';
    input.focus();
    renderAutoStationSelect();
  });
}

/* ============================================================
   SOLAR CHARGE SIMULATOR — REGIONS (irradiación solar mensual W/m², horas pico)
   ============================================================ */
const REGIONS = [
  {id:'norte',  name:'Norte (Chihuahua)',    worst:3.5, avg:5.5, best:7.5},
  {id:'noroeste',name:'Noroeste (Sonora)',    worst:3.8, avg:5.8, best:7.8},
  {id:'norte-centro',name:'Norte-centro (Coahuila)', worst:3.5, avg:5.2, best:7.2},
  {id:'bajio',name:'Bajío (Guanajuato)',    worst:4.0, avg:5.8, best:7.8},
  {id:'centro', name:'Centro (CDMX)',         worst:4.2, avg:6.0, best:8.0},
  {id:'centro-oriente',name:'Centro-oriente (Puebla)', worst:4.0, avg:5.8, best:7.6},
  {id:'occidente',name:'Occidente (Jalisco)', worst:3.8, avg:5.5, best:7.5},
  {id:'pacífico',name:'Pacífico (Michoacán)', worst:4.0, avg:6.0, best:8.0},
  {id:'sur',   name:'Sur (Oaxaca)',           worst:3.5, avg:5.5, best:7.5},
  {id:'sureste',name:'Sureste (Yucatán)',    worst:4.0, avg:6.2, best:8.5},
  {id:'peninsula',name:'Península (Cancún)',  worst:4.5, avg:6.5, best:8.5},
  {id:'cuba',     name:'Cuba (La Habana)',     worst:4.0, avg:6.0, best:8.0},
];

let simState = {
  stationId: 'ef-deltapro',
  panels: 1,
  panelWatt: 550,
  regionId: 'centro',
};

/* Render simulator station select */
function renderSimStationSelect(){
  const sel = document.getElementById('simStation');
  sel.innerHTML = '';
  STATIONS.forEach(st=>{
    const opt = document.createElement('option');
    opt.value = st.id;
    opt.textContent = st.brand + ' · ' + st.name;
    if(st.id === simState.stationId) opt.selected = true;
    sel.appendChild(opt);
  });
}

/* Render region chips */
function renderRegionChips(){
  const wrap = document.getElementById('regionChips');
  wrap.innerHTML = '';
  REGIONS.forEach(r=>{
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'region-chip' + (r.id === simState.regionId ? ' active' : '');
    chip.textContent = r.name;
    chip.addEventListener('click', ()=>{
      simState.regionId = r.id;
      renderRegionChips();
      renderSimulator();
    });
    wrap.appendChild(chip);
  });
}

/* Main render for simulator */
function renderSimulator(){
  const st = getStation(simState.stationId);
  const capacity = parseCapacity(st.cap);
  const panels = simState.panels;
  const panelW = simState.panelWatt;
  const region = REGIONS.find(r=>r.id===simState.regionId);

  // Solar power (accounting for station limit)
  const rawW = panelW * panels;
  const solarW = Math.min(rawW, st.pmaxPort * st.ports);
  const efficiency = 0.85; // average panel efficiency

  document.getElementById('simCap').textContent = st.cap;
  document.getElementById('simPower').textContent = solarW + ' W';
  document.getElementById('simHours').textContent = region.avg + ' h';

  function calcHours(irradiation){
    // Energy: W_station = solarW * efficiency * irradiation
    const dailyWh = solarW * efficiency * irradiation;
    const days = capacity / dailyWh;
    // If more than 1 day, return days; else return hours
    if(days >= 1) return days;
    return capacity / (solarW * efficiency);
  }

  const worstH = calcHours(region.worst);
  const avgH = calcHours(region.avg);
  const bestH = calcHours(region.best);

  function fmtH(h){
    if(h >= 24) return Math.round(h/24 * 10)/10 + ' d';
    if(h >= 1) return Math.round(h * 10)/10 + ' h';
    return Math.round(h * 60) + ' min';
  }

  document.getElementById('simWorst').textContent = fmtH(worstH);
  pulseEl(document.getElementById('simWorst'));
  document.getElementById('simAvg').textContent = fmtH(avgH);
  pulseEl(document.getElementById('simAvg'));
  document.getElementById('simBest').textContent = fmtH(bestH);
  pulseEl(document.getElementById('simBest'));

  const note = document.getElementById('simNote');
  const solarPct = Math.round((solarW / rawW) * 100);
  if(panels > 1 && solarPct < 100){
    note.innerHTML = `<b>Techo activo:</b> la estación limita a <b>${st.pmaxPort * st.ports} W</b>. Con ${panels} paneles de ${panelW} W (${rawW} W) estás al <b>${solarPct}%</b> del potencial.`;
  } else if(rawW > st.pmaxPort * st.ports){
    note.innerHTML = `<b>Potencia limitada:</b> ${panels}×${panelW}W = ${rawW}W supera el límite de ${st.pmaxPort * st.ports}W de la estación. Se aprovecha al ${solarPct}%.`;
  } else if(avgH >= 6){
    note.innerHTML = `<b>Buena opción:</b> con ${region.name}, la estación se carga completamente en ~<b>${fmtH(avgH)}</b> con ${panels}×${panelW}W en condiciones promedio.`;
  } else {
    note.innerHTML = `<b>Carga lenta:</b> se necesitan ~<b>${fmtH(avgH)}</b> en condiciones promedio. Considera más paneles o mayor potencia por panel.`;
  }

  // Update solar house battery visualization
  if(typeof updateSolarHouse === 'function') updateSolarHouse();
}

/* Wire simulator */
function wireSimulator(){
  document.getElementById('simStation').addEventListener('change', e=>{
    simState.stationId = e.target.value;
    renderSimulator();
  });
  document.getElementById('simPanels').addEventListener('change', e=>{
    simState.panels = parseInt(e.target.value, 10);
    renderSimulator();
  });
  document.getElementById('simPanelWatt').addEventListener('change', e=>{
    simState.panelWatt = parseInt(e.target.value, 10);
    renderSimulator();
  });
}

/* ============================================================
   COMPARATOR
   ============================================================ */
let compState = {
  stationA: 'ef-delta2',
  stationB: 'ef-deltapro',
};

function buildCompList(container, selectedId, filter, onSelect){
  const q = (filter||'').trim().toLowerCase();
  container.innerHTML = '';
  const brands = [...new Set(STATIONS.map(s=>s.brand))];
  let count = 0;
  brands.forEach(brand=>{
    const visible = STATIONS.filter(s=>s.brand===brand && (!q || `${s.name} ${s.brand} ${s.cap} $${s.priceUSD||0}`.toLowerCase().includes(q)));
    if(!visible.length) return;
    
    const label = document.createElement('div');
    label.className = 'comp-group-label';
    label.textContent = brand;
    container.appendChild(label);

    visible.forEach(st=>{
      count++;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'comp-item-btn' + (st.id === selectedId ? ' selected' : '');
      btn.setAttribute('role', 'option');
      btn.setAttribute('aria-selected', (st.id === selectedId).toString());
      btn.innerHTML = `
        <span>${st.name}</span>
        <span class="comp-item-meta">
          <span>${st.cap}</span>
          ${st.priceUSD ? `<span class="comp-item-price">$${fmt(st.priceUSD,0)}</span>` : ''}
        </span>
      `;
      btn.addEventListener('click', ()=>{
        onSelect(st.id);
      });
      container.appendChild(btn);
    });
  });
  if(count === 0){
    const empty = document.createElement('div');
    empty.style.cssText = 'padding:16px; text-align:center; font-family:"JetBrains Mono",monospace; font-size:11px; color:var(--steel-dim);';
    empty.textContent = 'Sin resultados';
    container.appendChild(empty);
  }
}

function renderCompStationSelects(){
  const listA = document.getElementById('compListA');
  const listB = document.getElementById('compListB');
  const searchA = document.getElementById('compSearchA');
  const searchB = document.getElementById('compSearchB');
  const clearA = document.getElementById('compSearchClearA');
  const clearB = document.getElementById('compSearchClearB');

  if(clearA) clearA.style.display = searchA.value ? 'block' : 'none';
  if(clearB) clearB.style.display = searchB.value ? 'block' : 'none';

  buildCompList(listA, compState.stationA, searchA.value, id=>{
    compState.stationA = id;
    renderCompStationSelects();
    renderComparator();
    pushHash();
  });
  buildCompList(listB, compState.stationB, searchB.value, id=>{
    compState.stationB = id;
    renderCompStationSelects();
    renderComparator();
    pushHash();
  });
}

function renderComparator(){
  const stA = getStation(compState.stationA);
  const stB = getStation(compState.stationB);
  const resultEl = document.getElementById('compResult');
  const emptyEl = document.getElementById('compEmpty');

  if(!stA || !stB || stA.id === stB.id){
    resultEl.style.display = 'none';
    emptyEl.style.display = 'block';
    emptyEl.textContent = stA && stB && stA.id === stB.id
      ? 'Selecciona dos estaciones diferentes.'
      : 'Selecciona dos estaciones para compararlas.';
    return;
  }

  emptyEl.style.display = 'none';
  resultEl.style.display = 'block';

  const capA = parseCapacity(stA.cap);
  const capB = parseCapacity(stB.cap);
  const solarA = stA.pmaxPort * stA.ports;
  const solarB = stB.pmaxPort * stB.ports;
  const priceA = stA.priceUSD || 0;
  const priceB = stB.priceUSD || 0;
  const testLoad = 200;
  const hoursA = (capA * USABLE_FACTOR) / testLoad;
  const hoursB = (capB * USABLE_FACTOR) / testLoad;

  // Bar comparison helper
  function barCompare(label, valA, valB, higherBetter, fmtFn){
    const fn = fmtFn || (v => v.toString());
    const max = Math.max(valA, valB, 0.0001);
    const pctA = (valA / max) * 100;
    const pctB = (valB / max) * 100;
    const winA = higherBetter ? valA > valB : valA < valB;
    const winB = higherBetter ? valB > valA : valB < valA;
    const diff = (valA !== valB) ? Math.abs(Math.round((valA - valB) / max * 100)) : 0;
    const diffTxt = diff > 0 ? ` <span style="color:var(--steel-dim);font-weight:400;">(${diff}% ${valA > valB ? 'más' : 'menos'})</span>` : '';
    const shortA = stA.name.length > 14 ? stA.name.slice(0,12) + '…' : stA.name;
    const shortB = stB.name.length > 14 ? stB.name.slice(0,12) + '…' : stB.name;
    return `
      <div class="bar-compare">
        <div class="bc-label">${label}${diffTxt}</div>
        <div class="bc-row">
          <div class="bc-name" title="${stA.name}">${shortA}</div>
          <div class="bc-bar-wrap">
            <div class="bc-bar ${winA ? 'winner' : ''}" style="width:${pctA}%"></div>
            <div class="bc-val">${fn(valA)}</div>
          </div>
        </div>
        <div class="bc-row">
          <div class="bc-name" title="${stB.name}">${shortB}</div>
          <div class="bc-bar-wrap">
            <div class="bc-bar ${winB ? 'winner' : ''}" style="width:${pctB}%"></div>
            <div class="bc-val">${fn(valB)}</div>
          </div>
        </div>
      </div>
    `;
  }

  resultEl.innerHTML = `
    <div style="padding:18px 22px 6px;">
      <div class="comp-vs-bar">Comparación visual con barras proporcionales</div>
      <div style="font-size:12px; color:var(--steel); margin-bottom:8px;">${stA.name} <span style="color:var(--teal)">↔</span> ${stB.name}</div>
    </div>

    <div style="padding:0 22px 18px;">
      ${barCompare('Capacidad', capA, capB, true, v => v.toLocaleString('es-MX') + ' Wh')}
      ${barCompare('Solar máxima', solarA, solarB, true, v => v.toLocaleString('es-MX') + ' W')}
      ${barCompare('Autonomía @ ' + testLoad + ' W', hoursA, hoursB, true, v => (Math.round(v*10)/10) + ' h')}
      ${priceA && priceB ? barCompare('Precio aprox.', priceA, priceB, false, v => '$' + v.toLocaleString('es-MX')) : ''}
      ${priceA && priceB ? barCompare('Costo por Wh', priceA/capA, priceB/capB, false, v => '$' + v.toFixed(2)) : ''}
      ${barCompare('Voc mínimo', stA.vocMin, stB.vocMin, false, v => v + ' V')}
      ${barCompare('Voc máximo', stA.vocMax, stB.vocMax, true, v => v + ' V')}
      ${barCompare('Imax (corriente)', stA.imax, stB.imax, true, v => v + ' A')}
      ${barCompare('Entradas MPPT', stA.ports, stB.ports, true, v => v + '×')}
    </div>

    <div class="comp-row" style="border-top:1px dashed var(--navy-line);">
      <div class="comp-col" style="text-align:center; padding:18px;">
        <div style="font-family:'JetBrains Mono',monospace; font-size:9px; text-transform:uppercase; letter-spacing:.1em; color:var(--steel-dim); margin-bottom:6px;">${stA.name}</div>
        <button class="comp-compare-btn" data-goto-id="${stA.id}">→ Usar en calculadora</button>
      </div>
      <div class="comp-swap" style="border-right:1px dashed var(--navy-line);">
        <button class="comp-swap-btn" id="compSwapInline" title="Intercambiar">⇄</button>
      </div>
      <div class="comp-col" style="text-align:center; padding:18px;">
        <div style="font-family:'JetBrains Mono',monospace; font-size:9px; text-transform:uppercase; letter-spacing:.1em; color:var(--steel-dim); margin-bottom:6px;">${stB.name}</div>
        <button class="comp-compare-btn" data-goto-id="${stB.id}">→ Usar en calculadora</button>
      </div>
    </div>
  `;
  resultEl.querySelectorAll('[data-goto-id]').forEach(btn=>{
    btn.addEventListener('click', ()=> goToStation(btn.getAttribute('data-goto-id')));
  });
  document.getElementById('compSwapInline')?.addEventListener('click', ()=>{
    const tmp = compState.stationA;
    compState.stationA = compState.stationB;
    compState.stationB = tmp;
    renderCompStationSelects();
    renderComparator();
    pushHash();
  });
  pushHash();
}

function goToStation(id){
  state.stationId = id;
  autoState.stationId = id;
  simState.stationId = id;
  renderStationSelect();
  renderAutoStationSelect();
  renderSimStationSelect();
  render();
  renderAutonomy();
  renderSimulator();
  document.getElementById('calculadora').scrollIntoView({behavior:'smooth', block:'start'});
}

function wireComparator(){
  const searchA = document.getElementById('compSearchA');
  const searchB = document.getElementById('compSearchB');
  const clearA = document.getElementById('compSearchClearA');
  const clearB = document.getElementById('compSearchClearB');

  searchA.addEventListener('input', renderCompStationSelects);
  searchB.addEventListener('input', renderCompStationSelects);

  if(clearA){
    clearA.addEventListener('click', ()=>{
      searchA.value = '';
      clearA.style.display = 'none';
      searchA.focus();
      renderCompStationSelects();
    });
  }

  if(clearB){
    clearB.addEventListener('click', ()=>{
      searchB.value = '';
      clearB.style.display = 'none';
      searchB.focus();
      renderCompStationSelects();
    });
  }

  document.getElementById('compSwap').addEventListener('click', ()=>{
    const tmp = compState.stationA;
    compState.stationA = compState.stationB;
    compState.stationB = tmp;
    renderCompStationSelects();
    renderComparator();
    pushHash();
  });

  const shareBtn = document.getElementById('compShareBtn');
  const shareTxt = document.getElementById('compShareBtnText');
  if(shareBtn){
    shareBtn.addEventListener('click', ()=>{
      const url = window.location.origin + window.location.pathname + encodeHash();
      const onCopied = ()=>{
        shareBtn.classList.add('copied');
        shareTxt.textContent = '¡Enlace de comparación copiado!';
        setTimeout(()=>{ shareBtn.classList.remove('copied'); shareTxt.textContent = 'Compartir comparación'; }, 2000);
      };
      const fallback = ()=>{
        const tmp = document.createElement('input');
        tmp.value = url;
        document.body.appendChild(tmp);
        tmp.select();
        document.execCommand('copy');
        document.body.removeChild(tmp);
        onCopied();
      };
      if(navigator.clipboard && window.isSecureContext){
        navigator.clipboard.writeText(url).then(onCopied).catch(fallback);
      } else {
        fallback();
      }
    });
  }
}

/* ============================================================
   AUTONOMY CALCULATOR
   ============================================================ */
let autoStationWired = false;
function renderAutoStationSelect(){
  const sel = document.getElementById('autoStation');
  buildStationSelect(sel, autoState.stationId, autoStationFilterQuery, id=>{
    autoState.stationId = id;
    renderAutonomy();
  });
  if(!autoStationWired){
    sel.addEventListener('change', e=>{
      autoState.stationId = e.target.value;
      state.stationId = e.target.value;
      renderStationSelect();
      renderAutonomy();
      render();
    });
    autoStationWired = true;
  }
}

function renderDeviceChips(){
  const wrap = document.getElementById('deviceChips');
  wrap.innerHTML = '';
  DEVICES.forEach(d=>{
    const count = autoState.devices[d.id] || 0;
    const chip = document.createElement('button');
    chip.type = 'button';
    const active = count > 0;
    chip.className = 'device-chip' + (active ? ' active' : '');
    chip.setAttribute('aria-pressed', active.toString());
    const countLabel = count > 0 ? ` <span class="device-count">${count}×</span>` : '';
    chip.innerHTML = `${d.icon} ${d.name} <span class="chip-w">${d.w} W${countLabel}</span>`;
    chip.addEventListener('click', ()=>{
      // Cycle: 0 → 1 → 2 → 3 → 4 → 0
      if(count >= 4){
        delete autoState.devices[d.id];
      } else {
        autoState.devices[d.id] = count + 1;
      }
      renderDeviceChips();
      renderAutonomy();
    });
    chip.title = count > 0 ? 'Clic para cambiar cantidad' : 'Clic para agregar';
    wrap.appendChild(chip);
  });
}

function renderAutonomy(){
  const st = getStation(autoState.stationId);
  const capacity = parseCapacity(st.cap);
  const usableWh = capacity * USABLE_FACTOR;
  const customW = parseFloat(document.getElementById('customWattage').value) || 0;
  const selectedDevices = DEVICES.filter(d => (autoState.devices[d.id] || 0) > 0);
  const totalW = selectedDevices.reduce((sum, d) => sum + d.w * (autoState.devices[d.id] || 0), 0) + (customW > 0 ? customW : 0);
  const hasLoad = selectedDevices.length > 0 || customW > 0;

  const infoEl = document.getElementById('autoStationInfo');
  infoEl.style.display = 'grid';
  infoEl.innerHTML = `
    <div class="asp"><div class="ak">Capacidad</div><div class="av">${st.cap}</div></div>
    <div class="asp"><div class="ak">Útil (~80%)</div><div class="av">${fmt(usableWh, 0)} Wh</div></div>
    <div class="asp"><div class="ak">Marca</div><div class="av">${st.brand}</div></div>
  `;

  const resultEl = document.getElementById('autoResult');
  const emptyEl = document.getElementById('autoEmpty');
  const tipsEl = document.getElementById('autoTips');
  const detailEl = document.getElementById('autoDetail');

  if(!hasLoad){
    resultEl.style.display = 'none';
    emptyEl.style.display = 'block';
    tipsEl.style.display = 'none';
    document.getElementById('autoHours').innerHTML = '—<sub>h</sub>';
    document.getElementById('autoUnitText').textContent = 'conecta al menos un dispositivo';
    detailEl.innerHTML = '';
    return;
  }

  emptyEl.style.display = 'none';
  resultEl.style.display = 'block';

  const hours = usableWh / totalW;
  const dur = formatDurationMain(hours, totalW);
  document.getElementById('autoHours').innerHTML = `${dur.main}<sub>${dur.unit}</sub>`;
  pulseEl(document.getElementById('autoHours'));
  document.getElementById('autoUnitText').textContent = dur.sub;

  detailEl.innerHTML = '';
  selectedDevices.forEach(d=>{
    const qty = autoState.devices[d.id] || 0;
    const qtyTotalW = d.w * qty;
    const row = document.createElement('div');
    row.className = 'autonomy-row';
    row.innerHTML = `<span>${d.icon} ${d.name} <span style="color:var(--steel-dim)">${qty > 1 ? `(×${qty} = ${qtyTotalW} W)` : `(${d.w} W)`}</span></span><span>${formatDurationShort(usableWh / qtyTotalW)}</span>`;
    detailEl.appendChild(row);
  });
  if(customW > 0){
    const row = document.createElement('div');
    row.className = 'autonomy-row';
    row.innerHTML = `<span>⚡ Personalizado <span style="color:var(--steel-dim)">(${customW} W)</span></span><span>${formatDurationShort(usableWh / customW)}</span>`;
    detailEl.appendChild(row);
  }
  const totalRow = document.createElement('div');
  totalRow.className = 'autonomy-row';
  totalRow.style.cssText = 'margin-top:4px; border:1px solid var(--navy-line); background:var(--navy-deep);';
  totalRow.innerHTML = `<span>Combinado</span><span style="color:var(--teal)">${formatDurationShort(hours)} · ${totalW} W</span>`;
  detailEl.appendChild(totalRow);

  tipsEl.style.display = 'block';
  if(hours < 0.5){
    tipsEl.innerHTML = `<b>Consumo alto:</b> con ${totalW} W la batería se agota en menos de 30 min. Considera usar menos aparatos a la vez o una estación de mayor capacidad.`;
  } else if(totalW > 1500){
    tipsEl.innerHTML = `<b>Carga pesada:</b> aparatos de más de 1 500 W (microondas, calentadores) agotan la batería rápido. Úsalos en ráfagas cortas, no de forma continua.`;
  } else if(hours >= 24){
    tipsEl.innerHTML = `<b>Excelente autonomía:</b> más de un día con esta carga. El cálculo usa <b>80% de capacidad útil</b> (pérdidas del inversor y reserva de batería).`;
  } else {
    tipsEl.innerHTML = `Estimación con <b>80% de capacidad útil</b> (${fmt(usableWh, 0)} Wh de ${st.cap}). Los valores reales varían según temperatura, edad de la batería y picos de arranque.`;
  }
}

function wireAutonomy(){
  document.getElementById('customWattage').addEventListener('input', renderAutonomy);
}

/* ============================================================
   SEARCH WIRING
   ============================================================ */
function wireSearch(){
  const input  = document.getElementById('catalogSearch');
  const clearBtn = document.getElementById('searchClear');

  input.addEventListener('input', ()=>{
    searchQuery = input.value;
    clearBtn.style.display = searchQuery ? 'block' : 'none';
    renderPlates();
  });

  clearBtn.addEventListener('click', ()=>{
    input.value = '';
    searchQuery = '';
    clearBtn.style.display = 'none';
    input.focus();
    renderPlates();
  });

  // Keyboard shortcut: press / to focus search
  document.addEventListener('keydown', e=>{
    if(e.key==='/' && document.activeElement.tagName!=='INPUT' && document.activeElement.tagName!=='SELECT'){
      e.preventDefault();
      input.focus();
      document.getElementById('catalogo').scrollIntoView({behavior:'smooth', block:'start'});
    }
  });
}

/* ============================================================
   INIT
   ============================================================ */
const defaultCompA = state.stationId;
decodeHash();           // Restore state from URL hash (if any)
autoState.stationId = state.stationId;
simState.stationId = state.stationId;
if(!compState.stationA) compState.stationA = defaultCompA;
if(!compState.stationB) compState.stationB = 'ef-delta2';
renderStationSelect();
renderPanelChips();
renderAutoStationSelect();
renderDeviceChips();
wireSteppers();
wireShareBtn();
wireScrollTop();
wireScrollProgress();
wireThemeToggle();
wireStationSearch();
wireAutoStationSearch();
wireAutonomy();
wireSearch();
renderBrandTabs();
renderPlates();
render();
// Simulator
renderSimStationSelect();
renderRegionChips();
renderSimulator();
wireSimulator();
// Comparator
renderCompStationSelects();
renderComparator();
wireComparator();
renderAutonomy();

// Presets (localStorage)
renderPresets();
wirePresets();

// Drag-and-drop panel chips onto calculator
wirePanelDropZone();

// Solar house battery indicator
updateSolarHouse();

// PWA: register service worker + manifest
registerPWA();

if(navTargetSection){
  setTimeout(()=>{
    const el = document.getElementById(navTargetSection);
    if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
  }, 100);
}

/* ============================================================
   SOLAR HOUSE — update battery indicator from simState
   ============================================================ */
function updateSolarHouse(){
  const st = getStation(simState.stationId);
  const capacity = parseCapacity(st.cap);
  const panels = simState.panels;
  const panelW = simState.panelWatt;
  const region = REGIONS.find(r => r.id === simState.regionId) || REGIONS[0];
  const rawW = panelW * panels;
  const solarW = Math.min(rawW, st.pmaxPort * st.ports);
  // Battery fill = solar power vs cap (rough ratio for visual)
  const efficiency = 0.85;
  const dailyWh = solarW * efficiency * region.avg;
  const fillPct = capacity > 0 ? Math.min(100, Math.round((dailyWh / capacity) * 100)) : 0;
  const fillEl = document.getElementById('batteryFill');
  const labelEl = document.getElementById('batteryPctLabel');
  if(fillEl){
    // battery is 29 wide; y=28 (bottom); animate height change
    const h = (fillPct / 100) * 25;
    fillEl.setAttribute('y', 28 - h);
    fillEl.setAttribute('height', h);
    // Color: red <30, copper <70, teal >=70
    const color = fillPct < 30 ? '#d9634a' : fillPct < 70 ? '#e8973d' : '#4fbf9f';
    fillEl.setAttribute('fill', color);
  }
  if(labelEl){
    labelEl.textContent = fillPct + '%';
  }
}

/* ============================================================
   PWA — manifest, service worker, install prompt
   ============================================================ */
function registerPWA(){
  // Service worker (static file — cacheable and precompiled by the browser,
  // unlike a Blob URL that has to be regenerated and reparsed on every load)
  if('serviceWorker' in navigator){
    navigator.serviceWorker.register('sw.js').catch(() => {});
  }

  // Install prompt capture
  let deferredPrompt = null;
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    // Show install button if not already shown
    if(!document.getElementById('pwaInstallBtn')){
      const btn = document.createElement('button');
      btn.id = 'pwaInstallBtn';
      btn.className = 'theme-toggle';
      btn.style.right = '70px';
      btn.title = 'Instalar como app';
      btn.innerHTML = '📲';
      btn.addEventListener('click', () => {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then(() => {
          deferredPrompt = null;
          btn.remove();
        });
      });
      document.body.appendChild(btn);
      setTimeout(() => showToast('App instalable', 'Toca 📲 para instalar como app', 'info'), 1500);
    }
  });
}
