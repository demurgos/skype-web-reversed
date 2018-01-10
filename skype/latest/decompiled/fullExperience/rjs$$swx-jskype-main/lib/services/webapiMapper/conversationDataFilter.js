(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/webapiMapper/conversationDataFilter", [
      "require",
      "exports",
      "../../../lib/utils/chat/conversation",
      "../../../lib/services/webapiMapper/conversationLiveStateHandler",
      "jskype-settings-instance",
      "../../../lib/utils/chat/parser",
      "swx-constants"
    ], e);
}(function (e, t) {
  function l(e) {
    var t = s.getConversationIdFromUrl(e.resource.conversationLink);
    return n.isMeConversation(t);
  }
  function c(e) {
    return e === "Signal/Call" || e === "Signal/Flamingo";
  }
  function p(e) {
    return new h(e);
  }
  var n = e("../../../lib/utils/chat/conversation"), r = e("../../../lib/services/webapiMapper/conversationLiveStateHandler"), i = e("jskype-settings-instance"), s = e("../../../lib/utils/chat/parser"), o = e("swx-constants"), u = o.COMMON.isTyping, a = [
      u.MESSAGE_TYPE.SET_TYPING,
      u.MESSAGE_TYPE.CLEAR_TYPING
    ], f = "Control/LiveState", h = function () {
      function e(e) {
        var t = this;
        this.isGVCJoiningEnabled = i.isFeatureOn(o.COMMON.featureFlags.GVC_JOINING);
        this.eventMessages = function (e) {
          for (var n = 0; n < e.length; n++) {
            var r = e[n], i = r.resource.messagetype;
            if (l(r))
              return;
            if (c(i))
              return;
            a.indexOf(i) > -1 ? t.dataHandlers.handleTypingControl(r) : i === f ? t.handleLiveStateMessage(r) : t.handleAllOtherEventMessages(r);
          }
        };
        this.dataHandlers = e;
      }
      return e.prototype.handleLiveStateMessage = function (e) {
        this.isGVCJoiningEnabled && r.updateCallState(e.resource.content, e.resource.conversationLink);
      }, e.prototype.handleEventMessage = function (e) {
        var t = this.dataHandlers["handle" + e.resourceType];
        t && t.call(this.dataHandlers, e);
      }, e.prototype.handleAllOtherEventMessages = function (e) {
        e.type === "EventMessage" && e.resourceType === "ThreadUpdate" && e.resource.type === "Thread" && r.updateNGCCallState(e.resource.id, e.resource.properties);
        this.handleEventMessage(e);
      }, e;
    }();
  t.ConversationDataFilter = h;
  t.build = p;
}));
