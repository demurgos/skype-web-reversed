(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/modelHelpers/account/dataHandlers/entitlements", [
      "require",
      "exports",
      "../../propertyModelHelper",
      "lodash-compat",
      "../../../models/subscription",
      "../../../services/entitlement/serviceSettings",
      "swx-enums",
      "swx-jskype-internal-application-instance"
    ], e);
}(function (e, t) {
  function a() {
    function t(t) {
      var i = [];
      return r.forEach(t.response, f), r.forEach(e.entitlements(), function (e) {
        d(e, t.response) || i.push(e);
      }), r.forEach(i, function (t) {
        e.entitlements.remove(t.name());
      }), n.createResolvedPromise();
    }
    function a(e) {
      return n.createRejectedPromise(e);
    }
    function f(t) {
      if (l(t)) {
        h(t);
        return;
      }
      if (c(t)) {
        e.displayBalance._set(t.balanceFormatted);
        e._balance._set(t.balance);
        e._currency._set(t.attributes.currency);
        return;
      }
    }
    function l(e) {
      return e.service === o.subscriptionType.Package || e.service === o.subscriptionType.Plan;
    }
    function c(e) {
      return e.service === s.serviceNames.credit;
    }
    function h(t) {
      var n = e.entitlements(t.id);
      n ? p(n, t) : (n = new i["default"](), p(n, t), e.entitlements.add(n, n.name()));
    }
    function p(e, t) {
      e.name._set(t.id);
      e.type._set(t.service);
      e.active._set(t.active);
    }
    function d(e, t) {
      return r.some(t, function (t) {
        return e.name() === t.id;
      });
    }
    var e = u.get().personsAndGroupsManager.mePerson.account;
    return {
      onSuccess: t,
      onError: a
    };
  }
  var n = e("../../propertyModelHelper"), r = e("lodash-compat"), i = e("../../../models/subscription"), s = e("../../../services/entitlement/serviceSettings"), o = e("swx-enums"), u = e("swx-jskype-internal-application-instance");
  t.build = a;
}));
