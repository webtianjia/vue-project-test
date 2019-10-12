export const setLocalStorage = (key, value) => {
  if (!key) return;
  let val = value;
  if (typeof value !== 'string') {
    val = JSON.stringify(value);
  }
  window.localStorage.setItem(key, val);
};

export const getLocalStorage = (key) => {
  if (!key) return;
  return window.localStorage.getItem(key);
};

export const removeLocalStorage = (key) => {
  if (!key) return;
  window.localStorage.removeItem(key);
};

export const setSessionStorage = (key, value) => {
  if (!key) return;
  let val = value;
  if (typeof value !== 'string') {
    val = JSON.stringify(value);
  }
  window.sessionStorage.setItem(key, val);
};

export const getSessionStorage = (key) => {
  if (!key) return;
  return window.sessionStorage.getItem(key);
};

export const removeSessionStorage = (key) => {
  if (!key) return;
  window.sessionStorage.removeItem(key);
};

export const search = (key) => {
  if (!key) return;
  let reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
  let url = window.location.hash == '' ? window.location.search : window.location.hash.substring(window.location.hash.indexOf('?'));
  let r = url.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
};
/*
 * 時間戳轉时间格式
 * */
export const getDate = (time) => {
  let theTime = time.toString();
  if (theTime.length === 10) {
    theTime = theTime * 1000
  }
  let now = new Date(theTime),
    y = now.getFullYear(),
    m = now.getMonth() + 1,
    d = now.getDate();
  return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " " + now.toTimeString().substr(0, 8);
};
/*
 * 校验手机号
 * */
export const checkMobile = (mobile) => {
  if (mobile === '') {
    return false;
  }
  let mobileReg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
  if (mobileReg.test(mobile)) {
    return true;
  } else {
    return false;
  }
};
/*
 * 校验密码
 * */
export const checkPwd = (pwd) => {
  if (pwd.length < 6) {
    return false;
  }
  let pwdReg = /^[\w]{6,12}$/
  if (pwdReg.test(pwd)) {
    return true
  } else {
    return false
  }
}
