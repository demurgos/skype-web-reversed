(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/plugin/electron/electronSupportDetector", [
      "require",
      "exports",
      "../../../../lib/services/electron",
      "../../../../lib/telemetry/logging/callingLogTracer",
      "swx-enums"
    ], e);
}(function (e, t) {
  function u() {
    try {
      return n.getSkypeModule(), !0;
    } catch (e) {
      return s.warn(e), !1;
    }
  }
  function a() {
    return new o();
  }
  var n = e("../../../../lib/services/electron"), r = e("../../../../lib/telemetry/logging/callingLogTracer"), i = e("swx-enums"), s = r.get(), o = function () {
      function e() {
      }
      return e.prototype.getCallingSupport = function () {
        return u() ? Promise.resolve({
          isSupported: !0,
          reason: ""
        }) : Promise.resolve({
          isSupported: !1,
          reason: i.callingNotSupportedReasons.PluginBlocked
        });
      }, e;
    }();
  t.ElectronSupportDetector = o;
  t.build = a;
}));
