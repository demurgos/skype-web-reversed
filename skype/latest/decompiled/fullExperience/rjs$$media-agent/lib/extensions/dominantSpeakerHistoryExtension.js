(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("media-agent/lib/extensions/dominantSpeakerHistoryExtension", [
      "require",
      "exports",
      "../constants",
      "./extensionBase"
    ], e);
}(function (e, t) {
  var n = e("../constants"), r = e("./extensionBase"), i = "DominantSpeakerInfo", s = function (e) {
      function t() {
        var t = e.call(this, n["default"].EXTENSION_TYPE.dominantSpeakerHistory) || this;
        return t.callback = null, t;
      }
      return __extends(t, e), t.prototype.initialize = function (t) {
        e.prototype.initialize.call(this, t);
        this.manager.addNotificationListener(this, i);
        t && t.callback && (this.callback = t.callback);
      }, t.prototype.dispose = function () {
        this.manager.removeNotificationListener(this, i);
        this.callback = null;
        e.prototype.dispose.call(this);
      }, t.prototype.onNotification = function (e, t) {
        if (i !== e)
          return;
        var n = t;
        this.processInfo(n);
      }, t.prototype.processInfo = function (e) {
        if (!this.callback)
          return;
        this.callback(e.previousDominantSpeakerHistory);
      }, t;
    }(r.ExtensionBase);
  t.__esModule = !0;
  t["default"] = s;
}));
