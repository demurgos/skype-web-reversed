define("ui/viewModels/chat/sidebar", [
  "require",
  "vendor/knockout",
  "swx-i18n",
  "constants/components",
  "constants/common",
  "cafe/applicationInstance",
  "ui/telemetry/actions/actionNames",
  "services/serviceLocator",
  "ui/viewModels/chat/menuItem",
  "ui/telemetry/actions/actionSources"
], function (e) {
  function h() {
    function g() {
      e.itemsDisabled(!1);
    }
    function y() {
      e.itemsDisabled(!0);
    }
    function b(t) {
      e.isNotificationsCenterActive(t);
      t && e.isSearchActive(!1);
    }
    function w(t) {
      var n = { source: f.search.reset.content }, r = e.userSettingsMenuItem();
      e.items.forEach(function (e) {
        e.isActive(e.page === t.page);
        v.publish(c.search.RESET, n);
      });
      r.page !== t.page && r.isActive(!1);
    }
    function E() {
      e.isSearchActive(!1);
    }
    function S(t) {
      t !== "" && e.isSearchActive(!0);
    }
    function x() {
      var t = [];
      return e.isNavigationMenuIconsEnabled ? (t.push(a.build(N())), d && t.push(a.build(C())), p && t.push(a.build(k())), e.isUserSettingsEnabled && t.push(a.build(L())), t.push(a.build(T()))) : e.isSidebarInAlternativeLayout ? (t = [
        a.build(T()),
        a.build(N())
      ], d && t.push(a.build(C())), p && t.push(a.build(k()))) : (t = [a.build(N())], d && t.push(a.build(C())), t.push(a.build(T())), p && t.push(a.build(k()))), t.forEach(function (e, t) {
        e.ordinal = t + 1;
      }), t;
    }
    function T() {
      return {
        navigation: {
          page: r.chat.NEW_CONVERSATION,
          origin: l.NEW_CHAT_DUMMY
        },
        id: "newChat",
        icon: "add",
        text: n.fetch({ key: "button_text_new" }),
        isDisabled: e.itemsDisabled
      };
    }
    function N() {
      return {
        navigation: {
          page: r.people.CONTACTS_PAGE,
          origin: l.CONTACTS_PAGE
        },
        telemetry: {
          uiAction: o.contacts.openPage,
          perfMarker: i.telemetry.performanceMarks.CONTACTS.PAGE.OPENED
        },
        id: "contacts",
        icon: "skypeAddressBook",
        text: n.fetch({ key: "contactPage_text_menuLink" }),
        isDisabled: e.itemsDisabled
      };
    }
    function C() {
      return {
        navigation: {
          page: r.people.DISCOVER_AGENTS_PAGE,
          origin: l.DISCOVER_AGENTS_PAGE
        },
        telemetry: {
          uiAction: o.discoverAgents.openPage,
          perfMarker: i.telemetry.performanceMarks.DISCOVER_AGENTS.PAGE.OPENED
        },
        id: "discoverAgents",
        icon: "botAdd",
        text: n.fetch({ key: "button_text_discover_agents" }),
        isDisabled: e.itemsDisabled
      };
    }
    function k() {
      return {
        navigation: {
          page: r.calling.SKYPEOUT_PAGE,
          origin: l.SKYPEOUT_PAGE
        },
        telemetry: {
          uiAction: o.skypeOut.openPage,
          perfMarker: i.telemetry.performanceMarks.SKYPEOUT.PAGE.OPENED,
          event: {
            name: i.telemetry.pstn.eventName.PSTN_BUTTON_CLICKED,
            data: {}
          }
        },
        id: "dialpad",
        icon: "dialpad",
        text: n.fetch({ key: "button_text_dialpad" }),
        isDisabled: e.itemsDisabled
      };
    }
    function L() {
      return {
        navigation: {
          page: r.userSettings.USER_SETTINGS_PAGE,
          origin: l.SKYPEOUT_PAGE
        },
        telemetry: {
          uiAction: o.userSettings.openPage,
          perfMarker: i.telemetry.performanceMarks.USER_SETTINGS.PAGE.OPENED
        },
        id: "userSettings",
        icon: "settings",
        text: n.fetch({ key: "settings_page_text_header" }),
        isDisabled: e.itemsDisabled
      };
    }
    var e = this, h = u.resolve(i.serviceLocator.FEATURE_FLAGS), p = h.isFeatureOn(i.featureFlags.PSTN_ENABLED), d = h.isFeatureOn(i.featureFlags.AGENTS_DISCOVERABLE), v = u.resolve(i.serviceLocator.PUBSUB), m = s.get().personsAndGroupsManager.mePerson.preferences();
    e.items = [];
    e.itemsDisabled = t.observable(!0);
    e.userSettingsMenuItem = t.observable();
    e.isSearchActive = t.observable(!1);
    e.isNotificationsCenterActive = t.observable(!1);
    e.isNavigationMenuIconsEnabled = h.isFeatureOn(i.featureFlags.NAVIGATION_MENU_ICONS_ENABLED);
    e.isNotificationsCenterEnabled = h.isFeatureOn(i.featureFlags.NOTIFICATIONS_CENTER);
    e.isSidebarInAlternativeLayout = h.isFeatureOn(i.featureFlags.ALTERNATIVE_SIDEBAR_LAYOUT_ENABLED);
    e.isUserSettingsEnabled = h.isFeatureOn(i.featureFlags.USER_SETTINGS_ENABLED) && !!m.length;
    e.hideRecents = t.computed(function () {
      return e.isSearchActive() || e.isNotificationsCenterActive();
    });
    e.init = function () {
      v.subscribe(c.search.RESET, E);
      v.subscribe(c.search.QUERY_CHANGED, S);
      v.subscribe(c.navigation.NAVIGATE, w);
      v.subscribe(c.navigation.NOTIFICATIONS_CENTER, b);
      v.subscribe(i.apiUIEvents.SWX_TIMELINE_LOADED, g);
      v.subscribe(i.apiUIEvents.SWX_ON_SIGN_OUT, y);
      Array.prototype.push.apply(e.items, x());
      e.userSettingsMenuItem(a.build(L()));
    };
    e.dispose = function () {
      v.unsubscribe(c.search.RESET, E);
      v.unsubscribe(c.search.QUERY_CHANGED, S);
      v.unsubscribe(c.navigation.NAVIGATE, w);
      v.unsubscribe(c.navigation.NOTIFICATIONS_CENTER, b);
      v.unsubscribe(i.apiUIEvents.SWX_TIMELINE_LOADED, g);
      v.unsubscribe(i.apiUIEvents.SWX_ON_SIGN_OUT, y);
      e.hideRecents.dispose();
    };
  }
  var t = e("vendor/knockout"), n = e("swx-i18n").localization, r = e("constants/components"), i = e("constants/common"), s = e("cafe/applicationInstance"), o = e("ui/telemetry/actions/actionNames"), u = e("services/serviceLocator"), a = e("ui/viewModels/chat/menuItem"), f = e("ui/telemetry/actions/actionSources"), l = i.telemetry.historyLoadOrigin, c = i.events;
  return h;
});
