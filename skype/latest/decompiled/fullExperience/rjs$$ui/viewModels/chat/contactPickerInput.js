define("ui/viewModels/chat/contactPickerInput", [
  "require",
  "lodash-compat",
  "vendor/knockout",
  "utils/common/eventMixin",
  "swx-i18n",
  "swx-constants",
  "swx-service-locator-instance",
  "swx-constants",
  "utils/common/eventHelper",
  "swx-utils-common",
  "browser/dom",
  "utils/common/scroll",
  "swx-focus-handler",
  "utils/common/accessibility"
], function (e) {
  function y() {
    function b(t) {
      var r = n.utils.arrayFirst(e.selectedContacts(), function (e) {
        return t.id() === e.id();
      });
      r || (e.selectedContacts.push(t), p.announce({ key: "contact_isSelected" }), N(), T());
    }
    function w(t) {
      e.selectedContacts.remove(function (e) {
        return t.id() === e.id();
      });
      C(t.displayName());
    }
    function E(t) {
      e.inputValue() && t && e.showMoreResultsAvailableMessage(g && t.moreResultsAvailable);
      e.showSpinner(!1);
    }
    function S(t) {
      t.length || e.showMoreResultsAvailableMessage(!1);
      var n = {
        query: t,
        selectedContacts: e.selectedContacts().slice()
      };
      e.dispatchEvent(d.roster.ROSTER_QUERY_CHANGED, n);
      e.showSpinner(k(s.featureFlags.SHOW_PICKER_SPINNER) && t.length > 0);
    }
    function x() {
      var t;
      if (e.selectedContacts().length === 0)
        return;
      t = e.selectedContacts.pop();
      e.dispatchEvent(d.roster.ROSTER_SELECTION_REMOVED, { person: t });
      C(t.displayName());
    }
    function T() {
      h.get().addFocusRequestToQueue(t);
      f.execute(y.scrollToBottom);
    }
    function N() {
      e.inputValue(m);
      e.showMoreResultsAvailableMessage(!1);
    }
    function C(e) {
      p.announce({
        key: "accessibility_contactPickerResultRemoved",
        params: { displayName: e }
      });
    }
    function k(e) {
      return o.resolve(s.serviceLocator.FEATURE_FLAGS).isFeatureOn(e);
    }
    var e = this, t = null, r = null, y;
    e.showSpinner = n.observable(!1);
    e.selectedContacts = n.observableArray();
    e.placeholder = n.computed(function () {
      return e.selectedContacts().length > 0 ? i.fetch({ key: "input_placeholder_addAnotherContact" }) : i.fetch({ key: "input_placeholder_typeContactName" });
    });
    e.inputValue = n.observable(m).extend({
      rateLimit: {
        timeout: v,
        method: "notifyWhenChangesStop"
      }
    });
    e.init = function (i) {
      r = i;
      g = k(s.featureFlags.SHOW_SEARCH_QUERY_MORE_RESULTS_AVAILABLE);
      e.showMoreResultsAvailableMessage = n.observable(!1);
      t = r.querySelector("input");
      r.addEventListener(d.browser.CLICK, T);
      e.inputSubscription = e.inputValue.subscribe(S);
      e.registerEvent(d.roster.PICKER_CONTACT_SELECTED, b);
      e.registerEvent(d.roster.PICKER_CONTACT_DESELECTED, w);
      e.registerEvent(d.roster.ROSTER_QUERY_EXECUTED, E);
      y = c.build(l.getElement("div.scrollinWrapper", r));
      y.init();
      T();
    };
    e.dispose = function () {
      r.removeEventListener(d.browser.CLICK, T);
      e.inputSubscription && e.inputSubscription.dispose();
      e.placeholder.dispose();
      e.selectedContacts = null;
      y.dispose();
    };
    e.handleKeyDown = function (e, t) {
      var n = a.getKeyCode(t);
      return n === u.BACKSPACE && e.inputValue() === m ? (x(), e.showMoreResultsAvailableMessage(!1)) : n === u.ESCAPE && e.inputValue() !== m && (N(), t.stopPropagation()), !0;
    };
  }
  var t = e("lodash-compat"), n = e("vendor/knockout"), r = e("utils/common/eventMixin"), i = e("swx-i18n").localization, s = e("swx-constants").COMMON, o = e("swx-service-locator-instance").default, u = e("swx-constants").KEYS, a = e("utils/common/eventHelper"), f = e("swx-utils-common").async, l = e("browser/dom"), c = e("utils/common/scroll"), h = e("swx-focus-handler"), p = e("utils/common/accessibility").narrator, d = s.events, v = 500, m = "", g;
  return t.assign(y.prototype, r), y;
});
