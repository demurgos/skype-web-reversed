define("experience/components/chat", [
  "require",
  "exports",
  "module",
  "experience/settings",
  "swx-constants",
  "swx-service-locator-instance",
  "swx-utils-common",
  "swx-utils-chat",
  "swx-utils-chat",
  "ui/components/chat/index",
  "ui/components/registrar"
], function (e, t) {
  var n = e("experience/settings"), r = e("swx-constants").COMMON, i = e("swx-service-locator-instance").default, s = e("swx-utils-common").loader, o = e("swx-utils-chat").urlParser, u = e("swx-utils-chat").dateTime, a = e("ui/components/chat/index"), f = e("ui/components/registrar");
  t.init = function (e) {
    var t = i.resolve(r.serviceLocator.FEATURE_FLAGS);
    t.isFeatureOn(r.featureFlags.LOCATION_MESSAGE_SUPPORT) && s.loadScript(n.mapsApiUrl + (o.isHttps(location.href) ? "&s=1" : ""));
    u.notifyOnDayChange();
    f.register(a);
    e();
  };
});
