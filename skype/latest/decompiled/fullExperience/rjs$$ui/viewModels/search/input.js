define("ui/viewModels/search/input", [
  "require",
  "vendor/knockout",
  "swx-constants",
  "swx-service-locator-instance",
  "swx-constants",
  "utils/common/eventHelper",
  "swx-i18n",
  "swx-enums",
  "browser/window",
  "utils/common/applicationFocusManager",
  "ui/telemetry/actions/actionSources",
  "ui/telemetry/people/contactSearch",
  "ui/telemetry/people/contactSearchSession",
  "utils/common/accessibility"
], function (e) {
  function b() {
    function L() {
      e.isEnabled(!0);
    }
    function A() {
      e.isEnabled(!1);
      e.resetQuery();
    }
    function O(e) {
      return w ? e + "_4b" : e;
    }
    function M(t) {
      e.query() && t && e.showMoreResultsAvailableMessage(N && t.moreResultsAvailable);
    }
    function _(t) {
      t.length === 0 && (e.directorySearchActive = !1);
    }
    function D() {
      S = {
        people: null,
        groups: null,
        SkypeDirectory: null
      };
    }
    function P() {
      var t = e.query(), n = { source: t === d ? l.search.reset.emptyQuery : l.search.reset.queryChanged }, r = H(n.source);
      F(r);
      t === d ? (b.publish(v.RESET, n), e.directorySearchActive = !1) : (x.queryCount = x === null ? 1 : x.queryCount + 1, B(r), j(), b.publish(v.QUERY_CHANGED, t));
      e.showSpinner(e.directorySearchActive);
      D();
    }
    function H(t) {
      var n = {
        searchScope: e.directorySearchActive ? u.searchScope.SkypeDirectory : u.searchScope.AddressBook,
        resultCount: e.directorySearchActive ? S.SkypeDirectory : S.people,
        source: t
      };
      return n.success = n.resultCount !== null, n;
    }
    function B(e) {
      c.onContactSearchStart();
      k = a.setTimeout(function () {
        c.onContactSearchEnd(e);
        k = null;
      }, y);
    }
    function j() {
      x.searchTimeoutHandle || (h.onSearchSessionStart(), x.searchTimeoutHandle = a.setTimeout(function () {
        h.onSearchSessionEnd({
          success: !1,
          queryCount: x.queryCount
        });
        x.queryCount = null;
        x.searchTimeoutHandle = null;
      }, y));
    }
    function F(e) {
      c.onContactSearchEnd(e);
      k && a.clearTimeout(k);
    }
    function I(t) {
      t ? b.publish(v.INPUT_FOCUS) : b.publish(v.INPUT_BLUR, e.query().length);
    }
    function q(t) {
      t || e.hasFocus(!1);
    }
    function R() {
      e.hasFocus(!0);
    }
    function U() {
      var t = "";
      e.directorySearchActive ? S.people === 0 && S.groups === 0 && S.SkypeDirectory === 0 ? t = o.fetch({ key: "accessibility_totalSearchNoResults" }) : S.SkypeDirectory !== null && (t = o.fetch({
        key: "accessibility_totalSearchUpdated",
        params: {
          totalSearchResults: S.people + S.groups + S.SkypeDirectory,
          peopleSearchResults: S.people,
          groupsSearchResults: S.groups,
          SkypeDirectorySearchResults: S.SkypeDirectory
        },
        count: S.people + S.groups + S.SkypeDirectory
      })) : S.people === 0 && S.groups === 0 && !C ? t = o.fetch({ key: O("accessibility_localSearchNoResults") }) : S.people === 0 && S.groups === 0 && C ? t = o.fetch({ key: O("accessibility_localSearchNoResults") }) + o.fetch({ key: "accessibility_searchSkypeDirectory" }) : S.people !== null && S.groups !== null && (t = o.fetch({
        key: O("accessibility_localSearchUpdated"),
        params: {
          totalSearchResults: S.people + S.groups,
          peopleSearchResults: S.people,
          groupsSearchResults: S.groups
        },
        count: S.people + S.groups
      }));
      t !== "" && p.announce(t);
    }
    function z(e) {
      S.people = e;
      U();
    }
    function W(e) {
      S.groups = e;
      U();
    }
    function X(e) {
      e && p.announce({ key: "accessibility_searching" });
    }
    function V(e) {
      x.queryCount !== null && (h.onSearchSessionEnd({
        success: !0,
        queryCount: x.queryCount,
        successCriteria: e.successCriteria,
        source: e.source
      }), a.clearTimeout(x.searchTimeoutHandle), x.queryCount = null, x.searchTimeoutHandle = null);
    }
    var e = this, b = r.resolve(n.serviceLocator.PUBSUB), w, E = {
        inputFocus: null,
        inputValue: null,
        showSpinner: null,
        searchResults: null
      }, S = {
        people: null,
        groups: null,
        SkypeDirectory: null
      }, x = {
        searchTimeoutHandle: null,
        queryCount: null
      }, T = [
        i.UP,
        i.DOWN,
        i.PAGE_UP,
        i.PAGE_DOWN,
        i.ENTER,
        i.F10
      ], N, C, k;
    e.inputAriaLabel = t.observable("");
    e.hasFocus = t.observable(!1);
    e.isEnabled = t.observable(!1);
    e.showSpinner = t.observable(!1);
    e.directorySearchActive = !1;
    e.query = t.observable(d).extend({
      rateLimit: {
        method: "notifyWhenChangesStop",
        timeout: 500
      }
    });
    e.init = function () {
      var i = r.resolve(n.serviceLocator.FEATURE_FLAGS);
      N = i.isFeatureOn(n.featureFlags.SHOW_SEARCH_QUERY_MORE_RESULTS_AVAILABLE);
      C = i.isFeatureOn(n.featureFlags.SKYPE_DIRECTORY_SEARCH);
      w = i.isFeatureOn(n.featureFlags.USE_BUSINESS_WORDING);
      b.subscribe(v.DIRECTORY_SEARCH_ACTIVATED, e.onDirectorySearchActivated);
      b.subscribe(v.DIRECTORY_SEARCH_RESULTS, e.onDirectorySearchResults);
      b.subscribe(v.GROUPS_SEARCH_RESULTS, W);
      b.subscribe(v.LOCAL_SEARCH_RESULTS, z);
      b.subscribe(v.RESET, e.onReset);
      b.subscribe(g.SIDEBAR_STATE_CHANGED, q);
      b.subscribe(v.QUERY_EXECUTED, M);
      b.subscribe(m.SWX_TIMELINE_LOADED, L);
      b.subscribe(m.SWX_ON_SIGN_OUT, A);
      b.subscribe(v.SESSION_SUCCESS, V);
      b.subscribe(n.events.navigation.NAVIGATE_TO_SEARCH_INPUT, R);
      E.inputFocus = e.hasFocus.subscribe(I);
      E.inputValue = e.query.subscribe(P);
      E.searchResults = e.query.subscribe(_);
      E.showSpinner = e.showSpinner.subscribe(X);
      e.showMoreResultsAvailableMessage = t.observable(!1);
      e.inputAriaLabel(o.fetch({ key: O("input_searchSkype_ariaLabel") }));
    };
    e.dispose = function () {
      b.unsubscribe(v.DIRECTORY_SEARCH_ACTIVATED, e.onDirectorySearchActivated);
      b.unsubscribe(v.DIRECTORY_SEARCH_RESULTS, e.onDirectorySearchResults);
      b.unsubscribe(v.GROUPS_SEARCH_RESULTS, W);
      b.unsubscribe(v.LOCAL_SEARCH_RESULTS, z);
      b.unsubscribe(v.RESET, e.onReset);
      b.unsubscribe(g.SIDEBAR_STATE_CHANGED, q);
      b.unsubscribe(v.QUERY_EXECUTED, M);
      b.unsubscribe(m.SWX_TIMELINE_LOADED, L);
      b.unsubscribe(m.SWX_ON_SIGN_OUT, A);
      b.unsubscribe(v.SESSION_SUCCESS, V);
      E.inputFocus.dispose();
      E.inputValue.dispose();
      E.searchResults.dispose();
      E.showSpinner.dispose();
    };
    e.onDirectorySearchActivated = function () {
      e.directorySearchActive = !0;
      S.people && (c.onContactSearchEnd({
        searchScope: u.searchScope.AddressBook,
        resultCount: S.people,
        success: !0,
        source: l.search.reset.directoryActivated
      }), c.onContactSearchStart());
      X(e.directorySearchActive);
    };
    e.onDirectorySearchResults = function (t) {
      S.SkypeDirectory = t;
      e.hasFocus(!0);
      e.showSpinner(!1);
      U();
    };
    e.activateDirectorySearch = function () {
      b.publish(v.ACTIVATE_DIRECTORY_SEARCH);
    };
    e.onKeyDown = function (t, n) {
      var r = s.getKeyCode(n);
      if (r === i.ESCAPE) {
        if (e.query()) {
          var o = { source: l.search.reset.escapeKey };
          b.publish(v.RESET, o);
          e.hasFocus(!0);
          n.stopPropagation();
          return;
        }
        e.hasFocus(!1);
        n.stopPropagation();
        f.removeLastFocusedElement();
        f.tryRestoreFocus();
        return;
      }
      if (T.indexOf(r) > -1) {
        if (r === i.ENTER && (S.people === null || S.groups === null))
          return !1;
        (r === i.UP || r === i.DOWN || r === i.ENTER) && s.swallow(n);
      }
      return !0;
    };
    e.resetQuery = function (t, n) {
      var r = { source: l.search.reset.resetXButton };
      e.hasFocus(!0);
      b.publish(v.RESET, r);
      n && n.preventDefault();
    };
    e.onReset = function () {
      e.query(d);
      e.showMoreResultsAvailableMessage(!1);
    };
    e.setFocus = e.hasFocus.bind(null, !0);
  }
  var t = e("vendor/knockout"), n = e("swx-constants").COMMON, r = e("swx-service-locator-instance").default, i = e("swx-constants").KEYS, s = e("utils/common/eventHelper"), o = e("swx-i18n").localization, u = e("swx-enums"), a = e("browser/window"), f = e("utils/common/applicationFocusManager"), l = e("ui/telemetry/actions/actionSources"), c = e("ui/telemetry/people/contactSearch"), h = e("ui/telemetry/people/contactSearchSession"), p = e("utils/common/accessibility").narrator, d = "", v = n.events.search, m = n.apiUIEvents, g = n.events.narrowMode, y = 1800000;
  return b;
});
