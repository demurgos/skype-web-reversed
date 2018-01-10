(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("media-agent/lib/webrtc/statistics/statisticsGatherer", [
      "require",
      "exports",
      "../../common/userAgentAdapter",
      "../../common/utils"
    ], e);
}(function (e, t) {
  var n = e("../../common/userAgentAdapter"), r = e("../../common/utils"), i = function () {
      function e() {
      }
      return e;
    }();
  t.Statistics = i;
  var s = "bweforvideo", o = "googAvailableReceiveBandwidth", u = "googAvailableSendBandwidth", a = 1000, f = function () {
      function e() {
        this.window = n["default"].window;
        this.statisticsChangedListener = r["default"].noop;
        this.statistics = new i();
      }
      return e.prototype.onStatisticsChanged = function (e) {
        var t = this.statisticsChangedListener;
        this.statisticsChangedListener = function (n) {
          t(n);
          e(n);
        };
        this.startGathering();
      }, e.prototype.initialize = function (e) {
        this.pc = e;
        this.startGathering();
      }, e.prototype.dispose = function () {
        this.interval && (this.window.clearInterval(this.interval), this.interval = 0);
        this.pc = null;
      }, e.prototype.startGathering = function () {
        var e = this;
        this.isInitialized() && !this.interval && (this.interval = window.setInterval(function () {
          e.processStatistics();
        }, a));
      }, e.prototype.isInitialized = function () {
        return this.pc && this.pc.getStats;
      }, e.prototype.processStatistics = function () {
        var e = this;
        this.pc.getStats(function (t) {
          if (!t.result)
            return;
          e.processResult(t.result());
        });
      }, e.prototype.processResult = function (e) {
        var t = 0, n = 0, i = r["default"].find(e, function (e) {
            return e.id === s;
          });
        i && (t = i.stat(o), n = i.stat(u));
        var a = isNaN(t) ? 0 : t, f = isNaN(n) ? 0 : n, l = a !== this.statistics.estimatedReceiveBandwidth || f !== this.statistics.estimatedSendBandwidth;
        l && (this.statistics.estimatedReceiveBandwidth = a, this.statistics.estimatedSendBandwidth = f, this.notifyStatisticsChanged());
      }, e.prototype.notifyStatisticsChanged = function () {
        this.statisticsChangedListener(this.statistics);
      }, e;
    }();
  t.__esModule = !0;
  t["default"] = f;
}));
