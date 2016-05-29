define("utils/common/resizeHandler", [
  "require",
  "browser/dom"
], function (e) {
  function i(e) {
    function o() {
      t.removeClass(e, r);
      clearTimeout(s);
      s = null;
    }
    if (!e)
      throw new Error("Container must not be null");
    var i = this, s = null;
    i.resize = function () {
      s ? clearTimeout(s) : t.addClass(e, r);
      s = setTimeout(o, n);
    };
    i.dispose = function () {
      o();
    };
  }
  var t = e("browser/dom"), n = 500, r = "RESIZING";
  return i;
});
