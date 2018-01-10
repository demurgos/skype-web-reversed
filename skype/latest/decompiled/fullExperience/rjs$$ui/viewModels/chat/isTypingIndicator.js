define("ui/viewModels/chat/isTypingIndicator", [
  "require",
  "vendor/knockout",
  "swx-constants",
  "swx-utils-common",
  "lodash-compat",
  "swx-i18n",
  "swx-service-locator-instance",
  "swx-utils-people",
  "utils/common/accessibility"
], function (e) {
  var t = e("vendor/knockout"), n = e("swx-constants").COMMON, r = e("swx-utils-common").array, i = e("lodash-compat"), s = n.isTyping, o = e("swx-i18n").localization, u = e("swx-service-locator-instance").default, a = e("swx-utils-people").personPropertyFormatter, f = e("utils/common/accessibility").narrator;
  return function (l) {
    function g() {
      function r(n) {
        e.length < s.DETAILED_PARTICIPANTS_MAX_COUNT ? e.push(n.person) : t++;
      }
      function i(e) {
        return a.truncateDisplayName(e.displayName());
      }
      var e = [], t = 0, n;
      p.forEach(r);
      n = e.length + t;
      c.typingParticipantsCount(n);
      switch (n) {
      case 0:
        return "";
      case 1:
        var u = o.fetch({
          key: "typingIndicator_label_oneParticipant",
          params: { firstParticipantName: i(e[0]) }
        });
        return c.avatar(e[0].avatarUrl()), c.displayName(e[0].displayName()), f.announce(u), u;
      case 2:
        var l = o.fetch({
          key: "typingIndicator_label_twoParticipants",
          params: {
            firstParticipantName: i(e[0]),
            secondParticipantName: i(e[1])
          }
        });
        return c.displayName(null), c.avatar(null), f.announce(l), l;
      default:
        var h = o.fetch({
          key: "typingIndicator_label_multipleParticipants",
          params: {
            firstParticipantName: i(e[0]),
            secondParticipantName: i(e[1])
          },
          count: t
        });
        return c.displayName(null), c.avatar(null), f.announce(h), h;
      }
    }
    function y(e, t) {
      t ? p.push(e) : p = i.without(p, e);
      c.isTypingLabel(g());
    }
    function b(e) {
      e.__isTypingSubscription = e.chat.isTyping.changed(y.bind(null, e));
    }
    function w(e) {
      var t = i.indexOf(p, e);
      t > -1 && (r.removeFrom(p, t), c.isTypingLabel(g()));
      E(e);
    }
    function E(e) {
      e.__isTypingSubscription && (e.__isTypingSubscription.dispose(), delete e.__isTypingSubscription);
    }
    var c = this, h = l.participants, p = [], d = u.resolve(n.serviceLocator.FEATURE_FLAGS), v, m;
    this.avatar = t.observable("");
    this.displayName = t.observable("");
    this.typingParticipantsCount = t.observable(0);
    this.isTypingLabel = t.observable("");
    this.isFeatureOn = d.isFeatureOn(n.featureFlags.IS_TYPING_INDICATOR);
    v = h.added(b);
    m = h.removed(w);
    this.dispose = function () {
      v.dispose();
      m.dispose();
      h.each(E);
    };
  };
});
