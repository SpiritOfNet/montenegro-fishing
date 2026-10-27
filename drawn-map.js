/* Original cartographic rendering. Real OSM vectors + terrain-derived contours. */
window.createDrawnAtlas = function(map) {
  const D=window.DRAWN_GEOGRAPHY;
  const layers=L.layerGroup();
  ['terrain','water','roads','lettering'].forEach((name,i)=>{
    const pane=map.createPane('drawn-'+name);pane.style.zIndex=String(220+i*15);pane.style.pointerEvents='none';
  });
  const common={interactive:false,smoothFactor:.75};
  L.geoJSON(D.contours,{...common,pane:'drawn-terrain',style:f=>({color:'#776447',weight:f.properties.elevation%1000===0?.8:.55,opacity:f.properties.elevation%1000===0?.46:.27,fill:false,lineCap:'round',lineJoin:'round'})}).addTo(layers);
  const allWaters=L.layerGroup().addTo(layers),minorWaters=L.layerGroup();
  D.waterways.forEach(f=>{
    const river=f.properties.class==='river';const target=river?allWaters:minorWaters;
    if(river)L.geoJSON(f,{...common,pane:'drawn-water',style:{color:'#514e40',weight:3.5,opacity:.76,lineCap:'round'}}).addTo(target);
    L.geoJSON(f,{...common,pane:'drawn-water',style:{color:river?'#a4a68e':'#6d7568',weight:river?1.85:.7,opacity:river?1:.6,lineCap:'round'}}).addTo(target);
  });
  L.geoJSON(D.lakes,{...common,pane:'drawn-water',style:{color:'#545548',weight:1,fillColor:'#a2a58d',fillOpacity:1,lineJoin:'round',fillRule:'evenodd'}}).addTo(layers);
  const roads={};
  D.roads.forEach(f=>{
    const c=f.properties.class;
    const weight={motorway:2.6,trunk:2.15,primary:1.6,secondary:1.1,tertiary:.85}[c]||1;
    const group=L.layerGroup();
    L.geoJSON(f,{...common,pane:'drawn-roads',style:{color:'#e8d4a6',weight:weight+1.7,opacity:.65,lineCap:'round',lineJoin:'round'}}).addTo(group);
    L.geoJSON(f,{...common,pane:'drawn-roads',style:{color:'#413d32',weight,opacity:c==='tertiary'?.55:.79,dashArray:c==='tertiary'?'3 5':null,lineCap:'round',lineJoin:'round'}}).addTo(group);
    roads[c]=group;
    if(['motorway','trunk','primary'].includes(c))group.addTo(layers);
  });
  const labels=L.layerGroup().addTo(layers);
  const labelData=[
    {lat:42.63,lon:19.14,text:'ЧЕРНОГОРИЯ',cls:'country-name',min:7,max:9.6},
    {lat:42.13,lon:18.62,text:'Адриатическое<br>море',cls:'sea-name',min:7,max:12},
    {lat:43.12792,lon:19.03411,text:'ДУРМИТОР',cls:'range-name',min:8.2,max:13},
    {lat:42.86667,lon:19.71667,text:'БЕЛАСИЦА',cls:'range-name',min:9,max:13},
    {lat:42.405,lon:18.81833,text:'ЛОВЧЕН',cls:'range-name',min:9,max:13},
    {lat:42.42,lon:18.65,text:'Бока-Которская<br>бухта',cls:'water-name',min:10,max:14},
    {lat:42.17,lon:19.3,text:'СКАДАРСКОЕ<br>ОЗЕРО',cls:'lake-name',min:8.7,max:14}
  ].map(d=>({...d,marker:L.marker([d.lat,d.lon],{interactive:false,keyboard:false,pane:'drawn-lettering',icon:L.divIcon({className:'map-lettering '+d.cls,html:`<span>${d.text}</span>`,iconSize:[250,60],iconAnchor:[125,30]})})}));
  function update(){
    const z=map.getZoom();
    if(z>=10)layers.addLayer(minorWaters);else layers.removeLayer(minorWaters);
    for(const [c,min]of [['secondary',9.5],['tertiary',11.5]])if(roads[c]){if(z>=min)layers.addLayer(roads[c]);else layers.removeLayer(roads[c]);}
    labelData.forEach(d=>{if(z>=d.min&&z<=d.max)labels.addLayer(d.marker);else labels.removeLayer(d.marker);});
  }
  map.on('zoomend',update);update();
  return {add:()=>{layers.addTo(map);update();},remove:()=>map.removeLayer(layers),layers};
};
