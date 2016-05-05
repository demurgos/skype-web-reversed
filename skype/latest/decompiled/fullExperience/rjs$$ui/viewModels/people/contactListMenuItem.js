define("ui/viewModels/people/contactListMenuItem", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "vendor/knockout",
  "usertiming",
  "constants/common",
  "services/serviceLocator",
  "experience/settings",
  "ui/telemetry/telemetryClient"
], function (e, t) {
  function f(e) {
    var t = this, f = o.resolve(s.serviceLocator.ACTION_TELEMETRY);
    t.id = e.id ? "menuItem-" + e.id : "", t.strategy = e.strategy, t.text = e.text || "", t.selected = r.observable(Boolean(e.selected)), t.onClick = function (t, r) {
      return e.uiAction && f.recordAction(e.uiAction), e.perfMarker && i.mark(e.perfMarker), e.event && a.get().sendEvent(u.uiTenantToken, e.event.name, e.event.data), n.isFunction(e.callback) && e.callback(), r.preventDefault(), !0;
    };
  }
  var n = e("lodash-compat"), r = e("vendor/knockout"), i = e("usertiming"), s = e("constants/common"), o = e("services/serviceLocator"), u = e("experience/settings").telemetry, a = e("ui/telemetry/telemetryClient");
  t.build = function (e) {
    return e || (e = {}), new f(e);
  };
})
