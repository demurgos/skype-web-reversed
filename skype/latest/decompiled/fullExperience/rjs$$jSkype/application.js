define("jSkype/application", [
  "require",
  "swx-polyfill-initializer",
  "lodash-compat",
  "swx-constants",
  "swx-enums",
  "swx-jskype-internal-application-instance",
  "jcafe-property-model",
  "swx-jskype-main/lib/models/signInManager",
  "swx-jskype-main/lib/models/translatorService",
  "swx-jskype-main/lib/services/messageSearch/main",
  "swx-jskype-main/lib/models/marketplaceManager",
  "swx-jskype-main/lib/models/conversationsManager",
  "swx-jskype-main/lib/models/devicesManager",
  "swx-jskype-main/lib/models/personsAndGroupsManager",
  "swx-jskype-main/lib/modelHelpers/dataOrchestrator",
  "jskype-settings-instance",
  "experience/settings",
  "swx-jskype-main/lib/services/asyncMedia/main",
  "jSkype/services/calling/callingInitializer",
  "swx-jskype-main/lib/services/keyEncryption/keyEncryption",
  "swx-jskype-main/lib/services/serviceFactory",
  "swx-chat-service/lib/constants",
  "swx-jskype-main/lib/services/spaces",
  "swx-log-tracer",
  "swx-jskype-main/lib/services/cache/instance",
  "swx-jskype-main/lib/utils/preferences",
  "swx-utils-common",
  "swx-jskype-main/lib/services/preferences/flagsServiceProvider"
], function (e) {
  function k(e) {
    var k = this;
    return e = t.defaults({}, e, { settings: {} }), d.settings = e.settings, x.set(e.localStorage), N.remove("chat-4171"), S.configure({
      logToConsole: d.isFeatureOn(n.featureFlags.CONSOLE_LOGGING),
      logToBuffer: d.isFeatureOn(n.featureFlags.ISSUE_REPORTING),
      logUnhandled: d.isFeatureOn(n.featureFlags.ISSUE_REPORTING),
      reporting: {
        enabled: d.isFeatureOn(n.featureFlags.ERROR_LOG_REPORTING),
        throttleInterval: d.settings.telemetry ? d.settings.telemetry.logThrottleInterval : 0,
        telemetryManager: e.telemetryManager,
        telemetryToken: d.settings.telemetry ? d.settings.telemetry.logReportingToken : null
      }
    }), k._standbyMode = s.property({ value: d.isFeatureOn(n.featureFlags.SUPPORT_STANDBY_MODE) }), k._telemetryManager = e.telemetryManager, k._telemetry = e.telemetry, k._flagsServiceProvider = C, k.signInManager = o.build(e.linkingApi, e.authContext), k.personsAndGroupsManager = new h(), k.conversationsManager = new l(), k.devicesManager = c.build(), k.suspended = s.boolProperty(!1), k.marketplaceManager = new f(), d.isFeatureOn(n.featureFlags.TRANSLATOR_SENDING_ENABLED) && (k.translatorService = u.build()), d.isFeatureOn(n.featureFlags.CONTENT_SEARCH) && (k._messagesSearchService = a.build()), k.signInManager.state.when(r.loginState.SignedIn, function () {
      x.get().init(y.build());
      T.init(k.personsAndGroupsManager.mePerson.preferences);
      p.initialize();
      g.initialize(v);
      E.initialize(v);
      E.fetchConfig();
    }), k.signInManager.state.when(r.loginState.SigningOut, function () {
      x.get().destroy(!0);
      g.destroy();
      k.suspended(!1);
      k.devicesManager._reset();
      k.conversationsManager._reset().then(function () {
        k.personsAndGroupsManager._reset();
        k.signInManager.state._set(r.loginState.SignedOut);
      });
    }), k.signInManager._skypeToken.changed(function (e) {
      m.get().authenticate(e);
    }), k.isEndpointActive = s.property({
      value: !1,
      set: function () {
        function n() {
          k.isEndpointActive(!1);
        }
        function r() {
          b.getPresenceService().activateEndpoint();
          e && clearTimeout(e);
          e = setTimeout(n, w.ACTIVATE_ENDPOINT_TIMEOUT);
        }
        var e = null, i = t.debounce(r, 0, {
            leading: !0,
            trailing: !1,
            maxWait: w.ACTIVATE_ENDPOINT_TIMEOUT - w.ACTIVATE_ENDPOINT_TOLERANCE
          });
        return function (e) {
          return e && i(), e;
        };
      }()
    }), i.set(k), k;
  }
  e("swx-polyfill-initializer");
  var t = e("lodash-compat"), n = e("swx-constants").COMMON, r = e("swx-enums"), i = e("swx-jskype-internal-application-instance"), s = e("jcafe-property-model"), o = e("swx-jskype-main/lib/models/signInManager"), u = e("swx-jskype-main/lib/models/translatorService"), a = e("swx-jskype-main/lib/services/messageSearch/main"), f = e("swx-jskype-main/lib/models/marketplaceManager").default, l = e("swx-jskype-main/lib/models/conversationsManager").default, c = e("swx-jskype-main/lib/models/devicesManager"), h = e("swx-jskype-main/lib/models/personsAndGroupsManager").default, p = e("swx-jskype-main/lib/modelHelpers/dataOrchestrator"), d = e("jskype-settings-instance"), v = e("experience/settings"), m = e("swx-jskype-main/lib/services/asyncMedia/main"), g = e("jSkype/services/calling/callingInitializer"), y = e("swx-jskype-main/lib/services/keyEncryption/keyEncryption"), b = e("swx-jskype-main/lib/services/serviceFactory"), w = e("swx-chat-service/lib/constants"), E = e("swx-jskype-main/lib/services/spaces"), S = e("swx-log-tracer"), x = e("swx-jskype-main/lib/services/cache/instance"), T = e("swx-jskype-main/lib/utils/preferences"), N = e("swx-utils-common").sessionStorage, C = e("swx-jskype-main/lib/services/preferences/flagsServiceProvider");
  return k;
});
