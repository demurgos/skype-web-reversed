define("services/telemetry/logging/perf/dummyTracer", [], function () {
  return function () {
    this.startTrace = function () {
    }, this.stopTrace = function () {
    }, this.dumpMeasurements = function () {
    };
  };
})
