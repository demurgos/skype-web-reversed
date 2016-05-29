define("ui/controls/calling/sounds", [
  "require",
  "exports",
  "module",
  "experience/settings"
], function (e, t) {
  function o(e) {
    var n;
    if (!u(e))
      throw new Error("Invalid sound: " + e);
    return n = r[e], n || (n = document.createElement("audio"), s.forEach(function (i) {
      var s = document.createElement("source"), o = t.buildSoundAssetUrl(e, i.extension);
      s.setAttribute("type", i.mimeType);
      s.setAttribute("src", o);
      n.appendChild(s);
      r[e] = n;
    }), n.id = i + e), n;
  }
  function u(e) {
    for (var n in t.KEYS)
      if (t.KEYS[n] === e)
        return !0;
    return !1;
  }
  var n = e("experience/settings"), r = {}, i = "skype_sounds_", s = [
      {
        mimeType: "audio/mp4",
        extension: "m4a"
      },
      {
        mimeType: "audio/ogg",
        extension: "ogg"
      }
    ];
  t.KEYS = {
    CALL_ANSWER: "call-answer",
    CALL_CONNECTING: "call-connecting-loop",
    CALL_DIALING: "call-dialing",
    CALL_END_CALL: "call-endcall",
    CALL_ERROR_1: "call-error-1",
    CALL_ERROR_2: "call-error-2",
    CALL_HOLD: "call-hold-loop",
    CALL_INCOMING: "call-incoming-loop",
    CALL_NO_ANSWER: "call-no-answer",
    CALL_OUTGOING: "call-outgoing-original-loop",
    CALL_OUTGOING_P1: "call-outgoing-p1",
    CALL_OUTGOING_P2: "call-outgoing-p2-loop",
    CALL_RECONNECT: "call-reconnect-loop",
    CALL_RESUME: "call-resume",
    CAM_SHUTTER_CLOSE: "cam-shutter-close",
    CAM_SHUTTER_OPEN: "cam-shutter-open",
    CONTACTS_ADDED: "contacts-added",
    CONTACTS_AVAILABLE: "contacts-available",
    CONTACTS_RECEIVED: "contacts-received",
    FILE_TRANSFER_COMPLETE: "file-transfer-complete",
    FILE_TRANSFER_FAILED: "file-transfer-failed",
    FILE_TRANSFER_INCOMING: "file-transfer-incoming",
    LOGIN: "login",
    LOGOUT: "logout",
    MESSAGE_RECEIVED_1: "message-received-1",
    MESSAGE_RECEIVED_2: "message-received-2",
    MESSAGE_RECEIVED_3: "message-received-3",
    MESSAGE_RECEIVED_4: "message-received-4",
    MESSAGE_SENT: "message-sent",
    VIDEO_MESSAGE_RECORD_START: "video-message-record-start",
    VIDEO_MESSAGE_RECORD_STOP: "video-message-record-stop",
    VOICEMAIL_RECEIVED: "voicemail-received"
  };
  t.playLoop = function (e) {
    var t = o(e);
    t.setAttribute("loop", !0);
    t.play();
  };
  t.playOnce = function (e, t) {
    var n = o(e), r = "ended";
    n.addEventListener(r, function i() {
      t && t();
      n.removeEventListener(r, i);
    });
    n.play();
  };
  t.stop = function (e) {
    var t = o(e);
    t.pause();
    t.load();
  };
  t.clearCache = function () {
    r = {};
  };
  t.buildSoundAssetUrl = function (e, t) {
    return [
      n.assetsBaseUrl,
      "/audio",
      "/",
      t,
      "/",
      e,
      ".",
      t
    ].join("");
  };
});
