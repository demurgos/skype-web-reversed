(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/systemCommands/commands/properties/admins", [
      "require",
      "exports",
      "../../../../../lib/services/systemCommands/commandsHelper",
      "swx-enums",
      "lodash-compat"
    ], e);
}(function (e, t) {
  function o() {
    return new s();
  }
  var n = e("../../../../../lib/services/systemCommands/commandsHelper"), r = e("swx-enums"), i = e("lodash-compat"), s = function () {
      function e() {
        this.get = {
          isAvailableFor: n.availableForAllGroupMembers,
          action: function (e) {
            var t = "admins=", s = i.filter(e.participants().concat(e.selfParticipant), function (e) {
                return e.role() === r.participantRole.Leader;
              });
            s.forEach(function (e) {
              t += e.person.id() + " ";
            });
            n.sendSystemMessage(e, t);
          }
        };
      }
      return e;
    }();
  t.Admins = s;
  t.build = o;
}));
