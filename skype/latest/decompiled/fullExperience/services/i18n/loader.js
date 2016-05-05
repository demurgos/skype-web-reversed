define("services/i18n/loader", [
  "require",
  "swx-utils-common",
  "experience/settings",
  "swx-i18n",
  "services/i18n/pluralizer",
  "services/i18n/cultureInfo",
  "constants/common",
  "services/i18n/swx/default"
], function (e) {
  function a() {
    function c(e) {
      n.locale = n.locale || {}, n.locale.i18n = e;
    }
    var e = this, a = "/", f = "Strings.js", l = "strings.js";
    e.load = function (e, n, h) {
      function d(e) {
        return new Promise(function (n, r) {
          t.loadScript(e, n, r);
        });
      }
      function v() {
        return r.set(u), o.i18n.EMBEDDED_LOCALE;
      }
      function m() {
        var t = s.getLocale(h), r = e + a + n + a + t + a + f;
        return d(r).then(function () {
          return h;
        });
      }
      function g() {
        var t = e + a + n + a + h + a + l;
        return d(t).then(function () {
          return h;
        });
      }
      var p = e + a + n + a + h + a + f;
      return Skype.WebExperience = Skype.WebExperience || {}, Skype.WebExperience.setTranslations = function (e) {
        r.merge(e);
      }, i.init(h), d(p).then(function () {
        return h;
      }).catch(g).catch(m).catch(v).then(c.bind(null));
    };
  }
  var t = e("swx-utils-common").loader, n = e("experience/settings"), r = e("swx-i18n").resources, i = e("services/i18n/pluralizer"), s = e("services/i18n/cultureInfo"), o = e("constants/common"), u = e("services/i18n/swx/default");
  return new a();
})
