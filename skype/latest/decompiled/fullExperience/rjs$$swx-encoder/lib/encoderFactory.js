(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-encoder/lib/encoderFactory", [
      "require",
      "exports",
      "lodash-compat",
      "swx-constants",
      "./encoders/emoticonEncoder",
      "./encoders/codeSnippetEncoder",
      "./aggregateEncoder",
      "./domTransformers",
      "./encoders/mentionsEncoder",
      "swx-service-locator-instance"
    ], e);
}(function (e, t) {
  function l(e, t) {
    var l = f["default"].resolve(r.COMMON.serviceLocator.FEATURE_FLAGS), c = n.extend({ app: e }, t), h = i.build(), p = u.FlagDomTransformer.build(), d = [];
    l.isFeatureOn(r.COMMON.featureFlags.CODE_SNIPPET_ENABLED) && d.push(s.build());
    d = d.concat([
      p,
      h
    ]);
    l.isFeatureOn(r.COMMON.featureFlags.MENTIONS_ENABLED) && d.push(a.build(t && t.conversation));
    var v = c.domTransformers || d;
    return t && t.domTransformeExtensions && (v = v.concat(t.domTransformeExtensions)), t && t.domDecoders && (c.domDecoders = t.domDecoders), l.isFeatureOn(r.COMMON.featureFlags.PES_USE_EXTRA_LARGE_EMOTICONS) && (c.largeEmoticonClass = "extraLarge"), c.emoticonEncoder = h, c.domTransformers = v, o.build(c);
  }
  var n = e("lodash-compat"), r = e("swx-constants"), i = e("./encoders/emoticonEncoder"), s = e("./encoders/codeSnippetEncoder"), o = e("./aggregateEncoder"), u = e("./domTransformers"), a = e("./encoders/mentionsEncoder"), f = e("swx-service-locator-instance");
  t.build = l;
}));
