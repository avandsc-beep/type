// Fuente única de verdad: la usan la página, el probador y la API de descargas.
// `glyphs` = caracteres que se muestran en la grilla; `charset` = todo lo que la fuente realmente incluye
// (generado leyendo el cmap de cada archivo con fontTools; si cambias una fuente, vuelve a generarlo).

export const MYFONTS_URL = 'https://www.myfonts.com/es/collections/cruz-santa-font-avand/'
export const ACADEMY_URL = 'https://explorando-letras.vercel.app/'
export const CONTACT_EMAIL = 'info@avand-design.com'

export const fonts = [
  {
    "id": "001",
    "name": "BASC",
    "family": "BASC",
    "file": "/fonts/BASC-Regular.otf",
    "web": "/fonts/web/basc-regular.woff2",
    "type": "Display",
    "year": "2026",
    "note": "Tipografía principal del archivo AVAND.",
    "glyphs": "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ÁÉÍÓÚÑÜáéíóúñü¿¡.,:;!?()\"'-–—/&@#*$€",
    "charset": "!\"#$&'()*,-./0123456789:;?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}¡¢£¤¥¦§¨©«®¯°´¶·¸»¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿŒœŴŵŶŷŸˆˇ˘˙˚˛˜˝̵̸̧̀́̂̃̇̈̊ẀẁẂẃẄẅỲỳ–—‘’‚“”„†‡•…‹›€™←↑→↓↔↕↖↗↘↙◊"
  },
  {
    "id": "002",
    "name": "AVAND 10",
    "family": "AVAND10",
    "file": "/fonts/AVAND10.TTF",
    "web": "/fonts/web/avand10.woff2",
    "type": "Experimental",
    "year": "2026",
    "note": "Tipografía experimental del archivo AVAND.",
    "glyphs": "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ÁÉÍÓÚÑÜáéíóúñü¿¡.,:;!?()\"'-–—/&@#%+*=$€",
    "charset": "!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿıˆˇˉ˘˙˚˛˜˝;–—‘’‚“”„†‡•…‹›⁄₣₤₧€№™∂∆∏∑−∕∙√∞∫≈≤≥"
  },
  {
    "id": "003",
    "name": "BAUHAUS HOMENAJE",
    "family": "BauhausHomenaje",
    "file": "/fonts/BAUHAUSHOMENAJE.ttf",
    "web": "/fonts/web/bauhaushomenaje.woff2",
    "type": "Experimental",
    "year": "2026",
    "note": "Ejercicio tipográfico inspirado en la geometría moderna.",
    "glyphs": "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    "charset": "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzŇ"
  },
  {
    "id": "004",
    "name": "EXTRA LARGE AVAND",
    "family": "ExtraLargeAVAND",
    "file": "/fonts/extralargeavand-Regular.otf",
    "web": "/fonts/web/extralargeavand-regular.woff2",
    "type": "Display",
    "year": "2026",
    "note": "Una escala tipográfica pensada para ocupar el espacio.",
    "glyphs": "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ÁÉÍÓÚÑÜáéíóúñü.,-",
    "charset": ",-.0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ`abcdefghijklmnopqrstuvwxyz¨¯´¸ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿŒœŴŵŶŷŸˆˇ˘˙˚˛˜˝̵̸̧̀́̂̃̇̈̊ẀẁẂẃẄẅỲỳ"
  },
  {
    "id": "005",
    "name": "INFOCAL",
    "family": "INFOCAL",
    "file": "/fonts/INFOCAL.ttf",
    "web": "/fonts/web/infocal.woff2",
    "type": "Experimental",
    "year": "2026",
    "note": "Sistema desarrollado para exploración gráfica.",
    "glyphs": "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789Ññ",
    "charset": "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzÑñŇ"
  },
  {
    "id": "006",
    "name": "PRAZO",
    "family": "Prazo",
    "file": "/fonts/prazo-Regular.otf",
    "web": "/fonts/web/prazo-regular.woff2",
    "type": "Familia",
    "year": "2026",
    "note": "Familia con distintas interpretaciones formales.",
    "glyphs": "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ÁÉÍÓÚÑÜáéíóúñü¿¡.,:;!?()\"'-–—/#%+*=$€",
    "charset": "!\"#$%'()*+,-./0123456789:;<=>?ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{}~¡¢£¤¥¨«¬¯±´·¸»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿŒœŴŶŷŸˆˇ˘˙˚˛˜˝̵̸̧̀́̂̃̇̈̊ẂẄỲỳ–—‘’‚“”„•…‰‹›⁄€⅛⅜⅝⅞∂∅∏∑−√∞∫≈≠≤≥"
  },
  {
    "id": "007",
    "name": "PRAZO COMPACTO",
    "family": "PrazoCompacto",
    "file": "/fonts/prazo-compactoRegular.otf",
    "web": "/fonts/web/prazo-compactoregular.woff2",
    "type": "Familia",
    "year": "2026",
    "note": "Versión compacta de la familia Prazo.",
    "glyphs": "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ÁÉÍÓÚÑÜáéíóúñü¿¡.,:;!?()\"'-–—/#%+*=$€",
    "charset": "!\"#$%'()*+,-./0123456789:;<=>?ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{}~¡¢£¤¥¨«¬¯±´·¸»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿŒœŴŶŷŸˆˇ˘˙˚˛˜˝̵̸̧̀́̂̃̇̈̊ẂẄỲỳ–—‘’‚“”„•…‰‹›⁄€⅛⅜⅝⅞∂∅∏∑−√∞∫≈≠≤≥"
  },
  {
    "id": "008",
    "name": "PRAZO CURSIVA",
    "family": "PrazoCursiva",
    "file": "/fonts/prazo-cursiva.otf",
    "web": "/fonts/web/prazo-cursiva.woff2",
    "type": "Familia",
    "year": "2026",
    "note": "Versión cursiva de la familia Prazo.",
    "glyphs": "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ÁÉÍÓÚÑÜáéíóúñü¿¡.,:;!?()\"'-–—/#%+*=$€",
    "charset": "!\"#$%'()*+,-./0123456789:;<=>?ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{}~¡¢£¤¥¨«¬¯±´·¸»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿŒœŴŶŷŸˆˇ˘˙˚˛˜˝̵̸̧̀́̂̃̇̈̊ẂẄỲỳ–—‘’‚“”„•…‰‹›⁄€⅛⅜⅝⅞∂∅∏∑−√∞∫≈≠≤≥"
  },
  {
    "id": "009",
    "name": "PRAZO REDONDO",
    "family": "PrazoRedondo",
    "file": "/fonts/prazo-redondo.otf",
    "web": "/fonts/web/prazo-redondo.woff2",
    "type": "Familia",
    "year": "2026",
    "note": "Versión redondeada de la familia Prazo.",
    "glyphs": "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ÁÉÍÓÚÑÜáéíóúñü¿¡.,:;!?()\"'-–—/#%+*=$€",
    "charset": "!\"#$%'()*+,-./0123456789:;<=>?ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{}~¡¢£¤¥¨«¬¯±´·¸»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿŒœŴŶŷŸˆˇ˘˙˚˛˜˝̵̸̧̀́̂̃̇̈̊ẂẄỲỳ–—‘’‚“”„•…‰‹›⁄€⅛⅜⅝⅞∂∅∏∑−√∞∫≈≠≤≥"
  },
  {
    "id": "010",
    "name": "PRAZO SERIF",
    "family": "PrazoSerif",
    "file": "/fonts/prazoserif-Regular.otf",
    "web": "/fonts/web/prazoserif-regular.woff2",
    "type": "Familia",
    "year": "2026",
    "note": "Versión serif de la familia Prazo.",
    "glyphs": "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ÁÉÍÓÚÑÜáéíóúñü¿¡.,:;!?()\"'-–—/#%+*=$€",
    "charset": "!\"#$%'()*+,-./0123456789:;<=>?ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{}~¡¢£¤¥¨«¬¯±´·¸»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿŒœŴŵŶŷŸˆˇ˘˙˚˛˜˝̵̸̧̀́̂̃̇̈̊ẀẁẂẃẄẅỲỳ–—‘’‚“”„•…‰‹›⁄€⅛⅜⅝⅞∂∅∏∑−√∞∫≈≠≤≥"
  },
  {
    "id": "011",
    "name": "QDRD",
    "family": "QDRD",
    "file": "/fonts/qdrd.ttf",
    "web": "/fonts/web/qdrd.woff2",
    "type": "Experimental",
    "year": "2026",
    "note": "Una investigación gráfica convertida en alfabeto.",
    "glyphs": "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ÁÉÍÓÚÑÜáéíóúñü¿¡.,:;!?()\"'-–—/&@#%+*=$€",
    "charset": "!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿıˆˇˉ˘˙˚˛˜˝;–—‘’‚“”„†‡•…‹›⁄₣₤₧€№™∂∆∏∑−∕∙√∞∫≈≤≥"
  },
  {
    "id": "012",
    "name": "TRAMAPUNTO",
    "family": "TramaPunto",
    "file": "/fonts/TRAMAPUNTO.ttf",
    "web": "/fonts/web/tramapunto.woff2",
    "type": "Experimental",
    "year": "2026",
    "note": "Tipografía construida desde trama y punto.",
    "glyphs": "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789Ññ",
    "charset": "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzÑñŇ"
  }
]

export const FONT_TYPES = ['Display', 'Experimental', 'Familia']

// Convención histórica del contador. NO cambiar: mantiene los conteos ya acumulados.
export const counterKey = (name) =>
  `download-${String(name).trim().toLowerCase().replace(/[^a-z0-9]+/g, '-')}`

// Caracteres del texto que la fuente no trae (ignora espacios y saltos de línea).
export function missingChars(text, font) {
  const out = new Set()
  for (const ch of text) {
    if (/\s/.test(ch)) continue
    if (!font.charset.includes(ch)) out.add(ch)
  }
  return [...out]
}
