define("jSkype/services/mediaAgent/deviceManager", [
  "./constants",
  "./deviceEnumerator",
  "./userAgentAdapter"
], function (e, t) {
  var n = function (n, r) {
    function p() {
      return c.length ? C({
        audio: !0,
        video: !0
      }).then(function (e) {
        c.forEach(function (t) {
          t._attachMediaStreamRef(e);
        });
      }) : Promise.resolve();
    }
    function m(t) {
      return s.log("getUserMedia", "constraints:", t), navigator.mediaDevices && navigator.mediaDevices.getUserMedia, new Promise(function (n, r) {
        navigator.getUserMedia(t, n, function (t) {
          r({
            type: e.MEDIA_ERROR.permissionDeniedError,
            detail: "permission to use media device was denied: " + t.toString()
          });
        });
      });
    }
    function g(e, t) {
      return JSON.stringify(e) === JSON.stringify(t);
    }
    function y() {
      return u.enumerateDevices().then(function (e) {
        return o = e, e;
      });
    }
    function b(e) {
      var t = {};
      for (var n in e)
        if (e.hasOwnProperty(n)) {
          var r = e[n];
          o.hasOwnProperty(r) ? t[n] = r : s.warn("device selection is invalid", "kind:", n, "id:", r);
        }
      if (!g(a, t)) {
        var u = "camera" in a ^ "camera" in t || "microphone" in a ^ "microphone" in t;
        a = t, i._deviceSelectionChanged && (u || i._deviceSelectionChanged()), p();
      }
    }
    function w() {
      return a;
    }
    function E(e, t) {
      return new v(e, t);
    }
    function S(e) {
      return C(e);
    }
    function x(e, t, n, r, i) {
      var o = 1, u = !1, a = {
          getPromise: function () {
            return o += 1, c;
          },
          isSuitable: function (i, s) {
            return !u && i.audio === e && i.video === t && (!i.audio || n === s.microphone) && (!i.video || r === s.camera);
          },
          outdateIfAnyDeviceRemoved: function (e) {
            u || (u = !e[n] || !e[r]);
          }
        }, c = i.then(function (n) {
          var r = l++, i = !1, u = !1, c = function () {
              T(n.getAudioTracks(), !i && !u);
            };
          return typeof h != "undefined" && (i = !h, c()), e = n.getAudioTracks().length !== 0, t = n.getVideoTracks().length !== 0, s.log("create media stream", "generation:", r, "cached:", f.length, "audio:", e, "video:", t), {
            getObject: function () {
              return n;
            },
            clone: function () {
              return o += 1, this;
            },
            setMute: function (e) {
              i = e, c();
            },
            setHold: function (e) {
              u = e, c();
            },
            dispose: function () {
              o -= 1;
              if (o === 0) {
                try {
                  s.log("release media stream", "generation:", r, "cached:", f.length, "audio:", e, "video:", t), window.stopMediaStream(n);
                } catch (i) {
                  s.warn("exception", "error:", i);
                }
                f.splice(f.indexOf(a), 1);
              }
            }
          };
        }).catch(function (e) {
          throw f.splice(f.indexOf(a), 1), e;
        });
      return f.push(a), c;
    }
    function T(e, t) {
      e.forEach(function (e) {
        typeof e.enabled != "undefined" && (e.enabled = t, s.log("control media stream track", "kind:", e.kind, "enabled:", e.enabled, "muted:", e.muted));
      });
    }
    function N(e) {
      for (var t = 0; t < f.length; t++)
        if (f[t].isSuitable(e, a))
          return f[t].getPromise();
      return null;
    }
    function C(t) {
      return new Promise(function (n, r) {
        var i = N(t);
        if (!i) {
          var o = {};
          t.audio && (a.microphone ? a.microphone === u.getDefaultDevices()[e.MEDIA_DEVICE.microphone].id ? o.audio = !0 : o.audio = { deviceId: { exact: a.microphone } } : s.warn("ignoring audio modality due to missing microphone selection")), t.video && (a.camera ? a.camera === u.getDefaultDevices()[e.MEDIA_DEVICE.camera].id ? o.video = !0 : o.video = { deviceId: { exact: a.camera } } : s.warn("ignoring video modality due to missing camera selection")), !o.audio && !o.video && r(new Error("requesting nothing")), i = x(!!o.audio, !!o.video, a.microphone, a.camera, m(o));
        }
        i.then(n, r);
      });
    }
    function k(e) {
      return h = e, f.reduce(function (t, n) {
        return t.then(function () {
          return n.getPromise().then(function (t) {
            t.setMute(!e), t.dispose();
          });
        });
      }, Promise.resolve());
    }
    function L() {
      return k(!1);
    }
    function A() {
      return k(!0);
    }
    this.enumerateDevicesAsync = y, this.selectDevices = b, this.getSelectedDevices = w, this.muteInputAsync = L, this.unmuteInputAsync = A, this.createPreviewRenderer = E, this.getMediaStreamRefAsync = S;
    var i = this, s = n.logger, o = {}, u = t.build({
        logger: s,
        settings: n.settings
      });
    u.onDevicesChanged = function (e) {
      o = e, f.forEach(function (t) {
        t.outdateIfAnyDeviceRemoved(e);
      }), r.onDevicesChanged && r.onDevicesChanged(e);
    };
    var a = {
        microphone: u.getDefaultDevices()[e.MEDIA_DEVICE.microphone].id,
        camera: u.getDefaultDevices()[e.MEDIA_DEVICE.camera].id
      }, f = [], l = 0, c = [], h, d = function (e, t) {
        function f(t) {
          o && (t || e.removeChild(n), window.detachMediaStream(n)), t && (n.hidden = t.getVideoTracks().length === 0, window.attachMediaStream(n, t), o || e.appendChild(n)), o = t;
        }
        var n = document.createElement("video"), r = 0, i = 0, o = null, u = function () {
            if (t && t.onVideoSizeChanged) {
              var e = n.videoWidth, s = n.videoHeight;
              if (e < 32 || s < 32)
                e = s = 0;
              if (r !== e || i !== s)
                r = e, i = s, t.onVideoSizeChanged(e, s);
            }
          }, a = function () {
            s.error("_video.onerror", "error:", n.error);
          };
        n.autoplay = !0, n.muted = !0, n.addEventListener("loadedmetadata", u), n.addEventListener("timeupdate", u), n.addEventListener("error", a), this.getVideoElement = function () {
          return n;
        }, this.dispose = function () {
          n.removeEventListener("loadedmetadata", u), n.removeEventListener("timeupdate", u), n.removeEventListener("error", a), f(null), n = null;
        }, this._attachMediaStream = f;
      };
    this.Renderer = d;
    var v = function (e, t) {
      d.call(this, e, t);
      var n = this, r = this.dispose, i = null, s = !1;
      this._attachMediaStreamRef = function (e) {
        try {
          i && (i.dispose(), i = null), this._attachMediaStream(e.getObject()), i = e;
        } catch (t) {
          throw e.dispose(), t;
        }
      }, this.dispose = function () {
        s = !0;
        var e = c.indexOf(n);
        e !== -1 && c.splice(e, 1), r(), i && (i.dispose(), i = null);
      }, this.startVideoAsync = function () {
        return C({
          audio: !0,
          video: !0
        }).then(function (e) {
          if (s)
            throw e.dispose(), new Error("disposed");
          n._attachMediaStreamRef(e), c.push(n);
        });
      };
    };
  };
  return n;
})
