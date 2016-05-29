define("jSkype/services/webapi/builders/requestURIBuilder", [
  "require",
  "exports",
  "module",
  "swx-utils-common",
  "jSkype/modelHelpers/personHelper",
  "jSkype/modelHelpers/personsAndGroupsHelper"
], function (e, t) {
  function v(e) {
    return u + e;
  }
  function m(e, t) {
    return t.replace(o, "") + (e || "");
  }
  function g() {
    return "/" + n.get("endpointId");
  }
  function y(e) {
    var t = i.getPersonById(e);
    return r.getKey(e, t ? t._type() : null);
  }
  var n = e("swx-utils-common").sessionStorage, r = e("jSkype/modelHelpers/personHelper"), i = e("jSkype/modelHelpers/personsAndGroupsHelper"), s = "v1", o = /http(s)?:\/\/+[\w\-.]*/, u = s + "/users/ME", a = "/ng/ping", f = "/messages", l = "/conversations", c = "/threads", h = "/members", p = "/contacts", d = "/endpoints";
  t.ping = function () {
    return s + a;
  };
  t.conversations = function (e) {
    var t = l;
    return e && (t += "/" + e), v(t);
  };
  t.messageProperties = function (e, t) {
    var n = "/" + e + f, r = "/" + t + "/properties", i = l + n + r;
    return v(i);
  };
  t.messages = function (e) {
    var t = "/" + e + f, n = l + t;
    return v(n);
  };
  t.thread = function (e) {
    return s + c + "/" + e;
  };
  t.member = function (e, t) {
    return this.thread(e) + h + "/" + y(t);
  };
  t.contacts = function (e, t) {
    var n = e ? "/" + y(e) : "";
    return t = t || "", v(p + n + t);
  };
  t.customResource = function (e, t) {
    var n;
    return t ? n = m(e, t) : n = v(e), n;
  };
  t.constructPresenceEndpointURI = function (e) {
    return u + d + g() + e;
  };
});
