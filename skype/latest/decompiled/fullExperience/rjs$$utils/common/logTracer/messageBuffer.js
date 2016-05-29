define("utils/common/logTracer/messageBuffer", [
  "require",
  "exports",
  "module"
], function (e, t) {
  function n() {
    var e = [], t = 0;
    this.addMessage = function (n) {
      t += n.length;
      e.push(n);
    };
    this.toString = function () {
      return e.join("\n");
    };
    this.clear = function () {
      e = [];
    };
  }
  t.build = function () {
    return new n();
  };
});
