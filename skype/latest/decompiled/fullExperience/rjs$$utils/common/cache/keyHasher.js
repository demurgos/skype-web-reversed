define("utils/common/cache/keyHasher", [
  "require",
  "lodash-compat",
  "constants/common"
], function (e) {
  function r(e, r) {
    function s(e, t) {
      return t.key === e;
    }
    function o(e, t) {
      return t.hash === e;
    }
    var i = {
      cursor: 0,
      map: []
    };
    this.fillMap = function (e) {
      e !== null && (i = e);
    };
    this.getHashByKey = function (o) {
      if (o === n.INTERNAL_KEYS.KEYS_MAP)
        return o;
      var u = t.find(i.map, s.bind(null, o));
      return u && u.hash ? u.hash : (u = "key-" + i.cursor, r && (u += "-" + o), i.cursor++, i.map.push({
        key: o,
        hash: u
      }), e(n.INTERNAL_KEYS.KEYS_MAP, i), u);
    };
    this.getKeyByHash = function (e) {
      var n = t.find(i.map, o.bind(null, e));
      return n && n.key ? n.key : e;
    };
    this.removeKeyFromMap = function (r) {
      var o = t.remove(i.map, s.bind(null, r));
      o.length && e(n.INTERNAL_KEYS.KEYS_MAP, i);
    };
  }
  var t = e("lodash-compat"), n = e("constants/common").cache;
  return {
    build: function (e, t) {
      return new r(e, t);
    }
  };
});
