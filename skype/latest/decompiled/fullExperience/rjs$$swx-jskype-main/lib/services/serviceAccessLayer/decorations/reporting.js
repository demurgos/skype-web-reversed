(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/serviceAccessLayer/decorations/reporting", [
      "require",
      "exports",
      "swx-jskype-internal-application-instance",
      "../qos/reporter",
      "swx-constants/lib/common",
      "swx-chat-service/lib/constants",
      "jskype-settings-instance",
      "lodash-compat"
    ], e);
}(function (e, t) {
  function f(e) {
    if (u.isString(e)) {
      var t = e.match(/(?:[\s\S]*):\/\/([^\/\r\n]+)(?:\/[^\r\n]*)?/i);
      if (t && t.length > 0)
        return t[1];
    }
    return undefined;
  }
  function l(e, t) {
    try {
      var n = JSON.parse(t.response);
      n && n.errorCode && (e.errorCode = n.errorCode, e.errorMessage = n.message);
    } catch (r) {
    }
  }
  function c(e, t) {
    e.getAllResponseHeaders();
    var n = e.getAllResponseHeaders().toLowerCase();
    return u.includes(n, t) && e.getResponseHeader(t);
  }
  function h(e, t) {
    var n = u.map(t.eventMessages, "resourceType");
    u.uniq(n).forEach(function (t) {
      var r = n.length, i = u.without(n, t).length;
      e[u.camelCase(t)] = r - i;
    });
  }
  function p(e, t) {
    if (e.faultCode === 404) {
      if (c(t, "location") || t.response === undefined)
        return;
      l(e, t);
    }
    n.get()._telemetry.eventBus.publish(i["default"].events.errors.SERVICE_FAILURE, e);
  }
  function d(e) {
    return e && o.isFeatureOn(i["default"].featureFlags.SERVICE_FAILURE_REPORTING);
  }
  var n = e("swx-jskype-internal-application-instance"), r = e("../qos/reporter"), i = e("swx-constants/lib/common"), s = e("swx-chat-service/lib/constants"), o = e("jskype-settings-instance"), u = e("lodash-compat"), a = s.SERVICE_CALLS;
  t.name = "reporting";
  t.build = function (e, t) {
    var n = t.serviceName;
    return function (i) {
      function o(e) {
        r.get().reportSuccess(n, l(e));
        e.retry && r.get().reportRetry(v(e, !1));
      }
      function u(e) {
        e.retry && r.get().reportRetry(v(e, !0));
        if (d(n)) {
          var t = l();
          e instanceof XMLHttpRequest && (t.faultCode = e.status, t.contextId = c(e, "contextid"));
          r.get().reportFail(n, t);
          p(t, e);
        }
      }
      function l(e) {
        var t = {
          serviceName: n,
          verb: i.type,
          host: f(i.url)
        };
        return n === "webapi-" + a.REQUEST_POLLING && e && e.response && e.response.eventMessages && h(t, e.response), t;
      }
      function v(e, t) {
        var r = e.request ? e.request.status : e.status;
        return {
          serviceName: n,
          retryCount: e.retry.count,
          responseCode: r,
          isFailed: t,
          ttc: e.retry.ttc
        };
      }
      var s = e(i);
      return s.then(o, u), s;
    };
  };
}));
