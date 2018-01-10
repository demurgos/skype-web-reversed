(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/modelHelpers/signIn/resignInHelper", [
      "require",
      "exports",
      "swx-jskype-internal-application-instance",
      "jskype-settings-instance",
      "../personsAndGroupsHelper"
    ], e);
}(function (e, t) {
  function s(e, t) {
    var r = n.get().signInManager;
    e.start({
      rps_token: r._rpsToken(),
      site_name: r._siteName(),
      relink: !0,
      callback: function (e) {
        return o(e, t);
      }
    });
  }
  function o(e, t) {
    var r = n.get().signInManager;
    return r._skypeToken().then(function (n) {
      var s = i.extractSkypeIdFromToken(n), o = i.extractSkypeIdFromToken(e.skypetoken);
      s !== o && u(r, e, t);
    });
  }
  function u(e, t, n) {
    var i = e.createTokenImplicitOAuthSignInParameter({
      skypetoken: t.skypetoken,
      rps_token: t.rps_token,
      expires_in: t.expires_in,
      client_id: r.settings.implicitOAuthParams.client_id,
      site_name: t.site_name
    });
    n.get().implicitSignOut = !0;
    e.signOut().then(function () {
      e.signIn(i);
    });
  }
  var n = e("swx-jskype-internal-application-instance"), r = e("jskype-settings-instance"), i = e("../personsAndGroupsHelper");
  t.startRelinkingFlow = s;
}));
