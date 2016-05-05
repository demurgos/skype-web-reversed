define("jSkype/modelHelpers/signIn/parameterBuilder", [
  "require",
  "exports",
  "module",
  "swx-enums",
  "lodash-compat"
], function (e, t) {
  var n = e("swx-enums"), r = e("lodash-compat");
  t.createPasswordSignInParameter = function (e) {
    if (!r.isString(e.username))
      throw new Error("Username not defined");
    if (!r.isString(e.password))
      throw new Error("Password not defined");
    return {
      username: e.username,
      password: e.password,
      type: n.authType.Password
    };
  }, t.createImplicitOAuthSignInParameter = function (e) {
    if (!r.isString(e.client_id))
      throw new Error("client_id not defined");
    return {
      client_id: e.client_id,
      type: n.authType.ImplicitOAuth
    };
  }, t.createTokenImplicitOAuthSignInParameter = function (e) {
    if (!r.isString(e.client_id))
      throw new Error("client_id not defined");
    if (!r.isString(e.skypetoken))
      throw new Error("skypetoken not defined");
    if (!r.isString(e.rps_token))
      throw new Error("rps_token not defined");
    if (!r.isNumber(e.expires_in))
      throw new Error("expires_in not defined");
    return {
      skypetoken: e.skypetoken,
      rps_token: e.rps_token,
      expires_in: e.expires_in,
      client_id: e.client_id,
      type: n.authType.ImplicitOAuth,
      site_name: e.site_name
    };
  }, t.createGuestSignInParameter = function (e) {
    if (!r.isString(e.displayName))
      throw new Error("DisplayName not defined");
    return {
      displayName: e.displayName,
      type: n.authType.Guest
    };
  }, t.createTokenSignInParameter = function (e) {
    if (!r.isFunction(e.getToken))
      throw new Error("getToken method is not defined");
    return {
      type: n.authType.Token,
      getToken: e.getToken
    };
  };
})
