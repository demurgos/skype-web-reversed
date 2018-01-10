define("telemetry/chat/mediaPickerTelemetry", [
  "require",
  "exports",
  "module",
  "swx-constants",
  "swx-service-locator-instance",
  "experience/settings",
  "utils/common/styleModeHelper",
  "ui/telemetry/telemetryClient"
], function (e, t) {
  function a() {
    function f() {
      e.data = {
        paperclipButtonClicked: t,
        filePickerClicked: t
      };
    }
    function l(e) {
      for (var t in e)
        e.hasOwnProperty(t) && !(typeof e[t] == "string" || e[t] instanceof String) && (e[t] = e[t] + "");
      return e;
    }
    var e = this, t = n.telemetry.NOT_AVAILABLE, a = r.resolve(n.serviceLocator.FEATURE_FLAGS);
    e.publish = function () {
      e.data.mediaBarV2Enabled = a.isFeatureOn(n.featureFlags.MEDIA_BAR_V2_ENABLED);
      e.data.styleMode = s.get().currentMode();
      var t = o.TYPE, r = l(e.data);
      u.get().sendEvent(i.telemetry.chatTenantToken, t, r);
      f();
    };
    f();
  }
  var n = e("swx-constants").COMMON, r = e("swx-service-locator-instance").default, i = e("experience/settings"), s = e("utils/common/styleModeHelper"), o = n.telemetry.mediaBarEvent, u = e("ui/telemetry/telemetryClient");
  t.build = function () {
    return new a();
  };
});
