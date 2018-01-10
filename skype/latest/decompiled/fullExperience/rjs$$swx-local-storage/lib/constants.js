(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-local-storage/lib/constants", [
      "require",
      "exports"
    ], e);
}(function (e, t) {
  var n;
  (function (e) {
    e.VERSION = "1.13";
    e.PREFIX_KEYWORD = "swx";
    var t;
    (function (e) {
      e.VERSION = "version";
      e.ENCRYPTION_KEY = "encryptionKey";
      e.KEYS_MAP = "keysMap";
    }(t = e.INTERNAL_KEYS || (e.INTERNAL_KEYS = {})));
    e.DEFAULT_BUFFER_TIMEOUT = 300;
  }(n = t.CACHE || (t.CACHE = {})));
  var r;
  (function (e) {
    e.DEACTIVATE_CACHE = "deactivateCache";
  }(r = t.featureFlags || (t.featureFlags = {})));
}));
