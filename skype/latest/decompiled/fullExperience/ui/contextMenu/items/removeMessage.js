define("ui/contextMenu/items/removeMessage", [
  "require",
  "swx-i18n",
  "ui/contextMenu/menuItem",
  "swx-enums",
  "services/serviceLocator",
  "constants/common",
  "ui/telemetry/actions/actionNames",
  "ui/telemetry/actions/actionSources",
  "telemetry/chat/telemetryEnumerator"
], function (e) {
  function f(e, l) {
    function h() {
      e.html(""), d();
    }
    function p() {
      return new Date() - e.timestamp();
    }
    function d() {
      l.lifetime = p(), l.timedelta = a.getMessageLifeDurationGroup(new Date() - e.timestamp()), l.type = e.type();
      var t = i.resolve(s.serviceLocator.ACTION_TELEMETRY);
      t.recordAction(o.chat.removeMessage, l);
    }
    if (!e)
      throw new Error("Parameter missing: message is required");
    var c = t.fetch({ key: "chatLogmenuItem_text_remove" });
    l = l || { source: u.contextMenuItem.removeMessage }, n.call(this, f.TYPE, c, h), this.isEnabled = function () {
      var t = e.status() === r.activityStatus.Succeeded, n = e.html && e.html.set.enabled(), i = n && !e.isDeleted() && e.type() !== r.activityType.SystemMessage;
      return !!t && !!i;
    };
  }
  var t = e("swx-i18n").localization, n = e("ui/contextMenu/menuItem"), r = e("swx-enums"), i = e("services/serviceLocator"), s = e("constants/common"), o = e("ui/telemetry/actions/actionNames"), u = e("ui/telemetry/actions/actionSources"), a = e("telemetry/chat/telemetryEnumerator");
  return f.prototype = Object.create(n.prototype), f.TYPE = "RemoveMessageMenuItem", f;
})
