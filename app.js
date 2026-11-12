(() => {
'use strict';

/* ================================================================== config */
const KEY = 'wwhd-checklist-v1';
const ACCENTS = ['#8bc34a','#9aa8b5','#f2a65a','#e0523f','#e0523f','#6cc46a','#3f9b57','#3fa7e0','#f2c14e','#b9a7e8','#c58b4e','#7fd6c9','#f2c14e','#b56be0'];

// Gear. `lv` = name at each level (the Hub shows the highest level checked off), `img` = icon file per level.
// Only the Wallet shows before you own it (`base`); everything else is greyed out until checked.
const GEAR = [
  {k:'sword',  name:'Sword',          lv:["Hero's Sword",'Master Sword','Master Sword (Power Restored)','True Master Sword'], img:['heros_sword','master_sword_powerless','master_sword_half','master_sword']},
  {k:'shield', name:'Shield',         lv:["Hero's Shield",'Mirror Shield'], img:['heros_shield','mirror_shield']},
  {k:'bow',    name:"Hero's Bow",     lv:["Hero's Bow"],    img:['heros_bow']},
  {k:'fire',   name:'Fire Arrows',    lv:['Fire Arrows'],   img:['fire_arrow']},
  {k:'ice',    name:'Ice Arrows',     lv:['Ice Arrows'],    img:['ice_arrow']},
  {k:'light',  name:'Light Arrows',   lv:['Light Arrows'],  img:['light_arrow']},
  {k:'quiver', name:'Quiver',         lv:['Big Quiver','Giant Quiver'], img:['quiver_upgrade_1','quiver_upgrade_2']},
  {k:'bombs',  name:'Bomb Bag',       lv:['Bomb Bag','Bigger Bomb Bag','Biggest Bomb Bag'], img:['bomb_bag','bomb_bag_upgrade_1','bomb_bag_upgrade_2']},
  {k:'sail',   name:'Sail',           lv:['Sail','Swift Sail'], img:['sail']},
  {k:'wwaker', name:'Wind Waker',     lv:['The Wind Waker'], img:['wind_waker']},
  {k:'picto',  name:'Picto Box',      lv:['Picto Box','Deluxe Picto Box'], img:['picto_box','deluxe_picto_box']},
  {k:'magic',  name:'Magic Meter',    lv:['Magic Meter','Magic Meter Upgrade'], img:[]},   // drives the magic bar, no tile
  {k:'wallet', name:'Wallet',         lv:['Bigger Wallet','Biggest Wallet'], img:['wallet_upgrade_1','wallet_upgrade_2'], base:'Wallet'},
  {k:'b1',     name:'Empty Bottle 1', lv:['Empty Bottle 1'], img:['empty_bottle']},
  {k:'b2',     name:'Empty Bottle 2', lv:['Empty Bottle 2'], img:['empty_bottle']},
  {k:'b3',     name:'Empty Bottle 3', lv:['Empty Bottle 3'], img:['empty_bottle']},
  {k:'b4',     name:'Empty Bottle 4', lv:['Empty Bottle 4'], img:['empty_bottle']},
  {k:'telescope',name:'Telescope',    lv:['Telescope'],       img:['telescope']},
  {k:'grapple',name:'Grappling Hook', lv:['Grappling Hook'],  img:['grappling_hook']},
  {k:'leaf',   name:'Deku Leaf',      lv:['Deku Leaf'],       img:['deku_leaf']},
  {k:'boomerang',name:'Boomerang',    lv:['Boomerang'],       img:['boomerang']},
  {k:'hammer', name:'Skull Hammer',   lv:['Skull Hammer'],    img:['skull_hammer']},
  {k:'boots',  name:'Iron Boots',     lv:['Iron Boots'],      img:['iron_boots']},
  {k:'bracelets',name:'Power Bracelets',lv:['Power Bracelets'], img:['power_bracelet']},
  {k:'hookshot',name:'Hookshot',      lv:['Hookshot'],        img:['hookshot']},
  {k:'armor',  name:'Magic Armor',    lv:['Magic Armor'],     img:['magic_armor']},
  {k:'tingle', name:"Tingle's Bottle",lv:["Tingle's Bottle"], img:['tingle_bottle']},
  {k:'charm',  name:"Pirate's Charm", lv:["Pirate's Charm"],  img:['pirates_charm']},
  {k:'herocharm',name:"Hero's Charm", lv:["Hero's Charm"],    img:['heros_charm']},
  {k:'cabana', name:'Cabana Deed',    lv:['Cabana Deed'],     img:['cabana_deed']},
  {k:'delivery',name:'Delivery Bag',  lv:['Delivery Bag'],    img:['delivery_bag']},
  {k:'bait',   name:'Bait Bag',       lv:['Bait Bag'],        img:['bait_bag']},
  {k:'spoils', name:'Spoils Bag',     lv:['Spoils Bag'],      img:['spoils_bag']},
];
const gearByKey = k => GEAR.find(g => g.k === k);

// Hub gear layout: [section title, gear keys, grid class]. A blank title continues the section above.
const GEAR_GROUPS = [
  ['Bags',         ['wallet', 'bait', 'spoils', 'delivery'], 'g4'],
  ['Weapons',      ['sword', 'shield'], 'g2'],
  ['',             ['boomerang', 'bombs', 'hammer']],
  ['Bow & Arrows', ['bow', 'quiver', 'fire', 'ice', 'light']],
  ['Gear',         ['boots', 'bracelets', 'armor']],
  ['Tools',        ['grapple', 'hookshot', 'leaf', 'wwaker', 'sail', 'telescope', 'picto']],
  ['Bottles',      ['b1', 'b2', 'b3', 'b4'], 'g4'],
  ['Key Items',    ['charm', 'herocharm', 'cabana', 'tingle']]
];
const FEATURED = ['sword', 'shield'];   // big tiles
const WIDE = ['bow'];                   // double-width tile

const SONGS  = [['requiem',"Wind's Requiem"],['passing','Song of Passing'],['command','Command Melody'],['gales','Ballad of Gales'],['earth',"Earth God's Lyric"],['aria',"Wind God's Aria"]];
const PEARLS = [['din',"Din's Pearl",'red','dins_pearl'],['farore',"Farore's Pearl",'green','farores_pearl'],['nayru',"Nayru's Pearl",'blue','nayrus_pearl']];
const BOSSES = [['gohma','Dragon Roost Cavern','Gohma'],['kalle','Forbidden Woods','Kalle Demos'],['gohdan','Tower of the Gods','Gohdan'],
                ['helmaroc','Forsaken Fortress (return)','Helmaroc King'],['jalhalla','Earth Temple','Jalhalla'],['molgera','Wind Temple','Molgera'],['ganon',"Ganon's Tower",'Ganon']];
const SEQ = {shard: 'Triforce Shard', hc: 'Heart Container', ts: 'Tingle Statue'};

const svg = (box, inner) => `<svg viewBox="${box}" aria-hidden="true">${inner}</svg>`;
const ICON = {
  check: svg('0 0 24 24', '<path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>'),
  chev:  svg('0 0 20 20', '<path d="M5 7l5 6 5-6" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>'),
  edit:  svg('0 0 24 24', '<path d="M4 20l1-4L16.5 4.5a2 2 0 012.8 0l.2.2a2 2 0 010 2.8L8 19z" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"/>'),
  trash: svg('0 0 24 24', '<path d="M5 7h14M9 7V4h6v3M7 7l1 13h8l1-13" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>')
};

/* =================================================================== utils */
const $ = (s, r = document) => r.querySelector(s);
const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const hash = s => { let h = 5381; for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) >>> 0; return h.toString(36); };
const pct = (a, b) => b ? Math.round(a / b * 100) : 0;
const vibrate = ms => { try { navigator.vibrate && navigator.vibrate(ms); } catch (e) {} };
const imgTag = (cls, file) => `<img${cls ? ` class="${cls}"` : ''} src="Icons/gear/${file}.webp" alt="" draggable="false">`;
const cIcon = file => imgTag('cico', file);
const gearIcon = (g, lv) => imgTag('', g.img[Math.min(Math.max(lv, 1), g.img.length) - 1]);
const gearTags = t => [t.g, t.g2].filter(Boolean).map(s => { const [k, l] = s.split(':'); return {k, lv: +l || 1}; });

/* =================================================================== parse */
// data.js: "# Chapter | Region", "## Group", "> group note", "- item {tag} {tag:value}"
function parse(txt) {
  const chapters = [], items = [], seen = {}; let ch = null, gr = null;
  for (const raw of txt.split('\n')) {
    const line = raw.trim(); if (!line) continue;
    if (line.startsWith('> ')) { gr.note = line.slice(2); continue; }
    if (line.startsWith('## ')) { gr = {title: line.slice(3), items: [], ch}; ch.groups.push(gr); }
    else if (line.startsWith('# ')) {
      const [t, r] = line.slice(2).split('|').map(s => s.trim());
      ch = {key: 'c' + (chapters.length + 1), idx: chapters.length, title: t, region: r || '', groups: [], total: 0, done: 0};
      chapters.push(ch);
    } else if (line.startsWith('- ')) {
      const tags = {};
      const text = line.slice(2).replace(/\{([a-z0-9]+)(?::([^}]*))?\}/g, (_, k, v) => { tags[k] = v === undefined ? true : v; return ''; }).trim();
      const base = ch.key + '|' + text; seen[base] = (seen[base] || 0) + 1;
      const it = {id: hash(base + '|' + seen[base]), text, tags, ch};
      gr.items.push(it); items.push(it); ch.total++;
    }
  }
  return {chapters, items};
}
const {chapters: CH, items: ITEMS} = parse(window.DATA_TXT);
const itemById = id => ITEMS.find(i => i.id === id);

