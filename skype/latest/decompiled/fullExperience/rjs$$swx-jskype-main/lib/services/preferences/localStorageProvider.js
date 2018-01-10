(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/preferences/localStorageProvider", [
      "require",
      "exports",
      "../../../lib/services/cache/instance"
    ], e);
}(function (e, t) {
  function i(e) {
    return new r(e);
  }
  var n = e("../../../lib/services/cache/instance"), r = function () {
      function e(e) {
        this.keyName = e;
      }
      return e.prototype.read = function () {
        return n.get().getSensitiveItem(this.keyName);
      }, e.prototype.update = function (e) {
        return n.get().setSensitiveItem(this.keyName, e, 0);
      }, e;
    }();
  t.LocalStorageProvider = r;
  t.build = i;
}));
