(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/modelHelpers/contacts/presenceHelper", [
      "require",
      "exports",
      "jskype-constants",
      "swx-enums",
      "../personHelper"
    ], e);
}(function (e, t) {
  function s(e, t) {
    var s = n.PEOPLE.authorizationStates;
    return t === s.AUTHORIZED && (e.isAgent() || i.isEchoContact(e)) ? r.onlineStatus.Online : t === s.PENDING_INCOMING ? r.onlineStatus.Unknown : t === s.AUTHORIZED && !i.isPstn(e) ? r.onlineStatus.Offline : undefined;
  }
  var n = e("jskype-constants"), r = e("swx-enums"), i = e("../personHelper");
  t.getDefaultPresence = s;
}));
