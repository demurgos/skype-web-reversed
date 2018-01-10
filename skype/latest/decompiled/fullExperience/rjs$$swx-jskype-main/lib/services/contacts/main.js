(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/contacts/main", [
      "require",
      "exports",
      "./facade"
    ], e);
}(function (e, t) {
  function i(e, t, i) {
    return r || (r = new n["default"](e, t, i)), r;
  }
  var n = e("./facade"), r;
  t.getInstance = i;
}));
