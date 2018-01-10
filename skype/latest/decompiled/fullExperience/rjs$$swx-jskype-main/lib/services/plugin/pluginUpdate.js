(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/plugin/pluginUpdate", [
      "require",
      "exports",
      "jskype-settings-instance",
      "jskype-constants",
      "swx-browser-globals"
    ], e);
}(function (e, t) {
  function o(e, r) {
    function a(e) {
      f(t.REASONS.TIMEOUT + e);
    }
    function f(e) {
      o.pluginUpdateReason = e;
      p(!1, o);
    }
    function l(e) {
      o.pluginUpdateSuccess = !0;
      p(e, e ? o : undefined);
    }
    function c(e) {
      s = i.getWindow().setTimeout(a.bind(null, e.name), e.timeout);
    }
    function h() {
      i.getWindow().clearTimeout(s);
    }
    function p(t, n) {
      h();
      e.onUpdateCheckComplete = null;
      e.onUpdateDownloadStarted = null;
      e.onUpdateDownloadComplete = null;
      e.onUpdateInstallStarted = null;
      e.onUpdateInstallComplete = null;
      r && (r(Boolean(t), n), r = null);
    }
    function d(e) {
      var r = n.settings.plugin.download.minVersion, i = n.settings.plugin.download.maxVersion, s = n.settings.plugin.manifestKey, o = n.settings.plugin.ecsService, u = e.runSoftwareUpdate(r, i, s, o);
      u instanceof Object && u.error && f(t.REASONS.RUN_SOFTWARE_UPDATE_ERROR + u.error);
    }
    function v(e) {
      e.onUpdateCheckComplete = m;
      e.onUpdateDownloadStarted = g;
      e.onUpdateDownloadComplete = y;
      e.onUpdateInstallStarted = b;
      e.onUpdateInstallComplete = w;
    }
    function m(e) {
      h();
      e && e.success !== undefined ? e.success ? e.updateVersion ? (o.pluginUpdateVersion = e.updateVersion, c(t.STEPS.DOWNLOAD_STARTED)) : l(!1) : f(t.REASONS.UPDATE_CHECK_FAILURE) : f(t.REASONS.UPDATE_CHECK_ARGS_ERROR);
    }
    function g() {
      h();
      c(t.STEPS.DOWNLOAD_COMPLETE);
    }
    function y(e) {
      h();
      e && e.success !== undefined ? e.success ? c(t.STEPS.INSTALL_STARTED) : f(t.REASONS.UPDATE_DOWNLOAD_FAILURE) : f(t.REASONS.UPDATE_DOWNLOAD_ARGS_ERROR);
    }
    function b() {
      h();
      c(t.STEPS.INSTALL_COMPLETE);
    }
    function w(e) {
      h();
      e && e.success !== undefined ? e.success ? l(!0) : f(t.REASONS.UPDATE_INSTALL_FAILURE) : f(t.REASONS.UPDATE_INSTALL_ARGS_ERROR);
    }
    var o = {
      pluginUpdateSuccess: !1,
      pluginUpdateReason: undefined,
      pluginUpdateVersion: undefined
    };
    if (!u() || t.wasTryingToUpdate) {
      p();
      return;
    }
    t.wasTryingToUpdate = !0;
    v(e);
    d(e);
    c(t.STEPS.CHECK_FOR_UPDATE);
  }
  function u() {
    return n.isFeatureOn(r.FEATURE_FLAGS.PLUGIN_AUTO_UPDATE);
  }
  var n = e("jskype-settings-instance"), r = e("jskype-constants"), i = e("swx-browser-globals"), s;
  t.STEPS = {
    CHECK_FOR_UPDATE: {
      timeout: 10000,
      name: "check_update"
    },
    DOWNLOAD_STARTED: {
      timeout: 10000,
      name: "download_started"
    },
    DOWNLOAD_COMPLETE: {
      timeout: 30000,
      name: "download_complete"
    },
    INSTALL_STARTED: {
      timeout: 10000,
      name: "install_started"
    },
    INSTALL_COMPLETE: {
      timeout: 10000,
      name: "install_complete"
    }
  };
  t.REASONS = {
    RUN_SOFTWARE_UPDATE_ERROR: "RunSoftwareUpdate: ",
    UPDATE_CHECK_FAILURE: "UpdateCheckComplete: check failure",
    UPDATE_CHECK_ARGS_ERROR: "UpdateCheckComplete: event error, missing args",
    UPDATE_DOWNLOAD_FAILURE: "UpdateDownloadComplete: download failure",
    UPDATE_DOWNLOAD_ARGS_ERROR: "UpdateDownloadComplete: event error, missing args",
    UPDATE_INSTALL_FAILURE: "UpdateInstallComplete: install failure",
    UPDATE_INSTALL_ARGS_ERROR: "UpdateInstallComplete: event error, missing args",
    TIMEOUT: "Timeout: "
  };
  t.wasTryingToUpdate = !1;
  t.updateLatest = o;
}));
