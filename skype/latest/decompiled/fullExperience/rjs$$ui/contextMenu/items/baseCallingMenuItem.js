define("ui/contextMenu/items/baseCallingMenuItem", [
  "require",
  "ui/contextMenu/menuItem",
  "swx-service-locator-instance",
  "swx-constants",
  "swx-enums",
  "ui/viewModels/calling/helpers/callingFacade",
  "ui/modelHelpers/personHelper",
  "swx-cafe-application-instance",
  "ui/modelHelpers/conversationHelper"
], function (e) {
  function f(e, o, f, c, h, p) {
    function m(e) {
      return !v.getCallingService(e).start.enabled() && v.getCallingService(e).start.enabled.reason === i.callingNotSupportedReasons.PluginNotInstalled;
    }
    function g() {
      var e = n.resolve(r.serviceLocator.MODEL_UI_OBSERVER).conversationsCallStateObserver;
      return e.activeCalls().length > 0;
    }
    function y() {
      function i() {
        return v.setCallingServiceEndpoint(t), s.placeCall(t, v.isVideoCall(), h, !0);
      }
      function o() {
        var e = n.resolve(r.serviceLocator.ACTION_TELEMETRY);
        p = p || { source: v.getDefaultTelemetrySource() };
        v.addTelemetryContextData(p);
        e.recordAction(v.getTelemetryActionName(), p);
      }
      var e, t;
      return o(), v.sendFeatureTelemetry(), e = u.get().conversationsManager, t = e.getConversation(d), e.conversations.add(t), i();
    }
    var d, v = this;
    t.call(v, e, o, y);
    d = c.getPerson();
    v.cssClass = f;
    v.featuresAreEnabled = function () {
      return !1;
    };
    v.mePersonHasCallingCapability = function () {
      return !1;
    };
    v.conversationHasCallingCapability = function (e) {
      return v.getCallingService(e).start.enabled();
    };
    v.personHasSkypeCallingCapability = function () {
      return !1;
    };
    v.getCallingService = function () {
    };
    v.isVideoCall = function () {
      return !1;
    };
    v.getDefaultTelemetrySource = function () {
    };
    v.getTelemetryActionName = function () {
    };
    v.addTelemetryContextData = function () {
    };
    v.sendFeatureTelemetry = function () {
    };
    v.setCallingServiceEndpoint = function (e) {
      var t = n.resolve(r.serviceLocator.FEATURE_FLAGS);
      if (t.isFeatureOn(r.featureFlags.PSTN_ENABLED)) {
        var i = e.participants(0);
        i.audio.endpoint(i.person.id());
      }
    };
    v.isEnabled = function () {
      var e = a.getExistingConversationWithPerson(d);
      return !v.featuresAreEnabled() || l() || d.isBlocked() || !v.personHasSkypeCallingCapability(d) || g() ? !1 : !e || m(e) ? !0 : v.conversationHasCallingCapability(e) && v.mePersonHasCallingCapability();
    };
  }
  function l() {
    return o.isGuest(u.get().personsAndGroupsManager.mePerson);
  }
  var t = e("ui/contextMenu/menuItem"), n = e("swx-service-locator-instance").default, r = e("swx-constants").COMMON, i = e("swx-enums"), s = e("ui/viewModels/calling/helpers/callingFacade"), o = e("ui/modelHelpers/personHelper"), u = e("swx-cafe-application-instance"), a = e("ui/modelHelpers/conversationHelper");
  return f.prototype = Object.create(t.prototype), f;
});
