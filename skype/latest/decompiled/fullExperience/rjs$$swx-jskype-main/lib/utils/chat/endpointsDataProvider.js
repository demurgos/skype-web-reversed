(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/utils/chat/endpointsDataProvider", [
      "require",
      "exports",
      "swx-jskype-internal-application-instance",
      "swx-constants",
      "lodash-compat",
      "swx-mri",
      "swx-utils-common",
      "jskype-constants",
      "jskype-settings-instance"
    ], e);
}(function (e, t) {
  function g(e) {
    N();
    var t = a.settings.webApiService.activeEndpointsFetch, n = t && t.delay || 60;
    v = i.throttle(function () {
      m = new Promise(function (t, n) {
        e().then(function (e) {
          if (!h)
            return t(!1);
          if (!e.response || !Array.isArray(e.response))
            return t(S());
          var n = e.response.filter(function (e) {
            return e.isActive;
          });
          if (n.length > 1)
            return t(!1);
          t(C(n[0].id, o.sessionStorage.get(l.ENDPOINT_ID)));
        }, function (e) {
          t(S());
        });
      });
    }, n * 1000, { trailing: !1 });
  }
  function y(e) {
    c = P(e);
    L(o.sessionStorage.get(l.ENDPOINT_ID));
  }
  function b() {
    return c;
  }
  function w() {
    d = !0;
  }
  function E(e) {
    if (!k(e.selfLink))
      return !1;
    var t = O(e);
    if (!t)
      return !1;
    d && (L(M(e.selfLink)), d = !1);
    var r = n.get()._telemetry.context.activeEndpoints, s = i.find(r, function (e) {
        return e === t;
      });
    return s ? !1 : (r.push(t), c = {
      count: r.length,
      endpoints: A(r),
      nameVersions: c.nameVersions,
      versions: c.versions
    }, !0);
  }
  function S() {
    return h;
  }
  function x(e) {
    if (h === !!e)
      return;
    h = !!e;
  }
  function T() {
    return h ? (v(), m) : Promise.resolve(!1);
  }
  function N() {
    n.get()._context = n.get()._context || {};
    n.get()._context.isMyEndpointActive = S;
    n.get()._context.isTheOnlyActiveEndpoint = T;
  }
  function C(e, t) {
    return e.length < t.length ? "{" + e + "}" === t : e.length > t.length ? "{" + t + "}" === e : e === t;
  }
  function k(e) {
    if (!/v1\/users\/(.*)\/endpoints.*/.test(e))
      return !1;
    var t = /v1\/users\/(.*)\/endpoints.*/.exec(e), r = t && t[1];
    if (!r)
      return !1;
    var i = s.getId(r);
    return i === n.get().personsAndGroupsManager.mePerson.id() || r === n.get().personsAndGroupsManager.mePerson._msaId();
  }
  function L(e) {
    p = e;
  }
  function A(e) {
    return e = i.uniq(e), e.join(",") || r.COMMON.telemetry.NOT_AVAILABLE;
  }
  function O(e) {
    var t = _(e.publicInfo);
    if (!t)
      return null;
    switch (t) {
    case "0":
      t += " - Delphi";
      break;
    case "908":
      t += " - Web";
      break;
    case "15":
      t += " - Win10 Client";
      break;
    case "20703":
      t += " - Android";
      break;
    case "10021":
      t += " - IPhone";
      break;
    case "1410":
      t += " - Win Phone 8.1";
      break;
    case "10043":
      t += " - IPAD";
      break;
    case "1421":
      t += " - Win10 Client for mobile";
    }
    return t;
  }
  function M(e) {
    var t = /{(.*)}/.exec(e);
    return t ? t[0] : null;
  }
  function _(e) {
    var t = /^\d+/.exec(e.skypeNameVersion) || /^\d+/.exec(e.version);
    return t ? t[0] : null;
  }
  function D() {
    var e = i.find(n.get()._telemetry.context.activeEndpoints, function (e) {
      e !== f;
    });
    return e === null;
  }
  function P(e) {
    var t = [], r = [], i = [], s = !1;
    return e.forEach(function (e) {
      var n = O(e);
      if (!n) {
        e.publicInfo.skypeNameVersion && r.push(e.publicInfo.skypeNameVersion);
        e.publicInfo.version && i.push(e.publicInfo.version);
        return;
      }
      s = s || n === f;
      t.push(n);
    }), s || t.push(f), n.get()._telemetry.context.activeEndpoints = t, {
      count: t.length,
      endpoints: A(t),
      nameVersions: A(r),
      versions: A(i)
    };
  }
  var n = e("swx-jskype-internal-application-instance"), r = e("swx-constants"), i = e("lodash-compat"), s = e("swx-mri"), o = e("swx-utils-common"), u = e("jskype-constants"), a = e("jskype-settings-instance"), f = "908 - Web", l = u.DATA.storageKeys, c, h = !0, p = "", d = !1, v, m;
  t.setup = g;
  t.set = y;
  t.get = b;
  t.startingUpdate = w;
  t.update = E;
  t.isMyEndpointActive = S;
  t.setEndpointActiveStatusTo = x;
  t.isTheOnlyActiveEndpoint = T;
}));
