---
title: ES6中新增的特性
date: 2021-02-27 17:09:02
tags: ES6
categories: JavaScript
cover: https://api.cyrilstudio.top/bing/image.php/bing?day=5
top_img: false
author: GuestLjz

---
# ES6 中新增特性

# 新增块级作用域
## 通过let 定义块级作用域
1. 没有变量提升,变量必须先声明后使用
2. 通过let 声明的变量不能重名
```javascript
// console.log(a)  //报错 必须先定义后使用
let a = 0   //在全局中定义可以在全局中使用
function fun1(){
  // let a =  1  // 报错不能重复定义相同的变量名
  let b = 1   //只能在当前块,当前大括号中使用

}
```

## 通过const声明
1. const声明变量的同时必须初始化,一旦初始化后这个变量的值就不允许修改
2. const声明变量也是一个块级作用域的变量,只能在当前块使用
3. const声明的变量也没有变量提升,必须先声明后使用
4. const 声明的变量不能重名
```javascript
 const a = 1
 a = 2 //报错,a不允许修改
```

# 新增函数特性
## 函数可以设置默认参数
在我们调用函数时,如果设置了默认形参,如果没有给函数传参,那么函数可以使用默认形参
```javascript
function fun2(a=1,b=2){
   console.log(a,b )  //输出 a=1,b=2
}
fun2(10,20) //输出 a=10,b=20
fun2(10) //输出 a=10,b=2
```
同样,在构造函数中也可以使用此方法
```javascript
 function Person(name,sex,age=10){
    this.name = name
    this.sex =sex
    this.age = age
  }
  let guestljz = new Person("guestljz", "女")
  console.log('guestljz: ', guestljz);  //guestljz: Person {name: "guestljz", age: 10, sex: "女"}

```

## 箭头函数
```javascript
// es5中的函数
function fun3(){
  let sum = 0 
  for(i=0;i<10;i++){
    sum +=i
  }
}
//箭头函数
const fun3 = ()=>{
  let sum = 0 
  for(i=0;i<10;i++){
    sum +=i
  }
}

//箭头函数的几种写法
const fun4= (参数1,参数2,参数3...)=>{
    // 书写语句
}

// 如果箭头函数只有一个形参,可以省略括号不写
const fun5 = abc=>{
  console.log(abc)
}

//如果箭头函数的花括号后面只有一句语句,可以省略花括号不写
const fun6 = abc=> console.log(abc)

//如果箭头函数花括号后面只有一句语句,并且需要立即返回一个值,那么可以将花括号改写成 ()
let n = null
const fun7 = abc => ( n=abc )
```

使用箭头函数,我们可以使用多种方式书写函数,并且更简洁,更方便
但值得注意的是,在箭头函数中,没有this,换句话说,箭头函数中的this是外部作用域中的this

