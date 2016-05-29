define("ui/contextMenu/menuItem", [], function () {
  function e(e, n, r) {
    this.type = e;
    this.label = n;
    this.action = r || t;
    this.isEnabled = function () {
      return !0;
    };
  }
  function t() {
  }
  return e;
});
