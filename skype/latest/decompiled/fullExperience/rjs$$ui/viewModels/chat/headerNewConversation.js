define("ui/viewModels/chat/headerNewConversation", [
  "require",
  "lodash-compat",
  "vendor/knockout",
  "utils/common/eventMixin",
  "swx-i18n",
  "ui/modelHelpers/conversationHelper",
  "swx-service-locator-instance",
  "swx-constants",
  "swx-constants",
  "utils/common/eventHelper",
  "ui/telemetry/actions/actionSources"
], function (e) {
  function h(e, t) {
    function g() {
      d(r.selectedContacts().length);
      t.participantsCountUpdated(d());
    }
    var r = e.participantsProvider, h, p = this, d = n.observable(0), v = o.resolve(u.serviceLocator.FEATURE_FLAGS), m;
    e.conversationModel ? p.conversationModel = e.conversationModel : p.conversationModel = {
      isGroupConversation: n.observable(!0),
      topic: n.observable("DEFAULT_TOPIC"),
      participants: n.observableArray(),
      participantsCount: n.observable(0)
    };
    p.spacesEnabled = v.isFeatureOn(u.featureFlags.SPACES);
    p.telemetryContext = { source: l.invitesShareButtons.newConversation };
    p.newConversationV2 = n.observable(v.isFeatureOn(u.featureFlags.NEW_CONVERSATION_V2));
    p.showMoreActions = function () {
      return v.isFeatureOn(u.featureFlags.SCHEDULE_CALL_FROM_CONVERSATION) && !s.isOneToOneConversationWithAgent(p.conversationModel) && !s.isOneToOneConversationWithEcho(p.conversationModel);
    };
    m = n.observable(p.spacesEnabled);
    p.participantCount = n.pureComputed(function () {
      var e = d();
      return v.isFeatureOn(u.featureFlags.INCLUDE_SELF_IN_PARTICIPANTS_COUNT) && (e += 1), i.fetch({
        key: "label_text_participant",
        count: e
      });
    });
    p.confirmButtonDisabled = n.pureComputed(function () {
      return d() === 0 && !m();
    });
    p.topic = n.pureComputed(function () {
      return p.newConversationV2() ? i.fetch({ key: "conversation_header_topic_untitled_conversation" }) : m() ? s.createSpaceTopic() : i.fetch({ key: "conversation_header_topic_untitled_conversation" });
    });
    p.setParticipantProvider = function (t) {
      e.setParticipantProvider(t);
      r = t;
      h = r.selectedContacts.subscribe(g);
    };
    p.confirm = function () {
      p.dispatchEvent(c.newConversation.CONFIRMED, m());
      m(p.spacesEnabled);
      t.publish();
    };
    p.cancel = function () {
      p.dispatchEvent(c.newConversation.CANCELLED);
      m(p.spacesEnabled);
    };
    p.forwardEvent(c.roster.ROSTER_QUERY_CHANGED);
    p.forwardEvent(c.roster.ROSTER_QUERY_EXECUTED);
    p.forwardEvent(c.roster.ROSTER_SELECTION_REMOVED);
    p.forwardEvent(c.roster.PICKER_CONTACT_SELECTED);
    p.forwardEvent(c.roster.PICKER_CONTACT_DESELECTED);
    p.forwardEvent(c.conversation.SHARED);
    p.registerEvent(c.conversation.JOINING_ENABLED, m);
    p.dispose = function () {
      h && h.dispose();
    };
    p.handleKeyDown = function (e, t) {
      var n = f.getKeyCode(t);
      return n === a.ESCAPE && (e.cancel(), t.stopPropagation()), !0;
    };
  }
  var t = e("lodash-compat"), n = e("vendor/knockout"), r = e("utils/common/eventMixin"), i = e("swx-i18n").localization, s = e("ui/modelHelpers/conversationHelper"), o = e("swx-service-locator-instance").default, u = e("swx-constants").COMMON, a = e("swx-constants").KEYS, f = e("utils/common/eventHelper"), l = e("ui/telemetry/actions/actionSources"), c = u.events;
  return t.assign(h.prototype, r), h;
});