/* =================================================================== state */
let S = {c: {}, col: {}, n: {}, tab: 'list'};   // c = checked ids, col = collapsed chapters, n = notes
let storageOK = true;
try { Object.assign(S, JSON.parse(localStorage.getItem(KEY) || '{}')); } catch (e) { storageOK = false; }
delete S.hide; delete S.last;   // keys from earlier versions

// When an item's wording changes its id changes too. data.js keeps the earlier wording in old* tags
// (or a trailing {g2:..} / joy pendant suffix) so progress and notes carry over to the new id.
function earlierIds(it) {
  const k = it.ch.key, ids = [];
  if (it.tags.jp) ids.push(hash(k + '|' + it.text + ' (' + it.tags.jp + ' Joy Pendants)|1'));
  if (it.tags.g2) ids.push(hash(k + '|' + it.text + ' {g2:' + it.tags.g2 + '}|1'));
  for (const tag of ['old', 'oldb', 'oldc', 'oldd']) if (it.tags[tag]) ids.push(hash(k + '|' + it.tags[tag] + '|1'));
  return ids;
}
function migrateProgress() {
  for (const it of ITEMS) for (const old of earlierIds(it)) for (const k of ['c', 'n']) {
    if (S[k][old]) { S[k][it.id] = S[k][old]; delete S[k][old]; }
  }
  const valid = new Set(ITEMS.map(i => i.id));   // drop ids that no longer exist
  for (const k of ['c', 'n']) { const keep = {}; for (const id in (S[k] || {})) if (valid.has(id)) keep[id] = S[k][id]; S[k] = keep; }
}
migrateProgress();

function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); storageOK = true; } catch (e) { storageOK = false; } }
try { localStorage.setItem(KEY + '-t', '1'); localStorage.removeItem(KEY + '-t'); } catch (e) { storageOK = false; }
try { if (navigator.storage && navigator.storage.persist) navigator.storage.persist(); } catch (e) {}

