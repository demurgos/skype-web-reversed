define("jSkype/services/mojiMedia/main", [
  "require",
  "exports",
  "module",
  "reqwest",
  "jSkype/settings",
  "constants/common",
  "services/pubSub/pubSub",
  "services/pes/configSync"
], function (e, t) {
  function u() {
  }
  var n = e("reqwest"), r = e("jSkype/settings"), i = e("constants/common"), s = e("services/pubSub/pubSub"), o = e("services/pes/configSync");
  t.getMojiMetaData = function (e, t, a) {
    function h(e) {
      var n;
      if (!e) {
        a();
        return;
      }
      n = e;
      n.fallbackUsed = c;
      t(n);
    }
    function p() {
      if (l) {
        var t;
        o.latestToken !== "" ? t = Promise.resolve(o.latestToken) : t = new Promise(function (e) {
          s.subscribe(i.events.personalExpression.CDN_TOKEN_UPDATED, function t() {
            s.unsubscribe(i.events.personalExpression.CDN_TOKEN_UPDATED, t);
            e(o.latestToken);
          });
        });
        t.then(function (t) {
          return c = !0, f = {
            url: e + "?" + t,
            dataType: "json",
            crossOrigin: !0
          }, n.compat(f);
        }).then(h, a);
      } else
        a();
    }
    var f = {
        url: e,
        dataType: "json",
        crossOrigin: !0
      }, l, c = !1;
    l = r.isFeatureOn(i.featureFlags.PES_CDN_AUTH_ENABLED);
    l && (f.withCredentials = !0);
    a = a || u;
    n.compat(f).then(h, p);
  };
});
