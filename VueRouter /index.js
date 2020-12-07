
//  模拟 VueRouter 的 hash 模式的实现，实现思路和 History 模式类似，把 URL 中的 # 后面的内容作为路由的地址，可以通过 hashchange 事件监听路由地址的变化
let _Vue = null
export default class VueRouter {
  static install(vue) {
    // 1 判断当前插件是否被安装
    if (VueRouter.install.installed) return
    VueRouter.install.installed = true
    // 2 把Vue的构造函数记录在全局
    _Vue = vue
    // 3 把创建Vue的实例传入的router对象注入到Vue实例
    // _Vue.prototype.$router = this.$options.router
    _Vue.mixin({
      beforeCreate() {
        if (this.$options.router) {
          _Vue.prototype.$router = this.$options.router
        }
      }
    })
  }

  constructor(options) {
    this.mode = options.mode || "hash"
    this.routes = options.routes
    this.routeMap = {}
    // observable
    this.data = _Vue.observable({
      current: '/'
    })
    this.init()
  }
  init() {
    this.initRouteMap()
    this.initComponent(_Vue)
    this.initEvent()
  }
  initRouteMap() {
    //遍历所有路由信息，把组件和路由的映射记录到 routeMap 对象中
    this.routes.forEach(route => {
      this.routeMap[route.path] = route.component
    })
  }
  initComponent(Vue) {
    //创建 router-link 和 router-view 组件
    const self = this
    Vue.component('router-link', {
      props: {
        to: String
      },
      render(h) {
        return h("a", {
          attrs: {
            href: self.mode === "history" ? "" : "#" + this.to
          },
          on: {
            click: self.mode === "history" ? this.clickhander : this.hashClickhander
          }
        }, [this.$slots.default])
      },
      methods: {
        clickhander(e) {
          history.pushState({}, "", this.to)
          this.$router.data.current = this.to
          e.preventDefault()
        },
        hashClickhander(e) {
          this.$router.data.current = this.to
        }
      }
    })

    Vue.component('router-view', {
      render(h) {
        let cm = self.routeMap[self.data.current]
        return h(cm)
      }
    })
  }
  initEvent() {
    //注册 popstate 事件，当路由地址发生变化，重新记录当前的路径
    const eventType = this.mode === 'history' ? 'popstate' : 'hashchange'
    const handle = this.mode === 'history' ? this.getLocation : this.getHash
    window.addEventListener(eventType, handle.bind(this))
  }
  getLocation() {
    this.data.current = window.location.pathname
  }
  getHash() {
    let href = window.location.href
    const index = href.indexOf('#')
    if (index < 0) return '/'
    this.data.current = href.slice(index + 1)
  }
}