define("services/i18n/loader", [
  "require",
  "swx-utils-common",
  "experience/settings",
  "swx-i18n",
  "services/i18n/pluralizer",
  "services/i18n/cultureInfo",
  "swx-constants",
  "services/i18n/swx/default"
], function (e) {
  function a() {
    function h(e) {
      n.locale = n.locale || {};
      n.locale.i18n = e;
    }
    var e = this, a = "/", f = "Strings.js", l = "strings.js", c = "en-us";
    e.load = function (e, p, d) {
      function m(e) {
        return new Promise(function (n, r) {
          t.loadScript(e, n, r);
        });
      }
      function g() {
        return r.set(u), n.applicationLanguage = c, o.i18n.EMBEDDED_LOCALE;
      }
      function y() {
        var t = s.getLocale(d), r = e + a + p + a + t + a + f;
        return n.applicationLanguage = t, m(r).then(function () {
          return d;
        });
      }
      function b() {
        var t = e + a + p + a + d + a + l;
        return m(t).then(function () {
          return d;
        });
      }
      var v = e + a + p + a + d + a + f;
      return Skype.WebExperience = Skype.WebExperience || {}, Skype.WebExperience.setTranslations = function (e) {
        r.merge(e);
      }, i.init(d), m(v).then(function () {
        return n.applicationLanguage = d, d;
      }).catch(b).catch(y).catch(g).then(h.bind(null));
    };
  }
  var t = e("swx-utils-common").loader, n = e("experience/settings"), r = e("swx-i18n").resources, i = e("services/i18n/pluralizer"), s = e("services/i18n/cultureInfo"), o = e("swx-constants").COMMON, u = e("services/i18n/swx/default");
  return new a();
});
