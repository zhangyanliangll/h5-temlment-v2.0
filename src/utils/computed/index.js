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
      return fixedNum ? Number(res.toFixed(fixedNum)) : res
    },
    // 减
    minus (...args) {
      const first = args.shift()
      let res = isNaN(first) ? 0 : Number(first) * number
      res = args.reduce((pre, cur) => pre - (Number(cur) || 0) * number, res)
      res = res / number
      return fixedNum ? Number(res.toFixed(fixedNum)) : res
    },
    // 乘
    multiply (...args) {
      const res = multiplyDivide(args)
      return fixedNum ? Number(res.toFixed(fixedNum)) : res
    },
    // 除
    divide (...args) {
      const res = multiplyDivide(args, 'divide')
      return fixedNum ? Number(res.toFixed(fixedNum)) : res
    }
  }
}

// 例子 ---
// import { precisionCompute } from '@/utils/computed/index'
// const { add } = precisionCompute()
