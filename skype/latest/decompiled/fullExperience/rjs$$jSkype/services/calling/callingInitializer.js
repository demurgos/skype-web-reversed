define("jSkype/services/calling/callingInitializer", [
  "require",
  "exports",
  "module",
  "swx-jskype-internal-application-instance",
  "swx-browser-detect",
  "swx-util-calling-stack",
  "jskype-settings-instance",
  "jSkype/services/callHandlerFactory",
  "swx-jskype-main/lib/services/callController",
  "swx-jskype-main/lib/services/calling/environmentInspector",
  "swx-jskype-main/lib/models/mePersonAudioVideoCapabilities",
  "swx-enums",
  "swx-jskype-main/lib/services/trouter/handlers/incomingCallMessageHandler",
  "jSkype/services/swxWebCalling",
  "swx-constants",
  "swx-jskype-main/lib/services/trouter/handlers/stopRingingMessageHandler",
  "swx-jskype-main/lib/services/outOfBrowser/shellApp/shellAppExperience",
  "swx-jskype-main/lib/services/trouter/trouter",
  "swx-jskype-main/lib/models/deviceCache"
], function (e, t) {
  var n = e("swx-jskype-internal-application-instance"), r = e("swx-browser-detect").default, i = e("swx-util-calling-stack"), s = e("jskype-settings-instance"), o = e("jSkype/services/callHandlerFactory"), u = e("swx-jskype-main/lib/services/callController"), a = e("swx-jskype-main/lib/services/calling/environmentInspector"), f = e("swx-jskype-main/lib/models/mePersonAudioVideoCapabilities"), l = e("swx-enums"), c = e("swx-jskype-main/lib/services/trouter/handlers/incomingCallMessageHandler"), h = e("jSkype/services/swxWebCalling"), p = e("swx-constants").PLUGIN_CONST, d = e("swx-jskype-main/lib/services/trouter/handlers/stopRingingMessageHandler"), v = e("swx-jskype-main/lib/services/outOfBrowser/shellApp/shellAppExperience"), m = e("swx-jskype-main/lib/services/trouter/trouter"), g = e("swx-jskype-main/lib/models/deviceCache");
  t.initialize = function (t) {
    function b(e) {
      if (!e)
        return;
      n.get().conversationsManager._conversationsSynced.promise.then(function () {
        o.initialize(h.getMediaAgent());
      }).then(function () {
        g.initialize(n.get().devicesManager);
      }, function (e) {
        e === p.PLUGIN_ERRORS.REASON_ALREADY_EXISTS && a.disableCalling(l.callingNotSupportedReasons.PluginAlreadyRunning);
        r.getBrowserInfo().isShellApp && y.sendPluginErrorCommand(e);
      });
    }
    var y;
    u.initialize(o);
    i.get().isPluginlessCallingSupported() && h.initialize(t);
    r.getBrowserInfo().isShellApp && (y = v.init());
    s.settings.isPollingEnabled && m.initialize().then(function (e) {
      e.registerMessageHandler(c.build());
      e.registerMessageHandler(d.build());
      e.start();
    });
    n.get().personsAndGroupsManager.mePerson._addCallingCapabilities(f.build());
    i.get().isPluginlessCallingSupported() && n.get().devicesManager.selectedSpeaker.set.enabled._set(!1);
    a.checkForCallingSupport(!1).then(b);
  };
  t.destroy = function () {
    s.settings.isPollingEnabled && m.stop();
    o.dispose();
    g.dispose();
  };
});
