define("ui/viewModels/chat/menuItem", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "vendor/knockout",
  "usertiming",
  "utils/common/eventHelper",
  "constants/common",
  "services/serviceLocator",
  "experience/settings",
  "ui/telemetry/telemetryClient",
  "telemetry/chat/menuItemTelemetry"
], function (e, t) {
  function c(e) {
    var t = this, n = h(e), c = l.build(), p = u.resolve(o.serviceLocator.FEATURE_FLAGS);
    t.id = n.id ? "menuItem-" + n.id : n.id, t.icon = n.icon, t.text = n.text, t.page = n.navigation.page, t.isActive = r.observable(!1), t.isDisabled = n.isDisabled ? n.isDisabled : r.observable(!1), t.isNavigationMenuIconsEnabled = p.isFeatureOn(o.featureFlags.NAVIGATION_MENU_ICONS_ENABLED), t.onKeyDown = function (e, n) {
      var r = s.isActivation(n);
      return r && t.onClick(), !r;
    }, t.onClick = function () {
      var r = n.telemetry, s = u.resolve(o.serviceLocator.PUBSUB), l = u.resolve(o.serviceLocator.ACTION_TELEMETRY);
      r.uiAction && l.recordAction(r.uiAction), r.perfMarker && i.mark(r.perfMarker), r.event && f.get().sendEvent(a.uiTenantToken, r.event.name, r.event.data), e.ordinal = t.ordinal, c.publish(e), t.isActive(!0), s.publish(o.events.navigation.NAVIGATE, e.navigation);
    }, t.getTitleText = function () {
      if (t.isNavigationMenuIconsEnabled)
        return t.text;
    };
  }
  function h(e) {
    var t = "";
    return n.merge({
      id: t,
      icon: t,
      text: t,
      navigation: {
        page: t,
        origin: t
      },
      telemetry: {
        uiAction: t,
        perfMarker: t,
        event: t
      }
    }, e);
  }
  var n = e("lodash-compat"), r = e("vendor/knockout"), i = e("usertiming"), s = e("utils/common/eventHelper"), o = e("constants/common"), u = e("services/serviceLocator"), a = e("experience/settings").telemetry, f = e("ui/telemetry/telemetryClient"), l = e("telemetry/chat/menuItemTelemetry");
  t.build = function (e) {
    return new c(e);
  };
})
