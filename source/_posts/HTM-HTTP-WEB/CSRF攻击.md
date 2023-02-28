---
title: CSRF攻击
date: 2021-01-14 08:56:17
tags: HTTP
categories: HTTP
top_img: false
cover: https://bing.ioliu.cn/v1/rand?room=0989
author: guestljz
---
# 什么是CSRF攻击
🍢  CSRF攻击指的是跨站请求伪造攻击,攻击者诱导用户进入一个第三方网站,然后网站向被攻击网站发送跨站请求,如果用户在被攻击网站中保存了登录状态,那么攻击者就可以利用这个登录状态,绕过后台的用户验证,冒充用户向服务器执行一些操作

🍢 CSRF攻击的本质是利用了cookie会在同源请求中携带发送给服务器的特点,以此来实现用户的冒充


# CSRF攻击的分类
  一般的CSRF攻击类型有三种:

🍭 第一种是GET类型的CSRF攻击,比如在网站中的一个 img 标签里构建一个请求,当用户打开这个网站的时候就会自动发起提交

🍭 第二种是POST类型的CSRF攻击,比如说构建一个报单,然后隐藏它,当用户进入页面时,自动提交这个表单

🍭 第三种是链接类型的CSRF 攻击,比如说在a标签的href属性里构建一个请求,然后诱导用的去点击


# 如何防护CSRF 攻击
  CSRF攻击中,重要的一环就是cookie,这一份cookie模拟了用户的身份,所以防范CSRF攻击cookie是一个入手点,恰巧,cookie中有个字段,可以对请求中cookie的携带做一些限制

## 第一种方法从 samSite 入手
  **samSite** ,可设为3个值: **Strict / Lax / None**

🍧 Strict 模式: 浏览器完全禁止第三方请求携带cookie,比如当你访问 ``https://guestljz.gitee.io/`` 这个网站,那么你只能在访问 ``https://guestljz.gitee.io/`` 这个网站中携带cookie,其他网站都不能携带
🍨 Lax 模式: 相对松一点,只能在 get 方法请求表单或者a标签中发送请求时 携带cookie,其他情况不能
🍦 None 模式: 默认情况, 任何请求都会携带cookie

## 第二种方法 验证站点来源
 利用请求头中的 **Origin**和**Refer**
 Origin 中包含了域名信息, Refer中包含的详细的URL路径,以此来验证
 当然了,这些都可以伪造,通过AJAX中自定义请求

## 第三种方法 CSRF Token
首先,浏览器向服务器发送请求时,服务器生成一个字符串,将其植入到返回的页面中
然后浏览器如果要发生请求,就必须带上这个字符串,然后服务器来验证是否合法,如果不合法则不响应.
这个字符串就是CSRF Token 第三方网站无法拿到这个token,因此也就被服务器拒绝