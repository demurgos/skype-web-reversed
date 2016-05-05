define("jSkype/services/outOfBrowser/shellApp/shellAppLogs", [
  "require",
  "exports",
  "module",
  "jSkype/settings",
  "constants/common",
  "constants/outOfBrowser",
  "browser/window"
], function (e, t) {
  var n = e("jSkype/settings"), r = e("constants/common"), i = e("constants/outOfBrowser"), s = e("browser/window");
  t.intercept = function (e) {
    if (!n.isFeatureOn(r.featureFlags.SHELL_APP_LOGS))
      return;
    var t = [
      "log",
      "warn",
      "info",
      "error"
    ];
    t.forEach(function (t) {
      s.console && s.console[t] && (s.console[t] = function () {
        try {
          var n = {
            name: i.commands.SHELL_APP_LOG,
            type: i.commandTypes.REQUEST,
            data: {
              logs: s.btoa(JSON.stringify(Array.prototype.slice.call(arguments))),
              method: t
            }
          };
          e.sendCommand(n);
        } catch (r) {
        }
      });
    });
  };
})
