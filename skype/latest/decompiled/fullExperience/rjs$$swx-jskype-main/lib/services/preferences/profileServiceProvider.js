(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/preferences/profileServiceProvider", [
      "require",
      "exports",
      "lodash-compat",
      "swx-enums",
      "../../../lib/services/ABCHProfile/instance",
      "swx-constants",
      "../../../lib/utils/preferences/preference",
      "../../../lib/services/preferences/proofProvider",
      "../../../lib/modelHelpers/contacts/dataHandlers/factory"
    ], e);
}(function (e, t) {
  function f(e) {
    return e === s.COMMON.proofTypes.EMAIL ? r.preferenceType.AutoBuddyDiscoveryEmail : e === s.COMMON.proofTypes.PHONE ? r.preferenceType.AutoBuddyDiscoveryPhone : r.preferenceType.Boolean;
  }
  function c() {
    return new l();
  }
  var n = e("lodash-compat"), r = e("swx-enums"), i = e("../../../lib/services/ABCHProfile/instance"), s = e("swx-constants"), o = e("../../../lib/utils/preferences/preference"), u = e("../../../lib/services/preferences/proofProvider"), a = e("../../../lib/modelHelpers/contacts/dataHandlers/factory"), l = function () {
      function e() {
      }
      return e.prototype.read = function () {
        var e = a.getABCHProfileServiceHandlers();
        return i.get().getProfile().then(e.onSuccess, e.onError).then(function (e) {
          return n.map(e, function (e) {
            var t = f(e.type);
            return o.build({
              id: s.COMMON.userSettings.preferences.DYNAMIC_DISCOVERY + "-" + e.value,
              type: t,
              provider: u.build(e),
              defaultValue: !1,
              telemetryName: s.COMMON.userSettings.preferences.DYNAMIC_DISCOVERY + "-" + t
            });
          });
        });
      }, e;
    }();
  t.ProfileServiceProvider = l;
  t.build = c;
}));
