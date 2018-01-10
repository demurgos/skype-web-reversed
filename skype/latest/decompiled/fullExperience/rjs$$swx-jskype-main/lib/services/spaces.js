(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/spaces", [
      "require",
      "exports",
      "swx-jskype-internal-application-instance",
      "swx-enums",
      "jcafe-property-model",
      "ecs-client",
      "../../lib/utils/ecsUtils",
      "reqwest",
      "jskype-settings-instance"
    ], e);
}(function (e, t) {
  function c(e) {
    l = e;
  }
  function h(e) {
    function s(t, n) {
      var i = "https://" + n.UrlGeneratorService.Host;
      n.UrlGeneratorService.Port !== 443 && (i += ":" + n.UrlGeneratorService.Port);
      i += n.UrlGeneratorService.Endpoints.Threads;
      var s = {
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
      };
      u.compat(s).then(r.resolve.bind(r), r.reject.bind(r));
    }
    function o() {
      r.reject(new Error("Loading of ecs configuration for spaces failed"));
    }
    var r = i.task();
    return n.get().signInManager._skypeToken().then(function (e) {
      t.fetchConfig().then(s.bind(null, e), o);
    }), r.promise;
  }
  var n = e("swx-jskype-internal-application-instance"), r = e("swx-enums"), i = e("jcafe-property-model"), s = e("ecs-client"), o = e("../../lib/utils/ecsUtils"), u = e("reqwest"), a = e("jskype-settings-instance"), f = null, l = null;
  t.initialize = c;
  t.fetchConfig = function () {
    if (!f) {
      var e = o.getApiKey(l);
      f = new Promise(function (t, n) {
        s.fetchConfig({
          clientName: r.ecsClientNames.Skype,
          clientVersion: o.getClientVersion(l),
          endpoints: o.getHosts(l),
          teamName: a.settings.ecsSpacesKey,
          queryParams: e ? { apikey: e } : undefined
        }, function (e) {
          t(e);
        }, function (e) {
          n(e);
        });
      });
    }
    return f;
  };
  t.getSpacesData = h;
}));
