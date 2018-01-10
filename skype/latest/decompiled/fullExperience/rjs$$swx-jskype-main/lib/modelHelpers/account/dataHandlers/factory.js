(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/modelHelpers/account/dataHandlers/factory", [
      "require",
      "exports",
      "./account"
    ], e);
}(function (e, t) {
  function r() {
    return n.build();
  }
  var n = e("./account");
  t.getAccountChangedHandler = r;
}));
