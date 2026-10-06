'use client'

import { useId, useState } from 'react'
import { fonts, FONT_TYPES, missingChars, credit } from '../../lib/fonts'
import { useLab } from './LabProvider'
import LetterSpecimen from './LetterSpecimen'
import Slider from './Slider'

function FontCard({ font, index, sample }) {
  const { openTester, counts, track } = useLab()
  const [size, setSize] = useState(index === 0 ? 145 : 105)
  const [tracking, setTracking] = useState(-2)
  const [leading, setLeading] = useState(0.86)

  const text = sample.trim() ? sample : font.name
  const missing = missingChars(text, font)
  const count = counts === null ? '—' : counts[font.id] ?? 0
  const by = credit(font.authors)

  return (
    <article className={`font-card${index === 0 ? ' is-primary' : ''}`}>
      <div className="card-top">
        <h3><b>{font.id}</b> / {font.name}</h3>
        <span>{font.type}</span>
      </div>

      <div
        className="specimen-frame"
        onClick={() => openTester(font, sample.trim() ? sample : undefined)}
        data-cursor="ABRIR"
      >
        <LetterSpecimen family={font.family} text={text} size={size} tracking={tracking} leading={leading} />
      </div>

      {missing.length > 0 && (
        <p className="card-warn">Esta fuente no incluye: {missing.join(' ')}</p>
      )}

      <div className="controls">
        <Slider label="TAMAÑO" value={size} min={32} max={220} unit="px" onChange={setSize} />
        <Slider label="TRACKING" value={tracking} min={-20} max={30} unit="px" onChange={setTracking} />
        <Slider label="INTERLINEADO" value={leading} min={0.55} max={1.4} step={0.01} onChange={setLeading} />
      </div>

      <div className="card-bottom">
        <span>{font.year}{by && <> · POR {by}</>} · USO ABIERTO · {count} DESCARGAS</span>
        <span className="card-actions">
          <button type="button" onClick={() => openTester(font, sample.trim() ? sample : undefined)} data-cursor="PROBAR">
            PROBAR<span className="sr-only"> {font.name}</span>
          </button>
          <a href={font.file} download onClick={() => track(font)} data-cursor="DESCARGAR">
            DESCARGAR<span className="sr-only"> {font.name}</span> ↓
          </a>
        </span>
      </div>
    </article>
  )
}

export default function Archive() {
  const [filter, setFilter] = useState('Todas')
  const [sample, setSample] = useState('')
  const sampleId = useId()

  const list = filter === 'Todas' ? fonts : fonts.filter((f) => f.type === filter)

  return (
    <>
      <div className="toolbar">
        <div className="chips" role="group" aria-label="Filtrar por tipo">
          {['Todas', ...FONT_TYPES].map((type) => (
            <button
              key={type}
              type="button"
              className="chip"
              aria-pressed={filter === type}
              onClick={() => setFilter(type)}
              data-cursor="FILTRAR"
            >
              {type === 'Todas' ? 'TODAS' : type.toUpperCase()}
            </button>
          ))}
        </div>
        <div className="sample-field">
          <label htmlFor={sampleId} className="sr-only">Texto para probar en todas las tipografías</label>
          <input
            id={sampleId}
            type="text"
            className="sample-input"
            value={sample}
            onChange={(e) => setSample(e.target.value)}
            placeholder="Escribe aquí para probar en todas"
            autoComplete="off"
            spellCheck={false}
          />
        </div>
      </div>

      <div className="font-list">
        {list.map((font, i) => (
          <FontCard key={font.id} font={font} index={i} sample={sample} />
        ))}
      </div>
    </>
  )
}
