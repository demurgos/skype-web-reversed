define("utils/common/logTracer/decoratingLogger", [
  "require",
  "exports",
  "module",
  "lodash-compat"
], function (e, t) {
  function r(e, t, i) {
    var s = this;
    [
      "error",
      "warn",
      "info",
      "log"
    ].forEach(function (n) {
      Object.defineProperty(s, n, {
        get: function () {
          return e[n].bind(e, t());
        }
      });
    }), i ? ["debug"].forEach(function (n) {
      Object.defineProperty(s, n, {
        get: function () {
          return e[n].bind(e, t());
        }
      });
    }) : s.debug = n.noop, s.createChild = function (n, s) {
      var o = typeof n == "function" ? function () {
        return t() + "::" + n();
      } : function () {
        return t() + "::" + n;
      };
      return typeof s == "undefined" && (s = i), new r(e, o, s);
    };
  }
  var n = e("lodash-compat");
  t.build = function (e, t, n) {
    return new r(e, t, n);
  };
})
