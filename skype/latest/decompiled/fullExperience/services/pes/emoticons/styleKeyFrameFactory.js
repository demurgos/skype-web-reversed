define("services/pes/emoticons/styleKeyFrameFactory", [], function () {
  function e(e, t, n, i, s) {
    var o = "@" + (i || "") + "keyframes " + e + " { ";
    return o += r(t, n, i, s), o += "} \n", o;
  }
  function t(e) {
    return " top: " + e + "; ";
  }
  function n(e) {
    return " transform: translateY(" + e + "); ";
  }
  function r(e, n, r, i) {
    i = i || t;
    var s = "";
    return s += "from { ", s += i(e), s += "} ", s += "to { ", s += i(n), s += "} ", s;
  }
  function i(t, n, r) {
    var i = "0", s = -n + "px";
    return e(t, i, s, "", r) + e(t, i, s, "-moz-", r) + e(t, i, s, "-webkit-", r);
  }
  function s() {
  }
  return s.prototype.create = function (e) {
    var r = i(e.id, e.styleDef.smallHeight, n);
    return r += i(e.id + "_large", e.styleDef.largeHeight, n), r += i(e.id + "_extraLarge", e.styleDef.extraLargeHeight, t), r;
  }, new s();
})
