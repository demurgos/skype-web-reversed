define("ui/viewModels/chat/conversationTile", [
  "require",
  "vendor/knockout",
  "ui/viewModels/people/contactBuilder",
  "utils/chat/messageSanitizer",
  "utils/common/cafeObservable",
  "constants/common",
  "swx-enums",
  "swx-i18n",
  "services/serviceLocator"
], function (e) {
  function f(e, f) {
    function h() {
      var e = l.contact();
      return e ? e.displayMessage() : p(l.amInConversation(), l.participantCount());
    }
    function p(e, t) {
      return e ? (m() && t++, u.fetch({
        key: "label_text_participant",
        count: t
      })) : "";
    }
    function d() {
      c && (c.dispose(), c = null);
    }
    function v() {
      function t(e) {
        setTimeout(d);
        var t = n.build(e.person, f.contactOptions);
        l.contact(t);
      }
      c = e.participants.added(t);
    }
    function m() {
      var e = a.resolve(s.serviceLocator.FEATURE_FLAGS);
      return e.isFeatureOn(s.featureFlags.INCLUDE_SELF_IN_PARTICIPANTS_COUNT);
    }
    var l = this, c;
    l.isGroup = i.newObservableProperty(e.isGroupConversation);
    l.participantCount = i.newObservableProperty(e.participantsCount);
    l.selfParticipantState = i.newObservableProperty(e.selfParticipant.state);
    l.amInConversation = t.computed(function () {
      return l.selfParticipantState() === o.participantState.Connected;
    });
    l.contact = t.observable();
    l.isAgent = t.computed(function () {
      var e = l.contact();
      return !!e && e.isAgent();
    });
    l.isCertifiedAgent = t.computed(function () {
      var e = l.contact();
      return !!(l.isAgent() && e.agentDetails() && e.agentDetails().certification());
    });
    l.isPstn = t.computed(function () {
      var e = l.contact();
      return !!e && e.isPstn();
    });
    l.id = t.computed(function () {
      var e = l.contact();
      return e ? e.id() : undefined;
    });
    l.statusClassName = t.computed(function () {
      var e = l.contact();
      return e ? e.statusClassName() : "";
    });
    l.isBlocked = t.computed(function () {
      var e = l.contact();
      return e ? e.isBlocked() : !1;
    });
    l.displayMessage = t.computed(h);
    l.displayMessageTitle = t.computed(function () {
      return r.stripHTML(h());
    });
    l.dispose = function () {
      l.isAgent.dispose();
      l.isCertifiedAgent.dispose();
      l.isPstn.dispose();
      l.id.dispose();
      l.statusClassName.dispose();
      l.isBlocked.dispose();
      l.displayMessage.dispose();
      l.displayMessageTitle.dispose();
      l.amInConversation.dispose();
      l.contact() && l.contact().dispose();
      d();
    };
    l.isGroup() || v();
  }
  var t = e("vendor/knockout"), n = e("ui/viewModels/people/contactBuilder"), r = e("utils/chat/messageSanitizer"), i = e("utils/common/cafeObservable"), s = e("constants/common"), o = e("swx-enums"), u = e("swx-i18n").localization, a = e("services/serviceLocator");
  return {
    build: function (e, t) {
      return t = t || {}, new f(e, t);
    }
  };
});
