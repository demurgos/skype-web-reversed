(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/modelHelpers/contacts/dataProcessors/outgoingInviteAccepted", [
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
      t && t.inviteeMri && f(t);
    }
    return n.get().conversationsManager._conversationsSynced.promise.then(t);
  }
  function f(e) {
    var t = l(e.inviteeMri);
    t && i.setAuthorization(t, u.AUTHORIZED);
  }
  function l(e) {
    var t = s.getId(e), n = s.getTypeFromKey(e);
    return r.build().getOrCreate(t, n, u.PENDING_OUTGOING);
  }
  var n = e("swx-jskype-internal-application-instance"), r = e("../../../modelHelpers/personsRegistry/instance"), i = e("../../../modelHelpers/contacts/authorizationChange"), s = e("swx-mri"), o = e("jskype-constants"), u = o.PEOPLE.authorizationStates;
  t.process = a;
}));
