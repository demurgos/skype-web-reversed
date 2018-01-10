(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/utils/chat/message", [
      "require",
      "exports",
      "swx-jskype-internal-application-instance",
      "./parser",
      "swx-enums",
      "swx-mri"
    ], e);
}(function (e, t) {
  function a(e) {
    var t = /<initiator>(\d+:.+)<\/initiator>/, n = e.match(t);
    return n ? n[1] : undefined;
  }
  function f(e) {
    var t = /<target>(.+)<\/target>/, n = e.match(t);
    return n ? n[1].split("</target><target>") : undefined;
  }
  function l(e, t, n) {
    if (!e)
      return !0;
    var r = e.lastReadMessageId === t, i = e.lastReadMessageTimestamp >= n;
    return r || i;
  }
  function c(e) {
    if (typeof e.isOutgoing != "undefined")
      return e.isOutgoing;
    var t = r.parseName(e.from), i = n.get().personsAndGroupsManager.mePerson;
    return u = u || s.getKey(i.id(), i._type()), t === u;
  }
  function h(e) {
    return e.messagetype && o.indexOf(e.messagetype) > -1 ? y(e) || b(e) : !(e.messagetype && e.messagetype.indexOf("ThreadActivity/") > -1 || e.contactRequestType && e.contactRequestType === i.activityType.ContactRequestIsNowContact);
  }
  function p(e) {
    return !c(e) && h(e);
  }
  function d(e) {
    return e ? !e._isSMS || !e._isSMS() ? !0 : e._smsInfo().isSuccessful() : !1;
  }
  function v() {
    u = undefined;
  }
  function m() {
    return u ? s.getId(u) : n.get().personsAndGroupsManager.mePerson.id();
  }
  function g(e) {
    var t = f(e), n = t ? t.map(function (e) {
        return s.getId(e);
      }) : null;
    return n;
  }
  function y(e) {
    var t = e.content ? a(e.content) : null, n = e.content ? g(e.content) : null, r = m();
    return n ? e.messagetype === "ThreadActivity/AddMember" && s.getId(t) !== r && n.indexOf(r) > -1 : !1;
  }
  function b(e) {
    var t = e.content ? a(e.content) : null, n = m();
    return e.messagetype === "ThreadActivity/TopicUpdate" && s.getId(t) !== n;
  }
  var n = e("swx-jskype-internal-application-instance"), r = e("./parser"), i = e("swx-enums"), s = e("swx-mri"), o = [
      "ThreadActivity/TopicUpdate",
      "ThreadActivity/AddMember"
    ], u;
  t.getInitiator = a;
  t.getTargets = f;
  t.isMessageReadOnServer = l;
  t.isMessageOutgoing = c;
  t.doesMessageTypeSupportUnreadState = h;
  t.canMessageBeMarkedAsUnreadInUI = p;
  t.allDependenciesAllowSuccessStatus = d;
  t.reset = v;
}));
