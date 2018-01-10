(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("media-agent/lib/device/deviceManager", [
      "require",
      "exports",
      "../constants",
      "./deviceEnumerator",
      "./mediaStream",
      "../common/utils",
      "../common/render/videoRenderer"
    ], e);
}(function (e, t) {
  var n = e("../constants"), r = e("./deviceEnumerator"), i = e("./mediaStream"), s = e("../common/utils"), o = e("../common/render/videoRenderer"), u = function (e, t) {
      function m() {
        if (d.length) {
          var e = L({ video: !0 });
          return e.start().then(function () {
            d.forEach(function (t) {
              t._attachMediaStreamRef(e);
            });
          });
        }
        return Promise.resolve();
      }
      function g(e, t) {
        var n = s["default"].values(f);
        if (e.getSettings) {
          var r = e.getSettings().deviceId;
          return s["default"].find(n, function (e) {
            return e.kind === t && e.id === r;
          });
        }
        return s["default"].find(n, function (n) {
          return n.kind === t && n.label === e.label;
        });
      }
      function b(e) {
        return window.RTCIceGatherer ? l.getDeviceName(e) : Promise.resolve(f[e].label);
      }
      function w(e, t) {
        return JSON.stringify(e) === JSON.stringify(t);
      }
      function E() {
        return l.enumerateDevices().then(function (e) {
          return f = e, s["default"].values(e);
        });
      }
      function S(e) {
        var t = {
          microphone: l.getDefaultDevices()[n["default"].MEDIA_DEVICE.microphone].id,
          camera: l.getDefaultDevices()[n["default"].MEDIA_DEVICE.camera].id
        };
        for (var r in e)
          if (e.hasOwnProperty(r)) {
            var i = e[r];
            f.hasOwnProperty(i) ? t[r] = i : a.warn("device selection is invalid, reverting to default", "kind:", r, "id:", i);
          }
        if (!w(c, t)) {
          var s = "camera" in c ^ "camera" in t || "microphone" in c ^ "microphone" in t;
          c = t;
          u._deviceSelectionChanged && (s || u._deviceSelectionChanged());
          m();
        }
      }
      function x() {
        return c;
      }
      function T(e, t) {
        return new y(e, t);
      }
      function N(t, r, o) {
        var u = !!t.audio, f = !!t.video, c = !1, d = {
            getStream: function () {
              return g;
            },
            isSuitable: function (e, t) {
              return !c && !!e.audio === u && !!e.video === f && (!e.audio || r === t.microphone) && (!e.video || o === t.camera);
            },
            outdateIfAnyDeviceRemoved: function (e) {
              c || (c = !e[r] || !e[o]);
            }
          }, m = p++, g = i["default"].build({
            global: e,
            logger: a
          }, t);
        return g.onDisposed = function () {
          a.log("release media stream", "generation:", m, "cached:", h.length, "audio:", u, "video:", f);
          s["default"].remove(h, function (e) {
            return e === d;
          });
          h.length || l.stopDevicePolling();
        }, g.start().then(function () {
          g.setMute(!v);
          u = g.hasAudio();
          f = g.hasVideo();
          a.log("created media stream", "generation:", m, "cached:", h.length, "audio:", u, "video:", f);
          C(!0, !0);
        })["catch"](function (e) {
          e && e.type === n["default"].MEDIA_ERROR.permissionDeniedError && C(g.hasAudio(), g.hasVideo());
          s["default"].remove(h, function (e) {
            return e === d;
          });
          h.length || l.stopDevicePolling();
        }), l.startDevicePolling(), h.push(d), d;
      }
      function C(e, n) {
        t.onDevicesPermissionChanged && t.onDevicesPermissionChanged({
          hasMicrophonePermission: e,
          hasCameraPermission: n
        });
      }
      function k(e) {
        return s["default"].find(h, function (t) {
          return t.isSuitable(e, c);
        });
      }
      function L(e) {
        a.log("retrieving media stream: ", JSON.stringify(e));
        var t = k(e);
        if (!t) {
          var r = {};
          e.audio && (c.microphone ? c.microphone === l.getDefaultDevices()[n["default"].MEDIA_DEVICE.microphone].id ? r.audio = !0 : r.audio = { deviceId: { exact: c.microphone } } : a.warn("ignoring audio modality due to missing microphone selection"));
          e.video && (c.camera ? c.camera === l.getDefaultDevices()[n["default"].MEDIA_DEVICE.camera].id ? r.video = !0 : r.video = { deviceId: { exact: c.camera } } : a.warn("ignoring video modality due to missing camera selection"));
          if (!r.audio && !r.video)
            throw new Error("requesting nothing");
          return N(r, c.microphone, c.camera).getStream().getClient();
        }
        return t.getStream().getClient();
      }
      function A(e) {
        return v = e, h.forEach(function (t) {
          t.getStream().setMute(!e);
        }), Promise.resolve();
      }
      function O() {
        return A(!1);
      }
      function M() {
        return A(!0);
      }
      this.enumerateDevicesAsync = E;
      this.getDeviceNameAsync = b;
      this.selectDevices = S;
      this.getSelectedDevices = x;
      this.muteInputAsync = O;
      this.unmuteInputAsync = M;
      this.createPreviewRenderer = T;
      this._getMediaStream = L;
      var u = this, a = e.logger, f = {}, l = r["default"].build({
          logger: a,
          settings: e.settings
        });
      l.onDevicesChanged = function (e) {
        f = e;
        h.forEach(function (t) {
          t.outdateIfAnyDeviceRemoved(e);
        });
        t.onDevicesChanged && t.onDevicesChanged(s["default"].values(e));
      };
      var c = {
          microphone: l.getDefaultDevices()[n["default"].MEDIA_DEVICE.microphone].id,
          camera: l.getDefaultDevices()[n["default"].MEDIA_DEVICE.camera].id
        }, h = [], p = 0, d = [], v = !0;
      this.getDefaultDevices = function () {
        var e = L({
          audio: !0,
          video: !0
        });
        return e.start()["catch"](function (e) {
          a.error("Could not start stream");
        }).then(function () {
          return E();
        }).then(function () {
          var t = l.getDefaultDevices(), r = e.getObject();
          if (r) {
            var i = r.getAudioTracks()[0], o = r.getVideoTracks()[0];
            if (i) {
              var u = g(i, n["default"].MEDIA_DEVICE.microphone);
              u && (t[n["default"].MEDIA_DEVICE.microphone] = u);
            }
            if (o) {
              var a = g(o, n["default"].MEDIA_DEVICE.camera);
              a && (t[n["default"].MEDIA_DEVICE.camera] = a);
            }
          }
          return e.dispose(), s["default"].values(t);
        }, function (t) {
          throw e.dispose(), t;
        });
      };
      var y = function (e, t) {
        o["default"].call(this, e);
        var n = this, r = this.dispose.bind(this), i = null, u = !1;
        this.onSizeChanged(t ? t.onVideoSizeChanged : null);
        this.onError(t ? t.onError : null);
        this._attachMediaStreamRef = function (e) {
          try {
            i && (this.reattachEventListeners(), i.dispose(), i = null);
            e.onApplyConstraints = function (t) {
              n.attachMediaStream(null);
              t.then(function () {
                n.attachMediaStream(e.getObject());
              });
            };
            this.attachMediaStream(e.getObject());
            i = e;
          } catch (t) {
            throw e.dispose(), t;
          }
        };
        this.dispose = function () {
          u = !0;
          s["default"].remove(d, function (e) {
            return e === n;
          });
          r();
          i && (i.dispose(), i = null);
        };
        this.startVideoAsync = function () {
          var e = L({ video: !0 });
          return e.start().then(function () {
            if (u)
              return e.dispose().then(function () {
                throw new Error("disposed");
              });
            n._attachMediaStreamRef(e);
            d.push(n);
          });
        };
      };
      y.prototype = Object.create(o["default"].prototype);
    };
  t.__esModule = !0;
  t["default"] = u;
}));
