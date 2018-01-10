define("ui/viewModels/notifications/notificationBox", [
  "require",
  "vendor/knockout",
  "ui/viewModels/notifications/allowBrowserNotificationModalDialog",
  "swx-browser-detect",
  "swx-service-locator-instance",
  "swx-constants",
  "notifications/settings",
  "swx-cafe-application-instance",
  "ui/telemetry/actions/actionNames",
  "swx-browser-globals"
], function (e) {
  function l() {
    function h() {
      return d() && p() && l.isFeatureOn(s.featureFlags.BROWSER_NATIVE_NOTIFICATIONS_ENABLED) && u.get().personsAndGroupsManager.all.persons().length > 0 && !o.chatNotificationsMuted() && f.Notification.permission === s.permission.DEFAULT;
    }
    function p() {
      return f.Notification !== undefined;
    }
    function d() {
      return r.getBrowserInfo().browserName === "Chrome" && r.getSystemInfo().osName === "Windows";
    }
    var e = this, l = i.resolve(s.serviceLocator.FEATURE_FLAGS), c = i.resolve(s.serviceLocator.ACTION_TELEMETRY);
    e.isVisible = t.observable(h());
    e.requestPermission = function () {
      c.recordAction(a.notificationBox.requestPermission);
      n.show();
    };
    e.setNotificationBoxVisibility = function () {
      var t = h();
      e.isVisible() !== t && e.isVisible(t);
    };
    e.isVisible() && c.recordAction(a.notificationBox.shown);
    u.get().personsAndGroupsManager.all.persons.changed(e.setNotificationBoxVisibility);
    o.chatNotificationsMuted.subscribe(e.setNotificationBoxVisibility);
  }
  var t = e("vendor/knockout"), n = e("ui/viewModels/notifications/allowBrowserNotificationModalDialog"), r = e("swx-browser-detect").default, i = e("swx-service-locator-instance").default, s = e("swx-constants").COMMON, o = e("notifications/settings"), u = e("swx-cafe-application-instance"), a = e("ui/telemetry/actions/actionNames"), f = e("swx-browser-globals").getWindow();
  return l;
});
