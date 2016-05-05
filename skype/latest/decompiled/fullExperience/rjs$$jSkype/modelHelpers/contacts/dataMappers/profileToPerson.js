define("jSkype/modelHelpers/contacts/dataMappers/profileToPerson", [
  "require",
  "exports",
  "module",
  "jSkype/modelHelpers/contacts/dataMappers/mappers",
  "jSkype/constants/people"
], function (e, t) {
  function i(e, t) {
    var i = t.displayName();
    (i === r || i === t.id()) && n.mapDisplayNameFallback(e.firstname, e.lastname, t);
  }
  var n = e("jSkype/modelHelpers/contacts/dataMappers/mappers"), r = e("jSkype/constants/people").SELF;
  return t.map = function (e, t) {
    n.mapId(e.username, t), n.mapFirstName(e.firstname, t), n.mapLastName(e.lastname, t), n.mapDisplayName(e.displayname, t), n.mapCity(e.city, t), n.mapState(e.state, t), n.mapCountry(e.country, t), n.mapActivity(e.mood, t), n.mapAvatarUrl(e.avatarUrl, t), i(e, t);
  }, t;
})
