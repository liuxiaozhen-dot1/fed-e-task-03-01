#### 简答题

### 1、当我们点击按钮的时候动态给 data 增加的成员是否是响应式数据，如果不是的话，如何把新增成员设置成响应式数据，它的内部原理是什么？
```js
 let vm = new Vue({
 el: '#el'
 data: {
  o: 'object',
  dog: {}
 },
 method: {
  clickHandler () {
   // 该 name 属性是否是响应式的
   this.dog.name = 'Trump'
  }
 }
})
```
答： 不是响应式。
响应式的第一种方案是在data中设置初始值，之后在事件中改变这个值的过程
第二种方案是使用vue.set()方法进行数据的改变
响应的内部原理：
是利用Object.defineProperty来劫持各个属性的值再发布给订阅者。
内部有三部分组成 Observer 实现对数据的监听，如有变动会通知给订阅者
complier 对指令进行编译，根据指令替换数据以及绑定相应的更新函数
watcher 是连接observer和complie之间的桥梁订阅并收到每个属性变动的通知，执行指令并更新视图。

### 2、请简述 Diff 算法的执行过程

diff的过程就是比较新旧节点的过程通过patch函数来进行比对，patch函数接收oldNode和Vnode两个参数,使用两者来进行比较
若相同则执行patchVnode； 若不同就使用Vnode代替oldNode；
patchMode函数内部 先找到真实的dom节点 （el）
判断vnode和oldNode 是否指向一个对象为true则return 
如果为文本节点且不相等将el的文本节点设置成vnode的文本节点
如果oldNode有文本节点而Vnode有则删除el的子节点
如果 oldVnode 没有子节点而 vnode 有，则将 vnode 的子节点真实化之后添加到 el
如果两者都有子节点，则执行 updateChildren 函数比较子节点：

   1.给新老节点定义开始、结束索引
   2.循环比对新节点开始VS老节点开始、新节点结束VS老节点结束、新节点开始VS老节点结束、新节点结束VS老节点开始并移动对应的索引，向中间靠拢根据新节点的key在老节点中查找，没有找到则创建新节点。
   3.循环结束后，如果老节点有多的，则删除。如果新节点有多的，则添加。




### 笔记
### vue语法概念

差值表达式

指令

计算属性和侦听器

class和style绑定

条件渲染和列表渲染

表单输入绑定

组件

插槽

插件

混入miXin 

深入响应式原理

不同构件版本的vue

##### Vue router原理介绍

动态路由传参数

可以通过两种方式

1. 使用$route.params.id 获取参数 

2. 可以开启在路由中props 


##### vue响应式原理实现（数据驱动  响应式核心原理 发布订阅者模式和观察者模式）

数据响应式。双向绑定 数据驱动

数据响应式  数据模型仅仅是普通的js对象，而当我们修改数据时，视图会进行更新，避免了dom的繁琐操作

双向绑定。数据改变 视图改变  ；视图改变 数据也相应改变。我们可以使用v-model 在表单元素上创建双向数据绑定

数据驱动是vue 最独特的特性之一

开发过程中仅需要关注数据本身 不需要关心数据如何渲染到视图

响应式原理 ：defineProperty（把data中的属性全部转为getter和setter）  Proxy(直接监听对象，而非属性，es6中新增 ，IE不支持)

##### 发布订阅者模式

订阅者 发布者 信号中心

##### 虚拟dom 的作用

维护视图和状态的关系

复杂视图情况下提升渲染性能

除了渲染DOM以外，还可以实现SSR 原生应用 小程序等


1.注册路由插件
vue.use 是用来注册插件的  回调用传入对象的install 方法
```js
Vue.use(VueRouter)
```
路由规则
```js
const routes = [
  {
    path: '/login',
    name: 'Index',
    component: Index
  }
]
```
2.创建router对象
```js
const router = new VueRouter({
  routes
})
```
3.main.js中注册router对象
```js
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
```




##### Hash 和 history模式的区别

表现形式的区别

Hash 

https://www.baidu.com/s?id=1111

History

https://www.baidu.com/s/1111

原理的区别

hash是基于锚点以及onhashchange事件

history 是基于H5中的history的API

History.pushState()  IE10以后才支持

history.replaceState()