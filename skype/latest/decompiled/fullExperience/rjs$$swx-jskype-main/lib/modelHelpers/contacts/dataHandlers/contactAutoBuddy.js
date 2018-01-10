(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/modelHelpers/contacts/dataHandlers/contactAutoBuddy", [
      "require",
      "exports",
      "../../../modelHelpers/contacts/authorizationChange",
      "../../../modelHelpers/personsAndGroupsHelper",
      "jskype-constants"
    ], e);
}(function (e, t) {
  function u() {
    return new o();
  }
  var n = e("../../../modelHelpers/contacts/authorizationChange"), r = e("../../../modelHelpers/personsAndGroupsHelper"), i = e("jskype-constants"), s = i.PEOPLE.authorizationStates, o = function () {
      function e() {
      }
      return e.prototype.onSuccess = function (e) {
        var t = r.getPersonByConversationId(e);
        n.setAuthorization(t, s.AUTHORIZED);
      }, e;
    }();
  t.ContactAutoBuddyHandlers = o;
  t.build = u;
}));
