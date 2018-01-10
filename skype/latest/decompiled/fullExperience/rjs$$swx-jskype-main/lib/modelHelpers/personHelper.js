(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/modelHelpers/personHelper", [
      "require",
      "exports",
      "lodash-compat",
      "jskype-settings-instance",
      "swx-mri",
      "swx-constants",
      "jskype-constants"
    ], e);
}(function (e, t) {
  function u(e, t) {
    return n.isString(e) ? t ? m(e, t) : v(e) : undefined;
  }
  function a(e) {
    return i.isGuestId(e.id());
  }
  function f(e) {
    return !!e.phoneNumbers.size() && e.id() === e.phoneNumbers(0).telUri();
  }
  function l(e) {
    return c(e.id());
  }
  function c(e) {
    return e === s.PEOPLE.ECHO_CONTACT_ID;
  }
  function h(e) {
    return !f(e) && !e.isBlocked();
  }
  function p(e) {
    return e._authorization() === o.PEOPLE.authorizationStates.AUTHORIZED && !e.isBlocked() && !f(e) && !l(e);
  }
  function d(e) {
    return !f(e) && !l(e);
  }
  function v(e) {
    var t = r.settings.avatarService;
    return t.host + t.publicAvatarEndpoint.replace("${contactId}", encodeURIComponent(e));
  }
  function m(e, t) {
    var n = r.settings.avatarService;
    return n.host + n.contactAvatarEndpoint.replace("${contactId}", encodeURIComponent(e)).replace("${authKey}", encodeURIComponent(t));
  }
  var n = e("lodash-compat"), r = e("jskype-settings-instance"), i = e("swx-mri"), s = e("swx-constants"), o = e("jskype-constants");
  t.getAvatarUri = u;
  t.isGuest = a;
  t.isPstn = f;
  t.isEchoContact = l;
  t.isEchoContactId = c;
  t.canRequestContactAuthorization = h;
  t.canAddToChatServiceContactList = p;
  t.canRemoveContactFromChatServiceContactList = d;
}));
