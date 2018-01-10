(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/models/participantScreenSharing", [
      "require",
      "exports",
      "swx-enums",
      "swx-constants",
      "jcafe-property-model",
      "../../lib/models/mediaStream",
      "../../lib/modelHelpers/personsAndGroupsHelper"
    ], e);
}(function (e, t) {
  function a(e, t) {
    return new u(e, t.id());
  }
  var n = e("swx-enums"), r = e("swx-constants"), i = e("jcafe-property-model"), s = e("../../lib/models/mediaStream"), o = e("../../lib/modelHelpers/personsAndGroupsHelper"), u = function () {
      function e(e, t) {
        var r = this;
        this.streamSubscriptions = [];
        this.state = i.property({
          readOnly: !0,
          value: n.callConnectionState.Disconnected
        });
        this.stream = new s["default"]();
        this.isControlling = i.property({ value: !1 });
        this._sourceId = i.property();
        this._dispose = function () {
          r.onStreamStopped();
          r.streamSubscriptions.forEach(function (e) {
            e.dispose();
          });
          r.streamSubscriptions.length = 0;
        };
        this.conversation = e;
        this.participantId = t;
        this.isSelfParticipant = o.isMePerson(t);
        this.streamSubscriptions.push(this.stream.source.sink.container.changed(function () {
          r.canAttachScreenSharingStream() ? r.attachScreenSharingStream() : r.canDetachScreenSharingStream() && r.detachScreenSharingStream();
        }));
        this.streamSubscriptions.push(this.stream.state.when(n.mediaStreamState.Started, this.onStreamStarted.bind(this)));
        this.streamSubscriptions.push(this.stream.state.when(n.mediaStreamState.Active, this.onStreamActive.bind(this)));
        this.streamSubscriptions.push(this.stream.state.when(n.mediaStreamState.Stopped, this.onStreamStopped.bind(this)));
        this.streamSubscriptions.push(this.state.when(n.callConnectionState.Connecting, this.onConnecting.bind(this)));
        this.streamSubscriptions.push(this.state.when(n.callConnectionState.Disconnecting, this.onDisconnecting.bind(this)));
      }
      return e.prototype.canAttachScreenSharingStream = function () {
        var e = this.stream.source.sink.container();
        return this.conversation._callHandler && this.stream.state() !== n.mediaStreamState.Stopped && e;
      }, e.prototype.canDetachScreenSharingStream = function () {
        return this.conversation._callHandler && this.state() !== n.callConnectionState.Disconnected && (this.stream.state() === n.mediaStreamState.Stopped || !this.stream.source.sink.container());
      }, e.prototype.canStartOutgoingScreenSharing = function () {
        return this.conversation._callHandler && this.stream.state() === n.mediaStreamState.Stopped;
      }, e.prototype.canStopOutgoingScreenSharing = function () {
        return this.conversation._callHandler && this.stream.state() !== n.mediaStreamState.Stopped;
      }, e.prototype.attachScreenSharingStream = function () {
        this.canAttachScreenSharingStream() && this.conversation._callHandler.attachParticipantVideo(this.participantId, this.stream.source.sink.container(), r.CALLING.PLUGIN_MEDIA_TYPES.SCREEN_SHARING)["catch"](function () {
        });
      }, e.prototype.detachScreenSharingStream = function () {
        this.canDetachScreenSharingStream() && this.conversation._callHandler.detachParticipantVideo(this.participantId, r.CALLING.PLUGIN_MEDIA_TYPES.SCREEN_SHARING)["catch"](function () {
        });
      }, e.prototype.startOutgoingScreenSharing = function () {
        this.canStartOutgoingScreenSharing() && this.conversation._callHandler.startScreenSharing(this.participantId)["catch"](function () {
        });
      }, e.prototype.stopOutgoingScreenSharing = function () {
        this.canStopOutgoingScreenSharing() && this.conversation._callHandler.stopScreenSharing(this.participantId)["catch"](function () {
        });
      }, e.prototype.onStreamStarted = function () {
        this.state._set(n.callConnectionState.Notified);
      }, e.prototype.onStreamActive = function () {
        this.state._set(n.callConnectionState.Connected);
      }, e.prototype.onStreamStopped = function () {
        this.state() !== n.callConnectionState.Disconnecting && this.state() !== n.callConnectionState.Disconnected && this.state._set(n.callConnectionState.Disconnecting);
        this.state._set(n.callConnectionState.Disconnected);
      }, e.prototype.onConnecting = function () {
        this.isSelfParticipant ? this.startOutgoingScreenSharing() : this.attachScreenSharingStream();
      }, e.prototype.onDisconnecting = function () {
        this.isSelfParticipant ? this.stopOutgoingScreenSharing() : this.detachScreenSharingStream();
      }, e;
    }();
  t.ParticipantScreenSharing = u;
  t.build = a;
}));
