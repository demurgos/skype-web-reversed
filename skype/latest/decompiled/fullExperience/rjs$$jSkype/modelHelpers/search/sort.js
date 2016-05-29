define("jSkype/modelHelpers/search/sort", [
  "require",
  "exports",
  "module",
  "utils/common/array"
], function (e, t) {
  function r(e) {
    var t = {};
    return e.forEach(function (e) {
      t[e.rank] || (t[e.rank] = []);
      t[e.rank].push(e);
    }), t;
  }
  function i(e) {
    return Object.keys(e).forEach(function (t) {
      e[t] = n.sortByProperty(e[t], "sortString");
    }), e;
  }
  function s(e) {
    var t = [];
    return Object.keys(e).sort().forEach(function (n) {
      t = t.concat(e[n]);
    }), t;
  }
  var n = e("utils/common/array");
  t.run = function (e) {
    var t = r(e);
    return t = i(t), s(t);
  };
});
