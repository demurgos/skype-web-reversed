define("experience/koBindingsRegistrar", [
  "require",
  "exports",
  "module",
  "vendor/knockout",
  "bindings/ko.keyboardNavigation",
  "bindings/ko.enterKey",
  "swx-focus-handler/lib/knockoutBinding",
  "bindings/ko.getElement",
  "bindings/ko.overflowClass",
  "bindings/ko.getVisibility",
  "bindings/ko.fallBackOnDefaultAvatarOnError",
  "bindings/ko.transitionEnd"
], function (e, t) {
  var n = e("vendor/knockout"), r = e("bindings/ko.keyboardNavigation"), i = e("bindings/ko.enterKey"), s = e("swx-focus-handler/lib/knockoutBinding"), o = e("bindings/ko.getElement"), u = e("bindings/ko.overflowClass"), a = e("bindings/ko.getVisibility"), f = e("bindings/ko.fallBackOnDefaultAvatarOnError"), l = e("bindings/ko.transitionEnd");
  t.registerBindings = function () {
    r.register();
    i.register();
    s.register(n);
    a.register();
    o.register();
    u.register();
    f.register();
    l.register();
  };
});
