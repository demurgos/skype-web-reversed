define("ui/telemetry/actions/registry/traceableAction", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "swx-utils-common",
  "usertiming",
  "experience/settings",
  "services/serviceLocator",
  "constants/common",
  "ui/telemetry/telemetryClient"
], function (e, t) {
  function f(e, t) {
    function v(e) {
      var t = e + "_mark_";
      return {
        start: t + "start",
        beforeRender: t + "before_render",
        afterRender: t + "after_render"
      };
    }
    function m(e) {
      var t = e + "_duration_";
      return {
        beforeRenderDuration: t + "before_render",
        afterRenderDuration: t + "after_render"
      };
    }
    function g() {
      n.forIn(c, function (e) {
        i.clearMarks(e);
      });
      n.forIn(h, function (e) {
        i.clearMeasures(e);
      });
    }
    function y(t) {
      var n = i.getEntriesByName(t);
      n && n[0] && (e[b(t)] = n[0].duration);
    }
    function b(e) {
      return e.replace(l + "_", "");
    }
    function w() {
      return i.getEntriesByName(c.start).length > 0;
    }
    var f = this, l = r.create(), c = v(l), h = m(l), p = !1, d = o.resolve(u.serviceLocator.FEATURE_FLAGS);
    f.startTrace = function () {
      i.mark(c.start);
    };
    f.markBeforeRender = function () {
      w() && (i.mark(c.beforeRender), i.measure(h.beforeRenderDuration, c.start, c.beforeRender), y(h.beforeRenderDuration), p = !0);
    };
    f.markAfterRender = function () {
      w() && (i.mark(c.afterRender), i.measure(h.afterRenderDuration, c.start, c.afterRender), y(h.afterRenderDuration), p = !0);
    };
    f.addEventData = function (t) {
      n.isPlainObject(t) && n.merge(e, t);
    };
    f.endTrace = function () {
      p && (d.isFeatureOn(u.featureFlags.TELEMETRY_UIACTIONPERF_ENABLED) && a.get().sendEvent(s.telemetry.uiTenantToken, "ui_action_perf", e), g(), t());
    };
  }
  var n = e("lodash-compat"), r = e("swx-utils-common").guid, i = e("usertiming"), s = e("experience/settings"), o = e("services/serviceLocator"), u = e("constants/common"), a = e("ui/telemetry/telemetryClient");
  t.build = function (e, t) {
    return new f(e, t);
  };
});
