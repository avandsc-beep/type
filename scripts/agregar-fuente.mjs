#!/usr/bin/env node
// Agrega tipografías al archivo leyendo sus metadatos (nombre, año, autor, caracteres).
//
//   npm run agregar                      → procesa todo lo que haya en fuentes-nuevas/
//   npm run agregar -- ruta/Fuente.ttf   → procesa ese archivo
//
// Para cada fuente: copia el original a public/fonts/ (lo que se descarga), crea el .woff2 liviano
// en public/fonts/web/ (lo que se muestra) y suma la ficha a data/fonts.json.
// Con terminal interactiva pregunta lo que no se puede saber solo (tipo, nota); Enter acepta lo sugerido.
//
// Opciones (para no responder preguntas): --yes  --nombre="..."  --anio=2024  --autor="A; B"
//                                         --tipo=Display  --nota="..."

import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import readline from 'node:readline/promises'
import { fileURLToPath } from 'node:url'
import * as fontkit from 'fontkit'
import wawoff2 from 'wawoff2'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const INBOX = path.join(ROOT, 'fuentes-nuevas')
const FONTS_DIR = path.join(ROOT, 'public', 'fonts')
const WEB_DIR = path.join(FONTS_DIR, 'web')
const DATA = path.join(ROOT, 'data', 'fonts.json')

const GRID = [...`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ÁÉÍÓÚÑÜáéíóúñü¿¡.,:;!?()"'-–—/&@#%+*=$€`]
const PLACEHOLDERS = /^(\(?your company\)?|your name|unknown|desconocido|designer|author|anonymous|n\/a|-+)$/i
const BASE_TYPES = ['Display', 'Experimental', 'Familia']

