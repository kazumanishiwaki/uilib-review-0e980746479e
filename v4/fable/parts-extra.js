window.__v4RunPart = window.__v4RunPart || function (model, code, fn) {
  try {
    var card = document.getElementById(model + '-' + code);
    var root = card && (card.querySelector('.stage') || card);
    if (!root) return;
    var scoped = new Proxy(window.document, {
      get: function (target, prop) {
        if (prop === 'querySelector') return function (sel) { return root.querySelector(sel); };
        if (prop === 'querySelectorAll') return function (sel) { return root.querySelectorAll(sel); };
        if (prop === 'getElementById') return function (id) {
          if (!id) return null;
          var safe = String(id).replace(/\\/g, '\\\\').replace(/"/g, '\\"');
          return root.querySelector('[id="' + safe + '"]');
        };
        if (prop === 'getElementsByClassName') return function (c) { return root.getElementsByClassName(c); };
        if (prop === 'getElementsByTagName') return function (t) { return root.getElementsByTagName(t); };
        var v = target[prop];
        return typeof v === 'function' ? v.bind(target) : v;
      }
    });
    fn(scoped);
  } catch (err) {
    try { console.error('[v4 ' + model + ' ' + code + ']', err); } catch (e2) {}
  }
};

/* CONT-11-1 */
__v4RunPart("fable", "CONT-11-1", function (document) {
(function(){document.querySelectorAll('.p-CONT-11-1 .follow').forEach(function(b){b.addEventListener('click',function(){var on=b.getAttribute('aria-pressed')!=='true';b.setAttribute('aria-pressed',on?'true':'false');b.textContent=on?'フォロー中':'フォローする';});});})();
});

/* CONT-11-2 */
__v4RunPart("fable", "CONT-11-2", function (document) {
(function(){document.querySelectorAll('.p-CONT-11-2 .follow').forEach(function(b){b.addEventListener('click',function(){var on=b.getAttribute('aria-pressed')!=='true';b.setAttribute('aria-pressed',on?'true':'false');b.textContent=on?'フォロー中':'フォロー';});});})();
});

/* CONT-12-1 */
__v4RunPart("fable", "CONT-12-1", function (document) {
(function(){document.querySelectorAll('.p-CONT-12-1').forEach(function(r){var bs=[].slice.call(r.querySelectorAll('.axis button')),ss=r.querySelectorAll('.slide');bs.forEach(function(b,i){b.addEventListener('click',function(){bs.forEach(function(x,j){if(j===i){x.setAttribute('aria-current','true');}else{x.removeAttribute('aria-current');}ss[j].hidden=j!==i;});});});});})();
});

/* CONT-14-3 */
__v4RunPart("fable", "CONT-14-3", function (document) {
(function(){document.querySelectorAll('.p-CONT-14-3').forEach(function(r){var items=[].slice.call(r.querySelectorAll('li'));function render(){items.forEach(function(li){var s=li.getAttribute('data-state'),b=li.querySelector('.go');b.hidden=s==='done';b.disabled=s==='locked';b.textContent=s==='locked'?'ロック中':'完了にする';li.querySelector('.n').textContent=s==='done'?'完了しました':s==='locked'?'前の項目を終えると着手できます':'いま着手できます';});}items.forEach(function(li,i){li.querySelector('.go').addEventListener('click',function(){li.setAttribute('data-state','done');var n=items[i+1];if(n){n.setAttribute('data-state','open');}render();if(n){n.querySelector('.go').focus();}});});r.querySelector('.reset').addEventListener('click',function(){items.forEach(function(li,i){li.setAttribute('data-state',i===0?'open':'locked');});render();});});})();
});

/* CONT-15-2 */
__v4RunPart("fable", "CONT-15-2", function (document) {
(function(){document.querySelectorAll('.p-CONT-15-2').forEach(function(r){var s=r.querySelector('select'),lis=[].slice.call(r.querySelectorAll('li')),e=r.querySelector('.empty');s.addEventListener('change',function(){var n=0;lis.forEach(function(li){var h=s.value!=='all'&&li.getAttribute('data-type')!==s.value;li.hidden=h;if(!h){n++;}});e.hidden=n>0;});});})();
});

/* CONT-16-2 */
__v4RunPart("fable", "CONT-16-2", function (document) {
(function(){document.querySelectorAll('.p-CONT-16-2').forEach(function(r){var f=r.querySelector('form'),inp=f.querySelector('input'),ul=r.querySelector('.replies'),n=r.querySelector('.n');f.addEventListener('submit',function(e){e.preventDefault();var t=inp.value.trim();if(!t){return;}var li=document.createElement('li');li.innerHTML='<span class=av aria-hidden=true>私</span><div><p class=hd><b>あなた</b><span>たった今</span></p><p class=tx></p></div>';li.querySelector('.tx').textContent=t;ul.appendChild(li);n.textContent=ul.children.length;inp.value='';});});})();
});

/* CONT-17-1 */
__v4RunPart("fable", "CONT-17-1", function (document) {
(function(){document.querySelectorAll('.p-CONT-17-1').forEach(function(r){var ol=r.querySelector('.ans');r.querySelectorAll('.vote').forEach(function(b){b.addEventListener('click',function(){var li=b.closest('li'),on=b.getAttribute('aria-pressed')!=='true',v=parseInt(li.getAttribute('data-v'),10)+(on?1:-1);b.setAttribute('aria-pressed',on?'true':'false');li.setAttribute('data-v',v);li.querySelector('.cnt').textContent=v;[].slice.call(ol.children).sort(function(a,c){return c.getAttribute('data-v')-a.getAttribute('data-v');}).forEach(function(x){ol.appendChild(x);});b.focus();});});});})();
});

/* CONT-17-2 */
__v4RunPart("fable", "CONT-17-2", function (document) {
(function(){document.querySelectorAll('.p-CONT-17-2 .tg').forEach(function(b){b.addEventListener('click',function(){var a=b.closest('article'),done=a.getAttribute('data-state')==='open';a.setAttribute('data-state',done?'done':'open');b.textContent=done?'未解決に戻す':'解決済みにする';});});})();
});

/* CONT-18-1 */
__v4RunPart("fable", "CONT-18-1", function (document) {
(function(){document.querySelectorAll('.p-CONT-18-1').forEach(function(r){var os=[].slice.call(r.querySelectorAll('.opt')),info=r.querySelector('.info'),sw=r.querySelector('.sw'),voted=false;function render(){var c=r.getAttribute('data-phase')==='closed';os.forEach(function(o){o.disabled=c;o.querySelector('.bar').style.width=c?o.getAttribute('data-pct')+'%':'0';});info.textContent=c?'128票・投票は終了しました':voted?'投票済み・結果は締切後に公開':'128票・残り2日';sw.textContent=c?'受付中の表示に戻す':'締切後の表示にする';}os.forEach(function(o){o.addEventListener('click',function(){voted=true;os.forEach(function(x){x.setAttribute('aria-pressed',x===o?'true':'false');});render();});});sw.addEventListener('click',function(){r.setAttribute('data-phase',r.getAttribute('data-phase')==='closed'?'open':'closed');render();});});})();
});

/* CONT-18-2 */
__v4RunPart("fable", "CONT-18-2", function (document) {
(function(){document.querySelectorAll('.p-CONT-18-2').forEach(function(r){var ins=[].slice.call(r.querySelectorAll('input')),b=r.querySelector('.vote'),m=r.querySelector('.msg');ins.forEach(function(i){i.addEventListener('change',function(){b.disabled=false;m.textContent='';});});b.addEventListener('click',function(){r.classList.add('is-voted');ins.forEach(function(i){if(!i.checked){i.disabled=true;}});b.disabled=true;b.textContent='投票しました';m.textContent='合計 312票';});});})();
});

/* CONT-19-3 */
__v4RunPart("fable", "CONT-19-3", function (document) {
(function(){document.querySelectorAll('.p-CONT-19-3').forEach(function(r){var fs=[].slice.call(r.querySelectorAll('.fmt button')),cs=[].slice.call(r.querySelectorAll('.cite')),m=r.querySelector('.msg');fs.forEach(function(b){b.addEventListener('click',function(){fs.forEach(function(x){x.setAttribute('aria-pressed',x===b?'true':'false');});cs.forEach(function(c){c.hidden=c.getAttribute('data-f')!==b.getAttribute('data-f');});m.textContent='';});});r.querySelector('.copy').addEventListener('click',function(){var t=cs.filter(function(c){return !c.hidden;})[0].textContent;function ok(){m.textContent='コピーしました';}if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(t).then(ok,ok);}else{ok();}});});})();
});

