define("jSkype/utils/chat/message", [
  "require",
  "exports",
  "module",
  "jSkype/modelHelpers/personHelper",
  "jSkype/client",
  "jSkype/utils/chat/parser",
  "swx-enums"
], function (e, t) {
  function a() {
    return o ? n.getId(o) : r.get().personsAndGroupsManager.mePerson.id();
  }
  function f(e) {
    var r = t.getTargets(e), i = r ? r.map(function (e) {
        return n.getId(e);
      }) : null;
    return i;
  }
  function l(e) {
    var r = e.content ? t.getInitiator(e.content) : null, i = e.content ? f(e.content) : null, s = a();
    return i ? e.messagetype === "ThreadActivity/AddMember" && n.getId(r) !== s && i.indexOf(s) > -1 : !1;
  }
  function c(e) {
    var r = e.content ? t.getInitiator(e.content) : null, i = a();
    return e.messagetype === "ThreadActivity/TopicUpdate" && n.getId(r) !== i;
  }
  var n = e("jSkype/modelHelpers/personHelper"), r = e("jSkype/client"), i = e("jSkype/utils/chat/parser"), s = e("swx-enums"), o, u = [
      "ThreadActivity/TopicUpdate",
      "ThreadActivity/AddMember"
    ];
  t.getInitiator = function (e) {
    var t = /<initiator>(\d+:.+)<\/initiator>/, n = e.match(t);
    if (n)
      return n[1];
  };
  t.getTargets = function (e) {
    var t = /<target>(.+)<\/target>/, n = e.match(t);
    if (n)
      return n[1].split("</target><target>");
  };
  t.isMessageReadOnServer = function (e, t, n) {
    if (!e)
      return !0;
    var r = Math.floor(n / 1000) * 1000, i = e.lastReadMessageId === t, s = e.lastReadMessageTimestamp >= r;
    return i || s;
  };
  t.isMessageOutgoing = function (e) {
    if (typeof e.isOutgoing != "undefined")
      return e.isOutgoing;
    var t = i.parseName(e.from), s = r.get().personsAndGroupsManager.mePerson;
    return o = o || n.getKey(s.id(), s._type()), t === o;
  };
  t.doesMessageTypeSupportUnreadState = function (e) {
    return e.messagetype && u.indexOf(e.messagetype) > -1 ? l(e) || c(e) : !(e.messagetype && e.messagetype.indexOf("ThreadActivity/") > -1 || e.contactRequestType && e.contactRequestType === s.activityType.ContactRequestIsNowContact);
  };
  t.canMessageBeMarkedAsUnreadInUI = function (e) {
    return !t.isMessageOutgoing(e) && t.doesMessageTypeSupportUnreadState(e);
  };
});
