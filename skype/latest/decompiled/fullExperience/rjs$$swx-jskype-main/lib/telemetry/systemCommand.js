(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/telemetry/systemCommand", [
      "require",
      "exports",
      "swx-jskype-internal-application-instance",
      "jskype-settings-instance",
      "swx-constants"
    ], e);
}(function (e, t) {
  function s() {
    return {
      argument: i.COMMON.telemetry.NOT_AVAILABLE,
      isAvailable: i.COMMON.telemetry.NOT_AVAILABLE,
      isExisting: i.COMMON.telemetry.NOT_AVAILABLE,
      isGroup: i.COMMON.telemetry.NOT_AVAILABLE,
      isAdmin: i.COMMON.telemetry.NOT_AVAILABLE,
      name: i.COMMON.telemetry.NOT_AVAILABLE,
      isSuccess: i.COMMON.telemetry.NOT_AVAILABLE
    };
  }
  var n = e("swx-jskype-internal-application-instance"), r = e("jskype-settings-instance"), i = e("swx-constants"), o = function () {
      function e() {
        this.data = s();
      }
      return e.prototype.publish = function () {
        n.get()._telemetryManager.sendEvent(r.settings.telemetry.jSkypeTenantToken, i.COMMON.telemetry.chat.SYSTEM_COMMAND, this.data);
        this.reset();
      }, e.prototype.reset = function () {
        this.data = s();
      }, e;
    }();
  t.__esModule = !0;
  t["default"] = o;
}));
