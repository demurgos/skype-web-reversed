define("jSkype/modelHelpers/search/directoryDataHandler", [
  "require",
  "exports",
  "module",
  "jSkype/modelHelpers/personsAndGroupsHelper",
  "jSkype/modelHelpers/contacts/dataMappers/factory",
  "lodash-compat"
], function (e, t) {
  var n = e("jSkype/modelHelpers/personsAndGroupsHelper"), r = e("jSkype/modelHelpers/contacts/dataMappers/factory"), i = e("lodash-compat");
  t.onResult = function (e) {
    function s(e, r) {
      var i, s;
      return r.ContactCards ? (i = o(r.ContactCards), i ? (s = n.getUnknownPerson(i), s ? (t.map(r.ContactCards, s), e.push(s), e) : e) : e) : e;
    }
    function o(e) {
      return e.Skype ? e.Skype.SkypeName : e.Lync ? e.Lync.SkypeName : "";
    }
    var t = r.getDirectorySearchMapper();
    return e && e.response ? i.reduce(e.response, s, []) : [];
  };
});
