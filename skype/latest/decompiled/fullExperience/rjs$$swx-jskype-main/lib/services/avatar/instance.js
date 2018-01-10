(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/avatar/instance", [
      "require",
      "exports",
      "swx-jskype-internal-application-instance",
      "jskype-settings-instance",
      "swx-client-info",
      "../serviceAccessLayer/decorations/reporting",
      "swx-avatar-web-service"
    ], e);
}(function (e, t) {
  function a() {
    var e;
    return u || (e = n.get().signInManager._skypeToken, u = o.build(e, {
      host: r.settings.avatarService.host,
      appName: i.getBIAppName(),
      decorations: [s]
    })), u;
  }
  var n = e("swx-jskype-internal-application-instance"), r = e("jskype-settings-instance"), i = e("swx-client-info"), s = e("../serviceAccessLayer/decorations/reporting"), o = e("swx-avatar-web-service"), u;
  t.get = a;
}));
