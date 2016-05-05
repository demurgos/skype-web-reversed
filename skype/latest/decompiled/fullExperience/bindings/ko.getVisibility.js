define("bindings/ko.getVisibility", [
  "require",
  "vendor/knockout"
], function (e) {
  function n() {
    t.bindingHandlers.getVisibility = {
      init: function (e, n, r, i) {
        function a() {
          var t = e.offsetHeight > 0 && e.offsetWidth > 0;
          u !== t && (u = t, o.call(i, t));
        }
        var s = window.setInterval(a, 50), o = n(), u;
        t.utils.domNodeDisposal.addDisposeCallback(e, function () {
          window.clearInterval(s);
        });
      }
    };
  }
  var t = e("vendor/knockout");
  return { register: n };
})
