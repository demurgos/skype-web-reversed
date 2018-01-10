(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/plugin/componentFactory", [
      "require",
      "exports",
      "./managerComponent",
      "./skypeCoreComponent",
      "./videoComponent",
      "../../../lib/services/plugin/electron/electronManager",
      "../../../lib/services/plugin/electron/electronSkypeCore",
      "../../../lib/services/plugin/electron/electronVideoRenderer",
      "swx-browser-detect"
    ], e);
}(function (e, t) {
  function f() {
    return a["default"].getBrowserInfo().isElectron;
  }
  function l() {
    return f() ? s.build() : new n["default"]();
  }
  function c(e) {
    return f() ? o.build() : new r["default"](e);
  }
  function h(e, t) {
    return f() ? u.build(t) : new i["default"](e, t);
  }
  var n = e("./managerComponent"), r = e("./skypeCoreComponent"), i = e("./videoComponent"), s = e("../../../lib/services/plugin/electron/electronManager"), o = e("../../../lib/services/plugin/electron/electronSkypeCore"), u = e("../../../lib/services/plugin/electron/electronVideoRenderer"), a = e("swx-browser-detect");
  t.createManagerComponent = l;
  t.createSkypeCoreComponent = c;
  t.createVideoComponent = h;
}));
