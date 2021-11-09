// scrollTop animation
export const scrollTop = (el, from = 0, to, duration = 500, endCallback) => {
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame =
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) {
        return window.setTimeout(callback, 1000 / 60);
      };
  }
  const difference = Math.abs(from - to);
  const step = Math.ceil((difference / duration) * 50);

  function scroll (start, end, step) {
    if (start === end) {
      endCallback && endCallback();
      return;
    }
    let d = start + step > end ? end : start + step;
    if (start > end) {
      d = start - step < end ? end : start - step;
    }

    if (el === window) {
      window.scrollTo(d, d);
    } else {
      el.scrollTop = d;
    }
    window.requestAnimationFrame(() => scroll(d, end, step));
  }
  scroll(from, to, step);
};

// 清空cookie
export const cleanCookie = () => {
  let date = new Date();
  date.setTime(date.getTime() - 10000);
  // eslint-disable-next-line no-useless-escape
  let keys = document.cookie.match(/[^ =;]+(?=\=)/g);
  console.log('需要删除的cookie名字：' + keys);
  if (keys) {
    for (let i = keys.length; i--;) document.cookie = keys[i] + '=0; expire=' + date.toGMTString() + '; path=/';
  }
}

// 设置cookie
export const setCookie = (name, value) => {
  document.cookie = name + '=' + escape(value);
};

// 是否是微信
export function isWxAgent () {
  let browser = navigator.userAgent.toLowerCase();
  if (browser.match(/MicroMessenger/i) == 'micromessenger') {
    return true;
  } else {
    return false;
  }
}

// 是否是 安卓
export const isAndroid = () => {
  let u = navigator.userAgent;
  let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
  return isAndroid;
};

// 是否是 ios
export const isiOS = () => {
  let u = navigator.userAgent;
  let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  return isiOS;
};

/**
 * 函数节流
 * @param fn
 * @param interval
 * @returns {Function}
 * @constructor
 */
export const Throttle = (fn, t) => {
  let last;
  let timer;
  let interval = t || 500;
  return function () {
    let args = arguments;
    let now = +new Date();
    if (last && now - last < interval) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        last = now;
        fn.apply(this, args);
      }, interval);
    } else {
      last = now;
      fn.apply(this, args);
    }
  };
};

/**
 * 函数防抖 (只执行最后一次点击)
 * @param fn
 * @param delay
 * @returns {Function}
 * @constructor
 */
export const Debounce = (fn, t) => {
  let delay = t || 500;
  let timer;
  return function () {
    let args = arguments;
    if (timer) {
      console.log(timer);
    } else {
      fn.apply(this, args);
      timer = setTimeout(() => {
        timer = null;
        clearTimeout(timer);
      }, delay);
    }
  };
};
