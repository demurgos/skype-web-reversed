define("ui/modelHelpers/conversationHelper", [
  "require",
  "exports",
  "module",
  "swx-enums",
  "swx-cafe-application-instance",
  "swx-browser-detect",
  "swx-util-calling-stack",
  "swx-i18n",
  "ui/modelHelpers/personHelper",
  "lodash-compat"
], function (e, t) {
  function f(e) {
    return e.selfParticipant.audio.state() !== n.callConnectionState.Disconnected && e.selfParticipant.audio.state() !== n.callConnectionState.Notified;
  }
  function l(e) {
    if (e && !e.isGroupConversation() && e.participants.size() > 0)
      return e.participants()[0].person;
  }
  var n = e("swx-enums"), r = e("swx-cafe-application-instance"), i = e("swx-browser-detect").default, s = e("swx-util-calling-stack"), o = e("swx-i18n").localization, u = e("ui/modelHelpers/personHelper"), a = e("lodash-compat");
  t.createSpaceTopic = function () {
    return o.fetch({ key: "spaces_default_name" });
  };
  t.isCallingActive = function (e) {
    return f(e) ? s.get().isOutofBrowserCallingSupported() ? !1 : i.getBrowserInfo().isShellApp ? !0 : e.autoCall && e.autoCall() ? !0 : !0 : !1;
  };
  t.isOneToOneConversationWithEcho = function (e) {
    var t = l(e);
    return !!t && u.isEchoContact(t);
  };
  t.isOneToOneConversationWithAgent = function (e) {
    var t = l(e);
    return !!t && u.isAgent(t);
  };
  t.isOneToOneConversationWithBlockedPerson = function (e) {
    var t = l(e);
    return !!t && t.isBlocked();
  };
  t.agentSupportsIm = function (e) {
    var n;
    return t.isOneToOneConversationWithAgent(e) ? (n = e.participants()[0], !!n.person.capabilities.chat()) : !1;
  };
  t.getExistingConversationWithPerson = function (e) {
    var t = r.get().conversationsManager.conversations();
    return a.find(t, function (t) {
      return !t.isGroupConversation() && t.participants.size() === 1 && t.participants()[0].person.id() === e.id();
    });
  };
  t.isPstnEndpoint = function (e) {
    return /^(\+)?\d+$/.test(e);
  };
  t.isPstnParticipant = function (e) {
    return !!e.audio.endpoint && (t.isPstnEndpoint(e.audio.endpoint()) || u.isPstn(e.person));
  };
  t.isPstnOnlyConversation = function (e) {
    var n = e.participants.subscribe();
    if (!e.participants.size())
      return n.dispose(), !1;
    for (var r = 0; r < e.participants.size(); r++) {
      var i = e.participants(r);
      if (!i.audio.endpoint || !u.isPstn(i.person) && !t.isPstnEndpoint(i.audio.endpoint()))
        return n.dispose(), !1;
    }
    return n.dispose(), !0;
  };
  t.isConversationWithPstn = function (e) {
    return e.participants().some(t.isPstnParticipant);
  };
  t.isAtLeastOnceParticipantOnline = function (e) {
    return e.participants().some(function (e) {
      var t = e.person.status();
      return t !== n.onlineStatus.Offline || t !== n.onlineStatus.Unknown;
    });
  };
  t.isConversationWithWelcomeAgent = function (e) {
    if (!e.isGroupConversation()) {
      var t = e.participants(0);
      if (t && u.isWelcomeAgent(t.person))
        return !0;
    }
    return !1;
  };
});
