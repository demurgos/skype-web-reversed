define("experience/api/helpers/modality", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "swx-constants",
  "swx-enums",
  "ui/viewModels/calling/helpers/callingFacade",
  "ui/telemetry/actions/actionNames",
  "swx-service-locator-instance"
], function (e, t) {
  function l(e) {
    return n.contains(e, a.VIDEO);
  }
  function c(e) {
    return n.contains(e, a.AUDIO);
  }
  function h(e) {
    return n.contains(e, a.CHAT);
  }
  function p(e) {
    return l(e) || c(e) || h(e);
  }
  var n = e("lodash-compat"), r = e("swx-constants").COMMON, i = e("swx-enums"), s = e("ui/viewModels/calling/helpers/callingFacade"), o = e("ui/telemetry/actions/actionNames"), u = e("swx-service-locator-instance").default, a = r.modalityType, f = r.api.modality.errorMessages;
  t.startModalities = function (e, t, a) {
    function g() {
      n.isFunction(t) && t();
    }
    function y(e) {
      if (n.isFunction(a))
        try {
          a(e);
        } catch (t) {
        }
    }
    function b(e) {
      e.start.enabled.reason === i.callingNotSupportedReasons.PluginNotInstalled ? w(e === v.videoService) : m = f.MODALITY_START_FAILED;
    }
    function w(e) {
      var t = u.resolve(r.serviceLocator.ACTION_TELEMETRY), n = e ? o.audioVideo.apiVideoCall : o.audioVideo.apiAudioCall;
      t.recordAction(n);
      s.placeCall(v, e, "integrationAPI");
    }
    var d = e.modalities, v = e.conversation, m = "";
    if (!d || n.isEmpty(d)) {
      g();
      return;
    }
    if (!n.isArray(d)) {
      y(f.INVALID_MODALITIES);
      return;
    }
    if (!p(d)) {
      y(f.MODALITY_TYPE_NOT_SUPPORTED);
      return;
    }
    l(d) && (v.videoService.start.enabled() ? v.videoService.start() : b(v.videoService));
    c(d) && (v.audioService.start.enabled() ? v.audioService.start() : b(v.audioService));
    h(d) && v.chatService.start.enabled() && e.startChatService && v.chatService.start();
    m === "" ? g() : y(m);
  };
});
