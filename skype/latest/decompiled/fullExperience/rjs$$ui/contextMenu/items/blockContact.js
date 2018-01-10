define("ui/contextMenu/items/blockContact", [
  "require",
  "swx-i18n",
  "ui/contextMenu/menuItem",
  "ui/modalDialog/modalDialog",
  "ui/viewModels/people/blockContactModal",
  "text!views/people/blockContactModal.html",
  "ui/telemetry/actions/actionSources",
  "constants/cssClasses"
], function (e) {
  function a(e, f) {
    function c() {
      var t = new i(e.getPerson(), f);
      r.build(i.ELEMENT_ID, t, s);
      r.show(i.ELEMENT_ID, p());
    }
    function h() {
      return e.isAgent() ? t.fetch({ key: "label_text_block_agent" }) : t.fetch({ key: "label_text_blockContact" });
    }
    function p() {
      return e.isAgent() ? t.fetch({ key: "modal_block_agent_text_aria_label" }) : t.fetch({ key: "modal_blockContact_text_aria_label" });
    }
    var l;
    f = f || { source: o.contextMenuItem.block };
    if (!e)
      throw new Error("Parameter missing: contactVM is required");
    l = h();
    n.call(this, a.TYPE, l, c);
    this.cssClass = u.contextMenu.items.BLOCK_CONTACT;
    this.isEnabled = function () {
      return e.getPerson().isBlocked.set.enabled() && !e.isBlocked() && !e.isPstn();
    };
  }
  var t = e("swx-i18n").localization, n = e("ui/contextMenu/menuItem"), r = e("ui/modalDialog/modalDialog"), i = e("ui/viewModels/people/blockContactModal"), s = e("text!views/people/blockContactModal.html"), o = e("ui/telemetry/actions/actionSources"), u = e("constants/cssClasses");
  return a.prototype = Object.create(n.prototype), a.TYPE = "BlockContactMenuItem", a;
});
