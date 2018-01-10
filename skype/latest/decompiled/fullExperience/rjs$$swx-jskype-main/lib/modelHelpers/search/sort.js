(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/modelHelpers/search/sort", [
      "require",
      "exports",
      "swx-utils-common"
    ], e);
}(function (e, t) {
  function r(e) {
    var t = i(e);
    return t = s(t), o(t);
  }
  function i(e) {
    var t = {};
    return e.forEach(function (e) {
      t[e.rank] || (t[e.rank] = []);
      t[e.rank].push(e);
    }), t;
  }
  function s(e) {
    return Object.keys(e).forEach(function (t) {
      e[t] = n.array.sortByProperty(e[t], "sortString");
    }), e;
  }
  function o(e) {
    var t = [];
    return Object.keys(e).sort().forEach(function (n) {
      t = t.concat(e[n]);
    }), t;
  }
  var n = e("swx-utils-common");
  t.run = r;
}));
