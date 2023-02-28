---
title: Css
date: 2021-01-27 21:48:02
tags: CSS
top_img: false
toc_number: true
cover: https://bing.ioliu.cn/v1/rand?room=1233
author: guestljz
---

## 标准的CSS 盒模型 和 低版本IE 盒模型的区别

👉 两种盒模型分为: W3C标准盒模型(content-box) 和 IE盒模型(border-box)
👉 盒模型: content(内容) padding(填充)  margin(边界)  border(边框)

💁🏼 IE盒模型和W3C标准盒模型的区别: 
  1. w3c标准盒模型它的width和height 只包含 content 不包括padding 和border
  2. IE盒模型它的width和height 包含content 和 padding 和 border,指的是content+padding+border

🟣 在IE8+ 的浏览器中 我们可以通过box-sizing 改变盒模型,默认为content-box



## ::before 和 :after 中的双冒号和单冒号有什么区别呢?

📌 单冒号(:) 用于css3伪类,双冒号(::)用于css3 伪元素(伪元素由双冒号和伪元素名称组成)

📌 双冒号是在当前规范中引入的,用于区分伪类和伪元素 伪类兼容已有的伪元素的写法,在一些浏览器中也可以使用单冒号的写法 ,新的css3中引入的伪元素则不允许单冒号的写法

🟡 伪类一般匹配的是元素的一些特殊状态,如hover / link 等,而伪元素一般匹配的特殊位置,比如 after / before等


## 伪元素和伪类的区别

➜ 伪类用于当已有的元素处于某个状态时,为其添加对应的样式,这个状态时根据用户行为而动态变化的. 比如说,当用户悬停在指定的元素时,我们可以通过 :hover 来描述这个元素的状态

➜ 伪元素用于创建一些不在文档树中的元素,并为其添加样式, 它们允许我们为元素的某些部分设置样式. 比如说,我们可以通过 ::before 俩在一个元素前增加一些文本,并为这些文本添加样式. 虽然用户可以看到这些文本,但是这些文本实际上不在文档树中

🔵 总的来说: css引入伪类和伪元素概念是为了格式化文档树以外的信息. 也就是说,伪类和伪元素是用来修饰不在文档树中的部分


## css中哪些属性可以继承

🚩 每个css属性的定义中都给出了该属性默认是继承的,还是默认不继承的

1️⃣ 当一个属性默认是继承的,但没有给其默认值时: 默认继承父级元素 同属性的值
2️⃣ 当一个属性默认是不继承是,可以通过将它的值设置为inherit来使它从元素那获取同属性的值

🖌 有继承性的属性:
 1. 字体系列属性:
    font、font-family、font-weight、font-size、font-variant、font-stretch、font-size-adjust
 2. 文本系列属性
    text-indent、text-align、text-shadow、line-height、word-spacing、letter-spacing、text-transform、direction、color
 3. 表格布局属性
    caption-side、border-collapse empty-cells
 4. 列表属性
    list-style-type、list-style-image、list-style-position、list-style
 5. 光标属性
    cursor
 6. 元素可见性
    visibility
 7. 不常用的：speak、page等等


# CSS3 有哪些新特性
1. 新增各种css选择器 nth-child(n)
2. 圆角   (border-radius:8px)
3. 多列布局   (multi-column layout)
4. 阴影和反射  (Shadow / Reflect)
5. 文字特效  (text-shadow)
6. 线性渐变  (gradient)
7. 旋转   (transform)
8. 缩放,定位,倾斜,动画,多背景  transform:\scanle(0.85,0.9)\translate(0px,-30px)\skew(-9deg,0deg)\Animation:

# 渐进增强和优雅降级的定义
1. 渐进增强: 针对低版本浏览器进行构建页面,保证最基本的功能,然后再针对高级浏览器进行效果 / 交互等改进和追加功能达到更好的用户体验
2. 优雅降级: 一开始就根据高版本浏览器构建完整的功能,