define("jSkype/services/mediaAgent/deviceEnumerator", [
  "./constants",
  "./common/utils",
  "./userAgentAdapter"
], function (e, t, n) {
  function r(r) {
    function p(e) {
      if (!c) {
        if (!s.navigator.mediaDevices || !s.navigator.mediaDevices.enumerateDevices)
          return Promise.reject(new Error("device enumeration unsupported"));
        c = Promise.resolve();
      } else if (!e)
        return c;
      return c = c.then(function () {
        return s.navigator.mediaDevices.enumerateDevices().then(d);
      }), c;
    }
    function d(e) {
      var t = m(e);
      return g(t);
    }
    function v() {
      return c ? p(!0).catch(function (e) {
        o.error("failed to reenumerate devices", e);
      }) : Promise.resolve();
    }
    function m(t) {
      var n = {};
      return t.forEach(function (t) {
        switch (t.kind) {
        case "audioinput":
          n[l[e.MEDIA_DEVICE.microphone].id] = l[e.MEDIA_DEVICE.microphone], n[t.deviceId] = {
            id: t.deviceId,
            label: t.label,
            kind: e.MEDIA_DEVICE.microphone
          };
          break;
        case "videoinput":
          n[l[e.MEDIA_DEVICE.camera].id] = l[e.MEDIA_DEVICE.camera], n[t.deviceId] = {
            id: t.deviceId,
            label: t.label,
            kind: e.MEDIA_DEVICE.camera
          };
        }
      }), n;
    }
    function g(e) {
      var n = !1;
      return a && (t.forOwn(a, function (t, r) {
        e.hasOwnProperty(r) || (n = !0, o.log("media device removed", "kind:", t.kind, "id:", t.id, "label:", t.label));
      }), t.forOwn(e, function (e, t) {
        a.hasOwnProperty(t) || (n = !0, o.log("media device added", "kind:", e.kind, "id:", e.id, "label:", e.label));
      })), a = e, n && i.onDevicesChanged && i.onDevicesChanged(a), a;
    }
    function y() {
      function t() {
        v().then(function () {
          f = s.setTimeout(t, e);
        });
      }
      var e = typeof u.devicePollingInterval != "undefined" ? u.devicePollingInterval : 3000;
      if (e === 0 || h || f)
        return;
      o.log("starting device polling");
      f = s.setTimeout(t, e);
    }
    function b() {
      h = !0;
      f && (o.log("stopping device polling"), s.clearTimeout(f), f = void 0);
    }
    var i = this, s = n.window, o = r.logger.createChild("DeviceEnumerator"), u = r.settings, a, f, l = {}, c, h;
    l[e.MEDIA_DEVICE.microphone] = {
      id: "default_audio_device",
      label: "Default audio device",
      kind: e.MEDIA_DEVICE.microphone
    };
    l[e.MEDIA_DEVICE.camera] = {
      id: "default_video_device",
      label: "Default video device",
      kind: e.MEDIA_DEVICE.camera
    };
    this.onDevicesChanged = void 0;
    this.enumerateDevices = function () {
      return p(!1).then(function (e) {
        return y(), e;
      });
    };
    this.getDefaultDevices = function () {
      return l;
    };
    s.navigator.mediaDevices && (s.navigator.mediaDevices.ondevicechange = function () {
      b();
      v();
    });
  }
  return {
    build: function (e) {
      return new r(e);
    }
  };
});
