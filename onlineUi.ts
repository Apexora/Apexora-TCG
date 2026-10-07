// Menú "Jugar online" y etiqueta de sala. Vive fuera de render() para no perderse al repintar.
const CSS = `
.onl{position:fixed;inset:0;z-index:9000;display:grid;place-items:center;background:rgba(5,5,12,.78)}
.onl>div{background:#14141f;border:1px solid #3a3a5a;border-radius:14px;padding:22px 24px;width:min(92vw,340px);display:grid;gap:12px;color:#eee;text-align:center}
.onl h2{margin:0}.onl input{padding:10px;font-size:22px;letter-spacing:6px;text-align:center;text-transform:uppercase;border-radius:8px;border:1px solid #444;background:#0c0c14;color:#fff}
.onl .st{min-height:1.2em;font-size:13px;opacity:.85}
.roomtag{position:fixed;top:6px;left:50%;transform:translateX(-50%);z-index:8000;font-size:12px;padding:3px 10px;border-radius:99px;background:rgba(20,20,31,.85);color:#ddd;pointer-events:none}
`;
let tag: HTMLElement | null = null, menu: HTMLElement | null = null;
function style() { if (!document.getElementById('onl-css')) { const s = document.createElement('style'); s.id = 'onl-css'; s.textContent = CSS; document.head.append(s); } }

export function setRoomTag(text: string) {
  style(); if (!tag) { tag = document.createElement('div'); tag.className = 'roomtag'; document.body.append(tag); }
  tag.textContent = text; tag.hidden = !text;
}
export function closeMenu() { menu?.remove(); menu = null; }
export function menuStatus(t: string) { const e = menu?.querySelector('.st'); if (e) e.textContent = t; }

export function openOnlineMenu(a: { create(): Promise<void>; join(code: string): Promise<void>; leave?: () => void; inRoom: boolean }) {
  style(); closeMenu();
  menu = document.createElement('div'); menu.className = 'onl';
  menu.innerHTML = `<div><h2>Jugar online</h2>
    ${a.inRoom ? '<p>Ya estás en una sala.</p><button class="btn" data-x="leave">Salir de la sala</button>'
      : '<button class="btn" data-x="create">Crear sala</button><p style="margin:0;opacity:.7">o únete con un código</p><input data-x="code" maxlength="4" placeholder="K7QF" autocomplete="off"><button class="btn" data-x="join">Unirse</button>'}
    <div class="st"></div><button class="ghost" data-x="close">Cerrar</button></div>`;
  document.body.append(menu);
  const run = (f: () => Promise<void>) => { menuStatus('Conectando…'); f().catch(e => menuStatus(e?.message ?? 'Error')); };
  menu.addEventListener('click', ev => {
    const x = (ev.target as HTMLElement).dataset.x; if (!x) return;
    if (x === 'close') closeMenu();
    else if (x === 'create') run(a.create);
    else if (x === 'join') run(() => a.join((menu!.querySelector('[data-x=code]') as HTMLInputElement).value));
    else if (x === 'leave') { a.leave?.(); closeMenu(); }
  });
  menu.addEventListener('keydown', ev => { ev.stopPropagation(); if ((ev as KeyboardEvent).key === 'Enter') (menu!.querySelector('[data-x=join]') as HTMLElement | null)?.click(); });
}
