define("jSkype/utils/chat/editMessageHandler", [
  "require",
  "exports",
  "module",
  "jSkype/services/annotations/main"
], function (e, t) {
  function r(e) {
    return !!e.html;
  }
  function i(e, t, n) {
    n.timestamp._set(t.timestamp());
    e.replaceMessage(t, n);
  }
  function s(e, t) {
    r(e) && r(t) && (e._actualId = t._id, e.isDeleted._set(t.isDeleted()), e.isEdited._set(t.isEdited()), n.updateMessageProperties(e, t), e.html._set(t.html()));
  }
  var n = e("jSkype/services/annotations/main");
  t.handleMessageEdit = function (e, t, n) {
    n.type() !== t.type() ? i(e, t, n) : s(t, n);
  };
});
