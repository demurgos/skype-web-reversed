define("bindings/ko.resizer", [
  "require",
  "ui/viewModels/calling/helpers/resizer",
  "vendor/knockout"
], function (e) {
  function r() {
    n.bindingHandlers.resizer = {
      init: function (e, r) {
        var i, s = r(), o = function () {
          }, u = s.onResize || o, a = s.onResizeEnd || o, f = s.targetElement, l = s.minHeight || 0, c = e;
        i = t.build(f, c, {
          minHeight: l,
          onResize: function (e) {
            u(e);
          },
          onResizeEnd: function (e) {
            a(e);
          }
        });
        n.utils.domNodeDisposal.addDisposeCallback(e, function () {
          i.dispose();
        });
      }
    };
  }
  var t = e("ui/viewModels/calling/helpers/resizer"), n = e("vendor/knockout");
  return { register: r };
});
