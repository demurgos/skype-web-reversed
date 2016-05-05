define("ui/viewModels/chat/translator/translatorLanguagePicker", [
  "require",
  "exports",
  "module",
  "browser/dom",
  "vendor/knockout",
  "utils/common/eventHelper",
  "utils/common/scroll",
  "utils/common/outsideClickHandler"
], function (e, t) {
  function u(e, t) {
    function h(e, t) {
      return e.name.localeCompare(t.name);
    }
    function p() {
      u.menuOpened(!0), o.add(c, d), v();
    }
    function d() {
      u.menuOpened(!1), o.remove(c), m();
    }
    function v() {
      var e = n.getElement(".LanguagePicker-item.selected", t);
      e && e.scrollIntoView();
    }
    function m() {
      var e = n.getElement(".LanguagePicker-button", t);
      e && e.focus();
    }
    var u = this, a = e.language, f = e.supportedLanguages.sort(h), l, c = e.class;
    u.init = function () {
      u.language = a, u.menuOpened = r.observable(!1), u.supportedLanguages = f, l = s.build(n.getElement("div.LanguagePicker-content", t)), l.init(), u.pickerClass = {}, u.pickerClass[e.class] = !0, u.languageButtonLabel = e.ariaLabel, u.languageButtonHandler = function () {
        u.menuOpened() ? d() : p();
      }, u.onLanguageButtonKeyDown = function (e, t) {
        var n = i.isActivation(t);
        return n && u.languageButtonHandler(), !n;
      }, u.languageSelectionHandler = function (e) {
        a(e), d();
      };
    }, u.dispose = function () {
      u.menuOpened() && d(), l.dispose();
    };
  }
  var n = e("browser/dom"), r = e("vendor/knockout"), i = e("utils/common/eventHelper"), s = e("utils/common/scroll"), o = e("utils/common/outsideClickHandler");
  t.build = function (e, t) {
    return new u(e, t);
  };
})
