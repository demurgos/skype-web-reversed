define("ui/modalDialog/deviceDisabledDialog", [
  "require",
  "exports",
  "module",
  "swx-cafe-application-instance",
  "swx-browser-detect",
  "swx-constants",
  "ui/viewModels/calling/deviceDisabledViewModel",
  "text!views/calling/deviceDisabled.html",
  "swx-i18n",
  "ui/modalDialog/modalDialog",
  "swx-service-locator-instance"
], function (e, t) {
  function l() {
    var e = s.build(c), t;
    r.getBrowserInfo().browserName === r.BROWSERS.CHROME && (t = u.fetch({ key: "modal_device_disabled_chrome_title" }));
    r.getBrowserInfo().isEdge && (t = u.fetch({ key: "modal_device_disabled_edge_title" }));
    a.build(s.ELEMENT_ID, e, o);
    a.show(s.ELEMENT_ID, t);
  }
  function c() {
    a.dispose(s.ELEMENT_ID);
  }
  var n = e("swx-cafe-application-instance"), r = e("swx-browser-detect").default, i = e("swx-constants").COMMON, s = e("ui/viewModels/calling/deviceDisabledViewModel"), o = e("text!views/calling/deviceDisabled.html"), u = e("swx-i18n").localization, a = e("ui/modalDialog/modalDialog"), f = e("swx-service-locator-instance").default;
  t.init = function () {
    var e = f.resolve(i.serviceLocator.FEATURE_FLAGS);
    if (e.isFeatureOn(i.featureFlags.DEVICE_DISABLED_DIALOG_ENABLED)) {
      var t = n.get().devicesManager.mediaCapabilities.isMicrophoneEnabled(), r = n.get().devicesManager.mediaCapabilities.isCameraEnabled();
      (!t || !r) && l();
    }
  };
});
