(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/invite/instance", [
      "require",
      "exports",
      "swx-jskype-internal-application-instance",
      "jskype-settings-instance",
      "../serviceAccessLayer/decorations/reporting",
      "swx-invite-web-service"
    ], e);
}(function (e, t) {
  function u() {
    return o || (o = s.build(n.get().signInManager._skypeToken, {
      host: r.settings.inviteWebService.host,
      decorations: [i],
      skypeCaller: r.settings.biAppName
    })), o;
  }
  var n = e("swx-jskype-internal-application-instance"), r = e("jskype-settings-instance"), i = e("../serviceAccessLayer/decorations/reporting"), s = e("swx-invite-web-service"), o;
  t.get = u;
}));
