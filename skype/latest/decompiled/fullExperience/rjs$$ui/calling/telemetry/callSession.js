define("ui/calling/telemetry/callSession", [
  "require",
  "exports",
  "module",
  "utils/calling/callingStack",
  "constants/common",
  "ui/modelHelpers/conversationHelper",
  "swx-enums",
  "swx-utils-common",
  "swx-utils-common",
  "experience/settings",
  "ui/telemetry/telemetryClient"
], function (e, t) {
  function l(e, t) {
    function w(e) {
      function n(e) {
        return e === s.mediaStreamState.Active;
      }
      function r(e) {
        return !n(e);
      }
      var t = u.build();
      return t.pause(), h.push(e.state.when(n, t.resume.bind(t))), h.push(e.state.when(r, t.pause.bind(t))), t;
    }
    function E() {
      e.selfParticipant.video.channels(0) && (n.outboundVideo = w(e.selfParticipant.video.channels(0).stream)), n.outboundScreenshare = w(e.selfParticipant.screenSharing.stream);
    }
    function S() {
      var t = e.participants.added(function (e) {
        var t = w(e.video.channels(0).stream);
        n.inboundVideoCollection.push(t);
        var r = w(e.screenSharing.stream);
        n.inboundScreenshareCollection.push(r);
      });
      h.push(t);
    }
    function x(e) {
      if (e.length === 0)
        return "0";
      var t = e.map(function (e) {
        return e.durationInSeconds();
      });
      return Math.max.apply(null, t).toString();
    }
    function T(e) {
      return e ? e.durationInSeconds().toString() : "0";
    }
    function N(t) {
      var n = r.telemetry.calling.NA;
      return e.isGroupConversation() && e.conversationId && (n = e.conversationId), {
        name: t,
        mediaConnectionType: b,
        callSessionId: d,
        isGroupCall: e.isGroupConversation(),
        conversation_id: n,
        call_leg_direction: A(),
        call_type: O(),
        conversation_members: e.participantsCount() + 1,
        wasEscalated: c
      };
    }
    function C(e) {
      p.sendEvent(a.telemetry.uiTenantToken, r.telemetry.calling.MASTER_EVENT, e);
    }
    function k(n) {
      if (t)
        return n ? s.callDisconnectionReason.Terminated : L(e.selfParticipant);
      var r = e.selfParticipant.audio.state.reason === s.callDisconnectionReason.OutOfBrowserCall, i = !e.isGroupConversation();
      return n ? s.callDisconnectionReason.Terminated : r ? s.callDisconnectionReason.OutOfBrowserCall : i ? L(e.participants(0)) : L(e.selfParticipant);
    }
    function L(e) {
      return e && e.audio.state.reason || s.callDisconnectionReason.Terminated;
    }
    function A() {
      return t ? r.telemetry.calling.direction.INCOMING : r.telemetry.calling.direction.OUTGOING;
    }
    function O() {
      return e.isGroupConversation() ? r.telemetry.calling.callType.S2S : i.isConversationWithPstn(e) ? t ? r.telemetry.calling.callType.SkypeIn : r.telemetry.calling.callType.SkypeOut : r.telemetry.calling.callType.S2S;
    }
    function M(e) {
      e !== s.mediaConnectionType.Unknown && (b = e);
    }
    function _() {
      e.mediaConnectionType && h.push(e.mediaConnectionType.changed(M));
    }
    function D() {
      h.forEach(function (e) {
        e.dispose && e.dispose();
      });
    }
    var n = {
        callStarted: u.build(),
        callDuration: null,
        outboundVideo: null,
        outboundScreenshare: null,
        inboundVideoCollection: [],
        inboundScreenshareCollection: []
      }, l = {
        NotStarted: 0,
        Started: 1,
        Ringing: 2,
        Connected: 3,
        Ended: 4
      }, c = !1, h = [], p = f.get(), d = o.create(), v, m, g, y = l.NotStarted, b = s.mediaConnectionType.Unknown;
    this.isChildOf = function (t) {
      return e === t;
    }, this.start = function () {
      if (y >= l.Started)
        return;
      g = new Date().getTime(), y = l.Started, _(), e.selfParticipant.audio.state.reason === s.callDisconnectionReason.CallEscalated && (c = !0);
      var t = N(r.telemetry.calling.START_CALL);
      t.audioAvailability = e.audioService.start.enabled.reason || r.telemetry.calling.AVAILABLE, C(t);
    }, this.setRinging = function () {
      if (y === l.Ringing)
        return;
      if (y === l.Connected)
        return;
      y = l.Ringing;
      var e = N(r.telemetry.calling.RINGING_CALL);
      m = T(n.callStarted), C(e);
    }, this.setConnected = function () {
      if (y === l.Connected)
        return;
      if (y === l.NotStarted)
        return;
      if (y === l.Ended)
        return;
      E(), S(), y = l.Connected, n.callDuration = u.build(), v = T(n.callStarted), C(N(r.telemetry.calling.CONNECTED_CALL));
    }, this.end = function () {
      var t, s, o, u = r.telemetry.calling.UNAVAILABLE;
      if (y === l.NotStarted) {
        D();
        return;
      }
      if (y === l.Ended) {
        D();
        return;
      }
      e.audioService.callId && e.audioService.callId() && (u = e.audioService.callId()), t = y === l.Connected, s = t || y === l.Ringing, y = l.Ended, o = N(r.telemetry.calling.END_CALL), o.wasConnected = t, o.timeToCancelCall = t ? "0" : T(n.callStarted), o.timeToConnect = t ? v : "0", o.wasAtLeastOnceParticipantOnline = i.isAtLeastOnceParticipantOnline(e), o.timeToRing = m || "0", o.call_id = u, o.call_end_reason = k(t), o.start_timestamp = g || "undefined", o.end_timestamp = new Date().getTime(), o.call_leg_duration_sec = T(n.callDuration), o.call_leg_successful = s, o.inbound_video_duration_sec = x(n.inboundVideoCollection), o.outbound_video_duration_sec = T(n.outboundVideo), o.screenshare_duration_sec = T(n.outboundScreenshare), o.screenshare_inbound_duration_sec = x(n.inboundScreenshareCollection), C(o), D();
    };
  }
  function c() {
    var e = function () {
    };
    this.start = e, this.setRinging = e, this.setConnected = e, this.end = e, this.escalate = e;
  }
  function h(e) {
    return e.selfParticipant.audio.state.reason === s.callDisconnectionReason.OutOfBrowserCall;
  }
  function p(e, t, r) {
    return !n.get().isInBrowserCallingSupported() || h(e) ? new c() : new l(e, t, r);
  }
  var n = e("utils/calling/callingStack"), r = e("constants/common"), i = e("ui/modelHelpers/conversationHelper"), s = e("swx-enums"), o = e("swx-utils-common").guid, u = e("swx-utils-common").stopwatch, a = e("experience/settings"), f = e("ui/telemetry/telemetryClient");
  t.buildOutgoingCallSession = function (e) {
    return p(e, !1);
  }, t.buildIncomingCallSession = function (e) {
    return p(e, !0);
  };
})