// ---------- utilidades ----------
const sha1 = (buf) => crypto.createHash('sha1').update(buf).digest('hex')
const strip = (s) => String(s).normalize('NFD').replace(/[\u0300-\u036f]/g, '')
const slug = (s) => strip(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')

function parseArgs(argv) {
  const files = []
  const opts = {}
  for (const a of argv) {
    if (a.startsWith('--')) {
      const [k, ...v] = a.slice(2).split('=')
      opts[k] = v.length ? v.join('=') : true
    } else files.push(a)
  }
  return { files, opts }
}

// El año sale de la fecha de creación del archivo (segundos desde 1904, en dos mitades).
function createdYear(font) {
  try {
    const [hi, lo] = font.head.created
    const seconds = hi * 2 ** 32 + (lo >>> 0)
    return new Date(Date.UTC(1904, 0, 1) + seconds * 1000).getUTCFullYear()
  } catch {
    return null
  }
}

function splitAuthors(raw) {
  if (!raw || PLACEHOLDERS.test(raw.trim())) return []
  return raw
    .split(/\s*(?:;|\/|&|\by\b|\band\b)\s*/i)
    .map((a) => a.trim())
    .filter((a) => a && !PLACEHOLDERS.test(a))
}

function pascal(name) {
  const words = strip(name).split(/[^A-Za-z0-9]+/).filter(Boolean)
  let out = words.map((w) => w[0].toUpperCase() + w.slice(1).toLowerCase()).join('')
  if (!out) out = 'Fuente'
  return /^\d/.test(out) ? `F${out}` : out
}

function uniqueName(base, taken) {
  if (!taken.has(base)) return base
  let i = 2
  while (taken.has(`${base}${i}`)) i++
  return `${base}${i}`
}

function readFont(buf) {
  let font = fontkit.create(buf)
  if (font.fonts) font = font.fonts[0] // colección .ttc: toma la primera
  return font
}

function listInbox() {
  if (!fs.existsSync(INBOX)) return []
  return fs
    .readdirSync(INBOX)
    .filter((f) => /\.(ttf|otf)$/i.test(f))
    .map((f) => path.join(INBOX, f))
}

// ---------- proceso ----------
async function main() {
  const { files: given, opts } = parseArgs(process.argv.slice(2))
  const files = given.length ? given.map((f) => path.resolve(f)) : listInbox()

  if (!files.length) {
    console.log('No encontré fuentes para agregar.')
    console.log('Pon archivos .ttf u .otf en la carpeta "fuentes-nuevas/" y vuelve a ejecutar `npm run agregar`,')
    console.log('o indica uno: npm run agregar -- ruta/MiFuente.ttf')
    return
  }

  fs.mkdirSync(WEB_DIR, { recursive: true })
  const data = JSON.parse(fs.readFileSync(DATA, 'utf8'))
  const interactive = process.stdin.isTTY && !opts.yes
  const rl = interactive ? readline.createInterface({ input: process.stdin, output: process.stdout }) : null
  const ask = async (label, def) => {
    if (!rl) return def
    const answer = (await rl.question(`  ${label}${def ? ` [${def}]` : ''}: `)).trim()
    return answer || def
  }

  const added = []
  for (const file of files) {
    const base = path.basename(file)
    console.log(`\n→ ${base}`)
    if (!fs.existsSync(file)) { console.log('  ✗ No existe ese archivo.'); continue }
    if (!/\.(ttf|otf)$/i.test(base)) { console.log('  ✗ Solo se aceptan archivos .ttf u .otf.'); continue }

    const buf = fs.readFileSync(file)

    // ¿Ya está en el archivo? (mismo contenido, aunque tenga otro nombre)
    const dupe = data.find((f) => {
      const p = path.join(ROOT, 'public', f.file)
      return fs.existsSync(p) && sha1(fs.readFileSync(p)) === sha1(buf)
    })
    if (dupe) {
      console.log(`  ✗ Ya existe en el archivo: ${dupe.id} / ${dupe.name}. No se agregó de nuevo.`)
      continue
    }

    let font
    try { font = readFont(buf) } catch (e) { console.log(`  ✗ No pude leer la fuente: ${e.message}`); continue }

    // --- sugerencias desde los metadatos ---
    const fileBase = path.basename(base, path.extname(base))
    const rawFamily = (font.familyName || '').trim()
    const suggestedName = (rawFamily && !/^(regular|untitled)/i.test(rawFamily) ? rawFamily : fileBase.replace(/[-_]?regular$/i, ''))
      .replace(/[_]+/g, ' ')
      .trim()
      .toLocaleUpperCase('es')
    let year = createdYear(font)
    const nowYear = new Date().getFullYear()
    if (!year || year < 1990 || year > nowYear) year = nowYear
    const suggestedAuthors = splitAuthors(font.getName?.('designer'))
    const fileInfo = (font.getName?.('description') || '').trim()

    console.log(`  Detecté: familia "${rawFamily || '—'}", año ${year}, autor ${suggestedAuthors.join(' y ') || 'no indicado en el archivo'}`)
    if (fileInfo) console.log(`  Descripción del archivo: ${fileInfo}`)

    const name = opts.nombre || (await ask('Nombre en el sitio', suggestedName))
    const yearOut = String(opts.anio || (await ask('Año', String(year))))
    const authorsAnswer = opts.autor !== undefined
      ? String(opts.autor)
      : await ask('Autor o autores (separa con ;)', suggestedAuthors.join('; '))
    const authors = splitAuthors(String(authorsAnswer))
    const types = [...new Set([...BASE_TYPES, ...data.map((f) => f.type)])]
    const type = opts.tipo || (await ask(`Tipo (${types.join(' / ')} o uno nuevo)`, 'Display'))
    const note = opts.nota !== undefined ? String(opts.nota) : await ask('Nota breve (opcional)', '')

    // --- datos técnicos ---
    const codepoints = [...font.characterSet].filter((c) => c > 32 && c !== 0xa0 && c < 0x2600).sort((a, b) => a - b)
    const charset = String.fromCodePoint(...codepoints)
    const have = new Set(codepoints)
    const glyphs = GRID.filter((ch) => have.has(ch.codePointAt(0))).join('')

    const nextId = String(Math.max(0, ...data.map((f) => Number(f.id))) + 1).padStart(3, '0')
    const family = uniqueName(pascal(name), new Set(data.map((f) => f.family)))

    // nombres de archivo sin pisar nada
    let dlName = base.replace(/\s+/g, '-')
    if (fs.existsSync(path.join(FONTS_DIR, dlName))) dlName = `${path.basename(dlName, path.extname(dlName))}-${nextId}${path.extname(dlName)}`
    const webBase = uniqueName(slug(path.basename(dlName, path.extname(dlName))) || slug(name), new Set(
      fs.readdirSync(WEB_DIR).map((f) => path.basename(f, '.woff2'))
    ))

    // --- archivos ---
    fs.writeFileSync(path.join(FONTS_DIR, dlName), buf)
    const woff2 = Buffer.from(await wawoff2.compress(buf))
    fs.writeFileSync(path.join(WEB_DIR, `${webBase}.woff2`), woff2)

    data.push({
      id: nextId,
      name,
      family,
      file: `/fonts/${dlName}`,
      web: `/fonts/web/${webBase}.woff2`,
      type,
      year: yearOut,
      authors,
      note,
      glyphs,
      charset,
    })
    fs.writeFileSync(DATA, JSON.stringify(data, null, 2) + '\n')

    // si venía de fuentes-nuevas/, se retira de ahí para no reprocesarla
    if (path.dirname(file) === INBOX) fs.unlinkSync(file)

    const kb = (n) => `${Math.round(n / 1024)} KB`
    console.log(`  ✓ Agregada como ${nextId} / ${name}  ·  ${yearOut}  ·  ${authors.join(' y ') || 'autor por confirmar'}  ·  ${type}`)
    console.log(`    ${kb(buf.length)} original → ${kb(woff2.length)} en pantalla  ·  ${glyphs.length} caracteres en la grilla`)
    added.push({ id: nextId, name, authors })
  }

  rl?.close()

  if (added.length) {
    console.log(`\nListo: ${added.length} fuente(s) agregada(s).`)
    const sinAutor = added.filter((a) => !a.authors.length)
    if (sinAutor.length) console.log(`Sin autor en los metadatos: ${sinAutor.map((a) => a.name).join(', ')}. Puedes completarlo en data/fonts.json (campo "authors").`)
    console.log('Para verla: npm run dev   ·   Para publicar: sube el proyecto como siempre.')
  }
}

main().catch((e) => { console.error('Error:', e.message); process.exit(1) })
