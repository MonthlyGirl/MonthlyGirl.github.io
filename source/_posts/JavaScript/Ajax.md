---
title: Ajax
date: 2020-12-17 21:51:02
tags: Ajax
categories: Ajax
coverWidth: 100%
coverHeight: 500
cover: https://api.cyrilstudio.top/bing/image.php/bing?day=-1
top_img: false
author: GuestLjz
---
 ### 1- 什么是ajax
> ajax,异步的JavaScript和XML;是一种实现 **无页面刷新** 获取数据的 **混合技术**;简单来说就是JavaScript执行异步请求

### 2- ajax的原理
> 引例:如,领导想要找小刘汇报工作,于是领导就委托秘书帮忙去叫小刘;然后领导就继续忙自己的工作,直到秘书告诉领导小刘到了,接着 小刘就开始汇报工作了
> ajax请求数据的流程与"领导找小刘汇报工作"相似;其中的核心-->**秘书**,**秘书**相当于 浏览器的XMLHttpRequest对象,当浏览器发出HTTP请求与接收HTTP响应时,浏览器可以接着做其他事情,直到收到xhr返回的数据渲染页面

### 3-ajax的执行流程

如:你想点外卖,首先:
>1. 下载软件
>> var xhr = new XHLHttpRequest() 
>2. 选择商家
>> xhr.open("get/post","url",true)
>>请求方式:get/post/其他,请求地址,同步或异步(默认异步)
>3. 下单
>>xhr.send(); 发送 
>4. 监测外卖小哥的状态(小哥到哪了)
>>即监测ajax的状态和服务端的状态
>>通过xhr.oneadyStateChange事件监测ajax和服务端状态
>>通过readyState来ajax的状态码 
>>xhr.readyState == 4 表示成功
>> 0   表示未初始化,尚未调用open方法
>> 1   启用open方法,数据发送
>> 2   表示已调用open方法 接收到响应
>> 3   表示正在解析
>> 4   表示完成
>>服务端http的状态码 通过status 监测
>> xhr.statue == 200 成功
>> 100   1xx   必须发送请求
>> 200   2xx   数据请求成功
>> 300   3xx   重定向
>> 400   4xx   客户端错误
>> 500   5xx   服务端错误

### 4- 一个完整的ajax
```JavaScript
  const xhr = new XMLHttpRequest()
  xhr.open("get","data.php")
  xhr.send()
  xhr.onreadyStateChange=function(){
    //每次readyState改变的时候都会触发该事件
    //判断readyState 的值是否为4和http的状态码是否为200或200-299
    if(xhr.readyState==4 && /^2\d{2}$/.test(xhr.status)){
      //表示验证通过,可以获取服务端的响应内容
      console.log(xhr.responseText);//打印响应内容
    }
  }
```
#### 4.1- responseText
ajax 对象中的成员,用来记录服务端的响应体内容,获得的响应内容是字符串的形式

### 5- 使用ajax发送携带参数的请求
 + 可以使用ajax发送带参数的请求
 + ajax的请求方式常用的有post和get,可以通过get或post携带参数
#### 5.1- get 请求
 + get 请求发送参数 直接在url 后面 通过 ? 拼接参数  以key=value 的形式  两个参数间使用 & 分割
```JavaScript
  const xhr =new XMLHttpRequest()
  xhr.open("get","data.php?a=100&b=200")
  //携带a和b 这两个参数到后端
  xhr.send()
```
#### 5.1- post 请求
  + post请求携带的参数通过send发送,但必须要设置请求头,告诉服务端数据格式
```JavaScript
  const xhr =new XMLHttpRequest()
  xhr.open("post","data.php")
  xhr.setRequestHeader("content-type', 'application/x-www-form-urlencoded"); //设置数据格式为 key=value 格式
  xhr.send("a=100&b=200")
```
#### 5.2- get和post的区别
  + 从中可以得出get和post两种请求方式的区别
    **get请求**
  + get将参数直接拼接在地址栏中,会造成数据泄露
  + 安全性低
  + 传输数据量小,不能超过2kb
    **post请求**
  + post传参将数据放在请求体中
  + 安全性高
  + 传输数据量大


### 6- 封装一个ajax
```JavaScript

   /* 
      ajax({
         method: 请求方式,
          url: 接口,
          data: {
             name: "123",
              pwd: "11",
          },
          success: function (data) {
             对业务的传递 做业务处理
          }
   })
       
       */
       
function ajax(options){
  const xhr = new XMLHttpRequest()
  //包装数据
  let packDate=""
  for(let key in options.data){
    packDate+="&"+key+"="+options.data[key];
  }
  //判断请求方法
  if(options.method == "get"){
    xhr.open("get",options.url+"?"+packDate.slice(1)+"&now="+new Date().getTime())
    xhr.send()
  }else{
    xhr.open("post",options.url)
     xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
     xhr.send(packDate.slice(1))
  }
  xhr.onreadyStateChange=function(){
    if(xhr.readyState==4 && /^2\d{2}$/.test(xhr.state)){
      let getData=JSON.parse(xhr.responseText){
        if(options.success){
          options.success(getData)
        }
      }
    }
  }
}
  
```


### 7- Ajax解决浏览器缓存问题
  1. 在Ajax发生请求前加上anyAjaxObj.setRequestHeader("If-Modified-Since","0")
  2. 在Ajax发生请求前加上anyAjaxObj.setRequestHeader("Cache-Control","no-cache")
  3. 在URL后面加上一个随机数: "fresh="+Math.random()
  4. 在URL后面加上时间戳:"nowTime="+new Date().getTime()
  5. 如果是jQuery,直接$.ajaxSetup({cache:false})