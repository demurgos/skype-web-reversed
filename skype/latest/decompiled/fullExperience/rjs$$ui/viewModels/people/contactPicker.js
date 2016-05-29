define("ui/viewModels/people/contactPicker", [
  "require",
  "vendor/knockout",
  "usertiming",
  "cafe/applicationInstance",
  "experience/settings",
  "swx-enums",
  "utils/common/ko",
  "constants/common",
  "constants/people",
  "services/serviceLocator",
  "services/telemetry/common/afterRenderHandler",
  "ui/viewModels/people/contactListHelper",
  "ui/viewModels/people/baseContactList",
  "ui/modelHelpers/personHelper",
  "ui/telemetry/telemetryClient"
], function (e) {
  function y() {
    function k() {
      return e.state() === v.STATE_SEARCH;
    }
    function L() {
      return e.state() === v.STATE_DEFAULT;
    }
    function A() {
      var t = e.hasSearchList() && e.contactsCount() > 0, n = e.hasDefaultList() && e.contactGroups().length > 0;
      return t || n;
    }
    function O() {
      var e, t = r.get().personsAndGroupsManager.all.persons();
      return e = t.filter(function (e) {
        var t = !p.isAuthorizedContact(e);
        return t || M(e);
      }), e;
    }
    function M(e) {
      return p.isAgent(e) && typeof e.capabilities._groupChat == "function" && !e.capabilities._groupChat();
    }
    function _() {
      var t = O(), n;
      n = x().map(function (e) {
        return e.person;
      });
      e.exclusionList = n.concat(t);
    }
    var e = this, y = t.observable(""), x = null, T = null, N = f.resolve(u.serviceLocator.FEATURE_FLAGS), C = null;
    h.call(e);
    e.searchResults = t.observableArray();
    e.selectedContacts = t.observableArray();
    e.state = t.observable(v.STATE_DEFAULT);
    e.hasSearchList = t.computed(k);
    e.hasDefaultList = t.computed(L);
    e.isVisible = t.computed(A);
    e.css = t.computed(y);
    e.spacesEnabled = N.isFeatureOn(u.featureFlags.SPACES);
    e.selectedItemTextDetails = t.observable("");
    e.init = function (n, r) {
      return e.showJumpToConversation = n.showJumpToConversation, y(n.className), t.isObservable(n.conversation.participants) ? e.exclusionList = O() : (x = n.conversation.participants, C = x.subscribe(), x.changed(_)), e.registerEvent(m.ROSTER_QUERY_CHANGED, function (t) {
        t && Boolean(t.query) ? e.search(t.query, E(t.selectedContacts, e.exclusionList)) : (e.state(v.STATE_DEFAULT), e.contactsCount(0));
      }), e.registerEvent(m.ROSTER_SELECTION_REMOVED, function (t) {
        if (t && t.person) {
          var n = w(e.selectedContacts(), t.person.id());
          S(n);
          e.selectedContacts.remove(n);
          c.deselectContactFromDefaultList(n.getPerson(), e);
        }
      }), h.prototype.init.call(e, n, r);
    };
    e.dispose = function () {
      o.disposeAndClearArray(e.searchResults);
      o.disposeAndClearArray(e.selectedContacts);
      e.hasSearchList.dispose();
      e.hasDefaultList.dispose();
      e.isVisible.dispose();
      e.css.dispose();
      C !== null && (C.dispose(), C = null, x.changed.off(_), x = null);
      h.prototype.dispose.call(e);
    };
    e.afterRender = function () {
      function n() {
        var t = f.resolve(u.serviceLocator.PUBSUB);
        t.publish(u.events.search.LOCAL_SEARCH_RESULTS_RENDERED, { resultCount: e.contactsCount() });
      }
      var t = l(e.contactsCount(), n);
      return e.selectedItemTextDetails(""), h.prototype.afterRender.call(e, t);
    };
    e.search = function (t, f) {
      var l = r.get().personsAndGroupsManager.createPersonSearchQuery(), h;
      n.mark(g.SEARCH.LOCAL.START);
      if (T !== null)
        try {
          T.cancel("Another search query triggered");
        } catch (p) {
          d.get().sendEvent(i.telemetry.uiTenantToken, u.telemetry.promiseInvalidStateException.TYPE, {
            feature: u.telemetry.promiseInvalidStateException.feature.CONTACT_PICKER,
            exception: JSON.stringify(p)
          });
        }
      return l.limit(a.searchLimit), l.sources(s.searchScope.AddressBook), l.text(t), h = l.getMore().then(function () {
        if (h !== T)
          return;
        var t = c.filterSearchResults(l.results(), f);
        T = null;
        e.state(v.STATE_SEARCH);
        n.mark(g.SEARCH.LOCAL.END);
        o.disposeAndClearArray(e.searchResults);
        e.contactsCount(t.length);
        e.searchResults(t);
        e.dispatchEvent(m.ROSTER_QUERY_EXECUTED, { moreResultsAvailable: l.moreResultsAvailable() });
      }), T = h, T;
    };
    e.onContactSelected = function (t, n) {
      n.preventDefault();
      S(t);
      t.isActive() ? b(t, e.selectedContacts()) || (e.selectedContacts.push(t), e.dispatchEvent(m.PICKER_CONTACT_SELECTED, t.getPerson()), c.selectContactFromDefaultList(t.getPerson(), e)) : (e.selectedContacts.remove(w(e.selectedContacts(), t.id())), e.dispatchEvent(m.PICKER_CONTACT_DESELECTED, t.getPerson()), c.deselectContactFromDefaultList(t.getPerson(), e));
      e.state(v.STATE_DEFAULT);
    };
  }
  function b(e, t) {
    return Boolean(w(t, e.id()));
  }
  function w(e, n) {
    return t.utils.arrayFirst(e, function (e) {
      return e.id() === n;
    });
  }
  function E(e, t) {
    var n = e || [];
    return n.concat(t);
  }
  function S(e) {
    var t = e.isActive();
    e.isActive(!t);
  }
  var t = e("vendor/knockout"), n = e("usertiming"), r = e("cafe/applicationInstance"), i = e("experience/settings"), s = e("swx-enums"), o = e("utils/common/ko"), u = e("constants/common"), a = e("constants/people"), f = e("services/serviceLocator"), l = e("services/telemetry/common/afterRenderHandler"), c = e("ui/viewModels/people/contactListHelper"), h = e("ui/viewModels/people/baseContactList"), p = e("ui/modelHelpers/personHelper"), d = e("ui/telemetry/telemetryClient"), v = a.contactPicker.states, m = u.events.roster, g = u.telemetry.performanceMarks;
  return y.prototype = new h(), y.prototype.constructor = y, y;
});
