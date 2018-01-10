(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("media-agent/lib/common/videoCapabilities", [
      "require",
      "exports"
    ], e);
}(function (e, t) {
  var n = function () {
    function e(e, t) {
      this.maxFS = e;
      this.maxFPS = t;
    }
    return e.prototype.setMaxFS = function (e, t) {
      if (this.maxFS !== e) {
        this.maxFS = e;
        if (t)
          return t(this), !0;
      }
      return !1;
    }, e.prototype.getMaxFS = function () {
      return this.maxFS;
    }, e.prototype.getMaxFPS = function () {
      return this.maxFPS;
    }, e;
  }();
  t.__esModule = !0;
  t["default"] = n;
}));
