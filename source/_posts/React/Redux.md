---
title: Redux
date: 2021-02-02 19:47:06
tags: Redux
categories: React
cover:  https://bing.ioliu.cn/v1/rand?room=23344
top_img: false
author: GuestLjz
---
<font size=3>

> <font size=3 color=#5285C8> 
> 什么时候用到 Redux ? <br/></font>


> <font color=black>有人曾说过 :</font> <font size=4 color=#E7776C>"如果你不知道是否需要 Redux，那就是不需要它 "</font>  <br/>

><font color=black> 接着又有人补充 :</font> <font color=#E7776C>"只有遇到 React 实在解决不了的问题，你才需要 Redux 。" </font>
> 
> 


# Redux的流程
先看图
[![yuJCxH.gif](https://s3.ax1x.com/2021/02/02/yuJCxH.gif)](https://imgchr.com/i/yuJCxH)


# Redux 的三个3原则
<font size=4>

1️⃣ 三个api: createStore()  / combineReducers() / applyMiddleware() 

2️⃣ 三个特点: store是只读的  /  单向数据流  /  修改store只能通过纯函数reducer来修改

3️⃣ 三个概念: store / reducer / action </font>


# Redux 的基本概念和API
### 1. Store 就是保存数据的地方,可以把它看成是一个容器,整个应用只能有一个store
  Redux提供 createStore() 这个函数,用来生成store()

  ```javascript
    import { createStore }  from 'redux'
    const store = createStore(fn)
  ```

### 2. State,如果把Store看成是一个仓库,那么State 就是仓库的中货物, 每个货物对应一个State;
  在Redux中,Store 对象包含着所有的数据,如果想要拿到期中的数据,就要对Store生成快照,此时生成的数据就叫State
  Redux规定,一个State对应一个View,只要State相同,View就相同

<font color=#0000>
🥖 State 的变化,会导致 页面 即View 的变化,但用户接触不到State,只能接触到View;所以State的变化必须是View导致的;而Action就是View 发出的通知,表示State应该要发生变化了
</font>

### 3. Action
  State的变化,会导致页面 即View的变化,但是用户接触不到State,只能接触到View;所以State 的变化必须是View 导致; 而Action就是 View 发出的通过,表示State 应该要发生变化了

  Action 是一个对象 ,其中type是必填属性

  ```javascript
  const payload={
    type:'add',
    payload:'hello word'
  }
  ```

### 4. dispatch() 
  dispath()是View发出Action的唯一方法,当用户在 View 触发 dispatch, dispatch会生成一个Action()方法, 将它发送给Store
  使用dispatch的方式有很多,可以使用高阶组件或hooks

  ```javascript
  //使用hooks
  import { useDispatch } from 'react-redux'
  const dispatch = useDispatch()
  //dispatch一个action方法
  dispatch({
    type:'add',
    payloa:"hello word"
  })
  ```

### 5. Reducer 
  Store 收到Action 后,必须给出一个新的State,这样View才会发生变化,这种State的计算过程就叫Reducer;
  也就是说必须根据 View 的变化 修改Store,而Store是只读,只能使用纯函数,即只能在Reducer中修改--> 得出 Reducer 是一个纯函数
  纯函数表示:只要是同样的输入，必定得到同样的输出。


 <font color=#0000>
 🥖 实际上 在 createStore()函数中, 接收另一函数作为参数,这个函数就是Reducer 函数

 🥖 Reducer 函数接收两个参数,一个是初始State,另一个是action
 </font>

  ```javascript
    function reducer(initState={},ation){
      //这里面根据action传来的参数修改store中的数据
      //Store 是只读的,并且是单向的,所以不能被直接修改
      //先进行一层深拷贝
      let newStore = JSON.parse(JSON,stringify(store))
      switch(action.type){
        case type:
          //做一些操作,修改State
          break;
        default:
          break
      }
      
    }
  ```



# 在组件中使用 Redux 

##  使用上下文Provider 将store传到App中
##  在组件中,可以使用高阶组件或hooks将react和redux连接起来

  + 使用高阶组件 

```javascript
  //引入
  import {connect }  from  'react-redux'
```
<font color=#00000>
    其中,connect(fn1,fn2)(UI)组件  中间接收两个函数作为参数,然后修饰到UI组件中
    
  fn1 是 mapStateToProps 将state 中的数据 映射到组件的props中 ,组件通过props 获取store中的数据
  ```javascript
  function mapStateToProps(store){
    //接收一个store参数
    return{
      msg:store.msg
    }
  }
  ```

  fn2 是 mapDispatchToProps  将View 中修改的数据 dispatch 到reducer 的action中 ,action通过dispatch中的数据修改state 
  
  ```javascript
  function mapDispatchToProps(dispatch){
    return{
      changeMsg:()=>dispatch({type:'add',payload:'hello Word'})
    }
  }
  ```
  
  + 使用hook

```javascript
import { useSelector,useDispath } from 'react-redux'

const msg = useSelector(store.msg)
const dispatch = useDispatch()
function(){
  dipatch({type:'add',payload:'hello word'})
}
```


# Redux 中调接口

**redux只支持 dispatch 同步的action,并且要求action只能使用plain object**

> 当react组件中dispatch(fetch)触发调接口,此时fetch并不是一个plain object,是一个函数,redux的store收到一个plain object的action时就会报错

**所以异步的action需要使用一个第三方库 redux-thunk**
creactStore 使用一个中间件, thunk
creactStore(reducer,applyMiddleware(thunk))

🦴 完成一次异步的action,需要两次派发
🦴 第一次派发一个空的action,
🦴 第二次才将action派发到store中

🟣 此时,第一次dispatch的action会被thunk这个中间件接收,thunk中首先会判断,此时这个action是不是一个函数,如果不是,原封不动的将这个action转发store中; 如果 此是这个action是一个函数,那么thunk会执行函数内部的代码,执行第二次派发,直接执行调接口这个异步操作,执行完毕再将结果转发到store中


  ```javascript
  const getMusic = (payload){
    //2-第一次派发的是一个函数,
    return function(dispath){
      //3-第二次派发
      fetchMusic(payload).then(()=>{
        dispatch({
          type:'music',
          payload
        })
      })
    }
  }
  //1-在这里第一次派发
  dispatch(getMusic(payload))
  ```

# 分模块 
+ 使用 combineReducers()函数进行模块划分,接收一个对象,存放的是每个子reducers,使用是需加上每个模块名,即命名空间

```javascript
import todo from './todo'
import test from './test'
 const rootRender = combineReducers({
   todo,
   test
 })
```

> action生成器
> action.type 


</font>
</font>