(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/modelHelpers/contacts/groupHelper", [
      "require",
      "exports",
      "swx-jskype-internal-application-instance",
      "swx-constants",
      "swx-enums",
      "lodash-compat"
    ], e);
}(function (e, t) {
  function u(e, t) {
    var r = t || [], u = n.get().personsAndGroupsManager.all, a = u.groups(), f = !0;
    switch (e._authorization()) {
    case o.AUTHORIZED:
    case o.PENDING_OUTGOING:
    case o.SUGGESTED:
      m(e, u, f);
      break;
    case o.UNAUTHORIZED:
      g(e, u, f);
    }
    e.isBlocked() && r.push(i.groupPrivacyRelationshipLevel.Blocked);
    s.forEach(a, function (t) {
      r.indexOf(t.uri()) > -1 ? m(e, t, f) : g(e, t, f);
    });
  }
  function a(e) {
    var t = y(e.id());
    return t && t.length > 0 ? s.map(t, function (e) {
      return e.uri();
    }) : [];
  }
  function f(e) {
    var t = b(e);
    return t ? t.persons() : [];
  }
  function l(e, t) {
    var n = b(e);
    return !!n && !!n.persons(t.id());
  }
  function c(e, t) {
    var n = b(e);
    n && n.persons.changed(t);
  }
  function h(e, t) {
    var n = b(e);
    n && n.persons.changed.off(t);
  }
  function p(e, t) {
    var n = b(e);
    return n ? n.persons.add(t, t.id()) : Promise.resolve();
  }
  function d(e, t) {
    var n = b(e), r = !0;
    n && m(t, n, r);
  }
  function v() {
    return n.get().personsAndGroupsManager.all.groups(i.groupPrivacyRelationshipLevel.Blocked);
  }
  function m(e, t, n) {
    t.persons(e.id()) || t.persons.add(e, e.id(), undefined, n || !1);
  }
  function g(e, t, n) {
    t.persons(e.id()) && t.persons.remove(e.id(), n || !1);
  }
  function y(e) {
    var t = n.get().personsAndGroupsManager.all.groups(), r = s.filter(t, function (t) {
        return !!t.persons(e);
      });
    return r;
  }
  function b(e) {
    return n.get().personsAndGroupsManager.all.uri() === e ? n.get().personsAndGroupsManager.all : n.get().personsAndGroupsManager.all.groups(e);
  }
  var n = e("swx-jskype-internal-application-instance"), r = e("swx-constants"), i = e("swx-enums"), s = e("lodash-compat"), o = r.PEOPLE.authorizationStates;
  t.updateGroups = u;
  t.getAffiliatedGroupUris = a;
  t.getPersonsFromGroup = f;
  t.isPersonInGroup = l;
  t.subscribeToGroup = c;
  t.unsubscribeFromGroup = h;
  t.addPersonToGroup = p;
  t.simpleAddPersonToGroup = d;
  t.getBlockedGroup = v;
}));
