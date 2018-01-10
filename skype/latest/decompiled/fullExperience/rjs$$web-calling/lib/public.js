(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("web-calling/lib/public", [
      "require",
      "exports",
      "./services/pluginlessTelemetry",
      "./services/relayManager",
      "./models/call",
      "./models/calls",
      "./utilities/modelHelper",
      "media-agent",
      "signaling-agent",
      "./models/callRegistry",
      "./utilities/typeDefs",
      "./utilities/typeDefs",
      "./utilities/typeDefs",
      "./utilities/typeDefs",
      "./utilities/typeDefs",
      "./utilities/typeDefs",
      "./utilities/typeDefs",
      "./utilities/typeDefs",
      "./utilities/typeDefs",
      "./models/callEvents",
      "./models/callEvents",
      "./models/callEvents",
      "./models/callEvents",
      "media-agent",
      "media-agent",
      "signaling-agent",
      "signaling-agent"
    ], e);
}(function (e, t) {
  function L(e) {
    if (k)
      return;
    var i = new a.DefaultSignalingAgentConfig({
      skypeTokenProvider: e.globalConfig.skypeTokenProvider,
      logger: e.globalConfig.logger,
      httpRequestDispatcher: new a.HttpRequestDispatcher(e.globalConfig.httpRequestDispatcher, e.ngcSignalingConfig.transientFaultPolicy),
      telemetryManager: new a.SkypeConCoreTelemetryManager(e.telemetryConfig.telemetryManager, e.telemetryConfig.skypeConcoreToken),
      clientInfo: e.ngcSignalingConfig.clientInformation,
      browserDetect: e.globalConfig.browserDetect,
      conversationServiceUrl: e.ngcSignalingConfig.conversationServiceUrl,
      trouterUrlGetter: e.ngcSignalingConfig.trouterUrlGetter,
      languageCode: e.ngcSignalingConfig.languageCode,
      emergencyCallCountry: e.ngcSignalingConfig.emergencyCallCountry,
      isGVCOutgoingEnabled: e.globalConfig.featureFlags.isGVCOutgoingEnabled(),
      isGVCJoiningEnabled: e.globalConfig.featureFlags.isGVCJoiningEnabled(),
      supportsHostlessGroupCalls: e.globalConfig.featureFlags.supportsHostlessGroupCalls(),
      doHostlessCalling: e.globalConfig.featureFlags.doHostlessCalling(),
      shouldServiceSendCallEventMessages: e.ngcSignalingConfig.shouldServiceSendCallEventMessages
    });
    t.services.signalingAgent = new a.SignalingAgent(i);
    var o = {
      getLogger: function () {
        return e.globalConfig.logger;
      },
      getRelayManager: function () {
        return t.services.relayManager;
      },
      settings: e.mediaAgentConfig.settings
    };
    t.services.mediaAgent = u.MediaAgent.build(o, {
      onDevicesChanged: e.mediaAgentConfig.notifications.onDevicesChanged,
      onDevicesPermissionChanged: e.mediaAgentConfig.notifications.onDevicesPermissionChanged
    });
    t.services.telemetry = n.build({
      telemetryManager: e.telemetryConfig.telemetryManager,
      mdscToken: e.telemetryConfig.mdscToken,
      logger: e.globalConfig.logger
    });
    t.services.relayManager = r.build({
      tokenProvider: e.globalConfig.skypeTokenProvider,
      configProvider: e.relayManagerConfig.getRelayConfig,
      logger: e.globalConfig.logger,
      request: {
        get: function (t, n) {
          return e.globalConfig.httpRequestDispatcher.get(t, n || {});
        },
        isOnline: function () {
          return e.globalConfig.isOnline();
        }
      }
    });
    t.services.relayManager.initialize();
    k = new s["default"]({
      mediaAgent: t.services.mediaAgent,
      signalingAgent: t.services.signalingAgent,
      browserDetect: e.globalConfig.browserDetect,
      featureFlags: e.globalConfig.featureFlags,
      telemetryService: t.services.telemetry,
      telemetryManager: e.telemetryConfig.telemetryManager,
      mdscToken: e.telemetryConfig.mdscToken,
      logger: e.globalConfig.logger,
      selectedDevicesProvider: e.globalConfig.selectedDevicesProvider
    });
  }
  function A(e, n) {
    return L(n), new f.CallRegistry(e, t.services, k, n.globalConfig.logger);
  }
  function O(e, t) {
    return new i["default"](k, e, t);
  }
  function M() {
    o.updateDeviceSelection(k);
  }
  function _(e) {
    return a.createParticipant(e);
  }
  var n = e("./services/pluginlessTelemetry"), r = e("./services/relayManager"), i = e("./models/call"), s = e("./models/calls"), o = e("./utilities/modelHelper"), u = e("media-agent"), a = e("signaling-agent"), f = e("./models/callRegistry"), l = e("./utilities/typeDefs");
  t.CallState = l.CallState;
  var c = e("./utilities/typeDefs");
  t.CallSupport = c.CallSupport;
  var h = e("./utilities/typeDefs");
  t.FailureType = h.FailureType;
  var p = e("./utilities/typeDefs");
  t.ParticipantStateReason = p.ParticipantStateReason;
  var d = e("./utilities/typeDefs");
  t.ParticipantState = d.ParticipantState;
  var v = e("./utilities/typeDefs");
  t.SettablePromiseState = v.SettablePromiseState;
  var m = e("./utilities/typeDefs");
  t.StreamState = m.StreamState;
  var g = e("./utilities/typeDefs");
  t.StreamType = g.StreamType;
  var y = e("./utilities/typeDefs");
  t.TerminatedReason = y.TerminatedReason;
  var b = e("./models/callEvents");
  t.CallEvents = b.CallEvents;
  var w = e("./models/callEvents");
  t.CallRegistryEvents = w.CallRegistryEvents;
  var E = e("./models/callEvents");
  t.ParticipantEvents = E.ParticipantEvents;
  var S = e("./models/callEvents");
  t.StreamEvents = S.StreamEvents;
  var x = e("media-agent");
  t.MediaAgentHelper = x.Helper;
  var T = e("media-agent");
  t.MediaAgentConstants = T.Constants;
  var N = e("signaling-agent");
  t.IncomingNotificationMessageHandler = N.IncomingNotificationMessageHandler;
  var C = e("signaling-agent");
  t.DeviceType = C.DeviceType;
  t.services = {
    mediaAgent: null,
    relayManager: null,
    signalingAgent: null,
    telemetry: null
  };
  var k;
  t.initialize = L;
  t.initializeForCallRegistryUsage = A;
  t.createCall = O;
  t.updateDeviceSelection = M;
  t.CSAcreateParticipant = _;
}));
