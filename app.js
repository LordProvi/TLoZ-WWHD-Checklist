(() => {
'use strict';

/* ------------------------------------------------------------------ config */
const KEY = 'wwhd-checklist-v1';
const ACCENTS = ['#8bc34a','#9aa8b5','#f2a65a','#e0523f','#e0523f','#6cc46a','#3f9b57','#3fa7e0','#f2c14e','#b9a7e8','#c58b4e','#7fd6c9','#f2c14e','#b56be0'];

// Gear chains: the hub shows the highest level you have checked off.
const GEAR = [
  {k:'sword',  name:'Sword',        icon:'⚔️', lv:["Hero's Sword",'Master Sword','Master Sword (Power Restored)','True Master Sword']},
  {k:'shield', name:'Shield',       icon:'🛡️', lv:["Hero's Shield",'Mirror Shield']},
  {k:'bow',    name:'Bow & Arrows', icon:'🏹', lv:["Hero's Bow",'Fire & Ice Arrows','Light Arrows']},
  {k:'quiver', name:'Quiver',       icon:'🎯', lv:['60 Arrows','99 Arrows']},
  {k:'bombs',  name:'Bombs',        icon:'💣', lv:['Bombs','Bomb Bag (60)','Bomb Bag (99)']},
  {k:'sail',   name:'Sail',         icon:'⛵', lv:['Sail','Swift Sail']},
  {k:'wwaker', name:'Wind Waker',   icon:'🪄', lv:['The Wind Waker']},
  {k:'picto',  name:'Picto Box',    icon:'📷', lv:['Picto Box','Deluxe Picto Box']},
  {k:'magic',  name:'Magic Meter',  icon:'✨', lv:['Magic Meter','Magic Meter Upgrade']},
  {k:'wallet', name:'Wallet',       icon:'👛', base:'Wallet', lv:['Wallet (1,000)','Wallet (5,000)']},
  {k:'bottle', name:'Bottles',      icon:'🍶', lv:['1 Bottle','2 Bottles','3 Bottles','4 Bottles']},
  {k:'telescope', name:'Telescope', icon:'🔭', lv:['Telescope']},
  {k:'grapple',name:'Grappling Hook',icon:'🪝', lv:['Grappling Hook']},
  {k:'leaf',   name:'Deku Leaf',    icon:'🍃', lv:['Deku Leaf']},
  {k:'boomerang',name:'Boomerang',  icon:'🪃', lv:['Boomerang']},
  {k:'hammer', name:'Skull Hammer', icon:'🔨', lv:['Skull Hammer']},
  {k:'boots',  name:'Iron Boots',   icon:'🥾', lv:['Iron Boots']},
  {k:'bracelets',name:'Power Bracelets',icon:'💪', lv:['Power Bracelets']},
  {k:'hookshot',name:'Hookshot',    icon:'⚓', lv:['Hookshot']},
  {k:'armor',  name:'Magic Armor',  icon:'🥋', lv:['Magic Armor']},
  {k:'tingle', name:"Tingle's Bottle",icon:'🧴', lv:["Tingle's Bottle"]},
  {k:'charm',  name:"Pirate's Charm",icon:'🏴‍☠️', lv:["Pirate's Charm"]},
  {k:'herocharm',name:"Hero's Charm",icon:'🧿', lv:["Hero's Charm"]},
  {k:'cabana', name:'Cabana Deed',  icon:'📜', lv:['Cabana Deed']},
  {k:'delivery',name:'Delivery Bag',icon:'👜', lv:['Delivery Bag']},
  {k:'bait',   name:'Bait Bag',     icon:'🎣', lv:['Bait Bag']},
  {k:'spoils', name:'Spoils Bag',   icon:'🎒', lv:['Spoils Bag']},
];
const SONGS   = [['requiem',"Wind's Requiem"],['passing','Song of Passing'],['command','Command Melody'],['gales','Ballad of Gales'],['earth',"Earth God's Lyric"],['aria',"Wind God's Aria"]];
const PEARLS  = [['din',"Din's Pearl",'red'],['farore',"Farore's Pearl",'green'],['nayru',"Nayru's Pearl",'blue']];
const BOSSES  = [['gohma','Dragon Roost Cavern','Gohma'],['kalle','Forbidden Woods','Kalle Demos'],['gohdan','Tower of the Gods','Gohdan'],
                 ['helmaroc','Forsaken Fortress (return)','Helmaroc King'],['jalhalla','Earth Temple','Jalhalla'],['molgera','Wind Temple','Molgera'],['ganon',"Ganon's Tower",'Ganon']];

/* ------------------------------------------------------------------- utils */
const $ = (s, r = document) => r.querySelector(s);
const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const hash = s => { let h = 5381; for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) >>> 0; return h.toString(36); };
const pct = (a, b) => b ? Math.round(a / b * 100) : 0;

/* ------------------------------------------------------------------- parse */
function parse(txt) {
  const chapters = []; let ch = null, gr = null; const seen = {}; const items = [];
  for (const raw of txt.split('\n')) {
    const line = raw.trim(); if (!line) continue;
    if (line.startsWith('## ')) { gr = {title: line.slice(3), items: []}; ch.groups.push(gr); }
    else if (line.startsWith('# ')) {
      const [t, r] = line.slice(2).split('|').map(s => s.trim());
      ch = {key: 'c' + (chapters.length + 1), idx: chapters.length, title: t, region: r || '', groups: [], total: 0, done: 0};
      chapters.push(ch);
    } else if (line.startsWith('- ')) {
      const tags = {};
      const text = line.slice(2).replace(/\{([a-z]+)(?::([^}]*))?\}/g, (_, k, v) => { tags[k] = v === undefined ? true : v; return ''; }).trim();
      const base = ch.key + '|' + text; seen[base] = (seen[base] || 0) + 1;
      const it = {id: hash(base + '|' + seen[base]), text, tags, ch};
      gr.items.push(it); items.push(it); ch.total++;
    }
  }
  return {chapters, items};
}
const {chapters: CH, items: ITEMS} = parse(window.DATA_TXT);

