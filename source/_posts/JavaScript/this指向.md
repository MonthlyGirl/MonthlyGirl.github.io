---
title: this指向
date: 2021-02-27 14:31:25
tags: this
categories: JavaScript
cover: https://api.cyrilstudio.top/bing/image.php/bing?day=4
top_img: false
author: GuestLjz
---

# this指向问题
this是一个使用在作用域里面的关键字
this的指向只跟函数调用有关
+ 在全局中使用this,this === window ,this指向全局,但很少在全局中使用
+ 一个函数的this指向只和函数的调用有关(箭头函数除外),不管怎么定义,在哪定义,分以下几种情况
  1. 函数在全局中调用,那么this就指向全局
  2. 对象调用,this就指向当前对象
  3. 事件处理函数,this指向事件源
  4. 定时器处理函数,this指向window

# 强行改变this指向
在ES5的函数中使用this,因为当不同的函数在不同的作用域中调用,this的指向也就不一样,通常需要强行改变this指向,改变this指向可以通过以下三种方法 
## 1. call()
  - 直接在函数名后面使用
  - 正常调用方式: fn(),obj.fn()
  - 强行改变this指向方式: fn.call(),obj.call()
  - 参数(两个参数及以上)
    call(参数1,参数2...)
    第一个参数表示: this要指向哪里,不传或传null,表示this指向window
    第二个参数开始:传递给函数的参数,供函数内部使用
  - 作用: 改变函数内部的this指向
  - 特点: 会直接调用函数,函数会被立即执行

## 2. apply()
   使用方式与call一样
   - 参数:
     apply(参数1,参数2)
     第一个参数表示:改变this指向的对象,不传或传null,表示this指向window
     第二个参数:是一个数组或伪数组,数组中存放传递给函数 的参数,供函数内部使用
   - 作用:改变函数内部的this指向,函数会被立即执行
   - 特点: 改变函数传参的方式

## 3. bind()
  使用方式和前两个一样,参数与call一样
  - 作用: 改变函数内部this指向,函数不会被立即执行
  - 特点: 
    不会直接调用函数,返回一个新函数,这个新函数中的this指向已经改变,在我们需要时调用执行即可
    bind改变过后,this指向不会再改变了

