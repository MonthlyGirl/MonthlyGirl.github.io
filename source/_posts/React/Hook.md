---
title: Hook
date: 2021-02-22 13:39:14
tags: Hook
categories: React
cover:  https://bing.ioliu.cn/v1/rand?room=34234
top_img: false
author: GuestLjz
---

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
  