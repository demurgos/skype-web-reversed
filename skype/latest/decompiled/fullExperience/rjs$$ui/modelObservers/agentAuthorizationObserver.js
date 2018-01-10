define("ui/modelObservers/agentAuthorizationObserver", [
  "require",
  "exports",
  "module",
  "vendor/knockout",
  "swx-cafe-application-instance",
  "ui/modelHelpers/conversationHelper",
  "ui/modelHelpers/personHelper"
], function (e, t) {
  function o(e) {
    function o() {
      i.isOneToOneConversationWithAgent(e) && r.get().personsAndGroupsManager.all.persons.changed(u);
    }
    function u() {
      var n = e.participants()[0].person, r = s.isKnownPerson(n);
      t.isConversationWithUnauthorizedAgent(!r);
    }
    var t = this;
    t.isConversationWithUnauthorizedAgent = n.observable(!1);
    t.dispose = function () {
      r.get().personsAndGroupsManager.all.persons.changed.off(u);
    };
    o();
  }
  var n = e("vendor/knockout"), r = e("swx-cafe-application-instance"), i = e("ui/modelHelpers/conversationHelper"), s = e("ui/modelHelpers/personHelper");
  t.build = function (e) {
    return new o(e);
  };
});
