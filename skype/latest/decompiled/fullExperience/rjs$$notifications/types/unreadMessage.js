define("notifications/types/unreadMessage", [
  "require",
  "notifications/common/notification",
  "notifications/common/sender",
  "swx-pubsub-instance",
  "swx-constants",
  "swx-i18n",
  "swx-cafe-application-instance",
  "swx-service-locator-instance",
  "notifications/telemetry/browserToastTelemetry"
], function (e) {
  function f(e) {
    function l(t) {
      if (e.likeAdded)
        return t ? n.fromConversation(d) : n.fromPerson(p.person);
      var r = e.summary || {}, i = r.secondTopicGoesFirst;
      if (t && !i)
        return n.fromConversation(d);
      var s = i ? r.secondConversation.participants()[0].person : p.person || p.sender;
      return n.fromPerson(s);
    }
    function c() {
      if (b && m) {
        var t = e.summary.unreadConversations || [d], n = "", r, i, o, u = s.fetch({ key: "label_text_agent_profile_capabilities_join_char" });
        return t.forEach(function (e) {
          e.isGroupConversation() ? n += n === "" ? e.topic() : u + e.topic() : (r = e.participants && e.participants()[0], i = r.person.firstName(), n += n === "" ? i : u + i);
        }), o = {
          key: "newSummaryOwaToast",
          params: { name: n }
        }, s.fetch(o);
      }
      return e.likeAdded ? v ? s.fetch({
        key: "hearts_notification_messageGroup",
        params: {
          participantName: p.person.displayName(),
          messageText: p.text()
        }
      }) : s.fetch({
        key: "hearts_notification_messageConv",
        params: { messageText: p.text() }
      }) : p.text();
    }
    function N(t) {
      h = {
        model: d,
        origin: i.telemetry.historyLoadOrigin.NOTIFICATION_CONV
      };
      w && E && (h.origin = i.telemetry.historyLoadOrigin.MENTION_ME);
      e.likeAdded && (h.messageId = p.id);
      r.publish(i.events.navigation.OPEN_CONVERSATION, h);
      f.publish(d, t || {});
    }
    var f = a.build(i.telemetry.browserToast.EVENTS.CLICKED), h, p = e.message, d = e.conversation, v = d.isGroupConversation(), m = e.summary && e.summary.show, g = l(v), y = u.resolve(i.serviceLocator.FEATURE_FLAGS), b = y.isFeatureOn(i.featureFlags.CHAT_MESSAGE_TYPE_NOTIFICATION_ENABLED), w = y.isFeatureOn(i.featureFlags.MENTIONS_ENABLED), E = e.likeAdded ? !1 : i.mentions.meIdentifier.test(p.html()), S = w && o.get().personsAndGroupsManager.mePerson.preferences(i.userSettings.preferences.MENTIONS).value(), x, T;
    b ? (x = i.notifications.CHAT, T = {
      accept: N,
      decline: function (e) {
        e = e || {};
        e.isDecline = !0;
        f.publish(d, e);
      }
    }, m && g.displayName(c())) : (x = i.notifications.UNREAD_MESSAGE, T = { open: N });
    var C = new t(x, g, T);
    return b && (C.autoDeactivation = !0), C.description(m ? "" : c()), E && w && S && C.title(s.fetch({
      key: "mention_notification_title",
      params: {
        participant: g.displayName(),
        chat: d.topic()
      }
    })), C;
  }
  var t = e("notifications/common/notification"), n = e("notifications/common/sender"), r = e("swx-pubsub-instance").default, i = e("swx-constants").COMMON, s = e("swx-i18n").localization, o = e("swx-cafe-application-instance"), u = e("swx-service-locator-instance").default, a = e("notifications/telemetry/browserToastTelemetry");
  return { build: f };
});
