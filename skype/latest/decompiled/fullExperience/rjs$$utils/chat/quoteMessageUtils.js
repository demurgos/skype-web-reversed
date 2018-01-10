define("utils/chat/quoteMessageUtils", [
  "require",
  "exports",
  "module",
  "swx-cafe-application-instance",
  "lodash-compat",
  "swx-encoder",
  "swx-encoder",
  "swx-encoder",
  "swx-utils-chat",
  "swx-utils-chat",
  "utils/chat/translatorHelper",
  "swx-service-locator-instance",
  "swx-constants",
  "utils/common/clipboard"
], function (e, t) {
  function p(e) {
    var t = a.unboxHrefContent(e.text()), n = e.getOriginalContent(), i = a.quotesPresentInXML(n);
    if (i === "")
      return t;
    try {
      var s = i.replace(/<<</g, "&lt;&lt;&lt;"), o = new DOMParser().parseFromString(s, "text/xml");
      if (o.getElementsByTagName("parsererror").length !== 0)
        throw new Error("ParserError");
      var u = o.documentElement.getElementsByTagName("legacyquote");
      if (r.isUndefined(u) || u.length !== 2 || o.childNodes.length !== 1 || o.childNodes[0].childNodes.length !== 3)
        throw new Error("Bad quotes format error");
      var f = u[0].textContent + o.childNodes[0].childNodes[1].textContent + u[1].textContent;
      return f += n.replace(i, ""), f;
    } catch (l) {
      return t;
    }
  }
  var n = e("swx-cafe-application-instance"), r = e("lodash-compat"), i = e("swx-encoder"), s = e("swx-encoder").QuoteEncoder, o = e("swx-encoder").QuoteDecoder, u = e("swx-utils-chat").dateTime, a = e("swx-utils-chat").messageSanitizer, f = e("utils/chat/translatorHelper"), l = e("swx-service-locator-instance"), c = e("swx-constants").COMMON, h = e("utils/common/clipboard");
  t.getContentToQuote = function (e) {
    var t = p(e), n = f.findMatchingTranslation(e.translations, e.conversation._translatorSettings), r = l.default.resolve(c.serviceLocator.FEATURE_FLAGS), i = r.isFeatureOn(c.featureFlags.TRANSLATOR_SENDING_ENABLED), s = i && n ? a.extractMessageTextContent(n) : t;
    return s;
  };
  t.getQuotedXmlString = function (e, t, r, o, u) {
    var a = s.build(), f = i.URLDomTransformer.build(), l = {
        author: e,
        authorName: t,
        quoteMessage: r,
        conversationId: o,
        timestamp: u
      };
    return i.build(n, {
      domTransformers: [
        a,
        f
      ]
    }).encode(JSON.stringify(l));
  };
  t.getQuotesDisplay = function (e) {
    return i.build(n, { domDecoders: [o.build(u.formatTimestamp)] }).decode(e);
  };
  t.copySelectionAsQuote = function (e, t, n) {
    var r = h.copyText(t);
    return n._setMessageCopiedToCache({
      sourceMessage: e,
      selectedText: t
    }), r;
  };
  t.copyMessageAsQuote = function (e, t) {
    var n = this.getContentToQuote(e), r = h.copyText(n);
    return t._setMessageCopiedToCache({ sourceMessage: e }), r;
  };
});
