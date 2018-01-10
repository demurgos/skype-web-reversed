(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/modelHelpers/contacts/dataHandlers/contactNotification", [
      "require",
      "exports",
      "swx-jskype-internal-application-instance",
      "../../../services/contactsV2/instance",
      "../../../services/trouter/trouter",
      "../../../services/trouter/handlers/contactChangesMessageHandler",
      "../invitesListGetter",
      "../../../services/contacts/serviceSettings",
      "../../../services/cache/instance",
      "../dataProcessors/incomingInvite",
      "../dataProcessors/outgoingInviteAccepted",
      "../dataProcessors/incomingInvitesListChanged",
      "jskype-constants/lib/data",
      "../../../modelHelpers/contacts/dataHandlers/rawViewDataHandlers"
    ], e);
}(function (e, t) {
  function v() {
    function h() {
      var t = n.get().personsAndGroupsManager.mePerson.id();
      return a.get().getItem(d.CONTACTS_RAW_VIEW_ETAG).then(function (n) {
        r.get().getRawViewDelta(t, n, u.reasons.notification).then(e.onSuccess, e.onError);
      });
    }
    var e = p.build(), t = {
        onContactListChangedNotification: h,
        onInvitesListChangedNotification: o.get,
        onIncomingContactInviteNotification: f.process,
        onOutgoingContactInviteAcceptedNotification: l.process,
        onIncomingInvitesListChangedNotification: c.process
      };
    return i.registerMessageHandler(s.build(t)), t;
  }
  var n = e("swx-jskype-internal-application-instance"), r = e("../../../services/contactsV2/instance"), i = e("../../../services/trouter/trouter"), s = e("../../../services/trouter/handlers/contactChangesMessageHandler"), o = e("../invitesListGetter"), u = e("../../../services/contacts/serviceSettings"), a = e("../../../services/cache/instance"), f = e("../dataProcessors/incomingInvite"), l = e("../dataProcessors/outgoingInviteAccepted"), c = e("../dataProcessors/incomingInvitesListChanged"), h = e("jskype-constants/lib/data"), p = e("../../../modelHelpers/contacts/dataHandlers/rawViewDataHandlers"), d = h["default"].storageKeys;
  t.build = v;
}));
