(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-local-storage/lib/local-storage-driver", [
      "require",
      "exports",
      "swx-browser-globals",
      "./constants",
      "./base-driver"
    ], e);
}(function (e, t) {
  var n = e("swx-browser-globals"), r = e("./constants"), i = e("./base-driver"), s = function (e) {
      function t() {
        return e !== null && e.apply(this, arguments) || this;
      }
      return __extends(t, e), t.prototype.getItemFromStorage = function (e) {
        var t = this;
        return new Promise(function (r) {
          return r(n.getWindow().localStorage.getItem(t.genKey(e)));
        });
      }, t.prototype.getAllKeys = function () {
        return this.getAllKeysRaw().then(function (e) {
          return e.map(function (e) {
            return e.replace(i.STORAGE_PREFIX_REGEX, "");
          });
        });
      }, t.prototype.removeItemFromStorage = function (e) {
        var t = this;
        return new Promise(function (r) {
          var i = t.genKey(e);
          n.getWindow().localStorage[i] && n.getWindow().localStorage.removeItem(i);
          r();
        });
      }, t.prototype.invalidateCache = function (e) {
        return e === void 0 && (e = !1), this.getAllKeysRaw().then(function (t) {
          var i = t.length;
          for (var s = 0; s < i; s++) {
            var o = t[s];
            (e || o !== r.CACHE.INTERNAL_KEYS.VERSION) && n.getWindow().localStorage.removeItem(o);
          }
        });
      }, t.prototype.setItemInStorage = function (e, t) {
        var r = this;
        return new Promise(function (i) {
          var s = r.genKey(e);
          n.getWindow().localStorage.setItem(s, t);
          i();
        });
      }, t.prototype.getAllKeysRaw = function () {
        return new Promise(function (e) {
          return e(Object.keys(n.getWindow().localStorage).filter(function (e) {
            return i.STORAGE_PREFIX_REGEX.test(e);
          }));
        });
      }, t;
    }(i.BaseDriver);
  t.LocalStorageDriver = s;
}));
