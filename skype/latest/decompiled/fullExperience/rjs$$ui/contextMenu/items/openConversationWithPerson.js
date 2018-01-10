define("ui/contextMenu/items/openConversationWithPerson", [
  "require",
  "swx-i18n",
  "ui/contextMenu/menuItem",
  "swx-service-locator-instance",
  "swx-constants",
  "swx-cafe-application-instance"
], function (e) {
  function o(e, u) {
    function l() {
      var t = r.resolve(i.serviceLocator.PUBSUB), n = s.get().conversationsManager.getConversation(e), o = {
          model: n,
          origin: u || i.telemetry.historyLoadOrigin.ROSTER
        };
      t.publish(i.events.navigation.OPEN_CONVERSATION, o);
      s.get().conversationsManager.conversations.add(n);
    }
    var a = this, f = t.fetch({ key: "label_text_headerMenuInstantMessage" });
    n.call(a, o.TYPE, f, l);
  }
  var t = e("swx-i18n").localization, n = e("ui/contextMenu/menuItem"), r = e("swx-service-locator-instance").default, i = e("swx-constants").COMMON, s = e("swx-cafe-application-instance");
  return o.prototype = Object.create(n.prototype), o.TYPE = "OpenConversationWithPersonMenuItem", o;
});
