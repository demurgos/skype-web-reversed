define("ui/contextMenu/items/deleteContact", [
  "require",
  "swx-i18n",
  "ui/contextMenu/menuItem",
  "ui/modalDialog/modalDialog",
  "ui/viewModels/people/deleteContactModal",
  "text!views/people/deleteContactModal.html",
  "ui/telemetry/actions/actionSources",
  "constants/cssClasses",
  "ui/modelHelpers/personHelper"
], function (e) {
  function f(e, l) {
    function h() {
      var t = new i(e, l), n = d();
      r.build(i.ELEMENT_ID, t, s);
      r.show(i.ELEMENT_ID, n);
    }
    function p() {
      return e.isAgent() ? t.fetch({ key: "label_text_delete_agent" }) : t.fetch({ key: "label_text_deleteContact" });
    }
    function d() {
      return e.isAgent() ? t.fetch({ key: "modal_delete_agent_text_aria_label" }) : t.fetch({ key: "modal_deleteContact_text_aria_label" });
    }
    var c;
    if (!e)
      throw new Error("Parameter missing: contactVM is required");
    l = l || { source: o.contextMenuItem.deleteItem };
    c = p();
    n.call(this, f.TYPE, c, h);
    this.cssClass = u.contextMenu.items.DELETE_CONTACT;
    this.isEnabled = function () {
      var t = e.getPerson();
      return a.isKnownPerson(t) && !a.isOrganizationContact(t);
    };
  }
  var t = e("swx-i18n").localization, n = e("ui/contextMenu/menuItem"), r = e("ui/modalDialog/modalDialog"), i = e("ui/viewModels/people/deleteContactModal"), s = e("text!views/people/deleteContactModal.html"), o = e("ui/telemetry/actions/actionSources"), u = e("constants/cssClasses"), a = e("ui/modelHelpers/personHelper");
  return f.prototype = Object.create(n.prototype), f.TYPE = "DeleteContactMenuItem", f;
});
