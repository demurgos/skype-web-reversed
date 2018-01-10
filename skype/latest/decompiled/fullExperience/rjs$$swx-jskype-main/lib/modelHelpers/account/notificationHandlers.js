(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/modelHelpers/account/notificationHandlers", [
      "require",
      "exports",
      "swx-jskype-internal-application-instance",
      "jskype-settings-instance",
      "jskype-constants",
      "../../services/serviceFactory",
      "../../services/trouter/trouter",
      "../../services/trouter/handlers/accountChangesMessageHandler",
      "./dataHandlers/factory"
    ], e);
}(function (e, t) {
  function f() {
    function r() {
      if (!l())
        return;
      var t = n.get().personsAndGroupsManager.mePerson.id();
      s.getEntitlementService().getEntitlementListingData(t).then(e.onSuccess, e.onError);
    }
    var e = a.getAccountChangedHandler(), t = { onUserServicesChange: r };
    return o.registerMessageHandler(u.build(t)), t;
  }
  function l() {
    return r.isFeatureOn(i.FEATURE_FLAGS.CREDIT_BALANCE_AUTO_UPDATE_ENABLED);
  }
  var n = e("swx-jskype-internal-application-instance"), r = e("jskype-settings-instance"), i = e("jskype-constants"), s = e("../../services/serviceFactory"), o = e("../../services/trouter/trouter"), u = e("../../services/trouter/handlers/accountChangesMessageHandler"), a = e("./dataHandlers/factory");
  t.build = f;
}));
