function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-encoder/lib/index", [
      "require",
      "exports",
      "./countryCodes",
      "./encoder"
    ], e);
}(function (e, t) {
  var n = e("./countryCodes");
  t.CountryCodes = n.CountryCodes;
  var r = e("./encoder");
  t.build = r.build;
})
