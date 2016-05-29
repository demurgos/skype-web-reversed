define("experience/api/conversation", [
  "require",
  "exports",
  "module",
  "experience/api/helpers/conversation",
  "experience/api/helpers/modality",
  "ui/modelHelpers/conversationHelper",
  "constants/common",
  "constants/components",
  "experience/settings",
  "services/serviceLocator",
  "services/pubSub/pubSub",
  "experience/api/helpers/contentNavigatorStore"
], function (e, t) {
  function c(e, t) {
    return new Promise(function (r, i) {
      function f(t) {
        var n = a.resolve(s.serviceLocator.CONTROLS_BUILDER);
        n.build(u.controls.content.toLowerCase(), e);
        r(t);
      }
      function c(e) {
        i(e);
      }
      var o = t && t.modalities ? t.modalities : null;
      if (!e) {
        c(s.api.renderConversation.errorMessages.CONTAINER_UNDEFINED);
        return;
      }
      if (!(typeof e == "string" || e instanceof Node)) {
        c(s.api.renderConversation.errorMessages.CONTAINER_NOT_ELEMENT_NOT_SELECTOR);
        return;
      }
      l.add(e);
      if (!t || !t.participants && !t.conversationId) {
        h(o, e, f, c);
        return;
      }
      if (t.participants) {
        Array.isArray(t.participants) ? n.startConversation(t.participants, o, f, c, e) : c(s.api.renderConversation.errorMessages.PARTICIPANTS_WRONG_FORMAT);
        return;
      }
      t.conversationId && (typeof t.conversationId == "string" ? n.joinConversation(t.conversationId, o, f, c, !1, e) : c(s.api.renderConversation.errorMessages.CONVERSATION_ID_WRONG_FORMAT));
    });
  }
  function h(e, t, n, s) {
    function a() {
      var e = l.get(t);
      e && e.navigateToConversation(o);
      n(o);
    }
    var o = i.createConversation([], !0), u = {
        modalities: e,
        conversation: o
      };
    r.startModalities(u, a, s);
  }
  var n = e("experience/api/helpers/conversation"), r = e("experience/api/helpers/modality"), i = e("ui/modelHelpers/conversationHelper"), s = e("constants/common"), o = e("constants/components"), u = e("experience/settings"), a = e("services/serviceLocator"), f = e("services/pubSub/pubSub"), l = e("experience/api/helpers/contentNavigatorStore");
  t.newConversation = function () {
    var e = {
      page: o.chat.NEW_CONVERSATION,
      origin: s.telemetry.historyLoadOrigin.NEW_CONVERSATION_API
    };
    f.publish(s.events.navigation.NAVIGATE, e);
  };
  t.startConversation = function (e, t, r, i) {
    n.startConversation(e, t, r, i);
  };
  t.joinConversation = function (e, t, r, i) {
    var o = a.resolve(s.serviceLocator.FEATURE_FLAGS);
    o.isFeatureOn(s.featureFlags.SYNC_THREAD_BEFORE_JOIN_CONVERSATION_FLOW_ENABLED) ? n.joinConversation(e, t, r, i, !0) : n.joinConversation(e, t, r, i, !1);
  };
  t.renderConversation = function (e, t) {
    return c(e, t);
  };
});
