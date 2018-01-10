(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-constants/lib/index", [
      "require",
      "exports",
      "./calling",
      "./pluginConst",
      "./people",
      "./outOfBrowser",
      "./keys",
      "./common"
    ], e);
}(function (e, t) {
  var n = e("./calling");
  t.CALLING = n["default"];
  var r = e("./pluginConst");
  t.PLUGIN_CONST = r["default"];
  var i = e("./people");
  t.PEOPLE = i["default"];
  var s = e("./outOfBrowser");
  t.OUT_OF_BROWSER = s["default"];
  var o = e("./keys");
  t.KEYS = o["default"];
  var u = e("./common");
  t.COMMON = u["default"];
}));
