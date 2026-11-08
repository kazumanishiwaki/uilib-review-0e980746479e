'use strict';
const $ = s => document.querySelector(s);
const KEY = 'btnlib-status-v1';
const names = {ok:'OK',ng:'NG',hold:'保留'};
const groups = {shape:['形状',{pill:'ピル',rounded:'角丸',square:'四角'}],fill:['塗り',{solid:'塗りつぶし',outline:'アウトライン',ghost:'ゴースト',text:'テキスト'}],icon:['アイコン',{'true':'あり','false':'なし'}],size:['サイズ',{S:'S',M:'M',L:'L'}]};
let items = [], statuses = {}, active = null;
const selected = Object.fromEntries(Object.keys(groups).map(k => [k,new Set()]));
const validStatus = value => Object.hasOwn(names,value);
function cleanStatuses(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('評価データはオブジェクトで指定してください。');
  const result = Object.create(null);
  for (const [id,status] of Object.entries(value)) {
    if (!validStatus(status)) throw new Error('評価は ok・ng・hold のいずれかで指定してください。');
    result[id] = status;
  }
  return result;
}
function notice(message) { $('#notice').textContent = message; }
try { statuses = cleanStatuses(JSON.parse(localStorage.getItem(KEY) || '{}')); }
catch { notice('保存済みの評価を読み込めませんでした。新しい評価から開始します。'); }
function save() {
  try { localStorage.setItem(KEY, JSON.stringify(statuses)); }
  catch { notice('評価を保存できません。書き出してデータを保管してください。'); }
}
function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}
function picture(src, label) {
  const img = el('img');
  img.alt = label; img.loading = 'lazy'; img.decoding = 'async';
  img.onerror = () => img.replaceWith(el('span','placeholder','画像を読み込めません'));
  if (typeof src === 'string' && src.trim()) img.src = src;
  else return el('span','placeholder','画像がありません');
  return img;
}
function tags(item) {
  const row = el('div','tags');
  for (const [key,[,values]] of Object.entries(groups)) {
    const value = values[String(item.tags?.[key])];
    if (value) row.append(el('span','tag',key === 'icon' ? `アイコン${value}` : value));
  }
  return row;
}
for (const [key,[label,values]] of Object.entries(groups)) {
  const row = el('div','chip-row'); row.setAttribute('role','group'); row.setAttribute('aria-label',label);
  row.append(el('span','filter-label',label));
  for (const [value,text] of Object.entries(values)) {
    const button = el('button','',text); button.setAttribute('aria-pressed','false');
    button.onclick = () => {
      selected[key].has(value) ? selected[key].delete(value) : selected[key].add(value);
      button.setAttribute('aria-pressed',String(selected[key].has(value))); render();
    };
    row.append(button);
  }
  $('#chips').append(row);
}
function render() {
  const filtered = items.filter(item => Object.entries(selected).every(([key,values]) => !values.size || values.has(String(item.tags?.[key]))) && (!$('#site').value || item.site === $('#site').value) && (!$('#status').value || (statuses[item.id] || 'unreviewed') === $('#status').value));
  $('#count').textContent = `${filtered.length} / ${items.length} 件`;
  $('#empty').hidden = filtered.length !== 0;
  const fragment = document.createDocumentFragment();
  for (const item of filtered) {
    const tile = el('button','tile'); tile.setAttribute('aria-label',`${item.site} ${item.label || 'ボタン'} 詳細を開く`);
    const preview = el('div','preview');
    const normal = picture(item.image, item.label || '通常のボタン'); preview.append(normal);
    if (item.hover) {
      const hover = picture(item.hover,`${item.label || 'ボタン'} ホバー`); hover.hidden = true;
      // Use wrappers so a failed image retains the same show/hide behavior.
      const normalWrap = el('div'), hoverWrap = el('div');
      normalWrap.style.width = hoverWrap.style.width = '100%';
      normalWrap.append(normal); hover.hidden = false; hoverWrap.append(hover); hoverWrap.hidden = true;
      preview.replaceChildren(normalWrap,hoverWrap);
      const swap = on => { normalWrap.hidden = on; hoverWrap.hidden = !on; };
      tile.onpointerenter = e => { if (e.pointerType !== 'touch') swap(true); };
      tile.onpointerleave = () => swap(false);
      tile.onfocus = () => swap(true); tile.onblur = () => swap(false);
    }
    const info = el('div','tile-info'), line = el('div','site-line');
    line.append(el('span','site-name',item.site),el('span','',String(item.award_year ?? '')));
    info.append(line,tags(item));
    if (statuses[item.id]) info.append(el('span','badge',names[statuses[item.id]]));
    tile.append(preview,info); tile.onclick = () => openDetail(item); fragment.append(tile);
  }
  $('#gallery').replaceChildren(fragment);
}
function openDetail(item) {
  active = item; $('#detail-title').textContent = item.label || item.site;
  const pair = el('div','image-pair');
  for (const [label,src] of [['通常',item.image],['ホバー',item.hover]]) {
    const figure = el('figure'); figure.append(el('figcaption','',label));
    const preview = el('div','large-preview'); preview.append(src ? picture(src,label) : el('span','muted','ホバー画像なし')); figure.append(preview); pair.append(figure);
  }
  const meta = el('div','meta');
  meta.append(el('p','',`${item.site} · ${item.award_year ?? '年不明'}`),el('p','',`ID: ${item.id}`),el('p','',`セレクター: ${item.selector || '—'}`),tags(item));
  try {
    const url = new URL(item.site_url);
    if (['http:','https:'].includes(url.protocol)) {
      const link = el('a','', 'サイトを開く ↗'); link.href = url.href; link.target = '_blank'; link.rel = 'noopener noreferrer';
      const p = el('p'); p.append(link); meta.append(p);
    }
  } catch { /* Invalid site URLs are not linked. */ }
  $('#detail-content').replaceChildren(pair,meta); updateReview(); $('#detail').showModal();
}
function updateReview() {
  document.querySelectorAll('[data-status]').forEach(b => b.setAttribute('aria-pressed',String(statuses[active.id] === b.dataset.status)));
}
document.querySelectorAll('[data-status]').forEach(b => b.onclick = () => { statuses[active.id] = b.dataset.status; save(); updateReview(); render(); });
$('#close').onclick = () => $('#detail').close();
$('#detail').onclick = e => { if (e.target === $('#detail')) { const r = e.target.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) e.target.close(); } };
$('#site').onchange = $('#status').onchange = render;
$('#reset').onclick = () => { Object.values(selected).forEach(s => s.clear()); document.querySelectorAll('#chips button').forEach(b => b.setAttribute('aria-pressed','false')); $('#site').value = $('#status').value = ''; render(); };
$('#export').onclick = () => {
  const url = URL.createObjectURL(new Blob([JSON.stringify(statuses,null,2)],{type:'application/json'}));
  const a = el('a'); a.href = url; a.download = 'btnlib-approvals.json'; a.click(); setTimeout(() => URL.revokeObjectURL(url),1000);
};
$('#import').onchange = async e => {
  const file = e.target.files[0]; if (!file) return;
  try {
    const imported = cleanStatuses(JSON.parse(await file.text()));
    statuses = Object.assign(Object.create(null),statuses,imported); save(); render();
    if (active) updateReview(); notice(`${Object.keys(imported).length} 件の評価を読み込みました。`);
  } catch (error) { notice(`読み込みに失敗しました: ${error.message}`); }
  e.target.value = '';
};
(async () => {
  try {
    const response = await fetch('buttons.json');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    if (!Array.isArray(data.items)) throw new Error('items 配列がありません');
    items = data.items.filter(item => item && (typeof item.id === 'string' || typeof item.id === 'number'));
    for (const site of [...new Set(items.map(i => i.site).filter(Boolean))].sort((a,b) => a.localeCompare(b,'ja'))) {
      const option = el('option','',site); option.value = site; $('#site').append(option);
    }
    render();
    if (data.meta?.skipped?.length) notice(`収集時にスキップ: ${data.meta.skipped.length} 件`);
  } catch (error) {
    $('#count').textContent = '読み込みエラー';
    notice(`buttons.json を読み込めませんでした (${error.message})。ファイルを配置し、HTTP サーバー経由で開いてください。`);
  }
})();
