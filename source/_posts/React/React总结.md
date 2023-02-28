---
title: React总结
date: 2021-02-22 21:49:17
tags: React
categories: React
cover:  https://bing.ioliu.cn/v1/rand?room=12333
top_img: false
author: GuestLjz
---

# React中的key的作用
> key可以帮助React跟踪循环列表中的虚拟DOM,以此来了解哪些元素是已更改 / 添加 / 删除 的
>
> react利用key来识别组件,它是一种唯一标识,相同的key React会认为是同一个组件,后续相同key对应组件都不会被创建
>
> 有了key属性后,就可以与组件建立相应的关系,react根据key来决定组件是销毁还是更新
>
> 如果key相同,组件的属性有所变化,那么react只更新组件对应的属性,没有变化则不更新
>
> key值不同,那么react先销毁该组件,然后在重新创建组件

# React的生命周期

### 1.挂载阶段,有3个常用的生命周期
1. construtor() 
  实例被初始化时会调用这个函数,是所有生命周期中第一个执行的函数,可以在这里定义声明式变量
2. componentDidMount()
  实例初始化完成,这个生命周期只执行一次,再次更新视图时不执行,可以在这里修改state,调接口,建立长连接
3. render()
  所有生命周期中必须要有的生命周期,且一定要有返回值,并且返回的是一个jsx对象,它在挂载阶段和更新阶段都会zhixing

### 2.更新阶段,有2个常用的生命周期
1. componentUpdate()
  它表示视图已更新完成,每次更新State中的数据,都会执行componentUpdate()和render()
2. shouldComponentUpdate()
  它的作用是在类组件中提升性能,抽离出不参与视图渲染的数据,让它们不参与diff运算
  这个生命周期必要要有一个返回值,且返回值是一个布尔值,返回false时不更新

### 3.销毁阶段,只有一个生命周期
1. componentWillUnMount()
  它表示组件将要被销毁,一般在这里清除定时器 / 缓存 / 长连接 等
  
  
# 调用setState之后发生了什么
+ 在代码中调用setState之后,React会将传入的参数对象与当前的状态进行合并,然后触发调和过程
+ 经过调和过程,React会以相对高效的方式根据新的状态构建React虚拟DOM树,并且开始准备重新渲染UI界面
+ React在得到虚拟DOM树后,会先比较新得到的树和老树的差异,然后根据diff运算进行界面的最小化渲染
+ 在diff运算算法中,React能够精确的知道哪些元素发生了变化,以及应该如何变化,这就保证了按需更新,而不是全部更新

# 多次触发setState,那么render会执行几次
+ 多次的setState最终会合并成一次render,因为setState不能立即修改state的值,而是将它放到一个任务队列中,最终多个setState会被合并,一次性更新页面
+ **传入对象会被合并**
+ **传入函数不会被合并,函数无法合并**


# setState什么时候同步?什么时候异步?
1. 如果是由React引发的事件处理(如:通过onClinck触发的事件处理),此时`setState`是异步的,它不会同步更新`this.state`,并且多个`setState`在执行过程中会被合并;除此之外,`setState`是同步的,而这里的"除此之外"是指绕过react,使用原生DOM事件(如addEventListener)调用`setState`,还有通过 `setTimeOut` / `setInterval` 执行`setState()`,此时`setState`是同步的

# 为什么要调用setState而不是直接修改state 
+ 如果你尝试直接state,那么react将接收不到state被修改的信息,即它无法知道它需要重新渲染组件;因此需要调用 `setState()`方法,这样react才会更新UI组件

# this.setState 之后React都做了哪些工作
+ shouldcomponentUpdate()
+ render()
+ componentDidUpdate()

# 虚拟DOM是如何工作的
+ 当数据发生变化时,比如setSTate时,会引起组件的重新渲染,整个UI都会以虚拟DOM的形式重新渲染
+ 然后React就会收集差异进行diff运算,diff运算会找出虚拟DOM中的脏节点
+ 最后将差异队列中的差异渲染到真实的DOM上

