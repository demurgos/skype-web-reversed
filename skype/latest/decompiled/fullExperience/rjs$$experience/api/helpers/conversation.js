define("experience/api/helpers/conversation", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "cafe/applicationInstance",
  "experience/api/auth/authEventHandler",
  "experience/api/helpers/modality",
  "experience/api/error",
  "ui/modelHelpers/conversationHelper",
  "swx-enums",
  "constants/common",
  "telemetry/chat/conversationJoined",
  "experience/api/helpers/conversationsSynchronizer",
  "experience/api/helpers/conversationFacade",
  "experience/settings",
  "services/serviceLocator",
  "experience/api/helpers/contentNavigatorStore"
], function (e, t) {
  function g(e, t, r) {
    if (!n.isFunction(t))
      return;
    try {
      t(S(e));
    } catch (i) {
      y(r, m.SUCCESS_CALLBACK_ERROR);
    }
  }
  function y(e, t) {
    n.isFunction(e) && e(o(t));
  }
  function b(e) {
    var t = d.resolve(f.serviceLocator.FEATURE_FLAGS), n;
    if (!t.isFeatureOn(f.featureFlags.SINGLE_CONVERSATION_MODE))
      return;
    i.deferActionOnSplashscreen(function (e) {
      n = d.resolve(f.serviceLocator.PUBSUB), n.publish(f.apiUIEvents.SWX_SINGLE_CONVERSATION, e);
    }, e);
  }
  function w(e, t, r) {
    if (!n.isFunction(t))
      return;
    try {
      t(S(e)), b();
    } catch (i) {
      E(r, m.SUCCESS_CALLBACK_ERROR);
    }
  }
  function E(e, t) {
    try {
      b(t);
    } catch (n) {
    }
    l.get().onJoinConversationError(t), y(e, t);
  }
  function S(e) {
    return p.API.version === 2 ? e : h.build(e);
  }
  function x(e) {
    var t, n = a.searchScope.All;
    return t = e.map(function (e) {
      var t = r.get().personsAndGroupsManager.createPersonSearchQuery();
      return new Promise(function (r, i) {
        function s() {
          t.results().length ? r(t.results(0).result) : i();
        }
        t.sources(n).keywords.id = e, t.getMore().then(s, i);
      });
    }), Promise.all(t);
  }
  var n = e("lodash-compat"), r = e("cafe/applicationInstance"), i = e("experience/api/auth/authEventHandler"), s = e("experience/api/helpers/modality"), o = e("experience/api/error").asApiError, u = e("ui/modelHelpers/conversationHelper"), a = e("swx-enums"), f = e("constants/common"), l = e("telemetry/chat/conversationJoined"), c = e("experience/api/helpers/conversationsSynchronizer"), h = e("experience/api/helpers/conversationFacade"), p = e("experience/settings"), d = e("services/serviceLocator"), v = e("experience/api/helpers/contentNavigatorStore"), m = f.api.conversation.errorMessages;
  t.startConversation = function (e, t, n, r, i) {
    function f(e, a) {
      var f = u.createConversation(e, a), l = {
          modalities: t,
          conversation: f
        }, c = v.get(i);
      s.startModalities(l, function () {
        c && c.navigateToConversation(f), g(f, n, r);
      }, o);
    }
    var o = y.bind(null, r), a;
    if (!Array.isArray(e)) {
      o(m.URI_NOT_VALID);
      return;
    }
    if (e.length === 0) {
      f([], !0);
      return;
    }
    a = p.startConversationMaxParticipantCount, a > 0 && e.length > a && (e = e.slice(0, a));
    if (p.authentication && p.authentication.anonymousMode) {
      f(e);
      return;
    }
    x(e).then(function (e) {
      f(e);
    }, function () {
      o(m.SEARCH_FAILED);
    }).catch(o);
  }, t.joinConversation = function (e, t, i, o, u, a) {
    function p(e) {
      var n = {
          modalities: t,
          conversation: e,
          startChatService: !0
        }, r = v.get(a);
      s.startModalities(n, function () {
        r && r.navigateToConversation(e), w(e, i, o);
      }, f);
    }
    var f = E.bind(null, o), h = r.get().conversationsManager;
    if (!n.isString(e)) {
      f(m.URI_NOT_VALID);
      return;
    }
    r.get().personsAndGroupsManager.mePerson.id.get().then(function (t) {
      l.get().onJoinConversation({
        uri: e,
        prefix: t
      }), c.sync().then(function () {
        if (u)
          h._getConversationByUri(e).then(p).catch(f);
        else
          try {
            var t = h.getConversationByUri(e);
            p(t);
          } catch (n) {
            f(n);
          }
      });
    }).catch(f);
  };
})
