(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("signaling-agent/lib/utilities/urlBuilder", [
      "require",
      "exports",
      "./utils",
      "./constants"
    ], e);
}(function (e, t) {
  function i(e, t) {
    return n.assertNotNullOrEmpty(t, "trailingPath cannot be null"), n.assertNotNull(e, "signalingSession cannot be null"), n.assertNotNullOrEmpty(e.currentTrouterUrl, "trouterUrl cannot be null"), e.currentTrouterUrl + r["default"].URL_BASE.CALLAGENT + "/" + e.urlIdentifier + t;
  }
  var n = e("./utils"), r = e("./constants");
  t.get = i;
}));
