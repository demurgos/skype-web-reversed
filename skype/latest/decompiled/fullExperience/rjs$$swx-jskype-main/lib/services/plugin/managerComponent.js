(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/plugin/managerComponent", [
      "require",
      "exports",
      "./baseComponent"
    ], e);
}(function (e, t) {
  function s() {
    window.navigator.plugins && window.navigator.plugins.refresh && window.navigator.plugins.refresh(!1);
  }
  var n = e("./baseComponent"), r = "__pluginFx", i = function (e) {
      function t() {
        var t = this;
        return s(), t = e.call(this, r) || this, t._init("_", { cssClass: "pluginNoSize" }), t;
      }
      return __extends(t, e), t.prototype.runSoftwareUpdate = function (e, t, n, r) {
        var i = {
          minVersion: e,
          highVersion: t,
          pluginManifestKey: n,
          ecs: r
        };
        this._invokeMethod("RunSoftwareUpdate", i);
      }, t;
    }(n["default"]);
  t.__esModule = !0;
  t["default"] = i;
}));
