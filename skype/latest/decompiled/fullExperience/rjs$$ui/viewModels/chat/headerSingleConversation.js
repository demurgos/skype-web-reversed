define("ui/viewModels/chat/headerSingleConversation", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "vendor/knockout",
  "utils/common/cafeObservable",
  "utils/common/eventMixin",
  "swx-i18n",
  "swx-service-locator-instance",
  "swx-utils-common",
  "swx-constants",
  "swx-enums",
  "browser/dom",
  "utils/common/scroll",
  "ui/telemetry/chat/guestActionsInHeader",
  "ui/modelHelpers/personHelper",
  "utils/common/outsideClickHandler"
], function (e, t) {
  function m(e, t) {
    function S(e) {
      m.participantsCount(e + (E ? 1 : 0));
    }
    function x() {
      return o.fetch({
        key: "conversation_header_topic_people_chatting",
        count: m.participantsCount()
      });
    }
    function T() {
      return {
        participantsCount: s.participants.length,
        userMessagesCount: s.historyService.activityItems().filter(function (e) {
          return e.type() === l.activityType.TextMessage && d.isMePerson(e.sender);
        }).length,
        totalMessagesCount: s.historyService.activityItems().length
      };
    }
    function N(e, t) {
      w.publish(f.events.interaction.SCROLL_START, t);
    }
    var s = e.conversationModel, m = this, g = null, y, b = u.resolve(f.serviceLocator.FEATURE_FLAGS), w = u.resolve(f.serviceLocator.PUBSUB), E = b.isFeatureOn(f.featureFlags.INCLUDE_SELF_IN_PARTICIPANTS_COUNT);
    m.initializeParticipants = r.observable(!1);
    y = m.initializeParticipants.subscribe(function (e) {
      !g && e === !0 && a.execute(function () {
        g = h.build(c.getElement(".js-SingleConversation-scrollContainer", t));
        g.init();
      }, 0);
    });
    m.profileExpanded = r.observable(!1);
    m.participantsCount = r.observable(s.participantsCount());
    s.participantsCount.changed(S);
    m.selfParticipant = s.selfParticipant;
    m.participants = i.newObservableCollection(s.participants);
    m.topic = r.computed(x);
    m.dispose = function () {
      s.participantsCount.changed.off(S);
      m.topic.dispose();
      y.dispose();
      v.remove("conversationHeader");
      g && g.dispose();
    };
    m.getParticipantName = function (e) {
      return e.person.displayName();
    };
    m.onScroll = n.debounce(N, 1000, {
      leading: !0,
      trailing: !1
    });
    m.toggleProfile = function (e) {
      var t, n = m.profileExpanded();
      m.profileExpanded(!n);
      m.profileExpanded() ? v.add("conversationHeader", m.toggleProfile) : v.remove("conversationHeader");
      t = T();
      t.telemetryItem = e;
      t.profileExpanded = n;
      p.get().onProfileToggled(t);
      m.initializeParticipants(!0);
    };
    m.toggleProfileChevron = function () {
      m.toggleProfile(f.telemetry.guestActionsInHeader.telemetryItem[m.profileExpanded() ? "CHEVRON_UP" : "CHEVRON_DOWN"]);
    };
  }
  var n = e("lodash-compat"), r = e("vendor/knockout"), i = e("utils/common/cafeObservable"), s = e("utils/common/eventMixin"), o = e("swx-i18n").localization, u = e("swx-service-locator-instance").default, a = e("swx-utils-common").async, f = e("swx-constants").COMMON, l = e("swx-enums"), c = e("browser/dom"), h = e("utils/common/scroll"), p = e("ui/telemetry/chat/guestActionsInHeader"), d = e("ui/modelHelpers/personHelper"), v = e("utils/common/outsideClickHandler");
  n.assign(m.prototype, s);
  t.build = function (e, t) {
    return new m(e, t);
  };
});
