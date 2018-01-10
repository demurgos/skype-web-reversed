(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("media-agent/lib/mediaAgent", [
      "require",
      "exports",
      "./common/session",
      "./device/deviceManager",
      "./ortc/ortcSession",
      "./webrtc/webRtcSession",
      "./common/utils",
      "./common/capabilities",
      "./constants",
      "./helper"
    ], e);
}(function (e, t) {
  var n = e("./common/session"), r = e("./device/deviceManager"), i = e("./ortc/ortcSession"), s = e("./webrtc/webRtcSession"), o = e("./common/utils"), u = e("./common/capabilities"), a = e("./constants"), f = e("./helper"), l = function (e, t) {
      function p() {
        return l;
      }
      var a = e.getLogger().createChild("MA", undefined, e.settings.debug), f = a.createChild("DeviceManager"), l = new r["default"]({
          logger: f,
          settings: e.settings
        }, t), c = [], h = u["default"].build({ settings: e.settings });
      l._deviceSelectionChanged = function () {
        c.forEach(function (e) {
          e._deviceSelectionChanged();
        });
      };
      this.createSession = function (t, r, u) {
        var f = a.createChild("Session", r), l = {
            getDeviceManager: p,
            getLogger: function () {
              return f;
            },
            maContext: e,
            config: u ? u : {}
          }, h = typeof RTCIceGatherer == "undefined" ? s["default"] : i["default"], d = h.build(l, r, t), v = new n["default"](d, l, r, t);
        return v._onTerminated = function (e) {
          o["default"].remove(c, function (t) {
            return t === e;
          });
        }, c.push(v), v;
      };
      this.getDeviceManager = p;
      this.getCapabilities = function () {
        return h;
      };
      this.getScreenSharingManager = function () {
        return {
          onScreensChanged: function () {
            return {
              dispose: function () {
              }
            };
          },
          enumerateScreensAsync: function () {
            return Promise.resolve([]);
          },
          enumerateApplicationsAsync: function () {
            return Promise.resolve([]);
          }
        };
      };
    };
  t.__esModule = !0;
  t["default"] = {
    build: function (e, t) {
      return new l(e, t);
    },
    isPlatformSupported: function () {
      return navigator.getUserMedia && (typeof RTCPeerConnection != "undefined" || typeof RTCIceGatherer != "undefined");
    },
    constants: a["default"],
    helper: f["default"]
  };
}));