### this指向问题
关于this指向问题相关 参考  [《this指向问题》](https://guestljz.gitee.io/2021/02/27/JavaScript/this%E6%8C%87%E5%90%91/)


# 展开运算符

将一个个数据打开成为一个个的状态,通过用它来展开数组或对象,也可以在函数传递参数的时候使用

```javascript
let arr= [1,2,3,4,5]
console.log(arr)   //输出 [1,2,3,4,5]
console.log(..arr)  //输出 1,2,3,4,5

//将多个数组合并成一个数组
let arr2 = [1,2,3,4]
let newArr2 = [...arr2,5,6,7]  
console.log(newArr2) //输出一个新数组  [1,2,3,4,5,6,7]


//给函数传递参数使用
const fun8()=(a,b,c)=>{
  console.log('c: ', c);
  console.log('b: ', b);
  console.log("a:",a)
}
let arr3 = [10,20,30]
fun8(...arr3)
```

# 解构赋值
快速从对象或者数组中获取成功

```javascript
 //数组中的解构赋值
 let [a,b,c] = [1,2,3]  //a=1,b=2,c=3

 //对象中的结果赋值
 let {foo,bar}={foo:'aaa',bar:'bbb'}  //foo = aaa, bar=bbb

 //也可以写成这种形式
 let obj = {
   name:'guestljz',
   age:'10',
   gender:'女'
 }
 let { name,age,gender } = obj

 //或者这种形式
 let { name:a} = obj 
 //等价于
 let a = obj.name

 //交换变量
 let [n1,n2] = [n2,n1]
```

# 新增字符串方法
## string.includes()
  判断字符串是否包含一个指定的值,返回一个布尔值,表示是否找到了参数字符串。

 ```javascript
  let s = 'abcdefg'
  console.log('s.includes(d): ', s.includes("d"));  //true
 ```

 还支持第二个参数,从哪个位置开始查找
 ```javascript
  let s = 'abcdefg'
  console.log('s.includes(d): ', s.includes("d",4));  //false
  console.log('s.includes(d): ', s.includes("g",4));  //true
 ```

## string.startsWith()
表示参数字符串是否在原字符串的头部,返回一个布尔值

```javascript
 let s = 'abcdefg'
 console.log('s.startsWith(): ', s.startsWith("abc")); //true
```
同样也支持第二个参数,表示从哪个位置开始

```javascript
  let s = 'abcdefg'
  console.log('s.startsWith(): ', s.startsWith("abc",4)); //false
  let s1 = "abc efg"
  console.log('s.startsWith(): ', s.startsWith("efg",4)); //false
```
## string.endsWith()
 返回布尔值，表示参数字符串是否在原字符串的尾部

```javascript
  let s = 'abcdefg'
  console.log('s.endsWith(): ', s.endsWith("g")); //true
```
也支持第二个参数,这个第二参数表示,从第0个到第n个

```javascript
 let s = 'abcdefg'
 console.log('s.endsWith(): ', s.endsWith("d",4)); //true
```

还有许多,详看 阮一峰的es6教程


# Map 和 Set 
- Map 和 Set 是 ES6 新增的两个数据类型
- 都是属于内置构造函数
- 使用 new 的方式来实例化使用

## Set

- Set 是一个构造函数,用来生成 Set 数据结构,它类似于数组,但是成员的值都是唯一的 , 没有重复的,初始化 Set 可以接受一个数组或类数组对象作为参数,也可以创建一个空的 Set:
  
  ```javascript
   const s = new Set()
   console.log('s', s)
   //输出
  /*
  	Set(0) {}
          size: (...)
          __proto__: Set
          [[Entries]]: Array(0)
          length: 0
  */
  ```

  - 我们可以在 new 的时候直接向内部添加数据
   
   ```javascript
    // 实例化的时候直接添加数据,要以数组的形式添加
    const s = new Set([1,2,3,{},function(){},true,'hello'])
    console.log('s', s)
    /*
      Set(7) {1, 2, 3, {…}, ƒ, …}
        size: (...)
        __proto__: Set
        [[Entries]]: Array(7)
        0: 1
        1: 2
        2: 3
        3: Object
        4: function () {}
        5: true
        6: "hwllo"
        length: 7
    */
   ```

  - 看上去是一个类似数组的数据结构,但不是数组,是**Set 数据结构**

### 常用的方法和属性
- `size` : 用来获取该数据结构中有多少数据的

  ```javascript
    const s = new Set([1,2,3,{},function(){},true,'hello'])
    console.log('s', s.size)  //7
  ```

  - 看上去是一个和数组数据类型差不多的数据结构,而且也看到的 length 属性
  - 但是不能使用,想要获取该数据类型中的成员数量,**需要使用 size 属性**

- `add` : 用来向该数据类型中追加数据

  ```javascript
    // 初始化数据
    const s = new Set([1,2,3,{},function(){},true,'hello'])
    console.log('s', s.size)  // 7
    // 添加
    s.add(0)
    s.add({name:'guestljz'})
    s.add({function (){ console.log("有点饿了")}})
    console.log('s', s.size)  //10
  ```
  - 这个方法就是向该数据类型中追加数据使用的

- `delete` : 用来删除该数据结构中的某一个数据

  ```javascript
    // 初始化数据
    const s = new Set([1,2,3,{},function(){},true,'hello'])
    console.log('s', s.size)  // 7

    // 删除
    s.delete({})
    console.log('s', s.size)  // 9
  ```

- `clear` : 清空数据结构中的所有数据

  ```javascript
    // 初始化数据
    const s = new Set([1,2,3,{},function(){},true,'hello'])
    console.log('s', s.size)  // 7

    //清空
    s.clear()
    console.log('s', s.size) // 0
  ```

- `has` : 查询数据结构中有没有某一个数据

  ```javascript
    // 初始化数据
    const s = new Set([1,2,3,{},function(){},true,'hello'])
    console.log('s', s.size)  // 7

    // 查询
    console.log(s.has(0))  // false 
    console.log(s.has({}))  // true
  
  ```

- `forEach` : 用来遍历 Set 数据结构的方法
  ```javascript
    // 初始化数据
    const s = new Set([1,2,3,{},function(){},true,'hello'])
    console.log('s', s.size)  // 7


    //遍历数据结构的每一项
    s.forEach(ietm=>{
      console.log('ietm: ', ietm);
      //输出
      /*
      ietm:  1
      ietm:  2
      ietm:  3
      ietm:  {}
      ietm:  ƒ (){}
      ietm:  true
      ietm:  hello
      */
    })
  ```

- 方法介绍差不多了,但是有一个问题出现了,那就是
- 我们的方法添加 / 删除 / 查询 ,没有获取
- 获取 Set 结构里面的数据需要借助一个  `...` 展开运算符
- 把他里面的东西都放到一个数组里面去,然后再去获取
  ```javascript
    const s1 = new Set([1,2,3,4])
    const a = [...s1]
    console.log('a: ', a)
    // 输出 a: (4) [1, 2, 3, 4]
    console.log('a',a[0])  //1
  ```
- 又有一个问题出现了,new的时候需要以数组的形式传递
- 然后获取的时候又要转成数组的形式获取
- 那为什么不一开始就定义数组,为什么要弄一个 Set 数据类型?
- 这不得不提到一个 Set 的特点
- **Set 不允许存储重复的数据**  
  ```javascript
   const s = new Set([1,2,3])
   s.add(4)  //此时 size 是4
   s.add(1)  //此时 size 是4
   s.add(2)  //此时 size 是4
   s.add(3)  //此时 size 是4
  ```

## Map
- Map 是一个构造函数,用来生成 Map 数据结构,它类似于对象,也是键值对的集合,但是"键"可以是非字符串,初始化 Map 需要一个二维数组,或者直接初始化一个空的 Map:
  ```javascript
    const m = new Map()
    console.log(m)
    
    /*
      Map(0) {}
        size: (...)
        __proto__: Map
        [[Entries]]: Array(0)
        length: 0
    */
  ```
  - 在对象中不管存储什么, key 一定是一个字符串类型,对象是一个键值对 的集合 key : value
  - 但是在 Map 里面,key 可以任意数据类型
  - Map 也可以叫做 (值 = 值) 的数据类型

    ```javascript
     const m = new Map()
      //   初始化的时候就给一些值
      //   传递的参数需要是一个数组
      //   数组需要是一个 二维数组
      //   二维数组里面的每一个小数组接受两个数据
      //   这个两个数据可以是任意数据类型
      //   这个两个数据第一个就是 key，第二个就是 value
      const m1 = new Map([['name', 'Jack'], [{ a: 100 }, 18]])
    ```

### 常用方法和属性
- `size` ： t用来获取该数据类型中数据的个数

  ```javascript
    const m = new Map([[{}, {}], [function () {}, function () {}], [true, 1]])
    console.log(m.size) // 3
  ```

- `delete` : 用来删除该数据集合中的某一个数据

  ```javascript
    const m = new Map([[{}, {}], [function () {}, function () {}], [true, 1]])
    m.delete(true)
  
  console.log(m.size) // 2
  ```

- `set` : 用来向该数据集合中添加数据使用

  ```javascript
    const m = new Map()
    m.set({ name: 'Jack' }, { age: 18 })
    console.log(m.size) // 1
  ```

- `get` : 用来获取该数据集合中的某一个数据

  ```javascript
    const m = new Map()
    
    m.set({ name: 'Jack' }, { age: 18 })
    m.set(true, function () {})
    console.log(m.get(true)) // function () {}
  ```

- `clear` : 清除数据集合中的所有数据

  ```javascript
    const m = new Map()
    
    m.set({ name: 'Jack' }, { age: 18 })
    m.set(true, function () {})
    
    m.clear()
    
    console.log(m.size) // 0
  ```

- `has` ： 用来判断数据集合中是否存在某一个数据

  ```javascript
    const m = new Map()
    
    m.set({ name: 'Jack' }, { age: 18 })
    m.set(true, function () {})
    
    console.log(m.has(true)) // true
  ```

- forEach ：遍历 MAP 数据集合中的成员

  ```javascript
    const m = new Map()
    m.set({ name: 'Jack' }, { age: 18 })
    m.forEach(function (item) {
        console.log(item)
    })
  ```

# 模板字符串
- ES5 中我们表示字符串的时候使用 `''` 或者 `""`

- 在 ES6 中，我们还有一个东西可以表示字符串，就是 **``**（反引号）
- 区别是使用 **\`\`**（反引号）我们可以在字符串里面使用 `${变量名}` 拼接变量
- 使用 单引号再字符串中不能直接换行,使用反引号可以直接换行

# Symbol类型 
+ ES5 的对象属性名都是字符串，这容易造成属性名的冲突。
+ ES6 引入了一种新的原始数据类型 Symbol，表示独一无二的值。
+ 在创建symbol类型数据时的参数只是作为标识使用，直接使用 Symbol() 也是可以的。

  ```javascript
    let s = Symbol('xm');
    console.log( s );
    console.log( typeof s );

   //对象的属性名现在可以有两种类型，一种是原来就有的字符串，另一种就是新增的 Symbol 类型。
    var xm = Symbol();
    var obj = {
        [xm] : "小明" //对象的属性是Symbol类型
    }

    //Symbol类型的属性 取值是 必须 obj[xm] 不能用obj.xm
    console.log( obj[xm] );

    var s4 = Symbol();
    var obj = {
        'name': 'xm',
        [s4]: 'xh',
        [Symbol('age')]: 18
    }
    console.log(obj); // {name: "xm", Symbol(): "xh", Symbol(age): 18}
    console.log(obj.name); // xm
    console.log(obj[s4]); // xh 访问对象的Symbol属性的值
    console.log(obj[Symbol('age')]); // undefined


   //修改symbol类型的属性
    obj[xm] = "web前端";
    console.log( obj[xm] );

      
    //对象的Symbol属性不会被遍历出来（可以用来保护对象的某个属性）
    var obj = {
        "sname":"小明",
        "skill" : "web"
    }
    var age = Symbol();
    obj[age] = 18;
    console.log( obj );
    for( var key in obj ){
        console.log(key + " -> " + obj[key] );
    }
  ```
+ Object.getOwnPropertySymbols 方法会返回当前对象的所有 Symbol 属性，返回数组
  ```javascript
    let id = Symbol("id");
    let obj = {
        [id]: '007',
        [Symbol('name')]: 'xiaocuo'
    };
    let arr = Object.getOwnPropertySymbols(obj);
    console.log(arr); //[Symbol(id),Symbol(name)]
    console.log(obj[arr[0]]);  //'007'  访问对象的Symbol属性的值
    
    
    // 虽然这样保证了Symbol的唯一性，但我们不排除希望能够多次使用同一个symbol值的情况。
    let s1 = Symbol('name');
    let s2 = Symbol('name');
    console.log( s1 === s2 ); // false
    
    // 官方提供了全局注册并登记的方法：
    let name1 = Symbol.for('name'); //检测到未创建后新建 
    let name2 = Symbol.for('name'); //检测到已创建后返回 
    console.log(name1 === name2); // true
    
   // 通过symbol对象获取到参数值：
    let name1 = Symbol.for('张三');
    let name2 = Symbol.for('丽丽');
    console.log(Symbol.keyFor(name1));  // '张三'
    console.log(Symbol.keyFor(name2)); // '丽丽'
  ```