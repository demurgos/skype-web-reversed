define("ui/contextMenu/items/openConversation", [
  "require",
  "swx-i18n",
  "ui/contextMenu/menuItem",
  "swx-pubsub-instance",
  "swx-constants"
], function (e) {
  function o(e) {
    function a() {
      r.publish(s.OPEN_CONVERSATION, {
        model: e,
        origin: i.telemetry.historyLoadOrigin.ROSTER
      });
    }
    var u = t.fetch({ key: "label_text_headerMenuInstantMessage" });
    n.call(this, o.TYPE, u, a);
  }
  var t = e("swx-i18n").localization, n = e("ui/contextMenu/menuItem"), r = e("swx-pubsub-instance").default, i = e("swx-constants").COMMON, s = i.events.navigation;
  return o.prototype = Object.create(n.prototype), o.TYPE = "OpenConversationMenuItem", o;
});