/* CONT-21-1 */
__v4RunPart("fable", "CONT-21-1", function (document) {
(function(){document.querySelectorAll('.p-CONT-21-1').forEach(function(r){var cbs=[].slice.call(r.querySelectorAll('li input')),all=r.querySelector('.all'),btn=r.querySelector('.read'),cnt=r.querySelector('.cnt'),fs=[].slice.call(r.querySelectorAll('.flt button'));function sync(){var n=cbs.filter(function(c){return c.checked;}).length;btn.disabled=n===0;all.checked=n===cbs.length;all.indeterminate=n>0&&n<cbs.length;cnt.textContent=r.querySelectorAll('li.is-unread').length;}cbs.forEach(function(c){c.addEventListener('change',sync);});all.addEventListener('change',function(){cbs.forEach(function(c){c.checked=all.checked;});sync();});btn.addEventListener('click',function(){cbs.forEach(function(c){if(c.checked){c.closest('li').classList.remove('is-unread');c.checked=false;}});sync();});fs.forEach(function(b){b.addEventListener('click',function(){fs.forEach(function(x){x.setAttribute('aria-pressed',x===b?'true':'false');});r.setAttribute('data-filter',b.getAttribute('data-f'));});});});})();
});

/* CONT-21-3 */
__v4RunPart("fable", "CONT-21-3", function (document) {
(function(){document.querySelectorAll('.p-CONT-21-3 li').forEach(function(li){var rt=li.querySelector('.rt'),u=li.querySelector('.undo');function done(k){li.setAttribute('data-done',k);rt.textContent=k==='ok'?'✓ 承認しました':'却下しました';u.focus();}li.querySelector('.ok').addEventListener('click',function(){done('ok');});li.querySelector('.ng').addEventListener('click',function(){done('ng');});u.addEventListener('click',function(){li.removeAttribute('data-done');rt.textContent='';li.querySelector('.ok').focus();});});})();
});

