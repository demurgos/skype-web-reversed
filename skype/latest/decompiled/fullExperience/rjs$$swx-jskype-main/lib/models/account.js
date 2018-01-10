(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/models/account", [
      "require",
      "exports",
      "jcafe-property-model",
      "swx-jskype-internal-application-instance",
      "../modelHelpers/account/dataHandlers/entitlements",
      "../services/serviceFactory"
    ], e);
}(function (e, t) {
  var n = e("jcafe-property-model"), r = e("swx-jskype-internal-application-instance"), i = e("../modelHelpers/account/dataHandlers/entitlements"), s = e("../services/serviceFactory"), o = function () {
      function e() {
        var e = this;
        this.entitlements = n.collection({
          get: function () {
            var t = r.get().personsAndGroupsManager.mePerson, n = i.build(), o = s.getEntitlementService();
            return o.getEntitlementListingData(t.id()).then(n.onSuccess, n.onError).then(function () {
              return e.entitlements();
            });
          }
        });
        this.displayBalance = n.property({ readOnly: !0 });
        this._currency = n.property({ readOnly: !0 });
        this._balance = n.property({ readOnly: !0 });
      }
      return e;
    }();
  t.__esModule = !0;
  t["default"] = o;
}));
