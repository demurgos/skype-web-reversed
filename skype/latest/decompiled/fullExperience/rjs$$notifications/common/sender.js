define("notifications/common/sender", [
  "require",
  "exports",
  "module",
  "utils/chat/messageSanitizer",
  "utils/common/cafeObservable",
  "vendor/knockout",
  "swx-utils-common",
  "swx-enums",
  "swx-i18n",
  "experience/settings",
  "constants/common",
  "services/serviceLocator"
], function (e, t) {
  function c(e) {
    var t, r = u.fetch({ key: "notification_text_group_conversation_from" });
    return e.topic() ? t = n.getSanitizedTopic(e.topic()) : t = r + " " + e.participants(0).person.displayName(), i.observable(t);
  }
  function h(e) {
    return e.isGroupConversation() ? {
      uri: i.observable("local:" + s.create()),
      status: i.observable(o.Unknown),
      displayName: c(e),
      avatar: d(e.avatarUrl, a.assetsBaseUrl + "/images/avatars/default-avatar-group.png")
    } : p(e.participants(0).person);
  }
  function p(e) {
    return {
      uri: r.newObservableProperty(e.id),
      status: r.newObservableProperty(e.status),
      displayName: r.newObservableProperty(e.displayName),
      avatar: d(e.avatarUrl, a.assetsBaseUrl + "/images/avatars/default-avatar-contact.png")
    };
  }
  function d(e, t) {
    var n = l.resolve(f.serviceLocator.FEATURE_FLAGS);
    return !e() || n.isFeatureOn(f.featureFlags.SHOW_DEFAULT_AVATAR_IN_NOTIFICATIONS) ? i.observable(t) : r.newObservableProperty(e);
  }
  var n = e("utils/chat/messageSanitizer"), r = e("utils/common/cafeObservable"), i = e("vendor/knockout"), s = e("swx-utils-common").guid, o = e("swx-enums").onlineStatus, u = e("swx-i18n").localization, a = e("experience/settings"), f = e("constants/common"), l = e("services/serviceLocator");
  t.fromConversation = h;
  t.fromPerson = p;
});
