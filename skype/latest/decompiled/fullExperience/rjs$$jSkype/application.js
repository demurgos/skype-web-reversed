define("jSkype/application", [
  "require",
  "helpers/polyfills",
  "lodash-compat",
  "constants/common",
  "swx-enums",
  "jSkype/client",
  "jcafe-property-model",
  "jSkype/models/signInManager",
  "jSkype/models/translatorService",
  "jSkype/services/messageSearch/main",
  "jSkype/models/marketplaceManager",
  "jSkype/models/conversationsManager",
  "jSkype/models/devicesManager",
  "jSkype/models/personsAndGroupsManager",
  "jSkype/modelHelpers/dataOrchestrator",
  "jSkype/settings",
  "jSkype/services/asyncMedia/main",
  "jSkype/services/calling/callingInitializer",
  "jSkype/services/keyEncryption",
  "jSkype/services/serviceFactory",
  "jSkype/services/webapi/constants",
  "jSkype/services/spaces",
  "utils/common/logTracer/api",
  "utils/common/cache/instance",
  "swx-utils-common"
], function (e) {
  function T(e) {
    var T = this;
    return e = t.defaults({}, e, { settings: {} }), d.settings = e.settings, x.remove("chat-4171"), E.configure({
      logToConsole: d.isFeatureOn(n.featureFlags.CONSOLE_LOGGING),
      logToBuffer: d.isFeatureOn(n.featureFlags.ISSUE_REPORTING),
      logUnhandled: d.isFeatureOn(n.featureFlags.ISSUE_REPORTING),
      reporting: {
        enabled: d.isFeatureOn(n.featureFlags.ERROR_LOG_REPORTING),
        throttleInterval: d.settings.telemetry ? d.settings.telemetry.logThrottleInterval : 0,
        telemetryManager: e.telemetryManager,
        telemetryToken: d.settings.telemetry ? d.settings.telemetry.logReportingToken : null
      }
    }), T._standbyMode = s.property({ value: d.isFeatureOn(n.featureFlags.SUPPORT_STANDBY_MODE) }), T._telemetryManager = e.telemetryManager, T._telemetry = e.telemetry, T.signInManager = o.build(), T.personsAndGroupsManager = new h(), T.conversationsManager = new l(), T.devicesManager = new c(), T.suspended = s.boolProperty(!1), T.marketplaceManager = new f(), m.preSignInInitialize(), d.isFeatureOn(n.featureFlags.TRANSLATOR_SENDING_ENABLED) && (T.translatorService = u.build()), d.isFeatureOn(n.featureFlags.CONTENT_SEARCH) && (T._messagesSearchService = a.build()), T.signInManager.state.when(r.loginState.SignedIn, function () {
      S.get().init(g);
      p.initialize();
      m.postSignInInitialize();
      w.fetchConfig();
    }), T.signInManager.state.when(r.loginState.SigningOut, function () {
      S.get().destroy();
      m.destroy();
      T.suspended(!1);
      T.devicesManager._reset();
      T.conversationsManager._reset().then(function () {
        T.personsAndGroupsManager._reset();
        T.signInManager.state._set(r.loginState.SignedOut);
      });
    }), T.signInManager._skypeToken.changed(function (e) {
      v.authenticate(e);
    }), T.isEndpointActive = s.property({
      value: !1,
      set: function () {
        function n() {
          T.isEndpointActive(!1);
        }
        function r() {
          y.getPresenceService().activateEndpoint();
          e && clearTimeout(e);
          e = setTimeout(n, b.ACTIVATE_ENDPOINT_TIMEOUT);
        }
        var e = null, i = t.debounce(r, 0, {
            leading: !0,
            trailing: !1,
            maxWait: b.ACTIVATE_ENDPOINT_TIMEOUT - b.ACTIVATE_ENDPOINT_TOLERANCE
          });
        return function (e) {
          return e && i(), e;
        };
      }()
    }), i.set(T), T;
  }
  e("helpers/polyfills");
  var t = e("lodash-compat"), n = e("constants/common"), r = e("swx-enums"), i = e("jSkype/client"), s = e("jcafe-property-model"), o = e("jSkype/models/signInManager"), u = e("jSkype/models/translatorService"), a = e("jSkype/services/messageSearch/main"), f = e("jSkype/models/marketplaceManager"), l = e("jSkype/models/conversationsManager"), c = e("jSkype/models/devicesManager"), h = e("jSkype/models/personsAndGroupsManager"), p = e("jSkype/modelHelpers/dataOrchestrator"), d = e("jSkype/settings"), v = e("jSkype/services/asyncMedia/main"), m = e("jSkype/services/calling/callingInitializer"), g = e("jSkype/services/keyEncryption"), y = e("jSkype/services/serviceFactory"), b = e("jSkype/services/webapi/constants"), w = e("jSkype/services/spaces"), E = e("utils/common/logTracer/api"), S = e("utils/common/cache/instance"), x = e("swx-utils-common").sessionStorage;
  return T;
});
