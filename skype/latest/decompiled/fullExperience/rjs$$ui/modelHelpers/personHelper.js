define("ui/modelHelpers/personHelper", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "swx-cafe-application-instance",
  "swx-constants"
], function (e, t) {
  function o(e) {
    return n.isFunction(e.type);
  }
  function u(e) {
    return n.isFunction(e.isAgent);
  }
  function a(e) {
    return !!e._authorization && n.isFunction(e._authorization);
  }
  function f(e) {
    if (n.isString(e))
      return e.replace(s, "");
  }
  var n = e("lodash-compat"), r = e("swx-cafe-application-instance"), i = e("swx-constants").PEOPLE, s = /^(?:(\d+):)+/;
  t.isMePersonId = function (e) {
    var t = r.get().personsAndGroupsManager.mePerson, n = f(e);
    return t.id() === n || t._msaId && f(t._msaId()) === n;
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
    return u(e) && e.isAgent();
  };
  t.isAuthorizedContact = function (e) {
    return a(e) ? e._authorization() === i.authorizationStates.AUTHORIZED : !0;
  };
  t.isSuggestedContact = function (e) {
    return a(e) && e._authorization() === i.authorizationStates.SUGGESTED;
  };
  t.isPstn = function (e) {
    return o(e) && e.type() === "Phone" || !!e.phoneNumbers.size() && e.id() === e.phoneNumbers(0).telUri();
  };
  t.hasPhoneNumbers = function (e) {
    return !!e.phoneNumbers.size();
  };
  t.isKnownPerson = function (e) {
    return !!e && r.get().personsAndGroupsManager.all.persons().filter(function (t) {
      return t.id() === e.id();
    }).length === 1;
  };
  t.isOrganizationContact = function (e) {
    return n.isFunction(e._isOrganizationContact) ? e._isOrganizationContact() : !1;
  };
  t.getId = f;
  t.isWelcomeAgent = function (e) {
    return !!e && !!o(e) && e.type() === "ReplayBot";
  };
});
