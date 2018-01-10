(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/telemetry/userAnalytics", [
      "require",
      "exports",
      "swx-jskype-internal-application-instance",
      "jskype-settings-instance",
      "swx-browser-globals",
      "swx-constants",
      "lodash-compat"
    ], e);
}(function (e, t) {
  function f() {
    var e, t, o, u;
    if (!r.isFeatureOn(s.COMMON.featureFlags.USERS_ANALYTICS) || a)
      return !1;
    try {
      a = !0;
      o = i.getWindow().localStorage.getItem(s.COMMON.telemetry.idleUsersAnalytics.localKeys.sidebarActivity);
      o && (t = JSON.parse(o));
      u = c();
      e = {
        numberOfContacts: h(u),
        isMau: y(t),
        isMauCandidate: b(t),
        isDauCandidate: w(t),
        isFirstLoadToday: E()
      };
      p(e, u);
      d(e);
      n.get()._telemetryManager.sendEvent(r.settings.telemetry.chatTenantToken, s.COMMON.telemetry.usersAnalytics.TYPE, e);
    } catch (f) {
      a = !1;
    }
    return undefined;
  }
  function l() {
    a = !1;
  }
  function c() {
    if (!n.get().personsAndGroupsManager || !n.get().personsAndGroupsManager.all.persons)
      return undefined;
    var e = n.get().personsAndGroupsManager.all.persons();
    return e ? e : undefined;
  }
  function h(e) {
    return e ? e.length : u;
  }
  function p(e, t) {
    var r, i, s = 0, u = 0;
    t && n.get().conversationsManager && n.get().conversationsManager._allConversations && (r = o.filter(t, function (e) {
      var t, n, r = new Date();
      return e._birthday && e._birthday() ? (n = new Date(2016, r.getMonth(), r.getDate()).getTime() - 2592000000, t = new Date(2016, new Date(e._birthday()).getMonth(), new Date(e._birthday()).getDate()).getTime(), t >= n && t <= r.getTime()) : !1;
    }), o.forEach(r, function (e) {
      i = o.find(n.get().conversationsManager._allConversations(), function (t) {
        return t.id === "8:" + e.id();
      });
      i ? s++ : u++;
    }));
    e.congratulationCandidates = s;
    e.missedCongratulations = u;
  }
  function d(e) {
    var t, r, i;
    e.numberOfUnreadNonGroups = u;
    e.numberOfUnreadGroups = u;
    e.numberOfConversations = u;
    e.daysSinceLastConversation = u;
    if (n.get().conversationsManager && n.get().conversationsManager._allConversations) {
      t = n.get().conversationsManager._allConversations();
      e.numberOfConversations = t.length;
      for (r = 0; r < t.length; r++)
        v(t[r], e);
      e.daysSinceLastConversation === undefined && (e.daysSinceLastConversation = u);
      i = n.get().conversationsManager._unreadConversations();
      e.numberOfUnreadNonGroups = 0;
      e.numberOfUnreadGroups = 0;
      for (r = 0; r < i.length; r++)
        m(i[r], e);
    }
  }
  function v(e, t) {
    var n, r = e.lastMessage;
    if (!r)
      return;
    n = S(new Date(r.composetime));
    if (t.daysSinceLastConversation === undefined || t.daysSinceLastConversation > n)
      t.daysSinceLastConversation = n;
  }
  function m(e, t) {
    var n = g(e.id);
    n ? t.numberOfUnreadGroups = t.numberOfUnreadGroups + 1 : t.numberOfUnreadNonGroups = t.numberOfUnreadNonGroups + 1;
  }
  function g(e) {
    return o.isString(e) && /^19:/.test(e);
  }
  function y(e) {
    return e ? e.sidebar && e.sidebar.lastTimeOpened ? S(new Date(e.sidebar.lastTimeOpened)) <= 30 : !1 : u;
  }
  function b(e) {
    return e ? e.sidebar && e.sidebar.lastTimeOpened ? S(new Date(e.sidebar.lastTimeOpened)) > 30 : !1 : u;
  }
  function w(e) {
    if (!e)
      return u;
    if (e.sidebar && e.sidebar.lastTimeOpened) {
      var t = S(new Date(e.sidebar.lastTimeOpened));
      return t > 1 && t <= 30;
    }
    return !1;
  }
  function E() {
    try {
      var e = void 0, t = s.COMMON.telemetry.idleUsersAnalytics.localKeys.signInData, n = i.getWindow().localStorage.getItem(t), r = n ? JSON.parse(n) : [];
      return !r || r.length < 2 ? u : (e = r[r.length - 2], S(new Date(e)) !== 0);
    } catch (o) {
      return u;
    }
  }
  function S(e) {
    var t = 86400000;
    return Math.round(Math.abs((new Date().getTime() - e.getTime()) / t));
  }
  var n = e("swx-jskype-internal-application-instance"), r = e("jskype-settings-instance"), i = e("swx-browser-globals"), s = e("swx-constants"), o = e("lodash-compat"), u = s.COMMON.telemetry.NOT_AVAILABLE, a = !1;
  t.publish = f;
  t.reset = l;
}));
