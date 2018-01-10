(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("media-agent/lib/device/deviceEnumerator", [
      "require",
      "exports",
      "../constants",
      "../common/utils",
      "../common/userAgentAdapter"
    ], e);
}(function (e, t) {
  function s(e) {
    function d(e) {
      var t = v(e);
      return m(t);
    }
    function v(e) {
      var t = {};
      return e.forEach(function (e) {
        switch (e.kind) {
        case "audioinput":
          e.deviceId !== n["default"].MEDIA_DEVICE.defaultId && (t[e.deviceId] = {
            id: e.deviceId,
            label: e.label,
            kind: n["default"].MEDIA_DEVICE.microphone
          }), t[c[n["default"].MEDIA_DEVICE.microphone].id] = c[n["default"].MEDIA_DEVICE.microphone];
          break;
        case "videoinput":
          t[c[n["default"].MEDIA_DEVICE.camera].id] = c[n["default"].MEDIA_DEVICE.camera], t[e.deviceId] = {
            id: e.deviceId,
            label: e.label,
            kind: n["default"].MEDIA_DEVICE.camera
          };
        }
      }), t;
    }
    function m(e) {
      var n = !1;
      return a && (r["default"].forOwn(a, function (t, r) {
        e.hasOwnProperty(r) ? t.label !== e[r].label && (n = !0, o.log("media device label was updated")) : (n = !0, o.log("media device removed", "kind:", t.kind, "id:", t.id, "label:", t.label));
      }), r["default"].forOwn(e, function (e, t) {
        a.hasOwnProperty(t) || (n = !0, o.log("media device added", "kind:", e.kind, "id:", e.id, "label:", e.label));
      })), a = e, n && t.onDevicesChanged && t.onDevicesChanged(a), a;
    }
    function g() {
      p = !0;
      t.stopDevicePolling();
    }
    var t = this, s = i["default"].window, o = e.logger.createChild("DeviceEnumerator"), u = e.settings, a, f, l = 3000, c = {}, h = Promise.resolve(), p;
    c[n["default"].MEDIA_DEVICE.microphone] = {
      id: "default_audio_device",
      label: "Default audio device",
      kind: n["default"].MEDIA_DEVICE.microphone
    };
    c[n["default"].MEDIA_DEVICE.camera] = {
      id: "default_video_device",
      label: "Default video device",
      kind: n["default"].MEDIA_DEVICE.camera
    };
    this.onDevicesChanged = void 0;
    this.enumerateDevices = function () {
      return !s.navigator.mediaDevices || !s.navigator.mediaDevices.enumerateDevices ? Promise.reject(new Error("device enumeration unsupported")) : (h = h.then(function () {
        return s.navigator.mediaDevices.enumerateDevices();
      }).then(function (e) {
        return d(e);
      }), h);
    };
    this.getDefaultDevices = function () {
      return c;
    };
    this.getDeviceName = function (e) {
      if (e === c[n["default"].MEDIA_DEVICE.microphone].id)
        return Promise.resolve(c[n["default"].MEDIA_DEVICE.microphone].label);
      if (e === c[n["default"].MEDIA_DEVICE.camera].id)
        return Promise.resolve(c[n["default"].MEDIA_DEVICE.camera].label);
      var r = a[e], i = r.kind === n["default"].MEDIA_DEVICE.microphone ? {
          audio: { deviceId: e },
          video: !0
        } : {
          audio: !0,
          video: { deviceId: e }
        };
      return s.navigator.mediaDevices.getUserMedia(i).then(function () {
        return t.enumerateDevices();
      }).then(function (t) {
        return t[e].label;
      });
    };
    this.startDevicePolling = function () {
      function n() {
        t.enumerateDevices().then(function () {
          f = s.setTimeout(n, e);
        });
      }
      var e = typeof u.devicePollingInterval != "undefined" ? u.devicePollingInterval : l;
      if (e === 0 || p || f)
        return;
      o.log("starting device polling");
      f = s.setTimeout(n, e);
    };
    this.stopDevicePolling = function () {
      f && (o.log("stopping device polling"), s.clearTimeout(f), f = void 0);
    };
    s.navigator.mediaDevices && (s.navigator.mediaDevices.ondevicechange = function () {
      g();
      t.enumerateDevices();
    });
  }
  var n = e("../constants"), r = e("../common/utils"), i = e("../common/userAgentAdapter");
  t.__esModule = !0;
  t["default"] = {
    build: function (e) {
      return new s(e);
    }
  };
}));
