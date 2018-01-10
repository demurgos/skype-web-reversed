(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-log-tracer/lib/decoratingLogger", [
      "require",
      "exports",
      "lodash-compat"
    ], e);
}(function (e, t) {
  function r(e, t, i, s) {
    function u(e) {
      return typeof e.supportsCorrelationId == "function" && e.supportsCorrelationId();
    }
    function a(e) {
      return typeof e == "function" ? e() : e;
    }
    var o = {};
    return [
      "error",
      "warn",
      "info",
      "log"
    ].forEach(function (n) {
      Object.defineProperty(o, n, {
        get: function () {
          return u(e) ? e[n].bind(e, t(), a(i)) : e[n].bind(e, t());
        }
      });
    }), s ? Object.defineProperty(o, "debug", {
      get: function () {
        return u(e) ? e.debug.bind(e, t(), a(i)) : e.debug.bind(e, t());
      }
    }) : o.debug = n.noop, o.createChild = function (n, o, u) {
      var a = typeof n == "function" ? function () {
        return t() + "::" + n();
      } : function () {
        return t() + "::" + n;
      };
      return typeof u == "undefined" && (u = s), typeof o == "undefined" && (o = i), r(e, a, o, u);
    }, o;
  }
  var n = e("lodash-compat");
  t.build = r;
}));
