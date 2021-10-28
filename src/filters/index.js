/**
 * 全局过滤器
 */

// yyyy-mm-dd
const date = (val) => {
  return new Date(val).format('yyyy-mm-dd')
}

// yyyy-mm-dd HH:MM:ss
const dateTime = (val) => {
  return new Date(val).format('yyyy-mm-dd HH:MM:ss')
}

// yyyy年mm月dd
const dateChinese = (val) => {
  return new Date(val).format('yyyy年mm月dd日')
}

// yyyy年mm月dd HH:MM:ss
const dateTimeChinese = (val) => {
  return new Date(val).format('yyyy年mm月dd日 HH时MM分ss秒')
}

export {
  date,
  dateTime,
  dateChinese,
  dateTimeChinese
}
