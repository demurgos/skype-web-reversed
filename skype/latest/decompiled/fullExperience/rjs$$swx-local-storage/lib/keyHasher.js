(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-local-storage/lib/keyHasher", [
      "require",
      "exports",
      "./constants",
      "lodash-compat"
    ], e);
}(function (e, t) {
  function i(e, t) {
    return t.key === e;
  }
  function s(e, t) {
    return t.hash === e;
  }
  function u(e, t) {
    return new o(e, t);
  }
  var n = e("./constants"), r = e("lodash-compat"), o = function () {
      function e(e, t) {
        this.keysMap = {
          cursor: 0,
          map: []
        };
        this.options = {};
        r.merge(this.options, t);
        this.onHashMapChanged = e;
      }
      return e.prototype.fillMap = function (e) {
        !e || (this.keysMap = e);
      }, e.prototype.getHashByKey = function (e) {
        if (e === n.CACHE.INTERNAL_KEYS.KEYS_MAP)
          return e;
        var t = r.find(this.keysMap.map, i.bind(null, e));
        if (t && t.hash)
          return t.hash;
        var s = "key-" + this.keysMap.cursor;
        return this.options.debug && (s += "-" + e), this.keysMap.cursor++, this.keysMap.map.push({
          key: e,
          hash: s
        }), this.onHashMapChanged(n.CACHE.INTERNAL_KEYS.KEYS_MAP, this.keysMap), s;
      }, e.prototype.getKeyByHash = function (e) {
        var t = r.find(this.keysMap.map, s.bind(null, e));
        return t && t.key ? t.key : e;
      }, e.prototype.removeKeyFromMap = function (e) {
        var t = r.remove(this.keysMap.map, i.bind(null, e));
        t.length && this.onHashMapChanged(n.CACHE.INTERNAL_KEYS.KEYS_MAP, this.keysMap);
      }, e;
    }();
  t.build = u;
}));
