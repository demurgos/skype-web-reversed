define("ui/contextMenu/items/unblockContact", [
  "require",
  "swx-i18n",
  "ui/contextMenu/menuItem",
  "swx-cafe-application-instance",
  "swx-service-locator-instance",
  "swx-constants",
  "ui/telemetry/actions/actionSources",
  "ui/modelHelpers/personActionsHelper",
  "constants/cssClasses"
], function (e) {
  function f(e, l) {
    function d() {
      function e() {
        p.publish(s.events.navigation.OPEN_CONVERSATION, {
          model: r.get().conversationsManager.getConversation(h),
          origin: s.telemetry.historyLoadOrigin.CONTACT_SEARCH
        });
      }
      return u.unblockPerson(h, l, e);
    }
    function v() {
      return e.isAgent() ? t.fetch({ key: "label_text_unblock_agent" }) : t.fetch({ key: "label_text_unblockContact" });
    }
    var c, h, p = i.resolve(s.serviceLocator.PUBSUB);
    if (!e)
      throw new Error("Parameter missing: contactVM is required");
    h = e.getPerson();
    l = l || { source: o.contextMenuItem.unblock };
    c = v();
    n.call(this, f.TYPE, c, d);
    this.cssClass = a.contextMenu.items.UNBLOCK_CONTACT;
    this.isEnabled = function () {
      return h.isBlocked.set.enabled() && e.isBlocked() && !e.isPstn();
    };
  }
  var t = e("swx-i18n").localization, n = e("ui/contextMenu/menuItem"), r = e("swx-cafe-application-instance"), i = e("swx-service-locator-instance").default, s = e("swx-constants").COMMON, o = e("ui/telemetry/actions/actionSources"), u = e("ui/modelHelpers/personActionsHelper"), a = e("constants/cssClasses");
  return f.prototype = Object.create(n.prototype), f.TYPE = "UnblockContactMenuItem", f;
});
