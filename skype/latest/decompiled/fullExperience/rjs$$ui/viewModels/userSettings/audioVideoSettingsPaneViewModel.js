define("ui/viewModels/userSettings/audioVideoSettingsPaneViewModel", [
  "require",
  "lodash-compat",
  "ui/telemetry/actions/actionNames",
  "swx-cafe-application-instance",
  "swx-utils-common",
  "swx-util-calling-stack",
  "utils/common/cafeObservable",
  "swx-constants",
  "swx-constants",
  "utils/common/disposableMixin",
  "swx-enums",
  "utils/common/eventMixin",
  "swx-i18n",
  "swx-service-locator-instance",
  "vendor/knockout",
  "ui/calling/callingCapabilityHelper"
], function (e) {
  function m(e) {
    function N(e) {
      p.resolve(u.serviceLocator.ACTION_TELEMETRY).recordAction(e);
    }
    function C(e) {
      switch (e) {
      case a.DEVICE_TYPE.CAMERA:
        N(n.deviceSelection.cameraSelected);
        break;
      case a.DEVICE_TYPE.MICROPHONE:
        N(n.deviceSelection.microphoneSelected);
        break;
      case a.DEVICE_TYPE.SPEAKER:
        N(n.deviceSelection.speakerSelected);
      }
    }
    function k(e) {
      var t, n, r, s, o;
      switch (e) {
      case a.DEVICE_TYPE.CAMERA:
        t = f.cameras, n = f.selectedCamera, o = i.selectedDevice.selectedCamera();
        break;
      case a.DEVICE_TYPE.MICROPHONE:
        t = f.microphones, n = f.selectedMicrophone, o = i.selectedDevice.selectedMicrophone();
        break;
      case a.DEVICE_TYPE.SPEAKER:
        t = f.speakers, n = f.selectedSpeaker, o = i.selectedDevice.selectedSpeaker();
      }
      s = n();
      if (!o)
        return;
      if (s && s.id() === o.value)
        return;
      C(e);
      t().forEach(function (e) {
        e.id() === o.value && (r = e);
      });
      if (!r)
        return !1;
      n.set(r, a.DEVICE_SELECTION_REASON.USER);
    }
    function L(e) {
      return e === u.deviceSelection.DEFAULT_ID || e === "default_audio_device" || e === "default_video_device";
    }
    function A(e, t) {
      return L(e.id()) ? h.fetch({ key: "settings_default_device_name" }) : t;
    }
    function O(e) {
      if (L(e.id()))
        return;
      e.type() === l.deviceType.Camera ? S(!0) : e.type() === l.deviceType.Microphone ? x(!0) : e.type() === l.deviceType.Speaker && T(!0);
    }
    function M(e, n) {
      var r = e.added(function (e) {
          var r = {
            value: e.id(),
            name: d.observable(A(e, name)),
            description: ""
          };
          n.push(r);
          e.name.get().then(function (t) {
            O(e);
            r.name(A(e, t));
          }).catch(t.noop);
        }), s = e.removed(function (e) {
          n.remove(function (t) {
            return t.value === e.id();
          });
        });
      i.registerDisposable(r);
      i.registerDisposable(s);
    }
    function D(e, t, n) {
      var r = e.changed(function (e) {
        if (e) {
          var r = d.utils.arrayFirst(n(), function (t) {
            return t.value === e.id();
          });
          r && r !== t() && t(r);
        }
      });
      i.registerDisposable(r);
    }
    function P() {
      setTimeout(function () {
        i.closeButtonHasFocus(!0);
      }, 0);
    }
    var i = this, f = r.get().devicesManager, c = o.newObservableProperty(f.selectedCamera.set.enabled), m = o.newObservableProperty(f.selectedMicrophone.set.enabled), g = o.newObservableProperty(f.selectedSpeaker.set.enabled), y, b, w, E = v.getVideoCapabilityObservable(e), S = d.observable(!1), x = d.observable(!1), T = d.observable(!1);
    return i.DIALOG_NAME = a.CALL_SCREEN_DIALOG.NAME.AV_SETTINGS, i.allowSpeakerSelection = d.observable(!s.get().isPluginlessCallingSupported()), i.allowCameraSelection = E, i.closeTitle = h.fetch({ key: "settings_close_title" }), i.closeButtonHasFocus = d.observable(!1), i.availableDevices = {
      cameras: d.observableArray(),
      speakers: d.observableArray(),
      microphones: d.observableArray()
    }, i.selectedDevice = {
      selectedCamera: d.observable(),
      selectedMicrophone: d.observable(),
      selectedSpeaker: d.observable()
    }, i.cameraSelectionDisabled = d.pureComputed(function () {
      return !c() || i.availableDevices.cameras().length === 0 || !S();
    }), i.microphoneSelectionDisabled = d.pureComputed(function () {
      return !m() || i.availableDevices.microphones().length === 0 || !x();
    }), i.speakerSelectionDisabled = d.pureComputed(function () {
      return !g() || i.availableDevices.speakers().length === 0 || !T();
    }), i.cameraTitle = d.pureComputed(function () {
      return i.cameraSelectionDisabled() ? "settings_no_camera_title" : "settings_camera_title";
    }), i.microphoneTitle = d.pureComputed(function () {
      return i.microphoneSelectionDisabled() ? "settings_no_microphone_title" : "settings_microphone_title";
    }), i.speakerTitle = d.pureComputed(function () {
      return i.speakerSelectionDisabled() ? "settings_no_speaker_title" : "settings_speaker_title";
    }), i.closeSettings = function () {
      i.dispatchEvent(u.events.callScreen.TOGGLE_MODAL_DIALOG, i.DIALOG_NAME, i.DIRECTION.PARENT);
    }, i.init = function () {
      i.forwardEvent(u.events.callScreen.TOGGLE_MODAL_DIALOG, i.DIRECTION.PARENT);
      M(f.cameras, i.availableDevices.cameras);
      D(f.selectedCamera, i.selectedDevice.selectedCamera, i.availableDevices.cameras);
      M(f.microphones, i.availableDevices.microphones);
      D(f.selectedMicrophone, i.selectedDevice.selectedMicrophone, i.availableDevices.microphones);
      M(f.speakers, i.availableDevices.speakers);
      D(f.selectedSpeaker, i.selectedDevice.selectedSpeaker, i.availableDevices.speakers);
      y = i.selectedDevice.selectedCamera.subscribe(k.bind(i, a.DEVICE_TYPE.CAMERA));
      b = i.selectedDevice.selectedMicrophone.subscribe(k.bind(i, a.DEVICE_TYPE.MICROPHONE));
      w = i.selectedDevice.selectedSpeaker.subscribe(k.bind(i, a.DEVICE_TYPE.SPEAKER));
      i.registerDisposable(y);
      i.registerDisposable(b);
      i.registerDisposable(w);
      i.registerDisposable(E);
      N(n.deviceSelection.callScreenPaneOpened);
      P();
    }, i;
  }
  var t = e("lodash-compat"), n = e("ui/telemetry/actions/actionNames"), r = e("swx-cafe-application-instance"), i = e("swx-utils-common").builderMixin, s = e("swx-util-calling-stack"), o = e("utils/common/cafeObservable"), u = e("swx-constants").COMMON, a = e("swx-constants").CALLING, f = e("utils/common/disposableMixin"), l = e("swx-enums"), c = e("utils/common/eventMixin"), h = e("swx-i18n").localization, p = e("swx-service-locator-instance").default, d = e("vendor/knockout"), v = e("ui/calling/callingCapabilityHelper");
  return t.assign(m.prototype, f), t.assign(m, i), t.assign(m.prototype, c), m;
});
