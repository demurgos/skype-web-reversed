define("ui/modalDialog/welcomeDialog", [
  "require",
  "exports",
  "module",
  "swx-i18n",
  "constants/common",
  "services/serviceLocator",
  "services/flagsApi/flagsProvider",
  "ui/modalDialog/modalDialog",
  "ui/viewModels/experience/welcomeDialog",
  "text!views/experience/welcomeDialog.html"
], function (e, t) {
  function f() {
    function n() {
      return e.get(t.WELCOME_DIALOG_FLAG_ID);
    }
    var e = s.getInstance();
    return e.fetchFlags().then(function () {
      n() || l();
    });
  }
  function l() {
    var e = u.build(c), t = n.fetch({ key: "welcomeDialog_header" });
    o.build(u.ELEMENT_ID, e, a);
    o.show(u.ELEMENT_ID, t);
  }
  function c() {
    var e = s.getInstance();
    o.hide(u.ELEMENT_ID);
    e.set(t.WELCOME_DIALOG_FLAG_ID);
  }
  var n = e("swx-i18n").localization, r = e("constants/common"), i = e("services/serviceLocator"), s = e("services/flagsApi/flagsProvider"), o = e("ui/modalDialog/modalDialog"), u = e("ui/viewModels/experience/welcomeDialog"), a = e("text!views/experience/welcomeDialog.html");
  t.WELCOME_DIALOG_FLAG_ID = 1;
  t.init = function () {
    var e = i.resolve(r.serviceLocator.FEATURE_FLAGS), t;
    e.isFeatureOn(r.featureFlags.WELCOME_DIALOG) && (t = i.resolve(r.serviceLocator.PUBSUB), t.subscribe(r.apiUIEvents.SWX_TIMELINE_LOADED, f));
  };
});
