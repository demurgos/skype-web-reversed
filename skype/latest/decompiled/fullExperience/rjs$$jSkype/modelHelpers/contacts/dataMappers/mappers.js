define("jSkype/modelHelpers/contacts/dataMappers/mappers", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "jSkype/modelHelpers/contacts/dataMappers/dataMaps",
  "utils/people/userDataProcessor",
  "jSkype/models/phoneNumber",
  "utils/chat/dateTime",
  "constants/common"
], function (e, t) {
  function a(e, t, n) {
    e._set(n ? n(t) : t);
  }
  function f(e, t) {
    var n = r.phoneTypes[t.type], o = l(e, t);
    return o || (o = new s(), a(o.telUri, t.number, i.sanitize), e.add(o, o.telUri())), o.type._set(n), a(o.displayString, t.number, i.sanitize), e;
  }
  function l(e, t) {
    return n.find(e(), function (e) {
      return e.telUri() === t.number;
    });
  }
  function c(e) {
    var t = "cacheHeaders=1", n = new RegExp(t, "i");
    return e.match(n) || (e += (e.split("?").length > 1 ? "&" : "?") + t), e;
  }
  function h(e) {
    var t = /^http:\/\//.test(e);
    return t ? e.replace("http://", "https://") : e;
  }
  function p(e) {
    return e.toUpperCase();
  }
  var n = e("lodash-compat"), r = e("jSkype/modelHelpers/contacts/dataMappers/dataMaps"), i = e("utils/people/userDataProcessor"), s = e("jSkype/models/phoneNumber"), o = e("utils/chat/dateTime"), u = e("constants/common");
  t.mapId = function (e, t) {
    e && a(t.id, e, i.sanitizeXml);
  };
  t.mapAvatarUrl = function (e, t) {
    if (e) {
      var r = n.compose(h, c);
      a(t.avatarUrl, e, r);
    }
  };
  t.mapDisplayName = function (e, t) {
    e && a(t.displayName, e, i.sanitizeXml);
  };
  t.mapDisplayNameFallback = function (e, t, n) {
    e && t ? a(n.displayName, e + " " + t, i.sanitizeXml) : e ? a(n.displayName, e, i.sanitizeXml) : t && a(n.displayName, t, i.sanitizeXml);
  };
  t.mapFirstName = function (e, t) {
    e && a(t.firstName, e, i.sanitizeXml);
  };
  t.mapLastName = function (e, t) {
    e && a(t.lastName, e, i.sanitizeXml);
  };
  t.mapCity = function (e, t) {
    e && a(t.location.city, e, i.sanitize);
  };
  t.mapState = function (e, t) {
    e && a(t.location.state, e, i.sanitize);
  };
  t.mapCountry = function (e, t) {
    if (e) {
      var r = n.compose(p, i.sanitize);
      a(t.location.country, e, r);
    }
  };
  t.mapActivity = function (e, t) {
    e && a(t.activity, e, i.sanitize);
  };
  t.mapPhoneNumbers = function (e, t) {
    function i(e, t) {
      return n.some(t, function (t) {
        return e.telUri() === t.number;
      });
    }
    if (e && !!e.length) {
      var r = [];
      n.forEach(e, function (n) {
        f(t.phoneNumbers, n);
      });
      n.forEach(t.phoneNumbers(), function (s) {
        !i(s, e) && s.telUri() !== t.id() && r.push(s);
      });
      n.forEach(r, function (n) {
        t.phoneNumbers.remove(n.telUri());
      });
    }
  };
  t.mapType = function (e, t) {
    e && (a(t._type, r.contactTypes[e]), e === r.contactTypeNames.agent && a(t.isAgent, !0));
  };
  t.mapCapabilities = function (e, t) {
    function r(r, i) {
      var s = n.includes(e, r), o = t.capabilities[i];
      o && a(o, s);
    }
    /cortana/.test(t.id()) && e.push("im.receive");
    n.forOwn(u.capabilities, r);
  };
  t.mapRegistrationDate = function (e, t) {
    e && a(t._registeredAt, o.getDate(parseInt(e, 10)));
  };
  t.mapAgentAuthor = function (e, t) {
    e && a(t.agentDetails.author, e, i.sanitizeXml);
  };
  t.mapAgentDescription = function (e, t) {
    e && a(t.agentDetails.description, e, i.sanitizeXml);
  };
  t.mapAgentWebsite = function (e, t) {
    e && a(t.agentDetails.website, e, i.sanitizeXml);
  };
  t.mapAgentPrivacyStatement = function (e, t) {
    e && a(t.agentDetails.privacyStatement, e, i.sanitizeXml);
  };
  t.mapAgentTermsOfService = function (e, t) {
    e && a(t.agentDetails.termsOfService, e, i.sanitizeXml);
  };
  t.mapAgentExtraInfo = function (e, t) {
    e && a(t.agentDetails.extraInfo, e, i.sanitizeXml);
  };
});
