(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("web-calling/lib/models/callEvents", [
      "require",
      "exports"
    ], e);
}(function (e, t) {
  var n = function () {
    function e() {
    }
    return e;
  }();
  n.callNegotiationFinished = "callNegotiationFinished";
  n.mediaTypesOffered = "mediaTypesOffered";
  n.renegotiationStarted = "renegotiationStarted";
  n.renegotiationCompleted = "renegotiationCompleted";
  n.renegotiationFailed = "renegotiationFailed";
  n.activeSpeakersChanged = "activeSpeakersChanged";
  n.dominantSpeakersChanged = "dominantSpeakersChanged";
  n.optimalVideoReceiversCountChanged = "optimalVideoReceiversCountChanged";
  n.noMicrophoneAccess = "noMicrophoneAccess";
  n.startCameraFailed = "startCameraFailed";
  n.participantJoined = "participantJoined";
  n.participantRemoved = "participantRemoved";
  n.localVideoSizeChanged = "localVideoSizeChanged";
  n.localVideoStartedOrStopped = "localVideoStartedOrStopped";
  n.retargetStarted = "retargetStarted";
  n.retargetCompleted = "retargetCompleted";
  n.retargetAborted = "retargetAborted";
  n.callStateChanged = "callStateChanged";
  n.conversationUpdated = "conversationUpdated";
  n.localModalitiesConfigured = "localModalitiesConfigured";
  n.userActivityChanged = "userActivityChanged";
  t.CallEvents = n;
  var r = function () {
    function e() {
    }
    return e;
  }();
  t.ParticipantEvents = r;
  var i = function () {
    function e() {
    }
    return e;
  }();
  i.videoSizeChanged = "videoSizeChanged";
  t.StreamEvents = i;
  var s = function () {
    function e() {
    }
    return e;
  }();
  s.incomingCall = "incomingCall";
  t.CallRegistryEvents = s;
}));
