define("jSkype/services/webapiMapper/conversationDataHandlers", [
  "require",
  "exports",
  "module",
  "constants/common",
  "lodash-compat",
  "jSkype/client",
  "jSkype/settings",
  "jSkype/modelHelpers/personHelper",
  "jSkype/services/webapi/utils/sanitizer",
  "jSkype/utils/chat/parser",
  "jSkype/utils/chat/conversation"
], function (e, t) {
  function c(e, t) {
    function h(e) {
      var t = {
        id: e.id,
        lastMessage: {},
        properties: {},
        threadProperties: { version: e.version },
        members: e.members
      };
      for (var n in e.properties)
        e.properties.hasOwnProperty(n) && (t.threadProperties[n] = e.properties[n]);
      return t;
    }
    var c = this;
    this.handleNewMessage = function (r) {
      var o = r.resource, l = a.getConversationIdFromUrl(o.conversationLink), c = i.get()._telemetry.messagesCollector;
      if (f.isPstnConversation(l) && !s.isFeatureOn(n.featureFlags.PSTN_ENABLED))
        return;
      u.message(o);
      t._handleNewMessage(l, o);
      c.enqueueReceivedMessageInfo(o);
      [
        "ThreadActivity/AddMember",
        "ThreadActivity/DeleteMember"
      ].indexOf(o.messagetype) !== -1 && e.syncThread(l);
    };
    this.handleMessageUpdate = function (e) {
      var n = e.resource, r = a.getConversationIdFromUrl(n.conversationLink);
      if (f.isPstnConversation(r))
        return;
      u.message(n);
      t._handleUpdatedMessage(r, n);
    };
    this.handleConversationUpdate = function (e) {
      function n() {
        var t = e.resource.properties.clearedat;
        if (!t)
          return !1;
        var n = new Date(parseInt(t)), i = new Date() - n;
        return i >= 0 && i < 10000 && r.isEmpty(e.resource.lastMessage) ? !0 : !1;
      }
      if (n()) {
        var i = t._getConversation(e.resource.id);
        if (i) {
          t.conversations.remove(i);
          return;
        }
      }
      u.conversations([e.resource]);
      t._conversationPropertiesUpdated(e.resource);
    };
    this.handleThreadUpdate = function (e) {
      c.handleThreadSync(e.resource);
    };
    this.handleThreadSync = function (e) {
      var n;
      n = h(e);
      t._threadPropertiesUpdated(n);
    };
    this.handleTypingControl = function (e) {
      var n = a.getConversationIdFromUrl(e.resource.conversationLink), r = a.getConversationIdFromUrl(e.resource.from), i = r ? o.getId(r) : "", s = e.resource.messagetype === l.MESSAGE_TYPE.SET_TYPING, u = t._getConversation(n);
      if (!u || !i)
        return;
      var f = u.participants(i);
      f && f.chat._setIsTyping(s);
    };
    this.handleReadReceipt = function (e) {
      var n = e.resource.conversationId, r = t._getConversation(n);
      if (!r || r.isGroupConversation())
        return;
      r.participants(0).lastReadTimestamp._set(e.resource.readReceipt);
    };
  }
  var n = e("constants/common"), r = e("lodash-compat"), i = e("jSkype/client"), s = e("jSkype/settings"), o = e("jSkype/modelHelpers/personHelper"), u = e("jSkype/services/webapi/utils/sanitizer"), a = e("jSkype/utils/chat/parser"), f = e("jSkype/utils/chat/conversation"), l = n.isTyping;
  t.build = function (e, t) {
    return new c(e, t);
  };
});
