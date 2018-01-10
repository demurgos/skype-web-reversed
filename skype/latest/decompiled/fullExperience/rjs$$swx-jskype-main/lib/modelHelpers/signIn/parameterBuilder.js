(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/modelHelpers/signIn/parameterBuilder", [
      "require",
      "exports",
      "lodash-compat",
      "swx-enums"
    ], e);
}(function (e, t) {
  function i(e) {
    if (!n.isString(e.username))
      throw new Error("Username not defined");
    if (!n.isString(e.password))
      throw new Error("Password not defined");
    return {
      username: e.username,
      password: e.password,
      type: r.authType.Password
    };
  }
  function s(e) {
    if (!n.isString(e.client_id))
      throw new Error("client_id not defined");
    return {
      client_id: e.client_id,
      type: r.authType.ImplicitOAuth
    };
  }
  function o(e) {
    if (!n.isString(e.client_id))
      throw new Error("client_id not defined");
    if (!n.isString(e.skypetoken))
      throw new Error("skypetoken not defined");
    if (!n.isString(e.rps_token))
      throw new Error("rps_token not defined");
    if (!n.isNumber(e.expires_in))
      throw new Error("expires_in not defined");
    return {
      skypetoken: e.skypetoken,
      rps_token: e.rps_token,
      expires_in: e.expires_in,
      client_id: e.client_id,
      type: r.authType.ImplicitOAuth,
      site_name: e.site_name
    };
  }
  function u(e) {
    if (!n.isString(e.displayName))
      throw new Error("DisplayName not defined");
    return {
      displayName: e.displayName,
      type: r.authType.Guest
    };
  }
  function a(e) {
    if (!n.isFunction(e.getToken))
      throw new Error("getToken method is not defined");
    return {
      type: r.authType.Token,
      getToken: e.getToken,
      getExpiryTime: e.getExpiryTime
    };
  }
  var n = e("lodash-compat"), r = e("swx-enums");
  t.createPasswordSignInParameter = i;
  t.createImplicitOAuthSignInParameter = s;
  t.createTokenImplicitOAuthSignInParameter = o;
  t.createGuestSignInParameter = u;
  t.createTokenSignInParameter = a;
}));
