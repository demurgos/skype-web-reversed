(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/outOfBrowser/shellApp/shellAppExperience", [
      "require",
      "exports",
      "../../../../lib/services/outOfBrowser/shellApp/browserCommandHandler",
      "../../../../lib/services/outOfBrowser/shellApp/messagingChannel",
      "../../../../lib/services/outOfBrowser/shellApp/shellAppLogs",
      "swx-constants"
    ], e);
}(function (e, t) {
  function o() {
    function t(t, n, r) {
      var i = {
        name: t,
        type: n
      };
      r && (i.data = r);
      e.sendCommand(i);
    }
    var e = r.build();
    return n.build(e), i.intercept(e), t(s.OUT_OF_BROWSER.commands.INIT, s.OUT_OF_BROWSER.commandTypes.RESPONSE), {
      sendPluginErrorCommand: function (e) {
        t(s.OUT_OF_BROWSER.commands.PLUGIN_ERROR, s.OUT_OF_BROWSER.commandTypes.REQUEST, e);
      }
    };
  }
  var n = e("../../../../lib/services/outOfBrowser/shellApp/browserCommandHandler"), r = e("../../../../lib/services/outOfBrowser/shellApp/messagingChannel"), i = e("../../../../lib/services/outOfBrowser/shellApp/shellAppLogs"), s = e("swx-constants");
  t.init = o;
}));