let doneTotal = 0;
function recount() {
  doneTotal = 0; CH.forEach(c => c.done = 0);
  for (const it of ITEMS) if (S.c[it.id]) { it.ch.done++; doneTotal++; }
}
recount();
// After S.c / S.n is replaced wholesale (undo, import, reset, chapter done)
function applyProgress() { save(); recount(); syncRows(); }
function setNote(id, text) { if (text) S.n[id] = text; else delete S.n[id]; save(); refreshNotes(); }

/* =================================================================== badges */
const BADGES = [
  ['hp',    t => `♥ Piece of Heart #${esc(t.hp)}`],
  ['ch',    t => `🗺 Chart #${esc(t.ch)}`],
  ['miss',  () => '⚠ Missable'],
  ['hc',    () => '♥ Heart Container'],
  ['boss',  () => 'Boss'],
  ['song',  () => '♪ Song'],
  ['pearl', () => 'Pearl'],
  ['shard', () => '▲ Triforce Shard'],
  ['opt',   () => 'Optional'],
  ['jp',    t => `${esc(t.jp)} Joy Pendants`],
  ['ts',    () => 'Tingle Statue']
];
function badges(t) {
  const b = BADGES.filter(([k]) => t[k]).map(([k, label]) => `<span class="badge ${k}">${label(t)}</span>`);
  for (const {k, lv} of gearTags(t)) {
    const g = gearByKey(k);
    if (g) b.push(`<span class="badge bgear">${g.lv.length > 1 ? '⬆ ' : ''}${esc(g.lv[lv - 1] || g.name)}</span>`);
  }
  return b.length ? `<span class="badges">${b.join('')}</span>` : '';
}

