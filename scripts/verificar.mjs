#!/usr/bin/env node
// Revisa que todas las tipografías de data/fonts.json estén completas y se puedan mostrar.
//   npm run verificar
// Si una fuente "no se visualiza", casi siempre se ve aquí el motivo.

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import * as fontkit from 'fontkit'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const data = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'fonts.json'), 'utf8'))
const publicPath = (url) => path.join(ROOT, 'public', url)

let problems = 0
let warnings = 0
const seen = { id: new Set(), family: new Set(), name: new Set(), file: new Set() }

const open = (buf) => {
  const f = fontkit.create(buf)
  return f.fonts ? f.fonts[0] : f
}

console.log(`Revisando ${data.length} tipografías…\n`)

for (const f of data) {
  const bad = []
  const warn = []

  // campos y duplicados
  for (const key of ['id', 'name', 'family', 'file', 'web', 'type', 'year']) {
    if (!f[key]) bad.push(`falta el campo "${key}"`)
  }
  if (!Array.isArray(f.authors)) bad.push('"authors" debe ser una lista, por ejemplo ["Nombre Apellido"]')
  for (const key of ['id', 'family', 'name', 'file']) {
    if (f[key] && seen[key].has(f[key])) bad.push(`"${key}" repetido: ${f[key]}`)
    seen[key].add(f[key])
  }
  if (f.family && !/^[A-Za-z][A-Za-z0-9]*$/.test(f.family)) bad.push(`"family" solo admite letras y números sin espacios: ${f.family}`)

  // archivos
  let original = null
  let webFont = null
  if (f.file && !fs.existsSync(publicPath(f.file))) bad.push(`no existe el archivo para descargar: public${f.file}`)
  else if (f.file) {
    try { original = open(fs.readFileSync(publicPath(f.file))) } catch (e) { bad.push(`el archivo original no se puede leer (${e.message})`) }
  }
  if (f.web && !fs.existsSync(publicPath(f.web))) bad.push(`no existe el archivo para mostrar en pantalla: public${f.web}`)
  else if (f.web) {
    try { webFont = open(fs.readFileSync(publicPath(f.web))) } catch (e) { bad.push(`el .woff2 está dañado y el navegador no lo cargará (${e.message})`) }
  }
  if (original && webFont) {
    const webChars = new Set([...webFont.characterSet])
    const lost = [...original.characterSet].filter((c) => !webChars.has(c) && c > 32 && c < 0x2600)
    if (lost.length) warn.push(`el .woff2 perdió ${lost.length} caracteres que sí trae el original`)
  }

  // datos
  if (f.year && !/^\d{4}$/.test(String(f.year))) warn.push(`el año no parece válido: ${f.year}`)
  if (Array.isArray(f.authors) && !f.authors.length) warn.push('sin autor (por confirmar)')
  if (original && f.charset) {
    const real = new Set([...original.characterSet])
    const listed = [...f.charset].filter((c) => !real.has(c.codePointAt(0)))
    if (listed.length) warn.push(`la ficha lista caracteres que la fuente no trae: ${listed.join(' ')}`)
  }

  problems += bad.length
  warnings += warn.length
  const mark = bad.length ? '✗' : warn.length ? '•' : '✓'
  console.log(`${mark} ${f.id || '???'} / ${f.name || '(sin nombre)'}`)
  bad.forEach((m) => console.log(`    ✗ ${m}`))
  warn.forEach((m) => console.log(`    • ${m}`))
}

// Cruz Santa: solo vista previa, nunca el archivo completo
const cruzPreview = path.join(ROOT, 'public', 'fonts', 'web', 'cruzsanta-preview.woff2')
if (!fs.existsSync(cruzPreview)) {
  problems++
  console.log('\n✗ Falta la vista previa de Cruz Santa: public/fonts/web/cruzsanta-preview.woff2')
}
const cruzFull = fs.readdirSync(path.join(ROOT, 'public', 'fonts')).filter((n) => /^cruzsanta.*\.(otf|ttf)$/i.test(n))
if (cruzFull.length) {
  warnings++
  console.log(`\n• Atención: ${cruzFull.join(', ')} está en public/fonts/ y se podría descargar gratis. Cruz Santa es de pago.`)
}

console.log(`\n${problems ? `✗ ${problems} problema(s) por corregir` : '✓ Sin problemas'}${warnings ? `  ·  • ${warnings} aviso(s)` : ''}`)
process.exit(problems ? 1 : 0)
