(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/plugin/deviceHandlers", [
      "require",
      "exports",
      "swx-jskype-internal-application-instance",
      "../../../lib/models/device",
      "swx-enums",
      "swx-constants"
    ], e);
}(function (e, t) {
  function o(e) {
    var t = f(e);
    return function (n) {
      if (n.deviceId) {
        var i = new r["default"](n.deviceName, n.deviceId, e);
        t._add(i, n.deviceId);
      }
    };
  }
  function u(e) {
    var t = f(e), n = l(e);
    return function (e) {
      var r = t(e.deviceId);
      t._remove(e.deviceId);
      n() === r && n._set(null);
    };
  }
  function a(e) {
    var t = f(e), n = l(e);
    return function (e) {
      var r = e.deviceId || s.COMMON.deviceSelection.DEFAULT_ID, i = t(r);
      if (n() && n().id() === r)
        return;
      n._set(i);
    };
  }
  function f(e) {
    switch (e) {
    case i.deviceType.Camera:
      return n.get().devicesManager.cameras;
    case i.deviceType.Microphone:
      return n.get().devicesManager.microphones;
    case i.deviceType.Speaker:
      return n.get().devicesManager.speakers;
    }
  }
  function l(e) {
    switch (e) {
    case i.deviceType.Camera:
      return n.get().devicesManager.selectedCamera;
    case i.deviceType.Microphone:
      return n.get().devicesManager.selectedMicrophone;
    case i.deviceType.Speaker:
      return n.get().devicesManager.selectedSpeaker;
    }
  }
  var n = e("swx-jskype-internal-application-instance"), r = e("../../../lib/models/device"), i = e("swx-enums"), s = e("swx-constants");
  t.createOnDeviceAddedHandler = o;
  t.createOnDeviceRemovedHandler = u;
  t.createOnDeviceSelectedHandler = a;
}));
