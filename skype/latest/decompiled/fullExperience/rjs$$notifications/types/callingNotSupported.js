define("notifications/types/callingNotSupported", [
  "require",
  "notifications/common/notification",
  "swx-constants",
  "swx-utils-people",
  "constants/calling.resources",
  "swx-i18n"
], function (e) {
  function o(e, t) {
    var n = i.linkTemplate, o = s.fetch({ key: "notification_text_learnMore" }), u = r.stripAnchors(t), a = r.sanitizeXml(u);
    return e.replace("{callerName}", a) + " " + n.replace("{notification_text_learnMore}", o);
  }
  function u(e, r) {
    var i, u;
    e ? i = s.fetch({ key: "notification_text_osNotSupported" }) : i = s.fetch({ key: "notification_text_browserNotSupported" });
    u = o(i, r.topic());
    var a = new t(n.notifications.WARNING);
    return a.title(u), a;
  }
  var t = e("notifications/common/notification"), n = e("swx-constants").COMMON, r = e("swx-utils-people").userDataProcessor, i = e("constants/calling.resources").notifications.incomingCall, s = e("swx-i18n").localization;
  return { build: u };
});
