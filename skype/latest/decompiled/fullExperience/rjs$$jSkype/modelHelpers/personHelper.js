define("jSkype/modelHelpers/personHelper", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "jSkype/modelHelpers/contacts/dataMappers/dataMaps",
  "jSkype/services/stratus/serviceSettings",
  "constants/people",
  "jSkype/constants/people"
], function (e, t) {
  function f(e) {
    return e.match(u);
  }
  function l(e, i) {
    return t.isPstnId(e) ? c(e, r.contactTypes.pstn) : n(r.contactTypes).values().contains(i) ? c(e, i) : c(e, r.contactTypes.skype);
  }
  function c(e, t) {
    return t + ":" + e;
  }
  var n = e("lodash-compat"), r = e("jSkype/modelHelpers/contacts/dataMappers/dataMaps"), i = e("jSkype/services/stratus/serviceSettings"), s = e("constants/people"), o = e("jSkype/constants/people").authorizationStates, u = /^(?:(\d+):)+/, a = /^guest:/;
  t.getId = function (e) {
    if (n.isString(e))
      return e.replace(u, "");
  }, t.getKey = function (e, t) {
    if (n.isString(e))
      return f(e) ? e : l(e, t);
  }, t.getAvatarUri = function (e) {
    if (n.isString(e))
      return i.getAvatarEndPoint(e);
  }, t.isGuest = function (e) {
    return a.test(e.id());
  }, t.isGuestId = function (e) {
    return a.test(e);
  }, t.getTypeFromKey = function (e) {
    var t = u.exec(e);
    if (t)
      return t[1];
  }, t.isPstn = function (e) {
    return !!e.phoneNumbers.size() && e.id() === e.phoneNumbers(0).telUri();
  }, t.isPstnId = function (e) {
    return /^(\+)?\d+$/.test(e);
  }, t.isEchoContact = function (e) {
    return t.isEchoContactId(e.id());
  }, t.isEchoContactId = function (e) {
    return e === s.ECHO_CONTACT_ID;
  }, t.canRequestContactAuthorization = function (e) {
    return !t.isPstn(e) && !e.isBlocked();
  }, t.canAddToChatServiceContactList = function (e) {
    return e._authorization() === o.AUTHORIZED && !e.isBlocked() && !t.isPstn(e) && !t.isEchoContact(e);
  }, t.canRemoveContactFromChatServiceContactList = function (e) {
    return !t.isPstn(e) && !t.isEchoContact(e);
  };
})
