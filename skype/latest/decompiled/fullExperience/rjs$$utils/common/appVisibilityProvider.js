define("utils/common/appVisibilityProvider", [
  "require",
  "exports",
  "module",
  "vendor/knockout",
  "browser/document",
  "browser/window",
  "swx-browser-detect",
  "utils/common/applicationFocusManager"
], function (e, t) {
  function u(e) {
    t.hasFocus(e);
  }
  var n = e("vendor/knockout"), r = e("browser/document"), i = e("browser/window"), s = e("swx-browser-detect").default, o = e("utils/common/applicationFocusManager");
  t.hasFocus = n.observable();
  t.isVisible = function (e) {
    e && o.tryRestoreFocus();
  };
  t.init = function () {
    var e = s.getBrowserInfo();
    e.browserName === s.BROWSERS.EDGE ? (i.addEventListener("focusin", u.bind(null, !0)), i.addEventListener("focusout", u.bind(null, !1))) : (i.addEventListener("focus", u.bind(null, !0)), i.addEventListener("blur", u.bind(null, !1)));
    t.hasFocus(r.hasFocus());
  };
});
