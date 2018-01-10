define("ui/viewModels/notifications/allowBrowserNotificationModalDialog", [
  "require",
  "exports",
  "module",
  "vendor/knockout",
  "lodash-compat",
  "swx-service-locator-instance",
  "swx-constants",
  "experience/settings",
  "services/i18n/cultureInfo",
  "notifications/settings",
  "swx-cafe-application-instance",
  "swx-log-tracer",
  "ui/modalDialog/modalDialog",
  "text!views/notifications/allowBrowserNotifications.html",
  "swx-browser-globals",
  "ui/telemetry/actions/actionNames"
], function (e, t) {
  function y() {
    function f() {
      return [
        o.assetsBaseUrl,
        v,
        m
      ].join("");
    }
    function l() {
      return r.includes(s.rtlLanguages, a) || r.includes(s.rtlLanguages, u.getLocale(a));
    }
    var e = i.resolve(s.serviceLocator.FEATURE_FLAGS), t = i.resolve(s.serviceLocator.ACTION_TELEMETRY), a = p.getWindow().navigator.language;
    this.browserIsRtl = n.observable(l());
    this.darkTheme = n.observable(e.isFeatureOn(s.featureFlags.USE_DARK_THEME_FOR_BROWSER_NOTIFICATIONS_OPT_IN_FLOW));
    this.skypeImageUrl = n.observable(f());
    this.close = function () {
      c.dispose(g);
    };
    t.recordAction(d.allowBrowserNotificationsModalDialog.shown);
  }
  var n = e("vendor/knockout"), r = e("lodash-compat"), i = e("swx-service-locator-instance").default, s = e("swx-constants").COMMON, o = e("experience/settings"), u = e("services/i18n/cultureInfo"), a = e("notifications/settings"), f = e("swx-cafe-application-instance"), l = e("swx-log-tracer"), c = e("ui/modalDialog/modalDialog"), h = e("text!views/notifications/allowBrowserNotifications.html"), p = e("swx-browser-globals"), d = e("ui/telemetry/actions/actionNames"), v = "/images/components/notifications/", m = "allowNativeBrowserNotifications.png", g = s.modalDialog.ALLOW_BROWSER_NOTIFICATIONS_CONTAINER_ID;
  t.show = function () {
    function r(e) {
      a.chatNotificationsMuted.extend({ notify: "always" });
      e === s.permission.DENIED ? (a.chatNotificationsMuted(!0), f.get().personsAndGroupsManager.mePerson.preferences(s.userSettings.preferences.NOTIFICATIONS).value.set(!1)) : e === s.permission.GRANTED && (a.chatNotificationsMuted(!1), f.get().personsAndGroupsManager.mePerson.preferences(s.userSettings.preferences.NOTIFICATIONS).value.set(!0));
      t.recordAction(d.notificationBox.permissionResponse, { permissionStatus: e });
      p.getDocument().getElementById(g) && c.dispose(g);
    }
    var e = p.getWindow();
    if (!e.Notification || e.Notification.permission !== s.permission.DEFAULT) {
      l.getLogger().error("Tried to show 'allow browser notification' modal dialog when notification permissions were not in default state");
      return;
    }
    var t = i.resolve(s.serviceLocator.ACTION_TELEMETRY), n = i.resolve(s.serviceLocator.FEATURE_FLAGS);
    e.Notification.requestPermission(r);
    c.build(g, new y(), h);
    n.isFeatureOn(s.featureFlags.USE_DARK_THEME_FOR_BROWSER_NOTIFICATIONS_OPT_IN_FLOW) ? c.show(g, null, null, !0) : c.show(g);
  };
});
