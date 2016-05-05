define("ui/viewModels/experience/selectBox", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "utils/common/async",
  "constants/common",
  "browser/dom",
  "utils/common/eventHelper",
  "utils/common/eventMixin",
  "swx-i18n",
  "constants/keys",
  "vendor/knockout",
  "utils/common/scroll",
  "swx-utils-common"
], function (e, t) {
  function p(e) {
    function w(e) {
      function r(t) {
        return new RegExp("^" + e, "i").test(h.normalize(t.name));
      }
      window.clearTimeout(g), e === p ? m = m < u.length - 1 ? m + 1 : 0 : (m = 0, n ? u = t.selectOptions().filter(r) : (e = p + e, u = u.filter(r))), n = !1, p = e, g = window.setTimeout(function () {
        n = !0;
      }, y);
    }
    function E() {
      t.selectBoxOpened(!0), x();
    }
    function S() {
      t.selectBoxOpened(!1), T(), p = "", n = !0, window.clearTimeout(g);
    }
    function x() {
      r.execute(function () {
        document.addEventListener(i.events.browser.CLICK, S), window.addEventListener(i.events.browser.RESIZE, S);
      });
    }
    function T() {
      document.removeEventListener(i.events.browser.CLICK, S), window.removeEventListener(i.events.browser.RESIZE, S);
    }
    var t = this, n = !0, u = [], p = "", d, v, m, g, y = 700, b = ".SelectBox-scrollWrapper";
    t.selectOptions = e.selectOptions ? e.selectOptions : [], t.selectedOption = e.selectedOption ? e.selectedOption : l.observable(), t.showArrow = e.showArrow ? e.showArrow : !0, t.selectBoxOpened = l.observable(!1), t.tabindex = e.tabindex ? e.tabindex : null, t.disabled = e.disabled ? e.disabled : l.observable(!1), e.placeholderKey ? t.placeholder = a.fetch({ key: e.placeholderKey }) : e.placeholder ? t.placeholder = e.placeholder : t.placeholder = "", t.selectValue = function (e) {
      t.selectedOption(e), S();
    }, t.toggleSelectBox = function () {
      if (t.disabled())
        return !1;
      t.selectBoxOpened() ? S() : E();
    }, t.dispose = function () {
      d.dispose(), T();
    }, t.init = function (e) {
      v = s.getElement(b, e), d = c.build(v), d.init(), t.registerEvent(i.events.selectBox.TOGGLE, t.toggleSelectBox);
    }, t.listKeyDown = function (e, t) {
      var n = o.getKeyCode(t);
      return o.isNumPadKey(t) && (w(o.getNumpadKey(t)), t.stopPropagation()), o.isAlphaNumericKey(t) && (w(String.fromCharCode(n)), t.stopPropagation()), !0;
    }, t.onKeyDown = function (e, n) {
      var r = o.getKeyCode(n);
      return (r === f.ENTER || r === f.SPACE) && t.toggleSelectBox(), !0;
    }, t.onBoxClick = function (e, t) {
      t.stopPropagation();
    };
  }
  var n = e("lodash-compat"), r = e("utils/common/async"), i = e("constants/common"), s = e("browser/dom"), o = e("utils/common/eventHelper"), u = e("utils/common/eventMixin"), a = e("swx-i18n").localization, f = e("constants/keys"), l = e("vendor/knockout"), c = e("utils/common/scroll"), h = e("swx-utils-common").stringUtils;
  n.assign(p.prototype, u), t.build = function (e) {
    return new p(e);
  };
})
