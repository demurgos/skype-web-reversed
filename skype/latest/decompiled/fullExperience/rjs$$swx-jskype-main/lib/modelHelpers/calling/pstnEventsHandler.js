(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/modelHelpers/calling/pstnEventsHandler", [
      "require",
      "exports",
      "swx-enums",
      "lodash-compat"
    ], e);
}(function (e, t) {
  function s(e) {
    return new i(e);
  }
  var n = e("swx-enums"), r = e("lodash-compat"), i = function () {
      function e(e) {
        var t = this;
        this.participantStateObservers = {};
        this.subscribeToConversation = function (e) {
          t.reset();
          t.conversation = e;
          t.conversation.selfParticipant.audio.state.changed(t.selfParticipantsAudioStateChanged);
        };
        this.dispose = function () {
          t.reset();
        };
        this.reset = function () {
          t.participantsObserver && t.participantsObserver.dispose();
          t.conversation && (t.conversation.participants().forEach(t.unsubscribeParticipant), t.conversation.selfParticipant.audio.state.changed.off(t.selfParticipantsAudioStateChanged));
          t.participantStateObservers = {};
          t.conversation = null;
        };
        this.selfParticipantsAudioStateChanged = function (e) {
          e === n.callConnectionState.Disconnected ? (t.participantsObserver && t.participantsObserver.dispose(), t.conversation.participants().forEach(t.unsubscribeParticipant)) : e === n.callConnectionState.Connecting && (t.participantsObserver = t.conversation.participants.observe(t.participantsChanged), t.conversation.participants().forEach(t.subscribeParticipant));
        };
        this.participantsChanged = function (e, n) {
          r.forIn(e, function (e) {
            t.subscribeParticipant(e);
          });
          r.forIn(n, function (e) {
            t.unsubscribeParticipant(e);
          });
        };
        this.subscribeParticipant = function (e) {
          if (!t.isPstnEndpoint(e.audio.endpoint()))
            return;
          var n = e.person.id();
          if (n in t.participantStateObservers)
            return;
          var r = function (n) {
            var r = e.audio.state.reason;
            t.pstnEventProcessor.process(t.conversation, e, r, n);
          };
          t.participantStateObservers[n] = r;
          e.audio.state.changed(r);
        };
        this.unsubscribeParticipant = function (e) {
          var n, r;
          r = e.person.id();
          r in t.participantStateObservers && (n = t.participantStateObservers[r], e.audio.state.changed.off(n), delete t.participantStateObservers[r]);
        };
        this.isPstnEndpoint = function (e) {
          return /^(\+)?\d+$/.test(e);
        };
        this.pstnEventProcessor = e;
      }
      return e;
    }();
  t.PstnEventsHandler = i;
  t.build = s;
}));
