define("services/telemetry/logging/perf/usertimingTracer", [
  "require",
  "usertiming"
], function (e) {
  function n(e) {
    if (typeof t.getEntriesByName != "function")
      return !1;
    var n = t.getEntriesByName(e);
    return n !== undefined && n.length > 0;
  }
  var t = e("usertiming");
  return function (r) {
    this.logger = r;
    this.startTrace = function (e) {
      if (n(e))
        return;
      typeof t.mark == "function" && t.mark(e);
    };
    this.stopTrace = function (e) {
      if (!n(e))
        return;
      typeof t.measure == "function" && (t.measure(e + "_measure", e), t.clearMarks(e));
    };
    this.dumpMeasurements = function () {
      if (typeof t.getEntriesByType != "function")
        return {};
      var e = t.getEntriesByType("measure") || {};
      return e.length === 0 ? e : (this.logger.perf(e), typeof t.clearMeasures == "function" && t.clearMeasures(), e);
    };
  };
});
