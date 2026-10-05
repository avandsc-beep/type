'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { fonts } from '../../lib/fonts'

const DEFAULT_TEXT = 'TIPOGRAFÍA'
const LabContext = createContext(null)

export function useLab() {
  const ctx = useContext(LabContext)
  if (!ctx) throw new Error('useLab debe usarse dentro de <LabProvider>')
  return ctx
}

// Estado compartido entre el archivo (tarjetas) y el probador:
// qué fuente está seleccionada, qué texto se está probando y cuántas descargas lleva cada una.
export default function LabProvider({ children }) {
  const [selected, setSelected] = useState(fonts[0])
  const [text, setText] = useState(DEFAULT_TEXT)
  const [counts, setCounts] = useState(null) // null = cargando

  // Cambiar de fuente conserva lo que la persona escribió; solo reemplaza el texto
  // si todavía es el de ejemplo (el título por defecto o el nombre de otra fuente).
  const pick = useCallback((font, nextText) => {
    setText((current) => {
      if (typeof nextText === 'string') return nextText
      const isPlaceholder = !current.trim() || current === DEFAULT_TEXT || fonts.some((f) => f.name === current)
      return isPlaceholder ? font.name : current
    })
    setSelected(font)
  }, [])

  const openTester = useCallback((font, nextText) => {
    pick(font, nextText)
    document.getElementById('experiment')?.scrollIntoView({ behavior: 'auto' })
  }, [pick])

  // Una sola petición trae los conteos de todas las fuentes.
  useEffect(() => {
    const controller = new AbortController()
    fetch('/api/download', { signal: controller.signal })
      .then((r) => r.json())
      .then((d) => setCounts(d.counts || {}))
      .catch((error) => {
        if (error.name !== 'AbortError') setCounts({})
      })
    return () => controller.abort()
  }, [])

  // Cuenta una descarga por fuente y por sesión del navegador (evita inflar el número con clics repetidos).
  const track = useCallback((font) => {
    try {
      if (sessionStorage.getItem(`dl:${font.id}`)) return
      sessionStorage.setItem(`dl:${font.id}`, '1')
    } catch {}
    setCounts((c) => (c ? { ...c, [font.id]: (c[font.id] ?? 0) + 1 } : c))
    fetch('/api/download', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: font.id }),
      keepalive: true,
    }).catch(() => {})
  }, [])

  const value = useMemo(
    () => ({ selected, text, setText, pick, openTester, counts, track }),
    [selected, text, pick, openTester, counts, track]
  )

  return <LabContext.Provider value={value}>{children}</LabContext.Provider>
}
