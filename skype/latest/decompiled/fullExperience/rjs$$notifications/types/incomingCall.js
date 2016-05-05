define("notifications/types/incomingCall", [
  "require",
  "constants/common",
  "notifications/common/notification",
  "services/pubSub/pubSub",
  "notifications/common/sender",
  "ui/controls/calling/sounds",
  "ui/viewModels/calling/helpers/callingFacade",
  "ui/telemetry/actions/actionNames",
  "services/serviceLocator"
], function (e) {
  function f(e, f) {
    function d(n, r) {
      var i = r ? u.audioVideo.acceptWithVideo : u.audioVideo.acceptWithAudio, s = a.resolve(t.serviceLocator.ACTION_TELEMETRY);
      s.recordAction(i), n ? o.acceptCall(e, r) : o.installPlugin(c, e, !1, r);
    }
    function v() {
      var n = a.resolve(t.serviceLocator.ACTION_TELEMETRY);
      n.recordAction(u.audioVideo.reject), o.rejectCall(e);
    }
    var l = t.notifications.AUDIO, c = "incoming", h = {
        key: s.KEYS.CALL_INCOMING,
        loop: !0
      }, p = {
        accept: function (n) {
          n === t.modalityType.AUDIO || !n ? d(f, !1) : n === t.modalityType.VIDEO ? d(f, !0) : n === t.modalityType.CHAT && (v(), r.publish(t.events.navigation.OPEN_CONVERSATION, { model: e }));
        },
        decline: v
      };
    return new n(l, i.fromConversation(e), p, h);
  }
  var t = e("constants/common"), n = e("notifications/common/notification"), r = e("services/pubSub/pubSub"), i = e("notifications/common/sender"), s = e("ui/controls/calling/sounds"), o = e("ui/viewModels/calling/helpers/callingFacade"), u = e("ui/telemetry/actions/actionNames"), a = e("services/serviceLocator");
  return { build: f };
})
