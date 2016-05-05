define("ui/contextMenu/items/baseCallingMenuItem", [
  "require",
  "ui/contextMenu/menuItem",
  "services/serviceLocator",
  "constants/common",
  "swx-enums",
  "ui/viewModels/calling/helpers/callingFacade",
  "ui/modelHelpers/personHelper",
  "cafe/applicationInstance",
  "ui/controls/calling/sounds",
  "ui/modelHelpers/conversationHelper"
], function (e) {
  function l(e, o, l, h, p, d) {
    function g(e) {
      return !m.getCallingService(e).start.enabled() && m.getCallingService(e).start.enabled.reason === i.callingNotSupportedReasons.PluginNotInstalled;
    }
    function y() {
      var e = n.resolve(r.serviceLocator.MODEL_UI_OBSERVER).conversationsCallStateObserver;
      return e.activeCalls().length > 0;
    }
    function b() {
      function i() {
        return m.setCallingServiceEndpoint(t), a.playOnce(a.KEYS.CALL_DIALING), s.placeCall(t, m.isVideoCall(), p, !0);
      }
      function o() {
        var e = n.resolve(r.serviceLocator.ACTION_TELEMETRY);
        d = d || { source: m.getDefaultTelemetrySource() }, m.addTelemetryContextData(d), e.recordAction(m.getTelemetryActionName(), d);
      }
      var e, t;
      return o(), m.sendFeatureTelemetry(), e = u.get().conversationsManager, t = e.getConversation(v), i();
    }
    var v, m = this;
    t.call(m, e, o, b), v = h.getPerson(), m.cssClass = l, m.featuresAreEnabled = function () {
      return !1;
    }, m.mePersonHasCallingCapability = function () {
      return !1;
    }, m.conversationHasCallingCapability = function (e) {
      return m.getCallingService(e).start.enabled();
    }, m.personHasSkypeCallingCapability = function () {
      return !1;
    }, m.getCallingService = function () {
    }, m.isVideoCall = function () {
      return !1;
    }, m.getDefaultTelemetrySource = function () {
    }, m.getTelemetryActionName = function () {
    }, m.addTelemetryContextData = function () {
    }, m.sendFeatureTelemetry = function () {
    }, m.setCallingServiceEndpoint = function (e) {
      var t = n.resolve(r.serviceLocator.FEATURE_FLAGS);
      if (t.isFeatureOn(r.featureFlags.PSTN_ENABLED)) {
        var i = e.participants(0);
        i.audio.endpoint(i.person.id());
      }
    }, m.isEnabled = function () {
      var e = f.getExistingConversationWithPerson(v);
      return !m.featuresAreEnabled() || c() || v.isBlocked() || !m.personHasSkypeCallingCapability(v) || y() ? !1 : !e || g(e) ? !0 : m.conversationHasCallingCapability(e) && m.mePersonHasCallingCapability();
    };
  }
  function c() {
    return o.isGuest(u.get().personsAndGroupsManager.mePerson);
  }
  var t = e("ui/contextMenu/menuItem"), n = e("services/serviceLocator"), r = e("constants/common"), i = e("swx-enums"), s = e("ui/viewModels/calling/helpers/callingFacade"), o = e("ui/modelHelpers/personHelper"), u = e("cafe/applicationInstance"), a = e("ui/controls/calling/sounds"), f = e("ui/modelHelpers/conversationHelper");
  return l.prototype = Object.create(t.prototype), l;
})
