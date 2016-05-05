define("utils/common/logTracer/nullLogger", [
  "require",
  "exports",
  "module",
  "lodash-compat"
], function (e, t) {
  function r() {
    this.log = n.noop, this.info = n.noop, this.warn = n.noop, this.error = n.noop, this.debug = n.noop, this.createChild = function () {
      return this;
    };
  }
  var n = e("lodash-compat");
  t.build = function () {
    return new r();
  };
})
