define("ui/viewModels/people/baseList", [
  "require",
  "lodash-compat",
  "vendor/knockout",
  "swx-cafe-application-instance",
  "experience/settings",
  "swx-i18n",
  "swx-service-locator-instance",
  "swx-constants",
  "swx-constants",
  "ui/viewModels/people/contactBuilder",
  "ui/telemetry/telemetryClient",
  "ui/telemetry/people/contactSearch",
  "utils/common/statusMapper"
], function (e) {
  function d(e) {
    this.activeSearchPromise = null;
    this.listSource = n.observable(e);
    this.contacts = n.observableArray();
    this.emptyListText = s.fetch({ key: "message_text_emptySearchResults" });
    this.showEmptyListText = n.observable(!1);
    this.showListTitle = n.observable(!1);
    this.listHasContacts = n.computed(function () {
      return this.contacts().length > 0;
    }, this);
    this.listRole = n.computed(function () {
      return this.contacts().length > 0 ? "menubar" : "group";
    }, this);
  }
  function v() {
    return o.resolve(u.serviceLocator.PUBSUB);
  }
  function m(e) {
    if (e)
      try {
        e.cancel("Another search query triggered");
      } catch (t) {
        l.get().sendEvent(i.telemetry.uiTenantToken, u.telemetry.promiseInvalidStateException.TYPE, {
          feature: u.telemetry.promiseInvalidStateException.feature.PEOPLE_SEARCH,
          exception: JSON.stringify(t)
        });
      }
  }
  var t = e("lodash-compat"), n = e("vendor/knockout"), r = e("swx-cafe-application-instance"), i = e("experience/settings"), s = e("swx-i18n").localization, o = e("swx-service-locator-instance").default, u = e("swx-constants").COMMON, a = e("swx-constants").PEOPLE, f = e("ui/viewModels/people/contactBuilder"), l = e("ui/telemetry/telemetryClient"), c = e("ui/telemetry/people/contactSearch"), h = e("utils/common/statusMapper"), p = u.events.search;
  return d.prototype.init = function () {
    v().subscribe(p.QUERY_CHANGED, this.search);
  }, d.prototype.dispose = function () {
    v().unsubscribe(p.QUERY_CHANGED, this.search);
  }, d.prototype.reset = function () {
    this.showListTitle(!1);
    this.showEmptyListText(!1);
    this.contacts([]);
  }, d.prototype.search = function (t, n) {
    function u() {
      if (o.activeSearchPromise !== s)
        return;
      h();
      o.contacts(i.results().map(function (e) {
        return f.build(e.result, {
          keepPresenceSubscription: !1,
          keepLastSeenAtSubscription: !1,
          keepActivitySubscription: !1,
          keepEndpointTypeSubscription: !1
        });
      }));
      v().publish(p.QUERY_EXECUTED, { moreResultsAvailable: i.moreResultsAvailable() });
    }
    function l(e) {
      if (e && e.message === "Canceled")
        return;
      if (o.activeSearchPromise !== s)
        return;
      c.onContactSearchEnd({
        success: !1,
        searchScope: o.listSource()
      });
      h();
    }
    function h() {
      o.activeSearchPromise = null;
      o.totalSearchResults = i.results().length;
      o.latestSearchQueryResults = i.results();
      v().publish(n.results, o.totalSearchResults);
      o.showListTitle(!0);
      o.showEmptyListText(!i.results().length);
    }
    var i, s, o = this;
    if (!t)
      return;
    return this.showEmptyListText(!1), m(o.activeSearchPromise), i = r.get().personsAndGroupsManager.createPersonSearchQuery(), i.sources(o.listSource()), i.text(t), i.limit(a.searchLimit), s = i.getMore().then(u, l), this.activeSearchPromise = s, s;
  }, d.prototype.sendOpenConversationEvent = function (t) {
    v().publish(u.events.navigation.OPEN_CONVERSATION, {
      model: t,
      origin: this.historyLoadOrigin
    });
  }, d.prototype.getSearchItemDetails = function (t, n) {
    var r = h.getAvailabilityText(t.status());
    return s.fetch({
      key: this.searchItemI18nKey,
      params: {
        contactName: t.displayName(),
        id: t.id(),
        status: r !== null ? r : "",
        index: n + 1,
        totalResults: this.totalSearchResults
      }
    });
  }, d.prototype.indexOfSelectedContactInSearchResults = function (n) {
    var r;
    if (!n || !t.isArray(this.latestSearchQueryResults))
      return;
    return r = t.findIndex(this.latestSearchQueryResults, function (e) {
      return e.result.id() === n.id();
    }), r !== -1 ? r + 1 : undefined;
  }, d;
});
