define("jSkype/services/plugin/deviceHandlers", [
  "require",
  "exports",
  "module",
  "jSkype/client",
  "jSkype/models/device",
  "swx-enums"
], function (e, t) {
  function s(e) {
    switch (e) {
    case i.deviceType.Camera:
      return n.get().devicesManager.cameras;
    case i.deviceType.Microphone:
      return n.get().devicesManager.microphones;
    case i.deviceType.Speaker:
      return n.get().devicesManager.speakers;
    }
  }
  function o(e) {
    switch (e) {
    case i.deviceType.Camera:
      return n.get().devicesManager.selectedCamera;
    case i.deviceType.Microphone:
      return n.get().devicesManager.selectedMicrophone;
    case i.deviceType.Speaker:
      return n.get().devicesManager.selectedSpeaker;
    }
  }
  var n = e("jSkype/client"), r = e("jSkype/models/device"), i = e("swx-enums");
  t.createOnDeviceAddedHandler = function (e) {
    var t = s(e);
    return function (n) {
      if (n.deviceId) {
        var i = new r(n.deviceName, n.deviceId, e);
        t._add(i, n.deviceId);
      }
    };
  }, t.createOnDeviceRemovedHandler = function (e) {
    var t = s(e), n = o(e);
    return function (e) {
      var r = t(e.deviceId);
      t._remove(e.deviceId), n() === r && n(null);
    };
  }, t.createOnDeviceSelectedHandler = function (e) {
    var t = s(e), n = o(e);
    return function (e) {
      if (e.deviceId) {
        var r = t(e.deviceId);
        n(r);
      }
    };
  };
})
