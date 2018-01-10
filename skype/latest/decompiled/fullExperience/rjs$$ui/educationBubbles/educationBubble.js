define("ui/educationBubbles/educationBubble", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "browser/dom",
  "browser/document",
  "vendor/knockout",
  "swx-i18n",
  "swx-constants",
  "constants/cssClasses",
  "swx-constants",
  "swx-utils-common",
  "swx-g11n",
  "swx-service-locator-instance",
  "ui/telemetry/actions/actionNames",
  "experience/settings",
  "services/flagsApi/flagsProvider",
  "text!views/ui/educationBubbles.html",
  "text!views/ui/educationBubblesBusiness.html",
  "ui/viewModels/educationBubbles/educationBubbleViewModel",
  "ui/modalDialog/welcomeDialog"
], function (e, t) {
  function w(e, t, w, E, S) {
    function C() {
      return x.get(e);
    }
    function k() {
      var e = h.resolve(u.serviceLocator.FEATURE_FLAGS);
      return !x.get(b.WELCOME_DIALOG_FLAG_ID) && e.isFeatureOn(u.featureFlags.WELCOME_DIALOG);
    }
    function L() {
      var e = S && S.prerequisiteBubbleIds || [];
      return n.every(e, function (e) {
        return x.get(e);
      });
    }
    function A(e, t, n, r, s) {
      var o = i.querySelector(t), u = O(n, s), a = d.appBaseUrl + r;
      return o ? (D(e, o, u, a, M(s)), x.set(e), q(e), !0) : !1;
    }
    function O(e, t) {
      return t && t.i18nParams ? o.fetch({
        key: e,
        params: t.i18nParams
      }) : o.fetch({ key: e });
    }
    function M(e) {
      return e && (e.i18nTitleKey && (e.title = o.fetch({ key: e.i18nTitleKey })), e.i18nButtonKey && (e.buttonText = o.fetch({ key: e.i18nButtonKey }))), e;
    }
    function D(e, t, n, r, i) {
      var o = P(i), u = o.parentNode;
      N = y.build(e, t, u, n, r, i);
      j(o);
      F(o, N);
      I(o, N);
      c.initLocaleDirection(o);
      s.applyBindings(N, o);
    }
    function P(e) {
      var t = r.createElement("div"), n = H();
      return t.innerHTML = T, t = t.firstChild, d.mode && r.addClass(t, a.educationBubbles.PREFIX + d.mode), e && e.size === u.educationBubbles.SIZE.LARGE && r.addClass(t, a.educationBubbles.LARGE), n.appendChild(t), t;
    }
    function H() {
      var e = B(d.controls.content.toLowerCase()), t = B(d.controls.sidebar.toLowerCase());
      return r.findFirstCommonAncestor(e, t);
    }
    function B(e) {
      var t = h.resolve(u.serviceLocator.CONTROLS_BUILDER), s = n.find(t.registeredElements, function (t) {
          return t.name === e;
        }).element;
      return r.isElement(s) || (s = i.querySelector(s)), s;
    }
    function j(e) {
      var t = function () {
        e.parentNode.removeChild(e);
        e.removeEventListener(u.events.browser.TRANSITIONEND, t);
      };
      e.addEventListener(u.events.browser.TRANSITIONEND, t);
    }
    function F(e, t) {
      function n(s) {
        var o = r.getLastChildElement(e);
        o.contains(s.target) || (t.hidden(!0), i.removeEventListener(u.events.browser.CLICK, n));
      }
      l.execute(function () {
        i.addEventListener(u.events.browser.CLICK, n, !0);
      });
    }
    function I(e, t) {
      function n(e) {
        e.keyCode === f.ESCAPE && (t.hidden(!0), i.removeEventListener(u.events.browser.KEYDOWN, n));
      }
      i.addEventListener(u.events.browser.KEYDOWN, n);
    }
    function q(e) {
      var t = h.resolve(u.serviceLocator.ACTION_TELEMETRY);
      t.recordAction(p.educationBubbles.educationBubbleShown, { educationBubbleId: e });
    }
    var x, T, N;
    S && S.isBusinessFlagService ? (T = g, x = v.getInstance(S.isBusinessFlagService)) : (T = m, x = v.getInstance());
    this.show = function () {
      return x.fetchFlags().then(function () {
        return !C() && !k() && L() ? A(e, t, w, E, S) : !1;
      });
    };
    this.hide = function () {
      N && N.hidden(!0);
    };
  }
  var n = e("lodash-compat"), r = e("browser/dom"), i = e("browser/document"), s = e("vendor/knockout"), o = e("swx-i18n").localization, u = e("swx-constants").COMMON, a = e("constants/cssClasses"), f = e("swx-constants").KEYS, l = e("swx-utils-common").async, c = e("swx-g11n").globalization, h = e("swx-service-locator-instance").default, p = e("ui/telemetry/actions/actionNames"), d = e("experience/settings"), v = e("services/flagsApi/flagsProvider"), m = e("text!views/ui/educationBubbles.html"), g = e("text!views/ui/educationBubblesBusiness.html"), y = e("ui/viewModels/educationBubbles/educationBubbleViewModel"), b = e("ui/modalDialog/welcomeDialog");
  t.EDUCATION_BUBBLE_TEXT_ELEMENT_CLASS = "js-EducationBubble-text";
  t.build = function (e, t, n, r, i) {
    return new w(e, t, n, r, i);
  };
});
