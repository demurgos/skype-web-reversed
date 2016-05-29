define("jSkype/services/preferences/profileServiceProvider", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "swx-enums",
  "constants/common",
  "jSkype/utils/preferences/preference",
  "jSkype/services/preferences/proofProvider",
  "jSkype/services/serviceFactory",
  "jSkype/modelHelpers/contacts/dataHandlers/factory"
], function (e, t) {
  function f() {
    this.read = function () {
      function t(e) {
        return e === i.proofTypes.EMAIL ? r.preferenceType.AutoBuddyDiscoveryEmail : e === i.proofTypes.PHONE ? r.preferenceType.AutoBuddyDiscoveryPhone : r.preferenceType.Boolean;
      }
      var e = a.getABCHProfileServiceHandlers();
      return u.getABCHProfileService().getProfile().then(e.onSuccess, e.onError).then(function (e) {
        return n.map(e, function (e) {
          var n = t(e.type);
          return s.build({
            id: i.userSettings.preferences.DYNAMIC_DISCOVERY + "-" + e.value,
            type: n,
            provider: o.build(e),
            defaultValue: !1,
            telemetryName: i.userSettings.preferences.DYNAMIC_DISCOVERY + "-" + n
          });
        });
      });
    };
  }
  var n = e("lodash-compat"), r = e("swx-enums"), i = e("constants/common"), s = e("jSkype/utils/preferences/preference"), o = e("jSkype/services/preferences/proofProvider"), u = e("jSkype/services/serviceFactory"), a = e("jSkype/modelHelpers/contacts/dataHandlers/factory");
  t.build = function () {
    return new f();
  };
});
