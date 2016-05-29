define("jSkype/services/plugin/pluginSupportDetector", [
  "require",
  "exports",
  "module",
  "browser/window",
  "jcafe-property-model",
  "constants/plugin.const",
  "browser/detect",
  "jSkype/services/plugin/pluginLifecycleFacade",
  "jSkype/services/plugin/electron/electronSupportDetector",
  "swx-enums"
], function (e, t) {
  function f() {
    function t(t) {
      var n = s.getBrowserInfo(), r = u(n);
      r ? t && n.isBrowserDefaultToBlockPlugin ? c() : e.resolve({
        isSupported: !0,
        reason: ""
      }) : e.resolve({
        isSupported: !1,
        reason: a.callingNotSupportedReasons.PluginNotInstalled
      });
    }
    function u(e) {
      return e.isIeEngine ? f(e) : l();
    }
    function f(e) {
      try {
        return new n.ActiveXObject(e.is64bit ? i.PROGID_VERSION64 : i.PROGID_VERSION), !0;
      } catch (t) {
        return !1;
      }
    }
    function l() {
      return n.navigator.plugins && n.navigator.plugins.refresh && n.navigator.plugins.refresh(), n.navigator.mimeTypes ? n.navigator.mimeTypes[i.MIME_TYPE] ? n.navigator.mimeTypes[i.MIME_TYPE].enabledPlugin !== undefined : !1 : !1;
    }
    function c() {
      o.createPlugin();
      h() ? e.resolve({
        isSupported: !0,
        reason: ""
      }) : e.resolve({
        isSupported: !1,
        reason: a.callingNotSupportedReasons.PluginBlocked
      });
    }
    function h() {
      return o.isLoaded();
    }
    var e = null;
    this.getCallingSupport = function (n) {
      if (!e || e.promise.state() === "resolved")
        e = r.task(), t(n);
      return e.promise;
    };
  }
  function l() {
    return s.getBrowserInfo().isElectron;
  }
  var n = e("browser/window"), r = e("jcafe-property-model"), i = e("constants/plugin.const"), s = e("browser/detect"), o = e("jSkype/services/plugin/pluginLifecycleFacade"), u = e("jSkype/services/plugin/electron/electronSupportDetector"), a = e("swx-enums");
  t.build = function () {
    return l() ? u.build() : new f();
  };
});
