define("bindings/ko.getElement", [
  "require",
  "vendor/knockout"
], function (e) {
  function n() {
    t.bindingHandlers.getElement = {
      init: function (e, t, n, r) {
        t().call(r, e);
      }
    };
  }
  var t = e("vendor/knockout");
  return { register: n };
})
