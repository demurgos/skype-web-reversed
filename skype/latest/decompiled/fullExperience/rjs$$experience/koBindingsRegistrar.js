define("experience/koBindingsRegistrar", [
  "require",
  "exports",
  "module",
  "bindings/ko.keyboardNavigation",
  "bindings/ko.enterKey",
  "bindings/ko.getElement",
  "bindings/ko.overflowClass",
  "bindings/ko.getVisibility",
  "bindings/ko.resizer",
  "bindings/ko.fallBackOnDefaultAvatarOnError"
], function (e, t) {
  var n = e("bindings/ko.keyboardNavigation"), r = e("bindings/ko.enterKey"), i = e("bindings/ko.getElement"), s = e("bindings/ko.overflowClass"), o = e("bindings/ko.getVisibility"), u = e("bindings/ko.resizer"), a = e("bindings/ko.fallBackOnDefaultAvatarOnError");
  t.registerBindings = function () {
    n.register();
    r.register();
    u.register();
    o.register();
    i.register();
    s.register();
    a.register();
  };
});
