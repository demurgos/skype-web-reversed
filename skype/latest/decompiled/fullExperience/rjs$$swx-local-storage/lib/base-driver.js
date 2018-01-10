(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-local-storage/lib/base-driver", [
      "require",
      "exports",
      "./constants"
    ], e);
}(function (e, t) {
  var n = e("./constants");
  t.STORAGE_PREFIX_REGEX = new RegExp("^" + n.CACHE.PREFIX_KEYWORD + "\\|");
  var r = n.CACHE.PREFIX_KEYWORD + "|", i = function () {
      function e() {
      }
      return e.prototype.genKey = function (e) {
        return r + e;
      }, e;
    }();
  t.BaseDriver = i;
}));
