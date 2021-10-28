// const moment = require('moment');

export const destroyPage = () => {
  const date = new Date().getTime()
  // 1月1号时间
  const newDate = new Date('2022-01-01').getTime()
  return date > newDate
}
