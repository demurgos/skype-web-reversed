(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/modelHelpers/contacts/invitesListGetter", [
      "require",
      "exports",
      "swx-jskype-internal-application-instance",
      "../../../lib/services/contactsV2/instance",
      "../../../lib/modelHelpers/personHelper",
      "../../../lib/telemetry/people/contactInvitation",
      "../../../lib/modelHelpers/contacts/dataHandlers/contactInvitesList"
    ], e);
}(function (e, t) {
  function u() {
    var e;
    return i.isGuest(n.get().personsAndGroupsManager.mePerson) || (s.onQueryInvitationListStart(), e = r.get().getInvites(n.get().personsAndGroupsManager.mePerson.id()), e.then(o.onSuccess, o.onError)), e || Promise.resolve();
  }
  var n = e("swx-jskype-internal-application-instance"), r = e("../../../lib/services/contactsV2/instance"), i = e("../../../lib/modelHelpers/personHelper"), s = e("../../../lib/telemetry/people/contactInvitation"), o = e("../../../lib/modelHelpers/contacts/dataHandlers/contactInvitesList");
  t.get = u;
}));
