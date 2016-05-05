define("services/telemetry/logging/perf/environments", [
  "require",
  "services/telemetry/logging/perf/usertimingTracer",
  "services/telemetry/logging/perf/dummyTracer"
], function (e) {
  var t = e("services/telemetry/logging/perf/usertimingTracer"), n = e("services/telemetry/logging/perf/dummyTracer"), r = {
      live: t,
      mock: t,
      dev: t
    };
  return {
    fetch: function (e) {
      return r[e] || n;
    }
  };
})
