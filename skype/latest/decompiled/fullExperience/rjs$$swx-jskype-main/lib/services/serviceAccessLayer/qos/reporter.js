(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/serviceAccessLayer/qos/reporter", [
      "require",
      "exports",
      "swx-jskype-internal-application-instance",
      "swx-telemetry-buckets",
      "jskype-settings-instance",
      "lodash-compat"
    ], e);
}(function (e, t) {
  function u() {
    function a(n, r, i) {
      if (u === 0 || !n)
        return !1;
      i = i || {};
      var o = n;
      return s.forIn(i, function (e, t) {
        c(t) && (o += t + e);
      }), t[o] || (t[o] = {
        total: 0,
        success: 0,
        serviceName: n,
        payload: i
      }), r && t[o].success++, t[o].total++, e++, e >= u && (f(), t = {}, e = 0), !0;
    }
    function f() {
      Object.keys(t).forEach(function (e) {
        var t = l(e);
        n.get()._telemetryManager.sendEvent(i.settings.telemetry.jSkypeTenantToken, o, t);
      });
    }
    function l(e) {
      var n = t[e], r = {
          qos: Math.round(n.success / n.total * 100).toString(),
          service_id: n.serviceName,
          success_count: n.success.toString(),
          failure_count: (n.total - n.success).toString()
        };
      return s.forIn(n.payload, function (e, t) {
        c(t) && e && (r[t] = e.toString());
      }), r;
    }
    function c(e) {
      return !s.includes([
        "serviceName",
        "service_id",
        "success_count",
        "failure_count"
      ], e);
    }
    var e = 0, t = {}, u = i.settings.serviceQosReporter.iterationCountBeforeFlushingQoSMetrics;
    return {
      reportSuccess: function (e, t) {
        return a(e, !0, t);
      },
      reportFail: function (e, t) {
        return a(e, !1, t);
      },
      reportRetry: function (e) {
        n.get()._telemetryManager.sendEvent(i.settings.telemetry.jSkypeTenantToken, "serviceRetry_qos", { ttcGroup: r.getSecondsDurationGroupFromMs(e.ttc) });
      }
    };
  }
  function f() {
    return a || (a = u()), a;
  }
  var n = e("swx-jskype-internal-application-instance"), r = e("swx-telemetry-buckets"), i = e("jskype-settings-instance"), s = e("lodash-compat"), o = "service_qos";
  t.build = u;
  var a = null;
  t.get = f;
}));
