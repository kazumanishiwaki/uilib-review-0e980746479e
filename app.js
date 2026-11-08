'use strict';
const STORAGE_KEY = 'uilib.parts-review.v1';
const labels = { pending: '未レビュー', approved: '承認', rejected: '却下', hold: '保留' };
const $ = (id) => document.getElementById(id);
let targets = [], reviews = {}, parts = new Map(), axes = new Map();
function notice(message, error = false) { $('notice').textContent = message; $('notice').classList.toggle('error', error); }
function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}
function validate(value) {
  if (!value || value.version !== 1 || !Array.isArray(value.approvals)) throw new Error('version: 1 と approvals 配列が必要です。');
  const result = {};
  for (const row of value.approvals) {
    if (!row || typeof row.id !== 'string' || !Object.hasOwn(labels, row.status) || typeof row.memo !== 'string' || (row.updated_at !== undefined && typeof row.updated_at !== 'string') || Object.hasOwn(result, row.id)) throw new Error('ID・status・memo の形式、またはIDの重複を確認してください。');
    Object.defineProperty(result, row.id, { value: { status: row.status, memo: row.memo, updated_at: row.updated_at || null }, enumerable: true, writable: true, configurable: true });
  }
  return result;
}
function current(id) { return Object.hasOwn(reviews, id) ? reviews[id] : { status: 'pending', memo: '', updated_at: null }; }
function persist() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: 1, approvals: Object.entries(reviews).map(([id, row]) => ({ id, ...row })) })); notice('このブラウザに保存しました。'); }
  catch { notice('ブラウザに保存できません。エクスポートして状態を保管してください。', true); }
}
function update(id, patch) { reviews[id] = { ...current(id), ...patch, updated_at: new Date().toISOString() }; persist(); }
function imagePanel(id, folder, title) {
  const panel = element('figure', 'image-panel');
  panel.append(element('figcaption', '', title));
  const box = element('div', 'image-box');
  const fallback = element('div', 'placeholder');
  fallback.append(element('strong', '', '画像未配置'), element('span', '', `${folder}/${id}.png`));
  const img = document.createElement('img');
  img.alt = `${id} — ${title}`; img.loading = 'lazy';
  img.addEventListener('error', () => { img.remove(); fallback.hidden = false; });
  fallback.hidden = true;
  img.src = `${folder}/${encodeURIComponent(id)}.png`;
  box.append(fallback, img); panel.append(box); return panel;
}
function render() {
  const visible = targets.filter(t => (!$('section').value || t.section === $('section').value) && (!$('status').value || current(t.id).status === $('status').value));
  const counts = Object.fromEntries(Object.keys(labels).map(s => [s, targets.filter(t => current(t.id).status === s).length]));
  $('summary').textContent = `${visible.length} / ${targets.length} パーツ · ${Object.entries(labels).map(([s, label]) => `${label} ${counts[s]}`).join(' / ')}`;
  $('cards').classList.toggle('comparing', $('compare').checked);
  const fragment = document.createDocumentFragment();
  for (const target of visible) {
    const match = parts.get(target.id), row = current(target.id);
    const card = element('article', 'card');
    const images = element('div', 'images'); images.append(imagePanel(target.id, 'shots', 'ORIGINAL / 元画像'));
    if ($('compare').checked) images.append(imagePanel(target.id, 'rebuilt', 'REBUILT / 再現画像'));
    const content = element('div', 'content');
    const meta = element('div', 'meta');
    const badge = element('span', 'badge', labels[row.status]); badge.dataset.status = row.status;
    meta.append(element('span', '', `${target.award_year ?? match?.site.award_year ?? '—'} 受賞`), element('span', 'tag', target.section), badge);
    content.append(meta, element('h2', '', target.site || match?.site.name || target.id), element('p', 'part', target.part_ja || match?.part.part_ja || target.section));
    const tags = element('div', 'tags');
    for (const [axis, score] of Object.entries(match?.part.axis_tags || {})) {
      const definition = axes.get(axis);
      const tag = element('span', 'tag', `${definition?.name_ja || axis} ${score}`);
      tag.title = `${definition?.direction || axis} / ${definition?.scale?.[score] || score}`;
      tags.append(tag);
    }
    if (!tags.childNodes.length) tags.append(element('span', 'tag', '軸タグなし'));
    content.append(tags);
    const link = element('a', 'source', target.page_url); link.target = '_blank'; link.rel = 'noopener noreferrer';
    try { const url = new URL(target.page_url); if (['https:', 'http:'].includes(url.protocol)) link.href = url.href; } catch { /* Invalid source remains plain text. */ }
    content.append(link);
    const actions = element('div', 'actions');
    for (const status of ['approved', 'rejected', 'hold', 'pending']) {
      const button = element('button', '', status === 'pending' ? '未レビューに戻す' : labels[status]);
      button.dataset.status = status; button.setAttribute('aria-pressed', String(row.status === status));
      button.addEventListener('click', () => { update(target.id, { status }); render(); }); actions.append(button);
    }
    const memo = element('label', 'memo', 'レビューのメモ');
    const textarea = document.createElement('textarea'); textarea.value = row.memo; textarea.placeholder = '選定理由や再現時の確認点…';
    textarea.addEventListener('input', () => update(target.id, { memo: textarea.value })); memo.append(textarea);
    content.append(actions, memo); card.append(images, content); fragment.append(card);
  }
  if (!visible.length) fragment.append(element('p', 'empty', '条件に一致するパーツはありません。'));
  $('cards').replaceChildren(fragment);
}
$('export').addEventListener('click', () => {
  const payload = { version: 1, exported_at: new Date().toISOString(), approvals: targets.map(t => ({ id: t.id, ...current(t.id) })) };
  const url = URL.createObjectURL(new Blob([JSON.stringify(payload, null, 2) + '\n'], { type: 'application/json' }));
  const link = document.createElement('a'); link.href = url; link.download = 'approvals.json'; link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
});
$('import').addEventListener('change', async (event) => {
  const file = event.target.files[0]; if (!file) return;
  try {
    const imported = validate(JSON.parse(await file.text()));
    const ids = new Set(targets.map(t => t.id)); let count = 0, skipped = 0;
    for (const [id, row] of Object.entries(imported)) { if (ids.has(id)) { reviews[id] = row; count++; } else skipped++; }
    persist(); render();
    const message = `${count} 件をインポートしました。${skipped ? `未知のID ${skipped} 件は除外しました。` : ''}`;
    // Keep a storage error visible if persistence failed.
    if (!$('notice').classList.contains('error')) notice(message);
  } catch (error) { notice(`インポートできません: ${error.message}`, true); }
  event.target.value = '';
});
for (const id of ['section', 'status', 'compare']) $(id).addEventListener('change', render);
async function load() {
  try {
    const [capture, data] = await Promise.all(['./capture_targets.json', './data.json'].map(async path => {
      const response = await fetch(path); if (!response.ok) throw new Error(`${path}: HTTP ${response.status}`); return response.json();
    }));
    if (!Array.isArray(capture.targets) || !Array.isArray(data.sites)) throw new Error('入力JSONの構造が正しくありません。');
    targets = capture.targets;
    axes = new Map((data.axes || []).map(axis => [axis.id, axis]));
    for (const site of data.sites) for (const part of site.parts || []) parts.set(part.capture_target_id, { site, part });
    let warning = '';
    try { const saved = localStorage.getItem(STORAGE_KEY); if (saved) reviews = validate(JSON.parse(saved)); }
    catch { warning = '保存済み状態を読み込めませんでした。必要に応じてバックアップをインポートしてください。'; }
    for (const section of [...new Set(targets.map(t => t.section))].sort()) {
      const option = element('option', '', section); option.value = section; $('section').append(option);
    }
    for (const id of ['section', 'status', 'export', 'import']) $(id).disabled = false;
    render(); notice(warning || '準備完了。画像がないパーツはプレースホルダで表示します。', Boolean(warning));
  } catch (error) { notice(`読み込みに失敗しました: ${error.message} HTTPサーバー経由で開いてください。`, true); }
}
load();
