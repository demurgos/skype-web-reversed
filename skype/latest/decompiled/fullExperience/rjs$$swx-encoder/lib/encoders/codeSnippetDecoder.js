(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-encoder/lib/encoders/codeSnippetDecoder", [
      "require",
      "exports",
      "lodash-compat",
      "../domTransformers"
    ], e);
}(function (e, t) {
  function s() {
    return new i();
  }
  var n = e("lodash-compat"), r = e("../domTransformers"), i = function (e) {
      function t() {
        var t = e !== null && e.apply(this, arguments) || this;
        return t.PRE_NODE = "pre", t.RAW_PRE_ATTR = "raw_pre", t.RAW_POST_ATTR = "raw_post", t.UNESCAPED_MATCHER = /<|>/g, t;
      }
      return __extends(t, e), t.prototype.isDesiredElement = function (e) {
        var t = e.nodeType === Node.ELEMENT_NODE ? e.nodeName.toLowerCase() : "";
        return t === this.PRE_NODE;
      }, t.prototype.visitElement = function (e, t) {
        var r = t.parentNode, i = t.childNodes.length, s = e.createElement(this.PRE_NODE), o = t.getAttribute(this.RAW_PRE_ATTR), u = t.getAttribute(this.RAW_POST_ATTR);
        o && s.setAttribute(this.RAW_PRE_ATTR, o);
        for (var a = 0; a < i; a++)
          s.appendChild(t.childNodes[0]);
        u && s.setAttribute(this.RAW_POST_ATTR, u);
        this.UNESCAPED_MATCHER.test(s.innerHTML) && (s.innerHTML = n.escape(s.innerHTML));
        r.insertBefore(s, t);
        r.removeChild(t);
      }, t;
    }(r.ElementVisitor);
  t.CodeSnippetDecoder = i;
  t.build = s;
}));
