define("jSkype/services/swxWebCalling", [
  "require",
  "exports",
  "module",
  "swx-jskype-internal-application-instance",
  "jskype-settings-instance",
  "swx-client-info",
  "ecs-client",
  "swx-jskype-main/lib/utils/ecsUtils",
  "swx-constants",
  "swx-enums",
  "swx-log-tracer",
  "swx-browser-detect",
  "swx-jskype-main/lib/services/trouter/trouter",
  "swx-pubsub-instance",
  "green-id",
  "swx-web-calling",
  "web-calling",
  "swx-jskype-main/lib/models/device",
  "swx-jskype-main",
  "swx-jskype-main"
], function (e, t) {
  function S() {
    var e = n.get().devicesManager, t = l.getBrowserInfo().getUrlParams().microphoneIdx;
    return e.microphones(t ? +t : 0);
  }
  function x() {
    var e = n.get().devicesManager, t = l.getBrowserInfo().getUrlParams().cameraIdx;
    return e.cameras(t ? +t : 0);
  }
  function T(e, t) {
    t.kind === v.MediaAgentConstants.MEDIA_DEVICE.camera ? e.cameras._add(new m(t.label, t.id, b[t.kind]), t.id) : t.kind === v.MediaAgentConstants.MEDIA_DEVICE.microphone && e.microphones._add(new m(t.label, t.id, b[t.kind]), t.id);
  }
  function N(e, t) {
    t.kind === v.MediaAgentConstants.MEDIA_DEVICE.camera ? e.cameras._remove(t.id) : t.kind === v.MediaAgentConstants.MEDIA_DEVICE.microphone && e.microphones._remove(t.id);
  }
  function C(e) {
    var t = n.get().devicesManager, r = t.selectedMicrophone(), i = t.selectedCamera(), s = !e.some(function (e) {
        return e.id === r.id();
      }), o = !e.some(function (e) {
        return e.id === i.id();
      });
    w.forEach(function (n) {
      var r = !e.some(function (e) {
        return e.id === n.id;
      });
      r && N(t, n);
    });
    e.forEach(function (e) {
      var n = !w.some(function (t) {
        return t.id === e.id;
      });
      n && T(t, e);
    });
    w = e;
    r && s && (t.microphones.size() === 0 ? t.selectedMicrophone._set(null, "ActiveDeviceUnplugged") : t.selectedMicrophone._set(S(), "ActiveDeviceUnplugged"));
    !r && t.microphones.size() > 0 && t.selectedMicrophone._set(S(), "FirstDevicePlugged");
    i && o && (t.cameras.size() === 0 ? t.selectedCamera._set(null, "ActiveDeviceUnplugged") : t.selectedCamera._set(x(), "ActiveDeviceUnplugged"));
    !i && t.cameras.size() > 0 && t.selectedCamera._set(x(), "FirstDevicePlugged");
  }
  function k(e) {
    var t = n.get().devicesManager;
    t.mediaCapabilities.isMicrophoneEnabled._set(e.hasMicrophonePermission);
    t.mediaCapabilities.isCameraEnabled._set(e.hasCameraPermission);
  }
  function L() {
    b[v.MediaAgentConstants.MEDIA_DEVICE.microphone] = a.deviceType.Microphone;
    b[v.MediaAgentConstants.MEDIA_DEVICE.camera] = a.deviceType.Camera;
    b[v.MediaAgentConstants.MEDIA_DEVICE.speaker] = a.deviceType.Speaker;
    v.services.mediaAgent.getDeviceManager().enumerateDevicesAsync().then(function (e) {
      var t = n.get().devicesManager;
      t.cameras._removeAll();
      t.microphones._removeAll();
      e.forEach(function (e) {
        T(t, e);
      });
      w = e;
      t.cameras.size() > 0 ? t.selectedCamera._set(x()) : t.selectedCamera._set(null);
      t.microphones.size() > 0 ? t.selectedMicrophone._set(S()) : t.selectedMicrophone._set(null);
    });
  }
  function A(e) {
    var t = o.getApiKey(e), h = new Promise(function (n, i) {
        s.fetchConfig({
          clientName: a.ecsClientNames.Skype,
          clientVersion: o.getClientVersion(e),
          endpoints: o.getHosts(e),
          teamName: r.settings.ecsTrapKey,
          queryParams: t ? { apikey: t } : undefined
        }, n, i);
      }), p = {
        trouterUrl: c.trouterUrl,
        getTrouterUrlAsync: c.getTrouterUrlAsync
      };
    v.initialize({
      globalConfig: {
        browserDetect: l,
        featureFlags: {
          doHostlessCalling: function () {
            return r.isFeatureOn(u.COMMON.featureFlags.HOSTLESS_GROUP_CALLING_PLUGINLESS);
          },
          isVideoCallingFirefoxEnabled: function () {
            return r.isFeatureOn(u.COMMON.featureFlags.PLUGINLESS_VIDEO_CALLING_FIREFOX);
          },
          isGroupVideoCallingChromeLinuxEnabled: function () {
            return r.isFeatureOn(u.COMMON.featureFlags.PLUGINLESS_GROUP_VIDEO_CALLING_CHROME_LINUX);
          },
          isGVCOutgoingEnabled: function () {
            return r.isFeatureOn(u.COMMON.featureFlags.GVC_OUTGOING);
          },
          isGVCJoiningEnabled: function () {
            return r.isFeatureOn(u.COMMON.featureFlags.GVC_JOINING);
          },
          isIncomingScreenSharingEdgeEnabled: function () {
            return r.isFeatureOn(u.COMMON.featureFlags.PLUGINLESS_INCOMING_SCREEN_SHARING_EDGE);
          },
          isRemoteEscalationEnabled: function () {
            return r.isFeatureOn(u.COMMON.featureFlags.PLUGINLESS_REMOTE_ESCALATION);
          },
          supportsHostlessGroupCalls: function () {
            return r.isFeatureOn(u.COMMON.featureFlags.HOSTLESS_GROUP_CALLING_PLUGINLESS);
          }
        },
        httpRequestDispatcher: g,
        logger: f.getLogger("WebCalling"),
        selectedDevicesProvider: M,
        skypeTokenProvider: n.get().signInManager._skypeToken,
        isOnline: function () {
          return n.get().signInManager.state() === a.loginState.SignedIn;
        }
      },
      mediaAgentConfig: {
        settings: r.settings.pluginless.mediaAgent,
        notifications: {
          onDevicesChanged: C,
          onDevicesPermissionChanged: k
        }
      },
      ngcSignalingConfig: {
        conversationServiceUrl: r.settings.pluginless.conversationServiceUrl,
        languageCode: r.settings.initParams.locale,
        clientInformation: i,
        transientFaultPolicy: y,
        trouterUrlGetter: p,
        emergencyCallCountry: "",
        shouldServiceSendCallEventMessages: !0
      },
      relayManagerConfig: {
        getRelayConfig: function () {
          return h;
        }
      },
      telemetryConfig: {
        mdscToken: r.settings.telemetry.mdscToken,
        skypeConcoreToken: r.settings.telemetry.skypeConcoreToken,
        telemetryManager: n.get()._telemetryManager
      }
    });
  }
  function O() {
    r.isFeatureOn(u.COMMON.featureFlags.PLUGINLESS_PSTN_CALLING) && h.subscribe(u.COMMON.apiUIEvents.SWX_TIMELINE_LOADED, function () {
      n.get().signInManager._skypeToken.changed(function (e) {
        e && p.registerGreenId(e, r.settings.greenId).catch(function () {
        });
      });
    });
  }
  function M() {
    var e = n.get().devicesManager, t = {};
    return e.selectedCamera() && (t.camera = e.selectedCamera().id()), e.selectedMicrophone() && (t.microphone = e.selectedMicrophone().id()), t;
  }
  var n = e("swx-jskype-internal-application-instance"), r = e("jskype-settings-instance"), i = e("swx-client-info"), s = e("ecs-client"), o = e("swx-jskype-main/lib/utils/ecsUtils"), u = e("swx-constants"), a = e("swx-enums"), f = e("swx-log-tracer"), l = e("swx-browser-detect").default, c = e("swx-jskype-main/lib/services/trouter/trouter"), h = e("swx-pubsub-instance").default, p = e("green-id"), d = e("swx-web-calling"), v = e("web-calling"), m = e("swx-jskype-main/lib/models/device").default, g = e("swx-jskype-main").services.serviceAccessLayer.requestDispatcher, y = e("swx-jskype-main").services.serviceAccessLayer.transientFaultPolicy, b = {}, w = [], E = f.getLogger("NGC");
  t.initialize = function (e) {
    O();
    A(e);
    L();
    c.registerMessageHandler(new v.IncomingNotificationMessageHandler(v.services.signalingAgent));
  };
  t.getMediaAgent = function () {
    return v.services.mediaAgent;
  };
  t.callHandler = {
    initialize: function () {
      return !0;
    },
    build: function (e) {
      var t = {
        getLogger: function () {
          return E;
        }
      };
      return d.buildCallHandler(t, e);
    }
  };
});
