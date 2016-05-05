define("jSkype/telemetry/pluginTelemetry", [
  "require",
  "exports",
  "module",
  "jSkype/client",
  "jSkype/settings"
], function (e, t) {
  function i(e) {
    function t(e) {
      var t = s(e);
      i(t);
    }
    function i(e) {
      n.get()._telemetryManager.sendEvent(r.settings.telemetry.jSkypeTenantToken, "Calling", e);
    }
    function s(t) {
      return {
        name: t,
        plugin_version: e
      };
    }
    e ? t("PluginStarted") : e = "Unknown", this.logPluginCrashed = function () {
      t("PluginCrashed");
    }, this.logPluginAlreadyRunning = function () {
      t("PluginAlreadyRunning");
    }, this.logPluginInitializationTimeout = function () {
      t("PluginInitializationTimeout");
    };
  }
  var n = e("jSkype/client"), r = e("jSkype/settings");
  t.getLogger = function (e) {
    return new i(e);
  };
})
