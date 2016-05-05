define("ui/viewModels/chat/conversationTopic", [
  "require",
  "exports",
  "module",
  "vendor/knockout",
  "swx-i18n",
  "utils/common/async",
  "constants/common",
  "utils/common/cafeObservable",
  "ui/modelHelpers/conversationHelper",
  "swx-utils-common",
  "utils/chat/messageSanitizer"
], function (e, t) {
  var n = e("vendor/knockout"), r = e("swx-i18n").localization, i = e("utils/common/async"), s = e("constants/common"), o = e("utils/common/cafeObservable"), u = e("ui/modelHelpers/conversationHelper"), a = e("swx-utils-common").stringUtils, f = e("utils/chat/messageSanitizer"), l = function (e) {
      function m() {
        d || (d = !0, i.execute(function () {
          if (!d)
            return;
          t.topic(y()), d = !1;
        }));
      }
      function g() {
        w();
        if (!l.participants().length) {
          t.topic(v);
          return;
        }
        l.participants().slice(0, s.conversation.NUMBER_OF_PARTICIPANT_NAMES_IN_TOPIC).forEach(function (e) {
          p.push({
            displayName: e.person.displayName,
            subscription: e.person.displayName.changed(m)
          });
        });
      }
      function y() {
        var e = p.map(function (e) {
          return u.isPstnEndpoint(e.displayName()) ? a.forceLTREmbedding(e.displayName()) : e.displayName();
        });
        return e.length < 1 ? v : e.join(s.conversation.TOPIC_DELIMITER);
      }
      function b() {
        l.participants.changed(g);
      }
      function w() {
        p.forEach(function (e) {
          e.subscription.dispose();
        }), p = [];
      }
      function E() {
        w(), l.participants.changed.off(g);
      }
      function S(e) {
        var n = e ? f.getSanitizedTopic(e) : v;
        u.isPstnEndpoint(n) && (n = a.forceLTREmbedding(n)), t.topic(n), d = !1;
      }
      function x(e) {
        S(e), E();
      }
      var t = this, l = e, c = o.newObservableProperty(l.topic), h = c.subscribe(x), p = [], d, v = r.fetch({ key: "conversation_header_topic_untitled_conversation" });
      t.topic = n.observable(v), c() ? S(c()) : b(), t.dispose = function () {
        h.dispose(), E();
      };
    };
  t.build = function (e) {
    return new l(e);
  };
})
