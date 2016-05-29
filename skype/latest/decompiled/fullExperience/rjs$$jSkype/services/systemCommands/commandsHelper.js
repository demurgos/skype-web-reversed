define("jSkype/services/systemCommands/commandsHelper", [
  "require",
  "exports",
  "module",
  "swx-enums",
  "jSkype/utils/chat/generator",
  "utils/chat/messageSanitizer"
], function (e, t) {
  var n = e("swx-enums"), r = e("jSkype/utils/chat/generator"), i = e("utils/chat/messageSanitizer");
  t.sendSystemMessage = function (e, t) {
    var s = i.processOutgoingTextMessage(t), o = r.outgoingTextMessageActivityItem({ content: s }, e);
    o.status._set(n.activityStatus.Succeeded);
    o.type._set(n.activityType.SystemMessage);
    e.historyService._addOutgoingMessage(o);
  };
  t.availableAlways = function () {
    return !0;
  };
  t.availableNever = function () {
    return !1;
  };
  t.availableForOneToOne = function (e) {
    return !e.isGroupConversation();
  };
  t.availableForAllGroupMembers = function (e) {
    return e.isGroupConversation();
  };
  t.availableForNonAnonymousGroupMembers = function (e) {
    return e.isGroupConversation() && !e.selfParticipant.isAnonymous();
  };
  t.availableForGroupLeaders = function (e) {
    return e.isGroupConversation() && e.selfParticipant.role() === n.participantRole.Leader;
  };
});
