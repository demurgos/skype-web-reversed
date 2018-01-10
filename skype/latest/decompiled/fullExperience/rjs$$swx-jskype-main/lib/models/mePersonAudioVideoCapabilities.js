(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/models/mePersonAudioVideoCapabilities", [
      "require",
      "exports",
      "swx-jskype-internal-application-instance",
      "swx-browser-detect",
      "jskype-settings-instance",
      "swx-util-calling-stack",
      "../../lib/telemetry/logging/callingLogTracer",
      "swx-constants",
      "../../lib/services/calling/environmentInspector",
      "swx-enums",
      "jcafe-property-model"
    ], e);
}(function (e, t) {
  function p() {
    return new h();
  }
  var n = e("swx-jskype-internal-application-instance"), r = e("swx-browser-detect"), i = e("jskype-settings-instance"), s = e("swx-util-calling-stack"), o = e("../../lib/telemetry/logging/callingLogTracer"), u = e("swx-constants"), a = e("../../lib/services/calling/environmentInspector"), f = e("swx-enums"), l = e("jcafe-property-model"), c = o.get(), h = function () {
      function e() {
        var e = this;
        this.isChrome = r["default"].getBrowserInfo().browserName === r["default"].BROWSERS.CHROME;
        this.isFirefox = r["default"].getBrowserInfo().browserName === r["default"].BROWSERS.FIREFOX;
        this.isElectron = r["default"].getBrowserInfo().browserName === r["default"].BROWSERS.ELECTRON;
        this.isLinux = r["default"].getSystemInfo().osName === r["default"].OPERATING_SYSTEMS.LINUX;
        this.isCallingFeatureFlagDisabled = !i.isFeatureOn(u.COMMON.featureFlags.CALLING);
        this.audioCapability = l.property({
          readOnly: !0,
          get: this.getAudioCapability.bind(this)
        });
        this.videoCapability = l.property({
          readOnly: !0,
          get: this.getVideoCapability.bind(this)
        });
        this.setup = function () {
          e.supportsAudioFeature() || e.supportsVideoFeature() ? (a.isCallingSupported.changed(function (t, n) {
            c.log("[MePerson] calling support changed", t, n);
            e.setAudioCapability(t, n);
            e.setVideoCapability(t, n);
          }), e.handleSelectCameraChange()) : (e.audioCapability._set(!1, f.callingNotSupportedReasons.FeatureDisabled), e.videoCapability._set(!1, f.callingNotSupportedReasons.FeatureDisabled));
        };
      }
      return e.prototype.supportsAudioFeature = function () {
        return this.isCallingFeatureFlagDisabled ? !1 : this.isLinux ? this.isChrome || this.isElectron ? i.isFeatureOn(u.COMMON.featureFlags.PLUGINLESS_CALLING_CHROME_LINUX) : !1 : !0;
      }, e.prototype.supportsVideoFeature = function () {
        return this.isCallingFeatureFlagDisabled ? !1 : this.isFirefox ? i.isFeatureOn(u.COMMON.featureFlags.PLUGINLESS_VIDEO_CALLING_FIREFOX) : this.isLinux ? this.isChrome || this.isElectron ? i.isFeatureOn(u.COMMON.featureFlags.PLUGINLESS_VIDEO_CALLING_CHROME_LINUX) : !1 : !0;
      }, e.prototype.setAudioCapability = function (e, t) {
        var n = e, r = t;
        this.supportsAudioFeature() || (n = !1, r = f.callingNotSupportedReasons.FeatureDisabled);
        c.log("[MePerson] set audio capability", n, r);
        this.audioCapability._set(n, r);
      }, e.prototype.setVideoCapability = function (e, t) {
        var r = e, i = t;
        if (s.get().isPluginlessCallingSupported()) {
          var o = Boolean(n.get().devicesManager.selectedCamera());
          e && !o && (i = f.callingNotSupportedReasons.CameraUnavailable);
          r = e && o;
        }
        this.supportsVideoFeature() || (r = !1, i = f.callingNotSupportedReasons.FeatureDisabled);
        c.log("[MePerson] set video capability", r, i);
        this.videoCapability._set(r, i);
      }, e.prototype.handleSelectCameraChange = function () {
        var e = this;
        s.get().isPluginlessCallingSupported() && this.supportsVideoFeature() && n.get().devicesManager.selectedCamera.changed(function () {
          e.setVideoCapability(a.isCallingSupported(), a.isCallingSupported.reason);
        });
      }, e.prototype.isCameraAvailable = function () {
        return s.get().isPluginlessCallingSupported() ? n.get().devicesManager.selectedCamera() : !0;
      }, e.prototype.getAudioCapability = function () {
        var e = this;
        return this.supportsAudioFeature() ? a.isCallingSupported.get().then(function (t) {
          return e.setAudioCapability(t, a.isCallingSupported.reason), t;
        }) : (this.setAudioCapability(!1, f.callingNotSupportedReasons.FeatureDisabled), Promise.resolve(!1));
      }, e.prototype.getVideoCapability = function () {
        var e = this;
        return this.supportsVideoFeature() ? a.isCallingSupported.get().then(function (t) {
          return e.setVideoCapability(t, a.isCallingSupported.reason), Boolean(t && e.isCameraAvailable());
        }) : (this.setVideoCapability(!1, f.callingNotSupportedReasons.FeatureDisabled), Promise.resolve(!1));
      }, e;
    }();
  t.MePersonAudioVideoCapabilities = h;
  t.build = p;
}));
