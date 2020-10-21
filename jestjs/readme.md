# JS 单元测试

## [Jest 中文文档地址](https://jestjs.io/zh-Hans/)

### 安装

```sh
# 全局安装
npm i jest -g
# 局部安装
npm install --save-dev jest
```

### 初始化目录 `npm init -y`

### 编写业务代码

```js
function sum(a, b) {
  return a + b;
}
module.exports = sum;
```

### 编写单元测试

```js
// __tests__/业务模块.spec.js or __tests__/业务模块.test.js
const sum = require("../index");

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});
```

### 执行 `jest` 启动单元测试

### 扩展

1. 配置扩展指令

```json
{
  "scripts": {
    "test": "jest"
  }
}
```

2. 更多配置 `jest --init` 生成 `jest.config.js`配置文件
   1. 生成一个基础配置文件
      1. 选择将用于测试的测试环境 node/jsdom
      2. 你想让 Jest 添加覆盖报告吗?
      3. 应使用哪个提供程序来检测覆盖率代码? v8/babel
      4. 自动清除每个测试之间的模拟调用和实例？
   2. 使用 Babel `yarn add --dev babel-jest @babel/core @babel/preset-env`
      1. 创建: `babel.config.js`
      2. 内容:
         ```js
         // babel.config.js
         module.exports = {
           presets: [
             [
               "@babel/preset-env",
               {
                 targets: {
                   node: "current",
                 },
               },
             ],
           ],
         };
         ```

### 匹配器使用

1. 普通匹配器
   1. expect().toBe() 精确匹配值
   2. expect().toEqual() 检查对象的值
   3. expect().not.toBe() 取反
2. 真实性
   1. expect().toBeNull() 只匹配 null
   2. expect().toBeUndefined() 只匹配 undefined
   3. expect().toBeDefined() 与 toBeUndefined 相反
   4. expect().toBeTruthy() 匹配任何 if 语句为真
   5. expect().toBeFalsy() 匹配任何 if 语句为假
3. 数字
   1. expect(value).toBeCloseTo(0.3); 浮点数比较
   2. expect(value).toBeGreaterThan(3); 大于 3
   3. expect(value).toBeGreaterThanOrEqual(3.5); 大于等于 3.5
   4. expect(value).toBeLessThan(5); 小于 5
   5. expect(value).toBeLessThanOrEqual(4.5); 小于等于 4.5
4. 字符串
   1. expect().not.toMatch(/I/) 正则匹配
5. 数组 or 迭代器
   expect(shoppingList).toContain('beer');
   expect(new Set(shoppingList)).toContain('beer');
6. 异常
   expect(compileAndroidCode).toThrow(Error);

### 异步代码测试

1. 回调

   ```js
   test("the data is peanut butter", (done) => {
     function callback(data) {
       try {
         expect(data).toBe("peanut butter");
         done();
       } catch (error) {
         done(error);
       }
     }

     fetchData(callback);
   });
   ```

2. Promises

   ```js
   test("the data is peanut butter", () => {
     return fetchData().then((data) => {
       expect(data).toBe("peanut butter");
     });
   });
   ```

3. .resolves/.rejects

   1. 您也可以在 expect 语句中使用 .resolves 匹配器，Jest 将等待此 Promise 解决。 如果承诺被拒绝，则测试将自动失败。

      ```js
      test("the data is peanut butter", () => {
        return expect(fetchData()).resolves.toBe("peanut butter");
      });
      ```

   2. 一定不要忘记把整个断言作为返回值返回⸺如果你忘了 return 语句的话，在 fetchData 返回的这个 promise 变更为 resolved 状态、then() 有机会执行之前，测试就已经被视为已经完成了。If you expect a promise to be rejected, use the .rejects matcher. 它参照工程 .resolves 匹配器。 如果 Promise 被拒绝，则测试将自动失败。

      ```js
      test("the fetch fails with an error", () => {
        return expect(fetchData()).rejects.toMatch("error");
      });
      ```

4. Async/Await

```js
test("the data is peanut butter", async () => {
  const data = await fetchData();
  expect(data).toBe("peanut butter");
});

test("the fetch fails with an error", async () => {
  expect.assertions(1);
  try {
    await fetchData();
  } catch (e) {
    expect(e).toMatch("error");
  }
});

test("the data is peanut butter", async () => {
  await expect(fetchData()).resolves.toBe("peanut butter");
});

test("the fetch fails with an error", async () => {
  await expect(fetchData()).rejects.toThrow("error");
});
```
