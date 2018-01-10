define("ui/viewModels/chat/spaceSettings", [
  "require",
  "lodash-compat",
  "vendor/knockout",
  "utils/common/eventMixin",
  "swx-i18n",
  "swx-enums",
  "swx-utils-chat",
  "utils/common/cafeObservable",
  "swx-constants",
  "utils/common/eventHelper"
], function (e) {
  function l(e, t) {
    function l() {
      r.joiningEnabled(!!t);
    }
    function c() {
      r.role = u.newObservableProperty(e.selfParticipant.role);
      r.spaceLink = u.newObservableProperty(e.uri);
      r.joiningEnabled(e.isJoiningEnabled());
      e.isJoiningEnabled.get(function (e) {
        r.joiningEnabled(e);
        r.dispatchEvent(a.conversation.JOINING_ENABLED, e, r.DIRECTION.PARENT);
      });
    }
    var r = this;
    r.role = n.observable(s.participantRole.Leader);
    r.spaceLink = n.observable();
    r.joiningEnabled = n.observable(!!t);
    r.registerEvent(a.newConversation.CANCELLED, l);
    r.registerEvent(a.newConversation.CONFIRMED, l);
    e.selfParticipant && c();
    r.label = n.pureComputed(function () {
      return r.isAdmin() ? i.fetch({ key: "header_text_allowOthersToJoin" }) : i.fetch({ key: "header_text_othersCanJoin" });
    });
    r.isAdmin = n.pureComputed(function () {
      return r.role() === s.participantRole.Leader || !e.isGroupConversation();
    });
    r.mailtoLink = n.pureComputed(function () {
      return o.createMailtoLink(e.topic(), r.spaceLink());
    });
    r.linkShown = n.pureComputed(function () {
      return !!r.spaceLink() && !!r.joiningEnabled();
    });
    r.hideSettings = n.pureComputed(function () {
      return !r.isAdmin() && !r.linkShown();
    });
    r.joiningEnabledHandler = function () {
      var e = r.joiningEnabled();
      r.joiningEnabled(!e);
      r.dispatchEvent(a.conversation.JOINING_ENABLED, !e, r.DIRECTION.PARENT);
    };
    r.onJoinEnablerKeydown = function (e, t) {
      var n = f.isActivation(t);
      return n && r.joiningEnabledHandler(), !n;
    };
  }
  var t = e("lodash-compat"), n = e("vendor/knockout"), r = e("utils/common/eventMixin"), i = e("swx-i18n").localization, s = e("swx-enums"), o = e("swx-utils-chat").spaceMail, u = e("utils/common/cafeObservable"), a = e("swx-constants").COMMON.events, f = e("utils/common/eventHelper");
  return t.assign(l.prototype, r), l;
});
