(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("web-calling/lib/models/callModalities", [
      "require",
      "exports",
      "./callEvents",
      "../utilities/modelHelper",
      "media-agent"
    ], e);
}(function (e, t) {
  var n = e("./callEvents"), r = e("../utilities/modelHelper"), i = e("media-agent"), s = function () {
      function e(e, t, n) {
        var r = this;
        this.callsModel = e;
        this.callSession = t;
        this.eventRaiser = n;
        this.logger = this.callsModel.logger.createChild("Modalities", function () {
          return r.callSession && r.callSession.signaling() && r.callSession.signaling().correlationId || "0";
        });
      }
      return e.prototype.getLocalModalities = function (e, t) {
        var n = function (e) {
            return e ? i.Constants.MEDIA_STATE.sendReceive : i.Constants.MEDIA_STATE.receive;
          }, r = {};
        return r.audio = n(e), this.callSession.hasVideoCapability() && (r.video = n(t)), this.callSession.hasScreensharingCapability() && (r.sharing = n(!1)), r;
      }, e.prototype.configureAsync = function (e, t) {
        var s = r.updateDeviceSelection(this.callsModel);
        return s.microphone || (this.eventRaiser(n.CallEvents.noMicrophoneAccess), this.logger.warn("cannot configure modalities without microphone selection")), !s.camera && i.Helper.hasSendDirectionality(t.video) && (t.video = i.Helper.removeSendDirectionality(t.video), this.logger.warn("removed send direction from video modality due to missing camera selection")), e.configureModalitiesAsync(t);
      }, e;
    }();
  t.__esModule = !0;
  t["default"] = s;
}));
