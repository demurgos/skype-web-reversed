define("utils/common/rtlChecker", [
  "require",
  "exports",
  "module",
  "browser/dom"
], function (e, t) {
  function i(e) {
    e = e || n.getElement("div.swx");
    var t = document.createElement("div");
    t.style.cssText = "position: absolute; visibility: hidden; width: 10px;";
    t.innerHTML = "<span class=\"probe\" style=\"display: inline-block;\"></span>";
    e.appendChild(t);
    var i = t.querySelector(".probe"), s = t.getBoundingClientRect(), o = i.getBoundingClientRect(), u = s.right === o.right;
    t.innerHTML = "";
    e.removeChild(t);
    r = u;
  }
  var n = e("browser/dom"), r = null;
  t.isRtl = function (e) {
    return r === null && i(e), r;
  };
  t.reset = function () {
    r = null;
  };
});
