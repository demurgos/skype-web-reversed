(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/modelHelpers/contacts/inviteMessage", [
      "require",
      "exports",
      "swx-jskype-internal-application-instance",
      "swx-utils-chat",
      "swx-i18n"
    ], e);
}(function (e, t) {
  function s(e) {
    return u(e.message);
  }
  function o(e) {
    return u(e.greeting);
  }
  function u(e) {
    if (e)
      return r.messageSanitizer.escapeIncomingHTML(r.messageSanitizer.removeAnchorTags(e));
    var t = n.get().personsAndGroupsManager.mePerson.displayName();
    return t || (t = n.get().personsAndGroupsManager.mePerson.id()), i.localization.fetch({
      key: "message_text_contactRequestGreeting",
      params: { displayName: t }
    });
  }
  var n = e("swx-jskype-internal-application-instance"), r = e("swx-utils-chat"), i = e("swx-i18n");
  t.getSanitizedInviteMessage = s;
  t.getSanitizedInviteGreeting = o;
}));
