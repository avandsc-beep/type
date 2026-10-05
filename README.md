# AVAND / TYPE v7

Archivo tipográfico y laboratorio experimental de AVAND.

## Esta versión
- BASC es la tipografía principal.
- BASC incorpora una sección de **proyecto real**, usando la pieza de la Bienal Internacional de Arquitectura Santa Cruz 2026.
- Se mantiene el sistema de espécimen y los reguladores de tamaño, tracking e interlineado.
- Cada tipografía de uso abierto tiene descarga directa.
- Se incorpora un contador de descargas independiente mediante **CounterAPI**. No usa Supabase.
- Se incorpora contacto: `info@avand-design.com`.
- Cruz Santa aparece como tipografía comercial y dirige a MyFonts.

## Contador de descargas

El contador no guarda los datos en Supabase ni en el sistema de archivos de Vercel. La aplicación usa CounterAPI como servicio externo especializado en contadores y métricas. Esto evita mantener una base de datos propia para una métrica sencilla.

CounterAPI ofrece contadores individuales, métricas en tiempo real y un panel de analítica. El plan gratuito actual permite hasta 1.000 conteos diarios. Ver documentación: https://counterapi.dev/

### Configuración en Vercel

1. Crear una cuenta gratuita en CounterAPI.
2. Crear un workspace, por ejemplo: `avand-type`.
3. En el proyecto de Vercel agregar estas variables:

```text
COUNTERAPI_WORKSPACE=avand-type
COUNTERAPI_ACCESS_TOKEN=TU_TOKEN_OPCIONAL
```

El token es opcional para contadores públicos, pero se recomienda usar un workspace propio y un token si el panel está configurado como privado.

No colocar el token en variables `NEXT_PUBLIC_*`.

### Cómo funciona

Cada descarga llama a:

```text
/api/download
```

La ruta registra un contador independiente para cada fuente:

```text
 download-basc
 download-avand-10
 download-prazo
 download-tramapunto
 ...
```

La página consulta el contador y muestra, por ejemplo:

```text
BASC
1.284 DESCARGAS
```

Si el servicio de métricas no está configurado todavía, la página sigue funcionando y las descargas directas de las fuentes no se bloquean.

## Desarrollo

Next.js App Router.
