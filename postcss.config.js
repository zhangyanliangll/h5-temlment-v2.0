const path = require('path');
module.exports = ({ file }) => {
  const designWidth = file.dirname.includes(path.join('node_modules', 'vant')) ? 375 : 750;
  return {
    plugins: {
      autoprefixer: {},
      'postcss-px-to-viewport': {
        viewportWidth: designWidth,  // 设计稿宽度
        viewportHeight: 1334, // 设计稿高度，可以不指定
        unitPrecision: 3,     // 指定`px`转换为视窗单位值的小数位数
        viewportUnit: 'vw',   // 指定需要转换成的视窗单位，建议使用vw
        selectorBlackList: ['.ignore'],// 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
        minPixelValue: 1,     // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
        mediaQuery: false,     // 允许在媒体查询中转换`px`
        exclude: [/node_modules/] // 设置忽略文件，用正则做目录名匹配
      }
    }
  }
}
