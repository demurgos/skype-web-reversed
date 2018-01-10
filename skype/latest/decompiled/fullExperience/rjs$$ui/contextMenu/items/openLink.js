define("ui/contextMenu/items/openLink", [
  "require",
  "swx-constants",
  "swx-telemetry-buckets",
  "swx-focus-handler",
  "swx-i18n",
  "ui/contextMenu/menuItem",
  "experience/settings",
  "ui/telemetry/telemetryClient",
  "browser/window"
], function (e) {
  function f(e, l, c) {
    function d() {
      var e = a.open(p, "_blank");
      r.get().addFocusRequestToQueue(e);
      v();
    }
    function v() {
      var r = "message_urlpreview_open_link", i = e.conversation.participantsCount(), s = new a.Date().getTime() - l.timestamp.getTime(), f = {
          tis: s,
          ttcGroup: n.getMessageLifeDurationGroup(s),
          participantCount: i,
          participantCountGroup: n.getParticipantCountGroup(i),
          contentType: l.copyLinkEnabled() ? l.previews()[0].type() : t.telemetry.NOT_AVAILABLE
        };
      u.get().sendEvent(o.telemetry.uiTenantToken, r, f);
    }
    if (!e || !l)
      throw new Error("Parameter missing: context and message are required");
    var h = i.fetch({ key: "chatLogmenuItem_open_link" });
    s.call(this, f.TYPE, h, d);
    var p = l.copyLinkEnabled() ? l.previews()[0].originalRequest : c && c.target && c.target.href;
    this.isEnabled = function () {
      return l.copyLinkEnabled() || !!p;
    };
  }
  var t = e("swx-constants").COMMON, n = e("swx-telemetry-buckets"), r = e("swx-focus-handler"), i = e("swx-i18n").localization, s = e("ui/contextMenu/menuItem"), o = e("experience/settings"), u = e("ui/telemetry/telemetryClient"), a = e("browser/window");
  return f.prototype = Object.create(s.prototype), f.TYPE = "OpenLinkMenuItem", f;
});
