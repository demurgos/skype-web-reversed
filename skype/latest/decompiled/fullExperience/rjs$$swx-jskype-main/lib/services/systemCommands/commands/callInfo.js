(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/systemCommands/commands/callInfo", [
      "require",
      "exports",
      "../../../../lib/services/systemCommands/commandsHelper",
      "../../../../lib/telemetry/logging/callingLogTracer",
      "../../../../lib/services/callRegister",
      "jskype-settings-instance",
      "swx-constants"
    ], e);
}(function (e, t) {
  function f() {
    return new a();
  }
  var n = e("../../../../lib/services/systemCommands/commandsHelper"), r = e("../../../../lib/telemetry/logging/callingLogTracer"), i = e("../../../../lib/services/callRegister"), s = e("jskype-settings-instance"), o = e("swx-constants"), u = r.get(), a = function () {
      function e() {
        this.showInHelp = !0;
        this.isAvailableFor = function (e) {
          return s.isFeatureOn(o.COMMON.featureFlags.CALL_INFO_COMMAND) && e === i.get().activeCalls()[0];
        };
        this.action = function (e, t, r) {
          function i(t) {
            n.sendSystemMessage(e, t);
            r.data.isSuccess = !0;
            r.publish();
          }
          function s(e) {
            u.log("/callInfo command failed: " + e);
            r.data.isSuccess = !1;
            r.publish();
          }
          e._callHandler ? e._callHandler.requestCallInfo().then(i)["catch"](s) : s("no call handler exists");
        };
      }
      return e;
    }();
  t.CallInfo = a;
  t.build = f;
}));
