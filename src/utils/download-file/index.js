// 文件下载方法
/**
 *
 * @param {Function} apiFn
 * @param {Object} params
 */
export async function downloadFile (apiFn, params) {
  try {
    const { data, headers } = await apiFn(params)
    const blob = new Blob([data], { type: 'application/octet-stream' })
    // 匹配文件名
    const urlCode = headers['content-disposition'].match(/filename = (\S*)/)[1]
    // 将文件名解码
    const fileName = decodeURI(urlCode)
    const src = URL.createObjectURL(blob)
    if (src) {
      const $a = document.createElement('a')
      $a.setAttribute('href', src)
      $a.setAttribute('download', fileName)
      const event = new MouseEvent('click')
      $a.dispatchEvent(event)
    }
    URL.revokeObjectURL(src) // 释放URL 对象
  } catch (err) {
    console.log(err)
  }
}

// 解决图片和文件下载跳转问题
export async function requestDownloadFile (url, fileName) {
  try {
    const httpRequest = new XMLHttpRequest()
    //指定响应类型，这决定了浏览器对返回内容的解析方式，设置为空或者text会作为字符解析、json会作为json解析，blob和arraybuffer会作为字节流解析
    httpRequest.responseType = 'arraybuffer'
    httpRequest.open('GET', url, true)
    httpRequest.onload = function () {
      if (httpRequest.readyState == 4 && httpRequest.status == 200) {
        //只有responseType为空或者text，才会使用responseText获取内容，其他情况                        httpRequest.response就是你需要的不含http头的返回内容
        const content = httpRequest.response
        const elink = document.createElement('a')
        elink.download = fileName
        elink.style.display = 'none'
        const blob = new Blob([content])
        //创建指向内存中字节流的链接
        elink.href = URL.createObjectURL(blob)
        document.body.appendChild(elink)
        elink.click()
        document.body.removeChild(elink)
      }
    }
    httpRequest.send()
  } catch (err) {
    console.log(err)
  }
}
