(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("media-agent/lib/ortc/ortcMediaChannel", [
      "require",
      "exports",
      "./ortcHelper",
      "../constants",
      "./ortcConstants",
      "./ortcChannelStats",
      "../common/utils",
      "./ortcDtmfSender",
      "../common/videoCapabilities",
      "../common/resolutionTable"
    ], e);
}(function (e, t) {
  var n = e("./ortcHelper"), r = e("../constants"), i = e("./ortcConstants"), s = e("./ortcChannelStats"), o = e("../common/utils"), u = e("./ortcDtmfSender"), a = e("../common/videoCapabilities"), f = e("../common/resolutionTable"), l = "h264", c = "opus", h = "vp8", p = "rtx", d = 1200, v = 3000, m = function () {
      function e(e, t, n, i, s, o, l, c) {
        this.contributingSourcesPollingInterval = 1000;
        this.doMute = !1;
        this.sendActive = !1;
        this.recvActive = !1;
        this.lastSources = [];
        this.resolutionTable = new f["default"]();
        this.maintainResolution = !1;
        this.subscribedMsi = r["default"].MSI.unsubscribe;
        this.isSsrcUpdated = !1;
        this.channelId = e;
        this.logger = t;
        this.settings = n;
        this.channelType = i;
        this.label = s;
        this.observer = o;
        this.ssrcGenerator = l;
        this.maintainResolution = c;
        var h = this.settings.ortcVideoCapabilityMaxFS || d, p = this.settings.ortcVideoCapabilityMaxFPS || v;
        this.videoCapabilities = new a["default"](h, p);
        this.dtmfSender = new u["default"](this.logger, this.settings.dtmf);
        this.ssrcRange = this.generateSsrcRange();
      }
      return e.prototype.getTransportId = function () {
        return this.transportId;
      }, e.prototype.getLabel = function () {
        return this.label;
      }, e.prototype.getType = function () {
        return this.channelType;
      }, e.prototype.getSubscrbedMsi = function () {
        return this.subscribedMsi;
      }, e.prototype.getLocalParameters = function () {
        var e = o["default"].deepClone(this.getLocalRtpCaps());
        this.updateCodecParameters(e);
        var t = {
          rtpCaps: e,
          rtxSsrc: this.getRtxSsrc(this.ssrcRange),
          ssrcRange: this.ssrcRange
        };
        return {
          sender: t,
          receiver: o["default"].deepClone(t)
        };
      }, e.prototype.configureChannel = function (e, t, n) {
        this.logger.log("configureChannel", "type:", this.channelType, "descr:", JSON.stringify(e.descr));
        this.mediaParams = e;
        e.descr.enabled ? (this.configureSsrc(e.receiver, e.sender), this.configureReceiver(e.descr, e.receiver, t), this.configureSender(e.descr, e.sender, t, n), this.transportId = t.transportId) : this.disable();
      }, e.prototype.updateLocalMediaStream = function (e) {
        this.rtpSender && this.replaceMediaStreamIfDifferent(e);
      }, e.prototype.canSubscribe = function () {
        return this.recvActive && this.rtpReceiver && this.subscribedMsi === r["default"].MSI.unsubscribe && this.isVideo();
      }, e.prototype.subscribe = function (e) {
        if (this.subscribedMsi === r["default"].MSI.unsubscribe && this.isVideo())
          return this.subscribedMsi = e, this.requestSendCsrc(this.subscribedMsi);
        throw new Error("invalid call for subscribe:" + this.subscribedMsi + "type:" + this.channelType);
      }, e.prototype.unsubscribe = function () {
        if (this.subscribedMsi === r["default"].MSI.unsubscribe || !this.isVideo())
          throw new Error("invalid call for unsubscribe:" + this.subscribedMsi + "type:" + this.channelType);
        this.subscribedMsi = r["default"].MSI.unsubscribe;
        this.requestSendCsrc(this.subscribedMsi);
      }, e.prototype.getReportsAsync = function () {
        var e = this.recvActive ? this.rtpReceiver : null, t = this.sendActive ? this.rtpSender : null, n = e ? e.transport.transport : t ? t.transport.transport : null, r = s["default"].build({ logger: this.logger }, n, t, e);
        return r.getReport();
      }, e.prototype.getSendTrack = function () {
        return this.sendActive && this.rtpSender ? this.rtpSender.track : null;
      }, e.prototype.getRecvTrack = function () {
        return this.recvActive && this.rtpReceiver ? this.recvTrack : null;
      }, e.prototype.terminate = function () {
        this.disable();
        this.logger.log("terminated");
      }, e.prototype.sendDtmf = function (e) {
        return this.dtmfSender.sendDtmf(this.rtpSender, e);
      }, e.prototype.canSendDtmf = function () {
        return this.dtmfSender.canSendDtmf(this.rtpSender);
      }, e.prototype.videoSizeChanged = function (e, t) {
        var n = this, r = this.resolutionTable.getMaxFS(e, t);
        if (!this.videoCapabilities) {
          this.logger.error("no capabilities for provided modality:", self);
          return;
        }
        this.videoCapabilities.setMaxFS(r, function (e) {
          var t = n.mediaParams.receiver.rtpCaps.codecs[0];
          t.name.toLowerCase() === l && n.observer.onMediaCapabilitiesChanged(i.VideoCapabilitiesEventType.CODEC_PARAMS_UPDATED, {
            mediaId: n.channelId,
            codecName: t.name,
            capabilities: {
              "max-fs": e.getMaxFS(),
              "max-fps": e.getMaxFPS()
            }
          });
        });
      }, e.prototype.setMute = function (e) {
        this.doMute = e;
        this.currMediaStreamRef && this.currMediaStreamRef.setMute(e);
      }, e.prototype.preconfigureChannel = function (e) {
        if (!e)
          return;
        this.logger.debug("Preconfigure with remote ssrc:", e.remoteSsrcRange);
        var t = this.rtpReceiver && this.hasSsrcChanged(e.remoteSsrcRange, this.recvRemoteSsrc), n = this.rtpSender && this.hasSsrcChanged(e.remoteSsrcRange, this.sendRemoteSsrc);
        if (!t && !n)
          return;
        this.isSsrcUpdated = !0;
        this.updateSsrcRange();
      }, e.prototype.getLocalRtpCaps = function () {
        return this.localRtpCaps || (this.localRtpCaps = this.gatherLocalRtpCaps()), this.localRtpCaps;
      }, e.prototype.gatherLocalRtpCaps = function () {
        var e = this, t = this.typeToString(this.channelType), n = RTCRtpReceiver.getCapabilities(t);
        if (!n.codecs)
          return n;
        if (this.channelType === i.MediaChannelType.Audio && this.settings.audioCodec) {
          var r = [
            "cn",
            "red"
          ];
          o["default"].remove(n.codecs, function (t) {
            var n = t.name.toLowerCase();
            return n !== e.settings.audioCodec.toLowerCase() && r.indexOf(n) === -1;
          });
        } else
          this.channelType === i.MediaChannelType.Video && this.settings.videoCodec && o["default"].remove(n.codecs, function (t) {
            return t.name.toLowerCase() !== e.settings.videoCodec.toLowerCase();
          });
        if (this.channelType === i.MediaChannelType.Audio)
          for (var s = n.codecs.length - 1; s >= 0; s--)
            n.codecs[s].name.toLowerCase() === c && (n.codecs[s].preferredPayloadType = 111, this.logger.log("Opus payloadType fix, change payload type to 111 for", n.codecs[s].name));
        if (this.channelType === i.MediaChannelType.Video) {
          var u = o["default"].find(n.codecs, function (e) {
            return e.name.toLowerCase() === h;
          });
          u && o["default"].remove(n.codecs, function (e) {
            return e.name.toLowerCase() === h || e.name.toLowerCase() === p && u.preferredPayloadType === +e.parameters.apt;
          });
        }
        return n;
      }, e.prototype.getRtxSsrc = function (e) {
        var t = this.getLocalRtpCaps();
        return n["default"].hasRtx(t.codecs) ? this.ssrcRange.min + 50 : 0;
      }, e.prototype.replaceMediaStreamIfDifferent = function (e) {
        var t, n;
        this.isAudio() ? (n = this.currMediaStreamRef.getObject().getAudioTracks()[0], t = e.getObject().getAudioTracks()) : (n = this.currMediaStreamRef.getObject().getVideoTracks()[0], t = e.getObject().getVideoTracks());
        var r = t.length ? t[0] : null;
        if (r === null) {
          this.logger.error("media track is not available");
          return;
        }
        var i = n.getSettings().deviceId, s = r.getSettings().deviceId;
        if (i !== s) {
          this.logger.log("replacing media track", "currDevID:", i, "newDevID:", s, "currTrackID:", n.id, "newTrackID:", r.id);
          var o = e.clone();
          o.setMute(this.doMute);
          this.isAudio() ? this.rtpSender.setTrack(o.getObject().getAudioTracks()[0]) : this.rtpSender.setTrack(o.getObject().getVideoTracks()[0]);
          this.currMediaStreamRef.dispose();
          this.currMediaStreamRef = o;
        } else
          this.logger.log("NOT replacing media track", "currDevID:", i, "newDevID:", s, "currTrackID:", n.id, "newTrackID:", r.id);
      }, e.prototype.isAudio = function () {
        return this.channelType === i.MediaChannelType.Audio;
      }, e.prototype.isVideo = function () {
        return this.channelType === i.MediaChannelType.Video;
      }, e.prototype.updateContributingSources = function () {
        var e = this;
        if (this.recvActive && this.rtpReceiver) {
          var t = void 0;
          try {
            t = this.rtpReceiver.getContributingSources();
          } catch (n) {
            this.logger.error("failed to retrieve contributing sources from receiver", "error:", n);
            return;
          }
          if (!t) {
            this.logger.warn("could not retrieve contributing sources from receiver");
            return;
          }
          var r = t.map(function (e) {
              return e.csrc;
            }), i = this.lastSources.length === r.length && r.every(function (t, n) {
              return t === e.lastSources[n];
            });
          i || (this.logger.debug("contributing sources changed", "sources:", r), this.observer.onContributingSourcesChanged(r));
          this.lastSources = r;
          setTimeout(this.updateContributingSources.bind(this), this.contributingSourcesPollingInterval);
        } else
          this.logger.debug("receiver is missing, stop polling for contributing sources");
      }, e.prototype.requestSendCsrc = function (e) {
        if (this.recvActive && this.rtpReceiver) {
          this.logger.log("_requestSendCsrc", "csrc:", e);
          try {
            this.rtpReceiver.requestSendCSRC(e);
          } catch (t) {
            this.logger.error("failed to request send csrc", "error:", t);
          }
          return !0;
        }
        return !1;
      }, e.prototype.createReceiver = function (e, t) {
        var n = this;
        this.logger.log("_rtpReceiver create");
        var i = this.typeToString(this.channelType);
        this.rtpReceiver = new RTCRtpReceiver(e.transport, i);
        this.recvTrack = this.rtpReceiver.track;
        this.rtpReceiver.onerror = function (e) {
          n.logger.error("_rtpReceiver.onerror", "event:", e);
          n.observer.onError({
            type: r["default"].MEDIA_ERROR.internalError,
            detail: e
          });
        };
      }, e.prototype.createSender = function (e, t, n) {
        var i = this, s;
        this.isAudio() ? s = t.getObject().getAudioTracks()[0] : s = t.getObject().getVideoTracks()[0];
        this.logger.log("this.rtpSender create trackID:", s.id);
        this.rtpSender = new RTCRtpSender(s, e.transport);
        this.rtpSender.onerror = function (e) {
          i.logger.error("this.rtpSender.onerror", "event:", e);
          i.observer.onError({
            type: r["default"].MEDIA_ERROR.internalError,
            detail: e
          });
        };
        this.rtpSender.onssrcconflict = function (e) {
          i.logger.error("this.rtpSender.onssrcconflict", "event:", e);
        };
      }, e.prototype.getRecvParams = function (e) {
        var t = n["default"].getRecvParams(e.rtpCaps, e.remoteSsrcRange, this.ssrcRange.min, e.rtcpReducedSize, e.rtcpMux, e.rtxSsrc);
        return this.maintainResolution && (t.degradationPreference = "maintain-resolution"), t.encodings[0].active = this.recvActive, t;
      }, e.prototype.getSendParams = function (e) {
        var t = n["default"].getSendParams(e.rtpCaps, this.ssrcRange, e.remoteSsrcRange.min, e.rtcpReducedSize, e.rtcpMux, e.rtxSsrc);
        return t.encodings[0].active = this.sendActive, t;
      }, e.prototype.configureSsrc = function (e, t) {
        var n = this.rtpReceiver && this.hasSsrcChanged(e.remoteSsrcRange, this.recvRemoteSsrc) || this.rtpSender && this.hasSsrcChanged(t.remoteSsrcRange, this.sendRemoteSsrc);
        if (!n || this.isSsrcUpdated) {
          this.isSsrcUpdated = !1;
          return;
        }
        this.updateSsrcRange();
      }, e.prototype.updateSsrcRange = function () {
        var e = this.generateSsrcRange();
        this.logger.debug("SSRC updating: ", this.ssrcRange, " -> ", e);
        this.ssrcRange = e;
        this.observer.onMediaCapabilitiesChanged(i.VideoCapabilitiesEventType.SSRC_UPDATED, {
          mediaId: this.channelId,
          ssrcRange: this.ssrcRange,
          rtxSsrc: this.getRtxSsrc(this.ssrcRange)
        });
      }, e.prototype.configureReceiver = function (e, t, n) {
        this.rtpReceiver && this.hasSsrcChanged(t.remoteSsrcRange, this.recvRemoteSsrc) && (this.logger.log("SSRC changed, resetting receiver"), this.stopReceiver());
        this.rtpReceiver || (this.createReceiver(n, t), this.recvRemoteSsrc = t.remoteSsrcRange);
        this.recvActive = !!e.recv;
        var i = this.getRecvParams(t);
        this.logger.debug("rtpReceiver.receive:", JSON.stringify(i));
        this.rtpReceiver.receive(i);
        this.recvActive && (this.isAudio() ? this.updateContributingSources() : this.subscribedMsi !== r["default"].MSI.unsubscribe && this.requestSendCsrc(this.subscribedMsi));
      }, e.prototype.stopReceiver = function () {
        this.rtpReceiver && (this.logger.log("_rtpReceiver stop & destroy"), this.recvActive = !1, this.recvTrack = null, this.rtpReceiver.stop(), this.rtpReceiver = null);
      }, e.prototype.configureSender = function (e, t, n, r) {
        this.rtpSender && this.hasSsrcChanged(t.remoteSsrcRange, this.sendRemoteSsrc) && (this.logger.log("SSRC changed, resetting sender"), this.stopSender());
        this.sendActive = !!e.send;
        if (this.sendActive) {
          this.currMediaStreamRef ? this.replaceMediaStreamIfDifferent(r) : (this.currMediaStreamRef = r.clone(), this.currMediaStreamRef.setMute(this.doMute));
          this.rtpSender || (this.createSender(n, this.currMediaStreamRef, t), this.sendRemoteSsrc = t.remoteSsrcRange);
          var i = this.getSendParams(t);
          this.logger.debug("this.rtpSender.send:", JSON.stringify(i));
          this.rtpSender.send(i);
        } else
          this.stopSender(), this.disposeLocalStream();
      }, e.prototype.stopSender = function () {
        this.dtmfSender && (this.dtmfSender.dispose(), this.dtmfSender = null);
        this.rtpSender && (this.logger.log("this.rtpSender stop & destroy"), this.sendActive = !1, this.rtpSender.stop(), this.rtpSender = null);
      }, e.prototype.disposeLocalStream = function () {
        this.currMediaStreamRef && (this.currMediaStreamRef.dispose(), this.currMediaStreamRef = null);
      }, e.prototype.hasSsrcChanged = function (e, t) {
        return t && e && !o["default"].deepEqual(e, t);
      }, e.prototype.updateCodecParameters = function (e) {
        var t = o["default"].find(e.codecs, function (e) {
          return e.name.toLowerCase() === l;
        });
        t && t.parameters && (t.parameters["max-fs"] = this.videoCapabilities.getMaxFS(), t.parameters["max-fps"] = this.videoCapabilities.getMaxFPS());
      }, e.prototype.disable = function () {
        this.stopReceiver();
        this.stopSender();
        this.disposeLocalStream();
      }, e.prototype.generateSsrcRange = function () {
        return this.channelType === i.MediaChannelType.Audio ? this.ssrcGenerator.nextAudioStreamSsrc() : this.channelType === i.MediaChannelType.Video ? this.ssrcGenerator.nextVideoStreamSsrc() : null;
      }, e.prototype.typeToString = function (e) {
        return i.MediaChannelType[e].toLowerCase();
      }, e;
    }();
  t.__esModule = !0;
  t["default"] = m;
}));
