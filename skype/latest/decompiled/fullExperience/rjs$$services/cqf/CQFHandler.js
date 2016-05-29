define("services/cqf/CQFHandler", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "constants/common",
  "ui/modelHelpers/conversationHelper",
  "services/cqf/trigger",
  "utils/common/disposableMixin",
  "swx-enums",
  "services/serviceLocator",
  "browser/window"
], function (e, t) {
  function b() {
    var e = a.resolve(r.serviceLocator.FEATURE_FLAGS), t = e.isFeatureOn(r.featureFlags.CQF_ENABLED);
    return t;
  }
  function w() {
    h = !0;
    l._dmDisposeAll();
  }
  function E(e) {
    if (e.video.channels(0)) {
      var t = e.video.channels(0).stream.state.once(u.mediaStreamState.Started, w);
      l.registerDisposable(t);
    }
  }
  var n = e("lodash-compat"), r = e("constants/common"), i = e("ui/modelHelpers/conversationHelper"), s = e("services/cqf/trigger"), o = e("utils/common/disposableMixin"), u = e("swx-enums"), a = e("services/serviceLocator"), f = e("browser/window"), l = {}, c, h = !1, p, d, v, m, g, y;
  t.observe = function (e) {
    if (!b())
      return;
    h = !1;
    var t = e.participants.added(E);
    l.registerDisposable(t);
    if (e.selfParticipant.video.channels(0)) {
      var n = e.selfParticipant.video.channels(0).stream.state.once(u.mediaStreamState.Started, w);
      l.registerDisposable(n);
    }
  };
  t.updateCallData = function (e) {
    if (!b())
      return;
    c = e.audioService.callId();
    m = e._callData.nodeId();
    g = e._callData.ngcEndpointId();
    y = e._callData.ngcParticipantId();
    p = e.audioService.callConnected() ? f.Date.now() - e.audioService.callConnected() : 0;
    d = e.isGroupConversation();
    v = i.isConversationWithPstn(e);
    l._dmDisposeAll();
  };
  t.setupCQF = function () {
    if (!b())
      return Promise.reject();
    var e = new Promise(function (e, t) {
      var n = {
        duration: p,
        callId: c,
        hasPSTN: v,
        isGroupConversation: d
      };
      s.validateCall(n).then(function () {
        e({
          isVideo: h,
          isPSTN: v,
          callId: c,
          nodeId: m,
          ngcEndpointId: g,
          ngcParticipantId: y
        });
      }).catch(t);
    });
    return e;
  };
  n.extend(l, o);
});
