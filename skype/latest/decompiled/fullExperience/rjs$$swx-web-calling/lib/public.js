(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-web-calling/lib/public", [
      "require",
      "exports",
      "./callHandler",
      "./callHandlerProxy"
    ], e);
}(function (e, t) {
  function i(e, t) {
    var i = new n["default"](e, t);
    return new r["default"](i);
  }
  var n = e("./callHandler"), r = e("./callHandlerProxy");
  t.buildCallHandler = i;
}));
