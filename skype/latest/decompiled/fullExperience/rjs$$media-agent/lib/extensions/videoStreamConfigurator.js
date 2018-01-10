(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("media-agent/lib/extensions/videoStreamConfigurator", [
      "require",
      "exports",
      "./descriptionModifier"
    ], e);
}(function (e, t) {
  var n = e("./descriptionModifier"), r = function () {
      function e(e, t) {
        this.logger = e;
        this.emulator = t;
        this.logger = e.createChild("Configurator");
        this.modifiers = [new n.BandwidthControlModifier(this.logger)];
      }
      return e.prototype.dispose = function () {
        this.modifiers && (this.modifiers.forEach(function (e) {
          return e.dispose();
        }), this.modifiers = null);
        this.emulator = null;
        this.logger = null;
      }, e.prototype.handleMessage = function (e) {
        var t = { controlVideoStreaming: e };
        return this.modifiers.forEach(function (e) {
          return e.setVideoControlMessage(t);
        }), this.emulator.renegotiate(this.modifiers);
      }, e;
    }();
  t.VideoStreamConfigurator = r;
}));
