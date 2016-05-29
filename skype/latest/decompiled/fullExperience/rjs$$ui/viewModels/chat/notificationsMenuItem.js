define("ui/viewModels/chat/notificationsMenuItem", [
  "require",
  "services/pubSub/pubSub",
  "constants/common",
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
  var t = e("services/pubSub/pubSub"), n = e("constants/common").events, r = e("swx-i18n").localization;
  return i;
});
