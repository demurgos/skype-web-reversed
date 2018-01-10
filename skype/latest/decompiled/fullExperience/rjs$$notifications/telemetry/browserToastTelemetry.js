define("notifications/telemetry/browserToastTelemetry", [
  "require",
  "swx-constants",
  "experience/settings",
  "ui/telemetry/telemetryClient",
  "services/telemetry/common/telemetryContext",
  "utils/common/appVisibilityProvider",
  "swx-browser-globals",
  "swx-cafe-application-instance"
], function (e) {
  function f(e) {
    function h() {
      return {
        isGroupConversation: l,
        hasAvatar: l,
        activeEndpointsCount: l,
        currentUnreadMessageCount: l,
        timeInStale: l,
        isMau: l,
        isSeen: l,
        toastType: l,
        pastUnreadMessages: l,
        activeUnreadMessages: l,
        unreadState: l,
        DauCandidate: l,
        MauCandidate: l,
        isDelayedNotification: l,
        notificationQueueLength: l,
        notificationDisplayType: l,
        unreadConversationsCount: l,
        isDecline: l
      };
    }
    function p(e) {
      for (var t in e)
        e.hasOwnProperty(t) && !(typeof e[t] == "string" || e[t] instanceof String) && (e[t] = e[t] + "");
      return e;
    }
    function d(e, r) {
      function p() {
        if (!e.historyService)
          return;
        var t = e.historyService.activityItems().filter(function (e) {
          return !e.isRead();
        }).sort(function (e, t) {
          return e.timestamp() > t.timestamp();
        });
        return t.length === 0 ? l : g(t[0].timestamp());
      }
      function d() {
        return a ? a.sidebar && a.sidebar.lastTimeOpened ? g(new Date(a.sidebar.lastTimeOpened)) <= 30 : !1 : l;
      }
      function v() {
        return a ? a.sidebar && a.sidebar.lastTimeOpened ? g(new Date(a.sidebar.lastTimeOpened)) > 30 : !1 : l;
      }
      function m() {
        if (!a)
          return l;
        if (a.sidebar && a.sidebar.lastTimeOpened) {
          var e = g(new Date(a.sidebar.lastTimeOpened));
          return e > 1 && e <= 30;
        }
        return !1;
      }
      function g(e) {
        var t = 86400000;
        return Math.round(Math.abs((Date.now() - e) / t));
      }
      function y() {
        return c._unreadConversationsCount ? c._unreadConversationsCount() : l;
      }
      var i = h(), a, f = u.getWindow().localStorage.getItem(t.telemetry.idleUsersAnalytics.localKeys.sidebarActivity);
      return f && (a = JSON.parse(f)), !e.historyService || (i.isGroupConversation = e.isGroupConversation(), i.hasAvatar = !!e.avatarUrl() && e.avatarUrl().length > 0, i.currentUnreadMessageCount = e.historyService.unreadActivityItemsCount(), i.timeInStale = p()), i.activeEndpointsCount = s.get().activeEndpoints.length, i.isSeen = o.hasFocus(), i.isMau = d(), i.MauCandidate = v(), i.DauCandidate = m(), i.toastType = n.toastType.INDIVIDUAL, r.isDelayedNotification !== undefined && (i.isDelayedNotification = !!r.isDelayedNotification), r.notificationQueueLength !== undefined && (i.notificationQueueLength = r.notificationQueueLength), r.displayType !== undefined && (i.notificationDisplayType = r.displayType), r.displayNameResolved !== undefined && (i.displayNameResolved = r.displayNameResolved), r.isDecline !== undefined && (i.isDecline = r.isDecline), i.unreadConversationsCount = y(), i;
    }
    function v(e) {
      function t(t) {
        var r = t[0] || 0, i = t[1] || 0, s = l;
        return r === 0 && i === 0 ? s = n.unreadState.NONE : r > 0 && i === 0 ? s = n.unreadState.PASSIVE : r === 0 && i > 0 ? s = n.unreadState.ACTIVE : r > 0 && i > 0 && (s = n.unreadState.BOTH), e.pastUnreadMessages = r, e.activeUnreadMessages = i, e.unreadState = s, e;
      }
      return c._unreadCounversationsCounters ? c._unreadCounversationsCounters().then(t) : Promise.reject(e);
    }
    var f = this, l = t.telemetry.NOT_AVAILABLE, c = a.get().conversationsManager;
    f.publish = function (t, n, s) {
      function o(t) {
        var n = p(t);
        i.get().sendEvent(r.telemetry.chatTenantToken, e, n);
        s && s();
      }
      if (!t)
        return;
      if (!e)
        return;
      var u = d(t, n);
      v(u).then(o, o);
    };
  }
  var t = e("swx-constants").COMMON, n = t.telemetry.browserToast, r = e("experience/settings"), i = e("ui/telemetry/telemetryClient"), s = e("services/telemetry/common/telemetryContext"), o = e("utils/common/appVisibilityProvider"), u = e("swx-browser-globals"), a = e("swx-cafe-application-instance");
  return f.build = function (e) {
    if (!e)
      return;
    return new f(e);
  }, f;
});
