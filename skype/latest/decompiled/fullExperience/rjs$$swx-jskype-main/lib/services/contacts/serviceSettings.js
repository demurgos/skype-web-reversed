(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/contacts/serviceSettings", [
      "require",
      "exports",
      "jskype-settings-instance"
    ], e);
}(function (e, t) {
  function r() {
    return n.settings.contactsService.host;
  }
  function i(e, t, r) {
    return o(n.settings.contactsService.myContactsEndpoint, e, t, r);
  }
  function s() {
    return n.settings.contactsService.retry;
  }
  function o(e, n, r, i) {
    return i = i || t.reasons["default"], e.replace(t.tokens.id, encodeURIComponent(n)).replace(t.tokens.version, r).replace(t.tokens.reason, i);
  }
  function u(e, t) {
    return e.reduce(function (e, n) {
      return e[n] = t(n), e;
    }, {});
  }
  function a(e) {
    return t.name + "-" + e;
  }
  function f(e) {
    return "${" + e + "}";
  }
  var n = e("jskype-settings-instance");
  t.getHost = r;
  t.getMyContactsEndpoint = i;
  t.getRetryPolicy = s;
  t.name = "CBLProxy";
  t.version = "v1";
  t.actions = u([
    "getMyContacts",
    "blockContact",
    "deleteContact"
  ], a);
  t.reasons = {
    "default": "default",
    notification: "notification"
  };
  t.tokens = u([
    "id",
    "contactId",
    "contactType",
    "version",
    "reason"
  ], f);
}));
