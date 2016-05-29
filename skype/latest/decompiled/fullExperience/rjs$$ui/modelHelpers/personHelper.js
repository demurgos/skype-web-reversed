define("ui/modelHelpers/personHelper", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "cafe/applicationInstance",
  "constants/people"
], function (e, t) {
  function o(e) {
    return typeof e.isAgent == "function";
  }
  function u(e) {
    return !!e._authorization && typeof e._authorization == "function";
  }
  function a(e) {
    if (n.isString(e))
      return e.replace(s, "");
  }
  var n = e("lodash-compat"), r = e("cafe/applicationInstance"), i = e("constants/people"), s = /^(?:(\d+):)+/;
  t.isMePersonId = function (e) {
    var t = r.get().personsAndGroupsManager.mePerson, n = a(e);
    return t.id() === n || t._msaId && a(t._msaId()) === n;
  };
  t.isMePerson = function (e) {
    return t.isMePersonId(e.id());
  };
  t.isGuestId = function (e) {
    return /^guest:/.test(e);
  };
  t.isGuest = function (e) {
    return t.isGuestId(e.id());
  };
  t.isTechnicalAccount = function (e) {
    return /^live:/.test(e.id());
  };
  t.isEchoContact = function (e) {
    return t.isEchoContactId(e.id());
  };
  t.isEchoContactId = function (e) {
    return e === i.ECHO_CONTACT_ID;
  };
  t.isAgent = function (e) {
    return o(e) && e.isAgent();
  };
  t.isAuthorizedContact = function (e) {
    return u(e) ? e._authorization() === i.authorizationStates.AUTHORIZED : !0;
  };
  t.isSuggestedContact = function (e) {
    return u(e) && e._authorization() === i.authorizationStates.SUGGESTED;
  };
  t.isPstn = function (e) {
    return !!e.phoneNumbers.size() && e.id() === e.phoneNumbers(0).telUri();
  };
  t.hasPhoneNumbers = function (e) {
    return !!e.phoneNumbers.size();
  };
  t.isKnownPerson = function (e) {
    return !!e && r.get().personsAndGroupsManager.all.persons().filter(function (t) {
      return t.id() === e.id();
    }).length === 1;
  };
  t.getId = a;
});
