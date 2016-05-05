define("ui/viewModels/chat/isTypingIndicator", [
  "require",
  "vendor/knockout",
  "constants/common",
  "utils/common/array",
  "lodash-compat",
  "swx-i18n",
  "services/serviceLocator",
  "utils/people/personPropertyFormatter"
], function (e) {
  var t = e("vendor/knockout"), n = e("constants/common"), r = e("utils/common/array"), i = e("lodash-compat"), s = n.isTyping, o = e("swx-i18n").localization, u = e("services/serviceLocator"), a = e("utils/people/personPropertyFormatter");
  return function (f) {
    function m() {
      function r(n) {
        e.length < s.DETAILED_PARTICIPANTS_MAX_COUNT ? e.push(n.person) : t++;
      }
      function i(e) {
        return a.truncateDisplayName(e.displayName());
      }
      var e = [], t = 0, n;
      h.forEach(r), n = e.length + t, l.typingParticipantsCount(n);
      switch (n) {
      case 0:
        return "";
      case 1:
        return l.avatar(null), l.avatar(e[0].avatarUrl()), o.fetch({
          key: "typingIndicator_label_oneParticipant",
          params: { firstParticipantName: i(e[0]) }
        });
      case 2:
        return l.avatar(null), o.fetch({
          key: "typingIndicator_label_twoParticipants",
          params: {
            firstParticipantName: i(e[0]),
            secondParticipantName: i(e[1])
          }
        });
      default:
        return l.avatar(null), o.fetch({
          key: "typingIndicator_label_multipleParticipants",
          params: {
            firstParticipantName: i(e[0]),
            secondParticipantName: i(e[1])
          },
          count: t
        });
      }
    }
    function g(e, t) {
      t ? h.push(e) : h = i.without(h, e), l.isTypingLabel(m());
    }
    function y(e) {
      e.__isTypingSubscription = e.chat.isTyping.changed(g.bind(null, e));
    }
    function b(e) {
      var t = i.indexOf(h, e);
      t > -1 && (r.removeFrom(h, t), l.isTypingLabel(m())), w(e);
    }
    function w(e) {
      e.__isTypingSubscription && (e.__isTypingSubscription.dispose(), delete e.__isTypingSubscription);
    }
    var l = this, c = f.participants, h = [], p = u.resolve(n.serviceLocator.FEATURE_FLAGS), d, v;
    this.avatar = t.observable(""), this.typingParticipantsCount = t.observable(0), this.isTypingLabel = t.observable(""), this.isFeatureOn = p.isFeatureOn(n.featureFlags.IS_TYPING_INDICATOR), d = c.added(y), v = c.removed(b), this.dispose = function () {
      d.dispose(), v.dispose(), c.each(w);
    };
  };
})
