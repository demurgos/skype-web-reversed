define("jSkype/modelHelpers/contacts/dataHandlers/contactList", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "constants/common",
  "constants/people",
  "jSkype/constants/data",
  "jSkype/client",
  "jSkype/constants/people",
  "jSkype/modelHelpers/contacts/dataProcessors/contactList",
  "jSkype/settings",
  "utils/common/cache/instance",
  "browser/window",
  "jSkype/services/serviceFactory"
], function (e, t) {
  function p(e) {
    function d(e, t) {
      var n = e.reduce(function (e, t) {
        return t.authorized && (e.authorized += 1), !t.authorized && !t.suggested && (e.pendingOutgoing += 1), !t.authorized && t.suggested && (e.suggested += 1), e;
      }, {
        authorized: 0,
        pendingOutgoing: 0,
        suggested: 0
      });
      o.get()._telemetryManager.sendEvent(f.settings.telemetry.jSkypeTenantToken, r.telemetry.contacts.type.CONTACTS, {
        contactsCount: e.length,
        name: t,
        authorizedCount: n.authorized,
        pendingOutgoingCount: n.pendingOutgoing,
        suggestedCount: n.suggested
      }), o.get()._telemetry.eventBus.publish(r.events.contacts.CONTACTS_LOADED, { contactsCount: e.length });
    }
    function v(e) {
      var t = r.telemetry.contacts.name;
      g(e.scope) === i.scopes.FULL ? p(e.contacts, t.GET_CONTACT_LIST) : d(e.contacts, t.GET_CONTACT_LIST_DELTA);
    }
    function m() {
      var e = o.get().personsAndGroupsManager.mePerson.id();
      h.getContactsService().getMyContacts(e).then(t.onSuccess, t.onError), a = undefined;
    }
    function g(e) {
      return n.isString(e) ? e.toLowerCase() : "";
    }
    var t = this, a, p = n.once(d);
    t.onSuccess = function (t) {
      var n = e.process(t.response);
      return t.response && t.response.contacts && v(t.response), n.then(function (e) {
        if (f.isFeatureOn(r.featureFlags.CONTACT_PROFILE_CACHE) && e) {
          var t = e.getResponseHeader("ETag");
          t && l.get().setItem(s.ETAG, t);
        }
      }.bind(null, t.request));
    }, t.onError = function (e) {
      return e.status === 404 && !a && (o.get().personsAndGroupsManager._initialized(!0), a = c.setTimeout(m, u)), Promise.reject(e);
    };
  }
  var n = e("lodash-compat"), r = e("constants/common"), i = e("constants/people"), s = e("jSkype/constants/data").storageKeys, o = e("jSkype/client"), u = e("jSkype/constants/people").contactList.retry.TIMEOUT, a = e("jSkype/modelHelpers/contacts/dataProcessors/contactList"), f = e("jSkype/settings"), l = e("utils/common/cache/instance"), c = e("browser/window"), h = e("jSkype/services/serviceFactory");
  t.build = function () {
    var e = a.build();
    return new p(e);
  };
})
