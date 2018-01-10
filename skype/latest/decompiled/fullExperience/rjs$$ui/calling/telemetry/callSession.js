define("ui/calling/telemetry/callSession", [
  "require",
  "exports",
  "module",
  "swx-util-calling-stack",
  "swx-log-tracer",
  "swx-constants",
  "ui/modelHelpers/conversationHelper",
  "swx-enums",
  "swx-utils-common",
  "swx-utils-common",
  "experience/settings",
  "ui/telemetry/telemetryClient"
], function (e, t) {
  function c(e, t) {
    function S(e) {
      function n(e) {
        return e === o.mediaStreamState.Active;
      }
      function r(e) {
        return !n(e);
      }
      var t = a.build();
      return t.pause(), d.push(e.state.when(n, t.resume.bind(t))), d.push(e.state.when(r, t.pause.bind(t))), t;
    }
    function x() {
      e.selfParticipant.video.channels(0) && (n.outboundVideo = S(e.selfParticipant.video.channels(0).stream));
      n.outboundScreenshare = S(e.selfParticipant.screenSharing.stream);
    }
    function T() {
      var t = e.participants.added(function (e) {
        var t = S(e.video.channels(0).stream);
        n.inboundVideoCollection.push(t);
        var r = S(e.screenSharing.stream);
        n.inboundScreenshareCollection.push(r);
      });
      d.push(t);
    }
    function N(e) {
      if (e.length === 0)
        return "0";
      var t = e.map(function (e) {
        return e.durationInSeconds();
      });
      return Math.max.apply(null, t).toString();
    }
    function C(e) {
      return e ? e.durationInSeconds().toString() : "0";
    }
    function k(t) {
      var n = i.telemetry.calling.NA;
      e.isGroupConversation() && e.conversationId && (n = e.conversationId);
      var r = {
        name: t,
        mediaConnectionType: E,
        callSessionId: m,
        isGroupCall: e.isGroupConversation(),
        conversation_id: n,
        call_leg_direction: M(),
        call_type: _(),
        conversation_members: e.participantsCount() + 1,
        wasEscalated: h
      };
      return p > 0 && (r.connected_pstn_participants_upper_bound = p), r;
    }
    function L(e) {
      r.log("[CallSession] event", e.name, "data", e);
      v.sendEvent(f.telemetry.uiTenantToken, i.telemetry.calling.MASTER_EVENT, e);
    }
    function A(n) {
      if (t)
        return n ? o.callDisconnectionReason.Terminated : O(e.selfParticipant);
      var r = !e.isGroupConversation();
      return n ? o.callDisconnectionReason.Terminated : r ? O(e.participants(0)) : O(e.selfParticipant);
    }
    function O(e) {
      return e && e.audio.state.reason || o.callDisconnectionReason.Terminated;
    }
    function M() {
      return t ? i.telemetry.calling.direction.INCOMING : i.telemetry.calling.direction.OUTGOING;
    }
    function _() {
      return e.isGroupConversation() ? i.telemetry.calling.callType.S2S : s.isConversationWithPstn(e) ? t ? i.telemetry.calling.callType.SkypeIn : i.telemetry.calling.callType.SkypeOut : i.telemetry.calling.callType.S2S;
    }
    function D(e) {
      e !== o.mediaConnectionType.Unknown && (E = e);
    }
    function P() {
      e.mediaConnectionType && d.push(e.mediaConnectionType.changed(D));
    }
    function H() {
      e.selfParticipant.audio.state.reason === o.callDisconnectionReason.CallEscalated && (h = !0);
      var t = 0;
      e.participants.each(function (e) {
        e.audio.state() === o.callConnectionState.Connected && s.isPstnParticipant(e) && ++t;
      });
      p < t && (p = t);
    }
    function B() {
      d.forEach(function (e) {
        e.dispose && e.dispose();
      });
    }
    var n = {
        callStarted: a.build(),
        callDuration: null,
        outboundVideo: null,
        outboundScreenshare: null,
        inboundVideoCollection: [],
        inboundScreenshareCollection: []
      }, c = {
        NotStarted: 0,
        Started: 1,
        Ringing: 2,
        Connected: 3,
        Ended: 4
      }, h = !1, p = 0, d = [], v = l.get(), m = u.create(), g, y, b, w = c.NotStarted, E = o.mediaConnectionType.Unknown;
    this.isChildOf = function (t) {
      return e === t;
    };
    this.start = function () {
      if (w >= c.Started) {
        r.log("Call session has already started. You are trying to start it twice");
        return;
      }
      r.log("Call session started:", m);
      b = new Date().getTime();
      w = c.Started;
      P();
      H();
      var t = k(i.telemetry.calling.START_CALL);
      t.audioAvailability = e.audioService.start.enabled.reason || i.telemetry.calling.AVAILABLE;
      L(t);
    };
    this.setRinging = function () {
      if (w === c.Ringing) {
        r.log("Call is already ringing for another participant, skip ringing state");
        return;
      }
      if (w === c.Connected) {
        r.log("Call is already connected, skip ringing state");
        return;
      }
      w = c.Ringing;
      var e = k(i.telemetry.calling.RINGING_CALL);
      y = C(n.callStarted);
      L(e);
    };
    this.setConnected = function () {
      if (w === c.Connected) {
        r.log("You are trying to set a call session as connected but it is already in this state");
        return;
      }
      if (w === c.NotStarted) {
        r.log("You are trying to set a call session as connected that has not started");
        return;
      }
      if (w === c.Ended) {
        r.log("You are trying to set a call session as connected that has ended");
        return;
      }
      x();
      T();
      w = c.Connected;
      n.callDuration = a.build();
      g = C(n.callStarted);
      L(k(i.telemetry.calling.CONNECTED_CALL));
    };
    this.onParticipantStatusChanged = function () {
      H();
    };
    this.end = function () {
      var t, o, u, a = i.telemetry.calling.UNAVAILABLE;
      if (w === c.NotStarted) {
        r.log("You are trying to end a call session that was not started");
        B();
        return;
      }
      if (w === c.Ended) {
        r.log("You are trying to end a call session that has already ended");
        B();
        return;
      }
      e.audioService.callId && e.audioService.callId() && (a = e.audioService.callId());
      t = w === c.Connected;
      o = t || w === c.Ringing;
      w = c.Ended;
      u = k(i.telemetry.calling.END_CALL);
      u.wasConnected = t;
      u.timeToCancelCall = t ? "0" : C(n.callStarted);
      u.timeToConnect = t ? g : "0";
      u.wasAtLeastOnceParticipantOnline = s.isAtLeastOnceParticipantOnline(e);
      u.timeToRing = y || "0";
      u.call_id = a;
      u.call_end_reason = A(t);
      u.start_timestamp = b || "undefined";
      u.end_timestamp = new Date().getTime();
      u.call_leg_duration_sec = C(n.callDuration);
      u.call_leg_successful = o;
      u.inbound_video_duration_sec = N(n.inboundVideoCollection);
      u.outbound_video_duration_sec = C(n.outboundVideo);
      u.screenshare_duration_sec = C(n.outboundScreenshare);
      u.screenshare_inbound_duration_sec = N(n.inboundScreenshareCollection);
      u.screenshare_monitor_count = (e.screenSharingService.shareableResources && e.screenSharingService.shareableResources.size() || 0) + "";
      L(u);
      B();
    };
  }
  function h() {
    var e = function () {
    };
    this.start = e;
    this.setRinging = e;
    this.setConnected = e;
    this.onParticipantStatusChanged = e;
    this.end = e;
    this.escalate = e;
  }
  function p(e, t, r) {
    return n.get().isInBrowserCallingSupported() ? new c(e, t, r) : new h();
  }
  var n = e("swx-util-calling-stack"), r = e("swx-log-tracer").getLogger(), i = e("swx-constants").COMMON, s = e("ui/modelHelpers/conversationHelper"), o = e("swx-enums"), u = e("swx-utils-common").guid, a = e("swx-utils-common").stopwatch, f = e("experience/settings"), l = e("ui/telemetry/telemetryClient");
  t.buildOutgoingCallSession = function (e) {
    return p(e, !1);
  };
  t.buildIncomingCallSession = function (e) {
    return p(e, !0);
  };
});
