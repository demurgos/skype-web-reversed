define("jSkype/modelHelpers/contacts/dataMappers/directorySearchResultByIdToPerson", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "jSkype/modelHelpers/contacts/dataMappers/mappers"
], function (e, t) {
  var n = e("lodash-compat"), r = e("jSkype/modelHelpers/contacts/dataMappers/mappers");
  t.map = function (e, t) {
    r.mapDisplayName(n.result(e, "fullname"), t), r.mapCity(n.result(e, "city"), t), r.mapState(n.result(e, "province"), t), r.mapCountry(n.result(e, "key_country"), t);
  };
})
