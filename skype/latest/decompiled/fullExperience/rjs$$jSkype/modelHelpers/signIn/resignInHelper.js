define("jSkype/modelHelpers/signIn/resignInHelper", [
  "require",
  "exports",
  "module",
  "jSkype/client",
  "jSkype/settings",
  "jSkype/modelHelpers/personsAndGroupsHelper",
  "experience/api/auth/linking",
  "experience/authContext"
], function (e, t) {
  function u(e) {
    var t = n.get().signInManager;
    return t._skypeToken().then(function (n) {
      var r = i.extractSkypeIdFromToken(n), s = i.extractSkypeIdFromToken(e.skypetoken);
      r !== s && a(t, e);
    });
  }
  function a(e, t) {
    var n = e.createTokenImplicitOAuthSignInParameter({
      skypetoken: t.skypetoken,
      rps_token: t.rps_token,
      expires_in: t.expires_in,
      client_id: r.settings.implicitOAuthParams.client_id,
      site_name: t.site_name
    });
    o.get().implicitSignOut = !0;
    e.signOut().then(function () {
      e.signIn(n);
    });
  }
  var n = e("jSkype/client"), r = e("jSkype/settings"), i = e("jSkype/modelHelpers/personsAndGroupsHelper"), s = e("experience/api/auth/linking"), o = e("experience/authContext");
  t.startRelinkingFlow = function () {
    var t = n.get().signInManager;
    s.start({
      rps_token: t._rpsToken(),
      site_name: t._siteName(),
      relink: !0,
      callback: u
    });
  };
});
