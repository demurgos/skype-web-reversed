define("ui/contextMenu/items/openLink", [
  "require",
  "experience/settings",
  "swx-i18n",
  "ui/contextMenu/menuItem",
  "telemetry/chat/telemetryEnumerator",
  "ui/telemetry/telemetryClient",
  "browser/window"
], function (e) {
  function u(e, a) {
    function l() {
      var e = a.previews()[0].originalRequest, t = o.open(e, "_blank");
      t.focus();
      c();
    }
    function c() {
      var n = "message_urlpreview_open_link", r = e.conversation.participantsCount(), u = new o.Date().getTime() - a.timestamp.getTime(), f = {
          tis: u,
          ttcGroup: i.getMessageLifeDurationGroup(u),
          participantCount: r,
          participantCountGroup: i.getParticipantCountGroup(r),
          contentType: a.previews()[0].type()
        };
      s.get().sendEvent(t.telemetry.uiTenantToken, n, f);
    }
    if (!e || !a)
      throw new Error("Parameter missing: context and message are required");
    var f = n.fetch({ key: "chatLogmenuItem_open_link" });
    r.call(this, u.TYPE, f, l);
    this.isEnabled = function () {
      return a.copyLinkEnabled();
    };
  }
  var t = e("experience/settings"), n = e("swx-i18n").localization, r = e("ui/contextMenu/menuItem"), i = e("telemetry/chat/telemetryEnumerator"), s = e("ui/telemetry/telemetryClient"), o = e("browser/window");
  return u.prototype = Object.create(r.prototype), u.TYPE = "OpenLinkMenuItem", u;
});
