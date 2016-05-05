define("ui/contextMenu/items/viewPersonProfile", [
  "require",
  "swx-i18n",
  "ui/contextMenu/menuItem",
  "services/serviceLocator",
  "constants/common",
  "cafe/applicationInstance"
], function (e) {
  function o(e, u, a) {
    function h() {
      var t = r.resolve(i.serviceLocator.PUBSUB), n = s.get().conversationsManager.getConversation(e), o = {
          model: n,
          origin: u,
          target: { expandProfile: !0 },
          telemetryContext: a
        };
      t.publish(i.events.navigation.OPEN_CONVERSATION, o), s.get().conversationsManager.conversations.add(n);
    }
    var f = this, l = t.fetch({ key: "label_text_view_profile_menu_item" }), c = r.resolve(i.serviceLocator.FEATURE_FLAGS);
    n.call(f, o.TYPE, l, h), f.isEnabled = function () {
      return c.isFeatureOn(i.featureFlags.CONTACT_PROFILE);
    };
  }
  var t = e("swx-i18n").localization, n = e("ui/contextMenu/menuItem"), r = e("services/serviceLocator"), i = e("constants/common"), s = e("cafe/applicationInstance");
  return o.prototype = Object.create(n.prototype), o.TYPE = "ViewPersonProfileMenuItem", o;
})
