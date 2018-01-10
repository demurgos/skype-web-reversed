(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/models/videoService", [
      "require",
      "exports",
      "jskype-settings-instance",
      "jcafe-property-model",
      "./callingServiceBase",
      "swx-enums"
    ], e);
}(function (e, t) {
  function a(e, t) {
    return new u(e);
  }
  var n = e("jskype-settings-instance"), r = e("jcafe-property-model"), i = e("./callingServiceBase"), s = e("swx-enums"), o = function () {
      function e() {
        this.participant = r.property({ value: null });
      }
      return e;
    }();
  t.ActiveSpeaker = o;
  var u = function (e) {
    function t(t) {
      var n = e.call(this, t, !0) || this;
      return n.maxVideos = r.property(), n.videoMode = r.property({ value: s.videoMode.Both }), n.activeSpeaker = new o(), n;
    }
    return __extends(t, e), t.prototype._hasTooManyParticipants = function () {
      return this.conversation.participantsCount() >= n.settings.maximumParticipantsVideo;
    }, t.prototype._activeConversationModality = function () {
      return this.conversation.activeModalities.video();
    }, t;
  }(i["default"]);
  t.VideoService = u;
  t.build = a;
}));
