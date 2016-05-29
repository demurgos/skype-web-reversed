define("jSkype/models/videoService", [
  "require",
  "exports",
  "module",
  "jSkype/models/callingServiceBase",
  "jSkype/settings",
  "jcafe-property-model"
], function (e, t) {
  function s(e) {
    var t = this, s = new n(e, !0);
    return t.maxVideos = i.property(), t.start = s.start, t.stop = s.stop, t.accept = s.accept, t.reject = s.reject, t._canHandlePluginlessCall = s._canHandlePluginlessCall, t._isCallWithP2PEndpoint = s._isCallWithP2PEndpoint, t._setMediaConnectionType = s._setMediaConnectionType, t._hasPSTNParticipants = s._hasPSTNParticipants, t._setPSTNParticipants = s._setPSTNParticipants, t._membershipChanged = s._membershipChanged, t._checkPluginBasedCapabilitiesSupport = s._checkPluginBasedCapabilitiesSupport, s._hasTooManyParticipants = function () {
      return e.participantsCount() >= r.settings.maximumParticipantsVideo;
    }, s._activeConversationModality = function () {
      return e.activeModalities.video();
    }, t;
  }
  var n = e("jSkype/models/callingServiceBase"), r = e("jSkype/settings"), i = e("jcafe-property-model");
  t.build = function (e, t) {
    return new s(e, t);
  };
});
