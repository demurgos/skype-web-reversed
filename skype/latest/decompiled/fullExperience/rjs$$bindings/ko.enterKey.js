define("bindings/ko.enterKey", [
  "require",
  "vendor/knockout",
  "utils/common/eventHelper",
  "constants/common",
  "constants/keys"
], function (e) {
  function s() {
    t.bindingHandlers.enterKey = {
      init: function (e, t, s, o) {
        e.addEventListener(r.events.browser.KEYDOWN, function (e) {
          var r = n.getKeyCode(e);
          if (r === i.ENTER || r === i.SPACE)
            t().call(o, o, e), e.stopPropagation();
        });
      }
    };
  }
  var t = e("vendor/knockout"), n = e("utils/common/eventHelper"), r = e("constants/common"), i = e("constants/keys");
  return { register: s };
});