# 为什么要使用虚拟DOM
+ 频繁的DOM操作,会导致页面的重绘和回流,出于性能考虑,我们要减少页面的重绘和回流
## 什么是重绘
+ 当DOM树中一些元素需要更新属性,而这些属性只是影响元素的外观,风格,不影响元素的布局时,称为重绘,比如:修改background-color,这就叫重绘
## 什么是回流
+ 当DOM树中,因为元素的尺寸,规模,布局时需要重新构建时,便称为回流,一个DOM树中,至少经历一次回流,就是页面初始化渲染时
## 重绘和回流的区别
+ 回流一定会引起重绘,重绘不一定会引起回流,比如当整个页面只有颜色发生改变时就只会发生重绘而不会引起回流
+ 如果是元素的布局或几何属性发生改变时,就会引起回流,比如改变div的大小,加padding,margin等

# 虚拟DOM为什么会提高性能
+ 虚拟DOM相当于在js和真实的DOM中间加了一层缓存,利用DOM的diff避免过多的操作真实DOM,从而提升性能
+ 用javascript对象表示DOM树
+ 然后用这个对象树构建一个真正的DOM树,插到文档当中,当状态变更的时候,重新构造一颗新的对象树
+ 之后进行diff运算,进行新老两树相比较,记录两颗树的差异从而将差异渲染到真实的DOM树中


# diff运算原理
+ 在传统做法中,diff运算是一个深度递归的过程,则就是将整颗树进行循环遍历进行比较,从而找出不同,效率低下,算法复杂度达到O(n^3)
+ 所以react在diff运算上基于以下三个策略上做了很大的提升
1. web UI中DOM节点跨层级的移动操作特别少,可以忽略不计
2. 拥有同类的两个组件将会生成相似的树形结构,拥有不同类的两个组件将会生成不同的树形结构
3. 对于同一层级的一组子节点,它们可以通过唯一 id(即key) 进行区分

基于以上三个策略,react分别对应的 tree diff,component diff ,element diff 进行算法优化

- tree diff 
  基于策略一,React 对树进行分层比较,两棵树只会对同一层次的节点进行比较
  那么如果出现了跨层级的移动和操作,那么将为以当前这个脏节点为根节点,根节点下的整个树将会被重新创建,这是一种影响React性能的操作,因此官方建议不要进行DOM节点跨层级的操作
- component diff
  基于策略二,对于同类型组件,则按照原策略继续比较 Virtrual DOM树,对于同类型的组件,有可能其虚拟DOM 没有任何变化,如何能够准确知道这点,那么就可以节省大量的diff运算时间;因此,react允许用户通过shouldComponentUpdate()来判断该组件是否需要进行diff算法分析
  如果不是,则将该组件判断为 dirty component ,然后替换整个组件下的所有子节点

- element diff
  策略三,脏节点在同一类型组件,根据策略三,同一层级的节点,它们通过key进行区分,当我们遍历一遍待渲染的节点,就能确定要添加 / 删除 / 更新的节点 , 然后修改组件

# Redux
+ 状态管理的作用: 1.组件间的数据共享,数据变化组件间的页面也变化,2.做缓存
## Redux 的三个3原则
+ 三个api: createStore() / combineReducers() / applyMidleWare()
+ 三个特点: Store 是只读的 / 单向数据流 / 修改state只能通过纯函数 reducer 来修改
+ 三个概念: store/ reducer / action

## Redux 的工作流程
> 当用户在View 触发dispatch,dispatch会生成一个action()方法,将它发送给Store;Store接收到action方法后,会调用reducer函数,Store会传2两个参数给reducer,一个是初始化的state,另一个是收到的action,以此来修改State,当State变化时,View也发生变化,由此可以知道reducer是一个纯函数,它会返回一个新的state,即修改后的state

## 在Redux中调接口
> redux只支持dispatch同步的action,并且要求action只能是一个plain object(普通对象)
> 当react组件中dispatch(fetch)触发调接口,此时,action不是一个plain object,是一个函数,而store中不支持接收函数,所以需要使用中间件 react-thunk

完成一次异步的dispatch需要两次派发
第一次派发一个空的action
第二次才会将action派发到store中
第一次dispatch的action会被thunk这个中间件接收,thunk首先会判断,此时这个action是不是一个函数,如果不是,原封不动的将这个action转发到store中,如果此时这个action是一个函数,那么thunk会执行函数内部的代码,执行第二次派发 直接执行这个函数,执行完毕再将这个函数返回的结果转发到store中

