(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("media-agent/lib/extensions/sourceRequester", [
      "require",
      "exports"
    ], e);
}(function (e, t) {
  var n = function () {
    function e() {
      this.sequence = 0;
    }
    return e.prototype.getVideoControlMessage = function (e, t) {
      return {
        controlVideoStreaming: {
          sequenceNumber: ++this.sequence,
          globalTimestamp: new Date().toString(),
          controlInfo: [{
              control: "start",
              sourceId: t,
              streamMsid: e
            }]
        }
      };
    }, e;
  }();
  t.VideoControlMessageGenerator = n;
  var r = function () {
    function e(e, t) {
      this.logger = e;
      this.controlMessageGenerator = t;
    }
    return e.prototype.dispose = function () {
      this.sender = null;
    }, e.prototype.configure = function (e) {
      var t = e;
      this.sender = t.sender;
    }, e.prototype.requestSource = function (e, t) {
      var n = this;
      return Promise.resolve().then(function () {
        if (!n.checkConfigured()) {
          n.logger.warn("extension not configured with sender");
          return;
        }
        var r = n.controlMessageGenerator.getVideoControlMessage(e, t);
        return n.logger.log("sending video control message:", r), n.sender.send(r);
      });
    }, e.prototype.checkConfigured = function () {
      return !!this.sender;
    }, e;
  }();
  t.SourceRequester = r;
}));
