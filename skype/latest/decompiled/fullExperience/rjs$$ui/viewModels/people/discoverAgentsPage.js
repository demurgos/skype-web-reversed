define("ui/viewModels/people/discoverAgentsPage", [
  "require",
  "cafe/applicationInstance",
  "usertiming",
  "constants/common",
  "constants/components",
  "browser/dom",
  "ui/telemetry/actions/actionNames",
  "experience/settings",
  "ui/telemetry/telemetryClient",
  "services/telemetry/common/afterRenderHandler",
  "ui/viewModels/people/baseContactList",
  "services/serviceLocator",
  "ui/telemetry/actions/actionSources",
  "ui/viewModels/people/contactListHelper",
  "constants/cssClasses",
  "swx-enums",
  "vendor/knockout",
  "ui/contextMenu/items/all",
  "ui/contextMenu/contextMenu",
  "services/pubSub/pubSub",
  "utils/common/async"
], function (e) {
  function L() {
    var e = this;
    c.call(e);
    e.menuItems = [];
    e.searchInProgress = g.observable(!1);
    e.hasResults = g.computed(function () {
      return !e.searchInProgress() && !!e.contactGroups().length;
    });
    e.hasZeroResults = g.computed(function () {
      return !e.searchInProgress() && e.contactGroups().length === 0;
    });
  }
  function A(e) {
    var t = h.resolve(r.serviceLocator.ACTION_TELEMETRY);
    t.recordAction(e);
  }
  function O(e) {
    var t, n = M();
    n.ttc && n.ttr && (t = {
      name: r.telemetry.agents.name.DISCOVER_AGENTS_PAGE_PERFORMANCE,
      timeToComplete: n.ttc.duration.toString(),
      timeToRender: n.ttr.duration.toString(),
      contactsCount: e.toString()
    }, f.get().sendEvent(a.telemetry.uiTenantToken, r.telemetry.agents.type.AGENTS, t));
    D();
  }
  function M() {
    return {
      ttc: n.getEntriesByName(N.TTC)[0],
      ttr: n.getEntriesByName(N.TTR)[0]
    };
  }
  function _() {
    return n.getEntriesByName(T.OPENED).length > 0;
  }
  function D() {
    n.clearMarks(T.OPENED);
    n.clearMarks(T.INITIALIZED);
    n.clearMarks(T.RENDERED);
    n.clearMeasures(N.TTC);
    n.clearMeasures(N.TTR);
  }
  function P(e) {
    E.execute(function () {
      e.focus();
    });
    w.subscribe(i.FRAGMENT_LOADED, H);
  }
  function H(e) {
    e === s.people.DISCOVER_AGENTS_PAGE && S.focus();
  }
  var t = e("cafe/applicationInstance"), n = e("usertiming"), r = e("constants/common"), i = r.events.navigation, s = e("constants/components"), o = e("browser/dom"), u = e("ui/telemetry/actions/actionNames"), a = e("experience/settings"), f = e("ui/telemetry/telemetryClient"), l = e("services/telemetry/common/afterRenderHandler"), c = e("ui/viewModels/people/baseContactList"), h = e("services/serviceLocator"), p = e("ui/telemetry/actions/actionSources"), d = e("ui/viewModels/people/contactListHelper"), v = e("constants/cssClasses"), m = e("swx-enums"), g = e("vendor/knockout"), y = e("ui/contextMenu/items/all"), b = e("ui/contextMenu/contextMenu"), w = e("services/pubSub/pubSub"), E = e("utils/common/async"), S = null, x = r.telemetry, T = x.performanceMarks.DISCOVER_AGENTS.PAGE, N = x.measurements.DISCOVER_AGENTS.PAGE, C = r.telemetry.historyLoadOrigin.DISCOVER_AGENTS_PAGE, k = { source: p.discoverAgentsPage.agent };
  return L.prototype = new c(), L.prototype.constructor = L, L.prototype.init = function (e, t) {
    var r;
    return S = o.getElement("." + v.discoverAgents.PAGE, t), _() && (n.mark(T.INITIALIZED), n.measure(N.TTC, T.OPENED, T.INITIALIZED)), r = c.prototype.init.call(this, e, S), P(S), r;
  }, L.prototype.dispose = function () {
    S = null;
    this.hasResults.dispose();
    this.hasZeroResults.dispose();
    w.unsubscribe(i.FRAGMENT_LOADED, H);
    c.prototype.dispose.call(this);
  }, L.prototype.afterRender = function () {
    function r() {
      _() && (n.mark(T.RENDERED), n.measure(N.TTR, T.OPENED, T.RENDERED), O(e.contactsCount()));
    }
    var e = this, t = l(e.contactGroups().length, r);
    return c.prototype.afterRender.call(this, t);
  }, L.prototype.openConversation = function (e, t) {
    var n = {
      origin: C,
      target: { expandProfile: !0 },
      telemetryContext: k
    };
    A(u.discoverAgents.openConversation);
    c.prototype.openConversation.call(this, e, t, n);
  }, L.prototype.showContextMenu = function (e, t) {
    var n = [new y.ViewPersonProfileMenuItem(e.getPerson(), C, k)];
    b.show(n, t, k);
  }, L.prototype.shouldPersonBeIncluded = function (e, t) {
    return !d.personExistsInCollection(e, t);
  }, L.prototype.populate = function (e) {
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
    var n = this, i = t.get().personsAndGroupsManager.createPersonSearchQuery(), s = h.resolve(r.serviceLocator.SUBSCRIPTION_PROVIDER), o = s.getPersonsObservable(), u;
    return n.searchInProgress(!0), n.exclusionList = o(), i.sources(m.searchScope.Agent), u = i.getMore(), u.then(f), n.subscriptions.persons = o.subscribe(a, null, "arrayChange"), u;
  }, L;
});
