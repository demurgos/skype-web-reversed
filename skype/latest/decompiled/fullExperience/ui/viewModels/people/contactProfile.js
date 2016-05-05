define("ui/viewModels/people/contactProfile", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "utils/common/eventMixin",
  "swx-i18n",
  "utils/common/cafeObservable",
  "vendor/knockout",
  "services/serviceLocator",
  "constants/common",
  "ui/telemetry/actions/actionNames",
  "ui/telemetry/actions/actionSources",
  "ui/modalDialog/modalDialog",
  "ui/viewModels/people/blockContactModal",
  "text!views/people/blockContactModal.html",
  "cafe/applicationInstance",
  "swx-enums",
  "ui/viewModels/people/deleteContactModal",
  "text!views/people/deleteContactModal.html",
  "ui/modelHelpers/personHelper"
], function (e, t) {
  function b(e, t) {
    function C() {
      return x() && !r.contact.isPstn() && !r.contact.isAgent();
    }
    function k() {
      r.isInContacts(y.isKnownPerson(E));
    }
    function L(e, t) {
      w.publish(a.events.interaction.SCROLL_START, t);
    }
    function A() {
      r.dispatchEvent(a.events.conversation.CLOSE_PROFILE, undefined, r.DIRECTION.PARENT), j();
    }
    function O() {
      return r.contact.isAgent() ? v.activityType.ContactRequestOutgoingAgent : v.activityType.ContactRequestOutgoing;
    }
    function M() {
      var e = u.resolve(a.serviceLocator.ACTION_TELEMETRY);
      e.recordAction(f.contacts.contactRequestSent, { isResend: !1 });
    }
    function D() {
      var e = E.isBlocked.set(!1);
      return P(), e;
    }
    function P() {
      var e = u.resolve(a.serviceLocator.ACTION_TELEMETRY);
      e.recordAction(f.contacts.contactUnblocked, N);
    }
    function H() {
      var e = new h(T, N), t = i.fetch({ key: "modal_blockContact_text_aria_label" });
      return c.build(h.ELEMENT_ID, e, p), c.show(h.ELEMENT_ID, t), Promise.resolve();
    }
    function B() {
      var e = {
        key: "label_text_blockContact_with_name",
        params: { name: r.contact.displayName() }
      };
      return S() && (e.key = "label_text_unblockContact_with_name"), i.fetch(e);
    }
    function j() {
      r.actionsInProgress(!1);
    }
    function F() {
      return !!r.contact.locationText();
    }
    function I() {
      return b.isFeatureOn(a.featureFlags.SHOW_AGENT_RATING_ON_PROFILE) && r.contact.isAgent() && $("rating");
    }
    function q() {
      return r.contact.isAgent() && $("author");
    }
    function R() {
      return r.contact.isAgent() && $("description");
    }
    function U() {
      return r.contact.isAgent() && $("website");
    }
    function z() {
      return r.contact.isAgent() && $("privacyStatement");
    }
    function W() {
      return r.contact.isAgent() && $("termsOfService");
    }
    function X() {
      return r.contact.isAgent() && $("extraInfo");
    }
    function V() {
      return r.contact.isAgent() && (z() || W());
    }
    function $(e) {
      var t;
      return J(e) ? (t = r.contact.agentDetails()[e](), t !== undefined && t !== null && ("" + t).trim().length > 0) : !1;
    }
    function J(e) {
      return !!r.contact.agentDetails() && typeof r.contact.agentDetails()[e] == "function";
    }
    var r = this, b = u.resolve(a.serviceLocator.FEATURE_FLAGS), w = u.resolve(a.serviceLocator.PUBSUB), E = e.conversationModel.participants(0).person, S = s.newObservableProperty(E.isBlocked), x = s.newObservableProperty(E.isBlocked.set.enabled), T = e.conversationTile.contact().getPerson(), N = { source: l.contactProfile };
    r.closeLabel = i.fetch({ key: "header_text_close" }), r.model = E, r.contact = e.conversationTile.contact(), r.avatar = s.newObservableProperty(e.conversationModel.avatarUrl), r.hasContactInfo = o.computed(F), r.actionsInProgress = o.observable(!1), r.canBlockContact = o.computed(C), r.isInContacts = o.observable(!1), r.blockContactText = o.computed(B), r.hasAgentRating = o.computed(I), r.hasAgentAuthor = o.computed(q), r.hasAgentDescription = o.computed(R), r.hasAgentWebsite = o.computed(U), r.hasAgentPrivacyStatement = o.computed(z), r.hasAgentTermsOfService = o.computed(W), r.hasAgentExtraInfo = o.computed(X), r.hasAgentPrivacyLinks = o.computed(V), r.addContact = function () {
      var t, n = O();
      return r.actionsInProgress(!0), d.get().conversationsManager.conversations.add(e.conversationModel), t = d.get().personsAndGroupsManager.all.persons.add(T, T.id(), undefined, n), M(), t.then(A, j), t;
    }, r.toggleContactBlocked = function () {
      var e;
      return r.actionsInProgress(!0), S() ? e = D() : e = H(), e.then(j, j), e;
    }, r.deleteContact = function () {
      var e = N.source, t = new m(r.contact, e, N), n = i.fetch({ key: "modal_deleteContact_text_aria_label" });
      return c.build(m.ELEMENT_ID, t, g), c.show(m.ELEMENT_ID, n), Promise.resolve();
    }, r.onScroll = n.debounce(L, 1000, {
      leading: !0,
      trailing: !1
    }), r.init = function () {
      t.init();
    }, r.dispose = function () {
      d.get().personsAndGroupsManager.all.persons.changed.off(k), r.hasContactInfo.dispose(), r.hasAgentRating.dispose(), r.hasAgentAuthor.dispose(), r.hasAgentDescription.dispose(), r.hasAgentWebsite.dispose(), r.hasAgentPrivacyStatement.dispose(), r.hasAgentTermsOfService.dispose(), r.hasAgentExtraInfo.dispose(), r.hasAgentPrivacyLinks.dispose(), r.contact.dispose(), r.canBlockContact.dispose(), r.blockContactText.dispose(), t.dispose();
    }, d.get().personsAndGroupsManager.all.persons.changed(k);
  }
  var n = e("lodash-compat"), r = e("utils/common/eventMixin"), i = e("swx-i18n").localization, s = e("utils/common/cafeObservable"), o = e("vendor/knockout"), u = e("services/serviceLocator"), a = e("constants/common"), f = e("ui/telemetry/actions/actionNames"), l = e("ui/telemetry/actions/actionSources"), c = e("ui/modalDialog/modalDialog"), h = e("ui/viewModels/people/blockContactModal"), p = e("text!views/people/blockContactModal.html"), d = e("cafe/applicationInstance"), v = e("swx-enums"), m = e("ui/viewModels/people/deleteContactModal"), g = e("text!views/people/deleteContactModal.html"), y = e("ui/modelHelpers/personHelper");
  n.assign(b.prototype, r), t.classFunction = b, t.build = function (e, t) {
    return new b(e, t);
  };
})
