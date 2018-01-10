(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-g11n/lib/index", [
      "require",
      "exports",
      "./formatter",
      "./globalization",
      "./settings"
    ], e);
}(function (e, t) {
  var n = e("./formatter");
  t.formatter = n;
  var r = e("./globalization");
  t.globalization = r;
  var i = e("./settings");
  t.settings = i;
}));
