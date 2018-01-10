(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-encoder/lib/encoders/quoteEncoder", [
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
        return t.shouldMaintainLegacyQuote = !0, t.QUOTE_NODE = "quote", t.AUTHOR_ATTR = "author", t.AUTHOR_NAME_ATTR = "authorname", t.CONVERSATION_ATTR = "conversation", t.TIMESTAMP_ATTR = "timestamp", t.LEGACY_QUOTE_NODE = "legacyquote", t.LEGACY_ANNOTATION_TEXT_NODE = "\r\n\r\n<<< ", t;
      }
      return __extends(t, e), t.prototype.isElementAllowed = function (e) {
        return e.nodeName != "#text";
      }, t.prototype.createXmlElement = function (e, t) {
        if (n.isUndefined(t) || n.isUndefined(t.author) || n.isUndefined(t.authorName) || n.isUndefined(t.conversationId) || n.isUndefined(t.quoteMessage) || n.isUndefined(t.timestamp))
          return undefined;
        var r = e.createElement(this.QUOTE_NODE);
        r.setAttribute(this.AUTHOR_ATTR, t.author);
        r.setAttribute(this.AUTHOR_NAME_ATTR, t.authorName);
        r.setAttribute(this.CONVERSATION_ATTR, t.conversationId);
        var i = this.isValidTimestampString(t.timestamp) ? Math.round(Date.parse(t.timestamp) / 1000).toString() : "";
        r.setAttribute(this.TIMESTAMP_ATTR, i);
        var s = e.createTextNode(t.quoteMessage);
        return this.shouldMaintainLegacyQuote ? r = this.createAndAppendLegacyQuoteNode(e, t, r, s) : r.appendChild(s), r;
      }, t.prototype.isValidTimestampString = function (e) {
        var t = new Date(e);
        return Object.prototype.toString.call(t) === "[object Date]" ? !isNaN(t.getTime()) : !1;
      }, t.prototype.getLegacyTimeStamp = function (e) {
        if (this.isValidTimestampString(e)) {
          var t = new Date(e);
          return t.toLocaleDateString() + " " + t.toLocaleTimeString();
        }
        return "";
      }, t.prototype.createElementWithText = function (e, t, n) {
        var r = e.createElement(t);
        return r.textContent = n, r;
      }, t.prototype.createAndAppendLegacyQuoteNode = function (e, t, n, r) {
        var i = this.getLegacyTimeStamp(t.timestamp), s = this.createElementWithText(e, this.LEGACY_QUOTE_NODE, "[" + i + "] " + t.authorName + ": ");
        n.appendChild(s);
        n.appendChild(r);
        var o = this.createElementWithText(e, this.LEGACY_QUOTE_NODE, this.LEGACY_ANNOTATION_TEXT_NODE);
        return n.appendChild(o), n;
      }, t.prototype.wordRawToXml = function (e, t) {
        try {
          var r = [], i = JSON.parse(t), s = this.createXmlElement(e, i);
          return n.isUndefined(s) || r.push(s), r;
        } catch (o) {
          return [];
        }
      }, t.prototype.wordMatcher = function () {
        return /{.*}/g;
      }, t;
    }(r.WordDomTransformer);
  t.QuoteEncoder = i;
  t.build = s;
}));
