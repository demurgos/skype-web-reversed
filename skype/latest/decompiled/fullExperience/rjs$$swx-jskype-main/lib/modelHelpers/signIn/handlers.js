(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/modelHelpers/signIn/handlers", [
      "require",
      "exports",
      "swx-enums",
      "./handlers/token",
      "./handlers/password",
      "../../modelHelpers/signIn/handlers/implicitOAuth"
    ], e);
}(function (e, t) {
  var n = e("swx-enums"), r = e("./handlers/token"), i = e("./handlers/password"), s = e("../../modelHelpers/signIn/handlers/implicitOAuth"), o = {};
  return o[n.authType.Token] = r.handler, o[n.authType.Password] = i.handler, o[n.authType.ImplicitOAuth] = s.handler, o;
}));
