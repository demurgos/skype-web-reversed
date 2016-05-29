define("jSkype/services/outOfBrowser/shellApp/shellAppExperience", [
  "require",
  "exports",
  "module",
  "jSkype/services/outOfBrowser/shellApp/browserCommandHandler",
  "jSkype/services/outOfBrowser/shellApp/messagingChannel",
  "jSkype/services/outOfBrowser/shellApp/shellAppLogs",
  "constants/outOfBrowser"
], function (e, t) {
  var n = e("jSkype/services/outOfBrowser/shellApp/browserCommandHandler"), r = e("jSkype/services/outOfBrowser/shellApp/messagingChannel"), i = e("jSkype/services/outOfBrowser/shellApp/shellAppLogs"), s = e("constants/outOfBrowser");
  t.init = function () {
    function o(e, n, r) {
      var i = {
        name: e,
        type: n
      };
      r && (i.data = r);
      t.sendCommand(i);
    }
    var e = {}, t;
    return t = r.build(), n.build(t), i.intercept(t), o(s.commands.INIT, s.commandTypes.RESPONSE), e.sendPluginErrorCommand = function (e) {
      o(s.commands.PLUGIN_ERROR, s.commandTypes.REQUEST, e);
    }, e;
  };
});
