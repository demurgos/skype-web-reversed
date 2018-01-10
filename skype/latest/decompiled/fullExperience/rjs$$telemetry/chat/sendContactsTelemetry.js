define("telemetry/chat/sendContactsTelemetry", [
  "require",
  "exports",
  "module",
  "swx-constants",
  "ui/telemetry/telemetryClient",
  "telemetry/utils/telemetryUtils",
  "experience/settings",
  "swx-utils-chat",
  "swx-service-locator-instance",
  "utils/common/styleModeHelper"
], function (e, t) {
  function l(e) {
    function d() {
      t.data = {
        cta: h || c,
        action: c,
        participantsCount: e.participantsCount() || c,
        statusCodestatusCode: c,
        timeBeforeActionTaken: c,
        numberOfContacts: c
      };
    }
    function v() {
      t.data.timeBeforeActionTaken = m(l, u.getDate());
      t.data.mediaBarV2Enabled = p.isFeatureOn(n.featureFlags.MEDIA_BAR_V2_ENABLED);
      t.data.styleMode = f.get().currentMode();
      var e = s.stringify(t.data);
      i.get().sendEvent(o.telemetry.chatTenantToken, r.TYPE, e);
      d();
    }
    function m(e, t) {
      return t - e;
    }
    var t = this, l = u.getDate(), c = n.telemetry.NOT_AVAILABLE, h = r.cta.MEDIABAR, p = a.resolve(n.serviceLocator.FEATURE_FLAGS);
    t.canceled = function () {
      t.data.action = r.action.CANCELED;
      v();
    };
    t.confirmed = function () {
      t.data.action = r.action.CONFIRMED;
      v();
    };
    d();
  }
  var n = e("swx-constants").COMMON, r = n.telemetry.sendContacts, i = e("ui/telemetry/telemetryClient"), s = e("telemetry/utils/telemetryUtils"), o = e("experience/settings"), u = e("swx-utils-chat").dateTime, a = e("swx-service-locator-instance").default, f = e("utils/common/styleModeHelper");
  t.build = function (e) {
    return new l(e);
  };
});
