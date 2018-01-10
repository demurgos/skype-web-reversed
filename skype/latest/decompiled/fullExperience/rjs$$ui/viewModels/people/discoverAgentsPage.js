define("ui/viewModels/people/discoverAgentsPage", [
  "require",
  "swx-cafe-application-instance",
  "usertiming",
  "swx-constants",
  "ui/viewModels/chat/navigationHelper",
  "constants/components",
  "browser/dom",
  "ui/telemetry/actions/actionNames",
  "experience/settings",
  "ui/telemetry/telemetryClient",
  "services/telemetry/common/afterRenderHandler",
  "ui/viewModels/people/baseContactList",
  "swx-service-locator-instance",
  "ui/telemetry/actions/actionSources",
  "ui/viewModels/people/contactListHelper",
  "constants/cssClasses",
  "swx-enums",
  "vendor/knockout",
  "ui/contextMenu/items/all",
  "ui/contextMenu/contextMenu",
  "swx-pubsub-instance",
  "swx-focus-handler"
], function (e) {
  function A() {
    var e = this, t = p.resolve(r.serviceLocator.FEATURE_FLAGS);
    h.call(e);
    e.templateName = "contactList-agents";
    e.agentsDiscoverable = t.isFeatureOn(r.featureFlags.AGENTS_DISCOVERABLE);
    e.menuItems = [];
    e.searchInProgress = y.observable(!1);
    e.hasResults = y.computed(function () {
      return !e.searchInProgress() && !!e.contactGroups().length;
    });
    e.hasZeroResults = y.computed(function () {
      return !e.searchInProgress() && e.contactGroups().length === 0;
    });
  }
  function O(e) {
    var t = p.resolve(r.serviceLocator.ACTION_TELEMETRY);
    t.recordAction(e);
  }
  function M(e) {
    var t, n = _();
    n.ttc && n.ttr && (t = {
      name: r.telemetry.agents.name.DISCOVER_AGENTS_PAGE_PERFORMANCE,
      timeToComplete: n.ttc.duration.toString(),
      timeToRender: n.ttr.duration.toString(),
      contactsCount: e.toString()
    }, l.get().sendEvent(f.telemetry.uiTenantToken, r.telemetry.agents.type.AGENTS, t));
    P();
  }
  function _() {
    return {
      ttc: n.getEntriesByName(C.TTC)[0],
      ttr: n.getEntriesByName(C.TTR)[0]
    };
  }
  function D() {
    return n.getEntriesByName(N.OPENED).length > 0;
  }
  function P() {
    n.clearMarks(N.OPENED);
    n.clearMarks(N.INITIALIZED);
    n.clearMarks(N.RENDERED);
    n.clearMeasures(C.TTC);
    n.clearMeasures(C.TTR);
  }
  function H(e) {
    S.get().addFocusRequestToQueue(e);
    E.subscribe(s.FRAGMENT_LOADED, B);
  }
  function B(e) {
    e === o.people.DISCOVER_AGENTS_PAGE && S.get().addFocusRequestToQueue(x);
  }
  var t = e("swx-cafe-application-instance"), n = e("usertiming"), r = e("swx-constants").COMMON, i = e("ui/viewModels/chat/navigationHelper"), s = r.events.navigation, o = e("constants/components"), u = e("browser/dom"), a = e("ui/telemetry/actions/actionNames"), f = e("experience/settings"), l = e("ui/telemetry/telemetryClient"), c = e("services/telemetry/common/afterRenderHandler"), h = e("ui/viewModels/people/baseContactList"), p = e("swx-service-locator-instance").default, d = e("ui/telemetry/actions/actionSources"), v = e("ui/viewModels/people/contactListHelper"), m = e("constants/cssClasses"), g = e("swx-enums"), y = e("vendor/knockout"), b = e("ui/contextMenu/items/all"), w = e("ui/contextMenu/contextMenu"), E = e("swx-pubsub-instance").default, S = e("swx-focus-handler"), x = null, T = r.telemetry, N = T.performanceMarks.DISCOVER_AGENTS.PAGE, C = T.measurements.DISCOVER_AGENTS.PAGE, k = r.telemetry.historyLoadOrigin.DISCOVER_AGENTS_PAGE, L = { source: d.discoverAgentsPage.agent };
  return A.prototype = new h(), A.prototype.constructor = A, A.prototype.init = function (e, t) {
    var r;
    return this.agentsDiscoverable ? (x = u.getElement("." + m.discoverAgents.PAGE, t), D() && (n.mark(N.INITIALIZED), n.measure(C.TTC, N.OPENED, N.INITIALIZED)), r = h.prototype.init.call(this, e, x), H(x), r) : (i.navigateToContactsPage(), Promise.resolve());
  }, A.prototype.dispose = function () {
    x = null;
    this.hasResults.dispose();
    this.hasZeroResults.dispose();
    E.unsubscribe(s.FRAGMENT_LOADED, B);
    h.prototype.dispose.call(this);
  }, A.prototype.afterRender = function () {
    function r() {
      D() && (n.mark(N.RENDERED), n.measure(C.TTR, N.OPENED, N.RENDERED), M(e.contactsCount()));
    }
    var e = this, t = c(e.contactGroups().length, r);
    return h.prototype.afterRender.call(this, t);
  }, A.prototype.openConversation = function (e, t) {
    var n = {
      origin: k,
      target: { expandProfile: !0 },
      telemetryContext: L
    };
    O(a.discoverAgents.openConversation);
    h.prototype.openConversation.call(this, e, t, n);
  }, A.prototype.showContextMenu = function (e, t) {
    var n = [new b.ViewPersonProfileMenuItem(e.getPerson(), k, L)];
    w.show(n, t, L);
  }, A.prototype.shouldPersonBeIncluded = function (e, t) {
    return !v.personExistsInCollection(e, t);
  }, A.prototype.populate = function (e) {
    function a() {
      n.exclusionList = o();
      u.then(f);
    }
    function f() {
      var t = i.results().map(function (e) {
        return e.result;
      });
      n.populateGroups(t, e);
      n.searchInProgress(!1);
    }
    var n = this, i = t.get().personsAndGroupsManager.createPersonSearchQuery(), s = p.resolve(r.serviceLocator.SUBSCRIPTION_PROVIDER), o = s.getPersonsObservable(), u;
    return n.searchInProgress(!0), n.exclusionList = o(), i.sources(g.searchScope.Agent), u = i.getMore(), u.then(f), n.subscriptions.persons = o.subscribe(a, null, "arrayChange"), u;
  }, A;
});
