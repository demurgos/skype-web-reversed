define("ui/viewModels/chat/headerSingleConversation", [
  "require",
  "lodash-compat",
  "vendor/knockout",
  "utils/common/cafeObservable",
  "utils/common/eventMixin",
  "swx-i18n",
  "services/serviceLocator",
  "constants/common",
  "swx-enums",
  "ui/telemetry/chat/guestActionsInHeader",
  "ui/modelHelpers/personHelper",
  "utils/common/outsideClickHandler"
], function (e) {
  function h(e, i) {
    function g(e) {
      p.participantsCount(e + (m ? 1 : 0));
    }
    function y() {
      return s.fetch({
        key: "conversation_header_topic_people_chatting",
        count: p.participantsCount()
      });
    }
    function b() {
      return {
        participantsCount: h.participants.length,
        userMessagesCount: h.historyService.activityItems().filter(function (e) {
          return e.type() === a.activityType.TextMessage && l.isMePerson(e.sender);
        }).length,
        totalMessagesCount: h.historyService.activityItems().length
      };
    }
    function w(e, t) {
      v.publish(u.events.interaction.SCROLL_START, t);
    }
    var h = e.conversationModel, p = this, d = o.resolve(u.serviceLocator.FEATURE_FLAGS), v = o.resolve(u.serviceLocator.PUBSUB), m = d.isFeatureOn(u.featureFlags.INCLUDE_SELF_IN_PARTICIPANTS_COUNT);
    p.initializeParticipants = n.observable(!1);
    p.profileExpanded = n.observable(!1);
    p.participantsCount = n.observable(h.participantsCount());
    h.participantsCount.changed(g);
    p.selfParticipant = h.selfParticipant;
    p.participants = r.newObservableCollection(h.participants);
    p.topic = n.computed(y);
    p.init = function () {
      i.init();
    };
    p.dispose = function () {
      h.participantsCount.changed.off(g);
      i.dispose();
      p.topic.dispose();
      c.remove("conversationHeader");
    };
    p.getParticipantName = function (e) {
      return e.person.displayName();
    };
    p.onScroll = t.debounce(w, 1000, {
      leading: !0,
      trailing: !1
    });
    p.toggleProfile = function (e) {
      var t, n = p.profileExpanded();
      p.profileExpanded(!n);
      p.profileExpanded() ? c.add("conversationHeader", p.toggleProfile) : c.remove("conversationHeader");
      t = b();
      t.telemetryItem = e;
      t.profileExpanded = n;
      f.get().onProfileToggled(t);
      p.initializeParticipants(!0);
    };
    p.toggleProfileChevron = function () {
      p.toggleProfile(u.telemetry.guestActionsInHeader.telemetryItem[p.profileExpanded() ? "CHEVRON_UP" : "CHEVRON_DOWN"]);
    };
  }
  var t = e("lodash-compat"), n = e("vendor/knockout"), r = e("utils/common/cafeObservable"), i = e("utils/common/eventMixin"), s = e("swx-i18n").localization, o = e("services/serviceLocator"), u = e("constants/common"), a = e("swx-enums"), f = e("ui/telemetry/chat/guestActionsInHeader"), l = e("ui/modelHelpers/personHelper"), c = e("utils/common/outsideClickHandler");
  return t.assign(h.prototype, i), h;
});
