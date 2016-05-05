define("jSkype/services/webapi/builders/headerSelector", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "swx-utils-common",
  "jSkype/constants/data",
  "jSkype/client",
  "jSkype/services/clientInfo",
  "jcafe-property-model",
  "jSkype/services/webapi/constants"
], function (e, t) {
  function p() {
    var e = r.get(l) || 0, s = e < n.now(), o = r.get(i.SKYPE_ID_REG_TOKEN) !== d(), u = r.get(f) !== null;
    if (s || o)
      t.clearRegistrationToken(), u = !1;
    o && v(), c(u);
  }
  function d() {
    return s.get().personsAndGroupsManager.mePerson.id();
  }
  function v() {
    r.remove(i.ENDPOINT_ID), r.remove(i.PRESENCE_DATA);
  }
  function m() {
    return {
      ClientInfo: o.getClientInfo(),
      "Cache-Control": "no-cache, no-store, must-revalidate",
      Pragma: "no-cache",
      Expires: "0",
      ContextId: "tcid=" + new Date().getTime() + (Math.floor(Math.random() * 90000) + 10000),
      BehaviorOverride: "redirectAs404"
    };
  }
  var n = e("lodash-compat"), r = e("swx-utils-common").sessionStorage, i = e("jSkype/constants/data").storageKeys, s = e("jSkype/client"), o = e("jSkype/services/clientInfo"), u = e("jcafe-property-model"), a = e("jSkype/services/webapi/constants"), f = "registrationToken", l = f + "Expiration", c = u.boolProperty(!1), h;
  t.setLockAndKey = function (e) {
    h = e;
  }, t.setRegistrationToken = function (e) {
    var t = /registrationToken=(.+); expires=(\d+)/, n = t.test(e) && e.match(t), s = n && new Date(n[2] * 1000).getTime();
    s && s > 0 && (r.set(f, f + "=" + n[1]), r.set(l, s), r.set(i.SKYPE_ID_REG_TOKEN, d()), c(!0));
  }, t.clearRegistrationToken = function () {
    r.remove(f), r.remove(l), c(!1);
  }, t.fetch = function (e) {
    function i() {
      e === a.SERVICE_CALLS.REQUEST_ENDPOINT_CREATION ? s.get().signInManager._skypeToken().then(l, n.reject.bind(n)) : c.once(!0, o);
    }
    function o() {
      t.RegistrationToken = r.get(f), n.resolve(t);
    }
    function l(e) {
      t.LockAndKey = h, t.Authentication = "skypetoken=" + e, n.resolve(t);
    }
    var t = m(), n = u.task();
    return p(), c() ? o() : h ? i() : n.reject(new Error("no valid authorization token present")), n.promise;
  };
})
