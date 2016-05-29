define("experience/telemetryFactory", [
  "require",
  "exports",
  "module",
  "services/telemetry/common/telemetry",
  "services/telemetry/experience.instrumentation",
  "services/telemetry/people/performance/performanceTelemetry"
], function (e, t) {
  function s() {
    function t(e) {
      n.instrumentAllEvents(e);
    }
    var e = {
      experience: function () {
        t(r);
      },
      people: function () {
        i.init();
      }
    };
    this.init = function (t) {
      e[t] && e[t]();
    };
  }
  var n = e("services/telemetry/common/telemetry"), r = e("services/telemetry/experience.instrumentation"), i = e("services/telemetry/people/performance/performanceTelemetry");
  t.build = function () {
    return new s();
  };
});
