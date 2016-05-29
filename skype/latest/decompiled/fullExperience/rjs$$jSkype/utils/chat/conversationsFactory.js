define("jSkype/utils/chat/conversationsFactory", [
  "require",
  "jSkype/modelHelpers/propertyValidator",
  "jSkype/modelHelpers/personsAndGroupsHelper",
  "jSkype/modelHelpers/personHelper",
  "jSkype/models/conversation"
], function (e) {
  function s(e) {
    function o(e) {
      var t = n.getPersonByConversationId(e);
      return s.createByPerson(t);
    }
    var s = this;
    this.createById = function (n) {
      var r;
      return t.isGroupConversation(n) ? r = new i(e, !0, n) : r = o(n), r || (r = new i(e), r.conversationId = n), r;
    };
    this.createByPerson = function (t) {
      var n = r.getKey(t.id(), t._type()), s = new i(e, !1, n);
      return s._addParticipant(t), s.avatarUrl = t.avatarUrl, s.topic = t.displayName, s;
    };
  }
  var t = e("jSkype/modelHelpers/propertyValidator"), n = e("jSkype/modelHelpers/personsAndGroupsHelper"), r = e("jSkype/modelHelpers/personHelper"), i = e("jSkype/models/conversation");
  return s;
});
