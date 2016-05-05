define("ui/viewModels/chat/newConversation", [
  "require",
  "lodash-compat",
  "constants/common",
  "utils/common/eventMixin",
  "ui/modelHelpers/conversationHelper",
  "utils/common/async",
  "cafe/applicationInstance",
  "services/pubSub/pubSub",
  "services/serviceLocator",
  "usertiming"
], function (e) {
  function c() {
    function c() {
      l.mark(u.NEW_CONVERSATION.FLOW_START);
    }
    function h(r) {
      var f;
      e.conversation || (e.conversation = i.createConversation(t.selectedContacts(), r)), e.conversation.isJoiningEnabled.set.enabled.once(!0, function () {
        e.conversation.isJoiningEnabled.set(r);
      }), e.newConversationV2 && i.addPersonsToConversation(t.selectedContacts(), e.conversation), f = e.conversation.isGroupConversation() ? n.telemetry.historyLoadOrigin.NEW_CHAT_CREATION : n.telemetry.historyLoadOrigin.NEW_CHAT_OPEN_EXISTING, e.conversation.isGroupConversation() || o.get().conversationsManager.conversations.add(e.conversation), s.execute(function () {
        l.mark(u.NEW_CONVERSATION.RENDER_END), a.publish(n.events.navigation.OPEN_CONVERSATION, {
          model: e.conversation,
          origin: f
        });
      });
    }
    function p() {
      l.mark(u.NEW_CONVERSATION.RENDER_END), a.publish(n.events.navigation.NAVIGATE_TO_PREVIOUS_PAGE);
    }
    function d(s) {
      if (!e.conversation) {
        var o = r.isFeatureOn(n.featureFlags.SPACES);
        e.conversation = i.createConversation(t.selectedContacts(), o), e.conversation.isJoiningEnabled.set.enabled.once(!0, function () {
          e.conversation.isJoiningEnabled.set(o);
        });
      }
      s(e.conversation);
    }
    var e = this, t, r = f.resolve(n.serviceLocator.FEATURE_FLAGS);
    e.registerEvent(n.events.newConversation.CONFIRMED, h), e.registerEvent(n.events.newConversation.CANCELLED, p), e.registerEvent(n.events.conversation.SHARED, d), e.forwardEvent(n.events.navigation.FRAGMENT_SHOW, e.DIRECTION.CHILD, c), e.newConversationV2 = r.isFeatureOn(n.featureFlags.NEW_CONVERSATION_V2), e.conversation = null, e.setParticipantProvider = function (e) {
      t = e;
    };
  }
  var t = e("lodash-compat"), n = e("constants/common"), r = e("utils/common/eventMixin"), i = e("ui/modelHelpers/conversationHelper"), s = e("utils/common/async"), o = e("cafe/applicationInstance"), u = n.telemetry.performanceMarks, a = e("services/pubSub/pubSub"), f = e("services/serviceLocator"), l = e("usertiming");
  return t.assign(c.prototype, r), c;
})
