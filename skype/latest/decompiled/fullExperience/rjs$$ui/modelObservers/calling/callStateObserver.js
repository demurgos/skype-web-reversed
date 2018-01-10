define("ui/modelObservers/calling/callStateObserver", [
  "require",
  "exports",
  "module",
  "ui/calling/telemetry/callSession",
  "swx-util-calling-stack",
  "swx-constants",
  "telemetry/calling/pstn/creditBalanceTracker",
  "services/cqf/CQFHandler",
  "ui/modalDialog/deviceDisabledDialog",
  "swx-enums",
  "vendor/knockout",
  "notifications/factory",
  "notifications/common/notificationHub",
  "swx-pubsub-instance",
  "ui/viewModels/calling/callScreenViewModel/sounds",
  "ui/calling/unansweredCallHandler"
], function (e, t) {
  function v() {
    function g(t) {
      var n = T(t);
      n.participantsSubs = [];
      n.audioHandler = function (n, r, s) {
        s && (w(t, n, s), b(t), E(t, n));
        n === a.callConnectionState.Disconnecting && (r === a.callDisconnectionReason.MissingSpeaker ? c.notify(l.build(i.notifications.DEVICE_MISSING_SPEAKER)) : r === a.callDisconnectionReason.MissingMicrophone && c.notify(l.build(i.notifications.DEVICE_MISSING_MICROPHONE)));
        n === a.callConnectionState.Disconnected && e.activeCalls.remove(t);
      };
      n.videoHandler = function (e) {
        E(t, e);
      };
      n.onParticipantAudioStateChanged = function (e) {
        n.callSession && (n.callSession.onParticipantStatusChanged(), e === a.callConnectionState.Ringing && n.callSession.setRinging());
        (e === a.callConnectionState.Ringing || e === a.callConnectionState.EarlyMedia) && b(t);
      };
      n.participantAddedHandler = function (e) {
        var r = e.audio.state.changed(n.onParticipantAudioStateChanged), i = e.screenSharing.state.when(a.callConnectionState.Notified, S.bind(null, t, e));
        r.participant = e;
        i.participant = e;
        n.participantsSubs.push(r, i);
      };
      n.participantRemovedHandler = function (e) {
        n.participantsSubs = n.participantsSubs.filter(function (t) {
          return t.participant === e ? (t.dispose(), !1) : !0;
        });
      };
      n.getCallSession = function (e) {
        return n.callSession ? n.callSession : (e === a.callConnectionState.Notified || t.activeModalities.audio() ? n.callSession = y(t, !0) : n.callSession = y(t, !1), n.callSession);
      };
      n.clearCallSession = function () {
        delete n.callSession;
      };
      n.spawnedConversationStateChanged = function (e) {
        e && h.publish(i.events.navigation.OPEN_CONVERSATION, {
          model: e,
          origin: i.telemetry.historyLoadOrigin.CALLING
        });
      };
      t.participants.added(n.participantAddedHandler);
      t.participants.removed(n.participantRemovedHandler);
      t.selfParticipant.audio.state.changed(n.audioHandler);
      t.selfParticipant.video.state.changed(n.videoHandler);
      t.spawnedConversation && t.spawnedConversation.changed(n.spawnedConversationStateChanged);
    }
    function y(e, t) {
      return t ? n.buildIncomingCallSession(e) : n.buildOutgoingCallSession(e);
    }
    function b(e) {
      function r() {
        var t = e.participants().some(function (e) {
          return e.audio.state() === a.callConnectionState.EarlyMedia;
        });
        return t;
      }
      function i() {
        var t = e.participants().some(function (e) {
          return e.audio.state() === a.callConnectionState.Ringing;
        });
        return t;
      }
      var t = e.selfParticipant.audio.state(), n = e.selfParticipant.audio.state.reason;
      t === a.callConnectionState.Connected ? p.stopAll() : t === a.callConnectionState.Disconnected ? (p.stopAll(), n !== a.callDisconnectionReason.Busy && n !== a.callDisconnectionReason.Missed && n !== a.callDisconnectionReason.Canceled && n !== a.callDisconnectionReason.NotificationTimeout && n !== a.callDisconnectionReason.CallEscalated && p.playEndCall()) : r() ? p.stopAll() : i() && (p.stopAll(), p.playRingingOut());
    }
    function w(e, t, n) {
      var r = T(e), i = r.getCallSession(t);
      switch (t) {
      case a.callConnectionState.Notified:
        i.start(), i.setRinging();
        break;
      case a.callConnectionState.Connecting:
        i.start(), o.observe(e), d.observe(e);
        break;
      case a.callConnectionState.Connected:
        i.setConnected(), m.callConnected(e);
        break;
      case a.callConnectionState.Disconnecting:
        o.updateCallData(e);
        break;
      case a.callConnectionState.Disconnected:
        i.end(), r.clearCallSession(), m.callEnded(e), d.callEnded(), n !== a.callConnectionState.Disconnected && u.init();
      }
    }
    function E(t, n) {
      if (n !== a.callConnectionState.Connecting)
        return;
      r.get().isInBrowserCallingSupported() && h.publish(i.events.navigation.OPEN_CONVERSATION, {
        model: t,
        origin: i.telemetry.historyLoadOrigin.CALLING
      });
      e.activeCalls.indexOf(t) === -1 && e.activeCalls.push(t);
    }
    function S(e, t) {
      e.screenSharingService.sharer(t);
      e.screenSharingService.accept.enabled() && e.screenSharingService.accept();
    }
    function x(t) {
      var n = T(t);
      n && (n.conversation.selfParticipant.audio.state.changed.off(n.audioHandler), n.conversation.selfParticipant.video.state.changed.off(n.videoHandler), n.conversation.participants.added.off(n.participantAddedHandler), n.conversation.participants.removed.off(n.participantRemovedHandler), n.participantsSubs.forEach(function (e) {
        e.dispose();
      }), n.participantsSubs.length = 0, e.activeCalls.remove(t));
    }
    function T(e) {
      var t;
      for (var n = 0; n < v.length; n++) {
        t = v[n];
        if (t.conversation === e)
          return t;
      }
      return t = { conversation: e }, v.push(t), t;
    }
    var e = this, t, v = [], m = s.build();
    e.activeCalls = f.observableArray();
    e.observe = function (e) {
      t = e.conversationsManager.conversations;
      t.added(g);
      t.removed(x);
      m.init();
      d.init();
    };
  }
  var n = e("ui/calling/telemetry/callSession"), r = e("swx-util-calling-stack"), i = e("swx-constants").COMMON, s = e("telemetry/calling/pstn/creditBalanceTracker"), o = e("services/cqf/CQFHandler"), u = e("ui/modalDialog/deviceDisabledDialog"), a = e("swx-enums"), f = e("vendor/knockout"), l = e("notifications/factory"), c = e("notifications/common/notificationHub"), h = e("swx-pubsub-instance").default, p = e("ui/viewModels/calling/callScreenViewModel/sounds"), d = e("ui/calling/unansweredCallHandler");
  t.build = function () {
    return new v();
  };
});
