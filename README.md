# AVAND / TYPE v22

Archivo tipográfico de AVAND: probar, descargar y usar tipografías abiertas, y vitrina de Cruz Santa (licencia comercial en MyFonts).

## Correr el proyecto
```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```
Variables opcionales (ver `.env.example`): `COUNTERAPI_WORKSPACE`, `COUNTERAPI_ACCESS_TOKEN`.

## Estructura
- `lib/fonts.js` — **fuente única de datos**: lista de tipografías, caracteres que incluye cada una y URLs. Lo usan la página, el probador y la API.
- `app/page.js` — página (componente de servidor).
- `app/components/` — `Archive` (tarjetas, filtros y texto global), `Tester` (probador y glifos), `LabProvider` (estado compartido y descargas), `Cursor`, `LetterSpecimen`, `Slider`.
- `app/api/download/route.js` — contador de descargas (CounterAPI).
- `public/fonts/` — archivos originales (los que se descargan). `public/fonts/web/` — `.woff2` livianos solo para mostrar en pantalla.

## Cómo agregar una tipografía
1. Copia el archivo original a `public/fonts/`.
2. Genera su `.woff2` en `public/fonts/web/` (por ejemplo con `pyftsubset` o `fonttools`).
3. Agrega su `@font-face` en `app/globals.css`.
4. Agrega la entrada en `lib/fonts.js` con un `id` nuevo (`013`, …). `glyphs` y `charset` se obtienen leyendo el cmap de la fuente.

## Cruz Santa
Solo se muestra una vista previa: el sitio carga un `.woff2` reducido con las letras de "CRUZ SANTA" y "TAMBIÉN ES HACER.". El archivo completo de la fuente **no** está en `public/`, para que no se pueda descargar desde el sitio.

## Contador de descargas
- Un solo `GET /api/download` devuelve los conteos de todas las fuentes.
- `POST /api/download` solo acepta ids que existen en `lib/fonts.js` y peticiones del mismo dominio.
- Se cuenta una descarga por fuente y por sesión del navegador.
- Los nombres de los contadores no cambiaron (`download-basc`, `download-avand-10`, …), así que los números acumulados se mantienen.
