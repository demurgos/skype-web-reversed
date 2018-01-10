(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/utils/chat/generator", [
      "require",
      "exports",
      "swx-jskype-internal-application-instance",
      "jskype-settings-instance",
      "swx-constants",
      "../../../lib/models/conversationActivityItem",
      "swx-utils-chat",
      "swx-enums",
      "swx-i18n",
      "../../../lib/utils/chat/messageTypes",
      "../../../lib/utils/chat/parser",
      "../../../lib/utils/chat/message",
      "swx-mri",
      "../../../lib/modelHelpers/personsAndGroupsHelper",
      "lodash-compat"
    ], e);
}(function (e, t) {
  function v(e, t) {
    return e.contactRequestType ? C(e, t) : e.pstnEventType ? _(e) : e.pluginFreeMessageType ? M(e) : N(e, t);
  }
  function m(e) {
    var t = {
      content: e.content,
      messagetype: e.messagetype,
      properties: e.properties,
      contenttype: "text",
      "Has-Mentions": P(e.content),
      imdisplayname: n.get().personsAndGroupsManager.mePerson.displayName()
    };
    return e.skypeeditedid ? t.skypeeditedid = String(e.skypeeditedid) : t.clientmessageid = String(e.key), e.skypeemoteoffset && (t.skypeemoteoffset = e.skypeemoteoffset), t;
  }
  function g(e, t) {
    e.messagetype = e.messageType || "RichText";
    e.content = D(e.content);
    var r = f.fetch(e.messagetype), i = n.get().personsAndGroupsManager.mePerson, s = new Date();
    e.isMyself = !0;
    e.conversationModel = t;
    e.author = h.getKey(i.id(), i._type());
    var o = f.parse(r, e);
    return o._id = s.getTime(), o._actualId = o._id, o.key._set(String(s.getTime())), o.timestamp._set(s), o._htmlSetEnabled(!0), o.isRead._set(!0), o.status._set(u.activityStatus.Pending), o._originalContent = "" + (e.originalContent || e.content), o;
  }
  function y(e) {
    var t = f.fetch(e.messagetype), r = f.parse(t, e);
    return r._id = e.timestamp, r._actualId = e.timestamp, r.isRead._set(!0), r._htmlSetEnabled(!0), r.sender = n.get().personsAndGroupsManager.mePerson, r.direction._set(u.direction.Outgoing), r.status._set(u.activityStatus.Pending), r.key._set(e.key), r.timestamp._set(new Date(e.timestamp)), r;
  }
  function b(e, t) {
    var r = new s.MojiMessageActivityItem(t.conversationModel), i = e + "/views/default", o = e + "/views/thumbnail";
    return r._id = t.timestamp, r._actualId = r._id, r._htmlSetEnabled(!0), r.direction._set(u.direction.Outgoing), r.type._set(u.activityType.MojiMessage), r.sender = n.get().personsAndGroupsManager.mePerson, r.thumbnailUrl._set(o), r.mojiUrl._set(i), r.key._set(t.key), r.timestamp._set(new Date(t.timestamp)), r.isRead._set(!0), r.status._set(u.activityStatus.Pending), r.html._set(t.content), r;
  }
  function w(e, t) {
    var r = new s.ContactInfoMessageActivityItem(t), i = o.dateTime.getDate();
    return r._htmlSetEnabled(!0), r.sender = n.get().personsAndGroupsManager.mePerson, r.direction._set(u.direction.Outgoing), r.status._set(u.activityStatus.Pending), r.key._set(String(i.getTime())), r.contacts(e), r.timestamp._set(i), r;
  }
  function E(e) {
    var t = new s.PictureMessageActivityItem(e);
    return t._htmlSetEnabled(!0), t.sender = n.get().personsAndGroupsManager.mePerson, t.direction._set(u.direction.Outgoing), t.status._set(u.activityStatus.Pending), t.key._set(String(new Date().getTime())), t.timestamp._set(o.dateTime.getDate()), t;
  }
  function S(e, t) {
    function i(e) {
      if (!e)
        return "unknown";
      var t = e.split(".");
      return t.length < 2 ? "unknown" : t.pop().toLowerCase();
    }
    var r = new s.FileTransferActivityItem(t);
    return r._htmlSetEnabled(!0), r.fileName = e.name, r.fileType = i(e.name), r.sender = n.get().personsAndGroupsManager.mePerson, r.direction._set(u.direction.Outgoing), r.status._set(u.activityStatus.Pending), r.key._set(String(new Date().getTime())), r.fileSize = e.size ? e.size : 0, r.timestamp._set(o.dateTime.getDate()), r;
  }
  function x(e, t) {
    var r = n.get().personsAndGroupsManager.mePerson;
    e.myself = h.getKey(r.id(), r._type());
    e.author = l.parseName(e.from);
    e.isMyself = T(e, t);
    e.originalContent || (e.originalContent = e.content === undefined ? "" : "" + d.unescape(e.content));
    e.conversationModel = t;
  }
  function T(e, t) {
    var n = new RegExp("^4:"), r = n.test(t.conversationId);
    return r || e.author === e.myself;
  }
  function N(e, t) {
    var n = "" + (e.originalContent || e.content);
    x(e, t);
    var r = f.fetch(e.messagetype), i = f.parse(r, e), s = c.allDependenciesAllowSuccessStatus(i) ? u.activityStatus.Succeeded : u.activityStatus.Failed;
    return i._id = e.id, i._actualId = e.id, i.key._set(e.key || e.clientmessageid), i.timestamp._set(new Date(e.originalarrivaltime)), i.isRead._set(c.canMessageBeMarkedAsUnreadInUI(e) ? !e.isUnread : !0), i.status._set(s), i._originalContent = n, i._isFromPolling = e._isFromPolling, i;
  }
  function C(e, t) {
    return k(e) ? A(e, t) : L(e);
  }
  function k(e) {
    var t = r.isFeatureOn(i.COMMON.featureFlags.INVITE_FREE_IMPLICIT_INCOMING_CONTACT_REQUEST);
    return t && (e.contactRequestType === u.activityType.ContactRequestIncoming || e.contactRequestType === u.activityType.ContactRequestIncomingInviteFree);
  }
  function L(e) {
    var t = new s.ContactRequestActivityItem();
    return t.sender = p.getPerson(e.personId), t._id = e.id, t._actualId = e.id, t.key._set(e.id), t.type._set(e.contactRequestType), t.timestamp._set(new Date(e.timestamp)), t.greeting._set(e.greeting), t.isRead._set(e.isOutgoing), t;
  }
  function A(e, t) {
    return e.contactRequestType === u.activityType.ContactRequestIncoming ? O(e, t) : e.contactRequestType === u.activityType.ContactRequestIncomingInviteFree ? L(e) : undefined;
  }
  function O(e, t) {
    var r = p.getPerson(e.personId), i = n.get().personsAndGroupsManager.mePerson, o = new s.TextMessageActivityItem(t), f = a.localization.fetch({
        key: "message_text_contactRequestGreeting",
        params: { displayName: i.displayName() }
      });
    return o._id = e.id, o._actualId = e.id, o.key._set(e.id), o.sender = r, o.timestamp._set(new Date(e.timestamp)), o.html._set(e.greeting || f), o.type._set(u.activityType.TextMessage), o.isRead._set(!1), o;
  }
  function M(e) {
    var t = new s.PluginFreeActivityItem();
    return t.type._set(e.pluginFreeMessageType), t.timestamp._set(e.timestamp), t.key._set(e.id), t;
  }
  function _(e) {
    var t = new s.PstnActivityItem();
    return t.type._set(e.pstnEventType), t.timestamp._set(e.timestamp), t.key._set(e.id), t.isGroup._set(e.isGroup), t.participantName._set(e.participantName), t.participantEndpoint._set(e.participantEndpoint), t;
  }
  function D(e) {
    var t = /href="((?:https?:\/\/|mailto:)[^"]+)"/gi, n = e.match(t) || [];
    return n.forEach(function (t) {
      e = e.replace(t, t.replace("&amp;", "&"));
    }), e;
  }
  function P(e) {
    var t = /<at id="(.*?)">.*?<\/at>/g;
    return t.test(e).toString().toLowerCase();
  }
  var n = e("swx-jskype-internal-application-instance"), r = e("jskype-settings-instance"), i = e("swx-constants"), s = e("../../../lib/models/conversationActivityItem"), o = e("swx-utils-chat"), u = e("swx-enums"), a = e("swx-i18n"), f = e("../../../lib/utils/chat/messageTypes"), l = e("../../../lib/utils/chat/parser"), c = e("../../../lib/utils/chat/message"), h = e("swx-mri"), p = e("../../../lib/modelHelpers/personsAndGroupsHelper"), d = e("lodash-compat");
  t.activityFromRawMessage = v;
  t.messageForService = m;
  t.outgoingTextMessageActivityItem = g;
  t.outgoingPollMessageActivityItem = y;
  t.outgoingMojiActivityItem = b;
  t.outgoingContactInfoActivityItem = w;
  t.outgoingPictureActivityItem = E;
  t.outgoingFileActivityItem = S;
  t.extendRawMessage = x;
}));
