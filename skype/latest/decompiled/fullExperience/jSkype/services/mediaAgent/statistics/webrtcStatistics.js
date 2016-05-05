define("jSkype/services/mediaAgent/statistics/webrtcStatistics", ["../helper"], function (e) {
  function t(t) {
    function s(e, t) {
      var n = [];
      return e.forEach(function (e) {
        var r = { tracks: [] };
        n.push(r), e.getTracks().forEach(function (n) {
          ("audio" === n.kind && t.audio || "video" === n.kind && t.video) && r.tracks.push({
            stream: e,
            track: n
          });
        });
      }), n;
    }
    var n, r, i = {
        localStreams: [],
        remoteStreams: [],
        webrtc: {
          CorrelationId: t,
          Extensions: { SdesSrtp: !1 }
        }
      };
    this.setNegotiatedModalities = function (e) {
      r = e;
    }, this.setPeerConnection = function (e) {
      n = e;
    }, this.setSdesSrtp = function (e) {
      i.webrtc.Extensions.SdesSrtp = e;
    }, this.getReport = function () {
      return new Promise(function (t) {
        n && (i.localStreams = s(n.getLocalStreams(), {
          audio: e.hasSendDirectionality(r.audio),
          video: e.hasSendDirectionality(r.video)
        }), i.remoteStreams = s(n.getRemoteStreams(), {
          audio: e.hasReceiveDirectionality(r.audio),
          video: e.hasReceiveDirectionality(r.video)
        })), t(i);
      });
    };
  }
  return {
    build: function (e) {
      return new t(e);
    }
  };
})
