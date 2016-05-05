define("bindings/ko.overflowClass", [
  "require",
  "vendor/knockout",
  "browser/dom",
  "browser/window"
], function (e) {
  function i() {
    t.bindingHandlers.overflowClass = {
      init: function (e, n) {
        function u() {
          var t = e.children, n, r, u;
          for (u = 0; u < t.length; ++u)
            n = t[u], r = s(n), o(n, r.isOverflowingToLeft, i.left), o(n, r.isOverflowingToRight, i.right);
        }
        function a() {
          r.removeEventListener("resize", u), e.removeEventListener("scroll", u), e.removeEventListener("DOMSubtreeModified", u);
        }
        var i = n();
        t.utils.domNodeDisposal.addDisposeCallback(e, a), e.addEventListener("DOMSubtreeModified", u), e.addEventListener("scroll", u), r.addEventListener("resize", u), u();
      }
    };
  }
  function s(e) {
    var t = u(e, e.parentElement), n = t < e.parentElement.scrollLeft, r = t + e.clientWidth > e.parentElement.clientWidth + e.parentElement.scrollLeft;
    return {
      isOverflowingToLeft: n,
      isOverflowingToRight: r
    };
  }
  function o(e, t, r) {
    if (!r)
      return;
    t ? n.addClass(e, r) : n.removeClass(e, r);
  }
  function u(e, t) {
    var n = e.offsetLeft;
    while (t !== e.offsetParent)
      n -= t.offsetLeft, t = t.offsetParent;
    return n;
  }
  var t = e("vendor/knockout"), n = e("browser/dom"), r = e("browser/window");
  return { register: i };
})
