(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/utils/chat/conversationsFactory", [
      "require",
      "exports",
      "../../../lib/modelHelpers/propertyValidator",
      "../../../lib/modelHelpers/personsAndGroupsHelper",
      "../../../lib/models/conversation",
      "swx-mri"
    ], e);
}(function (e, t) {
  var n = e("../../../lib/modelHelpers/propertyValidator"), r = e("../../../lib/modelHelpers/personsAndGroupsHelper"), i = e("../../../lib/models/conversation"), s = e("swx-mri"), o = function () {
      function e(e) {
        var t = this;
        this.createById = function (e) {
          var r;
          return n.isGroupConversation(e) ? r = new i["default"](t.conversationAPIHandler, !0, e) : r = t.getDialogConversationForKey(e), r || (r = new i["default"](t.conversationAPIHandler), r.conversationId = e), r;
        };
        this.createByPerson = function (e) {
          var n = s.getKey(e.id(), e._type()), r = new i["default"](t.conversationAPIHandler, !1, n);
          return r._addParticipant(e), r.avatarUrl = e.avatarUrl, r.topic = e.displayName, r;
        };
        this.conversationAPIHandler = e;
      }
      return e.prototype.getDialogConversationForKey = function (e) {
        var t = r.getPersonByConversationId(e);
        return this.createByPerson(t);
      }, e;
    }();
  t.__esModule = !0;
  t["default"] = o;
}));
