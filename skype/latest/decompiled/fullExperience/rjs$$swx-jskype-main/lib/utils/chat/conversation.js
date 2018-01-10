(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/utils/chat/conversation", [
      "require",
      "exports",
      "lodash-compat",
      "swx-mri",
      "swx-jskype-internal-application-instance",
      "./message",
      "swx-constants"
    ], e);
}(function (e, t) {
  function f(e) {
    function t() {
      return new Date(e.lastMessage.originalarrivaltime).getTime();
    }
    var n = l(e.properties.consumptionhorizon), r = c(e.lastMessage);
    return s.isMessageReadOnServer(n, r, t());
  }
  function l(e) {
    if (!n.isString(e))
      return {};
    var t = e.split(";");
    return {
      lastReadMessageTimestamp: t[0],
      modificationTime: t[1],
      lastReadMessageId: t[2]
    };
  }
  function c(e) {
    return e.clientmessageid || e.skypeeditedid || e.messageid || e.id || 0;
  }
  function h(e, t) {
    var n = e.indexOf(u) !== -1, r = t && t.migrationcompleted && t.migrationcompleted === "true";
    return n && !r;
  }
  function p(e) {
    return r.getTypeFromKey(e) === o.PEOPLE.contactTypes.AGENT;
  }
  function d(e) {
    var t = i.get().personsAndGroupsManager.mePerson;
    return e === r.getKey(t.id(), t._type());
  }
  function v(e) {
    return /^\d:\+/.test(e);
  }
  function m(e) {
    return /^(\+)?\d+$/.test(e);
  }
  function g(e) {
    var t = e.participants.subscribe();
    if (!e.participants.size())
      return t.dispose(), !1;
    for (var n = 0, r = e.participants.size(); n < r; n++) {
      var i = e.participants(n);
      if (!i.audio.endpoint || !m(i.audio.endpoint()))
        return t.dispose(), !1;
    }
    return t.dispose(), !0;
  }
  function y(e) {
    var t = e._metadata && e._metadata.syncState, n = null;
    return t && a.test(t) && (n = t.match(a)[1]), n;
  }
  var n = e("lodash-compat"), r = e("swx-mri"), i = e("swx-jskype-internal-application-instance"), s = e("./message"), o = e("swx-constants"), u = "@p2p.thread.skype", a = /syncState=([^&]+)/;
  t.isConversationReadOnServer = f;
  t.parseConsumptionHorizon = l;
  t.getMessageKey = c;
  t.isPartiallyMigrated = h;
  t.isAgentConversation = p;
  t.isMeConversation = d;
  t.isPstnConversation = v;
  t.isPstnEndpoint = m;
  t.isPstnOnlyConversation = g;
  t.getSyncStateFromResponse = y;
}));
