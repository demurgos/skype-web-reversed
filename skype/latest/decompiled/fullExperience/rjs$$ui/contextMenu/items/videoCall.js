define("ui/contextMenu/items/videoCall", [
  "require",
  "ui/contextMenu/items/baseCallingMenuItem",
  "swx-i18n",
  "swx-service-locator-instance",
  "swx-constants",
  "ui/telemetry/actions/actionNames",
  "ui/telemetry/actions/actionSources",
  "constants/cssClasses",
  "swx-cafe-application-instance"
], function (e) {
  function f(e, l, c) {
    var h, p, d = this;
    h = n.fetch({ key: "label_text_call_skype_video" });
    p = u.contextMenu.items.VIDEO_CALL;
    t.call(d, f.TYPE, h, p, e, l, c);
    d.featuresAreEnabled = function () {
      var e = r.resolve(i.serviceLocator.FEATURE_FLAGS);
      return e.isFeatureOn(i.featureFlags.CALLING);
    };
    d.mePersonHasCallingCapability = function () {
      return a.get().personsAndGroupsManager.mePerson.capabilities.video();
    };
    d.personHasSkypeCallingCapability = function (e) {
      return e.capabilities.video();
    };
    d.getCallingService = function (e) {
      return e.videoService;
    };
    d.isVideoCall = function () {
      return !0;
    };
    d.getDefaultTelemetrySource = function () {
      return o.contextMenuItem.videoCall;
    };
    d.getTelemetryActionName = function () {
      return s.audioVideo.videoCall;
    };
  }
  var t = e("ui/contextMenu/items/baseCallingMenuItem"), n = e("swx-i18n").localization, r = e("swx-service-locator-instance").default, i = e("swx-constants").COMMON, s = e("ui/telemetry/actions/actionNames"), o = e("ui/telemetry/actions/actionSources"), u = e("constants/cssClasses"), a = e("swx-cafe-application-instance");
  return f.prototype = Object.create(t.prototype), f.TYPE = "VideoCallMenuItem", f;
});
