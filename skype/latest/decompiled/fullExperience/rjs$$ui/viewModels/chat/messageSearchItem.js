define("ui/viewModels/chat/messageSearchItem", [
  "require",
  "lodash-compat",
  "vendor/knockout",
  "swx-i18n",
  "constants/common",
  "utils/chat/messageSanitizer",
  "utils/chat/dateTime",
  "cafe/applicationInstance",
  "services/pubSub/pubSub",
  "services/telemetry/logging/perf/main",
  "ui/viewModels/chat/conversationTile",
  "ui/modelHelpers/personHelper",
  "swx-enums"
], function (e) {
  var t = e("lodash-compat"), n = e("vendor/knockout"), r = e("swx-i18n").localization, i = e("constants/common"), s = e("utils/chat/messageSanitizer"), o = e("utils/chat/dateTime"), u = e("cafe/applicationInstance"), a = e("services/pubSub/pubSub"), f = e("services/telemetry/logging/perf/main"), l = e("ui/viewModels/chat/conversationTile"), c = e("ui/modelHelpers/personHelper"), h = e("swx-enums"), p = i.events.navigation;
  return function () {
    function g(e) {
      function s() {
        return u.get().personsAndGroupsManager.mePerson.id() === i ? (n = u.get().personsAndGroupsManager.mePerson, d.avatarUrl(n.avatarUrl()), d.userName(n.displayName()), !0) : !1;
      }
      function o() {
        var e = m.participants(), r = t.findIndex(e, function (e) {
            return e.person.id() === i;
          });
        return r !== -1 ? (n = e[r].person, d.avatarUrl(n.avatarUrl()), d.userName(n.displayName()), !0) : !1;
      }
      var n, r, i = c.getId(e.From);
      if (s() || o())
        return;
      r = u.get().personsAndGroupsManager.createPersonSearchQuery();
      r.sources(h.searchScope.All);
      r.text("id:" + i);
      r.getMore().then(function () {
        var e = r.results();
        n = e[0].result;
        d.avatarUrl(n.avatarUrl());
        d.userName(n.displayName());
      });
    }
    function y(e, t) {
      var n = {
          key: "content_search_conversation_title",
          params: { conversationTitle: s.escapeIncomingHTML(t) }
        }, r = new Date(e);
      return o.getTimeSinceTimestamp(r, n);
    }
    var d = this, v, m;
    d.init = function (t, r) {
      m = r;
      v = l.build(m);
      d.displayMessage = t.Content;
      d.messageId = t.ClientMessageId;
      d.isGroupConversation = !1;
      d.conversation = y(t.CreationDate, m.topic());
      d.userName = n.observable("");
      d.avatarUrl = n.observable("");
      g(t);
      d.statusClassName = v.statusClassName;
      d.isAgent = v.isAgent;
      d.isActive = !1;
    };
    d.dispose = function () {
      v.dispose();
    };
    d.handleClick = function (t, n) {
      var r = i.telemetry.historyLoadOrigin.TIMELINE_CLICK;
      f.getInstance().startTrace("navigateConversation");
      n.preventDefault();
      a.publish(p.OPEN_CONVERSATION, {
        model: m,
        messageId: t.messageId + "",
        origin: r
      });
    };
    d.ariaLabel = n.pureComputed(function () {
      var e = "content_search_aria";
      return r.fetch({
        key: e,
        count: 0,
        params: { topic: m.topic() }
      });
    });
  };
});
