(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/calling/handlers/pluginless/pluginlessCallingHandler", [
      "require",
      "exports"
    ], e);
}(function (e, t) {
  function r(e) {
    n = e;
  }
  function i(e) {
    var t = n.getDeviceManager();
    return t.selectDevices({
      camera: e,
      microphone: t.getSelectedDevices().microphone
    }), Promise.resolve(undefined);
  }
  function s(e) {
    var t = n.getDeviceManager();
    return t.selectDevices({
      microphone: e,
      camera: t.getSelectedDevices().camera
    }), Promise.resolve(undefined);
  }
  function o() {
    return Promise.reject(undefined);
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
  function l() {
    return Promise.reject(undefined);
  }
  function c(e, t) {
    var r = n.getDeviceManager();
    return r.getDeviceNameAsync(e, t);
  }
  var n;
  t.initialize = r;
  t.selectCameraDevice = i;
  t.selectMicrophoneDevice = s;
  t.selectSpeakerDevice = o;
  t.getPluginVersion = u;
  t.getMonitorList = a;
  t.setScreenCaptureMonitor = f;
  t.getMonitorPreview = l;
  t.getDeviceName = c;
}));
