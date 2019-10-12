# vue-manage

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


项目结构
.
├── build                                       // webpack配置文件
├── config                                      // 项目打包路径
├── dist                                        //上线项目文件npm run build后生成放在服务器即可正常访问
├── src                                         // 源码目录
│   ├── components                              // 组件
│   │   ├── breadcrumb                          // 面包屑导航
│   │   │   └── marquee                         //广播轮播组件
│   │   ├── header
│   │   │   └── headers.vue                     // 头部公共组件
│   │   ├── home                                // 项目的母容器
│   │   │   └── .....                           // 各子组件（名称略过）
│   │   ├── login
│   │   │   └── login.vue                       // 登陆
│   ├── assets                                  // 公共资源文件
│   │   └── images                              // 图片文件夹
│   ├── router
│   │   └── index.js                            // 路由配置
│   ├── service                                 // 数据交互统一调配
│   │   └── getData.js                          // 获取数据的统一调配文件
│   ├── store                                   // vuex的状态管理
│   │   ├── modules                             // 配置actions,相关接口请求都在actions中进行
│   │   │   └── user.js                         // user模块相关的数据
│   │   ├── getter.js                           // 全局计算属性数据
│   │   └── index.js                            // 初始化全局Vuex
│   └── utils
│       ├── axios.js                            // 封装的http请求方法
│       └── mixin.js                            // 公用混合工具类
│   ├── App.vue                                 // 页面入口文件
│   ├── main.js                                 // 程序入口文件，加载各种公共组件
│   └── static                                  // 静态资源文件夹
├── index.html                                  // 入口html文件
├── element-variables.scss                      // element自定义主题入口文件
└── package.json                                // .

项目说明

js框架：vue：2.x
UI库：element：2.4.9               http://element-cn.eleme.io/#/zh-CN
字体图标提供：font-awesome：4.7.0   http://fontawesome.dashgame.com/
ajax库：axios：0.18.0              https://www.kancloud.cn/yunye/axios/234845
富文本编辑器：vue-html5-editor：1.1.1 https://github.com/PeakTai/vue-html5-editor
路由：vue-router：3.0.1             https://router.vuejs.org/zh/guide/
状态管理：vuex：3.0.1               https://vuex.vuejs.org/zh/guide/
es6辅助编译：babel-polyfill：6.26.0
css预处理器：sass


ajax使用说明：
  1.在src/utils/axios 里，定义了一个Http类 集成了loading开闭、错误处理，return 一个Promise实例
  2.在src/service/getData里，实例化Http类传入路径等需要的参数，并导出
  3.src/store/modules/user.js里，actions里定义异步方法，并调用getData里的子类方法 return 一个Promise实例
  4.在组件通过this.$store.dispatch()方法调用
  tip：axios里已封装Promise的错误处理，页面调用时，无需判断code，可使用Promise 的 then方法直接处理数据，也可使用async/await,在方法之后直接处理数据
  demo：
    1.      async getAdminList(){
              let res = await this.$store.dispatch('GetAdminList');
              res.adminList.forEach((item, index) => {
                item.is_enabled = item.is_enabled === 0 ? true : false;
              });
              this.tableData = res.adminList;
            },

    2.      this.$store.dispatch('AddAdmin', formData).then(async res => {
              this.addAmdinVisible = false;
              await this.getAdminList();
              this.$message({
                message: '添加成功',
                type: 'success'
              })
            })

