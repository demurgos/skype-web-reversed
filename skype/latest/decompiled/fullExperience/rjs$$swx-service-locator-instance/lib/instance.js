(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-service-locator-instance/lib/instance", [
      "require",
      "exports",
      "swx-service-locator"
    ], e);
}(function (e, t) {
  var n = e("swx-service-locator");
  t.__esModule = !0;
  t["default"] = n.ServiceLocator.build();
}));
