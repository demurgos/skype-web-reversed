(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/systemCommands/commands/add", [
      "require",
      "exports",
      "swx-jskype-internal-application-instance",
      "../../../../lib/services/systemCommands/commandsHelper",
      "../../../../lib/modelHelpers/personsAndGroupsHelper",
      "swx-utils-chat",
      "swx-pubsub-instance",
      "swx-constants",
      "swx-i18n"
    ], e);
}(function (e, t) {
  function f(e) {
    var t = n.get().conversationsManager, r = s.conversation.createConversation(e, t, !0);
    o["default"].publish(u.COMMON.events.navigation.OPEN_CONVERSATION, {
      model: r,
      origin: u.COMMON.telemetry.historyLoadOrigin.CONVERSATION_TO_THREAD
    });
  }
  function c() {
    return new l();
  }
  var n = e("swx-jskype-internal-application-instance"), r = e("../../../../lib/services/systemCommands/commandsHelper"), i = e("../../../../lib/modelHelpers/personsAndGroupsHelper"), s = e("swx-utils-chat"), o = e("swx-pubsub-instance"), u = e("swx-constants"), a = e("swx-i18n"), l = function () {
      function e() {
        this.help = "[skypename]";
        this.showInHelp = !0;
        this.isAvailableFor = function (e) {
          return r.availableForOneToOne(e) || r.availableForNonAnonymousGroupMembers(e);
        };
        this.action = function (e, t, n) {
          function l() {
            return !s.isAgent() || s.isAgent() && typeof s.capabilities._groupChat == "function" && s.capabilities._groupChat();
          }
          var s = i.getPersonById(t);
          if (!s || !l()) {
            n.data.isSuccess = !1;
            n.publish();
            r.sendSystemMessage(e, a.localization.fetch({
              key: "message_text_joinConversationFailed",
              params: { participant: t }
            }));
            return;
          }
          if (!e.isGroupConversation()) {
            var o = [
              s,
              e.participants(0).person
            ];
            f(o);
            n.data.isSuccess = !0;
          } else if (e.participants.add.enabled()) {
            var u = e.createParticipant(s);
            e.participants.add(u)["catch"](function (e) {
            });
            n.data.isSuccess = !0;
          }
          n.data.isSuccess !== !0 && (n.data.isSuccess = !1);
          n.publish();
        };
      }
      return e;
    }();
  t.Add = l;
  t.build = c;
}));
