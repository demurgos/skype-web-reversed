(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("media-agent/lib/common/render/videoRenderer", [
      "require",
      "exports",
      "../../detect",
      "../userAgentAdapter"
    ], e);
}(function (e, t) {
  var n = e("../../detect"), r = e("../userAgentAdapter"), i = function () {
      function e(e) {
        var t = this;
        this.window = r["default"].window;
        this.lastNotifiedVideoWidth = 0;
        this.lastNotifiedVideoHeight = 0;
        this.onVideoDataUpdated = function () {
          if (t.sizeChangedListener) {
            var e = t.video.videoWidth, n = t.video.videoHeight;
            if (e < 32 || n < 32)
              e = n = 0;
            if (t.lastNotifiedVideoWidth !== e || t.lastNotifiedVideoHeight !== n)
              t.lastNotifiedVideoWidth = e, t.lastNotifiedVideoHeight = n, t.sizeChangedListener(e, n);
          }
        };
        this.onVideoError = function () {
          t.errorListener && t.errorListener(t.video.error || "no video");
        };
        this.onVideoPaused = function () {
          n["default"].isEdge() && (t.window.attachMediaStream(t.video, null), t.window.attachMediaStream(t.video, t.stream));
          t.video.play();
        };
        this.onContextMenu = function (e) {
          e.preventDefault();
        };
        this.container = e;
        this.video = this.window.document.createElement("video");
        this.initialize();
      }
      return e.prototype.onSizeChanged = function (e) {
        this.sizeChangedListener = e;
      }, e.prototype.onError = function (e) {
        this.errorListener = e;
      }, e.prototype.getVideoElement = function () {
        return this.video;
      }, e.prototype.dispose = function () {
        this.detachEventListeners();
        this.video = null;
        this.stream = null;
      }, e.prototype.reattachEventListeners = function () {
        this.detachEventListeners();
        this.attachEventListeners();
      }, e.prototype.attachMediaStream = function (e) {
        if (this.stream === e)
          return;
        this.stream && (e || this.container.removeChild(this.video), this.window.detachMediaStream(this.video));
        e && (this.video.hidden = e.getVideoTracks().length === 0, this.window.attachMediaStream(this.video, e), this.stream || this.container.appendChild(this.video));
        this.stream = e;
      }, e.prototype.getMediaStream = function () {
        return this.stream;
      }, e.prototype.initialize = function () {
        this.video.autoplay = !0;
        this.video.muted = !0;
        this.attachEventListeners();
      }, e.prototype.attachEventListeners = function () {
        this.video.addEventListener("loadedmetadata", this.onVideoDataUpdated);
        this.video.addEventListener("timeupdate", this.onVideoDataUpdated);
        this.video.addEventListener("error", this.onVideoError);
        this.video.addEventListener("pause", this.onVideoPaused);
        this.video.addEventListener("contextmenu", this.onContextMenu);
      }, e.prototype.detachEventListeners = function () {
        this.video.removeEventListener("loadedmetadata", this.onVideoDataUpdated);
        this.video.removeEventListener("timeupdate", this.onVideoDataUpdated);
        this.video.removeEventListener("error", this.onVideoError);
        this.video.removeEventListener("pause", this.onVideoPaused);
        this.video.removeEventListener("contextmenu", this.onContextMenu);
        this.attachMediaStream(null);
      }, e;
    }();
  t.__esModule = !0;
  t["default"] = i;
}));
