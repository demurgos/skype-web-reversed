define("jSkype/modelHelpers/propertyValidator", [
  "require",
  "exports",
  "module",
  "lodash-compat"
], function (e, t) {
  var n = e("lodash-compat");
  t.isGroupConversation = function (e) {
    return n.isString(e) && /^19:/.test(e);
  };
  t.isPhoneNumber = function (e) {
    return n.isString(e) && (/^\+?\d+$/.test(e) || /^4:/.test(e));
  };
});
