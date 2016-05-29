(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-xco/lib/index", [
      "require",
      "exports",
      "./linking",
      "./silentlogin"
    ], e);
}(function (e, t) {
  e("./linking");
  e("./silentlogin");
  t.linking = SKYPE.linking;
  t.silentLogin = SKYPE.login.Silent;
}));
