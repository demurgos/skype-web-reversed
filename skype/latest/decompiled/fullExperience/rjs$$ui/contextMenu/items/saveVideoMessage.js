define("ui/contextMenu/items/saveVideoMessage", [
  "require",
  "swx-i18n",
  "browser/dom",
  "ui/contextMenu/menuItem",
  "swx-service-locator-instance",
  "swx-constants",
  "swx-enums",
  "ui/telemetry/actions/actionNames"
], function (e) {
  function a(e) {
    function c() {
      var t = n.createElement("a");
      t.href = e.mediaUrl();
      t.click();
    }
    function h() {
      var e = i.resolve(s.serviceLocator.ACTION_TELEMETRY);
      e.recordAction(u.chat.saveVideoMessage);
    }
    function p() {
      c();
      h();
    }
    if (!e)
      throw new Error("Parameter missing: message is required");
    var f = t.fetch({ key: "chatLogmenuItem_text_save" }), l = i.resolve(s.serviceLocator.FEATURE_FLAGS);
    r.call(this, a.TYPE, f, p);
    this.isEnabled = function () {
      var t = l.isFeatureOn(s.featureFlags.CONTEXT_MENU_SAVE_VIDEO_MESSAGES_ENABLED), n = e.type() === o.activityType.VideoMessage;
      return t && n && !e.isDeleted();
    };
  }
  var t = e("swx-i18n").localization, n = e("browser/dom"), r = e("ui/contextMenu/menuItem"), i = e("swx-service-locator-instance").default, s = e("swx-constants").COMMON, o = e("swx-enums"), u = e("ui/telemetry/actions/actionNames");
  return a.prototype = Object.create(r.prototype), a.TYPE = "SaveVideoMessageMenuItem", a;
});
