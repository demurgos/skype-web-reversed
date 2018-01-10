(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/plugin/skypeCoreComponent", [
      "require",
      "exports",
      "../../../lib/services/plugin/baseComponent",
      "jskype-settings-instance",
      "swx-constants"
    ], e);
}(function (e, t) {
  var n = e("../../../lib/services/plugin/baseComponent"), r = e("jskype-settings-instance"), i = e("swx-constants"), s = "SkypeCore", o = function (e) {
      function t(t) {
        var n = e.call(this, s) || this;
        return n._init(t, { cssClass: "pluginNoSize" }), n;
      }
      return __extends(t, e), t.prototype.loginWithPassword = function (e, t, n) {
        var i = {
          participantId: e,
          password: t,
          cacheCredentials: n,
          uicServiceUrl: r.settings.uicServiceUrl.byPassword
        };
        this._invokeMethod("LoginWithPassword", i);
      }, t.prototype.loginWithSkypeToken = function (e, t, n, i) {
        var s = {
          participantId: e,
          accessToken: t,
          tokenExpiration: n,
          cacheCredentials: i,
          uicServiceUrl: r.settings.uicServiceUrl.bySkypeToken
        };
        this._invokeMethod("LoginWithSkypeToken", s);
      }, t.prototype.selectCameraDevice = function (e) {
        return this._invokeMethod("SelectCameraDevice", { deviceId: e });
      }, t.prototype.selectMicrophoneDevice = function (e) {
        return this._invokeMethod("SelectMicrophoneDevice", { deviceId: e });
      }, t.prototype.selectSpeakerDevice = function (e) {
        return this._invokeMethod("SelectSpeakerDevice", { deviceId: e });
      }, t.prototype.placeCall = function (e, t, n) {
        var r = {
          calleeIds: e,
          identitiesToUse: t,
          withVideo: !!n && !0
        };
        this._invokeMethod("PlaceCall", r);
      }, t.prototype.awaitCall = function (e, t, n, r, i) {
        var s = {
          eventTypeId: e,
          convoIdentity: t,
          callId: n,
          nodeSpecificNotificationPayload: r,
          genericNotificationPayload: i
        };
        this._invokeMethod("AwaitCall", s);
      }, t.prototype.joinCall = function (e, t, n, r) {
        var i = {
          convoIdentity: e,
          withVideo: !!t,
          hostId: "",
          accessToken: r
        };
        this._invokeMethod("JoinCall", i);
      }, t.prototype.goLive = function (e, t) {
        var n = {
          convoIdentity: e,
          withVideo: !!t
        };
        this._invokeMethod("GoLive", n);
      }, t.prototype.acceptCall = function (e, t) {
        var n = {
          convoIdentity: e,
          accept: !0,
          withVideo: !!t && !0
        };
        this._invokeMethod("AnswerCall", n);
      }, t.prototype.rejectCall = function (e) {
        var t = {
          convoIdentity: e,
          accept: !1,
          withVideo: !1
        };
        this._invokeMethod("AnswerCall", t);
      }, t.prototype.extendCall = function (e) {
        var t = { newCalleeIds: e };
        this._invokeMethod("ExtendCall", t);
      }, t.prototype.forgetCall = function (e, t, n) {
        var r = { callId: e };
        this._invokeMethod("ForgetCall", r, t, n);
      }, t.prototype.concludeCall = function (e) {
        this._invokeMethod("ConcludeCall", null, e);
      }, t.prototype.muteMicrophone = function (e) {
        e ? this._invokeMethod("MuteMicrophone") : this._invokeMethod("UnmuteMicrophone");
      }, t.prototype.sendLocalVideo = function (e, t, n) {
        this._invokeMethod("SendLocalVideo", {
          send: !!e,
          mediaType: t
        }, n);
      }, t.prototype.getMonitorList = function (e, t) {
        this._invokeMethod("GetMonitorList", null, e, t);
      }, t.prototype.setScreenCaptureMonitor = function (e, t, n) {
        this._invokeMethod("SetScreenCaptureMonitor", { monitorId: e }, t, n);
      }, t.prototype.getMonitorPreview = function (e, t, n, r, i) {
        this._invokeMethod("GetMonitorPreview", {
          monitorId: e,
          width: t,
          height: n
        }, r, i);
      }, t.prototype.sendDtmf = function (e, t) {
        this._invokeMethod("SendDtmf", { dtmfCode: e }, t);
      }, t.prototype.requestCallInfo = function (e, t) {
        this._invokeMethod("RequestCallInfo", null, e, t);
      }, t.prototype.isValidThreshold = function (e) {
        return !isNaN(e) && e >= 0 && e < 11;
      }, t.prototype.setSoundLevelEventMode = function (e, t, n) {
        var r = i.CALLING.SOUND_LEVEL_EVENT_MODE;
        r[e.mode] || n("Sound level model not supported", e.mode);
        e.mode === i.CALLING.SOUND_LEVEL_EVENT_MODE.Boolean && !this.isValidThreshold(e.threshold) && n("Threshold value not supported", e.threshold);
        var s = typeof e.getLocalParticipantLevel == "boolean" ? e.getLocalParticipantLevel : !0, o = {
            mode: e.mode,
            threshold: e.threshold,
            myself: s
          };
        this._invokeMethod("SetSoundLevelEventMode", o, t, n);
      }, t.prototype.setParticipantFrameSink = function (e, t, n, r) {
        var i = {
          participantId: e,
          frameSinkId: t,
          mediaType: n
        };
        this._invokeMethod("SetParticipantFrameSink", i, r);
      }, t.prototype.setLocalFrameSink = function (e, t) {
        var n = { frameSinkId: e };
        this._invokeMethod("SetLocalFrameSink", n, t);
      }, t.prototype.showLocalVideo = function (e, t) {
        this._invokeMethod("ShowLocalVideo", { show: !!e && !0 }, t);
      }, t.prototype.showParticipantVideo = function (e, t, n, r) {
        var i = {
          participantId: e,
          show: !!t,
          mediaType: n
        };
        this._invokeMethod("ShowParticipantVideo", i, r);
      }, t;
    }(n["default"]);
  t.__esModule = !0;
  t["default"] = o;
}));
