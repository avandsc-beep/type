import './globals.css'
import { fonts } from '../lib/fonts'
import { fontFaceCSS } from '../lib/fontFaces'

const title = 'AVAND / TYPE — Archivo tipográfico'
const description = `Archivo tipográfico abierto de AVAND: ${fonts.length} tipografías para probar, descargar y usar, y Cruz Santa en MyFonts.`

export const metadata = {
  title: { default: title, template: '%s · AVAND / TYPE' },
  description,
  applicationName: 'AVAND / TYPE',
  openGraph: { title, description, type: 'website', locale: 'es_BO', siteName: 'AVAND / TYPE' },
  twitter: { card: 'summary', title, description },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#f1f0eb',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <style dangerouslySetInnerHTML={{ __html: fontFaceCSS() }} />
        {/* La tipografía del título es lo primero que se ve: se carga con prioridad. */}
        <link rel="preload" as="font" type="font/woff2" href="/fonts/web/basc-regular.woff2" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  )
}
