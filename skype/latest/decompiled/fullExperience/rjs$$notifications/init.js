define("notifications/init", [
  "require",
  "exports",
  "module",
  "swx-browser-globals",
  "ui/viewModels/notifications/allowBrowserNotificationModalDialog",
  "ui/telemetry/actions/actionNames",
  "swx-cafe-application-instance",
  "swx-constants",
  "swx-enums",
  "swx-i18n",
  "swx-service-locator-instance",
  "notifications/factory",
  "notifications/common/notificationHub",
  "utils/common/localStorage",
  "notifications/settings"
], function (e, t) {
  var n = e("swx-browser-globals"), r = e("ui/viewModels/notifications/allowBrowserNotificationModalDialog"), i = e("ui/telemetry/actions/actionNames"), s = e("swx-cafe-application-instance"), o = e("swx-constants").COMMON, u = e("swx-enums"), a = e("swx-i18n").localization, f = e("swx-service-locator-instance").default, l = e("notifications/factory"), c = e("notifications/common/notificationHub"), h = e("utils/common/localStorage"), p = e("notifications/settings");
  t.isInitialized = !1;
  t.init = function () {
    if (t.isInitialized === !0)
      return;
    t.isInitialized = !0;
    var e = f.resolve(o.serviceLocator.MODEL_UI_OBSERVER);
    p.init();
    s.get().signInManager.state.once(u.loginState.SignedIn, function () {
      e.observe(s.get());
    });
  };
  t.update = function () {
    function u() {
      var e, t, n, r = o.telemetry.idleUsersAnalytics.localKeys.signInData;
      try {
        return e = h.get(r), e ? (t = JSON.parse(e), t.length < 2 ? !0 : (n = new Date(Date.now()).setHours(0, 0, 0, 0), new Date(t[t.length - 2]).getTime() < n)) : !0;
      } catch (i) {
        return !0;
      }
    }
    function d() {
      if (p.chatNotificationsMuted() || !e.isFeatureOn(o.featureFlags.BROWSER_NOTIFICATIONS_EDUCATIONAL_TOAST_ENABLED) || !m() || v())
        return;
      var n = f.resolve(o.serviceLocator.ACTION_TELEMETRY), s = l.build(o.notifications.UNREAD_MESSAGE, {
          educationalMessage: a.fetch({ key: "enable_browser_notifications_toast" }),
          showAction: function () {
            h.set(t, Date.now());
            n.recordAction(i.browserNotificationsOptInToast.shown);
          },
          clickAction: r.show
        });
      c.notify(s);
    }
    function v() {
      var e = h.get(t);
      return e ? Date.now() - e < 604800000 : !1;
    }
    function m() {
      return c.areBrowserNotificationsSupported() && n.getWindow().Notification.permission === o.permission.DEFAULT;
    }
    function g() {
      var e = o.telemetry.browserToast.ignore, t = h.get(e.TIMEOUT_KEY), n;
      return t ? (n = parseInt(t, 10), n >= Date.now() ? !0 : (h.remove(e.TIMEOUT_KEY), !1)) : !1;
    }
    var e = f.resolve(o.serviceLocator.FEATURE_FLAGS), t = "swx|browserNotificationsToastLastFired";
    p.init();
    e.isFeatureOn(o.featureFlags.UNREAD_MESSAGE_REMINDER_TOAST) ? s.get().conversationsManager._unreadCounversationsCounters().then(function (e) {
      var t = !1, n = e[0] > 0 && !g();
      if (!n || p.chatNotificationsMuted()) {
        d();
        return;
      }
      t = u();
      if (!t) {
        d();
        return;
      }
      var r = l.build(o.notifications.UNREAD_MESSAGE, {
        isReminderToast: !0,
        unreadConversations: s.get().conversationsManager._unreadConversations()
      });
      c.notify(r);
      setTimeout(function () {
        d();
      }, 3000);
    }) : d();
  };
});
