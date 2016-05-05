define("jSkype/modelHelpers/personsAndGroupsHelper", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "browser/window",
  "swx-enums",
  "jSkype/client",
  "jcafe-property-model",
  "jSkype/models/person",
  "jSkype/models/phoneNumber",
  "jSkype/modelHelpers/personsRegistry/instance",
  "jSkype/constants/people",
  "jSkype/modelHelpers/contacts/authorizationChange",
  "jSkype/modelHelpers/personHelper",
  "jSkype/modelHelpers/contacts/dataMappers/dataMaps"
], function (e, t) {
  function d(e, n) {
    var r = f.build(), i = r.get(e);
    return i || (i = new u(e), i._authorization._set(r.defaultPersonAuthorization), y(i, n), i.status._set(t.getDefaultPresence(i, i._authorization())), b(i), r.add(i)), i;
  }
  function v(e, t) {
    for (var n in e)
      e.hasOwnProperty(n) && o.isProperty(e[n]) && e[n]._set(t[n]);
    return e;
  }
  function m(e, t) {
    var r = e.phoneNumbers(0);
    n.forEach(t, function (t) {
      if (r && r.telUri() === t.telUri)
        v(r, t);
      else {
        var n = new a();
        v(n, t), e.phoneNumbers.add(n, t.telUri);
      }
    });
  }
  function g(e) {
    function r(e, t, r) {
      var i = o.isProperty(t), s = !i && o.isCollection(t), u = i || s ? t() : t;
      i && !n.isUndefined(u) ? r[e] = u : s && (r[e] = u.reduce(function (e, t) {
        return e.concat(g(t));
      }, []));
    }
    var t = {};
    return n.forIn(e, function (e, n) {
      r(n, e, t);
    }), t;
  }
  function y(e, t) {
    e._type._set(t), t === p.contactTypes[p.contactTypeNames.agent] && e.isAgent._set(!0);
  }
  function b(e) {
    (h.isPstn(e) || h.isEchoContact(e)) && e.capabilities.video._set(!1), h.isPstn(e) && e.capabilities.chat._set(!1);
  }
  var n = e("lodash-compat"), r = e("browser/window"), i = e("swx-enums"), s = e("jSkype/client"), o = e("jcafe-property-model"), u = e("jSkype/models/person"), a = e("jSkype/models/phoneNumber"), f = e("jSkype/modelHelpers/personsRegistry/instance"), l = e("jSkype/constants/people").authorizationStates, c = e("jSkype/modelHelpers/contacts/authorizationChange"), h = e("jSkype/modelHelpers/personHelper"), p = e("jSkype/modelHelpers/contacts/dataMappers/dataMaps");
  t.getPersonById = function (e) {
    var t = f.build();
    return t.get(e);
  }, t.isMePerson = function (e) {
    var t = s.get().personsAndGroupsManager.mePerson, n = h.getId(e);
    return t.id() === n || t._msaId && h.getId(t._msaId()) === n;
  }, t.isKnownPerson = function (e) {
    return !!e && !!s.get().personsAndGroupsManager.all.persons(e.id());
  }, t.createDefaultPerson = function (e) {
    var t = new u(e);
    return t._authorization._set(l.UNAUTHORIZED), t;
  }, t.createPersonFromRawData = function (e) {
    var n = v(t.getPerson(e.id, e._type), e);
    return v(n.note, e.note), v(n.location, e.location), v(n.capabilities, e.capabilities), v(n.agentDetails, e.agentDetails), m(n, e.phoneNumbers), c.updateGroups(n), n;
  }, t.createRawDataFromPerson = function (e) {
    var t = g(e);
    return t.note = g(e.note), t.location = g(e.location), t.capabilities = g(e.capabilities), t.agentDetails = g(e.agentDetails), t;
  }, t.getUnknownPerson = function (e) {
    var n, r = t.getPersonById(e);
    return !t.isMePerson(e) && !t.isKnownPerson(r) && (n = r || t.createDefaultPerson(e)), n;
  }, t.getBlockedGroup = function () {
    var e = s.get().personsAndGroupsManager.all;
    return e.groups().filter(function (e) {
      return e.relationshipLevel() === i.groupPrivacyRelationshipLevel.Blocked;
    })[0];
  }, t.getPerson = function (e, n) {
    return t.isMePerson(e) ? s.get().personsAndGroupsManager.mePerson : d(e, n);
  }, t.getPersonByConversationId = function (e) {
    var t = h.getId(e), n = h.getTypeFromKey(e);
    return d(t, n);
  }, t.extractSkypeIdFromToken = function (e) {
    return JSON.parse(r.atob(e.split(".")[1])).skypeid;
  }, t.extractCIDFromToken = function (e) {
    return JSON.parse(r.atob(e.split(".")[1])).cid;
  }, t.getDefaultPresence = function (e, t) {
    if (t === l.AUTHORIZED && (e.isAgent() || h.isEchoContact(e)))
      return i.onlineStatus.Online;
    if (t === l.PENDING_INCOMING)
      return i.onlineStatus.Unknown;
    if (t === l.AUTHORIZED && !h.isPstn(e))
      return i.onlineStatus.Offline;
  };
})
