(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-utils-common/lib/array", [
      "require",
      "exports",
      "./stringUtils"
    ], e);
}(function (e, t) {
  function r(e, t) {
    function n(e, t) {
      return e[t];
    }
    return e.sort(function (e, r) {
      return a(n(e, t), n(r, t));
    });
  }
  function i(e, t) {
    function n(e, t) {
      return e[t]();
    }
    return e.sort(function (e, r) {
      return a(n(e, t), n(r, t));
    });
  }
  function s(e, t, n) {
    e.splice(t, 0, n);
  }
  function o(e, t, n) {
    var r = e[t];
    e[t] = e[n];
    e[n] = r;
  }
  function u(e, t) {
    return e.splice(t, 1)[0];
  }
  function a(e, t) {
    var r = n.normalize(e.toLowerCase().trim()), i = n.normalize(t.toLowerCase().trim());
    return r < i ? -1 : r > i ? 1 : 0;
  }
  var n = e("./stringUtils");
  t.sortByProperty = r;
  t.sortByObservableProperty = i;
  t.insertAt = s;
  t.swapItems = o;
  t.removeFrom = u;
}));
