define("ui/viewModels/people/contactProfile", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "utils/common/eventMixin",
  "swx-i18n",
  "utils/common/cafeObservable",
  "vendor/knockout",
  "swx-service-locator-instance",
  "swx-constants",
  "ui/telemetry/actions/actionSources",
  "ui/modalDialog/modalDialog",
  "ui/viewModels/people/blockContactModal",
  "text!views/people/blockContactModal.html",
  "swx-cafe-application-instance",
  "swx-enums",
  "ui/viewModels/people/deleteContactModal",
  "text!views/people/deleteContactModal.html",
  "ui/modelHelpers/personHelper",
  "ui/modelHelpers/groupHelper",
  "ui/modelHelpers/personActionsHelper"
], function (e, t) {
  function w(e, t) {
    function L() {
      return N() && !r.contact.isPstn();
    }
    function A() {
      r.isInContacts(g.isKnownPerson(x));
    }
    function O() {
      C(Z());
    }
    function M(e, t) {
      S.publish(a.events.interaction.SCROLL_START, t);
    }
    function D() {
      return r.contact.isAgent() ? d.activityType.ContactRequestOutgoingAgent : r.contact.isPstn() ? d.activityType.ContactRequestOutgoingPSTN : d.activityType.ContactRequestOutgoing;
    }
    function P() {
      var e = new c(w, k), t = w.isAgent() ? i.fetch({ key: "modal_block_agent_text_aria_label" }) : i.fetch({ key: "modal_blockContact_text_aria_label" });
      return l.build(c.ELEMENT_ID, e, h), l.show(c.ELEMENT_ID, t), Promise.resolve();
    }
    function H() {
      var e = {
        key: "label_text_blockContact_with_name",
        params: { name: r.contact.displayNameUnescaped() }
      };
      return T() && (e.key = "label_text_unblockContact_with_name"), i.fetch(e);
    }
    function B() {
      var e = { key: "favorites_add_to_favorite" };
      return C() && (e.key = "favorites_remove_from_favorite"), i.fetch(e);
    }
    function j() {
      var e = { key: g.isAgent(w) ? "label_text_delete_agent" : "label_text_deleteContact" };
      return i.fetch(e);
    }
    function F() {
      r.actionsInProgress(!1);
    }
    function I() {
      return !!r.contact.locationText();
    }
    function q() {
      return E.isFeatureOn(a.featureFlags.SHOW_AGENT_RATING_ON_PROFILE) && r.contact.isAgent() && G("rating");
    }
    function R() {
      return r.contact.isAgent() && G("author");
    }
    function U() {
      return r.contact.isAgent() && G("description");
    }
    function z() {
      return r.contact.isAgent() && G("website");
    }
    function W() {
      return r.contact.isAgent() && G("privacyStatement");
    }
    function X() {
      return r.contact.isAgent() && G("termsOfService");
    }
    function V() {
      return E.isFeatureOn(a.featureFlags.SHOW_AGENT_EXTRA_INFO_ON_PROFILE) && r.contact.isAgent() && G("extraInfo");
    }
    function $() {
      return r.contact.isAgent() && (W() || X());
    }
    function J() {
      return r.contact.isAgent() && G("capabilitiesText");
    }
    function K() {
      return R() || U() || r.showAgentId || q() || z();
    }
    function Q() {
      var e = r.contact.agentDetails();
      return r.contact.isAgent() ? e && e.capabilities && typeof e.capabilities.media_autoplay == "function" && !!e.capabilities.media_autoplay() : !1;
    }
    function G(e) {
      var t;
      return Y(e) ? (t = r.contact.agentDetails()[e](), t !== undefined && t !== null && ("" + t).trim().length > 0) : !1;
    }
    function Y(e) {
      return !!r.contact.agentDetails() && typeof r.contact.agentDetails()[e] == "function";
    }
    function Z() {
      return y.isPersonInGroup(d.groupType.Favorites, w);
    }
    function et() {
      var e = E.isFeatureOn(a.featureFlags.USE_BUSINESS_WORDING), t = E.isFeatureOn(a.featureFlags.ENABLE_BUSINESS_CONTACT_MANAGEMENT);
      return e && !t ? !1 : !0;
    }
    var r = this, w = e.conversationTile.contact().getPerson(), E = u.resolve(a.serviceLocator.FEATURE_FLAGS), S = u.resolve(a.serviceLocator.PUBSUB), x = e.conversationModel.participants(0).person, T = s.newObservableProperty(x.isBlocked), N = s.newObservableProperty(x.isBlocked.set.enabled), C = o.observable(Z()), k = { source: f.contactProfile };
    r.closeLabel = i.fetch({ key: "header_text_close" });
    r.model = e.conversationModel;
    r.contact = e.conversationTile.contact();
    r.avatar = s.newObservableProperty(e.conversationModel.avatarUrl);
    r.hasContactInfo = o.computed(I);
    r.enableContactsManagement = et;
    r.actionsInProgress = o.observable(!1);
    r.canBlockContact = o.computed(L);
    r.isInContacts = o.observable(!1);
    r.isOrganizationContact = g.isOrganizationContact(w);
    r.blockContactText = o.computed(H);
    r.favoriteContactText = o.computed(B);
    r.deleteContactText = o.computed(j);
    r.showAgentId = E.isFeatureOn(a.featureFlags.SHOW_AGENT_ID_ON_PROFILE);
    r.favoritesFeatureEnabled = E.isFeatureOn(a.featureFlags.FAVORITE_CONTACTS_ENABLED);
    r.hasAgentRating = o.computed(q);
    r.hasAgentAuthor = o.computed(R);
    r.hasAgentDescription = o.computed(U);
    r.hasAgentWebsite = o.computed(z);
    r.hasAgentPrivacyStatement = o.computed(W);
    r.hasAgentTermsOfService = o.computed(X);
    r.hasAgentExtraInfo = o.computed(V);
    r.hasAgentPrivacyLinks = o.computed($);
    r.hasAgentCapabilitiesText = o.computed(J);
    r.hasAgentDetailsToShow = o.computed(K);
    r.hasAgentCapabilityAutoPlay = o.computed(Q);
    r.addContact = function () {
      function i() {
        r.dispatchEvent(a.events.conversation.CLOSE_PROFILE, undefined, r.DIRECTION.PARENT);
        F();
      }
      var t, n = D();
      return r.actionsInProgress(!0), p.get().conversationsManager.conversations.add(e.conversationModel), t = b.addPerson(w, n, e.conversationModel, k, i, F), r.dispatchEvent(a.events.message.ADD_CONTACT, k, r.DIRECTION.PARENT), t;
    };
    r.toggleContactBlocked = function () {
      var e;
      return r.actionsInProgress(!0), T() ? e = b.unblockPerson(w, k) : e = P(), e.then(F, F), e;
    };
    r.deleteContact = function () {
      var e = new v(r.contact, k), t = g.isAgent(w) ? i.fetch({ key: "label_text_delete_agent" }) : i.fetch({ key: "modal_deleteContact_text_aria_label" });
      return l.build(v.ELEMENT_ID, e, m), l.show(v.ELEMENT_ID, t), Promise.resolve();
    };
    r.toggleFavoriteContact = function () {
      var e;
      return r.actionsInProgress(!0), C() ? e = b.removeFavorite(w, k) : e = b.addFavorite(w, k), e.then(F, F), e;
    };
    r.onScroll = n.debounce(M, 1000, {
      leading: !0,
      trailing: !1
    });
    r.init = function () {
      t.init();
    };
    r.dispose = function () {
      p.get().personsAndGroupsManager.all.persons.changed.off(A);
      y.unsubscribeFromGroup(d.groupType.Favorites, O);
      r.hasContactInfo.dispose();
      r.hasAgentRating.dispose();
      r.hasAgentAuthor.dispose();
      r.hasAgentDescription.dispose();
      r.hasAgentWebsite.dispose();
      r.hasAgentPrivacyStatement.dispose();
      r.hasAgentTermsOfService.dispose();
      r.hasAgentExtraInfo.dispose();
      r.hasAgentPrivacyLinks.dispose();
      r.hasAgentCapabilitiesText.dispose();
      r.hasAgentDetailsToShow.dispose();
      r.hasAgentCapabilityAutoPlay.dispose();
      r.canBlockContact.dispose();
      r.blockContactText.dispose();
      r.deleteContactText.dispose();
      r.favoriteContactText.dispose();
      t.dispose();
    };
    p.get().personsAndGroupsManager.all.persons.changed(A);
    y.subscribeToGroup(d.groupType.Favorites, O);
  }
  var n = e("lodash-compat"), r = e("utils/common/eventMixin"), i = e("swx-i18n").localization, s = e("utils/common/cafeObservable"), o = e("vendor/knockout"), u = e("swx-service-locator-instance").default, a = e("swx-constants").COMMON, f = e("ui/telemetry/actions/actionSources"), l = e("ui/modalDialog/modalDialog"), c = e("ui/viewModels/people/blockContactModal"), h = e("text!views/people/blockContactModal.html"), p = e("swx-cafe-application-instance"), d = e("swx-enums"), v = e("ui/viewModels/people/deleteContactModal"), m = e("text!views/people/deleteContactModal.html"), g = e("ui/modelHelpers/personHelper"), y = e("ui/modelHelpers/groupHelper"), b = e("ui/modelHelpers/personActionsHelper");
  n.assign(w.prototype, r);
  t.classFunction = w;
  t.build = function (e, t) {
    return new w(e, t);
  };
});
