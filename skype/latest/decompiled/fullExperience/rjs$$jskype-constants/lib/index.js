(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("jskype-constants/lib/index", [
      "require",
      "exports",
      "./calling",
      "./common",
      "./data",
      "./events",
      "./featureFlags",
      "./people"
    ], e);
}(function (e, t) {
  var n = e("./calling");
  t.CALLING = n["default"];
  var r = e("./common");
  t.COMMON = r["default"];
  var i = e("./data");
  t.DATA = i["default"];
  var s = e("./events");
  t.EVENTS = s["default"];
  var o = e("./featureFlags");
  t.FEATURE_FLAGS = o["default"];
  var u = e("./people");
  t.PEOPLE = u["default"];
}));
