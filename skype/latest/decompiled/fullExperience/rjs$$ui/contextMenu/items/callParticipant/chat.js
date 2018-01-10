define("ui/contextMenu/items/callParticipant/chat", [
  "require",
  "swx-cafe-application-instance",
  "swx-i18n",
  "ui/contextMenu/menuItem",
  "swx-constants",
  "ui/telemetry/actions/actionNames",
  "swx-service-locator-instance",
  "swx-browser-detect"
], function (e) {
  function a(e) {
    function l() {
      c();
      h();
    }
    function c() {
      var n = o.resolve(i.serviceLocator.PUBSUB), r = t.get().conversationsManager.getConversation(e), s = { model: r };
      n.publish(i.events.navigation.OPEN_CONVERSATION, s);
      n.publish(i.events.narrowMode.SHOW_SIDEBAR);
    }
    function h() {
      var e = o.resolve(i.serviceLocator.ACTION_TELEMETRY);
      e.recordAction(s.audioVideo.participantMenu.chat);
    }
    if (!e)
      throw new Error("Parameter missing: person is required");
    var f = n.fetch({ key: "callscreen_participantMenu_chat" });
    r.call(this, a.TYPE, f, l);
    this.isEnabled = function () {
      var e = !o.resolve(i.serviceLocator.FEATURE_FLAGS).isFeatureOn(i.featureFlags.DISABLE_CALLSCREEN_CHAT_OPTION);
      return !u.getBrowserInfo().isShellApp && e;
    };
  }
  var t = e("swx-cafe-application-instance"), n = e("swx-i18n").localization, r = e("ui/contextMenu/menuItem"), i = e("swx-constants").COMMON, s = e("ui/telemetry/actions/actionNames"), o = e("swx-service-locator-instance").default, u = e("swx-browser-detect").default;
  return a.prototype = Object.create(r.prototype), a.TYPE = "CallParticipantChatMenuItem", a;
});