/* CONT-22-2 */
__v4RunPart("fable", "CONT-22-2", function (document) {
(function(){document.querySelectorAll('.p-CONT-22-2').forEach(function(r){var b=r.querySelector('.more'),p=r.querySelector('.panel');function set(o){b.setAttribute('aria-expanded',o?'true':'false');p.hidden=!o;r.classList.toggle('is-open',o);}b.addEventListener('click',function(){set(p.hidden);});r.addEventListener('keydown',function(e){if(e.key==='Escape'&&!p.hidden){set(false);b.focus();}});document.addEventListener('click',function(e){if(!p.hidden&&!r.contains(e.target)){set(false);}});});})();
});

/* ACT-01-3 */
__v4RunPart("fable", "ACT-01-3", function (document) {
(function(){document.querySelectorAll('.p-ACT-01-3 .link').forEach(function(a){a.addEventListener('click',function(e){e.preventDefault();});});})();
});

/* ACT-02-1 */
__v4RunPart("fable", "ACT-02-1", function (document) {
(function(){document.querySelectorAll('.p-ACT-02-1 .btn').forEach(function(b){b.addEventListener('click',function(){var on=b.getAttribute('aria-pressed')!=='true';b.setAttribute('aria-pressed',on);b.querySelector('.label').textContent=on?'フォロー中':'フォローする';});});})();
});

/* ACT-02-2 */
__v4RunPart("fable", "ACT-02-2", function (document) {
(function(){document.querySelectorAll('.p-ACT-02-2').forEach(function(root){var t=root.querySelector('.trigger'),s=root.querySelector('.scrim'),l=root.querySelector('.label'),c=root.querySelector('.cancel'),o=root.querySelector('.ok');function state(on){t.setAttribute('aria-pressed',on);l.textContent=on?'登録中':'登録する';}function close(){s.hidden=true;t.focus();}t.addEventListener('click',function(){if(t.getAttribute('aria-pressed')==='true'){s.hidden=false;c.focus();}else{state(true);}});c.addEventListener('click',close);o.addEventListener('click',function(){state(false);close();});s.addEventListener('click',function(e){if(e.target===s)close();});s.addEventListener('keydown',function(e){if(e.key==='Escape'){close();}else if(e.key==='Tab'){if(e.shiftKey&&document.activeElement===c){e.preventDefault();o.focus();}else if(!e.shiftKey&&document.activeElement===o){e.preventDefault();c.focus();}}});});})();
});

/* ACT-02-3 */
__v4RunPart("fable", "ACT-02-3", function (document) {
(function(){document.querySelectorAll('.p-ACT-02-3 .btn').forEach(function(b){var c=b.querySelector('.count');b.addEventListener('click',function(){var on=b.getAttribute('aria-pressed')!=='true';b.setAttribute('aria-pressed',on);c.textContent=parseInt(c.textContent,10)+(on?1:-1);});});})();
});

/* ACT-03-1 */
__v4RunPart("fable", "ACT-03-1", function (document) {
(function(){document.querySelectorAll('.p-ACT-03-1').forEach(function(root){var sc=root.querySelector('.scroll'),list=root.querySelector('.list');root.querySelector('.fab').addEventListener('click',function(){var li=document.createElement('li');li.className='is-new';li.textContent='新しいメモ';list.insertBefore(li,list.firstChild);sc.scrollTop=0;});});})();
});

/* ACT-03-2 */
__v4RunPart("fable", "ACT-03-2", function (document) {
(function(){document.querySelectorAll('.p-ACT-03-2').forEach(function(root){var sc=root.querySelector('.scroll'),fab=root.querySelector('.fab');sc.addEventListener('scroll',function(){fab.classList.toggle('is-compact',sc.scrollTop>8);});});})();
});

/* ACT-03-3 */
__v4RunPart("fable", "ACT-03-3", function (document) {
(function(){document.querySelectorAll('.p-ACT-03-3').forEach(function(root){var fab=root.querySelector('.fab');function set(o){root.classList.toggle('is-open',o);fab.setAttribute('aria-expanded',o);}fab.addEventListener('click',function(e){e.stopPropagation();set(!root.classList.contains('is-open'));});root.addEventListener('click',function(e){if(e.target.closest('.act'))fab.focus();set(false);});root.addEventListener('keydown',function(e){if(e.key==='Escape'&&root.classList.contains('is-open')){set(false);fab.focus();}});});})();
});

