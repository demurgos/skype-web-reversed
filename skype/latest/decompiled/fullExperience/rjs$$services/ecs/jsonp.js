define("services/ecs/jsonp", [
  "require",
  "swx-browser-globals",
  "swx-utils-common",
  "experience/settings"
], function (e) {
  function s(e, s, o, u, a) {
    var f, l, c, h = t.getWindow();
    a = a || "callback";
    if (!e || !s)
      throw "mandatory options missing";
    c = function () {
      h.clearTimeout(l);
      u && (u(), u = null, o = null);
    };
    f = e + (/\?/.test(e) ? "&" : "?") + a + "=Skype." + s;
    h.Skype[s] = function () {
      h.clearTimeout(l);
      o && (o.apply(null, arguments), o = null);
      h.Skype[s] = null;
      u = null;
    };
    n.loadScript(f, i, c);
    l = h.setTimeout(c, r.jsonpTimeout || 20000);
  }
  var t = e("swx-browser-globals"), n = e("swx-utils-common").loader, r = e("experience/settings"), i = function () {
    };
  return { request: s };
});
