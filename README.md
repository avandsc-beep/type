# AVAND / TYPE v8

Archivo tipográfico y laboratorio experimental de AVAND.

## Esta versión
- BASC es la tipografía principal y domina la primera pantalla con una jerarquía editorial más clara.
- La referencia de BASC se usa como criterio visual para la presentación principal, pero NO se incorpora la imagen de la Bienal al sitio.
- Se recuperan y refuerzan las animaciones: cursor magenta con réplicas/ghost, estado negativo al pasar sobre elementos interactivos, movimiento suave, skew y desplazamiento de especímenes.
- Se mantienen los reguladores individuales de tamaño, tracking e interlineado.
- Se mantienen las tipografías de uso abierto y Cruz Santa como única tipografía comercial enlazada a MyFonts.
- Contador de descargas independiente mediante CounterAPI; no usa Supabase.
- El contador no bloquea la descarga si el servicio de métricas no está configurado.

## Contador
Configurar en Vercel:
- `COUNTERAPI_WORKSPACE`
- `COUNTERAPI_ACCESS_TOKEN`

## Desarrollo
Next.js App Router.