/* ACT-04-1 */
__v4RunPart("fable", "ACT-04-1", function (document) {
(function(){document.querySelectorAll('.p-ACT-04-1 .copy').forEach(function(b){var l=b.querySelector('.copy-label'),t=null;b.addEventListener('click',function(){b.classList.add('is-done');l.textContent='コピーしました';clearTimeout(t);t=setTimeout(function(){b.classList.remove('is-done');l.textContent='リンクをコピー';},2000);});});})();
});

/* ACT-04-3 */
__v4RunPart("fable", "ACT-04-3", function (document) {
(function(){document.querySelectorAll('.p-ACT-04-3').forEach(function(root){var sv=root.querySelector('.save'),sh=root.querySelector('.share'),m=root.querySelector('.menu');function open(o){m.hidden=!o;sh.setAttribute('aria-expanded',o);root.classList.toggle('is-open',o);}sv.addEventListener('click',function(){sv.setAttribute('aria-pressed',sv.getAttribute('aria-pressed')!=='true');});sh.addEventListener('click',function(e){e.stopPropagation();open(m.hidden);});root.addEventListener('click',function(){open(false);});root.addEventListener('keydown',function(e){if(e.key==='Escape'&&!m.hidden){open(false);sh.focus();}});});})();
});

/* ACT-05-1 */
__v4RunPart("fable", "ACT-05-1", function (document) {
(function(){document.querySelectorAll('.p-ACT-05-1').forEach(function(root){var list=root.querySelector('.list'),empty=root.querySelector('.empty'),init=list.innerHTML,drag=null;function w(row){return row.querySelector('.actions').offsetWidth;}function set(row,open){row.classList.toggle('is-open',open);row.querySelector('.fg').style.transform=open?'translateX(-'+w(row)+'px)':'';}function closeAll(ex){list.querySelectorAll('.row.is-open').forEach(function(r){if(r!==ex)set(r,false);});}root.addEventListener('pointerdown',function(e){var fg=e.target.closest('.fg');if(!fg)return;var row=fg.parentNode,base=row.classList.contains('is-open')?-w(row):0;closeAll(row);drag={row:row,fg:fg,x:e.clientX,base:base,dx:base,moved:false};fg.setPointerCapture(e.pointerId);fg.style.transition='none';});root.addEventListener('pointermove',function(e){if(!drag)return;var d=e.clientX-drag.x;if(Math.abs(d)>4)drag.moved=true;drag.dx=Math.max(-w(drag.row),Math.min(0,drag.base+d));drag.fg.style.transform='translateX('+drag.dx+'px)';});function end(){if(!drag)return;var d=drag;drag=null;d.fg.style.transition='';set(d.row,d.moved&&d.dx<-w(d.row)/2);}root.addEventListener('pointerup',end);root.addEventListener('pointercancel',end);root.addEventListener('focusin',function(e){var a=e.target.closest('.actions');if(a){closeAll(a.parentNode);set(a.parentNode,true);}});root.addEventListener('click',function(e){var b=e.target.closest('[data-act]');if(b){var row=b.closest('.row');if(b.getAttribute('data-act')==='delete'){row.classList.add('is-gone');setTimeout(function(){row.remove();empty.hidden=list.children.length>0;},320);}else{row.querySelector('.sub').textContent='アーカイブ済み';set(row,false);}return;}if(e.target.closest('.reset')){list.innerHTML=init;empty.hidden=true;}});});})();
});

/* ACT-05-2 */
__v4RunPart("fable", "ACT-05-2", function (document) {
(function(){document.querySelectorAll('.p-ACT-05-2').forEach(function(root){var bar=root.querySelector('.snack'),msg=root.querySelector('.snack-msg'),stack=[],drag=null;function sync(){bar.hidden=!stack.length;msg.textContent=stack.length+'件をアーカイブしました';}function run(row){row.querySelector('.fg').style.transform='translateX(-100%)';row.classList.add('is-gone');stack.push(row);sync();}root.addEventListener('pointerdown',function(e){var fg=e.target.closest('.fg');if(!fg)return;drag={fg:fg,row:fg.parentNode,x:e.clientX,dx:0};fg.setPointerCapture(e.pointerId);fg.style.transition='none';});root.addEventListener('pointermove',function(e){if(!drag)return;drag.dx=Math.min(0,e.clientX-drag.x);drag.fg.style.transform='translateX('+drag.dx+'px)';drag.row.classList.toggle('is-armed',-drag.dx>drag.row.offsetWidth*0.5);});function end(){if(!drag)return;var d=drag;drag=null;d.fg.style.transition='';var go=d.row.classList.contains('is-armed');d.row.classList.remove('is-armed');if(go){run(d.row);}else{d.fg.style.transform='';}}root.addEventListener('pointerup',end);root.addEventListener('pointercancel',end);root.addEventListener('keydown',function(e){var fg=e.target.closest('.fg');if(fg&&(e.key==='Delete'||e.key==='Backspace')){e.preventDefault();run(fg.parentNode);root.querySelector('.undo').focus();}});root.querySelector('.undo').addEventListener('click',function(){var row=stack.pop();if(row){row.classList.remove('is-gone');row.querySelector('.fg').style.transform='';}sync();if(row)row.querySelector('.fg').focus();});});})();
});

