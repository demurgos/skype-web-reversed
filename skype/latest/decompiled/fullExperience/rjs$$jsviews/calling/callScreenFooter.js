define("jsviews/calling/callScreenFooter", [
  "require",
  "constants/common",
  "browser/window"
], function (e) {
  function i(e) {
    var i;
    this.getButtonsWidth = function () {
      return e.querySelector(t).offsetWidth;
    };
    this.init = function (e) {
      i = e;
      r.addEventListener(n.events.browser.RESIZE, i);
    };
    this.dispose = function () {
      r.removeEventListener(n.events.browser.RESIZE, i);
    };
  }
  var t = ".button.row.center", n = e("constants/common"), r = e("browser/window");
  return {
    build: function (e) {
      return new i(e);
    }
  };
});
