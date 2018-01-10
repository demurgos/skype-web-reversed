define("ui/calling/unansweredCallHandler", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "swx-constants",
  "swx-constants",
  "ui/modelHelpers/conversationHelper",
  "utils/common/disposableMixin",
  "services/ecs/configLoader",
  "swx-enums",
  "vendor/knockout",
  "swx-log-tracer",
  "swx-service-locator-instance",
  "experience/settings"
], function (e, t) {
  function C() {
    if (!N || !T)
      T = u.loadConfig(a.ecsClientNames.Skype, h.ecsSkypeCallingT1Key);
    return T;
  }
  function k() {
    t.newCallStartedInShellApp(null);
    t.previousCallEndedInShellApp(null);
    m = !1;
    g = !1;
    y = !1;
    b = !1;
    w = !1;
    S = null;
    x = 0;
  }
  function L(e) {
    var t = e.audio.state.when(a.callConnectionState.Connected, function () {
      g = !0;
    });
    p.registerDisposable(t);
  }
  var n = e("lodash-compat"), r = e("swx-constants").CALLING, i = e("swx-constants").COMMON, s = e("ui/modelHelpers/conversationHelper"), o = e("utils/common/disposableMixin"), u = e("services/ecs/configLoader"), a = e("swx-enums"), f = e("vendor/knockout"), l = e("swx-log-tracer").getLogger(), c = e("swx-service-locator-instance").default, h = e("experience/settings"), p = {}, d = !1, v, m = !1, g = !1, y = !1, b = !1, w = !1, E = !1, S = null, x = 0, T, N = null;
  t.init = function () {
    var e = c.resolve(i.serviceLocator.FEATURE_FLAGS);
    return d = !1, N = null, e.isFeatureOn(i.featureFlags.UNANSWERED_CALL_UI) ? C().then(function (e) {
      n.isEmpty(e) ? (l.log("[Unanswered Call UI] ECS config empty"), d = !0) : (N = e, d = N.UnansweredCallUIEnabled);
    }).catch(function (e) {
      l.log("[Unanswered Call UI] failed to get ECS config", e);
      d = !0;
    }) : Promise.resolve();
  };
  t.newCallStartedInShellApp = f.observable(null);
  t.previousCallEndedInShellApp = f.observable(null);
  t.observe = function (e) {
    if (!d)
      return;
    v = e;
    k();
    var n = v.selfParticipant.audio.state.when(a.callConnectionState.Connected, function () {
      m = !0;
    });
    p.registerDisposable(n);
    e.participants.added(L);
    s.isCallingActive(v) || t.newCallStartedInShellApp(v);
    S = new Date().getTime();
    b = v.mediaConnectionType() === a.mediaConnectionType.Pluginless;
    w = s.isPstnEndpoint(v.participants(0).audio.endpoint());
  };
  t.callEnded = function () {
    if (!d)
      return;
    x = new Date().getTime() - S;
    t.newCallStartedInShellApp() && t.previousCallEndedInShellApp(v);
    p.dispose && p.dispose();
  };
  t.callHungUpByCaller = function () {
    y = !0;
  };
  t.callStarting = function (e) {
    E = e;
  };
  t.setup = function () {
    if (!d)
      return Promise.reject(new Error("Unanswered call UI is disabled"));
    if (v.selfParticipant.audio.state.reason === a.callDisconnectionReason.CallEscalated)
      return Promise.reject(new Error("Unanswered call UI is ignoring call escalations"));
    var e = h.unansweredUI.minCallDuration, t = new Promise(function (t, s) {
        function o(e) {
          var n = c.resolve(i.serviceLocator.PUBSUB);
          n.publish(i.events.navigation.OPEN_CONVERSATION, {
            model: v,
            origin: i.telemetry.historyLoadOrigin.UNANSWERED_CALL_UI
          });
          t({
            reason: e,
            wasVideoCall: E,
            ecsConfig: N
          });
          k();
        }
        function u() {
          s(new Error("Unanswered call UI should not be shown in this scenario"));
          k();
        }
        function f(e) {
          return e === a.callDisconnectionReason.Busy ? r.UNANSWERED_CALL_REASONS.BUSY : r.UNANSWERED_CALL_REASONS.MISSED;
        }
        function l() {
          if (m || w) {
            u();
            return;
          }
          var t = v.participants(0).audio.state.reason;
          !y || x >= e ? o(f(t)) : u();
        }
        function h() {
          g ? u() : !y || x >= e ? o(r.UNANSWERED_CALL_REASONS.UNAVAILABLE) : u();
        }
        function p() {
          return n.some(v.participants(), function (e) {
            return !e.audio.state.reason;
          });
        }
        !b && p() && (y = !0);
        v.isGroupConversation() ? h() : l();
      });
    return t;
  };
  n.extend(p, o);
});
