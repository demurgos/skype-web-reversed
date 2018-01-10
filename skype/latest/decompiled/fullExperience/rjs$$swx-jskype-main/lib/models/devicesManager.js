(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/models/devicesManager", [
      "require",
      "exports",
      "jcafe-property-model",
      "../../lib/telemetry/logging/callingLogTracer",
      "../../lib/modelHelpers/propertyModelHelper",
      "../../lib/services/calling/environmentInspector",
      "../../lib/services/calling/callingFacade"
    ], e);
}(function (e, t) {
  function f() {
    return new a();
  }
  var n = e("jcafe-property-model"), r = e("../../lib/telemetry/logging/callingLogTracer"), i = e("../../lib/modelHelpers/propertyModelHelper"), s = e("../../lib/services/calling/environmentInspector"), o = e("../../lib/services/calling/callingFacade"), u = r.get(), a = function () {
      function e() {
        var e = this;
        this.camerasInternal = n.collection();
        this.microphonesInternal = n.collection();
        this.speakersInternal = n.collection();
        this.selectedCameraSetterEnabled = n.property({
          value: !0,
          readOnly: !0
        });
        this.selectedMicrophoneSetterEnabled = n.property({
          value: !0,
          readOnly: !0
        });
        this.selectedSpeakerSetterEnabled = n.property({
          value: !0,
          readOnly: !0
        });
        this.selectedCamera = n.property({
          set: n.command(function (t) {
            return e.selectedCameraSetterEnabled._set(!1), o.selectCameraDevice(t.id()).then(function () {
              return e.selectedCameraSetterEnabled._set(!0), t;
            }, function (t) {
              e.selectedCameraSetterEnabled._set(!0);
              u.log("Failed to set camera", t);
            });
          }, this.selectedCameraSetterEnabled)
        });
        this.selectedMicrophone = n.property({
          set: n.command(function (t) {
            return e.selectedMicrophoneSetterEnabled._set(!1), o.selectMicrophoneDevice(t.id()).then(function () {
              return e.selectedMicrophoneSetterEnabled._set(!0), t;
            }, function (t) {
              e.selectedMicrophoneSetterEnabled._set(!0);
              u.log("Failed to set microphone", t);
            });
          }, this.selectedMicrophoneSetterEnabled)
        });
        this.selectedSpeaker = n.property({
          set: n.command(function (t) {
            return e.selectedSpeakerSetterEnabled._set(!1), o.selectSpeakerDevice(t.id()).then(function () {
              return e.selectedSpeakerSetterEnabled._set(!0), t;
            }, function (t) {
              e.selectedSpeakerSetterEnabled._set(!0);
              u.log("Failed to set speaker", t);
            });
          }, this.selectedSpeakerSetterEnabled)
        });
        this.cameras = i.exposeReadOnlyCollection(this.camerasInternal);
        this.microphones = i.exposeReadOnlyCollection(this.microphonesInternal);
        this.speakers = i.exposeReadOnlyCollection(this.speakersInternal);
        this.checkMediaCapabilities = n.enabledCommand(function () {
          return s.checkForCallingSupport(!0);
        });
        this.mediaCapabilities = {
          installedVersion: n.property({ get: o.getPluginVersion }),
          isMicrophoneEnabled: n.property({
            value: !0,
            readOnly: !0
          }),
          isCameraEnabled: n.property({
            value: !0,
            readOnly: !0
          })
        };
        this._reset = function () {
          e.selectedCamera._set(null);
          e.selectedMicrophone._set(null);
          e.selectedSpeaker._set(null);
          e.camerasInternal.empty();
          e.microphonesInternal.empty();
          e.speakersInternal.empty();
        };
      }
      return e;
    }();
  t.DevicesManager = a;
  t.build = f;
}));
