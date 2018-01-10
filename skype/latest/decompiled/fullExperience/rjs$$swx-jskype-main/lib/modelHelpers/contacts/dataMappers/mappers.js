(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/modelHelpers/contacts/dataMappers/mappers", [
      "require",
      "exports",
      "lodash-compat",
      "swx-mri/lib/mriMaps",
      "swx-utils-people",
      "../../personHelper",
      "../../../models/phoneNumber",
      "swx-utils-chat",
      "swx-utils-common",
      "swx-constants",
      "swx-enums"
    ], e);
}(function (e, t) {
  function h(e, t) {
    e && P(t.id, e, i.userDataProcessor.sanitizeXml);
  }
  function p(e, t) {
    if (e) {
      var n = U(e);
      e = s.getAvatarUri(t.id(), n);
      P(t.avatarUrl, e);
    }
  }
  function d(e, t) {
    e && P(t.displayName, e, i.userDataProcessor.sanitizeXml);
  }
  function v(e, t) {
    var n = /(\d{4})-(\d{2})-(\d{2})/, r = n.exec(e);
    if (e && t._birthday && r && r.length === 4) {
      var i = parseInt(r[1], 10), s = parseInt(r[2], 10) - 1, o = parseInt(r[3], 10);
      P(t._birthday, new Date(i, s, o).getTime());
    }
  }
  function m(e, t, n) {
    e && t ? P(n.displayName, e + " " + t, i.userDataProcessor.sanitizeXml) : e ? P(n.displayName, e, i.userDataProcessor.sanitizeXml) : t && P(n.displayName, t, i.userDataProcessor.sanitizeXml);
  }
  function g(e, t) {
    e && P(t.firstName, e, i.userDataProcessor.sanitizeXml);
  }
  function y(e, t) {
    e && P(t.lastName, e, i.userDataProcessor.sanitizeXml);
  }
  function b(e, t) {
    e && P(t.title, e, i.userDataProcessor.sanitizeXml);
  }
  function w(e, t) {
    e && P(t.location.city, e, i.userDataProcessor.sanitize);
  }
  function E(e, t) {
    e && P(t.location.state, e, i.userDataProcessor.sanitize);
  }
  function S(e, t) {
    if (e) {
      var r = n.flowRight(R, i.userDataProcessor.sanitize);
      P(t.location.country, e, r);
    }
  }
  function x(e, t) {
    e && P(t.activity, e, i.userDataProcessor.sanitize);
  }
  function T(e, t, n) {
    e && !!e.length && H(e, t, n);
    var r = j(e || [], t, n);
    F(t, r);
  }
  function N(e, t) {
    e && (P(t._type, r.contactTypes[e]), e === r.contactTypeNames.agent && P(t.isAgent, !0));
  }
  function C(e, t) {
    function r(r, i) {
      var s = n.includes(e, r), o = t.capabilities[i];
      o && P(o, s);
    }
    n.forOwn(f.COMMON.capabilities, r);
  }
  function k(e, t) {
    e && P(t.registeredAt, u.dateTime.getDate(parseInt(e, 10)));
  }
  function L(e, t) {
    e && P(t.agentDetails.author, e, i.userDataProcessor.sanitizeXml);
  }
  function A(e, t) {
    e && P(t.agentDetails.description, e, i.userDataProcessor.sanitizeXml);
  }
  function O(e, t) {
    e && P(t.agentDetails.website, e, i.userDataProcessor.sanitizeXml);
  }
  function M(e, t) {
    e && P(t.agentDetails.privacyStatement, e, i.userDataProcessor.sanitizeXml);
  }
  function _(e, t) {
    e && P(t.agentDetails.termsOfService, e, i.userDataProcessor.sanitizeXml);
  }
  function D(e, t) {
    e && P(t.agentDetails.extraInfo, e, i.userDataProcessor.sanitizeXml);
  }
  function P(e, t, n) {
    e._set(n ? n(t) : t);
  }
  function H(e, r, i) {
    n.forEach(e, function (n) {
      var s = t.phoneTypes[n.type];
      B(r.phoneNumbers, s, n.number, i);
    });
  }
  function B(e, t, n, r) {
    var s = q(e, n);
    return s || (s = new o["default"](), P(s.telUri, n, i.userDataProcessor.sanitize), P(s.fromProfile, r), e.add(s, s.telUri())), s.type._set(t), P(s.displayString, n, i.userDataProcessor.sanitize), e;
  }
  function j(e, t, r) {
    var i = [];
    return n.forEach(t.phoneNumbers(), function (s) {
      !I(s, e) && s.telUri() !== t.id() && s.fromProfile() === r && i.push(s);
    }), i;
  }
  function F(e, t) {
    n.forEach(t, function (n) {
      e.phoneNumbers.remove(n.telUri());
    });
  }
  function I(e, t) {
    return n.some(t, function (t) {
      return e.telUri() === t.number;
    });
  }
  function q(e, t) {
    return n.find(e(), function (e) {
      return e.telUri() === t;
    });
  }
  function R(e) {
    return e.toUpperCase();
  }
  function U(e) {
    return a.url.getQueryParameterValueByName(e, "auth_key");
  }
  var n = e("lodash-compat"), r = e("swx-mri/lib/mriMaps"), i = e("swx-utils-people"), s = e("../../personHelper"), o = e("../../../models/phoneNumber"), u = e("swx-utils-chat"), a = e("swx-utils-common"), f = e("swx-constants"), l = e("swx-enums"), c;
  (function (e) {
    e.home = "home";
    e.office = "office";
    e.mobile = "mobile";
    e.other = "other";
  }(c = t.phoneTypeKeys || (t.phoneTypeKeys = {})));
  t.phoneTypes = {};
  t.phoneTypes[c.home] = l.phoneType.Home;
  t.phoneTypes[c.office] = l.phoneType.Work;
  t.phoneTypes[c.mobile] = l.phoneType.Cell;
  t.phoneTypes[c.other] = l.phoneType.Other;
  t.mapId = h;
  t.mapAvatarUrl = p;
  t.mapDisplayName = d;
  t.mapBirthday = v;
  t.mapDisplayNameFallback = m;
  t.mapFirstName = g;
  t.mapLastName = y;
  t.mapTitle = b;
  t.mapCity = w;
  t.mapState = E;
  t.mapCountry = S;
  t.mapActivity = x;
  t.mapPhoneNumbers = T;
  t.mapType = N;
  t.mapCapabilities = C;
  t.mapRegistrationDate = k;
  t.mapAgentAuthor = L;
  t.mapAgentDescription = A;
  t.mapAgentWebsite = O;
  t.mapAgentPrivacyStatement = M;
  t.mapAgentTermsOfService = _;
  t.mapAgentExtraInfo = D;
}));
