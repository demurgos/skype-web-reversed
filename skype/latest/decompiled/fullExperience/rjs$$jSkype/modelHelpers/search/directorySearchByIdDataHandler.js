define("jSkype/modelHelpers/search/directorySearchByIdDataHandler", [
  "require",
  "exports",
  "module",
  "jSkype/modelHelpers/personsAndGroupsHelper",
  "jSkype/modelHelpers/contacts/dataMappers/factory"
], function (e, t) {
  var n = e("jSkype/modelHelpers/personsAndGroupsHelper"), r = e("jSkype/modelHelpers/contacts/dataMappers/factory");
  t.onResult = function (e) {
    var t = [], i = r.getDirectorySearchByIdMapper();
    return e && e.response && e.response.data && e.response.data.forEach(function (e) {
      if (e.skypename) {
        var r = n.getUnknownPerson(e.skypename);
        r && (i.map(e, r), t.push(r));
      }
    }), t;
  };
})
