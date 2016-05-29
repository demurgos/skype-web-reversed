define("telemetry/chat/menuItemTelemetry", [
  "require",
  "exports",
  "module",
  "constants/common",
  "experience/settings",
  "utils/common/styleModeHelper",
  "services/serviceLocator",
  "ui/telemetry/telemetryClient"
], function (e, t) {
  function f() {
    function l() {
      e.data = {
        narrow: t,
        button: t,
        ordinal: t,
        navigationMenuIconsEnabled: t
      };
    }
    function c(e) {
      for (var t in e)
        e.hasOwnProperty(t) && !(typeof e[t] == "string" || e[t] instanceof String) && (e[t] = e[t] + "");
      return e;
    }
    var e = this, t = n.telemetry.NOT_AVAILABLE, f = u.resolve(n.serviceLocator.FEATURE_FLAGS);
    e.publish = function (u) {
      e.data.narrow = o.get().currentMode() === s.NARROW;
      e.data.button = u.id || t;
      e.data.ordinal = u.ordinal || t;
      e.data.navigationMenuIconsEnabled = f.isFeatureOn(n.featureFlags.NAVIGATION_MENU_ICONS_ENABLED);
      var h = i.TYPE, p = c(e.data);
      a.get().sendEvent(r.telemetry.uiTenantToken, h, p);
      l();
    };
    l();
  }
  var n = e("constants/common"), r = e("experience/settings"), i = n.telemetry.menuItemClicked, s = n.styleMode, o = e("utils/common/styleModeHelper"), u = e("services/serviceLocator"), a = e("ui/telemetry/telemetryClient");
  t.build = function () {
    return new f();
  };
});
