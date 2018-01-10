define("ui/viewModels/search/results", [
  "require",
  "lodash-compat",
  "vendor/knockout",
  "swx-i18n",
  "swx-constants",
  "swx-service-locator-instance",
  "ui/telemetry/actions/actionSources",
  "utils/common/scroll"
], function (e) {
  function d() {
    function g(t) {
      m ? e.showDirectoryButton(t) : e.showDirectoryButton(!1);
    }
    function y() {
      d.publish(a.interaction.SCROLL_START);
    }
    function b() {
      e.showSpinner(!1);
    }
    var e = this, d = s.resolve(i.serviceLocator.PUBSUB), v = s.resolve(i.serviceLocator.FEATURE_FLAGS), m = v.isFeatureOn(i.featureFlags.SKYPE_DIRECTORY_SEARCH);
    e.cssClass = n.observable(l);
    e.showSpinner = n.observable(!1);
    e.showDirectoryButton = n.observable(m);
    e.directoryButtonText = r.fetch({ key: "button_text_searchDirectory" });
    e.directorySearchActive = !1;
    e.selectedItem = n.observable("");
    e.init = function (t) {
      d.subscribe(c.QUERY_CHANGED, e.onQueryChanged);
      d.subscribe(c.DIRECTORY_SEARCH_RESULTS, e.onDirectorySearchResults);
      d.subscribe(c.LOCAL_SEARCH_RESULTS, b);
      d.subscribe(c.RESET, e.hideView);
      d.subscribe(c.ACTIVATE_DIRECTORY_SEARCH, e.activateDirectorySearch);
      d.subscribe(h.OPEN_CONVERSATION, e.onOpenConversation);
      p = u.build(t);
      p.init();
    };
    e.dispose = function () {
      d.unsubscribe(c.QUERY_CHANGED, e.onQueryChanged);
      d.unsubscribe(c.DIRECTORY_SEARCH_RESULTS, e.onDirectorySearchResults);
      d.unsubscribe(c.LOCAL_SEARCH_RESULTS, b);
      d.unsubscribe(c.RESET, e.hideView);
      d.unsubscribe(c.ACTIVATE_DIRECTORY_SEARCH, e.activateDirectorySearch);
      d.unsubscribe(h.OPEN_CONVERSATION, e.onOpenConversation);
      p.dispose();
    };
    e.onScroll = t.debounce(y, 1000, {
      leading: !0,
      trailing: !1
    });
    e.onQueryChanged = function (t) {
      t !== f && e.showView();
    };
    e.onOpenConversation = function () {
      if (e.cssClass() === f) {
        var t = { source: o.search.reset.openConversation };
        d.publish(c.RESET, t);
      }
    };
    e.onDirectorySearchResults = function () {
      e.showSpinner(!1);
      g(!1);
    };
    e.activateDirectorySearch = function () {
      if (!m)
        return;
      e.showSpinner(!0);
      g(!1);
      e.directorySearchActive = !0;
      d.publish(c.DIRECTORY_SEARCH_ACTIVATED, e.showSpinner());
    };
    e.deactivateDirectorySearch = function () {
      e.showSpinner(!1);
      g(!0);
      e.directorySearchActive = !1;
      d.publish(c.DIRECTORY_SEARCH_DEACTIVATED, e.showSpinner());
    };
    e.hideView = function () {
      e.selectedItem("");
      e.cssClass(l);
      e.deactivateDirectorySearch();
    };
    e.showView = function () {
      e.cssClass(f);
      e.showSpinner(!0);
      g(!e.directorySearchActive);
    };
  }
  var t = e("lodash-compat"), n = e("vendor/knockout"), r = e("swx-i18n").localization, i = e("swx-constants").COMMON, s = e("swx-service-locator-instance").default, o = e("ui/telemetry/actions/actionSources"), u = e("utils/common/scroll"), a = i.events, f = "", l = "hide", c = a.search, h = a.navigation, p;
  return d;
});
