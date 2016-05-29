define("jSkype/telemetry/logging/callingLogTracer", [
  "require",
  "exports",
  "module",
  "utils/common/logTracer/api"
], function (e, t) {
  var n = e("utils/common/logTracer/api");
  t.get = function () {
    return n.getLogger("Calling");
  };
});
