define("services/i18n/init", [
  "require",
  "swx-i18n",
  "services/i18n/swx/default",
  "services/i18n/pluralizer",
  "constants/common",
  "services/i18n/loader"
], function (e) {
  function a() {
    var e = this;
    e.init = function (e, t) {
      var n, r = e.initParams.locale, i = e.initParams.variant;
      return t.lang || (t.lang = r), r === o && i === u ? (e.locale = e.locale || {}, e.locale.i18n = r, Promise.resolve()) : (n = e.appBaseUrl + "/resources/i18n", s.load(n, i, r));
    }, t.set(n), r.init(o);
  }
  var t = e("swx-i18n").resources, n = e("services/i18n/swx/default"), r = e("services/i18n/pluralizer"), i = e("constants/common"), s = e("services/i18n/loader"), o = i.i18n.EMBEDDED_LOCALE, u = "swx";
  return new a();
})
