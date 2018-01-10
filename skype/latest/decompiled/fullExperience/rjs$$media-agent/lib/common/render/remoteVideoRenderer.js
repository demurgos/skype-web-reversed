(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("media-agent/lib/common/render/remoteVideoRenderer", [
      "require",
      "exports",
      "../../constants",
      "./videoRenderer",
      "./videoSizeTracker"
    ], e);
}(function (e, t) {
  var n = e("../../constants"), r = e("./videoRenderer"), i = e("./videoSizeTracker"), s = function (e) {
      function t(t, n, r, i) {
        var s = e.call(this, n) || this;
        return s.disposed = !1, s.settings = t.settings, s.logger = t.logger, s.subscriptionManager = t.subscriptionManager, s.rendererSizeChangedListener = i, s.onSizeChanged(r ? r.onVideoSizeChanged : null), s.onError(r ? r.onError : null), s;
      }
      return __extends(t, e), t.prototype.trackElementSizeChange = function () {
        var e = this, t = this.rendererType === n["default"].RENDERER_TYPE.sharing, r = t ? this.settings.webrtcScreensharingCapabilityCheckIntervalMin : this.settings.webrtcVideoCapabilityCheckIntervalMin, s = t ? this.settings.webrtcScreensharingCapabilityCheckIntervalMax : this.settings.webrtcVideoCapabilityCheckIntervalMax;
        if (!r || !s) {
          this.logger.info("skipping video size tracking");
          return;
        }
        this.sizeTracker = new i["default"](this.getVideoElement(), {
          interval: {
            min: r,
            max: s
          }
        });
        this.sizeTracker.onSizeChange(function (t, n) {
          e.logger.log("video renderer size changed to", t + "x" + n);
          e.rendererSizeChangedListener(e, t, n);
        });
      }, t.prototype.unsubscribe = function () {
        this.subscription && (this.subscription.dispose(), this.subscription = null);
      }, t.prototype.subscribeVideoAsync = function (e, t) {
        var r = this;
        return new Promise(function (i, s) {
          r.rendererType = t ? n["default"].RENDERER_TYPE.sharing : n["default"].RENDERER_TYPE.video;
          r.trackElementSizeChange();
          r.unsubscribe();
          var o = r.subscriptionManager.subscribe(r.rendererType, e);
          r.subscription = o;
          r.logger.info("subscribing renderer to type:", o.getModality(), ", msi:", o.getMsi());
          o.onMediaStreamChanged(function (e) {
            r.attachMediaStream(e);
            r.logger.info("subscribed renderer to type:", o.getModality(), ", msi:", o.getMsi(), ", on stream #", e ? e.id : "none");
            i();
          });
          o.onError(function (e) {
            r.logger.error("failed to subscribe renderer", e);
            s(e);
          });
        });
      }, t.prototype.dispose = function () {
        this.disposed ? this.logger.warn("renderer already disposed") : (this.disposed = !0, this.unsubscribe(), this.sizeTracker && this.sizeTracker.dispose(), e.prototype.dispose.call(this));
      }, t.prototype.getModality = function () {
        return this.rendererType;
      }, t;
    }(r["default"]);
  t.__esModule = !0;
  t["default"] = s;
}));
