(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("media-agent/lib/webrtc/stream/webRtcReceiveStream", [
      "require",
      "exports",
      "../../common/stream/receiveStream"
    ], e);
}(function (e, t) {
  var n = e("../../common/stream/receiveStream"), r = function () {
      function e(e, t, r, i) {
        this.msi = n.MediaSourceIdentifiers.SourceNone;
        this.operations = Promise.resolve();
        this.mediaStream = e;
        this.modality = t;
        this.sourceStreamId = r;
        this.controller = i;
      }
      return e.prototype.getId = function () {
        return this.mediaStream.id;
      }, e.prototype.getModality = function () {
        return this.modality;
      }, e.prototype.getMsi = function () {
        return this.msi;
      }, e.prototype.getMediaStream = function () {
        return this.mediaStream;
      }, e.prototype.requestSource = function (e) {
        var t = this;
        this.msi = e;
        var n = this.operations.then(function () {
          return t.controller.requestSource(t.sourceStreamId, e);
        });
        return this.operations = n["catch"](function () {
        }), n;
      }, e;
    }();
  t.__esModule = !0;
  t["default"] = r;
}));
