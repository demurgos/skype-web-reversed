(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("media-agent/lib/webrtc/transform/rtcpTransform", [
      "require",
      "exports"
    ], e);
}(function (e, t) {
  function n() {
    this.toMsSdp = function (e, t, n) {
      "offer" === n.type ? e.rtcp && (e.rtcp = { port: e.port }) : delete e.rtcp;
    };
  }
  t.__esModule = !0;
  t["default"] = {
    build: function () {
      return new n();
    }
  };
}));
