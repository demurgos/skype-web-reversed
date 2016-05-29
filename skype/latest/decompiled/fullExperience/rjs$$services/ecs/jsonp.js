define("services/ecs/jsonp", [
  "require",
  "browser/window",
  "swx-utils-common",
  "experience/settings"
], function (e) {
  function s(e, s, o, u, a) {
    var f, l, c;
    a = a || "callback";
    if (!e || !s)
      throw "mandatory options missing";
    c = function () {
      t.clearTimeout(l);
      u && (u(), u = null, o = null);
    };
    f = e + (/\?/.test(e) ? "&" : "?") + a + "=Skype." + s;
    t.Skype[s] = function () {
      t.clearTimeout(l);
      o && (o.apply(null, arguments), o = null);
      t.Skype[s] = null;
      u = null;
    };
    n.loadScript(f, i, c);
    l = t.setTimeout(c, r.jsonpTimeout || 20000);
  }
  var t = e("browser/window"), n = e("swx-utils-common").loader, r = e("experience/settings"), i = function () {
    };
  return { request: s };
});
