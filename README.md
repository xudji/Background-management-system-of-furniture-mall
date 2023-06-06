# 乐居后台管理项目

## 项目介绍
​		乐居后台管理是基于element-admin-template实现的一套乐居客户端的后台管理系统。后台管理系统包含大屏展示、权限管理、商品管理、订单管理、用户管理、营销管理、内容管理等模块。

## 技术栈

| 技术          | 说明                                                         |
| ------------- | :----------------------------------------------------------- |
| vue           | js前端框架                                                   |
| vue-router    | 官方的路由管理器。它和 Vue.js 的核心深度集成，让构建单页面应用变得易如反掌 |
| vuex          | 一个专为 Vue.js 应用程序开发的状态管理模式                   |
| axios         | 一个基于 promise 的 HTTP 库                                  |
| element-ui    | 一套为开发者、设计师和产品经理准备的基于 Vue 2.0 的桌面端组件库 |
| element-admin | 一个后台前端解决方案，它基于 vue 和 element-ui实现。它使用了最新的前端技术栈，内置了 i18 国际化解决方案，动态路由，权限验证，提炼了典型的业务模型，提供了丰富的功能组件，它可以帮助你快速搭建企业级中后台产品原型 |
| echarts       | 百度开发的一款非常强大的数据可视化工具,可以流畅的运行在 PC 和移动设备上，兼容当前绝大部分浏览器，可高度个性化定制的数据可视化图表 |

  ## 开发运行

  ###  前提

主机上需要`git`及`node环境`

### 运行

  ```shell
# 1. 进入拷贝目录下安装依赖
npm i 
# 2. 运行
npm run dev
  ```


##  目录结构

```
├── build                      // 构建相关  
├── dist                       // 打包相关
├── mock                       // mock 开发时模拟数据
├── node_modules               // 开发依赖包
├── public                     // 公共资源目录
│   ├── index.html             // 首页文件
├── tests                      // 单元测试
├── src                        // 源代码
│   ├── api                    // 所有请求存放目录
│   ├── assets                 // 静态资源存储目录
│   ├── components             // 全局公用组件
│   ├── directive              // 全局指令
│   ├── filtres                // 全局过滤器
│   ├── icons                  // 项目所有 svg icons录
│   ├── layout                 // 全局 layout
│   ├── mixins                 // 全局 mixins
│   ├── router                 // 路由
│   ├── store                  // 全局store管理
│   ├── styles                 // 全局样式
│   ├── utils                  // 全局公用方法
│   ├── view                   // views 所有页面
│   ├── App.vue                // 入口页面
│   └── main.js                // 入口 加载组件 初始化等
│   └── permission.js          // 权限管理
│   └── settings.js            // 其他配置项
├── .env.xxx                   // 环境变量配置
├── .eslintrc.js               // eslint 配置项
├── .babel.config.js           // babel-loader 配置
├── .travis.yml                // 自动化CI配置
├── vue.config.js              // vue-cli 配置
├── postcss.config.js          // postcss 配置
└── package.json               // package.json
```

## 项目在线预览地址

 https://xudji.github.io/joy-home-admin/
