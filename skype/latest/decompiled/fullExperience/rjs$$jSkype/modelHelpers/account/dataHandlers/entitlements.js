define("jSkype/modelHelpers/account/dataHandlers/entitlements", [
  "require",
  "exports",
  "module",
  "jSkype/modelHelpers/propertyModelHelper",
  "lodash-compat",
  "jSkype/models/subscription",
  "jSkype/services/entitlement/serviceSettings",
  "swx-enums",
  "jSkype/client"
], function (e, t) {
  function a() {
    function t(t) {
      if (a(t)) {
        l(t);
        return;
      }
      if (f(t)) {
        e.displayBalance._set(t.balanceFormatted), e._balance._set(t.balance), e._currency._set(t.attributes.currency);
        return;
      }
    }
    function a(e) {
      return e.service === o.subscriptionType.Package || e.service === o.subscriptionType.Plan;
    }
    function f(e) {
      return e.service === s.serviceNames.credit;
    }
    function l(t) {
      var n = e.entitlements(t.id);
      n ? c(n, t) : (n = new i(), c(n, t), e.entitlements.add(n, n.name()));
    }
    function c(e, t) {
      e.name._set(t.id), e.type._set(t.service), e.active._set(t.active);
    }
    function h(e, t) {
      return r.some(t, function (t) {
        return e.name() === t.id;
      });
    }
    var e = u.get().personsAndGroupsManager.mePerson.account;
    this.onSuccess = function (i) {
      var s = [];
      return r.forEach(i.response, t), r.forEach(e.entitlements(), function (t) {
        h(t, i.response) || s.push(t);
      }), r.forEach(s, function (n) {
        e.entitlements.remove(n.name());
      }), n.createResolvedPromise();
    }, this.onError = function (e) {
      return n.createRejectedPromise(e);
    };
  }
  var n = e("jSkype/modelHelpers/propertyModelHelper"), r = e("lodash-compat"), i = e("jSkype/models/subscription"), s = e("jSkype/services/entitlement/serviceSettings"), o = e("swx-enums"), u = e("jSkype/client");
  t.classFunction = a, t.build = function () {
    return new a();
  };
})
