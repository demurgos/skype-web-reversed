define("notifications/types/education", [
  "require",
  "notifications/common/notification",
  "swx-constants",
  "experience/settings",
  "vendor/knockout"
], function (e) {
  function s(e) {
    if (!e || !e.educationalMessage)
      return;
    var s = n.notifications.UNREAD_MESSAGE, o = r.assetsBaseUrl + "/images/icons/skypeLogo.png", u = {
        avatar: i.observable(e.iconUrl || o),
        uri: i.observable(""),
        displayName: i.observable("")
      }, a = e.clickAction ? { open: e.clickAction } : void 0, f = new t(s, u, a);
    return f.description(e.educationalMessage), e.showAction && (f.onshow = e.showAction), f;
  }
  var t = e("notifications/common/notification"), n = e("swx-constants").COMMON, r = e("experience/settings"), i = e("vendor/knockout");
  return { build: s };
});
