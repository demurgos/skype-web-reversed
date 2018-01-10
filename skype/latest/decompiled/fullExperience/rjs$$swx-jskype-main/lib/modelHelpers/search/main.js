(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/modelHelpers/search/main", [
      "require",
      "exports",
      "lodash-compat",
      "jcafe-property-model",
      "../../services/agents/instance",
      "../../modelHelpers/contacts/dataMappers/agentToPerson",
      "./match",
      "./sort",
      "../../services/contactSearch/instance",
      "../../models/searchResult",
      "./directoryDataHandler",
      "../../modelHelpers/propertyModelHelper",
      "../personsRegistry/instance",
      "../personsAndGroupsHelper",
      "jskype-constants"
    ], e);
}(function (e, t) {
  function g(e) {
    var t = b(e);
    return t.length > 0 ? c.createResolvedPromise(t) : y(e);
  }
  function y(e) {
    var t = r.task(), n = a.get();
    return n.searchDirectory(e).then(function (e) {
      var n = l.onResult(e);
      t.resolve(n.map(x));
    }, function (e) {
      return t.reject(e);
    }), t.promise;
  }
  function b(e) {
    var t = h.build().get(e);
    return t ? [x(t)] : [];
  }
  function w(e) {
    var t = {};
    for (var n in e.keywords)
      e.keywords.hasOwnProperty(n) && e.supportedKeywords(n) && (t[n] = e.keywords[n]);
    return t;
  }
  function E(e) {
    var t = e.text();
    return n.isString(t) && (S(t).forEach(function (t) {
      return e.keywords[t[0].trim()] = t[1].trim();
    }), e.text(t.replace(m, "").trim())), e;
  }
  function S(e) {
    function n(e) {
      return e.split(":");
    }
    var t = e.match(m);
    return t ? t.map(n) : [];
  }
  function x(e) {
    var t;
    return e.person ? (t = new f["default"](e.person), t.relevance = e.rank, t.matches[e.property] = e.sortString) : t = new f["default"](e), t;
  }
  function T(e) {
    switch (e.result._authorization()) {
    case v.AUTHORIZED:
    case v.PENDING_OUTGOING:
    case v.SUGGESTED:
      return !0;
    default:
      return !1;
    }
  }
  function N() {
    return i.get().search().then(function (e) {
      return e.response.agentDescriptions.map(function (e) {
        var t = p.getPersonById(e.agentId);
        return t || (t = p.createDefaultPerson(e.agentId)), new f["default"](s.map(e, t));
      });
    });
  }
  function C(e, n) {
    var i = r.task();
    return t.addressBook(e, n).then(function (e) {
      e.length === 0 ? t.skypeDirectory(n).then(function (e) {
        i.resolve(e);
      }) : i.resolve(e);
    }), i.promise;
  }
  var n = e("lodash-compat"), r = e("jcafe-property-model"), i = e("../../services/agents/instance"), s = e("../../modelHelpers/contacts/dataMappers/agentToPerson"), o = e("./match"), u = e("./sort"), a = e("../../services/contactSearch/instance"), f = e("../../models/searchResult"), l = e("./directoryDataHandler"), c = e("../../modelHelpers/propertyModelHelper"), h = e("../personsRegistry/instance"), p = e("../personsAndGroupsHelper"), d = e("jskype-constants"), v = d.PEOPLE.authorizationStates, m = /((?!live)\b\S+:\S+){1,}/gi;
  t.agents = N;
  t.addressBook = function (e, t) {
    if (!t)
      return c.createResolvedPromise([]);
    var i = r.task(), s = w(E(t)), a = t.text(), f = [], l = [];
    if (s.id) {
      var h = e(s.id);
      h && (l.push(o.getMatch(o.idRule, h.id(), s.id, h)), f.push(h));
    } else if (s.phoneNumber)
      for (var p = 0, d = e(); p < d.length; p++) {
        var v = d[p];
        for (var m = 0, g = v.phoneNumbers(); m < g.length; m++) {
          var y = g[m];
          y.displayString() === s.phoneNumber && l.push(o.getMatch(o.phoneNumberRule, y.displayString(), s.phoneNumber, v));
        }
      }
    else
      f = e();
    return n.isString(a) && a.length && (l = [], f.forEach(function (e) {
      var t = o.get(e, a);
      t && l.push(t);
    })), i.resolve(u.run(l).map(x).filter(T)), i.promise;
  };
  t.skypeDirectory = function (e) {
    if (!e)
      return c.createResolvedPromise([]);
    var t = w(E(e)), n = e.text();
    return !t.id && !n ? c.createResolvedPromise([]) : t.id ? g(t.id) : y(n);
  };
  t.all = C;
}));
