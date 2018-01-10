(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-ui-navigation/lib/navigation", [
      "require",
      "exports",
      "swx-browser-globals",
      "swx-skypeuri-parser",
      "swx-pubsub-instance",
      "swx-constants",
      "swx-cafe-application-instance",
      "swx-service-locator-instance",
      "swx-utils-chat",
      "swx-enums"
    ], e);
}(function (e, t) {
  function l(e, t) {
    var n = u["default"].resolve(s.COMMON.serviceLocator.FEATURE_FLAGS), r = n.isFeatureOn(s.COMMON.featureFlags.SKYPE_URI_NAVIGATION_ENABLED);
    return r && e.indexOf("skype:") === 0 ? c(e, t) : h(e);
  }
  function c(e, t) {
    var n = r.parse(e);
    if (n)
      switch (n.activityType) {
      case r.ActivityType.Call:
        return d(n, t, n.activityParameters.video);
      case r.ActivityType.Chat:
        return p(n);
      case r.ActivityType.Navigate:
        return v(n);
      }
  }
  function h(e) {
    var t = n.getWindow(), r = t.open();
    return r.opener = null, r.location.href = e, Promise.resolve();
  }
  function p(e) {
    return m(e.participants).then(function (e) {
      if (e.length) {
        var t = a.conversation.createConversation(e, o.get().conversationsManager), n = {
            model: t,
            origin: e.length === 1 ? s.COMMON.telemetry.navigation.ONE_TO_ONE_CHAT_SKYPE_URI : s.COMMON.telemetry.navigation.GROUP_CHAT_SKYPE_URI
          };
        i["default"].publish(s.COMMON.events.navigation.OPEN_CONVERSATION, n);
      }
    });
  }
  function d(e, t, n) {
    return new Promise(function (r) {
      m(e.participants).then(function (e) {
        var i = e.length === 1 ? s.COMMON.telemetry.navigation.ONE_TO_ONE_CALL_SKYPE_URI : s.COMMON.telemetry.navigation.GROUP_CALL_SKYPE_URI;
        if (!t || !e.length)
          r();
        else {
          var u = a.conversation.createConversation(e, o.get().conversationsManager);
          u._conversationIdReady && u._conversationIdReady.once(!0, function () {
            t.placeCall(u, n, i).then(r, r);
          });
        }
      });
    });
  }
  function v(e) {
    return m(e.participants).then(function (t) {
      if (!!e.navigationId) {
        var n = {
          page: e.navigationId,
          origin: s.COMMON.telemetry.historyLoadOrigin.SKYPE_URI
        };
        i["default"].publish(s.COMMON.events.navigation.NAVIGATE, n);
      }
    });
  }
  function m(e) {
    var t = e.map(function (e) {
      var t = o.get().personsAndGroupsManager.createPersonSearchQuery();
      return new Promise(function (n) {
        function r() {
          t.results().length && n(t.results(0).result);
        }
        t.sources(f.searchScope.All);
        t.text(e);
        t.getMore().then(r);
      });
    });
    return Promise.all(t);
  }
  var n = e("swx-browser-globals"), r = e("swx-skypeuri-parser"), i = e("swx-pubsub-instance"), s = e("swx-constants"), o = e("swx-cafe-application-instance"), u = e("swx-service-locator-instance"), a = e("swx-utils-chat"), f = e("swx-enums");
  t.navigate = l;
}));
