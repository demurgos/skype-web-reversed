define("jSkype/modelHelpers/presence/cache/session", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "jSkype/client",
  "jSkype/constants/people",
  "swx-utils-common",
  "jSkype/constants/data",
  "jSkype/modelHelpers/personsAndGroupsHelper",
  "jSkype/modelHelpers/personHelper",
  "jcafe-property-model"
], function (e, t) {
  function l() {
    s.set(o, "{}");
  }
  function c(e, t, n, r, i) {
    e[t] = {
      status: n,
      lastSeenAt: r,
      endpointType: i
    };
  }
  function h(e, t, n, r, i) {
    e[t].endpointType = i || e[t].endpointType, e[t].lastSeenAt = r || e[t].lastSeenAt, e[t].status = n || e[t].status;
  }
  function p(e) {
    return function (n, r) {
      var i = !!r && !!(r.status || r.lastSeenAt || r.endpointType);
      i && e.call(t, n, r);
    };
  }
  function d() {
    var e = s.get(o);
    return e ? JSON.parse(e) : (l(), {});
  }
  function v(e, t) {
    var n = e[t.id()];
    n && n.status && t.status(n.status, f.property.sUpdated);
  }
  function m(e, t) {
    n.forIn(n.omit(e, [
      t.id(),
      i
    ]), function (e, t) {
      var n = u.getPerson(a.getId(t));
      if (e.status) {
        var r = u.getDefaultPresence(n);
        n.status._set(r ? r : e.status);
      }
      e.lastSeenAt && n.lastSeenAt(e.lastSeenAt), e.endpointType && n.endpointType._set(e.endpointType);
    });
  }
  function g(e) {
    function r(t, n) {
      return t[n] = { status: e[n] }, t;
    }
    if (!n.isEmpty(e) && y(e)) {
      var t = Object.keys(e).reduce(r, {});
      s.set(o, JSON.stringify(t)), e = t;
    }
    return e;
  }
  function y(e) {
    return Object.keys(e).every(function (t) {
      return n.isString(e[t]);
    });
  }
  var n = e("lodash-compat"), r = e("jSkype/client"), i = e("jSkype/constants/people").SELF, s = e("swx-utils-common").sessionStorage, o = e("jSkype/constants/data").storageKeys.PRESENCE_DATA, u = e("jSkype/modelHelpers/personsAndGroupsHelper"), a = e("jSkype/modelHelpers/personHelper"), f = e("jcafe-property-model");
  t.restore = function () {
    var e = r.get().personsAndGroupsManager.mePerson, t = d(), n = g(t, e.id());
    return v(n, e), m(n, e), t;
  }, t.set = p(function (e, t) {
    var n = d(), r = t.status, i = t.lastSeenAt, u = t.endpointType;
    n[e] ? h(n, e, r, i, u) : c(n, e, r, i, u), s.set(o, JSON.stringify(n));
  }), t.remove = function (e) {
    var t = d(), n = delete t[e];
    return s.set(o, JSON.stringify(t)), n;
  }, t.destroy = function () {
    s.remove(o);
  };
})
