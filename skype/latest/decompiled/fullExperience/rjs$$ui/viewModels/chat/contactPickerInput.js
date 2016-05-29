define("ui/viewModels/chat/contactPickerInput", [
  "require",
  "lodash-compat",
  "vendor/knockout",
  "utils/common/eventMixin",
  "swx-i18n",
  "constants/common",
  "services/serviceLocator",
  "constants/keys",
  "utils/common/eventHelper",
  "utils/common/async",
  "browser/dom",
  "utils/common/scroll"
], function (e) {
  function m() {
    function g(t) {
      var r = n.utils.arrayFirst(e.selectedContacts(), function (e) {
        return t.id() === e.id();
      });
      r || (e.selectedContacts.push(t), x(), S());
    }
    function y(t) {
      e.selectedContacts.remove(function (e) {
        return t.id() === e.id();
      });
    }
    function b(t) {
      e.inputValue() && t && e.showMoreResultsAvailableMessage(v && t.moreResultsAvailable);
    }
    function w(t) {
      t.length || e.showMoreResultsAvailableMessage(!1);
      var n = {
        query: t,
        selectedContacts: e.selectedContacts().slice()
      };
      e.dispatchEvent(h.roster.ROSTER_QUERY_CHANGED, n);
    }
    function E() {
      if (e.selectedContacts().length === 0)
        return;
      e.dispatchEvent(h.roster.ROSTER_SELECTION_REMOVED, { person: e.selectedContacts.pop() });
    }
    function S() {
      t.focus();
      f.execute(m.scrollToBottom);
    }
    function x() {
      e.inputValue(d);
      e.showMoreResultsAvailableMessage(!1);
    }
    var e = this, t = null, r = null, m;
    e.selectedContacts = n.observableArray();
    e.placeholder = n.computed(function () {
      return e.selectedContacts().length > 0 ? i.fetch({ key: "input_placeholder_addAnotherContact" }) : i.fetch({ key: "input_placeholder_typeContactName" });
    });
    e.inputValue = n.observable(d).extend({
      rateLimit: {
        timeout: p,
        method: "notifyWhenChangesStop"
      }
    });
    e.init = function (i) {
      r = i;
      v = o.resolve(s.serviceLocator.FEATURE_FLAGS).isFeatureOn(s.featureFlags.SHOW_SEARCH_QUERY_MORE_RESULTS_AVAILABLE);
      e.showMoreResultsAvailableMessage = n.observable(!1);
      t = r.querySelector("input");
      r.addEventListener(h.browser.CLICK, S);
      e.inputSubscription = e.inputValue.subscribe(w);
      e.registerEvent(h.roster.PICKER_CONTACT_SELECTED, g);
      e.registerEvent(h.roster.PICKER_CONTACT_DESELECTED, y);
      e.registerEvent(h.roster.ROSTER_QUERY_EXECUTED, b);
      m = c.build(l.getElement("div.scrollinWrapper", r));
      m.init();
      S();
    };
    e.dispose = function () {
      r.removeEventListener(h.browser.CLICK, S);
      e.inputSubscription && e.inputSubscription.dispose();
      e.placeholder.dispose();
      e.selectedContacts = null;
      m.dispose();
    };
    e.handleKeyDown = function (e, t) {
      var n = a.getKeyCode(t);
      return n === u.BACKSPACE && e.inputValue() === d ? (E(), e.showMoreResultsAvailableMessage(!1)) : n === u.ESCAPE && e.inputValue() !== d && (x(), t.stopPropagation()), !0;
    };
  }
  var t = e("lodash-compat"), n = e("vendor/knockout"), r = e("utils/common/eventMixin"), i = e("swx-i18n").localization, s = e("constants/common"), o = e("services/serviceLocator"), u = e("constants/keys"), a = e("utils/common/eventHelper"), f = e("utils/common/async"), l = e("browser/dom"), c = e("utils/common/scroll"), h = s.events, p = 500, d = "", v;
  return t.assign(m.prototype, r), m;
});
