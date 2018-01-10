define("ui/viewModels/userSettings/userSettingsPageViewModel", [
  "require",
  "lodash-compat",
  "swx-cafe-application-instance",
  "swx-utils-common",
  "swx-utils-common",
  "swx-util-calling-stack",
  "swx-i18n",
  "swx-constants",
  "browser/dom",
  "swx-utils-common",
  "swx-enums",
  "utils/common/eventHelper",
  "utils/common/eventMixin",
  "vendor/knockout",
  "utils/common/scroll",
  "swx-service-locator-instance",
  "utils/common/disposableMixin",
  "utils/common/stateMixin",
  "ui/viewModels/userSettings/utils",
  "telemetry/settings/settingsPageTelemetry",
  "experience/settings",
  "ui/viewModels/userSettings/preferenceMapping",
  "ui/viewModels/userSettings/preferenceMapping",
  "ui/viewModels/userSettings/preferenceViewModel",
  "notifications/settings",
  "utils/common/styleModeHelper",
  "notifications/ringingDeferrer/ringingDeferrerUtil"
], function (e) {
  function D(e) {
    function r(e) {
      return y.isPrefSupported(e.description.id, x);
    }
    var n = [
      y.getCategory(T.NOTIFICATIONS),
      y.getCategory(T.CONTACTS),
      y.getCategory(T.IM_SETTINGS),
      y.getCategory(T.IM_APPEARANCE),
      y.getCategory(T.PRIVACY),
      y.getCategory(T.UNLISTED),
      y.getCategory(T.PERSONALIZATION)
    ];
    return t.filter(e, r).forEach(function (e) {
      var r = e.description.id, i = y.getPrefCategory(r, x, T.UNLISTED.id), s = t.find(n, { id: i });
      y.isUnlistedCategory(r, i, E, S) && (s = t.find(n, { id: T.UNLISTED.id }));
      s && s.preferenceItems.push(N.build(e));
    }), n;
  }
  function P(e) {
    var n = t(this.model.categories).pluck("preferenceItems").flatten().find({ id: e });
    if (!n && !!e.match(u.userSettings.preferences.DYNAMIC_DISCOVERY)) {
      var r = t.find(this.model.categories, { id: "contacts" });
      n = t(t.map(r.preferenceItems, "value").filter(t.isArray)[0]).find({ id: e });
    }
    return n;
  }
  function H(e) {
    return e.categories = t.reject(e.categories, function (e) {
      return e.preferenceItems.length === 0;
    }), e;
  }
  function B(e) {
    return e.categories = t.reject(e.categories, function (e) {
      return e.id === T.UNLISTED.id;
    }), e;
  }
  function j(e, n) {
    var r, i = e.description.id, s = e.description.type, o = P.call(this, i), a = u.userSettings.preferences, f;
    if (s === A.AutoBuddyDiscovery && t.isArray(n)) {
      r = t.map(n, function (t) {
        return N.build(t, e);
      });
      o.value = r;
      R.call(this, n);
      this.applyState(this.model);
      return;
    }
    i === a.NOTIFICATIONS && C.chatNotificationsMuted(!n);
    i === a.NOTIFICATIONS && this.isNotificationSoundsSettingEnabled && (f = P.call(this, a.NOTIFICATIONS_SOUND), n === !1 && f.value === !0 && f.toggleValue(), f.disabled = p.observable(!n));
    i === a.NOTIFICATIONS && !this.isNotificationSoundsSettingEnabled && L.isFeatureEnabled() && (f = P.call(this, a.DEFER_RINGING_SOUND), f.disabled = p.observable(!n), n || L.applyOption(l.ringingDeferrerOptions.Unset));
    i === a.NOTIFICATIONS_SOUND && C.notificationsSoundMuted(!n);
    i === a.NOTIFICATIONS_SOUND && L.isFeatureEnabled() && (f = P.call(this, a.DEFER_RINGING_SOUND), f.disabled = p.observable(!n), n || L.applyOption(l.ringingDeferrerOptions.Unset));
    i === a.DEFER_RINGING_SOUND && (L.areRingingSoundsDeferred() ? (o.uiToggled(!0), o.uiUpdateSelectOptionsTexts(), o.uiSelectedOption(n.option)) : o.uiToggled(!1));
    i === a.CHAT_NOTIFICATIONS_SOUND && C.chatNotificationsSoundMuted(!n);
    i === a.NOTIFICATIONS && this.isChatNotificationSoundsSettingEnabled && (f = P.call(this, a.CHAT_NOTIFICATIONS_SOUND), n === !1 && f.value === !0 && f.toggleValue(), f.disabled = p.observable(!n));
    i === a.CALL_NOTIFICATIONS && C.callNotificationsMuted(!n);
    i === a.CALL_NOTIFICATIONS && this.isCallNotificationSoundSettingEnabled && (f = P.call(this, a.CALL_NOTIFICATIONS_SOUND), n === !1 && f.value === !0 && f.toggleValue(), f.disabled = p.observable(!n));
    i === u.userSettings.preferences.DARK_THEME && !k.get().isIntegratedProperty() && (n ? document.body.classList.add("dark") : document.body.classList.remove("dark"));
    o.value = n;
    this.applyState(this.model);
  }
  function F(e, t) {
    var n = P.call(this, e);
    n.uiState === l.preferenceValueState.Unknown && (n.uiState = t);
    switch (t) {
    case l.preferenceValueState.Saving:
    case l.preferenceValueState.Defined:
      n.uiState = t;
    }
    this.applyState(this.model);
  }
  function I(e) {
    e.selectedCategory = t.head(e.categories) || {};
    X(e.selectedCategory.id);
  }
  function q(e, n) {
    var r = e.selectedCategory.id;
    e.selectedCategory = t.find(e.categories, { id: n }) || {};
    r !== e.selectedCategory.id && X(e.selectedCategory.id);
  }
  function R(e) {
    t.forEach(e, function (e) {
      this.registerDisposable(e.value.changed(j.bind(this, e)));
      this.registerDisposable(e.value.state.changed(F.bind(this, e.description.id)));
      !e.value.get.enabled() && e.value.get.enabled._set && e.value.get.enabled._set(!0);
      e.value.get();
    }, this);
  }
  function U() {
    if (this.fragmentVisibility) {
      v.resolve(u.serviceLocator.PUBSUB).publish(u.events.navigation.NAVIGATE_TO_PREVIOUS_PAGE);
      return;
    }
    this.fragmentVisibility = !0;
    this.pageOpenTimeMark = f.build();
  }
  function z() {
    this.fragmentVisibility = !1;
    W(this.pageOpenTimeMark);
    this.pageOpenTimeMark = null;
    this.pageOpenTimeMark = null;
  }
  function W(e) {
    b.build().sendDismissPageEvent(e && e.durationInSeconds());
  }
  function X(e) {
    b.build().sendShowPanelEvent(e);
  }
  function V(e) {
    this.scrollbar && this.unregisterDisposable(this.scrollbar);
    this.scrollbar = d.build(a.getElement(e, this.parentElement));
    this.registerDisposable(this.scrollbar);
    this.scrollbar.init();
  }
  function $(e) {
    var t = a.getElement(".UserSettingsPage-list", e);
    t && t.focus && t.focus();
  }
  function J() {
    var e = this, t = w.assetsBaseUrl ? w.assetsBaseUrl.match(/\d+.\d+.\d+/) : null;
    this.appVersion(w.version);
    this.assetsVersion(t ? t[0] : "");
    this.faqLink(w.faqPageUrl);
    this.isPluginSupported(!s.get().isPluginlessCallingSupported());
    n.get().devicesManager.mediaCapabilities.installedVersion.get().then(function (t) {
      e.pluginVersion(t);
      e.isPluginVersionFetched(!0);
    }, function () {
      e.pluginVersion(o.fetch({ key: "about_plugin_not_available" }));
      e.isPluginVersionFetched(!0);
    });
  }
  function K(e, n) {
    var i = v.resolve(u.serviceLocator.FEATURE_FLAGS), s, o = this;
    this.pageOpenTimeMark = null;
    this.state = g.overrideDefaults({}, this.getInitialState());
    this.params = g.overrideDefaults({}, this.getDefaultParams(), e);
    this.parentElement = n.element;
    this.scrollbar = null;
    this.isAboutPageEnabled = i.isFeatureOn(u.featureFlags.ABOUT_PAGE_ENABLED);
    this.isAboutPageVisible = p.observable(!1);
    this.isNotificationSoundsSettingEnabled = i.isFeatureOn(u.featureFlags.NOTIFICATIONS_SOUNDS_SETTING_ENABLED);
    this.isChatNotificationSoundsSettingEnabled = i.isFeatureOn(u.featureFlags.CHAT_NOTIFICATIONS_SOUND_SETTINGS_ENABLED);
    this.isCallNotificationSettingEnabled = i.isFeatureOn(u.featureFlags.CALL_NOTIFICATIONS_SETTINGS_ENABLED);
    this.isCallNotificationSoundSettingEnabled = i.isFeatureOn(u.featureFlags.CALL_NOTIFICATIONS_SOUND_SETTINGS_ENABLED);
    this.registerDisposable(this.state.selectedCategory.subscribe(function () {
      r.execute(function () {
        V.call(this, M);
      }, o, !0);
    }));
    this.model = { categories: D(this.params.preferences()) };
    this.appVersion = p.observable();
    this.assetsVersion = p.observable();
    this.pluginVersion = p.observable();
    this.faqLink = p.observable();
    this.isPluginSupported = p.observable();
    this.isPluginVersionFetched = p.observable(!1);
    H(this.model);
    i.isFeatureOn(u.featureFlags.SHOW_UNLISTED_SETTINGS) || B(this.model);
    I(this.model);
    s = t(this.model.categories).map(function (e) {
      return e.preferenceItems;
    }).flatten().map(function (e) {
      return e.id;
    }).sort().value();
    R.call(this, t.filter(this.params.preferences(), function (e) {
      return t.indexOf(s, e.description.id) >= 0;
    }));
    this.applyState(this.model);
    U.call(this);
    this.setContext(p.dataFor(n.element));
    this.registerEvent(u.events.navigation.FRAGMENT_SHOW, U, h.DIRECTION.ANY, this);
    this.registerEvent(u.events.navigation.FRAGMENT_HIDE, z, h.DIRECTION.ANY, this);
    v.resolve(u.serviceLocator.PUBSUB).publish(u.events.navigation.FRAGMENT_REMOVE_ALL_HIDDEN);
    r.execute($.bind(null, n.element), null, !1);
    this.isAboutPageEnabled && J.call(this);
  }
  var t = e("lodash-compat"), n = e("swx-cafe-application-instance"), r = e("swx-utils-common").async, i = e("swx-utils-common").builderMixin, s = e("swx-util-calling-stack"), o = e("swx-i18n").localization, u = e("swx-constants").COMMON, a = e("browser/dom"), f = e("swx-utils-common").stopwatch, l = e("swx-enums"), c = e("utils/common/eventHelper"), h = e("utils/common/eventMixin"), p = e("vendor/knockout"), d = e("utils/common/scroll"), v = e("swx-service-locator-instance").default, m = e("utils/common/disposableMixin"), g = e("utils/common/stateMixin"), y = e("ui/viewModels/userSettings/utils"), b = e("telemetry/settings/settingsPageTelemetry"), w = e("experience/settings"), E = w.userSettings.hiddenCategories, S = w.userSettings.hiddenPreferences, x = e("ui/viewModels/userSettings/preferenceMapping").mapping, T = e("ui/viewModels/userSettings/preferenceMapping").groups, N = e("ui/viewModels/userSettings/preferenceViewModel"), C = e("notifications/settings"), k = e("utils/common/styleModeHelper"), L = e("notifications/ringingDeferrer/ringingDeferrerUtil"), A = l.preferenceType, O = "about", M = ".UserSettingsPage-scroll-area", _ = ".UserSettingsPage-about-scroll";
  return K.prototype.switchCategory = function (t, n) {
    var r = p.dataFor(n.target);
    r && r.id ? (q(this.model, r.id()), this.isAboutPageVisible(!1), this.applyState(this.model)) : (V.call(this, _), this.state.selectedCategory().id(O), this.isAboutPageVisible(!0));
  }, K.prototype.getInitialState = function () {
    return {
      categories: [],
      selectedCategory: null
    };
  }, K.prototype.getDefaultParams = function () {
    function t() {
      return e.preferences && e.preferences();
    }
    var e = n.get().personsAndGroupsManager.mePerson;
    return {
      preferences: t() || [],
      eventEmitter: c.emptyEmitter
    };
  }, t.assign(K.prototype, m), t.assign(K.prototype, g), t.assign(K.prototype, h), t.assign(K, i), K;
});
