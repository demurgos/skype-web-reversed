(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/modelHelpers/contacts/dataHandlers/profileNotification", [
      "require",
      "exports",
      "swx-jskype-internal-application-instance",
      "../../../services/stratus/instance",
      "../../../services/trouter/trouter",
      "../../../services/trouter/handlers/profileChangesMessageHandler",
      "./factory"
    ], e);
}(function (e, t) {
  function u() {
    function t() {
      n.get().personsAndGroupsManager.mePerson.updateAvatarUrl();
    }
    function u() {
      var e = o.getMeProfileHandlers();
      return r.get().getProfile().then(e.onUpdate, e.onError);
    }
    var e = {
      onUserProfileChangeNotification: u,
      onUserAvatarChangeNotification: t
    };
    return i.registerMessageHandler(s.build(e)), e;
  }
  var n = e("swx-jskype-internal-application-instance"), r = e("../../../services/stratus/instance"), i = e("../../../services/trouter/trouter"), s = e("../../../services/trouter/handlers/profileChangesMessageHandler"), o = e("./factory");
  t.build = u;
}));
