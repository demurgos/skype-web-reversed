define("jSkype/services/calling/callingInitializer", [
  "require",
  "exports",
  "module",
  "jSkype/client",
  "browser/detect",
  "utils/calling/callingStack",
  "jSkype/settings",
  "jSkype/services/callHandlerFactory",
  "jSkype/services/calling/environmentInspector",
  "swx-enums",
  "jSkype/services/trouter/handlers/incomingCallMessageHandler",
  "jSkype/services/NGCCallAgent/NGCCallAgent/ngcAgent",
  "constants/plugin.const",
  "jSkype/services/trouter/handlers/stopRingingMessageHandler",
  "jSkype/services/outOfBrowser/shellApp/shellAppExperience",
  "jSkype/services/trouter/trouter"
], function (e, t) {
  function v() {
    d.registerMessageHandler(f.build()), d.registerMessageHandler(h.build());
  }
  var n = e("jSkype/client"), r = e("browser/detect"), i = e("utils/calling/callingStack"), s = e("jSkype/settings"), o = e("jSkype/services/callHandlerFactory"), u = e("jSkype/services/calling/environmentInspector"), a = e("swx-enums"), f = e("jSkype/services/trouter/handlers/incomingCallMessageHandler"), l = e("jSkype/services/NGCCallAgent/NGCCallAgent/ngcAgent"), c = e("constants/plugin.const"), h = e("jSkype/services/trouter/handlers/stopRingingMessageHandler"), p = e("jSkype/services/outOfBrowser/shellApp/shellAppExperience"), d = e("jSkype/services/trouter/trouter");
  t.preSignInInitialize = function () {
    s.settings.isPollingEnabled && v();
  }, t.postSignInInitialize = function () {
    function f(e) {
      if (!e)
        return;
      n.get().conversationsManager._conversationsSynced.promise.then(o.initialize).then(null, function (e) {
        e === c.PLUGIN_ERRORS.REASON_ALREADY_EXISTS && u.disableCalling(a.callingNotSupportedReasons.PluginAlreadyRunning), r.getBrowserInfo().isShellApp && t.sendPluginErrorCommand(e);
      });
    }
    var t;
    i.get().isPluginlessCallingSupported() && l.initialize(), r.getBrowserInfo().isShellApp && (t = p.init()), s.settings.isPollingEnabled && d.start(), n.get().personsAndGroupsManager.mePerson._initAVCapabilities(), u.checkForCallingSupport(!1).then(f);
  }, t.destroy = function () {
    s.settings.isPollingEnabled && d.stop(), o.dispose();
  };
})
