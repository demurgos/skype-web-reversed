define("jsviews/calling/callScreenFooter", [
  "require",
  "swx-constants",
  "browser/window"
], function (e) {
  function i(e) {
    var i, s;
    this.getButtonsWidth = function () {
      return e.querySelector(t).offsetWidth;
    };
    this.init = function (e) {
      i = e;
      s = !1;
      r.addEventListener(n.events.browser.RESIZE, function () {
        s || i();
      });
    };
    this.dispose = function () {
      s = !0;
      r.removeEventListener(n.events.browser.RESIZE, i);
    };
  }
  var t = ".button.row.center", n = e("swx-constants").COMMON, r = e("browser/window");
  return {
    build: function (e) {
      return new i(e);
    }
  };
});
