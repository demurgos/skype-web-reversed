define("services/g11n/init", [
  "require",
  "swx-utils-common",
  "swx-constants",
  "swx-g11n",
  "services/g11n/default",
  "services/i18n/cultureInfo"
], function (e) {
  function o(e, t) {
    e.locale = e.locale || {};
    e.locale.g11n = t;
  }
  function u(e, i, u) {
    function c() {
      var e = l[a];
      if (e.lang === n.i18n.EMBEDDED_LOCALE) {
        o(u, e.lang);
        return;
      }
      return new Promise(function (n, r) {
        t.loadScript(e.url, n, r);
      }).then(function () {
        o(u, e.lang);
      }).catch(function () {
        a++;
        if (a >= l.length)
          throw new Error("All attempts failed to load g11n settings for:" + i);
        return c();
      });
    }
    var a = 0, f = s.getLocale(i), l = [{
          lang: i,
          url: e + "/" + i + "/settings.js"
        }];
    return f !== i && l.push({
      lang: f,
      url: e + "/" + f + "/settings.js"
    }), l.push({
      lang: n.i18n.EMBEDDED_LOCALE,
      url: e + "/en-us/settings.js"
    }), Skype.WebExperience = Skype.WebExperience || {}, Skype.WebExperience.setGlobalization = function (e) {
      r.init(e);
    }, c();
  }
  function a(e) {
    var t = e.initParams.locale;
    if (t !== n.i18n.EMBEDDED_LOCALE) {
      var r = e.appBaseUrl + "/resources/g11n";
      return u(r, t, e);
    }
    o(e, t);
  }
  var t = e("swx-utils-common").loader, n = e("swx-constants").COMMON, r = e("swx-g11n").globalization, i = e("services/g11n/default"), s = e("services/i18n/cultureInfo");
  return r.init(i), { init: a };
});
