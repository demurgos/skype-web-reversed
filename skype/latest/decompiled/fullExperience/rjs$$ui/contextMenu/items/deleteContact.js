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
  function f(e, l, c) {
    function p() {
      var n = new i(e, l, c), o = t.fetch({ key: "modal_deleteContact_text_aria_label" });
      r.build(i.ELEMENT_ID, n, s), r.show(i.ELEMENT_ID, o);
    }
    var h;
    if (!e)
      throw new Error("Parameter missing: contactVM is required");
    if (!l)
      throw new Error("Parameter missing: origin is required");
    c = c || { source: o.contextMenuItem.deleteItem }, h = t.fetch({ key: "label_text_deleteContact" }), n.call(this, f.TYPE, h, p), this.cssClass = u.contextMenu.items.DELETE_CONTACT, this.isEnabled = function () {
      return a.isKnownPerson(e.getPerson());
    };
  }
  var t = e("swx-i18n").localization, n = e("ui/contextMenu/menuItem"), r = e("ui/modalDialog/modalDialog"), i = e("ui/viewModels/people/deleteContactModal"), s = e("text!views/people/deleteContactModal.html"), o = e("ui/telemetry/actions/actionSources"), u = e("constants/cssClasses"), a = e("ui/modelHelpers/personHelper");
  return f.prototype = Object.create(n.prototype), f.TYPE = "DeleteContactMenuItem", f;
})
