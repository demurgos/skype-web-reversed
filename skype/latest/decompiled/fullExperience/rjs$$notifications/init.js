define("notifications/init", [
  "require",
  "exports",
  "module",
  "cafe/applicationInstance",
  "constants/common",
  "swx-enums",
  "services/serviceLocator",
  "notifications/settings"
], function (e, t) {
  var n = e("cafe/applicationInstance"), r = e("constants/common"), i = e("swx-enums"), s = e("services/serviceLocator"), o = e("notifications/settings");
  t.init = function () {
    var e = s.resolve(r.serviceLocator.MODEL_UI_OBSERVER);
    o.init(), n.get().signInManager.state.once(i.loginState.SignedIn, function () {
      e.observe(n.get());
    });
  };
})
