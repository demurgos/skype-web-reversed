define("jSkype/modelHelpers/signIn/handlers/password", [
  "require",
  "exports",
  "module",
  "jSkype/modelHelpers/propertyModelHelper"
], function (e, t) {
  function r() {
    return {
      getToken: function () {
        return !0;
      }
    };
  }
  var n = e("jSkype/modelHelpers/propertyModelHelper");
  t.handler = function () {
    return n.createResolvedPromise(r());
  };
});
