(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/plugin/pluginDominantSpeaker", [
      "require",
      "exports",
      "lodash-compat"
    ], e);
}(function (e, t) {
  var n = e("lodash-compat"), r = function () {
      function e(e) {
        this.id = e;
        this.startTimestamp = 0;
        this.totalTime = 0;
      }
      return e;
    }(), i = function () {
      function e(e, t) {
        this.sources = [];
        this.timeToPromote = e && e.timeToPromote;
        this.callback = t;
      }
      return e.prototype.setSources = function (e, t) {
        var n = this;
        this.conversation = t;
        var r = e && e.audio.isSpeaking() ? [e] : [], i = r.map(this.getOrCreateSource.bind(this)), s = this.excludeSources(this.sources, i);
        i.filter(function (e) {
          return !n.isAlreadyActive(e);
        }).forEach(this.updateSourceTimestamp);
        s.forEach(function (e) {
          n.updateTotalTime(e);
          n.resetStartTimestamp(e);
        });
        this.ping || (this.ping = this.setupTimer());
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
        r.length && !n.isEqual(this.candidates, r) && (this.candidates = r, this.callback && this.callback(r[0], this.conversation));
        this.sources.map(this.resetTotalTime).filter(this.isAlreadyActive).forEach(this.updateSourceTimestamp);
      }, e.prototype.isAlreadyActive = function (e) {
        return !!e.startTimestamp;
      }, e.prototype.setupTimer = function () {
        return setInterval(this.trigger.bind(this), this.timeToPromote);
      }, e.prototype.clearTimer = function () {
        this.ping && (clearInterval(this.ping), this.ping = null);
      }, e.prototype.getOrCreateSource = function (e) {
        if (!this.isExist(e)) {
          var t = new r(e);
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
        return n.find(this.sources, function (t) {
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
  t.DominantSpeakerManager = i;
}));
