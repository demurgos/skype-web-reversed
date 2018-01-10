define("ui/modelHelpers/personActionsHelper", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "swx-cafe-application-instance",
  "swx-service-locator-instance",
  "swx-constants",
  "swx-enums",
  "utils/common/accessibility",
  "ui/modelHelpers/groupHelper",
  "ui/telemetry/people/contactInvitation",
  "ui/telemetry/people/contactManagement",
  "ui/telemetry/people/contactActions",
  "experience/settings"
], function (e, t) {
  function d(e, t) {
    function u(e, t, n) {
      function o(r) {
        r.name() === h.defaultBusinessContactsGroup && (i.added.off(o), a(r, e, t, n));
      }
      var s;
      s = r.get().personsAndGroupsManager.createGroup();
      s.name.set(h.defaultBusinessContactsGroup);
      i.add(s).then(function () {
        i.added(o);
      }, n);
    }
    function a(e, n, r, i) {
      e.persons.add(n.id()).then(function () {
        t && (t.historyService.removeCustomActivityItem(o.activityType.ContactRequestOutgoing), t.historyService.removeCustomActivityItem(o.activityType.ContactRequestIsNowContact), t.historyService.addCustomActivityItem(o.activityType.ContactRequestIsNowContact, { sender: n }));
        r();
      }, i);
    }
    var n, i = r.get().personsAndGroupsManager.all.groups, s;
    return n = new Promise(function (t, n) {
      i.get().then(function (r) {
        s = r.filter(function (e) {
          return e.name() === h.defaultBusinessContactsGroup;
        });
        s.length > 0 ? a(s[0], e, t, n) : u(e, t, n);
      }, n);
    }), n;
  }
  function v(e) {
    return n.isFunction(e._type) ? e._type() : undefined;
  }
  function m(e) {
    return n.isString(e) ? e = { source: e } : e || (e = e || {}), e;
  }
  var n = e("lodash-compat"), r = e("swx-cafe-application-instance"), i = e("swx-service-locator-instance").default, s = e("swx-constants").COMMON, o = e("swx-enums"), u = e("utils/common/accessibility").narrator, a = e("ui/modelHelpers/groupHelper"), f = e("ui/telemetry/people/contactInvitation"), l = e("ui/telemetry/people/contactManagement"), c = e("ui/telemetry/people/contactActions"), h = e("experience/settings"), p = "8";
  t.blockPerson = function (e, t, r, o, a) {
    function p() {
      return l.isFeatureOn(s.featureFlags.USE_BUSINESS_WORDING) ? e.isBlocked.set(!0, t.value) : e.isBlocked.set(!0, t);
    }
    function d() {
      u.announce({ key: "accessibility_contact_blocked_success" });
      n.isFunction(o) && o();
      c.onBlockContactEnd({
        success: !0,
        contactType: f,
        reason: t.reason,
        reportAbuse: t.value,
        source: r.source
      });
    }
    function g() {
      u.announce({ key: "accessibility_contact_blocked_failure" });
      n.isFunction(a) && a();
      c.onBlockContactEnd({
        success: !1,
        contactType: f,
        reason: t.reason,
        reportAbuse: t.value,
        source: r.source
      });
    }
    var f = v(e), l = i.resolve(s.serviceLocator.FEATURE_FLAGS), h;
    return t = t || {}, r = m(r), e.isBlocked.set.enabled() ? (c.onBlockContactStart(), h = p(), h.then(d, g)) : h = Promise.resolve(!0), h;
  };
  t.unblockPerson = function (e, t, r, i) {
    function a() {
      u.announce({ key: "accessibility_contact_unblocked_success" });
      n.isFunction(r) && r();
      c.onUnblockContactEnd({
        success: !0,
        source: t.source,
        contactType: s
      });
    }
    function f() {
      u.announce({ key: "accessibility_contact_unblocked_failure" });
      n.isFunction(i) && i();
      c.onUnblockContactEnd({
        success: !1,
        source: t.source,
        contactType: s
      });
    }
    var s = v(e), o;
    return t = m(t), e.isBlocked.set.enabled() ? (c.onUnblockContactStart(), o = e.isBlocked.set(!1), o.then(a, f)) : o = Promise.resolve(), o;
  };
  t.removePerson = function (e, t, i, s) {
    function c() {
      u.announce({ key: "accessibility_contact_deleted_success" });
      n.isFunction(i) && i();
      l.onRemoveContactEnd({
        success: !0,
        source: t.source,
        contactType: o
      });
    }
    function h() {
      u.announce({ key: "accessibility_contact_deleted_failure" });
      n.isFunction(s) && s();
      l.onRemoveContactEnd({
        success: !1,
        source: t.source,
        contactType: o
      });
    }
    var o = v(e), a = r.get().personsAndGroupsManager.all, f;
    return t = m(t), l.onRemoveContactStart(), f = a.persons.remove(e.id()), f.then(c, h), f;
  };
  t.addPerson = function (e, t, a, c, h, g) {
    function T() {
      var r = "accessibility_contact_request_sent_success";
      w || e.activity._set(undefined);
      t === o.activityType.ContactRequestIncoming && (r = "accessibility_contact_request_accepted_success");
      u.announce({ key: r });
      n.isFunction(h) && h();
      n.isFunction(S) && S(!0);
    }
    function N() {
      var e = "accessibility_contact_request_sent_failure";
      t === o.activityType.ContactRequestIncoming && (e = "accessibility_contact_request_accepted_failure");
      u.announce({ key: e });
      n.isFunction(g) && g();
      n.isFunction(S) && S(!1);
    }
    function C(e) {
      l.onAddContactEnd({
        success: e,
        contactType: y,
        source: c.source
      });
      b && f.onSendContactRequestEnd({
        success: e,
        resend: E,
        source: c.source
      });
    }
    function k(e) {
      f.onAcceptContactRequestEnd({
        success: e,
        source: c.source
      });
    }
    var y = v(e), b = y ? y === p : !1, w = i.resolve(s.serviceLocator.FEATURE_FLAGS).isFeatureOn(s.featureFlags.ENABLE_BUSINESS_CONTACT_MANAGEMENT), E = !1, S, x;
    c = m(c);
    switch (t) {
    case o.activityType.ContactRequestOutgoingResend:
      E = !0;
    case o.activityType.ContactRequestOutgoing:
    case o.activityType.ContactRequestOutgoingAgent:
    case o.activityType.ContactRequestOutgoingPSTN:
    case o.activityType.SuggestedContact:
      l.onAddContactStart(), b && f.onSendContactRequestStart(), S = C;
      break;
    case o.activityType.ContactRequestIncoming:
      f.onAcceptContactRequestStart(), S = k;
      break;
    default:
    }
    return w ? x = d(e, a) : x = r.get().personsAndGroupsManager.all.persons.add(e, e.id(), undefined, t), x.then(T, N), x;
  };
  t.declinePerson = function (e, t, i, s, a) {
    function h() {
      u.announce({ key: "accessibility_contact_request_declined_success" });
      n.isFunction(s) && s();
      f.onDeclineContactRequestEnd({
        success: !0,
        source: i.source,
        contactType: l
      });
    }
    function p() {
      u.announce({ key: "accessibility_contact_request_declined_failure" });
      n.isFunction(a) && a();
      f.onDeclineContactRequestEnd({
        success: !1,
        source: i.source,
        contactType: l
      });
    }
    var l = v(e), c;
    return i = m(i), f.onDeclineContactRequestStart(), c = r.get().conversationsManager.conversations.remove(t, o.activityType.ContactRequestIncoming), c.then(h, p), c;
  };
  t.addFavorite = function (e, t, r, i) {
    function l() {
      u.announce({ key: "accessibility_contact_add_favorite_success" });
      n.isFunction(r) && r();
      c.onAddToFavoritesEnd({
        success: !0,
        source: t.source,
        contactType: s
      });
    }
    function h() {
      u.announce({ key: "accessibility_contact_add_favorite_failure" });
      n.isFunction(i) && i();
      c.onAddToFavoritesEnd({
        success: !1,
        source: t.source,
        contactType: s
      });
    }
    var s = v(e), f;
    return t = m(t), c.onAddToFavoritesStart(), f = a.addPersonToGroup(o.groupType.Favorites, e), f.then(l, h), f;
  };
  t.removeFavorite = function (e, t, r, i) {
    function l() {
      u.announce({ key: "accessibility_contact_remove_favorite_success" });
      n.isFunction(r) && r();
      c.onRemoveFromFavoritesEnd({
        success: !0,
        source: t.source,
        contactType: s
      });
    }
    function h() {
      u.announce({ key: "accessibility_contact_remove_favorite_failure" });
      n.isFunction(i) && i();
      c.onRemoveFromFavoritesEnd({
        success: !1,
        source: t.source,
        contactType: s
      });
    }
    var s = v(e), f;
    return t = m(t), c.onRemoveFromFavoritesStart(), f = a.removePersonFromGroup(o.groupType.Favorites, e.id()), f.then(l, h), f;
  };
});
