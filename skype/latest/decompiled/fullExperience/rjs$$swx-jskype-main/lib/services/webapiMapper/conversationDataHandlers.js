(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/webapiMapper/conversationDataHandlers", [
      "require",
      "exports",
      "swx-jskype-internal-application-instance",
      "../../../lib/utils/chat/parser",
      "../../../lib/utils/chat/conversation",
      "swx-constants",
      "jskype-settings-instance",
      "swx-chat-service",
      "swx-mri",
      "lodash-compat",
      "../../utils/chat/endpointsDataProvider"
    ], e);
}(function (e, t) {
  function d(e, t) {
    return new p(e, t);
  }
  var n = e("swx-jskype-internal-application-instance"), r = e("../../../lib/utils/chat/parser"), i = e("../../../lib/utils/chat/conversation"), s = e("swx-constants"), o = e("jskype-settings-instance"), u = e("swx-chat-service"), a = e("swx-mri"), f = e("lodash-compat"), l = e("../../utils/chat/endpointsDataProvider"), c = u.utils.sanitizer, h = s.COMMON.isTyping, p = function () {
      function e(e, t) {
        var u = this;
        this.handleNewMessage = function (e) {
          c.message(e.resource, !0);
          var t = e.resource, a = r.getConversationIdFromUrl(t.conversationLink), f = n.get()._telemetry.messagesCollector;
          if (i.isPstnConversation(a) && !o.isFeatureOn(s.COMMON.featureFlags.PSTN_ENABLED))
            return;
          t._isFromPolling = !0;
          l.setEndpointActiveStatusTo(t.isactive);
          u.conversationsManager._handleNewMessage(a, t);
          f.enqueueReceivedMessageInfo(t);
          [
            "ThreadActivity/AddMember",
            "ThreadActivity/DeleteMember"
          ].indexOf(t.messagetype) !== -1 && u.apiHandler.syncThread(a);
        };
        this.handleMessageUpdate = function (e) {
          c.message(e.resource, !0);
          var t = e.resource, n = r.getConversationIdFromUrl(t.conversationLink);
          t._isFromPolling = !0;
          u.conversationsManager._handleUpdatedMessage(n, t);
        };
        this.handleConversationUpdate = function (e) {
          function t() {
            var t = e.resource.properties.clearedat;
            if (!t)
              return !1;
            var n = new Date(parseInt(t)), r = new Date().getTime() - n.getTime();
            return r >= 0 && r < 10000 && f.isEmpty(e.resource.lastMessage) ? !0 : !1;
          }
          function n(e) {
            e._isFavorited && e._isFavorited._set(!1);
          }
          c.conversations([e.resource], !0);
          if (t()) {
            var r = u.conversationsManager._getConversation(e.resource.id);
            if (r) {
              n(r);
              u.conversationsManager.conversations.remove(r);
              return;
            }
          }
          u.conversationsManager._conversationPropertiesUpdated(e.resource);
        };
        this.handleThreadUpdate = function (e) {
          u.handleThreadSync(e.resource);
        };
        this.handleThreadSync = function (e) {
          var t = u.transformThreadSyncToConversationUpdate(e);
          u.conversationsManager._threadPropertiesUpdated(t);
        };
        this.handleTypingControl = function (e) {
          var t = r.getConversationIdFromUrl(e.resource.conversationLink), n = r.getConversationIdFromUrl(e.resource.from), i = n ? a.getId(n) : "", s = e.resource.messagetype === h.MESSAGE_TYPE.SET_TYPING, o = u.conversationsManager._getConversation(t);
          if (!o || !i)
            return;
          var f = o.participants(i);
          f && f.chat._setIsTyping(s);
        };
        this.handleReadReceipt = function (e) {
          var t = e.resource.conversationId, n = u.conversationsManager._getConversation(t);
          if (!n || n.isGroupConversation())
            return;
          n.participants(0).lastReadTimestamp._set(e.resource.readReceipt);
        };
        this.handleEndpointPresence = function (e) {
          l.update(e.resource);
        };
        this.apiHandler = e;
        this.conversationsManager = t;
      }
      return e.prototype.transformThreadSyncToConversationUpdate = function (e) {
        var t = {
          id: e.id,
          botsSettings: e.botsSettings,
          lastMessage: {},
          properties: {},
          threadProperties: { version: e.version },
          members: e.members
        };
        for (var n in e.properties)
          e.properties.hasOwnProperty(n) && (t.threadProperties[n] = e.properties[n]);
        return t;
      }, e;
    }();
  t.ConversationDataHandler = p;
  t.build = d;
}));
