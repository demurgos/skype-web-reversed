define("jSkype/services/trouter/requestBuilder", [
  "require",
  "jSkype/client",
  "jSkype/settings",
  "jSkype/services/serviceAccessLayer/requestDispatcher",
  "jSkype/services/clientInfo",
  "jSkype/services/electron",
  "browser/detect",
  "jSkype/services/serviceAccessLayer/transientFaultPolicy",
  "jSkype/services/serviceAccessLayer/decorations/retry",
  "constants/common",
  "jcafe-property-model"
], function (e) {
  function c() {
    return n.isFeatureOn(f.featureFlags.NG_CALLING) ? n.settings.incomingCalls.pnhNGCTemplate : n.settings.incomingCalls.pnhTemplate;
  }
  function h(e, t, r) {
    return {
      clientDescription: {
        appId: n.settings.incomingCalls.pnhAppId,
        aesKey: "",
        languageId: "en-US",
        platform: o.getBrowserInfo().browserName,
        templateKey: c(),
        platformUIVersion: i.getBIVersion()
      },
      registrationId: r,
      nodeId: "",
      transports: {
        TROUTER: [{
            context: "",
            path: e,
            ttl: t
          }]
      }
    };
  }
  function p(e, t, n) {
    var r = l.task(), i = h(e, t, n);
    return v().then(function (e) {
      e.payload = JSON.stringify(i);
      e.reporting = { serviceName: "registrar" };
      r.resolve(e);
    }), r.promise;
  }
  function d(e) {
    var t = l.task(), n = { sr: e };
    return v().then(function (e) {
      e.payload = JSON.stringify(n);
      e.reporting = { serviceName: "authenticateUrl" };
      t.resolve(e);
    }), t.promise;
  }
  function v() {
    var e = l.task();
    return t.get().signInManager._skypeToken().then(function (t) {
      var n = {
        headers: { "X-Skypetoken": t },
        retry: {
          strategy: a.STRATEGIES.EXPONENTIAL,
          delay: 2000,
          isTransientCheck: u.isTransientFailure
        }
      };
      e.resolve(n);
    }), e.promise;
  }
  function m() {
    return o.getBrowserInfo().isElectron;
  }
  var t = e("jSkype/client"), n = e("jSkype/settings"), r = e("jSkype/services/serviceAccessLayer/requestDispatcher"), i = e("jSkype/services/clientInfo"), s = e("jSkype/services/electron"), o = e("browser/detect"), u = e("jSkype/services/serviceAccessLayer/transientFaultPolicy"), a = e("jSkype/services/serviceAccessLayer/decorations/retry"), f = e("constants/common"), l = e("jcafe-property-model");
  return {
    authenticateUrl: function (t) {
      var i = n.settings.incomingCalls.tpcServiceUrl;
      return d(t).then(function (e) {
        return r.post(i, e);
      });
    },
    registerPresence: function (t, i, o) {
      var u = n.settings.incomingCalls.registrarServiceUrl;
      if (m()) {
        var a = h(t, i, o);
        return s.registerPresence(u, a);
      }
      return p(t, i, o).then(function (e) {
        return r.post(u, e);
      });
    }
  };
});
