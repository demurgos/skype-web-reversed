(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-encoder/lib/encoders/quoteDecoder", [
      "require",
      "exports",
      "lodash-compat",
      "../domTransformers"
    ], e);
}(function (e, t) {
  function s(e) {
    var t = new i();
    return t.timeFormat = e, t;
  }
  var n = e("lodash-compat"), r = e("../domTransformers"), i = function (e) {
      function t() {
        return e !== null && e.apply(this, arguments) || this;
      }
      return __extends(t, e), t.prototype.isDesiredElement = function (e) {
        var t = e.nodeType === Node.ELEMENT_NODE ? e.nodeName.toLowerCase() : "";
        return t !== "" && t === "quote";
      }, t.prototype.visitElement = function (e, t) {
        var r = t.parentNode, i = t, s = n.unescape(i.getAttribute("authorname")), o = i.getAttribute("timestamp"), u = e.createElement("div"), a = e.createElement("p"), f = e.createElement("a"), l = e.createElement("span");
        u.setAttribute("class", "quotedText");
        a.setAttribute("class", "quoted");
        for (var c = i.childNodes.length; c > 2; c--)
          a.appendChild(i.childNodes[1]);
        u.appendChild(a);
        f.textContent = s + ", ";
        f.setAttribute("class", "author");
        f.setAttribute("role", "button");
        f.setAttribute("author", i.getAttribute("author"));
        u.appendChild(f);
        !this.timeFormat || (l.textContent = this.timeFormat(Number(o) * 1000));
        l.setAttribute("class", "time");
        u.appendChild(l);
        r.insertBefore(u, t);
        r.removeChild(t);
      }, t;
    }(r.ElementVisitor);
  t.QuoteDecoder = i;
  t.build = s;
}));
