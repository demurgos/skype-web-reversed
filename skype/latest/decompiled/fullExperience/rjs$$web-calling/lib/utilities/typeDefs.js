(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("web-calling/lib/utilities/typeDefs", [
      "require",
      "exports"
    ], e);
}(function (e, t) {
  var n;
  (function (e) {
    e[e.Pending = 0] = "Pending";
    e[e.Resolved = 1] = "Resolved";
    e[e.Rejected = 2] = "Rejected";
  }(n = t.SettablePromiseState || (t.SettablePromiseState = {})));
  var r;
  (function (e) {
    e[e.None = 0] = "None";
    e[e.Ringing = 10] = "Ringing";
    e[e.Notified = 1] = "Notified";
    e[e.Connecting = 2] = "Connecting";
    e[e.Connected = 3] = "Connected";
    e[e.LocalHold = 4] = "LocalHold";
    e[e.RemoteHold = 5] = "RemoteHold";
    e[e.Disconnecting = 6] = "Disconnecting";
    e[e.Disconnected = 7] = "Disconnected";
    e[e.Observing = 8] = "Observing";
    e[e.Voicemail = 9] = "Voicemail";
  }(r = t.CallState || (t.CallState = {})));
  var i;
  (function (e) {
    e[e.None = 0] = "None";
    e[e.Connecting = 1] = "Connecting";
    e[e.Ringing = 2] = "Ringing";
    e[e.Connected = 3] = "Connected";
    e[e.Disconnected = 4] = "Disconnected";
    e[e.OnHold = 5] = "OnHold";
  }(i = t.ParticipantState || (t.ParticipantState = {})));
  var s;
  (function (e) {
    e[e.None = 0] = "None";
    e[e.AddingFailed = 1] = "AddingFailed";
    e[e.NoResponse = 2] = "NoResponse";
    e[e.Declined = 3] = "Declined";
    e[e.NotReachable = 4] = "NotReachable";
    e[e.Blocked = 5] = "Blocked";
    e[e.NotFriendOrAuthorized = 6] = "NotFriendOrAuthorized";
    e[e.CallLimitReached = 7] = "CallLimitReached";
    e[e.OtherError = 8] = "OtherError";
  }(s = t.ParticipantStateReason || (t.ParticipantStateReason = {})));
  var o;
  (function (e) {
    e[e.None = 0] = "None";
    e[e.Connecting = 1] = "Connecting";
    e[e.Available = 2] = "Available";
    e[e.StreamPreparing = 3] = "StreamPreparing";
    e[e.Streaming = 4] = "Streaming";
  }(o = t.StreamState || (t.StreamState = {})));
  var u;
  (function (e) {
    e[e.Supported = 0] = "Supported";
    e[e.BrowserNotSupported = 1] = "BrowserNotSupported";
    e[e.IncompatibleVersions = 2] = "IncompatibleVersions";
  }(u = t.CallSupport || (t.CallSupport = {})));
  var a;
  (function (e) {
    e[e.CallSetupFailed = 0] = "CallSetupFailed";
    e[e.CallDropped = 1] = "CallDropped";
    e[e.Undefined = 2] = "Undefined";
  }(a = t.FailureType || (t.FailureType = {})));
  var f;
  (function (e) {
    e[e.Audio = 0] = "Audio";
    e[e.Video = 1] = "Video";
    e[e.ScreenSharing = 2] = "ScreenSharing";
  }(f = t.StreamType || (t.StreamType = {})));
  var l;
  (function (e) {
    e[e.Undefined = 0] = "Undefined";
    e[e.Success = 1] = "Success";
    e[e.NoNgcEndpoint = 2] = "NoNgcEndpoint";
    e[e.NetworkError = 3] = "NetworkError";
    e[e.MediaError = 4] = "MediaError";
    e[e.BadRequest = 5] = "BadRequest";
    e[e.CallEstablismentTimeout = 6] = "CallEstablismentTimeout";
    e[e.CallSetupError = 7] = "CallSetupError";
    e[e.NoPermission = 8] = "NoPermission";
    e[e.Missed = 9] = "Missed";
    e[e.Declined = 10] = "Declined";
    e[e.Busy = 11] = "Busy";
    e[e.Cancelled = 12] = "Cancelled";
    e[e.Dropped = 13] = "Dropped";
  }(l = t.TerminatedReason || (t.TerminatedReason = {})));
  t.StreamDirections = {
    send: "sendonly",
    receive: "recvonly",
    sendReceive: "sendrecv"
  };
  t.StreamTypes = {
    audio: "audio",
    video: "video",
    sharing: "applicationsharing-video"
  };
}));
