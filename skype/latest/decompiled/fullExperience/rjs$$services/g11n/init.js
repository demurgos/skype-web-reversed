define("services/g11n/init", [
  "require",
  "swx-utils-common",
  "constants/common",
  "services/g11n/globalization",
  "services/i18n/cultureInfo"
], function (e) {
  function s(e, t) {
    e.locale = e.locale || {};
    e.locale.g11n = t;
  }
  function o(e, o, u) {
    function c() {
      var e = l[a];
      if (e.lang === n.i18n.EMBEDDED_LOCALE) {
        s(u, e.lang);
        return;
      }
      return new Promise(function (n, r) {
        t.loadScript(e.url, n, r);
      }).then(function () {
        s(u, e.lang);
      }).catch(function () {
        a++;
        if (a >= l.length)
          throw new Error("All attempts failed to load g11n settings for:" + o);
        return c();
      });
    }
    var a = 0, f = i.getLocale(o), l = [{
          lang: o,
          url: e + "/" + o + "/settings.js"
        }];
    return f !== o && l.push({
      lang: f,
      url: e + "/" + f + "/settings.js"
    }), l.push({
      lang: n.i18n.EMBEDDED_LOCALE,
      url: e + "/en-us/settings.js"
    }), Skype.WebExperience = Skype.WebExperience || {}, Skype.WebExperience.setGlobalization = function (e) {
      r.init(e);
    }, c();
  }
  function u(e) {
    var t = e.initParams.locale;
    if (t !== n.i18n.EMBEDDED_LOCALE) {
      var r = e.appBaseUrl + "/resources/g11n";
      return o(r, t, e);
    }
    s(e, t);
  }
  var t = e("swx-utils-common").loader, n = e("constants/common"), r = e("services/g11n/globalization"), i = e("services/i18n/cultureInfo");
  return { init: u };
});
