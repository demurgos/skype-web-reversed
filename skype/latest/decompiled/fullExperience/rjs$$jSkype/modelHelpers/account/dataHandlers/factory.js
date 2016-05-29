define("jSkype/modelHelpers/account/dataHandlers/factory", [
  "require",
  "exports",
  "module",
  "jSkype/modelHelpers/account/dataHandlers/account"
], function (e, t) {
  var n = { account: e("jSkype/modelHelpers/account/dataHandlers/account") };
  t.getAccountChangedHandler = function () {
    return n.account.build();
  };
});
