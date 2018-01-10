(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("media-agent/lib/webrtc/mediaEntity", [
      "require",
      "exports",
      "../common/videoCapabilities",
      "./sessionDescriptorUtils",
      "../constants"
    ], e);
}(function (e, t) {
  var n = e("../common/videoCapabilities"), r = e("./sessionDescriptorUtils"), i = e("../constants"), s = 1200, o = 3000, u = 3600, a = 1500, f = function () {
      function e(e, t, n, r, i, s, o, u) {
        this.modality = e;
        this.mid = t;
        this.mtype = n;
        this.streamId = r;
        this.trackId = i;
        this.xSourceStreamId = s;
        this.videoCapabilities = o;
        this.extensions = u;
      }
      return e.create = function (t, f, l, c) {
        var h = r["default"].getTypeFromModality(l), p = null;
        if (h === i["default"].MEDIA_TYPE.video) {
          var d = void 0, v = void 0;
          l === i["default"].MODALITY.sharing ? (d = t.webrtcScreensharingCapabilityMaxFS ? t.webrtcScreensharingCapabilityMaxFS : u, v = t.webrtcScreensharingCapabilityMaxFPS ? t.webrtcScreensharingCapabilityMaxFPS : a) : (d = t.webrtcVideoCapabilityMaxFS ? t.webrtcVideoCapabilityMaxFS : s, v = t.webrtcVideoCapabilityMaxFPS ? t.webrtcVideoCapabilityMaxFPS : o);
          p = new n["default"](d, v);
        }
        var m = new e(l, c, h, null, null, null, p, {});
        return f.mediaEntityCreated(m), m;
      }, e.prototype.clone = function () {
        return new e(this.modality, this.mid, this.mtype, this.streamId, this.trackId, this.xSourceStreamId, this.videoCapabilities, this.extensions);
      }, e.prototype.getModality = function () {
        return this.modality;
      }, e.prototype.getType = function () {
        return this.mtype;
      }, e.prototype.getMid = function () {
        return this.mid;
      }, e.prototype.disable = function () {
        this.mid = null;
      }, e.prototype.enable = function (e, t) {
        this.modality = e;
        this.mid = t;
      }, e.prototype.isDisabled = function () {
        return !this.mid;
      }, e.prototype.isEnabled = function () {
        return !!this.mid;
      }, e.prototype.getVideoCapabilities = function () {
        return this.videoCapabilities;
      }, e.prototype.getStreamId = function () {
        return this.streamId;
      }, e.prototype.setStreamId = function (e) {
        this.streamId = e;
      }, e.prototype.getTrackId = function () {
        return this.trackId;
      }, e.prototype.setTrackId = function (e) {
        this.trackId = e;
      }, e.prototype.getXSourceStreamId = function () {
        return this.xSourceStreamId;
      }, e.prototype.setXSourceStreamId = function (e) {
        this.xSourceStreamId = e;
      }, e.prototype.getExtension = function (e) {
        return this.extensions[e];
      }, e.prototype.setExtension = function (e, t) {
        this.extensions[e] = t;
      }, e;
    }();
  t.__esModule = !0;
  t["default"] = f;
}));
