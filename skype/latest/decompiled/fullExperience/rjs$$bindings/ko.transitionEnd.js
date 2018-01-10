define("bindings/ko.transitionEnd", [
  "require",
  "vendor/knockout"
], function (e) {
  function n() {
    t.bindingHandlers.transitionEnd = {
      init: function (e, n) {
        function u(e) {
          o && clearTimeout(o);
          o = setTimeout(function () {
            r(e);
            o = null;
          }, 0);
        }
        var r = n(), i = [
            "webkitTransitionEnd",
            "otransitionend",
            "oTransitionEnd",
            "msTransitionEnd",
            "transitionend"
          ], s, o;
        r && typeof r != "function" && (s = r.moreElementsToWatch, r = r.callback);
        s = (s || []).map(function (e) {
          return document.querySelector(e);
        }).filter(function (e) {
          return !!e;
        });
        i.forEach(function (t) {
          e.addEventListener(t, u);
          s.forEach(function (e) {
            e.addEventListener(t, u);
          });
        });
        t.utils.domNodeDisposal.addDisposeCallback(e, function () {
          i.forEach(function (t) {
            e.removeEventListener(t, u);
            s.forEach(function (e) {
              e.removeEventListener(t, u);
            });
          });
        });
      }
    };
  }
  var t = e("vendor/knockout");
  return { register: n };
});
