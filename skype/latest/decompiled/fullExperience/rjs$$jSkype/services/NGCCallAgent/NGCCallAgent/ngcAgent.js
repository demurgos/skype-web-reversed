define("jSkype/services/NGCCallAgent/NGCCallAgent/ngcAgent", [
  "require",
  "exports",
  "module",
  "jSkype/client",
  "jSkype/settings",
  "services/ecs/configLoader",
  "swx-enums",
  "utils/common/logTracer/api",
  "browser/detect",
  "jSkype/services/trouter/trouter",
  "jSkype/services/NGCCallAgent/NGCCallAgent/incomingNotificationMessageHandler",
  "jSkype/services/NGCCallAgent/NGCCallAgent/signalingAgentConfig",
  "jSkype/services/NGCCallAgent/NGCCallAgent/signalingAgent",
  "jSkype/services/NGCCallAgent/NGCCallAgent/callHandler",
  "jSkype/services/mediaAgent/mediaAgent",
  "jSkype/services/mediaAgent/constants",
  "jSkype/models/device",
  "jSkype/services/relayManager/relayManager"
], function (e, t) {
  function T() {
    w = new c(new l(x));
  }
  function N() {
    var e = n.get().devicesManager, t = u.getBrowserInfo().getUrlParams().microphoneIdx;
    return e.microphones(t ? +t : 0);
  }
  function C() {
    var e = n.get().devicesManager, t = u.getBrowserInfo().getUrlParams().cameraIdx;
    return e.cameras(t ? +t : 0);
  }
  function k(e, t) {
    t.kind === d.MEDIA_DEVICE.camera ? e.cameras._add(new v(t.label, t.id, g[t.kind]), t.id) : t.kind === d.MEDIA_DEVICE.microphone && e.microphones._add(new v(t.label, t.id, g[t.kind]), t.id);
  }
  function L(e, t) {
    t.kind === d.MEDIA_DEVICE.camera ? e.cameras._remove(t.id) : t.kind === d.MEDIA_DEVICE.microphone && e.microphones._remove(t.id);
  }
  function A(e) {
    var t = n.get().devicesManager, r = t.selectedMicrophone(), i = t.selectedCamera(), s;
    for (s in y)
      y.hasOwnProperty(s) && !e.hasOwnProperty(s) && L(t, y[s]);
    for (s in e)
      e.hasOwnProperty(s) && !y.hasOwnProperty(s) && k(t, e[s]);
    y = e;
    r && !e.hasOwnProperty(r.deviceId()) && (t.microphones.size() === 0 ? t.selectedMicrophone(null, "ActiveDeviceUnplugged") : t.selectedMicrophone(N(), "ActiveDeviceUnplugged"));
    !r && t.microphones.size() > 0 && t.selectedMicrophone(N(), "FirstDevicePlugged");
    i && !e.hasOwnProperty(i.deviceId()) && (t.cameras.size() === 0 ? t.selectedCamera(null, "ActiveDeviceUnplugged") : t.selectedCamera(C(), "ActiveDeviceUnplugged"));
    !i && t.cameras.size() > 0 && t.selectedCamera(C(), "FirstDevicePlugged");
  }
  function O() {
    var e = E.getDeviceManager();
    g[d.MEDIA_DEVICE.microphone] = s.deviceType.Microphone;
    g[d.MEDIA_DEVICE.camera] = s.deviceType.Camera;
    g[d.MEDIA_DEVICE.speaker] = s.deviceType.Speaker;
    e.enumerateDevicesAsync().then(function (e) {
      var t = n.get().devicesManager;
      t.cameras._removeAll();
      t.microphones._removeAll();
      for (var r in e)
        e.hasOwnProperty(r) && k(t, e[r]);
      y = e;
      if (t.cameras.size() > 0) {
        var i = C();
        t.selectedCamera(i);
      } else
        t.selectedCamera(null);
      if (t.microphones.size() > 0) {
        var s = N();
        t.selectedMicrophone(s);
      } else
        t.selectedMicrophone(null);
    });
  }
  function M() {
    var e = new Promise(function (e, t) {
      i.loadConfig(s.ecsClientNames.Skype, r.settings.ecsTrapKey).then(e, t);
    });
    S = m({
      tokenProvider: function () {
        return new Promise(function (e) {
          e(n.get().signInManager._skypeToken());
        });
      },
      configProvider: function () {
        return e;
      },
      getLogger: function () {
        return x;
      }
    });
    S.queryRelaysOnStartupAsync();
  }
  function _() {
    var e = {
      getLogger: function () {
        return x;
      },
      getRelayManager: function () {
        return { queryRelaysAsync: S.queryRelaysAsync };
      },
      settings: r.settings.pluginless.mediaAgent
    };
    E = p.build(e, { onDevicesChanged: A });
  }
  var n = e("jSkype/client"), r = e("jSkype/settings"), i = e("services/ecs/configLoader"), s = e("swx-enums"), o = e("utils/common/logTracer/api"), u = e("browser/detect"), a = e("jSkype/services/trouter/trouter"), f = e("jSkype/services/NGCCallAgent/NGCCallAgent/incomingNotificationMessageHandler"), l = e("jSkype/services/NGCCallAgent/NGCCallAgent/signalingAgentConfig"), c = e("jSkype/services/NGCCallAgent/NGCCallAgent/signalingAgent"), h = e("jSkype/services/NGCCallAgent/NGCCallAgent/callHandler"), p = e("jSkype/services/mediaAgent/mediaAgent"), d = e("jSkype/services/mediaAgent/constants"), v = e("jSkype/models/device"), m = e("jSkype/services/relayManager/relayManager"), g = {}, y = {}, b, w, E, S, x;
  t.initialize = function () {
    x = o.getLogger("NGC");
    T();
    M();
    _();
    O();
    b = new f(w);
    a.registerMessageHandler(b);
  };
  t.callHandler = {
    initialize: function () {
      return !0;
    },
    build: function (e) {
      var t = {
        getLogger: function () {
          return x;
        }
      };
      return new h(t, E, w, e);
    }
  };
});
