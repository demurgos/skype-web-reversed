(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("media-agent/lib/extensions/videoStreamControlExtension", [
      "require",
      "exports",
      "./extensionBase",
      "../constants",
      "./videoStreamConfigurator",
      "./sourceRequester"
    ], e);
}(function (e, t) {
  var n = e("./extensionBase"), r = e("../constants"), i = e("./videoStreamConfigurator"), s = e("./sourceRequester"), o = "ControlVideoStreaming", u = function (e) {
      function t() {
        return e.call(this, r["default"].EXTENSION_TYPE.videoStreamControl) || this;
      }
      return __extends(t, e), t.prototype.initialize = function (t) {
        e.prototype.initialize.call(this, t);
        this.subscribeListeners();
        this.sourceRequester = new s.SourceRequester(this.logger, new s.VideoControlMessageGenerator());
        this.streamConfigurator = new i.VideoStreamConfigurator(this.logger, t.negotiationEmulator);
      }, t.prototype.configure = function (t) {
        e.prototype.configure.call(this, t);
        this.sourceRequester.configure(t);
      }, t.prototype.requestSource = function (e, t) {
        return this.sourceRequester.requestSource(e, t);
      }, t.prototype.dispose = function () {
        this.unsubscribeListeners();
        this.streamConfigurator.dispose();
        this.sourceRequester.dispose();
        e.prototype.dispose.call(this);
      }, t.prototype.onNotification = function (e, t) {
        o === e && this.streamConfigurator.handleMessage(t);
      }, t.prototype.subscribeListeners = function () {
        this.manager.addNotificationListener(this, o);
      }, t.prototype.unsubscribeListeners = function () {
        this.manager.removeNotificationListener(this, o);
      }, t;
    }(n.ExtensionBase);
  t.__esModule = !0;
  t["default"] = u;
}));
