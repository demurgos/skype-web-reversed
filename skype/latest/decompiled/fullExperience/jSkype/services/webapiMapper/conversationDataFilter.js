define("jSkype/services/webapiMapper/conversationDataFilter", [
  "require",
  "exports",
  "module",
  "constants/common",
  "jSkype/utils/chat/conversation",
  "jSkype/settings",
  "constants/common",
  "jSkype/services/webapiMapper/conversationLiveStateHandler",
  "jSkype/utils/chat/parser"
], function (e, t) {
  function l(e) {
    var t = u.getConversationIdFromUrl(e.resource.conversationLink);
    return r.isMeConversation(t);
  }
  function c(e) {
    function n(e) {
      t && o.updateCallState(e.resource.content, e.resource.conversationLink);
    }
    function r(t) {
      var n = e["handle" + t.resourceType];
      n && n.call(e, t);
    }
    function u(e) {
      e.type === "EventMessage" && e.resourceType === "ThreadUpdate" && e.resource.type === "Thread" && o.updateNGCCallState(e.resource.id, e.resource.properties), r(e);
    }
    var t = i.isFeatureOn(s.featureFlags.GVC_JOINING);
    this.eventMessages = function (t) {
      var r, i, s;
      for (r = 0; r < t.length; r++) {
        i = t[r], s = i.resource.messagetype;
        if (l(i))
          return;
        a.indexOf(s) > -1 ? e.handleTypingControl(i) : s === f ? n(i) : u(i);
      }
    };
  }
  var n = e("constants/common").isTyping, r = e("jSkype/utils/chat/conversation"), i = e("jSkype/settings"), s = e("constants/common"), o = e("jSkype/services/webapiMapper/conversationLiveStateHandler"), u = e("jSkype/utils/chat/parser"), a = [
      n.MESSAGE_TYPE.SET_TYPING,
      n.MESSAGE_TYPE.CLEAR_TYPING
    ], f = "Control/LiveState";
  t.build = function (e) {
    return new c(e);
  };
})
