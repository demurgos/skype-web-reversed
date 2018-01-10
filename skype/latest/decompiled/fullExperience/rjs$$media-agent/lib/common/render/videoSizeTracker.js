(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("media-agent/lib/common/render/videoSizeTracker", [
      "require",
      "exports",
      "../userAgentAdapter"
    ], e);
}(function (e, t) {
  var n = e("../userAgentAdapter"), r = function () {
      function e(e, t) {
        this.window = n["default"].window;
        this.videoElement = e;
        this.config = t;
        this.originalVideoElementSize = {
          width: e.offsetWidth,
          height: e.offsetHeight
        };
      }
      return e.prototype.onSizeChange = function (e) {
        var t = this;
        if (this.elementSizeTrackingRef)
          return;
        var n = Math.floor(Math.random() * Math.abs(this.config.interval.max - this.config.interval.min)) + this.config.interval.min;
        this.elementSizeTrackingRef = this.window.setInterval(function () {
          t.videoElementSizeChanged() && (t.saveCurrentVideoElementSize(), e(t.videoElement.offsetWidth, t.videoElement.offsetHeight));
        }, n);
      }, e.prototype.dispose = function () {
        this.elementSizeTrackingRef && this.window.clearInterval(this.elementSizeTrackingRef);
      }, e.prototype.videoElementSizeChanged = function () {
        return this.originalVideoElementSize.width !== this.videoElement.offsetWidth || this.originalVideoElementSize.height !== this.videoElement.offsetHeight;
      }, e.prototype.saveCurrentVideoElementSize = function () {
        this.originalVideoElementSize.width = this.videoElement.offsetWidth;
        this.originalVideoElementSize.height = this.videoElement.offsetHeight;
      }, e;
    }();
  t.__esModule = !0;
  t["default"] = r;
}));
