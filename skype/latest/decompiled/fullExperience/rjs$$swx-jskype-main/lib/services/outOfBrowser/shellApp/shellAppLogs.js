(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/outOfBrowser/shellApp/shellAppLogs", [
      "require",
      "exports",
      "jskype-settings-instance",
      "swx-constants",
      "swx-constants",
      "swx-browser-globals"
    ], e);
}(function (e, t) {
  function o(e) {
    var t = s.getWindow();
    if (!n.isFeatureOn(r.COMMON.featureFlags.SHELL_APP_LOGS))
      return;
    var o = [
      "log",
      "warn",
      "info",
      "error"
    ];
    o.forEach(function (n) {
      var r = t.console;
      t.console && r[n] && (r[n] = function () {
        try {
          var r = {
            name: i.OUT_OF_BROWSER.commands.SHELL_APP_LOG,
            type: i.OUT_OF_BROWSER.commandTypes.REQUEST,
            data: {
              logs: t.btoa(JSON.stringify(Array.prototype.slice.call(arguments))),
              method: n
            }
          };
          e.sendCommand(r);
        } catch (s) {
        }
      });
    });
  }
  var n = e("jskype-settings-instance"), r = e("swx-constants"), i = e("swx-constants"), s = e("swx-browser-globals");
  t.intercept = o;
}));
