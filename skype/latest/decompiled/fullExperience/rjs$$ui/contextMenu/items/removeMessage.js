define("ui/contextMenu/items/removeMessage", [
  "require",
  "swx-i18n",
  "ui/contextMenu/menuItem",
  "swx-enums",
  "swx-service-locator-instance",
  "swx-constants",
  "ui/telemetry/actions/actionNames",
  "ui/telemetry/actions/actionSources",
  "swx-telemetry-buckets",
  "swx-pubsub-instance"
], function (e) {
  function c(e, h) {
    function d() {
      var t = e.model ? e.clientmessageid : e.key();
      e.html("");
      m();
      l.publish(o.message.REMOVED, t);
    }
    function v() {
      return new Date() - e.timestamp();
    }
    function m() {
      h.lifetime = v();
      h.timedelta = f.getMessageLifeDurationGroup(new Date() - e.timestamp());
      h.type = e.type();
      var t = i.resolve(s.serviceLocator.ACTION_TELEMETRY);
      t.recordAction(u.chat.removeMessage, h);
    }
    if (!e)
      throw new Error("Parameter missing: message is required");
    var p = t.fetch({ key: "chatLogmenuItem_text_remove" });
    h = h || { source: a.contextMenuItem.removeMessage };
    n.call(this, c.TYPE, p, d);
    this.isEnabled = function () {
      var t = e.status() === r.activityStatus.Succeeded, n = e.html && e.html.set.enabled(), i = n && !e.isDeleted() && e.type() !== r.activityType.SystemMessage, s = e._isSMS && e._isSMS();
      return !!t && !!i && !s;
    };
  }
  var t = e("swx-i18n").localization, n = e("ui/contextMenu/menuItem"), r = e("swx-enums"), i = e("swx-service-locator-instance").default, s = e("swx-constants").COMMON, o = s.events, u = e("ui/telemetry/actions/actionNames"), a = e("ui/telemetry/actions/actionSources"), f = e("swx-telemetry-buckets"), l = e("swx-pubsub-instance").default;
  return c.prototype = Object.create(n.prototype), c.TYPE = "RemoveMessageMenuItem", c;
});
