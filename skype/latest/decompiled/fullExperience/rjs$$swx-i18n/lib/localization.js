(function (e) {
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
    var t = e.key, r, s, o, u;
    if (!t)
      throw new Error("[i18n / localization] Missing key");
    var a = i(t);
    e.count !== undefined && (r = e.count, e.params = e.params || {}, e.params.count = r, s = n.getPluralSuffix(r, e.locale), t += s);
    if (e.params) {
      a = i(t);
      for (o in e.params)
        if (e.params.hasOwnProperty(o)) {
          u = e.params[o];
          if (typeof u == "function")
            throw new Error("[i18n / localization] Replacement value must not be a function");
          a = a.replace(new RegExp("{" + o + "}", "g"), u);
        }
    }
    return a;
  };
}));
