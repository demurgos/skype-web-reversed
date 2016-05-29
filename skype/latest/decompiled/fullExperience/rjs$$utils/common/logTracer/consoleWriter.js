define("utils/common/logTracer/consoleWriter", [
  "require",
  "exports",
  "module",
  "utils/common/logTracer/helpers"
], function (e, t) {
  function r() {
    var e = this;
    [
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
    });
    this.debug = function () {
      function e(e, t, n) {
        var r = e.length, i = 0, s = e.indexOf("\n", i);
        do {
          var o = Math.min(r, i + t);
          for (var u = o; s >= i && s < u; o = s + 1, s = e.indexOf("\n", s + 1));
          n(e.substring(i, o));
          i = o;
        } while (i < r);
      }
      function u(e, n) {
        var i = typeof e == "string", s = i ? e.length : 0, o = r - n, u = i && e.indexOf("\n") !== -1;
        return t.accumulatedLength += s, t.accumulatedLength > o || u ? (t.accumulatedLength = 0, !0) : !1;
      }
      var t = { accumulatedLength: 0 }, r = 1024, i = [
          n.getTimeOfDayString(),
          arguments[0]
        ], s = i.reduce(function (e, t) {
          return e + t.length + 2;
        }, 0), o = arguments.length;
      for (var a = 1; a < arguments.length; a++)
        if (u(arguments[a]), s) {
          o = a;
          break;
        }
      console.log.apply(console, i.concat(Array.prototype.slice.call(arguments, 1, o)));
      var f = o;
      for (a = f; a < arguments.length; a++) {
        var l = u(arguments[a], 0);
        a > f && (l || a === arguments.length - 1) && console.log.apply(console, Array.prototype.slice.call(arguments, f, a));
        l && (e(arguments[a], r, console.log.bind(console)), f = a + 1);
      }
    };
  }
  var n = e("utils/common/logTracer/helpers");
  t.build = function () {
    return new r();
  };
});
