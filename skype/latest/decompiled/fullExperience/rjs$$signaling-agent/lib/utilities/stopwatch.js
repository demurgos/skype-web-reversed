(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("signaling-agent/lib/utilities/stopwatch", [
      "require",
      "exports"
    ], e);
}(function (e, t) {
  function r() {
    return new n();
  }
  var n = function () {
    function e() {
      var e = this;
      this.msElapsed = 0;
      this.isPaused = !1;
      this.startTime = new Date().getTime();
      this.pause = function () {
        e.isPaused || (e.msElapsed += new Date().getTime() - e.startTime, e.isPaused = !0);
      };
      this.resume = function () {
        e.isPaused && (e.isPaused = !1, e.startTime = new Date().getTime());
      };
      this.duration = function () {
        return e.isPaused ? e.msElapsed : e.msElapsed + new Date().getTime() - e.startTime;
      };
      this.durationInMinutes = function () {
        var t = e.duration() / 60000;
        return Math.ceil(t);
      };
      this.durationInSeconds = function () {
        var t = e.duration() / 1000;
        return Math.ceil(t);
      };
    }
    return e;
  }();
  t.Stopwatch = n;
  t.build = r;
}));
