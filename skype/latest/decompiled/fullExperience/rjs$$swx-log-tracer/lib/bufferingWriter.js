(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-log-tracer/lib/bufferingWriter", [
      "require",
      "exports",
      "./helpers"
    ], e);
}(function (e, t) {
  function r(e, t, n) {
    return new i(e, t, n);
  }
  var n = e("./helpers");
  t.build = r;
  var i = function () {
    function e(e, t, r) {
      function i(i, s, o) {
        var u = new Date().toUTCString(), a = o[0], f = o[1], l = n.getFormattedMessage(o), c = "[" + u + "][" + s + "][" + (f ? f + "][" : "") + a + "]" + " " + l, h = [
            "[" + u + "]",
            a + " -> " + l
          ];
        f && h.splice(1, 0, "[" + f + "]");
        if (e)
          try {
            e[i].apply(e, h);
          } catch (p) {
          }
        t.addMessage(c);
        "error" === s && r.addMessage(c);
      }
      this.supportsCorrelationId = function () {
        return !0;
      };
      this.log = function () {
        var e = [];
        for (var t = 0; t < arguments.length; t++)
          e[t] = arguments[t];
        return i("log", "log", e);
      };
      this.info = function () {
        var e = [];
        for (var t = 0; t < arguments.length; t++)
          e[t] = arguments[t];
        return i("info", "info", e);
      };
      this.warn = function () {
        var e = [];
        for (var t = 0; t < arguments.length; t++)
          e[t] = arguments[t];
        return i("warn", "warn", e);
      };
      this.error = function () {
        var e = [];
        for (var t = 0; t < arguments.length; t++)
          e[t] = arguments[t];
        return i("error", "error", e);
      };
      this.debug = function () {
        var e = [];
        for (var t = 0; t < arguments.length; t++)
          e[t] = arguments[t];
        return i("log", "debug", e);
      };
    }
    return e;
  }();
}));
