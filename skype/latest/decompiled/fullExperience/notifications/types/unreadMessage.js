define("notifications/types/unreadMessage", [
  "require",
  "notifications/common/notification",
  "notifications/common/sender",
  "services/pubSub/pubSub",
  "constants/common",
  "swx-i18n",
  "cafe/applicationInstance",
  "services/serviceLocator"
], function (e) {
  function a(e) {
    function a(t) {
      return e.likeAdded ? t ? n.fromConversation(h) : n.fromPerson(c.person) : n.fromPerson(c.sender);
    }
    function f(t) {
      return e.likeAdded ? t ? s.fetch({
        key: "hearts_notification_messageGroup",
        params: {
          participantName: c.person.displayName(),
          messageText: c.text()
        }
      }) : s.fetch({
        key: "hearts_notification_messageConv",
        params: { messageText: c.text() }
      }) : c.text();
    }
    var l, c = e.message, h = e.conversation, p = i.notifications.UNREAD_MESSAGE, d = h.isGroupConversation(), v = a(d), m = u.resolve(i.serviceLocator.FEATURE_FLAGS), g = m.isFeatureOn(i.featureFlags.MENTIONS_ENABLED), y = e.likeAdded ? !1 : i.mentions.meIdentifier.test(c.html()), b = g && o.get().personsAndGroupsManager.mePerson.preferences(i.userSettings.preferences.MENTIONS).value(), w = {
        open: function () {
          l = {
            model: h,
            origin: i.telemetry.historyLoadOrigin.NOTIFICATION_CONV
          }, g && y && (l.origin = i.telemetry.historyLoadOrigin.MENTION_ME), e.likeAdded && (l.messageId = c.id), r.publish(i.events.navigation.OPEN_CONVERSATION, l);
        }
      }, E = new t(p, v, w);
    return E.description(f(d)), y && g && b && E.title(s.fetch({
      key: "mention_notification_title",
      params: {
        participant: v.displayName(),
        chat: h.topic()
      }
    })), E;
  }
  var t = e("notifications/common/notification"), n = e("notifications/common/sender"), r = e("services/pubSub/pubSub"), i = e("constants/common"), s = e("swx-i18n").localization, o = e("cafe/applicationInstance"), u = e("services/serviceLocator");
  return { build: a };
})
