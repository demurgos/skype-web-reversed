define("jSkype/modelHelpers/contacts/dataProcessors/agents", [
  "require",
  "lodash-compat",
  "utils/common/settablePromise",
  "constants/common",
  "jSkype/settings",
  "swx-agentProvisioningService",
  "jSkype/modelHelpers/contacts/dataMappers/agentToPerson",
  "jSkype/client"
], function (e) {
  function a(e) {
    function s(t, s) {
      var a = { agentId: s.id() }, f = n.build();
      return e.search(a).then(function (e) {
        e.agentDescriptions[0] ? f.resolve(o.map(e.agentDescriptions[0], s)) : f.resolve(s);
      }, function (e) {
        u.get()._telemetryManager.sendEvent(i.settings.telemetry.jSkypeTenantToken, "ServiceFault", {
          serviceName: "agents-search",
          faultCode: e.status,
          faultContext: r.telemetry.NOT_AVAILABLE,
          errorCode: e.status || r.telemetry.NOT_AVAILABLE,
          errorMessage: e.responseText || r.telemetry.NOT_AVAILABLE,
          verb: "GET",
          host: i.settings.agentProvisioningService.host
        }), f.resolve(s);
      }), t.concat(f), t;
    }
    this.process = function (e) {
      var n = t.reduce(e, s, []);
      return Promise.all(n);
    };
  }
  var t = e("lodash-compat"), n = e("utils/common/settablePromise"), r = e("constants/common"), i = e("jSkype/settings"), s = e("swx-agentProvisioningService"), o = e("jSkype/modelHelpers/contacts/dataMappers/agentToPerson"), u = e("jSkype/client");
  return {
    build: function () {
      var e = u.get().signInManager._skypeToken, t = s.build(e, i.settings.agentProvisioningService);
      return new a(t);
    }
  };
})