/* ------------------------------------------------------------------- state */
let S = {c: {}, col: {}, hide: false, tab: 'list', last: null};
let storageOK = true;
try { Object.assign(S, JSON.parse(localStorage.getItem(KEY) || '{}')); } catch (e) { storageOK = false; }
function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); storageOK = true; } catch (e) { storageOK = false; } }
try { localStorage.setItem(KEY + '-t', '1'); localStorage.removeItem(KEY + '-t'); } catch (e) { storageOK = false; }
try { if (navigator.storage && navigator.storage.persist) navigator.storage.persist(); } catch (e) {}

let doneTotal = 0;
function recount() {
  doneTotal = 0; CH.forEach(c => c.done = 0);
  for (const it of ITEMS) if (S.c[it.id]) { it.ch.done++; doneTotal++; }
}
recount();

/* ------------------------------------------------------------------ badges */
function badges(t) {
  const b = [];
  if (t.hp)    b.push(`<span class="badge hp">♥ Piece of Heart #${esc(t.hp)}</span>`);
  if (t.ch)    b.push(`<span class="badge ch">🗺 Chart #${esc(t.ch)}</span>`);
  if (t.hc)    b.push(`<span class="badge hc">♥ Heart Container</span>`);
  if (t.boss)  b.push(`<span class="badge boss">Boss</span>`);
  if (t.song)  b.push(`<span class="badge song">♪ Song</span>`);
  if (t.pearl) b.push(`<span class="badge pearl">Pearl</span>`);
  if (t.shard) b.push(`<span class="badge shard">▲ Triforce Shard</span>`);
  if (t.ts)    b.push(`<span class="badge ts">Tingle Statue</span>`);
  if (t.g) {
    const [k, l] = t.g.split(':'); const g = GEAR.find(x => x.k === k);
    if (g) b.push(`<span class="badge bgear">${g.lv.length > 1 ? '⬆ ' : ''}${esc(g.lv[(+l || 1) - 1] || g.name)}</span>`);
  }
  return b.length ? `<span class="badges">${b.join('')}</span>` : '';
}

