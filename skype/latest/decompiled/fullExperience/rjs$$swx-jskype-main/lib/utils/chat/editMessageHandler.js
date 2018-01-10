(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/utils/chat/editMessageHandler", [
      "require",
      "exports",
      "../../../lib/services/annotations/main",
      "swx-enums"
    ], e);
}(function (e, t) {
  function i(e, t, n) {
    n.type() !== t.type() ? o(e, t, n) : u(t, n);
  }
  function s(e) {
    return !!e.html;
  }
  function o(e, t, n) {
    n.timestamp._set(t.timestamp());
    e.replaceMessage(t, n);
  }
  function u(e, t) {
    var i, o = e.direction().toLowerCase() === r.direction.Incoming.toLowerCase();
    s(e) && s(t) && (i = t.html(), e._actualId = t._id, e.isDeleted._set(t.isDeleted()), e.isEdited._set(t.isEdited()), n["default"].updateMessageProperties(e, t), e._skypeemoteoffset && !t.isDeleted() && o && !t._skypeemoteoffset && (i = e.html().substr(0, e._skypeemoteoffset) + i), e.html._set(i));
  }
  var n = e("../../../lib/services/annotations/main"), r = e("swx-enums");
  t.handleMessageEdit = i;
}));
