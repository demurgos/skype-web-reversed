define("jSkype/modelHelpers/contacts/dataMappers/directoryResultToPerson", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "jSkype/modelHelpers/contacts/dataMappers/mappers"
], function (e, t) {
  var n = e("lodash-compat"), r = e("jSkype/modelHelpers/contacts/dataMappers/mappers");
  t.map = function (e, t) {
    e.Skype ? r.mapDisplayName(n.result(e.Skype, "DisplayName"), t) : e.Lync && r.mapDisplayName(n.result(e.Lync, "DisplayName"), t), r.mapCity(n.result(e.CurrentLocation, "City"), t), r.mapState(n.result(e.CurrentLocation, "Province"), t), r.mapCountry(n.result(e.CurrentLocation, "Country"), t);
  };
})
