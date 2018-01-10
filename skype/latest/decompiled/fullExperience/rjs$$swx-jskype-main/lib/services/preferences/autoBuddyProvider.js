(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/preferences/autoBuddyProvider", [
      "require",
      "exports",
      "../../../lib/services/ABCHUser/instance",
      "../../../lib/modelHelpers/contacts/dataHandlers/factory"
    ], e);
}(function (e, t) {
  function s() {
    return new i();
  }
  var n = e("../../../lib/services/ABCHUser/instance"), r = e("../../../lib/modelHelpers/contacts/dataHandlers/factory"), i = function () {
      function e() {
      }
      return e.prototype.read = function () {
        var e = r.getPeopleSettingsHandlers();
        return n.get().getSettings().then(e.onSuccess, e.onError);
      }, e.prototype.update = function (e) {
        return n.get().setSettings(e);
      }, e;
    }();
  t.AutoBuddyProvider = i;
  t.build = s;
}));
