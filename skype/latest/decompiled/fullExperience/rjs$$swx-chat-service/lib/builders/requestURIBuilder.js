(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-chat-service/lib/builders/requestURIBuilder", [
      "require",
      "exports",
      "swx-utils-common"
    ], e);
}(function (e, t) {
  function p(e) {
    return s + e;
  }
  function d(e, t) {
    return t.replace(i, "") + (e || "");
  }
  function v() {
    return "/" + n.sessionStorage.get("endpointId");
  }
  function m() {
    return r + o;
  }
  function g(e) {
    var t = a;
    return e && (t += "/" + e), p(t);
  }
  function y(e, t) {
    var n = "/" + e + u, r = "/" + t + "/properties", i = a + n + r;
    return p(i);
  }
  function b(e) {
    var t = "/" + e + u, n = a + t;
    return p(n);
  }
  function w(e) {
    return r + f + "/" + e;
  }
  function E(e, t) {
    return this.thread(e) + l + "/" + t;
  }
  function S(e, t) {
    t === void 0 && (t = "");
    var n = e ? "/" + e : "";
    return p(c + n + t);
  }
  function x(e, t) {
    var n;
    return t ? n = d(e, t) : n = p(e), n;
  }
  function T(e) {
    return s + h + v() + e;
  }
  var n = e("swx-utils-common"), r = "v1", i = /http(s)?:\/\/+[\w\-.]*/, s = r + "/users/ME", o = "/ng/ping", u = "/messages", a = "/conversations", f = "/threads", l = "/members", c = "/contacts", h = "/endpoints";
  t.ping = m;
  t.conversations = g;
  t.messageProperties = y;
  t.messages = b;
  t.thread = w;
  t.member = E;
  t.contacts = S;
  t.customResource = x;
  t.constructPresenceEndpointURI = T;
}));
