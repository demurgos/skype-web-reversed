define("ui/viewModels/chat/navigation", [
  "require",
  "lodash-compat",
  "vendor/knockout",
  "cafe/applicationInstance",
  "swx-enums",
  "constants/common",
  "constants/components",
  "services/pubSub/pubSub",
  "services/serviceLocator",
  "services/telemetry/common/telemetryContext",
  "ui/viewModels/chat/navigationHelper",
  "utils/common/eventMixin",
  "ui/viewModels/chat/fragment"
], function (e) {
  function y(e) {
    return g.indexOf(e) !== -1;
  }
  function b(e) {
    return e === o.chat.NEW_CONVERSATION || e === o.userSettings.USER_SETTINGS_PAGE;
  }
  function w(e) {
    function x(e) {
      return t.fragments().filter(e)[0];
    }
    function T() {
      clearTimeout(t._cacheLimitOverflowCheckTimer), t._cacheLimitOverflowCheckTimer = setTimeout(L, m);
    }
    function N(e) {
      var t = e.options.model;
      return !t || t.selfParticipant && t.selfParticipant.audio.state() === i.callConnectionState.Disconnected;
    }
    function C() {
      return x(function (e) {
        return e.hidden() && N(e);
      });
    }
    function k(e) {
      t.fragments.remove(e), e.dispose();
    }
    function L() {
      if (t.fragments().length <= v)
        return;
      var e = C();
      e && k(e), T();
    }
    function A() {
      return x(function (e) {
        return !e.hidden();
      });
    }
    function O(e) {
      var t = A();
      t && t !== e && (t.setVisible(!1), b(t.name) && k(t)), e.setVisible(!0), P(e);
    }
    function M(e) {
      O(e.fragment);
    }
    function _(e) {
      var n = new h(e);
      return n.setContext(t), t.fragments.push(n), n;
    }
    function D(e) {
      var t = A(), n = B(e);
      n && k(n);
      if (E === e || E && E.model && e && e.model && E.model === e.model)
        E = null;
      t && t === n && q();
    }
    function P(e) {
      E = w ? w.options : null, w = e, S.currentPlaceModel(e.options.model), S.currentPlaceName(e.name), g.historyLoadOrigin = e.options.origin, u.publish(p.FRAGMENT_LOADED, e.name);
    }
    function H(e, t) {
      return t && t.name === e.page && t.options.model === e.model;
    }
    function B(e) {
      return x(function (t) {
        return H(e, t);
      });
    }
    function j(e) {
      var t = B(e);
      t ? (t.options = e, O(t)) : (t = _(e), y(e.page) && O(t)), T();
    }
    function F(e) {
      var t = B(e);
      t.options = e, t.setVisible(!0);
    }
    function I(t) {
      if (!t || !t.page)
        throw new TypeError("You need to specify where you navigate !");
      if (!t.contentElementId || t.contentElementId === e) {
        if (H(t, w)) {
          F(t);
          return;
        }
        j(t);
      }
    }
    function q() {
      var e = c.conversationsManager.conversations().length, t = c.signInManager.state() === i.loginState.SignedIn, n;
      if (!t)
        return;
      E && e ? u.publish(p.NAVIGATE, E) : e ? (n = {
        page: o.chat.CONVERSATION,
        model: c.conversationsManager.conversations()[0]
      }, u.publish(p.NAVIGATE, n)) : l.navigateToContactsPage();
    }
    function R(t) {
      if (!t.contentElementId || t.contentElementId === e)
        t.page = o.chat.CONVERSATION, u.publish(p.NAVIGATE, t);
    }
    function U() {
      t.shrinkContent(!1), t.expandContent(!0);
    }
    function z() {
      t.expandContent(!1), t.shrinkContent(!0);
    }
    function W() {
      [].concat(t.fragments()).forEach(function (e) {
        e.hidden() && N(e) && k(e);
      });
    }
    var t = this, c = r.get(), g, w, E, S;
    this.expandContent = n.observable(!1), this.shrinkContent = n.observable(!0), this.fragments = n.observableArray(), this.isInBackground = n.observable(!1), this.dispose = function () {
      u.unsubscribe(p.OPEN_CONVERSATION, R), u.unsubscribe(p.NAVIGATE, I), u.unsubscribe(d.SIDEBAR_STATE_CHANGED, this.isInBackground), u.unsubscribe(p.NAVIGATE_TO_PREVIOUS_PAGE, q), u.unsubscribe(d.SHOW_SIDEBAR, z), u.unsubscribe(d.HIDE_SIDEBAR, U), u.unsubscribe(p.FRAGMENT_REMOVE, D), u.unsubscribe(p.FRAGMENT_REMOVE_ALL_HIDDEN, W);
    }, this.handleUserAction = function () {
      return c.isEndpointActive && c.isEndpointActive.set(!0), !0;
    }, this.init = function () {
      u.subscribe(p.OPEN_CONVERSATION, R), u.subscribe(p.NAVIGATE, I), u.subscribe(d.SIDEBAR_STATE_CHANGED, this.isInBackground), u.subscribe(p.NAVIGATE_TO_PREVIOUS_PAGE, q), u.subscribe(d.SHOW_SIDEBAR, z), u.subscribe(d.HIDE_SIDEBAR, U), u.subscribe(p.FRAGMENT_REMOVE, D), u.subscribe(p.FRAGMENT_REMOVE_ALL_HIDDEN, W), this.registerEvent(p.COMPONENT_RENDERED, M), g = f.get(), S = a.resolve(s.serviceLocator.NAVIGATION_CONTEXT), u.publish(s.apiUIEvents.SWX_CONTENT_LOADED, { contentElementId: e }), c.signInManager.state.when(i.loginState.SignedOut, function () {
        t.fragments.removeAll(), S.reset(), w = undefined, E = undefined;
      });
    };
  }
  var t = e("lodash-compat"), n = e("vendor/knockout"), r = e("cafe/applicationInstance"), i = e("swx-enums"), s = e("constants/common"), o = e("constants/components"), u = e("services/pubSub/pubSub"), a = e("services/serviceLocator"), f = e("services/telemetry/common/telemetryContext"), l = e("ui/viewModels/chat/navigationHelper"), c = e("utils/common/eventMixin"), h = e("ui/viewModels/chat/fragment"), p = s.events.navigation, d = s.events.narrowMode, v = 1, m = 20000, g = [
      o.people.CONTACTS_PAGE,
      o.people.DISCOVER_AGENTS_PAGE,
      o.calling.SKYPEOUT_PAGE,
      o.userSettings.USER_SETTINGS_PAGE
    ];
  return t.assign(w.prototype, c), {
    build: function (e) {
      return new w(e);
    }
  };
})
