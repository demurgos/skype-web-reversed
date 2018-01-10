(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/models/videoChannel", [
      "require",
      "exports",
      "jcafe-property-model",
      "../../lib/modelHelpers/personsAndGroupsHelper",
      "../../lib/modelHelpers/propertyModelHelper",
      "../../lib/models/mediaStream",
      "swx-enums",
      "swx-constants"
    ], e);
}(function (e, t) {
  function f(e, t, n) {
    return new a(e, t, n);
  }
  var n = e("jcafe-property-model"), r = e("../../lib/modelHelpers/personsAndGroupsHelper"), i = e("../../lib/modelHelpers/propertyModelHelper"), s = e("../../lib/models/mediaStream"), o = e("swx-enums"), u = e("swx-constants"), a = function () {
      function e(e, t, i) {
        var u = this;
        this.streamSubscriptions = [];
        this.isOnHold = n.property({ value: !1 });
        this.isVideoOn = n.property({
          readOnly: !0,
          value: !1
        });
        this.stream = new s["default"]();
        this.camera = null;
        this._init = function () {
          u.streamSubscriptions.push(u.stream.source.sink.container.changed(function () {
            u.canAttachVideoStream() && u.attachVideoStream();
          }));
          u.streamSubscriptions.push(u.stream.state.when(o.mediaStreamState.Started, u.attachVideoStream.bind(u)));
          u.streamSubscriptions.push(u.stream.state.when(o.mediaStreamState.Stopped, u.detachVideoStream.bind(u)));
          u.videoStateSubscription = u.videoState.when(o.callConnectionState.Disconnected, u.onDisconnectedCallState.bind(u));
        };
        this._dispose = function () {
          u.stream.state._set(o.mediaStreamState.Stopped);
          u.streamSubscriptions.forEach(function (e) {
            e.dispose();
          });
          u.streamSubscriptions.length = 0;
          u.videoStateSubscription.dispose();
        };
        this._reset = function () {
          u.stream.state._set(o.mediaStreamState.Stopped);
          u.isStarted._set(!1);
          u.isVideoOn._set(!1);
        };
        this.conversation = e;
        this.videoState = t;
        this.participantId = i;
        this.isSelfParticipant = r.isMePerson(i);
        this.setIsStartedDefaultValue();
      }
      return e.prototype.setIsStartedDefaultValue = function () {
        var e = this.getStartedDefaultValue();
        this.isStarted = i.createPropertyWithSetter(e, this.toggleIsStarted.bind(this), !0);
        this.channelStarted = e;
        this.isStartedEnabledProperty = this.isStarted.set._enabled;
      }, e.prototype.getStartedDefaultValue = function () {
        return !this.isSelfParticipant && !this.conversation.isGroupConversation();
      }, e.prototype.canAttachVideoStream = function () {
        return this.conversation.selfParticipant.audio.state() !== o.callConnectionState.Disconnected && this.conversation.selfParticipant.audio.state() !== o.callConnectionState.Disconnecting && this.conversation._callHandler && this.stream.state() !== o.mediaStreamState.Stopped && this.stream.source.sink.container() && this.isVideoOn() && this.channelStarted;
      }, e.prototype.canDetachVideoStream = function () {
        return this.conversation._callHandler;
      }, e.prototype.attachVideoStream = function () {
        this.canAttachVideoStream() && this.conversation._callHandler.attachParticipantVideo(this.participantId, this.stream.source.sink.container(), u.CALLING.PLUGIN_MEDIA_TYPES.VIDEO)["catch"](function () {
        });
      }, e.prototype.detachVideoStream = function () {
        this.canDetachVideoStream() && this.conversation._callHandler.detachParticipantVideo(this.participantId, u.CALLING.PLUGIN_MEDIA_TYPES.VIDEO)["catch"](function () {
        });
      }, e.prototype.toggleIsStarted = function (e) {
        return this.isSelfParticipant && this.conversation.selfParticipant.audio.state() === o.callConnectionState.Connected && this.isStartedEnabledProperty(!1), this.conversation._callHandler ? (this.channelStarted = e, this.channelStarted && this.isSelfParticipant && this.stream.state._set(o.mediaStreamState.Started), this.isSelfParticipant && this.isVideoOn._set(this.channelStarted), this.channelStarted ? this.attachVideoStream() : this.detachVideoStream(), Promise.resolve(this.channelStarted)) : Promise.reject(null);
      }, e.prototype.onDisconnectedCallState = function (e, t) {
        if (t === undefined)
          return;
        this.stream.state._set(o.mediaStreamState.Stopped);
        this.isStartedEnabledProperty(!0);
        this.isStarted._set(!1);
        this.isVideoOn._set(!1);
        this.channelStarted = this.getStartedDefaultValue();
      }, e;
    }();
  t.VideoChannel = a;
  t.build = f;
}));
