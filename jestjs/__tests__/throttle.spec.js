test("节流函数测试", (done) => {
  const { throttle } = require("../throttle");
  const mockFn = jest.fn();
  const fn = throttle(mockFn, 10);

  fn(1);
  fn(2);

  setTimeout(() => {
    const calls = mockFn.mock.calls;
    expect(calls.length).toBe(1);
    expect(calls[0][0]).toBe(1);
    done();
  }, 50);
});
