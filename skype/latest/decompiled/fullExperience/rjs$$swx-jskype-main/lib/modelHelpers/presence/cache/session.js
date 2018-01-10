(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/modelHelpers/presence/cache/session", [
      "require",
      "exports",
      "lodash-compat",
      "swx-jskype-internal-application-instance",
      "swx-utils-common",
      "../../personsAndGroupsHelper",
      "../../../modelHelpers/contacts/presenceHelper",
      "jcafe-property-model",
      "swx-mri",
      "jskype-constants/lib/data",
      "jskype-constants/lib/people"
    ], e);
}(function (e, t) {
  function p() {
    var e = r.get().personsAndGroupsManager.mePerson, t = w(), n = x(t);
    return E(n, e), S(n, e), t;
  }
  function d(e) {
    var t = w(), n = delete t[e];
    return i.sessionStorage.set(h, JSON.stringify(t)), n;
  }
  function v() {
    i.sessionStorage.remove(h);
  }
  function m() {
    i.sessionStorage.set(h, "{}");
  }
  function g(e, t, n, r, i) {
    e[t] = {
      status: n,
      lastSeenAt: r,
      endpointType: i
    };
  }
  function y(e, t, n, r, i) {
    e[t].endpointType = i || e[t].endpointType;
    e[t].lastSeenAt = r || e[t].lastSeenAt;
    e[t].status = n || e[t].status;
  }
  function b(e) {
    return function (t, n) {
      var r = !!n && !!(n.status || n.lastSeenAt || n.endpointType);
      r && e.call(null, t, n);
    };
  }
  function w() {
    var e = i.sessionStorage.get(h);
    return e ? JSON.parse(e) : (m(), {});
  }
  function E(e, t) {
    var n = e[t.id()];
    n && n.status && t.status(n.status, u.property.sUpdated);
  }
  function S(e, t) {
    n.forIn(n.omit(e, [
      t.id(),
      c
    ]), function (e, t) {
      var n = s.getPerson(a.getId(t));
      if (e.status) {
        var r = o.getDefaultPresence(n);
        n.status._set(r ? r : e.status);
      }
      e.lastSeenAt && n.lastSeenAt(e.lastSeenAt);
      e.endpointType && n.endpointType._set(e.endpointType);
    });
  }
  function x(e) {
    function r(t, n) {
      return t[n] = { status: e[n] }, t;
    }
    if (!n.isEmpty(e) && T(e)) {
      var t = Object.keys(e).reduce(r, {});
      i.sessionStorage.set(h, JSON.stringify(t));
      e = t;
    }
    return e;
  }
  function T(e) {
    return Object.keys(e).every(function (t) {
      return n.isString(e[t]);
    });
  }
  var n = e("lodash-compat"), r = e("swx-jskype-internal-application-instance"), i = e("swx-utils-common"), s = e("../../personsAndGroupsHelper"), o = e("../../../modelHelpers/contacts/presenceHelper"), u = e("jcafe-property-model"), a = e("swx-mri"), f = e("jskype-constants/lib/data"), l = e("jskype-constants/lib/people"), c = l["default"].SELF, h = f["default"].storageKeys.PRESENCE_DATA;
  t.restore = p;
  t.set = b(function (e, t) {
    var n = w(), r = t.status, s = t.lastSeenAt, o = t.endpointType;
    n[e] ? y(n, e, r, s, o) : g(n, e, r, s, o);
    i.sessionStorage.set(h, JSON.stringify(n));
  });
  t.remove = d;
  t.destroy = v;
}));
