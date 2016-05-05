define("jSkype/models/devicesManager", [
  "require",
  "jcafe-property-model",
  "jSkype/modelHelpers/propertyModelHelper",
  "jSkype/services/calling/environmentInspector"
], function (e) {
  function i() {
    var e = t.collection(), i = t.collection(), s = t.collection();
    return this.selectedCamera = t.property(), this.selectedMicrophone = t.property(), this.selectedSpeaker = t.property(), this.cameras = n.exposeReadOnlyCollection(e), this.microphones = n.exposeReadOnlyCollection(i), this.speakers = n.exposeReadOnlyCollection(s), this.checkMediaCapabilities = t.enabledCommand(function () {
      return r.checkForCallingSupport(!0);
    }), this._reset = function () {
      this.selectedCamera(null), this.selectedMicrophone(null), this.selectedSpeaker(null), e.empty(), i.empty(), s.empty();
    }, this;
  }
  var t = e("jcafe-property-model"), n = e("jSkype/modelHelpers/propertyModelHelper"), r = e("jSkype/services/calling/environmentInspector");
  return i;
})
