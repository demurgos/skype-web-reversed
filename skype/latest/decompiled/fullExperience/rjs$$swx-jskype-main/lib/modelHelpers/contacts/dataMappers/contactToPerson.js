(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/modelHelpers/contacts/dataMappers/contactToPerson", [
      "require",
      "exports",
      "../../../modelHelpers/contacts/authorizationChange",
      "../../../modelHelpers/contacts/presenceHelper",
      "../../../modelHelpers/contacts/groupHelper",
      "../../../modelHelpers/contacts/dataMappers/mappers",
      "jskype-constants",
      "swx-mri/lib/mriMaps",
      "swx-enums",
      "lodash-compat"
    ], e);
}(function (e, t) {
  function v(e, t, o) {
    var u = e.profile || {}, l = f.result(u.name, "first"), v = f.result(u.name, "surname"), S = f.result(u.name, "title"), T = w(e), N = g(e), C = [];
    s.mapAvatarUrl(u.avatar_url, t);
    s.mapDisplayName(e.display_name, t);
    s.mapFirstName(l, t);
    s.mapLastName(v, t);
    s.mapTitle(S, t);
    s.mapPhoneNumbers(u.phones, t, p);
    s.mapPhoneNumbers(e.phones, t, d);
    s.mapActivity(N, t);
    s.mapBirthday(u.birthday, t);
    E(t, e) && s.mapCapabilities(b(t, e), t);
    m(u.locations) && y(u.locations[0], t);
    t.displayName() === t.id() && s.mapDisplayNameFallback(l, v, t);
    o && t.status._set(r.getDefaultPresence(t, T));
    n.setAuthorization(t, T, c);
    e.blocked ? n.setBlocked(t, c) : n.setUnblocked(t, c);
    e.favorite && C.push(a.groupType.Favorites);
    x(t, e) && t.agentDetails.certification._set(e.agent.trust === h);
    i.updateGroups(t, C);
  }
  function m(e) {
    return f.isArray(e) && f.isPlainObject(e[0]);
  }
  function g(e) {
    return e.suggested ? o.PEOPLE.SUGGESTED_CONTACT_ACTIVITY_MESSAGE : !!e.profile && e.profile.mood;
  }
  function y(e, t) {
    s.mapCity(e.city, t);
    s.mapCountry(e.country, t);
  }
  function b(e, t) {
    return e._type() === u.contactMriTypes.agent ? t.agent.capabilities : e._type() === u.contactMriTypes.pstn ? [
      "audio.receive",
      "group.add"
    ] : [];
  }
  function w(e) {
    return e.authorized === !0 ? l.AUTHORIZED : e.suggested === !0 ? l.SUGGESTED : l.PENDING_OUTGOING;
  }
  function E(e, t) {
    return e._type() === u.contactMriTypes.agent && S(t) || e._type() === u.contactMriTypes.pstn;
  }
  function S(e) {
    return !!e.agent && !!e.agent.capabilities;
  }
  function x(e, t) {
    return e._type() === u.contactMriTypes.agent && T(t);
  }
  function T(e) {
    return !!e.agent && e.agent.trust !== undefined;
  }
  var n = e("../../../modelHelpers/contacts/authorizationChange"), r = e("../../../modelHelpers/contacts/presenceHelper"), i = e("../../../modelHelpers/contacts/groupHelper"), s = e("../../../modelHelpers/contacts/dataMappers/mappers"), o = e("jskype-constants"), u = e("swx-mri/lib/mriMaps"), a = e("swx-enums"), f = e("lodash-compat"), l = o.PEOPLE.authorizationStates, c = !1, h = "trusted", p = !0, d = !1;
  t.map = v;
}));
