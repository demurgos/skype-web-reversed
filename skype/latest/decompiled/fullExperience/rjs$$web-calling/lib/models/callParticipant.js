(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("web-calling/lib/models/callParticipant", [
      "require",
      "exports",
      "../utilities/observableBase",
      "../utilities/typeDefs",
      "./callEvents",
      "lodash-compat"
    ], e);
}(function (e, t) {
  var n = e("../utilities/observableBase"), r = e("../utilities/typeDefs"), i = e("./callEvents"), s = e("lodash-compat"), o = (c = {}, c[r.ParticipantState.None] = [r.ParticipantState.Connecting], c[r.ParticipantState.Connecting] = [
      r.ParticipantState.Ringing,
      r.ParticipantState.Connected,
      r.ParticipantState.Disconnected
    ], c[r.ParticipantState.Ringing] = [
      r.ParticipantState.Connected,
      r.ParticipantState.Disconnected
    ], c[r.ParticipantState.Connected] = [
      r.ParticipantState.Connecting,
      r.ParticipantState.Disconnected
    ], c[r.ParticipantState.Disconnected] = [], c), u = function (e) {
      function t(t, n, r) {
        var i = e.call(this) || this;
        return i.mediaStreamAvailable = !1, i.participant = t, i.type = n, i.mediaSession = r, i;
      }
      return __extends(t, e), t.prototype.dispose = function () {
        this.participant = undefined;
      }, t.prototype.state = function () {
        if (!this.participant)
          return r.StreamState.None;
        switch (this.participant.state) {
        case r.ParticipantState.None:
        case r.ParticipantState.Disconnected:
          return r.StreamState.None;
        case r.ParticipantState.Connecting:
        case r.ParticipantState.Ringing:
          return this.mediaStreamAvailable ? r.StreamState.Connecting : r.StreamState.None;
        case r.ParticipantState.Connected:
        case r.ParticipantState.OnHold:
          return this.mediaStreamAvailable ? r.StreamState.Available : r.StreamState.None;
        default:
          throw new Error("Unknown ParticipantState!");
        }
      }, t.prototype.updateStream = function (e) {
        var t = e === void 0 ? {} : e, n = t.sourceId, i = n === void 0 ? undefined : n, s = t.direction, o = s === void 0 ? r.StreamDirections.receive : s;
        this.id = i;
        this.mediaStreamAvailable = o === r.StreamDirections.sendReceive || o === r.StreamDirections.send;
        this.raiseChanged();
      }, t.prototype.notifyParticipantStateChanged = function () {
        this.raiseChanged();
      }, t.prototype.setMediaSession = function (e) {
        this.mediaSession = e;
      }, t;
    }(n["default"]);
  t.BaseStream = u;
  var a = function (e) {
    function t(t, n) {
      return e.call(this, t, r.StreamType.Audio, n) || this;
    }
    return __extends(t, e), t;
  }(u);
  t.AudioStream = a;
  var f = function (e) {
    function t(t, n, r, i) {
      var s = e.call(this, t, n, r) || this;
      return s.size = {
        width: 0,
        height: 0
      }, s.renderStarted = !1, s.isAppSharing = !1, s.isAppSharing = i, s;
    }
    return __extends(t, e), t.prototype.state = function () {
      var t = e.prototype.state.call(this);
      switch (t) {
      case r.StreamState.None:
      case r.StreamState.Connecting:
        return t;
      case r.StreamState.Available:
        if (!this.videoRenderer)
          return r.StreamState.Available;
        return this.renderStarted ? r.StreamState.Streaming : r.StreamState.StreamPreparing;
      default:
        throw new Error("Unexpected base stream state!");
      }
    }, t.prototype.setMediaSession = function (t) {
      t !== this.mediaSession && this.stop();
      e.prototype.setMediaSession.call(this, t);
    }, t.prototype.dispose = function () {
      this.stop();
      e.prototype.dispose.call(this);
    }, t.prototype.start = function (e) {
      var t = this;
      if (!this.videoRenderer) {
        var n = {
            onVideoSizeChanged: function (e, n) {
              t.size = {
                width: e,
                height: n
              };
              t.renderStarted = e > 0 && n > 0;
              t.raiseChanged();
              t.raiseEvent(i.StreamEvents.videoSizeChanged, t);
            },
            onVideoStateChanged: function (e) {
              t.renderStarted = e.stream === "active";
              t.raiseChanged();
            }
          }, s = void 0;
        switch (this.type) {
        case r.StreamType.Video:
          s = !1;
          break;
        case r.StreamType.ScreenSharing:
          s = !0;
          break;
        default:
          return Promise.reject("Unknown/unsupported stream type!");
        }
        return this.videoRenderer = this.mediaSession.createRemoteRenderer(e.container, n), this.videoRenderer.subscribeVideoAsync(this.id, s).then(function () {
          return Promise.resolve(t.videoRenderer);
        });
      }
      return Promise.resolve(this.videoRenderer);
    }, t.prototype.stop = function () {
      return this.videoRenderer && (this.videoRenderer.dispose(), this.videoRenderer = null, this.renderStarted = !1, this.raiseChanged()), Promise.resolve();
    }, t;
  }(u);
  t.VideoOrScreenSharingStream = f;
  var l = function (e) {
    function t(t, n, i, s) {
      var o = e.call(this) || this;
      return o.logger = s, o.voiceLevel = 0, o.state = r.ParticipantState.None, o.id = t, o.displayName = n, o.audio = new a(o, i), o.video = new f(o, r.StreamType.Video, i, !1), o.screenShare = new f(o, r.StreamType.ScreenSharing, i, !0), o.mediaSession = i, o;
    }
    return __extends(t, e), t.prototype.dispose = function () {
      this.audio.dispose();
      this.video.dispose();
      this.screenShare.dispose();
      this.mediaSession = undefined;
    }, t.prototype.setMediaSession = function (e) {
      this.mediaSession = e;
      this.audio.setMediaSession(e);
      this.video.setMediaSession(e);
      this.screenShare.setMediaSession(e);
    }, t.prototype.updateStreams = function (e) {
      var t = function (t) {
        return s.find(e, function (e) {
          return e.type === t;
        });
      };
      this.audio.updateStream(t(r.StreamTypes.audio));
      this.video.updateStream(t(r.StreamTypes.video));
      this.screenShare.updateStream(t(r.StreamTypes.sharing));
      this.raiseChanged(this);
    }, t.prototype.updateVoiceLevel = function (e) {
      if (this.voiceLevel === e)
        return;
      this.voiceLevel = e;
      this.raiseChanged(this);
    }, t.prototype.setState = function (e, t) {
      if (this.state === e)
        return;
      var n = o[this.state], r = n.indexOf(e) >= 0;
      if (!r)
        throw new Error("Invalid state transition " + this.state + "->" + e + " attempted for participant " + this.id);
      this.state = e;
      this.stateReason = t;
      this.audio.notifyParticipantStateChanged();
      this.video.notifyParticipantStateChanged();
      this.screenShare.notifyParticipantStateChanged();
      this.raiseChanged(this);
    }, t;
  }(n["default"]);
  t.__esModule = !0;
  t["default"] = l;
  var c;
}));
