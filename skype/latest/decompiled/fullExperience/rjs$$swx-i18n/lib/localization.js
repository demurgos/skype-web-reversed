function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-i18n/lib/localization", [
      "require",
      "exports",
      "./plurals",
      "./resources"
    ], e);
}(function (e, t) {
  function i(e) {
    var t = r.get(), n = t && t[e] || e;
    return n;
  }
  var n = e("./plurals"), r = e("./resources");
  t.fetch = function (e) {
    if (typeof e != "object")
      throw new Error("[i18n / localization] Argument must be type of object");
    var t = e.key, r, s, o, u, a;
    if (!t)
      throw new Error("[i18n / localization] Missing key");
    r = i(t), e.count !== undefined && (s = e.count, e.params = e.params || {}, e.params.count = s, o = n.getPluralSuffix(s, e.locale), t += o);
    if (e.params) {
      r = i(t);
      for (u in e.params)
        if (e.params.hasOwnProperty(u)) {
          a = e.params[u];
          if (typeof a == "function")
            throw new Error("[i18n / localization] Replacement value must not be a function");
          r = r.replace(new RegExp("{" + u + "}", "g"), a);
        }
    }
    return r;
  };
})
