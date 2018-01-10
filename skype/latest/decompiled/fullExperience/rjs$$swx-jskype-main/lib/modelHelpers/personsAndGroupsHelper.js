(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/modelHelpers/personsAndGroupsHelper", [
      "require",
      "exports",
      "swx-browser-globals",
      "swx-enums",
      "swx-jskype-internal-application-instance",
      "./personsRegistry/instance",
      "swx-mri",
      "jskype-constants/lib/people"
    ], e);
}(function (e, t) {
  function f(e) {
    return s.build().get(e);
  }
  function l(e) {
    var t = i.get().personsAndGroupsManager.mePerson, n = o.getId(e);
    return n === a || t.id() === n || t._msaId && o.getId(t._msaId()) === n;
  }
  function c(e) {
    return !!e && !!i.get().personsAndGroupsManager.all.persons(e.id());
  }
  function h(e) {
    var n = f(e);
    return !l(e) && !c(n) ? n || t.createDefaultPerson(e) : undefined;
  }
  function p() {
    var e = i.get().personsAndGroupsManager.all;
    return e.groups().filter(function (e) {
      return e.relationshipLevel() === r.groupPrivacyRelationshipLevel.Blocked;
    })[0];
  }
  function d(e, t) {
    return l(e) ? i.get().personsAndGroupsManager.mePerson : s.build().getOrCreate(e, t);
  }
  function v(e) {
    var t = o.getId(e), n = o.getTypeFromKey(e);
    return s.build().getOrCreate(t, n);
  }
  function m(e) {
    return JSON.parse(n.getWindow().atob(e.split(".")[1])).skypeid;
  }
  function g(e) {
    return JSON.parse(n.getWindow().atob(e.split(".")[1])).cid;
  }
  var n = e("swx-browser-globals"), r = e("swx-enums"), i = e("swx-jskype-internal-application-instance"), s = e("./personsRegistry/instance"), o = e("swx-mri"), u = e("jskype-constants/lib/people"), a = u["default"].SELF;
  t.getPersonById = f;
  t.isMePerson = l;
  t.isKnownPerson = c;
  t.createDefaultPerson = function (e) {
    return s.build().create(e);
  };
  t.getUnknownPerson = h;
  t.getBlockedGroup = p;
  t.getPerson = d;
  t.getPersonByConversationId = v;
  t.extractSkypeIdFromToken = m;
  t.extractCIDFromToken = g;
}));
