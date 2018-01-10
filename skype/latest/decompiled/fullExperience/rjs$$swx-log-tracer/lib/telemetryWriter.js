(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-log-tracer/lib/telemetryWriter", [
      "require",
      "exports",
      "lodash-compat",
      "./helpers"
    ], e);
}(function (e, t) {
  function i(e, t) {
    var i = {};
    return i.supportsCorrelationId = function () {
      return !0;
    }, [
      "log",
      "info",
      "warn",
      "debug"
    ].forEach(function (t) {
      i[t] = e ? e[t] : n.noop;
    }), i.error = function () {
      var n = [];
      for (var s = 0; s < arguments.length; s++)
        n[s] = arguments[s];
      e && e.error.apply(i, n);
      var o = r.getFormattedMessage(n), u = n[0], a = typeof n[1] != "undefined" ? n[1] : "", f = typeof n[2] != "undefined" ? n[2] : "", l = {
          namespace: u,
          message: o,
          shortMessage: f,
          correlationId: a,
          level: "error"
        };
      t.send(l);
    }, i;
  }
  var n = e("lodash-compat"), r = e("./helpers");
  t.build = i;
}));
