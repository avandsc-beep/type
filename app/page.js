'use client'

import { useEffect, useRef, useState } from 'react'

const myFontsUrl = 'https://www.myfonts.com/es/collections/cruz-santa-font-avand/'

const fonts = [
  { id:'001', name:'BASC', file:'/fonts/BASC-Regular.otf', family:'BASC', type:'Display', year:'2026', note:'Tipografía principal del archivo AVAND.', open:true },
  { id:'002', name:'AVAND 10', file:'/fonts/AVAND10.TTF', family:'AVAND10', type:'Experimental', year:'2026', note:'Tipografía experimental del archivo AVAND.', open:true },
  { id:'003', name:'BAUHAUS HOMENAJE', file:'/fonts/BAUHAUSHOMENAJE.ttf', family:'BauhausHomenaje', type:'Experimental', year:'2026', note:'Ejercicio tipográfico inspirado en la geometría moderna.', open:true },
  { id:'004', name:'EXTRA LARGE AVAND', file:'/fonts/extralargeavand-Regular.otf', family:'ExtraLargeAVAND', type:'Display', year:'2026', note:'Una escala tipográfica pensada para ocupar el espacio.', open:true },
  { id:'005', name:'INFOCAL', file:'/fonts/INFOCAL.ttf', family:'INFOCAL', type:'Experimental', year:'2026', note:'Sistema desarrollado para exploración gráfica.', open:true },
  { id:'006', name:'PRAZO', file:'/fonts/prazo-Regular.otf', family:'Prazo', type:'Familia', year:'2026', note:'Familia con distintas interpretaciones formales.', open:true },
  { id:'007', name:'PRAZO COMPACTO', file:'/fonts/prazo-compactoRegular.otf', family:'PrazoCompacto', type:'Familia', year:'2026', note:'Versión compacta de la familia Prazo.', open:true },
  { id:'008', name:'PRAZO CURSIVA', file:'/fonts/prazo-cursiva.otf', family:'PrazoCursiva', type:'Familia', year:'2026', note:'Versión cursiva de la familia Prazo.', open:true },
  { id:'009', name:'PRAZO REDONDO', file:'/fonts/prazo-redondo.otf', family:'PrazoRedondo', type:'Familia', year:'2026', note:'Versión redondeada de la familia Prazo.', open:true },
  { id:'010', name:'PRAZO SERIF', file:'/fonts/prazoserif-Regular.otf', family:'PrazoSerif', type:'Familia', year:'2026', note:'Versión serif de la familia Prazo.', open:true },
  { id:'011', name:'QDRD', file:'/fonts/qdrd.ttf', family:'QDRD', type:'Experimental', year:'2026', note:'Una investigación gráfica convertida en alfabeto.', open:true },
  { id:'012', name:'TRAMAPUNTO', file:'/fonts/TRAMAPUNTO.ttf', family:'TramaPunto', type:'Experimental', year:'2026', note:'Tipografía construida desde trama y punto.', open:true },
]

function Cursor(){
  const [pos,setPos]=useState({x:-100,y:-100}); const [label,setLabel]=useState(''); const [active,setActive]=useState(false)
  const target=useRef({x:-100,y:-100}); const current=useRef({x:-100,y:-100})
  useEffect(()=>{
    const move=e=>{target.current={x:e.clientX,y:e.clientY};const hit=e.target.closest('[data-cursor]');setLabel(hit?.dataset.cursor||'');setActive(!!hit)}
    let raf; const tick=()=>{current.current.x+=(target.current.x-current.current.x)*.22;current.current.y+=(target.current.y-current.current.y)*.22;setPos({...current.current});raf=requestAnimationFrame(tick)}
    window.addEventListener('mousemove',move,{passive:true});raf=requestAnimationFrame(tick)
    return()=>{window.removeEventListener('mousemove',move);cancelAnimationFrame(raf)}
  },[])
  return <div className={'cursor-wrap '+(active?'is-active':'')} style={{left:pos.x,top:pos.y}} aria-hidden="true"><i className="cursor-ghost ghost-3"/><i className="cursor-ghost ghost-2"/><i className="cursor-ghost ghost-1"/><div className="cursor-core"><span>{label}</span></div></div>
}

function TouchDot(){
  const [pos,setPos]=useState({x:-100,y:-100}); const [visible,setVisible]=useState(false)
  useEffect(()=>{const down=e=>{if(e.pointerType==='mouse')return;setPos({x:e.clientX,y:e.clientY});setVisible(true);clearTimeout(window.__avandTouchTimer);window.__avandTouchTimer=setTimeout(()=>setVisible(false),450)};window.addEventListener('pointerdown',down,{passive:true});return()=>{window.removeEventListener('pointerdown',down);clearTimeout(window.__avandTouchTimer)}},[])
  return <div className={'touch-dot '+(visible?'is-visible':'')} style={{left:pos.x,top:pos.y}} aria-hidden="true"/>
}

