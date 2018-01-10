(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/plugin/electron/electronBase", [
      "require",
      "exports",
      "../../../../lib/services/electron",
      "../../../../lib/telemetry/logging/callingLogTracer",
      "swx-utils-common",
      "swx-constants"
    ], e);
}(function (e, t) {
  var n = e("../../../../lib/services/electron"), r = e("../../../../lib/telemetry/logging/callingLogTracer"), i = e("swx-utils-common"), s = e("swx-constants"), o = r.get(), u = function () {
      function e() {
        this.isDisposed = !1;
        this._skypeModule = n.getSkypeModule();
        this.whenUnloaded = i.settablePromise.build();
      }
      return e.prototype.getVersion = function (e) {
        var t = this._skypeModule.getVersion();
        e && e(t);
      }, e.prototype.checkExistence = function (e) {
        e && e(!0);
      }, e.prototype.dispose = function (e) {
        this.isDisposed = !0;
        e && e();
        this.whenUnloaded.resolve();
      }, e.prototype._raiseEvent = function (e, t) {
        o.log("ElectronBase Event - " + e + ": " + JSON.stringify(t));
        var n = this;
        n["on" + e] && n["on" + e](t);
      }, e.prototype._raiseLoadComplete = function (e) {
        this._raiseEvent("LoadComplete", { result: e ? s.PLUGIN_CONST.LOAD_RESULT.LOAD_SUCCESSFUL : s.PLUGIN_CONST.LOAD_RESULT.COMPONENT_INIT_FAILED });
      }, e;
    }();
  t.__esModule = !0;
  t["default"] = u;
}));
