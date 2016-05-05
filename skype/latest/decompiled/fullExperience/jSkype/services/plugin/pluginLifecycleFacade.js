define("jSkype/services/plugin/pluginLifecycleFacade", [
  "require",
  "exports",
  "module",
  "jcafe-property-model",
  "constants/calling",
  "jSkype/modelHelpers/propertyModelHelper",
  "jSkype/services/plugin/pluginCore",
  "jSkype/services/plugin/videoManager",
  "jSkype/services/plugin/pluginEventDispatcher",
  "jSkype/telemetry/pluginTelemetry",
  "browser/window"
], function (e, t) {
  function g() {
    return new Promise(function (e, t) {
      var n = f.setTimeout(function () {
        t(r.PLUGIN_ERROR.INIT_TIMEOUT);
      }, r.PLUGIN_INIT_TIMEOUT);
      return c.then(b).then(function (t) {
        f.clearTimeout(n), e(t);
      }, t);
    });
  }
  function y() {
    return l || (l = s.build()), l;
  }
  function b() {
    return y().get();
  }
  function w(e) {
    return h = e.managerComponent, p = e.skypeCoreComponent, d = o.build(h.componentId, p), u.startListeningOnVideoManager(d), y().onCrash(E), {
      skypeCore: p,
      videoManager: d
    };
  }
  function E(e) {
    e === r.PLUGIN_ERROR.INIT_TIMEOUT && S(), u.onManagerComponentCrashed(), t.dispose(!0);
  }
  function S() {
    m || (m = a.getLogger()), m.logPluginInitializationTimeout();
  }
  var n = e("jcafe-property-model"), r = e("constants/calling"), i = e("jSkype/modelHelpers/propertyModelHelper"), s = e("jSkype/services/plugin/pluginCore"), o = e("jSkype/services/plugin/videoManager"), u = e("jSkype/services/plugin/pluginEventDispatcher"), a = e("jSkype/telemetry/pluginTelemetry"), f = e("browser/window"), l, c = i.createResolvedPromise(), h, p, d, v, m;
  return t.initialize = function () {
    return y().get();
  }, t.createPlugin = function () {
    return s.isInstalled() ? v ? v : (v = g().then(w), v.catch(E), v) : i.createRejectedPromise(r.PLUGIN_ERROR.NOT_INSTALLED);
  }, t.isLoaded = function () {
    return y().isManagerLoaded();
  }, t.dispose = function (e) {
    var t = n.task();
    return h = null, p = null, v = null, m = null, c = t.promise, d && (d.dispose(), d = null), y().dispose(e).then(t.resolve.bind(t)).catch(t.resolve.bind(t)), t.promise;
  }, t;
})
