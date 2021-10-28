// 金额千分位
export function moneyFormat (num) {
  return (+num || 0)
    .toString()
    .replace(/^-?\d+/g, (m) => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

// 身份证隐藏
export function idCardFormat (card) {
  const length = card.length
  if (length < 12) {
    let str = ''
    for (let i = 0; i < length; i++) {
      str += '*'
    }
    return str
  } else {
    const dif = length - 11
    let str = ''
    for (let i = 0; i < length; i++) {
      if ((i < dif && i < 4) || i > 14) {
        str += card[i]
      } else {
        str += '*'
      }
    }
    return str
  }
}

// 手机隐藏
export function phoneFormat (phone) {
  const length = phone.length
  if (length < 5) {
    let str = ''
    for (let i = 0; i < length; i++) {
      str += '*'
    }
    return str
  } else {
    const dif = length - 4
    let str = ''
    for (let i = 0; i < length; i++) {
      if ((i < dif && i < 3) || i > 6) {
        str += phone[i]
      } else {
        str += '*'
      }
    }
    return str
  }
}

/**
 *  获取当前的日期：星期一，星期二，星期三 ....
 * @param {*} val | 时间
 * @returns
 */
export function dateDayFormat (val) {
  const weeks = new Array('星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六');
  const day = new Date(val).getDay();
  return weeks[day]
}

// 对象属性排序
export const objKeySort = (obj) => {//排序的函数
  let newkey = Object.keys(obj).sort();
  //先用Object内置类的keys方法获取要排序对象的属性名，
  //再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
  let newObj = {};//创建一个新的对象，用于存放排好序的键值对
  for (let i = 0; i < newkey.length; i++) {//遍历newkey数组
    if (obj[newkey[i]]) { // 空值 除外
      newObj[newkey[i]] = obj[newkey[i]];//向新创建的对象中按照排好的顺序依次增加键值对
    }
  }
  return newObj;//返回排好序的新对象
}
