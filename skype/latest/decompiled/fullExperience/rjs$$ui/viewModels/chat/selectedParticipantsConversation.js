define("ui/viewModels/chat/selectedParticipantsConversation", [
  "require",
  "vendor/knockout",
  "swx-cafe-application-instance",
  "swx-pubsub-instance",
  "swx-constants",
  "ui/telemetry/telemetryClient",
  "experience/settings",
  "swx-constants"
], function (e) {
  function a() {
    function l(t) {
      if (a)
        try {
          a.cancel("Another search triggered");
        } catch (n) {
          s.get().sendEvent(o.telemetry.uiTenantToken, i.telemetry.promiseInvalidStateException.TYPE, {
            feature: i.telemetry.promiseInvalidStateException.feature.GROUP_SEARCH,
            exception: JSON.stringify(n)
          });
        }
      e.matchingConversations([]);
      if (t.length === 0)
        return;
      t.length === 1 ? c(t[0]) : h(t);
    }
    function c(t) {
      var r = t.getPerson(), i = n.get().conversationsManager.getConversation(r);
      e.matchingConversations([i]);
    }
    function h(t) {
      function o(e) {
        return e.id();
      }
      function u(e, t) {
        if (r.supportedKeywords().indexOf(e) < 0)
          return;
        r.keywords[e] = t;
      }
      function f() {
        if (a !== s)
          return;
        a = null;
        e.matchingConversations(r.results().map(function (e) {
          return e.result;
        }));
      }
      var r, i, s;
      i = t.map(o).join(" ");
      r = n.get().conversationsManager.createSearchQuery();
      u("participantsByIds", i);
      s = r.getMore().then(f);
      a = s;
    }
    var e = this, a, f;
    e.init = function (n) {
      f = n.contacts.subscribe(l);
      e.matchingConversations = t.observableArray();
      e.hasMatchingConversations = t.computed(function () {
        return e.matchingConversations().length > 0;
      });
    };
    e.dispose = function () {
      e.hasMatchingConversations.dispose();
      f.dispose();
    };
    e.navigateToConversation = function (e) {
      r.publish(u.navigation.OPEN_CONVERSATION, { model: e });
    };
  }
  var t = e("vendor/knockout"), n = e("swx-cafe-application-instance"), r = e("swx-pubsub-instance").default, i = e("swx-constants").COMMON, s = e("ui/telemetry/telemetryClient"), o = e("experience/settings"), u = e("swx-constants").COMMON.events;
  return a;
});
