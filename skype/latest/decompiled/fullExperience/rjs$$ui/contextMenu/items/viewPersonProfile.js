define("ui/contextMenu/items/viewPersonProfile", [
  "require",
  "swx-i18n",
  "ui/contextMenu/menuItem",
  "swx-service-locator-instance",
  "swx-constants",
  "swx-cafe-application-instance",
  "ui/modelHelpers/personHelper"
], function (e) {
  function u(e, a, f) {
    function h() {
      var t = r.resolve(i.serviceLocator.PUBSUB), n = s.get().conversationsManager.getConversation(e), o = {
          model: n,
          origin: a,
          target: { expandProfile: !0 },
          telemetryContext: f
        };
      t.publish(i.events.navigation.OPEN_CONVERSATION, o);
      s.get().conversationsManager.conversations.add(n);
    }
    var l = this, c = t.fetch({ key: "label_text_view_profile_menu_item" });
    n.call(l, u.TYPE, c, h);
    l.isEnabled = function () {
      return !o.isWelcomeAgent(e);
    };
  }
  var t = e("swx-i18n").localization, n = e("ui/contextMenu/menuItem"), r = e("swx-service-locator-instance").default, i = e("swx-constants").COMMON, s = e("swx-cafe-application-instance"), o = e("ui/modelHelpers/personHelper");
  return u.prototype = Object.create(n.prototype), u.TYPE = "ViewPersonProfileMenuItem", u;
});