/* -------------------------------------------------------------- list render */
const listEl = $('#list');
function buildList() {
  const frag = document.createDocumentFragment();
  for (const ch of CH) {
    const sec = el('section', 'chap'); sec.id = ch.key; sec.style.setProperty('--acc', ACCENTS[ch.idx % ACCENTS.length]);
    const head = el('button', 'chap-head');
    head.type = 'button'; head.dataset.key = ch.key;
    head.innerHTML = `<span class="ch-top"><span class="ch-title"><span class="ch-region">${esc(ch.region)}</span>${esc(ch.title)}</span>` +
      `<span class="ch-count"></span><svg class="chev" viewBox="0 0 20 20" aria-hidden="true"><path d="M5 7l5 6 5-6" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></span>` +
      `<span class="ch-bar"><i></i></span>`;
    const body = el('div', 'chap-body');
    for (const g of ch.groups) {
      const gt = el('h3', 'group-title', esc(g.title)); body.appendChild(gt);
      const wrap = el('div', 'rows'); wrap.dataset.group = '1';
      for (const it of g.items) {
        const row = el('label', 'row' + (it.tags.m ? ' minor' : '')); row.dataset.id = it.id;
        row.innerHTML = `<input type="checkbox"><span class="box"></span><span class="txt">${esc(it.text)}${badges(it.tags)}</span>`;
        it.row = row; wrap.appendChild(row);
      }
      g.titleEl = gt; g.wrap = wrap; body.appendChild(wrap);
    }
    sec.append(head, body); ch.sec = sec; ch.headEl = head; frag.appendChild(sec);
  }
  listEl.appendChild(frag);
  for (const it of ITEMS) { const on = !!S.c[it.id]; it.row.classList.toggle('done', on); it.row.firstChild.checked = on; }
  CH.forEach(updateChapter); applyHide(); updateOverall();
}

function updateChapter(ch) {
  const p = pct(ch.done, ch.total);
  ch.headEl.querySelector('.ch-count').textContent = `${ch.done}/${ch.total}`;
  ch.headEl.querySelector('.ch-bar i').style.width = p + '%';
  ch.sec.classList.toggle('complete', ch.done === ch.total);
  ch.sec.classList.toggle('collapsed', !!S.col[ch.key]);
}
function updateOverall() {
  const p = pct(doneTotal, ITEMS.length);
  $('#overall-pct').textContent = p + '%';
  $('#overall-bar').style.width = p + '%';
  $('#subtitle').textContent = `${doneTotal} of ${ITEMS.length} checked`;
}
function applyHide() {
  $('#btn-hide').setAttribute('aria-pressed', S.hide);
  for (const ch of CH) for (const g of ch.groups) {
    let allDone = true;
    for (const it of g.items) { const d = !!S.c[it.id]; it.row.hidden = S.hide && d; if (!d) allDone = false; }
    g.titleEl.hidden = g.wrap.hidden = S.hide && allDone;
  }
}

listEl.addEventListener('change', e => {
  const row = e.target.closest('.row'); if (!row) return;
  const id = row.dataset.id, on = e.target.checked;
  const it = ITEMS.find(x => x.id === id) || null;
  if (on) S.c[id] = 1; else delete S.c[id];
  S.last = id; save();
  row.classList.toggle('done', on);
  if (it) { it.ch.done += on ? 1 : -1; doneTotal += on ? 1 : -1; updateChapter(it.ch); }
  updateOverall();
});
listEl.addEventListener('click', e => {
  const head = e.target.closest('.chap-head'); if (!head) return;
  const k = head.dataset.key; S.col[k] = S.col[k] ? 0 : 1; if (!S.col[k]) delete S.col[k];
  save(); head.parentElement.classList.toggle('collapsed', !!S.col[k]);
});

/* --------------------------------------------------------------- toolbar */
function goChapter(key) {
  setTab('list');
  const ch = CH.find(c => c.key === key); if (!ch) return;
  delete S.col[key]; ch.sec.classList.remove('collapsed'); save();
  requestAnimationFrame(() => {
    const hh = $('#top').offsetHeight;
    window.scrollTo({top: ch.sec.getBoundingClientRect().top + window.scrollY - hh - 6});
  });
}
$('#btn-jump').addEventListener('click', () => {
  const box = $('#sheet-list'); box.innerHTML = '';
  for (const ch of CH) {
    const b = el('button', 'jump', `<span>${esc(ch.title)}</span><em>${pct(ch.done, ch.total)}%</em>`);
    b.type = 'button'; b.style.setProperty('--acc', ACCENTS[ch.idx % ACCENTS.length]);
    b.addEventListener('click', () => { $('#sheet').hidden = true; goChapter(ch.key); });
    box.appendChild(b);
  }
  $('#sheet').hidden = false;
});
$('#sheet-close').addEventListener('click', () => $('#sheet').hidden = true);
$('.sheet-bg').addEventListener('click', () => $('#sheet').hidden = true);
$('#btn-hide').addEventListener('click', () => { S.hide = !S.hide; save(); applyHide(); });
$('#btn-next').addEventListener('click', () => {
  const it = ITEMS.find(x => !S.c[x.id]);
  if (!it) return toast('Everything is checked. Nice work, hero!');
  delete S.col[it.ch.key]; it.ch.sec.classList.remove('collapsed'); it.row.hidden = false; save();
  it.row.scrollIntoView({block: 'center'});
  it.row.classList.remove('flash'); void it.row.offsetWidth; it.row.classList.add('flash');
});

