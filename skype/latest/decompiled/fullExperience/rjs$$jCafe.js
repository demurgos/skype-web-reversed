define("jCafe", [
  "require",
  "lodash-compat",
  "jSkype/root",
  "services/telemetry/common/telemetryContext",
  "services/telemetry/eventBus",
  "telemetry/chat/messagesCollector",
  "experience/api/auth/linking",
  "experience/authContext"
], function (e) {
  var t = e("lodash-compat"), n = e("jSkype/root"), r = e("services/telemetry/common/telemetryContext"), i = e("services/telemetry/eventBus"), s = e("telemetry/chat/messagesCollector"), o = e("experience/api/auth/linking"), u = e("experience/authContext"), a = t.clone(n);
  return a.Application = function (e) {
    e = e || {};
    var a = t.clone(e);
    return t.assign(a, {
      linkingApi: o,
      authContext: u,
      telemetry: {
        context: r.get(),
        messagesCollector: s.get(),
        eventBus: i.get()
      }
    }), new n.Application(a);
  }, a.Application.create = a.Application, a;
});
