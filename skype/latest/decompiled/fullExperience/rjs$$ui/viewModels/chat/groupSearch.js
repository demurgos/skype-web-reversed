define("ui/viewModels/chat/groupSearch", [
  "require",
  "lodash-compat",
  "vendor/knockout",
  "utils/common/ko",
  "swx-utils-common",
  "swx-utils-common",
  "swx-cafe-application-instance",
  "swx-pubsub-instance",
  "swx-constants",
  "ui/telemetry/telemetryClient",
  "experience/settings",
  "swx-constants",
  "ui/telemetry/actions/actionSources",
  "swx-enums",
  "ui/telemetry/people/contactSearch"
], function (e) {
  var t = e("lodash-compat"), n = e("vendor/knockout"), r = e("utils/common/ko"), i = e("swx-utils-common").array, s = e("swx-utils-common").stringUtils, o = e("swx-cafe-application-instance"), u = e("swx-pubsub-instance").default, a = e("swx-constants").COMMON, f = e("ui/telemetry/telemetryClient"), l = e("experience/settings"), c = e("swx-constants").COMMON.events.search, h = e("ui/telemetry/actions/actionSources"), p = e("swx-enums"), d = e("ui/telemetry/people/contactSearch");
  return function (v, m) {
    function x(e) {
      if (e)
        try {
          e.cancel("Another search triggered");
        } catch (t) {
          f.get().sendEvent(l.telemetry.uiTenantToken, a.telemetry.promiseInvalidStateException.TYPE, {
            feature: a.telemetry.promiseInvalidStateException.feature.GROUP_SEARCH,
            exception: JSON.stringify(t)
          });
        }
    }
    function T(e) {
      function r() {
        if (S !== n)
          return;
        S = null;
        y(b.results().map(function (e) {
          return e.result;
        }));
      }
      function i(e) {
        if (e && e.message === "Canceled")
          return;
        if (g.activeSearchPromise !== n)
          return;
        d.onContactSearchEnd({
          success: !1,
          searchScope: p.searchScope.Groups
        });
      }
      var t, n;
      if (!e) {
        y([]);
        return;
      }
      return x(S), t = s.removeNonWordCharacters(e).toLowerCase(), b = o.get().conversationsManager.createSearchQuery(), N("group", !0), N("topic", t), n = b.getMore(), n.then(r, i), S = n, n;
    }
    function N(e, t) {
      if (b.supportedKeywords().indexOf(e) < 0)
        return;
      b.keywords[e] = t;
    }
    function C(e) {
      function n(e, n) {
        var r = new v(m);
        r.init(n);
        r.groupSearchResults(E);
        i.insertAt(t, e, r);
      }
      var t = g.searchResults();
      r.handleArrayChanges(t, e, n);
      g.searchResults.valueHasMutated();
    }
    function k(e) {
      var n = y(), r;
      if (!e || n.length === 0)
        return;
      return r = t.findIndex(n, function (t) {
        return t.conversationId === e.conversation.conversationId;
      }), r !== -1 ? r + 1 : undefined;
    }
    var g = this, y = n.observableArray(), b, w, E, S;
    y.subscribe(function (e) {
      E = e.length;
      u.publish(c.GROUPS_SEARCH_RESULTS, E);
    });
    this.searchResults = n.observableArray();
    this.init = function () {
      u.subscribe(c.QUERY_CHANGED, T);
      w = y.subscribe(C, null, "arrayChange");
    };
    this.dispose = function () {
      u.unsubscribe(c.QUERY_CHANGED, T);
      w && w.dispose();
    };
    this.openConversation = function (t) {
      d.onContactSearchEnd({
        searchScope: p.searchScope.Groups,
        success: !0,
        resultCount: y().length,
        clickPosition: k.call(g, t),
        source: h.search.reset.openConversation
      });
    };
  };
});
