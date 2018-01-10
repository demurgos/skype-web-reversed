(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("media-agent/lib/common/activeSpeaker/activeSpeakerManager", [
      "require",
      "exports"
    ], e);
}(function (e, t) {
  var n = function () {
    function e(e, t) {
      this.onActiveSpeakersChanged = e;
      this.onDominantSpeakersChanged = t;
    }
    return e.prototype.setStrategy = function (e) {
      this.dshStrategy = e;
      this.dshStrategy && this.dshStrategy.setOnDominantSpeakerChanged(this.onDominantSpeakerHistoryChanged.bind(this));
    }, e.prototype.onContributingSourcesChanged = function (e) {
      this.onActiveSpeakersChanged(e);
      this.dshStrategy && this.dshStrategy.setSources(e);
    }, e.prototype.onDominantSpeakerHistoryChanged = function (e) {
      this.onDominantSpeakersChanged(e);
    }, e.prototype.dispose = function () {
      this.dshStrategy && (this.dshStrategy.dispose(), this.dshStrategy = null);
      this.onActiveSpeakersChanged = null;
      this.onDominantSpeakersChanged = null;
    }, e;
  }();
  t.ActiveSpeakerManager = n;
}));
