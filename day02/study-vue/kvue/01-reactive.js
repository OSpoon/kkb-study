//数组响应式
//1. 替换数组原型中的7个方法
const orginalProto = Array.prototype;
//备份
const arrayProto = Object.create(orginalProto);
["push", "pop", "shift", "unshift", "splice", "sort", "reverse"].forEach(
  (method) => {
    arrayProto[method] = function() {
      //原始操作
      orginalProto[method].apply(this, arguments);
      //通知更新
      console.log("数组操作 ", method, arguments);
    };
  }
);
//数据响应式
function defineReactive(obj, key, val) {
  observe(val);
  Object.defineProperty(obj, key, {
    get() {
      console.log("get: ", key);
      return val;
    },
    set(newVal) {
      console.log("set: ", key);
      if (newVal !== val) {
        // 如果newVal是对象,再次做响应式处理
        observe(newVal);
        val = newVal;
      }
    },
  });
}

function set(obj, key, val) {
  defineReactive(obj, key, val);
}

//遍历obj,对其所有属性做响应式
function observe(obj) {
  if (typeof obj !== "object" || obj === null) {
    return;
  }
  if (Array.isArray(obj)) {
    // 覆盖原型
    obj.__proto__ = arrayProto;
    // 对数组内部的元素响应化
    const keys = Object.keys(obj);
    console.log(keys);
    for (let i = 0; i < obj.length; i++) {
      observe(obj[i]);
    }
  } else {
    //遍历obj所有key,做响应式处理
    Object.keys(obj).forEach((key) => {
      defineReactive(obj, key, obj[key]);
    });
  }
}

//Test
const obj = {
  foo: "foo",
  bar: "bar",
  baz: {
    a: 1,
  },
  arr: [],
};
// defineReactive(obj, "foo", "foo");
observe(obj);
// obj.foo;
// obj.foo = "foooo";
// obj.bar;
// obj.bar = "barrrrr";
// obj.baz.a;
// obj.baz.a = 2;
// obj.baz = {
//   a: 10,
// };
// obj.baz.a;
// obj.baz.a = 2;
// obj.dong = "dong";
// set(obj, "dong", "dong");
// obj.dong;
obj.arr.push(1);
