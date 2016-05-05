define("jSkype/services/plugin/skypeCoreComponent", [
  "require",
  "jSkype/services/plugin/baseComponent",
  "jSkype/settings",
  "constants/calling"
], function (e) {
  function s(e) {
    this._init.call(this, e, { cssClass: "pluginNoSize" });
  }
  function o(e) {
    return !isNaN(e) && e >= 0 && e < 11;
  }
  var t = "SkypeCore", n = e("jSkype/services/plugin/baseComponent"), r = e("jSkype/settings"), i = e("constants/calling");
  return s.prototype = new n(t), s.constructor = n.constructor, s.prototype.loginWithPassword = function (t, n, i) {
    var s = {
      participantId: t,
      password: n,
      cacheCredentials: i,
      uicServiceUrl: r.settings.uicServiceUrl.byPassword
    };
    this._invokeMethod("LoginWithPassword", s);
  }, s.prototype.loginWithSkypeToken = function (t, n, i) {
    var s = {
      participantId: t,
      accessToken: n,
      cacheCredentials: i,
      uicServiceUrl: r.settings.uicServiceUrl.bySkypeToken
    };
    this._invokeMethod("LoginWithSkypeToken", s);
  }, s.prototype.selectCameraDevice = function (t) {
    this._invokeMethod("SelectCameraDevice", { deviceId: t });
  }, s.prototype.selectMicrophoneDevice = function (t) {
    this._invokeMethod("SelectMicrophoneDevice", { deviceId: t });
  }, s.prototype.selectSpeakerDevice = function (t) {
    this._invokeMethod("SelectSpeakerDevice", { deviceId: t });
  }, s.prototype.placeCall = function (t, n, r) {
    var i = {
      calleeIds: t,
      identitiesToUse: n,
      withVideo: !!r && !0
    };
    this._invokeMethod("PlaceCall", i);
  }, s.prototype.awaitCall = function (t, n, r, i, s) {
    var o = {
      eventTypeId: t,
      convoIdentity: n,
      callId: r,
      nodeSpecificNotificationPayload: i,
      genericNotificationPayload: s
    };
    this._invokeMethod("AwaitCall", o);
  }, s.prototype.joinCall = function (t, n, r, i) {
    var s = {
      convoIdentity: t,
      withVideo: !!n,
      hostId: "",
      accessToken: i
    };
    this._invokeMethod("JoinCall", s);
  }, s.prototype.acceptCall = function (t, n) {
    var r = {
      convoIdentity: t,
      accept: !0,
      withVideo: !!n && !0
    };
    this._invokeMethod("AnswerCall", r);
  }, s.prototype.rejectCall = function (t) {
    var n = {
      convoIdentity: t,
      accept: !1,
      withVideo: !1
    };
    this._invokeMethod("AnswerCall", n);
  }, s.prototype.extendCall = function (t) {
    var n = { newCalleeIds: t };
    this._invokeMethod("ExtendCall", n);
  }, s.prototype.forgetCall = function (t, n, r) {
    var i = { callId: t };
    this._invokeMethod("ForgetCall", i, n, r);
  }, s.prototype.concludeCall = function (t) {
    this._invokeMethod("ConcludeCall", null, t);
  }, s.prototype.muteMicrophone = function (t) {
    t ? this._invokeMethod("MuteMicrophone") : this._invokeMethod("UnmuteMicrophone");
  }, s.prototype.sendLocalVideo = function (t, n, r) {
    this._invokeMethod("SendLocalVideo", {
      send: !!t,
      mediaType: n
    }, r);
  }, s.prototype.getMonitorList = function (t, n) {
    this._invokeMethod("GetMonitorList", null, t, n);
  }, s.prototype.setScreenCaptureMonitor = function (t, n, r) {
    this._invokeMethod("SetScreenCaptureMonitor", { monitorId: t }, n, r);
  }, s.prototype.sendDtmf = function (t, n) {
    this._invokeMethod("SendDtmf", { dtmfCode: t }, n);
  }, s.prototype.requestCallInfo = function (t, n) {
    this._invokeMethod("RequestCallInfo", null, t, n);
  }, s.prototype.setSoundLevelEventMode = function (t, n, r) {
    var s, u;
    i.SOUND_LEVEL_EVENT_MODE[t.mode] || r("Sound level model not supported", t.mode), t.mode === i.SOUND_LEVEL_EVENT_MODE.Boolean && !o(t.threshold) && r("Threshold value not supported", t.threshold), s = typeof t.getLocalParticipantLevel == "boolean" ? t.getLocalParticipantLevel : !0, u = {
      mode: t.mode,
      threshold: t.threshold,
      myself: s
    }, this._invokeMethod("SetSoundLevelEventMode", u, n, r);
  }, s.prototype.setParticipantFrameSink = function (t, n, r, i) {
    var s = {
      participantId: t,
      frameSinkId: n,
      mediaType: r
    };
    this._invokeMethod("SetParticipantFrameSink", s, i);
  }, s.prototype.setLocalFrameSink = function (t, n) {
    var r = { frameSinkId: t };
    this._invokeMethod("SetLocalFrameSink", r, n);
  }, s.prototype.showLocalVideo = function (t, n) {
    this._invokeMethod("ShowLocalVideo", { show: !!t && !0 }, n);
  }, s.prototype.showParticipantVideo = function (t, n, r, i) {
    var s = {
      participantId: t,
      show: !!n,
      mediaType: r
    };
    this._invokeMethod("ShowParticipantVideo", s, i);
  }, s;
})
