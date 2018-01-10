(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("media-agent/lib/webrtc/render/audioRenderer", [
      "require",
      "exports",
      "../../common/userAgentAdapter",
      "../../common/utils"
    ], e);
}(function (e, t) {
  var n = e("../../common/userAgentAdapter"), r = e("../../common/utils"), i = function () {
      function e(e) {
        this.window = n["default"].window;
        this.logger = e.logger.createChild("audio");
      }
      return e.prototype.play = function (e) {
        this.audio ? this.window.detachMediaStream(this.audio) : (this.audio = document.createElement("audio"), document.body.appendChild(this.audio), this.audio.autoplay = !0, this.audio.addEventListener("error", this.onAudioError));
        this.logger.log("starting playout");
        this.window.attachMediaStream(this.audio, e);
        this.stream = e;
      }, e.prototype.stop = function () {
        this.audio && (this.logger.log("stopping playout"), this.audio.removeEventListener("error", this.onAudioError), document.body.removeChild(this.audio), this.window.detachMediaStream(this.audio), this.audio = null, this.stream = null);
      }, e.prototype.getStream = function () {
        return this.stream;
      }, e.prototype.dispose = function () {
        this.stop();
      }, e.prototype.onAudioError = function (e) {
        e ? this.logger.error("error event occured:", this.toString(e)) : this.logger.error("error event occured", "error:", this.audio ? this.audio.error : "<no audio element>");
      }, e.prototype.toString = function (e) {
        if (e) {
          var t = {};
          return r["default"].forOwn(e, function (e, n) {
            try {
              t[n] = typeof e == "function" ? t[n] = e() : t[n] = e;
            } catch (r) {
              t[n] = "error: " + r;
            }
          }), JSON.stringify(t);
        }
      }, e;
    }();
  t.__esModule = !0;
  t["default"] = i;
}));