/* ACT-06-1 */
__v4RunPart("fable", "ACT-06-1", function (document) {
(function(){document.querySelectorAll('.p-ACT-06-1').forEach(function(root){var list=root.querySelector('.list'),live=root.querySelector('.live'),item=null;function say(el){live.textContent=el.querySelector('.name').textContent+'を'+(Array.prototype.indexOf.call(list.children,el)+1)+'番目に移動しました';}function up(el){var p=el.previousElementSibling;if(p){list.insertBefore(p,el.nextSibling);return true;}return false;}function down(el){var n=el.nextElementSibling;if(n){list.insertBefore(n,el);return true;}return false;}list.addEventListener('pointerdown',function(e){var h=e.target.closest('.handle');if(!h)return;item=h.parentNode;item.classList.add('is-dragging');h.setPointerCapture(e.pointerId);});list.addEventListener('pointermove',function(e){if(!item)return;var p=item.previousElementSibling,n=item.nextElementSibling,r;if(p){r=p.getBoundingClientRect();if(e.clientY<r.top+r.height/2){up(item);return;}}if(n){r=n.getBoundingClientRect();if(e.clientY>r.top+r.height/2){down(item);}}});function end(){if(!item)return;item.classList.remove('is-dragging');say(item);item=null;}list.addEventListener('pointerup',end);list.addEventListener('pointercancel',end);list.addEventListener('keydown',function(e){var h=e.target.closest('.handle');if(!h)return;var ok;if(e.key==='ArrowUp'){ok=up(h.parentNode);}else if(e.key==='ArrowDown'){ok=down(h.parentNode);}else{return;}e.preventDefault();if(ok)say(h.parentNode);});});})();
});

/* ACT-06-2 */
__v4RunPart("fable", "ACT-06-2", function (document) {
(function(){document.querySelectorAll('.p-ACT-06-2').forEach(function(root){var grid=root.querySelector('.grid'),card=null;function move(e){if(!card)return;var el=document.elementFromPoint(e.clientX,e.clientY),t=el&&el.closest('.card');if(!t||t===card||t.parentNode!==grid)return;if(card.compareDocumentPosition(t)&4){grid.insertBefore(card,t.nextSibling);}else{grid.insertBefore(card,t);}}function up(){if(card){card.classList.remove('is-dragging');card=null;}window.removeEventListener('pointermove',move);window.removeEventListener('pointerup',up);window.removeEventListener('pointercancel',up);}grid.addEventListener('pointerdown',function(e){var c=e.target.closest('.card');if(!c)return;card=c;c.classList.add('is-dragging');window.addEventListener('pointermove',move);window.addEventListener('pointerup',up);window.addEventListener('pointercancel',up);});grid.addEventListener('keydown',function(e){var c=e.target.closest('.card');if(!c)return;var k=e.key;if(k==='ArrowLeft'||k==='ArrowUp'){if(c.previousElementSibling){grid.insertBefore(c,c.previousElementSibling);c.focus();}}else if(k==='ArrowRight'||k==='ArrowDown'){if(c.nextElementSibling){grid.insertBefore(c.nextElementSibling,c);}}else{return;}e.preventDefault();});});})();
});

/* ACT-07-1 */
__v4RunPart("fable", "ACT-07-1", function (document) {
(function(){document.querySelectorAll('.p-ACT-07-1').forEach(function(root){var sep=root.querySelector('.sep'),a=root.querySelector('.val-a'),b=root.querySelector('.val-b'),v=50,on=false;function set(n){v=Math.max(20,Math.min(80,Math.round(n)));root.style.setProperty('--split',v+'%');sep.setAttribute('aria-valuenow',v);a.textContent=v+'%';b.textContent=(100-v)+'%';}sep.addEventListener('pointerdown',function(e){on=true;sep.setPointerCapture(e.pointerId);root.classList.add('is-dragging');});sep.addEventListener('pointermove',function(e){if(!on)return;var r=root.getBoundingClientRect();set((e.clientX-r.left)/r.width*100);});function end(){on=false;root.classList.remove('is-dragging');}sep.addEventListener('pointerup',end);sep.addEventListener('pointercancel',end);sep.addEventListener('keydown',function(e){var k=e.key;if(k==='ArrowLeft'){set(v-2);}else if(k==='ArrowRight'){set(v+2);}else if(k==='Home'){set(20);}else if(k==='End'){set(80);}else{return;}e.preventDefault();});set(50);});})();
});