/* ------------------------------------------------------------------- hub */
const hubEl = $('#hub-view');
function stats() {
  const s = {hp: new Set(), ch: new Set(), shard: 0, hc: 0, ts: 0, song: new Set(), pearl: new Set(), boss: new Set(), gear: {}};
  for (const it of ITEMS) {
    if (!S.c[it.id]) continue; const t = it.tags;
    if (t.hp) s.hp.add(+t.hp);
    if (t.ch) s.ch.add(+t.ch);
    if (t.shard) s.shard++;
    if (t.hc) s.hc++;
    if (t.ts) s.ts++;
    if (t.song) s.song.add(t.song);
    if (t.pearl) s.pearl.add(t.pearl);
    if (t.boss) s.boss.add(t.boss);
    if (t.g) { const [k, l] = t.g.split(':'); s.gear[k] = Math.max(s.gear[k] || 0, +l || 1); }
  }
  return s;
}
const count = (re) => (window.DATA_TXT.match(re) || []).length;
const TOT = {hp: count(/\{hp:/g), ch: count(/\{ch:/g), shard: count(/\{shard\}/g), hc: count(/\{hc\}/g), ts: count(/\{ts\}/g)};

function tile(label, a, b) { return `<div class="tile"><b>${a}/${b}</b><span>${label}</span><div class="mini"><i style="width:${pct(a, b)}%"></i></div></div>`; }

function renderHub() {
  const s = stats();
  const P = pct(doneTotal, ITEMS.length), C = 2 * Math.PI * 43;
  const quarters = Math.min(80, 12 + 4 * s.hc + s.hp.size);
  let hearts = '';
  for (let i = 0; i < 20; i++) hearts += `<span class="heart"><i style="--w:${Math.max(0, Math.min(1, (quarters - i * 4) / 4)) * 100}%"></i></span>`;
  const full = Math.floor(quarters / 4), rem = quarters % 4;

  let h = '';
  if (!storageOK) h += `<div class="warn">This browser isn't letting the page save progress (private mode?). Open it normally, or use Export below before you close it.</div>`;

  h += `<div class="card"><h2>Overall Progress</h2><div class="in"><div class="ring-wrap">
    <svg class="ring" viewBox="0 0 100 100"><circle class="t" cx="50" cy="50" r="43"/><circle class="p" cx="50" cy="50" r="43" transform="rotate(-90 50 50)" stroke-dasharray="${C}" stroke-dashoffset="${C * (1 - P / 100)}"/><text x="50" y="59">${P}%</text></svg>
    <div class="ring-info"><b>${doneTotal} / ${ITEMS.length}</b><p>checklist items done across ${CH.length} chapters</p></div></div></div></div>`;

  h += `<div class="card"><h2>Hearts</h2><div class="in"><div class="hearts">${hearts}</div>
    <p class="hint">${full}${rem ? ' and ' + rem + '/4' : ''} hearts (3 to start, plus Heart Containers and Pieces of Heart you've checked)</p></div></div>`;

  h += `<div class="card"><h2>Collection</h2><div class="in"><div class="tiles">` +
    tile('Pieces of Heart', s.hp.size, TOT.hp) + tile('Treasure Charts', s.ch.size, TOT.ch) + tile('Triforce Shards', s.shard, TOT.shard) +
    tile('Heart Containers', s.hc, TOT.hc) + tile('Tingle Statues', s.ts, TOT.ts) + tile('Songs', s.song.size, SONGS.length) +
    `</div></div></div>`;

  h += `<div class="card"><h2>Gear &amp; Upgrades</h2><div class="in"><div class="gear-grid">`;
  for (const g of GEAR) {
    const lv = s.gear[g.k] || 0, n = g.lv.length;
    const name = lv ? g.lv[lv - 1] : (g.base || g.name);
    const cls = 'gear' + (lv || g.base ? '' : ' locked') + (lv === n && n > 1 ? ' max' : '');
    let pips = ''; if (n > 1) { pips = '<div class="pips">'; for (let i = 1; i <= n; i++) pips += `<i class="${i <= lv ? 'on' : ''}"></i>`; pips += '</div>'; }
    h += `<div class="${cls}"><div class="gi">${g.icon}</div><div class="gn">${esc(name)}</div>${pips}<div class="gs">${lv ? (lv === n && n > 1 ? 'Max' : 'Owned') : (g.base ? 'Base' : 'Not yet')}</div></div>`;
  }
  h += `</div></div></div>`;

  h += `<div class="card"><h2>Pearls, Songs &amp; Dungeons</h2><div class="in">
    <div class="sub">Pearls</div><div class="chips">${PEARLS.map(([k, n, c]) => `<span class="chip ${c}${s.pearl.has(k) ? ' on' : ''}">${esc(n)}</span>`).join('')}</div>
    <div class="sub">Songs</div><div class="chips">${SONGS.map(([k, n]) => `<span class="chip purple${s.song.has(k) ? ' on' : ''}">${esc(n)}</span>`).join('')}</div>
    <div class="sub">Dungeons &amp; bosses</div>${BOSSES.map(([k, d, b]) => `<div class="dung${s.boss.has(k) ? ' on' : ''}"><i class="dot"></i><div><b>${esc(d)}</b><span>${esc(b)}${s.boss.has(k) ? ' defeated' : ''}</span></div></div>`).join('')}
  </div></div>`;

  h += `<div class="card"><h2>Pieces of Heart</h2><div class="in"><div class="nums">` +
    Array.from({length: TOT.hp}, (_, i) => `<span class="num hp${s.hp.has(i + 1) ? ' on' : ''}">${i + 1}</span>`).join('') + `</div></div></div>`;
  h += `<div class="card"><h2>Treasure Charts</h2><div class="in"><div class="nums">` +
    Array.from({length: TOT.ch}, (_, i) => `<span class="num${s.ch.has(i + 1) ? ' on' : ''}">${i + 1}</span>`).join('') + `</div></div></div>`;

  h += `<div class="card"><h2>Progress by Chapter</h2><div class="in">` +
    CH.map(c => `<button type="button" class="area" data-go="${c.key}" style="--acc:${ACCENTS[c.idx % ACCENTS.length]}"><div class="l"><span>${esc(c.title)}</span><em>${c.done}/${c.total} · ${pct(c.done, c.total)}%</em></div><div class="ab"><i style="width:${pct(c.done, c.total)}%"></i></div></button>`).join('') +
    `</div></div>`;

  h += `<div class="card"><h2>Save &amp; Backup</h2><div class="in">
    <p class="hub-note">Progress saves automatically on this phone. Use Export now and then, so you can restore it if Safari ever clears its data.</p>
    <div class="data-actions">
      <button type="button" class="btn" id="b-export">Export file</button>
      <button type="button" class="btn" id="b-copy">Copy backup</button>
      <button type="button" class="btn" id="b-import">Import file</button>
      <button type="button" class="btn" id="b-paste">Paste backup</button>
    </div>
    <textarea id="paste-box" hidden placeholder="Paste backup text here"></textarea>
    <button type="button" class="btn wide" id="b-paste-go" hidden style="margin-top:9px;width:100%">Restore from pasted text</button>
    <input type="file" id="file-in" accept=".json,application/json,text/plain" hidden>
    <button type="button" class="btn danger" id="b-reset" style="width:100%;margin-top:14px">Reset all progress</button>
  </div></div>`;

  hubEl.innerHTML = h;
}

hubEl.addEventListener('click', e => {
  const go = e.target.closest('[data-go]'); if (go) return goChapter(go.dataset.go);
  const id = e.target.id;
  if (id === 'b-export') exportFile();
  else if (id === 'b-copy') copyBackup();
  else if (id === 'b-import') $('#file-in').click();
  else if (id === 'b-paste') { $('#paste-box').hidden = !$('#paste-box').hidden; $('#b-paste-go').hidden = $('#paste-box').hidden; }
  else if (id === 'b-paste-go') importText($('#paste-box').value);
  else if (id === 'b-reset') {
    if (confirm('Reset ALL progress? This cannot be undone (export a backup first if unsure).') && confirm('Really wipe everything?')) {
      S.c = {}; S.last = null; save(); recount(); syncRows(); renderHub(); toast('Progress reset');
    }
  }
});
hubEl.addEventListener('change', e => {
  if (e.target.id !== 'file-in') return;
  const f = e.target.files[0]; if (!f) return;
  const r = new FileReader(); r.onload = () => importText(String(r.result)); r.readAsText(f); e.target.value = '';
});

function backupObj() { return {app: 'wwhd-checklist', v: 1, saved: new Date().toISOString(), checked: Object.keys(S.c)}; }
function exportFile() {
  const blob = new Blob([JSON.stringify(backupObj())], {type: 'application/json'});
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
  a.download = `wwhd-checklist-backup-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 4000);
  toast('Backup file ready');
}
async function copyBackup() {
  const text = JSON.stringify(backupObj());
  try { await navigator.clipboard.writeText(text); toast('Backup copied. Paste it somewhere safe.'); }
  catch (e) { $('#paste-box').hidden = false; $('#b-paste-go').hidden = false; $('#paste-box').value = text; $('#paste-box').select(); toast('Select all and copy the text below'); }
}
function importText(txt) {
  let o; try { o = JSON.parse(txt); } catch (e) { return toast('That is not a valid backup'); }
  if (!o || o.app !== 'wwhd-checklist' || !Array.isArray(o.checked)) return toast('That is not a Wind Waker checklist backup');
  const valid = new Set(ITEMS.map(i => i.id)); const next = {}; let n = 0;
  o.checked.forEach(id => { if (valid.has(id)) { next[id] = 1; n++; } });
  if (!confirm(`Replace your current progress with this backup (${n} items checked)?`)) return;
  S.c = next; save(); recount(); syncRows(); renderHub(); toast(`Restored ${n} items`);
}
function syncRows() {
  for (const it of ITEMS) { const on = !!S.c[it.id]; it.row.classList.toggle('done', on); it.row.firstChild.checked = on; }
  CH.forEach(updateChapter); applyHide(); updateOverall();
}

/* ------------------------------------------------------------------ tabs */
let listY = 0;
function setTab(t) {
  if (S.tab === 'list' && t === 'hub') listY = window.scrollY;
  S.tab = t; save();
  const hub = t === 'hub';
  document.body.classList.toggle('hub-mode', hub);
  $('#list-view').hidden = hub; hubEl.hidden = !hub;
  $('#tab-list').classList.toggle('on', !hub); $('#tab-hub').classList.toggle('on', hub);
  setOffsets();
  if (hub) { renderHub(); window.scrollTo(0, 0); } else { applyHide(); window.scrollTo(0, listY); }
}
$('#tab-list').addEventListener('click', () => setTab('list'));
$('#tab-hub').addEventListener('click', () => setTab('hub'));

/* ----------------------------------------------------------------- toast */
let tt;
function toast(msg) { const t = $('#toast'); t.textContent = msg; t.classList.add('show'); clearTimeout(tt); tt = setTimeout(() => t.classList.remove('show'), 2400); }

/* ------------------------------------------------------------------ boot */
function setOffsets() { document.documentElement.style.setProperty('--hh', $('#top').offsetHeight + 'px'); }
buildList(); setOffsets();
window.addEventListener('resize', setOffsets);
window.addEventListener('orientationchange', () => setTimeout(setOffsets, 200));
if (document.fonts && document.fonts.ready) document.fonts.ready.then(setOffsets);

const startTab = S.tab === 'hub' ? 'hub' : 'list'; S.tab = 'list'; setTab(startTab);
if (startTab === 'list' && S.last) {
  const it = ITEMS.find(x => x.id === S.last);
  if (it && !it.row.hidden && !S.col[it.ch.key]) requestAnimationFrame(() => it.row.scrollIntoView({block: 'center'}));
}

if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
  window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
}
})();
