(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("media-agent/lib/common/activeSpeaker/dshGeneratingStrategy", [
      "require",
      "exports",
      "../utils"
    ], e);
}(function (e, t) {
  var n = e("../utils"), r = 3000, i = function () {
      function e(e) {
        this.id = e;
        this.startTimestamp = 0;
        this.totalTime = 0;
      }
      return e;
    }(), s = function () {
      function e(e) {
        this.sources = [];
        this.timeToPromote = e && e.timeToPromote || r;
        this.ping = this.setupTimer();
      }
      return e.prototype.setSources = function (e) {
        var t = this;
        e = e || [];
        var n = e.map(this.getOrCreateSource.bind(this)), r = this.excludeSources(this.sources, n);
        n.filter(function (e) {
          return !t.isAlreadyActive(e);
        }).forEach(this.updateSourceTimestamp);
        r.forEach(function (e) {
          t.updateTotalTime(e);
          t.resetStartTimestamp(e);
        });
        this.ping || (this.ping = this.setupTimer());
      }, e.prototype.setOnDominantSpeakerChanged = function (e) {
        this.callback = e;
      }, e.prototype.dispose = function () {
        this.clearTimer();
        this.sources = null;
        this.callback = null;
      }, e.prototype.excludeSources = function (e, t) {
        return e.filter(function (e) {
          return !t.some(function (t) {
            return e.id === t.id;
          });
        });
      }, e.prototype.trigger = function () {
        var e = function (e, t) {
            return t.totalTime - e.totalTime;
          }, t = function (e) {
            return e.id;
          };
        if (!this.hasAnyoneSpoken()) {
          this.clearTimer();
          return;
        }
        var r = this.sources.map(this.updateTotalTime).sort(e).map(t);
        r.length && !n["default"].deepEqual(this.candidates, r) && (this.candidates = r, this.callback && this.callback(r));
        this.sources.map(this.resetTotalTime).filter(this.isAlreadyActive).forEach(this.updateSourceTimestamp);
      }, e.prototype.isAlreadyActive = function (e) {
        return !!e.startTimestamp;
      }, e.prototype.setupTimer = function () {
        return setInterval(this.trigger.bind(this), this.timeToPromote);
      }, e.prototype.clearTimer = function () {
        this.ping && (clearInterval(this.ping), this.ping = null);
      }, e.prototype.getOrCreateSource = function (e) {
        if (!this.isExist(e)) {
          var t = new i(e);
          return this.sources.push(t), t;
        }
        return this.sourceById(e);
      }, e.prototype.isExist = function (e) {
        return this.sources.some(function (t) {
          return e === t.id;
        });
      }, e.prototype.hasAnyoneSpoken = function () {
        return this.sources.some(function (e) {
          return e.startTimestamp !== 0 || e.totalTime !== 0;
        });
      }, e.prototype.sourceById = function (e) {
        return n["default"].find(this.sources, function (t) {
          return e === t.id;
        });
      }, e.prototype.updateSourceTimestamp = function (e) {
        e.startTimestamp = Date.now();
      }, e.prototype.updateTotalTime = function (e) {
        return e.startTimestamp && (e.totalTime += Date.now() - e.startTimestamp), e;
      }, e.prototype.resetStartTimestamp = function (e) {
        return e.startTimestamp = 0, e;
      }, e.prototype.resetTotalTime = function (e) {
        return e.totalTime = 0, e;
      }, e;
    }();
  t.DSHGeneratingStrategy = s;
}));
