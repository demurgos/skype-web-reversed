define("ui/modelHelpers/conversationHelper", [
  "require",
  "exports",
  "module",
  "swx-enums",
  "cafe/applicationInstance",
  "browser/detect",
  "utils/calling/callingStack",
  "swx-i18n",
  "ui/modelHelpers/personHelper",
  "lodash-compat",
  "ui/viewModels/calling/helpers/conversationTracker"
], function (e, t) {
  function l(e) {
    return e.selfParticipant.audio.state() !== n.callConnectionState.Disconnected && e.selfParticipant.audio.state() !== n.callConnectionState.Notified;
  }
  function c(e) {
    return r.get().conversationsManager.getConversation(e);
  }
  function h(e) {
    var n = r.get().conversationsManager.createConversation();
    return t.addPersonsToConversation(e, n), n;
  }
  function p(e) {
    if (e && !e.isGroupConversation() && e.participants.size() > 0)
      return e.participants()[0].person;
  }
  var n = e("swx-enums"), r = e("cafe/applicationInstance"), i = e("browser/detect"), s = e("utils/calling/callingStack"), o = e("swx-i18n").localization, u = e("ui/modelHelpers/personHelper"), a = e("lodash-compat"), f = e("ui/viewModels/calling/helpers/conversationTracker");
  t.createConversation = function (e, t) {
    return e.length > 1 || t ? h(e) : c(e[0]);
  }, t.createSpaceTopic = function () {
    return o.fetch({ key: "spaces_default_name" });
  }, t.isCallingActive = function (e) {
    return l(e) ? s.get().isOutofBrowserCallingSupported() ? !1 : i.getBrowserInfo().isShellApp ? !0 : f.isP2PConversation(e) ? !1 : e.selfParticipant.audio.state.reason === n.callDisconnectionReason.OutOfBrowserCall ? !1 : s.get().isPluginlessCallingSupported() && e.selfParticipant.audio.state.reason === n.callDisconnectionReason.CallEscalated ? !1 : e.autoCall && e.autoCall() ? !0 : !0 : !1;
  }, t.addPersonsToConversation = function (e, t) {
    return Promise.all(a.map(e, function (e) {
      var n = t.createParticipant(e);
      return t.participants.add(n);
    }));
  }, t.isOneToOneConversationWithEcho = function (e) {
    var t = p(e);
    return !!t && u.isEchoContact(t);
  }, t.isOneToOneConversationWithAgent = function (e) {
    var t = p(e);
    return !!t && u.isAgent(t);
  }, t.isOneToOneConversationWithBlockedPerson = function (e) {
    var t = p(e);
    return !!t && t.isBlocked();
  }, t.agentSupportsIm = function (e) {
    var n;
    return t.isOneToOneConversationWithAgent(e) ? (n = e.participants()[0], !!n.person.capabilities.chat()) : !1;
  }, t.getExistingConversationWithPerson = function (e) {
    var t = r.get().conversationsManager.conversations();
    return a.find(t, function (t) {
      return !t.isGroupConversation() && t.participants.size() === 1 && t.participants()[0].person.id() === e.id();
    });
  }, t.isPstnEndpoint = function (e) {
    return /^(\+)?\d+$/.test(e);
  }, t.isPstnOnlyConversation = function (e) {
    var n = e.participants.subscribe();
    if (!e.participants.size())
      return n.dispose(), !1;
    for (var r = 0; r < e.participants.size(); r++) {
      var i = e.participants(r);
      if (!i.audio.endpoint || !t.isPstnEndpoint(i.audio.endpoint()))
        return n.dispose(), !1;
    }
    return n.dispose(), !0;
  }, t.isConversationWithPstn = function (e) {
    return e.participants().some(function (e) {
      return e.audio.endpoint && t.isPstnEndpoint(e.audio.endpoint());
    });
  }, t.isAtLeastOnceParticipantOnline = function (e) {
    return e.participants().some(function (e) {
      var t = e.person.status();
      return t !== n.onlineStatus.Offline || t !== n.onlineStatus.Unknown;
    });
  };
})