function FitText({font, text, size, tracking, leading, className=''}){
  const ref=useRef(null)
  useEffect(()=>{
    const el=ref.current; if(!el)return
    const fit=()=>{
      el.style.setProperty('--fit-scale','1')
      const box=el.parentElement?.clientWidth||1
      const natural=el.scrollWidth||1
      el.style.setProperty('--fit-scale',Math.min(1,box/natural).toFixed(4))
    }
    const ro=new ResizeObserver(fit); if(el.parentElement)ro.observe(el.parentElement); document.fonts?.ready.then(fit); fit()
    return()=>ro.disconnect()
  },[font,size,tracking,text])
  return <div ref={ref} className={'fit-text '+className} style={{fontFamily:font.family,fontSize:size,letterSpacing:tracking,lineHeight:leading}}>{text}</div>
}

function downloadFont(font){
  fetch('/api/download',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({font:font.name}),keepalive:true}).catch(()=>{})
}

function DownloadCount({font}){
  const [count,setCount]=useState(null)
  useEffect(()=>{fetch(`/api/download?font=${encodeURIComponent(font.name)}`).then(r=>r.json()).then(d=>setCount(d.count)).catch(()=>{})},[font.name])
  return <span className="download-count">{count===null?'—':count} DESCARGAS</span>
}

function FontCard({font,index,onExperiment}){
  const [size,setSize]=useState(index===0?150:110); const [tracking,setTracking]=useState(-2); const [leading,setLeading]=useState(.86)
  const [text,setText]=useState(font.name)
  return <article className={'font-card '+(index===0?'is-primary':'')} onClick={()=>onExperiment(font)} data-cursor="ABRIR">
    <div className="card-top"><span>AVAND TYPE / {font.id}{index===0?' · PRINCIPAL':''}</span><span>{font.year}</span></div>
    <div className="specimen-frame"><FitText font={font} text={text} size={size} tracking={tracking} leading={leading}/></div>
    <div className="card-controls" onClick={e=>e.stopPropagation()}>
      <label>TAMAÑO <input type="range" min="32" max="220" value={size} onChange={e=>setSize(+e.target.value)}/><b>{size}px</b></label>
      <label>TRACKING <input type="range" min="-20" max="30" value={tracking} onChange={e=>setTracking(+e.target.value)}/><b>{tracking}px</b></label>
      <label>INTERLINEADO <input type="range" min=".55" max="1.4" step=".01" value={leading} onChange={e=>setLeading(+e.target.value)}/><b>{leading}</b></label>
    </div>
    <div className="card-bottom"><span>{font.type} · {font.open?'USO ABIERTO':''} · <DownloadCount font={font}/></span><span className="card-actions"><button type="button" onClick={e=>{e.stopPropagation();onExperiment(font)}} data-cursor="PROBAR">PROBAR</button><a href={font.file} download onClick={e=>{e.stopPropagation();downloadFont(font)}} data-cursor="DESCARGAR">DESCARGAR ↓</a></span></div>
  </article>
}

