define("experience/api/conversation", [
  "require",
  "exports",
  "module",
  "swx-cafe-application-instance",
  "experience/api/helpers/conversation",
  "experience/api/helpers/modality",
  "swx-utils-chat",
  "swx-constants",
  "constants/components",
  "experience/settings",
  "swx-service-locator-instance",
  "swx-pubsub-instance",
  "experience/api/helpers/contentNavigatorStore",
  "ui/telemetry/telemetryClient"
], function (e, t) {
  function p(e, t) {
    return new Promise(function (n, i) {
      function u(t) {
        var r = f.resolve(o.serviceLocator.CONTROLS_BUILDER);
        r.build(a.controls.content.toLowerCase(), e);
        n(t);
      }
      function l(e) {
        i(e);
      }
      var s = t && t.modalities ? t.modalities : null;
      if (!e) {
        l(o.api.renderConversation.errorMessages.CONTAINER_UNDEFINED);
        return;
      }
      if (!(typeof e == "string" || e instanceof Node)) {
        l(o.api.renderConversation.errorMessages.CONTAINER_NOT_ELEMENT_NOT_SELECTOR);
        return;
      }
      c.add(e);
      if (t && t.conversation) {
        var h = c.get(e);
        h && h.navigateToConversation(t.conversation);
        u(t.conversation);
        return;
      }
      if (!t || !t.participants && !t.conversationId) {
        d(s, e, u, l);
        return;
      }
      if (t.participants) {
        Array.isArray(t.participants) ? r.startConversation(t.participants, s, u, l, e) : l(o.api.renderConversation.errorMessages.PARTICIPANTS_WRONG_FORMAT);
        return;
      }
      t.conversationId && (typeof t.conversationId == "string" ? r.joinConversation(t.conversationId, s, u, l, !1, e) : l(o.api.renderConversation.errorMessages.CONVERSATION_ID_WRONG_FORMAT));
    });
  }
  function d(e, t, r, o) {
    function l() {
      var e = c.get(t);
      e && e.navigateToConversation(a);
      r(a);
    }
    var u = n.get().conversationsManager, a = s.createConversation([], u, !0), f = {
        modalities: e,
        conversation: a
      };
    i.startModalities(f, l, o);
  }
  function v(e, t) {
    var r = n.get().personsAndGroupsManager;
    if (r._autoBuddyFromInvite)
      return new Promise(function (n, i) {
        function s() {
          h.get().sendEvent(a.telemetry.uiTenantToken, o.telemetry.autoBuddy.SUCCESS, {});
          n();
        }
        r._autoBuddyFromInvite(e, t).then(s, i);
      });
  }
  var n = e("swx-cafe-application-instance"), r = e("experience/api/helpers/conversation"), i = e("experience/api/helpers/modality"), s = e("swx-utils-chat").conversation, o = e("swx-constants").COMMON, u = e("constants/components"), a = e("experience/settings"), f = e("swx-service-locator-instance").default, l = e("swx-pubsub-instance").default, c = e("experience/api/helpers/contentNavigatorStore"), h = e("ui/telemetry/telemetryClient");
  t.newConversation = function () {
    var e = {
      page: u.chat.NEW_CONVERSATION,
      origin: o.telemetry.historyLoadOrigin.NEW_CONVERSATION_API
    };
    l.publish(o.events.navigation.NAVIGATE, e);
  };
  t.startConversation = function (e, t, n, i) {
    r.startConversation(e, t, n, i);
  };
  t.joinConversation = function (e, t, n, i, s) {
    function a() {
      u.isFeatureOn(o.featureFlags.SYNC_THREAD_BEFORE_JOIN_CONVERSATION_FLOW_ENABLED) ? r.joinConversation(e, t, n, i, !0) : r.joinConversation(e, t, n, i, !1);
    }
    var u = f.resolve(o.serviceLocator.FEATURE_FLAGS);
    s && s.inviteId ? v(s.inviteId, e).then(a, a) : a();
  };
  t.renderConversation = function (e, t) {
    return p(e, t);
  };
});
