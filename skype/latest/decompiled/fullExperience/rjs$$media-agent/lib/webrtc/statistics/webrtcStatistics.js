(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("media-agent/lib/webrtc/statistics/webrtcStatistics", [
      "require",
      "exports",
      "../../helper",
      "../../common/utils"
    ], e);
}(function (e, t) {
  var n = e("../../helper"), r = e("../../common/utils"), i = function () {
      function e(e, t) {
        this.sessionId = null;
        this.mediaEntities = [];
        this.terminated = !1;
        this.extensions = {
          WebRTCStats: {},
          OfferedSrtp: "none",
          NegotiatedSrtp: "none",
          IceConnectionState: "none",
          SignalingState: "none",
          AudioTransportRecvBitrate: 0,
          AudioTransportSendBitrate: 0,
          AudioPayloadSendBitrate: 0,
          AudioPayloadRecvBitrate: 0,
          VideoPayloadSendBitrate: 0,
          VideoPayloadRecvBitrate: 0,
          TimerAudioTransportRecvBitrate: 0,
          TimerAudioTransportSendBitrate: 0,
          TimerAudioPayloadRecvBitrate: 0,
          TimerAudioPayloadSendBitrate: 0,
          TimerVideoPayloadRecvBitrate: 0,
          TimerVideoPayloadSendBitrate: 0,
          StartTime: new Date().getTime(),
          EndTime: new Date().getTime()
        };
        this.report = {
          type: "WebRtcMediaStats",
          webrtc: { Extensions: this.extensions }
        };
        this.report.localStreams = [];
        this.report.remoteStreams = [];
        this.report.webrtc.CorrelationId = e;
        this.sessionId = e;
        this.logger = t.logger.createChild("WebrtcStatistics");
      }
      return e.prototype.setStartTime = function (e) {
        var t = this.extensions.WebRTCStats;
        if (!t.ssrc_audio_send || !t.ssrc_audio_recv || !t.ssrc_video_send || !t.ssrc_video_recv)
          return !1;
        var r = function (e, t) {
          return e && (!t || t !== -1) ? new Date().getTime() : 0;
        };
        return this.extensions.TimerAudioPayloadRecvBitrate = n["default"].hasReceiveDirectionality(e.audio) ? r(t.ssrc_audio_recv.bytesReceived, this.extensions.TimerAudioPayloadRecvBitrate) : -1, this.extensions.TimerAudioPayloadSendBitrate = n["default"].hasSendDirectionality(e.audio) ? r(t.ssrc_audio_send.bytesSent, this.extensions.TimerAudioPayloadSendBitrate) : -1, this.extensions.TimerVideoPayloadRecvBitrate = n["default"].hasReceiveDirectionality(e.video) ? r(t.ssrc_video_recv.bytesReceived, this.extensions.TimerVideoPayloadRecvBitrate) : -1, this.extensions.TimerVideoPayloadSendBitrate = n["default"].hasSendDirectionality(e.video) ? r(t.ssrc_video_send.bytesSent, this.extensions.TimerVideoSendBitrate) : -1, this.extensions.TimerAudioTransportRecvBitrate = n["default"].hasReceiveDirectionality(e.audio) ? r(t.ssrc_audio_recv.bytesReceived, this.extensions.TimerAudioTransportRecvBitrate) : -1, this.extensions.TimerAudioTransportSendBitrate = n["default"].hasSendDirectionality(e.audio) ? r(t.ssrc_audio_send.bytesSent, this.extensions.TimerAudioTransportSendBitrate) : -1, this.extensions.TimerVideoPayloadRecvBitrate && this.extensions.TimerVideoPayloadSendBitrate && this.extensions.TimerAudioPayloadRecvBitrate && this.extensions.TimerAudioPayloadSendBitrate && this.extensions.TimerAudioTransportRecvBitrate && this.extensions.TimerAudioTransportSendBitrate ? !0 : !1;
      }, e.prototype.detectStreamStart = function () {
        var e = this;
        return new Promise(function (t) {
          e.peerConnection ? e.peerConnection.getStats(function (n) {
            e.extensions.WebRTCStats = e.getWebrtcReport(n);
            t();
          }, function (n) {
            e.logger.error("detectStreamStart getreport getstats failure", n);
            t();
          }) : t();
        })["catch"](function (t) {
          e.logger.log("detectCallStart error", t);
        });
      }, e.prototype.getSrtpReport = function (e) {
        var t = "";
        return e.dtls && (t += "dtls"), e.sdes && (t += "sdes"), t;
      }, e.prototype.getStreamsReport = function (e, t) {
        var n = [];
        return e.forEach(function (e) {
          var r = { tracks: [] };
          n.push(r);
          e.getTracks().forEach(function (n) {
            (n.kind === "audio" && t.audio || n.kind === "video" && t.video) && r.tracks.push({
              stream: e,
              track: n
            });
          });
        }), n;
      }, e.prototype.calculateAverages = function () {
        var e = this, t = this.extensions.EndTime, n = function (e, n) {
            return e && t - n && n !== -1 ? Math.round(e * 8 / (t - n)) : 0;
          }, r = function (t) {
            return t.split(".").reduce(function (e, t) {
              return typeof e == "undefined" || e === null ? e : e[t];
            }, e.extensions.WebRTCStats);
          };
        this.extensions.AudioPayloadRecvBitrate = n(r("ssrc_audio_recv.bytesReceived"), this.extensions.TimerAudioPayloadRecvBitrate);
        this.extensions.AudioPayloadSendBitrate = n(r("ssrc_audio_send.bytesSent"), this.extensions.TimerAudioPayloadSendBitrate);
        this.extensions.VideoPayloadRecvBitrate = n(r("ssrc_video_recv.bytesReceived"), this.extensions.TimerVideoPayloadRecvBitrate);
        this.extensions.VideoPayloadSendBitrate = n(r("ssrc_video_send.bytesSent"), this.extensions.TimerVideoPayloadSendBitrate);
        this.extensions.AudioTransportRecvBitrate = n(r("ssrc_audio_send.pair.bytesReceived"), this.extensions.TimerAudioTransportRecvBitrate);
        this.extensions.AudioTransportSendBitrate = n(r("ssrc_audio_send.pair.bytesSent"), this.extensions.TimerAudioTransportSendBitrate);
      }, e.prototype.getWebrtcReport = function (e) {
        var t = {}, n = {}, i = [
            "codecImplementationName",
            "googFrameHeightReceived",
            "googFrameWidthReceived",
            "googNacksSent",
            "googRenderDelayMs",
            "googTargetDelayMs",
            "googPlisSent",
            "googFrameRateDecoded",
            "googFrameRateOutput",
            "googMinPlayoutDelayMs",
            "googMaxDecodeMs",
            "googFrameRateReceived",
            "googCaptureStartNtpTimeMs",
            "googFirsSent",
            "googDecodeMs",
            "googCodecName",
            "googCurrentDelayMs",
            "audioInputLevel",
            "transportId",
            "audioOutputLevel",
            "id",
            "googCodecName",
            "googEchoCancellationEchoDelayMedian",
            "googEchoCancellationEchoDelayStdDev",
            "googEchoCancellationQualityMin",
            "googEchoCancellationReturnLoss",
            "googEchoCancellationReturnLossEnhancement",
            "googJitterReceived",
            "googRtt",
            "googTypingNoiseState",
            "mediaType",
            "packetsLost",
            "packetsSent",
            "bytesReceived",
            "bytesSent",
            "googAccelerateRate",
            "googCaptureStartNtpTimeMs",
            "googCurrentDelayMs",
            "googDecodingCNG",
            "googDecodingCTN",
            "googDecodingCTSG",
            "googDecodingNormal",
            "googDecodingPLC",
            "googDecodingPLCCNG",
            "googExpandRate",
            "googJitterBufferMs",
            "googPreemptiveExpandRate",
            "googPreferredJitterBufferMs",
            "googSecondaryDecodedRate",
            "googSpeechExpandRate",
            "packetsReceived"
          ], s = [
            "dtlsCipher",
            "googComponent",
            "id",
            "srtpCipher",
            "selectedCandidatePairId"
          ], o = [
            "bytesSent",
            "bytesReceived",
            "googActiveConnection",
            "googChannelId",
            "googLocalCandidateType",
            "googReadable",
            "googRemoteCandidateType",
            "id",
            "googRtt",
            "googTransportType",
            "googWritable",
            "packetsDiscardedOnSend",
            "packetsSent"
          ], u = [
            "googActualEncBitrate",
            "googAvailableReceiveBandwidth",
            "googAvailableSendBandwidth",
            "googBucketDelay",
            "googRetransmitBitrate",
            "googTargetEncBitrate",
            "googTransmitBitrate"
          ], a = function (e) {
            e.result && e.result().forEach(function (e) {
              e.names().forEach(function (t) {
                n[e.type] = n[e.type] || {};
                n[e.type][e.id] = n[e.type][e.id] || {};
                n[e.type][e.id][t] = e.stat(t);
              });
              n[e.type][e.id].id = e.id;
            });
          }, f = function (e, t) {
            var n = {};
            for (var r in e)
              e.hasOwnProperty(r) && t.indexOf(r) !== -1 && (n[r] = e[r]);
            return n;
          }, l = function (e) {
            var t = f(e, i);
            if (e.hasOwnProperty("transportId")) {
              var r = n.googComponent[e.transportId];
              t.transport = f(r, s);
              if (r.hasOwnProperty("selectedCandidatePairId")) {
                var u = n.googCandidatePair[r.selectedCandidatePairId];
                t.pair = f(u, o);
              }
            }
            return t;
          };
        a(e);
        if (!n.ssrc)
          return {};
        var c = function (e) {
            if (n.ssrc[e].hasOwnProperty("transportId")) {
              var i = n.ssrc[e], s = r["default"].find(h.mediaEntities, function (e) {
                  return e.trackId === i.googTrackId;
                }), o = s ? s.modality : i.mediaType, u = i.id.replace(/[0-9]+/, o);
              t[u] = l(i);
            }
          }, h = this;
        for (var p in n.ssrc)
          c(p);
        if (n.VideoBwe && n.VideoBwe.bweforvideo) {
          t.bweStat = {};
          var d = f(n.VideoBwe.bweforvideo, u);
          for (var v in d)
            d.hasOwnProperty(v) && (t.bweStat[v] = d[v]);
        }
        return t;
      }, e.prototype.setIceConnectionState = function (e) {
        this.extensions.IceConnectionStatePrevious = this.extensions.IceConnectionState;
        this.extensions.IceConnectionState = e;
      }, e.prototype.setSignalingConnectionState = function (e) {
        this.extensions.SignalingStatePrevious = this.extensions.SignalingState;
        this.extensions.SignalingState = e;
      }, e.prototype.setNegotiatedModalities = function (e) {
        this.negotiatedModalities = e;
        this.activeModalities = e;
      }, e.prototype.setPeerConnection = function (e) {
        this.peerConnection = e;
      }, e.prototype.setMediaEntities = function (e) {
        this.mediaEntities = e;
      }, e.prototype.setTerminated = function () {
        this.extensions.EndTime = new Date().getTime();
        this.terminated = !0;
      }, e.prototype.setNegotiatedSrtpInfo = function (e) {
        this.extensions.NegotiatedSrtp = this.getSrtpReport(e);
      }, e.prototype.setOfferedSrtpInfo = function (e) {
        this.extensions.OfferedSrtp = this.getSrtpReport(e);
      }, e.prototype.startWaitingForStreamStart = function (e, t) {
        var n = this;
        !this.streamStartDetection && !t && (this.activeModalities = e);
        if (this.streamStartDetection && !t)
          return;
        this.streamStartDetection = !0;
        this.detectStreamStart().then(function () {
          setTimeout(function () {
            if (n.setStartTime(e) || n.terminated) {
              n.streamStartDetection = !1;
              return;
            }
            n.startWaitingForStreamStart(n.activeModalities, !0);
          }, 1000);
        })["catch"](function (e) {
          n.logger.error("startWaitingForStreamStart error", e);
        });
      }, e.prototype.getReport = function () {
        var e = this;
        return new Promise(function (t) {
          if (!e.peerConnection) {
            e.logger.log("getReport, resolve => PeerConnection is not available");
            t(e.report);
            return;
          }
          e.negotiatedModalities && (e.report.localStreams = e.getStreamsReport(e.peerConnection.getLocalStreams(), {
            audio: n["default"].hasSendDirectionality(e.negotiatedModalities.audio),
            video: n["default"].hasSendDirectionality(e.negotiatedModalities.video)
          }), e.report.remoteStreams = e.getStreamsReport(e.peerConnection.getRemoteStreams(), {
            audio: n["default"].hasReceiveDirectionality(e.negotiatedModalities.audio),
            video: n["default"].hasReceiveDirectionality(e.negotiatedModalities.video)
          }));
          try {
            e.peerConnection.getStats(function (n) {
              e.extensions.WebRTCStats = e.getWebrtcReport(n);
              e.calculateAverages();
              t(e.report);
            }, function (n) {
              e.extensions.WebRTCStats = { getStatsError: n };
              e.logger.error("getReport, resolve with error =>", n);
              t(e.report);
            });
          } catch (r) {
            e.extensions.WebRTCStats = { getStatsError: r };
            e.logger.error("getReport, getstats catch error =>", r);
            t(e.report);
          }
        });
      }, e;
    }();
  t.__esModule = !0;
  t["default"] = i;
}));
