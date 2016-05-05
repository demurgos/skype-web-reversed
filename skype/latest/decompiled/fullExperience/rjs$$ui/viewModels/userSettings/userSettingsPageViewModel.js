define("ui/viewModels/userSettings/userSettingsPageViewModel", [
  "require",
  "lodash-compat",
  "cafe/applicationInstance",
  "utils/common/async",
  "utils/common/builderMixin",
  "constants/common",
  "browser/dom",
  "swx-utils-common",
  "swx-enums",
  "utils/common/eventHelper",
  "utils/common/eventMixin",
  "swx-i18n",
  "vendor/knockout",
  "utils/common/scroll",
  "services/serviceLocator",
  "utils/common/disposableMixin",
  "utils/common/stateMixin",
  "ui/viewModels/userSettings/utils",
  "experience/settings",
  "experience/settings",
  "telemetry/settings/settingsPageTelemetry",
  "ui/viewModels/userSettings/preferenceViewModel",
  "ui/viewModels/userSettings/preferenceMapping",
  "ui/viewModels/userSettings/preferenceMapping"
], function (e) {
  function N(e) {
    var t = {
      id: e.id,
      title: c.fetch({ key: e.titleI18NKey }),
      "@Meta": { typeKey: "id" },
      preferenceItems: []
    };
    return t.preferenceItems["@Meta"] = { typeKey: "template" }, t;
  }
  function C(e) {
    function r(e) {
      return g.isPrefSupported(e.description.id, S);
    }
    var n = [
      N(x.CONTACTS),
      N(x.MESSAGING),
      N(x.PRIVACY),
      N(x.UNLISTED)
    ];
    return t.filter(e, r).forEach(function (e) {
      var r = e.description.id, i = g.getPrefCategory(r, S, x.UNLISTED.id), s = t.find(n, { id: i });
      g.isUnlistedCategory(r, i, y, b) && (s = t.find(n, { id: x.UNLISTED.id })), s.preferenceItems.push(E.build(e));
    }), n;
  }
  function k(e) {
    var n = t(this.model.categories).pluck("preferenceItems").flatten().find({ id: e });
    if (!n && !!e.match(s.userSettings.preferences.DYNAMIC_DISCOVERY)) {
      var r = t.find(this.model.categories, { id: "contacts" });
      n = t(t.map(r.preferenceItems, "value").filter(t.isArray)[0]).find({ id: e });
    }
    return n;
  }
  function L(e) {
    return e.categories = t.reject(e.categories, function (e) {
      return e.preferenceItems.length === 0;
    }), e;
  }
  function A(e) {
    return e.categories = t.reject(e.categories, function (e) {
      return e.id === x.UNLISTED.id;
    }), e;
  }
  function O(e, n) {
    var r, i = e.description.id, s = e.description.type, o = k.call(this, i);
    if (s === T.AutoBuddyDiscovery && t.isArray(n)) {
      r = t.map(n, function (t) {
        return E.build(t, e);
      }), o.value = r, _.call(this, n), this.applyState(this.model);
      return;
    }
    o.value = n, this.applyState(this.model);
  }
  function M(e, t) {
    var n = k.call(this, e);
    n.uiState === a.preferenceValueState.Unknown && (n.uiState = t);
    switch (t) {
    case a.preferenceValueState.Saving:
    case a.preferenceValueState.Defined:
      n.uiState = t;
    }
    this.applyState(this.model);
  }
  function _(e) {
    t.forEach(e, function (e) {
      this.registerDisposable(e.value.changed(O.bind(this, e))), this.registerDisposable(e.value.state.changed(M.bind(this, e.description.id))), e.value.get();
    }, this);
  }
  function D(e) {
    e.selectedCategory = t.head(e.categories) || {}, F(e.selectedCategory.id);
  }
  function P(e, n) {
    var r = e.selectedCategory.id;
    e.selectedCategory = t.find(e.categories, { id: n }) || {}, r !== e.selectedCategory.id && F(e.selectedCategory.id);
  }
  function H() {
    if (this.fragmentVisibility) {
      d.resolve(s.serviceLocator.PUBSUB).publish(s.events.navigation.NAVIGATE_TO_PREVIOUS_PAGE);
      return;
    }
    this.fragmentVisibility = !0, this.pageOpenTimeMark = u.build();
  }
  function B() {
    this.fragmentVisibility = !1, j(this.pageOpenTimeMark), this.pageOpenTimeMark = null, this.pageOpenTimeMark = null;
  }
  function j(e) {
    w.build().sendDismissPageEvent(e && e.durationInSeconds());
  }
  function F(e) {
    w.build().sendShowPanelEvent(e);
  }
  function I(e) {
    this.secondaryScroll && this.unregisterDisposable(this.secondaryScroll), this.secondaryScroll = p.build(o.getElement(".UserSettingsPage-scroll-area", e)), this.registerDisposable(this.secondaryScroll), this.secondaryScroll.init();
  }
  function q(e, n) {
    var i = d.resolve(s.serviceLocator.FEATURE_FLAGS), o, u = this;
    this.pageOpenTimeMark = null, this.state = m.overrideDefaults({}, this.getInitialState()), this.params = m.overrideDefaults({}, this.getDefaultParams(), e), this.secondaryScroll = null, this.isAboutPageEnabled = i.isFeatureOn(s.featureFlags.ABOUT_PAGE_ENABLED), this.isAboutPageVisible = h.observable(!1), this.registerDisposable(this.state.selectedCategory.subscribe(function () {
      r.execute(function () {
        I.call(this, n.element);
      }, u, !0);
    })), this.model = { categories: C(this.params.preferences()) }, L(this.model), i.isFeatureOn(s.featureFlags.SHOW_UNLISTED_SETTINGS) || A(this.model), D(this.model), o = t(this.model.categories).map(function (e) {
      return e.preferenceItems;
    }).flatten().map(function (e) {
      return e.id;
    }).sort().value(), _.call(this, t.filter(this.params.preferences(), function (e) {
      return t.indexOf(o, e.description.id) >= 0;
    })), this.applyState(this.model), H.call(this), this.setContext(h.dataFor(n.element)), this.registerEvent(s.events.navigation.FRAGMENT_SHOW, H, l.DIRECTION.ANY, this), this.registerEvent(s.events.navigation.FRAGMENT_HIDE, B, l.DIRECTION.ANY, this), d.resolve(s.serviceLocator.PUBSUB).publish(s.events.navigation.FRAGMENT_REMOVE_ALL_HIDDEN);
  }
  var t = e("lodash-compat"), n = e("cafe/applicationInstance"), r = e("utils/common/async"), i = e("utils/common/builderMixin"), s = e("constants/common"), o = e("browser/dom"), u = e("swx-utils-common").stopwatch, a = e("swx-enums"), f = e("utils/common/eventHelper"), l = e("utils/common/eventMixin"), c = e("swx-i18n").localization, h = e("vendor/knockout"), p = e("utils/common/scroll"), d = e("services/serviceLocator"), v = e("utils/common/disposableMixin"), m = e("utils/common/stateMixin"), g = e("ui/viewModels/userSettings/utils"), y = e("experience/settings").userSettings.hiddenCategories, b = e("experience/settings").userSettings.hiddenPreferences, w = e("telemetry/settings/settingsPageTelemetry"), E = e("ui/viewModels/userSettings/preferenceViewModel"), S = e("ui/viewModels/userSettings/preferenceMapping").mapping, x = e("ui/viewModels/userSettings/preferenceMapping").groups, T = a.preferenceType;
  return q.prototype.switchCategory = function (t, n) {
    var r = h.dataFor(n.target);
    r && r.id ? (P(this.model, r.id()), this.isAboutPageVisible(!1), this.applyState(this.model)) : (this.isAboutPageVisible(!0), this.state.selectedCategory().id("about"));
  }, q.prototype.getInitialState = function () {
    return {
      categories: [],
      selectedCategory: null
    };
  }, q.prototype.getDefaultParams = function () {
    function t() {
      return e.preferences && e.preferences();
    }
    var e = n.get().personsAndGroupsManager.mePerson;
    return {
      preferences: t() || [],
      eventEmitter: f.emptyEmitter
    };
  }, t.assign(q.prototype, v), t.assign(q.prototype, m), t.assign(q.prototype, l), t.assign(q, i), q;
})
