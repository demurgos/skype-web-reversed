define("ui/viewModels/search/results", [
  "require",
  "lodash-compat",
  "vendor/knockout",
  "swx-i18n",
  "constants/common",
  "services/serviceLocator",
  "ui/telemetry/actions/actionNames",
  "ui/telemetry/actions/actionSources",
  "utils/common/scroll"
], function (e) {
  function v() {
    function y(t) {
      g ? e.showDirectoryButton(t) : e.showDirectoryButton(!1);
    }
    function b() {
      v.publish(f.interaction.SCROLL_START);
    }
    function w() {
      e.showSpinner(!1);
    }
    var e = this, v = s.resolve(i.serviceLocator.PUBSUB), m = s.resolve(i.serviceLocator.FEATURE_FLAGS), g = m.isFeatureOn(i.featureFlags.SKYPE_DIRECTORY_SEARCH);
    e.cssClass = n.observable(c);
    e.showSpinner = n.observable(!1);
    e.showDirectoryButton = n.observable(g);
    e.directoryButtonText = r.fetch({ key: "button_text_searchDirectory" });
    e.directorySearchActive = !1;
    e.selectedItem = n.observable("");
    e.init = function (t) {
      v.subscribe(h.QUERY_CHANGED, e.onQueryChanged);
      v.subscribe(h.DIRECTORY_SEARCH_RESULTS, e.onDirectorySearchResults);
      v.subscribe(h.LOCAL_SEARCH_RESULTS, w);
      v.subscribe(h.RESET, e.hideView);
      v.subscribe(p.OPEN_CONVERSATION, e.onOpenConversation);
      d = a.build(t);
      d.init();
    };
    e.dispose = function () {
      v.unsubscribe(h.QUERY_CHANGED, e.onQueryChanged);
      v.unsubscribe(h.DIRECTORY_SEARCH_RESULTS, e.onDirectorySearchResults);
      v.unsubscribe(h.LOCAL_SEARCH_RESULTS, w);
      v.unsubscribe(h.RESET, e.hideView);
      v.unsubscribe(p.OPEN_CONVERSATION, e.onOpenConversation);
      d.dispose();
    };
    e.onScroll = t.debounce(b, 1000, {
      leading: !0,
      trailing: !1
    });
    e.onQueryChanged = function (t) {
      t !== l && e.showView();
    };
    e.onOpenConversation = function () {
      if (e.cssClass() === l) {
        var t = { source: u.search.reset.openConversation };
        v.publish(h.RESET, t);
      }
    };
    e.onDirectorySearchResults = function () {
      e.showSpinner(!1);
      y(!1);
    };
    e.activateDirectorySearch = function () {
      if (!g)
        return;
      var t = s.resolve(i.serviceLocator.ACTION_TELEMETRY);
      e.showSpinner(!0);
      y(!1);
      e.directorySearchActive = !0;
      v.publish(h.DIRECTORY_SEARCH_ACTIVATED, e.showSpinner());
      t.recordAction(o.search.directorySearchActivated);
    };
    e.deactivateDirectorySearch = function () {
      e.showSpinner(!1);
      y(!0);
      e.directorySearchActive = !1;
      v.publish(h.DIRECTORY_SEARCH_DEACTIVATED, e.showSpinner());
    };
    e.hideView = function (t) {
      var n = s.resolve(i.serviceLocator.ACTION_TELEMETRY);
      e.selectedItem("");
      e.cssClass(c);
      e.deactivateDirectorySearch();
      n.recordAction(o.search.reset, t);
      d.stopRepaintInterval();
    };
    e.showView = function () {
      e.cssClass(l);
      e.showSpinner(!0);
      y(!e.directorySearchActive);
      d.startRepaintInterval();
    };
  }
  var t = e("lodash-compat"), n = e("vendor/knockout"), r = e("swx-i18n").localization, i = e("constants/common"), s = e("services/serviceLocator"), o = e("ui/telemetry/actions/actionNames"), u = e("ui/telemetry/actions/actionSources"), a = e("utils/common/scroll"), f = i.events, l = "", c = "hide", h = f.search, p = f.navigation, d;
  return v;
});
