function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-service-locator/lib/index", [
      "require",
      "exports",
      "./serviceLocator",
      "./serviceLocatorBuilder"
    ], e);
}(function (e, t) {
  var n = e("./serviceLocator");
  t.ServiceLocator = n;
  var r = e("./serviceLocatorBuilder");
  t.serviceLocatorBuilder = r.serviceLocatorBuilder;
})
