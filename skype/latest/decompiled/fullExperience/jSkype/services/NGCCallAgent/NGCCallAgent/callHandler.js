define("jSkype/services/NGCCallAgent/NGCCallAgent/callHandler", [
  "require",
  "jSkype/client",
  "constants/calling",
  "jSkype/settings",
  "swx-enums",
  "jSkype/services/mediaAgent/constants",
  "jcafe-property-model",
  "jSkype/services/NGCCallAgent/NGCCallAgent/participant",
  "jSkype/services/mediaAgent/helper",
  "jSkype/modelHelpers/personHelper",
  "jSkype/modelHelpers/contacts/dataMappers/dataMaps",
  "jSkype/services/NGCCallAgent/NGCCallAgent/telemetryConstants",
  "jSkype/services/NGCCallAgent/NGCCallAgent/constants",
  "jSkype/modelHelpers/calling/fallbackMessageHelper",
  "jSkype/services/pluginless/pluginlessTelemetry",
  "lodash-compat",
  "jSkype/services/preferences/settingsUtils/privacySettingsUtil"
], function (e) {
  function y(e, y, b, w) {
    function G(e) {
      return e && e.hasOwnProperty("errorWrappedWithTag");
    }
    function Y(e, t) {
      return t.catch(function (t) {
        throw {
          errorWrappedWithTag: !0,
          tag: e,
          value: t
        };
      });
    }
    function Z() {
      var e = o.task().resolve();
      return e.promise;
    }
    function et(e) {
      return e ? i.mediaStreamState.Started : i.mediaStreamState.Stopped;
    }
    function tt(e) {
      e.callHandlerTerminationInProgress = !0;
      var t = [
        M,
        D,
        P,
        H,
        B,
        j,
        F
      ];
      t.forEach(function (t) {
        t && t.promise.state() === "pending" && t.reject(e);
      });
    }
    function nt(e) {
      w.participants().forEach(function (t) {
        var n = e.indexOf(t.audio._sourceId()) !== -1, r = t.audio.isSpeaking();
        r !== n && (S.log("updating speaking status for", Rt(t), "to", n ? "active" : "inactive"), t.audio.isSpeaking._set(n));
      });
    }
    function rt(e) {
      return I || (I = C.endAsync(e)), I;
    }
    function it(e, t) {
      function n(e, t) {
        return e.code = p.CALL_END_CODE.MEDIA_ERROR, t.type === s.MEDIA_ERROR.permissionDeniedError ? (e.subCode = p.CALL_END_SUB_CODE.MEDIA_PERMISSION_ERROR, e.phrase = p.CALL_END_PHRASE.MEDIA_PERMISSION_ERROR, e) : (e.subCode = e.subCode || p.CALL_END_SUB_CODE.MEDIA_UNKNOWN_ERROR, e.phrase = e.phrase || p.CALL_END_PHRASE.MEDIA_ERROR, e);
      }
      return rt(n(e, t)).finally(function () {
        throw S.log("_endCallOnceWithMediaErrorAsync : Error.phrase  = " + t.message), t;
      });
    }
    function st(e) {
      T.sendMediaSessionStats({
        media: e,
        signaling: {
          TerminationRemote: U.remote,
          TerminationReasonCode: U.reasonCode,
          TerminationReasonSubCode: U.reasonSubCode,
          TerminationReasonPhrase: U.reasonPhrase
        }
      });
    }
    function ot(e, t) {
      U.remote = t, U.reasonCode = e.code, U.reasonSubCode = e.subCode, U.reasonPhrase = e.phrase, t && (A = e.code === p.CALL_END_CODE.NO_NGC_ENDPOINT, z = "remoteTerminated");
      if (A)
        tt(new Error(n.ERRORS.P2P_FALLBACK)), Jt(w.selfParticipant, i.callConnectionState.Disconnected, i.callDisconnectionReason.OutOfBrowserCall);
      else {
        e.code === p.CALL_END_CODE.P2P_FALLBACK_FOR_SCREENSHARING && d.sendScreenSharingFallbackMessage(w), tt(new Error("terminated"));
        var r = i.callDisconnectionReason.Terminated, s = i.callDisconnectionReason.Terminated;
        k ? !L && !t && z === "cancelCall" ? r = i.callDisconnectionReason.Canceled : !L && !t && z === "rejectCall" ? r = i.callDisconnectionReason.Busy : At(e) && (r = i.callDisconnectionReason.Missed) : !Tt() && w.participants(0) && (At(e) ? s = i.callDisconnectionReason.Missed : !L && t && (s = i.callDisconnectionReason.Busy));
      }
      qt(s), Jt(w.selfParticipant, i.callConnectionState.Disconnected, r);
    }
    function ut() {
      return tt(new Error("call ended by user")), rt();
    }
    function at() {
      var e = {}, t = new Date().getTime();
      e[h.CONTEXT_ID.DATA_VERSION] = "3", e[h.CONTEXT_ID.CORRELATIONID] = String(C.correlationId), e.CallNumber = "0", e.NegotiationNumber = String(X), e.NegotiationRequiredTime = String(t), e.MediaLegId = String(W.mediaLegId), e.Status = String(W.status), e.Retarget = "false", e.ReInvite = W.isRenegotiation ? "true" : "false", e.CreationTime = String(W.timeStamps.created * c), e.StartTime = String(W.timeStamps.started * c), e.CompleteTime = String(t * c);
      if (!W.isOfferer)
        e.Type = "answering", e.ProcessOfferTime = String(W.timeStamps.initialOfferArrived * c), e.CreateAnswerFinalTime = String(W.timeStamps.finalAnswerCreated * c), e.AnswerReadyProvisionalTime = String(W.timeStamps.offerProcessed * c), e.AnswerReadyFinalTime = String(W.timeStamps.modalitiesConfigured * c);
      else {
        var n = "0";
        e.Type = "offering", e.OfferReadyTime = String(W.timeStamps.offerCreated * c), e["ProcessAnswer_" + n + "_Final_Time"] = String(W.timeStamps.finalAnswerProcessed * c), e["ProcessAnswer_" + n + "_Final_Accepted"] = "true";
      }
      e.isGroupConversation = Tt() ? "1" : "0", W.result && (e.isComplete = W.result.isComplete ? "1" : "0", e.activeVideoModalities = String(W.result.activeModalities.video), e.activeAudioModalities = String(W.result.activeModalities.audio), e.configuredVideoModalities = String(W.result.configuredModalities.video), e.configuredAudioModalities = String(W.result.configuredModalities.audio)), e.timeCompleted = String((t - W.timeStamps.created) * c);
      for (var i in W.timeStamps)
        W.timeStamps.hasOwnProperty(i) && (e["time_" + i] = String((W.timeStamps[i] - W.timeStamps.created) * c));
      try {
        x.sendEvent(r.settings.telemetry.mdscToken, "mdsc_negotiation", e);
      } catch (s) {
        S.error("_sendNegotiationStats sendEvent failed", "error:", s.toString());
      }
    }
    function ft(e) {
      if (e.isComplete) {
        if (!Tt()) {
          var t = w.participants(0), n = a.hasReceiveDirectionality(e.activeModalities.video);
          g.checkVideoPolicySettings(t).then(function (e) {
            n = e ? n : !1, Vt(t, et(n));
          });
        }
        var r = a.hasSendDirectionality(e.activeModalities.video);
        Vt(w.selfParticipant, et(r));
      }
    }
    function lt(e) {
      return N.rejectNegotiationAsync(e).then(function (e) {
        return ft(e), e;
      });
    }
    function ct() {
      return N.completeNegotiationAsync().then(function (e) {
        return ft(e), e;
      });
    }
    function ht(e) {
      var t = yt();
      return t.microphone ? (!t.camera && a.hasSendDirectionality(e.video) && (e.video = a.removeSendDirectionality(e.video), S.warn("removed send direction from video modality due to missing camera selection")), R = R.then(function () {
        return N.configureModalitiesAsync(e);
      })) : R = R.then(function () {
        throw d.sendMicrophoneAccessFallbackMessage(w), new Error("cannot configure modalities without microphone selection");
      }), R;
    }
    function pt(e) {
      return O.hasOwnProperty(e);
    }
    function dt(e) {
      O[e].dispose(), delete O[e];
    }
    function vt() {
      try {
        m.forOwn(O, function (e, t) {
          dt(t);
        });
      } catch (e) {
        S.error("removing renderers should never fail:", e);
      }
    }
    function mt() {
      try {
        N.terminate();
      } catch (e) {
        S.error("terminating media session should never fail:", e);
      }
    }
    function gt() {
      N && (vt(), mt(), Z().then(function () {
        return N.getStatsAsync();
      }).then(function (e) {
        st(e);
      }).catch(function (e) {
        S.error("failed to obtain media session stats:", e);
      }).finally(function () {
        N = null;
      }));
    }
    function yt() {
      var e = t.get().devicesManager, n = y.getDeviceManager(), r = {};
      return e.selectedCamera() && (r.camera = e.selectedCamera().deviceId()), e.selectedMicrophone() && (r.microphone = e.selectedMicrophone().deviceId()), n.selectDevices(r), r;
    }
    function bt() {
      N || (N = y.createSession(V, C.correlationId, {
        isRemoteClientLync: !Tt() && w.participants(0).person._type() === l.contactTypes.lync,
        isConference: Tt()
      }));
    }
    function wt(e, t, n) {
      function r(e) {
        return e === "sendrecv" || e === "sendonly";
      }
      S.log("onParticipantUpdated", e);
      if (!e)
        return;
      var i = f.getId(e.id), s, o;
      for (var u = 0; u < e.mediaStreams.length; u++) {
        var a = e.mediaStreams[u], l = et(r(a.direction));
        a.type === "audio" ? o = {
          streamState: l,
          sourceId: a.sourceId
        } : a.type === "video" && Yt() && (s = {
          streamState: l,
          sourceId: a.sourceId
        });
      }
      St(i, s, o, t, n);
    }
    function Et(e) {
      var t = e.person.id();
      if (pt(t)) {
        var n = O[t], r = e.video._sourceId();
        n.subscribeVideoAsync(r).then(function () {
          S.log("renderer subscribed", "to:", t, "sourceId:", r);
        }).catch(function (r) {
          n === O[t] && (S.error("subscribeVideoAsync failed:", r), Vt(e, i.mediaStreamState.Stopped));
        });
      }
    }
    function St(e, t, n, r, s) {
      if (r || s || t || n) {
        var o = r ? zt(e) : Wt(e);
        if (o) {
          if (r || s)
            o.video._sourceId(void 0), o.audio._sourceId(void 0);
          if (s) {
            Vt(o, i.mediaStreamState.Stopped), Jt(o, i.callConnectionState.Disconnected);
            return;
          }
          r && Jt(o, i.callConnectionState.Connected), n && (o.audio._sourceId(n.sourceId), S.log("updated participant", Rt(o), "audio msi:", n.sourceId)), t && (o.video._sourceId(t.sourceId), S.log("updated participant", Rt(o), "video msi:", t.sourceId), Vt(o, t.streamState), Et(o));
        }
      }
    }
    function xt() {
      !k && w.isGroupConversation() && (w.participantsCount() > 1 || Ct()) && (S.log("configuring outgoing call as multiparty"), C.setMultiParty());
    }
    function Tt() {
      return C.multiParty;
    }
    function Nt(e, t, n) {
      if (w.isGroupConversation() && w.activeModalities.audio()) {
        S.log("_initiateSignalingSession : joining existing conversation"), C.joinGivenConversation(w._ngcJoinUrl, w._ngcCorrelationId, e, Ht(t), n);
        return;
      }
      w.isGroupConversation() && C.setThreadId(w.conversationId), It(), S.log("_initiateSignalingSession : starting new call. suppressDialout = " + Ct()), C.startOutgoingCall(e, Ht(t), Ct(), n);
    }
    function Ct() {
      return !!w._autoCall;
    }
    function kt(e) {
      var t = y.getDeviceManager();
      return (e ? t.muteInputAsync() : t.unmuteInputAsync()).then(function () {
        return e;
      }).catch(function (t) {
        return S.error("failed to toggle microphone mute:", t), !e;
      });
    }
    function Lt(e) {
      var t = Bt(!0, e);
      return ht(t).then(function () {
        var e = a.hasSendDirectionality(t.video);
        Vt(w.selfParticipant, et(e));
        var n = w.selfParticipant.video.channels(0);
        n && n.isStarted.set._enabled(!0);
      }).catch(function (e) {
        Vt(w.selfParticipant, et(!1)), S.error("startStopLocalVideoAsync failed", "error:", e);
      });
    }
    function At(e) {
      return e.code === p.CALL_END_CODE.CANCEL || e.code === p.CALL_END_CODE.TIMEOUT;
    }
    function Ot(e) {
      H.resolve(e.mediaContent);
    }
    function Mt(e) {
      B.resolve(e.mediaContent);
    }
    function _t(e) {
      D.resolve(e);
    }
    function Dt() {
      var e = 0, t = 1, n = 2;
      q = q.then(function () {
        return ++X, W = {
          isOfferer: !0,
          isRenegotiation: !0,
          mediaLegId: "",
          timeStamps: { created: new Date().getTime() }
        }, S.log("begin renegotiation offer"), Y(e, N.createOfferAsync());
      }).then(function (e) {
        return W.timeStamps.offerCreated = new Date().getTime(), W.mediaLegId = e.mediaContent.mediaLegId, B = o.task(), Y(t, C.startRenegotiationAsync(e.mediaContent, Ht(e.modalities), W.timeStamps.offerCreated - W.timeStamps.created));
      }).then(function () {
        return W.timeStamps.renegotiationStarted = new Date().getTime(), Y(n, B.promise);
      }).then(function (t) {
        return W.timeStamps.answerArrived = new Date().getTime(), Y(e, N.processAnswerAsync(t, !1));
      }).then(function () {
        return W.timeStamps.answerProcessed = new Date().getTime(), ct();
      }).then(function (e) {
        W.status = "Succeeded", W.result = e;
      }).catch(function (e) {
        if (G(e) && !e.value.callHandlerTerminationInProgress) {
          var r = s.RENEGOTIATION_ERROR.local;
          return S.warn("renegotiate", "error:", e), e.tag === t ? r = s.RENEGOTIATION_ERROR.glare : e.tag === n && (e.value.code === 491 && e.value.subCode === 10029 ? r = s.RENEGOTIATION_ERROR.glare : e.value.code === 415 ? r = s.RENEGOTIATION_ERROR.media : r = s.RENEGOTIATION_ERROR.signaling), W.status = "ErrorLocalInternal-" + r, lt(r);
        }
        throw W.status = "ErrorLocalInternal-untagged", e;
      }).catch(function (e) {
        return W.status = "ErrorLocalInternal-fatal", S.error("renegotiation failed", "error:", e), it({
          subCode: p.CALL_END_SUB_CODE.MEDIA_RENEGOTIATION_ERROR,
          phrase: p.CALL_END_PHRASE.MEDIA_RENEGOTIATION_ERROR
        }, e);
      }).finally(function () {
        at(), S.log("end renegotiation offer");
      });
    }
    function Pt(e) {
      var t = 0, n = 1;
      q = q.then(function () {
        ++X, W = {
          isOfferer: !1,
          isRenegotiation: !0,
          mediaLegId: "",
          timeStamps: { created: new Date().getTime() }
        }, K = e.mediaTypes || [];
        var n = e.mediaContent;
        S.log("begin renegotiation answer");
        if (n.escalationOccurring)
          throw S.error("renegotiation answer: giving up on escalation scenario"), new Error("escalation scenario is not supported");
        return Zt(), Y(t, N.processOfferAsync(n));
      }).then(function () {
        return W.timeStamps.offerProcessed = new Date().getTime(), Y(t, N.createAnswerAsync(!1));
      }).then(function (e) {
        return W.timeStamps.answerCreated = new Date().getTime(), W.mediaLegId = e.mediaContent.mediaLegId, P = o.task(), Y(n, C.acceptRenegotiationAsync(e.mediaContent, Ht(e.modalities), W.timeStamps.answerCreated - W.timeStamps.created));
      }).then(function () {
        return W.timeStamps.renegotiationAccepted = new Date().getTime(), Y(n, P.promise);
      }).then(function () {
        return W.timeStamps.mediaAcknowledged = new Date().getTime(), ct();
      }).then(function (e) {
        W.status = "Succeeded", W.result = e;
      }).catch(function (e) {
        if (G(e) && !e.value.callHandlerTerminationInProgress)
          return S.warn("handleMediaRenegotiationOffer", "error:", e), Z().then(function () {
            var n = e.tag === t ? s.RENEGOTIATION_ERROR.local : s.RENEGOTIATION_ERROR.signaling;
            return W.status = "ErrorLocalInternal-" + n, lt(n);
          }).then(function () {
            if (e.tag < n)
              return C.rejectRenegotiationAsync();
          });
        throw W.status = "ErrorLocalInternal-untagged", e;
      }).catch(function (e) {
        return W.status = "ErrorLocalInternal-fatal", S.error("handleMediaRenegotiationOffer failed", "error:", e), it({
          subCode: p.CALL_END_SUB_CODE.MEDIA_RENEGOTIATION_ERROR,
          phrase: p.CALL_END_PHRASE.MEDIA_RENEGOTIATION_ERROR
        }, e);
      }).finally(function () {
        at(), S.log("end renegotiation answer");
      });
    }
    function Ht(e) {
      var t = [];
      return e.audio && t.push(p.MEDIA_TYPES.AUDIO), e.video && t.push(p.MEDIA_TYPES.VIDEO), t;
    }
    function Bt(e, t) {
      function n(e) {
        return e ? s.MEDIA_STATE.sendReceive : s.MEDIA_STATE.receive;
      }
      return {
        audio: n(e),
        video: Yt() ? n(t) : void 0
      };
    }
    function jt(e) {
      return new u({
        displayName: e.displayName(),
        id: f.getKey(e.id(), e._type())
      });
    }
    function Ft(e) {
      S.log("_addParticipantToCall", e.person.id()), Jt(e, i.callConnectionState.Connecting), F.promise.then(function () {
        Jt(e, i.callConnectionState.Ringing);
      }), C.addParticipantAsync(jt(e.person)).then(function (e) {
        wt(e, !0);
      }).catch(function () {
        Jt(e, i.callConnectionState.Disconnected, i.callDisconnectionReason.Refused);
      });
    }
    function It() {
      var e = w.participants, t = e.subscribe();
      e().forEach(Ft), t.dispose();
    }
    function qt(e) {
      var t = w.participants, n = t.subscribe();
      t().forEach(function (t) {
        Jt(t, i.callConnectionState.Disconnected, e);
      }), n.dispose();
    }
    function Rt(e) {
      return (w.selfParticipant === e ? "* " : "") + e.person.id();
    }
    function Ut(e) {
      return w.selfParticipant.person.id() === e;
    }
    function zt(e) {
      return Wt(e);
    }
    function Wt(e) {
      return Ut(e) ? w.selfParticipant : Xt(function (t) {
        return t.person.id() === e;
      });
    }
    function Xt(e) {
      var t = w.participants, n = t.subscribe(), r = null;
      return t().some(function (t) {
        if (e(t))
          return r = t, !0;
      }), n.dispose(), r;
    }
    function Vt(e, t) {
      var n = e.video.channels(0);
      if (n) {
        var r = n.stream.state(), s = r === i.mediaStreamState.Active || r === i.mediaStreamState.Inactive;
        if (r === t || s && t === i.mediaStreamState.Started)
          return;
        S.log("updateVideoChannelStreamState", Rt(e), "state:", r, "->", t), n.stream.state._set(t);
      }
    }
    function $t(e, t, n, r) {
      var i = e.video.channels(0);
      if (i) {
        var s = i.stream.state();
        S.log("updateVideoChannelStreamStateAndSize", Rt(e), "state:", s, "->", t, "size:", n, r), i.stream.state._set(t), i.stream.width._set(n), i.stream.height._set(r);
      }
    }
    function Jt(e, t, n) {
      function s(t, n, r) {
        return S.log("updateParticipantAVState", Rt(e), "state:", t, "->", n, "reason", r), e.audio.state._set(n, r), e.video.state._set(n, r), e.screenSharing.state._set(n, r), n;
      }
      var r = e.audio.state();
      r === t || r === i.callConnectionState.Disconnected && t === i.callConnectionState.Disconnecting || r === i.callConnectionState.Connected && t === i.callConnectionState.Notified || r === i.callConnectionState.Connected && t === i.callConnectionState.Connecting || r === i.callConnectionState.Connected && t === i.callConnectionState.Ringing || r === i.callConnectionState.Ringing && t === i.callConnectionState.Connecting ? S.log("updateParticipantAVState ignored, invalid states", Rt(e), "currentState:", r, "newState", t) : (t === i.callConnectionState.Disconnected && r !== i.callConnectionState.Disconnecting ? r = s(r, i.callConnectionState.Disconnecting, n) : t === i.callConnectionState.Connected && r !== i.callConnectionState.Connecting && r !== i.callConnectionState.Ringing ? r = s(r, i.callConnectionState.Connecting) : t === i.callConnectionState.Ringing && r !== i.callConnectionState.Connecting && (r = s(r, i.callConnectionState.Connecting)), s(r, t, n));
    }
    function Kt() {
      function n(r) {
        e || (S.log("enableVideoWhenVideoChannelAdded", Rt(t), "state:", r.stream.state(), "isStarted:", r.isStarted()), e = r.isStarted(!0), t.video.channels.added.off(n));
      }
      var e, t = w.selfParticipant;
      S.log("enableVideoWhenVideoChannelAdded", Rt(t)), t.video.channels.added(n);
    }
    function Qt(e, t) {
      N && t === "UserSelection" && yt();
    }
    function Gt(e, t) {
      N && t === "UserSelection" && yt();
    }
    function Yt() {
      return y.getCapabilities().video;
    }
    function Zt() {
      var e = function () {
        return K.some(function (e) {
          return p.MEDIA_TYPES.VIDEO === e;
        });
      };
      !Yt() && e() && !Q && (S.log("remote participant added video modality, reminding user of missing video capability"), d.sendNoVideoCapabilityMessage(w), Q = !0);
    }
    var E = this, S = e.getLogger().createChild("CallHandler"), x = t.get()._telemetryManager, T = v.build({
        telemetryManager: x,
        token: r.settings.telemetry.mdscToken,
        logger: S
      }), N = null, C = null, k = !1, L = !1, A = !1, O = {}, M = null, D = o.task(), P = o.task(), H = o.task(), B = o.task(), j = o.task(), F = o.task(), I = null, q = Z(), R = Z(), U = {
        remote: !1,
        reasonCode: p.CALL_END_CODE.SUCCESS,
        reasonSubCode: p.CALL_END_SUB_CODE.SUCCESS,
        reasonPhrase: "none"
      }, z = "unknown", W = null, X = 0, V = {
        onNegotiationRequired: function () {
          M ? M.resolve() : Dt();
        },
        onSessionErrorOccurred: function (e) {
          it({
            subCode: p.CALL_END_SUB_CODE.MEDIA_DROP_AFTER_CONNECT,
            phrase: p.CALL_END_PHRASE.MEDIA_DROP_AFTER_CONNECT
          }, e);
        },
        onContributingSourcesChanged: nt
      }, $, J, K = [], Q;
    this.placeCall = function (e) {
      S.log("placeCall", w);
      var t = Bt(!0, e);
      return q = q.then(function () {
        return ++X, W = {
          isOfferer: !0,
          isRenegotiation: !1,
          mediaLegId: "",
          timeStamps: { created: new Date().getTime() }
        }, M = o.task(), xt(), bt(), ht(t);
      }).then(function () {
        return W.timeStamps.modalitiesConfigured = new Date().getTime(), a.hasSendDirectionality(t.video) && Kt(), M.promise;
      }).then(function () {
        return W.timeStamps.initialNegotiationRequested = new Date().getTime(), N.createOfferAsync();
      }).then(function (e) {
        W.mediaLegId = e.mediaContent.mediaLegId, W.timeStamps.offerCreated = new Date().getTime(), Nt(e.mediaContent, e.modalities, W.timeStamps.offerCreated - W.timeStamps.created);
      }).then(function () {
        return H.promise;
      }).then(function (e) {
        return N.processAnswerAsync(e, !1);
      }).then(function () {
        return W.timeStamps.finalAnswerProcessed = new Date().getTime(), j.promise;
      }).then(function () {
        return M = null, ct();
      }).then(function (e) {
        W.status = "Succeeded", W.result = e;
      }).catch(function (e) {
        return W.status = "ErrorLocalInternal-fatal", S.error("placeCall failed", "error:", e), it({
          subCode: p.CALL_END_SUB_CODE.MEDIA_DROP_DURING_CONNECT,
          phrase: p.CALL_END_PHRASE.MEDIA_DROP_DURING_CONNECT
        }, e);
      }).finally(function () {
        at(), S.log("end placeCall");
      }), q;
    }, this.acknowledge = function () {
      if (w._callData.wasNGCPayloadProcessed())
        return S.log("acknowledge, NGC payload was processed"), Promise.resolve();
      S.log("acknowledge", w);
      var e = w._callData.getIncomingNGCPayload();
      return q = q.then(function () {
        ++X, W = {
          isOfferer: !1,
          isRenegotiation: !1,
          mediaLegId: "",
          timeStamps: { created: new Date().getTime() }
        }, W.timeStamps.started = new Date().getTime(), k = !0, xt(), C.handleIncomingCall(e);
      }).then(function () {
        return W.timeStamps.incomingCallHandled = new Date().getTime(), D.promise;
      }).then(function (e) {
        K = e.mediaTypes || [];
        var t = e.mediaContent;
        return W.timeStamps.initialOfferArrived = new Date().getTime(), bt(), N.processOfferAsync(t);
      }).then(function () {
        W.timeStamps.offerProcessed = new Date().getTime(), E.onCallStatusChanged(p.CALL_STATUS.RINGING);
      }).catch(function (e) {
        return S.error("acknowledge failed", "error:", e.toString()), it({
          subCode: p.CALL_END_SUB_CODE.MEDIA_DROP_DURING_CONNECT,
          phrase: p.CALL_END_PHRASE.MEDIA_DROP_DURING_CONNECT
        }, e);
      }), q;
    }, this.acceptCall = function (e) {
      S.log("acceptCall");
      var t = Bt(!0, e);
      return q = q.then(function () {
        return Zt(), ht(t);
      }).then(function () {
        return W.timeStamps.modalitiesConfigured = new Date().getTime(), a.hasSendDirectionality(t.video) && Kt(), N.createAnswerAsync(!1);
      }).then(function (e) {
        return W.timeStamps.finalAnswerCreated = new Date().getTime(), W.mediaLegId = e.mediaContent.mediaLegId, C.acceptAsync(e.mediaContent, Ht(e.modalities), W.timeStamps.finalAnswerCreated - W.timeStamps.modalitiesConfigured);
      }).then(function () {
        return W.timeStamps.signalingSessionAccepted = new Date().getTime(), j.promise;
      }).then(function () {
        return W.timeStamps.callConnected = new Date().getTime(), ct();
      }).then(function (e) {
        W.status = "Succeeded", W.result = e;
      }).catch(function (e) {
        return W.status = "ErrorLocalInternal-fatal", S.error("acceptCall failed", "error:", e), it({
          subCode: p.CALL_END_SUB_CODE.MEDIA_DROP_DURING_CONNECT,
          phrase: p.CALL_END_PHRASE.MEDIA_DROP_DURING_CONNECT
        }, e);
      }).finally(function () {
        at(), S.log("end acceptCall");
      }), q;
    }, this.rejectCall = function () {
      return S.log("rejectCall"), z = "rejectCall", ut().catch(function (e) {
        Jt(w.selfParticipant, i.callConnectionState.Disconnected, i.callDisconnectionReason.Failed), S.error("rejectCall failed", "error:", e);
      });
    }, this.cancelCall = function () {
      return S.log("cancelCall"), z = "cancelCall", ut().catch(function (e) {
        Jt(w.selfParticipant, i.callConnectionState.Disconnected, i.callDisconnectionReason.Failed), S.error("cancelCall failed", "error:", e);
      });
    }, this.endCall = function () {
      return S.log("endCall"), z = "endCall", ut().catch(function (e) {
        Jt(w.selfParticipant, i.callConnectionState.Disconnected, i.callDisconnectionReason.Failed), S.error("endCall failed", "error:", e);
      });
    }, this.dispose = function () {
      S.log("dispose"), tt(new Error("terminated")), gt(), $.dispose(), J.dispose(), w.mediaConnectionType(i.mediaConnectionType.Unknown);
    }, this.setSoundLevelEventMode = function (e) {
      return S.log("setSoundLevelEventMode", "options:", e), o.task().resolve(null).promise;
    }, this.mute = function () {
      return kt(!0);
    }, this.unmute = function () {
      return kt(!1);
    }, this.startParticipantVideo = function (e, t) {
      S.log("startParticipantVideo", e, t);
      if (Ut(e) && t === n.PLUGIN_MEDIA_TYPES.VIDEO)
        return Lt(!0);
    }, this.stopParticipantVideo = function (e, t) {
      S.log("stopParticipantVideo", e, t);
      if (Ut(e) && t === n.PLUGIN_MEDIA_TYPES.VIDEO)
        return Lt(!1);
    }, this.attachParticipantVideo = function (e, t) {
      S.log("attachParticipantVideo", e, t);
      if (Yt() && !pt(e)) {
        var n = Wt(e), r = !1, s = {
            onVideoSizeChanged: function (e, t) {
              var s = e > 0 && t > 0;
              s ? $t(n, i.mediaStreamState.Active, e, t) : r && !s && Vt(n, i.mediaStreamState.Inactive), r = s;
            }
          };
        n === w.selfParticipant ? (yt(), O[e] = y.getDeviceManager().createPreviewRenderer(t, s), O[e].startVideoAsync().catch(function (e) {
          S.error("failed to start preview video renderer", e), Vt(w.selfParticipant, et(!1));
        })) : (S.log("creating renderer for", e), O[e] = O[e] || N.createRemoteRenderer(t, s), Et(n));
      }
    }, this.detachParticipantVideo = function (e, t) {
      S.log("detachParticipantVideo", e, t), n.PLUGIN_MEDIA_TYPES.VIDEO === t && pt(e) && dt(e);
    }, this.requestCallInfo = function () {
      S.log("requestCallInfo");
      var e = o.task();
      if (C && C.correlationId) {
        var t = "\r\nCallInformation\r\n * CallId=" + C.correlationId + "\r\n" + " * Establishment Technology=NGC (plugin-free)";
        e.resolve(t);
      } else
        e.reject("CallInformation not available");
      return e.promise;
    }, this.getRemoteParticipantCollection = function () {
      return w.participants();
    }, this.onParticipantJoined = function (e) {
      S.log("onParticipantJoined", e), wt(e, !0);
    }, this.onParticipantUpdated = function (e) {
      S.log("onParticipantUpdated", e), wt(e);
    }, this.onParticipantRemoved = function (e) {
      S.log("onParticipantRemoved", e), wt(e, !1, !0);
    }, this.onConversationUpdated = function (e) {
      S.log("onConversationUpdated", "threadId:", e.threadId);
    }, this.onReTargetCompletedSuccess = function () {
      S.log("onReTargetCompletedSuccess");
    }, this.onReTargetCompletedFailure = function (e) {
      S.log("onReTargetCompletedFailure", "details:", e);
    }, this.onOffer = function (e) {
      e.renegotiation ? Pt(e) : _t(e);
    }, this.onAnswer = function (e) {
      S.log("onAnswer", "provisional:", e.provisional, "renegotiation:", e.renegotiation, "mediaTypes:", e.mediaTypes), e.renegotiation ? Mt(e) : e.provisional || Ot(e);
    }, this.onMediaAcknowledgementSuccess = function (e) {
      S.log("onMediaAcknowledgementSuccess", "isRenegotiation:", e), P.resolve();
    }, this.onMediaAcknowledgementFailure = function (e, t) {
      S.log("onMediaAcknowledgementFailure", "isRenegotiation:", e), P.reject(t);
    }, this.onMediaRenegotiationRejection = function (e) {
      S.log("onMediaRenegotiationRejection", "error:", e), B.reject(e);
    }, this.onCallStatusChanged = function (e, t) {
      S.log("onCallStatusChanged", e, t), C.correlationId && w.audioService.callId._set(C.correlationId), C.participantManager && (w._callData.ngcParticipantId(C.participantManager.localParticipant.participantId), w._callData.ngcEndpointId(C.participantManager.localParticipant.endpointId)), e === p.CALL_STATUS.RINGING ? (k && Jt(w.selfParticipant, i.callConnectionState.Notified), F.resolve()) : e === p.CALL_STATUS.CONNECTED ? (L = !0, j.resolve(), Jt(w.selfParticipant, i.callConnectionState.Connected)) : (e === p.CALL_STATUS.LOCAL_TERMINATED || e === p.CALL_STATUS.REMOTE_TERMINATED) && ot(t, p.CALL_STATUS.REMOTE_TERMINATED === e);
    }, function () {
      S.log("construct");
      var e = jt(w.selfParticipant.person);
      C = b.getNewSignalingSession(e, E), $ = t.get().devicesManager.selectedCamera.changed(Gt), J = t.get().devicesManager.selectedCamera.changed(Qt), S.log("unmuting microphone for a new call"), y.getDeviceManager().unmuteInputAsync().catch(function (e) {
        S.error("failed to unmute microphone during call setup:", e);
      }), w.mediaConnectionType(i.mediaConnectionType.Pluginless);
    }();
  }
  var t = e("jSkype/client"), n = e("constants/calling"), r = e("jSkype/settings"), i = e("swx-enums"), s = e("jSkype/services/mediaAgent/constants"), o = e("jcafe-property-model"), u = e("jSkype/services/NGCCallAgent/NGCCallAgent/participant"), a = e("jSkype/services/mediaAgent/helper"), f = e("jSkype/modelHelpers/personHelper"), l = e("jSkype/modelHelpers/contacts/dataMappers/dataMaps"), c = 10000, h = e("jSkype/services/NGCCallAgent/NGCCallAgent/telemetryConstants"), p = e("jSkype/services/NGCCallAgent/NGCCallAgent/constants"), d = e("jSkype/modelHelpers/calling/fallbackMessageHelper"), v = e("jSkype/services/pluginless/pluginlessTelemetry"), m = e("lodash-compat"), g = e("jSkype/services/preferences/settingsUtils/privacySettingsUtil");
  return y;
})
