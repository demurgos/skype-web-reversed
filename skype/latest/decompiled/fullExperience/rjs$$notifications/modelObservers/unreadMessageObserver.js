define("notifications/modelObservers/unreadMessageObserver", [
  "require",
  "swx-cafe-application-instance",
  "experience/settings",
  "swx-constants",
  "swx-service-locator-instance",
  "swx-enums",
  "notifications/factory",
  "notifications/common/notificationHub",
  "notifications/settings",
  "ui/telemetry/telemetryClient",
  "notifications/telemetry/browserToastTelemetry",
  "telemetry/usage/inAppActivityTracker",
  "utils/common/styleModeHelper"
], function (e) {
  function d() {
    function x(e, t, n) {
      var r;
      if (!Array.isArray(e))
        return;
      if (S) {
        e.forEach(function (e) {
          b[e.id] = b[e.id] || p;
        });
        return;
      }
      n.length > e.length && (r = n.filter(function (t) {
        return e.indexOf(t) < 0;
      }), r.forEach(function (e) {
        b[e.id] = undefined;
        var t = -1;
        w.find(function (n, r) {
          n.conversationId === e.id && (t = r);
        });
        t > -1 && w.splice(t, 1);
      }));
    }
    function T(e, n) {
      function i() {
        function t() {
          return v ? r.mentions.meIdentifier.test(n.html()) : !1;
        }
        return !e.chatService.shouldNotify || e.chatService.shouldNotify(n.text()) || t();
      }
      function o() {
        return n.sender.id() === t.get().personsAndGroupsManager.mePerson.id();
      }
      function u() {
        return n.isDeleted();
      }
      function a() {
        return n.sender.isBlocked();
      }
      function f(e) {
        return /^sip:.+@anonymous\.invalid$/.test(e.id());
      }
      function l() {
        if (d)
          return !0;
        var e = t.get().personsAndGroupsManager.mePerson;
        return f(e) ? !0 : e.status() === s.onlineStatus.Online;
      }
      function g(e) {
        return !t.get()._context || !t.get()._context.isMyEndpointActive ? e(!0) : m ? t.get()._context.isTheOnlyActiveEndpoint().then(e) : e(t.get()._context.isMyEndpointActive());
      }
      function w() {
        return y ? (b[e.conversationId] || (b[e.conversationId] = 0), b[e.conversationId] < p) : !0;
      }
      return new Promise(function (e) {
        if (n.type() !== s.activityType.TextMessage)
          return e(!1);
        var t = !h.get().isConsumerIntegrated() || !c.isClientVisible(), r = !o() && !a() && !u() && i() && l() && w() && t;
        return r ? g(e) : e(!1);
      });
    }
    function N(e) {
      e.historyService.activityItems.added(function (t) {
        return C(e, t);
      });
    }
    function C(e, t) {
      return T(e, t).then(function (i) {
        if (!i)
          return;
        var s = {
          muted: a.chatNotificationsMuted().toString(),
          isClientVisible: c.isClientVisible().toString()
        };
        e.state && typeof e.state == "function" && (s.conversationState = e.state());
        f.get().sendEvent(n.telemetry.uiTenantToken, r.telemetry.chat.MESSAGE_NOTIFICATION, s);
        a.chatNotificationsMuted() || t.isRead.once(!1, function () {
          k(e, t);
        });
      });
    }
    function k(e, t) {
      function a() {
        n.active(!1);
        u.dispose();
      }
      function f(t) {
        g.publish(e, t);
      }
      y && (b[e.conversationId]++, b[e.conversationId] === p && w.push(e));
      var n, i, s = {
          conversation: e,
          message: t,
          summary: A(e)
        }, u;
      n = o.build(r.notifications.UNREAD_MESSAGE, s);
      n.publishUnreadMessageTelemetry = f;
      n.displayType = O(s.summary);
      n.isUnreadMessage = !0;
      i = t.timestamp() || new Date();
      L(n, e, i);
      u = t.html.changed(function () {
        if (s.summary && s.summary.show)
          return;
        n.description(t.text());
      });
      t.isDeleted.once(!0, a);
      t.isRead.once(!0, a);
    }
    function L(e, t, n) {
      function i() {
        r.dispose();
      }
      var r;
      e.conversation = t;
      e.activityOccurence = n;
      e.sender.uri() ? u.notify(e) : r = e.sender.uri.subscribe(function (t) {
        t && (u.notify(e), i());
      });
    }
    function A(e) {
      if (!y)
        return;
      var t = {
        show: b[e.conversationId] === p,
        unreadConversations: w
      };
      return t;
    }
    function O(e) {
      return !e || !e.show ? r.telemetry.browserToast.displayType.NORMAL : r.telemetry.browserToast.displayType.SUMMARY;
    }
    var e = i.resolve(r.serviceLocator.FEATURE_FLAGS), d = e.isFeatureOn(r.featureFlags.NOTIFY_HOST_EVEN_WHEN_ME_NOTAVAILABLE), v = e.isFeatureOn(r.featureFlags.ENABLE_AGGRESSIVE_MENTIONS_TOAST), m = e.isFeatureOn(r.featureFlags.UNREAD_MESSAGE_TOAST_FOR_ACTIVE_ENDPOINT), g = l.build(r.telemetry.browserToast.EVENTS.SHOWN), y = e.isFeatureOn(r.featureFlags.CHAT_MESSAGE_TYPE_NOTIFICATION_ENABLED), b = {}, w = [], E = t.get().conversationsManager, S = !0;
    y && E._unreadConversations && E._unreadCounversationsCounters().then(function () {
      E._unreadConversations.subscribe();
      E._unreadConversations.changed(x);
      S = !1;
    });
    this.observe = function (e) {
      e.conversationsManager.conversations.added(N);
    };
  }
  var t = e("swx-cafe-application-instance"), n = e("experience/settings"), r = e("swx-constants").COMMON, i = e("swx-service-locator-instance").default, s = e("swx-enums"), o = e("notifications/factory"), u = e("notifications/common/notificationHub"), a = e("notifications/settings"), f = e("ui/telemetry/telemetryClient"), l = e("notifications/telemetry/browserToastTelemetry"), c = e("telemetry/usage/inAppActivityTracker"), h = e("utils/common/styleModeHelper"), p = 3;
  return {
    build: function () {
      return new d();
    }
  };
});
