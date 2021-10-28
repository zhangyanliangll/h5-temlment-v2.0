// 校验是否是数值类型
export function checkNumber (rule, value, callback, root) {
  console.log(root)
  if (value && isNaN(Number(value))) {
    callback(new Error('必须为数值'))
  }
  callback()
}

// 校验不能为负值
export function checkNegativeNumber (rule, value, callback, root) {
  console.log(root)
  if (value && Number(value) < 0) {
    callback(new Error('数值不能小于0'))
  }
  callback()
}

// 校验是否大于0的数值
export function checkPositiveNumber (rule, value, callback, root) {
  console.log(root)
  if ((value === 0) || (value && Number(value) <= 0)) {
    callback(new Error('数值必须大于0'))
  }
  callback()
}

// 校验小数点, 最多两位
export function checkPoint (rule, value, callback, root) {
  console.log(root)
  if (value && (Number(value) < 0 ? !/^\d+(\.\d{1,2})?$/.test((-Number(value)).toString()) : !/^\d+(\.\d{1,2})?$/.test(value.toString()))) {
    callback(new Error('最多两位小数'))
  }
  callback()
}

// 校验范围 first:[0,100] second:[0,100) third(0,100] fourth(0,100)
export function checkRange (rule, value, callback, model = 'first', root) {
  console.log(root)
  model = ['first', 'second', 'third', 'fourth'].includes(model) ? model : 'first'
  const rangeObj = {
    first: {
      valid: Number(value) > 100 || Number(value) < 0,
      message: '取值范围[0,100]'
    },
    second: {
      valid: Number(value) >= 100 || Number(value) < 0,
      message: '取值范围[0,100)'
    },
    third: {
      valid: Number(value) > 100 || Number(value) <= 0,
      message: '取值范围(0,100]'
    },
    fourth: {
      valid: Number(value) >= 100 || Number(value) <= 0,
      message: '取值范围(0,100)'
    },
  }
  const { valid, message } = rangeObj[model]
  if (valid) {
    callback(new Error(message))
  }
  callback()
}

// 校验联系电话
export function checkPhone (rule, value, callback, root) {
  console.log(root)
  if (value && !/^[0-9\-()（）]+$/g.test(value)) {
    callback(new Error('请输入正确的联系电话'))
  }
  callback()
}

// 身份证号码
export function checkCertificateNumber (rule, value, callback, root) {
  console.log(root)
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/ // 结尾可以为数字或者字母x
  if (value && !reg.test(value.toString())) {
    callback(new Error('请输入正确的身份证号'))
  }
  callback()
}

// 邮箱
export function email (rule, value, callback, root) {
  console.log(root)
  // eslint-disable-next-line no-useless-escape
  let mal = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if (!value) {
    return callback(new Error('不能为空'));
  }
  if (!(mal.test(value))) {
    callback(new Error('请输入正确邮箱'));
  } else {
    callback();
  }
}

// 开始时间
export function startTime (rule, value, callback, root) {
  console.log(root)
  if (!value) {
    return callback(new Error('请选择开始日期'));
  } else {
    callback();
  }
}

// 结束时间
export function endTime (rule, value, callback, root) {
  console.log(root)
  if (!value) {
    return callback(new Error('请选择结束日期'));
  } else {
    callback();
  }
}

// 整数
export function checkInterNum (rule, value, callback, root) {
  console.log(root)
  const reg = /^[0-9]*[1-9][0-9]*$/
  if (!reg.test(value)) {
    return callback(new Error('请输入整数'))
  } else {
    callback()
  }
}

/** 额外传参 示例
 * {
        validator: (rule, value, callback) => {
          checkRange(rule, value, callback, 'second')
        },
        trigger: 'blur'
      }
*/