/* ============================================================== list render */
const listEl = $('#list');
function buildList() {
  const frag = document.createDocumentFragment();
  for (const ch of CH) {
    const sec = el('section', 'chap'); sec.id = ch.key; sec.style.setProperty('--acc', ACCENTS[ch.idx % ACCENTS.length]);
    const head = el('button', 'chap-head');
    head.type = 'button'; head.dataset.key = ch.key;
    head.innerHTML = `<span class="ch-top"><span class="ch-title"><span class="ch-region">${esc(ch.region)}</span>${esc(ch.title)}</span>` +
      `<span class="ch-count"></span><span class="ch-check acc-check" role="button" tabindex="0" aria-label="Mark chapter done">${ICON.check}</span><svg class="chev" viewBox="0 0 20 20" aria-hidden="true"><path d="M5 7l5 6 5-6" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></span>` +
      `<span class="ch-bar"><i></i></span>`;
    const body = el('div', 'chap-body');
    for (const g of ch.groups) {
      const gt = el('h3', 'group-title', esc(g.title)); body.appendChild(gt);
      if (g.note) body.appendChild(el('p', 'group-note', esc(g.note)));
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
  syncRows();
}

function updateChapter(ch) {
  ch.headEl.querySelector('.ch-count').textContent = `${ch.done}/${ch.total}`;
  ch.headEl.querySelector('.ch-bar i').style.width = pct(ch.done, ch.total) + '%';
  ch.sec.classList.toggle('complete', ch.done === ch.total);
  const full = ch.total > 0 && ch.done === ch.total, ck = ch.headEl.querySelector('.ch-check');
  ck.classList.toggle('on', full); ck.setAttribute('aria-label', full ? 'Unmark chapter' : 'Mark chapter done');
  ch.sec.classList.toggle('collapsed', !!S.col[ch.key]);
  updateCollapseBtn();
}
function updateCollapseBtn() { $('#btn-collapse').textContent = CH.some(c => !S.col[c.key]) ? 'Collapse all' : 'Expand all'; }
function updateNotesBtn() { const n = ITEMS.filter(i => S.n[i.id]).length; $('#btn-notes').textContent = n ? `Notes (${n})` : 'Notes'; }
function refreshNotes() { for (const it of ITEMS) it.row.classList.toggle('has-note', !!S.n[it.id]); updateNotesBtn(); }
function updateOverall() {
  const p = pct(doneTotal, ITEMS.length);
  $('#overall-pct').textContent = p + '%';
  $('#overall-bar').style.width = p + '%';
}
// Redraw every row, chapter header and counter from S
function syncRows() {
  for (const it of ITEMS) { const on = !!S.c[it.id]; it.row.classList.toggle('done', on); it.row.firstChild.checked = on; }
  CH.forEach(updateChapter); updateOverall(); refreshNotes();
}

listEl.addEventListener('change', e => {
  const row = e.target.closest('.row'); if (!row) return;
  const id = row.dataset.id, on = e.target.checked, it = itemById(id);
  if (on) S.c[id] = 1; else delete S.c[id];
  save();
  row.classList.toggle('done', on);
  if (it) { it.ch.done += on ? 1 : -1; doneTotal += on ? 1 : -1; updateChapter(it.ch); }
  updateOverall(); queueFab();
});
listEl.addEventListener('click', e => {
  const head = e.target.closest('.chap-head'); if (!head) return;
  if (e.target.closest('.ch-check')) { markChapter(CH.find(c => c.key === head.dataset.key), $('#drop-list')); return; }
  const k = head.dataset.key; S.col[k] = S.col[k] ? 0 : 1; if (!S.col[k]) delete S.col[k];
  save(); head.parentElement.classList.toggle('collapsed', !!S.col[k]); updateCollapseBtn(); queueFab();
});

/* ============================================================== scrolling */
const scroller = $('#scroller');
const yOf = e => e.getBoundingClientRect().top - scroller.getBoundingClientRect().top + scroller.scrollTop;
function scrollToEl(e, where) {
  const off = where === 'center' ? (scroller.clientHeight - e.offsetHeight) / 2 : 0;
  scroller.scrollTo({top: Math.max(0, yOf(e) - off)});
}
function flash(r) { r.classList.remove('flash'); void r.offsetWidth; r.classList.add('flash'); }
function expand(ch) { if (S.col[ch.key]) { delete S.col[ch.key]; save(); } ch.sec.classList.remove('collapsed'); updateCollapseBtn(); }

function goChapter(key) {
  setTab('list');
  const ch = CH.find(c => c.key === key); if (!ch) return;
  expand(ch); scrollToEl(ch.sec);
}
function goGroup(g) {
  setTab('list'); expand(g.ch);
  const t = g.titleEl.hidden ? g.ch.sec : g.titleEl;
  scroller.scrollTo({top: Math.max(0, yOf(t) - (t === g.titleEl ? g.ch.headEl.offsetHeight : 0))});
}
function goItem(it) { setTab('list'); expand(it.ch); scrollToEl(it.row, 'center'); flash(it.row); }

// "Current" = the checked item that is lowest on the page, so skipped items never hold you back.
function lowestChecked() { for (let i = ITEMS.length - 1; i >= 0; i--) if (S.c[ITEMS[i].id]) return i; return -1; }
function currentTarget() {
  const idx = lowestChecked(); if (idx < 0) return null;
  const it = ITEMS[idx];
  if (S.col[it.ch.key]) return it.ch.headEl;
  if (!it.row.hidden) return it.row;
  for (let j = idx + 1; j < ITEMS.length; j++) if (!S.col[ITEMS[j].ch.key] && !ITEMS[j].row.hidden) return ITEMS[j].row;
  return it.ch.headEl;
}
function goCurrent() {
  const idx = lowestChecked(); if (idx < 0) return scroller.scrollTo({top: 0, behavior: 'smooth'});
  expand(ITEMS[idx].ch);
  const t = currentTarget(); scrollToEl(t, 'center'); if (t.classList.contains('row')) flash(t);
}

/* round button, bottom right: jump to top, or jump to current */
const fab = $('#fab'); let fabMode = null, raf = 0;
function updateFab() {
  raf = 0; const top = scroller.scrollTop; let mode = null;
  const t = S.tab === 'list' ? currentTarget() : null;
  if (t && yOf(t) > top + scroller.clientHeight - 30) mode = 'current';
  else if (top > 150) mode = 'top';
  fabMode = mode; fab.hidden = !mode;
  if (mode) { fab.classList.toggle('down', mode === 'current'); fab.setAttribute('aria-label', mode === 'top' ? 'Jump to top' : 'Jump to current'); }
}
function queueFab() { if (!raf) raf = requestAnimationFrame(updateFab); }
scroller.addEventListener('scroll', queueFab, {passive: true});
fab.addEventListener('click', () => { if (fabMode === 'current') goCurrent(); else scroller.scrollTo({top: 0, behavior: 'smooth'}); });

/* ====================================================== panels and sheets */
// Dropdown panel pinned under a toolbar button (Chapters, Search, Notes, Dungeons); press the button again to close.
let dropBtn = null;
function closeDrop() { const d = $('#drop'); if (d) d.hidden = true; if (dropBtn) dropBtn.setAttribute('aria-pressed', 'false'); dropBtn = null; }
function openDrop(btn, build, maxPx) {
  if (dropBtn === btn) return closeDrop();
  closeDrop(); $('#sheet').hidden = true;
  const d = $('#drop'), box = $('#drop-list'); box.innerHTML = ''; build(box);
  const hb = $('#top').getBoundingClientRect().bottom, br = btn.getBoundingClientRect(), tb = $('#tabs').offsetHeight;
  d.style.top = (hb + 4) + 'px'; d.style.maxHeight = Math.min(maxPx || 9999, Math.max(160, innerHeight - hb - tb - 20)) + 'px';
  d.style.setProperty('--ax', (br.left + br.width / 2 - 10) + 'px'); d.hidden = false;
  btn.setAttribute('aria-pressed', 'true'); dropBtn = btn; d.scrollTop = 0;
}
document.addEventListener('click', e => { if (dropBtn && !e.composedPath().some(n => n.id === 'drop' || n.id === 'toolbar' || n.id === 'toast')) closeDrop(); });

// Bottom sheet (used for the note editor)
function closeSheet() { $('#sheet').hidden = true; closeDrop(); }
function openSheet(title, build) {
  $('#sheet-title').textContent = title; const box = $('#sheet-list'); box.innerHTML = ''; build(box); $('#sheet').hidden = false;
}
$('#sheet-close').addEventListener('click', closeSheet);
$('.sheet-bg').addEventListener('click', closeSheet);

// Tap feedback for panel items: brief gold confirm, then go
let picking = false;
function pick(btn, fn) {
  if (picking) return; picking = true;
  btn.classList.add('picked'); vibrate(8);
  setTimeout(() => { picking = false; closeSheet(); fn(); }, 220);
}

/* ================================================================ chapters */
let accOpen = null;
function markChapter(ch, box) {
  const prev = Object.assign({}, S.c), all = ch.done === ch.total;
  for (const g of ch.groups) for (const it of g.items) { if (all) delete S.c[it.id]; else S.c[it.id] = 1; }
  applyProgress(); queueFab(); if (box) buildChapters(box);
  toast(all ? 'Chapter unchecked' : 'Chapter marked done', () => {
    S.c = prev; applyProgress(); queueFab();
    if (box && box.isConnected && !box.closest('[hidden]')) buildChapters(box);
  });
}
function buildChapters(box) {
  const card = box.closest('.sheet-card, #drop'); const keep = card ? card.scrollTop : 0;
  box.innerHTML = '';
  for (const ch of CH) {
    const acc = ACCENTS[ch.idx % ACCENTS.length], open = accOpen === ch.key, full = ch.total > 0 && ch.done === ch.total;
    const r = el('div', 'acc-row' + (open ? ' open' : ''));
    r.style.setProperty('--acc', acc);
    const nm = el('button', 'acc-name', esc(ch.title)); nm.type = 'button';
    nm.addEventListener('click', () => pick(nm, () => goChapter(ch.key)));
    const pc = el('em', '', pct(ch.done, ch.total) + '%');
    const ck = el('button', 'acc-check' + (full ? ' on' : ''), ICON.check); ck.type = 'button';
    ck.setAttribute('aria-label', full ? 'Unmark chapter' : 'Mark chapter done'); ck.setAttribute('aria-pressed', full);
    ck.addEventListener('click', () => markChapter(ch, box));
    const cv = el('button', 'acc-chev', ICON.chev); cv.type = 'button'; cv.setAttribute('aria-label', 'Show sections'); cv.setAttribute('aria-expanded', open);
    cv.addEventListener('click', () => { accOpen = open ? null : ch.key; buildChapters(box); });
    r.append(nm, pc, ck, cv); box.appendChild(r);
    if (!open) continue;
    const p = el('div', 'acc-panel'); p.style.setProperty('--acc', acc);
    for (const g of ch.groups) {
      const d = g.items.filter(i => S.c[i.id]).length;
      const b = el('button', 'jump sub', `<span>${esc(g.title)}</span><em>${d}/${g.items.length}</em>`); b.type = 'button'; b.style.setProperty('--acc', acc);
      b.addEventListener('click', () => pick(b, () => goGroup(g)));
      p.appendChild(b);
    }
    box.appendChild(p);
  }
  if (card) card.scrollTop = keep;
}
$('#btn-chapters').addEventListener('click', e => openDrop(e.currentTarget, buildChapters));

/* ================================================================ dungeons */
$('#btn-sections').addEventListener('click', e => {
  const st = stats();
  openDrop(e.currentTarget, box => BOSSES.forEach(([k, dungeon, boss]) => {
    const on = st.boss.has(k);
    box.appendChild(el('div', 'dung' + (on ? ' on' : ''), `<i class="dot"></i><div><b>${esc(dungeon)}</b><span>${esc(boss)}${on ? ' defeated' : ''}</span></div>`));
  }));
});

/* =========================================================== collapse all */
$('#btn-collapse').addEventListener('click', () => {
  const topY = scroller.getBoundingClientRect().top + 60;
  const cur = CH.find(c => c.sec.getBoundingClientRect().bottom > topY) || CH[0];
  const collapse = CH.some(c => !S.col[c.key]);
  for (const c of CH) { if (collapse) S.col[c.key] = 1; else delete S.col[c.key]; }
  save(); CH.forEach(updateChapter); scrollToEl(cur.sec); queueFab();
});

/* ================================================================== search */
function hay(it) {
  const t = it.tags, w = [it.text, it.ch.title, it.ch.region];
  if (t.hp) w.push('piece of heart heart piece #' + t.hp);
  if (t.ch) w.push('treasure chart #' + t.ch);
  if (t.hc) w.push('heart container');
  if (t.boss) w.push('boss');
  if (t.song) w.push('song');
  if (t.pearl) w.push('pearl');
  if (t.shard) w.push('triforce shard');
  if (t.ts) w.push('tingle statue');
  if (t.miss) w.push('missable');
  for (const {k} of gearTags(t)) { const g = gearByKey(k); if (g) w.push(g.name); }
  return w.join(' ').toLowerCase();
}
ITEMS.forEach(it => { it.hay = hay(it); });
$('#btn-search').addEventListener('click', e => {
  openDrop(e.currentTarget, box => {
    const inp = el('input', 's-in'); inp.type = 'search'; inp.placeholder = 'Search items, places, hearts, charts…'; inp.autocomplete = 'off'; inp.setAttribute('enterkeyhint', 'search');
    const res = el('div', 's-res'); box.append(inp, res);
    const run = () => {
      const q = inp.value.trim().toLowerCase(); res.innerHTML = ''; if (!q) return;
      const terms = q.split(/\s+/); const hits = ITEMS.filter(it => terms.every(t => it.hay.includes(t)));
      if (!hits.length) return res.appendChild(el('div', 's-none', 'No matches'));
      for (const it of hits.slice(0, 40)) {
        const b = el('button', 's-hit', `${esc(it.text)}<small>${esc(it.ch.title)}${S.c[it.id] ? ' · done' : ''}</small>`); b.type = 'button';
        b.addEventListener('click', () => pick(b, () => goItem(it)));
        res.appendChild(b);
      }
      if (hits.length > 40) res.appendChild(el('div', 's-none', `${hits.length - 40} more, keep typing to narrow it down`));
    };
    inp.addEventListener('input', run); setTimeout(() => inp.focus(), 60);
  }, Math.round(innerHeight * 0.46));
});

/* =================================================================== notes */
function buildNotes(box) {
  box.innerHTML = '';
  const list = ITEMS.filter(i => S.n[i.id]);
  if (!list.length) { box.appendChild(el('div', 's-none', 'No notes yet. Press and hold any item to add one.')); return; }
  for (const it of list) {
    const card = el('div', 'ncard'); card.style.setProperty('--acc', ACCENTS[it.ch.idx % ACCENTS.length]);
    const main = el('button', 'n-main', `<small>${esc(it.ch.title)}</small><b>${esc(it.text)}</b><span>${esc(S.n[it.id])}</span>`); main.type = 'button';
    main.addEventListener('click', () => pick(main, () => goItem(it)));
    const act = el('div', 'n-act');
    const ed = el('button', '', ICON.edit); ed.type = 'button'; ed.setAttribute('aria-label', 'Edit note');
    const del = el('button', '', ICON.trash); del.type = 'button'; del.setAttribute('aria-label', 'Delete note');
    ed.addEventListener('click', () => {
      card.innerHTML = '';
      const ta = el('textarea', 'note-ta'); ta.value = S.n[it.id] || '';
      const bt = el('div', 'note-btns'); const sv = el('button', 'gold', 'Save'); sv.type = 'button'; const cn = el('button', '', 'Cancel'); cn.type = 'button';
      sv.addEventListener('click', () => { setNote(it.id, ta.value.trim()); buildNotes(box); });
      cn.addEventListener('click', () => buildNotes(box));
      bt.append(sv, cn); card.append(el('b', 'n-t', esc(it.text)), ta, bt); ta.focus();
    });
    del.addEventListener('click', () => {
      const prev = S.n[it.id]; setNote(it.id, ''); buildNotes(box);
      toast('Note deleted', () => { setNote(it.id, prev); if (box.isConnected && !box.closest('[hidden]')) buildNotes(box); });
    });
    act.append(ed, del); card.append(main, act); box.appendChild(card);
  }
}
$('#btn-notes').addEventListener('click', e => openDrop(e.currentTarget, buildNotes));

// Press and hold an item to add or read its note
let lpT = 0, lpX = 0, lpY = 0, lpFired = 0, lpRow = null, lpDone = false;
function openNote(row) {
  const it = itemById(row.dataset.id); if (!it) return;
  vibrate(12);
  openSheet('Note', box => {
    box.appendChild(el('p', 'note-for', esc(it.text)));
    const ta = el('textarea', 'note-ta'); ta.value = S.n[it.id] || ''; ta.placeholder = 'Write a note for this item…'; box.appendChild(ta);
    const bt = el('div', 'note-btns');
    const sv = el('button', 'gold', 'Save'); sv.type = 'button';
    sv.addEventListener('click', () => { const v = ta.value.trim(); setNote(it.id, v); closeSheet(); toast(v ? 'Note saved' : 'Note removed'); });
    bt.appendChild(sv);
    if (S.n[it.id]) { const d = el('button', '', 'Delete'); d.type = 'button'; d.addEventListener('click', () => { setNote(it.id, ''); closeSheet(); toast('Note removed'); }); bt.appendChild(d); }
    box.appendChild(bt);
  });
}
const lpStop = () => { clearTimeout(lpT); if (lpRow) lpRow.classList.remove('lp'); lpRow = null; };
listEl.addEventListener('pointerdown', e => {
  const row = e.target.closest('.row'); if (!row || (e.pointerType === 'mouse' && e.button !== 0)) return;
  lpStop(); lpRow = row; lpX = e.clientX; lpY = e.clientY;
  lpT = setTimeout(() => { lpDone = true; const r = lpRow; lpStop(); openNote(r); }, 550);
});
listEl.addEventListener('pointermove', e => { if (lpRow && (Math.abs(e.clientX - lpX) > 8 || Math.abs(e.clientY - lpY) > 8)) lpStop(); });
['pointerup', 'pointercancel', 'pointerleave'].forEach(ev => listEl.addEventListener(ev, () => { if (lpDone) { lpDone = false; lpFired = Date.now(); } lpStop(); }));
document.addEventListener('pointerup', () => { if (lpDone) { lpDone = false; lpFired = Date.now(); } });
listEl.addEventListener('click', e => { if (Date.now() - lpFired < 450) { e.preventDefault(); e.stopPropagation(); } }, true);   // swallow the tap that ends a long press
listEl.addEventListener('contextmenu', e => { if (e.target.closest('.row')) e.preventDefault(); });

/* ===================================================================== hub */
const hubEl = $('#hub-view');
const hubOpen = {};   // which Collection panels are open

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
    for (const {k, lv} of gearTags(t)) s.gear[k] = Math.max(s.gear[k] || 0, lv);
  }
  return s;
}
const countTag = re => (window.DATA_TXT.match(re) || []).length;
const TOT = {hp: countTag(/\{hp:/g), ch: countTag(/\{ch:/g), shard: countTag(/\{shard\}/g), hc: countTag(/\{hc\}/g), ts: countTag(/\{ts\}/g)};

const numChips = (n, has, k, cls) => Array.from({length: n}, (_, i) => `<span class="num${cls}${has(i + 1) ? ' on' : ''}" data-k="${k}" data-n="${i + 1}">${i + 1}</span>`).join('');
const seqNums = k => ITEMS.filter(i => i.tags[k]).map((it, i) => `<span class="num${S.c[it.id] ? ' on' : ''}" data-k="${k}" data-n="${i + 1}">${i + 1}</span>`).join('');

function collectionPanels(s) {
  const P = (k, title, body) => `<div class="coll-panel" data-p="${k}"${hubOpen[k] ? '' : ' hidden'}><div class="sub">${title} <small>tap one to see where it is</small></div>${body}</div>`;
  const nums = inner => `<div class="nums">${inner}</div>`;
  return P('hp', 'Pieces of Heart', nums(numChips(TOT.hp, n => s.hp.has(n), 'hp', ' hp'))) +
    P('ch', 'Treasure Charts', nums(numChips(TOT.ch, n => s.ch.has(n), 'ch', ''))) +
    P('shard', 'Triforce Shards', nums(seqNums('shard'))) +
    P('hc', 'Heart Containers', nums(seqNums('hc'))) +
    P('ts', 'Tingle Statues', nums(seqNums('ts'))) +
    P('song', 'Songs', `<div class="chips songs">${SONGS.map(([k, n]) => `<span class="chip purple${s.song.has(k) ? ' on' : ''}" data-k="song" data-n="${k}">${esc(n)}</span>`).join('')}</div>`);
}
function tile(label, a, b, k, icon) {
  return `<button type="button" class="tile tap${hubOpen[k] ? ' open' : ''}" data-open="${k}" aria-expanded="${!!hubOpen[k]}">${cIcon(icon)}<b>${a}/${b}</b><span>${label}</span><div class="mini"><i style="width:${pct(a, b)}%"></i></div>${ICON.chev.replace('<svg ', '<svg class="tc" ')}</button>`;
}

const TRIFORCE = 'M20 2 L27 14 H13Z M13 14 L20 26 H6Z M27 14 L34 26 H20Z';
function hubOverall(s) {
  const P = pct(doneTotal, ITEMS.length);
  const quarters = Math.min(80, 12 + 4 * s.hc + s.hp.size);   // hearts in quarters, 3 hearts to start
  let hearts = '';
  for (let i = 0; i < 20; i++) hearts += `<span class="heart"><i class="q${Math.max(0, Math.min(4, quarters - i * 4))}"></i></span>`;
  const magic = [0, 50, 100][Math.min(2, s.gear.magic || 0)];
  return `<div class="card" id="h-overall"><h2>Overall Progress</h2><div class="in"><div class="tri-wrap">
    <svg class="tri-prog" viewBox="3 0 34 28" role="img" aria-label="${P}% complete">
      <defs><clipPath id="tpc"><path d="${TRIFORCE}"/></clipPath></defs>
      <path class="tp-bg" d="${TRIFORCE}"/>
      <g clip-path="url(#tpc)"><rect class="tp-fill" x="3" y="1" width="34" height="26" style="transform:scaleY(${P / 100})"/></g>
      <path class="tp-line" d="${TRIFORCE}"/>
      <text x="20" y="19.2">${P}%</text>
    </svg></div>
    <div class="vit"><div class="hearts">${hearts}</div>
    <div class="magic" aria-label="Magic meter"><div class="mbar"><i style="width:${magic}%"></i></div></div></div>
    </div></div>`;
}
function hubCollection(s) {
  return `<div class="card" id="h-collection"><h2>Collection</h2><div class="in"><p class="coll-note">${cIcon('joy_pendant')}<span>Joy Pendants: 60 needed in total. 20 for the Cabana Deed, 40 more for Treasure Chart #45.</span></p><div class="tiles">` +
    tile('Pieces of Heart', s.hp.size, TOT.hp, 'hp', 'heart') + tile('Treasure Charts', s.ch.size, TOT.ch, 'ch', 'treasure_chart') + tile('Triforce Shards', s.shard, TOT.shard, 'shard', 'triforce_shard') +
    tile('Heart Containers', s.hc, TOT.hc, 'hc', 'heart_container') + tile('Tingle Statues', s.ts, TOT.ts, 'ts', 'tingle_statue') + tile('Songs', s.song.size, SONGS.length, 'song', 'wind_waker') +
    `</div>` + collectionPanels(s) +
    `<div class="sub">Pearls</div><div class="chips pearls">${PEARLS.map(([k, n, c, icon]) => `<span class="chip ${c}${s.pearl.has(k) ? ' on' : ''}" data-k="pearl" data-n="${k}">${cIcon(icon)}${esc(n)}</span>`).join('')}</div>` +
    `</div></div>`;
}
function gearBox(g, s) {
  const lv = s.gear[g.k] || 0, n = g.lv.length;
  const name = lv ? g.lv[lv - 1] : (g.base || g.name);
  const cls = 'gear' + (lv || g.base ? '' : ' locked') + (lv === n && n > 1 ? ' max' : '') + (FEATURED.includes(g.k) ? ' feat' : '') + (WIDE.includes(g.k) ? ' big' : '');
  let pips = '<div class="pips sp"></div>';
  if (n > 1) { pips = '<div class="pips">'; for (let i = 1; i <= n; i++) pips += `<i class="${i <= lv ? 'on' : ''}"></i>`; pips += '</div>'; }
  return `<div class="${cls}" data-k="gear" data-n="${g.k}">${pips}<div class="gi">${gearIcon(g, lv)}</div><div class="gn">${esc(name)}</div></div>`;
}
function hubGear(s) {
  let h = `<div class="card" id="h-gear"><h2>Gear &amp; Upgrades</h2><div class="in">`;
  for (const [title, keys, gc] of GEAR_GROUPS) h += `${title ? `<div class="sub">${title}</div>` : ''}<div class="gear-grid${gc ? ' ' + gc : ''}">${keys.map(k => gearBox(gearByKey(k), s)).join('')}</div>`;
  return h + `</div></div>`;
}
const HUB_SAVE = `<div class="card" id="h-save"><h2>Save &amp; Backup</h2><div class="in">
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
const HUB_CREDIT = `<p class="credit">Checklist and walkthrough content from <a href="https://www.zeldadungeon.net/the-wind-waker-walkthrough/" target="_blank" rel="noopener">Zelda Dungeon</a>.<br>Item artwork from <a href="https://zeldawiki.wiki/wiki/Category:The_Wind_Waker_HD_Artwork" target="_blank" rel="noopener">Zelda Wiki</a>. The Legend of Zelda is a Nintendo property.</p>`;

function renderHub() {
  const s = stats();
  const warn = storageOK ? '' : `<div class="warn">This browser isn't letting the page save progress (private mode?). Open it normally, or use Export below before you close it.</div>`;
  hubEl.innerHTML = warn + hubOverall(s) + hubCollection(s) + hubGear(s) + HUB_SAVE + HUB_CREDIT;
}

/* open/close the hearts, charts, songs... under Collection */
hubEl.addEventListener('click', e => {
  const t = e.target.closest('.tile.tap'); if (!t) return;
  const k = t.dataset.open; hubOpen[k] = !hubOpen[k];
  t.classList.toggle('open', hubOpen[k]); t.setAttribute('aria-expanded', !!hubOpen[k]);
  const p = hubEl.querySelector(`.coll-panel[data-p="${k}"]`); if (p) p.hidden = !hubOpen[k];
  $('#tip').classList.remove('show'); queueFab();
});

/* ============================================================ save & backup */
hubEl.addEventListener('click', e => {
  const id = e.target.id, paste = $('#paste-box'), pasteGo = $('#b-paste-go');
  if (id === 'b-export') exportFile();
  else if (id === 'b-copy') copyBackup();
  else if (id === 'b-import') $('#file-in').click();
  else if (id === 'b-paste') { paste.hidden = !paste.hidden; pasteGo.hidden = paste.hidden; }
  else if (id === 'b-paste-go') importText(paste.value);
  else if (id === 'b-reset') {
    const prev = {c: S.c, n: S.n};
    S.c = {}; S.n = {}; applyProgress(); renderHub();
    toast('Progress reset', () => restoreSnap(prev));
  }
});
hubEl.addEventListener('change', e => {
  if (e.target.id !== 'file-in') return;
  const f = e.target.files[0]; if (!f) return;
  const r = new FileReader(); r.onload = () => importText(String(r.result)); r.readAsText(f); e.target.value = '';
});

function backupObj() { return {app: 'wwhd-checklist', v: 1, saved: new Date().toISOString(), checked: Object.keys(S.c), notes: S.n}; }
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
function restoreSnap(p) { S.c = p.c; S.n = p.n; applyProgress(); renderHub(); queueFab(); }
function importText(txt) {
  let o; try { o = JSON.parse(txt); } catch (e) { return toast('That is not a valid backup'); }
  if (!o || o.app !== 'wwhd-checklist' || !Array.isArray(o.checked)) return toast('That is not a Wind Waker checklist backup');
  const valid = new Set(ITEMS.map(i => i.id)); const next = {}; let n = 0;
  o.checked.forEach(id => { if (valid.has(id)) { next[id] = 1; n++; } });
  const notes = {}; if (o.notes && typeof o.notes === 'object') for (const id in o.notes) if (valid.has(id) && typeof o.notes[id] === 'string' && o.notes[id]) notes[id] = o.notes[id];
  const prev = {c: S.c, n: S.n};
  S.c = next; S.n = notes; applyProgress(); renderHub(); toast(`Restored ${n} items`, () => restoreSnap(prev));
}

/* ==================================================================== tabs */
let listY = 0;
function setTab(t) {
  closeDrop();
  if (S.tab === 'list' && t === 'hub') listY = scroller.scrollTop;
  S.tab = t; save();
  const hub = t === 'hub';
  document.body.classList.toggle('hub-mode', hub);
  $('#list-view').hidden = hub; hubEl.hidden = !hub;
  $('#tab-list').classList.toggle('on', !hub); $('#tab-hub').classList.toggle('on', hub);
  if (hub) { renderHub(); scroller.scrollTop = 0; } else { scroller.scrollTop = listY; }
  queueFab();
}
$('#tab-list').addEventListener('click', () => setTab('list'));
$('#tab-hub').addEventListener('click', () => setTab('hub'));

/* ======================================================== "where is this?" */
let tipT;
const clean = t => t.replace(/^(Piece of Heart|Treasure Chart)( from [^:]*)?:?\s*/i, '') || t;
function showTip(title, it, note) {
  const tip = $('#tip'); clearTimeout(tipT);
  tip.innerHTML = `<b>${esc(title)}</b>` + (note ? `<span class="tl">${esc(note)}</span>` : '') +
    (it ? `<span class="tl">${esc(it.ch.title)}</span><span>${esc(clean(it.text))}</span>` : (note ? '' : '<span>No location listed</span>'));
  tip.classList.add('show'); tipT = setTimeout(() => tip.classList.remove('show'), 6000);
}
const gearItem = (k, lv) => ITEMS.find(i => gearTags(i.tags).some(x => x.k === k && (!lv || x.lv === lv)));
function tipFor(k, n) {
  if (k === 'hp' || k === 'ch') return showTip((k === 'hp' ? 'Piece of Heart #' : 'Treasure Chart #') + n, ITEMS.find(i => i.tags[k] === n), k === 'ch' && n === '45' ? 'Needs 40 Joy Pendants' : '');
  if (SEQ[k]) return showTip(SEQ[k] + ' #' + n, ITEMS.filter(i => i.tags[k])[+n - 1]);
  if (k === 'song') return showTip((SONGS.find(x => x[0] === n) || [0, 'Song'])[1], ITEMS.find(i => i.tags.song === n));
  if (k === 'pearl') return showTip((PEARLS.find(x => x[0] === n) || [0, 'Pearl'])[1], ITEMS.find(i => i.tags.pearl === n));
  if (k === 'gear') {
    const g = gearByKey(n); if (!g) return;
    const lv = stats().gear[g.k] || 0, len = g.lv.length;
    if (/^b\d$/.test(g.k)) return showTip(g.name, gearItem(g.k));                  // bottles always say where to get them
    if (lv >= len) return showTip(g.lv[len - 1] + ': done', null, 'Nothing left to upgrade');
    return showTip('Next: ' + g.lv[lv], gearItem(g.k, lv + 1), g.k === 'cabana' ? 'Needs 20 Joy Pendants' : '');
  }
}
hubEl.addEventListener('click', e => { const n = e.target.closest('[data-k]'); if (n) tipFor(n.dataset.k, n.dataset.n); });
document.addEventListener('click', e => { if (!e.target.closest('[data-k]')) $('#tip').classList.remove('show'); });

/* =================================================================== toast */
let tt, undoFn = null;
function toast(msg, undo) {
  const t = $('#toast'); undoFn = undo || null;
  if (undo) { t.innerHTML = `${esc(msg)} <button type="button" class="tundo">Undo</button>`; t.classList.add('act'); } else { t.textContent = msg; t.classList.remove('act'); }
  t.classList.add('show'); clearTimeout(tt); tt = setTimeout(() => t.classList.remove('show', 'act'), undo ? 5500 : 2400);
}
$('#toast').addEventListener('click', e => { if (e.target.closest('.tundo') && undoFn) { const f = undoFn; undoFn = null; $('#toast').classList.remove('show', 'act'); f(); } });

/* ==================================================================== boot */
buildList();
const startTab = S.tab === 'hub' ? 'hub' : 'list'; S.tab = 'list'; setTab(startTab);
if (startTab === 'list') requestAnimationFrame(() => { const t = currentTarget(); if (t) scrollToEl(t, 'center'); queueFab(); });

if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
  window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
}
})();
