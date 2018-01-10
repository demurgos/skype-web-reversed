(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/modelHelpers/calling/deviceHelper", [
      "require",
      "exports",
      "swx-jskype-internal-application-instance",
      "swx-enums",
      "swx-constants"
    ], e);
}(function (e, t) {
  function s() {
    return u(r.deviceType.Speaker);
  }
  function o() {
    return u(r.deviceType.Microphone);
  }
  function u(e) {
    var t = a(e);
    return t().length > 1 || t().length === 1 && t(0).id() !== i.COMMON.deviceSelection.DEFAULT_ID;
  }
  function a(e) {
    switch (e) {
    case r.deviceType.Camera:
      return n.get().devicesManager.cameras;
    case r.deviceType.Microphone:
      return n.get().devicesManager.microphones;
    case r.deviceType.Speaker:
      return n.get().devicesManager.speakers;
    }
  }
  var n = e("swx-jskype-internal-application-instance"), r = e("swx-enums"), i = e("swx-constants");
  t.isSpeakerAvailable = s;
  t.isMicrophoneAvailable = o;
}));