export default function Home(){
  const [text,setText]=useState('TIPOGRAFÍA')
  const [size,setSize]=useState(150); const [tracking,setTracking]=useState(-2); const [leading,setLeading]=useState(.86)
  const [selected,setSelected]=useState(fonts[0])
  const choose=f=>{setSelected(f);setText(f.name);document.querySelector('#experiment')?.scrollIntoView({behavior:'smooth'})}
  return <main>
    <Cursor/><TouchDot/>
    <header className="nav"><a className="brand" href="#top" data-cursor="TOP">AVAND / TYPE</a><nav><a href="#archive" data-cursor="VER">ARCHIVO</a><a href="#experiment" data-cursor="PROBAR">EXPERIMENTAR</a><a href="#academy" data-cursor="ACADEMIA">ACADEMIA</a><a href="#about" data-cursor="AVAND">AVAND</a></nav><span className="open-tag">USO ABIERTO</span></header>
    <section id="top" className="hero" data-cursor="EXPLORA"><div className="hero-meta"><span>01 — ARCHIVO TIPOGRÁFICO</span><span>USO ABIERTO / 2026</span></div><FitText font={fonts[0]} text="BASC" size={220} tracking={-9} leading={.72} className="hero-word"/><div className="hero-bottom"><p>TIPOGRAFÍAS PARA EXPERIMENTAR,<br/>USAR Y COMPARTIR.</p><span>SCROLL ↓</span></div></section>
    <section id="archive" className="archive"><div className="section-head"><span>ARCHIVO</span><span>{fonts.length+1} TIPOGRAFÍAS</span></div><div className="font-list">{fonts.map((f,i)=><FontCard key={f.id} font={f} index={i} onExperiment={choose}/>)}</div>
      <article className="font-card paid-card" data-cursor="MYFONTS">
        <div className="card-top"><span>AVAND TYPE / 013 · LICENCIA COMERCIAL</span><span>MYFONTS</span></div>
        <div className="specimen-frame paid-specimen"><div className="paid-preview" aria-label="Vista previa de Cruz Santa">CRUZ SANTA</div></div>
        <div className="paid-info"><div><strong>CRUZ SANTA</strong><span>por AVAND · 1 estilo · desde US$ 5</span></div><a href={myFontsUrl} target="_blank" rel="noreferrer" data-cursor="MYFONTS">COMPRAR EN MYFONTS ↗</a></div>
      </article>
    </section>
    <section id="basc-project" className="basc-project">
      <div className="section-head"><span>BASC / PROYECTO REAL</span><span>BIENAL INTERNACIONAL DE ARQUITECTURA SANTA CRUZ · 2026</span></div>
      <div className="basc-grid">
        <div className="basc-image"><img src="/projects/basc-bienal-2026.png" alt="Aplicación de la tipografía BASC en la Bienal Internacional de Arquitectura Santa Cruz 2026" /></div>
        <div className="basc-copy">
          <p className="eyebrow">TIPOGRAFÍA + IDENTIDAD</p>
          <h2>BASC<br/>EN CONTEXTO.</h2>
          <p>La BASC Font fue concebida para consolidar la identidad visual de la Bienal Internacional de Arquitectura Santa Cruz y desarrollada como un sistema tipográfico para comunicación institucional, titulares y aplicaciones de gran formato.</p>
          <div className="basc-meta"><span>DISEÑO · AVAND</span><span>2026</span><span>DISPLAY</span><span>USO ABIERTO</span></div>
          <div className="basc-stat"><strong><DownloadCount font={fonts[0]}/></strong><span>La fuente puede descargarse y utilizarse libremente.</span></div>
        </div>
      </div>
    </section>
    <section id="experiment" className="experiment"><div className="section-head"><span>EXPERIMENTA</span><span>{selected.name}</span></div><div className="font-switcher">{fonts.map(f=><button key={f.id} className={selected.id===f.id?'selected':''} onClick={()=>{setSelected(f);setText(f.name)}} data-cursor="CAMBIAR">{f.name}</button>)}</div><div className="experiment-stage"><textarea aria-label="Texto de prueba" value={text} onChange={e=>setText(e.target.value)}/></div><div className="controls"><label>TAMAÑO <input type="range" min="32" max="240" value={size} onChange={e=>setSize(+e.target.value)}/><b>{size}px</b></label><label>TRACKING <input type="range" min="-20" max="30" value={tracking} onChange={e=>setTracking(+e.target.value)}/><b>{tracking}px</b></label><label>INTERLINEADO <input type="range" min=".55" max="1.4" step=".01" value={leading} onChange={e=>setLeading(+e.target.value)}/><b>{leading}</b></label></div><div className="live-output" style={{fontFamily:selected.family,fontSize:size,letterSpacing:tracking,lineHeight:leading}} data-cursor="ESCRIBE">{text}</div><div className="experiment-footer"><span>{selected.note}</span><a className="download-button" href={selected.file} download onClick={()=>downloadFont(selected)} data-cursor="DESCARGAR">DESCARGAR {selected.name} ↓</a></div></section>
    <section id="academy" className="academy"><div className="section-head"><span>ACADEMIA</span><span>APRENDER / EXPERIMENTAR</span></div><div className="academy-grid"><div><p className="eyebrow">PLATAFORMA</p><h2>EXPLORANDO<br/>LETRAS.</h2></div><div><p>Un espacio dedicado al aprendizaje y la experimentación tipográfica. Cursos, talleres y recursos para entender las letras desde el diseño.</p><a className="academy-link" href="https://explorando-letras.vercel.app/" target="_blank" rel="noreferrer" data-cursor="VISITAR">VISITAR PLATAFORMA ↗</a></div></div></section>
    <section className="project"><div className="project-number">AVAND / PROYECTOS</div><div><p className="eyebrow">TIPOGRAFÍA COMO INVESTIGACIÓN</p><h2>DISEÑAR<br/>TAMBIÉN ES<br/>EXPLORAR.</h2></div><p className="project-copy">Proyectos tipográficos, experimentos y herramientas desarrolladas desde AVAND.</p></section>
    <section id="about" className="about"><span>AVAND</span><div><h3>TIPOGRAFÍA<br/>COMO MATERIA.</h3><p>AVAND es un estudio de diseño y tipografía dirigido por Marco Antonio Ramirez Murga. Este archivo reúne tipos de uso abierto, experimentos y proyectos.</p></div><div><p>CONTACTO</p><p><a href="mailto:info@avand-design.com" data-cursor="EMAIL">info@avand-design.com</a></p><p>REDES</p><p><a href="#" data-cursor="INSTAGRAM">Instagram</a><br/><a href="#" data-cursor="BEHANCE">Behance</a></p></div></section>
    <footer className="footer"><span>AVAND / TYPE © 2026</span><div><a href="#archive">ARCHIVO</a><a href="#experiment">EXPERIMENTA</a><a href="#academy">ACADEMIA</a></div></footer>
  </main>
}
