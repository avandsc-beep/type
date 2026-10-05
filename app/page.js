'use client'

import { useEffect, useState } from 'react'

const fonts = [
  { id:'001', name:'BASC', file:'/fonts/BASC-Regular.otf', family:'BASC', type:'Display', year:'2026', note:'Una exploración de forma, ritmo y construcción.' },
  { id:'002', name:'AVAND 10', file:'/fonts/AVAND10.TTF', family:'AVAND10', type:'Experimental', year:'2026', note:'Tipografía experimental del archivo AVAND.' },
  { id:'003', name:'BAUHAUS HOMENAJE', file:'/fonts/BAUHAUSHOMENAJE.ttf', family:'BauhausHomenaje', type:'Experimental', year:'2026', note:'Ejercicio tipográfico inspirado en la geometría moderna.' },
  { id:'004', name:'EXTRA LARGE AVAND', file:'/fonts/extralargeavand-Regular.otf', family:'ExtraLargeAVAND', type:'Display', year:'2026', note:'Una escala tipográfica pensada para ocupar el espacio.' },
  { id:'005', name:'INFOCAL', file:'/fonts/INFOCAL.ttf', family:'INFOCAL', type:'Experimental', year:'2026', note:'Sistema desarrollado para exploración gráfica.' },
  { id:'006', name:'PRAZO', file:'/fonts/prazo-Regular.otf', family:'Prazo', type:'Familia', year:'2026', note:'Familia con distintas interpretaciones formales.' },
  { id:'007', name:'PRAZO COMPACTO', file:'/fonts/prazo-compactoRegular.otf', family:'PrazoCompacto', type:'Familia', year:'2026', note:'Versión compacta de la familia Prazo.' },
  { id:'008', name:'PRAZO CURSIVA', file:'/fonts/prazo-cursiva.otf', family:'PrazoCursiva', type:'Familia', year:'2026', note:'Versión cursiva de la familia Prazo.' },
  { id:'009', name:'PRAZO REDONDO', file:'/fonts/prazo-redondo.otf', family:'PrazoRedondo', type:'Familia', year:'2026', note:'Versión redondeada de la familia Prazo.' },
  { id:'010', name:'PRAZO SERIF', file:'/fonts/prazoserif-Regular.otf', family:'PrazoSerif', type:'Familia', year:'2026', note:'Versión serif de la familia Prazo.' },
  { id:'011', name:'QDRD', file:'/fonts/qdrd.ttf', family:'QDRD', type:'Experimental', year:'2026', note:'Una investigación gráfica convertida en alfabeto.' },
  { id:'012', name:'TRAMAPUNTO', file:'/fonts/TRAMAPUNTO.ttf', family:'TramaPunto', type:'Experimental', year:'2026', note:'Tipografía construida desde trama y punto.' },
]

function Cursor(){
  const [pos,setPos]=useState({x:-100,y:-100})
  const [label,setLabel]=useState('')
  useEffect(()=>{
    const move=e=>setPos({x:e.clientX,y:e.clientY})
    const over=e=>setLabel(e.target.closest('[data-cursor]')?.dataset.cursor || '')
    window.addEventListener('mousemove',move)
    window.addEventListener('mouseover',over)
    return()=>{window.removeEventListener('mousemove',move);window.removeEventListener('mouseover',over)}
  },[])
  return <div className={'cursor '+(label?'is-active':'')} style={{transform:`translate3d(${pos.x}px,${pos.y}px,0)`}}><span>{label}</span></div>
}

function TouchDot(){
  const [pos,setPos]=useState({x:-100,y:-100})
  const [visible,setVisible]=useState(false)
  useEffect(()=>{
    const down=e=>{
      if(e.pointerType==='mouse') return
      setPos({x:e.clientX,y:e.clientY})
      setVisible(true)
      window.clearTimeout(window.__avandTouchTimer)
      window.__avandTouchTimer=window.setTimeout(()=>setVisible(false),450)
    }
    window.addEventListener('pointerdown',down,{passive:true})
    return()=>{window.removeEventListener('pointerdown',down);window.clearTimeout(window.__avandTouchTimer)}
  },[])
  return <div className={'touch-dot '+(visible?'is-visible':'')} style={{left:pos.x,top:pos.y}} aria-hidden="true"/>
}

