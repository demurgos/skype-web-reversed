(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/modelHelpers/contacts/dataProcessors/incomingInvitesListChanged", [
      "require",
      "exports",
      "swx-jskype-internal-application-instance",
      "../../../modelHelpers/personsRegistry/instance",
      "../../../modelHelpers/contacts/authorizationChange",
      "swx-mri",
      "jskype-constants"
    ], e);
}(function (e, t) {
  function a(e) {
    function t() {
      var t = e && e.parameters;
      f(t) && l(t);
    }
    return n.get().conversationsManager._conversationsSynced.promise.then(t);
  }
  function f(e) {
    return e && e.inviterMri && e.context;
  }
  function l(e) {
    var t = c(e.inviterMri);
    t && (e.context === "accept" ? i.setAuthorization(t, u.AUTHORIZED) : e.context === "decline" && i.setAuthorization(t, u.UNAUTHORIZED));
  }
  function c(e) {
    var t = s.getId(e), n = s.getTypeFromKey(e);
    return r.build().getOrCreate(t, n, u.PENDING_INCOMING);
  }
  var n = e("swx-jskype-internal-application-instance"), r = e("../../../modelHelpers/personsRegistry/instance"), i = e("../../../modelHelpers/contacts/authorizationChange"), s = e("swx-mri"), o = e("jskype-constants"), u = o.PEOPLE.authorizationStates;
  t.process = a;
}));
