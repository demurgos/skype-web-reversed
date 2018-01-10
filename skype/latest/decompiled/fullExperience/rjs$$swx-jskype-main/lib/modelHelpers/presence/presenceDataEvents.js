(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/modelHelpers/presence/presenceDataEvents", [
      "require",
      "exports",
      "swx-constants",
      "jskype-constants",
      "./presenceDataHandler",
      "../../services/internalPubSub"
    ], e);
}(function (e, t) {
  function o() {
    function o(e) {
      function i(e) {
        u(e) && (t.onPresence(e.resource), r++);
      }
      var n = e.eventMessages, r = 0;
      n ? (n.forEach(i), t.onBatchPresenceUpdated(r)) : a(e);
    }
    function a(e) {
      var n = e.actionName.toLowerCase(), i = r.EVENTS.actions;
      if (n === i.subscriptionCreation)
        return t.onServiceStarted();
      if (n === i.setUserPresence)
        return t.onMePresenceSet(e);
      if (n === i.getSelfProperties)
        return t.onSelfProperties(e);
    }
    var e = s.get(), t = i.build();
    e.subscribe("webapi:data", o);
    e.subscribe("webapi:error", t.onServiceError);
    e.subscribe("contacts:loaded", t.onInitialContacts);
    e.subscribe(n.COMMON.events.system.ONLINE_STATE_CHANGED, t.onOnlineStateChanged);
  }
  function u(e) {
    return e.resourceType.toLowerCase() === r.EVENTS.resourceTypes.USER_PRESENCE;
  }
  var n = e("swx-constants"), r = e("jskype-constants"), i = e("./presenceDataHandler"), s = e("../../services/internalPubSub");
  t.init = o;
}));
