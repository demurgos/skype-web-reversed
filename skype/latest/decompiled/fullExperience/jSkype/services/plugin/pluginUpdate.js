define("jSkype/services/plugin/pluginUpdate", [
  "require",
  "exports",
  "module",
  "jSkype/settings",
  "jSkype/constants/featureFlags"
], function (e, t) {
  function o() {
    return n.isFeatureOn(r.PLUGIN_AUTO_UPDATE);
  }
  var n = e("jSkype/settings"), r = e("jSkype/constants/featureFlags"), i, s = {
      TIME_TO_CHECK_FOR_UPDATE: 10000,
      TIME_TO_START_DOWNLOAD: 10000,
      TIME_TO_FINISH_DOWNLOAD: 30000,
      TIME_TO_START_INSTALL: 10000,
      TIME_TO_FINISH_INSTALL: 10000
    };
  t.TIMEOUTS = s, t.wasTryingToUpdate = !1, t.updateLatest = function (e, r) {
    function u(t) {
      window.clearTimeout(i), e.onUpdateCheckComplete = null, e.onUpdateDownloadStarted = null, e.onUpdateDownloadComplete = null, e.onUpdateInstallStarted = null, e.onUpdateInstallComplete = null, r && (r(Boolean(t)), r = null);
    }
    function a() {
      var t = n.settings.plugin.download.minVersion, r = n.settings.plugin.download.maxVersion, i = n.settings.plugin.manifestKey, s = n.settings.plugin.ecsService;
      e.runSoftwareUpdate(t, r, i, s);
    }
    function f() {
      e.onUpdateCheckComplete = l, e.onUpdateDownloadStarted = c, e.onUpdateDownloadComplete = h, e.onUpdateInstallStarted = p, e.onUpdateInstallComplete = d;
    }
    function l(e) {
      window.clearTimeout(i), e && !e.updateVersion ? u() : i = window.setTimeout(u, s.TIME_TO_START_DOWNLOAD);
    }
    function c() {
      window.clearTimeout(i), i = window.setTimeout(u, s.TIME_TO_FINISH_DOWNLOAD);
    }
    function h(e) {
      window.clearTimeout(i), e && !e.success ? u() : i = window.setTimeout(u, s.TIME_TO_START_INSTALL);
    }
    function p() {
      window.clearTimeout(i), window.setTimeout(u, s.TIME_TO_FINISH_INSTALL);
    }
    function d(e) {
      window.clearTimeout(i), u(e && e.success);
    }
    if (!o() || t.wasTryingToUpdate) {
      u();
      return;
    }
    t.wasTryingToUpdate = !0, f(e), a(e), i = window.setTimeout(u, s.TIME_TO_CHECK_FOR_UPDATE);
  };
})
