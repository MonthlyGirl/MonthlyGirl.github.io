---
title: 如何实现一个new
date: 2021-01-25 09:05:55
tags: javascript
categories: JavaScript
cover: https://bing.ioliu.cn/v1/rand?room=767
top_img: false
author: guestljz
---

### new 一个对象的时候发生了什么

```javascript
function Person(name,age){
  this.name=name
  this.age=age
}
let p = new Person('guestljz',18)
```
 new一个对象的四个过程
1. 创建一个空对象
```
let obj={}
```
2. 让构造函数中的this指向新对象,并指向构造函数的函数体
```
let result = Person.call(obj)
```
3. 设置新对象的__proto__属性指向构造函数的原型对象
```
obj.__proto__=Person.prototype
```
4. 判断构造函数的返回值类型,如果是值类型,则返回新对象,如果是引用类型,就返回这个引用类型的对象
```
if(typeof(result)=='Object')
  p = result;
else
  p = obj
```