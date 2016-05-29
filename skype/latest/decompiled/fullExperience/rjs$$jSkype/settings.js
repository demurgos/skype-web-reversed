define("jSkype/settings", [
  "require",
  "exports",
  "module"
], function (e, t) {
  t.settings = {
    flagsApiUrl: "",
    userOptionsService: {
      host: "",
      optionsEndpoint: ""
    },
    contactsProxyService: {},
    stratusService: {
      host: "",
      avatarUrl: ""
    },
    peopleService: {
      appId: "",
      settingsEndpoint: ""
    },
    profileService: {
      appId: "",
      profileEndpoint: ""
    }
  };
  t.isFeatureOn = function (e) {
    return t.settings.featureFlags ? Boolean(t.settings.featureFlags[e]) : !1;
  };
});