## Redux中的中间件
+ thunk,dispatch一个函数
+ saga,以generator方式书写Redux
+ promise,也是解决异步,允许payload是一个promise对象


# Hook
### 1.什么是Hook?
> Hook是React新增的特性,它可以在你不使用类组件的情况下使用State和其他的react特性

#### 1-1.常用的Hook
如: 
1. useState  
  
  > 关于useState的用法是: 需要传入一个参数作为状态的初始值,当函数执行后会返回两个值,一个是当前状态的属性,一个是修改状态的方法
2. useEffect
  > 副作用, 通常在副作用中进行ajax请求,事件的绑定和解绑,设置定时器和清除器等;
  > useEffect有两个参数
  > 第一个参数是一个回调函数,这个回调函数相当于 React生命周期中 componentDidMount() 这个钩子函数(只是相当于这个生命周期,实际上并不是生命周期),在这个回调函数中,可以进行ajax请求,设置定时器,绑定事件等等 ; 这个回调函数的返回值是一个函数,这个返回值,它相当于是React生命周期中componentWillUnmount() 这个钩子函数,我们可以在这里清除定时器,清除缓存,对事件进行解绑等
  > useEffect的第二个参数是依赖项数组,如果数组中的依赖发送变化,那么该副作用就会重新执行,如果不设置第二个参数,那么当该组件每渲染一次,副作用就会执行一次;如果设置为空数组,那么该副作用只会在组件初次渲染时执行一次
  在副作用中,不仅可以进行ajax请求,还可以通过调用的本地的State来进行页面更新
3. useContext
  
  > 上下文
4. useRef
  
> 获取DOM节点,进行DOM操作
  
5. useMemo
  > useMemo,创建一个依赖函数,当其中一个依赖项更改时,useMemo重新计算机记忆的值,而不需要在每个组件渲染时进行diff运算
  > 目的: 避免重复进行复杂耗时的代码计算,所以将计算的结果存起来. 只有在需要计算时使用
  > 传入两个参数: 一个回调函数,一个依赖项数组
  useMemo 的作用
  >useMemo其实创建了一种数据缓存机制,比如登录页面需要向后台发送含用户名&密码的ajax请求,获取用户登录信息,useMemo可以设置成只有当有用户密码改变后才向后台重新发送ajax,而在组件重新渲染时使用缓存的用户信息
  useMemo与useEffect区别
  > useMemo 与 useEffect 作用类似,都会在依赖值改变时重新执行,但useMemo有一个缓存的返回值, 因此在组件渲染生命周期中,很自然地会把useMemo放到渲染DOM前执行
  **useMemo => 渲染DOM => useEffect**
  当我们遇到复杂的计算可以使用useMemo
6. useCallback
  > 与useMemo传入的参数是一样的,都是在其依赖项发送变化后才执行的,都是返回缓存的值,区别在于useMemo返回的是函数运行的结果,useCallback返回的是函数
  **大部分时不用,可以在搭配shouldComponentUpdate()或有多个useEffect时使用**

# React中context
 + 作用: 用于React组件树中传递数据,避免使用复杂的链式的props数据传递
 + 上下文机制: 它的数据只能单向传输,从父组件向内部组件传递

# 组合
## 怎么理组合
1. 组合在React中,是一种非常强大的组件复用的设计模式, react中组件复用的思想用的是组合的思想
2. 建立的语法基础:props可传递任何数据类型,包括jsx对象

# 状态提升
+ 将组件需要共用的数据,提升到相同的父组件的props中,子组件通过props使用这些数据,以达到数据共用的效果

# 高阶组件
## 什么是高阶组件
+ 高阶组件实际上就是一个纯函数,即唯一的输入得到唯一的输出,所以高阶函数也叫高阶组件
## 作用
+ 是一种组件复用的技巧,用于修饰UI组件
## 原理
+ 基础react组合的特性

# React数据类型检查
+ 使用第三库props_types,对自定义属性执行类型检查