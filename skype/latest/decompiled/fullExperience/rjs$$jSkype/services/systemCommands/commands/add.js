define("jSkype/services/systemCommands/commands/add", [
  "require",
  "exports",
  "module",
  "jSkype/services/systemCommands/commandsHelper",
  "jSkype/modelHelpers/personsAndGroupsHelper",
  "ui/modelHelpers/conversationHelper",
  "services/pubSub/pubSub",
  "constants/common"
], function (e, t) {
  function u(e) {
    var t = i.createConversation(e, !0);
    s.publish(o.events.navigation.OPEN_CONVERSATION, {
      model: t,
      origin: o.telemetry.historyLoadOrigin.CONVERSATION_TO_THREAD
    });
  }
  function a() {
    this.isAvailableFor = function (e) {
      return n.availableForOneToOne(e) || n.availableForNonAnonymousGroupMembers(e);
    };
    this.help = "[skypename]";
    this.showInHelp = !0;
    this.action = function (e, t) {
      var n = r.getPersonById(t), i, s;
      if (!n)
        return;
      e.isGroupConversation() ? e.participants.add.enabled() && (i = e.createParticipant(n), e.participants.add(i).catch(function (e) {
      })) : (s = [
        n,
        e.participants(0).person
      ], u(s));
    };
  }
  var n = e("jSkype/services/systemCommands/commandsHelper"), r = e("jSkype/modelHelpers/personsAndGroupsHelper"), i = e("ui/modelHelpers/conversationHelper"), s = e("services/pubSub/pubSub"), o = e("constants/common");
  t.build = function () {
    return new a();
  };
});
