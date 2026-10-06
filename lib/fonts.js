// Fuente única de verdad: la usan la página, el probador y la API de descargas.
// `year` y `authors` salen de los metadatos de cada archivo; `authors: []` = autor por confirmar (no se muestra).
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
    "year": "2025",
    "authors": [],
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
    "year": "2018",
    "authors": [],
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
    "year": "2018",
    "authors": [
      "Marco Antonio Ramirez Murga"
    ],
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
    "year": "2020",
    "authors": [
      "Marco Antonio Ramirez Murga"
    ],
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
    "year": "2018",
    "authors": [
      "Marco Antonio Ramirez Murga"
    ],
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
    "year": "2020",
    "authors": [
      "Marco Antonio Ramirez Murga"
    ],
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
    "year": "2020",
    "authors": [
      "Marco Antonio Ramirez Murga"
    ],
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
    "year": "2020",
    "authors": [
      "Marco Antonio Ramirez Murga"
    ],
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
    "year": "2020",
    "authors": [
      "Marco Antonio Ramirez Murga"
    ],
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
    "year": "2020",
    "authors": [
      "Marco Antonio Ramirez Murga"
    ],
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
    "year": "2017",
    "authors": [],
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
    "year": "2018",
    "authors": [
      "Marco Antonio Ramirez Murga"
    ],
    "note": "Tipografía construida desde trama y punto.",
    "glyphs": "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789Ññ",
    "charset": "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzÑñŇ"
  },
  {
    "id": "013",
    "name": "BLOQUE 001",
    "family": "Bloque001",
    "file": "/fonts/BLOQUE001.ttf",
    "web": "/fonts/web/bloque001.woff2",
    "type": "Experimental",
    "year": "2018",
    "authors": [
      "Marco Antonio Ramirez Murga"
    ],
    "note": "Alfabeto de bloques con trazo interior.",
    "glyphs": "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789Ññ",
    "charset": "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzÑñŇ"
  },
  {
    "id": "014",
    "name": "CAFEFONT",
    "family": "Cafefont",
    "file": "/fonts/cafefont-Regular.otf",
    "web": "/fonts/web/cafefont-regular.woff2",
    "type": "Display",
    "year": "2024",
    "authors": [
      "Daniela Serrano"
    ],
    "note": "Display de trazo grueso; la o tiene forma de grano de café.",
    "glyphs": "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ÁÉÍÓÚÑÜáéíóúñü¿¡.,:;!?()\"'-–—/&@#%+*=$€",
    "charset": "!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~¡¢£¤¥¦§¨©«¬®¯°±´¶·¸»¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿŒœŴŵŶŷŸˆˇ˘˙˚˛˜˝̵̸̧̀́̂̃̇̈̊ẀẁẂẃẄẅỲỳ–—‘’‚“”„†‡•…‰‹›⁄€™←↑→↓↔↕↖↗↘↙∂∅∏∑−√∞∫≈≠≤≥◊"
  },
  {
    "id": "015",
    "name": "PALACE PALACE FONT",
    "family": "PalacePalaceFont",
    "file": "/fonts/PALACE_PALACE_FONT.ttf",
    "web": "/fonts/web/palace-palace-font.woff2",
    "type": "Display",
    "year": "2024",
    "authors": [],
    "note": "Display de proporciones anchas; las minúsculas son versalitas.",
    "glyphs": "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ÁÉÍÓÚÑÜáéíóúñü¿¡.,:;!?()\"'-–—/&@#%+*=$€",
    "charset": "!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~¡¢¤¥¦§¨©ª«¬®¯°±²³´¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïñòóôõö÷ùúûüýÿĀāĆćĈĉĊċČčĎďĐĒēĖėĚěĜĝĠġģĤĥĨĩĪīİĴĵĹĺŃńŇňŉŌōŐőŔŕŘřŚśŜŝŞşŠšŤŨũŪūŮůŰűŴŵŶŷŸŹźŻżŽžȘˆˇ˙˚˛˜˝ΔμπẀẁẂẃẄẅ–—‘’‚“”„†‡•…‰‹›⁄₣€™∏∑−∕∙√∞∫≈≠≤≥◊"
  },
  {
    "id": "016",
    "name": "TIENDITA",
    "family": "Tiendita",
    "file": "/fonts/tiendita_000.ttf",
    "web": "/fonts/web/tiendita.woff2",
    "type": "Display",
    "year": "2024",
    "authors": [],
    "note": "Display de trazo grueso con borde irregular, como recortado.",
    "glyphs": "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ÁÉÍÓÚÑÜáéíóúñü¿¡.,:;!?()\"'-–—/&@#%+*=$€",
    "charset": "!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~¡¢¤¥¦§¨©ª«¬®¯°±²³´¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïñòóôõö÷øùúûüýþÿĀāĂăĆćĈĉĊċČčĎďĐđĒēĔĕĖėĚěĜĝĞğĠġĢģĤĥĦħĨĩĪīİıĲĳĴĵĶķĸĹĺĻļĽľĿŀŁłŃńŅņŇňŉŌōŎŏŐőŒœŔŕŖŗŘřŚśŜŝŞşŠšŤťŦŧŨũŪūŬŭŮůŰűŴŵŶŷŸŹźŻżŽžȘșȚțˆˇˉ˘˙˚˜˝̦ΩμẀẁẂẃẄẅ–—‘’‚“”„†•…‰‹›⁄₧€™−∕∙√∞∫≈≠≤≥◊"
  }
]

export const FONT_TYPES = ['Display', 'Experimental', 'Familia']

// Convención histórica del contador. NO cambiar: mantiene los conteos ya acumulados.
export const counterKey = (name) =>
  `download-${String(name).trim().toLowerCase().replace(/[^a-z0-9]+/g, '-')}`

// Autores en texto: "A", "A y B", "A, B y C". Vacío si todavía no se conoce.
export function credit(authors = []) {
  if (authors.length <= 1) return authors[0] || ''
  return `${authors.slice(0, -1).join(', ')} y ${authors[authors.length - 1]}`
}

// Caracteres del texto que la fuente no trae (ignora espacios y saltos de línea).
export function missingChars(text, font) {
  const out = new Set()
  for (const ch of text) {
    if (/\s/.test(ch)) continue
    if (!font.charset.includes(ch)) out.add(ch)
  }
  return [...out]
}