/* ACT-07-2 */
__v4RunPart("fable", "ACT-07-2", function (document) {
(function(){document.querySelectorAll('.p-ACT-07-2').forEach(function(root){var sep=root.querySelector('.sep'),tg=root.querySelector('.toggle'),v=32,prev=32,on=false;function set(n){if(n<12){v=0;}else{v=Math.max(18,Math.min(60,Math.round(n)));prev=v;}root.style.setProperty('--split',v+'%');root.classList.toggle('is-collapsed',v===0);sep.setAttribute('aria-valuenow',v);tg.setAttribute('aria-expanded',v!==0);tg.setAttribute('aria-label',v===0?'サイドパネルを開く':'サイドパネルを畳む');}function toggle(){set(v===0?prev:0);}sep.addEventListener('pointerdown',function(e){on=true;sep.setPointerCapture(e.pointerId);root.classList.add('is-dragging');});sep.addEventListener('pointermove',function(e){if(!on)return;var r=root.getBoundingClientRect();set((e.clientX-r.left)/r.width*100);});function end(){on=false;root.classList.remove('is-dragging');}sep.addEventListener('pointerup',end);sep.addEventListener('pointercancel',end);sep.addEventListener('dblclick',toggle);sep.addEventListener('keydown',function(e){var k=e.key;if(k==='ArrowLeft'){set(v<=18?0:v-3);}else if(k==='ArrowRight'){set(v===0?prev:v+3);}else if(k==='Enter'){toggle();}else{return;}e.preventDefault();});tg.addEventListener('click',toggle);set(32);});})();
});

/* COPY-02-2 */
__v4RunPart("fable", "COPY-02-2", function (document) {
(function(){document.querySelectorAll('.p-COPY-02-2').forEach(function(r){var al=r.querySelector('[data-alert]'),dn=r.querySelector('[data-done]'),rt=r.querySelector('[data-retry]'),rs=r.querySelector('[data-reset]');rt.addEventListener('click',function(){rt.disabled=true;rt.textContent='保存しています…';setTimeout(function(){al.hidden=true;dn.hidden=false;rt.disabled=false;rt.textContent='もう一度保存する';rs.focus();},900);});rs.addEventListener('click',function(){dn.hidden=true;al.hidden=false;rt.focus();});});})();
});

/* COPY-02-3 */
__v4RunPart("fable", "COPY-02-3", function (document) {
(function(){document.querySelectorAll('.p-COPY-02-3').forEach(function(r){var inp=r.querySelector('[data-in]'),lead=r.querySelector('[data-lead]'),rules={len:function(v){return v.length>=8;},mix:function(v){return /[A-Za-z]/.test(v)&&/[0-9]/.test(v);},sym:function(v){return /[^A-Za-z0-9\s]/.test(v);}};function check(){var v=inp.value,all=true;r.querySelectorAll('[data-rule]').forEach(function(li){var ok=rules[li.getAttribute('data-rule')](v);if(!ok)all=false;li.setAttribute('data-ok',ok?'true':'false');li.querySelector('.st').textContent=ok?'達成':'未達成';});r.setAttribute('data-valid',all?'true':'false');inp.setAttribute('aria-invalid',all?'false':'true');lead.textContent=all?'すべての条件を満たしています。':'このパスワードは使えません。次の条件をすべて満たしてください。';}inp.addEventListener('input',check);r.querySelector('[data-gen]').addEventListener('click',function(){inp.value='Kq7#mfx2Wn';check();inp.focus();});check();});})();
});

/* COPY-03-2 */
__v4RunPart("fable", "COPY-03-2", function (document) {
(function(){document.querySelectorAll('.p-COPY-03-2').forEach(function(r){var chip=r.querySelector('[data-chip]'),em=r.querySelector('[data-empty]'),res=r.querySelector('[data-res]'),cnt=r.querySelector('[data-cnt]'),cl=r.querySelector('[data-clear]'),bk=r.querySelector('[data-back]');cl.addEventListener('click',function(){chip.hidden=true;em.hidden=true;res.hidden=false;cnt.textContent='2件';bk.focus();});bk.addEventListener('click',function(){chip.hidden=false;em.hidden=false;res.hidden=true;cnt.textContent='0件';cl.focus();});});})();
});

/* COPY-04-1 */
__v4RunPart("fable", "COPY-04-1", function (document) {
(function(){document.querySelectorAll('.p-COPY-04-1').forEach(function(r){var ov=r.querySelector('[data-ov]'),dlg=r.querySelector('[data-dlg]'),back=r.querySelector('[data-back]'),op=r.querySelector('[data-open]'),st=r.querySelector('[data-status]'),ack=r.querySelector('[data-ack]'),go=r.querySelector('[data-go]');function setAck(v){ack.setAttribute('aria-pressed',v?'true':'false');go.disabled=!v;}function close(m){ov.setAttribute('data-hidden','');back.inert=false;st.textContent=m;op.focus();}function open(){setAck(false);ov.removeAttribute('data-hidden');back.inert=true;st.textContent='';dlg.focus();}ack.addEventListener('click',function(){setAck(ack.getAttribute('aria-pressed')!=='true');});op.addEventListener('click',open);r.querySelectorAll('[data-result]').forEach(function(b){b.addEventListener('click',function(){close(b.getAttribute('data-result'));});});dlg.addEventListener('keydown',function(e){if(e.key==='Escape')close('キャンセルしました');});});})();
});

