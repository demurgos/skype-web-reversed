define("utils/common/logTracer/telemetryReporter", [
  "require",
  "exports",
  "module",
  "lodash-compat"
], function (e, t) {
  function r() {
    var e = this;
    e.send = n.noop, e.update = function (t) {
      var r = t.reporting.telemetryManager, i = t.reporting.telemetryToken, s = t.reporting.throttleInterval;
      r && i ? e.send = n.throttle(function (e) {
        r.sendEvent(i, "logging", e);
      }, s, { trailing: !1 }) : e.send = n.noop;
    };
  }
  var n = e("lodash-compat");
  t.build = function () {
    return new r();
  };
})
