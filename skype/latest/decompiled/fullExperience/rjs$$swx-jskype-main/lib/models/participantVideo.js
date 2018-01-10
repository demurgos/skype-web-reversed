(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/models/participantVideo", [
      "require",
      "exports",
      "jcafe-property-model",
      "../../lib/modelHelpers/propertyModelHelper",
      "swx-jskype-internal-application-instance",
      "../../lib/modelHelpers/personsAndGroupsHelper",
      "../../lib/models/videoChannel",
      "swx-enums"
    ], e);
}(function (e, t) {
  function f(e, t) {
    return new a(e, t);
  }
  var n = e("jcafe-property-model"), r = e("../../lib/modelHelpers/propertyModelHelper"), i = e("swx-jskype-internal-application-instance"), s = e("../../lib/modelHelpers/personsAndGroupsHelper"), o = e("../../lib/models/videoChannel"), u = e("swx-enums"), a = function () {
      function e(e, t) {
        var i = this;
        this.channelsInternal = n.collection();
        this.state = n.property({
          readOnly: !0,
          value: u.callConnectionState.Disconnected
        });
        this.channels = r.exposeReadOnlyCollection(this.channelsInternal);
        this._sourceId = n.property();
        this._dispose = function () {
          i.channels().forEach(function (e) {
            e._dispose();
          });
          i.channels._removeAll();
          s.isMePerson(i.personId) && i.selectedCameraSubsription && i.selectedCameraSubsription.dispose();
        };
        this.conversation = e;
        this.person = t;
        this.personId = t.id();
        this.createAndAddVideoChannel();
        s.isMePerson(this.personId) && this.handleCameraAvailability();
      }
      return e.prototype.handleCameraAvailability = function () {
        this.channels(0).isStarted.set.enabled._set(!1);
        this.selectedCameraSubsription = i.get().devicesManager.selectedCamera.changed(this.handleSelectedCameraChanged.bind(this));
      }, e.prototype.createAndAddVideoChannel = function () {
        var e = o.build(this.conversation, this.state, this.personId);
        e._init();
        this.channels._add(e);
      }, e.prototype.handleSelectedCameraChanged = function (e, t) {
        if (e)
          this.channels(0).camera = e, this.channels(0).isStarted.set.enabled._set(!0);
        else if (!Boolean(e) || t === "ActiveDeviceUnplugged")
          this.channels(0).camera = null, this.channels(0).isStarted.set.enabled._set(!1), this.channels(0)._reset();
      }, e;
    }();
  t.ParticipantVideo = a;
  t.build = f;
}));
