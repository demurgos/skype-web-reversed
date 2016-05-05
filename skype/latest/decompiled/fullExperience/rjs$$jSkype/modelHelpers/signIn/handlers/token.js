define("jSkype/modelHelpers/signIn/handlers/token", [
  "require",
  "exports",
  "module",
  "jSkype/modelHelpers/propertyModelHelper"
], function (e, t) {
  function r(e) {
    if (e && e.getToken)
      return { getToken: e.getToken };
    throw "Unknown signIn parameter";
  }
  var n = e("jSkype/modelHelpers/propertyModelHelper");
  t.handler = function (e) {
    return n.createResolvedPromise(r(e));
  };
})
