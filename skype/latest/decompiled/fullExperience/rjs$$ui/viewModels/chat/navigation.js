define("ui/viewModels/chat/navigation", [
  "require",
  "lodash-compat",
  "vendor/knockout",
  "swx-cafe-application-instance",
  "swx-enums",
  "swx-constants",
  "constants/components",
  "swx-pubsub-instance",
  "swx-service-locator-instance",
  "services/telemetry/common/telemetryContext",
  "ui/viewModels/chat/navigationHelper",
  "utils/common/eventMixin",
  "ui/viewModels/chat/fragment",
  "experience/settings"
], function (e) {
  function b(e) {
    return y.indexOf(e) !== -1;
  }
  function w(e) {
    return e === o.chat.NEW_CONVERSATION || e === o.userSettings.USER_SETTINGS_PAGE;
  }
  function E(e) {
    function T(e) {
      return t.fragments().filter(e)[0];
    }
    function N() {
      clearTimeout(t._cacheLimitOverflowCheckTimer);
      t._cacheLimitOverflowCheckTimer = setTimeout(A, g);
    }
    function C(e) {
      var t = e.options.model;
      return !t || t.selfParticipant && t.selfParticipant.audio.state() === i.callConnectionState.Disconnected;
    }
    function k() {
      return T(function (e) {
        return e.hidden() && C(e);
      });
    }
    function L(e) {
      t.fragments.remove(e);
      e.dispose();
    }
    function A() {
      if (t.fragments().length <= m)
        return;
      var e = k();
      e && L(e);
      N();
    }
    function O() {
      return T(function (e) {
        return !e.hidden();
      });
    }
    function M(e) {
      var t = O();
      t && t !== e && (t.setVisible(!1), w(t.name) && L(t));
      e.setVisible(!0);
      H(e);
    }
    function _(e) {
      M(e.fragment);
    }
    function D(e) {
      var n = new h(e);
      return n.setContext(t), t.fragments.push(n), n;
    }
    function P(e) {
      var t = O(), n = j(e);
      n && L(n);
      if (S === e || S && S.model && e && e.model && S.model === e.model)
        S = null;
      t && t === n && R();
    }
    function H(e) {
      S = E ? E.options : null;
      E = e;
      x.currentPlaceModel(e.options.model);
      x.currentPlaceName(e.name);
      y.historyLoadOrigin = e.options.origin;
      u.publish(d.FRAGMENT_LOADED, e.name);
    }
    function B(e, t) {
      return t && t.name === e.page && t.options.model === e.model;
    }
    function j(e) {
      return T(function (t) {
        return B(e, t);
      });
    }
    function F(e) {
      var t = j(e);
      t ? (t.options = e, M(t)) : (t = D(e), b(e.page) && M(t));
      N();
    }
    function I(e) {
      var t = j(e);
      t.options = e;
      t.setVisible(!0);
    }
    function q(t) {
      if (!t || !t.page)
        throw new TypeError("You need to specify where you navigate !");
      if (!t.contentElementId || t.contentElementId === e) {
        if (B(t, E)) {
          I(t);
          return;
        }
        if (p.API.version === 2 && t.origin === s.telemetry.historyLoadOrigin.CALLING)
          return;
        F(t);
      }
    }
    function R() {
      var e = c.conversationsManager.conversations().length, t = c.signInManager.state() === i.loginState.SignedIn, n;
      if (!t)
        return;
      S && e ? u.publish(d.NAVIGATE, S) : e ? (n = {
        page: o.chat.CONVERSATION,
        model: c.conversationsManager.conversations()[0]
      }, u.publish(d.NAVIGATE, n)) : l.navigateToContactsPage();
    }
    function U(t) {
      if (!t.contentElementId || t.contentElementId === e)
        t.page = o.chat.CONVERSATION, u.publish(d.NAVIGATE, t);
    }
    function z() {
      t.shrinkContent(!1);
      t.expandContent(!0);
    }
    function W() {
      t.expandContent(!1);
      t.shrinkContent(!0);
    }
    function X() {
      [].concat(t.fragments()).forEach(function (e) {
        e.hidden() && C(e) && L(e);
      });
    }
    var t = this, c = r.get(), y, E, S, x;
    this.expandContent = n.observable(!1);
    this.shrinkContent = n.observable(!0);
    this.fragments = n.observableArray();
    this.isInBackground = n.observable(!1);
    this.dispose = function () {
      u.unsubscribe(d.OPEN_CONVERSATION, U);
      u.unsubscribe(d.NAVIGATE, q);
      u.unsubscribe(v.SIDEBAR_STATE_CHANGED, this.isInBackground);
      u.unsubscribe(d.NAVIGATE_TO_PREVIOUS_PAGE, R);
      u.unsubscribe(v.SHOW_SIDEBAR, W);
      u.unsubscribe(v.HIDE_SIDEBAR, z);
      u.unsubscribe(d.FRAGMENT_REMOVE, P);
      u.unsubscribe(d.FRAGMENT_REMOVE_ALL_HIDDEN, X);
    };
    this.handleUserAction = function () {
      return c.isEndpointActive && c.isEndpointActive.set(!0), !0;
    };
    this.init = function () {
      var n = p.API.version === 2;
      u.subscribe(d.OPEN_CONVERSATION, U);
      u.subscribe(d.NAVIGATE, q);
      u.subscribe(v.SIDEBAR_STATE_CHANGED, this.isInBackground);
      u.subscribe(d.NAVIGATE_TO_PREVIOUS_PAGE, R);
      u.subscribe(v.SHOW_SIDEBAR, W);
      n || u.subscribe(v.HIDE_SIDEBAR, z);
      u.subscribe(d.FRAGMENT_REMOVE, P);
      u.subscribe(d.FRAGMENT_REMOVE_ALL_HIDDEN, X);
      this.registerEvent(d.COMPONENT_RENDERED, _);
      y = f.get();
      x = a.resolve(s.serviceLocator.NAVIGATION_CONTEXT);
      u.publish(s.apiUIEvents.SWX_CONTENT_LOADED, { contentElementId: e });
      c.signInManager.state.when(i.loginState.SignedOut, function () {
        t.fragments.removeAll();
        x.reset();
        E = undefined;
        S = undefined;
      });
    };
  }
  var t = e("lodash-compat"), n = e("vendor/knockout"), r = e("swx-cafe-application-instance"), i = e("swx-enums"), s = e("swx-constants").COMMON, o = e("constants/components"), u = e("swx-pubsub-instance").default, a = e("swx-service-locator-instance").default, f = e("services/telemetry/common/telemetryContext"), l = e("ui/viewModels/chat/navigationHelper"), c = e("utils/common/eventMixin"), h = e("ui/viewModels/chat/fragment"), p = e("experience/settings"), d = s.events.navigation, v = s.events.narrowMode, m = 1, g = 20000, y = [
      o.people.CONTACTS_PAGE,
      o.people.DISCOVER_AGENTS_PAGE,
      o.calling.SKYPEOUT_PAGE,
      o.userSettings.USER_SETTINGS_PAGE
    ];
  return t.assign(E.prototype, c), {
    build: function (e) {
      return new E(e);
    }
  };
});
