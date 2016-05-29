define("jSkype/modelHelpers/contacts/dataHandlers/userInfo", [
  "require",
  "exports",
  "module",
  "jSkype/client",
  "jSkype/modelHelpers/propertyModelHelper",
  "jSkype/modelHelpers/contacts/dataMappers/factory"
], function (e, t) {
  function s(e) {
    this.onSuccess = function (t) {
      return e.map(t.response, n.get().personsAndGroupsManager.mePerson), r.createResolvedPromise();
    };
    this.onError = function (e) {
      return r.createRejectedPromise(e);
    };
  }
  var n = e("jSkype/client"), r = e("jSkype/modelHelpers/propertyModelHelper"), i = e("jSkype/modelHelpers/contacts/dataMappers/factory");
  t.build = function () {
    var e = i.getUserInfoMapper();
    return new s(e);
  };
});
