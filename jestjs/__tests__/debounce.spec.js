test("防抖函数测试", (done) => {
  const { debounce } = require("../debounce");
  const mockFn = jest.fn();
  // 封装一个防抖函数
  const fn = debounce(mockFn, 10);

  // 连续两次调用
  fn(1);
  fn(2);

  setTimeout(() => {
    const calls = mockFn.mock.calls;
    // 断言只调用一次
    expect(calls.length).toBe(1);
    // 断言以最后一次调用为准
    expect(calls[0][0]).toBe(2);
    done();
  }, 50);
});
