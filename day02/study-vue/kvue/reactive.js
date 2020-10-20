// 数组响应化处理
function reactiveArray() {
  // 获取原始数组原型
  const orgArrayProto = Array.prototype;
  // 备份数组原型并重写方法
  const reactiveArrayProto = Object.create(orgArrayProto);
  ["push", "pop", "shift", "unshift", "splice", "sort", "reverse"].forEach(
    (method) => {
      reactiveArrayProto[method] = function() {
        // 执行数组原始方法
        orgArrayProto[method].apply(this, arguments);
        // 触发变更通知
        console.log("数组操作: method: ", method, " arguments: ", arguments);
      };
    }
  );
  return reactiveArrayProto;
}

// 对象属性响应化处理
function reactiveObject(obj, key, val) {
  // 对象的值也是对象的情况进行递归操作
  observe(val);
  Object.defineProperty(obj, key, {
    get() {
      console.log("get 属性: ", key, " 值: ", val);
      return val;
    },
    set(newVal) {
      if (newVal !== val) {
        // 直接赋值对象的情况需要重新响应化处理
        observe(newVal);
        console.log("set 属性: ", key, " 值: ", newVal);
        newVal = val;
      }
    },
  });
}

// 执行统一响应化处理
function observe(obj) {
  if (typeof obj !== "object" || obj == null) {
    return;
  }
  if (Array.isArray(obj)) {
    //执行数组响应化
    //覆盖array原型
    obj.__proto__ = reactiveArray();
    for (let i = 0; i < obj.length; i++) {
      observe(obj[i]);
    }
  } else {
    //执行对象响应化(循环遍历将每个属性都进行响应化)
    Object.keys(obj).forEach((key) => reactiveObject(obj, key, obj[key]));
  }
}

const person = {
  name: "小明",
  age: 18,
  email: ["111@qq.com"],
  address: { city: "bj" },
};

observe(person);
