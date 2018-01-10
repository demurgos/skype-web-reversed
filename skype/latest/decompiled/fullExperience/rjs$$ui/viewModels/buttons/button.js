define("ui/viewModels/buttons/button", [
  "require",
  "vendor/knockout",
  "swx-i18n",
  "ui/contextMenu/contextMenu"
], function (e) {
  function i(e) {
    function s() {
      var t = "btn ";
      return i.disabled() && (t += "disabled "), typeof e.cssClass == "function" ? t += e.cssClass() : t += e.cssClass, t;
    }
    function o() {
      var n = t.utils.unwrapObservable(e.icon);
      return n ? (n = n.split(" "), n.length ? (n.unshift("iconfont"), n.join(" ")) : {}) : {};
    }
    function u() {
      return !i.disabled() && i.hasMenuOptions();
    }
    function a(e) {
      var t = i.menuOptions(), n = {
          source: "button",
          isGroupConversation: !1
        };
      e.customClientOptions = { offsetElement: e.target };
      r.show(t, e, n);
    }
    function f(e) {
      r.hide(e);
    }
    function l(e) {
      return typeof e == "function" ? e : e === undefined || e === null ? t.observable(!1) : t.observable(e);
    }
    function c(e) {
      if (e.text)
        throw new Error("You have to provide i18n enabled textKey param value or set already localized value to i18nText instead of text");
      if (e.title)
        throw new Error("You have to provide i18n enabled titleKey param value or set already localized value to i18nTitle instead of using title property");
      if (!e.textKey && !e.i18nText)
        throw new Error("You have to set either textKey or i18nText parameters");
      e.cssClass = e.cssClass || [];
    }
    var i = this;
    c(e);
    i.ariaLabel = e.ariaLabel;
    i.title = e.title;
    i.disabled = l(e.disabled);
    i.tabindex = t.observable(e.tabindex);
    i.buttonCssClass = t.computed(s, i);
    i.spanCssClass = t.computed(o, i);
    i.hasMenuOptions = e.hasMenuOptions ? e.hasMenuOptions : t.observable(!1);
    i.showMenuOptions = e.showMenuOptions ? e.showMenuOptions : t.computed(u, i);
    i.menuOptions = e.menuOptions ? e.menuOptions : t.observable([]);
    i.ariaHasPopup = t.observable(!1);
    i.hasFocus = e.hasFocus ? e.hasFocus : t.observable(!1);
    i.dispose = function () {
      i.buttonCssClass.dispose();
      i.spanCssClass.dispose();
      i.showMenuOptions.dispose && i.showMenuOptions.dispose();
    };
    i.onClickHandler = function (t, n) {
      i.hasMenuOptions() ? r.isShowing() ? f(n) : a(n) : e.action(n);
    };
    e.textKey ? i.text = n.fetch({ key: e.textKey }) : i.text = e.i18nText;
    e.titleKey ? i.title = n.fetch({ key: e.titleKey }) : e.i18nTitle && (i.title = e.i18nTitle);
    e.ariaLabelKey && (i.ariaLabel = n.fetch({ key: e.ariaLabelKey }));
    e.ariaHasPopup && i.ariaHasPopup(!0);
  }
  var t = e("vendor/knockout"), n = e("swx-i18n").localization, r = e("ui/contextMenu/contextMenu");
  return i;
});
