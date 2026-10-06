import { fonts } from './fonts'

// @font-face de todas las tipografías, generado desde data/fonts.json.
// Así, agregar una fuente nueva no obliga a tocar el CSS.
export function fontFaceCSS() {
  const faces = fonts.map(
    (f) => `@font-face{font-family:'${f.family}';src:url('${f.web}') format('woff2');font-display:swap}`
  )
  // Cruz Santa (de pago): solo una vista previa reducida, nunca el archivo completo.
  faces.push(`@font-face{font-family:'CruzSanta';src:url('/fonts/web/cruzsanta-preview.woff2') format('woff2');font-display:swap}`)
  return faces.join('\n')
}
