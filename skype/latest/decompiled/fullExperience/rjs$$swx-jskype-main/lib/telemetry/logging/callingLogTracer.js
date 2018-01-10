(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/telemetry/logging/callingLogTracer", [
      "require",
      "exports",
      "swx-log-tracer"
    ], e);
}(function (e, t) {
  function r() {
    return n.getLogger("Calling");
  }
  var n = e("swx-log-tracer");
  t.get = r;
}));
