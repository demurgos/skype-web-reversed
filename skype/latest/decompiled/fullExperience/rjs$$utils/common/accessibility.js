define("utils/common/accessibility", [
  "require",
  "exports",
  "module",
  "browser/dom",
  "vendor/knockout"
], function (e, t) {
  var n = e("browser/dom"), r = e("vendor/knockout"), i = "showFocusRing";
  t.initFocusRing = function (e) {
    e.addEventListener("keydown", function () {
      n.hasClass(e, i) || n.addClass(e, i);
    }, !1);
    e.addEventListener("mousedown", function () {
      n.removeClass(e, i);
    }, !1);
  };
  t.updateAriaLiveHtml = function (e, t) {
    if (!r.isObservable(e))
      throw new Error("Parameter must be a ko.observable.");
    e("");
    e("<span>" + t + "</span>");
  };
});
