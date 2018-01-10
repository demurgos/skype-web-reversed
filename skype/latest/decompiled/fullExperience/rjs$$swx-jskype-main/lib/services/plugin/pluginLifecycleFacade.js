(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/plugin/pluginLifecycleFacade", [
      "require",
      "exports",
      "jcafe-property-model",
      "swx-constants",
      "../../../lib/modelHelpers/propertyModelHelper",
      "./pluginCore",
      "./videoManager",
      "./pluginEventDispatcher",
      "../../../lib/telemetry/pluginTelemetry",
      "jskype-settings-instance",
      "swx-browser-globals"
    ], e);
}(function (e, t) {
  function y() {
    return T().get();
  }
  function b() {
    return s.isInstalled() ? m ? m : (m = x().then(C), m["catch"](k), m) : i.createRejectedPromise(r.PLUGIN_CONST.PLUGIN_ERRORS.NOT_INSTALLED);
  }
  function w() {
    return T().getManager();
  }
  function E() {
    return T().isManagerLoaded();
  }
  function S() {
    return b().then(function (e) {
      return e.skypeCore.getVersion();
    });
  }
  function x() {
    return new Promise(function (e, t) {
      var n = l.getWindow().setTimeout(function () {
        t(r.PLUGIN_CONST.PLUGIN_ERRORS.INIT_TIMEOUT);
      }, f.settings.plugin.pluginInitTimeout);
      return h.then(N).then(function (t) {
        l.getWindow().clearTimeout(n);
        e(t);
      }, t);
    });
  }
  function T() {
    return c || (c = s.build()), c;
  }
  function N() {
    return T().get();
  }
  function C(e) {
    return p = e.managerComponent, d = e.skypeCoreComponent, v = o.build(p.componentId, d), u.startListeningOnVideoManager(v), T().onCrash(k), {
      skypeCore: d,
      videoManager: v
    };
  }
  function k(e) {
    e === r.PLUGIN_CONST.PLUGIN_ERRORS.INIT_TIMEOUT && L();
    u.onManagerComponentCrashed(e);
    t.dispose(!0);
  }
  function L() {
    g || (g = a.getLogger());
    g.logPluginInitializationTimeout();
  }
  var n = e("jcafe-property-model"), r = e("swx-constants"), i = e("../../../lib/modelHelpers/propertyModelHelper"), s = e("./pluginCore"), o = e("./videoManager"), u = e("./pluginEventDispatcher"), a = e("../../../lib/telemetry/pluginTelemetry"), f = e("jskype-settings-instance"), l = e("swx-browser-globals"), c, h = i.createResolvedPromise(), p, d, v, m, g;
  t.initialize = y;
  t.createPlugin = b;
  t.createManager = w;
  t.isLoaded = E;
  t.getVersion = S;
  t.dispose = function (e) {
    var t = n.task();
    return p = null, d = null, m = null, g = null, h = t.promise, v && (v.dispose(), v = null), T().dispose(e).then(t.resolve.bind(t))["catch"](t.resolve.bind(t)), t.promise;
  };
}));
