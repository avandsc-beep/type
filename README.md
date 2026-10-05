# AVAND / TYPE — v10

Archivo tipográfico experimental de AVAND.

## Dirección de diseño
- La entrada es directamente el archivo; no existe una portada separada para BASC.
- BASC continúa como la tipografía 001 y primera referencia del archivo.
- La tipografía es el contenido principal de la interfaz.
- Cinco modos de interacción: INCLINAR, TRAZO, TAMAÑO, POSITIVO y NEGATIVO.
- Cada tipografía tiene controles propios de tamaño, tracking e interlineado.
- El cursor magenta funciona como una capa de interacción y feedback.
- El espécimen se ajusta a su ancho real para evitar cortes.
- Cruz Santa aparece como tipografía comercial y dirige a MyFonts; no se distribuye desde este sitio.
- Las fuentes abiertas se descargan directamente.
- Las descargas se registran mediante el endpoint interno `/api/download`, conectado a un contador externo independiente.

## Escalabilidad
Las fuentes están separadas de la interfaz en `public/fonts`. Para agregar nuevas tipografías se incorpora el archivo y una entrada al arreglo `fonts` en `app/page.js`.

## Variables de entorno del contador
`COUNTERAPI_WORKSPACE`
`COUNTERAPI_ACCESS_TOKEN`
