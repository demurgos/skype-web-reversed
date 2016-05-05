define("jSkype/utils/chat/conversation", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "jSkype/modelHelpers/personHelper",
  "jSkype/client",
  "jSkype/utils/chat/message",
  "constants/people"
], function (e, t) {
  var n = e("lodash-compat"), r = e("jSkype/modelHelpers/personHelper"), i = e("jSkype/client"), s = e("jSkype/utils/chat/message"), o = e("constants/people"), u = "@p2p.thread.skype", a = /syncState=([^&]+)/;
  t.isConversationReadOnServer = function (e) {
    var t = this.parseConsumptionHorizon(e.properties.consumptionhorizon), n = this.getMessageKey(e.lastMessage);
    return s.isMessageReadOnServer(t, n, e.lastMessage.id);
  }, t.parseConsumptionHorizon = function (e) {
    if (!n.isString(e))
      return {};
    var t = e.split(";");
    return {
      lastReadMessageTimestamp: t[0],
      modificationTime: t[1],
      lastReadMessageId: t[2]
    };
  }, t.getMessageKey = function (e) {
    return e.clientmessageid || e.skypeeditedid || e.messageid || e.id || 0;
  }, t.isPartiallyMigrated = function (e, t) {
    var n = e.indexOf(u) !== -1, r = t && t.migrationcompleted && t.migrationcompleted === "true";
    return n && !r;
  }, t.isAgentConversation = function (e) {
    return r.getTypeFromKey(e) === o.contactTypes.AGENT;
  }, t.isMeConversation = function (e) {
    var t = i.get().personsAndGroupsManager.mePerson;
    return e === r.getKey(t.id(), t._type());
  }, t.isPstnConversation = function (e) {
    return /^\d:\+/.test(e);
  }, t.isPstnEndpoint = function (e) {
    return /^(\+)?\d+$/.test(e);
  }, t.isPstnOnlyConversation = function (e) {
    var n = e.participants.subscribe();
    if (!e.participants.size())
      return n.dispose(), !1;
    for (var r = 0, i = e.participants.size(); r < i; r++) {
      var s = e.participants(r);
      if (!s.audio.endpoint || !t.isPstnEndpoint(s.audio.endpoint()))
        return n.dispose(), !1;
    }
    return n.dispose(), !0;
  }, t.getSyncStateFromResponse = function (e) {
    var t = e._metadata && e._metadata.syncState, n = null;
    return t && a.test(t) && (n = t.match(a)[1]), n;
  };
})
