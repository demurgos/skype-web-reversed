(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/ABCHProfile/instance", [
      "require",
      "exports",
      "swx-jskype-internal-application-instance",
      "jskype-settings-instance",
      "../serviceAccessLayer/decorations/reporting",
      "swx-abch-profile-web-service"
    ], e);
}(function (e, t) {
  function u() {
    var e = r.settings.profileService, t;
    return o || (t = n.get().signInManager._skypeToken, o = s.build(t, {
      host: e.host,
      appId: e.appId,
      decorations: [i]
    })), o;
  }
  var n = e("swx-jskype-internal-application-instance"), r = e("jskype-settings-instance"), i = e("../serviceAccessLayer/decorations/reporting"), s = e("swx-abch-profile-web-service"), o;
  t.get = u;
}));
