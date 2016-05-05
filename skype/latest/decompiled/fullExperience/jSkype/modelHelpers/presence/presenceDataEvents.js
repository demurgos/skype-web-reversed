define("jSkype/modelHelpers/presence/presenceDataEvents", [
  "require",
  "constants/common",
  "jSkype/constants/events",
  "jSkype/modelHelpers/presence/presenceDataHandler",
  "jSkype/services/internalPubSub"
], function (e) {
  function o(e) {
    return e.resourceType.toLowerCase() === n.resourceTypes.USER_PRESENCE;
  }
  var t = e("constants/common"), n = e("jSkype/constants/events"), r = e("jSkype/modelHelpers/presence/presenceDataHandler"), i = e("jSkype/services/internalPubSub"), s = {
      init: function () {
        function u(e) {
          function r(e) {
            o(e) && (s.onPresence(e.resource), n++);
          }
          var t = e.eventMessages, n = 0;
          t ? (t.forEach(r), s.onBatchPresenceUpdated(n)) : a(e);
        }
        function a(e) {
          var t = e.actionName.toLowerCase(), r = n.actions;
          if (t === r.subscriptionCreation)
            return s.onServiceStarted();
          if (t === r.setUserPresence)
            return s.onMePresenceSet(e);
          if (t === r.getSelfProperties)
            return s.onSelfProperties(e);
        }
        var e = i.get(), s = r.build();
        e.subscribe("webapi:data", u), e.subscribe("webapi:error", s.onServiceError), e.subscribe("contacts:loaded", s.onInitialContacts), e.subscribe(t.events.system.ONLINE_STATE_CHANGED, s.onOnlineStateChanged);
      }
    };
  return s;
})
