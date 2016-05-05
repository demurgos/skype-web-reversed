define("jsviews/chat/stickyMessage", [
  "require",
  "browser/dom",
  "lodash-compat",
  "vendor/knockout",
  "browser/window",
  "browser/document"
], function (e) {
  function u(e) {
    function a(e) {
      var t = e.getBoundingClientRect();
      return t.top >= 0 && t.left >= 0 && t.bottom <= (i.innerHeight || s.documentElement.clientHeight) && t.right <= (i.innerWidth || s.documentElement.clientWidth);
    }
    function f(e, t, n, r) {
      if (n <= 0)
        return;
      var i = t - e.scrollTop, s = i < 0, o = i / n * 10;
      setTimeout(function () {
        e.scrollTop = e.scrollTop + o;
        if (s && e.scrollTop <= t) {
          r();
          return;
        }
        if (!s && e.scrollTop >= t) {
          r();
          return;
        }
        f(e, t, n - 10, r);
      }, 10);
    }
    var u = this;
    u.lastPollElement = r.observable(null), u.scrollToLastPollElement = function () {
      var n = u.lastPollElement(), r = t.getElement(".conversation.scrollable", e.parentElement), i = Math.min(n.offsetTop - 25, r.scrollHeight - r.offsetHeight);
      t.removeClass(n, "highlight"), f(r, i, o, function () {
        t.addClass(n, "highlight");
      });
    }, u.checkPollIsVisible = function (e, t) {
      var r = !1, i = e.key();
      return n.some(t, function (e) {
        if (e.getAttribute("data-id") === i)
          return u.lastPollElement(e), r = a(e), !0;
      }), r;
    };
  }
  var t = e("browser/dom"), n = e("lodash-compat"), r = e("vendor/knockout"), i = e("browser/window"), s = e("browser/document"), o = 200;
  return u;
})
