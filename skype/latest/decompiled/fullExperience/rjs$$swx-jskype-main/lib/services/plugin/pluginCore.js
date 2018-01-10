(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/plugin/pluginCore", [
      "require",
      "exports",
      "jcafe-property-model",
      "jskype-settings-instance",
      "swx-enums",
      "../../../lib/services/internalPubSub",
      "./componentFactory",
      "./pluginUpdate",
      "swx-constants",
      "jskype-constants",
      "swx-constants",
      "./deviceHandlers",
      "../../../lib/telemetry/pluginTelemetry",
      "./pluginEventDispatcher",
      "swx-jskype-internal-application-instance",
      "swx-utils-common/lib/version",
      "swx-browser-globals",
      "./pluginDetect"
    ], e);
}(function (e, t) {
  function b() {
    return g.isPluginInstalled();
  }
  function w() {
    return new y();
  }
  var n = e("jcafe-property-model"), r = e("jskype-settings-instance"), i = e("swx-enums"), s = e("../../../lib/services/internalPubSub"), o = e("./componentFactory"), u = e("./pluginUpdate"), a = e("swx-constants"), f = e("jskype-constants"), l = e("swx-constants"), c = e("./deviceHandlers"), h = e("../../../lib/telemetry/pluginTelemetry"), p = e("./pluginEventDispatcher"), d = e("swx-jskype-internal-application-instance"), v = e("swx-utils-common/lib/version"), m = e("swx-browser-globals"), g = e("./pluginDetect"), y = function () {
      function e() {
        var e = this;
        this.shouldReinitialize = !1;
        this.get = function () {
          if (!g.isPluginInstalled())
            return Promise.reject(a.PLUGIN_CONST.PLUGIN_ERRORS.NOT_INSTALLED);
          var t = function () {
            return e.initTask || e.initialize();
          };
          return e.disposeTask ? e.initTask = e.disposeTask.promise.then(t) : e.initTask = t(), e.initTask;
        };
        this.getManager = function () {
          return g.isPluginInstalled() ? e.createManager() : Promise.reject(a.PLUGIN_CONST.PLUGIN_ERRORS.NOT_INSTALLED);
        };
        this.isManagerLoaded = function () {
          return e.managerTask ? e.managerTask.promise.state() === "resolved" : !1;
        };
        this.onCrash = function (t) {
          e.crashCallback = t;
        };
        this.dispose = function (t) {
          return e.managerLoadTimeout && m.getWindow().clearTimeout(e.managerLoadTimeout), e.initTask ? e.isPluginPersistent && !t ? Promise.reject(null) : e.disposeTask ? e.disposeTask.promise : (e.disposeTask = n.task(), e.initTask.then(e.disposeInternals.bind(e))["catch"](e.disposeInternals.bind(e)).then(e.onDisposed.bind(e)), e.shouldReinitialize && e.disposeTask.promise.then(e.get), e.disposeTask.promise) : Promise.resolve();
        };
      }
      return e.prototype.initialize = function () {
        var e = this;
        return this.failedLoginAttempts = 0, this.createManager().then(this.updatePlugin.bind(this)).then(this.createSkypeCore.bind(this)).then(this.login.bind(this)).then(function () {
          return e.shouldReinitialize = !0, {
            managerComponent: e.managerComponent,
            skypeCoreComponent: e.skypeCoreComponent
          };
        });
      }, e.prototype.disposeInternals = function () {
        var e = [];
        return this.removeAllDevices(), this.managerComponent.onComponentCrashed = null, e.push(this.disposeComponent(this.skypeCoreComponent)), e.push(this.disposeComponent(this.managerComponent)), n.task.waitAll(e);
      }, e.prototype.onDisposed = function () {
        this.initTask = null;
        this.managerTask = null;
        this.managerComponent = null;
        this.skypeCoreComponent = null;
        this.disposeTask.resolve();
        this.disposeTask = null;
      }, e.prototype.createManager = function () {
        var e = this;
        return this.managerTask ? this.managerTask.promise : (s.get().publish("internalPluginEvent", "managerLoad"), this.managerTask = n.task(), this.managerComponent = o.createManagerComponent(), this.managerComponent.onLoadComplete = this.onManagerLoaded.bind(this), this.managerComponent.onComponentCrashed = this.onManagerCrashed.bind(this), this.managerLoadTimeout = m.getWindow().setTimeout(function () {
          e.managerComponent.onLoadComplete = null;
          e.managerTask.reject(a.PLUGIN_CONST.PLUGIN_ERRORS.MANAGER_LOAD_TIMEOUT);
          e.managerTask = null;
          e.disposeComponent(e.managerComponent);
        }, r.settings.plugin.managerLoadTimeout), this.managerComponent.load(), this.managerTask.promise);
      }, e.prototype.onManagerLoaded = function (e) {
        m.getWindow().clearTimeout(this.managerLoadTimeout);
        e.result === a.PLUGIN_CONST.LOAD_RESULT.LOAD_SUCCESSFUL ? (this.reportPluginVersion(), this.setIsPluginPeristentFlag(), this.attachPluginTelemetry(), s.get().publish("internalPluginEvent", "managerLoadSuccess"), this.managerTask.resolve()) : (s.get().publish("internalPluginEvent", "managerLoadError"), this.managerTask.reject(a.PLUGIN_CONST.PLUGIN_ERRORS.MANAGER_LOAD_ERROR));
      }, e.prototype.onAlreadyExists = function () {
        this.reportAlreadyExists();
        this.dispose(!0);
      }, e.prototype.onManagerCrashed = function () {
        this.reportCrash();
        this.dispose(!0);
      }, e.prototype.reportCrash = function () {
        this.telemetryLogger && this.telemetryLogger.logPluginCrashed();
        this.crashCallback && this.crashCallback();
      }, e.prototype.reportAlreadyExists = function () {
        this.telemetryLogger && this.telemetryLogger.logPluginAlreadyRunning();
        this.crashCallback && this.crashCallback();
      }, e.prototype.attachPluginTelemetry = function () {
        var e = this;
        this.managerComponent.getVersion(function (t) {
          e.telemetryLogger = h.getLogger(t);
        });
      }, e.prototype.setIsPluginPeristentFlag = function () {
        var e = this;
        this.managerComponent.getVersion(function (t) {
          var n = v.parse(t), i = v.parse(a.PLUGIN_CONST.PERSISTENT_REQUIRED_VERSION);
          n.compareTo(i) >= 0 && r.isFeatureOn(l.COMMON.featureFlags.PERSISTENT_PLUGIN) ? e.isPluginPersistent = !0 : e.isPluginPersistent = !1;
        });
      }, e.prototype.reportPluginVersion = function () {
        this.managerComponent.getVersion(function (e) {
          d.get()._telemetryManager.setCommonProperty(f.CALLING.eventProperties.PluginVersion, e);
        });
      }, e.prototype.updatePlugin = function () {
        var e = this, t = n.task();
        return s.get().publish("internalPluginEvent", "pluginUpdate"), u.updateLatest(this.managerComponent, function (n, r) {
          e.telemetryLogger && r && e.telemetryLogger.logPluginUpdate(r);
          n ? (s.get().publish("internalPluginEvent", "pluginUpdateSucess"), e.reloadManagerComponent(t.resolve.bind(t))) : (s.get().publish("internalPluginEvent", "pluginUpdateSkipped"), t.resolve());
        }), t.promise;
      }, e.prototype.reloadManagerComponent = function (e) {
        this.managerTask = null;
        this.disposeComponent(this.managerComponent).then(this.createManager.bind(this)).then(e);
      }, e.prototype.createSkypeCore = function () {
        return this.skypeCoreTask = n.task(), s.get().publish("internalPluginEvent", "skypeCoreLoad"), this.skypeCoreComponent = o.createSkypeCoreComponent(this.managerComponent.componentId), this.skypeCoreComponent.onErrorOccured = this.onSkypeCoreErrorOccured.bind(this), this.skypeCoreComponent.onLoadComplete = this.onSkypeCoreLoaded.bind(this), this.skypeCoreComponent.onLoginStatusChanged = this.onLoginStatusChanged.bind(this), this.attachDeviceEventHandlers(), this.skypeCoreComponent.load({ biAppName: r.settings.biAppName }), this.skypeCoreTask.promise;
      }, e.prototype.attachDeviceEventHandlers = function () {
        this.skypeCoreComponent.onCameraDeviceAdded = c.createOnDeviceAddedHandler(i.deviceType.Camera);
        this.skypeCoreComponent.onCameraDeviceRemoved = c.createOnDeviceRemovedHandler(i.deviceType.Camera);
        this.skypeCoreComponent.onCameraDeviceSelected = c.createOnDeviceSelectedHandler(i.deviceType.Camera);
        this.skypeCoreComponent.onMicrophoneDeviceAdded = c.createOnDeviceAddedHandler(i.deviceType.Microphone);
        this.skypeCoreComponent.onMicrophoneDeviceRemoved = c.createOnDeviceRemovedHandler(i.deviceType.Microphone);
        this.skypeCoreComponent.onMicrophoneDeviceSelected = c.createOnDeviceSelectedHandler(i.deviceType.Microphone);
        this.skypeCoreComponent.onSpeakerDeviceAdded = c.createOnDeviceAddedHandler(i.deviceType.Speaker);
        this.skypeCoreComponent.onSpeakerDeviceRemoved = c.createOnDeviceRemovedHandler(i.deviceType.Speaker);
        this.skypeCoreComponent.onSpeakerDeviceSelected = c.createOnDeviceSelectedHandler(i.deviceType.Speaker);
      }, e.prototype.addAndSelectDefaultAudioDevices = function () {
        this.skypeCoreComponent.onMicrophoneDeviceAdded({
          deviceId: l.COMMON.deviceSelection.DEFAULT_ID,
          deviceName: l.COMMON.deviceSelection.DEFAULT_NAME
        });
        this.skypeCoreComponent.onSpeakerDeviceAdded({
          deviceId: l.COMMON.deviceSelection.DEFAULT_ID,
          deviceName: l.COMMON.deviceSelection.DEFAULT_NAME
        });
        this.skypeCoreComponent.onMicrophoneDeviceSelected({ deviceId: l.COMMON.deviceSelection.DEFAULT_ID });
        this.skypeCoreComponent.onSpeakerDeviceSelected({ deviceId: l.COMMON.deviceSelection.DEFAULT_ID });
      }, e.prototype.onSkypeCoreLoaded = function (e) {
        e.result === a.PLUGIN_CONST.LOAD_RESULT.LOAD_SUCCESSFUL ? (p.startListeningOnSkypeCore(this.skypeCoreComponent), this.addAndSelectDefaultAudioDevices(), s.get().publish("internalPluginEvent", "skypeCoreLoadSuccess"), this.skypeCoreTask.resolve()) : s.get().publish("internalPluginEvent", "skypeCoreLoadError");
      }, e.prototype.onSkypeCoreErrorOccured = function (e) {
        s.get().publish("internalPluginEvent", e.reason.toString() || "skypeCoreError");
        e.reason === a.PLUGIN_CONST.PLUGIN_ERRORS.REASON_ALREADY_EXISTS && (this.skypeCoreTask.reject(e.reason), this.shouldReinitialize = !1, this.dispose(!0), this.onAlreadyExists());
      }, e.prototype.onLoginStatusChanged = function (e) {
        if (e.loginStatus === a.PLUGIN_CONST.LOGIN_STATUS.LOGGED_IN) {
          this.failedLoginAttempts = 0;
          d.get().devicesManager._initializedDevices = !0;
          this.loginTask.promise.state() === "pending" && (s.get().publish("internalPluginEvent", "loginSuccess"), this.loginTask.resolve());
          return;
        }
        e.loginStatus === a.PLUGIN_CONST.LOGIN_STATUS.LOGGED_OUT ? (this.failedLoginAttempts++, this.failedLoginAttempts < a.PLUGIN_CONST.LOGIN_FAILURE_STOP_GAP ? this.loginWithSkypeCore() : this.abortLoginAttempts()) : s.get().publish("internalPluginEvent", e.loginStatus.toString() || "unknownLoginStatusRaised");
      }, e.prototype.login = function () {
        return this.loginTask = n.task(), this.loginWithSkypeCore(), this.loginTask.promise;
      }, e.prototype.abortLoginAttempts = function () {
        this.shouldReinitialize = !1;
        this.loginTask.promise.state() === "pending" && this.loginTask.reject(a.PLUGIN_CONST.PLUGIN_ERRORS.LOGIN_ABORTED);
        this.onManagerCrashed();
      }, e.prototype.loginWithSkypeCore = function () {
        var e = this, t = d.get().personsAndGroupsManager.mePerson.id();
        s.get().publish("internalPluginEvent", "login");
        var n = d.get().signInManager, r = n._tokenExpiration ? Math.round(n._tokenExpiration / 1000) : 0;
        n._skypeToken().then(function (n) {
          e.skypeCoreComponent.loginWithSkypeToken(t, n, r);
        });
      }, e.prototype.disposeComponent = function (e) {
        var t = n.task();
        return e ? e.dispose(function () {
          t.resolve();
        }) : t.resolve(), t.promise;
      }, e.prototype.removeAllDevices = function () {
        var e = d.get().devicesManager;
        e.cameras._removeAll();
        e.microphones._removeAll();
        e.speakers._removeAll();
        e.selectedCamera._set(undefined);
        e.selectedMicrophone._set(undefined);
        e.selectedSpeaker._set(undefined);
        delete d.get().devicesManager._initializedDevices;
      }, e;
    }();
  t.PluginCore = y;
  t.isInstalled = b;
  t.build = w;
}));
