define("ui/contextMenu/items/copyLink", [
  "require",
  "utils/common/clipboard",
  "swx-constants",
  "swx-telemetry-buckets",
  "swx-i18n",
  "ui/contextMenu/menuItem",
  "experience/settings",
  "ui/telemetry/telemetryClient",
  "browser/window"
], function (e) {
  function f(e, l, c) {
    function d() {
      t.copyText(p);
      v();
    }
    function v() {
      var t = "message_urlpreview_copy_link", i = e.conversation.participantsCount(), s = new a.Date().getTime() - l.timestamp.getTime(), f = {
          tis: s,
          ttcGroup: r.getMessageLifeDurationGroup(s),
          participantCount: i,
          participantCountGroup: r.getParticipantCountGroup(i),
          contentType: l.copyLinkEnabled() ? l.previews()[0].type() : n.telemetry.NOT_AVAILABLE
        };
      u.get().sendEvent(o.telemetry.uiTenantToken, t, f);
    }
    if (!e || !l)
      throw new Error("Parameter missing: context and message are required");
    var h = i.fetch({ key: "chatLogmenuItem_copy_link" });
    s.call(this, f.TYPE, h, d);
    var p = l.copyLinkEnabled() ? l.previews()[0].originalRequest : c && c.target && c.target.href;
    this.isEnabled = function () {
      var e = t.isCopySupportedByBrowser();
      return e && (l.copyLinkEnabled() || !!p);
    };
  }
  var t = e("utils/common/clipboard"), n = e("swx-constants").COMMON, r = e("swx-telemetry-buckets"), i = e("swx-i18n").localization, s = e("ui/contextMenu/menuItem"), o = e("experience/settings"), u = e("ui/telemetry/telemetryClient"), a = e("browser/window");
  return f.prototype = Object.create(s.prototype), f.TYPE = "CopyLinkMenuItem", f;
});
