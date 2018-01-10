define("notifications/types/incomingCall", [
  "require",
  "ui/telemetry/actions/actionNames",
  "swx-browser-detect",
  "ui/viewModels/calling/helpers/callingFacade",
  "swx-constants",
  "notifications/common/notification",
  "swx-pubsub-instance",
  "notifications/common/sender",
  "swx-service-locator-instance",
  "ui/controls/calling/sounds",
  "notifications/ringingDeferrer/ringingDeferrerUtil",
  "swx-cafe-application-instance"
], function (e) {
  function h(e, h) {
    function y() {
      var e = n.getBrowserInfo().browserName === n.BROWSERS.CHROME, t = n.getSystemInfo().osName === n.OPERATING_SYSTEMS.LINUX, r = p.isFeatureOn(i.featureFlags.PLUGINLESS_VIDEO_CALLING_CHROME_LINUX), s = p.isFeatureOn(i.featureFlags.CAN_NOTIFY_WITHOUT_VIDEO);
      return e && t && !r && s ? i.notifications.AUDIO_WITHOUT_VIDEO : i.notifications.AUDIO;
    }
    function b(n, s) {
      var o = s ? t.audioVideo.acceptWithVideo : t.audioVideo.acceptWithAudio, u = a.resolve(i.serviceLocator.ACTION_TELEMETRY);
      u.recordAction(o);
      n ? r.acceptCall(e, s) : r.installPlugin(v, e, !1, s);
    }
    function w() {
      var n = a.resolve(i.serviceLocator.ACTION_TELEMETRY);
      n.recordAction(t.audioVideo.reject);
      r.rejectCall(e);
    }
    function E() {
      if (!p.isFeatureOn(i.featureFlags.CALL_NOTIFICATIONS_SOUND_SETTINGS_ENABLED))
        return !1;
      var e = c.get().personsAndGroupsManager.mePerson.preferences(i.userSettings.preferences.CALL_NOTIFICATIONS_SOUND);
      return e ? !e.value() : !1;
    }
    var p = a.resolve(i.serviceLocator.FEATURE_FLAGS), d = y(), v = "incoming", m = {
        key: f.KEYS.CALL_INCOMING,
        loop: !0
      }, g = {
        accept: function (t) {
          t === i.modalityType.AUDIO || !t ? b(h, !1) : t === i.modalityType.VIDEO ? b(h, !0) : t === i.modalityType.CHAT && (w(), o.publish(i.events.navigation.OPEN_CONVERSATION, { model: e }));
        },
        decline: w
      }, S = new s(d, u.fromConversation(e), g, m);
    return S.canPlaySound && (l.areRingingSoundsDeferred() || E()) && (S.canPlaySound = !1), S;
  }
  var t = e("ui/telemetry/actions/actionNames"), n = e("swx-browser-detect").default, r = e("ui/viewModels/calling/helpers/callingFacade"), i = e("swx-constants").COMMON, s = e("notifications/common/notification"), o = e("swx-pubsub-instance").default, u = e("notifications/common/sender"), a = e("swx-service-locator-instance").default, f = e("ui/controls/calling/sounds"), l = e("notifications/ringingDeferrer/ringingDeferrerUtil"), c = e("swx-cafe-application-instance");
  return { build: h };
});
