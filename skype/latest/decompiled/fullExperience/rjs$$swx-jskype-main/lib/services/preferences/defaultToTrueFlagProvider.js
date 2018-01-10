(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/preferences/defaultToTrueFlagProvider", [
      "require",
      "exports",
      "../../../lib/services/preferences/flagsServiceProvider"
    ], e);
}(function (e, t) {
  function i(e) {
    return new r(e);
  }
  var n = e("../../../lib/services/preferences/flagsServiceProvider"), r = function (e) {
      function t(t) {
        return e.call(this, t) || this;
      }
      return __extends(t, e), t.prototype.read = function () {
        return e.prototype.read.call(this).then(function (e) {
          return !e;
        });
      }, t.prototype.update = function (t) {
        return e.prototype.update.call(this, !t);
      }, t;
    }(n.FlagsServiceProvider);
  t.DefaultToTrueFlagProvider = r;
  t.build = i;
}));
