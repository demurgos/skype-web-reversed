define("jSkype/models/allGroup", [
  "require",
  "jcafe-property-model",
  "jSkype/client",
  "swx-enums",
  "jSkype/services/serviceFactory",
  "jSkype/modelHelpers/contacts/dataHandlers/factory",
  "swx-agentProvisioningService",
  "swx-i18n",
  "jSkype/models/group",
  "swx-enums",
  "jSkype/modelHelpers/personHelper",
  "jSkype/modelHelpers/contacts/dataMappers/dataMaps",
  "lodash-compat",
  "constants/common",
  "utils/common/settablePromise",
  "jSkype/settings",
  "jSkype/constants/people"
], function (e) {
  function y(e) {
    a.call(this), this.persons = b(e), g = null;
  }
  function b(e) {
    var u = t.collection({
      get: function () {
        function u() {
          g.resolve(), g = null;
        }
        function a(e) {
          g.reject(e), g = null;
        }
        if (n.get().signInManager.state() !== r.loginState.SignedIn)
          return Promise.reject("signed out");
        if (n.get().personsAndGroupsManager._initialized())
          return Promise.resolve();
        if (g)
          return g;
        g = d.build();
        var o = s.getContactListHandlers();
        return l.isGuest(e) ? o.onSuccess({
          response: {
            count: 0,
            contacts: []
          }
        }).then(u) : i.getContactsService().getMyContacts(e.id()).then(o.onSuccess, o.onError).then(u, a), g;
      }
    });
    return u.asWritable({
      add: function (t, r, a, c) {
        function b() {
          s.getContactRequestSentHandlers().onSuccess(t);
        }
        function w(e) {
          s.getContactRequestSentHandlers().onError(e, t);
        }
        function T() {
          s.getContactRequestAcceptedHandlers().onSuccess(t);
        }
        function N(e) {
          s.getContactRequestAcceptedHandlers().onError(e);
        }
        var h;
        if (t.isAgent() && c === f.ContactRequestOutgoingAgent) {
          var p = n.get().signInManager._skypeToken, d = v.settings.agentProvisioningService, g = o.build(p, d);
          t._authorization._set(m.PENDING_OUTGOING), h = g.add(t.id()).then(b, w);
        }
        if (c && !l.isGuestId(r) && !t.isAgent()) {
          var y = i.getStratusService();
          E(c) ? h = y.sendContactRequest(r, x(t)).then(b, w) : S(c) && (h = y.acceptContactRequest(r), h.then(T, N));
        }
        return u(r) || u.add(t, r, a), h || Promise.resolve();
      },
      remove: function (t, n) {
        function a() {
          var e = i.getContactsService();
          return e.deleteContact(t, w(o)).then(c, h);
        }
        function f() {
          var e = i.getStratusService();
          return e.deleteContact(t).then(c, h);
        }
        function c() {
          s.getContactDeletedHandlers().onSuccess(o);
        }
        function h(e) {
          s.getContactDeletedHandlers().onError(e);
        }
        var r, o = u(t);
        return n || l.isGuestId(t) ? (u.remove(t), r = Promise.resolve()) : v.isFeatureOn(p.featureFlags.DELETE_CONTACT_USING_CONTACTS_SERVICE) ? r = a() : r = f(), r;
      }
    });
  }
  function w(e) {
    return h.findKey(c.contactTypes, function (t) {
      return t === e._type();
    });
  }
  function E(e) {
    return e === f.ContactRequestOutgoing || e === f.ContactRequestOutgoingResend || e === f.ContactRequestOutgoingAgent || e === f.SuggestedContact;
  }
  function S(e) {
    return e === f.ContactRequestIncoming;
  }
  function x(e) {
    return u.fetch({
      key: "message_text_contactRequestGreeting",
      params: { displayName: e.displayName() }
    });
  }
  var t = e("jcafe-property-model"), n = e("jSkype/client"), r = e("swx-enums"), i = e("jSkype/services/serviceFactory"), s = e("jSkype/modelHelpers/contacts/dataHandlers/factory"), o = e("swx-agentProvisioningService"), u = e("swx-i18n").localization, a = e("jSkype/models/group"), f = e("swx-enums").activityType, l = e("jSkype/modelHelpers/personHelper"), c = e("jSkype/modelHelpers/contacts/dataMappers/dataMaps"), h = e("lodash-compat"), p = e("constants/common"), d = e("utils/common/settablePromise"), v = e("jSkype/settings"), m = e("jSkype/constants/people").authorizationStates, g;
  return y.prototype = new a(), y.prototype.constructor = y, y.prototype._reset = function () {
    this.persons.empty(), g = null;
  }, y;
})
