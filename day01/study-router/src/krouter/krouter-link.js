export default {
  props: {
    to: {
      type: String,
      required: true,
    },
  },
  //jsx模式
  // render() {
  //     return <a href={'#' + this.to}>{this.$slots.default}</a>
  // }
  render(h) {
    // <a href="to">xxx</a>
    return h("a", { attrs: { href: "#" + this.to } }, this.$slots.default);
  },
};
