(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/models/deviceCache", [
      "require",
      "exports",
      "../../lib/services/cache/instance",
      "jskype-constants",
      "../../lib/services/callRegister",
      "swx-constants"
    ], e);
}(function (e, t) {
  function f(e) {
    return o.CALLING_DEVICES + "." + e;
  }
  function l(e, t) {
    function n(e, t) {
      e && e(t, s.CALLING.DEVICE_SELECTION_REASON.CACHE);
    }
    switch (e) {
    case s.CALLING.DEVICE_TYPE.CAMERA:
      n(a.selectedCamera, t);
      break;
    case s.CALLING.DEVICE_TYPE.MICROPHONE:
      n(a.selectedMicrophone, t);
      break;
    case s.CALLING.DEVICE_TYPE.SPEAKER:
      n(a.selectedSpeaker, t);
    }
  }
  function c(e) {
    return n.get().getItem(f(e));
  }
  function h(e, t) {
    n.get().setItem(f(e), t);
  }
  function p(e, t) {
    i.get().hasConnectedCall() || c(e).then(function (n) {
      return n && n === t.id() && l(e, t), 1;
    });
  }
  function d(e, t, n) {
    t && n === s.CALLING.DEVICE_SELECTION_REASON.USER && h(e, t.id());
  }
  function v(e) {
    a = e;
    u.push(a.cameras.added(p.bind(null, s.CALLING.DEVICE_TYPE.CAMERA)));
    u.push(a.microphones.added(p.bind(null, s.CALLING.DEVICE_TYPE.MICROPHONE)));
    u.push(a.speakers.added(p.bind(null, s.CALLING.DEVICE_TYPE.SPEAKER)));
    u.push(a.selectedCamera.changed(d.bind(null, s.CALLING.DEVICE_TYPE.CAMERA)));
    u.push(a.selectedMicrophone.changed(d.bind(null, s.CALLING.DEVICE_TYPE.MICROPHONE)));
    u.push(a.selectedSpeaker.changed(d.bind(null, s.CALLING.DEVICE_TYPE.SPEAKER)));
  }
  function m() {
    u.forEach(function (e) {
      e.dispose();
    });
    u = [];
  }
  var n = e("../../lib/services/cache/instance"), r = e("jskype-constants"), i = e("../../lib/services/callRegister"), s = e("swx-constants"), o = r.DATA.storageKeys, u = [], a;
  t.initialize = v;
  t.dispose = m;
}));
