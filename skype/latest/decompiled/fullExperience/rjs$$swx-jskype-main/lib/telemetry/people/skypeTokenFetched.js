(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/telemetry/people/skypeTokenFetched", [
      "require",
      "exports",
      "swx-jskype-internal-application-instance",
      "jskype-settings-instance",
      "swx-constants"
    ], e);
}(function (e, t) {
  var n = e("swx-jskype-internal-application-instance"), r = e("jskype-settings-instance"), i = e("swx-constants"), s = i.COMMON.telemetry.skypeTokenEvent.TYPE, o = i.COMMON.telemetry.NOT_AVAILABLE, u = function () {
      function e() {
        this.startTime = Date.now();
        this.published = !1;
        this.reauth = !1;
      }
      return e.prototype.publish = function (e, t, i, u) {
        if (this.published)
          return;
        var a = {
          authType: e,
          success: t,
          message: u || o,
          retryCount: i || o,
          reauth: this.reauth,
          ttc: Date.now() - this.startTime
        };
        n.get()._telemetryManager.sendEvent(r.settings.telemetry.jSkypeTenantToken, s, a);
        this.published = !0;
      }, e.updateIfNeeded = function (t) {
        return !t || t.published ? new e() : t;
      }, e;
    }();
  t.__esModule = !0;
  t["default"] = u;
}));
