(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/modelHelpers/personsRegistry/instance", [
      "require",
      "exports",
      "./registry"
    ], e);
}(function (e, t) {
  function i() {
    r && (r.dispose(), r = null);
  }
  function s() {
    return r || (r = new n["default"]()), r;
  }
  var n = e("./registry"), r;
  t.reset = i;
  t.build = s;
}));
