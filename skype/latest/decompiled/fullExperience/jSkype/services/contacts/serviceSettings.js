define("jSkype/services/contacts/serviceSettings", [
  "require",
  "exports",
  "module",
  "jSkype/settings"
], function (e, t) {
  function r(e, n, r, i) {
    return i = i || t.reasons.default, e.replace(t.tokens.id, encodeURIComponent(n)).replace(t.tokens.version, r).replace(t.tokens.reason, i);
  }
  function i(e, t) {
    return e.reduce(function (e, n) {
      return e[n] = t(n), e;
    }, {});
  }
  function s(e) {
    return t.name + "-" + e;
  }
  function o(e) {
    return "${" + e + "}";
  }
  var n = e("jSkype/settings");
  t.getHost = function () {
    return n.settings.contactsProxyService.host;
  }, t.getMyContactsEndpoint = function (e, t, i) {
    return r(n.settings.contactsProxyService.myContactsEndpoint, e, t, i);
  }, t.getMyDeltaContactsEndpoint = function (e, t, i) {
    return r(n.settings.contactsProxyService.myDeltaContactsEndpoint, e, t, i);
  }, t.getBlockContactEndpoint = function (e, r, i, s) {
    return n.settings.contactsProxyService.blockContactEndpoint.replace(t.tokens.version, s).replace(t.tokens.id, encodeURIComponent(e)).replace(t.tokens.contactType, i).replace(t.tokens.contactId, r);
  }, t.getUnblockContactEndpoint = function (e, r, i, s) {
    return n.settings.contactsProxyService.unblockContactEndpoint.replace(t.tokens.version, s).replace(t.tokens.id, encodeURIComponent(e)).replace(t.tokens.contactType, i).replace(t.tokens.contactId, r);
  }, t.getDeleteContactEndpoint = function (e, r, i, s) {
    return n.settings.contactsProxyService.deleteContactEndpoint.replace(t.tokens.version, s).replace(t.tokens.id, encodeURIComponent(e)).replace(t.tokens.contactType, i).replace(t.tokens.contactId, r);
  }, t.getRetryPolicy = function () {
    return n.settings.contactsProxyService.retry;
  }, t.name = "CBLProxy", t.version = "v1", t.actions = i([
    "getMyContacts",
    "blockContact",
    "deleteContact"
  ], s), t.reasons = {
    "default": "default",
    notification: "notification"
  }, t.tokens = i([
    "id",
    "contactId",
    "contactType",
    "version",
    "reason"
  ], o);
})
