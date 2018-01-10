(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-chat-service/lib/utils/lockAndKey", [
      "require",
      "exports"
    ], e);
}(function (e, t) {
  var n = "msmsgs@msnmsgr.com", r = "Q1P7W2E4J9R8U3S5", i = function () {
      function e(e) {
        this.auth = e;
      }
      return e.prototype.generate = function () {
        var e = this.getTimeInSeconds(), t = this.getMacHash(e);
        return this.buildLockAndKey(e, t);
      }, e.prototype.getTimeInSeconds = function () {
        var e = window.chatServerTime || new Date().getTime();
        return Math.round(e / 1000).toString();
      }, e.prototype.getMacHash = function (e) {
        return this.auth.getMacHash(e, n, r);
      }, e.prototype.buildLockAndKey = function (e, t) {
        return "appId=" + n + "; time=" + e + "; lockAndKeyResponse=" + t;
      }, e;
    }();
  t.__esModule = !0;
  t["default"] = i;
}));
