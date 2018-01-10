(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-utils-chat/lib/participant", [
      "require",
      "exports"
    ], e);
}(function (e, t) {
  function n(e, t) {
    return t.mePerson.id() === e.person.id();
  }
  t.isMeParticipant = n;
}));
