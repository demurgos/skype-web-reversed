define("jSkype/models/account", [
  "require",
  "jcafe-property-model",
  "jSkype/client",
  "jSkype/modelHelpers/account/dataHandlers/entitlements",
  "jSkype/services/serviceFactory"
], function (e) {
  function s() {
    var e = this;
    e.entitlements = t.collection({
      get: function () {
        var s, o, u = n.get().personsAndGroupsManager.mePerson;
        return o = r.build(), s = i.getEntitlementService(), s.getEntitlementListingData(u.id()).then(o.onSuccess, o.onError).then(function () {
          return e.entitlements();
        });
      }
    });
    e.displayBalance = t.property({ readOnly: !0 });
    e._currency = t.property({ readOnly: !0 });
    e._balance = t.property({ readOnly: !0 });
  }
  var t = e("jcafe-property-model"), n = e("jSkype/client"), r = e("jSkype/modelHelpers/account/dataHandlers/entitlements"), i = e("jSkype/services/serviceFactory");
  return s;
});
