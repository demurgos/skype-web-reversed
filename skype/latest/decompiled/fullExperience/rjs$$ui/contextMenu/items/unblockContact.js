define("ui/contextMenu/items/unblockContact", [
  "require",
  "swx-i18n",
  "ui/contextMenu/menuItem",
  "cafe/applicationInstance",
  "services/serviceLocator",
  "constants/common",
  "ui/telemetry/actions/actionNames",
  "ui/telemetry/actions/actionSources",
  "constants/cssClasses"
], function (e) {
  function f(e, l) {
    function d() {
      function t() {
        var e = i.resolve(s.serviceLocator.ACTION_TELEMETRY);
        e.recordAction(o.contacts.contactUnblocked, l);
      }
      var e;
      return h.isBlocked.set.enabled() ? e = h.isBlocked.set(!1) : e = Promise.resolve(!1), e.then(function () {
        p.publish(s.events.navigation.OPEN_CONVERSATION, {
          model: r.get().conversationsManager.getConversation(h),
          origin: s.telemetry.historyLoadOrigin.CONTACT_SEARCH
        });
      }), t(), e;
    }
    var c, h, p = i.resolve(s.serviceLocator.PUBSUB);
    if (!e)
      throw new Error("Parameter missing: contactVM is required");
    h = e.getPerson();
    l = l || { source: u.contextMenuItem.unblock };
    c = t.fetch({ key: "label_text_unblockContact" });
    n.call(this, f.TYPE, c, d);
    this.cssClass = a.contextMenu.items.UNBLOCK_CONTACT;
    this.isEnabled = function () {
      return h.isBlocked.set.enabled() && e.isBlocked() && !e.isPstn();
    };
  }
  var t = e("swx-i18n").localization, n = e("ui/contextMenu/menuItem"), r = e("cafe/applicationInstance"), i = e("services/serviceLocator"), s = e("constants/common"), o = e("ui/telemetry/actions/actionNames"), u = e("ui/telemetry/actions/actionSources"), a = e("constants/cssClasses");
  return f.prototype = Object.create(n.prototype), f.TYPE = "UnblockContactMenuItem", f;
});
