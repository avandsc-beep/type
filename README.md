# AVAND / TYPE v26

Archivo tipográfico de AVAND: probar, descargar y usar tipografías abiertas, y vitrina de Cruz Santa (licencia comercial en MyFonts).
El espacio se presenta como **"A letra suelta — Un espacio para pensar y construir letras."**

## Correr el proyecto
```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```
Variables opcionales (ver `.env.example`): `COUNTERAPI_WORKSPACE`, `COUNTERAPI_ACCESS_TOKEN`.

## Agregar una tipografía nueva (automático)
1. Pon el archivo `.ttf` u `.otf` en la carpeta **`fuentes-nuevas/`**.
2. Ejecuta:
   ```bash
   npm run agregar
   ```
   (o para un archivo suelto: `npm run agregar -- ruta/MiFuente.ttf`)
3. Listo. El sistema lee solo, desde el archivo: **nombre, año de creación, autor, y qué caracteres incluye**. Crea la versión liviana (`.woff2`) para mostrar en pantalla, copia el original para la descarga y suma la ficha al sitio.

Te pregunta únicamente lo que no puede saber: **tipo** (Display, Experimental, Familia, o uno nuevo como "Manuscrita") y una **nota breve** (opcional). Enter acepta lo sugerido. Si el archivo ya está en el sitio (mismo contenido), avisa y no lo duplica.

Para no responder preguntas: `--yes --tipo=Display --nota="..." --nombre="..." --anio=2024 --autor="A; B"`.

Si el archivo no trae autor en sus metadatos, la ficha se crea sin autor (no se muestra nada) y puedes completarlo en `data/fonts.json`, campo `"authors"`.

## Corregir o editar una ficha
Todo está en **`data/fonts.json`**: nombre, tipo, año, autores, nota. Se edita a mano; no hay que tocar código ni CSS (los `@font-face` se generan solos).

## Estructura
- `data/fonts.json` — **la lista de tipografías** (la rellena `npm run agregar`).
- `scripts/agregar-fuente.mjs` — el script que lee los metadatos y crea los archivos.
- `fuentes-nuevas/` — bandeja de entrada para fuentes por agregar.
- `lib/fonts.js` — lee los datos y define utilidades; `lib/fontFaces.js` — genera los `@font-face`.
- `app/page.js` — página (componente de servidor).
- `app/components/` — `Archive` (tarjetas, filtros y texto global), `Tester` (probador, ficha y glifos), `LabProvider` (estado compartido y descargas), `Cursor`, `LetterSpecimen`, `Slider`.
- `app/api/download/route.js` — contador de descargas (CounterAPI).
- `public/fonts/` — archivos originales (los que se descargan). `public/fonts/web/` — `.woff2` livianos solo para mostrar.

## Cruz Santa
Solo se muestra una vista previa: el sitio carga un `.woff2` reducido con las letras de "CRUZ SANTA" y "TAMBIÉN ES HACER.". El archivo completo de la fuente **no** está en `public/`, para que no se pueda descargar desde el sitio. Su número se calcula solo (siempre la última).

## Contador de descargas
- Un solo `GET /api/download` devuelve los conteos de todas las fuentes.
- `POST /api/download` solo acepta ids que existen en `data/fonts.json` y peticiones del mismo dominio.
- Se cuenta una descarga por fuente y por sesión del navegador.
- Los nombres de los contadores no cambiaron (`download-basc`, `download-avand-10`, …), así que los números acumulados se mantienen.
