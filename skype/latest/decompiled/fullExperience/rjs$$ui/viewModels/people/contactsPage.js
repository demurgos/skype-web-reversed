define("ui/viewModels/people/contactsPage", [
  "require",
  "lodash-compat",
  "swx-cafe-application-instance",
  "vendor/knockout",
  "usertiming",
  "swx-constants",
  "constants/components",
  "swx-constants",
  "browser/dom",
  "ui/telemetry/actions/actionNames",
  "experience/settings",
  "ui/telemetry/telemetryClient",
  "services/telemetry/common/afterRenderHandler",
  "ui/viewModels/people/baseContactList",
  "swx-service-locator-instance",
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
  "swx-pubsub-instance",
  "swx-constants",
  "utils/common/eventHelper",
  "swx-focus-handler"
], function (e) {
  function H(e) {
    C.publish(s.events.navigation.NAVIGATE_TO_SEARCH_INPUT);
    h.get().sendEvent(c.telemetry.chatTenantToken, e, {});
  }
  function B() {
    var e = c.initParams.locale ? c.initParams.locale : P;
    d.call(this);
    j().isFeatureOn(s.featureFlags.SHOW_CONTACTS_PAGE_HINT) ? this.showHint = r.computed(function () {
      return this.contactsCount() > 0;
    }, this) : this.showHint = function () {
      return !1;
    };
    this.oneAccountHtml = X(y.fetch({ key: "one_account_link" }));
    this.showOneAccount = z();
    this.menuItems = [];
    this.isShortCircuitEnabled = r.observable(!1);
    this.showNewBeePage = r.observable(!1);
    this.showFirstRunPage = r.observable(!1);
    this.isFirstRunPageFlagEnabled = j().isFeatureOn(s.featureFlags.SHOW_FIRST_RUN_LANDING_EXPERIENCE);
    this.onMouseDown = function () {
      H.call(this, D.event.CLICK);
    };
    this.onKeyDown = function (e, t) {
      return t && L.getKeyCode(t) !== k.TAB && H.call(this, D.event.KEYDOWN), !0;
    };
    this.learnMoreUrl = c.skypeFromOutlook.host + e + c.skypeFromOutlook.page;
  }
  function j() {
    return v.resolve(s.serviceLocator.FEATURE_FLAGS);
  }
  function F(e, t) {
    var n = v.resolve(s.serviceLocator.ACTION_TELEMETRY);
    n.recordAction(e, t);
  }
  function I(e) {
    var t, n = q();
    n.ttc && n.ttr && (t = {
      name: O.contacts.name.CONTACTS_PAGE_PERFORMANCE,
      timeToComplete: n.ttc.duration.toString(),
      timeToRender: n.ttr.duration.toString(),
      contactsCount: e.toString()
    }, h.get().sendEvent(c.telemetry.uiTenantToken, O.contacts.type.CONTACTS, t));
    U();
  }
  function q() {
    return {
      ttc: i.getEntriesByName(_.TTC)[0],
      ttr: i.getEntriesByName(_.TTR)[0]
    };
  }
  function R() {
    return i.getEntriesByName(M.OPENED).length > 0;
  }
  function U() {
    i.clearMarks(M.OPENED);
    i.clearMarks(M.INITIALIZED);
    i.clearMarks(M.RENDERED);
    i.clearMeasures(_.TTC);
    i.clearMeasures(_.TTR);
  }
  function z() {
    return j().isFeatureOn(s.featureFlags.SHOW_ONE_ACCOUNT_LINK) && W();
  }
  function W() {
    return b.isTechnicalAccount(n.get().personsAndGroupsManager.mePerson);
  }
  function X(e) {
    var t = "<a href=\"" + c.oneAccountSupportUrl + "\">";
    return e.replace("{link_start}", t).replace("{link_end}", "</a>");
  }
  function V() {
    var e = {}, t = j().isFeatureOn(s.featureFlags.SEARCH_EDUCATION_BUBBLE_BUSINESS), r = j().isFeatureOn(s.featureFlags.SEARCH_EDUCATION_BUBBLE), i = v.resolve(s.serviceLocator.SUBSCRIPTION_PROVIDER);
    if (t && r)
      throw new Error("Search education bubble should not be set for business and consumer flavors in the same time.");
    t && (e = N.SEARCH_EDUCATION_BUBBLE_BUSINESS);
    r && (e = N.SEARCH_EDUCATION_BUBBLE);
    (r || t) && i.getContacts().then(function () {
      var t = w.getPersonsOtherThanEchoAndAgents(), r = n.get().conversationsManager.conversations;
      t.length === 0 && r.size() === 0 && K(e);
    });
  }
  function $() {
    var e = j().isFeatureOn(s.featureFlags.CHAT_EDUCATION_BUBBLE), n = j().isFeatureOn(s.featureFlags.CHAT_EDUCATION_BUBBLE_BUSINESS), r = v.resolve(s.serviceLocator.SUBSCRIPTION_PROVIDER);
    if (e && n)
      throw new Error("Chat education bubble should not be set for business and consumer flavors in the same time.");
    e && r.getContacts().then(function () {
      var e = w.getPersonsOtherThanEchoAndAgents(), n = e.length, r = t.filter(e, b.isSuggestedContact).length;
      n > 0 && r === n && K(N.CHAT_EDUCATION_BUBBLE);
    });
    n && r.getContacts().then(function () {
      var e = w.getPersonsOtherThanEchoAndAgents(), t = e.length;
      t > 0 && K(N.CHAT_EDUCATION_BUBBLE_BUSINESS);
    });
  }
  function J() {
    var e = j().isFeatureOn(s.featureFlags.SHOW_CONTACTS_PAGE_INFORMATIONAL_MESSAGE), t = c.contactsPageInformationalMessage;
    e && t && t.key && t.link ? (this.contactsPageInformationalMessage = t, this.showInformationalMessage = !0) : this.showInformationalMessage = !1;
  }
  function K(e) {
    var t = x.build(e.id, e.anchorElementQuery, e.i18nKey, e.iconUrlPath, e.options);
    t.show();
  }
  function Q() {
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
    })), e.push(E.build({
      id: a.contactPageTabIds.AVAILABLE_TAB,
      strategy: a.showStrategies.AVAILABLE_ONLY,
      text: y.fetch({ key: "contactPage_text_tab_available" }),
      callback: t.bind(this, a.showStrategies.AVAILABLE_ONLY)
    })), j().isFeatureOn(s.featureFlags.AGENTS_DISCOVERABLE) && e.push(E.build({
      id: a.contactPageTabIds.AGENTS_TAB,
      strategy: a.showStrategies.AGENTS_ONLY,
      text: y.fetch({ key: "contactPage_text_tab_agents" }),
      callback: t.bind(this, a.showStrategies.AGENTS_ONLY)
    })), e;
  }
  function G(e) {
    A.get().addFocusRequestToQueue(e);
    C.subscribe(o.FRAGMENT_LOADED, Y.bind(null, e));
  }
  function Y(e, t) {
    t === u.people.CONTACTS_PAGE && A.get().addFocusRequestToQueue(e);
  }
  var t = e("lodash-compat"), n = e("swx-cafe-application-instance"), r = e("vendor/knockout"), i = e("usertiming"), s = e("swx-constants").COMMON, o = s.events.navigation, u = e("constants/components"), a = e("swx-constants").PEOPLE, f = e("browser/dom"), l = e("ui/telemetry/actions/actionNames"), c = e("experience/settings"), h = e("ui/telemetry/telemetryClient"), p = e("services/telemetry/common/afterRenderHandler"), d = e("ui/viewModels/people/baseContactList"), v = e("swx-service-locator-instance").default, m = e("ui/telemetry/actions/actionSources"), g = e("ui/viewModels/people/contactListHelper"), y = e("swx-i18n").localization, b = e("ui/modelHelpers/personHelper"), w = e("ui/modelHelpers/groupHelper"), E = e("ui/viewModels/people/contactListMenuItem"), S = e("ui/shortCircuit/shortCircuit"), x = e("ui/educationBubbles/educationBubble"), T = e("ui/viewModels/people/contactPageContactGroup"), N = e("ui/educationBubbles/educationBubbleInfo"), C = e("swx-pubsub-instance").default, k = e("swx-constants").KEYS, L = e("utils/common/eventHelper"), A = e("swx-focus-handler"), O = s.telemetry, M = O.performanceMarks.CONTACTS.PAGE, _ = O.measurements.CONTACTS.PAGE, D = O.contacts.searchForFriends, P = "en";
  return B.prototype = new d(), B.prototype.constructor = B, B.prototype.init = function (e, t) {
    var n = this, r, s, o = f.getElement(".ContactsPage", t);
    return R() && (i.mark(M.INITIALIZED), i.measure(_.TTC, M.OPENED, M.INITIALIZED)), e.contactGroupConstructor = T, r = d.prototype.init.call(this, e, o), s = S.build().isEnabled().then(function (e) {
      return e || (n.isFirstRunPageFlagEnabled ? (n.showFirstRunPage(!0), G(f.getElement(".ContactsPage-FirstRunInput", t)), h.get().sendEvent(c.telemetry.chatTenantToken, D.event.SHOW, {})) : n.showNewBeePage(!0)), n.isShortCircuitEnabled(e);
    }), Array.prototype.push.apply(this.menuItems, Q.call(this)), J.call(this), V(), n.isFirstRunPageFlagEnabled || G(o), Promise.all([
      r,
      s
    ]);
  }, B.prototype.dispose = function () {
    this.showHint.dispose && this.showHint.dispose();
    C.unsubscribe(o.FRAGMENT_LOADED, Y);
    d.prototype.dispose.call(this);
  }, B.prototype.afterRender = function () {
    function n() {
      R() && (i.mark(M.RENDERED), i.measure(_.TTR, M.OPENED, M.RENDERED), I(e.contactsCount()));
      $();
    }
    var e = this, t = p(e.contactGroups().length, n);
    return d.prototype.afterRender.call(this, t);
  }, B.prototype.openConversation = function (e, t) {
    F(l.contacts.openConversation);
    d.prototype.openConversation.call(this, e, t);
  }, B.prototype.showContextMenu = function (e, t) {
    var n = { source: m.contactsPage.contact };
    d.prototype.showContextMenu.call(this, e, t, n);
  }, B.prototype.launchShortCircuit = function () {
    S.build().open(undefined, this.contactsCount);
    v.resolve(s.serviceLocator.ACTION_TELEMETRY).recordAction(l.shortCircuit.contactsPageOpen);
  }, B.prototype.openInformationalMessageLink = function () {
    F(l.contacts.informationButtonClicked, { link: this.contactsPageInformationalMessage.link });
    window.open(this.contactsPageInformationalMessage.link, "_blank");
  }, B.prototype.shouldPersonBeIncluded = function (e, t) {
    return g.personExistsInCollection(e, t) ? !1 : b.isEchoContact(e) ? w.getPersonsOtherThanEcho().length > 0 : !0;
  }, B;
});