export default function Home(){
  const [text,setText]=useState('TIPOGRAFÍA')
  const [size,setSize]=useState(118)
  const [tracking,setTracking]=useState(-2)
  const [leading,setLeading]=useState(.86)
  const [selected,setSelected]=useState(fonts[0])

  return <main>
    <Cursor />
    <TouchDot />
    <header className="nav">
      <a className="brand" href="#top" data-cursor="TOP">AVAND / TYPE</a>
      <nav><a href="#archive" data-cursor="VER">ARCHIVO</a><a href="#experiment" data-cursor="PROBAR">EXPERIMENTAR</a><a href="#academy" data-cursor="ACADEMIA">ACADEMIA</a><a href="#about" data-cursor="AVAND">AVAND</a></nav>
      <span className="open-tag">USO ABIERTO</span>
    </header>

    <section id="top" className="hero" data-cursor="EXPLORA">
      <div className="hero-meta"><span>01 — ARCHIVO TIPOGRÁFICO</span><span>USO ABIERTO / 2026</span></div>
      <div className="hero-word" data-cursor="MOVER">AVAND</div>
      <div className="hero-bottom"><p>TIPOGRAFÍAS PARA EXPERIMENTAR,<br/>USAR Y COMPARTIR.</p><span>SCROLL ↓</span></div>
    </section>

    <section id="archive" className="archive">
      <div className="section-head"><span>ARCHIVO</span><span>{fonts.length} TIPOGRAFÍAS</span></div>
      <div className="font-list">
        {fonts.map((f,i)=><article className="font-card" key={f.id} onClick={()=>setSelected(f)} data-cursor="ABRIR">
          <div className="card-top"><span>AVAND TYPE / {f.id}</span><span>{f.year}</span></div>
          <div className="specimen" style={{fontFamily:f.family}}>{f.name}</div>
          <div className="card-bottom"><span>{f.type}</span><span className="card-actions"><button type="button" onClick={(e)=>{e.stopPropagation();setSelected(f)}} data-cursor="PROBAR">PROBAR</button><a href={f.file} download onClick={e=>e.stopPropagation()} data-cursor="DESCARGAR">DESCARGAR ↓</a></span></div>
        </article>)}
      </div>
    </section>

    <section id="experiment" className="experiment">
      <div className="section-head"><span>EXPERIMENTA</span><span>{selected.name}</span></div>
      <div className="font-switcher">{fonts.map(f=><button key={f.id} className={selected.id===f.id?'selected':''} onClick={()=>setSelected(f)} data-cursor="CAMBIAR">{f.name}</button>)}</div>
      <div className="experiment-stage"><textarea aria-label="Texto de prueba" value={text} onChange={e=>setText(e.target.value)} /></div>
      <div className="controls">
        <label>TAMAÑO <input type="range" min="40" max="190" value={size} onChange={e=>setSize(+e.target.value)}/><b>{size}px</b></label>
        <label>TRACKING <input type="range" min="-12" max="20" value={tracking} onChange={e=>setTracking(+e.target.value)}/><b>{tracking}px</b></label>
        <label>INTERLINEADO <input type="range" min=".65" max="1.3" step=".01" value={leading} onChange={e=>setLeading(+e.target.value)}/><b>{leading}</b></label>
      </div>
      <div className="live-output" style={{fontFamily:selected.family,fontSize:size,letterSpacing:tracking,lineHeight:leading}} data-cursor="ESCRIBE">{text}</div>
      <div className="experiment-footer"><span>{selected.note}</span><a className="download-button" href={selected.file} download data-cursor="DESCARGAR">DESCARGAR {selected.name} ↓</a></div>
    </section>

    <section id="academy" className="academy">
      <div className="section-head"><span>ACADEMIA</span><span>APRENDER / EXPERIMENTAR</span></div>
      <div className="academy-grid"><div><p className="eyebrow">PLATAFORMA</p><h2>EXPLORANDO<br/>LETRAS.</h2></div><div><p>Un espacio dedicado al aprendizaje y la experimentación tipográfica. Cursos, talleres y recursos para entender las letras desde el diseño.</p><a className="academy-link" href="https://explorando-letras.vercel.app/" target="_blank" rel="noreferrer" data-cursor="VISITAR">VISITAR PLATAFORMA ↗</a></div></div>
    </section>

    <section className="project">
      <div className="project-number">AVAND / PROYECTOS</div>
      <div><p className="eyebrow">TIPOGRAFÍA COMO INVESTIGACIÓN</p><h2>DISEÑAR<br/>TAMBIÉN ES<br/>EXPLORAR.</h2></div>
      <div className="project-copy"><p>AVAND / TYPE reúne tipografías, experimentos, proyectos y experiencias académicas alrededor de la letra.</p><p>Un archivo abierto que sigue creciendo.</p></div>
    </section>

    <section id="about" className="about"><span>AVAND</span><h3>DISEÑO GRÁFICO<br/>Y TIPOGRAFÍA.</h3><p>Un archivo abierto de tipografías diseñadas por Marco Antonio Ramírez y AVAND.</p></section>

    <footer className="footer"><span>© AVAND</span><div><a href="#">INSTAGRAM</a><a href="#">BEHANCE</a><a href="#">LINKEDIN</a><a href="mailto:contacto@avand-design.com">EMAIL</a></div></footer>
  </main>
}