/* COPY-04-2 */
__v4RunPart("fable", "COPY-04-2", function (document) {
(function(){document.querySelectorAll('.p-COPY-04-2').forEach(function(r){var ov=r.querySelector('[data-ov]'),dlg=r.querySelector('[data-dlg]'),back=r.querySelector('[data-back]'),op=r.querySelector('[data-open]'),st=r.querySelector('[data-status]');function close(m){ov.setAttribute('data-hidden','');back.inert=false;st.textContent=m;op.focus();}function open(){ov.removeAttribute('data-hidden');back.inert=true;st.textContent='';dlg.focus();}op.addEventListener('click',open);r.querySelectorAll('[data-result]').forEach(function(b){b.addEventListener('click',function(){close(b.getAttribute('data-result'));});});dlg.addEventListener('keydown',function(e){if(e.key==='Escape')close('キャンセルしました');});});})();
});

/* COPY-04-3 */
__v4RunPart("fable", "COPY-04-3", function (document) {
(function(){document.querySelectorAll('.p-COPY-04-3').forEach(function(r){var ov=r.querySelector('[data-ov]'),dlg=r.querySelector('[data-dlg]'),back=r.querySelector('[data-back]'),op=r.querySelector('[data-open]'),st=r.querySelector('[data-status]');function close(m){ov.setAttribute('data-hidden','');back.inert=false;st.textContent=m;op.focus();}function open(){ov.removeAttribute('data-hidden');back.inert=true;st.textContent='';dlg.focus();}op.addEventListener('click',open);r.querySelectorAll('[data-result]').forEach(function(b){b.addEventListener('click',function(){close(b.getAttribute('data-result'));});});dlg.addEventListener('keydown',function(e){if(e.key==='Escape')close('キャンセルしました。編集を続けられます');});});})();
});

/* COPY-04-4 */
__v4RunPart("fable", "COPY-04-4", function (document) {
(function(){document.querySelectorAll('.p-COPY-04-4').forEach(function(r){var ov=r.querySelector('[data-ov]'),dlg=r.querySelector('[data-dlg]'),back=r.querySelector('[data-back]'),op=r.querySelector('[data-open]'),st=r.querySelector('[data-status]'),inp=r.querySelector('[data-in]'),go=r.querySelector('[data-go]'),hint=r.querySelector('[data-hint]');function check(){var ok=inp.value.trim()==='shop-web';go.disabled=!ok;if(ok){hint.setAttribute('data-ok','');hint.textContent='名前が一致しました。削除できます';}else{hint.removeAttribute('data-ok');hint.textContent='名前が一致すると、削除できるようになります';}}function close(m){ov.setAttribute('data-hidden','');back.inert=false;st.textContent=m;op.focus();}function open(){inp.value='';check();ov.removeAttribute('data-hidden');back.inert=true;st.textContent='';inp.focus();}inp.addEventListener('input',check);op.addEventListener('click',open);r.querySelectorAll('[data-result]').forEach(function(b){b.addEventListener('click',function(){close(b.getAttribute('data-result'));});});dlg.addEventListener('keydown',function(e){if(e.key==='Escape'&&!e.isComposing)close('キャンセルしました');});});})();
});

/* COPY-05-2 */
__v4RunPart("fable", "COPY-05-2", function (document) {
(function(){document.querySelectorAll('.p-COPY-05-2').forEach(function(r){var w=r.querySelector('[data-warn]'),res=r.querySelector('[data-res]'),msg=r.querySelector('[data-msg]'),ag=r.querySelector('[data-again]');function done(t){w.hidden=true;res.hidden=false;msg.textContent=t;ag.focus();}r.querySelector('[data-extend]').addEventListener('click',function(){done('サインインを続けます。入力中の内容はそのまま残っています。');});r.querySelector('[data-out]').addEventListener('click',function(){done('サインアウトしました。入力中の内容は保存されていません。');});ag.addEventListener('click',function(){res.hidden=true;w.hidden=false;r.querySelector('[data-extend]').focus();});});})();
});

/* COPY-06-2 */
__v4RunPart("fable", "COPY-06-2", function (document) {
(function(){document.querySelectorAll('.p-COPY-06-2').forEach(function(r){var num=r.querySelector('[data-num]'),b=r.querySelector('[data-copy]'),t=null;function say(m){b.textContent=m;clearTimeout(t);t=setTimeout(function(){b.textContent='番号をコピー';},2000);}function sel(){var g=document.createRange();g.selectNodeContents(num);var s=window.getSelection();s.removeAllRanges();s.addRange(g);say('番号を選択しました');}b.addEventListener('click',function(){var v=num.textContent;if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(v).then(function(){say('コピーしました');},sel);}else{sel();}});});})();
});

