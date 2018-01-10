(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/calling/handlers/plugin/pluginCallingHandler", [
      "require",
      "exports",
      "swx-constants",
      "../../../../../lib/services/plugin/pluginLifecycleFacade"
    ], e);
}(function (e, t) {
  function i(e) {
    return r.createPlugin().then(function (t) {
      return t.skypeCore.selectCameraDevice(e);
    });
  }
  function s(e) {
    return r.createPlugin().then(function (t) {
      var r = e === n.COMMON.deviceSelection.DEFAULT_ID ? "" : e;
      return t.skypeCore.selectMicrophoneDevice(r);
    });
  }
  function o(e) {
    return r.createPlugin().then(function (t) {
      var r = e === n.COMMON.deviceSelection.DEFAULT_ID ? "" : e;
      return t.skypeCore.selectSpeakerDevice(r);
    });
  }
  function u() {
    return r.getVersion();
  }
  function a() {
    return new Promise(function (e, t) {
      r.createPlugin().then(function (n) {
        n.skypeCore.getMonitorList(e, t);
      }, t);
    });
  }
  function f(e) {
    return new Promise(function (t, n) {
      r.createPlugin().then(function (r) {
        r.skypeCore.setScreenCaptureMonitor(e, t, n);
      }, n);
    });
  }
  function l(e, t, n) {
    return new Promise(function (i, s) {
      r.createPlugin().then(function (r) {
        r.skypeCore.getMonitorPreview(e, t, n, i, s);
      }, s);
    });
  }
  function c(e, t) {
    return Promise.resolve(t);
  }
  var n = e("swx-constants"), r = e("../../../../../lib/services/plugin/pluginLifecycleFacade");
  t.selectCameraDevice = i;
  t.selectMicrophoneDevice = s;
  t.selectSpeakerDevice = o;
  t.getPluginVersion = u;
  t.getMonitorList = a;
  t.setScreenCaptureMonitor = f;
  t.getMonitorPreview = l;
  t.getDeviceName = c;
}));
