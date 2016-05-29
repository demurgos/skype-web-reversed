define("services/telemetry/logging/perf/main", [
  "require",
  "services/telemetry/logging/perf/environments"
], function (e) {
  function r(e) {
    var n = e ? e.environment : "default";
    return t.fetch(n);
  }
  var t = e("services/telemetry/logging/perf/environments"), n;
  return {
    getInstance: function () {
      return n || this.construct(), n;
    },
    construct: function (e, t) {
      var i = r(e);
      n = new i(t);
    },
    destroy: function () {
      n = undefined;
    }
  };
});
