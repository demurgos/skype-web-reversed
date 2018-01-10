define("telemetry/calling/devicesTracker", [
  "require",
  "exports",
  "module",
  "swx-cafe-application-instance",
  "swx-constants",
  "swx-util-calling-stack",
  "experience/settings",
  "ui/telemetry/telemetryClient"
], function (e, t) {
  var n = e("swx-cafe-application-instance"), r = e("swx-constants").COMMON, i = e("swx-util-calling-stack"), s = e("experience/settings"), o = e("ui/telemetry/telemetryClient");
  t.reportCurrentDeviceCount = function () {
    var e = n.get().devicesManager;
    if (i.get().isInBrowserCallingSupported()) {
      var t = {
        camerasCount: e.cameras().length,
        speakersCount: e.speakers().length,
        microphonesCount: e.microphones().length
      };
      o.get().sendEvent(s.telemetry.uiTenantToken, r.telemetry.calling.DEVICES, t);
    }
  };
});
