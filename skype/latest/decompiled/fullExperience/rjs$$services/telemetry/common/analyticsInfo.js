define("services/telemetry/common/analyticsInfo", [
  "require",
  "cafe/applicationInstance",
  "constants/common",
  "lodash-compat"
], function (e) {
  function o(e) {
    return r.isString(e) && /^19:/.test(e);
  }
  function u() {
    function u(e) {
      return e && e !== s;
    }
    function a(e) {
      return {
        thread1Count: e,
        thread30Count: e,
        conversation1Count: e,
        conversation30Count: e,
        unreadConversationsCount: e
      };
    }
    var e = function (e) {
        var t = new Date();
        return e.setHours(0, 0, 0, 0) === t.setHours(0, 0, 0, 0);
      }, r = function (n, r) {
        var i = n.lastMessage, s = o(n.id);
        return i ? (e(new Date(i.timestamp)) && (s ? r.thread1Count++ : r.conversation1Count++), s ? r.thread30Count++ : r.conversation30Count++, i.isUnread && r.unreadConversationsCount++, r) : r;
      }, i = {};
    return i.conversationsInfo = function () {
      var e, n, i, o = a(0);
      if (t.get().conversationsManager && t.get().conversationsManager._allConversations) {
        i = t.get().conversationsManager._allConversations();
        for (e = 0, n = i.length; e < n; e++)
          o = r(i[e], o);
      } else
        o = a(s);
      return o;
    }, i.contactsInfo = function () {
      return { totalContacts: t.get().personsAndGroupsManager.all.persons().length };
    }, i.getPersonaId = function () {
      var e, t = i.contactsInfo().totalContacts, r = i.conversationsInfo(), s = u(r.thread30Count) || u(r.conversation30Count), o = t === 0;
      return s ? (e = r.thread30Count === 0, e ? n.telemetry.persona.CLASSIC_IM : n.telemetry.persona.POWER_IM) : o ? n.telemetry.persona.NEWBEE : n.telemetry.persona.RETURNING;
    }, i;
  }
  var t = e("cafe/applicationInstance"), n = e("constants/common"), r = e("lodash-compat"), i, s = n.telemetry.NOT_AVAILABLE;
  return u.get = function () {
    return i || (i = new u()), i;
  }, u;
})
