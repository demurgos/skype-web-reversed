(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("jskype-settings-instance/lib/index", [
      "require",
      "exports",
      "swx-log-tracer"
    ], e);
}(function (e, t) {
  function i(e) {
    return t.settings.featureFlags ? Boolean(t.settings.featureFlags[e]) : (r.warn("No feature flags set on settings, checking feature " + e), !1);
  }
  var n = e("swx-log-tracer"), r = n.getLogger("[jskype-settings]");
  t.settings = {
    flagsApiUrl: "",
    featureFlags: {},
    userOptionsService: {
      host: "",
      optionsEndpoint: ""
    },
    contactsProxyService: {},
    stratusService: {
      host: "",
      avatarUrl: "",
      retry: null
    },
    abchUserWebService: {
      host: "",
      appId: "",
      settingsEndpoint: ""
    },
    profileService: {
      appId: "",
      profileEndpoint: ""
    },
    avatarService: {
      host: "",
      contactAvatarEndpoint: "",
      publicAvatarEndpoint: ""
    },
    serviceQosReporter: { iterationCountBeforeFlushingQoSMetrics: 0 },
    telemetry: {
      jSkypeTenantToken: "",
      chatTenantToken: "",
      trouterTenantToken: "",
      mdscToken: "",
      skypeConcoreToken: "",
      issueReportUrl: ""
    },
    sessionId: "",
    platformId: "",
    ecsClientCobrandTag: "",
    environment: ""
  };
  t.isFeatureOn = i;
}));
