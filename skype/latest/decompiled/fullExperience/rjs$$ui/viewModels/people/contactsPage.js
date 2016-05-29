define("ui/viewModels/people/contactsPage", [
  "require",
  "lodash-compat",
  "cafe/applicationInstance",
  "vendor/knockout",
  "usertiming",
  "constants/common",
  "constants/components",
  "constants/people",
  "browser/dom",
  "ui/telemetry/actions/actionNames",
  "experience/settings",
  "ui/telemetry/telemetryClient",
  "services/telemetry/common/afterRenderHandler",
  "ui/viewModels/people/baseContactList",
  "services/serviceLocator",
  "ui/telemetry/actions/actionSources",
  "ui/viewModels/people/contactListHelper",
  "swx-i18n",
  "ui/modelHelpers/personHelper",
  "ui/modelHelpers/groupHelper",
  "ui/viewModels/people/contactListMenuItem",
  "ui/shortCircuit/shortCircuit",
  "ui/educationBubbles/educationBubble",
  "ui/viewModels/people/contactPageContactGroup",
  "ui/educationBubbles/educationBubbleInfo",
  "services/pubSub/pubSub",
  "utils/common/async"
], function (e) {
  function _() {
    d.call(this);
    D().isFeatureOn(s.featureFlags.SHOW_CONTACTS_PAGE_HINT) ? this.showHint = r.computed(function () {
      return this.contactsCount() > 0;
    }, this) : this.showHint = function () {
      return !1;
    };
    this.showSignIn = I();
    this.signInHtml = R(y.fetch({ key: "aggressiveLinking_intro_signin" }));
    this.menuItems = [];
  }
  function D() {
    return v.resolve(s.serviceLocator.FEATURE_FLAGS);
  }
  function P(e, t) {
    var n = v.resolve(s.serviceLocator.ACTION_TELEMETRY);
    n.recordAction(e, t);
  }
  function H(e) {
    var t, n = B();
    n.ttc && n.ttr && (t = {
      name: s.telemetry.contacts.name.CONTACTS_PAGE_PERFORMANCE,
      timeToComplete: n.ttc.duration.toString(),
      timeToRender: n.ttr.duration.toString(),
      contactsCount: e.toString()
    }, h.get().sendEvent(c.telemetry.uiTenantToken, s.telemetry.contacts.type.CONTACTS, t));
    F();
  }
  function B() {
    return {
      ttc: i.getEntriesByName(M.TTC)[0],
      ttr: i.getEntriesByName(M.TTR)[0]
    };
  }
  function j() {
    return i.getEntriesByName(O.OPENED).length > 0;
  }
  function F() {
    i.clearMarks(O.OPENED);
    i.clearMarks(O.INITIALIZED);
    i.clearMarks(O.RENDERED);
    i.clearMeasures(M.TTC);
    i.clearMeasures(M.TTR);
  }
  function I() {
    return D().isFeatureOn(s.featureFlags.SHOW_CONTACTS_PAGE_SIGN_IN) && q();
  }
  function q() {
    return b.isTechnicalAccount(n.get().personsAndGroupsManager.mePerson);
  }
  function R(e) {
    return e.replace("{link_start}", "<a href=\"#\">").replace("{link_end}", "</a>");
  }
  function U() {
    var e = {}, t = D().isFeatureOn(s.featureFlags.SEARCH_EDUCATION_BUBBLE_BUSINESS), r = D().isFeatureOn(s.featureFlags.SEARCH_EDUCATION_BUBBLE);
    if (t && r)
      throw new Error("Search education bubble should not be set for business and consumer flavors in the same time.");
    t && (e = N.SEARCH_EDUCATION_BUBBLE_BUSINESS);
    r && (e = N.SEARCH_EDUCATION_BUBBLE);
    (r || t) && n.get().personsAndGroupsManager.all.persons.get().then(function () {
      var t = w.getPersonsOtherThanEchoAndAgents(), r = n.get().conversationsManager.conversations;
      t.length === 0 && r.size() === 0 && X(e);
    });
  }
  function z() {
    var e = D().isFeatureOn(s.featureFlags.CHAT_EDUCATION_BUBBLE), r = D().isFeatureOn(s.featureFlags.CHAT_EDUCATION_BUBBLE_BUSINESS);
    if (e && r)
      throw new Error("Chat education bubble should not be set for business and consumer flavors in the same time.");
    e && n.get().personsAndGroupsManager.all.persons.get().then(function () {
      var e = w.getPersonsOtherThanEchoAndAgents(), n = e.length, r = t.filter(e, b.isSuggestedContact).length;
      n > 0 && r === n && X(N.CHAT_EDUCATION_BUBBLE);
    });
    r && n.get().personsAndGroupsManager.all.persons.get().then(function () {
      var e = w.getPersonsOtherThanEchoAndAgents(), t = e.length;
      t > 0 && X(N.CHAT_EDUCATION_BUBBLE_BUSINESS);
    });
  }
  function W() {
    var e = D().isFeatureOn(s.featureFlags.SHOW_CONTACTS_PAGE_INFORMATIONAL_MESSAGE), t = c.contactsPageInformationalMessage;
    e && t && t.key && t.link ? (this.contactsPageInformationalMessage = t, this.showInformationalMessage = !0) : this.showInformationalMessage = !1;
  }
  function X(e) {
    var t = x.build(e.id, e.anchorElementQuery, e.i18nKey, e.iconUrlPath, e.options);
    t.show();
  }
  function V() {
    function t(t) {
      this.applyPropertyChangeToContacts = g.setObservablePropertyOnContacts.bind(this, "hideStrategy", t);
      this.applyPropertyChangeToContacts(this.contactGroups());
      e.forEach(function (e) {
        var n = e.strategy === t;
        e.selected(n);
      });
    }
    var e = [];
    return e.push(E.build({
      id: a.contactPageTabIds.ALL_CONTACTS_TAB,
      strategy: a.showStrategies.ALL,
      text: y.fetch({ key: "contactPage_text_tab_allContacts" }),
      callback: t.bind(this, a.showStrategies.ALL),
      selected: !0
    })), D().isFeatureOn(s.featureFlags.CONTACT_PAGE_FILTER_TABS) && (e.push(E.build({
      id: a.contactPageTabIds.AVAILABLE_TAB,
      strategy: a.showStrategies.AVAILABLE_ONLY,
      text: y.fetch({ key: "contactPage_text_tab_available" }),
      callback: t.bind(this, a.showStrategies.AVAILABLE_ONLY)
    })), D().isFeatureOn(s.featureFlags.AGENTS_DISCOVERABLE) && e.push(E.build({
      id: a.contactPageTabIds.AGENTS_TAB,
      strategy: a.showStrategies.AGENTS_ONLY,
      text: y.fetch({ key: "contactPage_text_tab_agents" }),
      callback: t.bind(this, a.showStrategies.AGENTS_ONLY)
    }))), e;
  }
  function $(e) {
    k.execute(function () {
      e.focus();
    });
    C.subscribe(o.FRAGMENT_LOADED, J);
  }
  function J(e) {
    e === u.people.CONTACTS_PAGE && L.focus();
  }
  var t = e("lodash-compat"), n = e("cafe/applicationInstance"), r = e("vendor/knockout"), i = e("usertiming"), s = e("constants/common"), o = s.events.navigation, u = e("constants/components"), a = e("constants/people"), f = e("browser/dom"), l = e("ui/telemetry/actions/actionNames"), c = e("experience/settings"), h = e("ui/telemetry/telemetryClient"), p = e("services/telemetry/common/afterRenderHandler"), d = e("ui/viewModels/people/baseContactList"), v = e("services/serviceLocator"), m = e("ui/telemetry/actions/actionSources"), g = e("ui/viewModels/people/contactListHelper"), y = e("swx-i18n").localization, b = e("ui/modelHelpers/personHelper"), w = e("ui/modelHelpers/groupHelper"), E = e("ui/viewModels/people/contactListMenuItem"), S = e("ui/shortCircuit/shortCircuit"), x = e("ui/educationBubbles/educationBubble"), T = e("ui/viewModels/people/contactPageContactGroup"), N = e("ui/educationBubbles/educationBubbleInfo"), C = e("services/pubSub/pubSub"), k = e("utils/common/async"), L = null, A = s.telemetry, O = A.performanceMarks.CONTACTS.PAGE, M = A.measurements.CONTACTS.PAGE;
  return _.prototype = new d(), _.prototype.constructor = _, _.prototype.init = function (e, t) {
    var n;
    return L = f.getElement(".ContactsPage", t), j() && (i.mark(O.INITIALIZED), i.measure(M.TTC, O.OPENED, O.INITIALIZED)), D().isFeatureOn(s.featureFlags.CONTACT_PAGE_FILTER_TABS) && (e.contactGroupConstructor = T), n = d.prototype.init.call(this, e, L), Array.prototype.push.apply(this.menuItems, V.call(this)), W.call(this), U(), z(), $(L), n;
  }, _.prototype.dispose = function () {
    L = null;
    this.showHint.dispose && this.showHint.dispose();
    C.unsubscribe(o.FRAGMENT_LOADED, J);
    d.prototype.dispose.call(this);
  }, _.prototype.afterRender = function () {
    function n() {
      j() && (i.mark(O.RENDERED), i.measure(M.TTR, O.OPENED, O.RENDERED), H(e.contactsCount()));
    }
    var e = this, t = p(e.contactGroups().length, n);
    return d.prototype.afterRender.call(this, t);
  }, _.prototype.openConversation = function (e, t) {
    P(l.contacts.openConversation);
    d.prototype.openConversation.call(this, e, t);
  }, _.prototype.showContextMenu = function (e, t) {
    var n = { source: m.contactsPage.contact };
    d.prototype.showContextMenu.call(this, e, t, n);
  }, _.prototype.launchShortCircuit = function () {
    S.build().open();
    v.resolve(s.serviceLocator.ACTION_TELEMETRY).recordAction(l.shortCircuit.contactsPageOpen);
  }, _.prototype.openInformationalMessageLink = function () {
    P(l.contacts.informationButtonClicked, { link: this.contactsPageInformationalMessage.link });
    window.open(this.contactsPageInformationalMessage.link, "_blank");
  }, _.prototype.shouldPersonBeIncluded = function (e, t) {
    return g.personExistsInCollection(e, t) ? !1 : b.isEchoContact(e) ? w.getPersonsOtherThanEcho().length > 0 : !0;
  }, _.prototype.startRelinkFlow = function () {
    n.get().signInManager.signIn({ relink: !0 });
  }, _;
});
