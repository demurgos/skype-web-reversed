define("bindings/ko.enterKey", [
  "require",
  "vendor/knockout",
  "utils/common/eventHelper",
  "swx-constants",
  "swx-constants"
], function (e) {
  function s() {
    t.bindingHandlers.enterKey = {
      init: function (e, s, o, u) {
        function a(e) {
          var t = n.getKeyCode(e);
          if (t === i.ENTER || t === i.SPACE && !f())
            s().call(u, u, e), e.stopPropagation();
        }
        function f() {
          return e.tagName.toLowerCase() === "input" && e.type.toLowerCase() === "text";
        }
        e.addEventListener(r.events.browser.KEYDOWN, a);
        t.utils.domNodeDisposal.addDisposeCallback(e, function () {
          e.removeEventListener(r.events.browser.KEYDOWN, a);
        });
      }
    };
  }
  var t = e("vendor/knockout"), n = e("utils/common/eventHelper"), r = e("swx-constants").COMMON, i = e("swx-constants").KEYS;
  return { register: s };
});
