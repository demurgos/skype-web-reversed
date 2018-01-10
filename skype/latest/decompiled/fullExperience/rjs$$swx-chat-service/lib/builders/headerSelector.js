(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-chat-service/lib/builders/headerSelector", [
      "require",
      "exports",
      "lodash-compat",
      "swx-utils-common",
      "jskype-constants",
      "swx-client-info",
      "jcafe-property-model",
      "../constants"
    ], e);
}(function (e, t) {
  var n = e("lodash-compat"), r = e("swx-utils-common"), i = e("jskype-constants"), s = e("swx-client-info"), o = e("jcafe-property-model"), u = e("../constants"), a = "registrationToken", f = a + "Expiration", l = i.DATA.storageKeys, c = function () {
      function e(e, t) {
        var n = this;
        this.hasValidRegToken = o.boolProperty(!1);
        this.clearRegistrationToken = function () {
          r.sessionStorage.remove(a);
          r.sessionStorage.remove(f);
          n.hasValidRegToken(!1);
        };
        this.skypeTokenProvider = e;
        this.mePerson = t;
      }
      return e.prototype.setLockAndKey = function (e) {
        this.lockAndKey = e;
      }, e.prototype.setRegistrationToken = function (e) {
        var t = /registrationToken=(.+); expires=(\d+)/, n = t.test(e) && e.match(t), i = n && new Date(parseInt(n[2], 10) * 1000).getTime();
        i && i > 0 && (r.sessionStorage.set(a, a + "=" + n[1]), r.sessionStorage.set(f, i), r.sessionStorage.set(l.SKYPE_ID_REG_TOKEN, this.getMePersonId()), this.hasValidRegToken(!0));
      }, e.prototype.fetch = function (e) {
        var t = this, n = this.fetchDefaultHeaders(), i = o.task();
        this.updateRegistrationTokenValidity();
        var s = function () {
            n.RegistrationToken = r.sessionStorage.get(a);
            i.resolve(n);
          }, f = function (e) {
            n.LockAndKey = t.lockAndKey;
            n.Authentication = "skypetoken=" + e;
            i.resolve(n);
          }, l = function () {
            switch (e) {
            case u.SERVICE_CALLS.REQUEST_ENDPOINT_CREATION:
            case u.SERVICE_CALLS.REQUEST_SUBSCRIPTION_CREATION:
            case u.SERVICE_CALLS.REQUEST_POLLING:
            case u.SERVICE_CALLS.REQUEST_ENDPOINT_DELETION:
              t.skypeTokenProvider().then(f, i.reject.bind(i));
              break;
            default:
              t.hasValidRegToken.once(!0, s);
            }
          };
        return this.hasValidRegToken() ? s() : this.lockAndKey ? l() : i.reject(new Error("no valid authorization token present")), i.promise;
      }, e.prototype.updateRegistrationTokenValidity = function () {
        var e = r.sessionStorage.get(f) || 0, t = e < n.now(), i = r.sessionStorage.get(l.SKYPE_ID_REG_TOKEN) !== this.getMePersonId(), s = r.sessionStorage.get(a) !== null;
        if (t || i)
          this.clearRegistrationToken(), s = !1;
        i && this.clearEndpointData();
        this.hasValidRegToken(s);
      }, e.prototype.getMePersonId = function () {
        return this.mePerson.id();
      }, e.prototype.clearEndpointData = function () {
        r.sessionStorage.remove(l.ENDPOINT_ID);
        r.sessionStorage.remove(l.PRESENCE_DATA);
      }, e.prototype.fetchDefaultHeaders = function () {
        return {
          ClientInfo: s.getClientInfo(),
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
          ContextId: "tcid=" + new Date().getTime() + (Math.floor(Math.random() * 90000) + 10000),
          BehaviorOverride: "redirectAs404"
        };
      }, e;
    }();
  t.__esModule = !0;
  t["default"] = c;
}));
