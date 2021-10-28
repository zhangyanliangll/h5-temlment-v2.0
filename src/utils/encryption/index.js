import CryptoJS from 'crypto-js'

/**
 * @description 采用DES对密码进行加密及解密
 */

// DES加密 Pkcs7填充方式
export const encryptByDES = (message, key) => {
  const keyHex = CryptoJS.enc.Utf8.parse(key)
  const encrypted = CryptoJS.DES.encrypt(message, keyHex, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  return encrypted.ciphertext.toString()
}
// DES解密
export const decryptByDES = (ciphertext, key) => {
  const keyHex = CryptoJS.enc.Utf8.parse(key)
  // direct decrypt ciphertext
  const decrypted = CryptoJS.DES.decrypt({
    ciphertext: CryptoJS.enc.Base64.parse(ciphertext)
  }, keyHex, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  return decrypted.toString(CryptoJS.enc.Utf8)
}

/** 密码加密解密示例
 * example
 */

// const _key = 'abcdefghijklmn'
// const _password = '123456'
// 加密
// console.log(this.encryptByDES(_password, _key))
// 解密
// console.log(this.decryptByDES(_password, _key))

// SHA256 加密
export const encryptBySHA256 = (message, key) => {
  const keyHex = CryptoJS.enc.Utf8.parse(key)
  console.log(keyHex);
  let encrypted = CryptoJS.SHA256(message).toString()
  return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(encrypted))
}

// MD5 加密
export const encryptByMD5 = (data, key) => {
  data = key + JSON.parse(JSON.stringify(data)) + key
  return CryptoJS.MD5(data).toString().toUpperCase(); /* toString后会变成Hex 32位字符串*/
}
