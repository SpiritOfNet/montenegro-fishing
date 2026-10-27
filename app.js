'use strict';
(() => {
  const D = window.FISHING_ATLAS;
  const $ = s => document.querySelector(s);
  const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const fishById = Object.fromEntries(D.fish.map(f => [f.id,f]));
  const placeById = Object.fromEntries(D.places.map(p => [p.id,p]));
  const typeNames = {sea:'Морской берег',river:'Река',lake:'Озеро / водохранилище'};
  const regionNames = {coast:'Побережье',central:'Центральная Черногория',north:'Север и горы'};
  const checked = new Date(D.checked+'T12:00:00Z');
  const checkedLabel = '27.10.2026';
  let favorites;
  try { favorites = new Set(JSON.parse(localStorage.getItem('fishing-atlas-favorites')||'[]').filter(id=>placeById[id])); } catch { favorites = new Set(); }
  let artEnabled = true, selected = null, tileErrors = 0, toastTimer, artSerial = 0;
  const state = {water:'all',fish:'all',month:'all',region:'all',query:'',hideClosed:false,bankOnly:false,favorites:false};
  function readHash() {
    const h=new URLSearchParams(location.hash.slice(1));
    state.water=['sea','river','lake'].includes(h.get('water'))?h.get('water'):'all';
    state.fish=fishById[h.get('fish')]?h.get('fish'):'all';
    state.month=Number(h.get('month'))>=1&&Number(h.get('month'))<=12?Number(h.get('month')):'all';
    state.region=['coast','central','north'].includes(h.get('region'))?h.get('region'):'all';
    state.query=h.get('q')?.slice(0,100)||'';
    state.hideClosed=h.get('closed')==='hide';
    state.bankOnly=h.get('bank')==='documented';
    selected=placeById[h.get('place')]?h.get('place'):null;
  }
  function writeHash() {
    const h=new URLSearchParams();
    ['water','fish','month','region'].forEach(k=>{if(state[k]!=='all')h.set(k,String(state[k]));});
    if(state.query)h.set('q',state.query);if(state.hideClosed)h.set('closed','hide');if(state.bankOnly)h.set('bank','documented');if(selected)h.set('place',selected);
    history.replaceState(null,'',location.pathname+location.search+(h.size?'#'+h.toString():''));
  }
  readHash();
  function art(id,cls='',label='') {
    const f=fishById[id];if(!f?.art)return `<span class="no-fish-art ${cls}" aria-hidden="true">✦</span>`;
    const clip='specimen-'+(++artSerial),[x,y,w,h]=f.art;
    return `<svg class="fish-art ${cls}" viewBox="${f.art.join(' ')}" ${label?`role="img" aria-label="${esc(label)}"`:'aria-hidden="true"'}><defs><clipPath id="${clip}"><rect x="${x}" y="${y}" width="${w}" height="${h}"/></clipPath></defs><image href="assets/fish-sketches.png" width="1086" height="1448" clip-path="url(#${clip})"/></svg>`;
  }
  function fishIllustration(p) {
    if(state.fish!=='all'&&fishById[state.fish]?.art)return state.fish;
    return p.fish.find(id=>fishById[id]?.art)||'trout';
  }
  function wrapDate([m,d]) { return m*100+d; }
  function inAnnual(day,start,end){const n=wrapDate(day),a=wrapDate(start),b=wrapDate(end);return a<=b?n>=a&&n<=b:n>=a||n<=b;}
  function overlap(range) {
    if(state.month==='all')return inAnnual([checked.getUTCMonth()+1,checked.getUTCDate()],...range)?'full':'none';
    const m=Number(state.month),days=new Date(2026,m,0).getDate();let n=0;
    for(let d=1;d<=days;d++)if(inAnnual([m,d],...range))n++;
    return n===days?'full':n?'partial':'none';
  }
  function speciesClosure(p,f) {
    if(!p.ruleZone||!f||f.group==='sea'||f.group==='other')return null;
    const n=p.ruleZone==='north';
    const group=f.id==='carp'?'carp':f.group;
    const rules=n?{
      trout:{range:[[11,1],[3,15]],text:'Форель: запрет 1 ноября — 15 марта.'},
      grayling:{range:[[3,1],[6,1]],text:'Хариус: запрет 1 марта — 1 июня.'},
      carp:{range:[[5,1],[6,15]],text:'Карп: запрет 1 мая — 15 июня.'},
      cyprinid:{range:[[5,1],[6,15]],text:'Другие карповые: запрет 1 мая — 15 июня.'},
      nase:{range:[[4,15],[6,1]],text:'Подуст: запрет 15 апреля — 1 июня.'}
    }:{
      trout:{range:[[11,1],[4,1]],text:'Форель: запрет 1 ноября — 1 апреля.'},
      grayling:null,
      carp:{range:[[3,15],[5,15]],text:'Карп и другие карповые: запрет 15 марта — 15 мая.'},
      cyprinid:{range:[[3,15],[5,15]],text:'Карп и другие карповые: запрет 15 марта — 15 мая.'},
      nase:{range:[[3,15],[6,1]],text:'Подуст: запрет 15 марта — 1 июня.'},
      bleak:{range:[[3,15],[10,31]],text:'Скадарская уклейка: запрет 15 марта — 31 октября.'},
      eel:{range:[[6,1],[12,1]],text:'Угорь: запрет 1 июня — 1 декабря.'}
    };
    return rules[group]||null;
  }
  function status(p) {
    if(p.closedUntil&&D.checked<=p.closedUntil)return {closed:true,title:'Известный запрет',text:`${p.closureScope||'Участок'}: до ${p.closedUntil.split('-').reverse().join('.')}. Границы проверяются по приказу.`,reason:'Многолетний запрет'};
    if(p.closedSnapshot)return {closed:true,title:'Сезон 2026 завершён',text:'Для следующего сезона нужны новые условия нацпарка. Объявление о закрытии найдено через зеркало публикации.',reason:'Сезон 2026 завершён'};
    if(p.annualSiteClosure){const hit=overlap(p.annualSiteClosure);if(hit==='full')return {closed:true,title:'Сезонное закрытие водоёма',text:p.note,reason:'Сезонное закрытие'};if(hit==='partial')return {closed:false,partial:true,title:'Часть месяца закрыта',text:p.note,reason:'Часть месяца закрыта'};}
    const targets=state.fish==='all'?p.fish.map(id=>fishById[id]):[fishById[state.fish]];
    const r=targets.map(f=>speciesClosure(p,f));
    if(r.length&&r.every(x=>x&&overlap(x.range)==='full'))return {closed:true,title:state.fish==='all'?'Сезонный запрет указанных видов':'Запрет выбранного вида',text:[...new Set(r.map(x=>x.text))].join(' '),reason:'Сезонный запрет вида'};
    if(r.some(x=>x&&overlap(x.range)==='partial'))return {closed:false,partial:true,title:'В месяце есть сезонные ограничения',text:'Часть выбранного месяца закрыта для одного или нескольких указанных видов. Точные сроки — ниже.',reason:'Частичное закрытие'};
    return {closed:false,title:p.special?'Особый режим · уточнить участок':'Нужны разрешение и проверка участка',text:p.special?'Здесь есть специальные правила или закрытые отрезки. Отметка не подтверждает право ловить в конкретной точке.':'По этому району есть сведения о рыбалке. Текущий береговой доступ и условия лицензии нужно подтвердить.',reason:p.special?'Особый режим':'Уточнить режим'};
  }
  function activity(p) {
    const fishes=state.fish==='all'?p.fish.map(id=>fishById[id]):[fishById[state.fish]];
    return p.activityMonths||[...new Set(fishes.flatMap(f=>f.months))].sort((a,b)=>a-b);
  }
  function filtered() {
    const q=state.query.trim().toLocaleLowerCase('ru');
    return D.places.filter(p=>{
      if(state.water!=='all'&&p.type!==state.water)return false;
      if(state.region!=='all'&&p.region!==state.region)return false;
      if(state.fish!=='all'&&!p.fish.includes(state.fish))return false;
      if(state.month!=='all'&&!activity(p).includes(Number(state.month)))return false;
      if(state.favorites&&!favorites.has(p.id))return false;
      if(state.bankOnly&&p.access!=='documented')return false;
      if(state.hideClosed&&status(p).closed)return false;
      if(q&&!([p.name,p.local,regionNames[p.region],...p.fish.flatMap(id=>[fishById[id].name,fishById[id].local])].join(' ').toLocaleLowerCase('ru').includes(q)))return false;
      return true;
    });
  }
  function toast(msg) { clearTimeout(toastTimer);$('#toast').textContent=msg;$('#toast').hidden=false;toastTimer=setTimeout(()=>{$('#toast').hidden=true;},5000); }
  function mobileView(v) {
    document.body.dataset.mobileView=v;
    document.querySelectorAll('[data-view]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.view===v)));
    $('#mobile-filter-btn').setAttribute('aria-pressed',String(v==='filters'));
    if(v==='map')requestAnimationFrame(()=>map.invalidateSize());
  }
  document.body.dataset.mobileView='map';
  const map=L.map('map',{zoomControl:false,attributionControl:true,minZoom:7,maxZoom:18,zoomSnap:.25,preferCanvas:true}).setView([42.62,19.12],8);
  map.createPane('fallback');map.getPane('fallback').style.zIndex=150;
  const mainBounds=L.latLngBounds([[41.78,18.37],[43.60,20.43]]);
  map.setMaxBounds([[40.9,17.3],[44.5,21.6]]);
  const fallback=L.geoJSON(window.ATLAS_GEOGRAPHY.countries,{pane:'fallback',interactive:false,style:f=>({color:'#77715a',weight:f.properties.id==='MNE'?1:.55,fillColor:f.properties.id==='MNE'?'#d8c194':'#cfba91',fillOpacity:1})}).addTo(map);
  L.geoJSON(window.ATLAS_GEOGRAPHY.local,{pane:'fallback',interactive:false,style:f=>({color:'#676b58',weight:f.properties.kind==='river'?1:1.2,fillColor:'#a4a78f',fillOpacity:.9})}).addTo(map);
  const roadTiles=L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{className:'roads-tiles',maxZoom:18});
  roadTiles.on('tileerror',()=>{tileErrors++;if(tileErrors===8){$('#map-status').textContent='Нет подробной подложки · доступен рисованный атлас';}});
  const drawnAtlas=window.createDrawnAtlas(map);drawnAtlas.add();
  map.attributionControl.addAttribution('© <a href="https://www.openstreetmap.org/copyright">OSM</a> · <a href="https://registry.opendata.aws/terrain-tiles/">Terrain Tiles</a> · Natural Earth');
  L.control.scale({imperial:false,maxWidth:100}).addTo(map);
  map.attributionControl.setPrefix(false);
  const clusters=L.markerClusterGroup({showCoverageOnHover:false,spiderfyOnMaxZoom:true,maxClusterRadius:z=>z<10?78:48,disableClusteringAtZoom:12,animate:!matchMedia('(prefers-reduced-motion: reduce)').matches,iconCreateFunction:c=>{const child=c.getAllChildMarkers()[0],p=placeById[child?._atlasId];return L.divIcon({html:`${artEnabled&&p?art(fishIllustration(p),'cluster-illustration'):''}<div>${c.getChildCount()}</div>`,className:'atlas-cluster',iconSize:[38,38]});}}).addTo(map);
  const markerById=new Map();
  function markerIcon(p) {
    const st=status(p),pic=fishIllustration(p);
    const shortNames={kotor:'Котор',tivat:'Тиват',budva:'Будва',bar:'Бар',ulcinj:'Ульцинь',bojana:'Бояна',mrtvica:'Мртвица',andrijevica:'Лим · Андриевица',berane:'Лим · Беране','tara-kolasin':'Тара · Колашин','tara-mojkovac':'Тара · Мойковац',cehotina:'Чехотина',moraca:'Морача',skadar:'Скадар',vranjina:'Враньина',piva:'Пива',crno:'Чёрное озеро',grahovsko:'Граховское',biogradsko:'Биоградское',kapetanovo:'Капетаново'};
    return L.divIcon({className:`fish-map-icon ${p.id===selected?'is-selected':''} ${st.closed?'is-closed':''} ${artEnabled?'':'no-art'}`,html:`${art(pic,'marker-illustration')}<span class="map-pin"></span>${st.closed?'<span class="marker-cross">×</span>':''}<span class="marker-label">${esc(shortNames[p.id]||p.name)}</span>`,iconSize:[50,70],iconAnchor:[25,35]});
  }
  function renderMarkers(items) {
    clusters.clearLayers();markerById.clear();
    items.forEach(p=>{const st=status(p);const m=L.marker([p.coords[1],p.coords[0]],{icon:markerIcon(p),title:`${p.name}. ${st.reason}.`,alt:p.name,keyboard:true,riseOnHover:true});m._atlasId=p.id;m.on('click',()=>selectPlace(p.id));markerById.set(p.id,m);clusters.addLayer(m);});
  }
  function renderList(items) {
    const number=items.length;
    $('#results-count').textContent=`${state.favorites?'Избранное · ':''}${number} ${number%10===1&&number%100!==11?'район':number%10>=2&&number%10<=4&&!(number%100>=12&&number%100<=14)?'района':'районов'}`;
    $('#mobile-count').textContent=number;
    $('#mobile-apply-filters').textContent=`Показать на карте · ${number}`;
    $('#place-list').innerHTML=number?items.map((p,i)=>{const st=status(p);return `<button class="place-row ${selected===p.id?'is-selected':''}" data-place="${p.id}" aria-label="${esc(p.name)}. ${esc(st.reason)}"><span class="row-number">${String(i+1).padStart(2,'0')}</span><span class="row-text"><span class="row-top"><span class="row-title">${esc(p.name)}</span>${favorites.has(p.id)?'<span aria-label="В избранном">★</span>':''}</span><span class="row-meta">${typeNames[p.type]} · ${p.local}</span><span class="row-fish">${p.fish.slice(0,3).map(id=>fishById[id].name.replace('Ручьевая / озёрная форель','Форель')).join(' · ')}${p.fish.length>3?' +'+(p.fish.length-3):''}</span>${st.closed?`<span class="row-closed">× ${st.reason}</span>`:p.access==='documented'?'<span class="row-access">Береговая ловля описана в источнике</span>':''}</span><span class="row-arrow" aria-hidden="true">↗</span></button>`;}).join(''):`<div class="empty-state"><strong>${state.favorites?'Пока пусто':'Следов не найдено'}</strong>${state.favorites?'Сохраняй места звёздочкой в карточке.':'Измени рыбу, месяц или район. Сезонность — ориентир; часть мест скрывается фильтром запретов.'}<br><button class="small-link" data-reset>Показать все районы</button></div>`;
  }
  function update() {
    const items=filtered();
    if(selected&&!items.some(p=>p.id===selected)){selected=null;$('#place-detail').hidden=true;}
    renderList(items);renderMarkers(items);
    $('#search').value=state.query;$('#fish-filter').value=state.fish;$('#month-filter').value=state.month;$('#region-filter').value=state.region;$('#hide-closed').checked=state.hideClosed;$('#bank-only').checked=state.bankOnly;
    document.querySelectorAll('[data-water]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.water===state.water)));
    $('#favorite-toggle').setAttribute('aria-pressed',String(state.favorites));$('#favorite-toggle').textContent=state.favorites?'★':'☆';
    const count=['water','fish','month','region'].filter(k=>state[k]!=='all').length+Number(state.hideClosed)+Number(state.bankOnly);
    $('#filter-count').textContent=count?count:'';
    $('#reset-filters').hidden=!(count||state.query||state.favorites);
    $('#month-help').hidden=state.month==='all';
    if(selected)renderDetail(placeById[selected]);
    writeHash();
  }
  function resetFilters() {Object.assign(state,{water:'all',fish:'all',month:'all',region:'all',query:'',hideClosed:false,bankOnly:false,favorites:false});update();}
  function annualRules(p) {
    const ids=state.fish==='all'?p.fish:[state.fish];
    const rows=[...new Set(ids.map(id=>speciesClosure(p,fishById[id])?.text).filter(Boolean))];
    return rows.length?`<ul class="annual-rules">${rows.map(t=>`<li>${t}</li>`).join('')}</ul>`:'';
  }
  function renderDetail(p) {
    const st=status(p),illustration=fishIllustration(p),f=fishById[illustration],months=activity(p);
    const selectedFish=state.fish==='all'?p.fish.map(id=>fishById[id]):[fishById[state.fish]];
    const methods=[...new Set(selectedFish.slice(0,3).map(f=>f.tackle))];
    const sourceIds=[...new Set([...p.sources,'ministry',...(p.type!=='sea'||p.special?['law']:[])])];
    const monthLabel=state.month==='all'?`Сводка на ${checkedLabel}`:`${D.months[Number(state.month)-1]} · годовой цикл по сводке 2026`;
    $('#place-detail').innerHTML=`<div class="detail-top"><span class="detail-type">${typeNames[p.type]}</span><div class="detail-actions"><button class="favorite-place" aria-label="${favorites.has(p.id)?'Убрать из избранного':'Сохранить место'}" aria-pressed="${favorites.has(p.id)}">${favorites.has(p.id)?'★':'☆'}</button><button class="close-detail" aria-label="Закрыть карточку">×</button></div></div><h2>${esc(p.name)}</h2><div class="detail-region">${esc(p.local)} · ${regionNames[p.region]}</div><div class="detail-hero">${art(illustration,'',f.name)}<span class="hero-caption">${esc(f.local)}</span></div><p class="detail-habitat">${esc(p.habitat)}</p><div class="status-note ${st.closed?'closed':''}"><strong>${esc(st.title)}</strong>${esc(st.text)}<span class="status-date">${monthLabel}</span></div><div class="detail-section"><h3>Рыба этих вод</h3><div class="fish-chips">${p.fish.map(id=>`<button class="fish-chip ${state.fish===id?'is-target':''}" data-fish="${id}">${esc(fishById[id].name)}</button>`).join('')}</div><div class="season-caption" style="margin-top:7px">Региональное присутствие, не обещание улова с берега.</div></div><div class="detail-section"><h3>Когда рассматривать поездку</h3><div class="season-months" aria-label="Ориентировочные месяцы активности">${D.months.map((m,i)=>`<span class="season-month ${months.includes(i+1)?'active':''} ${Number(state.month)===i+1?'current':''}" title="${m}${months.includes(i+1)?': сезонный ориентир':''}">${['Я','Ф','М','А','М','И','И','А','С','О','Н','Д'][i]}</span>`).join('')}</div><div class="season-caption">Тёмные месяцы — ориентировочная сезонность выбранной рыбы или группы. Не прогноз и не юридический календарь.</div></div><div class="detail-section"><h3>Доступ с берега</h3><span class="access-label">${p.access==='documented'?'Береговая ловля описана':'Подход не подтверждён'}</span><p>${esc(p.accessText)}</p><p class="coord-note">${esc(p.coordType)}</p></div><div class="detail-section"><h3>Снасти · общий ориентир</h3><p>${methods.map(esc).join('<br>')}</p>${p.special?'<p class="method-warning">Специальные правила участка имеют приоритет над этими общими советами.</p>':''}</div><div class="detail-section"><h3>Правила именно этого района</h3><p>${esc(p.note)}</p>${annualRules(p)}${p.type!=='sea'?'<p class="coord-note">На пресных водах есть ограничения ночной ловли; проверяются также день недели, часы, размеры и квота.</p>':''}</div><div class="detail-buttons"><a href="https://www.google.com/maps/search/?api=1&query=${p.coords[1]},${p.coords[0]}" target="_blank" rel="noopener">Посмотреть район ↗</a><a href="https://www.windy.com/${p.coords[1].toFixed(3)}/${p.coords[0].toFixed(3)}?${p.coords[1].toFixed(3)},${p.coords[0].toFixed(3)},11" target="_blank" rel="noopener">Погода и ветер ↗</a><button class="share-place">Поделиться</button><button class="show-rule-source">Правила / разрешение</button></div><div class="detail-source">Исследовано ${checkedLabel}. Данные не обновляются автоматически.<details><summary>Источники и уверенность</summary><ul class="source-list">${sourceIds.map(id=>`<li><a href="${D.sources[id].url}" target="_blank" rel="noopener">${esc(D.sources[id].title)}</a><br>${esc(D.sources[id].kind)}</li>`).join('')}</ul></details><p class="coord-note">${p.coords[1].toFixed(5)}° N, ${p.coords[0].toFixed(5)}° E · GeoNames. Нет точного контура правового режима.</p></div>`;
    $('#place-detail').hidden=false;$('#place-detail').scrollTop=0;
  }
  function selectPlace(id,move=true) {
    const p=placeById[id];if(!p)return;
    selected=id;mobileView('map');renderDetail(p);
    document.querySelectorAll('.place-row').forEach(b=>b.classList.toggle('is-selected',b.dataset.place===id));
    markerById.forEach((m,k)=>m.setIcon(markerIcon(placeById[k])));
    writeHash();
    if(move){
      const mobile=matchMedia('(max-width:720px)').matches;
      const z=Math.max(map.getZoom(),10);
      map.setView([p.coords[1],p.coords[0]],z,{animate:false});
      const offset=mobile?[0,Math.min($('#place-detail').offsetHeight*.48,map.getSize().y*.28)]:[$('#place-detail').offsetWidth*.45,0];
      map.panBy(offset,{animate:false});
    }
  }
  function closeDetail(){selected=null;$('#place-detail').hidden=true;markerById.forEach((m,k)=>m.setIcon(markerIcon(placeById[k])));document.querySelectorAll('.place-row').forEach(b=>b.classList.remove('is-selected'));writeHash();}
  function toggleFavorite() {
    if(!selected)return;const id=selected;
    if(favorites.has(id))favorites.delete(id);else favorites.add(id);
    try{localStorage.setItem('fishing-atlas-favorites',JSON.stringify([...favorites]));}catch{toast('Сохранение в браузере недоступно.');}
    update();
  }
  function setBasemap(mode) {
    if(mode==='roads'){drawnAtlas.remove();roadTiles.addTo(map);}else{map.removeLayer(roadTiles);drawnAtlas.add();}
    $('.map-region').classList.toggle('roads',mode==='roads');$('#atlas-mode').setAttribute('aria-pressed',String(mode==='atlas'));$('#roads-mode').setAttribute('aria-pressed',String(mode==='roads'));
  }
  function fillInfo() {
    const stale=(Date.now()-checked.getTime())/86400000>90;
    $('#info-content').innerHTML=`<h2>Карта для хорошей поездки</h2><p class="dialog-intro">Рыболовный полевой атлас Черногории. Собран по открытым источникам, без обещаний «секретных точек» и гарантированного клёва.</p><div class="fact-counts"><div><strong>${D.places.length}</strong><span>районов и водоёмов</span></div><div><strong>${D.fish.length}</strong><span>видов и групп рыб</span></div><div><strong>12</strong><span>карандашных рисунков</span></div></div>${stale?'<div class="status-note closed"><strong>Сводка может устареть</strong>Правила проверены 27.10.2026. С тех пор прошло больше 90 дней; перед поездкой нужна новая проверка.</div>':''}<h3>Как пользоваться</h3><p>Выбери водоём, рыбу и месяц. Нажми на рыбу на карте или место в списке. Число в круге объединяет соседние отметки — приблизь карту. Звёздочка сохраняет место в этом браузере. Кнопка «Поделиться» передаёт место и фильтры ссылкой.</p><h3>Что означает отметка</h3><p>Это ориентир города, реки или озера из GeoNames. Он не обозначает проверенную парковку, безопасный спуск, частную собственность или точную границу запрета. Береговая ловля отдельно подтверждена источниками лишь для части районов; остальные помечены «подход не подтверждён». Полного перечня всех разрешённых мест открытые источники не дают.</p><h3>Рисованный атлас</h3><p>Дороги и воды основаны на данных OpenStreetMap / Geofabrik, а горизонтали с интервалом 200 м — на реальных данных высот Terrain Tiles. Подложка обобщена для обзора районов. Для подробной ориентации переключись на «Дороги». Европа: данные Copernicus / EU-DEM при финансировании Европейского союза; глобальные SRTM / GMTED2010 — USGS.</p><h3>Сезон активности ≠ разрешённый сезон</h3><p>Месяц фильтрует ориентировочную сезонность. У морских видов использован местный видовой справочник, у пресноводных — широкие сезонные ориентиры туристических описаний и способов ловли. Это не численная модель и не прогноз. При выборе месяца учитываются известные годовые запреты: неполный запрет помечается отдельно. Многолетние и неуточнённые территориальные ограничения показаны по состоянию на ${checkedLabel}.</p><h3>Разрешения и закрытые территории</h3><p>Для морской и пресноводной рыбалки нужны соответствующие разрешения. Нацпарки и местные управляющие устанавливают режим участков. Морские парки Платамуни, Катич и Стари-Ульцинь не считаются полностью закрытыми: правила зависят от зоны и снастей. Отсутствие красной отметки не означает подтверждённое разрешение.</p><p>До 01.04.2029 в пресных водах запрещены: ${D.protected.map(esc).join(', ')}. Они не включены в целевые виды. Случайный улов должен быть возвращён живым.</p><h3>Практические возможности</h3><p>Карта «Дороги» помогает ориентироваться, но отдельный маршрут к воде не рассчитан. Погода открывается внешней ссылкой. Геолокация запрашивается только нажатием кнопки; координаты никуда не отправляются и не сохраняются. Избранное хранится локально. После первого посещения рисованный атлас и справочник доступны без сети. Подробная подложка «Дороги» и погода требуют интернет.</p><h3>Источники исследования</h3>${Object.values(D.sources).map(s=>`<div class="source-reference"><a href="${s.url}" target="_blank" rel="noopener">${esc(s.title)}</a><small>${esc(s.kind)}</small></div>`).join('')}<h3>Оформление и авторство</h3><p>Художественные иллюстрации созданы встроенным генератором изображений. Это художественные наброски, не определитель видов. Проект вдохновлён атмосферой старых атласов и RDR2; официальные игровые материалы не использованы. Версия ${D.version}. Карта: © OpenStreetMap contributors; резервная география — Natural Earth; координаты — GeoNames.</p>`;
  }
  function fillFishBook() {
    $('#fish-grid').innerHTML=D.fish.map(f=>`<button class="fish-book-card" data-book-fish="${f.id}">${f.art?art(f.id,'',f.name):'<span class="art-not-available">ПОЛЕВАЯ ЗАПИСЬ</span>'}<strong>${esc(f.name)}</strong><small>${esc(f.local)}<br><i>${esc(f.latin)}</i></small><em>${D.places.filter(p=>p.fish.includes(f.id)).length} районов →</em></button>`).join('');
  }
  D.fish.forEach(f=>$('#fish-filter').add(new Option(f.name,f.id)));
  D.months.forEach((m,i)=>$('#month-filter').add(new Option(m,String(i+1))));
  $('#search').addEventListener('input',e=>{state.query=e.target.value;update();});
  $('#fish-filter').addEventListener('change',e=>{state.fish=e.target.value;update();});
  $('#month-filter').addEventListener('change',e=>{state.month=e.target.value==='all'?'all':Number(e.target.value);update();});
  $('#region-filter').addEventListener('change',e=>{state.region=e.target.value;update();});
  $('#hide-closed').addEventListener('change',e=>{state.hideClosed=e.target.checked;update();});
  $('#bank-only').addEventListener('change',e=>{state.bankOnly=e.target.checked;update();});
  document.querySelectorAll('[data-water]').forEach(b=>b.addEventListener('click',()=>{state.water=b.dataset.water;update();}));
  $('#reset-filters').addEventListener('click',resetFilters);
  $('#mobile-reset-filters').addEventListener('click',resetFilters);
  $('#mobile-apply-filters').addEventListener('click',()=>mobileView('map'));
  $('#place-list').addEventListener('click',e=>{const b=e.target.closest('[data-place]');if(b)selectPlace(b.dataset.place);if(e.target.closest('[data-reset]'))resetFilters();});
  $('#favorite-toggle').addEventListener('click',()=>{state.favorites=!state.favorites;update();if(matchMedia('(max-width:720px)').matches)mobileView('list');});
  $('#place-detail').addEventListener('click',async e=>{
    if(e.target.closest('.close-detail'))closeDetail();
    if(e.target.closest('.favorite-place'))toggleFavorite();
    const chip=e.target.closest('[data-fish]');if(chip){state.fish=chip.dataset.fish;update();}
    if(e.target.closest('.show-rule-source')){fillInfo();$('#info-dialog').showModal();}
    if(e.target.closest('.share-place')){
      const p=placeById[selected];if(!p)return;writeHash();
      const url=location.href;
      try{if(navigator.share&&matchMedia('(max-width:720px)').matches)await navigator.share({title:p.name+' — Рыбацкие земли',url});else{await navigator.clipboard.writeText(url);toast('Ссылка на место и фильтры скопирована.');}}
      catch(err){if(err.name!=='AbortError'){toast('Скопируй адрес из строки браузера: в нём сохранены место и фильтры.');}}
    }
  });
  $('#zoom-in').addEventListener('click',()=>map.zoomIn());$('#zoom-out').addEventListener('click',()=>map.zoomOut());
  function fit(){closeDetail();map.fitBounds(mainBounds,{padding:[30,35],animate:false});}
  $('#fit-map').addEventListener('click',fit);
  $('#atlas-mode').addEventListener('click',()=>setBasemap('atlas'));$('#roads-mode').addEventListener('click',()=>setBasemap('roads'));
  $('#illustration-toggle').addEventListener('click',()=>{artEnabled=!artEnabled;$('#illustration-toggle').setAttribute('aria-pressed',String(artEnabled));$('#illustration-toggle span').textContent=artEnabled?'вкл.':'выкл.';renderMarkers(filtered());});
  let userMarker;
  $('#locate-me').addEventListener('click',()=>{
    if(!navigator.geolocation){toast('Этот браузер не поддерживает геолокацию.');return;}
    $('#locate-me').disabled=true;
    navigator.geolocation.getCurrentPosition(pos=>{
      $('#locate-me').disabled=false;const ll=[pos.coords.latitude,pos.coords.longitude];
      if(!mainBounds.pad(.5).contains(ll)){toast('Ты за пределами района карты. Координаты не сохранены.');return;}
      if(userMarker)map.removeLayer(userMarker);userMarker=L.marker(ll,{icon:L.divIcon({className:'user-location',iconSize:[16,16]})}).addTo(map).bindTooltip('Ты здесь');map.setView(ll,11);toast('Положение приблизительное; это не навигация к берегу.');
    },()=>{$('#locate-me').disabled=false;toast('Местоположение недоступно. Разреши доступ в настройках браузера или выбери район вручную.');},{enableHighAccuracy:false,timeout:10000,maximumAge:60000});
  });
  $('#sources-btn').addEventListener('click',()=>{fillInfo();$('#info-dialog').showModal();});
  $('#fish-book-btn').addEventListener('click',()=>{fillFishBook();$('#fish-dialog').showModal();});
  document.querySelectorAll('.dialog-close').forEach(b=>b.addEventListener('click',()=>b.closest('dialog').close()));
  document.querySelectorAll('dialog').forEach(d=>d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close();}}));
  $('#fish-grid').addEventListener('click',e=>{const b=e.target.closest('[data-book-fish]');if(!b)return;state.fish=b.dataset.bookFish;state.water='all';state.query='';$('#fish-dialog').close();update();mobileView('map');map.fitBounds(mainBounds,{padding:[25,25],animate:false});});
  document.querySelectorAll('[data-view]').forEach(b=>b.addEventListener('click',()=>mobileView(b.dataset.view)));
  $('#mobile-filter-btn').addEventListener('click',()=>mobileView(document.body.dataset.mobileView==='filters'?'map':'filters'));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!document.querySelector('dialog[open]'))closeDetail();if(e.key==='/'&&!['INPUT','SELECT','TEXTAREA'].includes(document.activeElement.tagName)){e.preventDefault();if(matchMedia('(max-width:720px)').matches)mobileView('filters');$('#search').focus();}});
  window.addEventListener('hashchange',()=>{readHash();update();if(selected)selectPlace(selected);});
  window.addEventListener('offline',()=>toast('Нет сети. Справочник работает; подробная карта и погода требуют интернет.'));
  new ResizeObserver(()=>map.invalidateSize({pan:false})).observe($('#map'));
  update();map.fitBounds(mainBounds,{padding:[30,30],animate:false});if(selected)selectPlace(selected);
  if('serviceWorker'in navigator&&location.protocol!=='file:')navigator.serviceWorker.register('./sw.js').catch(()=>{});
  // For local verification and maintainers; no telemetry or external state mutation.
  window.atlasDebug={state,filtered,status,speciesClosure,overlap,map,selectPlace};
})();

