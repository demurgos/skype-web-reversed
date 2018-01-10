define("jsviews/calling/roster", [
  "require",
  "swx-constants",
  "browser/window"
], function (e) {
  function s(e) {
    var s, o;
    this.getRosterWidth = function () {
      return e.querySelector(t).offsetWidth + n;
    };
    this.init = function (e) {
      s = e;
      o = !1;
      i.addEventListener(r.events.browser.RESIZE, function () {
        o || s();
      });
    };
    this.dispose = function () {
      o = !0;
      i.removeEventListener(r.events.browser.RESIZE, s);
    };
  }
  var t = ".participants", n = 50, r = e("swx-constants").COMMON, i = e("browser/window");
  return {
    build: function (e) {
      return new s(e);
    }
  };
});
