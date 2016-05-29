(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-i18n/lib/index", [
      "require",
      "exports",
      "./knockoutBindingExtensions",
      "./localization",
      "./plurals",
      "./resources"
    ], e);
}(function (e, t) {
  var n = e("./knockoutBindingExtensions");
  t.knockoutBindingExtensions = n;
  var r = e("./localization");
  t.localization = r;
  var i = e("./plurals");
  t.plurals = i;
  var s = e("./resources");
  t.resources = s;
}));
