(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/entitlement/main", [
      "require",
      "exports",
      "../entitlement/facade"
    ], e);
}(function (e, t) {
  function i(e, t) {
    return r || (r = new n["default"](e, t)), r;
  }
  var n = e("../entitlement/facade"), r;
  t.getInstance = i;
}));
