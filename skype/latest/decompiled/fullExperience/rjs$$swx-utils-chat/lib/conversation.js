(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-utils-chat/lib/conversation", [
      "require",
      "exports",
      "lodash-compat"
    ], e);
}(function (e, t) {
  function r(e, t) {
    return t.getConversation(e);
  }
  function i(e, t) {
    var n = t.createConversation();
    return u(e, n), n;
  }
  function s(e) {
    return !e || !e.indexOf ? !1 : e.indexOf("guesthost_") > -1;
  }
  function o(e, t, n) {
    return e.length > 1 || n ? i(e, t) : r(e[0], t);
  }
  function u(e, t) {
    return Promise.all(n.map(e, function (e) {
      var n = t.createParticipant(e);
      return t.participants.add(n);
    }));
  }
  function a(e, t) {
    return e.participants.filter(function (e) {
      return e.person.id() === t;
    })(0);
  }
  var n = e("lodash-compat");
  t.isGuestHostConversation = s;
  t.createConversation = o;
  t.addPersonsToConversation = u;
  t.getParticipantFromConversation = a;
}));
