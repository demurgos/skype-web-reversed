define("services/ecs/configLoader", [
  "require",
  "lodash-compat",
  "experience/settings",
  "services/ecs/jsonp",
  "reqwest"
], function (e) {
  function s() {
    function a() {
      var e = n.version.split(".", 4);
      while (e.length < 4)
        e.push("0");
      return e[3] = e[2], e[2] = n.ecsClientCobrandTag, u + "_" + e.join(".");
    }
    function f(e) {
      function r(t, n) {
        return e[n] ? t.concat([
          n,
          e[n]
        ].join("=")) : t;
      }
      var n = t.keys(e).reduce(r, []);
      if (n.length > 0)
        return n.join("&");
    }
    function l(e, t, n, r, i) {
      var s = a(), o = f(r), u = t + "/config/v1/" + e + "/" + s + "/" + n, l = "?";
      return n.indexOf(l) > -1 && (l = "&"), o && (u += l + o, l = "&"), i && (u += l + "id=" + i), u;
    }
    function c(e, t, r, i) {
      var s, o = [], u = {};
      n.initParams && n.initParams.apiKey && (u.apikey = n.initParams.apiKey);
      for (s = 0; s < t.length; s++)
        o.push(l(e, t[s], r, u, i));
      return o;
    }
    function h() {
      return t.isString(n.ecsHosts) ? JSON.parse(n.ecsHosts) : n.ecsHosts || [];
    }
    var e = this, s = 2, o = 1, u = 908;
    e.loadConfig = function (e, t, u) {
      var a = h(), f = c(e, a, t, u);
      return new Promise(function (e, t) {
        function c(o) {
          function h(t) {
            e(t);
          }
          function p() {
            var e = u / f.length >= s, n;
            e ? t(new Error("configuration service unreachable")) : (a += 1, n = a % f.length, c(f[n]));
          }
          u++;
          if (n.initParams.jsonp === !1) {
            var d = {
              url: o,
              method: "GET",
              crossOrigin: !0,
              dataType: "json"
            };
            i.compat(d).then(h, p);
          } else
            r.request(o, "onConfigurationLoaded_" + l, h, p);
        }
        var u = 0, a = 0, l = o;
        o += 1, !f || !f.length ? t(new Error("no configuration service endpoint")) : (c(f[a]), a += 1);
      });
    };
  }
  var t = e("lodash-compat"), n = e("experience/settings"), r = e("services/ecs/jsonp"), i = e("reqwest");
  return new s();
})
