(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-utils-common/lib/settablePromise", [
      "require",
      "exports"
    ], e);
}(function (e, t) {
  function n() {
    var e, t, n = new Promise(function (n, r) {
        e = n;
        t = r;
      });
    return n.resolve = e, n.reject = t, n;
  }
  t.build = n;
}));
