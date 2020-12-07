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


