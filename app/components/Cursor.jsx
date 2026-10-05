'use client'

import { useEffect, useRef } from 'react'

// Cursor personalizado. Solo se activa con mouse real (hover + pointer fino).
// Se mueve con transform y requestAnimationFrame directo al DOM: no vuelve a renderizar React en cada cuadro.
// En pantallas táctiles muestra un pequeño pulso donde se toca.
export default function Cursor() {
  const cursorRef = useRef(null)
  const labelRef = useRef(null)
  const touchRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const label = labelRef.current
    const touch = touchRef.current
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)')

    // --- Táctil: pulso al tocar ---
    const onTouch = (e) => {
      if (e.pointerType === 'mouse') return
      touch.style.left = `${e.clientX}px`
      touch.style.top = `${e.clientY}px`
      touch.classList.remove('is-visible')
      void touch.offsetWidth // reinicia la animación
      touch.classList.add('is-visible')
    }
    window.addEventListener('pointerdown', onTouch, { passive: true })

    if (!finePointer.matches) {
      return () => window.removeEventListener('pointerdown', onTouch)
    }

    // --- Mouse: cursor con inercia ---
    document.documentElement.classList.add('has-cursor')
    let tx = -100, ty = -100, x = -100, y = -100
    let raf = 0
    let seen = false
    let currentLabel = ''

    const tick = () => {
      x += (tx - x) * 0.22
      y += (ty - y) * 0.22
      cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`
      raf = Math.abs(tx - x) > 0.1 || Math.abs(ty - y) > 0.1 ? requestAnimationFrame(tick) : 0
    }

    const onMove = (e) => {
      if (e.pointerType !== 'mouse') return
      tx = e.clientX
      ty = e.clientY
      if (!seen) {
        seen = true
        x = tx
        y = ty
      }
      const el = e.target instanceof Element ? e.target : null
      const overText = !!el?.closest('textarea, input[type="text"]')
      cursor.classList.toggle('is-on', !overText)
      const next = el?.closest('[data-cursor]')?.dataset.cursor || ''
      if (next !== currentLabel) {
        currentLabel = next
        label.textContent = next
        cursor.classList.toggle('is-active', !!next)
      }
      if (!raf) raf = requestAnimationFrame(tick)
    }
    const onLeave = () => cursor.classList.remove('is-on')

    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)

    return () => {
      window.removeEventListener('pointerdown', onTouch)
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(raf)
      document.documentElement.classList.remove('has-cursor')
    }
  }, [])

  return (
    <>
      <div ref={cursorRef} className="cursor" aria-hidden="true">
        <div className="cursor-core"><span ref={labelRef} /></div>
      </div>
      <div ref={touchRef} className="touch-dot" aria-hidden="true" />
    </>
  )
}
