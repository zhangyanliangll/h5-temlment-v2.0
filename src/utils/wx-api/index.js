/* eslint-disable no-undef */
// import { api_getWxConfig } from '@/api';
import { Toast } from 'vant';

export async function initWXConfig (allowApi) {
  let url = window.location.href.split('#')[0];
  let wxconfig = await api_getWxConfig({
    url,
  });
  let jssdk = wxconfig.wxconfig;
  wx.config({
    // debug: process.env.NODE_ENV === 'production' ? false : true,
    appId: jssdk.appId,
    timestamp: jssdk.timestamp,
    nonceStr: jssdk.nonceStr,
    signature: jssdk.signature,
    // debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    // appId: '', // 必填，公众号的唯一标识
    // timestamp: , // 必填，生成签名的时间戳
    // nonceStr: '', // 必填，生成签名的随机串
    // signature: '',// 必填，签名
    jsApiList: allowApi,
  });

  wx.ready(() => {
    // config后就会执行 不管是不是成功
  });
  wx.error((res) => {
    alert('出错了：' + res.errMsg); //这个地方的好处就是wx.config配置错误，会弹出窗口哪里错误，然后根据微信文档查询即可。
  });
}

export function scanQRCode (type = 1) {
  return new Promise((resolve, reject) => {
    wx.ready(() => {
      wx.scanQRCode({
        // 微信扫一扫接口
        desc: 'scanQRCode desc',
        needResult: type, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
        success: (res) => {
          let result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
          resolve(result);
        },
        fail: (error) => {
          Toast('请重试');
          setTimeout(() => {
            window.location.reload(true);
          }, 500);
          reject({
            scan: false,
            error,
          });
        },
      });
    });
  });
}

// 分享config
export async function initWXShareConfig (shareConfig) {
  let url = window.location.href.split('#')[0];
  let wxconfig = await api_getWxConfig({
    url,
  });
  let jssdk = wxconfig.wxconfig;
  wx.config({
    debug: process.env.NODE_ENV === 'production' ? false : true,
    appId: jssdk.appId,
    timestamp: jssdk.timestamp,
    nonceStr: jssdk.nonceStr,
    signature: jssdk.signature,
    jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData'],
  });

  wx.ready(() => {
    // 自定义“分享给朋友”及“分享到QQ”按钮的分享内容（1.4.0）
    wx.updateAppMessageShareData({
      title: shareConfig.title, // 分享标题
      desc: shareConfig.desc, // 分享描述
      link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: shareConfig.imgUrl, // 分享图标
      success: () => {
        // 设置成功
      },
      fail: (error) => {
        console.log(error);
      },
    });
    // 自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容（1.4.0）
    wx.updateTimelineShareData({
      title: shareConfig.title, // 分享标题
      desc: shareConfig.desc, // 分享描述
      link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: shareConfig.imgUrl, // 分享图标
      success: () => { },
      fail: (error) => {
        console.log(error);
      },
    });
  });
  wx.error((res) => {
    alert('出错了：' + res.errMsg); //这个地方的好处就是wx.config配置错误，会弹出窗口哪里错误，然后根据微信文档查询即可。
  });
}

// 获取本地图片id
export function chooseImage () {
  return new Promise((resolve, reject) => {
    wx.ready(() => {
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: (res) => {
          let localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
          resolve(localIds);
        },
        fail: (error) => {
          reject({
            chooseImage: false,
            error,
          });
        },
      });
    });
  });
}
// 获取本地图片接口
export function getLocalImgData () {
  return new Promise((resolve, reject) => {
    wx.ready(() => {
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: async (res) => {
          let localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片

          let imgDataArray = localIds.map((id) => {
            return new Promise((resolve) => {
              wx.getLocalImgData({
                localId: id, // 图片的localID
                success: (res) => {
                  resolve(res.localData); // localData是图片的base64数据，可以用img标签显示
                },
              });
            });
          });
          let results = await Promise.all(imgDataArray);
          resolve(results[0]);
        },
        fail: (error) => {
          reject({
            chooseImage: false,
            error,
          });
        },
      });
    });
  });
}

// 预览图片接口
export function previewImage (option) {
  wx.ready(() => {
    wx.previewImage({
      current: option.current, // 当前显示图片的http链接
      urls: option.urls, // 需要预览的图片http链接列表
    });
  });
}

// 预览坐标
export function getLocation () {
  return new Promise((resolve) => {
    wx.ready(() => {
      wx.getLocation({
        type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
        success: function (res) {
          // var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
          // var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
          // var speed = res.speed; // 速度，以米/每秒计
          // var accuracy = res.accuracy; // 位置精度
          resolve(res);
        },
      });
    });
  });
}

// 获取当前定位
export function openLocation (option) {
  return new Promise(() => {
    wx.ready(() => {
      let defaultOptions = {
        latitude: 0, // 纬度，浮点数，范围为90 ~ -90
        longitude: 0, // 经度，浮点数，范围为180 ~ -180。
        name: '', // 位置名
        address: '', // 地址详情说明
        scale: 1, // 地图缩放级别,整形值,范围从1~28。默认为最大
        infoUrl: '', // 在查看位置界面底部显示的超链接,可点击跳转
      };
      let obj = Object.assign(defaultOptions, option);
      wx.openLocation(obj);
    });
  });
}

// 获取当前定位
export function WXPay ({ timestamp = 0, nonceStr = '', signType = '', paySign = '' } = options) {
  return new Promise((resolve, reject) => {
    wx.ready(() => {
      wx.chooseWXPay({
        timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
        nonceStr, // 支付签名随机串，不长于 32 位
        package: option.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
        signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
        paySign, // 支付签名
        success: function (res) {
          // 支付成功后的回调函数
          resolve(res);
        },
        fail: function (err) {
          reject(err);
        },
      });
    });
  });
}
