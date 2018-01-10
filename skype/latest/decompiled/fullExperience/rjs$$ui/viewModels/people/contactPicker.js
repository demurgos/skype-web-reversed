define("ui/viewModels/people/contactPicker", [
  "require",
  "vendor/knockout",
  "usertiming",
  "swx-cafe-application-instance",
  "swx-i18n",
  "experience/settings",
  "swx-enums",
  "utils/common/ko",
  "swx-constants",
  "swx-constants",
  "swx-service-locator-instance",
  "services/telemetry/common/afterRenderHandler",
  "ui/viewModels/people/contactListHelper",
  "ui/viewModels/people/baseContactList",
  "ui/modelHelpers/personHelper",
  "ui/telemetry/telemetryClient",
  "utils/common/accessibility"
], function (e) {
  function w() {
    function M() {
      return i.state() === g.STATE_SEARCH;
    }
    function _() {
      return i.state() === g.STATE_DEFAULT;
    }
    function D() {
      var e = i.hasSearchList() && i.contactsCount() > 0, t = i.hasDefaultList() && i.contactGroups().length > 0;
      return e || t;
    }
    function P(e) {
      var t, n = r.get().personsAndGroupsManager.all.persons();
      return t = n.filter(function (t) {
        var n = !d.isAuthorizedContact(t);
        return n || d.isAgent(t) && H(t, e);
      }), t;
    }
    function H(e, t) {
      return j(e) ? B(t) && !F(e) : !0;
    }
    function B(e) {
      return !!e.selfParticipant && e.selfParticipant.audio.state() === o.callConnectionState.Connected;
    }
    function j(e) {
      return typeof e.capabilities._groupChat == "function" && e.capabilities._groupChat();
    }
    function F(e) {
      return typeof e.capabilities._gvc == "function" && e.capabilities._gvc() && e.capabilities.audio();
    }
    function I(e) {
      var t = P(e), n;
      n = C().map(function (e) {
        return e.person;
      });
      i.exclusionList = n.concat(t);
    }
    var e, i = this, w = t.observable(""), C = null, k = null, L = l.resolve(a.serviceLocator.FEATURE_FLAGS), A = null, O = null;
    p.call(i);
    i.searchResults = t.observableArray();
    i.selectedContacts = t.observableArray();
    i.state = t.observable(g.STATE_DEFAULT);
    i.hasSearchList = t.computed(M);
    i.hasDefaultList = t.computed(_);
    i.isVisible = t.computed(D);
    i.css = t.computed(w);
    i.spacesEnabled = L.isFeatureOn(a.featureFlags.SPACES);
    e = i.hasSearchList.subscribe(function (e) {
      e && m.announce({ key: "input_placeholder_typeContactName" });
    });
    i.init = function (e, n) {
      return i.showJumpToConversation = e.showJumpToConversation, w(e.className), t.isObservable(e.conversation.participants) ? i.exclusionList = P(e.conversation) : (C = e.conversation.participants, A = C.subscribe(), O = I.bind(null, e.conversation), C.changed(O)), i.registerEvent(y.ROSTER_QUERY_CHANGED, function (e) {
        e && Boolean(e.query) ? i.search(e.query, x(e.selectedContacts, i.exclusionList)) : (i.state(g.STATE_DEFAULT), i.contactsCount(0));
      }), i.registerEvent(y.ROSTER_SELECTION_REMOVED, function (e) {
        if (e && e.person) {
          var t = S(i.selectedContacts(), e.person.id());
          T(t);
          i.selectedContacts.remove(t);
          h.deselectContactFromDefaultList(t.getPerson(), i);
        }
      }), p.prototype.init.call(i, e, n);
    };
    i.dispose = function () {
      u.disposeAndClearArray(i.searchResults);
      u.disposeAndClearArray(i.selectedContacts);
      i.hasSearchList.dispose();
      i.hasDefaultList.dispose();
      i.isVisible.dispose();
      i.css.dispose();
      e.dispose();
      A !== null && (A.dispose(), A = null, C.changed.off(O), O = null, C = null);
      p.prototype.dispose.call(i);
    };
    i.afterRender = function () {
      function t() {
        var e = l.resolve(a.serviceLocator.PUBSUB);
        e.publish(a.events.search.LOCAL_SEARCH_RESULTS_RENDERED, { resultCount: i.contactsCount() });
      }
      var e = c(i.contactsCount(), t);
      return p.prototype.afterRender.call(i, e);
    };
    i.search = function (e, t) {
      var l = r.get().personsAndGroupsManager.createPersonSearchQuery(), c;
      n.mark(b.SEARCH.LOCAL.START);
      if (k !== null)
        try {
          k.cancel("Another search query triggered");
        } catch (p) {
          v.get().sendEvent(s.telemetry.uiTenantToken, a.telemetry.promiseInvalidStateException.TYPE, {
            feature: a.telemetry.promiseInvalidStateException.feature.CONTACT_PICKER,
            exception: JSON.stringify(p)
          });
        }
      return l.limit(f.searchLimit), l.sources(o.searchScope.AddressBook), l.text(e), c = l.getMore().then(function () {
        var e, r;
        if (c !== k)
          return;
        e = h.filterSearchResults(l.results(), t);
        k = null;
        i.state(g.STATE_SEARCH);
        n.mark(b.SEARCH.LOCAL.END);
        u.disposeAndClearArray(i.searchResults);
        i.contactsCount(e.length);
        i.searchResults(e);
        r = N(e.length);
        m.announce(r);
        i.dispatchEvent(y.ROSTER_QUERY_EXECUTED, { moreResultsAvailable: l.moreResultsAvailable() });
      }), k = c, k;
    };
    i.onContactSelected = function (e, t) {
      t.preventDefault();
      T(e);
      e.isActive() ? E(e, i.selectedContacts()) || (i.selectedContacts.push(e), i.dispatchEvent(y.PICKER_CONTACT_SELECTED, e.getPerson()), h.selectContactFromDefaultList(e.getPerson(), i)) : (i.selectedContacts.remove(S(i.selectedContacts(), e.id())), i.dispatchEvent(y.PICKER_CONTACT_DESELECTED, e.getPerson()), h.deselectContactFromDefaultList(e.getPerson(), i));
      i.state(g.STATE_DEFAULT);
    };
  }
  function E(e, t) {
    return Boolean(S(t, e.id()));
  }
  function S(e, n) {
    return t.utils.arrayFirst(e, function (e) {
      return e.id() === n;
    });
  }
  function x(e, t) {
    var n = e || [];
    return n.concat(t);
  }
  function T(e) {
    var t = e.isActive();
    e.isActive(!t);
  }
  function N(e) {
    var t;
    return e === 0 ? t = i.fetch({ key: "accessibility_contactPickerNoResults" }) : t = i.fetch({
      key: "accessibility_contactPickerUpdated",
      params: { totalSearchResults: e },
      count: e
    }), t;
  }
  var t = e("vendor/knockout"), n = e("usertiming"), r = e("swx-cafe-application-instance"), i = e("swx-i18n").localization, s = e("experience/settings"), o = e("swx-enums"), u = e("utils/common/ko"), a = e("swx-constants").COMMON, f = e("swx-constants").PEOPLE, l = e("swx-service-locator-instance").default, c = e("services/telemetry/common/afterRenderHandler"), h = e("ui/viewModels/people/contactListHelper"), p = e("ui/viewModels/people/baseContactList"), d = e("ui/modelHelpers/personHelper"), v = e("ui/telemetry/telemetryClient"), m = e("utils/common/accessibility").narrator, g = f.contactPicker.states, y = a.events.roster, b = a.telemetry.performanceMarks;
  return w.prototype = new p(), w.prototype.constructor = w, w;
});
