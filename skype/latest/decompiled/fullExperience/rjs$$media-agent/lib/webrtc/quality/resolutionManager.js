(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("media-agent/lib/webrtc/quality/resolutionManager", [
      "require",
      "exports"
    ], e);
}(function (e, t) {
  var n = 15000, r = 5000, i = function () {
      function e(e, t, i) {
        var s = this;
        this.resolutionApplier = t;
        this.lastSendBW = 0;
        this.coolingDown = !1;
        this.cooldownTimer = null;
        this.cooldownEnd = 0;
        this.active = !1;
        this.logger = e.logger.createChild("rm");
        this.resolutionTable = e.resolutionTable;
        if (!e.settings.multiParty) {
          this.logger.log("Resolution management disabled: no resolution management for 1x1 calls");
          return;
        }
        this.cooldownTimeout = e.settings.cooldownTimeout || n;
        this.retryDelay = e.settings.retryDelay || r;
        this.active = !0;
        i.onStatisticsChanged(function (e) {
          return s.onStatisticsChanged(e);
        });
      }
      return e.prototype.applyRes = function (e) {
        var t = this;
        this.pendingResolution = e;
        if (this.coolingDown && (!this.currentResolution || e.fs > this.currentResolution.fs))
          return;
        this.coolingDown = !0;
        this.logger.log("Changing resolution to " + e);
        this.resolutionApplier.applyResolution(e).then(function (n) {
          n && e == t.pendingResolution ? t.pendingResolution = null : n || (t.logger.log("Unable to apply resolution at the moment"), t.cooldown(r));
        })["catch"](function (e) {
          t.logger.error("Error while applying new resolution:", e);
          t.pendingResolution = null;
        });
      }, e.prototype.getActive = function () {
        return this.active;
      }, e.prototype.setMaxResolution = function (e) {
        if (e == this.maxResolution)
          return;
        this.logger.log("New max resolution: " + e);
        this.maxResolution = e;
        this.lastSendBW && this.processEstimatedBandwidth(this.lastSendBW);
      }, e.prototype.setCurrentResolution = function (e) {
        this.logger.log("New resolution: " + e);
        this.currentResolution = e;
        this.cooldown();
      }, e.prototype.getCurrentResolution = function () {
        return this.currentResolution;
      }, e.prototype.cooldown = function (e) {
        var t = this;
        e === void 0 && (e = n);
        if (this.coolingDown && this.cooldownEnd - Date.now() > n)
          return;
        this.cooldownTimer && clearTimeout(this.cooldownTimer);
        this.coolingDown = !0;
        this.cooldownEnd = Date.now() + n;
        this.cooldownTimer = setTimeout(function () {
          t.logger.debug("Resolution changer cooled down");
          t.coolingDown = !1;
          t.cooldownTimer = null;
          t.pendingResolution ? t.proposeResolution(t.pendingResolution) : t.processEstimatedBandwidth(t.lastSendBW);
        }, e);
      }, e.prototype.proposeResolution = function (e) {
        this.maxResolution && this.maxResolution.fs < e.fs && (e = this.maxResolution);
        if (this.currentResolution && e.fs == this.currentResolution.fs)
          return;
        this.applyRes(e);
      }, e.prototype.processEstimatedBandwidth = function (e) {
        var t = this.resolutionTable.getResolutionForBitrate(e), n = t.lowRes, r = t.highRes, i = e < this.lastSendBW ? n : r;
        i && this.proposeResolution(i);
        this.lastSendBW = e;
      }, e.prototype.onStatisticsChanged = function (e) {
        var t = e.estimatedSendBandwidth;
        if (t == this.lastSendBW)
          return;
        this.logger.debug("Send BW: " + t);
        this.processEstimatedBandwidth(t);
      }, e;
    }();
  t.__esModule = !0;
  t["default"] = i;
}));
