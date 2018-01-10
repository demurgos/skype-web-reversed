(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/calling/handlers/shell/shellCallingHandler", [
      "require",
      "exports",
      "../../../../../lib/services/outOfBrowser/extensionLifecycleFacade"
    ], e);
}(function (e, t) {
  function r() {
    return Promise.reject(undefined);
  }
  function i() {
    return Promise.reject(undefined);
  }
  function s() {
    return Promise.reject(undefined);
  }
  function o() {
    var e = n.build();
    return e.getVersion();
  }
  function u() {
    return Promise.reject(undefined);
  }
  function a() {
    return Promise.reject(undefined);
  }
  function f() {
    return Promise.reject(undefined);
  }
  function l(e, t) {
    return Promise.resolve(t);
  }
  var n = e("../../../../../lib/services/outOfBrowser/extensionLifecycleFacade");
  t.selectCameraDevice = r;
  t.selectMicrophoneDevice = i;
  t.selectSpeakerDevice = s;
  t.getPluginVersion = o;
  t.getMonitorList = u;
  t.setScreenCaptureMonitor = a;
  t.getMonitorPreview = f;
  t.getDeviceName = l;
}));
