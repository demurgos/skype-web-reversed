define("utils/common/array", [
  "require",
  "exports",
  "module",
  "swx-utils-common"
], function (e, t) {
  function r(e, t) {
    var r = n.normalize(e.toLowerCase().trim()), i = n.normalize(t.toLowerCase().trim());
    return r < i ? -1 : r > i ? 1 : 0;
  }
  var n = e("swx-utils-common").stringUtils;
  t.sortByProperty = function (e, t) {
    function n(e, t) {
      return e[t];
    }
    return e.sort(function (e, i) {
      return r(n(e, t), n(i, t));
    });
  }, t.sortByObservableProperty = function (e, t) {
    function n(e, t) {
      return e[t]();
    }
    return e.sort(function (e, i) {
      return r(n(e, t), n(i, t));
    });
  }, t.insertAt = function (e, t, n) {
    e.splice(t, 0, n);
  }, t.swapItems = function (e, t, n) {
    var r = e[t];
    e[t] = e[n], e[n] = r;
  }, t.removeFrom = function (e, t) {
    return e.splice(t, 1)[0];
  };
})
