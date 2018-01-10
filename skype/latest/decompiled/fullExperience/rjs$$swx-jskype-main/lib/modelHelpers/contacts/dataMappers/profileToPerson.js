(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/modelHelpers/contacts/dataMappers/profileToPerson", [
      "require",
      "exports",
      "./mappers",
      "jskype-constants"
    ], e);
}(function (e, t) {
  function i(e, t, r) {
    r === void 0 && (r = !1);
    n.mapId(e.username, t);
    n.mapFirstName(e.firstname, t);
    n.mapLastName(e.lastname, t);
    n.mapDisplayName(e.displayname, t);
    n.mapCity(e.city, t);
    n.mapState(e.state, t);
    n.mapCountry(e.country, t);
    n.mapActivity(e.mood, t);
    n.mapAvatarUrl(e.avatarUrl, t);
    n.mapBirthday(e.birthday, t);
    s(e, t, r);
  }
  function s(e, t, i) {
    var s = t.displayName();
    (i || s === r.PEOPLE.SELF || s === t.id()) && n.mapDisplayNameFallback(e.firstname, e.lastname, t);
  }
  var n = e("./mappers"), r = e("jskype-constants");
  t.map = i;
}));
