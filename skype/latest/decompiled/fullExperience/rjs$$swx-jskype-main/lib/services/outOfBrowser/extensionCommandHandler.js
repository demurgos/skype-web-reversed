(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/outOfBrowser/extensionCommandHandler", [
      "require",
      "exports",
      "swx-jskype-internal-application-instance",
      "jskype-settings-instance",
      "swx-constants",
      "../../../lib/services/calling/environmentInspector",
      "swx-enums",
      "../../../lib/telemetry/logging/callingLogTracer",
      "swx-constants",
      "../../../lib/modelHelpers/calling/participantHelper",
      "swx-constants",
      "swx-log-tracer"
    ], e);
}(function (e, t) {
  function d(e) {
    return new p(e);
  }
  var n = e("swx-jskype-internal-application-instance"), r = e("jskype-settings-instance"), i = e("swx-constants"), s = e("../../../lib/services/calling/environmentInspector"), o = e("swx-enums"), u = e("../../../lib/telemetry/logging/callingLogTracer"), a = e("swx-constants"), f = e("../../../lib/modelHelpers/calling/participantHelper"), l = e("swx-constants"), c = e("swx-log-tracer"), h = c.getLogger("ExtensionCommandHandler"), p = function () {
      function e(e) {
        this.messagingChannel = e;
        e.registerCommandHandler(l.OUT_OF_BROWSER.commands.PLUGIN_ERROR, this.onPluginError.bind(this));
        e.registerCommandHandler(l.OUT_OF_BROWSER.commands.CHANGE_STATE, this.onCallStateChanged.bind(this));
        e.registerCommandHandler(l.OUT_OF_BROWSER.commands.UPDATE_PARTICIPANT_STATE, this.onParticipantStateChanged.bind(this));
        e.registerCommandHandler(l.OUT_OF_BROWSER.commands.PSTN_EVENT, this.onPstnEvent.bind(this));
        e.registerCommandHandler(l.OUT_OF_BROWSER.commands.MUTE, this.createMuteHandler(!0));
        e.registerCommandHandler(l.OUT_OF_BROWSER.commands.UNMUTE, this.createMuteHandler(!1));
        e.registerCommandHandler(l.OUT_OF_BROWSER.commands.CALL_INFO, this.onCallInfoMessage.bind(this));
        e.registerCommandHandler(l.OUT_OF_BROWSER.commands.CONTACTS_DATA_REQUEST, this.onContactsDataRequested.bind(this));
        r.isFeatureOn(i.COMMON.featureFlags.SHELL_APP_LOGS) && e.registerCommandHandler(l.OUT_OF_BROWSER.commands.SHELL_APP_LOG, this.onShellAppLog.bind(this));
      }
      return e.prototype.onPluginError = function (e) {
        e === a.PLUGIN_CONST.PLUGIN_ERRORS.REASON_ALREADY_EXISTS && s.disableCalling(o.callingNotSupportedReasons.PluginAlreadyRunning);
      }, e.prototype.onContactsDataRequested = function () {
        var e = {};
        n.get().personsAndGroupsManager.all.persons().forEach(function (t) {
          e[t.id()] = { status: t.status() };
        });
        u.get().log("[ExtensionCommand] updating shell with contacts");
        this.messagingChannel.sendCommand(l.OUT_OF_BROWSER.commands.CONTACTS_DATA_RESPONSE, { contactsData: e });
      }, e.prototype.onShellAppLog = function (e) {
        try {
          var t = JSON.parse(window.atob(e.logs)), n = ["ShellAppLog"].concat(t), r = u.get();
          r[e.method].apply(null, n);
        } catch (i) {
          h.log("Unable to process shellApp log", e);
        }
      }, e.prototype.onCallStateChanged = function (e) {
        var t = this.getOrCreateConversation(e.conversationId);
        t.selfParticipant.audio.state._set(e.state, e.reason);
      }, e.prototype.onParticipantStateChanged = function (e) {
        if (!e.conversationId)
          return;
        var t = this.getOrCreateConversation(e.conversationId), n = f.getOrCreateParticipantInConversation(t, e.personId);
        if (!n)
          return;
        f.updateParticipantAudioVideoState(n, e.state, e.reason);
      }, e.prototype.onPstnEvent = function (e) {
        if (!e.conversationId)
          return;
        var t = this.getOrCreateConversation(e.conversationId), n = f.getOrCreateParticipantInConversation(t, e.participantId);
        if (!n)
          return;
        f.updateParticipantAudioVideoState(n, e.state, e.reason);
      }, e.prototype.onCallInfoMessage = function (e) {
        if (!e.conversationId || !e.messageBody)
          return;
        var t = this.getOrCreateConversation(e.conversationId);
        t._callData.pluginCallInfo(e.messageBody);
      }, e.prototype.createMuteHandler = function (e) {
        return function (r) {
          var i = n.get().conversationsManager._getOrCreateConversation(r.conversationId);
          i._callHandler && i._callHandler.toggleMuteTask && i._callHandler.toggleMuteTask.promise.state() === "pending" ? i._callHandler.toggleMuteTask.resolve(e) : (i.selfParticipant.audio.isMuted._set(e), i.selfParticipant.audio.isMuted.set._enabled(!0));
        };
      }, e.prototype.getOrCreateConversation = function (e) {
        return n.get().conversationsManager._getOrCreateConversation(e);
      }, e;
    }();
  t.ExtensionCommandHandler = p;
  t.build = d;
}));
