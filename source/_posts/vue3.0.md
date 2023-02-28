---
title: vue3.0
date: 2021-04-01 21:59:31
tags: vue3.0 Compiler
categories: Vue
cover:  https://bing.ioliu.cn/v1/rand?room=22333
top_img: false
author: GuestLjz
---
# Vue3.0的新特性及Vue3.0带来的新变化
vue3.0 2020年9月发布,命名为One p
## Vue3.0 带来的新变化
+ 性能的提升 1.3~2x
与vue2.x相比,mount 50%提升,内存占用小120%
核心代码+ Composition API:13.5kb,最小11.75kb  可以单独使用
所有的runtime:22.5kb(vue2是32kb)

# 为什么会有这么大的性能提升?
## Compiler 原理
1. 静态的节点和静态绑定的class和id不再作更新处理(hoistStatic->SSR优化)
2. 结合打包标记PatchFlag,进行更新分析
在编译过程中会将template编译成ast语法树,ast是一个抽象的语法树,动态的内容打上标记,在更新的时候只更新动态的内容
3. 事件监听器Cache缓存处理(cacheHandlers)
4. hoistStatic 自动针对多静态节点进行优化,输出字符串