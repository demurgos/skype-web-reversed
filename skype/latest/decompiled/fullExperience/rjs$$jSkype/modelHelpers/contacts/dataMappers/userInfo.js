define("jSkype/modelHelpers/contacts/dataMappers/userInfo", [
  "require",
  "exports",
  "module",
  "jSkype/modelHelpers/contacts/dataMappers/mappers"
], function (e, t) {
  var n = e("jSkype/modelHelpers/contacts/dataMappers/mappers");
  return t.map = function (e, t) {
    n.mapRegistrationDate(e.registrationDate, t);
  }, t;
});
