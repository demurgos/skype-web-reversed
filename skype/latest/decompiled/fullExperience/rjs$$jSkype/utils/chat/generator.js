define("jSkype/utils/chat/generator", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "jSkype/client",
  "jSkype/settings",
  "constants/common",
  "jSkype/models/conversationActivityItem",
  "utils/chat/dateTime",
  "swx-enums",
  "swx-i18n",
  "jSkype/utils/chat/mentionsParser",
  "jSkype/utils/chat/messageTypes",
  "jSkype/utils/chat/parser",
  "jSkype/utils/chat/message",
  "jSkype/modelHelpers/personHelper",
  "jSkype/modelHelpers/personsAndGroupsHelper",
  "utils/chat/pesUtils"
], function (e, t) {
  function N(e, n) {
    var r = "" + (e.originalContent || e.content);
    e.content = t.processMentions(e.content);
    t.extendRawMessage(e, n);
    var i = c.fetch(e.messagetype), s = c.parse(i, e);
    return s._id = e.id, s._actualId = e.id, s.key._set(e.key || e.clientmessageid), s.timestamp._set(new Date(e.originalarrivaltime)), s.isRead._set(p.canMessageBeMarkedAsUnreadInUI(e) ? !e.isUnread : !0), s.status._set(a.activityStatus.Succeeded), s._originalContent = r, s;
  }
  function C(e, t) {
    return k(e) ? A(e, t) : L(e);
  }
  function k(e) {
    var t = i.isFeatureOn(s.featureFlags.INVITE_FREE_IMPLICIT_INCOMING_CONTACT_REQUEST);
    return t && (e.contactRequestType === a.activityType.ContactRequestIncoming || e.contactRequestType === a.activityType.ContactRequestIncomingInviteFree);
  }
  function L(e) {
    var t = new g();
    return t.sender = v.getPerson(e.personId), t._id = e.id, t._actualId = e.id, t.key._set(e.id), t.type._set(e.contactRequestType), t.timestamp._set(new Date(e.timestamp)), t.greeting._set(e.greeting), t.isRead._set(e.isOutgoing), t;
  }
  function A(e, t) {
    if (e.contactRequestType === a.activityType.ContactRequestIncoming)
      return O(e, t);
    if (e.contactRequestType === a.activityType.ContactRequestIncomingInviteFree)
      return L(e);
  }
  function O(e, t) {
    var n, i = v.getPerson(e.personId), s = r.get().personsAndGroupsManager.mePerson, o = new T(t);
    return n = f.fetch({
      key: "message_text_contactRequestGreeting",
      params: { displayName: s.displayName() }
    }), o._id = e.id, o._actualId = e.id, o.key._set(e.id), o.sender = i, o.timestamp._set(new Date(e.timestamp)), o.html._set(e.greeting || n), o.type._set(a.activityType.TextMessage), o.isRead._set(!1), o;
  }
  function M(e) {
    var t = new S();
    return t.type._set(e.pluginFreeMessageType), t.timestamp._set(e.timestamp), t.key._set(e.id), t;
  }
  function _(e) {
    var t = new x();
    return t.type._set(e.pstnEventType), t.timestamp._set(e.timestamp), t.key._set(e.id), t.isGroup._set(e.isGroup), t.participantName._set(e.participantName), t.participantEndpoint._set(e.participantEndpoint), t;
  }
  function D(e) {
    var t = /href="((?:https?:\/\/|mailto:)[^"]+)"/gi, n = e.match(t) || [];
    return n.forEach(function (t) {
      e = e.replace(t, t.replace("&amp;", "&"));
    }), e;
  }
  var n = e("lodash-compat"), r = e("jSkype/client"), i = e("jSkype/settings"), s = e("constants/common"), o = e("jSkype/models/conversationActivityItem"), u = e("utils/chat/dateTime"), a = e("swx-enums"), f = e("swx-i18n").localization, l = e("jSkype/utils/chat/mentionsParser"), c = e("jSkype/utils/chat/messageTypes"), h = e("jSkype/utils/chat/parser"), p = e("jSkype/utils/chat/message"), d = e("jSkype/modelHelpers/personHelper"), v = e("jSkype/modelHelpers/personsAndGroupsHelper"), m = e("utils/chat/pesUtils"), g = o.ContactRequestActivityItem, y = o.MojiMessageActivityItem, b = o.PictureMessageActivityItem, w = o.FileTransferActivityItem, E = o.ContactInfoMessageActivityItem, S = o.PluginFreeActivityItem, x = o.PstnActivityItem, T = o.TextMessageActivityItem;
  t.activityFromRawMessage = function (e, t) {
    return e.contactRequestType ? C(e, t) : e.pstnEventType ? _(e) : e.pluginFreeMessageType ? M(e) : N(e, t);
  };
  t.messageForService = function (e) {
    var t = {
      content: e.content,
      messagetype: e.messagetype,
      properties: e.properties,
      contenttype: "text"
    };
    return e.skypeeditedid ? t.skypeeditedid = String(e.skypeeditedid) : t.clientmessageid = String(e.key), t;
  };
  t.outgoingTextMessageActivityItem = function (e, t) {
    e.messagetype = "RichText";
    e.content = D(e.content);
    var n = c.fetch(e.messagetype), i = r.get().personsAndGroupsManager.mePerson, s = new Date(), o;
    return e.isMyself = !0, e.conversationModel = t, e.author = d.getKey(i.id(), i._type()), o = c.parse(n, e), o._id = s.getTime(), o._actualId = o._id, o.key._set(String(s.getTime())), o.timestamp._set(s), o._htmlSetEnabled(!0), o.isRead._set(!0), o.status._set(a.activityStatus.Pending), o._originalContent = "" + (e.originalContent || e.content), o;
  };
  t.outgoingPollMessageActivityItem = function (e) {
    var t = c.fetch(e.messagetype), n = c.parse(t, e);
    return n._id = e.timestamp, n._actualId = e.timestamp, n.isRead._set(!0), n._htmlSetEnabled(!0), n.sender = r.get().personsAndGroupsManager.mePerson, n.direction._set(a.direction.Outgoing), n.status._set(a.activityStatus.Pending), n.key._set(e.key), n.timestamp._set(new Date(e.timestamp)), n;
  };
  t.outgoingMojiActivityItem = function (e, t, n) {
    var o = new y(n.conversationModel), u = "en", f, l;
    return i.isFeatureOn(s.featureFlags.PES_CDN_AUTH_ENABLED) && (e = m.rewriteUrls(e, i.settings.pesCDNAuthentication.rewriteRules)), f = e + "/" + t + "/views/default", l = e + "/" + t + "/views/thumbnail", i.settings.locale && i.settings.locale.pes && (u = i.settings.locale.pes), o._id = n.timestamp, o._actualId = o._id, o._htmlSetEnabled(!0), o._metaDataUri = e + "/views/meta." + u, o.direction._set(a.direction.Outgoing), o.type._set(a.activityType.MojiMessage), o.sender = r.get().personsAndGroupsManager.mePerson, o.thumbnailUrl._set(l), o.mojiUrl._set(f), o.key._set(n.key), o.timestamp._set(new Date(n.timestamp)), o.isRead._set(!0), o.status._set(a.activityStatus.Pending), o.html._set(n.content), o;
  };
  t.processMentions = function (e) {
    var t, r, i = l.getMentions(e);
    return i.forEach(function (i) {
      t = i.substring(1).toLowerCase();
      r = l.getMentionUserData(t);
      r.defaultUserName && (e = e.replace(i, "<at id=\"" + t + "\">" + n.escape(r.defaultUserName) + "</at>"));
    }), e;
  };
  t.outgoingContactInfoActivityItem = function (e, t) {
    var n = new E(t), i = u.getDate();
    return n._htmlSetEnabled(!0), n.sender = r.get().personsAndGroupsManager.mePerson, n.direction._set(a.direction.Outgoing), n.status._set(a.activityStatus.Pending), n.key._set(String(i.getTime())), n.contacts(e), n.timestamp._set(i), n;
  };
  t.outgoingPictureActivityItem = function (e) {
    var t = new b(e);
    return t._htmlSetEnabled(!0), t.sender = r.get().personsAndGroupsManager.mePerson, t.direction._set(a.direction.Outgoing), t.status._set(a.activityStatus.Pending), t.key._set(String(new Date().getTime())), t.timestamp._set(u.getDate()), t;
  };
  t.outgoingFileActivityItem = function (e, t) {
    function i(e) {
      if (!e)
        return "unknown";
      var t = e.split(".");
      return t.length < 2 ? "unknown" : t.pop().toLowerCase();
    }
    var n = new w(t);
    return n._htmlSetEnabled(!0), n.fileName = e.name, n.fileType = i(e.name), n.sender = r.get().personsAndGroupsManager.mePerson, n.direction._set(a.direction.Outgoing), n.status._set(a.activityStatus.Pending), n.key._set(String(new Date().getTime())), n.fileSize = e.size ? e.size : 0, n.timestamp._set(u.getDate()), n;
  };
  t.extendRawMessage = function (e, t) {
    var n = r.get().personsAndGroupsManager.mePerson;
    e.myself = d.getKey(n.id(), n._type());
    e.author = h.parseName(e.from);
    e.isMyself = e.author === e.myself;
    e.originalContent || (e.originalContent = "" + e.content);
    e.conversationModel = t;
  };
});
