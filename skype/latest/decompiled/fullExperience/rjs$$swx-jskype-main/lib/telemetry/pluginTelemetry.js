(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/telemetry/pluginTelemetry", [
      "require",
      "exports",
      "swx-jskype-internal-application-instance",
      "jskype-settings-instance",
      "lodash-compat"
    ], e);
}(function (e, t) {
  function o(e) {
    return new s(e);
  }
  var n = e("swx-jskype-internal-application-instance"), r = e("jskype-settings-instance"), i = e("lodash-compat"), s = function () {
      function e(e) {
        var t = this;
        this.logPluginCrashed = function () {
          t.sendBasicEvent("PluginCrashed");
        };
        this.logPluginAlreadyRunning = function () {
          t.sendBasicEvent("PluginAlreadyRunning");
        };
        this.logPluginInitializationTimeout = function () {
          t.sendBasicEvent("PluginInitializationTimeout");
        };
        this.logPluginUpdate = function (e) {
          var n = t.createEvent("PluginUpdate");
          i.extend(n, e);
          t.sendEvent(n);
        };
        this.version = e;
        e ? this.sendBasicEvent("PluginStarted") : this.version = "Unknown";
      }
      return e.prototype.sendBasicEvent = function (e) {
        var t = this.createEvent(e);
        this.sendEvent(t);
      }, e.prototype.sendEvent = function (e) {
        n.get()._telemetryManager.sendEvent(r.settings.telemetry.jSkypeTenantToken, "Calling", e);
      }, e.prototype.createEvent = function (e) {
        return {
          name: e,
          plugin_version: this.version
        };
      }, e;
    }();
  t.PluginTelemetry = s;
  t.getLogger = o;
}));
