define("notifications/types/unreadMessageReminder", [
  "require",
  "notifications/common/notification",
  "swx-constants",
  "swx-i18n",
  "experience/settings",
  "vendor/knockout",
  "swx-service-locator-instance",
  "notifications/telemetry/browserToastTelemetry",
  "utils/common/localStorage"
], function (e) {
  function c(e) {
    function h(e, t) {
      return {
        uri: s.observable(""),
        status: s.observable(""),
        displayName: s.observable(t ? b.description : ""),
        avatar: s.observable(e)
      };
    }
    function p() {
      function t(e) {
        return e ? !/^19:/.test(e.id) : !1;
      }
      var n = e.length && t(e[0]) ? e[0].id.replace(/^\d+:/, "") : undefined, s = n ? encodeURIComponent(n) : "thread", o = i.avatarService.host + i.avatarService.publicAvatarEndpoint.replace("${contactId}", s);
      return {
        description: r.fetch({
          key: "newChatsSessionOwaToast",
          count: e.length
        }),
        avatar: o.replace("returnDefaultImage=false", "returnDefaultImage=true")
      };
    }
    function d(t, n) {
      var r = u.build(t);
      n ? n.displayNameResolved = c : n = { displayNameResolved: c };
      r.publish(e[0], n);
    }
    var c = f, v = o.resolve(n.serviceLocator.FEATURE_FLAGS), m = v.isFeatureOn(n.featureFlags.CHAT_MESSAGE_TYPE_NOTIFICATION_ENABLED), g, y, b = p(), w = h(b.avatar, m);
    m ? (g = n.notifications.CHAT, y = {
      accept: function (e) {
        d(l.EVENTS.CLICKED, e || {});
      },
      decline: function (e) {
        a.set(l.ignore.TIMEOUT_KEY, Date.now() + l.ignore.TIMEOUT);
        e = e || {};
        e.isDecline = !0;
        d(l.EVENTS.CLICKED, e);
      }
    }) : (g = n.notifications.UNREAD_MESSAGE, y = {
      open: function (e) {
        d(l.EVENTS.CLICKED, e || {});
      }
    });
    var E = new t(g, w, y);
    return m || E.description(b.description), E.displayType = l.displayType.REMINDER, E.publishUnreadMessageTelemetry = d.bind(null, l.EVENTS.SHOWN), E.isUnreadMessage = !0, E;
  }
  var t = e("notifications/common/notification"), n = e("swx-constants").COMMON, r = e("swx-i18n").localization, i = e("experience/settings"), s = e("vendor/knockout"), o = e("swx-service-locator-instance").default, u = e("notifications/telemetry/browserToastTelemetry"), a = e("utils/common/localStorage"), f = "n/a", l = n.telemetry.browserToast;
  return { build: c };
});
