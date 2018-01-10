(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-utils-common/lib/async", [
      "require",
      "exports",
      "swx-browser-globals"
    ], e);
}(function (e, t) {
  function r(e, t, r) {
    var i = t ? e.bind(t) : e;
    return r ? Promise.resolve().then(i) : n.getWindow().setTimeout(i, 0);
  }
  var n = e("swx-browser-globals");
  t.execute = r;
}));
