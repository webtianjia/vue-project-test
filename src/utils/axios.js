import axios from 'axios';
import router from '@/router';

import {
  setSessionStorage,
  getSessionStorage,
  removeSessionStorage
} from '@/utils/mixin';
import {Loading,Message} from 'element-ui'

let loadingInstance;
class Http {
  constructor() {
    this.Domain = 'http://123.207.88.200:9001/qidianSystem';
  }

  require(options) {
    if (!options.api) throw new Error('api 不能为空');
    if (!options.param) {
      options.param = {}
    }

    if (!options.methods) {
      options.methods = 'POST'
    }
     //不传递方法默认为POST
    if (!options.loadingVisble) {
      options.loadingVisble = true
    }
     // 不传递默认开启loading
    if (!options.loadingText) {
      options.loadingText = '加载中...'
    }

    loadingInstance = Loading.service(options);
    axios.defaults.timeout =  10000;
    return new Promise((resolve, reject) => {
      return axios({
        method: options.methods,
        url: options.api,
        baseURL: this.Domain,
        headers: {
          'Content-Type':'application/json',
          'token':getSessionStorage('token'),
          'uid':getSessionStorage('uid'),
          'terminal-Type':'2'
        },
        data: options.param
      }).then(response => {
        loadingInstance.close();
        if (response.data.code === 0) { //请求成功
          return resolve(response.data.data)
        } else {
          // if (response.data.code === 2) { //未登录
          //   //   router.push('/Login')
          // }
          Message({
            message:response.data.message,
            type:'error',
          });
          return reject(response.data)
        }
      }, error => {
        Message({
          message:'网络错误,请刷新重试',
          type:'error',
        });
        loadingInstance.close();
        return reject(error)
      })
    })
  }
}

export default Http;
