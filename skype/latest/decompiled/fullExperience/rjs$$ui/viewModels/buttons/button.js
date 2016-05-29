define("ui/viewModels/buttons/button", [
  "require",
  "vendor/knockout",
  "swx-i18n",
  "ui/contextMenu/contextMenu",
  "browser/dom"
], function (e) {
  function s(e) {
    function o() {
      var t = "btn ";
      return s.disabled() && (t += "disabled "), typeof e.cssClass == "function" ? t += e.cssClass() : t += e.cssClass, t;
    }
    function u() {
      var n = t.utils.unwrapObservable(e.icon);
      return n ? (n = n.split(" "), n.length ? (n.unshift("iconfont"), n.join(" ")) : {}) : {};
    }
    function a() {
      return !s.disabled() && s.hasMenuOptions();
    }
    function f(e) {
      var t = s.menuOptions(), n = {
          source: "button",
          isGroupConversation: !1
        }, i = c(e);
      e.customClientOffset = i;
      r.show(t, e, n);
    }
    function l(e) {
      r.hide(e);
    }
    function c(e) {
      var t = e.target, n = i.getElementOffset(t), r = t.offsetWidth / 2;
      return n.offsetLeft += r, n.offsetTop += t.offsetHeight, n;
    }
    function h(e) {
      return typeof e == "function" ? e : e === undefined || e === null ? t.observable(!1) : t.observable(e);
    }
    function p(e) {
      if (e.text)
        throw new Error("You have to provide i18n enabled textKey param value or set already localized value to i18nText instead of text");
      if (e.title)
        throw new Error("You have to provide i18n enabled titleKey param value or set already localized value to i18nTitle instead of using title property");
      if (!e.textKey && !e.i18nText)
        throw new Error("You have to set either textKey or i18nText parameters");
      e.cssClass = e.cssClass || [];
    }
    var s = this;
    p(e);
    s.ariaLabel = e.ariaLabel ? e.ariaLabel : "";
    s.title = e.title ? e.title : "";
    s.disabled = h(e.disabled);
    s.tabindex = t.observable(e.tabindex);
    s.buttonCssClass = t.computed(o, s);
    s.spanCssClass = t.computed(u, s);
    s.hasMenuOptions = e.hasMenuOptions ? e.hasMenuOptions : t.observable(!1);
    s.showMenuOptions = e.showMenuOptions ? e.showMenuOptions : t.computed(a, s);
    s.menuOptions = e.menuOptions ? e.menuOptions : t.observable([]);
    s.dispose = function () {
      s.buttonCssClass.dispose();
      s.spanCssClass.dispose();
      s.showMenuOptions.dispose && s.showMenuOptions.dispose();
    };
    s.onClickHandler = function (t, n) {
      s.hasMenuOptions() ? r.isShowing() ? l(n) : f(n) : e.action(n);
    };
    e.textKey ? s.text = n.fetch({ key: e.textKey }) : s.text = e.i18nText;
    e.titleKey ? s.title = n.fetch({ key: e.titleKey }) : e.i18nTitle && (s.title = e.i18nTitle);
    e.ariaLabelKey && (s.ariaLabel = n.fetch({ key: e.ariaLabelKey }));
  }
  var t = e("vendor/knockout"), n = e("swx-i18n").localization, r = e("ui/contextMenu/contextMenu"), i = e("browser/dom");
  return s;
});
