define("notifications/common/sender", [
  "require",
  "exports",
  "module",
  "swx-utils-chat",
  "utils/common/cafeObservable",
  "vendor/knockout",
  "lodash-compat",
  "swx-utils-common",
  "swx-enums",
  "swx-i18n",
  "experience/settings",
  "swx-constants",
  "swx-utils-common",
  "swx-service-locator-instance"
], function (e, t) {
  function p(e) {
    var t, r = a.fetch({ key: "notification_text_group_conversation_from" });
    return e.topic() ? t = n.getSanitizedTopic(e.topic()) : t = r + " " + e.participants(0).person.displayName(), i.observable(s.unescape(t));
  }
  function d(e) {
    return e.isGroupConversation() ? {
      uri: i.observable("local:" + o.create()),
      status: i.observable(u.Unknown),
      displayName: p(e),
      avatar: m(e.avatarUrl, f.assetsBaseUrl + "/images/avatars/default-avatar-group.png")
    } : v(e.participants(0).person);
  }
  function v(e) {
    return {
      uri: r.newObservableProperty(e.id),
      status: r.newObservableProperty(e.status),
      displayName: i.observable(s.unescape(e.displayName())),
      avatar: m(e.avatarUrl, f.assetsBaseUrl + "/images/avatars/default-avatar-contact.png")
    };
  }
  function m(e, t) {
    var n = h.resolve(l.serviceLocator.FEATURE_FLAGS), r = t;
    return !n.isFeatureOn(l.featureFlags.SHOW_DEFAULT_AVATAR_IN_NOTIFICATIONS) && e() && (r = c.removeQueryParameter(e(), "returnDefaultImage")), i.observable(r);
  }
  var n = e("swx-utils-chat").messageSanitizer, r = e("utils/common/cafeObservable"), i = e("vendor/knockout"), s = e("lodash-compat"), o = e("swx-utils-common").guid, u = e("swx-enums").onlineStatus, a = e("swx-i18n").localization, f = e("experience/settings"), l = e("swx-constants").COMMON, c = e("swx-utils-common").url, h = e("swx-service-locator-instance").default;
  t.fromConversation = d;
  t.fromPerson = v;
});
