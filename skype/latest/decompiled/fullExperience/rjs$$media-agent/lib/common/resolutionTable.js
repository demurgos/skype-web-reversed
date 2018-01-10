(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("media-agent/lib/common/resolutionTable", [
      "require",
      "exports"
    ], e);
}(function (e, t) {
  var n = 16, r = function () {
      function e(e, t, r, i) {
        r === void 0 && (r = 0);
        i === void 0 && (i = 0);
        this.width = e;
        this.height = t;
        this.minBitrate = r;
        this.maxBitrate = i;
        this.fs = Math.ceil(e / n) * Math.ceil(t / n);
      }
      return e.prototype.toString = function () {
        return this.height + "p";
      }, e;
    }();
  t.ResolutionInfo = r;
  var i = function () {
    function e() {
      this.resolutions = [
        new r(320, 180, 20000, 200000),
        new r(426, 240, 160000, 350000),
        new r(480, 270, 250000, 500000),
        new r(640, 360, 400000, 1000000),
        new r(852, 480, 800000, 1400000),
        new r(960, 540, 1200000, 1800000),
        new r(1280, 720, 1500000, 2000000),
        new r(1920, 1080, 1800000, 100000000),
        new r(2560, 1440),
        new r(3840, 2160)
      ];
    }
    return e.prototype.getResolution = function (e) {
      for (var t = this.resolutions.length - 1; t >= 0; t--)
        if (this.resolutions[t].fs <= e)
          return this.resolutions[t];
      return this.resolutions[0];
    }, e.prototype.getMaxFS = function (e, t) {
      var n = Math.max(e, t), r = Math.min(e, t);
      for (var i = 0, s = this.resolutions; i < s.length; i++) {
        var o = s[i];
        if (o.width >= n && o.height >= r)
          return o.fs;
      }
      return this.resolutions.slice(-1)[0].fs;
    }, e.prototype.getResolutionForBitrate = function (e) {
      var t = this.resolutions.filter(function (t) {
          return t.maxBitrate && t.maxBitrate >= e;
        }).shift(), n = this.resolutions.filter(function (t) {
          return t.minBitrate && t.minBitrate <= e;
        }).pop();
      return {
        lowRes: t,
        highRes: n
      };
    }, e.prototype.getResolutions = function () {
      return this.resolutions;
    }, e;
  }();
  t.__esModule = !0;
  t["default"] = i;
}));
