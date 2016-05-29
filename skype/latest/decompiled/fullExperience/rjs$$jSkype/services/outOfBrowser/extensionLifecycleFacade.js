define("jSkype/services/outOfBrowser/extensionLifecycleFacade", [
  "require",
  "exports",
  "module",
  "jcafe-property-model",
  "jSkype/services/outOfBrowser/extension",
  "jSkype/services/outOfBrowser/messagingChannel",
  "jSkype/services/outOfBrowser/extensionCommandHandler",
  "constants/outOfBrowser",
  "jSkype/settings"
], function (e, t) {
  function a(e) {
    function d() {
      h && h();
    }
    function v() {
      c && c();
    }
    function m(e) {
      p && p(e);
    }
    function g() {
      f = i.build(a);
      f.registerCommandHandler(o.commands.SHELL_APP_READY_FOR_BOOTSTRAP, b);
      f.registerCommandHandler(o.commands.SHELL_APP_INITIALISED, y);
      f.registerEventHandler(o.shellAppEvents.WindowHidden, v);
      f.registerCommandHandler(o.commands.ESCALATE_CONVERSATION, m);
    }
    function y() {
      s.build(f);
      l.resolve(f);
    }
    function b() {
      f.sendCommand(o.commands.BOOTSTRAP, { url: u.settings.shellApp.bootstrapperUrl });
    }
    function w(e) {
      l.reject(e);
    }
    var t = this, a = null, f = null, l = null, c, h, p;
    t.getMessagingChannel = function () {
      return l || (l = n.task(), a = r.build(e), a.getAppHost().then(function () {
        return g(), a.openShellApp(d);
      }).catch(w)), l.promise;
    };
    t.disconnect = function () {
      return a ? a.disconnect() : Promise.resolve();
    };
    t.getVersion = function () {
      return a = r.build(e), a.getAppHost().then(function (e) {
        return e.getVersion();
      });
    };
    t.dispose = function () {
      f && (f.unregisterCommandHandler(o.commands.SHELL_APP_INITIALISED), f.unregisterCommandHandler(o.commands.SHELL_APP_READY_FOR_BOOTSTRAP), f.unregisterEventHandler(o.shellAppEvents.WindowHidden));
      f = null;
      l = null;
      c = null;
      h = null;
      p = null;
      a && (a.disconnect(), a.dispose());
    };
    t.onExtensionDisconnected = function (e) {
      h = e;
    };
    t.onShellAppWindowHidden = function (e) {
      c = e;
    };
    t.onShellAppCallEscalated = function (e) {
      p = e;
    };
  }
  var n = e("jcafe-property-model"), r = e("jSkype/services/outOfBrowser/extension"), i = e("jSkype/services/outOfBrowser/messagingChannel"), s = e("jSkype/services/outOfBrowser/extensionCommandHandler"), o = e("constants/outOfBrowser"), u = e("jSkype/settings");
  t.build = function (e) {
    return new a(e);
  };
});
