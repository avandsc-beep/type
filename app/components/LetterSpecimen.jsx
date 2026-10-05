'use client'

import { useRef, useState } from 'react'

const EFFECTS = ['tilt', 'stroke', 'scale', 'positive', 'negative']

// Muestra de texto con un efecto tipográfico aleatorio al pasar el mouse (nunca repite el anterior).
// Tamaño: nunca supera `size` px, pero se reduce en pantallas angostas para que el texto no se desborde.
// Tracking: se guarda en px (lo que ve la persona) y se aplica en em, así escala con el tamaño real.
export default function LetterSpecimen({ family, text, size, tracking, leading, className = '' }) {
  const [effect, setEffect] = useState('')
  const last = useRef('')

  const onEnter = (e) => {
    if (e.pointerType !== 'mouse') return
    let next
    do {
      next = EFFECTS[Math.floor(Math.random() * EFFECTS.length)]
    } while (next === last.current)
    last.current = next
    setEffect(next)
  }

  return (
    <div
      className={`letter-specimen ${className} ${effect}`.trim()}
      style={{
        fontFamily: `'${family}', sans-serif`,
        fontSize: `min(${size}px, ${size / 10}vw)`,
        letterSpacing: `${tracking / size}em`,
        lineHeight: leading,
      }}
      onPointerEnter={onEnter}
      onPointerLeave={() => setEffect('')}
    >
      {text}
    </div>
  )
}
