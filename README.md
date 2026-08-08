# Calculadora Solar — Estaciones de Energía

Herramienta web interactiva, sin backend ni framework, para calcular la compatibilidad entre paneles solares y estaciones de energía portátiles (power stations) de marcas como EcoFlow, Bluetti, Anker SOLIX y VTOMAN.

Todo el cálculo corre en el navegador del usuario: no hay servidor, API ni base de datos. La app entera vive en un único archivo [index.html](index.html).

Sitio en producción: https://calculadora-powerstations.vercel.app

## Stack

- **HTML + CSS + JavaScript vanilla** — sin React, sin framework, sin bundler, sin `package.json`.
- Todo el CSS y JS está inline dentro de `index.html` (~3,750 líneas en total).
- Fuentes vía Google Fonts (`Space Grotesk`, `JetBrains Mono`).
- Persistencia local con `localStorage` (tema, presets guardados).
- Estado de configuración compartible vía hash de la URL (`pushHash`).
- Despliegue en **Vercel** (ver [vercel.json](vercel.json)).

No hay proceso de build: `index.html` se sirve tal cual. `build-images.js` y `copy-images.js` son scripts puntuales de un solo uso (no parte de un pipeline automatizado) para llevar imágenes PNG de estaciones desde una ruta local del autor (`C:\Users\maste\.gemini\antigravity-ide\...`) hacia `images.js` (base64 embebido) o a la carpeta `images/`. Esa carpeta `images/` no está versionada en el repo — hay que regenerarla o copiarla manualmente antes de tener las fotos reales de las 6 estaciones definidas en `IMG` (líneas 2012–2019); las demás estaciones usan un placeholder SVG generado en código (`imgPlaceholder`).

## Cómo correr el proyecto localmente

No requiere `npm install` ni build. Basta con servir el archivo estático:

```bash
npx serve .
```

o simplemente abrir `index.html` directamente en el navegador.

## Estructura de archivos

| Archivo | Propósito |
|---|---|
| [index.html](index.html) | Toda la app: markup, estilos y lógica JS |
| [build-images.js](build-images.js) | Script manual: convierte PNGs locales a base64 → `images.js` |
| [copy-images.js](copy-images.js) | Script manual: copia PNGs locales a `images/` |
| [vercel.json](vercel.json) | Headers de seguridad (CSP básica, X-Frame-Options, etc.) y cache de `index.html` |
| [robots.txt](robots.txt) | SEO — permite todo, referencia `sitemap.xml` (no presente en el repo) |

## Secciones de la app

La página es un scroll único con navegación por anchors (`#calculadora`, `#autonomia`, etc.):

1. **`#calculadora` — Calculadora de compatibilidad solar.** Elige estación + panel (o panel personalizado), configura paneles en serie/paralelo con steppers, y muestra en vivo: voltaje total (Voc), corriente total (Imp), potencia total, barra de aprovechamiento (%) y un estado (seguro / advertencia / incompatible). Incluye presets guardables y botón "compartir configuración" (codifica el estado en la URL).
2. **`#autonomia` — Calculadora de autonomía.** Selecciona estación + dispositivos (celular, laptop, refrigerador, etc.) y estima cuántas horas/minutos dura la batería, aplicando un factor de uso útil (`USABLE_FACTOR = 0.80`).
3. **`#carga-solar` — Simulador de carga solar.** Dada una estación, configuración de paneles y región (con datos de irradiación solar aproximada por zona — mayormente México, más Cuba), estima horas de sol necesarias para cargar la batería.
4. **`#comparador` — Comparador.** Compara dos estaciones lado a lado.
5. **`#catalogo` — Catálogo por marca.** Grid filtrable/buscable de todas las estaciones soportadas, con la config de fábrica sugerida y botón "Usar en calculadora".
6. **`#notas` — Notas técnicas.** Advertencias importantes (efecto del frío en el Voc, que serie suma voltios y paralelo suma amperios, que el techo de potencia es un límite real y no solo V×A, etc.).

## Lógica central de cálculo

Toda la data y lógica vive dentro del único `<script>` de `index.html` (a partir de la línea 2004), sin módulos ni imports.

- **`STATIONS`** (línea ~2062): catálogo de estaciones. Cada una define `vocMin`/`vocMax` (rango de voltaje aceptado por el puerto MPPT), `imax` (corriente máxima), `pmaxPort` (techo de potencia por entrada), `ports` (número de entradas MPPT independientes) y un `preset` de fábrica sugerido.
- **`PANELS`** (línea ~2148): catálogo de paneles solares estándar (200–610 W) con su Voc e Imp.
- **`DEVICES`** (línea ~2160): catálogo de aparatos con su consumo en watts, usado en la calculadora de autonomía.
- **`REGIONS`** (línea ~3047): horas de irradiación solar (peor caso / promedio / mejor caso) por región, usadas en el simulador de carga.
- **Fórmulas clave** (función `render()`, línea ~2798):
  - `totalVoc = panel.voc * series`
  - `totalImp = panel.imp * paralelo`
  - `totalW = panel.w * series * paralelo`
  - Validaciones: `vocOK` (dentro de `vocMin`–`vocMax`), `impOK` (≤ `imax`), `wattOK` (≤ `pmaxPort`). El estado final (✅ seguro / ⚠ advertencia / 🚫 incompatible) depende de estas tres banderas.

## Convenciones observadas

- Todo el contenido de usuario está en español (México), incluyendo IDs de región y textos de ayuda.
- No hay tests ni linter configurado.
- No hay control de versiones inicializado en este directorio (`git status` no aplica — no es un repo git).
- Los datos de estaciones/paneles están hardcodeados en el JS; para agregar un modelo nuevo se edita directamente el array `STATIONS` (o `PANELS`/`DEVICES`/`REGIONS` según corresponda).
