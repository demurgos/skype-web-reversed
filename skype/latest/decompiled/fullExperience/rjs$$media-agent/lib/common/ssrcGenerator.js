(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("media-agent/lib/common/ssrcGenerator", [
      "require",
      "exports"
    ], e);
}(function (e, t) {
  var n = 4294967040, r = function () {
      function e() {
        this.ssrc = Math.floor(Math.random() * (n - 1)) + 1;
      }
      return e.prototype.nextAudioStreamSsrc = function () {
        return this.nextSsrc(0);
      }, e.prototype.nextVideoStreamSsrc = function () {
        return this.nextSsrc(99);
      }, e.prototype.nextSsrc = function (e) {
        var t;
        do
          t = this.ssrc, this.ssrc = (this.ssrc + e + 1) % n, this.ssrc === 0 && (this.ssrc = 1);
        while (t + e > n);
        return {
          min: t,
          max: t + e
        };
      }, e;
    }();
  t.__esModule = !0;
  t["default"] = r;
}));
