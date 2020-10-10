// 实现插件,挂载$store
// 实现数据管理

let Vue;
class Store {
  constructor(options) {
    this._mutations = options.mutations;
    this._actions = options.actions;
    this._wrappedGetters = options.getters;

    // 定义computed选项
    const computed = {};
    this.getters = {};
    //
    const store = this;
    Object.keys(this._wrappedGetters).forEach((key) => {
      //获取用户定义的getter
      const fn = store._wrappedGetters[key];
      //转换为computed可以使用的无参形式
      computed[key] = function() {
        return fn(store.state);
      };
      // 为getters定制只读属性
      Object.defineProperty(store.getters, key, {
        get: () => store._vm[key],
      });
    });

    //响应化处理state
    //this.state = new Vue({
    //     data: options.data
    // })
    this._vm = new Vue({
      data: {
        //加两个$,vue不做代理
        $$state: options.state,
      },
      computed,
    });

    // 绑定commit,dispatch的上下文Store实例
    this.commit = this.commit.bind(this);
    this.dispatch = this.dispatch.bind(this);
  }

  get state() {
    return this._vm._data.$$state;
  }

  set state(v) {
    console.error("please use replaceState to reset this.state");
  }

  commit(type, payload) {
    const entry = this._mutations[type];
    if (!entry) {
      console.error("unkown mutation type");
    }
    entry(this.state, payload);
  }

  dispatch(type, payload) {
    const entry = this._actions[type];
    if (!entry) {
      console.error("unkown actions type");
    }
    entry(this, payload);
  }
}

function install(_Vue) {
  Vue = _Vue;

  Vue.mixin({
    beforeCreate() {
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store;
      }
    },
  });
}

export default {
  Store,
  install,
};
