define("services/g11n/globalization", [
  "require",
  "exports",
  "module",
  "services/g11n/default",
  "services/g11n/formatter",
  "browser/document"
], function (e, t) {
  function s(e, t) {
    e.dir || (e.dir = t);
  }
  var n = e("services/g11n/default"), r = e("services/g11n/formatter"), i = e("browser/document");
  t.init = function (e) {
    n = e;
  }, t.initLocaleDirection = function (e) {
    var t = i.documentElement;
    t.dir ? s(e, t.dir) : n.dir && s(e, n.dir);
  }, t.formatDate = function (e, t) {
    var i = n.time.format[t];
    i || (i = n.date.format[t]);
    if (!i)
      throw new Error("No format found with a key:" + t + "in settings of:" + n.locale);
    return r.formatDate(e, i, n);
  }, t.formatDuration = function (e, t) {
    var i = n.time.format[t];
    if (!i)
      throw new Error("No format found with a key:" + t + "in settings of:" + n.locale);
    return r.formatDuration(e, i);
  };
})
