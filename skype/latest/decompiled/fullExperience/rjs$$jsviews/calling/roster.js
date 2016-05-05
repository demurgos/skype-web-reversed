define("jsviews/calling/roster", [
  "require",
  "constants/common",
  "browser/window"
], function (e) {
  function s(e) {
    var s;
    this.getRosterWidth = function () {
      return e.querySelector(t).offsetWidth + n;
    }, this.init = function (e) {
      s = e, i.addEventListener(r.events.browser.RESIZE, s);
    }, this.dispose = function () {
      i.removeEventListener(r.events.browser.RESIZE, s);
    };
  }
  var t = ".participants", n = 50, r = e("constants/common"), i = e("browser/window");
  return {
    build: function (e) {
      return new s(e);
    }
  };
})
