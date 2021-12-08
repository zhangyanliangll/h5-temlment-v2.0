export const toFixedPlus = function (num, n) {
  n = n ? n : 0  // 保留的小数位数
  num = num + ''
  let sign = ''
  //去符号
  if (num.indexOf('-') > -1 || num.indexOf('+') > -1) {
    sign = num.substr(0, 1)  //符号
    num = num.substr(1, num.length - 1)
  }
  num = num * Math.pow(10, n) + ''
  //小数点后面的数字是否大于等于5，是 进1
  const i = num.indexOf('.')
  if (i > -1) {
    if (num.substr(i + 1, 1) >= 5) {
      num = 1 + num * 1 //转为数字运算 否则会进行字符串运算
    }
  }
  num = Math.floor(num)
  let result = sign + num / Math.pow(10, n)
  result += '' + new Array(n + 1).join('0')  //位数不够的 补0
  const dot_index = result.indexOf('.')
  const int_part = result.substr(0, dot_index)
  const dot_part = result.substr(dot_index + 1, n)
  return int_part + '.' + dot_part
}


/**
 *
 * @param {Array}  args 参与乘除计算项数组
 * @param {String} type 乘multiply(默认值)/除divide
 */
function multiplyDivide (args, type = 'multiply') {
  const first = args.shift()
  let res = Number(first) || 0
  const isMultiply = type === 'multiply'
  if (res) {
    try {
      res = args.reduce((pre, cur) => {
        cur = Number(cur) || 0
        if (!cur) {
          throw new Error('计算项非有效数值')
        } else {
          return isMultiply ? pre * cur : pre / cur
        }
      }, res)
    } catch (err) {
      res = 0
    }
  }
  return res
}

/**
 * 用于计算并处理精度问题
 * @param {Number} fixedNum // 保留小数位,为0时不调用toFixed
 * @param {Number} powNum  // 计算工具数用来保证计算精度
 */
export function precisionCompute (fixedNum = 2, powNum = 3) {
  const number = Math.pow(10, powNum)
  return {
    // 加
    add (...args) {
      let res = args.reduce((pre, cur) => pre + (Number(cur) || 0) * number, 0)
      res = res / number
      return fixedNum ? Number(toFixedPlus(res, fixedNum)) : res
    },
    // 减
    minus (...args) {
      const first = args.shift()
      let res = isNaN(first) ? 0 : Number(first) * number
      res = args.reduce((pre, cur) => pre - (Number(cur) || 0) * number, res)
      res = res / number
      return fixedNum ? Number(toFixedPlus(res, fixedNum)) : res
    },
    // 乘
    multiply (...args) {
      const res = multiplyDivide(args)
      return fixedNum ? Number(toFixedPlus(res, fixedNum)) : res
    },
    // 除
    divide (...args) {
      const res = multiplyDivide(args, 'divide')
      return fixedNum ? Number(toFixedPlus(res, fixedNum)) : res
    }
  }
}

// 例子 ---
// import { precisionCompute } from '@/utils/computed/index'
// const { add } = precisionCompute()
