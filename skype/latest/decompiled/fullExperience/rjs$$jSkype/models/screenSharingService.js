define("jSkype/models/screenSharingService", [
  "require",
  "exports",
  "module",
  "jcafe-property-model",
  "jSkype/modelHelpers/propertyModelHelper",
  "swx-enums"
], function (e, t) {
  function a(e) {
    function f() {
      if (e.selfParticipant.audio.state() !== i.callConnectionState.Connected) {
        s(!1), u(!1), o(!1);
        return;
      }
      var n = t.sharer();
      s(n !== e.selfParticipant), u(!!n), o(n && n !== e.selfParticipant);
    }
    var t = this, a;
    t.sharer = n.property({ value: null }), t.sharedResources = n.collection(), t.controller = n.property({ value: null }), t.controlRequesters = n.collection(), t.requestControl = n.disabledCommand(), t.releaseControl = n.disabledCommand(), t.acceptControlRequest = n.disabledCommand(), t.rejectControlRequest = n.disabledCommand(), e.selfParticipant.audio.state.changed(f), t.start = r.createCommandWithSetter(function () {
      return new Promise(function (n, r) {
        function s() {
          if (!e._callHandler)
            return r("No call handler"), !0;
        }
        if (s())
          return;
        e._callHandler.getMonitorList().then(function (o) {
          if (o && o.length) {
            if (s())
              return;
            e._callHandler.setScreenCaptureMonitor(o[0].monitorId).then(function () {
              t.sharer(e.selfParticipant), e.selfParticipant.screenSharing.state._set(i.callConnectionState.Connecting), n(!0);
            }, r);
          } else
            r("Failed to get monitors to share");
        }, r);
      });
    }, s), t.accept = r.createCommandWithSetter(function () {
      var e = t.sharer();
      e && e.screenSharing.state._set(i.callConnectionState.Connecting);
    }, o), t.reject = n.disabledCommand(), t.stop = r.createCommandWithSetter(function () {
      var e = t.sharer();
      e && e.screenSharing.state() !== i.callConnectionState.Disconnecting && e.screenSharing.state() !== i.callConnectionState.Disconnected && e.screenSharing.state._set(i.callConnectionState.Disconnecting);
    }, u), t.sharer.changed(function (e) {
      a && (a.dispose(), a = null), e && (a = e.screenSharing.state.changed(function (n, r, s) {
        s && n === i.callConnectionState.Disconnected && t.sharer() === e && t.sharer(null), f();
      })), f();
    });
  }
  var n = e("jcafe-property-model"), r = e("jSkype/modelHelpers/propertyModelHelper"), i = e("swx-enums"), s = n.property({ value: !1 }), o = n.property({ value: !1 }), u = n.property({ value: !1 });
  t.build = function (e) {
    return new a(e);
  };
})
