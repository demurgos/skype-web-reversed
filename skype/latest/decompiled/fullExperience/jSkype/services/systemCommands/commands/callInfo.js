define("jSkype/services/systemCommands/commands/callInfo", [
  "require",
  "exports",
  "module",
  "jSkype/services/systemCommands/commandsHelper",
  "jSkype/telemetry/logging/callingLogTracer",
  "jSkype/services/callRegister",
  "jSkype/settings",
  "constants/common"
], function (e, t) {
  function u() {
    this.isAvailableFor = function (e) {
      return s.isFeatureOn(o.featureFlags.CALL_INFO_COMMAND) && e === i.get().activeCalls()[0];
    }, this.showInHelp = !0, this.action = function (e) {
      function t(t) {
        n.sendSystemMessage(e, t);
      }
      function i(e) {
        r.log("/callInfo command failed: " + e);
      }
      e._callHandler ? e._callHandler.requestCallInfo().then(t).catch(i) : i("no call handler exists");
    };
  }
  var n = e("jSkype/services/systemCommands/commandsHelper"), r = e("jSkype/telemetry/logging/callingLogTracer").get(), i = e("jSkype/services/callRegister"), s = e("jSkype/settings"), o = e("constants/common");
  t.build = function () {
    return new u();
  };
})
