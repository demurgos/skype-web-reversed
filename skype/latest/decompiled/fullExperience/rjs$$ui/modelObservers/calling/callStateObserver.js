define("ui/modelObservers/calling/callStateObserver", [
  "require",
  "exports",
  "module",
  "services/pubSub/pubSub",
  "vendor/knockout",
  "swx-enums",
  "constants/common",
  "ui/calling/telemetry/callSession",
  "utils/calling/callingStack",
  "notifications/factory",
  "notifications/common/notificationHub",
  "ui/viewModels/calling/helpers/conversationTracker",
  "telemetry/calling/pstn/creditBalanceTracker",
  "services/cqf/CQFHandler"
], function (e, t) {
  function p() {
    function v(t) {
      var r = E(t);
      r.audioHandler = function (n, r, o) {
        if (r === i.callDisconnectionReason.MissingSpeaker) {
          var u = a.build(s.notifications.DEVICE_MISSING_SPEAKER);
          f.notify(u);
        }
        o && (g(t, n), y(t, n));
        r === i.callDisconnectionReason.OutOfBrowserCall && l.addP2PConversation(t);
        n === i.callConnectionState.Disconnected && (l.init(), e.activeCalls.remove(t));
      };
      r.videoHandler = function (e) {
        y(t, e);
      };
      r.participantsSubs = [];
      r.participantAddedHandler = function (n) {
        var s = n.audio.state.when(i.callConnectionState.Ringing, g.bind(null, t, i.callConnectionState.Ringing)), o = n.screenSharing.state.when(i.callConnectionState.Notified, b.bind(null, t, n));
        s.participant = n;
        o.participant = n;
        r.participantsSubs.push(s, o);
      };
      r.participantRemovedHandler = function (t) {
        r.participantsSubs = r.participantsSubs.filter(function (e) {
          return e.participant === t ? (e.dispose(), !1) : !0;
        });
      };
      r.getCallSession = function (n) {
        return r.callSession ? r.callSession : (n === i.callConnectionState.Notified || t.activeModalities.audio() ? r.callSession = m(t, !0) : r.callSession = m(t, !1), r.callSession);
      };
      r.clearCallSession = function () {
        delete r.callSession;
      };
      r.spawnedConversationStateChanged = function (t) {
        t && n.publish(s.events.navigation.OPEN_CONVERSATION, {
          model: t,
          origin: s.telemetry.historyLoadOrigin.CALLING
        });
      };
      t.participants.added(r.participantAddedHandler);
      t.participants.removed(r.participantRemovedHandler);
      t.selfParticipant.audio.state.changed(r.audioHandler);
      t.selfParticipant.video.state.changed(r.videoHandler);
      t.spawnedConversation && t.spawnedConversation.changed(r.spawnedConversationStateChanged);
    }
    function m(e, t) {
      return t ? o.buildIncomingCallSession(e) : o.buildOutgoingCallSession(e);
    }
    function g(e, t) {
      var n = E(e), r = n.getCallSession(t);
      switch (t) {
      case i.callConnectionState.Notified:
        r.start(), r.setRinging();
        break;
      case i.callConnectionState.Connecting:
        r.start(), h.observe(e);
        break;
      case i.callConnectionState.Connected:
        r.setConnected(), d.callConnected(e);
        break;
      case i.callConnectionState.Ringing:
        r.setRinging();
        break;
      case i.callConnectionState.Disconnected:
        r.end(), n.clearCallSession(), d.callEnded(e), h.updateCallData(e);
      }
    }
    function y(t, r) {
      if (r !== i.callConnectionState.Connecting)
        return;
      u.get().isInBrowserCallingSupported() && n.publish(s.events.navigation.OPEN_CONVERSATION, {
        model: t,
        origin: s.telemetry.historyLoadOrigin.CALLING
      });
      e.activeCalls.indexOf(t) === -1 && e.activeCalls.push(t);
    }
    function b(e, t) {
      e.screenSharingService.sharer(t);
      e.screenSharingService.accept.enabled() && e.screenSharingService.accept();
    }
    function w(t) {
      var n = E(t);
      n && (n.conversation.selfParticipant.audio.state.changed.off(n.audioHandler), n.conversation.selfParticipant.video.state.changed.off(n.videoHandler), n.conversation.participants.added.off(n.participantAddedHandler), n.conversation.participants.removed.off(n.participantRemovedHandler), n.participantsSubs.forEach(function (e) {
        e.dispose();
      }), n.participantsSubs.length = 0, e.activeCalls.remove(t));
    }
    function E(e) {
      var t;
      for (var n = 0; n < p.length; n++) {
        t = p[n];
        if (t.conversation === e)
          return t;
      }
      return t = { conversation: e }, p.push(t), t;
    }
    var e = this, t, p = [], d = c.build();
    e.activeCalls = r.observableArray();
    e.observe = function (e) {
      t = e.conversationsManager.conversations;
      t.added(v);
      t.removed(w);
      d.init();
    };
  }
  var n = e("services/pubSub/pubSub"), r = e("vendor/knockout"), i = e("swx-enums"), s = e("constants/common"), o = e("ui/calling/telemetry/callSession"), u = e("utils/calling/callingStack"), a = e("notifications/factory"), f = e("notifications/common/notificationHub"), l = e("ui/viewModels/calling/helpers/conversationTracker"), c = e("telemetry/calling/pstn/creditBalanceTracker"), h = e("services/cqf/CQFHandler");
  t.build = function () {
    return new p();
  };
});