/* COPY-07-1 */
__v4RunPart("fable", "COPY-07-1", function (document) {
(function(){document.querySelectorAll('.p-COPY-07-1').forEach(function(r){var list=r.querySelector('[data-list]'),st=r.querySelector('[data-st]'),names=['鈴木 陽菜','高橋 湊','伊藤 結衣'],n=0;r.querySelector('[data-add]').addEventListener('click',function(){if(list.children.length>=5){st.textContent='追加できるのは5人までです';return;}var name=names[n%names.length];n++;var li=document.createElement('li'),s=document.createElement('span'),b=document.createElement('button');s.textContent=name;b.type='button';b.className='btn btn--sm';b.setAttribute('data-del','');b.setAttribute('aria-label',name+'を削除');b.textContent='削除';li.appendChild(s);li.appendChild(b);list.appendChild(li);st.textContent='';});list.addEventListener('click',function(e){var b=e.target.closest('[data-del]');if(b){b.parentNode.remove();st.textContent='';}});r.querySelector('[data-save]').addEventListener('click',function(){st.textContent='保存しました';});r.querySelector('[data-cancel]').addEventListener('click',function(){st.textContent='変更を取り消しました';});});})();
});

/* COPY-07-3 */
__v4RunPart("fable", "COPY-07-3", function (document) {
(function(){document.querySelectorAll('.p-COPY-07-3').forEach(function(r){var names=['お客様情報','お届け先','お支払い方法'],i=0,no=r.querySelector('[data-no]'),nm=r.querySelector('[data-name]'),st=r.querySelector('[data-st]'),nx=r.querySelector('[data-next]');function draw(){r.setAttribute('data-i',String(i));no.textContent='手順 '+(i+1)+' / 3';nm.textContent=names[i];nx.textContent=i===2?'保存して申し込む':'保存して次へ';}nx.addEventListener('click',function(){if(i<2){var p=names[i];i++;draw();st.textContent='「'+p+'」を保存し、「'+names[i]+'」へ進みました';}else{i=0;draw();st.textContent='「お支払い方法」を保存し、申し込みました（手順1に戻ります）';}});r.querySelector('[data-draft]').addEventListener('click',function(){st.textContent='「'+names[i]+'」を下書き保存し、入力画面を閉じました';});draw();});})();
});

/* CONT-03-3 */
__v4RunPart("fable", "CONT-03-3", function (document) {
(function(){document.querySelectorAll('.p-CONT-03-3').forEach(function(r){var th=r.querySelector('.thumb'),b=r.querySelector('.play'),t=r.querySelector('.time');if(!th||!b)return;b.addEventListener('click',function(){var on=!th.classList.contains('is-playing');th.classList.toggle('is-playing',on);b.setAttribute('aria-pressed',String(on));b.setAttribute('aria-label',on?'インタビュー動画を一時停止':'インタビュー動画を再生');t.textContent=on?'再生中':'2:14';});});})();
});

/* CONT-09-3 */
__v4RunPart("fable", "CONT-09-3", function (document) {
(function(){document.querySelectorAll('.p-CONT-09-3').forEach(function(r){var f=r.querySelector('.search'),i=r.querySelector('.inp'),c=r.querySelector('.count'),e=r.querySelector('.empty'),q=r.querySelectorAll('.qa');if(!f||!i)return;function run(){var k=i.value.trim().toLowerCase(),n=0;q.forEach(function(d){var m=!k||d.textContent.toLowerCase().indexOf(k)>-1;d.hidden=!m;if(m)n++;});c.textContent=n+'件の質問';e.hidden=n>0;}f.addEventListener('submit',function(ev){ev.preventDefault();run();});i.addEventListener('input',run);});})();
});

/* CONT-10-1 */
__v4RunPart("fable", "CONT-10-1", function (document) {
(function(){document.querySelectorAll('.p-CONT-10-1').forEach(function(r){var b=r.querySelector('.box'),c=r.querySelector('.cb'),n=r.querySelector('.btn'),h=r.querySelector('.hint');if(!b||!c||!n)return;var done=false;function check(){if(done)return;if(b.clientHeight>0&&b.scrollTop+b.clientHeight>=b.scrollHeight-4){done=true;c.disabled=false;h.textContent='全文を確認しました。同意にチェックしてください。';}}b.addEventListener('scroll',check);c.addEventListener('change',function(){n.disabled=!c.checked;});check();});})();
});

/* CONT-10-2 */
__v4RunPart("fable", "CONT-10-2", function (document) {
(function(){document.querySelectorAll('.p-CONT-10-2').forEach(function(r){var b=r.querySelector('.all'),d=r.querySelectorAll('.it');if(!b||!d.length)return;function allOpen(){return Array.prototype.every.call(d,function(x){return x.open;});}function sync(){var a=allOpen();b.textContent=a?'すべて閉じる':'すべて開く';b.setAttribute('aria-expanded',String(a));}b.addEventListener('click',function(){var a=allOpen();d.forEach(function(x){x.open=!a;});sync();});d.forEach(function(x){x.addEventListener('toggle',sync);});});})();
});
