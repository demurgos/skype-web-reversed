define("ui/viewModels/chat/conversationTopic", [
  "require",
  "exports",
  "module",
  "vendor/knockout",
  "swx-i18n",
  "swx-utils-common",
  "swx-constants",
  "utils/common/cafeObservable",
  "ui/modelHelpers/conversationHelper",
  "swx-utils-common",
  "swx-utils-chat"
], function (e, t) {
  var n = e("vendor/knockout"), r = e("swx-i18n").localization, i = e("swx-utils-common").async, s = e("swx-constants").COMMON, o = e("utils/common/cafeObservable"), u = e("ui/modelHelpers/conversationHelper"), a = e("swx-utils-common").stringUtils, f = e("swx-utils-chat").messageSanitizer, l = function (e) {
      function g() {
        v || (v = !0, i.execute(function () {
          if (!v)
            return;
          t.topic(b());
          v = !1;
        }));
      }
      function y() {
        E();
        if (!l.participants().length) {
          t.topic(m);
          return;
        }
        l.participants().slice(0, s.conversation.NUMBER_OF_PARTICIPANT_NAMES_IN_TOPIC).forEach(function (e) {
          d.push({
            displayName: e.person.displayName,
            subscription: e.person.displayName.changed(g)
          });
        });
      }
      function b() {
        var e = d.map(function (e) {
          return u.isPstnEndpoint(e.displayName()) ? a.forceLTREmbedding(e.displayName()) : e.displayName();
        });
        return e.length < 1 ? m : e.join(s.conversation.TOPIC_DELIMITER);
      }
      function w() {
        l.participants.changed(y);
      }
      function E() {
        d.forEach(function (e) {
          e.subscription.dispose();
        });
        d = [];
      }
      function S() {
        E();
        l.participants.changed.off(y);
      }
      function x(e) {
        function r(e) {
          var t = e.replace(/<[^a\/].*?>(.*?)<\/[^a].*?>/gi, "$1"), n = t.replace(/(<.*?\.{3,})$/, "").trim(), r = n === "" ? "" : f.validateUnescapedLink(n).replace(/&lt;/g, "<").replace(/&gt;/g, ">");
          return r;
        }
        var n = e ? f.getSanitizedTopic(e) : m;
        u.isPstnEndpoint(n) && (n = a.forceLTREmbedding(n));
        t.topic(r(n));
        v = !1;
      }
      function T(e) {
        x(e);
        S();
      }
      var t = this, l = e, c = l.participants(0), h = o.newObservableProperty(l.topic), p = h.subscribe(T), d = [], v, m = r.fetch({ key: "conversation_header_topic_untitled_conversation" });
      t.topic = n.observable(m);
      !l.isGroupConversation() && c && (t.displayName = o.newObservableProperty(c.person.displayName));
      h() ? x(h()) : w();
      t.dispose = function () {
        p.dispose();
        S();
      };
    };
  t.build = function (e) {
    return new l(e);
  };
});
