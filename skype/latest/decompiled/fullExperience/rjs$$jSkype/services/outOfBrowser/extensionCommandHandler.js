define("jSkype/services/outOfBrowser/extensionCommandHandler", [
  "require",
  "exports",
  "module",
  "jSkype/client",
  "jSkype/settings",
  "constants/common",
  "jSkype/services/calling/environmentInspector",
  "swx-enums",
  "jSkype/telemetry/logging/callingLogTracer",
  "constants/plugin.const",
  "jSkype/modelHelpers/participantHelper",
  "constants/outOfBrowser"
], function (e, t) {
  function c(e) {
    function t(e) {
      e === a.PLUGIN_ERRORS.REASON_ALREADY_EXISTS && s.disableCalling(o.callingNotSupportedReasons.PluginAlreadyRunning);
    }
    function c() {
      var t = {};
      n.get().personsAndGroupsManager.all.persons().forEach(function (e) {
        t[e.id()] = { status: e.status() };
      });
      u.get().log("[ExtensionCommand] updating shell with contacts");
      e.sendCommand(l.commands.CONTACTS_DATA_RESPONSE, { contactsData: t });
    }
    function h(e) {
      try {
        var t = JSON.parse(window.atob(e.logs)), n = ["ShellAppLog"].concat(t);
        u.get()[e.method].apply(null, n);
      } catch (r) {
      }
    }
    function p(e) {
      var t = g(e.conversationId);
      t.selfParticipant.audio.state._set(e.state, e.reason);
    }
    function d(e) {
      if (!e.conversationId)
        return;
      var t = g(e.conversationId), n = f.getOrCreateParticipantInConversation(t, e.participantId);
      if (!n)
        return;
      f.updateParticipantAudioVideoState(n, e.state, e.reason);
    }
    function v(e) {
      if (!e.conversationId || !e.messageBody)
        return;
      var t = g(e.conversationId);
      t._callData.pluginCallInfo(e.messageBody);
    }
    function m(e) {
      return function (r) {
        var i = n.get().conversationsManager._getOrCreateConversation(r.conversationId);
        i._callHandler && i._callHandler.toggleMuteTask && i._callHandler.toggleMuteTask.promise.state() === "pending" ? i._callHandler.toggleMuteTask.resolve(e) : (i.selfParticipant.audio.isMuted._set(e), i.selfParticipant.audio.isMuted.set._enabled(!0));
      };
    }
    function g(e) {
      return n.get().conversationsManager._getOrCreateConversation(e);
    }
    e.registerCommandHandler(l.commands.PLUGIN_ERROR, t);
    e.registerCommandHandler(l.commands.CHANGE_STATE, p);
    e.registerCommandHandler(l.commands.PSTN_EVENT, d);
    e.registerCommandHandler(l.commands.MUTE, m(!0));
    e.registerCommandHandler(l.commands.UNMUTE, m(!1));
    e.registerCommandHandler(l.commands.CALL_INFO, v);
    e.registerCommandHandler(l.commands.CONTACTS_DATA_REQUEST, c);
    r.isFeatureOn(i.featureFlags.SHELL_APP_LOGS) && e.registerCommandHandler(l.commands.SHELL_APP_LOG, h);
  }
  var n = e("jSkype/client"), r = e("jSkype/settings"), i = e("constants/common"), s = e("jSkype/services/calling/environmentInspector"), o = e("swx-enums"), u = e("jSkype/telemetry/logging/callingLogTracer"), a = e("constants/plugin.const"), f = e("jSkype/modelHelpers/participantHelper"), l = e("constants/outOfBrowser");
  t.build = function (e) {
    return new c(e);
  };
});
