define("jSkype/services/spaces", [
  "require",
  "exports",
  "module",
  "jSkype/client",
  "swx-enums",
  "jcafe-property-model",
  "services/ecs/configLoader",
  "reqwest",
  "jSkype/settings"
], function (e, t) {
  var n = e("jSkype/client"), r = e("swx-enums"), i = e("jcafe-property-model"), s = e("services/ecs/configLoader"), o = e("reqwest"), u = e("jSkype/settings"), a = null;
  t.fetchConfig = function () {
    return a || (a = s.loadConfig(r.ecsClientNames.Skype, u.settings.ecsSpacesKey)), a;
  }, t.getSpacesData = function (e) {
    function u(t, n) {
      var i = "https://" + n.UrlGeneratorService.Host;
      n.UrlGeneratorService.Port !== 443 && (i += ":" + n.UrlGeneratorService.Port), i += n.UrlGeneratorService.Endpoints.Threads, r = {
        method: "post",
        url: i,
        dataType: "json",
        contentType: "application/json",
        headers: { "X-Skypetoken": t },
        data: JSON.stringify({
          baseDomain: n.WebLauncher.BaseUrl,
          threadId: e
        }),
        crossOrigin: !0
      }, o.compat(r).then(s.resolve.bind(s), s.reject.bind(s));
    }
    function a() {
      s.reject(new Error("Loading of ecs configuration for spaces failed"));
    }
    var r, s = i.task();
    return n.get().signInManager._skypeToken().then(function (e) {
      t.fetchConfig().then(u.bind(null, e), a);
    }), s.promise;
  };
})
