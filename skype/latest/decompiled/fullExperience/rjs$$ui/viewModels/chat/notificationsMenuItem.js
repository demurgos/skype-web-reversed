define("ui/viewModels/chat/notificationsMenuItem", [
  "require",
  "swx-pubsub-instance",
  "swx-constants",
  "swx-i18n"
], function (e) {
  function i(e) {
    var i = this, s = !1;
    i.id = "menuItem-notifications";
    i.text = r.fetch({ key: "notificationsPage_text_menuLink" });
    i.isDisabled = e.isDisabled ? e.isDisabled : !1;
    i.onClick = function () {
      s = !s;
      t.publish(n.navigation.NOTIFICATIONS_CENTER, s);
    };
  }
  var t = e("swx-pubsub-instance").default, n = e("swx-constants").COMMON.events, r = e("swx-i18n").localization;
  return i;
});
