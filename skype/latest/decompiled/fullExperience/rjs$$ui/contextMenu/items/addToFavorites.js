define("ui/contextMenu/items/addToFavorites", [
  "require",
  "experience/settings",
  "swx-i18n",
  "ui/contextMenu/menuItem",
  "services/serviceLocator",
  "constants/common",
  "telemetry/chat/telemetryEnumerator",
  "ui/telemetry/telemetryClient"
], function (e) {
  function a() {
    return n.fetch({ key: "favorites_add_to_favorite" });
  }
  function f(e, n) {
    function l() {
      e._isFavorited && (e._isFavorited(!0), c());
    }
    function c() {
      var r = "favorite_added", i = e.participantsCount(), a = {
          origin: n || s.telemetry.NOT_AVAILABLE,
          isGroup: e.isGroupConversation(),
          participantCount: i,
          participantCountGroup: o.getParticipantCountGroup(i)
        };
      u.get().sendEvent(t.telemetry.uiTenantToken, r, a);
    }
    if (!e)
      throw new Error("Parameter missing: conversation is required");
    r.call(this, f.TYPE, a(), l);
    this.isEnabled = function () {
      var t = i.resolve(s.serviceLocator.FEATURE_FLAGS).isFeatureOn(s.featureFlags.FAVORITES_CONVERSATION_ENABLED);
      return t && !!e._isFavorited && !e._isFavorited() && e.leave.enabled();
    };
  }
  var t = e("experience/settings"), n = e("swx-i18n").localization, r = e("ui/contextMenu/menuItem"), i = e("services/serviceLocator"), s = e("constants/common"), o = e("telemetry/chat/telemetryEnumerator"), u = e("ui/telemetry/telemetryClient");
  return f.prototype = Object.create(r.prototype), f.TYPE = "AddToFavoritesMenuItem", f;
});
