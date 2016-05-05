define("ui/educationBubbles/educationBubble", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "browser/dom",
  "browser/document",
  "vendor/knockout",
  "swx-i18n",
  "constants/common",
  "constants/cssClasses",
  "constants/keys",
  "utils/common/async",
  "services/g11n/globalization",
  "services/serviceLocator",
  "ui/telemetry/actions/actionNames",
  "experience/settings",
  "services/flagsApi/flagsProvider",
  "text!views/ui/educationBubbles.html",
  "ui/viewModels/educationBubbles/educationBubbleViewModel",
  "ui/modalDialog/welcomeDialog"
], function (e, t) {
  function b(e, t, b, w, E) {
    function T() {
      return S.get(e);
    }
    function N() {
      var e = h.resolve(u.serviceLocator.FEATURE_FLAGS);
      return !S.get(y.WELCOME_DIALOG_FLAG_ID) && e.isFeatureOn(u.featureFlags.WELCOME_DIALOG);
    }
    function C() {
      var e = E && E.prerequisiteBubbleIds || [];
      return n.every(e, function (e) {
        return S.get(e);
      });
    }
    function k(e, t, n, r, s) {
      var o = i.querySelector(t), u = L(n, s), a = d.appBaseUrl + r;
      return o ? (A(e, o, u, a, s), S.set(e), j(e), !0) : !1;
    }
    function L(e, t) {
      return t && t.i18nParams ? o.fetch({
        key: e,
        params: t.i18nParams
      }) : o.fetch({ key: e });
    }
    function A(e, t, n, r, i) {
      var o = O(i), u = o.parentNode;
      x = g.build(e, t, u, n, r, i), P(o), H(o, x), B(o, x), c.initLocaleDirection(o), s.applyBindings(x, o);
    }
    function O(e) {
      var t = r.createElement("div"), n = M();
      return t.innerHTML = m, t = t.firstChild, d.mode && r.addClass(t, a.educationBubbles.PREFIX + d.mode), e && e.size === u.educationBubbles.SIZE.LARGE && r.addClass(t, a.educationBubbles.LARGE), n.appendChild(t), t;
    }
    function M() {
      var e = D(d.controls.content.toLowerCase()), t = D(d.controls.sidebar.toLowerCase());
      return r.findFirstCommonAncestor(e, t);
    }
    function D(e) {
      var t = h.resolve(u.serviceLocator.CONTROLS_BUILDER), s = n.find(t.registeredElements, function (t) {
          return t.name === e;
        }).element;
      return r.isElement(s) || (s = i.querySelector(s)), s;
    }
    function P(e) {
      var t = function () {
        e.parentNode.removeChild(e), e.removeEventListener(u.events.browser.TRANSITIONEND, t);
      };
      e.addEventListener(u.events.browser.TRANSITIONEND, t);
    }
    function H(e, t) {
      function n(s) {
        var o = r.getLastChildElement(e);
        o.contains(s.target) || (t.hidden(!0), i.removeEventListener(u.events.browser.CLICK, n));
      }
      l.execute(function () {
        i.addEventListener(u.events.browser.CLICK, n, !0);
      });
    }
    function B(e, t) {
      function n(e) {
        e.keyCode === f.ESCAPE && (t.hidden(!0), i.removeEventListener(u.events.browser.KEYDOWN, n));
      }
      i.addEventListener(u.events.browser.KEYDOWN, n);
    }
    function j(e) {
      var t = h.resolve(u.serviceLocator.ACTION_TELEMETRY);
      t.recordAction(p.educationBubbles.educationBubbleShown, { educationBubbleId: e });
    }
    var S, x;
    E && E.isBusinessFlagService ? S = v.getInstance(E.isBusinessFlagService) : S = v.getInstance(), this.show = function () {
      return S.fetchFlags().then(function () {
        return !T() && !N() && C() ? k(e, t, b, w, E) : !1;
      });
    }, this.hide = function () {
      x && x.hidden(!0);
    };
  }
  var n = e("lodash-compat"), r = e("browser/dom"), i = e("browser/document"), s = e("vendor/knockout"), o = e("swx-i18n").localization, u = e("constants/common"), a = e("constants/cssClasses"), f = e("constants/keys"), l = e("utils/common/async"), c = e("services/g11n/globalization"), h = e("services/serviceLocator"), p = e("ui/telemetry/actions/actionNames"), d = e("experience/settings"), v = e("services/flagsApi/flagsProvider"), m = e("text!views/ui/educationBubbles.html"), g = e("ui/viewModels/educationBubbles/educationBubbleViewModel"), y = e("ui/modalDialog/welcomeDialog");
  t.EDUCATION_BUBBLE_TEXT_ELEMENT_CLASS = "js-EducationBubble-text", t.build = function (e, t, n, r, i) {
    return new b(e, t, n, r, i);
  };
})
