define("ui/modalDialog/confirmationDialog", [
  "require",
  "lodash-compat",
  "utils/common/eventMixin",
  "ui/modalDialog/modalDialog",
  "swx-i18n",
  "utils/chat/messageSanitizer",
  "vendor/knockout",
  "text!views/ui/modalDialog/confirmationDialog.html",
  "browser/dom"
], function (e) {
  function l(e) {
    var t = this, n = e.onConfirm, l = e.onCancel;
    t.title = s.unboxHrefContent(e.title), t.text = e.text, t.content = e.content, t.contentViewModel = e.contentViewModel, t.avatar = e.avatar, t.confirmButtonTitle = e.confirmButtonTitle || i.fetch({ key: "action_button_confirm" }), t.cancelButtonTitle = e.cancelButtonTitle || i.fetch({ key: "action_button_cancel" }), t.isGroupConversation = o.observable(e.isGroupConversation || !1), t._cancel = function () {
      r.hide(f), l && l();
    }, t._confirm = function () {
      r.hide(f), n && n();
    }, t.show = function () {
      r.build(f, t, u), r.show(f, t.title);
      var e = a.getElementById("swx-overlayConfirmationDialog-content");
      e.innerHTML = t.content, t.contentViewModel && (o.cleanNode(e), o.applyBindings(t.contentViewModel, e));
    };
  }
  var t = e("lodash-compat"), n = e("utils/common/eventMixin"), r = e("ui/modalDialog/modalDialog"), i = e("swx-i18n").localization, s = e("utils/chat/messageSanitizer"), o = e("vendor/knockout"), u = e("text!views/ui/modalDialog/confirmationDialog.html"), a = e("browser/dom"), f = "swx-overlayConfirmationDialog";
  return l.ELEMENT_ID = f, l.build = function (e) {
    return new l(e);
  }, t.assign(l.prototype, n), l;
})
