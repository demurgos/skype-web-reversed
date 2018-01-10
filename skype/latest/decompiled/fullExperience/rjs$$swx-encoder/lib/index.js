(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-encoder/lib/index", [
      "require",
      "exports",
      "./aggregateEncoder",
      "./encoders/emoticonEncoder",
      "./encoders/markupDecoder",
      "./encoders/mentionsDecoder",
      "./encoders/mentionsEncoder",
      "./encoders/noTranslateDomTransformer",
      "./encoders/quoteDecoder",
      "./encoders/quoteEncoder",
      "./encoders/codeSnippetEncoder",
      "./encoders/codeSnippetDecoder",
      "./countryCodes",
      "./domTransformers",
      "./encoderFactory"
    ], e);
}(function (e, t) {
  function n(e) {
    for (var n in e)
      t.hasOwnProperty(n) || (t[n] = e[n]);
  }
  var r = e("./aggregateEncoder");
  t.AggregateEncoder = r;
  var i = e("./encoders/emoticonEncoder");
  t.EmoticonEncoder = i;
  var s = e("./encoders/markupDecoder");
  t.MarkupDecoder = s;
  var o = e("./encoders/mentionsDecoder");
  t.MentionDecoder = o;
  var u = e("./encoders/mentionsEncoder");
  t.MentionEncoder = u;
  var a = e("./encoders/noTranslateDomTransformer");
  t.NoTranslateDomTransformer = a;
  var f = e("./encoders/quoteDecoder");
  t.QuoteDecoder = f;
  var l = e("./encoders/quoteEncoder");
  t.QuoteEncoder = l;
  var c = e("./encoders/codeSnippetEncoder");
  t.CodeSnippetEncoder = c;
  var h = e("./encoders/codeSnippetDecoder");
  t.CodeSnippetDecoder = h;
  var p = e("./countryCodes");
  t.CountryCodes = p.CountryCodes;
  var d = e("./domTransformers");
  t.WordDomTransformer = d.WordDomTransformer;
  t.FlagDomTransformer = d.FlagDomTransformer;
  t.URLDomTransformer = d.URLDomTransformer;
  t.NewLineDomTransformer = d.NewLineDomTransformer;
  t.ElementVisitor = d.ElementVisitor;
  n(e("./encoderFactory"));
}));
