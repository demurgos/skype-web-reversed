(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("media-agent/lib/common/stream/receiveStreamCollection", [
      "require",
      "exports",
      "../utils"
    ], e);
}(function (e, t) {
  var n = e("../utils"), r = function () {
      function e(e) {
        this.streams = [];
        this.listener = e;
      }
      return e.prototype.add = function (e) {
        var t = this.streams.some(function (t) {
          return t.getId() === e.getId();
        });
        t || (this.streams.push(e), this.listener.streamAdded(e));
      }, e.prototype.remove = function (e) {
        var t;
        if (n["default"].remove(this.streams, function (n) {
            return n.getId() === e ? (t = n, !0) : !1;
          })) {
          this.listener.streamRemoved(t);
          return;
        }
      }, e.prototype.getStreams = function () {
        return this.streams;
      }, e;
    }();
  t.__esModule = !0;
  t["default"] = r;
}));
