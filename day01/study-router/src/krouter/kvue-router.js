import Link from "./krouter-link";
import View from "./krouter-view";

// 1. 实现插件
// 2. 实现router-view router-link组件

// vue插件,必须包含install方法,Vue.use()执行

let Vue; //保存vue构造函数 插件中要使用
class VueRouter {
  constructor(options) {
    this.$options = options;

    // current处理为响应式数据
    // this.current = '/'
    // const initial = window.location.hash.slice(1) || "/";
    // Vue.util.defineReactive(this, "current", initial);

    this.current = window.location.hash.slice(1) || "/";
    Vue.util.defineReactive(this, "matched", []);
    this.match();

    //监听hash变化
    // window.addEventListener("hashchange", () => {
    //   this.current = window.location.hash.slice(1);
    //   console.log("current url ", this.current);
    // });

    // 监控url变化
    window.addEventListener("hashchange", this.onHashChange.bind(this));
    window.addEventListener("load", this.onHashChange.bind(this));

    // // 创建一个路由映射表
    // this.routeMap = {};
    // options.routes.forEach((route) => {
    //   this.routeMap[route.path] = route;
    // });
  }

  onHashChange() {
    console.log(window.location.hash);
    this.current = window.location.hash.slice(1);
    this.matched = [];
    this.match();
  }

  match(routes) {
    routes = routes || this.$options.routes;
    //遍历路由表
    for (const route of routes) {
      if (route.path === "/" && this.current === "/") {
        this.matched.push(route);
        return;
      }
      //about/info
      if (route.path !== "/" && this.current.indexOf(route.path) != -1) {
        this.matched.push(route);
        if (route.children) {
          this.match(route.children);
        }
      }
    }
  }
}

VueRouter.install = function(_Vue) {
  Vue = _Vue;

  //挂载$router属性
  //this.$router.push()
  //全局混入
  Vue.mixin({
    //每个组件创建都会执行
    beforeCreate() {
      //是否包含router对象,因为在main.js的Vue的options挂载router
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router;
      }
    },
  });

  //注册并实现router-view router-link组件
  Vue.component("router-link", Link);
  //   Vue.component("router-link", {
  //     props: {
  //       to: {
  //         type: String,
  //         required: true,
  //       },
  //     },
  //     //jsx模式
  //     // render() {
  //     //     return <a href={'#' + this.to}>{this.$slots.default}</a>
  //     // }
  //     render(h) {
  //       // <a href="to">xxx</a>
  //       return h("a", { attrs: { href: "#" + this.to } }, this.$slots.default);
  //     },
  //   });
  Vue.component("router-view", View);
  //   Vue.component("router-view", {
  //     render(h) {
  //       //获取当前路由对应的组件
  //       let component = null;
  //       const route = this.$router.$options.routes.find(
  //         (route) => route.path === this.$router.current
  //       );
  //       if (route) {
  //         component = route.component;
  //       }
  //       return h(component);
  //     },
  //   });
};
export default VueRouter;
