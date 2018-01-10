(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-encoder/lib/encoders/noTranslateDomTransformer", [
      "require",
      "exports"
    ], e);
}(function (e, t) {
  function r(e) {
    return new n(e);
  }
  var n = function () {
    function e(e) {
      this.mode = e;
    }
    return e.prototype.decorate = function (e, t) {
      var n = t.parentNode, r = e.createElement("span");
      r.setAttribute("class", "notranslate");
      n.replaceChild(r, t);
      r.appendChild(t);
    }, e.prototype.excludeFromTranslation = function (e) {
      var t = e.nodeName.toLowerCase(), n = e.className.toLowerCase();
      return t === "ss" || t === "at" || t === "flag" || t === "a" || t === "span" && (n.indexOf("emoticon") !== -1 || n.indexOf("flag") !== -1) || t === "i" && n.indexOf("mention") !== -1 || t === "pre";
    }, e.prototype.isNoTranslateElement = function (e) {
      var t = e.nodeName.toLowerCase(), n = e.className.toLowerCase();
      return t === "span" && n.indexOf("notranslate") !== -1;
    }, e.prototype.pushChildNodes = function (e, t) {
      for (var n = 0; n < t.childNodes.length; n++)
        e.push(t.childNodes[n]);
    }, e.prototype.removeElement = function (e, t) {
      var n = t.parentNode, r = t.childNodes.length;
      for (var i = 0; i < r; i++)
        n.insertBefore(t.childNodes[0], t);
      n.removeChild(t);
    }, e.prototype.transformRawToXml = function (t, n) {
      var r = [], i, s;
      this.mode === e.Mode.Add ? (i = this.excludeFromTranslation, s = this.decorate) : (i = this.isNoTranslateElement, s = this.removeElement);
      r.push(n);
      while (r.length !== 0) {
        var o = r.pop();
        o.nodeType === Node.ELEMENT_NODE && i(o) ? s(t, o) : this.pushChildNodes(r, o);
      }
    }, e;
  }();
  n.Mode = {
    Add: "add",
    Remove: "remove"
  };
  t.build = r;
  t.Mode = n.Mode;
}));
