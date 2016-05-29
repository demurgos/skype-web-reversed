define("services/i18n/pluralizer", [
  "require",
  "swx-i18n",
  "bindings/ko.businessAwareL10n",
  "swx-i18n",
  "vendor/knockout"
], function (e) {
  function s() {
    var e = this;
    e.init = function (e) {
      var s, o = e.replace("-", "_").toLowerCase(), u = r.pluralizationLocale[o];
      if (u)
        o = u;
      else {
        s = o.split("_");
        if (s.length === 1)
          throw new Error("Unsupported language:" + e);
        o = s[0];
      }
      r.setLocale(o);
      t.init(i);
      n.register();
    };
  }
  var t = e("swx-i18n").knockoutBindingExtensions, n = e("bindings/ko.businessAwareL10n"), r = e("swx-i18n").plurals, i = e("vendor/knockout");
  return new s();
});
