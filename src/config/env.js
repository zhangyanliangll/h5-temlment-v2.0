const isDev = process.env.NODE_ENV === 'development';
const notDev = process.env.NODE_ENV !== 'development';
const isTest = process.env.VUE_APP_TITLE === 'test';
const notTest = process.env.VUE_APP_TITLE !== 'test';
const isPro = process.env.NODE_ENV === 'production';
const notPro = process.env.NODE_ENV !== 'production';

module.exports = {
  isDev,
  notDev,
  isTest,
  notTest,
  isPro,
  notPro
}
