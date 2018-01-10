define("ui/viewModels/chat/sidebar", [
  "require",
  "lodash-compat",
  "vendor/knockout",
  "swx-i18n",
  "constants/components",
  "swx-constants",
  "swx-cafe-application-instance",
  "ui/telemetry/actions/actionNames",
  "swx-service-locator-instance",
  "ui/viewModels/chat/menuItem",
  "ui/telemetry/actions/actionSources"
], function (e) {
  function p() {
    function b() {
      e.itemsDisabled(!1);
    }
    function w() {
      e.itemsDisabled(!0);
    }
    function E(t) {
      e.isNotificationsCenterActive(t);
      t && e.isSearchActive(!1);
    }
    function S(t) {
      var n = { source: l.search.reset.content }, r = e.userSettingsMenuItem();
      e.items().forEach(function (e) {
        e.isActive(e.page === t.page);
        g.publish(h.search.RESET, n);
      });
      r.page !== t.page && r.isActive(!1);
    }
    function x() {
      e.isSearchActive(!1);
    }
    function T(t) {
      t !== "" && e.isSearchActive(!0);
    }
    function N() {
      var t = [];
      return e.isNavigationMenuIconsEnabled ? (t.push(f.build(k())), v && t.push(f.build(L())), d && t.push(f.build(A())), e.isUserSettingsEnabled() && t.push(f.build(O())), t.push(f.build(C()))) : e.isSidebarInAlternativeLayout ? (t = [
        f.build(C()),
        f.build(k())
      ], v && t.push(f.build(L())), d && t.push(f.build(A()))) : (t = [f.build(k())], v && t.push(f.build(L())), t.push(f.build(C())), d && t.push(f.build(A()))), t.forEach(function (e, t) {
        e.ordinal = t + 1;
      }), t;
    }
    function C() {
      return {
        navigation: {
          page: i.chat.NEW_CONVERSATION,
          origin: c.NEW_CHAT_DUMMY
        },
        id: "newChat",
        icon: "add",
        text: r.fetch({ key: "button_text_newChat" }),
        isDisabled: e.itemsDisabled
      };
    }
    function k() {
      return {
        navigation: {
          page: i.people.CONTACTS_PAGE,
          origin: c.CONTACTS_PAGE
        },
        telemetry: {
          uiAction: u.contacts.openPage,
          perfMarker: s.telemetry.performanceMarks.CONTACTS.PAGE.OPENED
        },
        id: "contacts",
        icon: "skypeAddressBook",
        text: r.fetch({ key: "contactPage_text_menuLink" }),
        isDisabled: e.itemsDisabled
      };
    }
    function L() {
      return {
        navigation: {
          page: i.people.DISCOVER_AGENTS_PAGE,
          origin: c.DISCOVER_AGENTS_PAGE
        },
        telemetry: {
          uiAction: u.discoverAgents.openPage,
          perfMarker: s.telemetry.performanceMarks.DISCOVER_AGENTS.PAGE.OPENED
        },
        id: "discoverAgents",
        icon: "botAdd",
        text: r.fetch({ key: "button_text_discover_agents" }),
        isDisabled: e.itemsDisabled
      };
    }
    function A() {
      return {
        navigation: {
          page: i.calling.SKYPEOUT_PAGE,
          origin: c.SKYPEOUT_PAGE
        },
        telemetry: {
          uiAction: u.skypeOut.openPage,
          perfMarker: s.telemetry.performanceMarks.SKYPEOUT.PAGE.OPENED,
          event: {
            name: s.telemetry.pstn.eventName.PSTN_BUTTON_CLICKED,
            data: {}
          }
        },
        id: "dialpad",
        icon: "dialpad",
        text: r.fetch({ key: "button_text_dialpad" }),
        isDisabled: e.itemsDisabled
      };
    }
    function O() {
      return {
        navigation: {
          page: i.userSettings.USER_SETTINGS_PAGE,
          origin: c.SKYPEOUT_PAGE
        },
        telemetry: {
          uiAction: u.userSettings.openPage,
          perfMarker: s.telemetry.performanceMarks.USER_SETTINGS.PAGE.OPENED
        },
        id: "userSettings",
        icon: "settings",
        text: r.fetch({ key: "settings_page_text_header" }),
        isDisabled: e.itemsDisabled
      };
    }
    function M() {
      var n = t.clone(e.items()), r = m ? n.length - 2 : n.length - 1;
      e.items.removeAll();
      n.splice(r, 0, f.build(O()));
      n.forEach(function (t) {
        e.items.push(t);
      });
    }
    var e = this, p = a.resolve(s.serviceLocator.FEATURE_FLAGS), d = p.isFeatureOn(s.featureFlags.PSTN_ENABLED), v = p.isFeatureOn(s.featureFlags.AGENTS_DISCOVERABLE), m = p.isFeatureOn(s.featureFlags.ALTERNATIVE_SETTINGS_POSITION), g = a.resolve(s.serviceLocator.PUBSUB), y = t.once(M);
    e.items = n.observableArray();
    e.itemsDisabled = n.observable(!0);
    e.userSettingsMenuItem = n.observable();
    e.isSearchActive = n.observable(!1);
    e.isNotificationsCenterActive = n.observable(!1);
    e.isNavigationMenuIconsEnabled = p.isFeatureOn(s.featureFlags.NAVIGATION_MENU_ICONS_ENABLED);
    e.isNotificationsCenterEnabled = p.isFeatureOn(s.featureFlags.NOTIFICATIONS_CENTER);
    e.isSidebarInAlternativeLayout = p.isFeatureOn(s.featureFlags.ALTERNATIVE_SIDEBAR_LAYOUT_ENABLED);
    e.isUserSettingsEnabled = n.observable(!1);
    e.hideRecents = n.computed(function () {
      return e.isSearchActive() || e.isNotificationsCenterActive();
    });
    e.init = function () {
      function n() {
        var n = o.get().personsAndGroupsManager.mePerson.preferences(), r = p.isFeatureOn(s.featureFlags.USER_SETTINGS_ENABLED);
        e.isUserSettingsEnabled(r && !!n.length);
        e.isNavigationMenuIconsEnabled && e.isUserSettingsEnabled() && y();
        t && (t.dispose(), t = null);
      }
      var t;
      g.subscribe(h.search.RESET, x);
      g.subscribe(h.search.QUERY_CHANGED, T);
      g.subscribe(h.navigation.NAVIGATE, S);
      g.subscribe(h.navigation.NOTIFICATIONS_CENTER, E);
      g.subscribe(s.apiUIEvents.SWX_TIMELINE_LOADED, b);
      g.subscribe(s.apiUIEvents.SWX_ON_SIGN_OUT, w);
      N().forEach(function (t) {
        e.items.push(t);
      });
      e.userSettingsMenuItem(f.build(O()));
      o.get().personsAndGroupsManager.mePerson.preferences().length ? n() : t = o.get().personsAndGroupsManager.mePerson.preferences.changed(n);
    };
    e.dispose = function () {
      g.unsubscribe(h.search.RESET, x);
      g.unsubscribe(h.search.QUERY_CHANGED, T);
      g.unsubscribe(h.navigation.NAVIGATE, S);
      g.unsubscribe(h.navigation.NOTIFICATIONS_CENTER, E);
      g.unsubscribe(s.apiUIEvents.SWX_TIMELINE_LOADED, b);
      g.unsubscribe(s.apiUIEvents.SWX_ON_SIGN_OUT, w);
      e.hideRecents.dispose();
    };
  }
  var t = e("lodash-compat"), n = e("vendor/knockout"), r = e("swx-i18n").localization, i = e("constants/components"), s = e("swx-constants").COMMON, o = e("swx-cafe-application-instance"), u = e("ui/telemetry/actions/actionNames"), a = e("swx-service-locator-instance").default, f = e("ui/viewModels/chat/menuItem"), l = e("ui/telemetry/actions/actionSources"), c = s.telemetry.historyLoadOrigin, h = s.events;
  return p;
});
