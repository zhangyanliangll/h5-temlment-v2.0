/**
 *
 * @param {String} el  打印区域class/id
 * @param {Number}  zoom 缩放比例
 */
export function partPrint (el, zoom = 1, initStyle = '') {
  el = document.querySelector(el)
  const tmpHtml = el.outerHTML
  const styles = document.querySelectorAll('style,link')
  const styleArr = Array.from(styles)
  const styleStr = styleArr.map((style) => style.outerHTML).join('') + initStyle
  const tmpFrame = document.createElement('iframe')
  tmpFrame.setAttribute(
    'style',
    'position:absolute;width:0;top:-9999px;left:-9999px;margin:0;padding:0'
  )
  const f = document.body.appendChild(tmpFrame)
  const w = f.contentWindow
  const doc = f.contentDocument
  doc.open()
  const docStr = `<html><head><title></title>${styleStr}<style>
      body {zoom:${zoom}}</style></head><body>${tmpHtml}</body></html>`
  doc.write(docStr)
  doc.close()
  tmpFrame.onload = function () {
    w.focus()
    w.print()
    w.close()
    setTimeout(function () {
      document.body.removeChild(tmpFrame)
    }, 100)
  }
}

// 列子：---
// this.$nextTick(() => {
//   partPrint(
//     '.pay-print-box',
//     0.95,
//     '<style type="text/css">div.pay-print-box{display:block!important}</style>'
//   )
// })
