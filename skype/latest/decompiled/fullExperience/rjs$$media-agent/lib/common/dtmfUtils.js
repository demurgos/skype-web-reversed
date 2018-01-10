(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("media-agent/lib/common/dtmfUtils", [
      "require",
      "exports"
    ], e);
}(function (e, t) {
  t.defaultSettings = {
    toneDuration: 200,
    toneGap: 100
  };
  var n = function () {
    function e(e) {
      this.queue = [];
      this.logger = e;
    }
    return e.prototype.cleanup = function () {
      this.queue.forEach(function (e) {
        e.reject({ notSent: e.tones });
      });
      this.queue = [];
    }, e.prototype.waitForNotification = function (e) {
      var t = this;
      return e ? (this.logger.log("sending dtmf tones: ", e), new Promise(function (n, r) {
        t.queue.push({
          tones: e,
          resolve: n,
          reject: r
        });
      })) : Promise.reject(new Error("invalid input"));
    }, e.prototype.toneSent = function (e) {
      this.queue[0] && (e === this.queue[0].tones[0] ? (this.queue[0].tones = this.queue[0].tones.substr(1), this.queue[0].tones === "" && (this.queue[0].resolve(), this.queue.shift())) : (this.queue[0].reject(new Error("sent tone does not match: expected '" + this.queue[0].tones[0] + "' got '" + e + "'")), this.queue.shift(), this.toneSent(e)));
    }, e;
  }();
  t.DTMFQueue = n;
}));
