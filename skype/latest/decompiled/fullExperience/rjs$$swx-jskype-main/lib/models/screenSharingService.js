(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/models/screenSharingService", [
      "require",
      "exports",
      "jcafe-property-model",
      "../../lib/modelHelpers/propertyModelHelper",
      "swx-util-calling-stack",
      "swx-enums",
      "../../lib/services/calling/callingFacade",
      "../../lib/models/sharedResource"
    ], e);
}(function (e, t) {
  function f(e) {
    return new a(e);
  }
  var n = e("jcafe-property-model"), r = e("../../lib/modelHelpers/propertyModelHelper"), i = e("swx-util-calling-stack"), s = e("swx-enums"), o = e("../../lib/services/calling/callingFacade"), u = e("../../lib/models/sharedResource"), a = function () {
      function e(e) {
        var t = this;
        this.startEnabled = n.property({ value: !1 });
        this.acceptEnabled = n.property({ value: !1 });
        this.stopEnabled = n.property({ value: !1 });
        this.sharedResourcesInternal = n.collection();
        this.shareableResourcesInternal = n.collection({ get: this.getShareableResources.bind(this) });
        this.sharer = n.property({ value: null });
        this.sharedResources = this.sharedResourcesInternal.asReadOnly();
        this.shareableResources = this.shareableResourcesInternal.asReadOnly();
        this.controller = n.property({ value: null });
        this.controlRequesters = n.collection();
        this.requestControl = n.disabledCommand();
        this.releaseControl = n.disabledCommand();
        this.acceptControlRequest = n.disabledCommand();
        this.rejectControlRequest = n.disabledCommand();
        this.start = r.createCommandWithSetter(function () {
          return t.sharedResourcesInternal.empty(), new Promise(function (e, n) {
            t.shareableResources.get(0).then(function (r) {
              o.setScreenCaptureMonitor(r.id()).then(function () {
                t.sharedResourcesInternal.add(r);
                t.sharer(t.conversation.selfParticipant);
                t.conversation.selfParticipant.screenSharing.state._set(s.callConnectionState.Connecting);
                e(!0);
              }, n);
            }, n);
          });
        }, this.startEnabled);
        this.accept = r.createCommandWithSetter(function () {
          var e = t.sharer();
          e && e.screenSharing.state._set(s.callConnectionState.Connecting);
        }, this.acceptEnabled);
        this.reject = n.disabledCommand();
        this.stop = r.createCommandWithSetter(function () {
          var e = t.sharer();
          e && e.screenSharing.state() !== s.callConnectionState.Disconnecting && e.screenSharing.state() !== s.callConnectionState.Disconnected && e.screenSharing.state._set(s.callConnectionState.Disconnecting);
        }, this.stopEnabled);
        this.conversation = e;
        e.selfParticipant.audio.state.changed(this.handleScreenSharingState.bind(this));
        this.sharer.changed(function (e) {
          t.sharerStateSubscription && (t.sharerStateSubscription.dispose(), t.sharerStateSubscription = null);
          e && (t.sharerStateSubscription = e.screenSharing.state.changed(function (n, r, i) {
            i && n === s.callConnectionState.Disconnected && t.sharer() === e && (t.sharer(null), t.sharedResourcesInternal.empty());
            t.handleScreenSharingState();
          }));
          t.handleScreenSharingState();
        });
      }
      return e.prototype.handleScreenSharingState = function () {
        var e = this.conversation.participants().some(function (e) {
            return e.person.capabilities.screenSharing();
          }), t = this.conversation.selfParticipant.audio.state() == s.callConnectionState.Connected, n = i.get().isPluginlessCallingSupported();
        if (!e || !t || n) {
          this.startEnabled(!1);
          this.stopEnabled(!1);
          this.acceptEnabled(!1);
          return;
        }
        var r = this.sharer();
        this.startEnabled(r !== this.conversation.selfParticipant);
        this.stopEnabled(!!r);
        this.acceptEnabled(r && r !== this.conversation.selfParticipant);
      }, e.prototype.getShareableResources = function () {
        var e = this;
        return this.shareableResourcesInternal.empty(), this.getShareableResourcesPromise || (this.getShareableResourcesPromise = new Promise(function (t, n) {
          o.getMonitorList().then(function (r) {
            r && r.length ? (r.forEach(function (t) {
              e.shareableResourcesInternal.add(u.build(s.sharedResourceType.Desktop, t.monitorId), t.monitorId);
            }), t(e.shareableResourcesInternal())) : n("Failed to get shareable resources");
            e.getShareableResourcesPromise = null;
          }, n);
        })), this.getShareableResourcesPromise;
      }, e;
    }();
  t.ScreenSharingService = a;
  t.build = f;
}));
