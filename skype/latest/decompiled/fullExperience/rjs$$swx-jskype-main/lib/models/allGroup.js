(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/models/allGroup", [
      "require",
      "exports",
      "jcafe-property-model",
      "swx-jskype-internal-application-instance",
      "swx-enums",
      "../services/contactsV2/instance",
      "../modelHelpers/contacts/dataHandlers/factory",
      "swx-i18n",
      "./group",
      "swx-enums",
      "../modelHelpers/personHelper",
      "swx-utils-common/lib/settablePromise",
      "../telemetry/people/contactList",
      "../services/cache/instance",
      "swx-constants/lib/people",
      "swx-mri",
      "jskype-constants/lib/data",
      "../modelHelpers/contacts/dataHandlers/rawViewDataHandlers"
    ], e);
}(function (e, t) {
  function S(e) {
    var t = g.build(), u = n.collection({
        get: function () {
          function n(i) {
            i && (l.isGuest(e) ? t.onSuccess({
              response: {
                contacts: [],
                blocklist: []
              }
            }).then(u) : o(), r.get().personsAndGroupsManager._contactsCacheRestored.changed.off(n));
          }
          function o() {
            return h.onQueryContactListStart(), p.get().getItem(b.CONTACTS_RAW_VIEW_ETAG).then(function (n) {
              s.get().getRawViewDelta(e.id(), n).then(t.onSuccess, t.onError).then(u, a);
            });
          }
          function u() {
            w && (w.resolve(), w = null);
          }
          function a(e) {
            w && (w.reject(e), w = null);
          }
          return r.get().signInManager.state() !== i.loginState.SignedIn ? Promise.reject("signed out") : r.get().personsAndGroupsManager._initialized() ? Promise.resolve() : w ? w : (w = c.build(), r.get().personsAndGroupsManager._contactsCacheRestored.changed(n), w);
        }
      });
    return u.asWritable({
      add: function (t, n, r, i) {
        function l() {
          return t.isAgent() && i === f.activityType.ContactRequestOutgoingAgent && t._authorization._set(y.PENDING_OUTGOING), i === f.activityType.ContactRequestOutgoingPSTN ? s.get().addPSTNContact(e.id(), v.getKey(n, t._type()), n).then(h, p) : s.get().addContact(e.id(), v.getKey(n, t._type()), N(t)).then(h, p);
        }
        function c() {
          return s.get().acceptContactInvite(e.id(), v.getKey(n, t._type())).then(d, m);
        }
        function h() {
          o.getContactRequestSentHandlers().onSuccess(t);
        }
        function p(e) {
          o.getContactRequestSentHandlers().onError(e, t);
        }
        function d() {
          o.getContactRequestAcceptedHandlers().onSuccess(t);
        }
        function m(e) {
          o.getContactRequestAcceptedHandlers().onError(e);
        }
        var a;
        return i && !v.isGuestId(n) && (x(i) ? a = l() : T(i) && (a = c())), u(n) || u.add(t, n, r), a || Promise.resolve();
      },
      remove: function (t, n) {
        function a() {
          o.getContactDeletedHandlers().onSuccess(r);
        }
        function f(e) {
          o.getContactDeletedHandlers().onError(e);
        }
        var r = u(t), i;
        return n || v.isGuestId(t) ? (u.remove(t), i = Promise.resolve()) : i = s.get().deleteContact(e.id(), v.getKey(t, r._type())).then(a, f), i;
      }
    });
  }
  function x(e) {
    return e === f.activityType.ContactRequestOutgoing || e === f.activityType.ContactRequestOutgoingResend || e === f.activityType.ContactRequestOutgoingAgent || e === f.activityType.ContactRequestOutgoingPSTN || e === f.activityType.SuggestedContact;
  }
  function T(e) {
    return e === f.activityType.ContactRequestIncoming;
  }
  function N(e) {
    return u.localization.fetch({
      key: "message_text_contactRequestGreeting",
      params: { displayName: e.displayName() }
    });
  }
  var n = e("jcafe-property-model"), r = e("swx-jskype-internal-application-instance"), i = e("swx-enums"), s = e("../services/contactsV2/instance"), o = e("../modelHelpers/contacts/dataHandlers/factory"), u = e("swx-i18n"), a = e("./group"), f = e("swx-enums"), l = e("../modelHelpers/personHelper"), c = e("swx-utils-common/lib/settablePromise"), h = e("../telemetry/people/contactList"), p = e("../services/cache/instance"), d = e("swx-constants/lib/people"), v = e("swx-mri"), m = e("jskype-constants/lib/data"), g = e("../modelHelpers/contacts/dataHandlers/rawViewDataHandlers"), y = d["default"].authorizationStates, b = m["default"].storageKeys, w, E = function (e) {
      function t(t) {
        var n = e.call(this) || this;
        return n.name._set(i.groupType.Root), n.type._set(i.groupType.Root), n.relationshipLevel._set(i.groupPrivacyRelationshipLevel.None), n.uri._set(i.groupType.Root), n.persons = S(t), w = null, n;
      }
      return __extends(t, e), t.prototype._reset = function () {
        this.persons.empty();
        w = null;
      }, t;
    }(a["default"]);
  t.__esModule = !0;
  t["default"] = E;
}));
