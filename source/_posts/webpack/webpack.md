---
title: webpack
date: 2021-01-19 10:17:17
tags: Webpack
top_img: false
categories: webpack
cover:  https://bing.ioliu.cn/v1/rand?room=wed
author: guestljz
---
### 如何理解webpack
1. 是一个打包器,作用是把前端模块编译成浏览器能够识别的HTML+CSS+JS
2. 在webpack眼中,一起皆模块
3. 四个入门级的核心概念:入口entry / 出口output / loader / plugin
4. webpack可以做哪些事? 一是构建开发环境,一个上线打包


### 使用webpack  
+ npm install webpack -g   核心api包
+ npm install webpack -D
+ npm install webpack-cli -g    命令行包
+ npm install webpack-cli -D
+ 执行命令 webpack  会自动读取webpack.config.js文件
+ 默认情况,webpack会自动读取src目录下的index文件为入口文件,将dist作为出口文件
+ webpack --config xxx.js   手动指定配置文件
+ 配置package.json  "build": "webpack --config webpack.config.js"
+ mode 配置当前环境是生产环境还是开发环境   production  devlopment


# 适用于webpack5.15环境,随着官方文档的更新,配置内容也不一样

### 简单的使用
+ 建立文件夹 src/main.js
+ 配置文件 webpack.config.js
```javascript
module.exports = {
  mode:'production'
  entry:{
   app: path.resolve(__dirname,'./src/main.js')   //入口文件
  }
  output:{              //出口文件
    filename:'[name].[chunkhash].js'   
    path:path.resolve(__dirname,'./abc')
  }
}
```


### 构建本地服务器

+ npm install webpack-dev-server -D


```javascript
devServer:{
  port:8078,
  contentBase:path.resolve(__dirname,'./public')
}
```

### 自动打开浏览器
```
在package.json中的 "serve":"webpack --open --config webpage.config.js"
运行时 webpack serve --open
或者在devServer中 添加open:true
```

### plugins 
+ HTMLwebpackplugin
+ 作用:使用它把入口文件和public中的index.html结合起来

+ 安装
+ npm  install html-webpack-plugin -D

```javascript
plugins:[
  new HtmlWebpackPlugin({
    template:path.resolve(__dirname,'/public/index.html')
  })
]
```

plugin是一个数组,参数是个选项,


### 每次打包自动清除dist文件下的文件
```
npm install clean-webpack-plugin -D
```

### 热更新
```
在src里面热更新
在devServer中加上hot:true ,加上热更新
原理:实际上是建立了一个webSocket长链接
```

### Cross-env

 跨平台设置和使用环境变量的脚本(判断当前环境是生产环境还是开发环境)
 + 用法
 在npm脚本中使用
 ```javascript
 {
   "scripts"：{
      "build"："cross-env NODE_ENV=development webpack --config build / webpack.config.js" ,
      "serve":"ross-env NODE_ENV=production webpack serve --config webpack.config.js "
  } 
}
 ```
设置了一个NODE_ENV变量用于判断 当前环境
使用 process.env.NODE_ENV 获取
process.env.NODE_ENV === 'development'

+ 执行 npm run build  打包上线  生产环境
+ 执行 npm run serve  本地服务   开发环境


### babel 将es6 转换成es5
+ 安装
```
npm install babel-loader -D   用于加载.js文件
npm install @babel/core -D         babel核心库  
npm install @babel/preset-env -D   一个具体的babel编译器  把es6转成es5
```
+ 使用 

添加babel.config.json文件,给babel编译器使用的,用于更加精细地指定js编译细节
添加一下内容
preset  用于指定当前环境中所使用的js主版本/如:ts,jsx等/默认es6/
plugin  用于指定特殊的js语法的编译功能  配合修复主版本中的漏洞
```javascript
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "esmodules": true
        }
      }
    ]
  ]
}
```

+ 在module中添加一条规则
test: 使用正则表达式匹配是否是.js文件
use:使用babel-loader编译
exclude: /(node_modules|bower_components)/, 排除node_modules里的文件

```javascript
  module:{
    rules:[
      { test:/\.m?js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-object-rest-spread']  
          }
        }
      }
    ]
  }
```

因为babel分成许多版本,presets 中是使用哪个版本解析  plugins是修复版本的bug





### 加载css / scss
+ 安装 
```
安装scss

npm install sass-loader -D
npm install sass -D     

安装css-loader 和style-loader

npm install --save-dev style-loader css-loader
```
+ 使用 
```javascript
module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // 将 JS 字符串生成为 style 节点
          "style-loader",
          // 将 CSS 转化成 CommonJS 模块
          "css-loader",
          // 将 Sass 编译成 CSS
          "sass-loader",
        ],
      },
    ],
  },
};
最后通过你喜欢的方式运行webpack。

```

### ts-loader  转换ts
+ 安装
```
yarn add ts-loader --dev
```
+ 创建一个tsconfig.json文件
```
{
  "compilerOptions": {
    "sourceMap": true   //找到ts文件代码
  }
}
```
+ 匹配规则
```
test:{/\.ts$/,loader:'ts-loader'}
```

### eslint的使用
+ 安装
+ 使用
配置在开发环境中
追加一条规则
config.module.rules.push({
 test:
 use:
 exforce:pre  
})
exforce:pre  pre表示前置执行,代表Eslint最先执行,没有错误后材质西ing之后的打包工作

+ 配置eslint 文件
在根目录下添加 .eslintrc.json 

eslint检测代码三种规则
+ error  违背规则报错   简写2
+ warn   违背规则警告      1
+ off    违背规则关闭

+ 在DevServer中加上覆盖层
使用overlay选项


### 忽略eslint的检查
两种种方案
1. 修改eslint规则
2. 使用eslint的各种注释,临时关闭
例如:
/*eslint-disable*/  
//在这中间的代码都不检查
/*eslint-enable*/


### 解析路径
+ resolve

使用resolve下的属性
alias:{
 '@': path.resolve(__dirname,'./src')
},
extensions:['.js','.jsx']  //忽略后缀,导入时可以不写.js和.jsx的后缀


### 搭建react环境
+ 安装库  React  -S  React-Dom
ReactDom.render(,document.getElementById("app"))

jsx react官方语法糖
