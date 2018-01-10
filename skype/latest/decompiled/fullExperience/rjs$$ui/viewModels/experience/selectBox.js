define("ui/viewModels/experience/selectBox", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "swx-utils-common",
  "swx-constants",
  "browser/dom",
  "utils/common/eventHelper",
  "utils/common/eventMixin",
  "swx-focus-handler",
  "swx-i18n",
  "swx-constants",
  "vendor/knockout",
  "utils/common/scroll",
  "utils/common/accessibility",
  "swx-utils-common"
], function (e, t) {
  function v(e) {
    function N() {
      g && a.get().addFocusRequestToQueue(y, a.Priorities.High);
    }
    function C(e) {
      function r(t) {
        return new RegExp("^" + e, "i").test(d.normalize(t.name));
      }
      window.clearTimeout(E);
      e === v ? w = w < u.length - 1 ? w + 1 : 0 : (w = 0, n ? u = t.selectOptions().filter(r) : (e = v + e, u = u.filter(r)));
      n = !1;
      v = e;
      E = window.setTimeout(function () {
        n = !0;
      }, S);
    }
    function k() {
      t.selectBoxOpened(!0);
      p.announce({ key: "accessibility_selectBox_expanded" });
      A();
    }
    function L() {
      t.selectBoxOpened(!1);
      p.announce({ key: "accessibility_selectBox_collapsed" });
      O();
      v = "";
      n = !0;
      window.clearTimeout(E);
      N();
    }
    function A() {
      r.execute(function () {
        document.addEventListener(i.events.browser.CLICK, L);
        window.addEventListener(i.events.browser.RESIZE, L);
      });
    }
    function O() {
      document.removeEventListener(i.events.browser.CLICK, L);
      window.removeEventListener(i.events.browser.RESIZE, L);
    }
    var t = this, n = !0, u = [], v = "", m, g = e.autoFocusAfterSelection || !1, y, b, w, E, S = 700, x = ".SelectBox-header", T = ".SelectBox-scrollWrapper";
    t.selectOptions = e.selectOptions ? e.selectOptions : [];
    t.selectedOption = e.selectedOption ? e.selectedOption : c.observable();
    t.showArrow = e.showArrow ? e.showArrow : !0;
    t.selectBoxOpened = c.observable(!1);
    t.tabindex = e.tabindex ? e.tabindex : null;
    t.disabled = e.disabled ? e.disabled : c.observable(!1);
    t.selectBoxId = e.selectBoxId || null;
    e.placeholderKey ? c.isObservable(e.placeholderKey) ? t.placeholder = c.pureComputed(function () {
      return f.fetch({ key: e.placeholderKey() });
    }) : t.placeholder = f.fetch({ key: e.placeholderKey }) : e.placeholder ? t.placeholder = e.placeholder : t.placeholder = "";
    t.selectValue = function (e) {
      t.selectedOption(e);
      L();
    };
    t.toggleSelectBox = function () {
      if (t.disabled())
        return !1;
      t.selectBoxOpened() ? L() : k();
    };
    t.dispose = function () {
      t.placeholder.dispose && t.placeholder.dispose();
      m.dispose();
      O();
    };
    t.init = function (e) {
      y = s.getElement(x, e);
      b = s.getElement(T, e);
      m = h.build(b);
      m.init();
      t.registerEvent(i.events.selectBox.TOGGLE, t.toggleSelectBox);
    };
    t.listKeyDown = function (e, n) {
      var r = o.getKeyCode(n);
      if (r === l.TAB && t.selectBoxOpened()) {
        L();
        n.stopPropagation();
        return;
      }
      return o.isNumPadKey(n) && (C(o.getNumpadKey(n)), n.stopPropagation()), o.isAlphaNumericKey(n) && (C(String.fromCharCode(r)), n.stopPropagation()), !0;
    };
    t.onKeyDown = function (e, n) {
      var r = o.getKeyCode(n);
      return r === l.TAB && n.shiftKey && t.selectBoxOpened() && L(), (r === l.ENTER || r === l.SPACE) && t.toggleSelectBox(), !0;
    };
    t.onBoxClick = function (e, t) {
      t.stopPropagation();
    };
  }
  var n = e("lodash-compat"), r = e("swx-utils-common").async, i = e("swx-constants").COMMON, s = e("browser/dom"), o = e("utils/common/eventHelper"), u = e("utils/common/eventMixin"), a = e("swx-focus-handler"), f = e("swx-i18n").localization, l = e("swx-constants").KEYS, c = e("vendor/knockout"), h = e("utils/common/scroll"), p = e("utils/common/accessibility").narrator, d = e("swx-utils-common").stringUtils;
  n.assign(v.prototype, u);
  t.build = function (e) {
    return new v(e);
  };
});
