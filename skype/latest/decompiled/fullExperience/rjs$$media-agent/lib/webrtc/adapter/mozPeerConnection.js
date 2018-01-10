(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("media-agent/lib/webrtc/adapter/mozPeerConnection", [
      "require",
      "exports",
      "microsoft-sdp-transform",
      "../../common/userAgentAdapter"
    ], e);
}(function (e, t) {
  function i(e, t) {
    return e.split(";").filter(function (e) {
      return !t.some(function (t) {
        return e.indexOf(t) > -1;
      });
    }).join(";");
  }
  function s(e) {
    if (e.type != "video" || !e.fmtp || e.fmtp.length == 0)
      return;
    e.fmtp[0].config = i(e.fmtp[0].config, [
      "max-mbps",
      "max-br"
    ]);
  }
  var n = e("microsoft-sdp-transform"), r = e("../../common/userAgentAdapter"), o = function () {
      function e(e) {
        return this.peerConnection = new r["default"].window.RTCPeerConnection(e), this.shim(), this.peerConnection;
      }
      return e.prototype.shim = function () {
        this.shimSetRemoteDescription();
        this.shimStats();
      }, e.prototype.shimStats = function () {
        var e = this, t = this.peerConnection.getStats;
        this.peerConnection.getStats = function (n, r) {
          t.apply(e.peerConnection, null).then(n)["catch"](r);
        };
      }, e.prototype.shimSetRemoteDescription = function () {
        var e = this, t = this.peerConnection.setRemoteDescription;
        this.peerConnection.setRemoteDescription = function (i) {
          var o = n.parse(i.sdp), u, a;
          return o.media.forEach(function (e, t) {
            t === 0 ? (u = e.iceUfrag, a = e.icePwd) : u !== undefined && a !== undefined && (e.iceUfrag = u, e.icePwd = a);
            s(e);
          }), i = new r["default"].window.RTCSessionDescription({
            type: i.type,
            sdp: n.write(o)
          }), t.call(e.peerConnection, i);
        };
      }, e;
    }();
  t.__esModule = !0;
  t["default"] = o;
}));
