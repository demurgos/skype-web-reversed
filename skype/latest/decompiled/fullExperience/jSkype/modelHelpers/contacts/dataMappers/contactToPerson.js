define("jSkype/modelHelpers/contacts/dataMappers/contactToPerson", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "jSkype/constants/people",
  "jSkype/constants/people",
  "jSkype/modelHelpers/contacts/authorizationChange",
  "jSkype/modelHelpers/personsAndGroupsHelper",
  "jSkype/modelHelpers/contacts/dataMappers/mappers",
  "jSkype/modelHelpers/contacts/dataMappers/dataMaps"
], function (e, t) {
  function l(e) {
    return n.isArray(e) && n.isPlainObject(e[0]);
  }
  function c(e) {
    return e.suggested ? r.SUGGESTED_CONTACT_ACTIVITY_MESSAGE : e.mood;
  }
  function h(e, t) {
    u.mapCity(e.city, t), u.mapCountry(e.country, t);
  }
  function p(e) {
    return e.type === "agent" ? e.agent.capabilities : e.type === "pstn" ? [
      "audio.receive",
      "group.add"
    ] : [];
  }
  function d(e) {
    return e.authorized === !0 ? i.AUTHORIZED : e.suggested === !0 ? i.SUGGESTED : i.PENDING_OUTGOING;
  }
  function v(e) {
    return e.type === a.contactTypeNames.agent && m(e) || e.type === a.contactTypeNames.pstn;
  }
  function m(e) {
    return !!e.agent && !!e.agent.capabilities;
  }
  var n = e("lodash-compat"), r = e("jSkype/constants/people"), i = e("jSkype/constants/people").authorizationStates, s = e("jSkype/modelHelpers/contacts/authorizationChange"), o = e("jSkype/modelHelpers/personsAndGroupsHelper"), u = e("jSkype/modelHelpers/contacts/dataMappers/mappers"), a = e("jSkype/modelHelpers/contacts/dataMappers/dataMaps"), f = !1;
  t.map = function (t, r, i) {
    var a = n.result(t.name, "first"), m = n.result(t.name, "surname"), g = d(t), y = c(t);
    u.mapType(t.type, r), u.mapAvatarUrl(t.avatar_url, r), u.mapDisplayName(t.display_name, r), u.mapFirstName(a, r), u.mapLastName(m, r), u.mapPhoneNumbers(t.phones, r), u.mapActivity(y, r), v(t) && u.mapCapabilities(p(t), r), l(t.locations) && h(t.locations[0], r), r.displayName() === r.id() && u.mapDisplayNameFallback(a, m, r), i && r.status._set(o.getDefaultPresence(r, g)), s.setAuthorization(r, g, f), t.blocked ? s.setBlocked(r, f) : s.setUnblocked(r, f), s.updateGroups(r);
  };
})
