(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("media-agent/lib/device/mediaStream", [
      "require",
      "exports",
      "../constants",
      "../helper",
      "../common/resolutionTable",
      "../common/utils",
      "../common/userAgentAdapter"
    ], e);
}(function (e, t) {
  function u(e) {
    function o() {
      r && r.getTracks().forEach(function (e) {
        typeof e.enabled != "undefined" && (e.enabled = (e.kind !== "audio" || !s) && !i);
      });
    }
    var t = this, n, r = null, i = !1, s = e.isMuted();
    this.onApplyConstraints = null;
    this._updateStream = function (e) {
      e && (r = e.clone(), n = e.id, o());
    };
    this._updateStream(e.getObject());
    this._stop = function () {
      r && (r.getTracks().forEach(function (e) {
        e.stop();
      }), r = null);
    };
    this.dispose = function () {
      return this._stop(), e.dispose(this);
    };
    this.clone = function () {
      return e.getClient();
    };
    this.getObject = function () {
      return r;
    };
    this.applyConstraints = function (t) {
      return e.applyConstraints(t);
    };
    this.setMute = function (t) {
      s = t || e.isMuted();
      o();
    };
    this.setHold = function (e) {
      i = e;
      o();
    };
    this.start = function () {
      return e.start();
    };
    this.hasAudio = function () {
      return e.hasAudio();
    };
    this.hasVideo = function () {
      return e.hasVideo();
    };
    this.getConstraints = function () {
      return e.getConstraints();
    };
    this.getOriginalId = function () {
      return n;
    };
    this.isSameStream = function (e) {
      return t.getOriginalId() === e.getOriginalId();
    };
  }
  function a(e, t) {
    function b() {
      return new Promise(function (e) {
        l.log("applying stream constraints:", JSON.stringify(y));
        var t = r["default"].defer();
        c.forEach(function (e) {
          e.onApplyConstraints && e.onApplyConstraints(t.promise);
        });
        e(N(function () {
          k();
          var e = L();
          return p = S(e[0]()), e.slice(1).forEach(function (e) {
            p = p["catch"](function (t) {
              if (n["default"].MEDIA_ERROR.constraintNotSatisfiedError === t.type)
                return l.warn("could not obtain constrained media stream, will attempt weaker policy"), S(e());
              throw t;
            });
          }), p;
        }).then(t.resolve)["catch"](function (e) {
          throw l.error("failed to apply constraints:", JSON.stringify(y), "error:", e), t.reject(e), e;
        }));
      });
    }
    function w() {
      h && h.getTracks().forEach(function (e) {
        typeof e.enabled != "undefined" && (e.enabled = (e.kind !== "audio" || !d) && !v, l.log("control media stream track", "kind:", e.kind, "enabled:", e.enabled, "muted:", e.muted));
      });
    }
    function E(e) {
      return l.log("queueing media stream update to:", JSON.stringify(e)), N(function () {
        return S(e);
      });
    }
    function S(e) {
      var t = s["default"].deepClone(e);
      return new Promise(function (e, n) {
        t.video && !t.audio && !g.gumRequestDoneOnce && (t.audio = !0, g.gumRequestDoneOnce = !0);
        l.log("querying user media for stream:", JSON.stringify(t));
        f.navigator.getUserMedia(t, e, n);
      })["catch"](function (e) {
        throw "SourceUnavailableError" === e.name ? e = {
          type: n["default"].MEDIA_ERROR.sourceUnavailableError,
          detail: "media device is already used by another process: " + e.toString()
        } : "ConstraintNotSatisfiedError" === e.name ? e = {
          type: n["default"].MEDIA_ERROR.constraintNotSatisfiedError,
          detail: "could not obtain constrained media stream: " + e.toString()
        } : e = {
          type: n["default"].MEDIA_ERROR.permissionDeniedError,
          detail: "permission to use media device was denied: " + e.toString()
        }, e;
      }).then(function (t) {
        !e.audio && t.getAudioTracks().length > 0 && (t.getAudioTracks()[0].stop(), t = new f.MediaStream(t.getVideoTracks()));
        x(e);
        h = t;
        c.forEach(function (e) {
          e._updateStream(t);
        });
        w();
        l.log("media stream updated");
      });
    }
    function x(e) {
      e.video && e.video.mandatory && (y.minWidth = e.video.mandatory.minWidth, y.minHeight = e.video.mandatory.minHeight);
    }
    function T(e, t, n) {
      return t <= e && e <= n;
    }
    function N(e) {
      g.gumSerializer = g.gumSerializer || Promise.resolve();
      var t = g.gumSerializer.then(e);
      return g.gumSerializer = t["catch"](function (e) {
        l.warn("previous gum operation failed:", e);
      }), t;
    }
    function C() {
      return p ? (l.log("queueing media stream stop"), N(k)) : Promise.resolve();
    }
    function k() {
      if (h) {
        c.forEach(function (e) {
          e._stop();
        });
        try {
          h.getTracks().forEach(function (e) {
            e.stop();
          });
          h = null;
          l.log("media stream stopped");
        } catch (e) {
          l.warn("failed to stop media stream:", e);
        }
      }
    }
    function L() {
      var e = m.getResolutions().filter(function (e) {
        return e.width <= y.maxWidth && e.height <= y.maxHeight;
      }).reverse().map(function (e) {
        return function () {
          return A({
            maxWidth: y.maxWidth,
            minWidth: e.width,
            maxHeight: y.maxHeight,
            minHeight: e.height,
            maxFrameRate: y.fps
          });
        };
      });
      return e.push(function () {
        return delete t.video.mandatory, t;
      }), e;
    }
    function A(e) {
      return e && l.log("Setting mandatory constraints", JSON.stringify(e)), y.maxWidth && y.maxHeight && y.fps ? (typeof t.video != "object" && (t.video = {}), t.video.mandatory = e) : delete t.video.mandatory, t;
    }
    var a = this, f = o["default"].window, l = e.logger.createChild("MediaStream"), c = [], h, p, d = !1, v = !1, m = new i["default"](), g, y = {};
    this.asGumOperation = N;
    this.getObject = function () {
      return h;
    };
    this.applyConstraints = function (e) {
      if (h && e.maxFS && e.maxFPS) {
        var t = m.getResolution(e.maxFS);
        if (!T(t.width, y.minWidth, y.maxWidth) || !T(t.height, y.minHeight, y.maxHeight) || y.fps !== e.maxFPS)
          return y.maxWidth = t.width, y.minWidth = t.width, y.maxHeight = t.height, y.minHeight = t.height, y.fps = e.maxFPS, b().then(function () {
            return !0;
          });
      }
      return Promise.resolve(!1);
    };
    this.getClient = function () {
      var e = new u(this);
      return c.push(e), e;
    };
    this.setMute = function (e) {
      d = e;
      c.forEach(function (t) {
        t.setMute(e);
      });
      w();
    };
    this.isMuted = function () {
      return d;
    };
    this.setHold = function (e) {
      v = e;
      c.forEach(function (t) {
        t.setHold(e);
      });
      w();
    };
    this.dispose = function (e) {
      if (c.indexOf(e) >= 0) {
        s["default"].remove(c, function (t) {
          return t === e;
        });
        if (c.length === 0)
          return a.onDisposed && a.onDisposed(), C();
      }
      return Promise.resolve();
    };
    this.start = function () {
      return p || (p = E(t)), p;
    };
    this.hasAudio = function () {
      return !!h && h.getAudioTracks().length !== 0;
    };
    this.hasVideo = function () {
      return !!h && h.getVideoTracks().length !== 0;
    };
    this.getConstraints = function () {
      return t;
    };
    (function () {
      g = e.global.mediaStream = e.global.mediaStream || {};
    }());
  }
  var n = e("../constants"), r = e("../helper"), i = e("../common/resolutionTable"), s = e("../common/utils"), o = e("../common/userAgentAdapter");
  t.__esModule = !0;
  t["default"] = {
    build: function (e, t) {
      return new a(e, t);
    }
  };
}));
