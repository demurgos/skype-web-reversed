define("telemetry/chat/sidebarReopenedEvent", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "swx-constants",
  "experience/settings",
  "ui/telemetry/telemetryClient",
  "services/telemetry/common/telemetryContext",
  "swx-browser-globals",
  "swx-cafe-application-instance",
  "swx-telemetry-buckets"
], function (e, t) {
  function h() {
    function m(e) {
      return w(e), b(e), e.getDaysSinceLastSignIn = T(), e.numberOfContacts = y(), e.endpointsCount = u.get().activeEndpoints.length, e;
    }
    function g(e, t) {
      o.get().sendEvent(s.telemetry.chatTenantToken, e, t);
    }
    function y() {
      return f.get().personsAndGroupsManager && f.get().personsAndGroupsManager.all.persons() ? f.get().personsAndGroupsManager.all.persons().length : p;
    }
    function b(e) {
      var t = {}, n = a.getWindow().localStorage, i = n.getItem(r.telemetry.idleUsersAnalytics.localKeys.sidebarActivity);
      i && (t = JSON.parse(i));
      e.daysSinceSidebarOpened = N(t);
      e.isMau = l.isMau(t);
      e.isMauCandidate = l.isMauCandidate(t);
      e.isDauCandidate = l.isDauCandidate(t);
    }
    function w(e) {
      var t, n, r;
      if (f.get().conversationsManager && f.get().conversationsManager._allConversations) {
        t = f.get().conversationsManager._allConversations();
        e.numberOfConversations = t.length;
        for (n = 0; n < t.length; n++)
          E(t[n], e);
        e.daysSinceLastConversation === undefined && (e.daysSinceLastConversation = p);
        r = f.get().conversationsManager._unreadConversations();
        e.numberOfUnreadConversations = r.length;
        e.numberOfUnreadNonGroups = 0;
        e.numberOfUnreadGroups = 0;
        for (n = 0; n < r.length; n++)
          S(r[n], e);
      }
    }
    function E(e, t) {
      var n, r = e.lastMessage;
      if (!r)
        return;
      n = l.getDays(new Date(r.composetime));
      if (t.daysSinceLastConversation === undefined || t.daysSinceLastConversation > n)
        t.daysSinceLastConversation = n;
    }
    function S(e, t) {
      var n = C(e.id);
      n ? t.numberOfUnreadGroups = t.numberOfUnreadGroups + 1 : t.numberOfUnreadNonGroups = t.numberOfUnreadNonGroups + 1;
    }
    function x(e) {
      function t(t) {
        var n = t[0] || 0, r = t[1] || 0, s = p;
        return n === 0 && r === 0 ? s = i.unreadState.NONE : n > 0 && r === 0 ? s = i.unreadState.PASSIVE : n === 0 && r > 0 ? s = i.unreadState.ACTIVE : n > 0 && r > 0 && (s = i.unreadState.BOTH), e.pastUnreadMessages = n, e.activeUnreadMessages = r, e.unreadState = s, e;
      }
      return d._unreadCounversationsCounters ? d._unreadCounversationsCounters().then(t) : Promise.reject(e);
    }
    function T() {
      try {
        var e, t = r.telemetry.idleUsersAnalytics.localKeys.signInData, n = a.getWindow().localStorage.getItem(t), i = n ? JSON.parse(n) : [];
        return !i || i.length < 2 ? p : (e = i[i.length - 2], l.getDays(new Date(e)));
      } catch (s) {
        return p;
      }
    }
    function N(e) {
      return e && e.sidebar && e.sidebar.lastTimeOpened ? l.getDays(new Date(e.sidebar.lastTimeOpened)) : p;
    }
    function C(e) {
      return n.isString(e) && /^19:/.test(e);
    }
    function k() {
      return a.getWindow().Date.now();
    }
    var e = this, t = k(), h, p = r.telemetry.NOT_AVAILABLE, d = f.get().conversationsManager, v;
    e.publishReopen = function () {
      h = a.getWindow().setTimeout(e.publishCloseTimeout, 60000);
      var t = r.telemetry.reopenSidebar.REOPENED, n = {};
      return v = !0, x(n).then(m, m).then(g.bind(null, t), g.bind(null, t));
    };
    e.publishCloseTimeout = function (e) {
      if (!v)
        return Promise.resolve();
      a.getWindow().clearTimeout(h);
      var n = r.telemetry.reopenSidebar.CLOSE_TIMEOUT, i = {
          timeToClose: k() - t,
          closedByUser: !!e
        };
      return v = !1, x(i).then(m, m).then(g.bind(null, n), g.bind(null, n));
    };
    e.clear = function () {
      c = null;
    };
  }
  var n = e("lodash-compat"), r = e("swx-constants").COMMON, i = r.telemetry.browserToast, s = e("experience/settings"), o = e("ui/telemetry/telemetryClient"), u = e("services/telemetry/common/telemetryContext"), a = e("swx-browser-globals"), f = e("swx-cafe-application-instance"), l = e("swx-telemetry-buckets"), c;
  t.build = function () {
    return c || (c = new h()), c;
  };
});
