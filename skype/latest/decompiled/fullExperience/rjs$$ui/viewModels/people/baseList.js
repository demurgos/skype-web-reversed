define("ui/viewModels/people/baseList", [
  "require",
  "vendor/knockout",
  "cafe/applicationInstance",
  "experience/settings",
  "swx-i18n",
  "services/serviceLocator",
  "constants/common",
  "constants/people",
  "swx-enums",
  "ui/viewModels/people/contactBuilder",
  "services/telemetry/common/afterRenderHandler",
  "ui/telemetry/actions/actionNames",
  "ui/telemetry/telemetryClient",
  "utils/common/statusMapper"
], function (e) {
  function v(e) {
    this.listSource = t.observable(e), this.contacts = t.observableArray(), this.emptyListText = i.fetch({ key: "message_text_emptySearchResults" }), this.showEmptyListText = t.observable(!1), this.listHasContacts = t.computed(function () {
      return this.contacts().length > 0;
    }, this), this.isLocal = e === a.searchScope.AddressBook, this.isLocal ? (this.listClass = t.observable(u.contactList.className.LOCAL), this.listTitle = t.observable(i.fetch({ key: "message_text_contactTitleLocal" })), this.showListTitle = t.observable(!0), this.events = {
      results: d.LOCAL_SEARCH_RESULTS,
      rendered: d.LOCAL_SEARCH_RESULTS_RENDERED
    }, this.historyLoadOrigin = o.telemetry.historyLoadOrigin.CONTACT_SEARCH, this.searchItemI18nKey = "accessibility_searchItem_oneToOne") : (this.listClass = t.observable(u.contactList.className.DIRECTORY), this.listTitle = t.observable(i.fetch({ key: "message_text_contactTitleDirectory" })), this.showListTitle = t.observable(!1), this.events = {
      results: d.DIRECTORY_SEARCH_RESULTS,
      rendered: d.DIRECTORY_SEARCH_RESULTS_RENDERED
    }, this.historyLoadOrigin = o.telemetry.historyLoadOrigin.DIRECTORY_SEARCH, this.searchItemI18nKey = "accessibility_searchItem_directoryList");
  }
  function m() {
    return s.resolve(o.serviceLocator.PUBSUB);
  }
  function g() {
    return s.resolve(o.serviceLocator.ACTION_TELEMETRY);
  }
  var t = e("vendor/knockout"), n = e("cafe/applicationInstance"), r = e("experience/settings"), i = e("swx-i18n").localization, s = e("services/serviceLocator"), o = e("constants/common"), u = e("constants/people"), a = e("swx-enums"), f = e("ui/viewModels/people/contactBuilder"), l = e("services/telemetry/common/afterRenderHandler"), c = e("ui/telemetry/actions/actionNames"), h = e("ui/telemetry/telemetryClient"), p = e("utils/common/statusMapper"), d = o.events.search;
  return v.prototype.init = function () {
    m().subscribe(d.QUERY_CHANGED, this.search);
  }, v.prototype.dispose = function () {
    m().unsubscribe(d.QUERY_CHANGED, this.search);
  }, v.prototype.reset = function () {
    this.showListTitle(!1), this.showEmptyListText(!1), this.contacts([]);
  }, v.prototype.search = function (t) {
    function v() {
      if (l.activeSearchPromise !== a)
        return;
      y(), l.contacts(i.results().map(function (e) {
        return f.build(e.result, {
          keepPresenceSubscription: !1,
          keepLastSeenAtSubscription: !1,
          keepActivitySubscription: !1,
          keepEndpointTypeSubscription: !1
        });
      })), m().publish(d.QUERY_EXECUTED, { moreResultsAvailable: i.moreResultsAvailable() });
    }
    function y() {
      if (l.activeSearchPromise !== a)
        return;
      var e = s.getTraceableAction(c.search.started);
      e.markBeforeRender(), e.addEventData({
        source: l.listSource(),
        results: i.results().length
      }), l.activeSearchPromise = null, l.totalSearchResults = i.results().length, m().publish(l.events.results, l.totalSearchResults), l.showListTitle(!0), l.showEmptyListText(!i.results().length);
    }
    var i, s, a, l = this;
    if (!t)
      return;
    if (l.activeSearchPromise)
      try {
        l.activeSearchPromise.cancel("Another search query triggered");
      } catch (p) {
        h.get().sendEvent(r.telemetry.uiTenantToken, o.telemetry.promiseInvalidStateException.TYPE, {
          feature: o.telemetry.promiseInvalidStateException.feature.PEOPLE_SEARCH,
          exception: JSON.stringify(p)
        });
      }
    return s = g(), s.recordAction(c.search.started, { queryLength: t.length }), s.createTraceableAction(c.search.started).startTrace(), i = n.get().personsAndGroupsManager.createPersonSearchQuery(), i.sources(l.listSource()), i.text(t), i.limit(u.searchLimit), a = i.getMore().then(v, y), this.activeSearchPromise = a, this.activeSearchPromise;
  }, v.prototype.sendOpenConversationEvent = function (t) {
    m().publish(o.events.navigation.OPEN_CONVERSATION, {
      model: t,
      origin: this.historyLoadOrigin
    });
  }, v.prototype.getSearchItemDetails = function (t, n) {
    var r = p.getAvailabilityText(t.status());
    return i.fetch({
      key: this.searchItemI18nKey,
      params: {
        contactName: t.displayName(),
        id: t.id(),
        status: r !== null ? r : "",
        index: n + 1,
        totalResults: this.totalSearchResults
      }
    });
  }, v.prototype.afterRender = function () {
    var t = this;
    return l(t.contacts().length, function () {
      var e = g().getTraceableAction(c.search.started);
      e.markAfterRender(), e.endTrace(), m().publish(t.events.rendered, { resultCount: t.contacts().length });
    });
  }, v;
})
