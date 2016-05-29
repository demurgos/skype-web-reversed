define("telemetry/chat/mediaPickerTelemetry", [
  "require",
  "exports",
  "module",
  "constants/common",
  "experience/settings",
  "ui/telemetry/telemetryClient"
], function (e, t) {
  function o() {
    function o() {
      e.data = {
        paperclipButtonClicked: t,
        filePickerClicked: t
      };
    }
    function u(e) {
      for (var t in e)
        e.hasOwnProperty(t) && !(typeof e[t] == "string" || e[t] instanceof String) && (e[t] = e[t] + "");
      return e;
    }
    var e = this, t = n.telemetry.NOT_AVAILABLE;
    e.publish = function () {
      var t = i.TYPE, n = u(e.data);
      s.get().sendEvent(r.telemetry.uiTenantToken, t, n);
      o();
    };
    o();
  }
  var n = e("constants/common"), r = e("experience/settings"), i = n.telemetry.mediaBarEvent, s = e("ui/telemetry/telemetryClient");
  t.build = function () {
    return new o();
  };
});
