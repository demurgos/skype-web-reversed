define("jSkype/modelHelpers/contacts/dataMappers/factory", [
  "require",
  "exports",
  "module",
  "jSkype/modelHelpers/contacts/dataMappers/contactToPerson",
  "jSkype/modelHelpers/contacts/dataMappers/profileToPerson",
  "jSkype/modelHelpers/contacts/dataMappers/userInfo",
  "jSkype/modelHelpers/contacts/dataMappers/directoryResultToPerson",
  "jSkype/modelHelpers/contacts/dataMappers/directorySearchResultByIdToPerson"
], function (e, t) {
  var n = e("jSkype/modelHelpers/contacts/dataMappers/contactToPerson"), r = e("jSkype/modelHelpers/contacts/dataMappers/profileToPerson"), i = e("jSkype/modelHelpers/contacts/dataMappers/userInfo"), s = e("jSkype/modelHelpers/contacts/dataMappers/directoryResultToPerson"), o = e("jSkype/modelHelpers/contacts/dataMappers/directorySearchResultByIdToPerson");
  t.getContactMapper = function () {
    return n;
  }, t.getProfileMapper = function () {
    return r;
  }, t.getUserInfoMapper = function () {
    return i;
  }, t.getDirectorySearchMapper = function () {
    return s;
  }, t.getDirectorySearchByIdMapper = function () {
    return o;
  };
})
