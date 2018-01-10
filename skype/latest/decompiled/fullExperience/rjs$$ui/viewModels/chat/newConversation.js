define("ui/viewModels/chat/newConversation", [
  "require",
  "lodash-compat",
  "swx-constants",
  "utils/common/eventMixin",
  "swx-utils-chat",
  "swx-utils-common",
  "swx-cafe-application-instance",
  "swx-pubsub-instance",
  "swx-service-locator-instance",
  "usertiming"
], function (e) {
  function c() {
    function c() {
      l.mark(u.NEW_CONVERSATION.FLOW_START);
    }
    function h(r) {
      var f, c = o.get().conversationsManager;
      e.conversation || (e.conversation = i.createConversation(t.selectedContacts(), c, r));
      e.conversation.isJoiningEnabled.set.enabled.once(!0, function () {
        e.conversation.isJoiningEnabled.set(r);
      });
      e.newConversationV2 && i.addPersonsToConversation(t.selectedContacts(), e.conversation);
      f = e.conversation.isGroupConversation() ? n.telemetry.historyLoadOrigin.NEW_CHAT_CREATION : n.telemetry.historyLoadOrigin.NEW_CHAT_OPEN_EXISTING;
      e.conversation.isGroupConversation() || o.get().conversationsManager.conversations.add(e.conversation);
      s.execute(function () {
        l.mark(u.NEW_CONVERSATION.RENDER_END);
        a.publish(n.events.navigation.OPEN_CONVERSATION, {
          model: e.conversation,
          origin: f
        });
      });
    }
    function p() {
      l.mark(u.NEW_CONVERSATION.RENDER_END);
      a.publish(n.events.navigation.NAVIGATE_TO_PREVIOUS_PAGE);
    }
    function d(s) {
      var u = o.get().conversationsManager, a = r.isFeatureOn(n.featureFlags.SPACES);
      e.conversation || (e.conversation = i.createConversation(t.selectedContacts(), u, a), e.conversation.isJoiningEnabled.set.enabled.once(!0, function () {
        e.conversation.isJoiningEnabled.set(a);
      }));
      s(e.conversation);
    }
    var e = this, t, r = f.resolve(n.serviceLocator.FEATURE_FLAGS);
    e.registerEvent(n.events.newConversation.CONFIRMED, h);
    e.registerEvent(n.events.newConversation.CANCELLED, p);
    e.registerEvent(n.events.conversation.SHARED, d);
    e.forwardEvent(n.events.navigation.FRAGMENT_SHOW, e.DIRECTION.CHILD, c);
    e.newConversationV2 = r.isFeatureOn(n.featureFlags.NEW_CONVERSATION_V2);
    e.conversation = null;
    e.setParticipantProvider = function (e) {
      t = e;
    };
  }
  var t = e("lodash-compat"), n = e("swx-constants").COMMON, r = e("utils/common/eventMixin"), i = e("swx-utils-chat").conversation, s = e("swx-utils-common").async, o = e("swx-cafe-application-instance"), u = n.telemetry.performanceMarks, a = e("swx-pubsub-instance").default, f = e("swx-service-locator-instance").default, l = e("usertiming");
  return t.assign(c.prototype, r), c;
});
