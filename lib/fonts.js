// Datos del archivo. La lista de tipografías vive en data/fonts.json
// (la rellena sola `npm run agregar`; también se puede editar a mano).

import data from '../data/fonts.json'

export const MYFONTS_URL = 'https://www.myfonts.com/es/collections/cruz-santa-font-avand/'
export const ACADEMY_URL = 'https://explorando-letras.vercel.app/'
export const CONTACT_EMAIL = 'info@avand-design.com'

export const fonts = data

// Tipos para los filtros: primero los de siempre y después los que vayan apareciendo en los datos.
const BASE_TYPES = ['Display', 'Experimental', 'Familia']
export const FONT_TYPES = [...new Set([...BASE_TYPES.filter((t) => data.some((f) => f.type === t)), ...data.map((f) => f.type)])]

// Convención del contador de descargas. Los nombres ya existentes no cambian (son ASCII),
// así se mantienen los conteos acumulados; las tildes se quitan para los nombres nuevos.
export const counterKey = (name) =>
  `download-${String(name)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')}`

// Autores en texto: "A", "A y B", "A, B y C". Vacío si todavía no se conoce.
export function credit(authors = []) {
  if (authors.length <= 1) return authors[0] || ''
  return `${authors.slice(0, -1).join(', ')} y ${authors[authors.length - 1]}`
}

// Caracteres del texto que la fuente no trae (ignora espacios y saltos de línea).
export function missingChars(text, font) {
  const out = new Set()
  for (const ch of text) {
    if (/\s/.test(ch)) continue
    if (!font.charset.includes(ch)) out.add(ch)
  }
  return [...out]
}
