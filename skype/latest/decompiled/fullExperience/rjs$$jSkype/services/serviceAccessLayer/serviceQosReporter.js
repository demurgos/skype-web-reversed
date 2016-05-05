define("jSkype/services/serviceAccessLayer/serviceQosReporter", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "jSkype/client",
  "jSkype/settings"
], function (e, t) {
  function o() {
    function u(r, i, s) {
      if (o === 0 || !r)
        return !1;
      s = s || {};
      var u = r;
      n.forIn(s, function (e, t) {
        l(t) && (u += t + e);
      }), t[u] || (t[u] = {
        total: 0,
        success: 0,
        serviceName: r,
        payload: s
      }), i && t[u].success++, t[u].total++, e++, e >= o && (a(), t = {}, e = 0);
    }
    function a() {
      Object.keys(t).forEach(function (e) {
        var t = f(e);
        r.get()._telemetryManager.sendEvent(i.settings.telemetry.jSkypeTenantToken, s, t);
      });
    }
    function f(e) {
      var r = t[e].success, i = t[e].total, s = t[e].serviceName, o = t[e].payload, u = i - r, a = Math.round(r / i * 100), f = {
          service_id: s,
          qos: a.toString(),
          success_count: r.toString(),
          failure_count: u.toString()
        };
      return n.forIn(o, function (e, t) {
        l(t) && e && (f[t] = e.toString());
      }), f;
    }
    function l(e) {
      return !n.includes([
        "serviceName",
        "service_id",
        "success_count",
        "failure_count"
      ], e);
    }
    var e = 0, t = {}, o = i.settings.serviceQosReporter.iterationCountBeforeFlushingQoSMetrics;
    this.reportSuccess = function (t, n) {
      return u(t, !0, n);
    }, this.reportFail = function (t, n) {
      return u(t, !1, n);
    };
  }
  var n = e("lodash-compat"), r = e("jSkype/client"), i = e("jSkype/settings"), s = "service_qos";
  t.build = function () {
    return new o();
  };
})
