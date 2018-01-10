(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/systemCommands/commandsHelper", [
      "require",
      "exports",
      "swx-enums",
      "../../../lib/utils/chat/generator",
      "swx-utils-chat"
    ], e);
}(function (e, t) {
  function s(e, t) {
    var s = i.messageSanitizer.processOutgoingTextMessage(t, e), o = r.outgoingTextMessageActivityItem({ content: s }, e);
    o.status._set(n.activityStatus.Succeeded);
    o.type._set(n.activityType.SystemMessage);
    e.historyService._addOutgoingMessage(o);
  }
  function o() {
    return !0;
  }
  function u() {
    return !1;
  }
  function a(e) {
    return !e.isGroupConversation();
  }
  function f(e) {
    return e.isGroupConversation();
  }
  function l(e) {
    return e.isGroupConversation() && !e.selfParticipant.isAnonymous();
  }
  function c(e) {
    return e.isGroupConversation() && e.selfParticipant.role() === n.participantRole.Leader;
  }
  var n = e("swx-enums"), r = e("../../../lib/utils/chat/generator"), i = e("swx-utils-chat");
  t.sendSystemMessage = s;
  t.availableAlways = o;
  t.availableNever = u;
  t.availableForOneToOne = a;
  t.availableForAllGroupMembers = f;
  t.availableForNonAnonymousGroupMembers = l;
  t.availableForGroupLeaders = c;
}));
