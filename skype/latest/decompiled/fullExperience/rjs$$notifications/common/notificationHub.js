define("notifications/common/notificationHub", [
  "require",
  "swx-browser-globals",
  "swx-service-locator-instance",
  "swx-constants",
  "utils/common/styleModeHelper",
  "swx-browser-detect",
  "notifications/common/browserNativeNotification"
], function (e) {
  function g() {
    return l.hasFocus() && i.get().appIsVisible() ? !0 : !1;
  }
  function y() {
    var e = n.resolve(r.serviceLocator.FEATURE_FLAGS);
    if (c)
      return;
    c = !0;
    e.isFeatureOn(r.featureFlags.ENHANCED_NOTIFICATION) && (f.addEventListener(r.events.browser.FOCUS, b), f.addEventListener(r.events.browser.BLUR, w));
  }
  function b() {
    function t() {
      for (var t = 0; t < v.length; t++) {
        e = v[t];
        if (x(e))
          continue;
        E(e);
      }
      v = [];
    }
    var e;
    h = !0;
    p ? setTimeout(t, a) : v = [];
  }
  function w() {
    h = !1;
  }
  function E(e) {
    var t = n.resolve(r.serviceLocator.FEATURE_FLAGS), s = !i.get().isIntegratedProperty() || !i.get().appIsVisible(), o = e.type === d.UNREAD_MESSAGE || e.type === d.CHAT;
    if (e.active() === !1)
      return;
    if (!t.isFeatureOn(r.featureFlags.ENHANCED_NOTIFICATION) || h || !o) {
      if (o && i.get().isConsumerIntegrated() && !s)
        return;
      e.active(!0);
      try {
        p(e);
      } catch (a) {
      }
      e.publishUnreadMessageTelemetry && s && e.publishUnreadMessageTelemetry(S(e));
      e.onshow && s && e.onshow();
      e.autoDeactivation && setTimeout(function () {
        e.active() && e.active(!1);
      }, u);
    } else
      e.wasDelayed = !0, v.push(e);
  }
  function S(e) {
    return {
      isDelayedNotification: !!e.wasDelayed,
      notificationQueueLength: v.length,
      displayType: e.displayType
    };
  }
  function x(e) {
    return e.displayType === r.telemetry.browserToast.displayType.REMINDER || !e.conversation || !e.conversation._consumptionHorizon || !e.activityOccurence ? !1 : e.conversation._consumptionHorizon.lastReadMessageTimestamp >= e.activityOccurence.getTime();
  }
  function T() {
    return m.areBrowserNotificationsSupported() && f.Notification.permission === r.permission.GRANTED;
  }
  var t = e("swx-browser-globals"), n = e("swx-service-locator-instance").default, r = e("swx-constants").COMMON, i = e("utils/common/styleModeHelper"), s = e("swx-browser-detect").default, o = e("notifications/common/browserNativeNotification"), u = 7000, a = 100, f = t.getWindow(), l = t.getDocument(), c = !1, h = !0, p, d = r.notifications, v = [], m = {};
  return m.notify = function (e) {
    var t = e.type === d.AUDIO_WITHOUT_VIDEO || e.type === d.AUDIO || e.type === d.INCOMING_CALL;
    T() ? (g() || o.create(e), t && p && E(e), e.publishUnreadMessageTelemetry && !g() && e.publishUnreadMessageTelemetry(S(e))) : p && E(e);
  }, m.addNotificationListener = function (e) {
    y();
    p = e;
  }, m.removeNotificationListener = function () {
    var e = n.resolve(r.serviceLocator.FEATURE_FLAGS);
    p && (p = null);
    c = !1;
    e.isFeatureOn(r.featureFlags.ENHANCED_NOTIFICATION) && (f.removeEventListener(r.events.browser.FOCUS, b), f.removeEventListener(r.events.browser.BLUR, w));
  }, m.areBrowserNotificationsSupported = function () {
    var e = n.resolve(r.serviceLocator.FEATURE_FLAGS);
    return e.isFeatureOn(r.featureFlags.BROWSER_NATIVE_NOTIFICATIONS_ENABLED) && !!f.Notification && s.getBrowserInfo().browserName === "Chrome" && s.getSystemInfo().osName === "Windows";
  }, m;
});
