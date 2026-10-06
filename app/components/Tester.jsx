'use client'

import { useMemo, useRef, useState } from 'react'
import { fonts, missingChars, credit } from '../../lib/fonts'
import { useLab } from './LabProvider'
import Slider from './Slider'

const PANGRAM = 'El veloz murciélago hindú comía feliz cardillo y kiwi.'
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ\nabcdefghijklmnopqrstuvwxyz'

export default function Tester() {
  const { selected, text, setText, pick, counts, track, failed } = useLab()
  const [size, setSize] = useState(150)
  const [tracking, setTracking] = useState(-2)
  const [leading, setLeading] = useState(0.86)
  const areaRef = useRef(null)

  const missing = useMemo(() => missingChars(text, selected), [text, selected])
  const hasDigits = selected.glyphs.includes('0')
  const count = counts === null ? '—' : counts[selected.id] ?? 0
  const by = credit(selected.authors)

  const presets = [
    { label: 'NOMBRE', value: selected.name },
    { label: 'ALFABETO', value: ALPHABET },
    ...(hasDigits ? [{ label: 'NÚMEROS', value: '0123456789' }] : []),
    { label: 'PANGRAMA', value: PANGRAM },
  ]

  // Inserta el carácter donde está el cursor del campo de texto.
  const insert = (ch) => {
    const el = areaRef.current
    const start = el?.selectionStart ?? text.length
    const end = el?.selectionEnd ?? text.length
    setText(text.slice(0, start) + ch + text.slice(end))
    requestAnimationFrame(() => {
      el?.focus()
      el?.setSelectionRange(start + ch.length, start + ch.length)
    })
  }

  return (
    <section id="experiment" className="experiment" aria-labelledby="experiment-title">
      <div className="section-head">
        <h2 id="experiment-title">EXPERIMENTA</h2>
        <span>{selected.name}</span>
      </div>

      <div className="experiment-top">
        <div className="font-switcher" role="group" aria-label="Elegir tipografía">
          {fonts.map((f) => (
            <button
              key={f.id}
              type="button"
              className={selected.id === f.id ? 'selected' : ''}
              aria-pressed={selected.id === f.id}
              onClick={() => pick(f)}
              data-cursor="CAMBIAR"
            >
              {f.name}
            </button>
          ))}
        </div>
      </div>

      <div className="experiment-stage">
        <label htmlFor="tester-text" className="sr-only">Texto de prueba</label>
        <textarea
          id="tester-text"
          ref={areaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Escribe para probar la tipografía"
          spellCheck={false}
        />
        <div className="presets" role="group" aria-label="Textos de ejemplo">
          {presets.map((p) => (
            <button key={p.label} type="button" className="chip" onClick={() => setText(p.value)} data-cursor="USAR">
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="controls">
        <Slider label="TAMAÑO" value={size} min={32} max={220} unit="px" onChange={setSize} />
        <Slider label="TRACKING" value={tracking} min={-20} max={30} unit="px" onChange={setTracking} />
        <Slider label="INTERLINEADO" value={leading} min={0.55} max={1.4} step={0.01} onChange={setLeading} />
      </div>

      <div
        className="live-output"
        aria-hidden="true"
        style={{
          fontFamily: `'${selected.family}', sans-serif`,
          fontSize: `min(${size}px, ${size / 10}vw)`,
          letterSpacing: `${tracking / size}em`,
          lineHeight: leading,
        }}
      >
        {text}
      </div>

      {failed.has(selected.id) && (
        <p className="card-warn is-error" role="alert">No se pudo cargar {selected.name}: se muestra con otra letra de reemplazo. Revisa que exista {selected.web}</p>
      )}
      {missing.length > 0 && (
        <p className="card-warn" role="status">
          {selected.name} no incluye: {missing.join(' ')}. Esos caracteres se ven con otra tipografía.
        </p>
      )}

      <dl className="specs">
        <div><dt>AÑO</dt><dd>{selected.year}</dd></div>
        {by && <div><dt>{selected.authors.length > 1 ? 'AUTORES' : 'AUTOR'}</dt><dd>{by}</dd></div>}
        <div><dt>TIPO</dt><dd>{selected.type}</dd></div>
        <div><dt>CARACTERES</dt><dd>{selected.glyphs.length}</dd></div>
        <div><dt>DESCARGAS</dt><dd>{count}</dd></div>
      </dl>

      <div className="glyphs-block">
        <h3 className="glyphs-title">CARACTERES ({selected.glyphs.length})</h3>
        <ul className="glyphs" style={{ fontFamily: `'${selected.family}', sans-serif` }}>
          {[...selected.glyphs].map((ch) => (
            <li key={ch}>
              <button type="button" onClick={() => insert(ch)} aria-label={`Insertar ${ch}`} data-cursor="INSERTAR">
                {ch}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="experiment-footer">
        <span>{selected.note}</span>
        <a className="download-button" href={selected.file} download onClick={() => track(selected)} data-cursor="DESCARGAR">
          DESCARGAR {selected.name} ↓
        </a>
      </div>
    </section>
  )
}
