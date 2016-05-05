define("jSkype/services/plugin/pluginCore", [
  "require",
  "exports",
  "module",
  "jcafe-property-model",
  "jSkype/settings",
  "swx-enums",
  "jSkype/services/plugin/componentFactory",
  "jSkype/services/plugin/pluginUpdate",
  "constants/plugin.const",
  "jSkype/constants/calling",
  "constants/common",
  "jSkype/services/plugin/deviceHandlers",
  "jSkype/telemetry/pluginTelemetry",
  "jSkype/services/plugin/pluginEventDispatcher",
  "jSkype/client",
  "utils/common/version"
], function (e, t) {
  function v() {
    function C() {
      return N = 0, n.task().resolve().promise.then(O).then(I).then(R).then(V).then(function () {
        return e.shouldReinitialize = !0, {
          managerComponent: w,
          skypeCoreComponent: E
        };
      });
    }
    function k(r) {
      return t ? x && !r ? n.task().reject().promise : v ? v.promise : (v = n.task(), t.then(L).catch(L).then(A), e.shouldReinitialize && v.promise.then(function () {
        e.get();
      }), v.promise) : n.task().resolve().promise;
    }
    function L() {
      var e = [];
      return Q(), w.onComponentCrashed = null, e.push(K(E)), e.push(K(w)), n.task.waitAll(e);
    }
    function A() {
      t = null, w = null, E = null, v.resolve(), v = null;
    }
    function O() {
      return g = n.task(), w = s.createManagerComponent(), w.onLoadComplete = M, w.onComponentCrashed = D, w.load(), g.promise;
    }
    function M(e) {
      e.result === u.LOAD_RESULT.LOAD_SUCCESSFUL && (F(), j(), B(), g.resolve());
    }
    function _() {
      H(), e.dispose(!0);
    }
    function D() {
      P(), e.dispose(!0);
    }
    function P() {
      S && S.logPluginCrashed(), T && T();
    }
    function H() {
      S && S.logPluginAlreadyRunning(), T && T();
    }
    function B() {
      w.getVersion(function (e) {
        S = c.getLogger(e);
      });
    }
    function j() {
      w.getVersion(function (t) {
        var n = d.parse(t), i = d.parse(u.PERSISTENT_REQUIRED_VERSION);
        n.compareTo(i) >= 0 && r.isFeatureOn(f.featureFlags.PERSISTENT_PLUGIN) ? x = !0 : x = !1;
      });
    }
    function F() {
      w.getVersion(function (t) {
        p.get()._telemetryManager.setCommonProperty(a.eventProperties.PluginVersion, t);
      });
    }
    function I() {
      var e = n.task();
      return o.updateLatest(w, function (t) {
        t ? q(e.resolve.bind(e)) : e.resolve();
      }), e.promise;
    }
    function q(e) {
      g = null, K(w).then(O).then(e);
    }
    function R() {
      return y = n.task(), E = s.createSkypeCoreComponent(w.componentId), E.onErrorOccured = W, E.onLoadComplete = z, E.onLoginStatusChanged = X, U(), E.onMonitorListChanged = function () {
      }, E.load({ biAppName: r.settings.biAppName }), y.promise;
    }
    function U() {
      E.onCameraDeviceAdded = l.createOnDeviceAddedHandler(i.deviceType.Camera), E.onCameraDeviceRemoved = l.createOnDeviceRemovedHandler(i.deviceType.Camera), E.onCameraDeviceSelected = l.createOnDeviceSelectedHandler(i.deviceType.Camera), E.onMicrophoneDeviceAdded = l.createOnDeviceAddedHandler(i.deviceType.Microphone), E.onMicrophoneDeviceRemoved = l.createOnDeviceRemovedHandler(i.deviceType.Microphone), E.onMicrophoneDeviceSelected = l.createOnDeviceSelectedHandler(i.deviceType.Microphone), E.onSpeakerDeviceAdded = l.createOnDeviceAddedHandler(i.deviceType.Speaker), E.onSpeakerDeviceRemoved = l.createOnDeviceRemovedHandler(i.deviceType.Speaker), E.onSpeakerDeviceSelected = l.createOnDeviceSelectedHandler(i.deviceType.Speaker), p.get().devicesManager._initializedDevices = !0;
    }
    function z(e) {
      e.result === u.LOAD_RESULT.LOAD_SUCCESSFUL && (h.startListeningOnSkypeCore(E), y.resolve());
    }
    function W(t) {
      t.reason === u.PLUGIN_ERRORS.REASON_ALREADY_EXISTS && (y.reject(t.reason), e.shouldReinitialize = !1, e.dispose(!0), _());
    }
    function X(e) {
      if (e.loginStatus === u.LOGIN_STATUS.LOGGED_IN) {
        N = 0, b.promise.state() === "pending" && b.resolve();
        return;
      }
      e.loginStatus === u.LOGIN_STATUS.LOGGED_OUT && (N++, N < u.LOGIN_FAILURE_STOP_GAP ? J() : $());
    }
    function V() {
      return b = n.task(), J(), b.promise;
    }
    function $() {
      e.shouldReinitialize = !1, b.promise.state() === "pending" && b.reject(), D();
    }
    function J() {
      var e = p.get().personsAndGroupsManager.mePerson.id();
      p.get().signInManager._skypeToken().then(function (t) {
        E.loginWithSkypeToken(e, t);
      });
    }
    function K(e) {
      var t = n.task();
      return e ? e.dispose(function () {
        t.resolve();
      }) : t.resolve(), t.promise;
    }
    function Q() {
      var e = p.get().devicesManager;
      G(e.cameras), G(e.microphones), G(e.speakers), e.selectedCamera(undefined), e.selectedMicrophone(undefined), e.selectedSpeaker(undefined), delete p.get().devicesManager._initializedDevices;
    }
    function G(e) {
      var t, n;
      for (t = e.size() - 1; t >= 0; --t)
        n = e(t), e._remove(n.deviceId());
    }
    var e = this, t, v, g, y, b, w, E, S, x, T, N;
    e.shouldReinitialize = !1, e.get = function () {
      function r() {
        return t || C();
      }
      return m() ? (v ? t = v.promise.then(r) : t = r(), t) : n.task().reject().promise;
    }, e.isManagerLoaded = function () {
      return g ? g.promise.state() === "resolved" : !1;
    }, e.onCrash = function (e) {
      T = e;
    }, e.dispose = k;
  }
  function m() {
    var e = p.get().personsAndGroupsManager.mePerson.capabilities.audio;
    return e.reason !== i.callingNotSupportedReasons.PluginNotInstalled;
  }
  var n = e("jcafe-property-model"), r = e("jSkype/settings"), i = e("swx-enums"), s = e("jSkype/services/plugin/componentFactory"), o = e("jSkype/services/plugin/pluginUpdate"), u = e("constants/plugin.const"), a = e("jSkype/constants/calling"), f = e("constants/common"), l = e("jSkype/services/plugin/deviceHandlers"), c = e("jSkype/telemetry/pluginTelemetry"), h = e("jSkype/services/plugin/pluginEventDispatcher"), p = e("jSkype/client"), d = e("utils/common/version");
  t.isInstalled = m, t.build = function () {
    return new v();
  };
})
