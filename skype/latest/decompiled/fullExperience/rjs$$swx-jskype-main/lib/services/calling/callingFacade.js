(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/calling/callingFacade", [
      "require",
      "exports",
      "../../../lib/telemetry/logging/callingLogTracer"
    ], e);
}(function (e, t) {
  function s() {
    return i ? Promise.resolve(i) : Promise.reject({ error: "Handler not set" });
  }
  function o(e) {
    i = e;
  }
  function u(e) {
    var t = s().then(function (t) {
      return t.selectCameraDevice(e);
    });
    return t["catch"](function (e) {
      r.error("selectCameraDevice error", e);
    }), t;
  }
  function a(e) {
    var t = s().then(function (t) {
      t.selectMicrophoneDevice(e);
    });
    return t["catch"](function (e) {
      r.error("selectMicrophoneDevice error", e);
    }), t;
  }
  function f(e) {
    var t = s().then(function (t) {
      t.selectSpeakerDevice(e);
    });
    return t["catch"](function (e) {
      r.error("selectSpeakerDevice error", e);
    }), t;
  }
  function l() {
    var e = s().then(function (e) {
      return e.getPluginVersion();
    });
    return e["catch"](function (e) {
      r.log("getPluginVersion error", e);
    }), e;
  }
  function c() {
    var e = s().then(function (e) {
      return e.getMonitorList();
    });
    return e["catch"](function (e) {
    }), e;
  }
  function h(e, t) {
    var n = s().then(function (n) {
      return n.getDeviceName(e, t);
    });
    return n["catch"](function (e) {
    }), n;
  }
  function p(e) {
    var t = s().then(function (t) {
      return t.setScreenCaptureMonitor(e);
    });
    return t["catch"](function (e) {
    }), t;
  }
  function d(e, t, n) {
    var r = s().then(function (r) {
      return r.getMonitorPreview(e, t, n);
    });
    return r["catch"](function (e) {
    }), r;
  }
  var n = e("../../../lib/telemetry/logging/callingLogTracer"), r = n.get(), i;
  t.setCallingHandler = o;
  t.selectCameraDevice = u;
  t.selectMicrophoneDevice = a;
  t.selectSpeakerDevice = f;
  t.getPluginVersion = l;
  t.getMonitorList = c;
  t.getDeviceName = h;
  t.setScreenCaptureMonitor = p;
  t.getMonitorPreview = d;
}));
