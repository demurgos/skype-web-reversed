(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/telemetry/analytics", [
      "require",
      "exports",
      "swx-jskype-internal-application-instance",
      "../utils/chat/endpointsDataProvider",
      "jskype-settings-instance",
      "swx-browser-globals",
      "swx-constants",
      "lodash-compat"
    ], e);
}(function (e, t) {
  function l() {
    if (!i.isFeatureOn(o.COMMON.featureFlags.IDLE_USERS_ANALYTICS) || a || !h() || b())
      return !1;
    try {
      var e = { numberOfContacts: p() };
      d(e);
      g(e);
      y(e);
      n.get()._telemetryManager.sendEvent(i.settings.telemetry.jSkypeTenantToken, o.COMMON.telemetry.idleUsersAnalytics.TYPE, e);
      a = !0;
    } catch (t) {
    }
    return undefined;
  }
  function c() {
    a = !1;
  }
  function h() {
    var e, t, n = s.getWindow().localStorage.getItem(o.COMMON.telemetry.idleUsersAnalytics.localKeys.sidebarActivity);
    if (n) {
      var r = JSON.parse(n);
      return r.sidebar && r.sidebar.lastTimeOpened && (e = E(new Date(r.sidebar.lastTimeOpened))), r.sidebar && r.sidebar.numberOfSignIns && (t = r.sidebar.numberOfSignIns), t >= 10 || e >= 7;
    }
    return !1;
  }
  function p() {
    return n.get().personsAndGroupsManager && n.get().personsAndGroupsManager.all.persons() ? n.get().personsAndGroupsManager.all.persons().length : f;
  }
  function d(e) {
    var t, r;
    if (n.get().conversationsManager && n.get().conversationsManager._allConversations) {
      t = n.get().conversationsManager._allConversations();
      e.numberOfConversations = t.length;
      for (var i = 0; i < t.length; i++)
        v(t[i], e);
      e.daysSinceLastConversation === undefined && (e.daysSinceLastConversation = f);
      r = n.get().conversationsManager._unreadConversations();
      e.numberOfUnreadNonGroups = 0;
      e.numberOfUnreadGroups = 0;
      for (var i = 0; i < r.length; i++)
        m(r[i], e);
    }
  }
  function v(e, t) {
    var n = e.lastMessage;
    if (!n)
      return;
    var r = E(new Date(n.composetime));
    if (t.daysSinceLastConversation === undefined || t.daysSinceLastConversation > r)
      t.daysSinceLastConversation = r;
  }
  function m(e, t) {
    var n = w(e.id);
    n ? t.numberOfUnreadGroups = t.numberOfUnreadGroups + 1 : t.numberOfUnreadNonGroups = t.numberOfUnreadNonGroups + 1;
  }
  function g(e) {
    var t = s.getWindow().localStorage.getItem(o.COMMON.telemetry.idleUsersAnalytics.localKeys.sidebarActivity);
    e.daysSinceSidebarOpened = f;
    e.numberOfSignIns = f;
    e.sidebarState = f;
    if (t) {
      var n = JSON.parse(t);
      n.sidebar && n.sidebar.lastTimeOpened && (e.daysSinceSidebarOpened = E(new Date(n.sidebar.lastTimeOpened)));
      n.sidebar && n.sidebar.numberOfSignIns && (e.numberOfSignIns = n.sidebar.numberOfSignIns);
      n.sidebar && n.sidebar.state && (e.sidebarState = n.sidebar.state);
    }
  }
  function y(e) {
    var t = r.get();
    e.endpoints = t.endpoints;
    e.endpointsNameVersions = t.nameVersions;
    e.endpointsVersions = t.versions;
    e.endpointsCount = t.count;
  }
  function b() {
    return !n.get().conversationsManager || !n.get().conversationsManager._allConversations;
  }
  function w(e) {
    return u.isString(e) && /^19:/.test(e);
  }
  function E(e) {
    var t = 86400000;
    return Math.round(Math.abs((new Date().getTime() - e.getTime()) / t));
  }
  var n = e("swx-jskype-internal-application-instance"), r = e("../utils/chat/endpointsDataProvider"), i = e("jskype-settings-instance"), s = e("swx-browser-globals"), o = e("swx-constants"), u = e("lodash-compat"), a = !1, f = o.COMMON.telemetry.NOT_AVAILABLE;
  t.publish = l;
  t.reset = c;
}));
