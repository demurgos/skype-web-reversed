(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/systemCommands/commands/properties/role", [
      "require",
      "exports",
      "../../../../../lib/services/systemCommands/commandsHelper",
      "swx-enums"
    ], e);
}(function (e, t) {
  function s() {
    return new i();
  }
  var n = e("../../../../../lib/services/systemCommands/commandsHelper"), r = e("swx-enums"), i = function () {
      function e() {
        this.get = {
          isAvailableFor: n.availableForAllGroupMembers,
          action: function (e) {
            n.sendSystemMessage(e, "role=" + (e.selfParticipant.role() === r.participantRole.Attendee ? "SPEAKER" : "ADMIN"));
          }
        };
      }
      return e;
    }();
  t.Role = i;
  t.build = s;
}));
