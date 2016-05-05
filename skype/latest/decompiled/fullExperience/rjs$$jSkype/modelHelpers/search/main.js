define("jSkype/modelHelpers/search/main", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "jSkype/client",
  "jcafe-property-model",
  "constants/common",
  "jSkype/settings",
  "swx-agentProvisioningService",
  "jSkype/modelHelpers/contacts/dataMappers/agentToPerson",
  "jSkype/modelHelpers/search/match",
  "jSkype/modelHelpers/search/sort",
  "jSkype/services/serviceFactory",
  "jSkype/models/searchResult",
  "jSkype/constants/people",
  "jSkype/modelHelpers/search/directoryDataHandler",
  "jSkype/modelHelpers/search/directorySearchByIdDataHandler",
  "jSkype/modelHelpers/propertyModelHelper",
  "jSkype/modelHelpers/personsRegistry/instance",
  "jSkype/modelHelpers/personsAndGroupsHelper"
], function (e, t) {
  function w(e) {
    var t = g.build().get(e);
    return t ? [T(t)] : [];
  }
  function E(e) {
    var t = {};
    for (var n in e.keywords)
      e.keywords.hasOwnProperty(n) && e.supportedKeywords(n) && (t[n] = e.keywords[n]);
    return t;
  }
  function S(e) {
    var t = e.text();
    return n.isString(t) && (x(t).forEach(function (t) {
      e.keywords[t[0].trim()] = t[1].trim();
    }), e.text(t.replace(b, "").trim())), e;
  }
  function x(e) {
    function n(e) {
      return e.split(":");
    }
    var t = e.match(b);
    return t ? t.map(n) : [];
  }
  function T(e) {
    var t;
    return e.person ? (t = new h(e.person), t.relevance = e.rank, t.matches[e.property] = e.sortString) : t = new h(e), t;
  }
  function N(e) {
    switch (e.result._authorization()) {
    case p.AUTHORIZED:
    case p.PENDING_OUTGOING:
    case p.SUGGESTED:
      return !0;
    default:
      return !1;
    }
  }
  var n = e("lodash-compat"), r = e("jSkype/client"), i = e("jcafe-property-model"), s = e("constants/common"), o = e("jSkype/settings"), u = e("swx-agentProvisioningService"), a = e("jSkype/modelHelpers/contacts/dataMappers/agentToPerson"), f = e("jSkype/modelHelpers/search/match"), l = e("jSkype/modelHelpers/search/sort"), c = e("jSkype/services/serviceFactory"), h = e("jSkype/models/searchResult"), p = e("jSkype/constants/people").authorizationStates, d = e("jSkype/modelHelpers/search/directoryDataHandler"), v = e("jSkype/modelHelpers/search/directorySearchByIdDataHandler"), m = e("jSkype/modelHelpers/propertyModelHelper"), g = e("jSkype/modelHelpers/personsRegistry/instance"), y = e("jSkype/modelHelpers/personsAndGroupsHelper"), b = /\s*(\w+:[\w\.\_\-\+]+)/gi;
  t.agents = function () {
    var e = r.get().signInManager._skypeToken, t = u.build(e, o.settings.agentProvisioningService);
    return t.search().then(function (e) {
      return e.agentDescriptions.map(function (e) {
        var t = y.getPersonById(e.agentId);
        return t || (t = y.createDefaultPerson(e.agentId)), new h(a.map(e, t));
      });
    }).catch(function (e) {
      throw r.get()._telemetryManager.sendEvent(o.settings.telemetry.jSkypeTenantToken, "ServiceFault", {
        serviceName: "agents-search",
        faultCode: e.status,
        faultContext: s.telemetry.NOT_AVAILABLE,
        errorCode: e.status || s.telemetry.NOT_AVAILABLE,
        errorMessage: e.responseText || s.telemetry.NOT_AVAILABLE,
        verb: "GET",
        host: o.settings.agentProvisioningService.host
      }), e;
    });
  }, t.addressBook = function (e, t) {
    var r, s, o, u, a;
    if (!t)
      return m.createResolvedPromise([]);
    r = i.task(), u = [], a = [], o = E(S(t)), s = t.text();
    if (o.id) {
      var c = e(o.id);
      c && (u.push(f.getMatch(f.idRule, c.id(), o.id, c)), a.push(c));
    } else
      o.phoneNumber ? n.forEach(e(), function (e) {
        n.forEach(e.phoneNumbers(), function (t) {
          t.displayString() === o.phoneNumber && (u.push(f.getMatch(f.phoneNumberRule, t.displayString(), o.phoneNumber, e)), a.push(c));
        });
      }) : a = e();
    return n.isString(s) && s.length && (u = [], a.forEach(function (e) {
      var t = f.get(e, s);
      t && u.push(t);
    })), r.resolve(l.run(u).map(T).filter(N)), r.promise;
  }, t.skypeDirectory = function (e) {
    var t, n, r, s;
    if (!e)
      return m.createResolvedPromise([]);
    r = i.task(), s = c.getStratusService(), t = E(S(e)), n = e.text();
    if (!t.id && !n)
      return r.resolve([]), r.promise;
    if (t.id) {
      var o = w(t.id);
      o.length > 0 ? r.resolve(o) : s.searchDirectoryById(t.id).then(function (t) {
        var n = v.onResult(t);
        r.resolve(n.map(T));
      }, function (t) {
        r.reject(t);
      });
    } else
      s.searchDirectory(n).then(function (t) {
        var n = d.onResult(t);
        r.resolve(n.map(T));
      }, function (t) {
        r.reject(t);
      });
    return r.promise;
  }, t.all = function (e, n) {
    var r = i.task();
    return t.addressBook(e, n).then(function (e) {
      e.length === 0 ? t.skypeDirectory(n).then(function (e) {
        r.resolve(e);
      }) : r.resolve(e);
    }), r.promise;
  };
})
