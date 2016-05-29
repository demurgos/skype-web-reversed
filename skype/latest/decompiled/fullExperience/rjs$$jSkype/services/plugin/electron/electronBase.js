define("jSkype/services/plugin/electron/electronBase", [
  "require",
  "jSkype/services/electron",
  "jSkype/telemetry/logging/callingLogTracer",
  "constants/plugin.const"
], function (e) {
  function i() {
    var e = this;
    return e.isDisposed = !1, e._skypeModule = t.getSkypeModule(), e.whenUnloaded = Promise.resolve(), e;
  }
  var t = e("jSkype/services/electron"), n = e("jSkype/telemetry/logging/callingLogTracer").get(), r = e("constants/plugin.const");
  return i.prototype.getVersion = function (e) {
    var t = this._skypeModule.getVersion();
    e && e(t);
  }, i.prototype.checkExistence = function (e) {
    e && e(!0);
  }, i.prototype.dispose = function (e) {
    this.isDisposed = !0;
    e && e();
  }, i.prototype._raiseEvent = function (e, t) {
    n.log(this.constructor.name + " Event - " + e + ": " + JSON.stringify(t));
    this["on" + e] && this["on" + e](t);
  }, i.prototype._raiseLoadComplete = function (e) {
    this._raiseEvent("LoadComplete", { result: e ? r.LOAD_RESULT.LOAD_SUCCESSFUL : r.LOAD_RESULT.COMPONENT_INIT_FAILED });
  }, i;
});
