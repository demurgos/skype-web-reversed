(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-log-tracer/lib/consoleWriter", [
      "require",
      "exports",
      "./helpers"
    ], e);
}(function (e, t) {
  function r() {
    var e = {};
    return [
      "error",
      "warn",
      "info",
      "log"
    ].forEach(function (t) {
      Object.defineProperty(e, t, {
        get: function () {
          return console[t].bind(console, n.getTimeOfDayString());
        }
      });
    }), e.debug = function () {
      function r(e, t, n) {
        var r = e.length, i = 0, s = e.indexOf("\n", i);
        do {
          var o = Math.min(r, i + t);
          for (var u = o; s >= i && s < u; o = s + 1, s = e.indexOf("\n", s + 1));
          n(e.substring(i, o));
          i = o;
        } while (i < r);
      }
      function f(e, t) {
        var n = typeof e == "string" ? e.length : 0, r = s - t, o = typeof e == "string" && e.indexOf("\n") !== -1;
        return i.accumulatedLength += n, i.accumulatedLength > r || o ? (i.accumulatedLength = 0, !0) : !1;
      }
      var e = [];
      for (var t = 0; t < arguments.length; t++)
        e[t] = arguments[t];
      var i = { accumulatedLength: 0 }, s = 1024, o = [
          n.getTimeOfDayString(),
          e[0]
        ], u = o.reduce(function (e, t) {
          return e + t.length + 2;
        }, 0), a = e.length;
      for (var l = 1; l < e.length; l++)
        if (f(e[l], u)) {
          a = l;
          break;
        }
      console.log.apply(console, o.concat(Array.prototype.slice.call(e, 1, a)));
      var c = a;
      for (var l = c; l < e.length; l++) {
        var h = f(e[l], 0);
        l > c && (h || l === e.length - 1) && console.log.apply(console, Array.prototype.slice.call(e, c, l));
        h && (r(e[l], s, console.log.bind(console)), c = l + 1);
      }
    }, e;
  }
  var n = e("./helpers");
  t.build = r;
}));
