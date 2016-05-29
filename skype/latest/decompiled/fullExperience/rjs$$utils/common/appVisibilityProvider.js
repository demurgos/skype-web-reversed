define("utils/common/appVisibilityProvider", [
  "require",
  "exports",
  "module",
  "vendor/knockout",
  "browser/document",
  "browser/window",
  "utils/common/applicationFocusManager"
], function (e, t) {
  var n = e("vendor/knockout"), r = e("browser/document"), i = e("browser/window"), s = e("utils/common/applicationFocusManager");
  t.hasFocus = n.observable();
  t.isVisible = function (e) {
    e && s.tryRestoreFocus();
  };
  t.init = function () {
    i.addEventListener("focus", t.hasFocus.bind(null, !0));
    i.addEventListener("blur", t.hasFocus.bind(null, !1));
    t.hasFocus(r.hasFocus());
  };
});
