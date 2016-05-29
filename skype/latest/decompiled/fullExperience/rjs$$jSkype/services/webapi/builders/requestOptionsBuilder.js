define("jSkype/services/webapi/builders/requestOptionsBuilder", [
  "require",
  "jcafe-property-model",
  "jSkype/settings",
  "jSkype/services/serviceAccessLayer/transientFaultPolicy"
], function (e) {
  var t = e("jcafe-property-model"), n = e("jSkype/settings"), r = e("jSkype/services/serviceAccessLayer/transientFaultPolicy");
  return function (i) {
    this.build = function (e, s) {
      function h(t) {
        var n = {
          headers: t,
          retry: {
            limit: a,
            delay: f,
            strategy: l,
            isTransientCheck: r.isTransientFailure,
            isSuccessCheck: r.isWebApiSuccess
          },
          reporting: { serviceName: "webapi-" + e }
        };
        s && s.payload && (n.payload = JSON.stringify(s.payload));
        s && s.params && (n.params = s.params);
        o.resolve(n);
      }
      var o = t.task(), u = n.settings.webApiService, a = u.retry.limit, f = u.retry.delay, l = u.retry.strategy, c = u.overrides && u.overrides[e];
      return i.fetch(e).then(h, o.reject.bind(o)), c && (f = c.delay || f, a = c.limit || a, l = c.strategy || l), o.promise;
    };
  };
});
