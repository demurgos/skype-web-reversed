define("services/cqf/CQFHandler", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "swx-constants",
  "ui/modelHelpers/conversationHelper",
  "services/cqf/trigger",
  "utils/common/disposableMixin",
  "swx-enums",
  "swx-service-locator-instance",
  "browser/window"
], function (e, t) {
  function w() {
    var e = a.resolve(r.serviceLocator.FEATURE_FLAGS), t = e.isFeatureOn(r.featureFlags.CQF_ENABLED);
    return t;
  }
  function E() {
    h = !0;
    l._dmDisposeAll();
  }
  function S(e) {
    if (e.video.channels(0)) {
      var t = e.video.channels(0).stream.state.once(u.mediaStreamState.Started, E);
      l.registerDisposable(t);
    }
  }
  var n = e("lodash-compat"), r = e("swx-constants").COMMON, i = e("ui/modelHelpers/conversationHelper"), s = e("services/cqf/trigger"), o = e("utils/common/disposableMixin"), u = e("swx-enums"), a = e("swx-service-locator-instance").default, f = e("browser/window"), l = {}, c, h = !1, p, d = !1, v, m, g, y, b;
  t.observe = function (e) {
    if (!w())
      return;
    h = !1;
    var t = e.participants.added(S);
    l.registerDisposable(t);
    if (e.selfParticipant.video.channels(0)) {
      var n = e.selfParticipant.video.channels(0).stream.state.once(u.mediaStreamState.Started, E);
      l.registerDisposable(n);
    }
  };
  t.updateCallData = function (e) {
    if (!w())
      return;
    c = e.audioService.callId();
    g = e._callData.nodeId();
    y = e._callData.ngcEndpointId();
    b = e._callData.ngcParticipantId();
    p = e.audioService.callConnected() ? f.Date.now() - e.audioService.callConnected() : 0;
    d = e.selfParticipant.audio.state.reason === u.callDisconnectionReason.CallEscalated;
    v = e.isGroupConversation();
    m = i.isConversationWithPstn(e);
    d || l._dmDisposeAll();
  };
  t.setupCQF = function () {
    if (!w())
      return Promise.reject();
    var e = new Promise(function (e, t) {
      var n = {
        duration: p,
        callId: c,
        callEscalated: d,
        hasPSTN: m,
        isGroupConversation: v
      };
      s.validateCall(n).then(function () {
        e({
          isVideo: h,
          isPSTN: m,
          callId: c,
          nodeId: g,
          ngcEndpointId: y,
          ngcParticipantId: b
        });
      }).catch(t);
    });
    return e;
  };
  n.extend(l, o);
});
