// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill';
import '../theme/index.css'
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'font-awesome/css/font-awesome.css'
import VueHtml5Editor from 'vue-html5-editor'
import {setSessionStorage, getSessionStorage} from '@/utils/mixin'


// import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import router from './router'

import store from './store'
import {Message, MessageBox} from 'element-ui';
Vue.prototype.$message = Message;
Vue.use(ElementUI);
Vue.use(VueHtml5Editor, {
  // 全局组件名称，使用new VueHtml5Editor(options)时该选项无效
  // global component name
  name: "vue-html5-editor",
  // 是否显示模块名称，开启的话会在工具栏的图标后台直接显示名称
  // if set true,will append module name to toolbar after icon
  showModuleName: false,
  // 自定义各个图标的class，默认使用的是font-awesome提供的图标
  // custom icon class of built-in modules,default using font-awesome
  icons: {
    text: "fa fa-pencil",
    color: "fa fa-paint-brush",
    font: "fa fa-font",
    align: "fa fa-align-justify",
    list: "fa fa-list",
    link: "fa fa-chain",
    unlink: "fa fa-chain-broken",
    tabulation: "fa fa-table",
    image: "fa fa-file-image-o",
    hr: "fa fa-minus",
    eraser: "fa fa-eraser",
    undo: "fa-undo fa",
    "full-screen": "fa fa-arrows-alt",
    info: "fa fa-info",
  },
  // 配置图片模块
  // config image module
  image: {
    // 文件最大体积，单位字节  max file size
    sizeLimit: 5120 * 1024,
    // 上传参数,默认把图片转为base64而不上传
    // upload config,default null and convert image to base64
    upload: {
      url: 'https://up-z2.qiniup.com',
      headers: {},
      params: {
        token: getSessionStorage('qiniuToken')
      },
      fieldName: 'file'
    },
    // 压缩参数,默认使用localResizeIMG进行压缩,设置为null禁止压缩
    // compression config,default resize image by localResizeIMG (https://github.com/think2011/localResizeIMG)
    // set null to disable compression
    compress: {
      width: 1600,
      height: 1600,
      quality: 80
    },
    // 响应数据处理,最终返回图片链接
    // handle response data，return image url
    uploadHandler(responseText){
      //default accept json data like  {ok:false,msg:"unexpected"} or {ok:true,data:"image url"}
      var json = JSON.parse(responseText)
      if (!json.key) {
        alert(json.msg)
      } else {
        return getSessionStorage('bucketUrl') + '/' + json.key
      }
    }
  },
  // 语言，内建的有英文（en-us）和中文（zh-cn）
  //default en-us, en-us and zh-cn are built-in
  language: "zh-cn",
  // 自定义语言
  i18n: {
    //specify your language here
    "zh-cn": {
      "align": "对齐方式",
      "image": "图片",
      "list": "列表",
      "link": "链接",
      "unlink": "去除链接",
      "table": "表格",
      "font": "文字",
      "full screen": "全屏",
      "text": "排版",
      "eraser": "格式清除",
      "info": "关于",
      "color": "颜色",
      "please enter a url": "输入地址,图片不可超过5M",
      "create link": "创建链接",
      "bold": "加粗",
      "italic": "倾斜",
      "underline": "下划线",
      "strike through": "删除线",
      "subscript": "上标",
      "superscript": "下标",
      "heading": "标题",
      "font name": "字体",
      "font size": "文字大小",
      "left justify": "左对齐",
      "center justify": "居中",
      "right justify": "右对齐",
      "ordered list": "有序列表",
      "unordered list": "无序列表",
      "fore color": "前景色",
      "background color": "背景色",
      "row count": "行数",
      "column count": "列数",
      "save": "确定",
      "upload": "上传",
      "progress": "进度",
      "unknown": "未知",
      "please wait": "请稍等",
      "error": "错误",
      "abort": "中断",
      "reset": "重置",
      "video": "视频"
    }
  },
  // 隐藏不想要显示出来的模块
  // the modules you don't want
  hiddenModules: [],
  // 自定义要显示的模块，并控制顺序
  // keep only the modules you want and customize the order.
  // can be used with hiddenModules together
  visibleModules: [
    "text",
    "color",
    "font",
    "align",
    "list",
    "link",
    "unlink",
    "tabulation",
    "image",
    "hr",
    "eraser",
    "undo",
    "full-screen",
    "info",
    'video'
  ],
  // 扩展模块，具体可以参考examples或查看源码
  // extended modules
  modules: [
    {
      name: "video",
      icon: "fa fa-video-camera",
      i18n: "video",
      show: true,
      init: function (editor) {
//          alert("time module init, config is \r\n" + JSON.stringify(this.config))
      },
      handler: function (editor) {
        console.log(editor)
        MessageBox.prompt('请输入视频地址', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({value}) => {
          editor.execCommand("insertHTML", '<iframe class="ql-video" frameborder="0" allowfullscreen="true" src="' + value + '"></iframe><h1 class="ql-align-center">')
        }).catch(() => {

        });
      },
      destroyed: function (editor) {
        // alert("time module destroyed")
      }
    },
    {
      //custom module with dashboard.html
      name: "emoji",
      icon: "fa fa-smile-o",
      i18n: "emoji",
      show: true,
      init: function (editor) {
        console.log("emoji module init")
      },
      //vue component
      dashboard: {
        template: "#template-emoji",
        data: function () {
          return {
            symbols: [
              ">_<|||",
              "^_^;",
              "⊙﹏⊙‖∣°",
              "^_^|||",
              "^_^\"",
              "→_→",
              "..@_@|||||..",
              "…(⊙_⊙;)…",
              "o_o ....",
              "O__O",
              "///^_^.......",
              "?o?|||",
              "( ^_^ )? ",
              "(+_+)?",
              "（?ε?）? ",
              "o_O???",
              "@_@a",
              "一 一+",
              ">\"<||||",
              "‘(*>﹏<*)′"
            ]
          }
        },
        methods: {
          insertSymbol: function (symbol) {
            //$parent is editor component instance
            this.$parent.execCommand("insertHTML", symbol)
            console.log(symbol)
          }
        }
      }
    }
  ]
})

Date.prototype.Format = function (fmt) { //author: meizz 
  var o = {
    "M+": this.getMonth() + 1, //月份 
    "d+": this.getDate(), //日 
    "h+": this.getHours(), //小时 
    "m+": this.getMinutes(), //分 
    "s+": this.getSeconds(), //秒 
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
    "S": this.getMilliseconds() //毫秒 
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
  if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}


Vue.config.productionTip = false
/* 全局路由守卫，没ID或者token时，强制定位login */
router.beforeEach((to, from, next) => {
  let token = getSessionStorage('token');
  let uid = getSessionStorage('uid');
  if ((token && uid) || to.path.indexOf('/login') !== -1) {
    next();
  } else {
    next('/login');
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
