(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-encoder/lib/encoders/mentionsDecoder", [
      "require",
      "exports",
      "lodash-compat",
      "swx-cafe-application-instance",
      "../domTransformers"
    ], e);
}(function (e, t) {
  function o() {
    return new s();
  }
  var n = e("lodash-compat"), r = e("swx-cafe-application-instance"), i = e("../domTransformers"), s = function (e) {
      function t() {
        return e !== null && e.apply(this, arguments) || this;
      }
      return __extends(t, e), t.prototype.isDesiredElement = function (e) {
        var t = e.nodeType === Node.ELEMENT_NODE ? e.nodeName.toLowerCase() : "", n = e.nodeType === Node.ELEMENT_NODE ? e.className.toLowerCase() : "";
        return t === "i" && n.indexOf("mention") !== -1;
      }, t.prototype.visitElement = function (e, t) {
        var i = t.parentNode, s = t.childNodes.length === 1 && t.childNodes[0];
        if (!s)
          return;
        var o = s.title.toLowerCase(), u = r.get().personsAndGroupsManager.all.persons(), a = n.find(u, function (e) {
            return e.id().toLowerCase() === o;
          }), f = a && a.isAgent() ? "(" + a.displayName().replace(/(\(|\))/g, "") + ")" : s.title;
        i.replaceChild(e.createTextNode("@" + f), t);
      }, t;
    }(i.ElementVisitor);
  t.build = o;
}));
