define("jSkype/services/webapi/serviceSettings", [
  "require",
  "exports",
  "module",
  "jSkype/settings"
], function (e, t) {
  var n = e("jSkype/settings");
  t.getHost = function () {
    return n.settings.webApiServiceHost;
  };
});
