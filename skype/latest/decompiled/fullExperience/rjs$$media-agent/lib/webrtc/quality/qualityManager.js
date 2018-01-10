(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("media-agent/lib/webrtc/quality/qualityManager", [
      "require",
      "exports",
      "./resolutionManager"
    ], e);
}(function (e, t) {
  var n = e("./resolutionManager"), r = function () {
      function e(e, t, r) {
        var i = this;
        this.logger = e.logger.createChild("qm");
        this.listener = t;
        this.settings = e.settings;
        this.optimalReceiversCount = this.settings.videoReceiversCount;
        this.settings.multiParty && (r.onStatisticsChanged(function (e) {
          i.processEstimatedBandwidth(e.estimatedReceiveBandwidth);
        }), this.notifyOptimalReceiversCountChanged());
        this.resolutionManager = new n["default"](e, t, r);
      }
      return e.prototype.setCurrentResolution = function (e) {
        this.resolutionManager.setCurrentResolution(e);
      }, e.prototype.setMaxResolution = function (e) {
        this.resolutionManager.setMaxResolution(e);
      }, e.prototype.getCurrentResolution = function () {
        return this.resolutionManager.getCurrentResolution();
      }, e.prototype.getActive = function () {
        return this.resolutionManager.getActive();
      }, e.prototype.processOptimalReceiversCount = function () {
        var e = Math.floor(Math.abs(this.bandwidth / this.settings.bandwidthPerVideoReceiver));
        this.optimalReceiversCount !== Math.max(e, 1) && (e ? this.logger.log("optimal video receivers count changed to", e) : (this.logger.warn("there is not enough bandwidth even for a single video receiver"), e = 1), this.optimalReceiversCount = e, this.notifyOptimalReceiversCountChanged());
      }, e.prototype.notifyOptimalReceiversCountChanged = function () {
        this.listener.onOptimalVideoReceiversCountChanged(this.optimalReceiversCount);
      }, e.prototype.processEstimatedBandwidth = function (e) {
        this.bandwidth = e;
        this.processOptimalReceiversCount();
      }, e;
    }();
  t.__esModule = !0;
  t["default"] = r;
}));
