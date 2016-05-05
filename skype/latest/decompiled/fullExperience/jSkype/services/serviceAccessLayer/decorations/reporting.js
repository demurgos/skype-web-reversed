define("jSkype/services/serviceAccessLayer/decorations/reporting", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "constants/common",
  "jSkype/client",
  "jSkype/services/serviceAccessLayer/serviceQosReporterFacade",
  "jSkype/services/serviceAccessLayer/serviceQosRetryReporter",
  "jSkype/services/webapi/constants",
  "jSkype/settings"
], function (e, t) {
  function f(e, t) {
    var n = JSON.parse(t.response);
    n && n.errorCode && (e.errorCode = n.errorCode, e.errorMessage = n.message);
  }
  function l(e, t) {
    var r = e.getAllResponseHeaders().toLowerCase();
    return n.contains(r, t) && e.getResponseHeader(t);
  }
  function c(e, t) {
    if (e.faultCode === 404) {
      if (l(t, "location") || t.response === undefined)
        return;
      try {
        f(e, t);
      } catch (n) {
      }
    }
    var s = i.get()._telemetry.eventBus;
    s.publish(r.events.errors.SERVICE_FAILURE, e);
  }
  function h(e) {
    return e && p();
  }
  function p() {
    return a.isFeatureOn(r.featureFlags.SERVICE_FAILURE_REPORTING);
  }
  var n = e("lodash-compat"), r = e("constants/common"), i = e("jSkype/client"), s = e("jSkype/services/serviceAccessLayer/serviceQosReporterFacade"), o = e("jSkype/services/serviceAccessLayer/serviceQosRetryReporter"), u = e("jSkype/services/webapi/constants").SERVICE_CALLS, a = e("jSkype/settings");
  t.build = function (t, r) {
    var i = r.serviceName, a = s.getInstance();
    return function (r) {
      function f(e) {
        var t = {
          serviceName: i,
          verb: r.type,
          host: m(r.url)
        };
        return i === "webapi-" + u.REQUEST_POLLING && e && e.response && e.response.eventMessages && l(t, e.response), t;
      }
      function l(e, t) {
        var r = n.map(t.eventMessages, "resourceType");
        n.uniq(r).forEach(function (t) {
          var i = r.length, s = n.without(r, t).length;
          e[n.camelCase(t)] = i - s;
        });
      }
      function p(e, t) {
        var n = e.request ? e.request.status : e.status;
        return {
          serviceName: i,
          retryCount: e.retryCount,
          responseCode: n,
          isFailed: t,
          ttc: e.ttc
        };
      }
      function d(e) {
        a.reportSuccess(i, f(e)), e.retryCount && o.get().publish(p(e, !1));
      }
      function v(e) {
        e.retryCount && o.get().publish(p(e, !0));
        if (h(i)) {
          var t = f();
          e instanceof XMLHttpRequest && (t.faultCode = e.status), a.reportFail(i, t), c(t, e);
        }
      }
      function m(e) {
        if (!e)
          return;
        var t = e.match(/(?:[\s\S]*):\/\/([^\/\r\n]+)(?:\/[^\r\n]*)?/i);
        if (t && t.length > 0)
          return t[1];
      }
      var s = t(r);
      return s.then(d, v), s;
    };
  };
})
