define("jSkype/modelHelpers/signIn/handlers", [
  "require",
  "exports",
  "module",
  "swx-enums",
  "jSkype/modelHelpers/signIn/handlers/token",
  "jSkype/modelHelpers/signIn/handlers/password",
  "jSkype/modelHelpers/signIn/handlers/implicitOAuth"
], function (e, t, n) {
  var r = e("swx-enums"), i = e("jSkype/modelHelpers/signIn/handlers/token").handler, s = e("jSkype/modelHelpers/signIn/handlers/password").handler, o = e("jSkype/modelHelpers/signIn/handlers/implicitOAuth").handler;
  n.exports = {}, n.exports[r.authType.Token] = i, n.exports[r.authType.Password] = s, n.exports[r.authType.ImplicitOAuth] = o;
})
