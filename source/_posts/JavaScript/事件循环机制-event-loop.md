---
title: 事件循环机制 event loop
date: 2020-12-29 14:52:03
tags: eventLoop
categories: JavaScript
coverWidth: 100%
coverHeight: 500
cover: https://api.cyrilstudio.top/bing/image.php/bing?day=2
top_img: false
author: gurstljz
---
### 为什么会有Event Loop
JavaScript 中的任务分为**同步任务**和**异步任务**
JavaScript 是一门单线程非阻塞语言,单线程代表它在执行任务时都只有一个主线程去执行任务,主线程中的任务称为同步任务
而非阻塞是当代码需要进行一项异步任务,无法立刻返回结果,需要花一定时间才能返回任务的时候,主线程会挂起这个任务,然后在异步任务返回结果的时候再往下执行相应的回调

>
>+ 什么是同步?
>  > 同步任务是直接放在主线程上排队依次执行
>+ 什么是异步
>  > 异步任务不进入主线程、而,进入"任务队列"（task queue）的任务，只有等主线程任务>执行完毕，"任务队列"开始通知主线程，请求执行任务，该任务才会进入主线程执行。

那JavaScript又是如何实现"非阻塞"呢?---->答案:event loop


#### 什么是执行栈
+ 当代码执行时,js会生成一个相应的执行环境(context)又叫执行上下文
+ 执行环境(即执行上下文中)存在着执行代码的的私有作用域,上层作用域的指向,方法的参数,这个作用域中定义的变量以及这个作用域的this对象等等
+ 而当这一系列了方法被依次调用的是,因为js是单线程的,同一时间只能执行一个方法,于是这些方法被排队在一个单独的地方,这个地方被称为执行栈


#### 什么是event loop
```txt

因为 js 是单线程运行的，在代码执行的时候，通过将不同函数的执行上下文压入执行栈中来保证代码的有序执行。

在执行同步代码的时候，如果遇到了异步事件，js 引擎并不会一直等待其返回结果，而是会将这个事件挂起，继续执行执行栈中的其他任务。当异步事件执行完毕后，再将异步事件对应的回调加入到与当前执行栈中不同的另一个任务队列中等待执行。
任务队列可以分为宏任务对列和微任务对列，当当前执行栈中的事件执行完毕后，js 引擎首先会判断微任务对列中是否有任务可以执行，如果有就将微任务队首的事件压入栈中执行。
当微任务对列中的任务都执行完成后再去判断宏任务对列中的任务。

微任务包括了 promise 的回调,promise中的.then()、node 中的 process.nextTick 、对 Dom 变化监听的 MutationObserver。

即只有微任务执行完毕后才能执行宏任务,而一个宏任务中包含着多个微任务

宏任务包括了 script 脚本的执行、setTimeout ，setInterval ，setImmediate 一类的定时事件，还有如 I/O 操作、UI 渲染等。
```