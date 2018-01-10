(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/modelHelpers/contacts/dataMappers/incomingInviteToPerson", [
      "require",
      "exports",
      "../../../modelHelpers/contacts/dataMappers/mappers"
    ], e);
}(function (e, t) {
  function r(e, t) {
    n.mapDisplayName(e.displayName, t);
    n.mapAvatarUrl(e.avatarUrl, t);
    n.mapCity(e.city, t);
    n.mapCountry(e.country, t);
  }
  var n = e("../../../modelHelpers/contacts/dataMappers/mappers");
  t.map = r;
}));
