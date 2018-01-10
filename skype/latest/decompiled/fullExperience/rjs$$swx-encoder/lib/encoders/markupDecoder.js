(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-encoder/lib/encoders/markupDecoder", [
      "require",
      "exports",
      "../domTransformers"
    ], e);
}(function (e, t) {
  function s() {
    return new i();
  }
  var n = e("../domTransformers"), r = {
      b: "*",
      s: "~",
      i: "_"
    }, i = function (e) {
      function t() {
        return e !== null && e.apply(this, arguments) || this;
      }
      return __extends(t, e), t.prototype.isDesiredElement = function (e) {
        var t = e.nodeType === Node.ELEMENT_NODE ? e.nodeName.toLowerCase() : "", n = e.nodeType === Node.ELEMENT_NODE ? e.className.toLowerCase() : "";
        return t !== "" && (t === "b" || t === "s" || t === "i" && n.indexOf("mention") === -1);
      }, t.prototype.visitElement = function (e, t) {
        var n = t.parentNode, i = t.childNodes.length;
        n.insertBefore(e.createTextNode(r[t.nodeName.toLowerCase()]), t);
        for (var s = 0; s < i; s++)
          n.insertBefore(t.childNodes[0], t);
        n.insertBefore(e.createTextNode(r[t.nodeName.toLowerCase()]), t);
        n.removeChild(t);
      }, t;
    }(n.ElementVisitor);
  t.build = s;
}));
