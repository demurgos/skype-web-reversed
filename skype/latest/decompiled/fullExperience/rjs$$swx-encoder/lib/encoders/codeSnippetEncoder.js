(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-encoder/lib/encoders/codeSnippetEncoder", [
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
        return t.PRE_NODE = "pre", t.RAW_PRE_ATTR = "raw_pre", t.RAW_POST_ATTR = "raw_post", t.CODE_WRAPPER_MATCHER = /(\{code})((?:.|[\r\n])*)(\{code})/g, t.GLOBAL_CODE_MATCHER = /^(!!)((?:.|[\r\n])*)$/g, t;
      }
      return __extends(t, e), t.prototype.isElementAllowed = function (e) {
        return e.nodeName.toLowerCase() !== this.PRE_NODE;
      }, t.prototype.createXmlElement = function (e, t, r, i) {
        if (!r || n.isUndefined(t) || n.isNull(t))
          return null;
        var s = e.createElement(this.PRE_NODE);
        return s.setAttribute(this.RAW_PRE_ATTR, r), i && s.setAttribute(this.RAW_POST_ATTR, i), s.textContent = t, s;
      }, t.prototype.wordRawToXml = function (e, t) {
        var n = this;
        try {
          var r = [];
          return [
            this.GLOBAL_CODE_MATCHER,
            this.CODE_WRAPPER_MATCHER
          ].forEach(function (i) {
            var s = i.exec(t);
            s !== null && s.length >= 2 && r.length === 0 && r.push(n.createXmlElement(e, s[2], s[1], s[3]));
          }), r;
        } catch (i) {
          return [];
        }
      }, t.prototype.wordMatcher = function () {
        return /(\{code}(?:.|[\r\n])*\{code})|(^!!(?:.|[\r\n])*)$/g;
      }, t;
    }(r.WordDomTransformer);
  t.CodeSnippetEncoder = i;
  t.build = s;
}));
