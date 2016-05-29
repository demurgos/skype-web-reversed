(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("global-portable/lib/global", [
      "require",
      "exports"
    ], e);
}(function (e, t) {
  var n = "undefined", r = typeof window !== n ? window : typeof global !== n ? global : Object.create(null);
  t.__esModule = !0;
  t["default"] = r;
}));
