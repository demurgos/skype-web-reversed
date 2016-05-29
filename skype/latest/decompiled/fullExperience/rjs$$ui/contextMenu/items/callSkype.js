define("ui/contextMenu/items/callSkype", [
  "require",
  "ui/contextMenu/items/baseCallingMenuItem",
  "swx-i18n",
  "services/serviceLocator",
  "constants/common",
  "ui/telemetry/actions/actionNames",
  "ui/telemetry/actions/actionSources",
  "constants/cssClasses",
  "ui/modelHelpers/personHelper",
  "cafe/applicationInstance"
], function (e) {
  function l(e, c, h) {
    var p, d, v = this;
    p = n.fetch({ key: "label_text_call_skype_audio" });
    d = u.contextMenu.items.CALL_SKYPE;
    t.call(v, l.TYPE, p, d, e, c, h);
    v.featuresAreEnabled = function () {
      var e = r.resolve(i.serviceLocator.FEATURE_FLAGS);
      return e.isFeatureOn(i.featureFlags.CALLING);
    };
    v.mePersonHasCallingCapability = function () {
      return f.get().personsAndGroupsManager.mePerson.capabilities.audio();
    };
    v.personHasSkypeCallingCapability = function (e) {
      return !a.isPstn(e) && e.capabilities.audio();
    };
    v.getCallingService = function (e) {
      return e.audioService;
    };
    v.getDefaultTelemetrySource = function () {
      return o.contextMenuItem.callSkype;
    };
    v.getTelemetryActionName = function () {
      return s.audioVideo.audioCall;
    };
  }
  var t = e("ui/contextMenu/items/baseCallingMenuItem"), n = e("swx-i18n").localization, r = e("services/serviceLocator"), i = e("constants/common"), s = e("ui/telemetry/actions/actionNames"), o = e("ui/telemetry/actions/actionSources"), u = e("constants/cssClasses"), a = e("ui/modelHelpers/personHelper"), f = e("cafe/applicationInstance");
  return l.prototype = Object.create(t.prototype), l.TYPE = "CallSkypeMenuItem", l;
});
