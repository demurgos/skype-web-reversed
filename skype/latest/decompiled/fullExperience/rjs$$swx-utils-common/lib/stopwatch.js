(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-utils-common/lib/stopwatch", [
      "require",
      "exports"
    ], e);
}(function (e, t) {
  function r() {
    return new n();
  }
  var n = function () {
    function e() {
      this.msElapsed = 0;
      this.isPaused = !1;
      this.startTime = new Date().getTime();
    }
    return e.prototype.pause = function () {
      this.isPaused || (this.msElapsed += new Date().getTime() - this.startTime, this.isPaused = !0);
    }, e.prototype.resume = function () {
      this.isPaused && (this.isPaused = !1, this.startTime = new Date().getTime());
    }, e.prototype.duration = function () {
      return this.isPaused ? this.msElapsed : this.msElapsed + new Date().getTime() - this.startTime;
    }, e.prototype.durationInMinutes = function () {
      var e = this.duration() / 60000;
      return Math.ceil(e);
    }, e.prototype.durationInSeconds = function () {
      var e = this.duration() / 1000;
      return Math.ceil(e);
    }, e;
  }();
  t.Stopwatch = n;
  t.build = r;
}));
