(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/plugin/electron/electronManager", [
      "require",
      "exports",
      "./electronBase"
    ], e);
}(function (e, t) {
  function i() {
    return new r();
  }
  var n = e("./electronBase"), r = function (e) {
      function t() {
        return e.call(this) || this;
      }
      return __extends(t, e), t.prototype.load = function () {
        this._raiseLoadComplete(!0);
      }, t.prototype.runSoftwareUpdate = function () {
        this._raiseEvent("UpdateCheckComplete", {
          success: !0,
          updateVersion: null
        });
      }, t;
    }(n["default"]);
  t.ElectronManager = r;
  t.build = i;
}));
