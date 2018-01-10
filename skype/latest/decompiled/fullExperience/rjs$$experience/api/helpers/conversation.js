define("experience/api/helpers/conversation", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "swx-cafe-application-instance",
  "experience/api/auth/authEventHandler",
  "experience/api/helpers/modality",
  "experience/api/error",
  "swx-utils-chat",
  "swx-enums",
  "swx-constants",
  "telemetry/chat/conversationJoined",
  "experience/api/helpers/conversationsSynchronizer",
  "experience/api/helpers/conversationFacade",
  "experience/settings",
  "swx-service-locator-instance",
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
      n = d.resolve(f.serviceLocator.PUBSUB);
      n.publish(f.apiUIEvents.SWX_SINGLE_CONVERSATION, e);
    }, e);
  }
  function w(e, t, r) {
    var i = d.resolve(f.serviceLocator.PUBSUB);
    i.publish(f.apiUIEvents.SWX_CHAT_LOADED);
    if (!n.isFunction(t))
      return;
    try {
      t(S(e));
      b();
    } catch (s) {
      E(r, m.SUCCESS_CALLBACK_ERROR);
    }
  }
  function E(e, t) {
    if (t instanceof XMLHttpRequest) {
      var n;
      t.status === 0 ? n = "Timeout while joining converstation" : n = t.response;
      t = new Error(n);
    }
    try {
      b(t);
    } catch (r) {
    }
    l.get().onJoinConversationError(t);
    y(e, t);
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
        e.substring(0, 4) === "tel:" ? (t.sources(n), t.text(e)) : t.sources(n).keywords.id = e;
        t.getMore().then(s, i);
      });
    }), Promise.all(t);
  }
  var n = e("lodash-compat"), r = e("swx-cafe-application-instance"), i = e("experience/api/auth/authEventHandler"), s = e("experience/api/helpers/modality"), o = e("experience/api/error").asApiError, u = e("swx-utils-chat").conversation, a = e("swx-enums"), f = e("swx-constants").COMMON, l = e("telemetry/chat/conversationJoined"), c = e("experience/api/helpers/conversationsSynchronizer"), h = e("experience/api/helpers/conversationFacade"), p = e("experience/settings"), d = e("swx-service-locator-instance").default, v = e("experience/api/helpers/contentNavigatorStore"), m = f.api.conversation.errorMessages;
  t.startConversation = function (e, t, n, i, o) {
    function l(e, f) {
      var l = r.get().conversationsManager, c = u.createConversation(e, l, f), h = {
          modalities: t,
          conversation: c
        }, p = v.get(o);
      s.startModalities(h, function () {
        p && p.navigateToConversation(c);
        g(c, n, i);
      }, a);
    }
    var a = y.bind(null, i), f;
    if (!Array.isArray(e)) {
      a(m.URI_NOT_VALID);
      return;
    }
    if (e.length === 0) {
      l([], !0);
      return;
    }
    f = p.startConversationMaxParticipantCount;
    f > 0 && e.length > f && (e = e.slice(0, f));
    if (p.authentication && p.authentication.anonymousMode) {
      l(e);
      return;
    }
    x(e).then(function (e) {
      l(e);
    }, function () {
      a(m.SEARCH_FAILED);
    }).catch(a);
  };
  t.joinConversation = function (e, t, i, o, u, a) {
    function d(e) {
      var n = {
          modalities: t,
          conversation: e,
          startChatService: !0
        }, r = v.get(a);
      s.startModalities(n, function () {
        r && r.navigateToConversation(e);
        w(e, i, o);
      }, f);
    }
    var f = E.bind(null, o), h = r.get().conversationsManager;
    if (!n.isString(e)) {
      f(m.URI_NOT_VALID);
      return;
    }
    try {
      r.get().personsAndGroupsManager.mePerson.id.get().then(function (t) {
        l.get().onJoinConversation({
          uri: e,
          prefix: t
        });
        c.sync().then(function () {
          if (u)
            h._getConversationByUri(e).then(d).catch(f);
          else {
            var t = h.getConversationByUri(e);
            d(t);
          }
        }).catch(f);
      }).catch(f);
    } catch (p) {
      f(p);
    }
  };
});
