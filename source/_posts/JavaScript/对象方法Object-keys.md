---
title: 对象方法Object.keys
date: 2020-12-31 17:37:18
tags: 对象
categories: JavaScript
coverWidth: 100%
coverHeight: 500
cover: https://bing.ioliu.cn/v1/rand?room=1999
top_img: false
author: gurstljz
---
### Object.keys()方法
+ 作用: 参数对象自身所有可遍历(可枚举)属性的键名
+ 返回值:字符串数组,数组中包含着对象的键名

```JavaScript
  let str='1234'
  onsole.log(Object.keys(str)); //返回 ["0", "1", "2", "3"]  索引 

  let obj={
    name:'xiaoming',
    age:18
  }
  console.log(Object.keys(obj)); // 返回 ["name", "age"] 键名

  let arr=[1,2,3,4,5]
  console.log(Object.keys(arr)); //返回["0", "1", "2", "3", "4"] 索引

  //构造函数返回空数组,或键名
  function Basic(name,age,address){
    this.name = name;
    this.age = age;
    this.address = address;
    this.info = function(){
        return (this.name + '/' + this.age + '/' + this.address);
    }
  };
  console.log(Object.keys(Basic));   //[]
  var lily = new Basic('li',18,'fujian');
  console.log(Object.keys(lily));  //['name','age','address','info']


  let person = {name:"张三",age:25,address:"深圳",getName:function(){}}
  Object.keys(person).map((key)=>{
  person[key] // 获取到属性对应的值，做一些处理

}) 
```

### Object.value()
+ 和Object.keys()是相反的,把对象的值转为数组
