(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("media-agent/lib/ortc/ortcVideoRendererGroup", [
      "require",
      "exports",
      "../common/render/videoRenderer",
      "../common/utils",
      "../constants",
      "../helper",
      "../common/render/videoSizeTracker",
      "../common/userAgentAdapter"
    ], e);
}(function (e, t) {
  function f(e) {
    function p(e, u) {
      function S() {
        w || (t.log("starting video tag periodic refresh"), w = h.setInterval(function () {
          p.getVideoElement().play();
        }, a));
      }
      function x() {
        w && (t.log("stopping video tag periodic refresh"), h.clearInterval(w), w = null);
      }
      function T() {
        var e = p.getMediaStream();
        return e ? e.getVideoTracks()[0] : null;
      }
      function N() {
        g && (g.remove(p), g = void 0);
        y = void 0;
      }
      function C(e, t) {
        if (!k(e, t)) {
          var n = s["default"].defer(), i = [], o, u = !1, a = function () {
              u || (i = [], n.isPending() && n.reject(new Error("disposing renderer")), o && o.unsubscribe(), r["default"].remove(f, function (n) {
                return n.rendererType === e && n.msi === t;
              }), u = !0);
            }, l = function () {
              if (n.isPending()) {
                var r = L(e);
                r && (r.subscribe(t), o = r, n.resolve());
              }
              if (o) {
                var s = o.getRecvTrack();
                i.forEach(function (e) {
                  e.updateRecvTrack(t, s);
                });
              }
            };
          f.push({
            rendererType: e,
            msi: t,
            add: function (e, t) {
              n.promise.then(t.resolve, t.reject);
              i.push(e);
              l();
            },
            remove: function (e) {
              r["default"].remove(i, function (t) {
                return t === e;
              });
              i.length === 0 && a();
            },
            getChannel: function () {
              return o;
            },
            update: l,
            dispose: a
          });
        }
        g = k(e, t);
        g.add(p, m);
      }
      function k(e, t) {
        return r["default"].find(f, function (n) {
          return n.rendererType === e && n.msi === t;
        });
      }
      function L(e) {
        return r["default"].find(c, function (t) {
          return t.canSubscribe() && t.label === A(e);
        });
      }
      function A(e) {
        switch (e) {
        case i["default"].MODALITY.video:
          return i["default"].MEDIA_LABEL.video;
        case i["default"].MODALITY.sharing:
          return i["default"].MEDIA_LABEL.sharing;
        }
      }
      function O() {
        if (!l.ortcVideoCapabilityCheckIntervalMin || !l.ortcVideoCapabilityCheckIntervalMax) {
          t.info("skipping video size tracking");
          return;
        }
        if (b)
          return;
        b = new o["default"](p.getVideoElement(), {
          interval: {
            min: l.ortcVideoCapabilityCheckIntervalMin,
            max: l.ortcVideoCapabilityCheckIntervalMax
          }
        });
        b.onSizeChange(function (e, n) {
          t.info("video renderer size changed, updating capabilities");
          g.getChannel() && g.getChannel().videoSizeChanged(e, n);
        });
      }
      n["default"].call(this, e);
      var p = this, d = this.dispose.bind(this), v = !1, m = s["default"].defer(), g, y, b, w;
      this.onSizeChanged(function (e, t) {
        e && t && x();
        u && u.onVideoSizeChanged && u.onVideoSizeChanged(e, t);
      });
      this.onError(u ? u.onError : null);
      this.updateRecvTrack = function (e, n) {
        var r = T();
        if (n !== r) {
          var i = n ? new MediaStream([n]) : null;
          t.log("updating renderer media stream to", i);
          p.attachMediaStream(i);
          y !== e && (y = e, t.log("renderer subscribed msi updated to", e));
        }
      };
      var E = this.attachMediaStream.bind(this);
      this.attachMediaStream = function (e) {
        return l.ortcVideoRendererAggressiveStreamRefresh && (e ? S() : x()), E(e);
      };
      this.subscribeVideoAsync = function (e, n) {
        e = e || i["default"].MSI.subscribeAny;
        var r = n ? i["default"].RENDERER_TYPE.sharing : i["default"].RENDERER_TYPE.video;
        return t.info("subscribing renderer to type:", r, "msi:", e), new Promise(function (t) {
          if (!v) {
            var n = y !== e;
            n && N();
            m.isPending() && (m.resolve(), m = s["default"].defer());
            e === i["default"].MSI.unsubscribe || !n ? m.resolve() : (C(r, e), O());
          }
          t(m.promise);
        });
      };
      this.dispose = function () {
        t.debug("disposing remote renderer");
        b && (b.dispose(), b = null);
        x();
        N();
        m.isPending() && m.reject(new Error("disposing renderer"));
        v = !0;
        d();
      };
    }
    var t = e.logger.createChild("OrtcVideoRendererGroup"), f = [], l = e.settings, c = [], h = u["default"].window;
    this.create = function (e, t) {
      return new p(e, t);
    };
    this.update = function (e) {
      c = e;
      f.forEach(function (e) {
        e.update();
      });
    };
    this.terminate = function () {
      f.forEach(function (e) {
        e.dispose();
      });
    };
    p.prototype = Object.create(n["default"].prototype);
  }
  var n = e("../common/render/videoRenderer"), r = e("../common/utils"), i = e("../constants"), s = e("../helper"), o = e("../common/render/videoSizeTracker"), u = e("../common/userAgentAdapter"), a = 1000;
  t.__esModule = !0;
  t["default"] = {
    build: function (e) {
      return new f(e);
    }
  };
}));
