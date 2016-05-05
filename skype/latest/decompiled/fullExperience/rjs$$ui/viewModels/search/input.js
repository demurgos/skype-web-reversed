define("ui/viewModels/search/input", [
  "require",
  "vendor/knockout",
  "utils/common/accessibility",
  "constants/common",
  "services/serviceLocator",
  "constants/keys",
  "utils/common/eventHelper",
  "swx-i18n",
  "utils/common/applicationFocusManager",
  "ui/telemetry/actions/actionSources"
], function (e) {
  function d() {
    function E() {
      e.isEnabled(!0);
    }
    function S() {
      e.isEnabled(!1), e.resetQuery();
    }
    function x(e) {
      return v ? e + "_4b" : e;
    }
    function T(t) {
      e.query() && t && e.showMoreResultsAvailableMessage(b && t.moreResultsAvailable);
    }
    function N(t) {
      t.length === 0 && (e.directorySearchActive = !1);
    }
    function C() {
      e.searchStatus(""), g = {
        people: null,
        groups: null,
        SkypeDirectory: null
      };
    }
    function k() {
      var t = e.query();
      if (t === l) {
        var n = { source: f.search.reset.emptyQuery };
        d.publish(c.RESET, n);
      } else
        e.showSpinner(e.directorySearchActive);
      C(), d.publish(c.QUERY_CHANGED, t);
    }
    function L(t) {
      t ? d.publish(c.INPUT_FOCUS) : d.publish(c.INPUT_BLUR, e.query().length);
    }
    function A(t) {
      t || e.hasFocus(!1);
    }
    function O() {
      var t = "";
      e.directorySearchActive ? g.people === 0 && g.groups === 0 && g.SkypeDirectory === 0 ? t = u.fetch({ key: "accessibility_totalSearchNoResults" }) : g.SkypeDirectory !== null && (t = u.fetch({
        key: "accessibility_totalSearchUpdated",
        params: {
          totalSearchResults: g.people + g.groups + g.SkypeDirectory,
          peopleSearchResults: g.people,
          groupsSearchResults: g.groups,
          SkypeDirectorySearchResults: g.SkypeDirectory
        },
        count: g.people + g.groups + g.SkypeDirectory
      })) : g.people === 0 && g.groups === 0 && !w ? t = u.fetch({ key: x("accessibility_localSearchNoResults") }) : g.people === 0 && g.groups === 0 && w ? t = u.fetch({ key: x("accessibility_localSearchNoResults") }) + u.fetch({ key: "accessibility_searchSkypeDirectory" }) : g.people !== null && g.groups !== null && (t = u.fetch({
        key: x("accessibility_localSearchUpdated"),
        params: {
          totalSearchResults: g.people + g.groups,
          peopleSearchResults: g.people,
          groupsSearchResults: g.groups
        },
        count: g.people + g.groups
      })), t !== "" && n.updateAriaLiveHtml(e.searchStatus, t);
    }
    function M(e) {
      g.people = e, O();
    }
    function _(e) {
      g.groups = e, O();
    }
    function D(t) {
      t ? n.updateAriaLiveHtml(e.searchStatus, u.fetch({ key: "accessibility_searching" })) : e.searchStatus("");
    }
    var e = this, d = i.resolve(r.serviceLocator.PUBSUB), v, m = {
        inputFocus: null,
        inputValue: null,
        showSpinner: null,
        searchResults: null
      }, g = {
        people: null,
        groups: null,
        SkypeDirectory: null
      }, y = [
        s.UP,
        s.DOWN,
        s.PAGE_UP,
        s.PAGE_DOWN,
        s.ENTER,
        s.F10
      ], b, w;
    e.inputAriaLabel = t.observable(""), e.hasFocus = t.observable(!1), e.isEnabled = t.observable(!1), e.showSpinner = t.observable(!1), e.directorySearchActive = !1, e.searchStatus = t.observable("").extend({
      rateLimit: {
        method: "notifyWhenChangesStop",
        timeout: 500
      }
    }), e.query = t.observable(l).extend({
      rateLimit: {
        method: "notifyWhenChangesStop",
        timeout: 500
      }
    }), e.init = function () {
      var n = i.resolve(r.serviceLocator.FEATURE_FLAGS);
      b = n.isFeatureOn(r.featureFlags.SHOW_SEARCH_QUERY_MORE_RESULTS_AVAILABLE), w = n.isFeatureOn(r.featureFlags.SKYPE_DIRECTORY_SEARCH), v = n.isFeatureOn(r.featureFlags.USE_BUSINESS_WORDING), d.subscribe(c.DIRECTORY_SEARCH_ACTIVATED, e.onDirectorySearchActivated), d.subscribe(c.DIRECTORY_SEARCH_DEACTIVATED, e.onDirectorySearchDeactivated), d.subscribe(c.DIRECTORY_SEARCH_RESULTS, e.onDirectorySearchResults), d.subscribe(c.GROUPS_SEARCH_RESULTS, _), d.subscribe(c.LOCAL_SEARCH_RESULTS, M), d.subscribe(c.RESET, e.onReset), d.subscribe(p.SIDEBAR_STATE_CHANGED, A), d.subscribe(c.QUERY_EXECUTED, T), d.subscribe(h.SWX_TIMELINE_LOADED, E), d.subscribe(h.SWX_ON_SIGN_OUT, S), m.inputFocus = e.hasFocus.subscribe(L), m.inputValue = e.query.subscribe(k), m.searchResults = e.query.subscribe(N), m.showSpinner = e.showSpinner.subscribe(D), e.showMoreResultsAvailableMessage = t.observable(!1), e.inputAriaLabel(u.fetch({ key: x("input_searchSkype_ariaLabel") }));
    }, e.dispose = function () {
      d.unsubscribe(c.DIRECTORY_SEARCH_ACTIVATED, e.onDirectorySearchActivated), d.unsubscribe(c.DIRECTORY_SEARCH_DEACTIVATED, e.onDirectorySearchDeactivated), d.unsubscribe(c.DIRECTORY_SEARCH_RESULTS, e.onDirectorySearchResults), d.unsubscribe(c.GROUPS_SEARCH_RESULTS, _), d.unsubscribe(c.LOCAL_SEARCH_RESULTS, M), d.unsubscribe(c.RESET, e.onReset), d.unsubscribe(p.SIDEBAR_STATE_CHANGED, A), d.unsubscribe(c.QUERY_EXECUTED, T), d.unsubscribe(h.SWX_TIMELINE_LOADED, E), d.unsubscribe(h.SWX_ON_SIGN_OUT, S), m.inputFocus.dispose(), m.inputValue.dispose(), m.searchResults.dispose(), m.showSpinner.dispose();
    }, e.onDirectorySearchActivated = function () {
      e.directorySearchActive = !0, D(e.directorySearchActive);
    }, e.onDirectorySearchDeactivated = function () {
      e.directorySearchActive = !1, e.showSpinner(e.directorySearchActive);
    }, e.onDirectorySearchResults = function (t) {
      g.SkypeDirectory = t, e.hasFocus(!0), e.showSpinner(!1), O();
    }, e.onKeyDown = function (t, n) {
      var r = o.getKeyCode(n);
      if (r === s.ESCAPE) {
        if (e.query()) {
          var i = { source: f.search.reset.escapeKey };
          d.publish(c.RESET, i), e.hasFocus(!0), n.stopPropagation();
          return;
        }
        e.hasFocus(!1), n.stopPropagation(), a.removeLastFocusedElement(), a.tryRestoreFocus();
        return;
      }
      if (y.indexOf(r) > -1) {
        if (r === s.ENTER && (g.people === null || g.groups === null))
          return !1;
        (r === s.UP || r === s.DOWN || r === s.ENTER) && o.swallow(n);
      }
      return !0;
    }, e.resetQuery = function () {
      var t = { source: f.search.reset.resetXButton };
      e.hasFocus(!0), d.publish(c.RESET, t);
    }, e.onReset = function () {
      e.searchStatus(""), e.query(l), e.showMoreResultsAvailableMessage(!1), C();
    }, e.setFocus = e.hasFocus.bind(null, !0);
  }
  var t = e("vendor/knockout"), n = e("utils/common/accessibility"), r = e("constants/common"), i = e("services/serviceLocator"), s = e("constants/keys"), o = e("utils/common/eventHelper"), u = e("swx-i18n").localization, a = e("utils/common/applicationFocusManager"), f = e("ui/telemetry/actions/actionSources"), l = "", c = r.events.search, h = r.apiUIEvents, p = r.events.narrowMode;
  return d;
})
