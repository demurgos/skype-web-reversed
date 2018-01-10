(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-log-tracer/lib/telemetryReporter", [
      "require",
      "exports",
      "lodash-compat"
    ], e);
}(function (e, t) {
  function r() {
    var e = {
      send: n.noop,
      update: function (t) {
        var r = t.reporting.telemetryManager, i = t.reporting.telemetryToken, s = t.reporting.throttleInterval;
        r && i ? e.send = n.throttle(function (e) {
          r.sendEvent(i, "logging", e);
        }, s, { trailing: !1 }) : e.send = n.noop;
      }
    };
    return e;
  }
  var n = e("lodash-compat");
  t.build = r;
}));
