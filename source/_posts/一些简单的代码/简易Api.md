---
title: 简易Api
date: 2020-12-31 16:11:00
tags: 简易Api
categories: 算法/Api
coverWidth: 100%
coverHeight: 500
cover: https://bing.ioliu.cn/v1/rand?room=0983
top_img: false
author: GuestLjz
---

### 一些简单的方法~~

- 判断是否为 promise

```JavaScript
  function isPromise(val){
    return val && typeof val.then ==='function'
  }
```

- 是否为对象

```javascript
function isObeject(obj) {
  return obj != null && typeof obj === "object"
}
```

- 首字母大写

```JavaScript
function uppercaseFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
  }
```

- 10000 => "10,000"

```JavaScript
function toThousandFilter(num) {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}
```

- 拿到对象的键和值

```JavaScript
 function forEachValue (obj) {
    Object.keys(obj).forEach(key => {
      console.log(obj[key]);  //obj[key]就是对象的键和值
    })
  }

  function forEachValue (obj, fn) {
  Object.keys(obj).forEach(key => fn(obj[key], key))
}
```

- 深拷贝

```JavaScript
function deepCopy (obj, cache = []) {
  //如果不是对象或数组 则返回
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

 //如果是对象或数组
  const hit = find(cache, c => c.original === obj)
  if (hit) {
    return hit.copy
  }

 //判断是数组还是对象
  const copy = Array.isArray(obj) ? [] : {}
  cache.push({
    original: obj,
    copy
  })

  Object.keys(obj).forEach(key => {
    copy[key] = deepCopy(obj[key], cache)
  })

  return copy
}
```
- 192.16.108.204  转化成32位的二进制字符串
```javascript
  function ip2Bit(ip){
    //padStart 字符串方法 不够8 位补 0 
    // toString(2) 转换为2 进制
    // map 循环
    // join 数组转字符串
  return ip.split('.').map(ele=>parseInt(ele).toString(2).padStart(8,'0')).join('')
  }
```

