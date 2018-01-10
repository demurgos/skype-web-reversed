define("ui/modelHelpers/groupHelper", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "swx-cafe-application-instance",
  "ui/modelHelpers/personHelper"
], function (e, t) {
  function s(e) {
    return !i.isEchoContact(e);
  }
  function o(e) {
    return !i.isAgent(e);
  }
  function u(e) {
    return r.get().personsAndGroupsManager.all.uri() === e ? r.get().personsAndGroupsManager.all : r.get().personsAndGroupsManager.all.groups(e);
  }
  var n = e("lodash-compat"), r = e("swx-cafe-application-instance"), i = e("ui/modelHelpers/personHelper");
  t.getPersonsOtherThanEcho = function () {
    var e = r.get().personsAndGroupsManager.all.persons();
    return n.filter(e, s);
  };
  t.getPersonsOtherThanEchoAndAgents = function () {
    return n.filter(t.getPersonsOtherThanEcho(), o);
  };
  t.getPersonsFromGroup = function (e) {
    var t = u(e);
    return t && n.isFunction(t.persons) ? t.persons() : [];
  };
  t.isPersonInGroup = function (e, t) {
    var r = u(e);
    return r && n.isFunction(r.persons) ? !!r.persons(t.id()) : !1;
  };
  t.addPersonToGroup = function (e, t) {
    var r = u(e);
    return r && n.isFunction(r.persons) ? r.persons.add(t, t.id()) : Promise.resolve();
  };
  t.removePersonFromGroup = function (e, t) {
    var r = u(e);
    return r && n.isFunction(r.persons) ? r.persons.remove(t) : Promise.resolve();
  };
  t.subscribeToGroup = function (e, t) {
    var r = u(e);
    return r && n.isFunction(r.persons) ? r.persons.changed(t) : Promise.resolve();
  };
  t.unsubscribeFromGroup = function (e, t) {
    var n = u(e);
    n && n.persons.changed.off(t);
  };
});
