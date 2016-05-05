define("services/pes/emoticons/styleDefinitionFactory", [
  "require",
  "services/pes/constants"
], function (e) {
  function n() {
    function n(e) {
      var n = e.largeUrl, r = t.frameHeights.emoticons.LARGE, i = e.styleDef.largeHeight, s = e.styleDef.largeOffset;
      return o(e, n, r, i, s, "large");
    }
    function r(e) {
      return " top: " + e + ";\n" + " -webkit-transform: initial;\n" + "transform: initial;\n" + " transform: translateZ(0);";
    }
    function i(e) {
      return " -webkit-transform: translateY(" + e + ");\n" + " transform: translateY(" + e + ");";
    }
    function s(e) {
      var n = e.extraLargeUrl, i = t.frameHeights.emoticons.EXTRA_LARGE, s = e.styleDef.extraLargeHeight, u = e.styleDef.extraLargeOffset;
      return o(e, n, i, s, u, "extraLarge", r);
    }
    function o(e, t, n, r, s, o, u) {
      var a = e.id, f = e.id, l = e.styleDef.duration, c = e.styleDef.frameCount;
      u = u || i, o && (f += "_" + o);
      var h = "\n .swx .largeAllowed span.emoticon." + a + ".animated";
      return o && (h += "." + o), h += " span.emoSprite \n", h += "{ \n", h += " -ms-high-contrast-adjust: none;\n", h += " background-image: url('" + t + "');\n", h += " background-size: " + n + "px " + r + "px; \n", h += " height: " + r + "px; \n", h += u(s) + "\n", h += " -moz-animation: " + f + " " + l + " steps(" + c + ") infinite; \n", h += " -webkit-animation: " + f + " " + l + " steps(" + c + ") infinite; \n", h += " animation: " + f + " " + l + " steps(" + c + ") infinite; \n", h += "} ", h;
    }
    function u(e) {
      var n = e.id, r = e.styleDef.duration, s = e.styleDef.frameCount, o = e.smallUrl, u = t.frameHeights.emoticons.SMALL, a = e.styleDef.smallOffset, f = e.styleDef.smallHeight, l = "\n.swx span.emoticon." + e.id + ".animated span.emoSprite, \n";
      return l += ".swx span.emoticon." + e.id + ".large.animated span.emoSprite, \n", l += ".swx span.emoticon." + e.id + ".extraLarge.animated span.emoSprite, \n", l += ".swx .largeAllowed span.emoticon." + e.id + ".animated span.emoSprite", l += "{ \n", l += " -ms-high-contrast-adjust: none;\n", l += " background-image: url('" + o + "'); \n", l += " background-size: " + u + "px " + f + "px; \n", l += " height: " + f + "px; \n", l += i(a), l += " -webkit-animation: " + n + " " + r + " steps(" + s + ") infinite; \n", l += " -moz-animation: " + n + " " + r + " steps(" + s + ") infinite; \n", l += " animation: " + n + " " + r + " steps(" + s + ") infinite; \n", l += "} ", l;
    }
    function a(e, t, n, r, s, o) {
      var u = "\n.swx span.emoticon." + e.id + t + " span.emoSprite \n";
      return u += "{\n", u += " -ms-high-contrast-adjust: none;\n", u += " background-image: url('" + n + "'); \n", u += " background-size: " + r + "px " + s + "px; \n", u += " height: " + s + "px; \n", u += i(o), u += " -moz-animation: none; \n", u += " -webkit-animation: none; \n", u += " animation: none \n", u += "}", u;
    }
    function f(e) {
      return a(e, "", e.smallUrl, t.frameHeights.emoticons.SMALL, e.styleDef.smallHeight, e.styleDef.smallOffset) + a(e, ".large", e.largeUrl, t.frameHeights.emoticons.LARGE, e.styleDef.largeHeight, e.styleDef.largeOffset) + a(e, ".extraLarge", e.extraLargeUrl, t.frameHeights.emoticons.EXTRA_LARGE, e.styleDef.extraLargeHeight, e.styleDef.extraLargeOffset);
    }
    var e = this;
    e.create = function (e) {
      var t = f(e);
      return t += u(e), t += n(e), t += s(e), t;
    };
  }
  var t = e("services/pes/constants");
  return new n();
})
