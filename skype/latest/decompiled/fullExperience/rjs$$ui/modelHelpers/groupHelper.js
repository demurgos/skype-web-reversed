define("ui/modelHelpers/groupHelper", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "cafe/applicationInstance",
  "ui/modelHelpers/personHelper",
  "swx-enums"
], function (e, t) {
  function o(e) {
    return !i.isEchoContact(e);
  }
  function u(e) {
    return !i.isAgent(e);
  }
  var n = e("lodash-compat"), r = e("cafe/applicationInstance"), i = e("ui/modelHelpers/personHelper"), s = e("swx-enums");
  t.getBlockedGroup = function () {
    var e = r.get().personsAndGroupsManager.all, t = n.find(e.groups(), function (e) {
        return e.relationshipLevel() === s.groupPrivacyRelationshipLevel.Blocked;
      });
    return t;
  };
  t.getPersonsOtherThanEcho = function () {
    var e = r.get().personsAndGroupsManager.all.persons();
    return n.filter(e, o);
  };
  t.getPersonsOtherThanEchoAndAgents = function () {
    return n.filter(t.getPersonsOtherThanEcho(), u);
  };
});
