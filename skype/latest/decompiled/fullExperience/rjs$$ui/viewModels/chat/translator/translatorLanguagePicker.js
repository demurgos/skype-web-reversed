define("ui/viewModels/chat/translator/translatorLanguagePicker", [
  "require",
  "exports",
  "module",
  "browser/dom",
  "vendor/knockout",
  "utils/common/eventHelper",
  "utils/common/scroll",
  "utils/common/outsideClickHandler",
  "swx-focus-handler"
], function (e, t) {
  function a(e, t) {
    function p(e, t) {
      return e.name.localeCompare(t.name);
    }
    function d() {
      a.menuOpened(!0);
      o.add(h, v);
      m();
    }
    function v() {
      a.menuOpened(!1);
      o.remove(h);
      g();
    }
    function m() {
      var e = n.getElement(".LanguagePicker-item.selected", t);
      e && e.scrollIntoView();
    }
    function g() {
      var e = n.getElement(".LanguagePicker-button", t);
      e && u.get().addFocusRequestToQueue(e);
    }
    var a = this, f = e.language, l = e.supportedLanguages.sort(p), c, h = e.class;
    a.init = function () {
      a.language = f;
      a.menuOpened = r.observable(!1);
      a.supportedLanguages = l;
      c = s.build(n.getElement("div.LanguagePicker-content", t));
      c.init();
      a.pickerClass = {};
      a.pickerClass[e.class] = !0;
      a.languageButtonLabel = e.ariaLabel;
      a.languageButtonHandler = function () {
        a.menuOpened() ? v() : d();
      };
      a.onLanguageButtonKeyDown = function (e, t) {
        var n = i.isActivation(t);
        return n && a.languageButtonHandler(), !n;
      };
      a.languageSelectionHandler = function (e) {
        f(e);
        v();
      };
    };
    a.dispose = function () {
      a.menuOpened() && v();
      c.dispose();
    };
  }
  var n = e("browser/dom"), r = e("vendor/knockout"), i = e("utils/common/eventHelper"), s = e("utils/common/scroll"), o = e("utils/common/outsideClickHandler"), u = e("swx-focus-handler");
  t.build = function (e, t) {
    return new a(e, t);
  };
});
